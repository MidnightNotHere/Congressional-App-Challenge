/* =========================================================================
   Quantum4Colorado — a single lesson (/learn/:lessonSlug)
   Renders one lesson's prose and diagrams, its knowledge check, and the
   navigation on to the next one.

   Completion is an explicit button, never a consequence of the quiz: the
   course deliberately gates nothing, so a student who skips or fails the
   check can still mark the lesson read and move on.

   Note there's no scroll-to-top here — the app-level effect in
   Quantum4Colorado.jsx already fires on every pathname change, which
   includes moving between lesson slugs.
   ========================================================================= */

import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import {
  getLessonBySlug,
  getAdjacentLessons,
  TOTAL_LESSONS,
} from "../../data/curriculum.js";
import { QuantumLine, SectionLabel, useLanguage } from "../shared/uiKit.jsx";
import { useCourseProgress } from "./progress.js";
import Diagram from "./diagrams/index.jsx";
import LessonQuiz from "./LessonQuiz.jsx";

const UI = {
  courseName: { en: "Learn Quantum", es: "Aprender Cuántica" },
  unit: { en: "Unit", es: "Unidad" },
  min: { en: "min read", es: "min de lectura" },
  lesson: { en: "Lesson", es: "Lección" },
  of: { en: "of", es: "de" },
  bigIdea: { en: "The big idea", es: "La idea central" },
  markComplete: { en: "Mark complete & continue", es: "Marcar completa y continuar" },
  markCompleteLast: { en: "Mark complete & finish", es: "Marcar completa y terminar" },
  completed: { en: "Completed", es: "Completada" },
  markIncomplete: { en: "Mark as not done", es: "Marcar como no hecha" },
  nextLesson: { en: "Next", es: "Siguiente" },
  prevLesson: { en: "Previous", es: "Anterior" },
  backToMap: { en: "Back to course map", es: "Volver al mapa del curso" },
  notFoundTitle: { en: "That lesson doesn't exist", es: "Esa lección no existe" },
  notFoundBody: {
    en: "The link may be out of date, or the lesson may have been renamed. The course map has everything.",
    es: "Puede que el enlace esté desactualizado o que la lección haya cambiado de nombre. El mapa del curso lo tiene todo.",
  },
};

