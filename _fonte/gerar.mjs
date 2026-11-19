// Gera as páginas internas (HTML estático) e o sitemap.
//   node _fonte/gerar.mjs        (rodar na raiz do projeto)
// Edite os textos em _fonte/conteudo.mjs e os dados oficiais em _fonte/dados.mjs.
import { writeFileSync, readFileSync } from 'node:fs'
import * as D from './dados.mjs'
import { CONTEUDO, FAQ_GERAL } from './conteudo.mjs'

const HOJE = new Date().toISOString().slice(0, 10)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const semTags = (s) => String(s).replace(/<[^>]+>/g, '')
const publicas = D.PAGINAS.filter((p) => !CONTEUDO[p.slug].pendente)

const ICONE_WA = readFileSync('index.html', 'utf8').match(/class="wa-float"[^>]*>\s*(<svg[\s\S]*?<\/svg>)/)[1]

const cabecalhoHead = ({ titulo, descricao, url, imagem, jsonld, noindex, conteudoNome }) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HZZ3CFXVDY"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HZZ3CFXVDY');</script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(descricao)}" />
  ${noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="${D.NOME}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${esc(titulo)}" />
  <meta property="og:description" content="${esc(descricao)}" />
  <meta property="og:image" content="${D.SITE}${imagem}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/dm-serif-text-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" as="image" href="${imagem}">
  <link rel="stylesheet" href="/styles/paginas.css">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  <script>window.AF_TRACK={pixel:'1589177192962822',capi:'/api/capi',content:{name:${JSON.stringify(conteudoNome)},category:'espaco-eventos',id:'alameda-figueira'}};</script>
  <script src="/assets/tracking.js"></script>
  <script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","zd4xhprzdy");</script>
</head>`

const topo = () => `
<header class="topo">
  <div class="wrap">
    <a class="marca" href="/"><img src="/images/logos/logo-alameda-figueira-transparente.webp" alt="Logo Alameda Figueira Espaço de Eventos" width="44" height="44"><span>Alameda Figueira</span></a>
    <nav class="menu" id="menu" aria-label="Menu principal">
      <a href="/">Início</a>
      <div class="sub">
        <button type="button" aria-haspopup="true">Eventos ▾</button>
        <div class="sub-lista">
          ${publicas.map((p) => `<a href="/${p.slug}">${p.menu}</a>`).join('\n          ')}
        </div>
      </div>
      <a href="/perguntas-frequentes">Perguntas frequentes</a>
      <a href="/#como-chegar">Como chegar</a>
      <a class="btn btn-pq" href="${D.WA_VISITA}" target="_blank" rel="noopener">Agendar visita</a>
    </nav>
    <a class="btn btn-pq" href="${D.WA_VISITA}" target="_blank" rel="noopener">Agendar visita</a>
    <button class="abre-menu" type="button" aria-label="Abrir menu" aria-controls="menu" onclick="document.getElementById('menu').classList.toggle('aberto')">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</header>`

const migalhas = (itens) => `
<nav class="migalhas wrap" aria-label="Você está em">
  <ol>${itens.map(([n, u], i) => (i < itens.length - 1 ? `<li><a href="${u}">${n}</a></li>` : `<li aria-current="page">${n}</li>`)).join('')}</ol>
</nav>`

const migalhasLd = (itens) => ({
  '@type': 'BreadcrumbList',
  itemListElement: itens.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: D.SITE + u })),
})

const faqHtml = (lista) => `<div class="faq">${lista.map((f) => `
  <details><summary>${f.p}</summary><div><p>${f.r}</p></div></details>`).join('')}
</div>`

const faqLd = (lista) => ({
  '@type': 'FAQPage',
  mainEntity: lista.filter((f) => !f.pendente).map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: semTags(f.r) } })),
})

const rodape = () => `
<footer class="rodape">
  <div class="wrap">
    <div class="cols">
      <div>
        <h3>${D.NOME}</h3>
        <p>${D.END.rua}<br>${D.END.bairro}, ${D.END.cidade} – ${D.END.uf}, ${D.END.cep}</p>
        <p>WhatsApp: <a href="${D.wa('Olá! Vim pelo site e gostaria de mais informações sobre a Alameda Figueira.')}" target="_blank" rel="noopener">${D.TEL}</a></p>
        <p>E-mail: <a href="mailto:${D.EMAIL}">${D.EMAIL}</a></p>
        <p>Atendimento e visitas: ${D.HORARIO_TEXTO}</p>
        <a class="nota-google" href="${D.GOOGLE_PERFIL}" target="_blank" rel="noopener">★ ${D.GOOGLE_NOTA.nota} no Google · ${D.GOOGLE_NOTA.total} avaliações</a>
      </div>
      <div>
        <h4>Eventos</h4>
        <ul>
          ${publicas.map((p) => `<li><a href="/${p.slug}">${p.menu}</a></li>`).join('\n          ')}
          <li><a href="/perguntas-frequentes">Perguntas frequentes</a></li>
        </ul>
      </div>
      <div>
        <h4>Siga e avalie</h4>
        <ul>
          <li><a href="${D.INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${D.FACEBOOK}" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="${D.GOOGLE_PERFIL}" target="_blank" rel="noopener">Avalie-nos no Google</a></li>
          <li><a href="/#como-chegar">Como chegar</a></li>
        </ul>
      </div>
    </div>
    <div class="final">
      <p>© ${new Date().getFullYear()} ${D.NOME}. Todos os direitos reservados. · <a href="/politica-de-privacidade">Política de Privacidade</a></p>
      <p style="font-size:11px;opacity:.75">FLAVIA FRUTUOSO DA SILVA EVENTOS - ME · <span style="white-space:nowrap">CNPJ 17.054.249/0001-82</span></p>
      <p>Desenvolvido por <a href="https://www.procuradaagencia.com.br" target="_blank" rel="noopener noreferrer">PROCURADA AGENCIA</a></p>
    </div>
  </div>
</footer>
<a class="visita-float" href="${D.WA_VISITA}" target="_blank" rel="noopener">Agendar visita</a>
<a class="wa-float" href="${D.wa('Olá! Vim pelo site e gostaria de um orçamento para o meu evento.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ICONE_WA}</a>
<script>
  // clique em "Como chegar" / mapa vira evento no GA4
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="google.com/maps"], a[href$="#como-chegar"]');
    if (a && window.gtag) gtag('event', 'como_chegar', { link_url: a.href });
  }, true);
