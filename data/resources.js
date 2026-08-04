/* =========================================================================
   Quantum4Colorado — shared data layer: Quantum for Colorado Youth
   Single source of truth for the Youth section on both platforms: the
   Layer 1 expand-in-place hero cards, the Layer 2 plain-language concept
   cards, and the Layer 3 five-tab resource platform (competitions, summer
   programs, online learning, Colorado-specific, careers). Career profile
   content itself lives in data/careers.js — the "careers" tab below is
   intentionally empty and rendered from CAREERS instead.

   Bilingual (Phase 4): every user-facing string is an { en, es } pair.
   Organization/program names (Science Olympiad, JILA, etc.) are proper
   nouns and stay untranslated in both languages.
   ========================================================================= */

export const HERO_CARDS = [
  {
    title: { en: "Your Privacy", es: "Su Privacidad" },
    icon: "Lock",
    teaser: {
      en: "Every text, photo, and password you use is protected by encryption a quantum computer could eventually break.",
      es: "Cada mensaje de texto, foto y contraseña que usa está protegido por un cifrado que una computadora cuántica podría eventualmente romper.",
    },
    expanded: {
      en: "Websites and apps use math problems that are nearly impossible for regular computers to solve quickly — that's what keeps your data locked. A powerful enough quantum computer could eventually solve those same problems in a fraction of the time, which is why NIST finalized new \"quantum-safe\" encryption standards in 2024. The good news: those new standards already exist, and organizations everywhere — including right here in Colorado — are starting to switch to them.",
      es: "Los sitios web y las aplicaciones usan problemas matemáticos que son casi imposibles de resolver rápidamente para las computadoras comunes — eso es lo que mantiene sus datos protegidos. Una computadora cuántica suficientemente poderosa podría eventualmente resolver esos mismos problemas en una fracción del tiempo, por lo que el NIST finalizó nuevos estándares de cifrado \"a prueba de computación cuántica\" en 2024. La buena noticia: esos nuevos estándares ya existen, y organizaciones de todo el mundo — incluso aquí mismo en Colorado — están comenzando a adoptarlos.",
    },
  },
  {
    title: { en: "Your Future Career", es: "Su Futura Carrera" },
    icon: "Briefcase",
    teaser: {
      en: "Colorado is home to some of the world's most important quantum research institutions. These jobs didn't exist ten years ago.",
      es: "Colorado alberga algunas de las instituciones de investigación cuántica más importantes del mundo. Estos empleos no existían hace diez años.",
    },
    expanded: {
      en: "Ten years ago, \"quantum software developer\" wasn't a job title anywhere in the world — now Colorado companies like Quantinuum are hiring for it. Between JILA, NIST Boulder, and a growing cluster of quantum companies, Colorado has one of the highest concentrations of quantum-related job openings in the country. Whether you like physics, code, policy, or business, there's very likely a version of this field built for you.",
      es: "Hace diez años, \"desarrollador de software cuántico\" no era un puesto de trabajo en ninguna parte del mundo — ahora empresas de Colorado como Quantinuum están contratando para ese puesto. Entre JILA, NIST Boulder y un creciente grupo de empresas cuánticas, Colorado tiene una de las concentraciones más altas de empleos relacionados con la computación cuántica del país. Ya sea que le guste la física, la programación, las políticas públicas o los negocios, es muy probable que exista una versión de este campo hecha para usted.",
    },
  },
  {
    title: { en: "The Global Race", es: "La Carrera Global" },
    icon: "Globe",
    teaser: {
      en: "The US, China, and the EU are racing to build quantum computers that will reshape medicine, security, and the world economy.",
      es: "Estados Unidos, China y la Unión Europea están compitiendo por construir computadoras cuánticas que transformarán la medicina, la seguridad y la economía mundial.",
    },
    expanded: {
      en: "Countries are pouring billions of dollars into quantum computing because whoever builds the most powerful systems first could gain a major edge in medicine, encryption, and military technology. The United States' quantum strategy runs partly through Colorado — NIST Boulder wrote the post-quantum cryptography rules the rest of the world is now adopting. That puts Colorado students unusually close to the center of a decision that will shape the next few decades.",
      es: "Los países están invirtiendo miles de millones de dólares en la computación cuántica porque quien construya primero los sistemas más poderosos podría obtener una ventaja importante en medicina, cifrado y tecnología militar. La estrategia cuántica de Estados Unidos pasa en parte por Colorado — NIST Boulder escribió las reglas de criptografía poscuántica que el resto del mundo está adoptando ahora. Eso coloca a los estudiantes de Colorado inusualmente cerca del centro de una decisión que definirá las próximas décadas.",
    },
  },
];