export default function LessonPage() {
  const { lessonSlug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isComplete, markComplete, markIncomplete, setLastVisited } =
    useCourseProgress();

  const lesson = getLessonBySlug(lessonSlug);

  /* Remember where the student was, so the hub can offer to resume. Guarded
     on `lesson` so a bad slug doesn't overwrite a good last position. */
  useEffect(() => {
    if (lesson) setLastVisited(lesson.slug);
  }, [lesson, setLastVisited]);

  /* There's no catch-all route in this app, so an unknown slug has to be
     handled right here rather than falling through to a 404 page. */
  if (!lesson) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-24">
        <div className="bg-white border-2 border-[#0A0A0A] shadow-[6px_6px_0_0_#FFFFFF] p-8">
          <AlertCircle className="w-10 h-10 text-[#FF2D55]" aria-hidden="true" />
          <h2 className="mt-4 font-display font-black tracking-tight text-2xl text-[#0A0A0A]">
            {t(UI.notFoundTitle)}
          </h2>
          <p className="mt-3 text-[#2B2B2B] leading-relaxed">{t(UI.notFoundBody)}</p>
          <Link
            to="/learn"
            className="mt-6 inline-flex items-center gap-2 bg-[#FFE600] hover:bg-[#E5CE00] text-[#04070F] border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#0A0A0A] px-5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2"
          >
            {t(UI.backToMap)}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const { prev, next } = getAdjacentLessons(lesson.slug);
  const complete = isComplete(lesson.slug);

  const completeAndContinue = () => {
    markComplete(lesson.slug);
    navigate(next ? `/learn/${next.slug}` : "/learn");
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
        <QuantumLine tone="cyber" />
      </div>

      <article className="max-w-[900px] mx-auto px-4 sm:px-6 py-16">
        {/* ---------------------------- breadcrumb ---------------------------- */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs uppercase tracking-widest text-[#9FA8C4] flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          <Link to="/learn" className="font-bold text-[#6E8CFF] hover:underline">
            {t(UI.courseName)}
          </Link>
          <span aria-hidden="true">/</span>
          <span>
            {t(UI.unit)} {lesson.unitNumber} · {t(lesson.unitTitle)}
          </span>
        </nav>

        {/* ------------------------------ header ------------------------------ */}
        <header className="mt-6">
          <SectionLabel tone="cyber">
            {t(UI.lesson)} {lesson.courseNumber} {t(UI.of)} {TOTAL_LESSONS}
          </SectionLabel>
          <h1 className="font-display font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[#EEF1FA] leading-tight">
            {t(lesson.title)}
          </h1>
          <p className="mt-3 font-mono text-sm text-[#9FA8C4]">
            {lesson.estimatedMinutes} {t(UI.min)}
            {complete && (
              <span className="ml-3 inline-flex items-center gap-1 font-bold text-[#00D4FF]">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                {t(UI.completed)}
              </span>
            )}
          </p>
        </header>

        {/* ----------------------------- big idea ----------------------------- */}
        <aside className="mt-8 bg-[#FFE600] border-2 border-[#0A0A0A] shadow-[6px_6px_0_0_#FFFFFF] p-6">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#04070F]">
            {t(UI.bigIdea)}
          </p>
          <p className="mt-2 text-[#04070F] text-lg font-bold leading-relaxed">
            {t(lesson.bigIdea)}
          </p>
        </aside>

        {/* ----------------------------- sections ----------------------------- */}
        <div className="mt-12">
          {lesson.sections.map((section, i) => (
            <section key={i} className={i > 0 ? "mt-12" : ""}>
              <h2 className="font-display font-black tracking-tight text-xl sm:text-2xl text-[#EEF1FA]">
                {t(section.heading)}
              </h2>
              <p className="mt-4 text-[#9FA8C4] text-lg leading-relaxed max-w-[68ch]">
                {t(section.body)}
              </p>
              {section.diagram && <Diagram name={section.diagram} />}
            </section>
          ))}
        </div>

        {/* ------------------------------- quiz ------------------------------- */}
        <LessonQuiz questions={lesson.quiz} lessonSlug={lesson.slug} />

        {/* ---------------------------- completion ---------------------------- */}
        <div className="mt-12 border-t-4 border-[#0A0A0A] pt-8">
          {complete ? (
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 font-bold text-[#00D4FF]">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                {t(UI.completed)}
              </span>
              <button
                type="button"
                onClick={() => markIncomplete(lesson.slug)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9FA8C4] hover:text-[#6E8CFF] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
              >
                <Circle className="w-4 h-4" aria-hidden="true" />
                {t(UI.markIncomplete)}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={completeAndContinue}
              className="inline-flex items-center gap-2 bg-[#00D4FF] hover:bg-[#33DFFF] text-[#04070F] border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#FFFFFF] font-bold px-6 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
            >
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              {next ? t(UI.markComplete) : t(UI.markCompleteLast)}
            </button>
          )}
        </div>

        {/* ---------------------------- prev / next ---------------------------- */}
        <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Lesson navigation">
          {prev ? (
            <Link
              to={`/learn/${prev.slug}`}
              className="group bg-white border-2 border-[#0A0A0A] p-5 shadow-[3px_3px_0_0_#FFFFFF] hover:bg-[#F2EFE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#00707A]">
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                {t(UI.prevLesson)}
              </span>
              <span className="mt-2 block font-bold text-[#0A0A0A] leading-snug">
                {t(prev.title)}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}

          {next && (
            <Link
              to={`/learn/${next.slug}`}
              className="group bg-white border-2 border-[#0A0A0A] p-5 shadow-[3px_3px_0_0_#FFFFFF] hover:bg-[#F2EFE4] transition-colors sm:text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#00707A]">
                {t(UI.nextLesson)}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="mt-2 block font-bold text-[#0A0A0A] leading-snug">
                {t(next.title)}
              </span>
            </Link>
          )}
        </nav>

        <div className="mt-8">
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6E8CFF] hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t(UI.backToMap)}
          </Link>
        </div>
      </article>
    </>
  );
}
