// Dados oficiais da Alameda Figueira — usados em todas as páginas, no rodapé e no JSON-LD.
// Fonte: briefing do cliente (19/11/2026) + perfil do Google conferido em 19/11/2026.
export const SITE = 'https://alamedafigueira.com.br'
export const NOME = 'Alameda Figueira Espaço de Eventos'
export const END = {
  rua: 'Estrada Antônio José do Nascimento, 1175',
  bairro: 'Distrito Industrial',
  cidade: 'Cachoeirinha',
  uf: 'RS',
  cep: '94930-090',
}
export const END_LINHA = `${END.rua} – ${END.bairro}, ${END.cidade} – ${END.uf}, ${END.cep}`
export const TEL = '(51) 99711-5522'
export const TEL_INT = '+55-51-99711-5522'
export const EMAIL = 'contato@alamedafigueira.com.br'
export const GEO = { lat: -29.9238063, lng: -51.1151567 } // pin do perfil do Google
export const GOOGLE_PERFIL = 'https://www.google.com/maps?cid=8120408245446466202'
export const GOOGLE_NOTA = { nota: '4,8', total: 285 } // conferido no perfil em 19/11/2026
export const INSTAGRAM = 'https://www.instagram.com/alamedafigueira'
export const FACEBOOK = 'https://www.facebook.com/alamedafigueira'
export const HORARIO_TEXTO = 'Segunda a sexta, das 8h às 17h · Sábado, das 8h às 12h'

export const wa = (texto) => `https://wa.me/5551997115522?text=${encodeURIComponent(texto)}`
export const WA_VISITA = wa('Olá! Gostaria de agendar uma visita à Alameda Figueira.\nData prevista do evento: \nNúmero de convidados: ')

// Rotas de carro calculadas a partir do pin (OSRM, 19/11/2026). Valores aproximados, sem trânsito.
export const DISTANCIAS = [
  ['Centro de Cachoeirinha', '4 km', '6 min'],
  ['Centro de Canoas', '9 km', '14 min'],
  ['Centro de Gravataí', '14 km', '18 min'],
  ['Aeroporto Salgado Filho', '15 km', '21 min'],
  ['Centro de Alvorada', '12 km', '17 min'],
  ['Centro de Esteio', '12 km', '16 min'],
  ['Centro de Porto Alegre', '21 km', '21 min'],
]

// O que está incluído na locação (mensagem da Flavia, 17/11/2026)
export const INCLUSO = [
  'Casa com 2 suítes para a produção no dia do evento',
  'Mobiliário para 200 convidados: 20 mesas de 10 lugares e 200 cadeiras',
  'Bancos e aparadores para a cerimônia e mobiliário de jardim',
  '4 toldos (400 m²) para o evento ao ar livre com segurança, faça sol ou chuva',
  'Gerador de 115 kVA',
  'Equipe: 4 seguranças, 2 higienistas e 1 brigadista',
  'Sonorização e iluminação (você também pode levar seu DJ ou banda)',
  'Estacionamento com 200 vagas',
]

export const PAGINAS = [
  { slug: 'casamento', menu: 'Casamentos', resumo: 'Cerimônia sob a figueira e festa no mesmo lugar' },
  { slug: 'festa-de-15-anos', menu: 'Festa de 15 anos', resumo: 'A noite da debutante, do jeito dela' },
  { slug: 'festa-infantil', menu: 'Festa infantil', resumo: 'Jardim amplo e seguro para a criançada' },
  { slug: 'eventos-corporativos', menu: 'Eventos corporativos', resumo: 'Confraternizações, premiações e encontros' },
  { slug: 'aniversarios-e-bodas', menu: 'Aniversários e bodas', resumo: 'Para reunir quem faz parte da sua história' },
  { slug: 'formaturas', menu: 'Formaturas', resumo: 'Festa e jantar de formatura para a turma' },
]
