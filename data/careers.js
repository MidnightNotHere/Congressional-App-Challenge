/* =========================================================================
   Quantum4Colorado — shared data layer: Careers in Quantum
   The 6 career profile cards shown in the Youth section's "Careers" resource
   tab. Quiz results (data/quiz-data.js) reference these by `id` rather than
   duplicating label/icon/oneLiner, so a career's name or icon only ever
   needs to change in this one file.

   Bilingual (Phase 4): every user-facing string is an { en, es } pair.
   ========================================================================= */

export const CAREERS = [
  {
    id: "hardware",
    label: { en: "Quantum Hardware Engineer", es: "Ingeniero de Hardware Cuántico" },
    icon: "Cpu",
    oneLiner: {
      en: "Builds the physical machines: the actual quantum computers.",
      es: "Construye las máquinas físicas: las computadoras cuánticas en sí.",
    },
    whatTheyBuild: {
      en: "The quantum computers themselves. That means superconducting circuits, trapped-ion systems, and the ultra-cold refrigeration and control electronics that hold qubits stable long enough to compute with.",
      es: "Las computadoras cuánticas físicas en sí: circuitos superconductores, sistemas de iones atrapados, y la refrigeración ultra fría y la electrónica de control que mantienen los qubits estables el tiempo suficiente para calcular con ellos.",
    },
    degreePath: {
      en: "A bachelor's in physics or electrical engineering, usually followed by a master's or PhD in quantum engineering or applied physics.",
      es: "Una licenciatura en física o ingeniería eléctrica, generalmente seguida de una maestría o doctorado en ingeniería cuántica o física aplicada.",
    },
    coloradoEmployers: {
      en: "Quantinuum, Lockheed Martin, Ball Aerospace, and CU Boulder's JILA labs.",
      es: "Quantinuum, Lockheed Martin, Ball Aerospace, y los laboratorios JILA de CU Boulder.",
    },
    nextStep: {
      en: "Take the highest-level physics and calculus your school offers. Then get your hands on something real. A robotics club, an Arduino kit, or a physics research project all count.",
      es: "Tome los cursos de física y cálculo de mayor nivel que ofrezca su escuela. Después ponga manos a la obra en algo real. Un club de robótica, un kit de Arduino o un proyecto de investigación en física cuentan.",
    },
  },
  {
    id: "software",
    label: { en: "Quantum Software Developer", es: "Desarrollador de Software Cuántico" },
    icon: "Code2",
    oneLiner: {
      en: "Writes the algorithms and code that run on quantum computers.",
      es: "Escribe los algoritmos y el código que se ejecutan en las computadoras cuánticas.",
    },
    whatTheyBuild: {
      en: "The algorithms and programming languages that run on quantum computers, and the software that translates real-world problems into instructions a quantum processor can actually execute.",
      es: "Los algoritmos y lenguajes de programación que se ejecutan en las computadoras cuánticas, y el software que traduce problemas del mundo real en instrucciones que un procesador cuántico realmente puede ejecutar.",
    },
    degreePath: {
      en: "A bachelor's in computer science, often paired with coursework in linear algebra or physics.",
      es: "Una licenciatura en ciencias de la computación, a menudo combinada con cursos de álgebra lineal o física.",
    },
    coloradoEmployers: {
      en: "Quantinuum's software teams, CU Boulder's Quantum Initiative, and IBM Quantum's partner network.",
      es: "Los equipos de software de Quantinuum, la Iniciativa Cuántica de CU Boulder, y la red de socios de IBM Quantum.",
    },
    nextStep: {
      en: "Start learning Python now. Almost every quantum software framework is built on it, including IBM's Qiskit.",
      es: "Comience a aprender Python ahora. Casi todo framework de software cuántico se construye sobre él, incluido Qiskit de IBM.",
    },
  },
  {
    id: "policy",
    label: { en: "Quantum Policy Analyst", es: "Analista de Políticas Cuánticas" },
    icon: "Landmark",
    oneLiner: {
      en: "Shapes the rules and funding that determine how quantum technology gets used.",
      es: "Da forma a las reglas y al financiamiento que determinan cómo se utiliza la tecnología cuántica.",
    },
    whatTheyBuild: {
      en: "The rules, funding strategies, and international agreements that decide how quantum technology gets regulated, funded, shared, or restricted across borders. This app is an example of the work. So are the ecosystem data, the policy recommendations, and the tools built for representatives.",
      es: "Las reglas, estrategias de financiamiento y acuerdos internacionales que deciden cómo se regula, financia, comparte o restringe la tecnología cuántica entre países. Esta misma aplicación es un ejemplo de ese trabajo. También lo son los datos del ecosistema, las recomendaciones de políticas y las herramientas dirigidas a representantes.",
    },
    degreePath: {
      en: "A bachelor's in political science, public policy, or international relations. Many people pair it with a technical minor, or add a policy master's later.",
      es: "Una licenciatura en ciencias políticas, políticas públicas o relaciones internacionales. Muchas personas la combinan con una especialización técnica, o agregan después una maestría en políticas públicas.",
    },
    coloradoEmployers: {
      en: "Colorado OEDIT, the Colorado Quantum Network, congressional offices including Rep. Jason Crow's, and NIST Boulder's policy divisions.",
      es: "Colorado OEDIT, la Red Cuántica de Colorado, oficinas del Congreso incluyendo la del representante Jason Crow, y las divisiones de políticas de NIST Boulder.",
    },
    nextStep: {
      en: "Join a debate team, Model UN, or student government, and read one real piece of technology legislation from start to finish.",
      es: "Únase a un equipo de debate, un Modelo de Naciones Unidas o el gobierno estudiantil, y lea de principio a fin una ley real relacionada con tecnología.",
    },
  },
  {
    id: "crypto",
    label: { en: "Quantum Cryptography Specialist", es: "Especialista en Criptografía Cuántica" },
    icon: "Lock",
    oneLiner: {
      en: "Protects real organizations' data against quantum-era threats.",
      es: "Protege los datos de organizaciones reales contra las amenazas de la era cuántica.",
    },
    whatTheyBuild: {
      en: "The encryption systems that protect data from quantum attacks. The job is implementing and testing the new NIST post-quantum standards inside real hospitals, schools, businesses, and governments.",
      es: "Los sistemas de cifrado que protegen los datos de ataques cuánticos. El trabajo consiste en implementar y probar los nuevos estándares poscuánticos del NIST dentro de hospitales, escuelas, empresas y gobiernos reales.",
    },
    degreePath: {
      en: "A bachelor's in computer science, mathematics, or cybersecurity, often followed by a security certification or a master's degree.",
      es: "Una licenciatura en ciencias de la computación, matemáticas o ciberseguridad, a menudo seguida de una certificación en seguridad o una maestría.",
    },
    coloradoEmployers: {
      en: "Raytheon Technologies, Lockheed Martin, NIST Boulder, and any Colorado hospital, school district, or municipal government beginning PQC migration.",
      es: "Raytheon Technologies, Lockheed Martin, NIST Boulder, y cualquier hospital, distrito escolar o gobierno municipal de Colorado que comience su migración a PQC.",
    },
    nextStep: {
      en: "Try a beginner \"capture the flag\" cybersecurity challenge online to see what breaking and defending systems actually feels like.",
      es: "Pruebe un desafío de ciberseguridad \"captura la bandera\" para principiantes en línea para ver cómo se siente realmente atacar y defender sistemas.",
    },
  },
  {
    id: "researcher",
    label: { en: "Quantum Researcher", es: "Investigador Cuántico" },
    icon: "GraduationCap",
    oneLiner: {
      en: "Discovers the physics that makes future quantum technology possible.",
      es: "Descubre la física que hace posible la tecnología cuántica del futuro.",
    },
    whatTheyBuild: {
      en: "New scientific knowledge. Researchers discover the physics that makes future quantum computers, sensors, and communication systems possible in the first place.",
      es: "Nuevo conocimiento científico: descubrir la física que hace posible, en primer lugar, las futuras computadoras, sensores y sistemas de comunicación cuánticos.",
    },
    degreePath: {
      en: "A bachelor's in physics, then a PhD (typically five to six years) at a research university. Colorado is home to one of the best programs anywhere: CU Boulder's JILA.",
      es: "Una licenciatura en física, seguida de un doctorado (típicamente de cinco a seis años) en una universidad de investigación. Colorado alberga uno de los mejores programas del mundo: JILA en CU Boulder.",
    },
    coloradoEmployers: {
      en: "JILA, NIST Boulder, CU Boulder's Quantum Initiative, and national labs like NREL.",
      es: "JILA, NIST Boulder, la Iniciativa Cuántica de CU Boulder, y laboratorios nacionales como NREL.",
    },
    nextStep: {
      en: "Email a CU Boulder or JILA professor whose research interests you and ask if they take high school interns. Many genuinely do.",
      es: "Envíe un correo a un profesor de CU Boulder o JILA cuya investigación le interese y pregunte si acepta pasantes de secundaria. Muchos realmente lo hacen.",
    },
  },
  {
    id: "business",
    label: { en: "Quantum Business Development", es: "Desarrollo de Negocios Cuánticos" },
    icon: "Handshake",
    oneLiner: {
      en: "Turns quantum research into companies, partnerships, and jobs.",
      es: "Convierte la investigación cuántica en empresas, alianzas y empleos.",
    },
    whatTheyBuild: {
      en: "The partnerships, funding deals, and go-to-market strategy that turn quantum research into real companies, products, and jobs. This is the connective tissue between the lab and the market.",
      es: "Las alianzas, los acuerdos de financiamiento y las estrategias de comercialización que convierten la investigación cuántica en empresas, productos y empleos reales. Es el tejido conector entre el laboratorio y el mercado.",
    },
    degreePath: {
      en: "A bachelor's in business, economics, or a technical field, often paired with an MBA later. Technical fluency helps but isn't required.",
      es: "Una licenciatura en negocios, economía o un campo técnico, a menudo combinada con una maestría en administración de empresas (MBA) más adelante. El dominio técnico ayuda, pero no es obligatorio.",
    },
    coloradoEmployers: {
      en: "Quantinuum's business and partnerships teams, Colorado OEDIT's Advanced Industries program, and quantum-adjacent startups statewide.",
      es: "Los equipos de negocios y alianzas de Quantinuum, el programa de Industrias Avanzadas de Colorado OEDIT, y startups relacionadas con la computación cuántica en todo el estado.",
    },
    nextStep: {
      en: "Start following Colorado's quantum startup funding news, and practice explaining a complex technical idea to a non-technical friend in under a minute.",
      es: "Comience a seguir las noticias sobre financiamiento de startups cuánticas en Colorado, y practique explicar una idea técnica compleja a un amigo sin conocimientos técnicos en menos de un minuto.",
    },
  },
];
