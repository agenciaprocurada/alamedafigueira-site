// Textos das páginas internas. Trechos com conf('...') aparecem destacados na prévia
// e ficam FORA do JSON-LD até serem confirmados pela Alameda.
const conf = (t) => `<span class="aviso">A CONFIRMAR: ${t}</span>`
const E = '/images/galeria-de-fotos/fotos-extrutura-alameda/'
const C = '/images/galeria-de-fotos/casamentos-alameda-figueira/casamento-alameda-figueira-'
const Q = '/images/galeria-de-fotos/15-anos-valentina/15-anos-valentina-'
const I = '/images/galeria-de-fotos/fotos-extrutura-alameda/interna/alameda-figueira-interna-'

// Perguntas comuns a todas as páginas (respostas já confirmadas pela Alameda)
const P_FORNECEDORES = { p: 'Posso levar meus próprios fornecedores?', r: 'Sim. Você tem liberdade para levar organizador ou cerimonialista, decoração, DJ ou banda e demais fornecedores. Para a gastronomia, a casa indica cinco fornecedores parceiros. Não cobramos taxa de rolha para vinhos e espumantes.' }
const P_CHUVA = { p: 'E se chover no dia?', r: 'A locação inclui 4 toldos que cobrem 400 m². Eles permitem fazer o evento ao ar livre com segurança, faça sol ou chuva, e a casa também fica à disposição.' }
const P_VISITA = { p: 'Como agendo uma visita?', r: 'Chame no WhatsApp (51) 99711-5522 e informe a data prevista e o número de convidados. As visitas acontecem de segunda a sexta, das 8h às 17h, e aos sábados, das 8h às 12h.' }
const P_CAPACIDADE = { p: 'Quantos convidados o espaço comporta?', r: 'Até 300 convidados. O mobiliário incluído na locação atende 200 pessoas (20 mesas de 10 lugares e 200 cadeiras).' }

