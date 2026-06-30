import React, { useState, useRef, useEffect } from "react";
import {
  Atom,
  Lock,
  Shield,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Building2,
  GraduationCap,
  Cpu,
  Landmark,
  FileText,
  Mail,
  ExternalLink,
  RotateCcw,
  TrendingUp,
  Users,
  ClipboardCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  LabelList,
} from "recharts";

/* =========================================================================
   Quantum4Colorado
   A civic information platform for Colorado residents, organizations,
   and representatives to understand quantum computing's relevance to
   Colorado. Built for the 2026 Congressional App Challenge (CO-06).
   Single-file React component. Tailwind utility classes only.
   ========================================================================= */

/* ----------------------------- Brand palette ----------------------------- */
const C = {
  primary: "#1B3A6B", // Colorado sky blue
  secondary: "#2E7D52", // Rocky Mountain forest green
  accent: "#C4872A", // sandstone gold
  danger: "#B03A2E", // deep red
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  textPrimary: "#1A1A2E",
  textSecondary: "#4A5568",
  border: "#E2E8F0",
};

/* ------------------------- Signature design element ----------------------- */
/* A thin quantum-circuit line with gold accent nodes. Used at the top of the
   hero and as a divider between the three major layers. */
function QuantumLine({ className = "", nodes = [80, 300, 520, 740, 960, 1140] }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      className={`w-full h-6 ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="12"
        x2="1200"
        y2="12"
        stroke={C.primary}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      {nodes.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="12" r="9" fill={C.accent} fillOpacity="0.2" />
          <circle cx={x} cy="12" r="4.5" fill={C.accent} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------- Static data ----------------------------- */

const HERO_STATS = [
  { value: "$800M+", label: "Federal quantum investment in Colorado" },
  {
    value: "140+",
    label: "Quantum researchers across CU Boulder and Colorado institutions",
  },
  {
    value: "#1",
    label: "Colorado's ranking in quantum workforce development infrastructure",
  },
];

const EXPLAINER_CARDS = [
  {
    icon: Lock,
    title: "The Problem With Today's Computers",
    body:
      "Today's computers solve problems one step at a time. Quantum computers can explore millions of possibilities simultaneously — like checking every path through a maze at once instead of trying them one by one.",
  },
  {
    icon: Shield,
    title: "Why It Changes Everything",
    body:
      "Quantum computers will eventually be able to break the encryption protecting your bank account, medical records, and government systems. They will also create unbreakable new encryption — the race to get there first is already underway.",
  },
  {
    icon: MapPin,
    title: "Why Colorado Is Leading",
    body:
      "Colorado hosts NIST Boulder — the federal agency setting the world's post-quantum security standards — plus JILA, one of the planet's premier quantum physics institutes. No other state has this combination of federal and academic quantum infrastructure.",
  },
];

const ECOSYSTEM_TABS = [
  {
    id: "federal",
    label: "Federal Facilities",
    icon: Landmark,
    color: C.primary,
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
    label: "University Research",
    icon: GraduationCap,
    color: C.secondary,
    orgs: [
      {
        name: "JILA at CU Boulder",
        location: "Boulder, CO",
        role:
          "World-class quantum physics research institute, a joint CU Boulder / NIST program. 140+ researchers.",
        significance:
          "Consistently ranked among the top quantum physics institutes in the world.",
      },
      {
        name: "CU Boulder Quantum Initiative",
        location: "Boulder, CO",
        role:
          "Undergraduate and graduate quantum research programs, with multiple active quantum computing labs.",
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
    icon: Cpu,
    color: C.accent,
    orgs: [
      {
        name: "Quantinuum",
        location: "Broomfield, CO",
        role:
          "Quantum computing hardware and software — one of the world's leading quantum computing companies, headquartered in Colorado.",
        significance:
          "A globally significant quantum company chose Colorado as its home base.",
      },
      {
        name: "Ball Aerospace",
        location: "Broomfield, CO",
        role: "Quantum sensing applications for defense and space.",
        significance:
          "Applies quantum technology to Colorado's large aerospace economy.",
      },
      {
        name: "Lockheed Martin",
        location: "Littleton, CO",
        role: "Quantum computing research for defense applications.",
        significance:
          "Anchors quantum work within one of Colorado's largest employers.",
      },
      {
        name: "Raytheon Technologies",
        location: "Aurora, CO",
        role: "Quantum cryptography applications for defense systems.",
        significance:
          "Brings quantum-secure communications research to the CO-06 region.",
      },
    ],
  },
  {
    id: "policy",
    label: "Policy & Economic Development",
    icon: Building2,
    color: "#6B46C1",
    orgs: [
      {
        name: "Colorado Quantum Network (CQN)",
        location: "Statewide",
        role:
          "Consortium of Colorado quantum researchers and industry partners advocating for state quantum investment.",
        significance:
          "The closest thing Colorado has to a coordinated quantum strategy today.",
      },
      {
        name:
          "Colorado Office of Economic Development & International Trade (OEDIT)",
        location: "Denver, CO",
        role:
          "Advanced Industries program covering the quantum technology sector.",
        significance:
          "The state agency best positioned to lead a formal quantum initiative.",
      },
    ],
  },
];

const STRENGTHS = [
  "NIST Boulder: the only state with the federal PQC standard-setting body.",
  "JILA: a top-5 quantum physics institute globally.",
  "Quantinuum headquarters: one of three leading quantum computing companies globally.",
  "CU Boulder quantum workforce pipeline: feeds national labs and industry.",
];

const GAPS = [
  "Illinois passed the Illinois Quantum Act in 2023 with dedicated state funding.",
  "New York committed $200M to a quantum campus at IBM's Hudson Valley site.",
  "Colorado has world-class federal and university infrastructure but no coordinated state quantum investment strategy.",
  "Without state-level coordination, Colorado risks losing talent and companies to states with explicit quantum economic development programs.",
];

/* ------------------------------ Assessment ------------------------------- */

const QUESTIONS = [
  {
    id: "q1",
    type: "single",
    prompt: "What best describes your organization?",
    options: [
      { id: "small-business", label: "Small Business (under 50 employees)" },
      { id: "medium-business", label: "Medium Business (50–500 employees)" },
      {
        id: "healthcare",
        label: "Healthcare Organization (hospital, clinic, practice)",
      },
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
    prompt:
      "What kinds of sensitive data does your organization handle? (Select all that apply)",
    options: [
      {
        id: "financial",
        label:
          "Personal financial information (bank accounts, credit cards, payment data)",
      },
      {
        id: "health",
        label: "Personal health information (medical records, insurance data)",
      },
      {
        id: "student",
        label: "Student records (grades, assessments, personal information)",
      },
      { id: "government", label: "Government or classified information" },
      { id: "ip", label: "Intellectual property or trade secrets" },
      {
        id: "pii",
        label: "Personal identifying information (SSN, addresses, ID numbers)",
      },
      { id: "customer", label: "Customer or client personal data" },
      { id: "none", label: "None of the above" },
    ],
  },
  {
    id: "q3",
    type: "single",
    prompt:
      "Do you know what encryption standard currently protects your organization's data?",
    options: [
      {
        id: "rsa-ecc",
        label: "Yes, we use RSA or ECC encryption (most common standard)",
      },
      { id: "other-known", label: "Yes, we use something else" },
      {
        id: "unsure-standard",
        label: "We have some encryption but I'm not sure of the standard",
      },
      { id: "dont-know", label: "I don't know what encryption we use" },
      {
        id: "no-encryption",
        label: "We don't use encryption / I don't think we do",
      },
    ],
  },
  {
    id: "q4",
    type: "single",
    prompt:
      "How would you describe your organization's technology infrastructure?",
    options: [
      {
        id: "modern",
        label:
          "Modern — we regularly update systems and software (within last 2 years)",
      },
      {
        id: "mixed",
        label: "Mixed — some modern systems, some older legacy systems",
      },
      {
        id: "older",
        label: "Older — many systems are 5+ years old and infrequently updated",
      },
      { id: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: "q5",
    type: "multi",
    prompt:
      "Is your organization subject to any of these regulatory requirements? (Select all that apply)",
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
    prompt:
      "Has your organization had a cybersecurity audit or assessment in the last 2 years?",
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
    prompt:
      "Does your organization share data with outside vendors, partners, or cloud services?",
    options: [
      {
        id: "extensive",
        label: "Yes, extensively — many external integrations and data sharing",
      },
      { id: "some", label: "Yes, some — a few key vendors or cloud services" },
      { id: "minimal", label: "Minimal — mostly internal systems" },
      { id: "unsure-vendor", label: "Not sure" },
    ],
  },
  {
    id: "q8",
    type: "single",
    prompt:
      "How familiar are you with the quantum computing threat to current encryption?",
    options: [
      {
        id: "very-familiar",
        label: "Very familiar — we're already working on PQC migration planning",
      },
      {
        id: "somewhat",
        label: "Somewhat familiar — I've heard about it but haven't acted",
      },
      {
        id: "learning",
        label: "Just learning — this assessment is my first exposure",
      },
      { id: "not-familiar", label: "Not familiar at all" },
    ],
  },
];

const ORG_LABELS = {
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

const TIERS = [
  {
    min: 0,
    max: 30,
    name: "Emerging Awareness",
    color: C.secondary,
    bg: "#EAF5EF",
    icon: CheckCircle2,
    blurb:
      "Your immediate risk is low — this is the ideal time to build a plan before migration becomes urgent.",
  },
  {
    min: 31,
    max: 55,
    name: "Preparation Needed",
    color: C.accent,
    bg: "#FBF3E6",
    icon: AlertCircle,
    blurb:
      "Your risk is moderate, and specific preparation steps should begin now.",
  },
  {
    min: 56,
    max: 75,
    name: "Significant Exposure",
    color: "#DD6B20",
    bg: "#FDEEE2",
    icon: AlertTriangle,
    blurb:
      "Your risk is high, and prioritized action is required in the near term.",
  },
  {
    min: 76,
    max: 100,
    name: "Critical Priority",
    color: C.danger,
    bg: "#FBEAE8",
    icon: ShieldAlert,
    blurb:
      "Your risk is critical and likely carries regulatory implications — immediate action is warranted.",
  },
];

const NIST_PQC = {
  label: "NIST Post-Quantum Cryptography",
  url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
};
const CISA_PQC = {
  label: "CISA Post-Quantum Cryptography Initiative",
  url: "https://www.cisa.gov/quantum",
};
const NSA_PQC = {
  label: "NSA Quantum-Resistant Algorithm guidance",
  url: "https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/",
};

/* Pure scoring function: answers -> results object */
function calculateResults(answers) {
  const data = answers.q2 || [];
  const reg = answers.q5 || [];
  const orgType = answers.q1;
  let score = 0;
  const factors = [];

  // ---- Data sensitivity ----
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
    factors.push(
      "You handle student education records protected under FERPA."
    );
  }

  // ---- Organization type ----
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

  // ---- Infrastructure age ----
  if (answers.q4 === "older") {
    score += 15;
    factors.push(
      "Your technology infrastructure includes older legacy systems that are harder and slower to migrate to new cryptographic standards."
    );
  } else if (answers.q4 === "mixed" || answers.q4 === "unsure") {
    score += 6;
  }

  // ---- Encryption awareness ----
  if (answers.q3 === "dont-know" || answers.q3 === "no-encryption") {
    score += 20;
    factors.push(
      "Your organization lacks clear visibility into its current encryption standards — the essential first step before any migration can begin."
    );
  } else if (answers.q3 === "unsure-standard") {
    score += 8;
  }

  // ---- Security posture ----
  if (answers.q6 === "no-audit") {
    score += 10;
    factors.push(
      "Your organization has not had a recent cybersecurity assessment, leaving your current cryptographic exposure unmeasured."
    );
  } else if (answers.q6 === "planning") {
    score += 4;
  }

  // ---- Vendor / supply chain ----
  if (answers.q7 === "extensive") {
    score += 10;
    factors.push(
      "You share data extensively with external vendors and cloud services — each one is a separate migration dependency you do not fully control."
    );
  } else if (answers.q7 === "some") {
    score += 4;
  }

  // ---- Timeline awareness ----
  if (answers.q8 === "not-familiar" || answers.q8 === "learning") {
    score += 5;
    factors.push(
      "Awareness of the quantum threat is still early in your organization, which is the most important gap to close first."
    );
  }

  // ---- Regulatory weighting (small additive emphasis) ----
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
function buildActions(orgType, data, reg) {
  const handlesFinancial =
    data.includes("financial") || reg.includes("pci");
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
        title:
          "Begin migration to NIST-approved PQC algorithms for contract communications",
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
    // small / medium business, nonprofit, and default
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
        title:
          "Ask your IT provider when they plan to implement PQC standards",
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

/* ----------------------- Representatives: chart data --------------------- */
const INVESTMENT_CHART = [
  { state: "Illinois", amount: 500, note: "Illinois Quantum Act + campus" },
  { state: "New York", amount: 200, note: "IBM Quantum Campus" },
  { state: "California", amount: 200, note: "Research expansion" },
  { state: "Colorado", amount: 0, note: "No coordinated state initiative" },
];

const INVESTMENT_TABLE = [
  {
    state: "Illinois",
    initiative: "Illinois Quantum Act",
    investment: "State-dedicated funding + quantum campus",
    year: "2023",
  },
  {
    state: "New York",
    initiative: "IBM Quantum Campus",
    investment: "$200M committed",
    year: "2022",
  },
  {
    state: "California",
    initiative: "Quantum computing research expansion",
    investment: "$200M+ state funding",
    year: "2022",
  },
  {
    state: "Maryland",
    initiative: "University of Maryland + NIST partnership",
    investment: "Federal + state coordination",
    year: "Ongoing",
  },
  {
    state: "Colorado",
    initiative: "No coordinated state initiative",
    investment: "Federal infrastructure only",
    year: "—",
    highlight: true,
  },
];

const DETAILED_ECOSYSTEM = [
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
    focus:
      "Coordination and advocacy among Colorado quantum researchers and industry.",
    funding: "Consortium / partner supported.",
    employment: "Member institutions across the state.",
    connection:
      "The most natural partner for any future state-led quantum economic development initiative.",
  },
];

const RECOMMENDATIONS = [
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
    precedent:
      "Federal CISA post-quantum readiness efforts adapted to the state level.",
    impact:
      "A clear, coordinated migration path that protects resident data and state systems ahead of federal mandates.",
  },
  {
    title: "Fund a Quantum Workforce Pipeline at Colorado Universities",
    rationale:
      "Partner with CU Boulder, Colorado School of Mines, and Colorado State University to establish dedicated quantum computing degree programs and industry partnerships.",
    precedent:
      "State-funded talent pipelines tied to advanced-industry employers in other states.",
    impact:
      "A homegrown talent supply that keeps quantum graduates — and the companies that hire them — in Colorado.",
  },
  {
    title: "Establish Colorado as a Quantum-Secure State Government",
    rationale:
      "Set a state target to begin PQC migration of all state agency systems by 2027, making Colorado the first state to formally commit to quantum-safe government infrastructure.",
    precedent:
      "Federal quantum-safe migration mandates for U.S. agencies, applied at the state level.",
    impact:
      "National recognition as a first-mover, plus concrete protection for the data of every Coloradan.",
  },
];

/* ------------------------------ Small atoms ------------------------------ */
const PRIORITY_CLASS = {
  Immediate: "bg-[#B03A2E] text-white",
  "Within 6 Months": "bg-[#C4872A] text-white",
  "Within 1 Year": "bg-[#1B3A6B] text-white",
};

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#C4872A] mb-3">
      {children}
    </p>
  );
}

/* ============================== Main component ============================= */
export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("story");
  const [activeTab, setActiveTab] = useState("federal");

  // assessment state
  const [step, setStep] = useState(0); // current visible question index 0..7
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);

  // accordion state (rep ecosystem)
  const [openAccordion, setOpenAccordion] = useState(0);

  const storyRef = useRef(null);
  const assessmentRef = useRef(null);
  const repsRef = useRef(null);
  const aboutRef = useRef(null);
  const resultsRef = useRef(null);

  const refMap = {
    story: storyRef,
    assessment: assessmentRef,
    representatives: repsRef,
    about: aboutRef,
  };

  /* active section tracking */
  useEffect(() => {
    const refs = [storyRef, assessmentRef, repsRef, aboutRef];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (key) => {
    setNavOpen(false);
    refMap[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ---- assessment handlers ---- */
  const answerSingle = (qid, value, index) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    if (index === step && step < QUESTIONS.length - 1) setStep(step + 1);
  };

  const toggleMulti = (qid, value) => {
    setAnswers((prev) => {
      const current = prev[qid] || [];
      let next;
      if (value === "none" || value === "none-reg") {
        next = current.includes(value) ? [] : [value];
      } else {
        next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current.filter((v) => v !== "none" && v !== "none-reg"), value];
      }
      return { ...prev, [qid]: next };
    });
  };

  const advanceFromMulti = (index) => {
    if (index === step && step < QUESTIONS.length - 1) setStep(step + 1);
  };

  const allAnswered = answers.q8 != null;

  const generate = () => {
    const r = calculateResults(answers);
    setResults(r);
    setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      80
    );
  };

  const restart = () => {
    setAnswers({});
    setResults(null);
    setStep(0);
    assessmentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrint = () => window.print();

  const handleShare = async () => {
    const link =
      (typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "") + "#assessment";
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      setCopied(false);
    }
  };

  const emailTemplate = () => {
    const subject = encodeURIComponent(
      "Colorado Quantum Economic Development — Resource for Your Office"
    );
    const link =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "[link]";
    const body = encodeURIComponent(
      `I wanted to share a Colorado-specific quantum computing resource that may be relevant to your office's work on technology and economic development. Quantum4Colorado provides an overview of Colorado's quantum infrastructure, a constituent-facing readiness tool, and policy recommendations for state action.\n\n${link}`
    );
    if (typeof window !== "undefined")
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const navLinks = [
    { key: "story", label: "Colorado's Quantum Story" },
    { key: "assessment", label: "Is Your Org Ready?" },
    { key: "representatives", label: "For Representatives" },
    { key: "about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1A1A2E] antialiased">
      {/* ============================ MAIN APP (hidden when printing) ===== */}
      <div className="print:hidden">
        {/* ----------------------------- NAV ----------------------------- */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-[#E2E8F0] shadow-sm">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => scrollTo("story")}
                className="flex items-center gap-2 group"
                aria-label="Quantum4Colorado home"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1B3A6B]">
                  <Atom className="w-5 h-5 text-[#C4872A]" />
                </span>
                <span className="font-black tracking-tight text-lg text-[#1B3A6B]">
                  Quantum<span className="text-[#C4872A]">4</span>Colorado
                </span>
              </button>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((l) => {
                  const active = activeSection === l.key;
                  return (
                    <button
                      key={l.key}
                      onClick={() => scrollTo(l.key)}
                      className={`relative px-3 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "text-[#1B3A6B]"
                          : "text-[#4A5568] hover:text-[#1B3A6B]"
                      }`}
                    >
                      {l.label}
                      {active && (
                        <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[#C4872A]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#1B3A6B] hover:bg-[#F7F8FA]"
                onClick={() => setNavOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={navOpen}
              >
                {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {navOpen && (
            <div className="md:hidden border-t border-[#E2E8F0] bg-white">
              <div className="px-4 py-2 flex flex-col">
                {navLinks.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => scrollTo(l.key)}
                    className={`text-left px-2 py-3 text-base font-semibold border-b border-[#F1F4F8] ${
                      activeSection === l.key
                        ? "text-[#1B3A6B]"
                        : "text-[#4A5568]"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* ======================================================= SECTION 1 */}
        <section
          id="story"
          ref={storyRef}
          className="scroll-mt-16 pt-16"
        >
          {/* Hero */}
          <div className="bg-gradient-to-b from-[#1B3A6B] to-[#0E1E3A] text-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
              <QuantumLine className="opacity-80" />
            </div>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-20">
              <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#C4872A] mb-5">
                A Civic Resource for Colorado &middot; CO-06
              </p>
              <h1 className="font-black tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
                Colorado is at the center of the quantum revolution.
              </h1>
              <p className="mt-6 text-base sm:text-xl text-blue-100/90 max-w-3xl leading-relaxed">
                From NIST Boulder to JILA to the startups reshaping cryptography
                — here's what's happening in our state, and why it matters to
                every Coloradan.
              </p>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
                {HERO_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur px-6 py-7"
                  >
                    <div className="font-mono font-black text-4xl sm:text-5xl text-[#C4872A]">
                      {s.value}
                    </div>
                    <div className="mt-3 text-sm text-blue-50/90 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo("assessment")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C4872A] hover:bg-[#b07a23] text-white font-semibold px-6 py-3 transition-colors"
                >
                  Assess your organization
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo("representatives")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-6 py-3 transition-colors"
                >
                  For representatives
                </button>
              </div>
            </div>
          </div>

          {/* Plain-language explainer */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>The 60-Second Explanation</SectionLabel>
              <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
                What is quantum computing — and why should you care?
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXPLAINER_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-sm"
                  >
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1B3A6B]/10">
                      <Icon className="w-6 h-6 text-[#1B3A6B]" />
                    </span>
                    <h3 className="mt-5 font-bold text-lg text-[#1A1A2E]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[#4A5568] leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ecosystem map */}
          <div className="bg-white border-y border-[#E2E8F0]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
              <div className="max-w-3xl">
                <SectionLabel>The Map</SectionLabel>
                <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
                  Colorado's Quantum Infrastructure
                </h2>
                <p className="mt-4 text-[#4A5568] text-lg leading-relaxed">
                  Every major quantum research program, federal facility, and
                  quantum-adjacent organization operating in Colorado.
                </p>
              </div>

              {/* Tabs */}
              <div className="mt-10 flex flex-wrap gap-2">
                {ECOSYSTEM_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                        active
                          ? "bg-[#1B3A6B] text-white border-[#1B3A6B]"
                          : "bg-white text-[#4A5568] border-[#E2E8F0] hover:border-[#1B3A6B]/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Cards */}
              {ECOSYSTEM_TABS.filter((t) => t.id === activeTab).map((tab) => (
                <div
                  key={tab.id}
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {tab.orgs.map((org) => (
                    <div
                      key={org.name}
                      className="rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] p-6 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-lg text-[#1A1A2E] leading-snug">
                          {org.name}
                        </h3>
                        <span
                          className="shrink-0 font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: tab.color }}
                        >
                          {tab.label.split(" ")[0]}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#4A5568]">
                        <MapPin className="w-3.5 h-3.5 text-[#C4872A]" />
                        <span className="font-mono">{org.location}</span>
                      </div>
                      <p className="mt-3 text-[#4A5568] leading-relaxed">
                        {org.role}
                      </p>
                      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex gap-2">
                        <TrendingUp className="w-4 h-4 text-[#2E7D52] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#1A1A2E]">
                          <span className="font-semibold">
                            Significance to Colorado:{" "}
                          </span>
                          {org.significance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* National position */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>The Stakes</SectionLabel>
              <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
                Why Colorado's Lead Matters — And Could Be Lost
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* strengths */}
              <div className="rounded-2xl border border-[#2E7D52]/30 bg-[#EAF5EF] p-7">
                <div className="flex items-center gap-2 text-[#2E7D52]">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Colorado's strengths</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {STRENGTHS.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#2E7D52] shrink-0" />
                      <span className="text-[#1A1A2E] leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* gap */}
              <div className="rounded-2xl border border-[#C4872A]/40 bg-[#FBF3E6] p-7">
                <div className="flex items-center gap-2 text-[#9c6a1c]">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-bold text-lg">The investment gap</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {GAPS.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C4872A] shrink-0" />
                      <span className="text-[#1A1A2E] leading-relaxed">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 rounded-2xl bg-[#1B3A6B] text-white p-8 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2 items-center">
                <button
                  onClick={() => scrollTo("assessment")}
                  className="group text-left rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 p-5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      Is your organization ready for the quantum shift?
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#C4872A] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="mt-1 text-blue-100/80 text-sm">
                    Take the 3-minute readiness assessment
                  </p>
                </button>
                <button
                  onClick={() => scrollTo("representatives")}
                  className="group text-left rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 p-5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      View detailed reports for representatives
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#C4872A] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="mt-1 text-blue-100/80 text-sm">
                    Ecosystem data and policy recommendations
                  </p>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <QuantumLine />
        </div>

        {/* ======================================================= SECTION 2 */}
        <section
          id="assessment"
          ref={assessmentRef}
          className="scroll-mt-16 bg-white border-y border-[#E2E8F0]"
        >
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>Readiness Assessment</SectionLabel>
              <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
                Is Your Organization Quantum-Ready?
              </h2>
              <p className="mt-4 text-[#4A5568] text-lg leading-relaxed">
                NIST finalized post-quantum cryptography standards in 2024. Every
                organization handling sensitive data needs to understand its
                exposure and begin migrating. This free assessment takes 3
                minutes.
              </p>
            </div>

            {/* explanation box */}
            <div className="mt-8 rounded-r-xl bg-[#EAF1FB] border-l-4 border-[#1B3A6B] p-5">
              <p className="text-[#1A1A2E] leading-relaxed">
                Current encryption protects your data the way a combination lock
                protects a safe. A quantum computer would be like a machine that
                tries every combination simultaneously — in seconds. NIST's new
                PQC standards are the solution. Here's where your organization
                stands.
              </p>
            </div>

            {/* progress */}
            {!results && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs tracking-wider uppercase text-[#4A5568]">
                    Question {Math.min(step + 1, QUESTIONS.length)} of{" "}
                    {QUESTIONS.length}
                  </span>
                  <span className="font-mono text-xs text-[#4A5568]">
                    {Math.round(((step + (allAnswered ? 1 : 0)) / QUESTIONS.length) * 100)}
                    %
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className="h-full bg-[#1B3A6B] transition-all duration-500"
                    style={{
                      width: `${
                        ((step + (allAnswered ? 1 : 0)) / QUESTIONS.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* questions */}
            {!results && (
              <div className="mt-8 space-y-8">
                {QUESTIONS.slice(0, step + 1).map((q, index) => {
                  const isMulti = q.type === "multi";
                  const value = answers[q.id];
                  return (
                    <fieldset
                      key={q.id}
                      className="rounded-2xl border border-[#E2E8F0] bg-[#F7F8FA] p-6"
                    >
                      <legend className="px-2">
                        <span className="font-mono text-xs text-[#C4872A]">
                          Q{index + 1}
                        </span>
                      </legend>
                      <p className="font-bold text-lg text-[#1A1A2E]">
                        {q.prompt}
                      </p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map((opt) => {
                          const selected = isMulti
                            ? (value || []).includes(opt.id)
                            : value === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                isMulti
                                  ? toggleMulti(q.id, opt.id)
                                  : answerSingle(q.id, opt.id, index)
                              }
                              aria-pressed={selected}
                              className={`flex items-start gap-3 text-left rounded-xl border p-4 transition-all ${
                                selected
                                  ? "border-[#1B3A6B] bg-[#1B3A6B]/5 ring-1 ring-[#1B3A6B]/30"
                                  : "border-[#E2E8F0] bg-white hover:border-[#1B3A6B]/40"
                              }`}
                            >
                              <span
                                className={`mt-0.5 inline-flex items-center justify-center shrink-0 w-5 h-5 ${
                                  isMulti ? "rounded-md" : "rounded-full"
                                } border-2 ${
                                  selected
                                    ? "bg-[#1B3A6B] border-[#1B3A6B]"
                                    : "border-[#CBD5E0] bg-white"
                                }`}
                              >
                                {selected && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                )}
                              </span>
                              <span
                                className={`text-sm leading-snug ${
                                  selected
                                    ? "text-[#1A1A2E] font-semibold"
                                    : "text-[#4A5568]"
                                }`}
                              >
                                {opt.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* continue for multi when it's the active question */}
                      {isMulti &&
                        index === step &&
                        step < QUESTIONS.length - 1 && (
                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() => advanceFromMulti(index)}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] text-white font-semibold px-5 py-2.5 hover:bg-[#16304f] transition-colors"
                            >
                              Continue
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                    </fieldset>
                  );
                })}

                {/* generate results */}
                {allAnswered && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={generate}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#C4872A] hover:bg-[#b07a23] text-white font-bold text-lg px-8 py-4 transition-colors"
                    >
                      <ClipboardCheck className="w-5 h-5" />
                      See my organization's results
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ----------------------------- RESULTS ----------------------- */}
            {results && (
              <div ref={resultsRef} className="mt-12 scroll-mt-20">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="font-black tracking-tight text-2xl text-[#1A1A2E]">
                    Your Quantum Readiness Profile
                  </h3>
                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A5568] hover:text-[#1B3A6B]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake assessment
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Panel 1 — score */}
                  <div
                    className="rounded-2xl border p-7 flex flex-col items-center text-center"
                    style={{
                      borderColor: results.tier.color + "55",
                      backgroundColor: results.tier.bg,
                    }}
                  >
                    <ScoreRing
                      score={results.score}
                      color={results.tier.color}
                    />
                    <div className="mt-5 inline-flex items-center gap-2">
                      <results.tier.icon
                        className="w-5 h-5"
                        style={{ color: results.tier.color }}
                      />
                      <span
                        className="font-bold text-lg"
                        style={{ color: results.tier.color }}
                      >
                        {results.tier.name}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#1A1A2E] leading-relaxed">
                      {results.interpretation}
                    </p>
                  </div>

                  {/* Panel 2 — risk factors */}
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-7">
                    <h4 className="font-bold text-lg text-[#1A1A2E]">
                      Your specific risk factors
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {results.factors.map((f, i) => (
                        <li key={i} className="flex gap-3">
                          <AlertCircle
                            className="w-4 h-4 mt-1 shrink-0"
                            style={{ color: results.tier.color }}
                          />
                          <span className="text-sm text-[#4A5568] leading-relaxed">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Panel 3 — actions */}
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white p-7">
                    <h4 className="font-bold text-lg text-[#1A1A2E]">
                      Your priority action list
                    </h4>
                    <ol className="mt-4 space-y-5">
                      {results.priorityActions.map((a, i) => (
                        <li key={i}>
                          <span
                            className={`inline-block font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full ${
                              PRIORITY_CLASS[a.priority] ||
                              "bg-[#1B3A6B] text-white"
                            }`}
                          >
                            {a.priority}
                          </span>
                          <p className="mt-1.5 font-semibold text-sm text-[#1A1A2E] leading-snug">
                            {a.title}
                          </p>
                          <p className="mt-1 text-sm text-[#4A5568] leading-relaxed">
                            {a.description}
                          </p>
                          {a.resource && (
                            <a
                              href={a.resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#1B3A6B] hover:underline"
                            >
                              {a.resource.label}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* actions row */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3A6B] hover:bg-[#16304f] text-white font-semibold px-6 py-3 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download my organization's report (PDF)
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#1B3A6B]/40 text-[#1A1A2E] font-semibold px-6 py-3 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    {copied ? "Link copied!" : "Share this assessment with your IT team"}
                  </button>
                </div>

                {/* resources */}
                <div className="mt-10 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] p-7">
                  <h4 className="font-bold text-lg text-[#1A1A2E]">
                    Learn more from the source
                  </h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[NIST_PQC, CISA_PQC, NSA_PQC].map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 rounded-xl bg-white border border-[#E2E8F0] p-4 hover:border-[#1B3A6B]/40 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-[#1B3A6B] mt-0.5 shrink-0" />
                        <span className="text-sm font-semibold text-[#1A1A2E] leading-snug">
                          {r.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <QuantumLine />
        </div>

        {/* ======================================================= SECTION 3 */}
        <section id="representatives" ref={repsRef} className="scroll-mt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>For Representatives &amp; Policymakers</SectionLabel>
              <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
                Colorado Quantum Policy Hub
              </h2>
              <p className="mt-4 text-[#4A5568] text-lg leading-relaxed">
                Data, analysis, and resources for Colorado state legislators,
                congressional staff, and economic development officials.
              </p>
            </div>

            {/* A — Investment gap */}
            <div className="mt-12">
              <h3 className="font-bold text-xl text-[#1A1A2E]">
                The Case for a Colorado Quantum Economic Development Initiative
              </h3>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* table */}
                <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1B3A6B] text-white text-left">
                        <th className="px-4 py-3 font-semibold">State</th>
                        <th className="px-4 py-3 font-semibold">Initiative</th>
                        <th className="px-4 py-3 font-semibold">Investment</th>
                        <th className="px-4 py-3 font-semibold">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INVESTMENT_TABLE.map((row) => (
                        <tr
                          key={row.state}
                          className={`border-t border-[#E2E8F0] ${
                            row.highlight ? "bg-[#FBF3E6]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-semibold text-[#1A1A2E]">
                            {row.state}
                          </td>
                          <td className="px-4 py-3 text-[#4A5568]">
                            {row.initiative}
                          </td>
                          <td className="px-4 py-3 font-mono text-[#4A5568]">
                            {row.investment}
                          </td>
                          <td className="px-4 py-3 font-mono text-[#4A5568]">
                            {row.year}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* chart */}
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                  <p className="font-semibold text-[#1A1A2E]">
                    State quantum investment commitments
                  </p>
                  <p className="font-mono text-xs text-[#4A5568] mb-3">
                    Reported state funding, in $ millions
                  </p>
                  <div style={{ width: "100%", height: 240 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={INVESTMENT_CHART}
                        margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="state"
                          tick={{ fontSize: 12, fill: "#4A5568" }}
                          axisLine={{ stroke: "#E2E8F0" }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#4A5568" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: "#F7F8FA" }}
                          formatter={(v) => [`$${v}M`, "Committed"]}
                        />
                        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                          {INVESTMENT_CHART.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={
                                entry.state === "Colorado"
                                  ? C.danger
                                  : C.primary
                              }
                            />
                          ))}
                          <LabelList
                            dataKey="amount"
                            position="top"
                            formatter={(v) => (v === 0 ? "$0" : `$${v}M`)}
                            style={{
                              fontSize: 11,
                              fontFamily: "monospace",
                              fill: "#1A1A2E",
                            }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-[#4A5568] leading-snug">
                    Figures reflect publicly reported state commitments. Colorado
                    has no coordinated state quantum investment despite hosting
                    federal and university infrastructure other states are
                    spending hundreds of millions to approximate.
                  </p>
                </div>
              </div>

              {/* callout */}
              <div className="mt-6 rounded-2xl bg-[#C4872A] text-white p-7">
                <p className="text-lg leading-relaxed">
                  Colorado has the federal infrastructure — NIST Boulder, JILA —
                  that other states are spending hundreds of millions to
                  approximate. A state Quantum Economic Development Initiative
                  could leverage this existing advantage into jobs, company
                  formation, and national leadership. Illinois and New York are
                  already moving.
                </p>
              </div>
            </div>

            {/* B — Detailed ecosystem accordion */}
            <div className="mt-16">
              <h3 className="font-bold text-xl text-[#1A1A2E]">
                Detailed Colorado Quantum Ecosystem Report
              </h3>
              <p className="mt-2 text-[#4A5568]">
                Expand each institution for research focus, funding, employment,
                and its connection to Colorado's economic and security interests.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white divide-y divide-[#E2E8F0] overflow-hidden">
                {DETAILED_ECOSYSTEM.map((inst, i) => {
                  const open = openAccordion === i;
                  return (
                    <div key={inst.name}>
                      <button
                        onClick={() => setOpenAccordion(open ? -1 : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#F7F8FA] transition-colors"
                        aria-expanded={open}
                      >
                        <span>
                          <span className="font-bold text-[#1A1A2E]">
                            {inst.name}
                          </span>
                          <span className="ml-2 font-mono text-xs text-[#4A5568]">
                            {inst.location}
                          </span>
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#1B3A6B] shrink-0 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="px-5 pb-5 grid gap-3 sm:grid-cols-2">
                          <DetailRow label="Research focus" value={inst.focus} />
                          <DetailRow label="Funding" value={inst.funding} />
                          <DetailRow
                            label="Employment"
                            value={inst.employment}
                          />
                          <DetailRow
                            label="Connection to Colorado"
                            value={inst.connection}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handlePrint}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] hover:bg-[#16304f] text-white font-semibold px-6 py-3 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Download full Colorado Quantum Ecosystem Report (PDF)
              </button>
            </div>

            {/* C — Recommendations */}
            <div className="mt-16">
              <h3 className="font-bold text-xl text-[#1A1A2E]">
                Recommended State Actions
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECOMMENDATIONS.map((rec, i) => (
                  <div
                    key={rec.title}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1B3A6B] text-white font-mono font-bold">
                        {i + 1}
                      </span>
                      <h4 className="font-bold text-[#1A1A2E] leading-snug">
                        {rec.title}
                      </h4>
                    </div>
                    <p className="mt-4 text-[#4A5568] leading-relaxed">
                      {rec.rationale}
                    </p>
                    <div className="mt-4 grid gap-2">
                      <div className="flex gap-2 text-sm">
                        <span className="font-semibold text-[#1B3A6B] shrink-0">
                          Precedent:
                        </span>
                        <span className="text-[#4A5568]">{rec.precedent}</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="font-semibold text-[#2E7D52] shrink-0">
                          Impact:
                        </span>
                        <span className="text-[#4A5568]">{rec.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D — Contact & engagement */}
            <div className="mt-16">
              <h3 className="font-bold text-xl text-[#1A1A2E]">Take Action</h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="https://crow.house.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 hover:border-[#1B3A6B]/40 transition-colors"
                >
                  <Landmark className="w-6 h-6 text-[#1B3A6B]" />
                  <h4 className="mt-3 font-bold text-[#1A1A2E]">
                    Contact Rep. Jason Crow's office
                  </h4>
                  <p className="mt-1 text-sm text-[#4A5568]">
                    Share input on quantum policy
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1B3A6B]">
                    crow.house.gov <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="https://coloradoquantum.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-6 hover:border-[#1B3A6B]/40 transition-colors"
                >
                  <Users className="w-6 h-6 text-[#2E7D52]" />
                  <h4 className="mt-3 font-bold text-[#1A1A2E]">
                    Contact the Colorado Quantum Network
                  </h4>
                  <p className="mt-1 text-sm text-[#4A5568]">
                    Connect with the statewide consortium
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1B3A6B]">
                    coloradoquantum.org <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>

                <button
                  onClick={emailTemplate}
                  className="text-left rounded-2xl border border-[#C4872A]/40 bg-[#FBF3E6] p-6 hover:border-[#C4872A] transition-colors"
                >
                  <Mail className="w-6 h-6 text-[#9c6a1c]" />
                  <h4 className="mt-3 font-bold text-[#1A1A2E]">
                    Share this resource with your state representative
                  </h4>
                  <p className="mt-1 text-sm text-[#4A5568]">
                    Opens a pre-filled email template
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#9c6a1c]">
                    Compose email <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <QuantumLine />
        </div>

        {/* ======================================================= SECTION 4 */}
        <section
          id="about"
          ref={aboutRef}
          className="scroll-mt-16 bg-white border-t border-[#E2E8F0]"
        >
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20">
            <SectionLabel>About</SectionLabel>
            <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
              About Quantum4Colorado
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="font-bold text-lg text-[#1A1A2E]">What this is</h3>
                <p className="mt-2 text-[#4A5568] leading-relaxed">
                  Quantum4Colorado was built by a team of Colorado high school
                  students for the 2026 Congressional App Challenge. It is a
                  nonpartisan civic information resource.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#1A1A2E]">
                  Why we built it
                </h3>
                <p className="mt-2 text-[#4A5568] leading-relaxed">
                  Colorado sits at the center of the quantum computing revolution
                  — NIST Boulder, JILA, and Quantinuum make this state uniquely
                  positioned nationally. We built this app because most Coloradans
                  don't know that, and because the organizations and
                  representatives who need to act on it deserve a clear,
                  accessible resource to start from.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#1A1A2E]">Data sources</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    "NIST (National Institute of Standards and Technology)",
                    "CISA Post-Quantum Cryptography Initiative",
                    "NSA quantum-resistant algorithm guidance",
                    "CU Boulder and JILA public records",
                    "Colorado OEDIT — Advanced Industries program",
                    "Colorado Quantum Network",
                    "Publicly available company information",
                    "State quantum initiative public announcements",
                  ].map((src) => (
                    <li
                      key={src}
                      className="flex gap-2 text-sm text-[#4A5568]"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C4872A] shrink-0" />
                      {src}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-[#4A5568] leading-relaxed">
                  Statistics are drawn from public sources. Figures such as
                  federal investment and researcher counts are approximate and
                  reflect the most recent publicly available reporting. Quantum
                  threat timelines are inherently uncertain; this resource
                  presents preparation as prudent, not as a prediction of a
                  specific date.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#1A1A2E]">
                  Contact &amp; feedback
                </h3>
                <a
                  href="mailto:team@quantum4colorado.org"
                  className="mt-2 inline-flex items-center gap-2 text-[#1B3A6B] font-semibold hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  team@quantum4colorado.org
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="bg-[#0E1E3A] text-blue-100/70">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                  <Atom className="w-4 h-4 text-[#C4872A]" />
                </span>
                <span className="font-black text-white">
                  Quantum<span className="text-[#C4872A]">4</span>Colorado
                </span>
              </div>
              <p className="text-sm text-center sm:text-right">
                A nonpartisan civic resource &middot; 2026 Congressional App
                Challenge &middot; Colorado's 6th District
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ====================== PRINTABLE REPORT (print only) ============== */}
      {results && (
        <div className="hidden print:block p-8 text-[#1A1A2E]">
          <div className="border-b-2 border-[#1B3A6B] pb-4 mb-6">
            <h1 className="font-black text-2xl text-[#1B3A6B]">
              Quantum4Colorado — Organizational Readiness Report
            </h1>
            <p className="text-sm text-[#4A5568] mt-1">
              Post-Quantum Cryptography (PQC) readiness summary
            </p>
          </div>

          <div className="mb-6">
            <p className="text-sm">
              <span className="font-semibold">Organization type:</span>{" "}
              {results.orgLabel}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Risk score:</span> {results.score}
              /100
            </p>
            <p className="text-sm">
              <span className="font-semibold">Risk tier:</span>{" "}
              {results.tier.name}
            </p>
            <p className="text-sm mt-2">{results.interpretation}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg border-b border-[#E2E8F0] pb-1 mb-2">
              Identified risk factors
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {results.factors.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg border-b border-[#E2E8F0] pb-1 mb-2">
              Priority action list
            </h2>
            <ol className="space-y-3 text-sm">
              {results.priorityActions.map((a, i) => (
                <li key={i}>
                  <span className="font-semibold">[{a.priority}] {a.title}</span>
                  <p className="text-[#4A5568]">{a.description}</p>
                  {a.resource && (
                    <p className="text-[#1B3A6B]">{a.resource.label}: {a.resource.url}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="text-xs text-[#4A5568] border-t border-[#E2E8F0] pt-3">
            <p>
              Resources: {NIST_PQC.url} &middot; {CISA_PQC.url} &middot;{" "}
              {NSA_PQC.url}
            </p>
            <p className="mt-1">
              Generated by Quantum4Colorado — a nonpartisan civic resource built
              for the 2026 Congressional App Challenge (CO-06). This assessment is
              informational and not a substitute for professional cybersecurity
              advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Sub-components ---------------------------- */
function ScoreRing({ score, color }) {
  const r = 64;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div className="relative w-40 h-40">
      <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="12"
        />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-mono font-black text-4xl"
          style={{ color }}
        >
          {score}
        </span>
        <span className="font-mono text-xs text-[#4A5568]">/ 100</span>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] p-4">
      <p className="font-mono text-[10px] tracking-wider uppercase text-[#C4872A]">
        {label}
      </p>
      <p className="mt-1 text-sm text-[#1A1A2E] leading-relaxed">{value}</p>
    </div>
  );
}
