/* =========================================================================
   Quantum4Colorado — shared data layer: "Find Your Quantum Path" quiz
   The 5 quiz questions, the career-track tally logic, and each track's
   result-screen content (the blurb and first steps shown once a user
   finishes). Career label/icon/oneLiner live in data/careers.js and are
   joined by `id` — see computeQuizResult below.
   ========================================================================= */

/* Five questions. Each option maps to one of the six data/careers.js ids.
   The mapping order is deliberately varied question-to-question (not a
   fixed option-index -> track formula) so results feel genuinely
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
      {
        label: "Working at the intersection of business and technology",
        track: "business",
      },
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
export const TRACK_TALLY_ORDER = [
  "hardware",
  "software",
  "policy",
  "crypto",
  "researcher",
  "business",
];

/* Result-screen content per track id. Joined with data/careers.js's
   matching `id` for label/icon/oneLiner when rendering. */
export const QUIZ_RESULTS = {
  hardware: {
    resultBlurb:
      "You lit up at \"figuring out how things physically work\" and \"building hardware that doesn't exist yet\" — that's a hardware engineer's instinct. This path is for people who want to touch the actual machine, not just the code running on it, and Colorado happens to have some of the best hardware labs on the planet.",
    firstSteps: [
      "Apply for a JILA summer research opportunity at CU Boulder — real lab time with real quantum physicists.",
      "Enter Science Olympiad's quantum mechanics event category to test what you already know.",
      "Look into Colorado School of Mines' quantum materials research for the physical-science side of hardware.",
    ],
  },
  software: {
    resultBlurb:
      "\"Writing code\" and \"writing software that solves hard problems\" stood out in your answers — that's a software developer's mindset. This path is for people who want to build the programs that make quantum hardware actually useful, and you can start writing real quantum code for free, today.",
    firstSteps: [
      "Create a free IBM Quantum Learning account and run your first program on real quantum hardware.",
      "Work through the Qubit by Qubit Intro Course — the most beginner-friendly quantum coding curriculum built for high schoolers.",
      "Apply to a Qubit by Qubit summer program to go deeper with structured mentorship.",
    ],
  },
  policy: {
    resultBlurb:
      "\"Explaining complex ideas to others\" and \"influencing government policy\" point toward policy work — turning technical complexity into decisions people can actually act on. You're already closer to this path than you think: building Quantum4Colorado's Representatives section is quantum policy work.",
    firstSteps: [
      "Read the Representatives section of this app — it's a working example of quantum policy analysis.",
      "Enter the Congressional App Challenge yourself; civic tech is a direct pathway into policy work.",
      "Reach out to the Colorado Quantum Network about student engagement opportunities in state-level quantum advocacy.",
    ],
  },
  crypto: {
    resultBlurb:
      "\"Understanding why systems fail\" and \"protecting systems from attack\" are a cryptography specialist's core instincts. This path sits right at the center of the quantum threat this whole app is about — and you can see exactly what this work looks like in the readiness tool in Section 2 of this site.",
    firstSteps: [
      "Take the PQC Readiness Tool in Section 2 yourself and see the kind of risk analysis this job actually involves.",
      "Try a beginner capture-the-flag cybersecurity competition to test your instincts.",
      "Read NIST's post-quantum cryptography standards overview — the actual rules this job is built around.",
    ],
  },
  researcher: {
    resultBlurb:
      "\"I love unsolved problems\" and a pull toward math and physics point to research — the path for people who want to discover something no one has proven yet. You happen to live in a state with one of the best quantum physics institutes on Earth.",
    firstSteps: [
      "Apply for a JILA summer research opportunity at CU Boulder.",
      "Work through MIT OpenCourseWare's quantum computation materials to see what the coursework actually looks like.",
      "Enter ISEF's computational or physical sciences category with an independent research project.",
    ],
  },
  business: {
    resultBlurb:
      "\"Strategy and big-picture thinking\" and the pull toward the \"intersection of business and technology\" point toward business development — the role that turns brilliant research into a company people can actually work at. Colorado's quantum industry needs this as much as it needs engineers.",
    firstSteps: [
      "Follow Colorado OEDIT's Advanced Industries program to see how the state supports quantum companies.",
      "Enter a business plan or pitch competition, even a school-level one, to practice the core skill.",
      "Read about Quantinuum's growth from a Colorado-headquartered company into a global leader.",
    ],
  },
};

/* Pure tally function: array of 5 track-id answers -> winning track id.
   Callers join the id against data/careers.js and QUIZ_RESULTS to build
   the full result display. */
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
  return bestId;
}
