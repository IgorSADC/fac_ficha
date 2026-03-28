// Essences configuration for calculating base cost
const essencesConfig = [
  {
    id: "dano",
    name: "Dano",
    essences: [
      {
        id: "vi",
        name: "Vi",
        cost: 1,
        dice: "2d4",
        info: "Dano físico. Sangramento 1. Impulso"
      },
      {
        id: "igni",
        name: "Igni",
        cost: 3,
        dice: "2d6",
        info: "Dano flamejante/eletrico. Eletrocutado 1. Incendiado 2. Aquecer 1. Brilho 1.",
      },
      { id: "pul", name: "Pul", cost: 3, dice: "2d10", info: "Estrondo/Físico. Sangramento 2. Acelerar 1. Rojão." },
      { id: "verum", name: "Verum", cost: 4, dice: "3d6", info: "Dano Puro. Demolor. Esmaecer." },
      { id: "ang", name: "Ang", cost: 6, info: "Dano ácido, elétrico, flamejante ou gélido. Eletrocutado 1. Incendiado 3. Aquecer 2. Brilho 2. Resfriar" },
    ],
  },
  {
    id: "estrutural",
    name: "Estrutural",
    essences: [
      { id: "glaci", name: "Glaci", cost: 2, dice: "1d6", info: "Dano Gélido. Congelado 1. Lento 2. Estrutura água/gelo. Criar 1 água" },
      { id: "pavi", name: "Pavi", cost: 3, dice: "1d6", info: "Dano ácido. Envenenado 1. Paralisado 2. Estrutura terra. Criar 1 terra.  Florescer" },
      { id: "celun", name: "Celun", cost: 4, dice: "2d6", info: "Dano físico. Alado 1. Sangramento 2. Estrutura vento. Acelerar 2. Arrefecer." },
      { id: "hilai", name: "Hilai", cost: 2, info: "Alterar dano. Estrutura cristal. Alterar 1. Alterar 2." },
      { id: "entor", name: "Entor", cost: 6, dice: "3d6", info: "Dano físico. Fortificado 5. Estrutura metal. Criar 1 Metal. Defender" },
    ],
  },
  {
    id: "mecanico",
    name: "Mecânico",
    essences: [
      { id: "for", name: "For", cost: 1, info: "Imbuir. Consertar 1. Moldar." },
      { id: "dyn", name: "Dyn", cost: 4, info: "Dinâmica 1. Direcionar" },
      { id: "ker", name: "Ker", cost: 2, info: "Golemancia. Consertar 2. Transportar 1" },
      { id: "cla", name: "Cla", cost: 2, info: 'Dinâmica 2. Projetar. Transportar 2.' },
      { id: "spa", name: "Spa", cost: 3, info: "Espaço. Ativar. Portal." },
    ],
  },
  {
    id: "mental",
    name: "Mental",
    essences: [
      { id: "aeko", name: "Aeko", cost: 1, info: "Inspirado 1. Eco 1. Perfurme 1. Miragem 1." },
      { id: "cogi", name: "Cogi", cost: 3, info: "Invisivel. Moral +- 1. Paralisado 1. Imagem" },
      { id: "su", name: "Su", cost: 2, info: "Confusao 1. Hipnotsado 1. Inspirado 2. Encantar. Memórias 1." },
      { id: "ego", name: "Ego", cost: 2, info: "Atento 2. Medo 1. Tempo longo. Memórias 2." },
      { id: "rellus", name: "Rellus", cost: 3, info: "Frenesi 1. Honrado 1. Contato. Eco 2. Miragem 2. Perfume 2." },
    ],
  },
  {
    id: "corporeo",
    name: "Corpóreo",
    essences: [
      { id: "frig", name: "Frig", cost: 3, dice: "2d4", info: "Dano físico ou necrótico. Congelado 1. Lento 2. Maquiagem." },
      { id: "sonse", name: "Sonse", cost: 2, info: "Cego 1. Envenenado 1. Paralisado 2. Médico." },
      { id: "contra", name: "Contra", cost: 3, dice: "1d8", info: "Cura. Fraco 1. Sensível 3. Vulnerável 1. Estabilizar." },
      { id: "mat", name: "Mat", cost: 4, info: "Decompondo 1. Sangramento 5. Ressucitar. Medium." },
      { id: "necro", name: "necro", cost: 5, dice: "3d6", info: "Dano necrótico. Atordoado 1. Fraco 2. Vulnerável 3. Estrutura carne. Criar 2 carne." },
    ],
  },
  {
    id: "suporte",
    name: "Suporte",
    essences: [
      { id: "vitas", name: "Vitas", cost: 2, dice: "2d4", info: "Cura. Envenenado -1. Sangramento -1. Detectar. Tratar" },
      { id: "phyla", name: "Phyla", cost: 2, dice: "1d6", info: "Cura. Fortificado 2. Lento -1. Paralisado -1. Estrutura radiância. Brilho 1. Acalentar." },
      { id: "puri", name: "Puri", cost: 4, dice: "2d8", info: "Dano radiante. Congelado -1. Eletrocutado -1. Fraco -1. Incendiado -2. Estabilizar." },
      { id: "egis", name: "Egis", cost: 4, info: "Confusao -2. Decompondo -1. Medo -1. Precavido 1. Tempo curto. Cicatrizar." },
      { id: "bene", name: "Bene", cost: 8, dice: "2d10", info: "Cura. Dano Radiante. Imortal 1. Sangramento -5. Benção. Ascender. Entropia." },
    ],
  },
];

