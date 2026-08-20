/* =========================================================================
   Quantum4Colorado — end-of-lesson knowledge check
   One question at a time, with the answer revealed immediately along with
   an explanation of why it's right. Purely formative: the score is never
   recorded and getting questions wrong never blocks lesson completion or
   locks anything (see src/education/progress.js).

   This is deliberately a different interaction from the app's two other
   quizzes — the readiness assessment collects answers across a long form
   without feedback, and the career quiz auto-advances without right or
   wrong answers. Both of those *collect*; this one *teaches*, so it has to
   respond to each answer as it happens. The card styling is kept identical
   to the rest of the app so the divergence reads as intentional.
   ========================================================================= */

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, RotateCcw, ArrowRight } from "lucide-react";
import { useLanguage } from "../shared/uiKit.jsx";

const UI = {
  heading: { en: "Check your understanding", es: "Compruebe lo que entendió" },
  intro: {
    en: "No score is saved and nothing is locked — this is just to see what stuck.",
    es: "No se guarda ninguna puntuación ni se bloquea nada: es solo para ver qué quedó claro.",
  },
  questionCounter: { en: "Question", es: "Pregunta" },
  of: { en: "of", es: "de" },
  correct: { en: "Correct", es: "Correcto" },
  notQuite: { en: "Not quite", es: "No exactamente" },
  nextQuestion: { en: "Next question", es: "Siguiente pregunta" },
  seeResults: { en: "See results", es: "Ver resultados" },
  yourScore: { en: "You got", es: "Acertó" },
  outOf: { en: "out of", es: "de" },
  allCorrect: {
    en: "Every one correct. You've got this.",
    es: "Todas correctas. Lo tiene dominado.",
  },
  mostCorrect: {
    en: "Solid. Worth rereading the sections you missed.",
    es: "Muy bien. Vale la pena releer las secciones que falló.",
  },
  someCorrect: {
    en: "Worth another pass through the lesson — the ideas here build on each other.",
    es: "Vale la pena repasar la lección: estas ideas se apoyan unas en otras.",
  },
  retake: { en: "Try again", es: "Intentar de nuevo" },
};

export default function LessonQuiz({ questions, lessonSlug }) {
  const { t } = useLanguage();

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  if (!questions || questions.length === 0) return null;

  const question = questions[step];
  const revealed = selected !== null;
  const isLast = step === questions.length - 1;
  const score = results.filter(Boolean).length;

  const choose = (index) => {
    if (revealed) return; // one shot per question; retake to redo
    setSelected(index);
    setResults((prev) => {
      const next = [...prev];
      next[step] = index === question.correctIndex;
      return next;
    });
  };

  const advance = () => {
    if (isLast) {
      setDone(true);
      return;
    }
    setStep(step + 1);
    setSelected(null);
  };

  const retake = () => {
    setStep(0);
    setSelected(null);
    setResults([]);
    setDone(false);
  };

  /* ------------------------------ results ------------------------------ */
  if (done) {
    const perfect = score === questions.length;
    const most = score >= Math.ceil(questions.length * 0.6);
    const verdict = perfect ? UI.allCorrect : most ? UI.mostCorrect : UI.someCorrect;

    return (
      <section
        aria-labelledby={`quiz-${lessonSlug}`}
        className="mt-12 bg-[#1A1AE5] border-2 border-[#0A0A0A] shadow-hard p-6 sm:p-8 text-white"
      >
        <h3
          id={`quiz-${lessonSlug}`}
          className="font-display font-black tracking-tight text-xl sm:text-2xl"
        >
          {t(UI.heading)}
        </h3>
        <p className="mt-4 font-mono text-3xl sm:text-4xl font-bold text-[#FFB800]">
          {t(UI.yourScore)} {score} {t(UI.outOf)} {questions.length}
        </p>
        <p className="mt-3 text-white/90 leading-relaxed">{t(verdict)}</p>
        <button
          type="button"
          onClick={retake}
          className="mt-6 inline-flex items-center gap-2 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold px-5 py-2.5 hover:bg-[#FFB800] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1AE5]"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          {t(UI.retake)}
        </button>
      </section>
    );
  }

  /* ------------------------------ question ----------------------------- */
  return (
    <section
      aria-labelledby={`quiz-${lessonSlug}`}
      className="mt-12 bg-white border-2 border-[#0A0A0A] shadow-hard p-6 sm:p-8"
    >
      <h3
        id={`quiz-${lessonSlug}`}
        className="font-display font-black tracking-tight text-xl sm:text-2xl text-[#0A0A0A]"
      >
        {t(UI.heading)}
      </h3>
      <p className="mt-2 text-sm text-[#2B2B2B]">{t(UI.intro)}</p>

      {/* progress through the question set */}
      <div className="mt-6 flex items-center gap-3">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C42B00]">
          {t(UI.questionCounter)} {step + 1} {t(UI.of)} {questions.length}
        </span>
        <div className="flex-1 h-2 bg-[#F2EFE4] border-2 border-[#0A0A0A]">
          <div
            className="h-full bg-[#FFB800]"
            style={{ width: `${((step + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="font-bold text-lg text-[#0A0A0A] leading-snug">
          {t(question.prompt)}
        </legend>

        <div className="mt-5 grid gap-3">
          {question.choices.map((choice, i) => {
            const isCorrect = i === question.correctIndex;
            const isChosen = selected === i;

            /* Before answering: plain outlined options. After: the correct
               answer is always marked green, and a wrong pick is marked red,
               each with an icon and text so color is never the only signal. */
            let style = "bg-white border-[#0A0A0A] hover:bg-[#F2EFE4]";
            if (revealed && isCorrect) {
              style = "bg-[#00A94F]/10 border-[#00A94F]";
            } else if (revealed && isChosen) {
              style = "bg-[#D50000]/10 border-[#D50000]";
            } else if (revealed) {
              style = "bg-white border-[#0A0A0A] opacity-55";
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                aria-pressed={isChosen}
                className={`w-full text-left border-2 px-4 py-3 flex items-start gap-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2 ${style} ${
                  revealed ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="font-mono text-xs font-bold text-[#2B2B2B] mt-1 shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-[#0A0A0A] leading-relaxed">{t(choice)}</span>
                {revealed && isCorrect && (
                  <span className="inline-flex items-center gap-1 shrink-0 text-[#00A94F] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    {t(UI.correct)}
                  </span>
                )}
                {revealed && isChosen && !isCorrect && (
                  <span className="inline-flex items-center gap-1 shrink-0 text-[#D50000] font-bold text-sm">
                    <AlertCircle className="w-5 h-5" aria-hidden="true" />
                    {t(UI.notQuite)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* explanation appears once an answer is locked in */}
      <div aria-live="polite">
        {revealed && (
          <div className="mt-5 border-l-4 border-[#1A1AE5] bg-[#1A1AE5]/5 p-4">
            <p className="text-[#0A0A0A] leading-relaxed">{t(question.explanation)}</p>
          </div>
        )}
      </div>

      {revealed && (
        <button
          type="button"
          onClick={advance}
          className="mt-6 inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#E5A600] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-hard-sm font-bold px-5 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1AE5] focus-visible:ring-offset-2"
        >
          {isLast ? t(UI.seeResults) : t(UI.nextQuestion)}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
