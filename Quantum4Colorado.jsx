import React, { useState, useRef, useEffect, useMemo } from "react";
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
  QrCode,
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
  SOURCES,
} from "./data/ecosystem.js";
import {
  QUESTIONS,
  NIST_PQC,
  CISA_PQC,
  NSA_PQC,
  PRIORITY_LABELS,
  calculateResults,
} from "./data/pqc-scoring.js";
import { INVESTMENT_CHART, INVESTMENT_TABLE, RECOMMENDATIONS } from "./data/policy-recommendations.js";
import { CAREERS } from "./data/careers.js";
import { HERO_CARDS, CONCEPT_CARDS, RESOURCE_TABS } from "./data/resources.js";
import { QUIZ_QUESTIONS, computeQuizResult, QUIZ_RESULTS } from "./data/quiz-data.js";
import { LANGUAGES, DEFAULT_LANGUAGE, makeTranslator } from "./data/i18n.js";
import {
  ICON_REGISTRY,
  C,
  QuantumLine,
  readableOn,
  SectionLabel,
  LanguageContext,
  useLanguage,
} from "./src/shared/uiKit.jsx";
import LearnHub from "./src/education/LearnHub.jsx";
import LessonPage from "./src/education/LessonPage.jsx";
import qrcode from "qrcode-generator";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

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

/* ------------------------------- Static data ----------------------------- */
/* Content now lives in /data — see imports above. Design tokens and the
   small primitives built on them (the palette, QuantumLine, SectionLabel,
   readableOn, the language context, and the icon registry) live in
   src/shared/uiKit.jsx so the course pages under src/education can use
   them without importing from this file. */

/* Section key <-> URL path. Each section is a real route so they're
   independently linkable and the app isn't one endless scroll. The course
   also owns /learn/:lessonSlug, which has no section key of its own. */
const PATH_BY_KEY = {
  story: "/",
  assessment: "/assessment",
  representatives: "/representatives",
  learn: "/learn",
  youth: "/youth",
  about: "/about",
};
const KEY_BY_PATH = Object.fromEntries(
  Object.entries(PATH_BY_KEY).map(([k, v]) => [v, k])
);

/* ------------------------------ Small atoms ------------------------------ */
const PRIORITY_CLASS = {
  Immediate: "bg-[#D50000] text-white",
  "Within 6 Months": "bg-[#FFB800] text-[#0A0A0A]",
  "Within 1 Year": "bg-[#1A1AE5] text-white",
};

/* ------------------------------ Language context --------------------------- */
/* Bilingual support (English/Spanish). Content fields are { en, es } pairs
   living directly in /data (see data/i18n.js); LanguageContext (in the shared
   UI kit) tracks which language is active, and the provider below persists
   the user's choice across sessions. */
const LANG_STORAGE_KEY = "q4co-lang";

/* Toggle rendered in the web nav and reused in the mobile-style spots that
   need it (kept small and self-contained since it's used in a couple of
   different layout contexts — desktop nav, mobile nav drawer). */
function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`inline-flex items-center rounded-full border-2 border-[#0A0A0A] bg-[#F2EFE4] p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-colors ${
            lang === l.code
              ? "bg-[#1A1AE5] text-white"
              : "text-[#2B2B2B] hover:text-[#1A1AE5]"
          }`}
        >
          {l.shortLabel}
        </button>
      ))}
    </div>
  );
}

/* Static UI chrome text (headings, buttons, labels) that isn't part of
   the Phase 1 shared /data content — kept local to this file since each
   platform has always had its own UI copy. Bilingual for the sections
   translated per the Phase 4 priority order. */
