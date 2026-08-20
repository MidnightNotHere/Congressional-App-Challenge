/* =========================================================================
   Quantum4Colorado (mobile) — course map
   The landing screen for the Learn Quantum course: a resume card for
   returning students, overall progress, and every unit with its lessons.
   Nothing is locked — a student can start anywhere.

   Reached from the Youth tab (see src/screens/YouthTab.js), which owns the
   hub/lesson navigation state.
   ========================================================================= */

import React from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions, Alert } from "react-native";
import { Screen, Eyebrow, H2, Body } from "../components/ui";
import QuantumLine from "../components/QuantumLine";
import Icon from "../components/Icon";
import { colors, fonts, space, shadow, withAlpha } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";
import { UNITS, TOTAL_LESSONS, TOTAL_MINUTES } from "../data";
import { useCourseProgress } from "./progress";

/* Horizontal padding either side of the screen content. */
const GUTTER = 20;

const UI = {
  eyebrow: { en: "LEARN QUANTUM", es: "APRENDER CUÁNTICA" },
  heading: {
    en: "Quantum computing, from zero",
    es: "Computación cuántica, desde cero",
  },
  intro: {
    en: "A free course for students with no physics background. Seven units, eighteen short lessons, plain language throughout. Start anywhere — nothing is locked, and your progress saves on this device.",
    es: "Un curso gratuito para estudiantes sin conocimientos de física. Siete unidades, dieciocho lecciones breves, lenguaje sencillo. Empiece donde quiera: nada está bloqueado y su progreso se guarda en este dispositivo.",
  },
  lessons: { en: "lessons", es: "lecciones" },
  units: { en: "units", es: "unidades" },
  minutes: { en: "min total", es: "min total" },
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
  back: { en: "Youth & Education", es: "Juventud y Educación" },
  reset: { en: "Reset progress", es: "Reiniciar progreso" },
  resetTitle: { en: "Reset progress?", es: "¿Reiniciar progreso?" },
  resetBody: {
    en: "This clears every lesson you've marked complete.",
    es: "Esto borra todas las lecciones que marcó como completadas.",
  },
  cancel: { en: "Cancel", es: "Cancelar" },
  confirmReset: { en: "Reset", es: "Reiniciar" },
};