// Hemisphere proximity configuration for calculating modifiers
const hemisphereProximity = {
  energetico: {
    close: ["morte", "ilusorio"],
  },
  material: {
    close: ["conjurador", "vida"],
  },
  ilusorio: {
    close: ["morte", "energetico"],
  },
  conjurador: {
    close: ["material", "vida"],
  },
  vida: {
    close: ["material", "conjurador"],
  },
  morte: {
    close: ["ilusorio", "energetico"],
  },
};

// Default component fields configuration for the magic creation system
const defaultComponentFieldsConfig = [
  {
    id: "duration",
    title: "Duração",
    description: "Tempo de duração do efeito",
    required: true,
    options: [
      { id: "1_turno", name: "1 turno", costModifier: 1.0 },
      { id: "2_turno", name: "2 turnos", costModifier: 1.3 },
      { id: "4_turno", name: "4 turnos", costModifier: 1.6 },

      // Egis
      { id: "6_turno", name: "6 turnos", costModifier: 1.0 },
      { id: "8_turno", name: "8 turnos", costModifier: 1.3 },
      { id: "10_turno", name: "10 turnos", costModifier: 1.6 },

      // Ego
      { id: "1_hour", name: "1 hora", costModifier: 1.0 },
      { id: "12_hour", name: "12 horas", costModifier: 1.5 },
      { id: "1_day", name: "Até 1 dia", costModifier: 2.0 },
      { id: "7_days", name: "Até 7 dias", costModifier: 3.0 },
      { id: "1_month", name: "Até 1 mês", costModifier: 4.0 },

      // Bene
      { id: "eterno", name: "Eterno", costModifier: 1.0 },
    ],
  },
  {
    id: "target",
    title: "Alvo",
    description: "Alvos da magia",
    required: true,
    options: [
      { id: "1_target", name: "1 alvo",         costModifier: 1.0 },
      { id: "3_targets", name: "Até 3 alvos",   costModifier: 1.6 },
      { id: "6_targets", name: "Até 6 alvos",   costModifier: 1.9 },
      { id: "9_targets", name: "Até 9 alvos",   costModifier: 2.2 },
      { id: "12_targets", name: "Até 12 alvos", costModifier: 2.5 },
      { id: "15_targets", name: "Até 15 alvos", costModifier: 2.8 },
      { id: "18_targets", name: "Até 18 alvos", costModifier: 3.1 },
      { id: "24_targets", name: "Até 24 alvos", costModifier: 3.4 },
      { id: "30_targets", name: "Até 30 alvos", costModifier: 4.0 },
    ],
  },
  {
    id: "distance",
    title: "Distância",
    description: "Distância da magia",
    required: true,
    options: [
      { id: "self_touch", name: "Self/Toque",       costModifier: 1.0 },
      { id: "5_meters", name: "Até 5 metros",       costModifier: 1.1 },
      { id: "10_meters", name: "Até 10 metros",     costModifier: 1.2 },
      { id: "15_meters", name: "Até 15 metros",     costModifier: 1.3 },
      { id: "20_meters", name: "Até 20 metros",     costModifier: 1.4 },
      { id: "30_meters", name: "Até 30 metros",     costModifier: 1.5 },
      { id: "40_meters", name: "Até 40 metros",     costModifier: 1.75 },
      { id: "50_meters", name: "Até 50 metros",     costModifier: 2.0 },
      { id: "100_meters", name: "Até 100 metros",   costModifier: 2.5 },
      { id: "500_meters", name: "Até 500 metros",   costModifier: 5.0 },
      { id: "10_km", name: "Até 10 Km",             costModifier: 10.0 },
    ],
  },
  {
    id: "area",
    title: "Área",
    description: "Área de efeito da magia",
    required: true,
    options: [
      { id: "point", name: "Pontual", costModifier: 1.0 },
      { id: "1_m",   name: "Ate 1 metro",    costModifier: 1.3, description: "Tenda" },
      { id: "2_m2",  name: "Até 2 metros",   costModifier: 1.4, description: "Banheiro" },
      { id: "3_m2",  name: "Até 3 metros",   costModifier: 1.5, description: "Quarto" },
      { id: "6_m2",  name: "Até 6 metros",   costModifier: 1.0, description: "Exige essência de SPA" },
      { id: "9_m2",  name: "Até 9 metros",   costModifier: 1.3, description: "Casebre" },
      { id: "12_m2", name: "Até 12 metros",  costModifier: 1.6, description: "Casa" },
      { id: "20_m2", name: "Até 20 metros",  costModifier: 2.0, description: "Casarão" },
      { id: "60_m2", name: "Até 60 metros",  costModifier: 3.0, description: "Mansão" },
      { id: "120_m2", name: "Até 120 metros", costModifier: 3.5, description: "Catedral" },
      { id: "240_m2", name: "Até 240 metros", costModifier: 4.0, description: "Castelo" },
      { id: "500_m2", name: "Até 500 metros", costModifier: 4.5, description: "Palácio" },
      { id: "1_km",   name: "Até 1 Km",       costModifier: 5.0, description: "Distrito" },
    ],
  },
  {
    id: "areaType",
    title: "Tipo de Área",
    description: "Tipo de área da magia",
    required: true,
    options: [
      { id: "grupal",   name: "Grupal",   costModifier: 1.0 },
      { id: "seletivo", name: "Seletivo", costModifier: 4.0 },
    ],
  },
  {
    id: "concentracao",
    title: "Concentração",
    description: "Nível de concentração necessário para a magia",
    required: true,
    options: [
      { id: "baixa",   name: "Instantâneo", costModifier: 1.4 },
      { id: "moderado", name: "Moderado",   costModifier: 1.0 },
      { id: "pesado",   name: "Pesado",     costModifier: 0.8 },
    ],
  },
  {
    id: "condicionais",
    title: "Condicionais",
    description: "Condições adicionais para a magia",
    required: false,
    options: [
      { id: "ser_atacado",             name: "Ser atacado pelo alvo",          costModifier: 1.0 },
      { id: "ser_o_alvo",              name: "Ser o alvo de uma magia hostil", costModifier: 1.3 },
      { id: "receber_condicao",        name: "Receber uma condição",           costModifier: 1.3 },
      { id: "aliado_receber_condicao", name: "Aliado receber uma condição",    costModifier: 1.5 },
      { id: "aliado_receber_dano",     name: "Aliado receber dano",            costModifier: 1.5 },
      { id: "inimigo_errar_ataque",    name: "Inimigo errar um ataque",        costModifier: 1.0 },
      { id: "surgir_novo_inimigo",     name: "Surgir novo inimigo",            costModifier: 1.2 },
    ],
  },
];
