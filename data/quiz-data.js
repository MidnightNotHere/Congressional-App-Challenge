/* =========================================================================
   Quantum4Colorado — shared data layer: "Find Your Quantum Path" quiz
   The 5 quiz questions, the career-track tally logic, and each track's
   result-screen content (the blurb and first steps shown once a user
   finishes). Career label/icon/oneLiner live in data/careers.js and are
   joined by `id` — see computeQuizResult below.

   Bilingual (Phase 4): every user-facing string is an { en, es } pair.
   The `track` values themselves (matching data/careers.js's CAREERS ids)
   are plain identifiers, not translated content.
   ========================================================================= */

/* Five questions. Each option maps to one of the six data/careers.js ids.
   The mapping order is deliberately varied question-to-question (not a
   fixed option-index -> track formula) so results feel genuinely
   personalized rather than mechanical. */
export const QUIZ_QUESTIONS = [
  {
    prompt: {
      en: "What do you like most about problem-solving?",
      es: "¿Qué es lo que más le gusta de resolver problemas?",
    },
    options: [
      {
        label: { en: "Figuring out how things physically work", es: "Descubrir cómo funcionan físicamente las cosas" },
        track: "hardware",
      },
      { label: { en: "Writing code", es: "Escribir código" }, track: "software" },
      {
        label: { en: "Understanding why systems fail", es: "Entender por qué fallan los sistemas" },
        track: "crypto",
      },
      {
        label: { en: "Explaining complex ideas to others", es: "Explicar ideas complejas a otras personas" },
        track: "policy",
      },
      {
        label: { en: "Strategy and big-picture thinking", es: "Estrategia y visión de conjunto" },
        track: "business",
      },
    ],
  },
  {
    prompt: {
      en: "Which subject comes most naturally to you?",
      es: "¿Qué materia le resulta más natural?",
    },
    options: [
      { label: { en: "Physics", es: "Física" }, track: "hardware" },
      { label: { en: "Computer Science", es: "Ciencias de la Computación" }, track: "software" },
      { label: { en: "Math", es: "Matemáticas" }, track: "researcher" },
      { label: { en: "Writing and debate", es: "Escritura y debate" }, track: "policy" },
      {
        label: { en: "Economics and social science", es: "Economía y ciencias sociales" },
        track: "business",
      },
    ],
  },
  {
    prompt: {
      en: "What sounds most exciting?",
      es: "¿Qué le suena más emocionante?",
    },
    options: [
      {
        label: { en: "Building hardware that doesn't exist yet", es: "Construir hardware que todavía no existe" },
        track: "hardware",
      },
      {
        label: { en: "Writing software that solves hard problems", es: "Escribir software que resuelve problemas difíciles" },
        track: "software",
      },
      {
        label: { en: "Protecting systems from attack", es: "Proteger sistemas de ataques" },
        track: "crypto",
      },
      {
        label: { en: "Influencing government policy", es: "Influir en las políticas gubernamentales" },
        track: "policy",
      },
      {
        label: {
          en: "Working at the intersection of business and technology",
          es: "Trabajar en la intersección de los negocios y la tecnología",
        },
        track: "business",
      },
    ],
  },
  {
    prompt: {
      en: "What's your relationship with ambiguity?",
      es: "¿Cuál es su relación con la ambigüedad?",
    },
    options: [
      { label: { en: "I love unsolved problems", es: "Me encantan los problemas sin resolver" }, track: "researcher" },
      { label: { en: "I prefer clear specifications", es: "Prefiero especificaciones claras" }, track: "hardware" },
      {
        label: { en: "I like figuring out the rules of a system", es: "Me gusta descifrar las reglas de un sistema" },
        track: "crypto",
      },
      {
        label: {
          en: "I like arguing about what the rules should be",
          es: "Me gusta debatir sobre cuáles deberían ser las reglas",
        },
        track: "policy",
      },
    ],
  },
  {
    prompt: {
      en: "Where do you want to work?",
      es: "¿Dónde quiere trabajar?",
    },
    options: [
      { label: { en: "Research lab or university", es: "Laboratorio de investigación o universidad" }, track: "researcher" },
      { label: { en: "Tech company", es: "Empresa de tecnología" }, track: "software" },
      { label: { en: "Government or national security", es: "Gobierno o seguridad nacional" }, track: "crypto" },
      {
        label: { en: "Policy organization or think tank", es: "Organización de políticas públicas o centro de estudios" },
        track: "policy",
      },
      { label: { en: "Startup", es: "Startup" }, track: "business" },
    ],
  },
];

/* Stable tally order — used only to break ties deterministically (first
   track reaching the high score in this order wins). */