export default function LearnHubScreen({ onOpenLesson, onBack }) {
  const { t } = useLanguage();

  /* Read at render time rather than module load: Dimensions is 0 before
     first layout on some platforms, and this also tracks rotation. */
  const { width } = useWindowDimensions();
  const contentWidth = Math.max(0, width - GUTTER * 2);

  const {
    isComplete,
    unitProgress,
    overallPercent,
    completedCount,
    nextLesson,
    hasStarted,
    resetProgress,
  } = useCourseProgress();

  const confirmReset = () => {
    Alert.alert(t(UI.resetTitle), t(UI.resetBody), [
      { text: t(UI.cancel), style: "cancel" },
      { text: t(UI.confirmReset), style: "destructive", onPress: resetProgress },
    ]);
  };

  return (
    <Screen>
      <View style={styles.section}>
        {/* back to the Youth tab */}
        <Pressable onPress={onBack} accessibilityRole="button" style={styles.backRow}>
          <Icon name="ArrowLeft" size={16} color={colors.primary} />
          <Text style={styles.backText}>{t(UI.back)}</Text>
        </Pressable>

        <QuantumLine width={contentWidth} />

        <View style={{ marginTop: 18 }}>
          <Eyebrow>{t(UI.eyebrow)}</Eyebrow>
          <H2>{t(UI.heading)}</H2>
          <Body style={{ marginTop: 10 }}>{t(UI.intro)}</Body>
        </View>

        {/* ------------------------- course stats ------------------------- */}
        <View style={styles.statRow}>
          {[
            { value: TOTAL_LESSONS, label: t(UI.lessons) },
            { value: UNITS.length, label: t(UI.units) },
            { value: TOTAL_MINUTES, label: t(UI.minutes) },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statChip, shadow(1)]}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* --------------------- resume / start banner --------------------- */}
        <View style={[styles.banner, shadow(2)]}>
          {nextLesson ? (
            <>
              <Text style={styles.bannerLabel}>
                {hasStarted ? t(UI.continueHeading) : t(UI.startCourse)}
              </Text>
              <Text style={styles.bannerTitle}>{t(nextLesson.title)}</Text>
              <Text style={styles.bannerMeta}>
                {t(UI.unit)} {nextLesson.unitNumber} · {nextLesson.estimatedMinutes} {t(UI.min)}
              </Text>
              <Pressable
                onPress={() => onOpenLesson(nextLesson.slug)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.bannerBtn, pressed && { opacity: 0.85 }]}
              >
                <Text style={styles.bannerBtnText}>
                  {hasStarted ? t(UI.continueCta) : t(UI.startCourse)}
                </Text>
                <Icon name="ArrowRight" size={16} color={colors.textPrimary} />
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.bannerLabel}>{t(UI.progressLabel)}</Text>
              <Text style={styles.bannerTitle}>{t(UI.courseComplete)}</Text>
            </>
          )}
        </View>

        {/* ------------------------ overall progress ----------------------- */}
        {hasStarted && (
          <View style={{ marginTop: space.xl }}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>{t(UI.progressLabel)}</Text>
              <Text style={styles.progressValue}>
                {completedCount}/{TOTAL_LESSONS} · {overallPercent}% {t(UI.complete)}
              </Text>
            </View>
            <View style={styles.overallTrack}>
              <View style={[styles.overallFill, { width: `${overallPercent}%` }]} />
            </View>
            <Pressable onPress={confirmReset} accessibilityRole="button" style={styles.resetRow}>
              <Icon name="RotateCcw" size={13} color={colors.textSecondary} />
              <Text style={styles.resetText}>{t(UI.reset)}</Text>
            </Pressable>
          </View>
        )}

        {/* ----------------------------- units ----------------------------- */}
        <View style={{ marginTop: space.xxl, gap: 34 }}>
          {UNITS.map((unit, unitIndex) => {
            const { done, total } = unitProgress(unit.id);
            const unitDone = total > 0 && done === total;

            return (
              <View key={unit.id}>
                {/* unit header */}
                <View style={styles.unitHeader}>
                  <View
                    style={[
                      styles.unitIcon,
                      { backgroundColor: unitDone ? colors.secondary : colors.accent },
                    ]}
                  >
                    <Icon
                      name={unit.icon}
                      size={24}
                      color={unitDone ? "#fff" : colors.textPrimary}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.unitEyebrow}>
                      {t(UI.unit)} {unitIndex + 1} · {done}/{total}
                    </Text>
                    <Text style={styles.unitTitle}>{t(unit.title)}</Text>
                  </View>
                </View>
                <Body style={{ marginTop: 10 }}>{t(unit.summary)}</Body>

                {/* per-unit progress */}
                <View style={styles.unitTrack}>
                  <View
                    style={[
                      styles.unitFill,
                      { width: total ? `${(done / total) * 100}%` : "0%" },
                    ]}
                  />
                </View>

                {/* lesson cards */}
                <View style={{ gap: 10, marginTop: space.lg }}>
                  {unit.lessons.map((lesson, lessonIndex) => {
                    const complete = isComplete(lesson.slug);
                    return (
                      <Pressable
                        key={lesson.slug}
                        onPress={() => onOpenLesson(lesson.slug)}
                        accessibilityRole="button"
                        style={({ pressed }) => [
                          styles.lessonCard,
                          shadow(1),
                          complete && { backgroundColor: colors.greenTint },
                          pressed && { opacity: 0.9 },
                        ]}
                      >
                        <View style={styles.lessonTopRow}>
                          <Text style={styles.lessonNumber}>
                            {unitIndex + 1}.{lessonIndex + 1}
                          </Text>
                          {complete ? (
                            <View style={styles.doneTag}>
                              <Icon name="CheckCircle2" size={14} color={colors.secondary} />
                              <Text style={styles.doneText}>{t(UI.done)}</Text>
                            </View>
                          ) : (
                            <Text style={styles.lessonMin}>
                              {lesson.estimatedMinutes} {t(UI.min)}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.lessonTitle}>{t(lesson.title)}</Text>
                        <Text style={styles.lessonIdea} numberOfLines={3}>
                          {t(lesson.bigIdea)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: GUTTER, paddingTop: 8 },
  backRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 12 },
  backText: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.primary },

  statRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: space.xl },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statValue: { fontFamily: fonts.monoBold, fontSize: 17, color: colors.primary },
  statLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.textSecondary,
  },

  banner: {
    marginTop: space.xl,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
  },
  bannerLabel: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.accent,
  },
  bannerTitle: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: "#fff",
    letterSpacing: -0.5,
    lineHeight: 26,
    marginTop: space.md,
  },
  bannerMeta: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },
  bannerBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginTop: space.lg,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.border,
  },
  bannerBtnText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: colors.textPrimary,
  },

  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  progressLabel: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.accentDark,
  },
  progressValue: { fontFamily: fonts.monoBold, fontSize: 11, color: colors.textPrimary },
  overallTrack: {
    height: 14,
    marginTop: 6,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  overallFill: { height: "100%", backgroundColor: colors.secondary },
  resetRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 },
  resetText: { fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.textSecondary },

  unitHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  unitIcon: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  unitEyebrow: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.accentDark,
  },
  unitTitle: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 26,
    marginTop: 3,
  },
  unitTrack: {
    height: 8,
    marginTop: space.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  unitFill: { height: "100%", backgroundColor: colors.secondary },

  lessonCard: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.lg,
  },
  lessonTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  lessonNumber: { fontFamily: fonts.monoBold, fontSize: 11, color: colors.textSecondary },
  lessonMin: {
    fontFamily: fonts.mono,
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.textSecondary,
  },
  doneTag: { flexDirection: "row", alignItems: "center", gap: 4 },
  doneText: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.secondary,
  },
  lessonTitle: {
    fontFamily: fonts.bodyBlack,
    fontSize: 15.5,
    color: colors.textPrimary,
    lineHeight: 21,
    marginTop: 8,
  },
  lessonIdea: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginTop: 6,
  },
});
