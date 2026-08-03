/* =========================================================================
   Quantum4Colorado — shared data layer: PQC Readiness Tool
   Single source of truth for the web app's Section 2 assessment and the
   mobile app's Assessment/Readiness screen: the 8 questions, the 4 risk
   tiers, the resource links, and the pure scoring functions themselves.

   The scoring logic lives here (not just the data) so a future change to
   point weights or action content only has to happen in one place.
   ========================================================================= */

export const QUESTIONS = [
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

/* Risk tiers. `color`/`bg` are literal hex values (not theme-namespaced)
   so this file has no dependency on either platform's theme module. */
export const TIERS = [
  {
    min: 0,
    max: 30,
    name: "Emerging Awareness",
    color: "#2E7D52",
    bg: "#EAF5EF",
    icon: "CheckCircle2",
    blurb:
      "Your immediate risk is low — this is the ideal time to build a plan before migration becomes urgent.",
  },
  {
    min: 31,
    max: 55,
    name: "Preparation Needed",
    color: "#C4872A",
    bg: "#FBF3E6",
    icon: "AlertCircle",
    blurb:
      "Your risk is moderate, and specific preparation steps should begin now.",
  },
  {
    min: 56,
    max: 75,
    name: "Significant Exposure",
    color: "#DD6B20",
    bg: "#FDEEE2",
    icon: "AlertTriangle",
    blurb:
      "Your risk is high, and prioritized action is required in the near term.",
  },
  {
    min: 76,
    max: 100,
    name: "Critical Priority",
    color: "#B03A2E",
    bg: "#FBEAE8",
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

/* Pure scoring function: answers -> results object (score, tier, risk
   factors in plain language, and a profile-specific action list). */
export function calculateResults(answers) {
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

/* Profile-specific prioritized action list (3–5 items). */
export function buildActions(orgType, data, reg) {
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