export const CONCEPT_CARDS = [
  {
    title: { en: "Superposition", es: "Superposición" },
    icon: "Layers",
    body: {
      en: "Imagine flipping a coin and, while it's spinning in the air, it's genuinely both heads AND tails at once — not just unknown, but truly both. Only when it lands (when you \"observe\" it) does it become one or the other. A quantum bit, or \"qubit,\" works the same way: it can exist as both 0 and 1 simultaneously until it's measured. That's what lets quantum computers explore many possibilities at once instead of one at a time.",
      es: "Imagine lanzar una moneda al aire y que, mientras está girando, sea genuinamente cara Y cruz al mismo tiempo — no solo desconocido, sino verdaderamente ambas cosas. Solo cuando cae (cuando la \"observa\") se convierte en una o la otra. Un bit cuántico, o \"qubit\", funciona de la misma manera: puede existir como 0 y 1 simultáneamente hasta que se mide. Eso es lo que permite que las computadoras cuánticas exploren muchas posibilidades a la vez en lugar de una por una.",
    },
    resourceLabel: "Khan Academy",
    // TODO: link to Khan Academy's physics fundamentals content —
    // https://www.khanacademy.org/science/physics (accessible entry point, no prior background needed)
    href: "#",
  },
  {
    title: { en: "Entanglement", es: "Entrelazamiento" },
    icon: "Link2",
    body: {
      en: "Picture two coins that are magically linked: no matter how far apart you carry them, flipping one to heads instantly makes the other one tails — every single time, faster than any signal could travel between them. Einstein called this \"spooky action at a distance\" because it seemed to break the rules of physics as he understood them. Entangled particles behave in a way that has no equivalent in everyday life, and it's a core resource quantum computers use to link qubits and quantum networks use to communicate securely.",
      es: "Imagine dos monedas mágicamente vinculadas: sin importar cuán lejos las lleve, hacer que una caiga en cara hace que la otra caiga instantáneamente en cruz — cada vez, más rápido de lo que cualquier señal podría viajar entre ellas. Einstein llamó a esto \"acción fantasmal a distancia\" porque parecía romper las reglas de la física tal como él las entendía. Las partículas entrelazadas se comportan de una manera que no tiene equivalente en la vida cotidiana, y es un recurso fundamental que las computadoras cuánticas usan para vincular qubits y que las redes cuánticas usan para comunicarse de forma segura.",
    },
    resourceLabel: "MIT OpenCourseWare",
    // TODO: link to MIT OpenCourseWare's quantum mechanics / quantum computation materials —
    // https://ocw.mit.edu (search "quantum entanglement") for students ready to go deeper
    href: "#",
  },
  {
    title: { en: "Post-Quantum Cryptography", es: "Criptografía Poscuántica" },
    icon: "KeyRound",
    body: {
      en: "Think of your data as valuables inside a safe, and encryption as the combination lock protecting it. Today's locks are strong enough that even a room full of regular computers guessing forever couldn't crack them in a human lifetime. A powerful quantum computer could eventually try every combination at once, cracking today's locks in a reasonable amount of time. In 2024, NIST Boulder — right here in Colorado — finalized the first official set of \"post-quantum\" locks: new encryption standards specifically designed so that even a quantum computer can't pick them.",
      es: "Piense en sus datos como objetos de valor dentro de una caja fuerte, y en el cifrado como la cerradura de combinación que los protege. Las cerraduras actuales son tan fuertes que ni siquiera una sala llena de computadoras comunes adivinando para siempre podría descifrarlas en una vida humana. Una computadora cuántica poderosa podría eventualmente probar todas las combinaciones a la vez, descifrando las cerraduras actuales en un tiempo razonable. En 2024, NIST Boulder — aquí mismo en Colorado — finalizó el primer conjunto oficial de cerraduras \"poscuánticas\": nuevos estándares de cifrado diseñados específicamente para que ni siquiera una computadora cuántica pueda abrirlas.",
    },
    resourceLabel: "IBM Quantum Learning",
    // TODO: link to IBM Quantum Learning's cryptography-focused modules —
    // https://learning.quantum.ibm.com (hands-on, uses real quantum hardware)
    href: "#",
  },
  {
    title: { en: "Quantum Advantage", es: "Ventaja Cuántica" },
    icon: "Zap",
    body: {
      en: "A common misconception is that quantum computers are just \"faster\" regular computers — they're not, and for most everyday tasks (email, browsing, homework) they'd actually be worse. Quantum computers only pull ahead on specific kinds of problems: simulating molecules for drug discovery, optimizing massive logistics networks, and breaking or building certain kinds of cryptography. \"Quantum advantage\" means finding the narrow set of problems where a quantum computer meaningfully beats the best classical computer — and scientists are still mapping out exactly where that line is.",
      es: "Un error común es pensar que las computadoras cuánticas son simplemente computadoras comunes \"más rápidas\" — no lo son, y para la mayoría de las tareas cotidianas (correo electrónico, navegación, tareas escolares) en realidad serían peores. Las computadoras cuánticas solo tienen ventaja en tipos específicos de problemas: simular moléculas para el descubrimiento de medicamentos, optimizar redes logísticas masivas, y romper o construir ciertos tipos de criptografía. \"Ventaja cuántica\" significa encontrar el conjunto reducido de problemas donde una computadora cuántica supera de manera significativa a la mejor computadora clásica — y los científicos todavía están determinando exactamente dónde está esa línea.",
    },
    resourceLabel: "IBM Quantum Learning",
    // TODO: link to IBM Quantum Learning's quantum advantage explainers —
    // https://learning.quantum.ibm.com (demonstrates real use cases on real hardware)
    href: "#",
  },
];

