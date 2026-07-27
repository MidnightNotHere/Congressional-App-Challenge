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
