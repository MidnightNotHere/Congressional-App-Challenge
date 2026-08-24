/* =========================================================================
   Quantum4Colorado — course map (/learn)
   The landing page for the Learn Quantum course: a resume banner for
   returning students, overall progress, and every unit laid out with its
   lessons. Nothing is locked — a student can start anywhere.
   ========================================================================= */

import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import {
  UNITS,
  TOTAL_LESSONS,
  TOTAL_MINUTES,
} from "../../data/curriculum.js";
import {
  ICON_REGISTRY,
  QuantumLine,
  SectionLabel,
  useLanguage,
} from "../shared/uiKit.jsx";
import { useCourseProgress } from "./progress.js";

const UI = {
  sectionLabel: { en: "Learn Quantum", es: "Aprender Cuántica" },
  heading: {
    en: "Quantum computing, from zero",
    es: "Computación cuántica, desde cero",
  },
  intro: {
    en: "A free course for students with no physics background. Seven units, eighteen short lessons, plain language and everyday analogies throughout. Start anywhere — nothing is locked, and your progress saves in this browser.",
    es: "Un curso gratuito para estudiantes sin conocimientos de física. Siete unidades, dieciocho lecciones breves, lenguaje sencillo y analogías cotidianas de principio a fin. Empiece donde quiera: nada está bloqueado y su progreso se guarda en este navegador.",
  },
  lessonsLabel: { en: "lessons", es: "lecciones" },
  minutesLabel: { en: "min total", es: "min en total" },
  unitsLabel: { en: "units", es: "unidades" },
  startCourse: { en: "Start the course", es: "Comenzar el curso" },
  continueHeading: { en: "Pick up where you left off", es: "Continúe donde lo dejó" },
  continueCta: { en: "Continue", es: "Continuar" },
  courseComplete: {
    en: "You've finished every lesson. Nicely done.",
    es: "Terminó todas las lecciones. Bien hecho.",
  },
  progressLabel: { en: "Course progress", es: "Progreso del curso" },
  complete: { en: "complete", es: "completado" },
  unit: { en: "Unit", es: "Unidad" },
  min: { en: "min", es: "min" },
  done: { en: "Done", es: "Hecho" },
  resetProgress: { en: "Reset progress", es: "Reiniciar progreso" },
  resetConfirm: {
    en: "Reset your course progress? This clears every completed lesson.",
    es: "¿Reiniciar su progreso del curso? Esto borra todas las lecciones completadas.",
  },
};

