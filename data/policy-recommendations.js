/* =========================================================================
   Quantum4Colorado — shared data layer: For Representatives
   Single source of truth for the state investment-gap comparison (table
   and chart) and the 4 policy recommendation cards shown in the
   Representatives / Policy section on both platforms.
   ========================================================================= */

/* Chart-friendly view of the investment gap (numeric `amount` in $M) for
   the web app's Recharts bar chart and the mobile app's native bar chart. */
export const INVESTMENT_CHART = [
  { state: "Illinois", amount: 500, note: "Illinois Quantum Act + campus" },
  { state: "New York", amount: 200, note: "IBM Quantum Campus" },
  { state: "California", amount: 200, note: "Research expansion" },
  { state: "Colorado", amount: 0, note: "No coordinated state initiative" },
];

/* Same comparison, formatted for the table layout. */
export const INVESTMENT_TABLE = [
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
