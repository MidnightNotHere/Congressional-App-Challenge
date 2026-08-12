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
      en: "Websites and apps lock your data behind math problems that regular computers cannot solve quickly. That is the whole trick. A powerful enough quantum computer could crack those same problems in a fraction of the time, which is why NIST finalized new \"quantum-safe\" encryption standards in 2024. Here is the good news. Those standards already exist, and organizations everywhere, including right here in Colorado, have started switching to them.",
      es: "Los sitios web y las aplicaciones protegen sus datos con problemas matemáticos que las computadoras comunes no pueden resolver rápido. Ese es todo el truco. Una computadora cuántica suficientemente poderosa podría resolver esos mismos problemas en una fracción del tiempo, y por eso el NIST finalizó nuevos estándares de cifrado \"a prueba de computación cuántica\" en 2024. La buena noticia es esta. Esos estándares ya existen, y organizaciones de todo el mundo, incluso aquí en Colorado, ya empezaron a adoptarlos.",
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
      en: "Ten years ago, \"quantum software developer\" was not a job title anywhere in the world. Now Colorado companies like Quantinuum hire for it. Between JILA, NIST Boulder, and a growing cluster of quantum companies, Colorado has one of the highest concentrations of quantum job openings in the country. Maybe you like physics. Maybe you like code, policy, or business. There is very likely a version of this field built for you.",
      es: "Hace diez años, \"desarrollador de software cuántico\" no era un puesto en ninguna parte del mundo. Hoy empresas de Colorado como Quantinuum contratan para ese puesto. Entre JILA, NIST Boulder y un grupo creciente de empresas cuánticas, Colorado tiene una de las mayores concentraciones de empleos cuánticos del país. Quizá le guste la física. Quizá le gusten la programación, las políticas públicas o los negocios. Es muy probable que exista una versión de este campo hecha para usted.",
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
      en: "Countries are pouring billions into quantum computing. Whoever builds the most powerful systems first could gain a real edge in medicine, encryption, and military technology. Part of the United States' quantum strategy runs straight through Colorado, because NIST Boulder wrote the post-quantum cryptography rules the rest of the world is now adopting. That puts Colorado students unusually close to a decision that will shape the next few decades.",
      es: "Los países están invirtiendo miles de millones en la computación cuántica. Quien construya primero los sistemas más poderosos podría obtener una ventaja real en medicina, cifrado y tecnología militar. Parte de la estrategia cuántica de Estados Unidos pasa directamente por Colorado, porque NIST Boulder escribió las reglas de criptografía poscuántica que el resto del mundo adopta ahora. Eso coloca a los estudiantes de Colorado muy cerca de una decisión que definirá las próximas décadas.",
    },
  },
];

export const CONCEPT_CARDS = [
  {
    title: { en: "Superposition", es: "Superposición" },
    icon: "Layers",
    body: {
      en: "Flip a coin. While it spins in the air, imagine it is genuinely both heads and tails at the same time. Not unknown to you, but actually both. Only when it lands, when you observe it, does it become one or the other. A quantum bit, or \"qubit,\" works this way too. It can be 0 and 1 at once until something measures it. That is what lets quantum computers explore many possibilities at the same time instead of one by one.",
      es: "Lance una moneda al aire. Mientras gira, imagine que es cara y cruz de verdad al mismo tiempo. No es que usted no lo sepa: es que realmente es las dos. Solo cuando cae, cuando la observa, se vuelve una o la otra. Un bit cuántico, o \"qubit\", funciona igual. Puede ser 0 y 1 a la vez hasta que algo lo mide. Eso permite que las computadoras cuánticas exploren muchas posibilidades al mismo tiempo en lugar de una por una.",
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
      en: "Picture two coins that are magically linked. Carry them as far apart as you like. Flip one to heads and the other turns up tails instantly, every single time, faster than any signal could travel between them. Einstein called this \"spooky action at a distance\" because it seemed to break physics as he understood it. Nothing in everyday life works this way. Quantum computers use it to link qubits, and quantum networks use it to communicate securely.",
      es: "Imagine dos monedas vinculadas por arte de magia. Llévelas tan lejos una de otra como quiera. Si una cae en cara, la otra cae en cruz al instante, siempre, más rápido de lo que cualquier señal podría viajar entre ellas. Einstein llamó a esto \"acción fantasmal a distancia\" porque parecía romper la física tal como él la entendía. Nada en la vida cotidiana funciona así. Las computadoras cuánticas lo usan para vincular qubits, y las redes cuánticas lo usan para comunicarse de forma segura.",
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
      en: "Think of your data as valuables in a safe, and encryption as the combination lock on the door. Today's locks are strong. A room full of regular computers could guess forever and still not open one in a human lifetime. A powerful quantum computer could try every combination at once and open it in a reasonable amount of time. So in 2024, NIST Boulder, right here in Colorado, finalized the first official set of post-quantum locks: encryption standards built so that even a quantum computer cannot pick them.",
      es: "Piense en sus datos como objetos de valor dentro de una caja fuerte, y en el cifrado como la cerradura de combinación de la puerta. Las cerraduras de hoy son fuertes. Una sala llena de computadoras comunes podría adivinar para siempre y aun así no abrir una en toda una vida humana. Una computadora cuántica poderosa podría probar todas las combinaciones a la vez y abrirla en un tiempo razonable. Por eso, en 2024, NIST Boulder, aquí mismo en Colorado, finalizó el primer conjunto oficial de cerraduras poscuánticas: estándares de cifrado hechos para que ni siquiera una computadora cuántica pueda abrirlos.",
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
      en: "People often assume quantum computers are just faster regular computers. They are not. For everyday tasks like email, browsing, and homework, they would actually be worse. They only pull ahead on particular problems: simulating molecules for drug discovery, optimizing huge logistics networks, and breaking or building certain kinds of cryptography. Quantum advantage is the name for that narrow set of problems where a quantum computer genuinely beats the best classical one. Scientists are still working out where the line falls.",
      es: "Mucha gente supone que las computadoras cuánticas son solo computadoras comunes más rápidas. No lo son. Para tareas cotidianas como el correo, la navegación o la tarea escolar, serían peores. Solo tienen ventaja en problemas puntuales: simular moléculas para descubrir medicamentos, optimizar redes logísticas enormes, y romper o construir ciertos tipos de criptografía. La ventaja cuántica es el nombre de ese conjunto reducido de problemas donde una computadora cuántica realmente supera a la mejor computadora clásica. Los científicos todavía están definiendo dónde está esa línea.",
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
          en: "This very app is one path into quantum policy work. The challenge is a nationwide competition for student-built software with a real civic purpose.",
          es: "Esta misma aplicación es uno de esos caminos hacia el trabajo de políticas cuánticas. El desafío es una competencia nacional de software creado por estudiantes con un propósito cívico real.",
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
          en: "An intensive summer program built for high schoolers learning quantum computing from scratch. No prior experience needed.",
          es: "Un programa de verano intensivo hecho para estudiantes de secundaria que aprenden computación cuántica desde cero. No se necesita experiencia previa.",
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
          en: "How to reach out to faculty directly. Many CU Boulder quantum researchers welcome motivated high schoolers who ask.",
          es: "Cómo contactar directamente al profesorado. Muchos investigadores cuánticos de CU Boulder reciben con gusto a estudiantes de secundaria que se acercan a preguntar.",
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