const UI = {
  assessment: {
    sectionLabel: { en: "Readiness Assessment", es: "Evaluación de Preparación" },
    heading: {
      en: "Is Your Organization Quantum-Ready?",
      es: "¿Su Organización Está Lista para la Era Cuántica?",
    },
    intro: {
      en: "NIST finalized post-quantum cryptography standards in 2024. Every organization handling sensitive data needs to understand its exposure and begin migrating. This free assessment takes 3 minutes.",
      es: "El NIST finalizó los estándares de criptografía poscuántica en 2024. Toda organización que maneje datos confidenciales necesita comprender su exposición y comenzar a migrar. Esta evaluación gratuita toma 3 minutos.",
    },
    explainer: {
      en: "Current encryption protects your data the way a combination lock protects a safe. A quantum computer is like a machine that tries every combination at once, in seconds. NIST's new PQC standards are the fix. Here is where your organization stands.",
      es: "El cifrado actual protege sus datos como una cerradura de combinación protege una caja fuerte. Una computadora cuántica es como una máquina que prueba todas las combinaciones a la vez, en segundos. Los nuevos estándares de PQC del NIST son la solución. Esto es lo que le toca a su organización.",
    },
    question: { en: "Question", es: "Pregunta" },
    of: { en: "of", es: "de" },
    continue: { en: "Continue", es: "Continuar" },
    generate: { en: "See my organization's results", es: "Ver los resultados de mi organización" },
    profileHeading: { en: "Your Quantum Readiness Profile", es: "Su Perfil de Preparación Cuántica" },
    retake: { en: "Retake assessment", es: "Repetir evaluación" },
    riskFactorsHeading: { en: "Your specific risk factors", es: "Sus factores de riesgo específicos" },
    actionListHeading: { en: "Your priority action list", es: "Su lista de acciones prioritarias" },
    downloadPdf: {
      en: "Download my organization's report (PDF)",
      es: "Descargar el informe de mi organización (PDF)",
    },
    shareTeam: {
      en: "Share this assessment with your IT team",
      es: "Compartir esta evaluación con su equipo de TI",
    },
    linkCopied: { en: "Link copied!", es: "¡Enlace copiado!" },
    showQr: { en: "Show QR code", es: "Mostrar código QR" },
    hideQr: { en: "Hide QR code", es: "Ocultar código QR" },
    qrCaption: {
      en: "Scan to open these exact results on another device",
      es: "Escanee para abrir estos mismos resultados en otro dispositivo",
    },
    learnMore: { en: "Learn more from the source", es: "Más información de la fuente" },
  },
  report: {
    title: {
      en: "Quantum4Colorado Organizational Readiness Report",
      es: "Informe de Preparación Organizacional de Quantum4Colorado",
    },
    subtitle: {
      en: "Post-Quantum Cryptography (PQC) readiness summary",
      es: "Resumen de preparación en criptografía poscuántica (PQC)",
    },
    orgType: { en: "Organization type:", es: "Tipo de organización:" },
    riskScore: { en: "Risk score:", es: "Puntaje de riesgo:" },
    riskTier: { en: "Risk tier:", es: "Nivel de riesgo:" },
    identifiedFactors: { en: "Identified risk factors", es: "Factores de riesgo identificados" },
    priorityActions: { en: "Priority action list", es: "Lista de acciones prioritarias" },
    resources: { en: "Resources:", es: "Recursos:" },
    footer: {
      en: "Generated by Quantum4Colorado, a nonpartisan civic resource built for the 2026 Congressional App Challenge (CO-06). This assessment is for information only. It does not replace professional cybersecurity advice.",
      es: "Generado por Quantum4Colorado, un recurso cívico no partidista creado para el Congressional App Challenge 2026 (CO-06). Esta evaluación es solo informativa. No sustituye el asesoramiento profesional en ciberseguridad.",
    },
  },
  youth: {
    sectionLabel: { en: "Youth & Education", es: "Juventud y Educación" },
    heading: {
      en: "Quantum for Colorado Youth",
      es: "La Computación Cuántica para la Juventud de Colorado",
    },
    intro: {
      en: "You do not need to know any physics to start here. This is what quantum computing actually means for you: your privacy, your future job, and Colorado's place in a race that has already started.",
      es: "No necesita saber nada de física para empezar aquí. Esto es lo que la computación cuántica significa de verdad para usted: su privacidad, su futuro empleo y el lugar de Colorado en una carrera que ya comenzó.",
    },
    showLess: { en: "Show less", es: "Mostrar menos" },
    tellMeMore: { en: "Tell me more", es: "Contarme más" },
    conceptsHeading: {
      en: "Quantum Concepts You Can Actually Understand",
      es: "Conceptos Cuánticos Que Realmente Puede Entender",
    },
    conceptsIntro: {
      en: "No math. No formulas. Just the ideas, explained with things you already know.",
      es: "Sin matemáticas. Sin fórmulas. Solo las ideas, explicadas con cosas que ya conoce.",
    },
    goDeeperOn: { en: "Go deeper on", es: "Profundizar en" },
    learnThisProperly: {
      en: "Learn this properly",
      es: "Aprender esto a fondo",
    },
    courseCalloutLabel: { en: "Want the full version?", es: "¿Quiere la versión completa?" },
    courseCalloutHeading: {
      en: "There's a whole course behind these four cards",
      es: "Hay un curso completo detrás de estas cuatro tarjetas",
    },
    courseCalloutBody: {
      en: "Eighteen short lessons across seven units, from what a qubit actually is through to the encryption standards written in Boulder. No physics background needed, and it's free.",
      es: "Dieciocho lecciones breves en siete unidades, desde qué es realmente un qubit hasta los estándares de cifrado escritos en Boulder. No hace falta saber física, y es gratis.",
    },
    courseCalloutCta: { en: "Start learning", es: "Empezar a aprender" },
    roadmapHeading: {
      en: "Your Roadmap: Competitions, Programs, and Careers",
      es: "Su Hoja de Ruta: Competencias, Programas y Carreras",
    },
    roadmapIntro: {
      en: "Real opportunities, organized by what you're looking for.",
      es: "Oportunidades reales, organizadas según lo que está buscando.",
    },
    whatTheyBuild: { en: "What they build", es: "Qué construyen" },
    degreePath: { en: "Degree path", es: "Ruta académica" },
    coloradoEmployers: { en: "Colorado employers", es: "Empleadores en Colorado" },
    crossLinkCrypto: {
      en: "See the PQC Readiness Tool in action",
      es: "Vea la Herramienta de Preparación PQC en acción",
    },
    crossLinkPolicy: {
      en: "See Colorado quantum policy in action",
      es: "Vea la política cuántica de Colorado en acción",
    },
    nextStepLabel: {
      en: "Your Next Step From High School:",
      es: "Su Próximo Paso Desde la Secundaria:",
    },
    quizHeading: { en: "Find Your Quantum Path", es: "Encuentre Su Camino Cuántico" },
    quizSubheading: {
      en: "Five quick questions. No wrong answers.",
      es: "Cinco preguntas rápidas. No hay respuestas incorrectas.",
    },
    yourResult: { en: "Your result", es: "Su resultado" },
    builtFor: { en: "You're built for", es: "Usted está hecho para" },
    step: { en: "Step", es: "Paso" },
    calloutPolicyText: {
      en: "Quantum policy work looks a lot like the Representatives section of this very app.",
      es: "El trabajo de políticas cuánticas se parece mucho a la sección de Representantes de esta misma aplicación.",
    },
    calloutPolicyLink: {
      en: "See what quantum policy work looks like in practice",
      es: "Vea cómo es en la práctica el trabajo de políticas cuánticas",
    },
    calloutCryptoText: {
      en: "Curious what this looks like in the real world?",
      es: "¿Tiene curiosidad de cómo se ve esto en el mundo real?",
    },
    calloutCryptoLink: {
      en: "See how quantum cryptography protects real organizations",
      es: "Vea cómo la criptografía cuántica protege a organizaciones reales",
    },
    retakeQuiz: { en: "Retake quiz", es: "Repetir cuestionario" },
  },
  story: {
    heroEyebrow: { en: "A Civic Resource for Colorado · CO-06", es: "Un Recurso Cívico para Colorado · CO-06" },
    heroTitle: {
      en: "Colorado is at the center of the quantum revolution.",
      es: "Colorado está en el centro de la revolución cuántica.",
    },
    heroSubtitle: {
      en: "From NIST Boulder to JILA to the startups reshaping cryptography, here is what is happening in our state and why it matters to every Coloradan.",
      es: "Desde NIST Boulder hasta JILA y las startups que están transformando la criptografía, esto es lo que sucede en nuestro estado y por qué le importa a cada habitante de Colorado.",
    },
    assessCta: { en: "Assess your organization", es: "Evalúe su organización" },
    forRepsCta: { en: "For representatives", es: "Para representantes" },
    explainerLabel: { en: "The 60-Second Explanation", es: "La Explicación de 60 Segundos" },
    explainerHeading: {
      en: "What is quantum computing, and why should you care?",
      es: "¿Qué es la computación cuántica y por qué debería importarle?",
    },
    mapLabel: { en: "The Map", es: "El Mapa" },
    mapHeading: { en: "Colorado's Quantum Infrastructure", es: "La Infraestructura Cuántica de Colorado" },
    mapIntro: {
      en: "Every major quantum research program, federal facility, and quantum-adjacent organization operating in Colorado.",
      es: "Todos los programas principales de investigación cuántica, instalaciones federales y organizaciones relacionadas con la computación cuántica que operan en Colorado.",
    },
    significanceLabel: { en: "Significance to Colorado:", es: "Importancia para Colorado:" },
    stakesLabel: { en: "The Stakes", es: "Lo Que Está en Juego" },
    stakesHeading: {
      en: "Why Colorado's Lead Matters, And Could Be Lost",
      es: "Por Qué el Liderazgo de Colorado Importa y Podría Perderse",
    },
    strengthsHeading: { en: "Colorado's strengths", es: "Las fortalezas de Colorado" },
    gapHeading: { en: "The investment gap", es: "La brecha de inversión" },
    ctaAssessTitle: {
      en: "Is your organization ready for the quantum shift?",
      es: "¿Está su organización lista para el cambio cuántico?",
    },
    ctaAssessSub: {
      en: "Take the 3-minute readiness assessment",
      es: "Realice la evaluación de preparación de 3 minutos",
    },
    ctaRepsTitle: {
      en: "View detailed reports for representatives",
      es: "Ver informes detallados para representantes",
    },
    ctaRepsSub: {
      en: "Ecosystem data and policy recommendations",
      es: "Datos del ecosistema y recomendaciones de políticas",
    },
  },
  reps: {
    sectionLabel: { en: "For Representatives & Policymakers", es: "Para Representantes y Legisladores" },
    heading: { en: "Colorado Quantum Policy Hub", es: "Centro de Políticas Cuánticas de Colorado" },
    intro: {
      en: "Data, analysis, and resources for Colorado state legislators, congressional staff, and economic development officials.",
      es: "Datos, análisis y recursos para legisladores estatales de Colorado, personal del Congreso, y funcionarios de desarrollo económico.",
    },
    caseHeading: {
      en: "The Case for a Colorado Quantum Economic Development Initiative",
      es: "El Argumento a Favor de una Iniciativa de Desarrollo Económico Cuántico de Colorado",
    },
    tableState: { en: "State", es: "Estado" },
    tableInitiative: { en: "Initiative", es: "Iniciativa" },
    tableInvestment: { en: "Investment", es: "Inversión" },
    tableYear: { en: "Year", es: "Año" },
    chartHeading: { en: "State quantum investment commitments", es: "Compromisos estatales de inversión cuántica" },
    chartSub: { en: "Reported state funding, in $ millions", es: "Financiamiento estatal reportado, en millones de $" },
    chartFootnote: {
      en: "Figures reflect publicly reported state commitments. Colorado has no coordinated state quantum investment despite hosting federal and university infrastructure other states are spending hundreds of millions to approximate.",
      es: "Las cifras reflejan compromisos estatales reportados públicamente. Colorado no cuenta con una inversión cuántica estatal coordinada, a pesar de albergar infraestructura federal y universitaria que otros estados están gastando cientos de millones en tratar de igualar.",
    },
    callout: {
      en: "Other states are spending hundreds of millions to build what Colorado already has in NIST Boulder and JILA. A state Quantum Economic Development Initiative could turn that head start into jobs, new companies, and national leadership. Illinois and New York are already moving.",
      es: "Otros estados gastan cientos de millones para construir lo que Colorado ya tiene en NIST Boulder y JILA. Una Iniciativa Estatal de Desarrollo Económico Cuántico podría convertir esa ventaja en empleos, nuevas empresas y liderazgo nacional. Illinois y Nueva York ya se están moviendo.",
    },
    ecosystemHeading: {
      en: "Detailed Colorado Quantum Ecosystem Report",
      es: "Informe Detallado del Ecosistema Cuántico de Colorado",
    },
    ecosystemIntro: {
      en: "Expand each institution for research focus, funding, employment, and its connection to Colorado's economic and security interests.",
      es: "Expanda cada institución para ver su enfoque de investigación, financiamiento, empleo, y su conexión con los intereses económicos y de seguridad de Colorado.",
    },
    researchFocus: { en: "Research focus", es: "Enfoque de investigación" },
    funding: { en: "Funding", es: "Financiamiento" },
    employment: { en: "Employment", es: "Empleo" },
    connectionToColorado: { en: "Connection to Colorado", es: "Conexión con Colorado" },
    downloadReportPdf: {
      en: "Download full Colorado Quantum Ecosystem Report (PDF)",
      es: "Descargar el informe completo del ecosistema cuántico de Colorado (PDF)",
    },
    recommendationsHeading: { en: "Recommended State Actions", es: "Acciones Estatales Recomendadas" },
    precedentLabel: { en: "Precedent:", es: "Precedente:" },
    impactLabel: { en: "Impact:", es: "Impacto:" },
    takeActionHeading: { en: "Take Action", es: "Tome Acción" },
    contactCrowTitle: { en: "Contact Rep. Jason Crow's office", es: "Contacte a la oficina del Rep. Jason Crow" },
    contactCrowSub: { en: "Share input on quantum policy", es: "Comparta su opinión sobre política cuántica" },
    contactCQNTitle: {
      en: "Contact the Colorado Quantum Network",
      es: "Contacte a la Red Cuántica de Colorado",
    },
    contactCQNSub: {
      en: "Connect with the statewide consortium",
      es: "Conéctese con el consorcio estatal",
    },
    shareRepTitle: {
      en: "Share this resource with your state representative",
      es: "Comparta este recurso con su representante estatal",
    },
    shareRepSub: { en: "Opens a pre-filled email template", es: "Abre una plantilla de correo electrónico prellenada" },
    composeEmail: { en: "Compose email", es: "Redactar correo" },
  },
};