</script>
</body>
</html>
`

const incluso = () => `<ul class="lista-check">${D.INCLUSO.map((i) => `<li>${i}</li>`).join('')}</ul>`

function paginaEvento(pg) {
  const c = CONTEUDO[pg.slug]
  const url = `${D.SITE}/${pg.slug}`
  const trilha = [['Início', '/'], [pg.menu, `/${pg.slug}`]]
  const waTipo = D.wa(`Olá! Vim pelo site e quero saber sobre ${c.tipo} na Alameda Figueira.\nData prevista: \nNúmero de convidados: `)
  const jsonld = { '@context': 'https://schema.org', '@graph': [migalhasLd(trilha), faqLd(c.faq)] }
  const outras = publicas.filter((p) => p.slug !== pg.slug)
  return `${cabecalhoHead({ titulo: c.titulo, descricao: c.descricao, url, imagem: c.capa.src, jsonld, noindex: !!c.pendente, conteudoNome: `Alameda Figueira - ${pg.menu}` })}
<body>
${c.pendente ? `<div style="background:#fff7ed;color:#9a3412;text-align:center;padding:10px;font-size:14px">PRÉVIA, NÃO PUBLICAR: ${c.pendente}</div>` : ''}
${topo()}
<main>
${migalhas(trilha)}
<section class="capa">
  <img src="${c.capa.src}" alt="${esc(c.capa.alt)}" fetchpriority="high">
  <div class="wrap">
    <h1>${c.h1}</h1>
    <p>${c.sub}</p>
    <div class="acoes">
      <a class="btn" href="${waTipo}" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
      <a class="btn btn-claro" href="${D.WA_VISITA}" target="_blank" rel="noopener">Agendar visita</a>
    </div>
    <div class="selos">
      <a class="selo" href="${D.GOOGLE_PERFIL}" target="_blank" rel="noopener">★ ${D.GOOGLE_NOTA.nota} no Google (${D.GOOGLE_NOTA.total} avaliações)</a>
      <span class="selo">Até 300 convidados</span>
      <span class="selo">Mais de 15 anos</span>
    </div>
  </div>
</section>

<section class="bloco">
  <div class="wrap duas-col">
    <div class="texto">${c.texto}</div>
    <div>
      <div class="cartoes" style="margin-bottom:22px">
        <div class="cartao"><strong>Até 300</strong><span>convidados (mobiliário incluso para 200)</span></div>
        <div class="cartao"><strong>200 vagas</strong><span>de estacionamento</span></div>
        <div class="cartao"><strong>400 m²</strong><span>de toldos para sol ou chuva</span></div>
      </div>
      <h3 style="margin-top:0">Incluído na locação</h3>
      ${incluso()}
      <a class="btn" href="${waTipo}" target="_blank" rel="noopener">Consultar data disponível</a>
    </div>
  </div>
</section>

<section class="bloco cinza">
  <div class="wrap">
    <h2>Fotos de ${pg.menu.toLowerCase()} e do espaço</h2>
    <div class="galeria">
      ${c.galeria.map(([src, alt], i) => `<figure><img src="${src}" alt="${esc(alt)}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async"></figure>`).join('\n      ')}
    </div>
  </div>
