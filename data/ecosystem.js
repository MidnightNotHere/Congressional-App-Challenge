/* =========================================================================
   Quantum4Colorado — shared data layer: Colorado's Quantum Story
   Single source of truth for the web app (Quantum4Colorado.jsx) and the
   mobile app (mobile/src/screens/StoryScreen.js, RepsScreen.js).

   Icons are referenced by string name (not component reference) so this
   file has zero dependency on either "lucide-react" (web) or
   "lucide-react-native" (mobile) — each platform resolves the string
   through its own local icon registry (see Quantum4Colorado.jsx's
   ICON_REGISTRY and mobile/src/components/Icon.js).

   Bilingual (Phase 4): HERO_STATS, EXPLAINER_CARDS, ECOSYSTEM_TABS,
   STRENGTHS, and GAPS are fully { en, es } — the Story-section content,
   3rd priority per the Phase 4 plan. DETAILED_ECOSYSTEM and SOURCES
   belong to the Representatives section (lowest priority, "if time
   allows") and are still English-only; pick() passes plain strings
   through unchanged so nothing breaks in the meantime. Organization
   names and "City, CO" locations are proper nouns and stay untranslated
   in both languages.
   ========================================================================= */

export const HERO_STATS = [
  {
    value: "$800M+",
    label: {
      en: "Federal quantum investment in Colorado",
      es: "Inversión federal en computación cuántica en Colorado",
    },
  },
  {
    value: "140+",
    label: {
      en: "Quantum researchers across CU Boulder and Colorado institutions",
      es: "Investigadores cuánticos en CU Boulder e instituciones de Colorado",
    },
  },
  {
    value: "#1",
    label: {
      en: "Colorado's ranking in quantum workforce development infrastructure",
      es: "Clasificación de Colorado en infraestructura de desarrollo de la fuerza laboral cuántica",
    },
  },
];

export const EXPLAINER_CARDS = [
  {
    icon: "Lock",
    title: { en: "The Problem With Today's Computers", es: "El Problema con las Computadoras de Hoy" },
    body: {
      en: "Today's computers solve problems one step at a time. Quantum computers can explore millions of possibilities simultaneously — like checking every path through a maze at once instead of trying them one by one.",
      es: "Las computadoras actuales resuelven problemas un paso a la vez. Las computadoras cuánticas pueden explorar millones de posibilidades simultáneamente — como revisar cada camino de un laberinto a la vez en lugar de probarlos uno por uno.",
    },
  },
  {
    icon: "Shield",
    title: { en: "Why It Changes Everything", es: "Por Qué Lo Cambia Todo" },
    body: {
      en: "Quantum computers will eventually be able to break the encryption protecting your bank account, medical records, and government systems. They will also create unbreakable new encryption — the race to get there first is already underway.",
      es: "Las computadoras cuánticas eventualmente podrán romper el cifrado que protege su cuenta bancaria, sus historiales médicos y los sistemas gubernamentales. También crearán un nuevo cifrado irrompible — la carrera por llegar primero ya está en marcha.",
    },
  },
  {
    icon: "MapPin",
    title: { en: "Why Colorado Is Leading", es: "Por Qué Colorado Está Liderando" },
    body: {
      en: "Colorado hosts NIST Boulder — the federal agency setting the world's post-quantum security standards — plus JILA, one of the planet's premier quantum physics institutes. No other state has this combination of federal and academic quantum infrastructure.",
      es: "Colorado alberga a NIST Boulder — la agencia federal que establece los estándares mundiales de seguridad poscuántica — además de JILA, uno de los institutos de física cuántica más prestigiosos del planeta. Ningún otro estado tiene esta combinación de infraestructura cuántica federal y académica.",
    },
  },
];

const STATEWIDE = { en: "Statewide", es: "A nivel estatal" };

/* Section 1's tabbed ecosystem map. `shortLabel` is used where mobile's
   horizontal tab-pill scroller doesn't have room for the full label. */
