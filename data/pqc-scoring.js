/* =========================================================================
   Quantum4Colorado — shared data layer: PQC Readiness Tool
   Single source of truth for the web app's Section 2 assessment and the
   mobile app's Assessment/Readiness screen: the 8 questions, the 4 risk
   tiers, the resource links, and the pure scoring functions themselves.

   The scoring logic lives here (not just the data) so a future change to
   point weights or action content only has to happen in one place.

   Bilingual (Phase 4): every user-facing string is an { en, es } pair,
   resolved at render time via data/i18n.js's pick()/makeTranslator(). This
   is the highest-priority section for translation per the Phase 4 plan,
   so it's fully bilingual — questions, options, tiers, factors, and every
   action item across all 5 organization-type branches.
   ========================================================================= */

export const QUESTIONS = [
  {
    id: "q1",
    type: "single",
    prompt: {
      en: "What best describes your organization?",
      es: "¿Qué describe mejor a su organización?",
    },
    options: [
      {
        id: "small-business",
        label: { en: "Small Business (under 50 employees)", es: "Pequeña empresa (menos de 50 empleados)" },
      },
      {
        id: "medium-business",
        label: { en: "Medium Business (50–500 employees)", es: "Empresa mediana (50–500 empleados)" },
      },
      {
        id: "healthcare",
        label: {
          en: "Healthcare Organization (hospital, clinic, practice)",
          es: "Organización de salud (hospital, clínica, consultorio)",
        },
      },
      {
        id: "k12",
        label: { en: "K-12 School or School District", es: "Escuela o distrito escolar (K-12)" },
      },
      {
        id: "higher-ed",
        label: { en: "Higher Education Institution", es: "Institución de educación superior" },
      },
      {
        id: "municipal",
        label: { en: "Municipal or County Government", es: "Gobierno municipal o del condado" },
      },
      { id: "state-agency", label: { en: "State Agency", es: "Agencia estatal" } },
      {
        id: "nonprofit",
        label: { en: "Nonprofit Organization", es: "Organización sin fines de lucro" },
      },
      {
        id: "defense",
        label: {
          en: "Defense Contractor or Subcontractor",
          es: "Contratista o subcontratista de defensa",
        },
      },
    ],
  },
  {
    id: "q2",
    type: "multi",
    prompt: {
      en: "What kinds of sensitive data does your organization handle? (Select all that apply)",
      es: "¿Qué tipo de datos confidenciales maneja su organización? (Seleccione todas las que correspondan)",
    },
    options: [
      {
        id: "financial",
        label: {
          en: "Personal financial information (bank accounts, credit cards, payment data)",
          es: "Información financiera personal (cuentas bancarias, tarjetas de crédito, datos de pago)",
        },
      },
      {
        id: "health",
        label: {
          en: "Personal health information (medical records, insurance data)",
          es: "Información médica personal (historiales médicos, datos de seguros)",
        },
      },
      {
        id: "student",
        label: {
          en: "Student records (grades, assessments, personal information)",
          es: "Registros estudiantiles (calificaciones, evaluaciones, información personal)",
        },
      },
      {
        id: "government",
        label: { en: "Government or classified information", es: "Información gubernamental o clasificada" },
      },
      {
        id: "ip",
        label: { en: "Intellectual property or trade secrets", es: "Propiedad intelectual o secretos comerciales" },
      },
      {
        id: "pii",
        label: {
          en: "Personal identifying information (SSN, addresses, ID numbers)",
          es: "Información de identificación personal (número de seguro social, direcciones, números de identificación)",
        },
      },
      {
        id: "customer",
        label: { en: "Customer or client personal data", es: "Datos personales de clientes" },
      },
      { id: "none", label: { en: "None of the above", es: "Ninguna de las anteriores" } },
    ],
  },
  {
    id: "q3",
    type: "single",
    prompt: {
      en: "Do you know what encryption standard currently protects your organization's data?",
      es: "¿Sabe qué estándar de cifrado protege actualmente los datos de su organización?",
    },
    options: [
      {
        id: "rsa-ecc",
        label: {
          en: "Yes, we use RSA or ECC encryption (most common standard)",
          es: "Sí, usamos cifrado RSA o ECC (el estándar más común)",
        },
      },
      {
        id: "other-known",
        label: { en: "Yes, we use something else", es: "Sí, usamos otro tipo de cifrado" },
      },
      {
        id: "unsure-standard",
        label: {
          en: "We have some encryption but I'm not sure of the standard",
          es: "Tenemos algún tipo de cifrado, pero no estoy seguro del estándar",
        },
      },
      {
        id: "dont-know",
        label: { en: "I don't know what encryption we use", es: "No sé qué cifrado usamos" },
      },
      {
        id: "no-encryption",
        label: {
          en: "We don't use encryption / I don't think we do",
          es: "No usamos cifrado, o creo que no lo usamos",
        },
      },
    ],
  },
  {
    id: "q4",
    type: "single",
    prompt: {
      en: "How would you describe your organization's technology infrastructure?",
      es: "¿Cómo describiría la infraestructura tecnológica de su organización?",
    },
    options: [
      {
        id: "modern",
        label: {
          en: "Modern — we regularly update systems and software (within last 2 years)",
          es: "Moderna: actualizamos sistemas y software con regularidad (en los últimos 2 años)",
        },
      },
      {
        id: "mixed",
        label: {
          en: "Mixed — some modern systems, some older legacy systems",
          es: "Mixta: algunos sistemas modernos, otros sistemas heredados más antiguos",
        },
      },
      {
        id: "older",
        label: {
          en: "Older — many systems are 5+ years old and infrequently updated",
          es: "Antigua: muchos sistemas tienen más de 5 años y se actualizan con poca frecuencia",
        },
      },
      { id: "unsure", label: { en: "I'm not sure", es: "No estoy seguro" } },
    ],
  },
  {
    id: "q5",
    type: "multi",
    prompt: {
      en: "Is your organization subject to any of these regulatory requirements? (Select all that apply)",
      es: "¿Su organización está sujeta a alguno de estos requisitos regulatorios? (Seleccione todas las que correspondan)",
    },
    options: [
      { id: "hipaa", label: { en: "HIPAA (healthcare data)", es: "HIPAA (datos de salud)" } },
      {
        id: "ferpa",
        label: { en: "FERPA (student education records)", es: "FERPA (registros educativos estudiantiles)" },
      },
      {
        id: "cmmc",
        label: { en: "CMMC / DFARS (defense contracting)", es: "CMMC / DFARS (contratación de defensa)" },
      },
      { id: "pci", label: { en: "PCI-DSS (payment card data)", es: "PCI-DSS (datos de tarjetas de pago)" } },
      {
        id: "colorado",
        label: {
          en: "State of Colorado data protection requirements",
          es: "Requisitos de protección de datos del estado de Colorado",
        },
      },
      {
        id: "federal",
        label: {
          en: "Federal agency data handling requirements",
          es: "Requisitos federales de manejo de datos",
        },
      },
      { id: "none-reg", label: { en: "None that I'm aware of", es: "Ninguno que yo sepa" } },
    ],
  },
  {
    id: "q6",
    type: "single",
    prompt: {
      en: "Has your organization had a cybersecurity audit or assessment in the last 2 years?",
      es: "¿Su organización ha tenido una auditoría o evaluación de ciberseguridad en los últimos 2 años?",
    },
    options: [
      {
        id: "third-party",
        label: { en: "Yes, formal third-party audit", es: "Sí, una auditoría formal de un tercero" },
      },
      { id: "internal", label: { en: "Yes, internal assessment", es: "Sí, una evaluación interna" } },
      {
        id: "planning",
        label: { en: "No, but we're planning one", es: "No, pero estamos planeando una" },
      },
      { id: "no-audit", label: { en: "No", es: "No" } },
    ],
  },
  {
    id: "q7",
    type: "single",
    prompt: {
      en: "Does your organization share data with outside vendors, partners, or cloud services?",
      es: "¿Su organización comparte datos con proveedores externos, socios o servicios en la nube?",
    },
    options: [
      {
        id: "extensive",
        label: {
          en: "Yes, extensively — many external integrations and data sharing",
          es: "Sí, extensamente: muchas integraciones externas y uso compartido de datos",
        },
      },
      {
        id: "some",
        label: {
          en: "Yes, some — a few key vendors or cloud services",
          es: "Sí, algo: algunos proveedores clave o servicios en la nube",
        },
      },
      {
        id: "minimal",
        label: { en: "Minimal — mostly internal systems", es: "Mínimo: mayormente sistemas internos" },
      },
      { id: "unsure-vendor", label: { en: "Not sure", es: "No estoy seguro" } },
    ],
  },
  {
    id: "q8",
    type: "single",
    prompt: {
      en: "How familiar are you with the quantum computing threat to current encryption?",
      es: "¿Qué tan familiarizado está con la amenaza de la computación cuántica para el cifrado actual?",
    },
    options: [
      {
        id: "very-familiar",
        label: {
          en: "Very familiar — we're already working on PQC migration planning",
          es: "Muy familiarizado: ya estamos planificando la migración a PQC",
        },
      },
      {
        id: "somewhat",
        label: {
          en: "Somewhat familiar — I've heard about it but haven't acted",
          es: "Algo familiarizado: he oído hablar de esto, pero no he actuado",
        },
      },
      {
        id: "learning",
        label: {
          en: "Just learning — this assessment is my first exposure",
          es: "Recién aprendiendo: esta evaluación es mi primer contacto con el tema",
        },
      },
      { id: "not-familiar", label: { en: "Not familiar at all", es: "Nada familiarizado" } },
    ],
  },
];

