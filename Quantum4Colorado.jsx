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
  Briefcase,
  Globe,
  Layers,
  Link2,
  KeyRound,
  Zap,
  Trophy,
  FlaskConical,
  Laptop,
  Code2,
  Handshake,
  Compass,
  Sparkles,
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
import {
  HERO_STATS,
  EXPLAINER_CARDS,
  ECOSYSTEM_TABS,
  STRENGTHS,
  GAPS,
  DETAILED_ECOSYSTEM,
  DATA_SOURCES,
} from "./data/ecosystem.js";
import {
  QUESTIONS,
  NIST_PQC,
  CISA_PQC,
  NSA_PQC,
  calculateResults,
} from "./data/pqc-scoring.js";
import { INVESTMENT_CHART, INVESTMENT_TABLE, RECOMMENDATIONS } from "./data/policy-recommendations.js";
import { CAREERS } from "./data/careers.js";
import { HERO_CARDS, CONCEPT_CARDS, RESOURCE_TABS } from "./data/resources.js";
import { QUIZ_QUESTIONS, computeQuizResult, QUIZ_RESULTS } from "./data/quiz-data.js";

/* =========================================================================
   Quantum4Colorado
   A civic information platform for Colorado residents, organizations,
   and representatives to understand quantum computing's relevance to
   Colorado. Built for the 2026 Congressional App Challenge (CO-06).
   Single-file React component. Tailwind utility classes only.

   Content (ecosystem entries, assessment questions/scoring, quiz data,
   policy recommendations, career profiles, youth resources) lives in
   /data at the repo root and is shared verbatim with the mobile app —
   see /data/*.js. Only design tokens and JSX/markup live in this file.
   ========================================================================= */

/* Resolves the string icon names used throughout /data to the actual
   lucide-react components imported above. Mobile has an equivalent
   registry (mobile/src/components/Icon.js) resolving the same string
   names against lucide-react-native, since a shared data file can't
   hold component references from either platform's icon package. */
