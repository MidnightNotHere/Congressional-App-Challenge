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
  { state: "Illinois", amount: 500, note: "Illinois Quantum Act + campus" },
  { state: "New York", amount: 200, note: "IBM Quantum Campus" },
  { state: "California", amount: 200, note: "Research expansion" },
  { state: "Colorado", amount: 0, note: "No coordinated state initiative" },
];

/* Same comparison, formatted for the table layout. */
export const INVESTMENT_TABLE = [
  {
    state: "Illinois",
    initiative: { en: "Illinois Quantum Act", es: "Ley Cuántica de Illinois" },
    investment: {
      en: "State-dedicated funding + quantum campus",
      es: "Financiamiento estatal dedicado + campus cuántico",
    },
    year: "2023",
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
    initiative: { en: "No coordinated state initiative", es: "Sin iniciativa estatal coordinada" },
    investment: { en: "Federal infrastructure only", es: "Solo infraestructura federal" },
    year: "—",
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
      en: "Coordinate Colorado's existing federal infrastructure (NIST, JILA, NREL) with state economic development funding to attract quantum companies and retain talent. The pieces already exist — what is missing is a coordinating strategy and dedicated state investment.",
      es: "Coordinar la infraestructura federal existente de Colorado (NIST, JILA, NREL) con financiamiento estatal de desarrollo económico para atraer empresas cuánticas y retener talento. Las piezas ya existen — lo que falta es una estrategia de coordinación y una inversión estatal dedicada.",
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
      en: "A homegrown talent supply that keeps quantum graduates — and the companies that hire them — in Colorado.",
      es: "Una fuente local de talento que mantiene a los graduados en computación cuántica — y a las empresas que los contratan — en Colorado.",
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
