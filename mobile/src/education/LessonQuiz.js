/* =========================================================================
   Quantum4Colorado (mobile) — end-of-lesson knowledge check
   One question at a time, with the answer revealed immediately along with
   an explanation. Purely formative: the score is never recorded and a wrong
   answer never blocks lesson completion (see src/education/progress.js).

   Native port of src/education/LessonQuiz.jsx. Same interaction, same
   colors; only the markup differs.
   ========================================================================= */

import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "../components/Icon";
import { colors, fonts, space, shadow, withAlpha } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";

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

const LETTERS = ["A", "B", "C", "D"];

export default function LessonQuiz({ questions }) {
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
      <View style={[styles.resultCard, shadow(2)]}>
        <Text style={styles.resultHeading}>{t(UI.heading)}</Text>
        <Text style={styles.resultScore}>
          {t(UI.yourScore)} {score} {t(UI.outOf)} {questions.length}
        </Text>
        <Text style={styles.resultVerdict}>{t(verdict)}</Text>
        <Pressable
          onPress={retake}
          accessibilityRole="button"
          style={({ pressed }) => [styles.retakeBtn, pressed && { opacity: 0.85 }]}
        >
          <Icon name="RotateCcw" size={16} color={colors.textPrimary} />
          <Text style={styles.retakeText}>{t(UI.retake)}</Text>
        </Pressable>
      </View>
    );
  }

  /* ------------------------------ question ----------------------------- */
  const progressPct = ((step + (revealed ? 1 : 0)) / questions.length) * 100;

  return (
    <View style={[styles.card, shadow(2)]}>
      <Text style={styles.heading}>{t(UI.heading)}</Text>
      <Text style={styles.intro}>{t(UI.intro)}</Text>

      {/* progress through the question set */}
      <View style={styles.progressRow}>
        <Text style={styles.counter}>
          {t(UI.questionCounter)} {step + 1} {t(UI.of)} {questions.length}
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      <Text style={styles.prompt}>{t(question.prompt)}</Text>

      <View style={{ gap: 10, marginTop: space.lg }}>
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.correctIndex;
          const isChosen = selected === i;

          /* Before answering: plain outlined options. After: the correct
             answer is always marked green, and a wrong pick red — each with
             an icon and a word, so color is never the only signal. */
          let optionStyle = styles.option;
          if (revealed && isCorrect) optionStyle = styles.optionCorrect;
          else if (revealed && isChosen) optionStyle = styles.optionWrong;
          else if (revealed) optionStyle = styles.optionDimmed;

          return (
            <Pressable
              key={i}
              onPress={() => choose(i)}
              disabled={revealed}
              accessibilityRole="button"
              accessibilityState={{ selected: isChosen, disabled: revealed }}
              style={({ pressed }) => [
                optionStyle,
                pressed && !revealed && { backgroundColor: colors.bg },
              ]}
            >
              <Text style={styles.letter}>{LETTERS[i]}</Text>
              <Text style={styles.choiceText}>{t(choice)}</Text>
              {revealed && isCorrect && (
                <View style={styles.verdictTag}>
                  <Icon name="CheckCircle2" size={16} color={colors.secondary} />
                  <Text style={[styles.verdictText, { color: colors.secondary }]}>
                    {t(UI.correct)}
                  </Text>
                </View>
              )}
              {revealed && isChosen && !isCorrect && (
                <View style={styles.verdictTag}>
                  <Icon name="AlertCircle" size={16} color={colors.danger} />
                  <Text style={[styles.verdictText, { color: colors.danger }]}>
                    {t(UI.notQuite)}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* explanation appears once an answer is locked in */}
      {revealed && (
        <View style={styles.explanation} accessibilityLiveRegion="polite">
          <Text style={styles.explanationText}>{t(question.explanation)}</Text>
        </View>
      )}

      {revealed && (
        <Pressable
          onPress={advance}
          accessibilityRole="button"
          style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.nextText}>{isLast ? t(UI.seeResults) : t(UI.nextQuestion)}</Text>
          <Icon name="ArrowRight" size={16} color={colors.textPrimary} />
        </Pressable>
      )}
    </View>
  );
}

const optionBase = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 10,
  borderWidth: 2,
  paddingVertical: 12,
  paddingHorizontal: 12,
  backgroundColor: colors.surface,
  borderColor: colors.border,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
    marginTop: space.xxl,
  },
  heading: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  intro: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: space.lg },
  counter: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.accentDark,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  progressFill: { height: "100%", backgroundColor: colors.accent },
  prompt: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 23,
    marginTop: space.lg,
  },
  option: optionBase,
  optionCorrect: {
    ...optionBase,
    backgroundColor: colors.greenTint,
    borderColor: colors.secondary,
  },
  optionWrong: {
    ...optionBase,
    backgroundColor: colors.redTint,
    borderColor: colors.danger,
  },
  optionDimmed: { ...optionBase, opacity: 0.55 },
  letter: {
    fontFamily: fonts.monoBold,
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  choiceText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  verdictTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  verdictText: { fontFamily: fonts.bodyBold, fontSize: 11 },
  explanation: {
    marginTop: space.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: withAlpha(colors.primary, 0.07),
    padding: space.lg,
  },
  explanationText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 21,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginTop: space.lg,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.border,
  },
  nextText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: colors.textPrimary,
  },
  resultCard: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
    marginTop: space.xxl,
  },
  resultHeading: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: "#fff",
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  resultScore: {
    fontFamily: fonts.monoBold,
    fontSize: 26,
    color: colors.accent,
    marginTop: space.md,
  },
  resultVerdict: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    color: "#fff",
    lineHeight: 21,
    marginTop: space.md,
    opacity: 0.92,
  },
  retakeBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginTop: space.xl,
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: colors.border,
  },
  retakeText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: colors.textPrimary,
  },
});