export const ORG_LABELS = {
  "small-business": { en: "small business", es: "pequeña empresa" },
  "medium-business": { en: "medium-sized business", es: "empresa mediana" },
  healthcare: { en: "healthcare organization", es: "organización de salud" },
  k12: { en: "K-12 school or district", es: "escuela o distrito escolar (K-12)" },
  "higher-ed": { en: "higher education institution", es: "institución de educación superior" },
  municipal: { en: "municipal or county government", es: "gobierno municipal o del condado" },
  "state-agency": { en: "state agency", es: "agencia estatal" },
  nonprofit: { en: "nonprofit organization", es: "organización sin fines de lucro" },
  defense: { en: "defense contractor", es: "contratista de defensa" },
};
const DEFAULT_ORG_LABEL = { en: "organization", es: "organización" };

/* Risk tiers. `color`/`bg` are literal hex values (not theme-namespaced)
   so this file has no dependency on either platform's theme module. */
export const TIERS = [
  {
    min: 0,
    max: 30,
    name: { en: "Emerging Awareness", es: "Conciencia Emergente" },
    color: "#2E7D52",
    bg: "#EAF5EF",
    icon: "CheckCircle2",
    blurb: {
      en: "Your immediate risk is low — this is the ideal time to build a plan before migration becomes urgent.",
      es: "Su riesgo inmediato es bajo: este es el momento ideal para elaborar un plan antes de que la migración se vuelva urgente.",
    },
  },
  {
    min: 31,
    max: 55,
    name: { en: "Preparation Needed", es: "Se Necesita Preparación" },
    color: "#C4872A",
    bg: "#FBF3E6",
    icon: "AlertCircle",
    blurb: {
      en: "Your risk is moderate, and specific preparation steps should begin now.",
      es: "Su riesgo es moderado, y se deben comenzar pasos de preparación específicos ahora.",
    },
  },
  {
    min: 56,
    max: 75,
    name: { en: "Significant Exposure", es: "Exposición Significativa" },
    color: "#DD6B20",
    bg: "#FDEEE2",
    icon: "AlertTriangle",
    blurb: {
      en: "Your risk is high, and prioritized action is required in the near term.",
      es: "Su riesgo es alto, y se requiere acción prioritaria en el corto plazo.",
    },
  },
  {
    min: 76,
    max: 100,
    name: { en: "Critical Priority", es: "Prioridad Crítica" },
    color: "#B03A2E",
    bg: "#FBEAE8",
    icon: "ShieldAlert",
    blurb: {
      en: "Your risk is critical and likely carries regulatory implications — immediate action is warranted.",
      es: "Su riesgo es crítico y probablemente conlleve implicaciones regulatorias: se justifica una acción inmediata.",
    },
  },
];

