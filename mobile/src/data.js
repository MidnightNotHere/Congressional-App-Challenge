/* =========================================================================
   Quantum4Colorado — data + assessment scoring (pure JS, ported verbatim
   from the web app so both platforms stay in sync).
   ========================================================================= */
import { colors } from "./theme";

export const HERO_STATS = [
  { value: "$800M+", label: "Federal quantum investment in Colorado" },
  { value: "140+", label: "Quantum researchers across CU Boulder & Colorado institutions" },
  { value: "#1", label: "Colorado's ranking in quantum workforce development infrastructure" },
];

export const EXPLAINER_CARDS = [
  {
    icon: "Lock",
    title: "The Problem With Today's Computers",
    body:
      "Today's computers solve problems one step at a time. Quantum computers can explore millions of possibilities simultaneously — like checking every path through a maze at once instead of trying them one by one.",
  },
  {
    icon: "Shield",
    title: "Why It Changes Everything",
    body:
      "Quantum computers will eventually be able to break the encryption protecting your bank account, medical records, and government systems. They will also create unbreakable new encryption — the race to get there first is already underway.",
  },
  {
    icon: "MapPin",
    title: "Why Colorado Is Leading",
    body:
      "Colorado hosts NIST Boulder — the federal agency setting the world's post-quantum security standards — plus JILA, one of the planet's premier quantum physics institutes. No other state has this combination of federal and academic quantum infrastructure.",
  },
];

export const ECOSYSTEM_TABS = [
  {
    id: "federal",
    label: "Federal",
    icon: "Landmark",
    color: colors.primary,
    orgs: [
      {
        name: "NIST Boulder Laboratories",
        location: "Boulder, CO",
        role: "Sets US post-quantum cryptography standards.",
        significance:
          "PQC standards finalized here in 2024 are the foundation of national quantum security policy.",
      },
      {
        name: "National Renewable Energy Laboratory (NREL)",
        location: "Golden, CO",
        role: "Quantum computing applications for energy systems.",
        significance:
          "Connects Colorado's quantum capacity to the future of the national power grid.",
      },
      {
        name: "Rocky Mountain Regional Cyber Center",
        location: "Colorado",
        role: "Supporting federal quantum security coordination.",
        significance:
          "Regional hub linking Colorado institutions to federal cybersecurity efforts.",
      },
    ],
  },
  {
    id: "university",
    label: "University",
    icon: "GraduationCap",
    color: colors.secondary,
    orgs: [
      {
        name: "JILA at CU Boulder",
        location: "Boulder, CO",
        role: "World-class quantum physics research institute, a joint CU Boulder / NIST program. 140+ researchers.",
        significance:
          "Consistently ranked among the top quantum physics institutes in the world.",
      },
      {
        name: "CU Boulder Quantum Initiative",
        location: "Boulder, CO",
        role: "Undergraduate and graduate quantum research programs, with multiple active quantum computing labs.",
        significance:
          "The talent pipeline feeding national labs and Colorado's quantum companies.",
      },
      {
        name: "Colorado School of Mines",
        location: "Golden, CO",
        role: "Quantum materials research programs.",
        significance:
          "Builds the foundational materials science that quantum hardware depends on.",
      },
      {
        name: "Colorado State University",
        location: "Fort Collins, CO",
        role: "Quantum sensing and photonics research.",
        significance:
          "Extends Colorado's quantum strength beyond the Front Range corridor.",
      },
    ],
  },
  {
    id: "industry",
    label: "Industry",
    icon: "Cpu",
    color: colors.accent,
    orgs: [
      {
        name: "Quantinuum",
        location: "Broomfield, CO",
        role: "Quantum computing hardware and software — one of the world's leading quantum computing companies, headquartered in Colorado.",
        significance:
          "A globally significant quantum company chose Colorado as its home base.",
      },
      {
        name: "Ball Aerospace",
        location: "Broomfield, CO",
        role: "Quantum sensing applications for defense and space.",
        significance: "Applies quantum technology to Colorado's large aerospace economy.",
      },
      {
        name: "Lockheed Martin",
        location: "Littleton, CO",
        role: "Quantum computing research for defense applications.",
        significance: "Anchors quantum work within one of Colorado's largest employers.",
      },
      {
        name: "Raytheon Technologies",
        location: "Aurora, CO",
        role: "Quantum cryptography applications for defense systems.",
        significance: "Brings quantum-secure communications research to the CO-06 region.",
      },
    ],
  },
  {
    id: "policy",
    label: "Policy",
    icon: "Building2",
    color: "#6B46C1",
    orgs: [
      {
        name: "Colorado Quantum Network (CQN)",
        location: "Statewide",
        role: "Consortium of Colorado quantum researchers and industry partners advocating for state quantum investment.",
        significance: "The closest thing Colorado has to a coordinated quantum strategy today.",
      },
      {
        name: "Colorado OEDIT",
        location: "Denver, CO",
        role: "Office of Economic Development & International Trade — Advanced Industries program covering the quantum technology sector.",
        significance: "The state agency best positioned to lead a formal quantum initiative.",
      },
    ],
  },
];

export const STRENGTHS = [
  "NIST Boulder: the only state with the federal PQC standard-setting body.",
  "JILA: a top-5 quantum physics institute globally.",
  "Quantinuum HQ: one of three leading quantum computing companies globally.",
  "CU Boulder quantum workforce pipeline: feeds national labs and industry.",
];

export const GAPS = [
  "Illinois passed the Illinois Quantum Act in 2023 with dedicated state funding.",
  "New York committed $200M to a quantum campus at IBM's Hudson Valley site.",
  "Colorado has world-class federal and university infrastructure but no coordinated state quantum investment strategy.",
  "Without state-level coordination, Colorado risks losing talent and companies to states with explicit quantum programs.",
];