const ICON_REGISTRY = {
  Lock,
  Shield,
  MapPin,
  Landmark,
  GraduationCap,
  Cpu,
  Building2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Briefcase,
  Globe,
  Layers,
  Link2,
  KeyRound,
  Zap,
  Trophy,
  FlaskConical,
  Laptop,
  Code2,
  Handshake,
};

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
/* Content now lives in /data — see imports above. */

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
  const TierIcon = results ? ICON_REGISTRY[results.tier.icon] : null;

  // accordion state (rep ecosystem)
  const [openAccordion, setOpenAccordion] = useState(0);

  const storyRef = useRef(null);
  const assessmentRef = useRef(null);
  const repsRef = useRef(null);
  const youthRef = useRef(null);
  const aboutRef = useRef(null);
  const resultsRef = useRef(null);

  const refMap = {
    story: storyRef,
    assessment: assessmentRef,
    representatives: repsRef,
    youth: youthRef,
    about: aboutRef,
  };

  /* active section tracking */
  useEffect(() => {
    const refs = [storyRef, assessmentRef, repsRef, youthRef, aboutRef];
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
    { key: "youth", label: "Youth and Education" },
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
                const Icon = ICON_REGISTRY[card.icon];
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
                  const Icon = ICON_REGISTRY[tab.icon];
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
                      <TierIcon
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
        <section id="youth" ref={youthRef} className="scroll-mt-16">
          <YouthEducation scrollTo={scrollTo} />
        </section>

        {/* Divider */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <QuantumLine />
        </div>

        {/* ======================================================= SECTION 5 */}
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
                  {DATA_SOURCES.map((src) => (
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

// ===== SECTION 4: YOUTH EDUCATION =====
/* ---------------------------------------------------------------------------
   "Quantum for Colorado Youth" — a fourth top-level section for students with
   zero prior quantum knowledge. Four layers: an expandable hero, four plain-
   language concept cards, a five-tab resource platform (competitions, summer
   programs, online courses, Colorado-specific opportunities, and careers),
   and a self-contained "Find Your Quantum Path" quiz.

   Icon accessibility note: every icon here sits directly beside visible text
   that already conveys the same meaning (a card title, a tab label, an
   option label), so icons are marked aria-hidden="true" — the standard
   accessible pattern for icons that reinforce rather than replace text.
   Nothing in this section relies on an icon or color alone to convey meaning.
   --------------------------------------------------------------------------- */


function YouthEducation({ scrollTo }) {
  // Layer 1: entry-point hero (expand-in-place, not a modal)
  const [expandedHero, setExpandedHero] = useState(null);

  // Layer 3: resource platform tabs + expandable career cards
  const [activeResourceTab, setActiveResourceTab] = useState("competitions");
  const [expandedCareer, setExpandedCareer] = useState(null);

  // Layer 4: "Find Your Quantum Path" quiz — self-contained state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  const selectQuizAnswer = (questionIndex, track) => {
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = track;
      return next;
    });
    if (questionIndex === quizStep) {
      if (quizStep < QUIZ_QUESTIONS.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        setQuizDone(true);
      }
    }
  };

  const retakeQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizDone(false);
  };

  const quizResultId = quizDone ? computeQuizResult(quizAnswers) : null;
  const quizResult = quizResultId
    ? { ...CAREERS.find((c) => c.id === quizResultId), ...QUIZ_RESULTS[quizResultId] }
    : null;
  const quizAnsweredCount = quizAnswers.filter(Boolean).length;

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
        <QuantumLine />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
        {/* header */}
        <div className="max-w-3xl">
          <SectionLabel>Youth &amp; Education</SectionLabel>
          <h2 className="font-black tracking-tight text-2xl sm:text-4xl text-[#1A1A2E]">
            Quantum for Colorado Youth
          </h2>
          <p className="mt-4 text-[#4A5568] text-lg leading-relaxed">
            You don't need to know any physics to start here. This is what
            quantum computing actually means for you — your privacy, your
            future job, and Colorado's place in a race that's already
            underway.
          </p>
        </div>

        {/* -------------------------- Layer 1: hero cards -------------------------- */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {HERO_CARDS.map((card, i) => {
            const Icon = ICON_REGISTRY[card.icon];
            const open = expandedHero === i;
            return (
              <div
                key={card.title}
                className={`rounded-2xl border p-6 transition-colors ${
                  open
                    ? "border-[#1B3A6B] bg-[#1B3A6B]/5"
                    : "border-[#E2E8F0] bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedHero(open ? null : i)}
                  aria-expanded={open}
                  className="w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1B3A6B]/10">
                    <Icon className="w-6 h-6 text-[#1B3A6B]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-lg text-[#1A1A2E]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[#4A5568] leading-relaxed">
                    {card.teaser}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1B3A6B]">
                    {open ? "Show less" : "Tell me more"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
                {open && (
                  <p className="mt-4 pt-4 border-t border-[#E2E8F0] text-sm text-[#1A1A2E] leading-relaxed">
                    {card.expanded}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* -------------------------- Layer 2: concept cards ------------------------ */}
        <div className="mt-16">
          <h3 className="font-black tracking-tight text-2xl text-[#1A1A2E]">
            Quantum Concepts You Can Actually Understand
          </h3>
          <p className="mt-2 text-[#4A5568]">
            No math. No formulas. Just the ideas, explained with things you
            already know.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONCEPT_CARDS.map((c) => {
              const Icon = ICON_REGISTRY[c.icon];
              return (
                <div
                  key={c.title}
                  className="rounded-2xl bg-white border border-[#E2E8F0] p-7"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#2E7D52]/10">
                    <Icon className="w-6 h-6 text-[#2E7D52]" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-bold text-lg text-[#1A1A2E]">
                    {c.title}
                  </h4>
                  <p className="mt-3 text-[#4A5568] leading-relaxed">
                    {c.body}
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#C4872A] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4872A] focus-visible:ring-offset-2"
                  >
                    Go deeper on {c.resourceLabel}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* -------------------------- Layer 3: resource platform --------------------- */}
        <div className="mt-16">
          <h3 className="font-black tracking-tight text-2xl text-[#1A1A2E]">
            Your Roadmap: Competitions, Programs, and Careers
          </h3>
          <p className="mt-2 text-[#4A5568]">
            Real opportunities, organized by what you're looking for.
          </p>

          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Youth resource categories"
          >
            {RESOURCE_TABS.map((tab) => {
              const Icon = ICON_REGISTRY[tab.icon];
              const active = activeResourceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveResourceTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2 ${
                    active
                      ? "bg-[#1B3A6B] text-white border-[#1B3A6B]"
                      : "bg-white text-[#4A5568] border-[#E2E8F0] hover:border-[#1B3A6B]/40"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* non-career resource tabs */}
          {RESOURCE_TABS.filter(
            (t) => t.id === activeResourceTab && t.id !== "careers"
          ).map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {tab.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] p-6 hover:border-[#1B3A6B]/40 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-[#1A1A2E] leading-snug">
                      {item.name}
                    </h4>
                    <ExternalLink
                      className="w-4 h-4 text-[#1B3A6B] shrink-0 opacity-60 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          ))}

          {/* careers tab */}
          {activeResourceTab === "careers" && (
            <div
              role="tabpanel"
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {CAREERS.map((track, i) => {
                const Icon = ICON_REGISTRY[track.icon];
                const open = expandedCareer === i;
                return (
                  <div
                    key={track.id}
                    className={`rounded-2xl border bg-white p-6 ${
                      open ? "border-[#1B3A6B]" : "border-[#E2E8F0]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCareer(open ? null : i)}
                      aria-expanded={open}
                      className="w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#1B3A6B]/10 shrink-0">
                          <Icon
                            className="w-5 h-5 text-[#1B3A6B]"
                            aria-hidden="true"
                          />
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#1B3A6B] shrink-0 mt-2 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="mt-3 font-bold text-lg text-[#1A1A2E]">
                        {track.label}
                      </h4>
                      <p className="mt-1 text-sm text-[#4A5568]">
                        {track.oneLiner}
                      </p>
                    </button>
                    {open && (
                      <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-3">
                        <DetailRow
                          label="What they build"
                          value={track.whatTheyBuild}
                        />
                        <DetailRow label="Degree path" value={track.degreePath} />
                        <DetailRow
                          label="Colorado employers"
                          value={track.coloradoEmployers}
                        />

                        {track.id === "crypto" && (
                          <button
                            type="button"
                            onClick={() => scrollTo && scrollTo("assessment")}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B3A6B] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
                          >
                            See the PQC Readiness Tool in action
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                        {track.id === "policy" && (
                          <button
                            type="button"
                            onClick={() =>
                              scrollTo && scrollTo("representatives")
                            }
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B3A6B] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
                          >
                            See Colorado quantum policy in action
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}

                        <p className="text-sm text-[#1A1A2E] leading-relaxed">
                          <span className="font-bold">
                            Your Next Step From High School:{" "}
                          </span>
                          {track.nextStep}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* -------------------------- Layer 4: quiz ---------------------------------- */}
        <div className="mt-16 rounded-2xl bg-[#1B3A6B] text-white p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 shrink-0">
              <Compass className="w-6 h-6 text-[#C4872A]" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-black tracking-tight text-2xl">
                Find Your Quantum Path
              </h3>
              <p className="text-blue-100/80 text-sm mt-0.5">
                Five quick questions. No wrong answers.
              </p>
            </div>
          </div>

          {!quizDone && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs tracking-wider uppercase text-blue-100/70">
                  Question {Math.min(quizStep + 1, QUIZ_QUESTIONS.length)} of{" "}
                  {QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-[#C4872A] transition-all duration-500"
                  style={{
                    width: `${(quizAnsweredCount / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-6">
                <p className="font-bold text-lg">
                  {QUIZ_QUESTIONS[quizStep].prompt}
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt) => {
                    const selected = quizAnswers[quizStep] === opt.track;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => selectQuizAnswer(quizStep, opt.track)}
                        aria-pressed={selected}
                        className={`text-left rounded-xl border p-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4872A] focus-visible:ring-offset-2 ${
                          selected
                            ? "border-[#C4872A] bg-white/10 font-semibold"
                            : "border-white/20 bg-white/5 hover:border-white/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {quizDone && quizResult && (
            <div className="mt-8">
              <p className="font-mono text-xs tracking-wider uppercase text-[#C4872A]">
                Your result
              </p>
              <h4 className="mt-1 font-black text-2xl sm:text-3xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#C4872A]" aria-hidden="true" />
                You're built for {quizResult.label}
              </h4>
              <p className="mt-3 text-blue-100/90 leading-relaxed max-w-2xl">
                {quizResult.resultBlurb}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {quizResult.firstSteps.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/10 border border-white/15 p-4"
                  >
                    <span className="font-mono text-xs text-[#C4872A]">
                      Step {i + 1}
                    </span>
                    <p className="mt-1 text-sm text-white leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {quizResult.id === "policy" && (
                <div className="mt-6 rounded-xl bg-[#C4872A]/20 border border-[#C4872A]/50 p-5">
                  <p className="text-sm text-white leading-relaxed mb-2">
                    Quantum policy work looks a lot like the Representatives
                    section of this very app.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo && scrollTo("representatives")}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#C4872A] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4872A] focus-visible:ring-offset-2"
                  >
                    See what quantum policy work looks like in practice
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
              {quizResult.id === "crypto" && (
                <div className="mt-6 rounded-xl bg-[#C4872A]/20 border border-[#C4872A]/50 p-5">
                  <p className="text-sm text-white leading-relaxed mb-2">
                    Curious what this looks like in the real world?
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo && scrollTo("assessment")}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#C4872A] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4872A] focus-visible:ring-offset-2"
                  >
                    See how quantum cryptography protects real organizations
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={retakeQuiz}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Retake quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