export const ECOSYSTEM_TABS = [
  {
    id: "federal",
    label: { en: "Federal Facilities", es: "Instalaciones Federales" },
    shortLabel: { en: "Federal", es: "Federal" },
    icon: "Landmark",
    color: "#1B3A6B",
    orgs: [
      {
        name: "NIST Boulder Laboratories",
        location: "Boulder, CO",
        role: { en: "Sets US post-quantum cryptography standards.", es: "Establece los estándares de criptografía poscuántica de EE. UU." },
        significance: {
          en: "PQC standards finalized here in 2024 are the foundation of national quantum security policy.",
          es: "Los estándares de PQC finalizados aquí en 2024 son la base de la política nacional de seguridad cuántica.",
        },
        source: "https://csrc.nist.gov/projects/post-quantum-cryptography",
      },
      {
        name: "National Renewable Energy Laboratory (NREL)",
        location: "Golden, CO",
        role: { en: "Quantum computing applications for energy systems.", es: "Aplicaciones de computación cuántica para sistemas de energía." },
        significance: {
          en: "Connects Colorado's quantum capacity to the future of the national power grid.",
          es: "Conecta la capacidad cuántica de Colorado con el futuro de la red eléctrica nacional.",
        },
        source: "https://www.nrel.gov",
      },
      {
        name: "Rocky Mountain Regional Cyber Center",
        location: "Colorado",
        role: { en: "Supporting federal quantum security coordination.", es: "Apoya la coordinación federal de seguridad cuántica." },
        significance: {
          en: "Regional hub linking Colorado institutions to federal cybersecurity efforts.",
          es: "Centro regional que vincula a las instituciones de Colorado con los esfuerzos federales de ciberseguridad.",
        },
      },
    ],
  },
  {
    id: "university",
    label: { en: "University Research", es: "Investigación Universitaria" },
    shortLabel: { en: "University", es: "Universidad" },
    icon: "GraduationCap",
    color: "#2E7D52",
    orgs: [
      {
        name: "JILA at CU Boulder",
        location: "Boulder, CO",
        role: {
          en: "World-class quantum physics research institute, a joint CU Boulder / NIST program. 140+ researchers.",
          es: "Instituto de investigación en física cuántica de clase mundial, un programa conjunto de CU Boulder y NIST. Más de 140 investigadores.",
        },
        significance: {
          en: "Consistently ranked among the top quantum physics institutes in the world.",
          es: "Clasificado constantemente entre los mejores institutos de física cuántica del mundo.",
        },
        source: "https://jila.colorado.edu",
      },
      {
        name: "CU Boulder Quantum Initiative",
        location: "Boulder, CO",
        role: {
          en: "Undergraduate and graduate quantum research programs, with multiple active quantum computing labs.",
          es: "Programas de investigación cuántica de pregrado y posgrado, con múltiples laboratorios activos de computación cuántica.",
        },
        significance: {
          en: "The talent pipeline feeding national labs and Colorado's quantum companies.",
          es: "La cantera de talento que alimenta a los laboratorios nacionales y a las empresas cuánticas de Colorado.",
        },
        source: "https://www.colorado.edu/physics",
      },
      {
        name: "Colorado School of Mines",
        location: "Golden, CO",
        role: { en: "Quantum materials research programs.", es: "Programas de investigación de materiales cuánticos." },
        significance: {
          en: "Builds the foundational materials science that quantum hardware depends on.",
          es: "Desarrolla la ciencia de materiales fundamental de la que depende el hardware cuántico.",
        },
        source: "https://www.mines.edu",
      },
      {
        name: "Colorado State University",
        location: "Fort Collins, CO",
        role: { en: "Quantum sensing and photonics research.", es: "Investigación en detección cuántica y fotónica." },
        significance: {
          en: "Extends Colorado's quantum strength beyond the Front Range corridor.",
          es: "Extiende la fortaleza cuántica de Colorado más allá del corredor de Front Range.",
        },
        source: "https://www.colostate.edu",
      },
    ],
  },
  {
    id: "industry",
    label: { en: "Industry", es: "Industria" },
    shortLabel: { en: "Industry", es: "Industria" },
    icon: "Cpu",
    color: "#C4872A",
    orgs: [
      {
        name: "Quantinuum",
        location: "Broomfield, CO",
        role: {
          en: "Quantum computing hardware and software — one of the world's leading quantum computing companies, headquartered in Colorado.",
          es: "Hardware y software de computación cuántica — una de las empresas de computación cuántica líderes del mundo, con sede en Colorado.",
        },
        significance: {
          en: "A globally significant quantum company chose Colorado as its home base.",
          es: "Una empresa cuántica de importancia mundial eligió a Colorado como su sede.",
        },
        source: "https://www.quantinuum.com",
      },
      {
        name: "Ball Aerospace",
        location: "Broomfield, CO",
        role: { en: "Quantum sensing applications for defense and space.", es: "Aplicaciones de detección cuántica para defensa y el espacio." },
        significance: {
          en: "Applies quantum technology to Colorado's large aerospace economy.",
          es: "Aplica tecnología cuántica a la gran economía aeroespacial de Colorado.",
        },
      },
      {
        name: "Lockheed Martin",
        location: "Littleton, CO",
        role: { en: "Quantum computing research for defense applications.", es: "Investigación en computación cuántica para aplicaciones de defensa." },
        significance: {
          en: "Anchors quantum work within one of Colorado's largest employers.",
          es: "Ancla el trabajo cuántico dentro de uno de los mayores empleadores de Colorado.",
        },
      },
      {
        name: "Raytheon Technologies",
        location: "Aurora, CO",
        role: { en: "Quantum cryptography applications for defense systems.", es: "Aplicaciones de criptografía cuántica para sistemas de defensa." },
        significance: {
          en: "Brings quantum-secure communications research to the CO-06 region.",
          es: "Trae investigación en comunicaciones seguras cuánticas a la región CO-06.",
        },
      },
    ],
  },
  {
    id: "policy",
    label: { en: "Policy & Economic Development", es: "Política y Desarrollo Económico" },
    shortLabel: { en: "Policy", es: "Política" },
    icon: "Building2",
    color: "#6B46C1",
    orgs: [
      {
        name: "Colorado Quantum Network (CQN)",
        location: STATEWIDE,
        role: {
          en: "Consortium of Colorado quantum researchers and industry partners advocating for state quantum investment.",
          es: "Consorcio de investigadores cuánticos y socios de la industria de Colorado que abogan por la inversión estatal en tecnología cuántica.",
        },
        significance: {
          en: "The closest thing Colorado has to a coordinated quantum strategy today.",
          es: "Lo más parecido que tiene Colorado hoy a una estrategia cuántica coordinada.",
        },
        source: "https://coloradoquantum.org",
      },
      {
        name:
          "Colorado Office of Economic Development & International Trade (OEDIT)",
        location: "Denver, CO",
        role: {
          en: "Advanced Industries program covering the quantum technology sector.",
          es: "Programa de Industrias Avanzadas que cubre el sector de tecnología cuántica.",
        },
        significance: {
          en: "The state agency best positioned to lead a formal quantum initiative.",
          es: "La agencia estatal mejor posicionada para liderar una iniciativa cuántica formal.",
        },
        source: "https://oedit.colorado.gov",
      },
    ],
  },
];

