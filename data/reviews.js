/* =========================================================================
   Quantum4Colorado — community reviews
   Feedback collected from students, educators, and outside reviewers during
   Congressional App Challenge testing. Quotes are kept verbatim, in English
   only — these are direct testimonials from named reviewers, not UI copy,
   so they aren't run through the { en, es } bilingual pattern used
   elsewhere in /data.
   ========================================================================= */

export const REVIEWS = [
  {
    id: "maya",
    name: "Maya",
    role: "High School Student",
    rating: 5,
    quote:
      "I liked how Quantum4Colorado introduces quantum computing without immediately making it feel like an advanced physics class. The resources are solely focused on Colorado and the learning sections made the topic feel connected to things students could actually be interested in. However, I would make the starting point for first-time users slightly more obvious because I had spent a few seconds deciding which section I wanted to explore first.",
  },
  {
    id: "noah",
    name: "Noah",
    role: "High School Student",
    rating: 4,
    quote:
      "The animations, cards, cool hack like design, and the branding itself made me want to keep clicking around because it doesn't look like a basic learning website. I liked that I could explore the quantum information without having to read too much information all at once. The main thing I would add is one really memorable interactive quantum demonstration that introduces users to what this site is about. I would also add some cool quantum terms through flashcards where I can learn new terms about quantum computing like qubits and decoherence. The clean interface is definitely one of the strongest parts of the website and the visual effects are good enough to where this app/website stands out among others.",
  },
  {
    id: "sofia",
    name: "Sofia",
    role: "High School Student",
    rating: 4,
    quote:
      "Wow looking at this website, I honestly expected the quantum explanations too be confusing and difficult for me, but the shorter sections and clean layout made them surprisingly easy to follow. I would however add small definitions that appear when you click quantum terms because there were a few words I had to look up separately on Google.",
  },
  {
    id: "daniel",
    name: "Daniel",
    role: "Physics Teacher — Mr. D",
    rating: 4,
    quote:
      "The quantum concepts are divided into smaller sections that work really well so I could imagine showing individual parts during a physics lesson without overwhelming the students. I especially liked the clean layout, headings, and visuals, although adding a cool little 2 or 3 question quiz check after each major topic would make the educational site much stronger. The site already explains difficult material clearly, so some form of assessment would help prove that students are actually retaining what they learn.",
  },
  {
    id: "grace",
    name: "Grace",
    role: "School Counselor — Ms. G",
    rating: 5,
    quote:
      "I really liked that the site doesn't stop at explaining generic quantum technology and instead connects the topics to Colorado and students who may eventually want to work in this field of STEM. Expanding the career and education pathway with specific majors, local programs, research opportunities, and suggested next steps makes this super useful for students, as they can master learning sections and know confidently where they feel they want to go next.",
  },
  {
    id: "rachel",
    name: "Rachel",
    role: "School Counselor / Program Coordinator — Ms. R",
    rating: 5,
    quote:
      "Wow! My favorite part is that Quantum4Colorado has a specific identity to Colorado instead of feeling like another general website about quantum computing. It's clear that this website has a lot of benefits to users and the one thing that amazed me the most is how the app has pathways that can connect students directly to Colorado programs, universities, centers, internships, and more opportunities designed for quantum computing.",
  },
  {
    id: "alex",
    name: "Alex",
    role: "Software Engineer",
    rating: 4,
    quote:
      "The spacing, navigation, cards, transitions, and overall consistency make the interface feel intentionally designed rather than assembled page by page. My biggest suggestion would be a ‘Behind the App’ section because the polished user interface made me curious about technical challenges, code structure, and specific engineering decisions that are underneath it.",
  },
  {
    id: "ethan",
    name: "Ethan",
    role: "Student",
    rating: 5,
    quote:
      "Navigation, animations, and consistent typography. These are three things that make Quantum4Colorado so special. The branding immediately made the project feel more polished than most student-built educational website I have used and seen. After exploring the learning content, I wanted to see a technical section focused on parts like data flow, framework, and more interactive components. For a competition like this, this website has been amazing to experience and I'm happy to see this project become more scalable and impressive in the future.",
  },
  {
    id: "olivia",
    name: "Olivia",
    role: "Student",
    rating: 4,
    quote:
      "I already knew some basic quantum computing before testing out Quantum4Colorado, and I liked how the introductory sections were simple and structured. The consistent page design and visual organization made it easy to skim a concept first and then go back to read the explanation more carefully. I would add optional advanced sections for users who are more experienced in quantum computing like myself, into more deeper physics and actual computing principles. Overall, the project does a really good job of making a difficult topic approachable while still looking professional.",
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Parent",
    rating: 5,
    quote:
      "As a parent, I had no background knowledge in quantum computing, and the biggest positive for me was getting some valuable information that I had never learned before. The shorter explanations, organized sections, and cool cyber design made it easy to move through the content without getting confused. I also liked the Colorado connection a lot because quantum computing is super important in our state and a website like this has never really been made. With having two sons, this feels like the “Khan Academy” of quantum computing and something that can be useful to them during their free time. From a parent's perspective, it feels educational enough to be valuable for students without looking like something designed only for younger children.",
  },
];

export function averageRating(reviews) {
  const list = reviews && reviews.length ? reviews : REVIEWS;
  if (!list.length) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}
