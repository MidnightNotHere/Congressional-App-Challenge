/* =========================================================================
   Quantum4Colorado — shared data layer: For Representatives
   Single source of truth for the state investment-gap comparison (table
   and chart) and the 4 policy recommendation cards shown in the
   Representatives / Policy section on both platforms.

   Bilingual (Phase 4, Representatives pass — lowest priority). Official
   institution/legislation names (Illinois Quantum Act, University of
   Maryland, IBM Quantum Campus) are kept in their original English form
   even in the Spanish text, matching standard practice for foreign
   proper nouns. INVESTMENT_CHART's `note` field isn't rendered by either
   app (dead data, kept for a possible future tooltip) so it's left as a
   plain string rather than spending translation effort on invisible text.
   ========================================================================= */

/* Chart-friendly view of the investment gap (numeric `amount` in $M) for
   the web app's Recharts bar chart and the mobile app's native bar chart. */
export const INVESTMENT_CHART = [
  { state: "Illinois", amount: 500, note: "Illinois quantum campus (2024)" },
  { state: "New York", amount: 200, note: "IBM Quantum Campus" },
  { state: "California", amount: 200, note: "Research expansion" },
  { state: "Colorado", amount: 74, note: "HB24-1325 quantum tax credits (2024)" },
];

/* Same comparison, formatted for the table layout. */
export const INVESTMENT_TABLE = [
  {
    state: "Illinois",
    initiative: { en: "Quantum campus investment", es: "Inversión en campus cuántico" },
    investment: {
      en: "$500M committed",
      es: "$500 millones comprometidos",
    },
    year: "2024",
  },
  {
    state: "New York",
    initiative: "IBM Quantum Campus",
    investment: { en: "$200M committed", es: "$200 millones comprometidos" },
    year: "2022",
  },
  {
    state: "California",
    initiative: {
      en: "Quantum computing research expansion",
      es: "Expansión de la investigación en computación cuántica",
    },
    investment: { en: "$200M+ state funding", es: "Más de $200 millones en financiamiento estatal" },
    year: "2022",
  },
  {
    state: "Maryland",
    initiative: {
      en: "University of Maryland + NIST partnership",
      es: "Alianza entre University of Maryland y NIST",
    },
    investment: { en: "Federal + state coordination", es: "Coordinación federal y estatal" },
    year: { en: "Ongoing", es: "En curso" },
  },
  {
    state: "Colorado",
    initiative: {
      en: "HB24-1325 Quantum Tax Credits (bipartisan)",
      es: "HB24-1325, Créditos Fiscales Cuánticos (bipartidista)",
    },
    investment: {
      en: "$74M in refundable tax credits",
      es: "$74 millones en créditos fiscales reembolsables",
    },
    year: "2024",
    highlight: true,
  },
];

export const RECOMMENDATIONS = [
  {
    title: {
      en: "Establish a Colorado Quantum Economic Development Initiative",
      es: "Establecer una Iniciativa de Desarrollo Económico Cuántico de Colorado",
    },
    rationale: {
      en: "Pair Colorado's existing federal infrastructure (NIST, JILA, NREL) with a coordinated state strategy to attract quantum companies and keep talent here. HB24-1325's $74M in quantum tax credits was a strong first step. What is still missing is the broader initiative to connect that funding to the federal assets already in place.",
      es: "Combinar la infraestructura federal que Colorado ya tiene (NIST, JILA, NREL) con una estrategia estatal coordinada para atraer empresas cuánticas y retener talento. Los $74 millones en créditos fiscales cuánticos de la HB24-1325 fueron un primer paso importante. Lo que aún falta es la iniciativa más amplia que conecte ese financiamiento con los activos federales ya existentes.",
    },
    precedent: {
      en: "Modeled on the Illinois Quantum Act (2023).",
      es: "Basado en la Ley Cuántica de Illinois (2023).",
    },
    impact: {
      en: "Company formation, high-wage job creation, and national quantum leadership built on assets Colorado already owns.",
      es: "Formación de empresas, creación de empleos bien remunerados, y liderazgo cuántico nacional construido sobre activos que Colorado ya posee.",
    },
  },
  {
    title: {
      en: "Create a Colorado Post-Quantum Cybersecurity Task Force",
      es: "Crear un Grupo de Trabajo de Ciberseguridad Poscuántica de Colorado",
    },
    rationale: {
      en: "Convene NIST Boulder researchers, state agency CIOs, and private-sector representatives to develop a Colorado-specific PQC migration timeline for state agencies and critical infrastructure.",
      es: "Convocar a investigadores de NIST Boulder, directores de tecnología de agencias estatales, y representantes del sector privado para desarrollar un cronograma de migración a PQC específico para Colorado, dirigido a las agencias estatales y la infraestructura crítica.",
    },
    precedent: {
      en: "Federal CISA post-quantum readiness efforts adapted to the state level.",
      es: "Los esfuerzos federales de preparación poscuántica de CISA, adaptados al nivel estatal.",
    },
    impact: {
      en: "A clear, coordinated migration path that protects resident data and state systems ahead of federal mandates.",
      es: "Una ruta de migración clara y coordinada que protege los datos de los residentes y los sistemas estatales antes de que entren en vigor los mandatos federales.",
    },
  },
  {
    title: {
      en: "Fund a Quantum Workforce Pipeline at Colorado Universities",
      es: "Financiar una Cantera de Talento Cuántico en las Universidades de Colorado",
    },
    rationale: {
      en: "Partner with CU Boulder, Colorado School of Mines, and Colorado State University to establish dedicated quantum computing degree programs and industry partnerships.",
      es: "Asociarse con CU Boulder, Colorado School of Mines y Colorado State University para establecer programas de grado dedicados a la computación cuántica y alianzas con la industria.",
    },
    precedent: {
      en: "State-funded talent pipelines tied to advanced-industry employers in other states.",
      es: "Canteras de talento financiadas por el estado y vinculadas a empleadores de industrias avanzadas en otros estados.",
    },
    impact: {
      en: "A homegrown talent supply that keeps quantum graduates in Colorado, along with the companies that hire them.",
      es: "Una fuente local de talento que mantiene en Colorado a los graduados en computación cuántica, junto con las empresas que los contratan.",
    },
  },
  {
    title: {
      en: "Establish Colorado as a Quantum-Secure State Government",
      es: "Establecer a Colorado como un Gobierno Estatal Seguro Frente a la Computación Cuántica",
    },
    rationale: {
      en: "Set a state target to begin PQC migration of all state agency systems by 2027, making Colorado the first state to formally commit to quantum-safe government infrastructure.",
      es: "Establecer una meta estatal para comenzar la migración a PQC de todos los sistemas de las agencias estatales antes de 2027, convirtiendo a Colorado en el primer estado en comprometerse formalmente con una infraestructura gubernamental segura frente a la computación cuántica.",
    },
    precedent: {
      en: "Federal quantum-safe migration mandates for U.S. agencies, applied at the state level.",
      es: "Los mandatos federales de migración segura frente a la computación cuántica para las agencias de EE. UU., aplicados a nivel estatal.",
    },
    impact: {
      en: "National recognition as a first-mover, plus concrete protection for the data of every Coloradan.",
      es: "Reconocimiento nacional como pionero, además de protección concreta para los datos de cada habitante de Colorado.",
    },
  },
];