export const STRENGTHS = [
  {
    en: "NIST Boulder: the only state with the federal PQC standard-setting body.",
    es: "NIST Boulder: el único estado con el organismo federal que establece los estándares de PQC.",
  },
  {
    en: "JILA: a top-5 quantum physics institute globally.",
    es: "JILA: uno de los 5 mejores institutos de física cuántica del mundo.",
  },
  {
    en: "Quantinuum headquarters: one of three leading quantum computing companies globally.",
    es: "Sede de Quantinuum: una de las tres empresas líderes en computación cuántica a nivel mundial.",
  },
  {
    en: "CU Boulder quantum workforce pipeline: feeds national labs and industry.",
    es: "Cantera de talento cuántico de CU Boulder: alimenta a laboratorios nacionales y a la industria.",
  },
];

export const GAPS = [
  {
    en: "Illinois passed the Illinois Quantum Act in 2023 with dedicated state funding.",
    es: "Illinois aprobó la Ley Cuántica de Illinois en 2023 con financiamiento estatal dedicado.",
  },
  {
    en: "New York committed $200M to a quantum campus at IBM's Hudson Valley site.",
    es: "Nueva York comprometió $200 millones para un campus cuántico en el sitio de IBM en Hudson Valley.",
  },
  {
    en: "Colorado has world-class federal and university infrastructure but no coordinated state quantum investment strategy.",
    es: "Colorado cuenta con infraestructura federal y universitaria de clase mundial, pero no tiene una estrategia estatal coordinada de inversión cuántica.",
  },
  {
    en: "Without state-level coordination, Colorado risks losing talent and companies to states with explicit quantum economic development programs.",
    es: "Sin coordinación a nivel estatal, Colorado corre el riesgo de perder talento y empresas ante estados con programas explícitos de desarrollo económico cuántico.",
  },
];