export default function LearnHub() {
  const { t } = useLanguage();
  const {
    isComplete,
    unitProgress,
    overallPercent,
    completedCount,
    nextLesson,
    hasStarted,
    resetProgress,
  } = useCourseProgress();

  const handleReset = () => {
    if (typeof window !== "undefined" && window.confirm(t(UI.resetConfirm))) {
      resetProgress();
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6">
        <QuantumLine tone="cyber" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
        {/* ------------------------------ header ------------------------------ */}
        <div className="max-w-3xl">
          <SectionLabel tone="cyber">{t(UI.sectionLabel)}</SectionLabel>
          <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl lg:text-5xl text-[#EEF1FA]">
            {t(UI.heading)}
          </h2>
          <p className="mt-4 text-[#9FA8C4] text-lg leading-relaxed">{t(UI.intro)}</p>
        </div>

        {/* course stats */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { value: TOTAL_LESSONS, label: t(UI.lessonsLabel) },
            { value: UNITS.length, label: t(UI.unitsLabel) },
            { value: TOTAL_MINUTES, label: t(UI.minutesLabel) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border-2 border-[#0A0A0A] px-5 py-3 shadow-[3px_3px_0_0_#FFFFFF]"
            >
              <span className="font-mono text-2xl font-bold text-[#375FFF]">{stat.value}</span>
              <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#2B2B2B]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* --------------------- resume / start banner --------------------- */}
        <div className="mt-10 bg-[#375FFF] border-2 border-[#0A0A0A] shadow-[6px_6px_0_0_#FFFFFF] p-6 sm:p-8 text-white">
          {nextLesson ? (
            <>
              {/* White, not accent yellow, at this size: #FFE600 on #375FFF
                  measures 3.91:1, under the 4.5:1 this needs. Same reasoning
                  for the text-white below in place of a dimmer opacity — on
                  this particular blue, even 85% opacity white lands short. */}
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                {hasStarted ? t(UI.continueHeading) : t(UI.startCourse)}
              </p>
              <h3 className="mt-3 font-display font-black tracking-tight text-xl sm:text-2xl">
                {t(nextLesson.title)}
              </h3>
              <p className="mt-2 text-white text-sm font-mono">
                {t(UI.unit)} {nextLesson.unitNumber} · {nextLesson.estimatedMinutes} {t(UI.min)}
              </p>
              <Link
                to={`/learn/${nextLesson.slug}`}
                className="mt-5 inline-flex items-center gap-2 bg-[#FFE600] hover:bg-[#E5CE00] text-[#04070F] border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#FFFFFF] font-bold px-6 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#375FFF]"
              >
                {hasStarted ? t(UI.continueCta) : t(UI.startCourse)}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                {t(UI.progressLabel)}
              </p>
              <h3 className="mt-3 font-display font-black tracking-tight text-xl sm:text-2xl">
                {t(UI.courseComplete)}
              </h3>
            </>
          )}
        </div>

        {/* ------------------------ overall progress ------------------------ */}
        {hasStarted && (
          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                {t(UI.progressLabel)}
              </span>
              <span className="font-mono text-sm font-bold text-[#EEF1FA]">
                {completedCount}/{TOTAL_LESSONS} · {overallPercent}% {t(UI.complete)}
              </span>
            </div>
            <div className="mt-2 h-4 bg-white border-2 border-[#0A0A0A]">
              <div
                className="h-full bg-[#00D4FF] transition-[width] duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9FA8C4] hover:text-[#FF2D55] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {t(UI.resetProgress)}
            </button>
          </div>
        )}

        {/* ----------------------------- units ----------------------------- */}
        <div className="mt-16 space-y-14">
          {UNITS.map((unit, unitIndex) => {
            const Icon = ICON_REGISTRY[unit.icon];
            const { done, total } = unitProgress(unit.id);
            const unitDone = done === total;

            return (
              <section key={unit.id} aria-labelledby={`unit-${unit.id}`}>
                {/* unit header */}
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex items-center justify-center w-14 h-14 shrink-0 border-2 border-[#0A0A0A] ${
                      unitDone ? "bg-[#00D4FF]" : "bg-[#FFE600]"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className="w-7 h-7 text-[#04070F]"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                      {t(UI.unit)} {unitIndex + 1} · {done}/{total}
                    </p>
                    <h3
                      id={`unit-${unit.id}`}
                      className="mt-1 font-display font-black tracking-tight text-xl sm:text-2xl text-[#EEF1FA]"
                    >
                      {t(unit.title)}
                    </h3>
                    <p className="mt-2 text-[#9FA8C4] leading-relaxed max-w-2xl">
                      {t(unit.summary)}
                    </p>
                  </div>
                </div>

                {/* per-unit progress */}
                <div className="mt-4 h-2 bg-white border-2 border-[#0A0A0A]">
                  <div
                    className="h-full bg-[#00D4FF] transition-[width] duration-500"
                    style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                  />
                </div>

                {/* lesson cards */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {unit.lessons.map((lesson, lessonIndex) => {
                    const complete = isComplete(lesson.slug);
                    return (
                      <Link
                        key={lesson.slug}
                        to={`/learn/${lesson.slug}`}
                        className={`group block border-2 border-[#0A0A0A] p-6 shadow-[6px_6px_0_0_#FFFFFF] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070F] ${
                          complete ? "bg-[#00D4FF]/10" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-[#2B2B2B]">
                            {unitIndex + 1}.{lessonIndex + 1}
                          </span>
                          {complete ? (
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00707A]">
                              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                              {t(UI.done)}
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#2B2B2B]">
                              {lesson.estimatedMinutes} {t(UI.min)}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-3 font-bold text-lg text-[#0A0A0A] leading-snug">
                          {t(lesson.title)}
                        </h4>
                        <p className="mt-2 text-sm text-[#2B2B2B] leading-relaxed line-clamp-3">
                          {t(lesson.bigIdea)}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#375FFF]">
                          {t(UI.continueCta)}
                          <ArrowRight
                            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