</section>
${c.depoimentos.length ? `
<section class="bloco">
  <div class="wrap">
    <h2>Quem já celebrou aqui</h2>
    <div class="depoimentos">
      ${c.depoimentos.map(([f, n, e]) => `<figure class="depoimento"><img src="/images/depoimentos-alameda/${f}" alt="Depoimento de ${esc(n)} sobre ${esc(e)} na Alameda Figueira" loading="lazy"><figcaption><strong>${n}</strong><span>${e}</span></figcaption></figure>`).join('\n      ')}
    </div>
    <p style="margin-top:18px"><a href="${D.GOOGLE_PERFIL}" target="_blank" rel="noopener">Veja as ${D.GOOGLE_NOTA.total} avaliações no Google →</a></p>
  </div>
</section>` : ''}

<section class="bloco${c.depoimentos.length ? ' cinza' : ''}">
  <div class="wrap estreito">
    <h2>Perguntas frequentes</h2>
    ${faqHtml(c.faq)}
    <p><a href="/perguntas-frequentes">Ver todas as perguntas →</a></p>
  </div>
</section>

<section class="bloco">
  <div class="wrap">
    <h2>Outros eventos na Alameda Figueira</h2>
    <div class="outras">
      ${outras.map((p) => `<a href="/${p.slug}">${p.menu}<span>${p.resumo}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="chamada">
  <div class="wrap">
    <h2>Venha conhecer o espaço</h2>
    <p>O melhor jeito de escolher é ver de perto. Agende uma visita e conte a data e o número de convidados do seu evento.</p>
    <div class="acoes">
      <a class="btn" href="${D.WA_VISITA}" target="_blank" rel="noopener">Agendar visita</a>
      <a class="btn btn-claro" href="${waTipo}" target="_blank" rel="noopener">${D.TEL}</a>
    </div>
  </div>
</section>
</main>
${rodape()}`
}

function paginaFaq() {
  const url = `${D.SITE}/perguntas-frequentes`
  const trilha = [['Início', '/'], ['Perguntas frequentes', '/perguntas-frequentes']]
  const jsonld = { '@context': 'https://schema.org', '@graph': [migalhasLd(trilha), faqLd(FAQ_GERAL)] }
  return `${cabecalhoHead({ titulo: 'Perguntas Frequentes | Alameda Figueira Espaço de Eventos', descricao: 'Capacidade, o que está incluso na locação, fornecedores, chuva, estacionamento e como agendar visita na Alameda Figueira, em Cachoeirinha – RS.', url, imagem: '/images/fotos-topo/foto-capa-02.webp', jsonld, conteudoNome: 'Alameda Figueira - Perguntas frequentes' })}
<body>
${topo()}
<main>
${migalhas(trilha)}
<section class="bloco" style="padding-top:28px">
  <div class="wrap estreito">
    <h1 class="serif" style="font-size:clamp(32px,5vw,48px);line-height:1.15;margin:0 0 14px">Perguntas frequentes</h1>
    <p>Tudo o que costumam perguntar antes de reservar a Alameda Figueira Espaço de Eventos, em Cachoeirinha. Não achou sua dúvida? <a href="${D.wa('Olá! Vim pelo site e tenho uma dúvida sobre a Alameda Figueira.')}" target="_blank" rel="noopener">Chame no WhatsApp</a>.</p>
    ${faqHtml(FAQ_GERAL)}
  </div>
</section>
<section class="bloco cinza">
  <div class="wrap">
    <h2>Eventos que realizamos</h2>
    <div class="outras">
      ${publicas.map((p) => `<a href="/${p.slug}">${p.menu}<span>${p.resumo}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="chamada">
  <div class="wrap">
    <h2>Venha conhecer o espaço</h2>
    <p>Agende uma visita: ${D.HORARIO_TEXTO.toLowerCase()}.</p>
    <div class="acoes"><a class="btn" href="${D.WA_VISITA}" target="_blank" rel="noopener">Agendar visita</a></div>
  </div>
</section>
</main>
${rodape()}`
}

for (const pg of D.PAGINAS) { writeFileSync(`${pg.slug}.html`, paginaEvento(pg)); console.log('gerada', pg.slug + '.html', CONTEUDO[pg.slug].pendente ? '(PRÉVIA, noindex)' : '') }
writeFileSync('perguntas-frequentes.html', paginaFaq()); console.log('gerada perguntas-frequentes.html')

const urls = [['/', '1.0'], ...publicas.map((p) => [`/${p.slug}`, '0.8']), ['/perguntas-frequentes', '0.6'], ['/politica-de-privacidade', '0.3']]
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr]) => `  <url>\n    <loc>${D.SITE}${u === '/' ? '/' : u}</loc>\n    <lastmod>${HOJE}</lastmod>\n    <priority>${pr}</priority>\n  </url>`).join('\n')}
</urlset>
`)
console.log('sitemap com', urls.length, 'endereços')
