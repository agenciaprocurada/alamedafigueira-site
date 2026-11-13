// Conversions API (CAPI) da Meta — função da Vercel no próprio domínio do site.
// Recebe os eventos do funil enviados pelo assets/tracking.js e repassa à Meta
// com o MESMO event_id do Pixel; a Meta deduplica e conta uma vez só. Se o
// navegador for bloqueado (adblock, iOS), o servidor garante o evento.
// Mesma lógica do projeto acbsul (src/lib/capi.ts + src/pages/api/capi.ts).
//
// Variáveis de ambiente (Vercel → Settings → Environment Variables):
//   META_PIXEL_ID         opcional, padrão 1589177192962822 (pixel da Alameda)
//   META_CAPI_TOKEN       token do pixel (SECRET — nunca no repositório)
//   META_TEST_EVENT_CODE  código de teste do Gerenciador de Eventos (opcional;
//                         APAGAR depois do teste — enquanto existir, os eventos
//                         reais não contam)
//   META_GRAPH_VERSION    opcional, padrão v21.0
//
// Sem META_CAPI_TOKEN a rota responde { desligado: true } e o site segue normal.

const { createHash } = require('node:crypto');

const PIXEL_ID_PADRAO = '1589177192962822';

const PERMITIDOS =new Set(['PageView', 'ViewContent', 'Contact']);

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

const normaliza = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

function fbclidDaUrl(url) {
  try {
    return new URL(String(url)).searchParams.get('fbclid') || '';
  } catch {
    return '';
  }
}

function header(req, nome) {
  const v = req.headers[nome];
  return Array.isArray(v) ? v[0] : v || '';
}

/** Monta o evento no formato da Graph API a partir do pedido do navegador. */
function montaEvento(e, req) {
  // IP real do visitante atrás do proxy da Vercel (1º da lista)
  const ip = (header(req, 'x-forwarded-for') || header(req, 'x-real-ip')).split(',')[0].trim();

  const user_data = {
    client_ip_address: ip || undefined,
    client_user_agent: header(req, 'user-agent') || undefined,
  };

  // fbp e fbc vão CRUS — nunca hasheados
  if (e.fbp) user_data.fbp = String(e.fbp);
  if (e.fbc) user_data.fbc = String(e.fbc);
  else {
    const fbclid = fbclidDaUrl(e.event_source_url);
    if (fbclid) user_data.fbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  // external_id: hash do MESMO valor cru que o Pixel recebeu no init
  if (e.external_id) user_data.external_id = [sha256(normaliza(e.external_id))];

  // geo pelo IP (headers da Vercel) — sinal extra de match, sem PII digitada
  let cidade = header(req, 'x-vercel-ip-city');
  try { cidade = decodeURIComponent(cidade); } catch {}
  const regiao = header(req, 'x-vercel-ip-country-region');
  const cep = header(req, 'x-vercel-ip-postal-code');
  const pais = header(req, 'x-vercel-ip-country');
  if (cidade) user_data.ct = [sha256(normaliza(cidade).replace(/[^a-z]/g, ''))];
  if (regiao) user_data.st = [sha256(normaliza(regiao))];
  if (cep) user_data.zp = [sha256(cep.replace(/\D/g, ''))];
  if (pais) user_data.country = [sha256(normaliza(pais))];

  const custom = { ...(e.custom_data || {}) };
  const utm = e.utm || {};
  if (utm.utm_campaign && !custom.campanha) custom.campanha = String(utm.utm_campaign);
  if (utm.utm_content && !custom.anuncio) custom.anuncio = String(utm.utm_content);

  // event_time em segundos; ms é corrigido; fora da janela (7 dias) usa agora
  let t = Number(e.event_time) || 0;
  if (t > 1e12) t = Math.floor(t / 1000);
  const agora = Math.floor(Date.now() / 1000);
  if (!t || t > agora + 60 || t < agora - 7 * 86400) t = agora;

  return {
    event_name: e.event_name,
    event_id: String(e.event_id),
    event_time: t,
    event_source_url: String(e.event_source_url || ''),
    action_source: 'website',
    user_data,
    custom_data: custom,
  };
}

/**
 * Envia um evento à Meta. Até 3 tentativas em erro de rede ou 5xx; 4xx não
 * repete (token, pixel ou payload errado). Nunca lança.
 */
async function enviarEventoMeta(e, req) {
  const token = process.env.META_CAPI_TOKEN;
  const pixel = process.env.META_PIXEL_ID || PIXEL_ID_PADRAO;
  if (!token || !pixel) return { ok: false, desligado: true };

  const versao = process.env.META_GRAPH_VERSION || 'v21.0';
  const url = `https://graph.facebook.com/${versao}/${pixel}/events`;
  const carga = { data: [montaEvento(e, req)], access_token: token };
  const teste = process.env.META_TEST_EVENT_CODE;
  if (teste) carga.test_event_code = teste;

  const esperas = [0, 800, 2000];
  for (let i = 0; i < esperas.length; i++) {
    if (esperas[i]) await new Promise((ok) => setTimeout(ok, esperas[i]));
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carga),
      });
      const meta = await r.json().catch(() => ({}));
      if (r.ok) return { ok: true, status: r.status, meta };
      const err = meta?.error || {};
      // log sem user_data (nunca PII)
      console.error(
        JSON.stringify({
          capi: 'erro-graph',
          tentativa: i,
          event_name: e.event_name,
          event_id: e.event_id,
          status: r.status,
          fbtrace_id: err.fbtrace_id || null,
          code: err.code || null,
          message: err.message || null,
        }),
      );
      if (r.status < 500) return { ok: false, status: r.status };
    } catch (erro) {
      console.error(JSON.stringify({ capi: 'erro-rede', tentativa: i, event_name: e.event_name, message: String(erro) }));
    }
  }
  return { ok: false };
}