export const NIST_PQC = {
  label: { en: "NIST Post-Quantum Cryptography", es: "Criptografía Poscuántica del NIST" },
  url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
};
export const CISA_PQC = {
  label: {
    en: "CISA Post-Quantum Cryptography Initiative",
    es: "Iniciativa de Criptografía Poscuántica de CISA",
  },
  url: "https://www.cisa.gov/quantum",
};
export const NSA_PQC = {
  label: {
    en: "NSA Quantum-Resistant Algorithm guidance",
    es: "Guía de Algoritmos Resistentes a la Computación Cuántica de la NSA",
  },
  url: "https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/",
};

/* Priority badges on action items. The `priority` field on each action
   stays a plain English literal (used as a lookup key for both this map
   and each platform's own priority->style lookup) — only the *display*
   text is translated. */
export const PRIORITY_LABELS = {
  Immediate: { en: "Immediate", es: "Inmediato" },
  "Within 6 Months": { en: "Within 6 Months", es: "Dentro de 6 meses" },
  "Within 1 Year": { en: "Within 1 Year", es: "Dentro de 1 año" },
};

/* Pure scoring function: answers -> results object (score, tier, risk
   factors in plain language, and a profile-specific action list). Every
   text field on the result is an { en, es } pair for the caller to
   resolve via pick()/t() at render time — that way switching languages
   after a result is already on screen re-renders correctly without
   recomputing the assessment. */
