/* =========================================================================
   Quantum4Colorado — shared data layer: Colorado's Quantum Story
   Single source of truth for the web app (Quantum4Colorado.jsx) and the
   mobile app (mobile/src/screens/StoryScreen.js, RepsScreen.js).

   Icons are referenced by string name (not component reference) so this
   file has zero dependency on either "lucide-react" (web) or
   "lucide-react-native" (mobile) — each platform resolves the string
   through its own local icon registry (see Quantum4Colorado.jsx's
   ICON_REGISTRY and mobile/src/components/Icon.js).
   ========================================================================= */

export const HERO_STATS = [
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

/* Section 1's tabbed ecosystem map. `shortLabel` is used where mobile's
   horizontal tab-pill scroller doesn't have room for the full label. */
export const ECOSYSTEM_TABS = [
  {
    id: "federal",
    label: "Federal Facilities",
    shortLabel: "Federal",
    icon: "Landmark",
    color: "#1B3A6B",
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
    shortLabel: "University",
    icon: "GraduationCap",
    color: "#2E7D52",
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
    shortLabel: "Industry",
    icon: "Cpu",
    color: "#C4872A",
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
    shortLabel: "Policy",
    icon: "Building2",
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

export const STRENGTHS = [
  "NIST Boulder: the only state with the federal PQC standard-setting body.",
  "JILA: a top-5 quantum physics institute globally.",
  "Quantinuum headquarters: one of three leading quantum computing companies globally.",
  "CU Boulder quantum workforce pipeline: feeds national labs and industry.",
];

export const GAPS = [
  "Illinois passed the Illinois Quantum Act in 2023 with dedicated state funding.",
  "New York committed $200M to a quantum campus at IBM's Hudson Valley site.",
  "Colorado has world-class federal and university infrastructure but no coordinated state quantum investment strategy.",
  "Without state-level coordination, Colorado risks losing talent and companies to states with explicit quantum economic development programs.",
];

/* Section 3's expanded, legislative-facing ecosystem report (accordion).
   Same subject matter as ECOSYSTEM_TABS above, one level more detailed —
   focus areas, funding, employment, and connection-to-Colorado framing. */
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
    focus:
      "Coordination and advocacy among Colorado quantum researchers and industry.",
    funding: "Consortium / partner supported.",
    employment: "Member institutions across the state.",
    connection:
      "The most natural partner for any future state-led quantum economic development initiative.",
  },
];

/* About section's simple source list. Phase 3 replaces/expands this with a
   full "Where This Data Comes From" page (organization, what it supports,
   and a link) — kept here in the meantime since both apps already share it. */
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