export const CONTEUDO = {
  casamento: {
    titulo: 'Local para Casamento ao Ar Livre em Cachoeirinha | Alameda Figueira',
    descricao: 'Casamento ao ar livre sob uma figueira centenária em Cachoeirinha, perto de Porto Alegre. Cerimônia e festa no mesmo lugar, para até 300 convidados.',
    h1: 'Local para Casamento ao Ar Livre em Cachoeirinha',
    sub: 'Cerimônia sob uma figueira centenária e festa no mesmo lugar, a poucos minutos de Porto Alegre, Canoas e Gravataí.',
    capa: { src: E + 'casamento-alameda-figueira-mariana-e-guilherme-02.webp', alt: 'Cerimônia de casamento ao ar livre sob a figueira centenária em Cachoeirinha' },
    tipo: 'casamento',
    texto: `
<h2>Um casamento ao ar livre, do sim até a última música</h2>
<p>A Alameda Figueira Espaço de Eventos fica em Cachoeirinha, na Grande Porto Alegre, e há mais de 15 anos recebe casamentos ao ar livre. O cenário principal é uma figueira centenária: é sob a sombra dela que acontece a cerimônia, com os bancos de madeira e o corredor montados no jardim.</p>
<p>Depois do sim, ninguém precisa pegar o carro. A festa segue no mesmo espaço, nos jardins, sob os toldos ou na casa. Isso deixa o dia mais tranquilo para os noivos e para os convidados, que acompanham cada momento sem deslocamento.</p>
<h3>Locação do espaço: vocês escolhem os fornecedores</h3>
<p>Trabalhamos com a locação do espaço, e não com pacote fechado. Vocês recebem a casa e os jardins com mobiliário, equipe e estrutura, e escolhem livremente cerimonialista, decoração, DJ ou banda. Para a gastronomia, indicamos cinco fornecedores parceiros. Não cobramos taxa de rolha para vinhos e espumantes.</p>
<p>A casa tem 2 suítes para a produção dos noivos no dia, para que a noiva e o noivo se arrumem no próprio local, com calma e perto de quem vai fotografar.</p>
<h3>Para quem vem de Porto Alegre e região</h3>
<p>O acesso é pela BR-290, a cerca de 21 minutos do centro de Porto Alegre e do Aeroporto Salgado Filho, o que facilita para convidados de fora. O estacionamento tem 200 vagas.</p>`,
    galeria: [
      [C + 'carol-e-rodrigo-07.webp', 'Noivos saindo da cerimônia de casamento na Alameda Figueira'],
      [E + 'casamento-alameda-figueira-pietra-e-ruan-26.webp', 'Cerimônia de casamento montada no jardim da Alameda Figueira'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-13.webp', 'Arco de flores para cerimônia de casamento ao ar livre'],
      [C + 'glenda-e-cesar-02.webp', 'Noiva com buquê nos jardins da Alameda Figueira'],
      [C + 'pietra-e-ruan-14.webp', 'Cerimônia de casamento sob toldo com a figueira ao fundo'],
      [C + 'carol-e-rodrigo-05.webp', 'Noivos caminhando no jardim do espaço de eventos em Cachoeirinha'],
      [E + 'casamento-alameda-figueira-pietra-e-ruan-16.webp', 'Cerimônia de casamento com convidados sob a figueira'],
      [C + 'pietra-e-ruan-04.webp', 'Noivos à noite com luzes no jardim da Alameda Figueira'],
      [C + 'outros-02.webp', 'Noivos comemorando após a cerimônia de casamento'],
      [C + 'pietra-e-ruan-01.webp', 'Noivos na pista de dança da festa de casamento'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-05.webp', 'Recepção de casamento sob os toldos da Alameda Figueira'],
      [C + 'tali-e-almir-03.webp', 'Jantar de casamento com mesas redondas iluminadas'],
    ],
    faq: [
      P_CAPACIDADE,
      { p: 'A cerimônia e a festa acontecem no mesmo lugar?', r: 'Sim. A cerimônia é feita no jardim, sob a figueira centenária, e a festa continua no mesmo espaço, sem deslocamento para os convidados.' },
      P_FORNECEDORES,
      { p: 'Os noivos têm onde se arrumar?', r: 'Sim. A casa tem 2 suítes à disposição dos noivos para a produção no dia do evento.' },
      P_CHUVA,
    ],
    depoimentos: [
      ['Carol-Luciano-27.09.25.jpeg', 'Carol & Luciano', 'Casamento · 27/09/2025'],
      ['Felipe-Magali-21.03.26.jpeg', 'Felipe & Magali', 'Casamento · 21/03/2026'],
      ['Carol-Vini-19.04.26.jpeg', 'Carol & Vini', 'Casamento · 19/04/2026'],
    ],
  },

  'festa-de-15-anos': {
    titulo: 'Espaço para Festa de 15 Anos em Cachoeirinha | Alameda Figueira',
    descricao: 'Espaço para festa de 15 anos em Cachoeirinha, na Grande Porto Alegre. Jardins, toldos e casa para até 300 convidados, com fornecedores à sua escolha.',
    h1: 'Espaço para Festa de 15 Anos em Cachoeirinha',
    sub: 'Jardins, toldos iluminados e uma figueira centenária como cenário para a noite da debutante.',
    capa: { src: Q + '13.webp', alt: 'Debutante na festa de 15 anos na Alameda Figueira em Cachoeirinha' },
    tipo: 'festa de 15 anos',
    texto: `
<h2>Uma festa de 15 anos com a cara da debutante</h2>
<p>Na Alameda Figueira Espaço de Eventos, em Cachoeirinha, a festa de 15 anos ganha um cenário que vai além do salão: jardins amplos, a figueira centenária iluminada à noite e toldos que viram pista de dança, lounge e área de jantar.</p>
<p>Como trabalhamos com a locação do espaço, a família tem liberdade total para montar a festa do jeito da debutante. Vocês escolhem a decoração, o cerimonialista, o DJ ou a banda e os demais fornecedores. Para a gastronomia, a casa indica cinco fornecedores parceiros.</p>
<h3>Estrutura para a família e para os convidados</h3>
<p>A casa tem 2 suítes para a produção da debutante no dia, perto de onde acontecem as fotos e a entrada. A locação inclui mobiliário para 200 convidados, 4 toldos com 400 m² de cobertura, gerador de 115 kVA e equipe de segurança, higiene e brigada, para os pais aproveitarem a festa sem preocupação.</p>
<p>O espaço fica perto de Porto Alegre, Canoas e Gravataí, com acesso pela BR-290 e estacionamento com 200 vagas.</p>`,
    galeria: [
      [Q + '09.webp', 'Painel decorado com o nome da debutante em festa de 15 anos'],
      [Q + '12.webp', 'Debutante posando no cenário da festa de 15 anos'],
      [Q + '01.webp', 'Decoração da festa de 15 anos com flores e lounge'],
      [Q + '02.webp', 'Pista de dança iluminada na festa de 15 anos'],
      [Q + '03.webp', 'Entrada decorada com flores para festa de 15 anos'],
      [Q + '05.webp', 'Lounge com poltronas vermelhas sob os toldos'],
      [Q + '07.webp', 'Pista de dança e palco da festa de 15 anos'],
      [Q + '11.webp', 'Detalhe da decoração com flores da festa de 15 anos'],
      [Q + '14.webp', 'Figueira centenária iluminada à noite na festa de 15 anos'],
    ],
    faq: [
      P_CAPACIDADE,
      P_FORNECEDORES,
      { p: 'A debutante tem onde se arrumar?', r: 'Sim. A casa tem 2 suítes que ficam à disposição para a produção no dia da festa.' },
      P_CHUVA,
      P_VISITA,
    ],
    depoimentos: [['Adriana-Alessandro-pais-15anos.jpeg', 'Adriana & Alessandro', 'Pais da debutante · Festa de 15 anos']],
  },

  'festa-infantil': {
    titulo: 'Espaço para Festa Infantil em Cachoeirinha | Alameda Figueira',
    descricao: 'Espaço para festa infantil em Cachoeirinha, perto de Porto Alegre. Jardim amplo, casa com estrutura completa e equipe de segurança inclusa.',
    h1: 'Espaço para Festa Infantil em Cachoeirinha',
    sub: 'Jardim amplo para as crianças brincarem ao ar livre e estrutura completa para a família receber os convidados.',
    capa: { src: E + 'casamento-alameda-figueira-bruna-e-patrick-05.webp', alt: 'Jardim amplo com a figueira centenária para festa infantil em Cachoeirinha' },
    tipo: 'festa infantil',
    texto: `
<h2>Festa infantil ao ar livre, com espaço de sobra</h2>
<p>A Alameda Figueira Espaço de Eventos, em Cachoeirinha, tem um gramado amplo em volta de uma figueira centenária. É um lugar para as crianças correrem e brincarem ao ar livre, enquanto os adultos aproveitam a festa com conforto, na casa ou sob os toldos.</p>
<p>Trabalhamos com a locação do espaço. A família escolhe o tema, a decoração, o bolo, os brinquedos, a recreação e os demais fornecedores. Para a gastronomia, a casa indica cinco fornecedores parceiros.</p>
<h3>Segurança e conforto para os pais</h3>
<p>A locação inclui equipe de 4 seguranças, 2 higienistas e 1 brigadista, além de gerador de 115 kVA e 4 toldos com 400 m² de cobertura para sol ou chuva. O mobiliário atende 200 convidados, e o estacionamento tem 200 vagas.</p>
<p>O espaço fica a cerca de 6 minutos do centro de Cachoeirinha e a 14 minutos de Canoas, com acesso pela BR-290.</p>`,
    galeria: [
      [E + 'casamento-alameda-figueira-bruna-e-patrick-04.webp', 'Gramado com a figueira centenária na Alameda Figueira'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-08.webp', 'Jardim amplo com bancos de madeira para eventos ao ar livre'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-09.webp', 'Área de jardim com mobiliário para festas em Cachoeirinha'],
      [E + 'casamento-alameda-figueira-carol-e-rodrigo-10.webp', 'Figueira centenária vista do gramado do espaço de eventos'],
      [E + 'casamento-alameda-figueira-carol-e-rodrigo-16.webp', 'Gramado e árvores da Alameda Figueira'],
      [I + '02.webp', 'Mesa posta no salão interno da Alameda Figueira'],
      [I + '03.webp', 'Salão interno da casa com mesas para convidados'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-16.webp', 'Jardim e figueira em dia de sol na Alameda Figueira'],
    ],
    faq: [
      P_CAPACIDADE,
      { p: 'Posso levar brinquedos e recreação?', r: 'Sim. A família escolhe livremente os fornecedores de decoração, brinquedos e recreação. Para a gastronomia, a casa indica cinco fornecedores parceiros.' },
      { p: 'O espaço tem segurança?', r: 'Sim. A locação inclui equipe de 4 seguranças, 2 higienistas e 1 brigadista.' },
      P_CHUVA,
      P_VISITA,
    ],
    depoimentos: [],
  },

  'eventos-corporativos': {
    titulo: 'Espaço para Eventos Corporativos e Confraternizações | Alameda Figueira',
    descricao: 'Espaço para eventos corporativos e confraternizações na Grande Porto Alegre. Em Cachoeirinha, perto do aeroporto, para até 300 pessoas e com 200 vagas.',
    h1: 'Espaço para Eventos Corporativos e Confraternizações na Grande Porto Alegre',
    sub: 'Confraternizações de fim de ano, premiações e encontros de equipe em um ambiente cercado de natureza, perto do aeroporto.',
    capa: { src: I + '01.webp', alt: 'Salão interno da Alameda Figueira preparado para evento corporativo' },
    tipo: 'evento corporativo',
    texto: `
<h2>Um evento da empresa fora da rotina do escritório</h2>
<p>A Alameda Figueira Espaço de Eventos fica em Cachoeirinha, na Grande Porto Alegre, a cerca de 21 minutos do Aeroporto Salgado Filho e com acesso pela BR-290. É uma opção para confraternizações de fim de ano, festas de equipe, premiações, lançamentos e encontros com clientes em um ambiente cercado de natureza.</p>
<p>O espaço combina a casa, com salão interno, e os jardins com toldos que cobrem 400 m². O formato pode ser um jantar, um coquetel, uma festa com pista ou um encontro durante o dia ao ar livre.</p>
<h3>Locação com estrutura incluída</h3>
<p>A empresa aluga o espaço e escolhe os fornecedores: buffet, decoração, som, palco e o que mais o evento pedir. A casa indica cinco fornecedores parceiros de gastronomia. A locação já inclui mobiliário para 200 pessoas, gerador de 115 kVA e equipe de segurança, higiene e brigada.</p>
<p>O estacionamento tem 200 vagas, o que facilita para equipes que chegam de carro de várias cidades da região.</p>`,
    galeria: [
      [I + '01.webp', 'Salão interno com mesas para confraternização de empresa'],
      [I + '04.webp', 'Mesa longa posta para jantar corporativo'],
      [I + '03.webp', 'Salão da casa com mesas redondas para evento'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-04.webp', 'Toldo com mesas e bar para evento corporativo'],
      [E + 'casamento-alameda-figueira-pietra-e-ruan-20.webp', 'Mesas montadas sob os toldos da Alameda Figueira'],
      [E + 'casamento-alameda-figueira-pietra-e-ruan-22.webp', 'Área de jantar sob toldo transparente'],
      [E + 'casamento-alameda-figueira-carol-e-rodrigo-08.webp', 'Bar e lounge para confraternização ao ar livre'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-05.webp', 'Ambiente de festa à noite para eventos de empresa'],
    ],
    faq: [
      P_CAPACIDADE,
      { p: 'A empresa pode contratar o próprio buffet e equipe de som?', r: 'A empresa escolhe os fornecedores de decoração, som, palco e demais serviços. Para a gastronomia, a casa indica cinco fornecedores parceiros.' },
      { p: 'O espaço fica longe do aeroporto?', r: 'Não. O Aeroporto Salgado Filho fica a cerca de 15 km, uns 21 minutos de carro, com acesso pela BR-290.' },
      { p: 'Tem estacionamento?', r: 'Sim, com 200 vagas.' },
      P_VISITA,
    ],
    depoimentos: [],
  },

  'aniversarios-e-bodas': {
    titulo: 'Salão de Festas para Aniversários e Bodas em Cachoeirinha | Alameda Figueira',
    descricao: 'Salão de festas para aniversários e bodas em Cachoeirinha, Grande Porto Alegre. Casa, jardins e toldos para até 300 convidados.',
    h1: 'Salão de Festas para Aniversários e Bodas em Cachoeirinha',
    sub: 'Para celebrar uma data importante com a família e os amigos, na casa, nos jardins ou sob a figueira centenária.',
    capa: { src: E + 'casamento-alameda-figueira-mariana-e-guilherme-14.webp', alt: 'Mesas decoradas com flores sob os toldos para festa de aniversário' },
    tipo: 'aniversário ou bodas',
    texto: `
<h2>Aniversários e bodas com o cenário à altura da data</h2>
<p>Na Alameda Figueira Espaço de Eventos, em Cachoeirinha, aniversários e bodas acontecem em um espaço que une a casa, os jardins e os toldos. Para quem vai renovar os votos, a figueira centenária é o mesmo cenário onde muitos casais disseram o primeiro sim.</p>
<p>Trabalhamos com a locação do espaço, então a família monta a festa do seu jeito: escolhe a decoração, a música, o bolo e os demais fornecedores. Para a gastronomia, a casa indica cinco fornecedores parceiros, e não há taxa de rolha para vinhos e espumantes.</p>
<h3>Conforto para todas as idades</h3>
<p>A locação inclui mobiliário para 200 convidados, sonorização e iluminação, 4 toldos com 400 m² de cobertura, gerador de 115 kVA e equipe de segurança, higiene e brigada. O estacionamento tem 200 vagas.</p>
<p>O espaço fica perto de Porto Alegre, Canoas e Gravataí, com acesso pela BR-290.</p>`,
    galeria: [
      [I + '04.webp', 'Mesa posta para jantar de aniversário no salão da casa'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-15.webp', 'Lounge decorado sob os toldos da Alameda Figueira'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-06.webp', 'Mesa longa decorada para celebração em família'],
      [E + 'casamento-alameda-figueira-carol-e-rodrigo-15.webp', 'Mesas postas sob toldo transparente com vista para o jardim'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-12.webp', 'Ambiente interno decorado com flores e luzes'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-25.webp', 'Figueira centenária iluminada à noite para festa de bodas'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-07.webp', 'Mesa de jantar decorada com flores e velas'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-03.webp', 'Lounge com sofás na entrada da casa'],
    ],
    faq: [
      P_CAPACIDADE,
      P_FORNECEDORES,
      { p: 'É possível renovar os votos sob a figueira?', r: 'Sim. A cerimônia de renovação de votos pode ser montada no jardim, sob a figueira centenária, com a festa no mesmo espaço.' },
      P_CHUVA,
      P_VISITA,
    ],
    depoimentos: [],
  },

  formaturas: {
    pendente: 'A Alameda faz festas de formatura? Esta página só vai ao ar com essa confirmação.',
    titulo: 'Espaço para Festa de Formatura em Cachoeirinha | Alameda Figueira',
    descricao: 'Espaço para festa e jantar de formatura em Cachoeirinha, Grande Porto Alegre. Para até 300 convidados, com toldos, pista e 200 vagas de estacionamento.',
    h1: 'Espaço para Festa de Formatura em Cachoeirinha',
    sub: 'Jantar e festa de formatura para a turma e as famílias, em um espaço amplo na Grande Porto Alegre.',
    capa: { src: E + 'casamento-alameda-figueira-pietra-e-ruan-08.webp', alt: 'Ambiente de festa à noite com luzes e lounge na Alameda Figueira' },
    tipo: 'formatura',
    texto: `
<h2>A comemoração da turma em um só lugar</h2>
<p>A Alameda Figueira Espaço de Eventos, em Cachoeirinha, recebe jantares e festas de formatura em um espaço que une casa, jardins e toldos com 400 m² de cobertura. A turma e as famílias ficam juntas, com área para jantar, lounge e pista de dança.</p>
<p>Trabalhamos com a locação do espaço. A comissão de formatura escolhe os fornecedores de decoração, som, iluminação de pista e gastronomia, com a indicação de cinco fornecedores parceiros pela casa.</p>
<h3>Estrutura para um evento grande</h3>
<p>O espaço comporta até 300 convidados. A locação inclui mobiliário para 200 pessoas, gerador de 115 kVA e equipe de segurança, higiene e brigada. O estacionamento tem 200 vagas, e o acesso é pela BR-290, perto de Porto Alegre, Canoas e Gravataí.</p>`,
    galeria: [
      [E + 'casamento-alameda-figueira-pietra-e-ruan-09.webp', 'Mesas de jantar sob toldo iluminado à noite'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-04.webp', 'Pista e área de festa iluminadas'],
      [E + 'casamento-alameda-figueira-glenda-e-cesar-05.webp', 'Ambiente de festa à noite na Alameda Figueira'],
      [E + 'casamento-alameda-figueira-mariana-e-guilherme-23.webp', 'Toldos iluminados à noite no jardim'],
      [E + 'casamento-alameda-figueira-carol-e-rodrigo-02.webp', 'Bar decorado para festa'],
      [I + '01.webp', 'Salão interno da casa para jantar'],
    ],
    faq: [P_CAPACIDADE, P_FORNECEDORES, P_CHUVA, P_VISITA],
    depoimentos: [],
  },
}

// Página de perguntas frequentes
export const FAQ_GERAL = [
  P_CAPACIDADE,
  { p: 'O que está incluído na locação?', r: 'A casa com 2 suítes para a produção, mobiliário para 200 convidados (20 mesas de 10 lugares e 200 cadeiras), bancos e aparadores para a cerimônia, mobiliário de jardim, 4 toldos com 400 m², gerador de 115 kVA, sonorização e iluminação, e equipe de 4 seguranças, 2 higienistas e 1 brigadista.' },
  { p: 'Vocês trabalham com pacote fechado?', r: 'Não. Trabalhamos com a locação do espaço. Você recebe a casa e os jardins com estrutura, mobiliário e equipe, e escolhe os fornecedores do seu evento.' },
  P_FORNECEDORES,
  { p: 'Posso levar buffet próprio?', r: conf('se é permitido contratar um buffet de fora dos 5 parceiros indicados pela casa'), pendente: true },
  { p: 'Posso levar meu DJ ou banda?', r: 'Sim. A casa oferece sonorização e iluminação, mas você pode levar seu DJ ou banda se preferir.' },
  P_CHUVA,
  { p: 'Tem estacionamento?', r: 'Sim, com 200 vagas.' },
  { p: 'O espaço tem acessibilidade?', r: conf('acesso para cadeirantes, rampas e banheiro adaptado'), pendente: true },
  { p: 'Até que horas o evento pode ir?', r: conf('horário limite de encerramento dos eventos'), pendente: true },
  P_VISITA,
  { p: 'Com quanto tempo de antecedência devo reservar?', r: conf('antecedência recomendada para reservar a data'), pendente: true },
  { p: 'Quais são as formas de pagamento?', r: conf('formas de pagamento e parcelamento'), pendente: true },
  { p: 'Onde fica a Alameda Figueira?', r: 'Na Estrada Antônio José do Nascimento, 1175, Distrito Industrial, Cachoeirinha – RS, CEP 94930-090. O acesso é pela BR-290, a cerca de 21 minutos do centro de Porto Alegre.' },
]
