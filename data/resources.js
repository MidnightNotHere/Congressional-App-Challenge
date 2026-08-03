/* =========================================================================
   Quantum4Colorado — shared data layer: Quantum for Colorado Youth
   Single source of truth for the Youth section on both platforms: the
   Layer 1 expand-in-place hero cards, the Layer 2 plain-language concept
   cards, and the Layer 3 five-tab resource platform (competitions, summer
   programs, online learning, Colorado-specific, careers). Career profile
   content itself lives in data/careers.js — the "careers" tab below is
   intentionally empty and rendered from CAREERS instead.
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

/* `shortLabel` is used where mobile's horizontal tab-pill scroller doesn't
   have room for the full label. */
export const RESOURCE_TABS = [
  {
    id: "competitions",
    label: "Competitions & Recognition",
    shortLabel: "Competitions",
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
    label: "Summer Programs & Research",
    shortLabel: "Summer Programs",
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
    label: "Online Learning Pathways",
    shortLabel: "Online Learning",
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
    label: "Colorado-Specific Opportunities",
    shortLabel: "Colorado-Specific",
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
    label: "Careers in Quantum",
    shortLabel: "Careers",
    icon: "Briefcase",
    items: [], // rendered from data/careers.js's CAREERS instead
  },
];