/* ============================== Main component ============================= */
function App() {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY) || DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  });
  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* localStorage unavailable (private browsing, etc.) — language just won't persist */
    }
  };
  const t = makeTranslator(lang);

  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("federal");
  const location = useLocation();
  const navigate = useNavigate();

  // assessment state
  const [step, setStep] = useState(0); // current visible question index 0..7
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const TierIcon = results ? ICON_REGISTRY[results.tier.icon] : null;

  /* Reconstruct a shared assessment result from a `?r=` link (see
     handleShare/QR code below) — same pure calculateResults() the normal
     flow uses, just fed decoded answers instead of live form state. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const encoded = new URLSearchParams(window.location.search).get("r");
    if (!encoded) return;
    try {
      const decoded = JSON.parse(encoded);
      if (decoded && typeof decoded === "object" && decoded.q1) {
        setAnswers(decoded);
        setResults(calculateResults(decoded));
        // A shared link can land on any path; the results live on /assessment.
        if (window.location.pathname !== PATH_BY_KEY.assessment) {
          navigate(PATH_BY_KEY.assessment + window.location.search, {
            replace: true,
          });
        }
      }
    } catch (e) {
      // malformed share link — fall through to the normal empty assessment
    }
  }, []);

  // accordion state (rep ecosystem)
  const [openAccordion, setOpenAccordion] = useState(0);

  const resultsRef = useRef(null);

  /* Each section is its own route now, so a fresh page always starts at
     the top rather than inheriting the previous page's scroll offset. */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Exact match for the flat sections, plus a prefix check for the course,
     whose lesson pages (/learn/:lessonSlug) still belong to the "learn" nav
     item. The trailing-slash test keeps a path like /learnmore from
     matching. */
  const activeSection =
    location.pathname === "/learn" || location.pathname.startsWith("/learn/")
      ? "learn"
      : KEY_BY_PATH[location.pathname] || "story";

  /* Cross-section links (hero CTAs, quiz result callouts) navigate
     between pages instead of scrolling within one. */
  const scrollTo = (key) => {
    setNavOpen(false);
    navigate(PATH_BY_KEY[key] || "/");
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
    // Anonymous usage stat only — no PII, never blocks the UI on failure.
    fetch("/api/track-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgType: answers.q1, tier: r.tier.name.en }),
    }).catch(() => {});
  };

  const restart = () => {
    setAnswers({});
    setResults(null);
    setStep(0);
    setShowQr(false);
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(null, "", PATH_BY_KEY.assessment);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => window.print();

  /* Encodes the answers behind the current results into the URL, so the
     link (and its QR code) reopens to these same results via the decode
     effect above, instead of just linking back to an empty assessment. */
  const shareLink =
    results && typeof window !== "undefined"
      ? `${window.location.origin}${PATH_BY_KEY.assessment}?r=${encodeURIComponent(
          JSON.stringify(answers)
        )}`
      : "";

  const qrDataUrl = useMemo(() => {
    if (!shareLink) return null;
    try {
      const qr = qrcode(0, "M");
      qr.addData(shareLink);
      qr.make();
      return qr.createDataURL(6, 8);
    } catch (e) {
      return null;
    }
  }, [shareLink]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      setCopied(false);
    }
  };

  const emailTemplate = () => {
    const subject = encodeURIComponent(
      "Colorado Quantum Economic Development: Resource for Your Office"
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
    {
      key: "story",
      label: { en: "Colorado's Quantum Story", es: "La Historia Cuántica de Colorado" },
    },
    {
      key: "assessment",
      label: { en: "Is Your Org Ready?", es: "¿Está Lista su Organización?" },
    },
    {
      key: "representatives",
      label: { en: "For Representatives", es: "Para Representantes" },
    },
    {
      key: "learn",
      label: { en: "Learn Quantum", es: "Aprender Cuántica" },
    },
    {
      key: "youth",
      label: { en: "Youth and Education", es: "Juventud y Educación" },
    },
    { key: "about", label: { en: "About", es: "Acerca de" } },
  ];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
    <div className="min-h-screen bg-[#F2EFE4] text-[#0A0A0A] antialiased">
      {/* ============================ MAIN APP (hidden when printing) ===== */}
      <div className="print:hidden">
        {/* ----------------------------- NAV ----------------------------- */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b-4 border-[#0A0A0A] shadow-hard-sm">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                onClick={() => setNavOpen(false)}
                className="flex items-center gap-2 group"
                aria-label="Quantum4Colorado home"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 bg-[#1A1AE5] border-2 border-[#0A0A0A]">
                  <Atom className="w-5 h-5 text-[#FFB800]" />
                </span>
                <span className="font-display font-black tracking-tight text-lg text-[#1A1AE5]">
                  Quantum<span className="text-[#C42B00]">4</span>Colorado
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((l) => {
                  const active = activeSection === l.key;
                  return (
                    <Link
                      key={l.key}
                      to={PATH_BY_KEY[l.key]}
                      className={`relative px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                        active
                          ? "text-[#0A0A0A]"
                          : "text-[#2B2B2B] hover:text-[#1A1AE5]"
                      }`}
                    >
                      {t(l.label)}
                      {active && (
                        <span className="absolute left-2 right-2 -bottom-1 h-1 bg-[#FFB800] border-2 border-[#0A0A0A]" />
                      )}
                    </Link>
                  );
                })}
                <LanguageToggle className="ml-2" />
              </div>

              <button
                className="md:hidden inline-flex items-center justify-center w-10 h-10 border-2 border-[#0A0A0A] text-[#1A1AE5] hover:bg-[#FFB800]"
                onClick={() => setNavOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={navOpen}
              >
                {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {navOpen && (
            <div className="md:hidden border-t-2 border-[#0A0A0A] bg-white">
              <div className="px-4 py-2 flex flex-col">
                {navLinks.map((l) => (
                  <Link
                    key={l.key}
                    to={PATH_BY_KEY[l.key]}
                    onClick={() => setNavOpen(false)}
                    className={`text-left px-2 py-3 text-base font-bold uppercase tracking-wide border-b-2 border-[#0A0A0A] ${
                      activeSection === l.key
                        ? "text-[#0A0A0A] bg-[#FFB800]"
                        : "text-[#2B2B2B]"
                    }`}
                  >
                    {t(l.label)}
                  </Link>
                ))}
                <div className="px-2 pt-3">
                  <LanguageToggle />
                </div>
              </div>
            </div>
          )}
        </nav>

        <Routes>
        {/* ======================================================= SECTION 1 */}
        <Route path="/" element={
        <section id="story" className="pt-16">
          {/* Hero */}
          <div className="bg-gradient-to-b from-[#1A1AE5] to-[#05003D] text-white">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
              <QuantumLine className="opacity-80" />
            </div>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-20">
              <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#FFB800] mb-5">
                {t(UI.story.heroEyebrow)}
              </p>
              <h1 className="font-display font-black tracking-tight text-3xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-4xl">
                {t(UI.story.heroTitle)}
              </h1>
              <p className="mt-6 text-base sm:text-xl text-blue-100/90 max-w-3xl leading-relaxed">
                {t(UI.story.heroSubtitle)}
              </p>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
                {HERO_STATS.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/10 border border-white/15 backdrop-blur px-6 py-7"
                  >
                    <div className="font-mono font-black text-4xl sm:text-5xl text-[#FFB800]">
                      {s.value}
                    </div>
                    <div className="mt-3 text-sm text-blue-50/90 leading-snug">
                      {t(s.label)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo("assessment")}
                  className="inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A600] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold px-6 py-3 transition-colors"
                >
                  {t(UI.story.assessCta)}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo("representatives")}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold px-6 py-3 transition-colors"
                >
                  {t(UI.story.forRepsCta)}
                </button>
              </div>
            </div>
          </div>

          {/* Plain-language explainer */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>{t(UI.story.explainerLabel)}</SectionLabel>
              <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
                {t(UI.story.explainerHeading)}
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXPLAINER_CARDS.map((card, i) => {
                const Icon = ICON_REGISTRY[card.icon];
                return (
                  <div
                    key={i}
                    className="bg-white border-2 border-[#0A0A0A] p-7 shadow-hard shadow-hard-sm"
                  >
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-[#1A1AE5]/10">
                      <Icon className="w-6 h-6 text-[#1A1AE5]" />
                    </span>
                    <h3 className="mt-5 font-bold text-lg text-[#0A0A0A]">
                      {t(card.title)}
                    </h3>
                    <p className="mt-3 text-[#2B2B2B] leading-relaxed">
                      {t(card.body)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ecosystem map */}
          <div className="bg-white border-y-4 border-[#0A0A0A]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
              <div className="max-w-3xl">
                <SectionLabel>{t(UI.story.mapLabel)}</SectionLabel>
                <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
                  {t(UI.story.mapHeading)}
                </h2>
                <p className="mt-4 text-[#2B2B2B] text-lg leading-relaxed">
                  {t(UI.story.mapIntro)}
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
                          ? "bg-[#1A1AE5] text-white border-[#1A1AE5]"
                          : "bg-white text-[#2B2B2B] border-[#0A0A0A] hover:border-[#1A1AE5]/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t(tab.label)}
                    </button>
                  );
                })}
              </div>

              {/* Cards */}
              {ECOSYSTEM_TABS.filter((et) => et.id === activeTab).map((tab) => (
                <div
                  key={tab.id}
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {tab.orgs.map((org) => (
                    <div
                      key={org.name}
                      className="bg-[#F2EFE4] border-2 border-[#0A0A0A] p-6 hover:shadow-hard-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-lg text-[#0A0A0A] leading-snug">
                          {org.name}
                        </h3>
                        <span
                          className="shrink-0 font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 border-2 border-[#0A0A0A]"
                          style={{
                            backgroundColor: tab.color,
                            color: readableOn(tab.color),
                          }}
                        >
                          {t(tab.shortLabel)}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#2B2B2B]">
                        <MapPin className="w-3.5 h-3.5 text-[#C42B00]" />
                        <span className="font-mono">{t(org.location)}</span>
                      </div>
                      <p className="mt-3 text-[#2B2B2B] leading-relaxed">
                        {t(org.role)}
                      </p>
                      <div className="mt-4 pt-3 border-t-4 border-[#0A0A0A] flex gap-2">
                        <TrendingUp className="w-4 h-4 text-[#00A94F] shrink-0 mt-0.5" />
                        <p className="text-sm text-[#0A0A0A]">
                          <span className="font-semibold">
                            {t(UI.story.significanceLabel)}{" "}
                          </span>
                          {t(org.significance)}
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
              <SectionLabel>{t(UI.story.stakesLabel)}</SectionLabel>
              <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
                {t(UI.story.stakesHeading)}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* strengths */}
              <div className="border border-[#00A94F]/30 bg-[#EAF5EF] p-7">
                <div className="flex items-center gap-2 text-[#00A94F]">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-bold text-lg">{t(UI.story.strengthsHeading)}</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {STRENGTHS.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00A94F] shrink-0" />
                      <span className="text-[#0A0A0A] leading-relaxed">{t(s)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* gap */}
              <div className="border border-[#FFB800]/40 bg-[#FBF3E6] p-7">
                <div className="flex items-center gap-2 text-[#9c6a1c]">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-bold text-lg">{t(UI.story.gapHeading)}</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {GAPS.map((g, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FFB800] shrink-0" />
                      <span className="text-[#0A0A0A] leading-relaxed">{t(g)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 bg-[#1A1AE5] text-white p-8 sm:p-10">
              <div className="grid gap-4 sm:grid-cols-2 items-center">
                <button
                  onClick={() => scrollTo("assessment")}
                  className="group text-left bg-white/10 hover:bg-white/20 border border-white/15 p-5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      {t(UI.story.ctaAssessTitle)}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#FFB800] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="mt-1 text-blue-100/80 text-sm">
                    {t(UI.story.ctaAssessSub)}
                  </p>
                </button>
                <button
                  onClick={() => scrollTo("representatives")}
                  className="group text-left bg-white/10 hover:bg-white/20 border border-white/15 p-5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      {t(UI.story.ctaRepsTitle)}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#FFB800] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="mt-1 text-blue-100/80 text-sm">
                    {t(UI.story.ctaRepsSub)}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </section>
        } />

        {/* ======================================================= SECTION 2 */}
        <Route path="/assessment" element={
        <section
          id="assessment"
          className="pt-16 bg-white border-b-4 border-[#0A0A0A]"
        >
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>{t(UI.assessment.sectionLabel)}</SectionLabel>
              <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
                {t(UI.assessment.heading)}
              </h2>
              <p className="mt-4 text-[#2B2B2B] text-lg leading-relaxed">
                {t(UI.assessment.intro)}
              </p>
            </div>

            {/* explanation box */}
            <div className="mt-8 rounded-r-xl bg-[#EAF1FB] border-l-4 border-[#1A1AE5] p-5">
              <p className="text-[#0A0A0A] leading-relaxed">
                {t(UI.assessment.explainer)}
              </p>
            </div>
            {/* progress */}
            {!results && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs tracking-wider uppercase text-[#2B2B2B]">
                    {t(UI.assessment.question)} {Math.min(step + 1, QUESTIONS.length)}{" "}
                    {t(UI.assessment.of)} {QUESTIONS.length}
                  </span>
                  <span className="font-mono text-xs text-[#2B2B2B]">
                    {Math.round(((step + (allAnswered ? 1 : 0)) / QUESTIONS.length) * 100)}
                    %
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#0A0A0A] overflow-hidden">
                  <div
                    className="h-full bg-[#1A1AE5] transition-all duration-500"
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
                      className="border-2 border-[#0A0A0A] bg-[#F2EFE4] p-6 shadow-hard"
                    >
                      <legend className="px-2">
                        <span className="font-mono text-xs font-bold text-[#C42B00]">
                          Q{index + 1}
                        </span>
                      </legend>
                      <p className="font-bold text-lg text-[#0A0A0A]">
                        {t(q.prompt)}
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
                              className={`flex items-start gap-3 text-left border p-4 transition-all ${
                                selected
                                  ? "border-[#1A1AE5] bg-[#1A1AE5]/5 ring-1 ring-[#1A1AE5]/30"
                                  : "border-[#0A0A0A] bg-white hover:border-[#1A1AE5]/40"
                              }`}
                            >
                              <span
                                className={`mt-0.5 inline-flex items-center justify-center shrink-0 w-5 h-5 ${
                                  isMulti ? "rounded-md" : "rounded-full"
                                } border-2 ${
                                  selected
                                    ? "bg-[#1A1AE5] border-[#1A1AE5]"
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
                                    ? "text-[#0A0A0A] font-semibold"
                                    : "text-[#2B2B2B]"
                                }`}
                              >
                                {t(opt.label)}
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
                              className="inline-flex items-center gap-2 bg-[#1A1AE5] text-white font-semibold px-5 py-2.5 hover:bg-[#0F0FA8] transition-colors"
                            >
                              {t(UI.assessment.continue)}
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
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A600] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-black text-lg px-8 py-4 transition-colors"
                    >
                      <ClipboardCheck className="w-5 h-5" />
                      {t(UI.assessment.generate)}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ----------------------------- RESULTS ----------------------- */}
            {results && (
              <div ref={resultsRef} className="mt-12 scroll-mt-20">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="font-display font-black tracking-tight text-2xl text-[#0A0A0A]">
                    {t(UI.assessment.profileHeading)}
                  </h3>
                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B2B2B] hover:text-[#1A1AE5]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t(UI.assessment.retake)}
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Panel 1 — score */}
                  <div
                    className="border p-7 flex flex-col items-center text-center"
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
                        {t(results.tier.name)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#0A0A0A] leading-relaxed">
                      {t(results.interpretation)}
                    </p>
                  </div>

                  {/* Panel 2 — risk factors */}
                  <div className="border-2 border-[#0A0A0A] bg-white p-7 shadow-hard">
                    <h4 className="font-bold text-lg text-[#0A0A0A]">
                      {t(UI.assessment.riskFactorsHeading)}
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {results.factors.map((f, i) => (
                        <li key={i} className="flex gap-3">
                          <AlertCircle
                            className="w-4 h-4 mt-1 shrink-0"
                            style={{ color: results.tier.color }}
                          />
                          <span className="text-sm text-[#2B2B2B] leading-relaxed">
                            {t(f)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Panel 3 — actions */}
                  <div className="border-2 border-[#0A0A0A] bg-white p-7 shadow-hard">
                    <h4 className="font-bold text-lg text-[#0A0A0A]">
                      {t(UI.assessment.actionListHeading)}
                    </h4>
                    <ol className="mt-4 space-y-5">
                      {results.priorityActions.map((a, i) => (
                        <li key={i}>
                          <span
                            className={`inline-block font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full ${
                              PRIORITY_CLASS[a.priority] ||
                              "bg-[#1A1AE5] text-white"
                            }`}
                          >
                            {t(PRIORITY_LABELS[a.priority]) || a.priority}
                          </span>
                          <p className="mt-1.5 font-semibold text-sm text-[#0A0A0A] leading-snug">
                            {t(a.title)}
                          </p>
                          <p className="mt-1 text-sm text-[#2B2B2B] leading-relaxed">
                            {t(a.description)}
                          </p>
                          {a.resource && (
                            <a
                              href={a.resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#1A1AE5] hover:underline"
                            >
                              {t(a.resource.label)}
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
                    className="inline-flex items-center justify-center gap-2 bg-[#1A1AE5] hover:bg-[#0F0FA8] text-white border-2 border-[#0A0A0A] shadow-hard-sm font-semibold px-6 py-3 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t(UI.assessment.downloadPdf)}
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0A0A0A] hover:border-[#1A1AE5]/40 text-[#0A0A0A] font-semibold px-6 py-3 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    {copied ? t(UI.assessment.linkCopied) : t(UI.assessment.shareTeam)}
                  </button>
                  <button
                    onClick={() => setShowQr((v) => !v)}
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#0A0A0A] hover:border-[#1A1AE5]/40 text-[#0A0A0A] font-semibold px-6 py-3 transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    {showQr ? t(UI.assessment.hideQr) : t(UI.assessment.showQr)}
                  </button>
                </div>

                {showQr && qrDataUrl && (
                  <div className="mt-4 flex flex-col items-center gap-2 border-2 border-[#0A0A0A] bg-white p-6 shadow-hard">
                    <img
                      src={qrDataUrl}
                      alt={t(UI.assessment.showQr)}
                      width={168}
                      height={168}
                      className="rounded-lg"
                    />
                    <p className="text-xs text-[#2B2B2B] text-center max-w-xs">
                      {t(UI.assessment.qrCaption)}
                    </p>
                  </div>
                )}

                {/* resources */}
                <div className="mt-10 bg-[#F2EFE4] border-2 border-[#0A0A0A] p-7">
                  <h4 className="font-bold text-lg text-[#0A0A0A]">
                    {t(UI.assessment.learnMore)}
                  </h4>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[NIST_PQC, CISA_PQC, NSA_PQC].map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 bg-white border-2 border-[#0A0A0A] p-4 hover:border-[#1A1AE5]/40 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-[#1A1AE5] mt-0.5 shrink-0" />
                        <span className="text-sm font-semibold text-[#0A0A0A] leading-snug">
                          {t(r.label)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        } />

        {/* ======================================================= SECTION 3 */}
        <Route path="/representatives" element={
        <section id="representatives" className="pt-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <SectionLabel>{t(UI.reps.sectionLabel)}</SectionLabel>
              <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
                {t(UI.reps.heading)}
              </h2>
              <p className="mt-4 text-[#2B2B2B] text-lg leading-relaxed">
                {t(UI.reps.intro)}
              </p>
            </div>

            {/* A — Investment gap */}
            <div className="mt-12">
              <h3 className="font-bold text-xl text-[#0A0A0A]">
                {t(UI.reps.caseHeading)}
              </h3>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* table */}
                <div className="overflow-x-auto border-2 border-[#0A0A0A] bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1A1AE5] text-white text-left">
                        <th className="px-4 py-3 font-semibold">{t(UI.reps.tableState)}</th>
                        <th className="px-4 py-3 font-semibold">{t(UI.reps.tableInitiative)}</th>
                        <th className="px-4 py-3 font-semibold">{t(UI.reps.tableInvestment)}</th>
                        <th className="px-4 py-3 font-semibold">{t(UI.reps.tableYear)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INVESTMENT_TABLE.map((row) => (
                        <tr
                          key={row.state}
                          className={`border-t-4 border-[#0A0A0A] ${
                            row.highlight ? "bg-[#FBF3E6]" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-semibold text-[#0A0A0A]">
                            {row.state}
                          </td>
                          <td className="px-4 py-3 text-[#2B2B2B]">
                            {t(row.initiative)}
                          </td>
                          <td className="px-4 py-3 font-mono text-[#2B2B2B]">
                            {t(row.investment)}
                          </td>
                          <td className="px-4 py-3 font-mono text-[#2B2B2B]">
                            {t(row.year)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* chart */}
                <div className="border-2 border-[#0A0A0A] bg-white p-6 shadow-hard">
                  <p className="font-semibold text-[#0A0A0A]">
                    {t(UI.reps.chartHeading)}
                  </p>
                  <p className="font-mono text-xs text-[#2B2B2B] mb-3">
                    {t(UI.reps.chartSub)}
                  </p>
                  <div style={{ width: "100%", height: 240 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={INVESTMENT_CHART}
                        margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="state"
                          tick={{ fontSize: 12, fill: "#2B2B2B" }}
                          axisLine={{ stroke: "#0A0A0A" }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#2B2B2B" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: "#F2EFE4" }}
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
                              fill: "#0A0A0A",
                            }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-[#2B2B2B] leading-snug">
                    {t(UI.reps.chartFootnote)}
                  </p>
                </div>
              </div>

              {/* callout */}
              <div className="mt-6 bg-[#FFB800] text-[#0A0A0A] p-7">
                <p className="text-lg leading-relaxed">
                  {t(UI.reps.callout)}
                </p>
              </div>
            </div>

            {/* B — Detailed ecosystem accordion */}
            <div className="mt-16">
              <h3 className="font-bold text-xl text-[#0A0A0A]">
                {t(UI.reps.ecosystemHeading)}
              </h3>
              <p className="mt-2 text-[#2B2B2B]">
                {t(UI.reps.ecosystemIntro)}
              </p>

              <div className="mt-6 border-2 border-[#0A0A0A] bg-white divide-y divide-[#0A0A0A] overflow-hidden">
                {DETAILED_ECOSYSTEM.map((inst, i) => {
                  const open = openAccordion === i;
                  return (
                    <div key={inst.name}>
                      <button
                        onClick={() => setOpenAccordion(open ? -1 : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#F2EFE4] transition-colors"
                        aria-expanded={open}
                      >
                        <span>
                          <span className="font-bold text-[#0A0A0A]">
                            {inst.name}
                          </span>
                          <span className="ml-2 font-mono text-xs text-[#2B2B2B]">
                            {t(inst.location)}
                          </span>
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#1A1AE5] shrink-0 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="px-5 pb-5 grid gap-3 sm:grid-cols-2">
                          <DetailRow label={t(UI.reps.researchFocus)} value={t(inst.focus)} />
                          <DetailRow label={t(UI.reps.funding)} value={t(inst.funding)} />
                          <DetailRow
                            label={t(UI.reps.employment)}
                            value={t(inst.employment)}
                          />
                          <DetailRow
                            label={t(UI.reps.connectionToColorado)}
                            value={t(inst.connection)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handlePrint}
                className="mt-5 inline-flex items-center gap-2 bg-[#1A1AE5] hover:bg-[#0F0FA8] text-white border-2 border-[#0A0A0A] shadow-hard-sm font-semibold px-6 py-3 transition-colors"
              >
                <FileText className="w-4 h-4" />
                {t(UI.reps.downloadReportPdf)}
              </button>
            </div>

            {/* C — Recommendations */}
            <div className="mt-16">
              <h3 className="font-bold text-xl text-[#0A0A0A]">
                {t(UI.reps.recommendationsHeading)}
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECOMMENDATIONS.map((rec, i) => (
                  <div
                    key={i}
                    className="border-2 border-[#0A0A0A] bg-white p-7 shadow-hard"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-9 h-9 bg-[#1A1AE5] text-white font-mono font-bold">
                        {i + 1}
                      </span>
                      <h4 className="font-bold text-[#0A0A0A] leading-snug">
                        {t(rec.title)}
                      </h4>
                    </div>
                    <p className="mt-4 text-[#2B2B2B] leading-relaxed">
                      {t(rec.rationale)}
                    </p>
                    <div className="mt-4 grid gap-2">
                      <div className="flex gap-2 text-sm">
                        <span className="font-semibold text-[#1A1AE5] shrink-0">
                          {t(UI.reps.precedentLabel)}
                        </span>
                        <span className="text-[#2B2B2B]">{t(rec.precedent)}</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="font-semibold text-[#00A94F] shrink-0">
                          {t(UI.reps.impactLabel)}
                        </span>
                        <span className="text-[#2B2B2B]">{t(rec.impact)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D — Contact & engagement */}
            <div className="mt-16">
              <h3 className="font-bold text-xl text-[#0A0A0A]">{t(UI.reps.takeActionHeading)}</h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="https://crow.house.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-[#0A0A0A] bg-white p-6 shadow-hard hover:border-[#1A1AE5]/40 transition-colors"
                >
                  <Landmark className="w-6 h-6 text-[#1A1AE5]" />
                  <h4 className="mt-3 font-bold text-[#0A0A0A]">
                    {t(UI.reps.contactCrowTitle)}
                  </h4>
                  <p className="mt-1 text-sm text-[#2B2B2B]">
                    {t(UI.reps.contactCrowSub)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1A1AE5]">
                    crow.house.gov <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="https://coloradoquantum.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-[#0A0A0A] bg-white p-6 shadow-hard hover:border-[#1A1AE5]/40 transition-colors"
                >
                  <Users className="w-6 h-6 text-[#00A94F]" />
                  <h4 className="mt-3 font-bold text-[#0A0A0A]">
                    {t(UI.reps.contactCQNTitle)}
                  </h4>
                  <p className="mt-1 text-sm text-[#2B2B2B]">
                    {t(UI.reps.contactCQNSub)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1A1AE5]">
                    coloradoquantum.org <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </a>

                <button
                  onClick={emailTemplate}
                  className="text-left border border-[#FFB800]/40 bg-[#FBF3E6] p-6 hover:border-[#FFB800] transition-colors"
                >
                  <Mail className="w-6 h-6 text-[#9c6a1c]" />
                  <h4 className="mt-3 font-bold text-[#0A0A0A]">
                    {t(UI.reps.shareRepTitle)}
                  </h4>
                  <p className="mt-1 text-sm text-[#2B2B2B]">
                    {t(UI.reps.shareRepSub)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#9c6a1c]">
                    {t(UI.reps.composeEmail)} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
        } />

        {/* ================================================== LEARN QUANTUM */}
        {/* The course: a hub listing every unit, plus one page per lesson.
            Route order doesn't matter here — react-router ranks by
            specificity, so /learn/:lessonSlug can't shadow /learn. */}
        <Route path="/learn" element={
        <section id="learn" className="pt-16">
          <LearnHub />
        </section>
        } />
        <Route path="/learn/:lessonSlug" element={
        <section id="lesson" className="pt-16">
          <LessonPage />
        </section>
        } />

        {/* ======================================================= SECTION 4 */}
        <Route path="/youth" element={
        <section id="youth" className="pt-16">
          <YouthEducation scrollTo={scrollTo} />
        </section>
        } />

        {/* ======================================================= SECTION 5 */}
        <Route path="/about" element={
        <section id="about" className="pt-16 bg-white">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20">
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
              About Quantum4Colorado
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="font-bold text-lg text-[#0A0A0A]">What this is</h3>
                <p className="mt-2 text-[#2B2B2B] leading-relaxed">
                  Quantum4Colorado was built by a team of Colorado high school
                  students for the 2026 Congressional App Challenge. It is a
                  nonpartisan civic information resource.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#0A0A0A]">
                  Why we built it
                </h3>
                <p className="mt-2 text-[#2B2B2B] leading-relaxed">
                  Colorado sits at the center of the quantum computing
                  revolution. NIST Boulder, JILA, and Quantinuum put this state
                  in a position no other one holds. We built this app because
                  most Coloradans have no idea, and because the organizations
                  and representatives who need to act on it deserve a clear
                  place to start.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#0A0A0A]">
                  Where This Data Comes From
                </h3>
                <p className="mt-2 text-sm text-[#2B2B2B]">
                  Every ecosystem entry, assessment recommendation, and policy
                  claim in this app traces back to one of these sources.
                </p>
                <div className="mt-4 border-2 border-[#0A0A0A] bg-white divide-y divide-[#0A0A0A] overflow-hidden">
                  {SOURCES.map((src, i) => {
                    const content = (
                      <>
                        <p className="font-semibold text-sm text-[#0A0A0A]">
                          {t(src.organization)}
                        </p>
                        <p className="mt-1 text-xs text-[#2B2B2B] leading-relaxed">
                          {t(src.supports)}
                        </p>
                      </>
                    );
                    return src.url ? (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-3 p-4 hover:bg-[#F2EFE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-inset"
                      >
                        <div>{content}</div>
                        <ExternalLink
                          className="w-4 h-4 text-[#1A1AE5] shrink-0 mt-0.5 opacity-60 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <div key={i} className="p-4">
                        {content}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-[#2B2B2B] leading-relaxed">
                  Statistics are drawn from public sources. Figures such as
                  federal investment and researcher counts are approximate and
                  reflect the most recent publicly available reporting. Quantum
                  threat timelines are inherently uncertain; this resource
                  presents preparation as prudent, not as a prediction of a
                  specific date.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#0A0A0A]">
                  Contact &amp; feedback
                </h3>
                <a
                  href="mailto:team@quantum4colorado.org"
                  className="mt-2 inline-flex items-center gap-2 text-[#1A1AE5] font-semibold hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  team@quantum4colorado.org
                </a>
              </div>
            </div>
          </div>
        </section>
        } />
        </Routes>

        {/* footer */}
        <footer className="bg-[#05003D] text-blue-100/70">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white/10">
                  <Atom className="w-4 h-4 text-[#FFB800]" />
                </span>
                <span className="font-black text-white">
                  Quantum<span className="text-[#C42B00]">4</span>Colorado
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
        <div className="hidden print:block p-8 text-[#0A0A0A]">
          <div className="border-b-2 border-[#1A1AE5] pb-4 mb-6">
            <h1 className="font-black text-2xl text-[#1A1AE5]">
              {t(UI.report.title)}
            </h1>
            <p className="text-sm text-[#2B2B2B] mt-1">
              {t(UI.report.subtitle)}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-sm">
              <span className="font-semibold">{t(UI.report.orgType)}</span>{" "}
              {t(results.orgLabel)}
            </p>
            <p className="text-sm">
              <span className="font-semibold">{t(UI.report.riskScore)}</span> {results.score}
              /100
            </p>
            <p className="text-sm">
              <span className="font-semibold">{t(UI.report.riskTier)}</span>{" "}
              {t(results.tier.name)}
            </p>
            <p className="text-sm mt-2">{t(results.interpretation)}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg border-b-4 border-[#0A0A0A] pb-1 mb-2">
              {t(UI.report.identifiedFactors)}
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {results.factors.map((f, i) => (
                <li key={i}>{t(f)}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-lg border-b-4 border-[#0A0A0A] pb-1 mb-2">
              {t(UI.report.priorityActions)}
            </h2>
            <ol className="space-y-3 text-sm">
              {results.priorityActions.map((a, i) => (
                <li key={i}>
                  <span className="font-semibold">
                    [{t(PRIORITY_LABELS[a.priority]) || a.priority}] {t(a.title)}
                  </span>
                  <p className="text-[#2B2B2B]">{t(a.description)}</p>
                  {a.resource && (
                    <p className="text-[#1A1AE5]">{t(a.resource.label)}: {a.resource.url}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="text-xs text-[#2B2B2B] border-t-4 border-[#0A0A0A] pt-3">
            <p>
              {t(UI.report.resources)} {NIST_PQC.url} &middot; {CISA_PQC.url} &middot;{" "}
              {NSA_PQC.url}
            </p>
            <p className="mt-1">
              {t(UI.report.footer)}
            </p>
          </div>
        </div>
      )}
    </div>
    </LanguageContext.Provider>
  );
}

export default App;

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
          stroke="#0A0A0A"
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
        <span className="font-mono text-xs text-[#2B2B2B]">/ 100</span>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="bg-[#F2EFE4] border-2 border-[#0A0A0A] p-4">
      <p className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#C42B00]">
        {label}
      </p>
      <p className="mt-1 text-sm text-[#0A0A0A] leading-relaxed">{value}</p>
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
  const { t } = useLanguage();

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
          <SectionLabel>{t(UI.youth.sectionLabel)}</SectionLabel>
          <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#0A0A0A]">
            {t(UI.youth.heading)}
          </h2>
          <p className="mt-4 text-[#2B2B2B] text-lg leading-relaxed">
            {t(UI.youth.intro)}
          </p>
        </div>

        {/* -------------------------- Layer 1: hero cards -------------------------- */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {HERO_CARDS.map((card, i) => {
            const Icon = ICON_REGISTRY[card.icon];
            const open = expandedHero === i;
            return (
              <div
                key={i}
                className={`border p-6 transition-colors ${
                  open
                    ? "border-[#1A1AE5] bg-[#1A1AE5]/5"
                    : "border-[#0A0A0A] bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedHero(open ? null : i)}
                  aria-expanded={open}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-[#1A1AE5]/10">
                    <Icon className="w-6 h-6 text-[#1A1AE5]" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-bold text-lg text-[#0A0A0A]">
                    {t(card.title)}
                  </h3>
                  <p className="mt-2 text-[#2B2B2B] leading-relaxed">
                    {t(card.teaser)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1A1AE5]">
                    {open ? t(UI.youth.showLess) : t(UI.youth.tellMeMore)}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
                {open && (
                  <p className="mt-4 pt-4 border-t-4 border-[#0A0A0A] text-sm text-[#0A0A0A] leading-relaxed">
                    {t(card.expanded)}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* -------------------------- Layer 2: concept cards ------------------------ */}
        <div className="mt-16">
          <h3 className="font-display font-black tracking-tight text-2xl text-[#0A0A0A]">
            {t(UI.youth.conceptsHeading)}
          </h3>
          <p className="mt-2 text-[#2B2B2B]">
            {t(UI.youth.conceptsIntro)}
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONCEPT_CARDS.map((c, i) => {
              const Icon = ICON_REGISTRY[c.icon];
              return (
                <div
                  key={i}
                  className="bg-white border-2 border-[#0A0A0A] p-7 shadow-hard"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-[#00A94F]/10">
                    <Icon className="w-6 h-6 text-[#00A94F]" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-bold text-lg text-[#0A0A0A]">
                    {t(c.title)}
                  </h4>
                  <p className="mt-3 text-[#2B2B2B] leading-relaxed">
                    {t(c.body)}
                  </p>
                  {/* Points into the course rather than off-site. The slug
                      lives in a separate field from the shared `href` so
                      mobile, which has no /learn route, is unaffected. */}
                  <Link
                    to={`/learn/${c.lessonSlug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#C42B00] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C42B00] focus-visible:ring-offset-2"
                  >
                    {t(UI.youth.learnThisProperly)}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bridge into the full course — these four cards are the summary,
              /learn is the long version. */}
          <div className="mt-8 bg-[#1A1AE5] border-2 border-[#0A0A0A] shadow-hard p-6 sm:p-8 text-white">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFB800]">
              {t(UI.youth.courseCalloutLabel)}
            </p>
            <h4 className="mt-3 font-display font-black tracking-tight text-xl sm:text-2xl">
              {t(UI.youth.courseCalloutHeading)}
            </h4>
            <p className="mt-2 text-white/85 leading-relaxed max-w-2xl">
              {t(UI.youth.courseCalloutBody)}
            </p>
            <Link
              to="/learn"
              className="mt-5 inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#E5A600] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold px-6 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1AE5]"
            >
              {t(UI.youth.courseCalloutCta)}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* -------------------------- Layer 3: resource platform --------------------- */}
        <div className="mt-16">
          <h3 className="font-display font-black tracking-tight text-2xl text-[#0A0A0A]">
            {t(UI.youth.roadmapHeading)}
          </h3>
          <p className="mt-2 text-[#2B2B2B]">
            {t(UI.youth.roadmapIntro)}
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
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2 ${
                    active
                      ? "bg-[#1A1AE5] text-white border-[#1A1AE5]"
                      : "bg-white text-[#2B2B2B] border-[#0A0A0A] hover:border-[#1A1AE5]/40"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {t(tab.label)}
                </button>
              );
            })}
          </div>

          {/* non-career resource tabs */}
          {RESOURCE_TABS.filter(
            (rt) => rt.id === activeResourceTab && rt.id !== "careers"
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
                  className="group bg-[#F2EFE4] border-2 border-[#0A0A0A] p-6 hover:border-[#1A1AE5]/40 hover:shadow-hard-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-[#0A0A0A] leading-snug">
                      {item.name}
                    </h4>
                    <ExternalLink
                      className="w-4 h-4 text-[#1A1AE5] shrink-0 opacity-60 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm text-[#2B2B2B] leading-relaxed">
                    {t(item.description)}
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
                    className={`border bg-white p-6 ${
                      open ? "border-[#1A1AE5]" : "border-[#0A0A0A]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedCareer(open ? null : i)}
                      aria-expanded={open}
                      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex items-center justify-center w-11 h-11 bg-[#1A1AE5]/10 shrink-0">
                          <Icon
                            className="w-5 h-5 text-[#1A1AE5]"
                            aria-hidden="true"
                          />
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#1A1AE5] shrink-0 mt-2 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <h4 className="mt-3 font-bold text-lg text-[#0A0A0A]">
                        {t(track.label)}
                      </h4>
                      <p className="mt-1 text-sm text-[#2B2B2B]">
                        {t(track.oneLiner)}
                      </p>
                    </button>
                    {open && (
                      <div className="mt-4 pt-4 border-t-4 border-[#0A0A0A] space-y-3">
                        <DetailRow
                          label={t(UI.youth.whatTheyBuild)}
                          value={t(track.whatTheyBuild)}
                        />
                        <DetailRow label={t(UI.youth.degreePath)} value={t(track.degreePath)} />
                        <DetailRow
                          label={t(UI.youth.coloradoEmployers)}
                          value={t(track.coloradoEmployers)}
                        />

                        {track.id === "crypto" && (
                          <button
                            type="button"
                            onClick={() => scrollTo && scrollTo("assessment")}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1A1AE5] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
                          >
                            {t(UI.youth.crossLinkCrypto)}
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                        {track.id === "policy" && (
                          <button
                            type="button"
                            onClick={() =>
                              scrollTo && scrollTo("representatives")
                            }
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1A1AE5] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
                          >
                            {t(UI.youth.crossLinkPolicy)}
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}

                        <p className="text-sm text-[#0A0A0A] leading-relaxed">
                          <span className="font-bold">
                            {t(UI.youth.nextStepLabel)}{" "}
                          </span>
                          {t(track.nextStep)}
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
        <div className="mt-16 bg-[#1A1AE5] text-white p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-11 h-11 bg-white/10 shrink-0">
              <Compass className="w-6 h-6 text-[#FFB800]" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display font-black tracking-tight text-2xl">
                {t(UI.youth.quizHeading)}
              </h3>
              <p className="text-blue-100/80 text-sm mt-0.5">
                {t(UI.youth.quizSubheading)}
              </p>
            </div>
          </div>

          {!quizDone && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs tracking-wider uppercase text-blue-100/70">
                  {t(UI.assessment.question)} {Math.min(quizStep + 1, QUIZ_QUESTIONS.length)}{" "}
                  {t(UI.assessment.of)} {QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-500"
                  style={{
                    width: `${(quizAnsweredCount / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-6">
                <p className="font-bold text-lg">
                  {t(QUIZ_QUESTIONS[quizStep].prompt)}
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt) => {
                    const selected = quizAnswers[quizStep] === opt.track;
                    return (
                      <button
                        key={opt.track}
                        type="button"
                        onClick={() => selectQuizAnswer(quizStep, opt.track)}
                        aria-pressed={selected}
                        className={`text-left border p-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] focus-visible:ring-offset-2 ${
                          selected
                            ? "border-[#FFB800] bg-white/10 font-semibold"
                            : "border-white/20 bg-white/5 hover:border-white/40"
                        }`}
                      >
                        {t(opt.label)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {quizDone && quizResult && (
            <div className="mt-8">
              <p className="font-mono text-xs tracking-wider uppercase text-[#FFB800]">
                {t(UI.youth.yourResult)}
              </p>
              <h4 className="mt-1 font-black text-2xl sm:text-3xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#FFB800]" aria-hidden="true" />
                {t(UI.youth.builtFor)} {t(quizResult.label)}
              </h4>
              <p className="mt-3 text-blue-100/90 leading-relaxed max-w-2xl">
                {t(quizResult.resultBlurb)}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {quizResult.firstSteps.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white/10 border border-white/15 p-4"
                  >
                    <span className="font-mono text-xs font-bold text-[#FFB800]">
                      {t(UI.youth.step)} {i + 1}
                    </span>
                    <p className="mt-1 text-sm text-white leading-relaxed">
                      {t(step)}
                    </p>
                  </div>
                ))}
              </div>

              {quizResult.id === "policy" && (
                <div className="mt-6 bg-[#FFB800]/20 border border-[#FFB800]/50 p-5">
                  <p className="text-sm text-white leading-relaxed mb-2">
                    {t(UI.youth.calloutPolicyText)}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo && scrollTo("representatives")}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#FFB800] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] focus-visible:ring-offset-2"
                  >
                    {t(UI.youth.calloutPolicyLink)}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
              {quizResult.id === "crypto" && (
                <div className="mt-6 bg-[#FFB800]/20 border border-[#FFB800]/50 p-5">
                  <p className="text-sm text-white leading-relaxed mb-2">
                    {t(UI.youth.calloutCryptoText)}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo && scrollTo("assessment")}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#FFB800] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] focus-visible:ring-offset-2"
                  >
                    {t(UI.youth.calloutCryptoLink)}
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
                {t(UI.youth.retakeQuiz)}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