/* Section 3's expanded, legislative-facing ecosystem report (accordion).
   Same subject matter as ECOSYSTEM_TABS above, one level more detailed —
   focus areas, funding, employment, and connection-to-Colorado framing.
   Bilingual (Phase 4, Representatives pass — lowest priority). */
export const DETAILED_ECOSYSTEM = [
  {
    name: "NIST Boulder Laboratories",
    location: "Boulder, CO",
    focus: {
      en: "Post-quantum cryptography standards; quantum measurement science.",
      es: "Estándares de criptografía poscuántica; ciencia de medición cuántica.",
    },
    funding: {
      en: "Federal (U.S. Department of Commerce / NIST).",
      es: "Federal (Departamento de Comercio de EE. UU. / NIST).",
    },
    employment: {
      en: "Thousands of federal scientists and staff across NIST Boulder.",
      es: "Miles de científicos y personal federal en NIST Boulder.",
    },
    connection: {
      en: "NIST Boulder authored the post-quantum cryptography standards finalized in 2024 that now anchor national and global quantum security policy. No other state hosts the body that writes these rules.",
      es: "NIST Boulder redactó los estándares de criptografía poscuántica finalizados en 2024 que ahora son la base de la política de seguridad cuántica nacional y mundial. Ningún otro estado alberga al organismo que escribe estas reglas.",
    },
    source: "https://csrc.nist.gov/projects/post-quantum-cryptography",
  },
  {
    name: "JILA at CU Boulder",
    location: "Boulder, CO",
    focus: {
      en: "Quantum physics, atomic clocks, precision measurement, quantum sensing.",
      es: "Física cuántica, relojes atómicos, medición de precisión, detección cuántica.",
    },
    funding: {
      en: "Joint CU Boulder / NIST institute; federal and university support.",
      es: "Instituto conjunto de CU Boulder y NIST; con apoyo federal y universitario.",
    },
    employment: {
      en: "140+ researchers, plus graduate and postdoctoral scientists.",
      es: "Más de 140 investigadores, además de científicos de posgrado y posdoctorado.",
    },
    connection: {
      en: "JILA is consistently ranked among the world's premier quantum physics institutes and is a primary reason quantum talent and companies cluster in Colorado.",
      es: "JILA se clasifica constantemente entre los institutos de física cuántica más importantes del mundo, y es una de las principales razones por las que el talento y las empresas cuánticas se concentran en Colorado.",
    },
    source: "https://jila.colorado.edu",
  },
  {
    name: "Quantinuum",
    location: "Broomfield, CO",
    focus: {
      en: "Trapped-ion quantum computing hardware and quantum software.",
      es: "Hardware de computación cuántica de iones atrapados y software cuántico.",
    },
    funding: {
      en: "Private (formed from Honeywell Quantum Solutions and Cambridge Quantum).",
      es: "Privada (formada a partir de Honeywell Quantum Solutions y Cambridge Quantum).",
    },
    employment: {
      en: "Hundreds of employees across its Colorado operations.",
      es: "Cientos de empleados en sus operaciones en Colorado.",
    },
    connection: {
      en: "One of the world's leading quantum computing companies is headquartered in Colorado, giving the state a globally significant private-sector anchor.",
      es: "Una de las empresas de computación cuántica líderes del mundo tiene su sede en Colorado, lo que le da al estado un ancla del sector privado de importancia mundial.",
    },
    source: "https://www.quantinuum.com",
  },
  {
    name: "CU Boulder Quantum Initiative",
    location: "Boulder, CO",
    focus: {
      en: "Quantum information science research and education programs.",
      es: "Programas de investigación y educación en ciencias de la información cuántica.",
    },
    funding: {
      en: "University, federal grants, and industry partnerships.",
      es: "Financiamiento universitario, subvenciones federales y alianzas con la industria.",
    },
    employment: {
      en: "Faculty, research staff, and a large student population.",
      es: "Profesorado, personal de investigación y una gran población estudiantil.",
    },
    connection: {
      en: "Produces the steady supply of quantum-trained graduates that national labs and Colorado companies depend on.",
      es: "Produce el suministro constante de graduados con formación cuántica del que dependen los laboratorios nacionales y las empresas de Colorado.",
    },
    source: "https://www.colorado.edu/physics",
  },
  {
    name: "National Renewable Energy Laboratory (NREL)",
    location: "Golden, CO",
    focus: {
      en: "Quantum computing applications for energy systems and grid optimization.",
      es: "Aplicaciones de computación cuántica para sistemas de energía y optimización de la red eléctrica.",
    },
    funding: { en: "Federal (U.S. Department of Energy).", es: "Federal (Departamento de Energía de EE. UU.)." },
    employment: {
      en: "A large federal research workforce in Golden.",
      es: "Una gran fuerza laboral de investigación federal en Golden.",
    },
    connection: {
      en: "Links Colorado's quantum capability to national energy infrastructure and clean-energy leadership.",
      es: "Vincula la capacidad cuántica de Colorado con la infraestructura energética nacional y el liderazgo en energía limpia.",
    },
    source: "https://www.nrel.gov",
  },
  {
    name: "Colorado School of Mines",
    location: "Golden, CO",
    focus: {
      en: "Quantum materials and quantum engineering research.",
      es: "Investigación en materiales cuánticos e ingeniería cuántica.",
    },
    funding: {
      en: "University and federal research grants.",
      es: "Subvenciones de investigación universitarias y federales.",
    },
    employment: {
      en: "Faculty and graduate research programs.",
      es: "Profesorado y programas de investigación de posgrado.",
    },
    connection: {
      en: "Strengthens the materials-science foundation that quantum hardware development requires.",
      es: "Fortalece la base de ciencia de materiales que requiere el desarrollo de hardware cuántico.",
    },
    source: "https://www.mines.edu",
  },
  {
    name: "Colorado State University",
    location: "Fort Collins, CO",
    focus: { en: "Quantum sensing and photonics research.", es: "Investigación en detección cuántica y fotónica." },
    funding: {
      en: "University and federal research grants.",
      es: "Subvenciones de investigación universitarias y federales.",
    },
    employment: {
      en: "Faculty and graduate research programs.",
      es: "Profesorado y programas de investigación de posgrado.",
    },
    connection: {
      en: "Broadens Colorado's quantum strengths beyond the Boulder–Denver corridor into northern Colorado.",
      es: "Amplía las fortalezas cuánticas de Colorado más allá del corredor Boulder-Denver hacia el norte de Colorado.",
    },
    source: "https://www.colostate.edu",
  },
  {
    name: "Colorado Quantum Network (CQN)",
    location: STATEWIDE,
    focus: {
      en: "Coordination and advocacy among Colorado quantum researchers and industry.",
      es: "Coordinación y defensa entre los investigadores cuánticos y la industria de Colorado.",
    },
    funding: { en: "Consortium / partner supported.", es: "Con el apoyo de un consorcio y sus socios." },
    employment: { en: "Member institutions across the state.", es: "Instituciones miembro en todo el estado." },
    connection: {
      en: "The most natural partner for any future state-led quantum economic development initiative.",
      es: "El socio más natural para cualquier futura iniciativa estatal de desarrollo económico cuántico.",
    },
    source: "https://coloradoquantum.org",
  },
];