export function calculateResults(answers) {
  const data = answers.q2 || [];
  const reg = answers.q5 || [];
  const orgType = answers.q1;
  let score = 0;
  const factors = [];

  // ---- Data sensitivity ----
  if (data.includes("health")) {
    score += 20;
    factors.push({
      en: "You handle personal health information protected under HIPAA, which will require specific PQC compliance steps as federal guidance emerges.",
      es: "Usted maneja información médica personal protegida bajo HIPAA, lo cual requerirá pasos específicos de cumplimiento de PQC a medida que surja la guía federal.",
    });
  }
  if (data.includes("financial")) {
    score += 15;
    factors.push({
      en: "You handle personal financial data, a primary target for “harvest now, decrypt later” attacks where data stolen today is stored to be decrypted by future quantum computers.",
      es: "Usted maneja datos financieros personales, un objetivo principal de los ataques de “cosechar ahora, descifrar después”, donde los datos robados hoy se almacenan para ser descifrados por futuras computadoras cuánticas.",
    });
  }
  if (data.includes("government")) {
    score += 10;
    factors.push({
      en: "You handle government or classified information, which is subject to federal quantum-safe migration mandates.",
      es: "Usted maneja información gubernamental o clasificada, la cual está sujeta a mandatos federales de migración a estándares seguros contra la computación cuántica.",
    });
  }
  if (data.includes("ip")) {
    score += 8;
    factors.push({
      en: "You hold intellectual property and trade secrets with long-term value, making them attractive targets for harvest-now, decrypt-later attacks.",
      es: "Usted posee propiedad intelectual y secretos comerciales de valor a largo plazo, lo que los convierte en objetivos atractivos para los ataques de cosechar ahora, descifrar después.",
    });
  }
  if (data.includes("pii")) {
    score += 6;
    factors.push({
      en: "You handle personally identifying information (SSNs, ID numbers) that retains its value for years, increasing your long-term exposure.",
      es: "Usted maneja información de identificación personal (números de seguro social, números de identificación) que conserva su valor durante años, lo que aumenta su exposición a largo plazo.",
    });
  }
  if (data.includes("student")) {
    score += 6;
    factors.push({
      en: "You handle student education records protected under FERPA.",
      es: "Usted maneja registros educativos estudiantiles protegidos bajo FERPA.",
    });
  }

  // ---- Organization type ----
  if (orgType === "defense") {
    score += 25;
    factors.push({
      en: "As a defense contractor, you are subject to CMMC and emerging NSA quantum-resistant requirements.",
      es: "Como contratista de defensa, usted está sujeto a CMMC y a los requisitos emergentes de resistencia cuántica de la NSA.",
    });
  } else if (orgType === "state-agency" || orgType === "municipal") {
    score += 20;
    factors.push({
      en: "As a government organization, your systems fall within the scope of federal and state quantum-safe migration efforts.",
      es: "Como organización gubernamental, sus sistemas están dentro del alcance de los esfuerzos federales y estatales de migración a estándares seguros contra la computación cuántica.",
    });
  } else if (orgType === "healthcare") {
    score += 5;
  }

  // ---- Infrastructure age ----
  if (answers.q4 === "older") {
    score += 15;
    factors.push({
      en: "Your technology infrastructure includes older legacy systems that are harder and slower to migrate to new cryptographic standards.",
      es: "Su infraestructura tecnológica incluye sistemas heredados más antiguos que son más difíciles y lentos de migrar a los nuevos estándares criptográficos.",
    });
  } else if (answers.q4 === "mixed" || answers.q4 === "unsure") {
    score += 6;
  }

  // ---- Encryption awareness ----
  if (answers.q3 === "dont-know" || answers.q3 === "no-encryption") {
    score += 20;
    factors.push({
      en: "Your organization lacks clear visibility into its current encryption standards — the essential first step before any migration can begin.",
      es: "Su organización carece de una visibilidad clara de sus estándares de cifrado actuales, el primer paso esencial antes de que pueda comenzar cualquier migración.",
    });
  } else if (answers.q3 === "unsure-standard") {
    score += 8;
  }

  // ---- Security posture ----
  if (answers.q6 === "no-audit") {
    score += 10;
    factors.push({
      en: "Your organization has not had a recent cybersecurity assessment, leaving your current cryptographic exposure unmeasured.",
      es: "Su organización no ha tenido una evaluación de ciberseguridad reciente, dejando su exposición criptográfica actual sin medir.",
    });
  } else if (answers.q6 === "planning") {
    score += 4;
  }

  // ---- Vendor / supply chain ----
  if (answers.q7 === "extensive") {
    score += 10;
    factors.push({
      en: "You share data extensively with external vendors and cloud services — each one is a separate migration dependency you do not fully control.",
      es: "Usted comparte datos extensamente con proveedores externos y servicios en la nube; cada uno representa una dependencia de migración separada que no controla por completo.",
    });
  } else if (answers.q7 === "some") {
    score += 4;
  }

  // ---- Timeline awareness ----
  if (answers.q8 === "not-familiar" || answers.q8 === "learning") {
    score += 5;
    factors.push({
      en: "Awareness of the quantum threat is still early in your organization, which is the most important gap to close first.",
      es: "La conciencia sobre la amenaza cuántica todavía es incipiente en su organización, lo cual es la brecha más importante que cerrar primero.",
    });
  }

  // ---- Regulatory weighting (small additive emphasis) ----
  if (reg.includes("cmmc")) score += 5;
  if (reg.includes("hipaa")) score += 3;

  score = Math.max(0, Math.min(100, Math.round(score)));

  if (factors.length === 0) {
    factors.push({
      en: "Your current exposure is limited, which makes this an ideal time to plan ahead before quantum-safe migration becomes urgent.",
      es: "Su exposición actual es limitada, lo que hace de este el momento ideal para planificar con anticipación antes de que la migración a estándares seguros contra la computación cuántica se vuelva urgente.",
    });
  }

  const tier =
    TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[TIERS.length - 1];

  const orgLabel = ORG_LABELS[orgType] || DEFAULT_ORG_LABEL;
  const interpretation = {
    en: `As a ${orgLabel.en}, your responses place your organization in the "${tier.name.en}" category. ${tier.blurb.en}`,
    es: `Como ${orgLabel.es}, sus respuestas ubican a su organización en la categoría "${tier.name.es}". ${tier.blurb.es}`,
  };

  return {
    score,
    tier,
    factors,
    interpretation,
    priorityActions: buildActions(orgType, data, reg),
    orgLabel,
  };
}