async function lerCorpo(req) {
  if (typeof req.body === 'string') return req.body;
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return JSON.stringify(req.body);
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  const partes = [];
  for await (const p of req) partes.push(p);
  return Buffer.concat(partes).toString('utf8');
}

function responde(res, status, corpo) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(corpo));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return responde(res, 405, { ok: false, erro: 'metodo' });

  // só aceita chamadas do próprio site
  // (na Vercel o domínio que o visitante acessou vem em x-forwarded-host/host)
  const origem = header(req, 'origin');
  const hostSite = header(req, 'x-forwarded-host') || header(req, 'host');
  if (origem) {
    let hostOrigem = '';
    try { hostOrigem = new URL(origem).host; } catch {}
    if (hostOrigem !== hostSite) return responde(res, 403, { ok: false, erro: 'origem' });
  }

  let corpo;
  try {
    const texto = await lerCorpo(req);
    if (texto.length > 20000) return responde(res, 413, { ok: false, erro: 'grande-demais' });
    corpo = JSON.parse(texto);
  } catch {
    return responde(res, 400, { ok: false, erro: 'json-invalido' });
  }

  const nome = String(corpo?.event_name || '');
  if (!PERMITIDOS.has(nome)) return responde(res, 400, { ok: false, erro: 'evento-nao-permitido' });
  if (!corpo.event_id) return responde(res, 400, { ok: false, erro: 'event_id-obrigatorio' });

  const r = await enviarEventoMeta(
    {
      event_name: nome,
      event_id: String(corpo.event_id).slice(0, 80),
      event_time: corpo.event_time,
      event_source_url: String(corpo.event_source_url || '').slice(0, 1000),
      external_id: corpo.external_id ? String(corpo.external_id).slice(0, 80) : undefined,
      fbp: corpo.fbp ? String(corpo.fbp).slice(0, 200) : undefined,
      fbc: corpo.fbc ? String(corpo.fbc).slice(0, 500) : undefined,
      custom_data: typeof corpo.custom_data === 'object' && corpo.custom_data ? corpo.custom_data : {},
      utm: typeof corpo.utm === 'object' && corpo.utm ? corpo.utm : {},
    },
    req,
  );

  if (r.desligado) return responde(res, 200, { ok: false, desligado: true });
  return responde(res, r.ok ? 200 : 502, { ok: r.ok });
};

// exportado para teste local
module.exports.montaEvento = montaEvento;