/* `shortLabel` is used where mobile's horizontal tab-pill scroller doesn't
   have room for the full label. */
export const RESOURCE_TABS = [
  {
    id: "competitions",
    label: { en: "Competitions & Recognition", es: "Competencias y Reconocimiento" },
    shortLabel: { en: "Competitions", es: "Competencias" },
    icon: "Trophy",
    items: [
      {
        name: "Science Olympiad",
        description: {
          en: "A national STEM competition with quantum mechanics event categories where high schoolers test their physics knowledge head-to-head.",
          es: "Una competencia nacional de STEM con categorías de eventos de mecánica cuántica donde los estudiantes de secundaria ponen a prueba sus conocimientos de física cara a cara.",
        },
        href: "#", // TODO: https://www.soinc.org
      },
      {
        name: "ISEF (International Science and Engineering Fair)",
        description: {
          en: "The world's largest pre-college science competition, with computational and physical sciences categories that regularly feature quantum projects.",
          es: "La competencia de ciencias preuniversitaria más grande del mundo, con categorías de ciencias computacionales y físicas que regularmente presentan proyectos cuánticos.",
        },
        href: "#", // TODO: https://www.societyforscience.org/isef
      },
      {
        name: "Q-12 Education Partnership",
        description: {
          en: "A national partnership running student quantum competitions and challenges built specifically for K-12 and high school students.",
          es: "Una asociación nacional que organiza competencias y desafíos cuánticos para estudiantes, diseñados específicamente para estudiantes de K-12 y secundaria.",
        },
        href: "#", // TODO: https://q12education.org
      },
      {
        name: "Congressional App Challenge",
        description: {
          en: "This very app is an example of a pathway into quantum policy work — a nationwide competition for student-built software with a real civic purpose.",
          es: "Esta misma aplicación es un ejemplo de un camino hacia el trabajo de políticas cuánticas — una competencia a nivel nacional de software creado por estudiantes con un propósito cívico real.",
        },
        href: "#", // TODO: https://www.congressionalappchallenge.us
      },
    ],
  },
  {
    id: "summer",
    label: { en: "Summer Programs & Research", es: "Programas de Verano e Investigación" },
    shortLabel: { en: "Summer Programs", es: "Programas de Verano" },
    icon: "FlaskConical",
    items: [
      {
        name: "CU Boulder JILA",
        description: {
          en: "Summer research opportunities for high school students to work alongside real quantum physicists in one of the world's top labs.",
          es: "Oportunidades de investigación de verano para estudiantes de secundaria de trabajar junto a físicos cuánticos reales en uno de los mejores laboratorios del mundo.",
        },
        href: "#", // TODO: https://jila.colorado.edu
      },
      {
        name: "Qubit by Qubit",
        description: {
          en: "An intensive summer program designed specifically for high schoolers learning quantum computing from scratch — no prior experience required.",
          es: "Un programa de verano intensivo diseñado específicamente para estudiantes de secundaria que aprenden computación cuántica desde cero — no se requiere experiencia previa.",
        },
        href: "#", // TODO: https://qubitbyqubit.org
      },
      {
        name: "MIT Lincoln Laboratory",
        description: {
          en: "High school research programs at one of the country's leading defense and quantum technology research centers.",
          es: "Programas de investigación para estudiantes de secundaria en uno de los centros líderes del país en investigación de defensa y tecnología cuántica.",
        },
        href: "#", // TODO: https://www.ll.mit.edu (see education/outreach programs)
      },
      {
        name: "IBM Quantum Learning",
        description: {
          en: "Summer cohort programs that pair students with mentors and real IBM quantum hardware.",
          es: "Programas de cohortes de verano que emparejan a los estudiantes con mentores y hardware cuántico real de IBM.",
        },
        href: "#", // TODO: https://learning.quantum.ibm.com
      },
      {
        name: "Q-12 Summer Institutes",
        description: {
          en: "National quantum education summer institutes that bring students together from across the country to learn hands-on.",
          es: "Institutos nacionales de educación cuántica de verano que reúnen a estudiantes de todo el país para aprender de forma práctica.",
        },
        href: "#", // TODO: https://q12education.org (summer institutes program page)
      },
    ],
  },
  {
    id: "online",
    label: { en: "Online Learning Pathways", es: "Rutas de Aprendizaje en Línea" },
    shortLabel: { en: "Online Learning", es: "Aprendizaje en Línea" },
    icon: "Laptop",
    items: [
      {
        name: "IBM Quantum Learning",
        description: {
          en: "A free platform that takes you from complete beginner to advanced quantum programming, using real quantum computers.",
          es: "Una plataforma gratuita que lo lleva desde principiante hasta programación cuántica avanzada, usando computadoras cuánticas reales.",
        },
        href: "#", // TODO: https://learning.quantum.ibm.com
      },
      {
        name: "Qubit by Qubit Intro Course",
        description: {
          en: "The most accessible structured curriculum built specifically for high schoolers with zero background.",
          es: "El plan de estudios estructurado más accesible, diseñado específicamente para estudiantes de secundaria sin ningún conocimiento previo.",
        },
        href: "#", // TODO: https://qubitbyqubit.org/courses
      },
      {
        name: "MIT OpenCourseWare",
        description: {
          en: "Full quantum computation courses from MIT, free and open, for students ready for a deeper technical challenge.",
          es: "Cursos completos de computación cuántica del MIT, gratuitos y abiertos, para estudiantes listos para un desafío técnico más profundo.",
        },
        href: "#", // TODO: https://ocw.mit.edu (search "quantum computation")
      },
      {
        name: "Microsoft Azure Quantum Learning",
        description: {
          en: "Free, self-paced modules covering quantum concepts and Microsoft's quantum development tools.",
          es: "Módulos gratuitos y de ritmo propio que cubren conceptos cuánticos y las herramientas de desarrollo cuántico de Microsoft.",
        },
        href: "#", // TODO: https://learn.microsoft.com/azure/quantum
      },
      {
        name: "Quantum Computing UK",
        description: {
          en: "Free educational resources and explainers written for learners at every level.",
          es: "Recursos educativos gratuitos y explicaciones escritas para estudiantes de todos los niveles.",
        },
        href: "#", // TODO: https://quantumcomputinguk.org
      },
    ],
  },
  {
    id: "colorado",
    label: { en: "Colorado-Specific Opportunities", es: "Oportunidades Específicas de Colorado" },
    shortLabel: { en: "Colorado-Specific", es: "Específico de Colorado" },
    icon: "MapPin",
    items: [
      {
        name: "CU Boulder Quantum Research Programs",
        description: {
          en: "How to reach out to faculty directly — many CU Boulder quantum researchers welcome motivated high schoolers who ask.",
          es: "Cómo contactar directamente al profesorado — muchos investigadores cuánticos de CU Boulder reciben con gusto a estudiantes de secundaria motivados que se acercan a preguntar.",
        },
        href: "#", // TODO: https://www.colorado.edu/physics (faculty directory)
      },
      {
        name: "NIST Boulder Public Programs",
        description: {
          en: "Educational events and public programming hosted by the federal lab that sets the world's quantum security standards, right here in Boulder.",
          es: "Eventos educativos y programación pública organizados por el laboratorio federal que establece los estándares mundiales de seguridad cuántica, aquí mismo en Boulder.",
        },
        href: "#", // TODO: https://www.nist.gov/public_affairs/visitor (Boulder public programs)
      },
      {
        name: "Colorado Quantum Network",
        description: {
          en: "Student engagement opportunities through Colorado's statewide consortium of quantum researchers and industry partners.",
          es: "Oportunidades de participación estudiantil a través del consorcio estatal de Colorado de investigadores cuánticos y socios de la industria.",
        },
        href: "#", // TODO: https://coloradoquantum.org
      },
      {
        name: "Colorado School of Mines",
        description: {
          en: "Quantum materials research with a student inquiry contact for high schoolers interested in the physical-science side of quantum technology.",
          es: "Investigación de materiales cuánticos con un contacto de consulta estudiantil para estudiantes de secundaria interesados en el lado de las ciencias físicas de la tecnología cuántica.",
        },
        href: "#", // TODO: https://www.mines.edu (physics department)
      },
      {
        name: "CU Boulder Q-12 Affiliated Programs",
        description: {
          en: "Programs affiliated with the national Q-12 partnership, based right on the CU Boulder campus.",
          es: "Programas afiliados a la asociación nacional Q-12, ubicados directamente en el campus de CU Boulder.",
        },
        href: "#", // TODO: https://q12education.org (affiliated programs list)
      },
    ],
  },
  {
    id: "careers",
    label: { en: "Careers in Quantum", es: "Carreras en el Campo Cuántico" },
    shortLabel: { en: "Careers", es: "Carreras" },
    icon: "Briefcase",
    items: [], // rendered from data/careers.js's CAREERS instead
  },
];