/* Profile-specific prioritized action list (3–5 items). */
export function buildActions(orgType, data, reg) {
  const handlesFinancial =
    data.includes("financial") || reg.includes("pci");
  let actions = [];

  if (orgType === "healthcare") {
    actions = [
      {
        priority: "Immediate",
        title: {
          en: "Inventory all systems handling PHI and their encryption standards",
          es: "Inventaríe todos los sistemas que manejan información médica protegida (PHI) y sus estándares de cifrado",
        },
        description: {
          en: "You cannot protect what you have not mapped. List every system that stores or transmits patient health information and record which encryption each one uses.",
          es: "No puede proteger lo que no ha mapeado. Enumere cada sistema que almacene o transmita información de salud de pacientes y registre qué cifrado utiliza cada uno.",
        },
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Contact your EHR vendor about their PQC migration timeline",
          es: "Contacte a su proveedor de historia clínica electrónica (EHR) sobre su cronograma de migración a PQC",
        },
        description: {
          en: "Your electronic health record system is your largest dependency. Ask your vendor when they will support NIST-approved post-quantum algorithms.",
          es: "Su sistema de historia clínica electrónica es su mayor dependencia. Pregúntele a su proveedor cuándo admitirá algoritmos poscuánticos aprobados por el NIST.",
        },
        resource: null,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Review HHS guidance on PQC requirements for HIPAA compliance",
          es: "Revise la guía del HHS sobre los requisitos de PQC para el cumplimiento de HIPAA",
        },
        description: {
          en: "Federal health-data guidance on quantum-safe encryption is emerging. Assign someone to track it so new requirements do not catch you off guard.",
          es: "La guía federal sobre datos de salud relacionada con el cifrado seguro contra la computación cuántica está surgiendo. Asigne a alguien para seguirla, de modo que los nuevos requisitos no lo tomen por sorpresa.",
        },
        resource: CISA_PQC,
      },
      {
        priority: "Within 1 Year",
        title: {
          en: "Include PQC migration in your next IT security budget cycle",
          es: "Incluya la migración a PQC en su próximo ciclo de presupuesto de seguridad de TI",
        },
        description: {
          en: "Migration takes time and money. Putting a line item in next year's budget now means you are funded when action becomes mandatory.",
          es: "La migración lleva tiempo y dinero. Incluir una partida en el presupuesto del próximo año ahora significa que contará con fondos cuando la acción se vuelva obligatoria.",
        },
        resource: null,
      },
    ];
  } else if (orgType === "defense") {
    actions = [
      {
        priority: "Immediate",
        title: {
          en: "Review CMMC 2.0 requirements and emerging NSA quantum-safe guidance",
          es: "Revise los requisitos de CMMC 2.0 y la guía emergente de la NSA sobre seguridad cuántica",
        },
        description: {
          en: "Defense contracting requirements move first and fastest. Make sure you understand where quantum-resistant cryptography fits into your CMMC obligations.",
          es: "Los requisitos de contratación de defensa avanzan primero y más rápido. Asegúrese de entender dónde encaja la criptografía resistente a la computación cuántica dentro de sus obligaciones de CMMC.",
        },
        resource: NSA_PQC,
      },
      {
        priority: "Immediate",
        title: {
          en: "Contact your prime contractor about their PQC requirements timeline",
          es: "Contacte a su contratista principal sobre su cronograma de requisitos de PQC",
        },
        description: {
          en: "Requirements flow down the supply chain. Ask the prime you work with when they will expect quantum-safe cryptography from subcontractors.",
          es: "Los requisitos se transmiten a lo largo de la cadena de suministro. Pregúntele al contratista principal con el que trabaja cuándo esperará criptografía segura contra la computación cuántica de los subcontratistas.",
        },
        resource: null,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Engage a CMMC consultant with PQC experience",
          es: "Contrate a un consultor de CMMC con experiencia en PQC",
        },
        description: {
          en: "Specialized guidance prevents costly missteps. Bring in an advisor who understands both defense compliance and post-quantum migration.",
          es: "La orientación especializada previene errores costosos. Incorpore a un asesor que entienda tanto el cumplimiento de defensa como la migración poscuántica.",
        },
        resource: null,
      },
      {
        priority: "Within 1 Year",
        title: {
          en: "Begin migration to NIST-approved PQC algorithms for contract communications",
          es: "Comience la migración a algoritmos PQC aprobados por el NIST para las comunicaciones contractuales",
        },
        description: {
          en: "Start with the systems that handle contract-related and controlled information, where exposure and oversight are highest.",
          es: "Comience con los sistemas que manejan información relacionada con contratos e información controlada, donde la exposición y la supervisión son mayores.",
        },
        resource: NIST_PQC,
      },
    ];
  } else if (orgType === "municipal" || orgType === "state-agency") {
    actions = [
      {
        priority: "Immediate",
        title: {
          en: "Inventory systems handling resident data and their encryption",
          es: "Inventaríe los sistemas que manejan datos de residentes y su cifrado",
        },
        description: {
          en: "Map every system that holds constituent records and note its current encryption standard. This inventory is the foundation of any migration plan.",
          es: "Mapee cada sistema que contenga registros de residentes y anote su estándar de cifrado actual. Este inventario es la base de cualquier plan de migración.",
        },
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Engage NIST Boulder and CISA resources for a migration roadmap",
          es: "Utilice los recursos de NIST Boulder y CISA para elaborar una hoja de ruta de migración",
        },
        description: {
          en: "Colorado has the federal standard-setting body for PQC in its own backyard. Use CISA's public-sector guidance to build a phased roadmap.",
          es: "Colorado tiene en su propio territorio al organismo federal que establece los estándares de PQC. Use la guía del sector público de CISA para construir una hoja de ruta por etapas.",
        },
        resource: CISA_PQC,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Identify critical infrastructure systems for priority migration",
          es: "Identifique los sistemas de infraestructura crítica para migración prioritaria",
        },
        description: {
          en: "Not everything can move at once. Rank systems by sensitivity and public impact so the most critical ones migrate first.",
          es: "No todo se puede migrar a la vez. Clasifique los sistemas por sensibilidad e impacto público para que los más críticos migren primero.",
        },
        resource: null,
      },
      {
        priority: "Within 1 Year",
        title: {
          en: "Set a PQC migration timeline aligned with federal guidance",
          es: "Establezca un cronograma de migración a PQC alineado con la guía federal",
        },
        description: {
          en: "Establish a target (for example, beginning by 2027) so the effort has accountability and a clear destination.",
          es: "Establezca una meta (por ejemplo, comenzar antes de 2027) para que el esfuerzo tenga responsabilidad y un destino claro.",
        },
        resource: null,
      },
    ];
  } else if (orgType === "k12" || orgType === "higher-ed") {
    actions = [
      {
        priority: "Immediate",
        title: {
          en: "Inventory systems handling student records and their encryption",
          es: "Inventaríe los sistemas que manejan registros estudiantiles y su cifrado",
        },
        description: {
          en: "Student data is protected under FERPA. List every system that stores grades, assessments, and personal information, and note how each is encrypted.",
          es: "Los datos estudiantiles están protegidos bajo FERPA. Enumere cada sistema que almacene calificaciones, evaluaciones e información personal, y anote cómo se cifra cada uno.",
        },
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Ask your student information system vendor about their PQC timeline",
          es: "Pregúntele a su proveedor del sistema de información estudiantil sobre su cronograma de PQC",
        },
        description: {
          en: "Your SIS is a central dependency. Ask the vendor when they plan to support post-quantum encryption standards.",
          es: "Su sistema de información estudiantil (SIS) es una dependencia central. Pregúntele al proveedor cuándo planea admitir estándares de cifrado poscuántico.",
        },
        resource: null,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Review FERPA data-protection guidance as PQC requirements emerge",
          es: "Revise la guía de protección de datos de FERPA a medida que surjan los requisitos de PQC",
        },
        description: {
          en: "Federal education-data guidance will evolve alongside the new standards. Assign someone to monitor it.",
          es: "La guía federal sobre datos educativos evolucionará junto con los nuevos estándares. Asigne a alguien para monitorearla.",
        },
        resource: CISA_PQC,
      },
      {
        priority: "Within 1 Year",
        title: {
          en: "Include PQC readiness in your technology plan",
          es: "Incluya la preparación para PQC en su plan tecnológico",
        },
        description: {
          en: "Fold quantum-safe migration into your district or institution's existing multi-year technology roadmap and budget.",
          es: "Incorpore la migración a estándares seguros contra la computación cuántica en la hoja de ruta tecnológica plurianual y el presupuesto existentes de su distrito o institución.",
        },
        resource: null,
      },
    ];
  } else {
    // small / medium business, nonprofit, and default
    actions = [
      {
        priority: "Immediate",
        title: {
          en: "Inventory the sensitive data your organization holds",
          es: "Inventaríe los datos confidenciales que posee su organización",
        },
        description: {
          en: "Make a simple list of the most sensitive data you store and where it lives. This is the cheapest, highest-value first step.",
          es: "Elabore una lista simple de los datos más confidenciales que almacena y dónde se encuentran. Este es el primer paso más económico y de mayor valor.",
        },
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: {
          en: "Ask your IT provider when they plan to implement PQC standards",
          es: "Pregúntele a su proveedor de TI cuándo planea implementar los estándares de PQC",
        },
        description: {
          en: "Most small and mid-sized organizations rely on an IT provider or managed service provider. Ask them directly about their post-quantum migration plan.",
          es: "La mayoría de las organizaciones pequeñas y medianas dependen de un proveedor de TI o de servicios administrados. Pregúnteles directamente sobre su plan de migración poscuántica.",
        },
        resource: null,
      },
      {
        priority: "Within 1 Year",
        title: {
          en: "Review your cyber insurance policy for quantum-related coverage",
          es: "Revise su póliza de seguro cibernético en busca de cobertura relacionada con la computación cuántica",
        },
        description: {
          en: "Cyber insurance terms are starting to reference cryptographic standards. Confirm what your policy expects and covers.",
          es: "Los términos de los seguros cibernéticos están comenzando a hacer referencia a los estándares criptográficos. Confirme qué exige y cubre su póliza.",
        },
        resource: null,
      },
    ];
    if (handlesFinancial) {
      actions.splice(2, 0, {
        priority: "Within 6 Months",
        title: {
          en: "Confirm your payment processor is on a PQC migration timeline",
          es: "Confirme que su procesador de pagos tenga un cronograma de migración a PQC",
        },
        description: {
          en: "Because you handle payment or financial data, ask your payment processor when they will adopt quantum-safe encryption.",
          es: "Debido a que maneja datos de pago o financieros, pregúntele a su procesador de pagos cuándo adoptará el cifrado seguro contra la computación cuántica.",
        },
        resource: null,
      });
    }
  }

  return actions.slice(0, 5);
}