export const TRACK_TALLY_ORDER = [
  "hardware",
  "software",
  "policy",
  "crypto",
  "researcher",
  "business",
];

/* Result-screen content per track id. Joined with data/careers.js's
   matching `id` for label/icon/oneLiner when rendering. */
export const QUIZ_RESULTS = {
  hardware: {
    resultBlurb: {
      en: "You lit up at \"figuring out how things physically work\" and \"building hardware that doesn't exist yet\" — that's a hardware engineer's instinct. This path is for people who want to touch the actual machine, not just the code running on it, and Colorado happens to have some of the best hardware labs on the planet.",
      es: "Se le iluminó el rostro con \"descubrir cómo funcionan físicamente las cosas\" y \"construir hardware que todavía no existe\" — ese es el instinto de un ingeniero de hardware. Este camino es para personas que quieren tocar la máquina real, no solo el código que se ejecuta en ella, y resulta que Colorado tiene algunos de los mejores laboratorios de hardware del planeta.",
    },
    firstSteps: [
      {
        en: "Apply for a JILA summer research opportunity at CU Boulder — real lab time with real quantum physicists.",
        es: "Solicite una oportunidad de investigación de verano en JILA en CU Boulder — tiempo real de laboratorio con físicos cuánticos reales.",
      },
      {
        en: "Enter Science Olympiad's quantum mechanics event category to test what you already know.",
        es: "Participe en la categoría de mecánica cuántica de Science Olympiad para poner a prueba lo que ya sabe.",
      },
      {
        en: "Look into Colorado School of Mines' quantum materials research for the physical-science side of hardware.",
        es: "Investigue la investigación de materiales cuánticos de Colorado School of Mines para el lado de las ciencias físicas del hardware.",
      },
    ],
  },
  software: {
    resultBlurb: {
      en: "\"Writing code\" and \"writing software that solves hard problems\" stood out in your answers — that's a software developer's mindset. This path is for people who want to build the programs that make quantum hardware actually useful, and you can start writing real quantum code for free, today.",
      es: "\"Escribir código\" y \"escribir software que resuelve problemas difíciles\" se destacaron en sus respuestas — esa es la mentalidad de un desarrollador de software. Este camino es para personas que quieren crear los programas que hacen que el hardware cuántico sea realmente útil, y puede comenzar a escribir código cuántico real de forma gratuita, hoy mismo.",
    },
    firstSteps: [
      {
        en: "Create a free IBM Quantum Learning account and run your first program on real quantum hardware.",
        es: "Cree una cuenta gratuita en IBM Quantum Learning y ejecute su primer programa en hardware cuántico real.",
      },
      {
        en: "Work through the Qubit by Qubit Intro Course — the most beginner-friendly quantum coding curriculum built for high schoolers.",
        es: "Complete el curso introductorio de Qubit by Qubit — el plan de estudios de programación cuántica más accesible para principiantes, diseñado para estudiantes de secundaria.",
      },
      {
        en: "Apply to a Qubit by Qubit summer program to go deeper with structured mentorship.",
        es: "Solicite un programa de verano de Qubit by Qubit para profundizar con mentoría estructurada.",
      },
    ],
  },
  policy: {
    resultBlurb: {
      en: "\"Explaining complex ideas to others\" and \"influencing government policy\" point toward policy work — turning technical complexity into decisions people can actually act on. You're already closer to this path than you think: building Quantum4Colorado's Representatives section is quantum policy work.",
      es: "\"Explicar ideas complejas a otras personas\" e \"influir en las políticas gubernamentales\" apuntan hacia el trabajo de políticas públicas — convertir la complejidad técnica en decisiones sobre las que la gente realmente puede actuar. Ya está más cerca de este camino de lo que piensa: construir la sección de Representantes de Quantum4Colorado es trabajo de políticas cuánticas.",
    },
    firstSteps: [
      {
        en: "Read the Representatives section of this app — it's a working example of quantum policy analysis.",
        es: "Lea la sección de Representantes de esta aplicación — es un ejemplo funcional de análisis de políticas cuánticas.",
      },
      {
        en: "Enter the Congressional App Challenge yourself; civic tech is a direct pathway into policy work.",
        es: "Participe usted mismo en el Congressional App Challenge; la tecnología cívica es un camino directo hacia el trabajo de políticas públicas.",
      },
      {
        en: "Reach out to the Colorado Quantum Network about student engagement opportunities in state-level quantum advocacy.",
        es: "Contacte a la Red Cuántica de Colorado sobre oportunidades de participación estudiantil en la defensa de políticas cuánticas a nivel estatal.",
      },
    ],
  },
  crypto: {
    resultBlurb: {
      en: "\"Understanding why systems fail\" and \"protecting systems from attack\" are a cryptography specialist's core instincts. This path sits right at the center of the quantum threat this whole app is about — and you can see exactly what this work looks like in the readiness tool in the Readiness tab.",
      es: "\"Entender por qué fallan los sistemas\" y \"proteger sistemas de ataques\" son los instintos centrales de un especialista en criptografía. Este camino está justo en el centro de la amenaza cuántica de la que trata toda esta aplicación — y puede ver exactamente cómo es este trabajo en la herramienta de evaluación en la pestaña de Preparación.",
    },
    firstSteps: [
      {
        en: "Take the PQC Readiness Tool yourself and see the kind of risk analysis this job actually involves.",
        es: "Realice usted mismo la Herramienta de Preparación PQC y vea el tipo de análisis de riesgo que realmente implica este trabajo.",
      },
      {
        en: "Try a beginner capture-the-flag cybersecurity competition to test your instincts.",
        es: "Pruebe una competencia de ciberseguridad \"captura la bandera\" para principiantes y ponga a prueba sus instintos.",
      },
      {
        en: "Read NIST's post-quantum cryptography standards overview — the actual rules this job is built around.",
        es: "Lea el resumen de los estándares de criptografía poscuántica del NIST — las reglas reales sobre las que se construye este trabajo.",
      },
    ],
  },
  researcher: {
    resultBlurb: {
      en: "\"I love unsolved problems\" and a pull toward math and physics point to research — the path for people who want to discover something no one has proven yet. You happen to live in a state with one of the best quantum physics institutes on Earth.",
      es: "\"Me encantan los problemas sin resolver\" y una inclinación hacia las matemáticas y la física apuntan hacia la investigación — el camino para las personas que quieren descubrir algo que nadie ha demostrado todavía. Resulta que vive en un estado con uno de los mejores institutos de física cuántica del planeta.",
    },
    firstSteps: [
      {
        en: "Apply for a JILA summer research opportunity at CU Boulder.",
        es: "Solicite una oportunidad de investigación de verano en JILA en CU Boulder.",
      },
      {
        en: "Work through MIT OpenCourseWare's quantum computation materials to see what the coursework actually looks like.",
        es: "Estudie los materiales de computación cuántica de MIT OpenCourseWare para ver cómo es realmente el plan de estudios.",
      },
      {
        en: "Enter ISEF's computational or physical sciences category with an independent research project.",
        es: "Participe en la categoría de ciencias computacionales o físicas de ISEF con un proyecto de investigación independiente.",
      },
    ],
  },
  business: {
    resultBlurb: {
      en: "\"Strategy and big-picture thinking\" and the pull toward the \"intersection of business and technology\" point toward business development — the role that turns brilliant research into a company people can actually work at. Colorado's quantum industry needs this as much as it needs engineers.",
      es: "\"Estrategia y visión de conjunto\" y la inclinación hacia la \"intersección de los negocios y la tecnología\" apuntan hacia el desarrollo de negocios — el rol que convierte una investigación brillante en una empresa donde la gente realmente puede trabajar. La industria cuántica de Colorado necesita esto tanto como necesita ingenieros.",
    },
    firstSteps: [
      {
        en: "Follow Colorado OEDIT's Advanced Industries program to see how the state supports quantum companies.",
        es: "Siga el programa de Industrias Avanzadas de Colorado OEDIT para ver cómo el estado apoya a las empresas cuánticas.",
      },
      {
        en: "Enter a business plan or pitch competition, even a school-level one, to practice the core skill.",
        es: "Participe en una competencia de plan de negocios o presentación, aunque sea a nivel escolar, para practicar esta habilidad fundamental.",
      },
      {
        en: "Read about Quantinuum's growth from a Colorado-headquartered company into a global leader.",
        es: "Infórmese sobre el crecimiento de Quantinuum, desde una empresa con sede en Colorado hasta convertirse en un líder mundial.",
      },
    ],
  },
};

/* Pure tally function: array of 5 track-id answers -> winning track id.
   Callers join the id against data/careers.js and QUIZ_RESULTS to build
   the full result display. */
export function computeQuizResult(answers) {
  const tally = {};
  TRACK_TALLY_ORDER.forEach((id) => (tally[id] = 0));
  answers.forEach((track) => {
    if (track && tally[track] != null) tally[track] += 1;
  });
  let bestId = TRACK_TALLY_ORDER[0];
  TRACK_TALLY_ORDER.forEach((id) => {
    if (tally[id] > tally[bestId]) bestId = id;
  });
  return bestId;
}
