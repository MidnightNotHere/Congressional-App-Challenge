/* =========================================================================
   Quantum4Colorado — shared data layer: Careers in Quantum
   The 6 career profile cards shown in the Youth section's "Careers" resource
   tab. Quiz results (data/quiz-data.js) reference these by `id` rather than
   duplicating label/icon/oneLiner, so a career's name or icon only ever
   needs to change in this one file.
   ========================================================================= */

export const CAREERS = [
  {
    id: "hardware",
    label: "Quantum Hardware Engineer",
    icon: "Cpu",
    oneLiner: "Builds the physical machines — the actual quantum computers themselves.",
    whatTheyBuild:
      "The physical quantum computers themselves — superconducting circuits, trapped-ion systems, and the ultra-cold refrigeration and control electronics that keep qubits stable long enough to compute with.",
    degreePath:
      "A bachelor's in physics or electrical engineering, usually followed by a master's or PhD in quantum engineering or applied physics.",
    coloradoEmployers:
      "Quantinuum, Lockheed Martin, Ball Aerospace, and CU Boulder's JILA labs.",
    nextStep:
      "Take the highest-level physics and calculus your school offers, and get your hands on something — a robotics club, an Arduino kit, or a physics research project all count.",
  },
  {
    id: "software",
    label: "Quantum Software Developer",
    icon: "Code2",
    oneLiner: "Writes the algorithms and code that run on quantum computers.",
    whatTheyBuild:
      "The algorithms and programming languages that run on quantum computers, and the software that translates real-world problems into instructions a quantum processor can actually execute.",
    degreePath:
      "A bachelor's in computer science, often paired with coursework in linear algebra or physics.",
    coloradoEmployers:
      "Quantinuum's software teams, CU Boulder's Quantum Initiative, and IBM Quantum's partner network.",
    nextStep:
      "Start learning Python now — it's the language almost every quantum software framework, including IBM's Qiskit, is built on.",
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
    coloradoEmployers:
      "JILA, NIST Boulder, CU Boulder's Quantum Initiative, and national labs like NREL.",
    nextStep:
      "Email a CU Boulder or JILA professor whose research interests you and ask if they take high school interns — many genuinely do.",
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
  },
];