/* --------------------------------- Assessment --------------------------------- */
export const QUESTIONS = [
  {
    id: "q1",
    type: "single",
    prompt: "What best describes your organization?",
    options: [
      { id: "small-business", label: "Small Business (under 50 employees)" },
      { id: "medium-business", label: "Medium Business (50–500 employees)" },
      { id: "healthcare", label: "Healthcare Organization (hospital, clinic, practice)" },
      { id: "k12", label: "K-12 School or School District" },
      { id: "higher-ed", label: "Higher Education Institution" },
      { id: "municipal", label: "Municipal or County Government" },
      { id: "state-agency", label: "State Agency" },
      { id: "nonprofit", label: "Nonprofit Organization" },
      { id: "defense", label: "Defense Contractor or Subcontractor" },
    ],
  },
  {
    id: "q2",
    type: "multi",
    prompt: "What kinds of sensitive data does your organization handle? (Select all that apply)",
    options: [
      { id: "financial", label: "Personal financial information (bank accounts, cards, payments)" },
      { id: "health", label: "Personal health information (medical records, insurance)" },
      { id: "student", label: "Student records (grades, assessments, personal info)" },
      { id: "government", label: "Government or classified information" },
      { id: "ip", label: "Intellectual property or trade secrets" },
      { id: "pii", label: "Personal identifying information (SSN, addresses, IDs)" },
      { id: "customer", label: "Customer or client personal data" },
      { id: "none", label: "None of the above" },
    ],
  },
  {
    id: "q3",
    type: "single",
    prompt: "Do you know what encryption standard currently protects your data?",
    options: [
      { id: "rsa-ecc", label: "Yes, we use RSA or ECC encryption (most common)" },
      { id: "other-known", label: "Yes, we use something else" },
      { id: "unsure-standard", label: "We have some encryption but I'm not sure of the standard" },
      { id: "dont-know", label: "I don't know what encryption we use" },
      { id: "no-encryption", label: "We don't use encryption / I don't think we do" },
    ],
  },
  {
    id: "q4",
    type: "single",
    prompt: "How would you describe your technology infrastructure?",
    options: [
      { id: "modern", label: "Modern — regularly updated (within last 2 years)" },
      { id: "mixed", label: "Mixed — some modern systems, some older legacy systems" },
      { id: "older", label: "Older — many systems 5+ years old, infrequently updated" },
      { id: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: "q5",
    type: "multi",
    prompt: "Is your organization subject to any of these regulations? (Select all that apply)",
    options: [
      { id: "hipaa", label: "HIPAA (healthcare data)" },
      { id: "ferpa", label: "FERPA (student education records)" },
      { id: "cmmc", label: "CMMC / DFARS (defense contracting)" },
      { id: "pci", label: "PCI-DSS (payment card data)" },
      { id: "colorado", label: "State of Colorado data protection requirements" },
      { id: "federal", label: "Federal agency data handling requirements" },
      { id: "none-reg", label: "None that I'm aware of" },
    ],
  },
  {
    id: "q6",
    type: "single",
    prompt: "Have you had a cybersecurity audit or assessment in the last 2 years?",
    options: [
      { id: "third-party", label: "Yes, formal third-party audit" },
      { id: "internal", label: "Yes, internal assessment" },
      { id: "planning", label: "No, but we're planning one" },
      { id: "no-audit", label: "No" },
    ],
  },
  {
    id: "q7",
    type: "single",
    prompt: "Do you share data with outside vendors, partners, or cloud services?",
    options: [
      { id: "extensive", label: "Yes, extensively — many external integrations" },
      { id: "some", label: "Yes, some — a few key vendors or cloud services" },
      { id: "minimal", label: "Minimal — mostly internal systems" },
      { id: "unsure-vendor", label: "Not sure" },
    ],
  },
  {
    id: "q8",
    type: "single",
    prompt: "How familiar are you with the quantum threat to current encryption?",
    options: [
      { id: "very-familiar", label: "Very familiar — we're already planning PQC migration" },
      { id: "somewhat", label: "Somewhat familiar — I've heard about it but haven't acted" },
      { id: "learning", label: "Just learning — this assessment is my first exposure" },
      { id: "not-familiar", label: "Not familiar at all" },
    ],
  },
];

export const ORG_LABELS = {
  "small-business": "small business",
  "medium-business": "medium-sized business",
  healthcare: "healthcare organization",
  k12: "K-12 school or district",
  "higher-ed": "higher education institution",
  municipal: "municipal or county government",
  "state-agency": "state agency",
  nonprofit: "nonprofit organization",
  defense: "defense contractor",
};

export const TIERS = [
  {
    min: 0,
    max: 30,
    name: "Emerging Awareness",
    color: colors.secondary,
    bg: colors.greenTint,
    icon: "CheckCircle2",
    blurb:
      "Your immediate risk is low — this is the ideal time to build a plan before migration becomes urgent.",
  },
  {
    min: 31,
    max: 55,
    name: "Preparation Needed",
    color: colors.accent,
    bg: colors.goldTint,
    icon: "AlertCircle",
    blurb: "Your risk is moderate, and specific preparation steps should begin now.",
  },
  {
    min: 56,
    max: 75,
    name: "Significant Exposure",
    color: colors.orange,
    bg: colors.orangeTint,
    icon: "AlertTriangle",
    blurb: "Your risk is high, and prioritized action is required in the near term.",
  },
  {
    min: 76,
    max: 100,
    name: "Critical Priority",
    color: colors.danger,
    bg: colors.redTint,
    icon: "ShieldAlert",
    blurb:
      "Your risk is critical and likely carries regulatory implications — immediate action is warranted.",
  },
];

export const NIST_PQC = {
  label: "NIST Post-Quantum Cryptography",
  url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
};
export const CISA_PQC = {
  label: "CISA Post-Quantum Cryptography Initiative",
  url: "https://www.cisa.gov/quantum",
};
export const NSA_PQC = {
  label: "NSA Quantum-Resistant Algorithm guidance",
  url: "https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/",
};

/* Pure scoring function: answers -> results object */
export function calculateResults(answers) {
  const data = answers.q2 || [];
  const reg = answers.q5 || [];
  const orgType = answers.q1;
  let score = 0;
  const factors = [];

  if (data.includes("health")) {
    score += 20;
    factors.push(
      "You handle personal health information protected under HIPAA, which will require specific PQC compliance steps as federal guidance emerges."
    );
  }
  if (data.includes("financial")) {
    score += 15;
    factors.push(
      "You handle personal financial data, a primary target for “harvest now, decrypt later” attacks where data stolen today is stored to be decrypted by future quantum computers."
    );
  }
  if (data.includes("government")) {
    score += 10;
    factors.push(
      "You handle government or classified information, which is subject to federal quantum-safe migration mandates."
    );
  }
  if (data.includes("ip")) {
    score += 8;
    factors.push(
      "You hold intellectual property and trade secrets with long-term value, making them attractive targets for harvest-now, decrypt-later attacks."
    );
  }
  if (data.includes("pii")) {
    score += 6;
    factors.push(
      "You handle personally identifying information (SSNs, ID numbers) that retains its value for years, increasing your long-term exposure."
    );
  }
  if (data.includes("student")) {
    score += 6;
    factors.push("You handle student education records protected under FERPA.");
  }

  if (orgType === "defense") {
    score += 25;
    factors.push(
      "As a defense contractor, you are subject to CMMC and emerging NSA quantum-resistant requirements."
    );
  } else if (orgType === "state-agency" || orgType === "municipal") {
    score += 20;
    factors.push(
      "As a government organization, your systems fall within the scope of federal and state quantum-safe migration efforts."
    );
  } else if (orgType === "healthcare") {
    score += 5;
  }

  if (answers.q4 === "older") {
    score += 15;
    factors.push(
      "Your technology infrastructure includes older legacy systems that are harder and slower to migrate to new cryptographic standards."
    );
  } else if (answers.q4 === "mixed" || answers.q4 === "unsure") {
    score += 6;
  }

  if (answers.q3 === "dont-know" || answers.q3 === "no-encryption") {
    score += 20;
    factors.push(
      "Your organization lacks clear visibility into its current encryption standards — the essential first step before any migration can begin."
    );
  } else if (answers.q3 === "unsure-standard") {
    score += 8;
  }

  if (answers.q6 === "no-audit") {
    score += 10;
    factors.push(
      "Your organization has not had a recent cybersecurity assessment, leaving your current cryptographic exposure unmeasured."
    );
  } else if (answers.q6 === "planning") {
    score += 4;
  }

  if (answers.q7 === "extensive") {
    score += 10;
    factors.push(
      "You share data extensively with external vendors and cloud services — each one is a separate migration dependency you do not fully control."
    );
  } else if (answers.q7 === "some") {
    score += 4;
  }

  if (answers.q8 === "not-familiar" || answers.q8 === "learning") {
    score += 5;
    factors.push(
      "Awareness of the quantum threat is still early in your organization, which is the most important gap to close first."
    );
  }

  if (reg.includes("cmmc")) score += 5;
  if (reg.includes("hipaa")) score += 3;

  score = Math.max(0, Math.min(100, Math.round(score)));

  if (factors.length === 0) {
    factors.push(
      "Your current exposure is limited, which makes this an ideal time to plan ahead before quantum-safe migration becomes urgent."
    );
  }

  const tier =
    TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[TIERS.length - 1];
  const orgLabel = ORG_LABELS[orgType] || "organization";
  const interpretation = `As a ${orgLabel}, your responses place your organization in the "${tier.name}" category. ${tier.blurb}`;

  return {
    score,
    tier,
    factors,
    interpretation,
    priorityActions: buildActions(orgType, data, reg),
    orgLabel,
  };
}

/* Profile-specific prioritized action list (3–5 items) */
export function buildActions(orgType, data, reg) {
  const handlesFinancial = data.includes("financial") || reg.includes("pci");
  let actions = [];

  if (orgType === "healthcare") {
    actions = [
      {
        priority: "Immediate",
        title: "Inventory all systems handling PHI and their encryption standards",
        description:
          "You cannot protect what you have not mapped. List every system that stores or transmits patient health information and record which encryption each one uses.",
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: "Contact your EHR vendor about their PQC migration timeline",
        description:
          "Your electronic health record system is your largest dependency. Ask your vendor when they will support NIST-approved post-quantum algorithms.",
        resource: null,
      },
      {
        priority: "Within 6 Months",
        title: "Review HHS guidance on PQC requirements for HIPAA compliance",
        description:
          "Federal health-data guidance on quantum-safe encryption is emerging. Assign someone to track it so new requirements do not catch you off guard.",
        resource: CISA_PQC,
      },
      {
        priority: "Within 1 Year",
        title: "Include PQC migration in your next IT security budget cycle",
        description:
          "Migration takes time and money. Putting a line item in next year's budget now means you are funded when action becomes mandatory.",
        resource: null,
      },
    ];
  } else if (orgType === "defense") {
    actions = [
      {
        priority: "Immediate",
        title: "Review CMMC 2.0 requirements and emerging NSA quantum-safe guidance",
        description:
          "Defense contracting requirements move first and fastest. Make sure you understand where quantum-resistant cryptography fits into your CMMC obligations.",
        resource: NSA_PQC,
      },
      {
        priority: "Immediate",
        title: "Contact your prime contractor about their PQC requirements timeline",
        description:
          "Requirements flow down the supply chain. Ask the prime you work with when they will expect quantum-safe cryptography from subcontractors.",
        resource: null,
      },
      {
        priority: "Within 6 Months",
        title: "Engage a CMMC consultant with PQC experience",
        description:
          "Specialized guidance prevents costly missteps. Bring in an advisor who understands both defense compliance and post-quantum migration.",
        resource: null,
      },
      {
        priority: "Within 1 Year",
        title: "Begin migration to NIST-approved PQC algorithms for contract communications",
        description:
          "Start with the systems that handle contract-related and controlled information, where exposure and oversight are highest.",
        resource: NIST_PQC,
      },
    ];
  } else if (orgType === "municipal" || orgType === "state-agency") {
    actions = [
      {
        priority: "Immediate",
        title: "Inventory systems handling resident data and their encryption",
        description:
          "Map every system that holds constituent records and note its current encryption standard. This inventory is the foundation of any migration plan.",
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: "Engage NIST Boulder and CISA resources for a migration roadmap",
        description:
          "Colorado has the federal standard-setting body for PQC in its own backyard. Use CISA's public-sector guidance to build a phased roadmap.",
        resource: CISA_PQC,
      },
      {
        priority: "Within 6 Months",
        title: "Identify critical infrastructure systems for priority migration",
        description:
          "Not everything can move at once. Rank systems by sensitivity and public impact so the most critical ones migrate first.",
        resource: null,
      },
      {
        priority: "Within 1 Year",
        title: "Set a PQC migration timeline aligned with federal guidance",
        description:
          "Establish a target (for example, beginning by 2027) so the effort has accountability and a clear destination.",
        resource: null,
      },
    ];
  } else if (orgType === "k12" || orgType === "higher-ed") {
    actions = [
      {
        priority: "Immediate",
        title: "Inventory systems handling student records and their encryption",
        description:
          "Student data is protected under FERPA. List every system that stores grades, assessments, and personal information, and note how each is encrypted.",
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: "Ask your student information system vendor about their PQC timeline",
        description:
          "Your SIS is a central dependency. Ask the vendor when they plan to support post-quantum encryption standards.",
        resource: null,
      },
      {
        priority: "Within 6 Months",
        title: "Review FERPA data-protection guidance as PQC requirements emerge",
        description:
          "Federal education-data guidance will evolve alongside the new standards. Assign someone to monitor it.",
        resource: CISA_PQC,
      },
      {
        priority: "Within 1 Year",
        title: "Include PQC readiness in your technology plan",
        description:
          "Fold quantum-safe migration into your district or institution's existing multi-year technology roadmap and budget.",
        resource: null,
      },
    ];
  } else {
    actions = [
      {
        priority: "Immediate",
        title: "Inventory the sensitive data your organization holds",
        description:
          "Make a simple list of the most sensitive data you store and where it lives. This is the cheapest, highest-value first step.",
        resource: NIST_PQC,
      },
      {
        priority: "Within 6 Months",
        title: "Ask your IT provider when they plan to implement PQC standards",
        description:
          "Most small and mid-sized organizations rely on an IT provider or managed service provider. Ask them directly about their post-quantum migration plan.",
        resource: null,
      },
      {
        priority: "Within 1 Year",
        title: "Review your cyber insurance policy for quantum-related coverage",
        description:
          "Cyber insurance terms are starting to reference cryptographic standards. Confirm what your policy expects and covers.",
        resource: null,
      },
    ];
    if (handlesFinancial) {
      actions.splice(2, 0, {
        priority: "Within 6 Months",
        title: "Confirm your payment processor is on a PQC migration timeline",
        description:
          "Because you handle payment or financial data, ask your payment processor when they will adopt quantum-safe encryption.",
        resource: null,
      });
    }
  }
  return actions.slice(0, 5);
}

/* ------------------------------ Representatives ------------------------------ */
export const INVESTMENT_CHART = [
  { state: "Illinois", amount: 500 },
  { state: "New York", amount: 200 },
  { state: "California", amount: 200 },
  { state: "Colorado", amount: 0 },
];

export const INVESTMENT_TABLE = [
  { state: "Illinois", initiative: "Illinois Quantum Act", investment: "State funding + quantum campus", year: "2023" },
  { state: "New York", initiative: "IBM Quantum Campus", investment: "$200M committed", year: "2022" },
  { state: "California", initiative: "Quantum research expansion", investment: "$200M+ state funding", year: "2022" },
  { state: "Maryland", initiative: "Univ. of Maryland + NIST", investment: "Federal + state coordination", year: "Ongoing" },
  { state: "Colorado", initiative: "No coordinated initiative", investment: "Federal infrastructure only", year: "—", highlight: true },
];

export const DETAILED_ECOSYSTEM = [
  {
    name: "NIST Boulder Laboratories",
    location: "Boulder, CO",
    focus: "Post-quantum cryptography standards; quantum measurement science.",
    funding: "Federal (U.S. Department of Commerce / NIST).",
    employment: "Thousands of federal scientists and staff across NIST Boulder.",
    connection:
      "NIST Boulder authored the post-quantum cryptography standards finalized in 2024 that now anchor national and global quantum security policy. No other state hosts the body that writes these rules.",
  },
  {
    name: "JILA at CU Boulder",
    location: "Boulder, CO",
    focus: "Quantum physics, atomic clocks, precision measurement, quantum sensing.",
    funding: "Joint CU Boulder / NIST institute; federal and university support.",
    employment: "140+ researchers, plus graduate and postdoctoral scientists.",
    connection:
      "JILA is consistently ranked among the world's premier quantum physics institutes and is a primary reason quantum talent and companies cluster in Colorado.",
  },
  {
    name: "Quantinuum",
    location: "Broomfield, CO",
    focus: "Trapped-ion quantum computing hardware and quantum software.",
    funding: "Private (formed from Honeywell Quantum Solutions and Cambridge Quantum).",
    employment: "Hundreds of employees across its Colorado operations.",
    connection:
      "One of the world's leading quantum computing companies is headquartered in Colorado, giving the state a globally significant private-sector anchor.",
  },
  {
    name: "CU Boulder Quantum Initiative",
    location: "Boulder, CO",
    focus: "Quantum information science research and education programs.",
    funding: "University, federal grants, and industry partnerships.",
    employment: "Faculty, research staff, and a large student population.",
    connection:
      "Produces the steady supply of quantum-trained graduates that national labs and Colorado companies depend on.",
  },
  {
    name: "National Renewable Energy Laboratory (NREL)",
    location: "Golden, CO",
    focus: "Quantum computing applications for energy systems and grid optimization.",
    funding: "Federal (U.S. Department of Energy).",
    employment: "A large federal research workforce in Golden.",
    connection:
      "Links Colorado's quantum capability to national energy infrastructure and clean-energy leadership.",
  },
  {
    name: "Colorado School of Mines",
    location: "Golden, CO",
    focus: "Quantum materials and quantum engineering research.",
    funding: "University and federal research grants.",
    employment: "Faculty and graduate research programs.",
    connection:
      "Strengthens the materials-science foundation that quantum hardware development requires.",
  },
  {
    name: "Colorado State University",
    location: "Fort Collins, CO",
    focus: "Quantum sensing and photonics research.",
    funding: "University and federal research grants.",
    employment: "Faculty and graduate research programs.",
    connection:
      "Broadens Colorado's quantum strengths beyond the Boulder–Denver corridor into northern Colorado.",
  },
  {
    name: "Colorado Quantum Network (CQN)",
    location: "Statewide",
    focus: "Coordination and advocacy among Colorado quantum researchers and industry.",
    funding: "Consortium / partner supported.",
    employment: "Member institutions across the state.",
    connection:
      "The most natural partner for any future state-led quantum economic development initiative.",
  },
];

export const RECOMMENDATIONS = [
  {
    title: "Establish a Colorado Quantum Economic Development Initiative",
    rationale:
      "Coordinate Colorado's existing federal infrastructure (NIST, JILA, NREL) with state economic development funding to attract quantum companies and retain talent. The pieces already exist — what is missing is a coordinating strategy and dedicated state investment.",
    precedent: "Modeled on the Illinois Quantum Act (2023).",
    impact:
      "Company formation, high-wage job creation, and national quantum leadership built on assets Colorado already owns.",
  },
  {
    title: "Create a Colorado Post-Quantum Cybersecurity Task Force",
    rationale:
      "Convene NIST Boulder researchers, state agency CIOs, and private-sector representatives to develop a Colorado-specific PQC migration timeline for state agencies and critical infrastructure.",
    precedent: "Federal CISA post-quantum readiness efforts adapted to the state level.",
    impact:
      "A clear, coordinated migration path that protects resident data and state systems ahead of federal mandates.",
  },
  {
    title: "Fund a Quantum Workforce Pipeline at Colorado Universities",
    rationale:
      "Partner with CU Boulder, Colorado School of Mines, and Colorado State University to establish dedicated quantum computing degree programs and industry partnerships.",
    precedent: "State-funded talent pipelines tied to advanced-industry employers in other states.",
    impact:
      "A homegrown talent supply that keeps quantum graduates — and the companies that hire them — in Colorado.",
  },
  {
    title: "Establish Colorado as a Quantum-Secure State Government",
    rationale:
      "Set a state target to begin PQC migration of all state agency systems by 2027, making Colorado the first state to formally commit to quantum-safe government infrastructure.",
    precedent: "Federal quantum-safe migration mandates for U.S. agencies, applied at the state level.",
    impact:
      "National recognition as a first-mover, plus concrete protection for the data of every Coloradan.",
  },
];

export const DATA_SOURCES = [
  "NIST (National Institute of Standards and Technology)",
  "CISA Post-Quantum Cryptography Initiative",
  "NSA quantum-resistant algorithm guidance",
  "CU Boulder and JILA public records",
  "Colorado OEDIT — Advanced Industries program",
  "Colorado Quantum Network",
  "Publicly available company information",
  "State quantum initiative public announcements",
];

/* =========================================================================
   Youth & Education — "Quantum for Colorado Youth"
   Ported verbatim from the web app's SECTION 4 data (Quantum4Colorado.jsx)
   so both platforms show identical content.
   ========================================================================= */

export const HERO_CARDS = [
  {
    title: "Your Privacy",
    icon: "Lock",
    teaser:
      "Every text, photo, and password you use is protected by encryption a quantum computer could eventually break.",
    expanded:
      "Websites and apps use math problems that are nearly impossible for regular computers to solve quickly — that's what keeps your data locked. A powerful enough quantum computer could eventually solve those same problems in a fraction of the time, which is why NIST finalized new \"quantum-safe\" encryption standards in 2024. The good news: those new standards already exist, and organizations everywhere — including right here in Colorado — are starting to switch to them.",
  },
  {
    title: "Your Future Career",
    icon: "Briefcase",
    teaser:
      "Colorado is home to some of the world's most important quantum research institutions. These jobs didn't exist ten years ago.",
    expanded:
      "Ten years ago, \"quantum software developer\" wasn't a job title anywhere in the world — now Colorado companies like Quantinuum are hiring for it. Between JILA, NIST Boulder, and a growing cluster of quantum companies, Colorado has one of the highest concentrations of quantum-related job openings in the country. Whether you like physics, code, policy, or business, there's very likely a version of this field built for you.",
  },
  {
    title: "The Global Race",
    icon: "Globe",
    teaser:
      "The US, China, and the EU are racing to build quantum computers that will reshape medicine, security, and the world economy.",
    expanded:
      "Countries are pouring billions of dollars into quantum computing because whoever builds the most powerful systems first could gain a major edge in medicine, encryption, and military technology. The United States' quantum strategy runs partly through Colorado — NIST Boulder wrote the post-quantum cryptography rules the rest of the world is now adopting. That puts Colorado students unusually close to the center of a decision that will shape the next few decades.",
  },
];

export const CONCEPT_CARDS = [
  {
    title: "Superposition",
    icon: "Layers",
    body:
      "Imagine flipping a coin and, while it's spinning in the air, it's genuinely both heads AND tails at once — not just unknown, but truly both. Only when it lands (when you \"observe\" it) does it become one or the other. A quantum bit, or \"qubit,\" works the same way: it can exist as both 0 and 1 simultaneously until it's measured. That's what lets quantum computers explore many possibilities at once instead of one at a time.",
    resourceLabel: "Khan Academy",
    // TODO: link to Khan Academy's physics fundamentals content —
    // https://www.khanacademy.org/science/physics (accessible entry point, no prior background needed)
    href: "#",
  },
  {
    title: "Entanglement",
    icon: "Link2",
    body:
      "Picture two coins that are magically linked: no matter how far apart you carry them, flipping one to heads instantly makes the other one tails — every single time, faster than any signal could travel between them. Einstein called this \"spooky action at a distance\" because it seemed to break the rules of physics as he understood them. Entangled particles behave in a way that has no equivalent in everyday life, and it's a core resource quantum computers use to link qubits and quantum networks use to communicate securely.",
    resourceLabel: "MIT OpenCourseWare",
    // TODO: link to MIT OpenCourseWare's quantum mechanics / quantum computation materials —
    // https://ocw.mit.edu (search "quantum entanglement") for students ready to go deeper
    href: "#",
  },
  {
    title: "Post-Quantum Cryptography",
    icon: "KeyRound",
    body:
      "Think of your data as valuables inside a safe, and encryption as the combination lock protecting it. Today's locks are strong enough that even a room full of regular computers guessing forever couldn't crack them in a human lifetime. A powerful quantum computer could eventually try every combination at once, cracking today's locks in a reasonable amount of time. In 2024, NIST Boulder — right here in Colorado — finalized the first official set of \"post-quantum\" locks: new encryption standards specifically designed so that even a quantum computer can't pick them.",
    resourceLabel: "IBM Quantum Learning",
    // TODO: link to IBM Quantum Learning's cryptography-focused modules —
    // https://learning.quantum.ibm.com (hands-on, uses real quantum hardware)
    href: "#",
  },
  {
    title: "Quantum Advantage",
    icon: "Zap",
    body:
      "A common misconception is that quantum computers are just \"faster\" regular computers — they're not, and for most everyday tasks (email, browsing, homework) they'd actually be worse. Quantum computers only pull ahead on specific kinds of problems: simulating molecules for drug discovery, optimizing massive logistics networks, and breaking or building certain kinds of cryptography. \"Quantum advantage\" means finding the narrow set of problems where a quantum computer meaningfully beats the best classical computer — and scientists are still mapping out exactly where that line is.",
    resourceLabel: "IBM Quantum Learning",
    // TODO: link to IBM Quantum Learning's quantum advantage explainers —
    // https://learning.quantum.ibm.com (demonstrates real use cases on real hardware)
    href: "#",
  },
];

export const RESOURCE_TABS = [
  {
    id: "competitions",
    label: "Competitions",
    icon: "Trophy",
    items: [
      {
        name: "Science Olympiad",
        description:
          "A national STEM competition with quantum mechanics event categories where high schoolers test their physics knowledge head-to-head.",
        href: "#", // TODO: https://www.soinc.org
      },
      {
        name: "ISEF (International Science and Engineering Fair)",
        description:
          "The world's largest pre-college science competition, with computational and physical sciences categories that regularly feature quantum projects.",
        href: "#", // TODO: https://www.societyforscience.org/isef
      },
      {
        name: "Q-12 Education Partnership",
        description:
          "A national partnership running student quantum competitions and challenges built specifically for K-12 and high school students.",
        href: "#", // TODO: https://q12education.org
      },
      {
        name: "Congressional App Challenge",
        description:
          "This very app is an example of a pathway into quantum policy work — a nationwide competition for student-built software with a real civic purpose.",
        href: "#", // TODO: https://www.congressionalappchallenge.us
      },
    ],
  },
  {
    id: "summer",
    label: "Summer Programs",
    icon: "FlaskConical",
    items: [
      {
        name: "CU Boulder JILA",
        description:
          "Summer research opportunities for high school students to work alongside real quantum physicists in one of the world's top labs.",
        href: "#", // TODO: https://jila.colorado.edu
      },
      {
        name: "Qubit by Qubit",
        description:
          "An intensive summer program designed specifically for high schoolers learning quantum computing from scratch — no prior experience required.",
        href: "#", // TODO: https://qubitbyqubit.org
      },
      {
        name: "MIT Lincoln Laboratory",
        description:
          "High school research programs at one of the country's leading defense and quantum technology research centers.",
        href: "#", // TODO: https://www.ll.mit.edu (see education/outreach programs)
      },
      {
        name: "IBM Quantum Learning",
        description:
          "Summer cohort programs that pair students with mentors and real IBM quantum hardware.",
        href: "#", // TODO: https://learning.quantum.ibm.com
      },
      {
        name: "Q-12 Summer Institutes",
        description:
          "National quantum education summer institutes that bring students together from across the country to learn hands-on.",
        href: "#", // TODO: https://q12education.org (summer institutes program page)
      },
    ],
  },
  {
    id: "online",
    label: "Online Learning",
    icon: "Laptop",
    items: [
      {
        name: "IBM Quantum Learning",
        description:
          "A free platform that takes you from complete beginner to advanced quantum programming, using real quantum computers.",
        href: "#", // TODO: https://learning.quantum.ibm.com
      },
      {
        name: "Qubit by Qubit Intro Course",
        description:
          "The most accessible structured curriculum built specifically for high schoolers with zero background.",
        href: "#", // TODO: https://qubitbyqubit.org/courses
      },
      {
        name: "MIT OpenCourseWare",
        description:
          "Full quantum computation courses from MIT, free and open, for students ready for a deeper technical challenge.",
        href: "#", // TODO: https://ocw.mit.edu (search "quantum computation")
      },
      {
        name: "Microsoft Azure Quantum Learning",
        description:
          "Free, self-paced modules covering quantum concepts and Microsoft's quantum development tools.",
        href: "#", // TODO: https://learn.microsoft.com/azure/quantum
      },
      {
        name: "Quantum Computing UK",
        description:
          "Free educational resources and explainers written for learners at every level.",
        href: "#", // TODO: https://quantumcomputinguk.org
      },
    ],
  },
  {
    id: "colorado",
    label: "Colorado-Specific",
    icon: "MapPin",
    items: [
      {
        name: "CU Boulder Quantum Research Programs",
        description:
          "How to reach out to faculty directly — many CU Boulder quantum researchers welcome motivated high schoolers who ask.",
        href: "#", // TODO: https://www.colorado.edu/physics (faculty directory)
      },
      {
        name: "NIST Boulder Public Programs",
        description:
          "Educational events and public programming hosted by the federal lab that sets the world's quantum security standards, right here in Boulder.",
        href: "#", // TODO: https://www.nist.gov/public_affairs/visitor (Boulder public programs)
      },
      {
        name: "Colorado Quantum Network",
        description:
          "Student engagement opportunities through Colorado's statewide consortium of quantum researchers and industry partners.",
        href: "#", // TODO: https://coloradoquantum.org
      },
      {
        name: "Colorado School of Mines",
        description:
          "Quantum materials research with a student inquiry contact for high schoolers interested in the physical-science side of quantum technology.",
        href: "#", // TODO: https://www.mines.edu (physics department)
      },
      {
        name: "CU Boulder Q-12 Affiliated Programs",
        description:
          "Programs affiliated with the national Q-12 partnership, based right on the CU Boulder campus.",
        href: "#", // TODO: https://q12education.org (affiliated programs list)
      },
    ],
  },
  {
    id: "careers",
    label: "Careers",
    icon: "Briefcase",
    items: [], // rendered separately from CAREER_TRACKS below
  },
];

/* Six career tracks. Shared between the Careers tab (Layer 3) and the
   "Find Your Quantum Path" quiz results (Layer 4). */
export const CAREER_TRACKS = [
  {
    id: "hardware",
    label: "Quantum Hardware Engineer",
    icon: "Cpu",
    oneLiner: "Builds the physical machines — the actual quantum computers themselves.",
    whatTheyBuild:
      "The physical quantum computers themselves — superconducting circuits, trapped-ion systems, and the ultra-cold refrigeration and control electronics that keep qubits stable long enough to compute with.",
    degreePath:
      "A bachelor's in physics or electrical engineering, usually followed by a master's or PhD in quantum engineering or applied physics.",
    coloradoEmployers: "Quantinuum, Lockheed Martin, Ball Aerospace, and CU Boulder's JILA labs.",
    nextStep:
      "Take the highest-level physics and calculus your school offers, and get your hands on something — a robotics club, an Arduino kit, or a physics research project all count.",
    resultBlurb:
      "You lit up at \"figuring out how things physically work\" and \"building hardware that doesn't exist yet\" — that's a hardware engineer's instinct. This path is for people who want to touch the actual machine, not just the code running on it, and Colorado happens to have some of the best hardware labs on the planet.",
    firstSteps: [
      "Apply for a JILA summer research opportunity at CU Boulder — real lab time with real quantum physicists.",
      "Enter Science Olympiad's quantum mechanics event category to test what you already know.",
      "Look into Colorado School of Mines' quantum materials research for the physical-science side of hardware.",
    ],
  },
  {
    id: "software",
    label: "Quantum Software Developer",
    icon: "Code2",
    oneLiner: "Writes the algorithms and code that run on quantum computers.",
    whatTheyBuild:
      "The algorithms and programming languages that run on quantum computers, and the software that translates real-world problems into instructions a quantum processor can actually execute.",
    degreePath: "A bachelor's in computer science, often paired with coursework in linear algebra or physics.",
    coloradoEmployers:
      "Quantinuum's software teams, CU Boulder's Quantum Initiative, and IBM Quantum's partner network.",
    nextStep:
      "Start learning Python now — it's the language almost every quantum software framework, including IBM's Qiskit, is built on.",
    resultBlurb:
      "\"Writing code\" and \"writing software that solves hard problems\" stood out in your answers — that's a software developer's mindset. This path is for people who want to build the programs that make quantum hardware actually useful, and you can start writing real quantum code for free, today.",
    firstSteps: [
      "Create a free IBM Quantum Learning account and run your first program on real quantum hardware.",
      "Work through the Qubit by Qubit Intro Course — the most beginner-friendly quantum coding curriculum built for high schoolers.",
      "Apply to a Qubit by Qubit summer program to go deeper with structured mentorship.",
    ],
  },
  {
    id: "policy",
    label: "Quantum Policy Analyst",
    icon: "Landmark",
    oneLiner: "Shapes the rules and funding that determine how quantum technology gets used.",
    whatTheyBuild:
      "The rules, funding strategies, and international agreements that determine how quantum technology gets regulated, funded, shared, or restricted across borders. This app itself — the ecosystem data, the policy recommendations, the representative-facing tools — is an example of what this work looks like.",
    degreePath:
      "A bachelor's in political science, public policy, or international relations — often paired with a technical minor or a policy-focused master's degree later.",
    coloradoEmployers:
      "Colorado OEDIT, the Colorado Quantum Network, congressional offices including Rep. Jason Crow's, and NIST Boulder's policy divisions.",
    nextStep:
      "Join a debate team, Model UN, or student government, and read one real piece of technology legislation from start to finish.",
    resultBlurb:
      "\"Explaining complex ideas to others\" and \"influencing government policy\" point toward policy work — turning technical complexity into decisions people can actually act on. You're already closer to this path than you think: building Quantum4Colorado's Representatives section is quantum policy work.",
    firstSteps: [
      "Read the Representatives section of this app — it's a working example of quantum policy analysis.",
      "Enter the Congressional App Challenge yourself; civic tech is a direct pathway into policy work.",
      "Reach out to the Colorado Quantum Network about student engagement opportunities in state-level quantum advocacy.",
    ],
  },
  {
    id: "crypto",
    label: "Quantum Cryptography Specialist",
    icon: "Lock",
    oneLiner: "Protects real organizations' data against quantum-era threats.",
    whatTheyBuild:
      "The encryption systems that protect data against quantum attacks — implementing and testing the new NIST post-quantum cryptography standards inside real hospitals, schools, businesses, and governments.",
    degreePath:
      "A bachelor's in computer science, mathematics, or cybersecurity, often followed by a security certification or a master's degree.",
    coloradoEmployers:
      "Raytheon Technologies, Lockheed Martin, NIST Boulder, and any Colorado hospital, school district, or municipal government beginning PQC migration.",
    nextStep:
      "Try a beginner \"capture the flag\" cybersecurity challenge online to see what breaking and defending systems actually feels like.",
    resultBlurb:
      "\"Understanding why systems fail\" and \"protecting systems from attack\" are a cryptography specialist's core instincts. This path sits right at the center of the quantum threat this whole app is about — and you can see exactly what this work looks like in the readiness tool in the Readiness tab.",
    firstSteps: [
      "Take the PQC Readiness Tool yourself and see the kind of risk analysis this job actually involves.",
      "Try a beginner capture-the-flag cybersecurity competition to test your instincts.",
      "Read NIST's post-quantum cryptography standards overview — the actual rules this job is built around.",
    ],
  },
  {
    id: "researcher",
    label: "Quantum Researcher",
    icon: "GraduationCap",
    oneLiner: "Discovers the physics that makes future quantum technology possible.",
    whatTheyBuild:
      "New scientific knowledge — discovering the physics that makes future quantum computers, sensors, and communication systems possible in the first place.",
    degreePath:
      "A bachelor's in physics, then a PhD (typically five to six years) at a research university. Colorado is home to one of the best programs anywhere: CU Boulder's JILA.",
    coloradoEmployers: "JILA, NIST Boulder, CU Boulder's Quantum Initiative, and national labs like NREL.",
    nextStep:
      "Email a CU Boulder or JILA professor whose research interests you and ask if they take high school interns — many genuinely do.",
    resultBlurb:
      "\"I love unsolved problems\" and a pull toward math and physics point to research — the path for people who want to discover something no one has proven yet. You happen to live in a state with one of the best quantum physics institutes on Earth.",
    firstSteps: [
      "Apply for a JILA summer research opportunity at CU Boulder.",
      "Work through MIT OpenCourseWare's quantum computation materials to see what the coursework actually looks like.",
      "Enter ISEF's computational or physical sciences category with an independent research project.",
    ],
  },
  {
    id: "business",
    label: "Quantum Business Development",
    icon: "Handshake",
    oneLiner: "Turns quantum research into companies, partnerships, and jobs.",
    whatTheyBuild:
      "The partnerships, funding deals, and go-to-market strategy that turn quantum research into actual companies, products, and jobs — the connective tissue between the lab and the market.",
    degreePath:
      "A bachelor's in business, economics, or a technical field, often paired with an MBA later. Technical fluency helps but isn't required.",
    coloradoEmployers:
      "Quantinuum's business and partnerships teams, Colorado OEDIT's Advanced Industries program, and quantum-adjacent startups statewide.",
    nextStep:
      "Start following Colorado's quantum startup funding news, and practice explaining a complex technical idea to a non-technical friend in under a minute.",
    resultBlurb:
      "\"Strategy and big-picture thinking\" and the pull toward the \"intersection of business and technology\" point toward business development — the role that turns brilliant research into a company people can actually work at. Colorado's quantum industry needs this as much as it needs engineers.",
    firstSteps: [
      "Follow Colorado OEDIT's Advanced Industries program to see how the state supports quantum companies.",
      "Enter a business plan or pitch competition, even a school-level one, to practice the core skill.",
      "Read about Quantinuum's growth from a Colorado-headquartered company into a global leader.",
    ],
  },
];

/* Five questions. Each option maps to one of the six CAREER_TRACKS ids.
   The mapping order is deliberately varied question-to-question (not a
   fixed option-index → track formula) so results feel genuinely
   personalized rather than mechanical. */
export const QUIZ_QUESTIONS = [
  {
    prompt: "What do you like most about problem-solving?",
    options: [
      { label: "Figuring out how things physically work", track: "hardware" },
      { label: "Writing code", track: "software" },
      { label: "Understanding why systems fail", track: "crypto" },
      { label: "Explaining complex ideas to others", track: "policy" },
      { label: "Strategy and big-picture thinking", track: "business" },
    ],
  },
  {
    prompt: "Which subject comes most naturally to you?",
    options: [
      { label: "Physics", track: "hardware" },
      { label: "Computer Science", track: "software" },
      { label: "Math", track: "researcher" },
      { label: "Writing and debate", track: "policy" },
      { label: "Economics and social science", track: "business" },
    ],
  },
  {
    prompt: "What sounds most exciting?",
    options: [
      { label: "Building hardware that doesn't exist yet", track: "hardware" },
      { label: "Writing software that solves hard problems", track: "software" },
      { label: "Protecting systems from attack", track: "crypto" },
      { label: "Influencing government policy", track: "policy" },
      { label: "Working at the intersection of business and technology", track: "business" },
    ],
  },
  {
    prompt: "What's your relationship with ambiguity?",
    options: [
      { label: "I love unsolved problems", track: "researcher" },
      { label: "I prefer clear specifications", track: "hardware" },
      { label: "I like figuring out the rules of a system", track: "crypto" },
      { label: "I like arguing about what the rules should be", track: "policy" },
    ],
  },
  {
    prompt: "Where do you want to work?",
    options: [
      { label: "Research lab or university", track: "researcher" },
      { label: "Tech company", track: "software" },
      { label: "Government or national security", track: "crypto" },
      { label: "Policy organization or think tank", track: "policy" },
      { label: "Startup", track: "business" },
    ],
  },
];

/* Stable tally order — used only to break ties deterministically (first
   track reaching the high score in this order wins). */
const TRACK_TALLY_ORDER = ["hardware", "software", "policy", "crypto", "researcher", "business"];

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
  return CAREER_TRACKS.find((track) => track.id === bestId);
}