/* About section's "Where This Data Comes From" page. Every factual claim
   in the app traces back to one of these — organization, what it supports
   in the app, and (where a single canonical page exists) a link. Entries
   without a `url` are broad categories (e.g. public company information
   spread across several sources) rather than one citable page.
   `organization` stays untranslated for named institutions (proper nouns);
   the two broad-category entries translate it since it's descriptive text. */
export const SOURCES = [
  {
    organization: "NIST (National Institute of Standards and Technology)",
    supports: {
      en: "The post-quantum cryptography standards behind the Readiness Tool's scoring, the PQC concept explainers, and NIST Boulder's ecosystem entries.",
      es: "Los estándares de criptografía poscuántica detrás de la puntuación de la Herramienta de Preparación, las explicaciones de conceptos de PQC, y las entradas del ecosistema de NIST Boulder.",
    },
    url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
  },
  {
    organization: "CISA (Cybersecurity and Infrastructure Security Agency)",
    supports: {
      en: "Public-sector post-quantum migration guidance behind several of the Readiness Tool's action-list recommendations.",
      es: "La guía de migración poscuántica del sector público detrás de varias de las recomendaciones de la lista de acciones de la Herramienta de Preparación.",
    },
    url: "https://www.cisa.gov/quantum",
  },
  {
    organization: "NSA (National Security Agency)",
    supports: {
      en: "Quantum-resistant algorithm guidance referenced in the Readiness Tool's defense-contractor action list.",
      es: "La guía de algoritmos resistentes a la computación cuántica referenciada en la lista de acciones para contratistas de defensa de la Herramienta de Preparación.",
    },
    url: "https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/",
  },
  {
    organization: "JILA at CU Boulder",
    supports: {
      en: "Researcher counts, program descriptions, and the \"Why Colorado Is Leading\" framing across the ecosystem map.",
      es: "El número de investigadores, las descripciones de los programas, y el enfoque de \"Por Qué Colorado Está Liderando\" en todo el mapa del ecosistema.",
    },
    url: "https://jila.colorado.edu",
  },
  {
    organization: "CU Boulder Department of Physics",
    supports: {
      en: "The CU Boulder Quantum Initiative's ecosystem entries.",
      es: "Las entradas del ecosistema de la Iniciativa Cuántica de CU Boulder.",
    },
    url: "https://www.colorado.edu/physics",
  },
  {
    organization: "Colorado OEDIT (Office of Economic Development and International Trade)",
    supports: {
      en: "The state economic development framing and the Advanced Industries program entry in the ecosystem map and policy recommendations.",
      es: "El enfoque de desarrollo económico estatal y la entrada del programa de Industrias Avanzadas en el mapa del ecosistema y las recomendaciones de políticas.",
    },
    url: "https://oedit.colorado.gov",
  },
  {
    organization: "Colorado Quantum Network",
    supports: {
      en: "The statewide consortium entry in the ecosystem map and the investment-gap policy framing.",
      es: "La entrada del consorcio estatal en el mapa del ecosistema y el enfoque de políticas sobre la brecha de inversión.",
    },
    url: "https://coloradoquantum.org",
  },
  {
    organization: "National Renewable Energy Laboratory (NREL)",
    supports: {
      en: "The federal facility entry covering energy-sector quantum applications.",
      es: "La entrada de instalación federal que cubre las aplicaciones cuánticas del sector energético.",
    },
    url: "https://www.nrel.gov",
  },
  {
    organization: "Colorado School of Mines",
    supports: {
      en: "The university research entry covering quantum materials research.",
      es: "La entrada de investigación universitaria que cubre la investigación de materiales cuánticos.",
    },
    url: "https://www.mines.edu",
  },
  {
    organization: "Colorado State University",
    supports: {
      en: "The university research entry covering quantum sensing and photonics.",
      es: "La entrada de investigación universitaria que cubre la detección cuántica y la fotónica.",
    },
    url: "https://www.colostate.edu",
  },
  {
    organization: "Quantinuum",
    supports: {
      en: "The industry entry covering Colorado-headquartered quantum computing hardware and software.",
      es: "La entrada de industria que cubre el hardware y software de computación cuántica con sede en Colorado.",
    },
    url: "https://www.quantinuum.com",
  },
  {
    organization: {
      en: "Publicly available company information",
      es: "Información pública disponible de las empresas",
    },
    supports: {
      en: "Industry entries without a single dedicated source page — Ball Aerospace, Lockheed Martin, and Raytheon Technologies' quantum-relevant work.",
      es: "Entradas de industria sin una página de origen dedicada única — el trabajo relevante en computación cuántica de Ball Aerospace, Lockheed Martin y Raytheon Technologies.",
    },
    url: null,
  },
  {
    organization: {
      en: "State quantum initiative public announcements",
      es: "Anuncios públicos de iniciativas estatales cuánticas",
    },
    supports: {
      en: "The investment-gap comparison table (Illinois Quantum Act, New York's IBM quantum campus, California's research funding).",
      es: "La tabla comparativa de la brecha de inversión (Ley Cuántica de Illinois, el campus cuántico de IBM en Nueva York, el financiamiento de investigación de California).",
    },
    url: null,
  },
];
