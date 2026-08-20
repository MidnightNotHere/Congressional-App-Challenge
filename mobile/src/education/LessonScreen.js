/* =========================================================================
   Quantum4Colorado (mobile) — a single lesson
   Renders one lesson's prose and diagrams, its knowledge check, and the
   navigation on to the next one.

   Completion is an explicit button, never a consequence of the quiz: the
   course deliberately gates nothing, so a student who skips or fails the
   check can still mark the lesson read and move on.

   The parent (src/screens/YouthTab.js) keys this screen by slug, so moving
   between lessons remounts it and the scroll position resets to the top.
   ========================================================================= */

import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Screen, Eyebrow, Body } from "../components/ui";
import QuantumLine from "../components/QuantumLine";
import Icon from "../components/Icon";
import { colors, fonts, space, shadow } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";
import { getLessonBySlug, getAdjacentLessons, TOTAL_LESSONS } from "../data";
import { useCourseProgress } from "./progress";
import Diagram from "./diagrams";
import LessonQuiz from "./LessonQuiz";

/* Horizontal padding either side of the screen content. */
const GUTTER = 20;

const UI = {
  courseName: { en: "Learn Quantum", es: "Aprender Cuántica" },
  unit: { en: "Unit", es: "Unidad" },
  minRead: { en: "min read", es: "min de lectura" },
  lesson: { en: "Lesson", es: "Lección" },
  of: { en: "of", es: "de" },
  bigIdea: { en: "THE BIG IDEA", es: "LA IDEA CENTRAL" },
  markComplete: { en: "Mark complete & continue", es: "Completar y continuar" },
  markCompleteLast: { en: "Mark complete & finish", es: "Completar y terminar" },
  completed: { en: "Completed", es: "Completada" },
  markIncomplete: { en: "Mark as not done", es: "Marcar como no hecha" },
  next: { en: "Next", es: "Siguiente" },
  previous: { en: "Previous", es: "Anterior" },
  backToMap: { en: "Back to course map", es: "Volver al mapa del curso" },
  notFoundTitle: { en: "That lesson doesn't exist", es: "Esa lección no existe" },
  notFoundBody: {
    en: "It may have been renamed. The course map has everything.",
    es: "Puede que haya cambiado de nombre. El mapa del curso lo tiene todo.",
  },
};

export default function LessonScreen({ slug, onOpenLesson, onBackToHub }) {
  const { t } = useLanguage();
  const { isComplete, markComplete, markIncomplete, setLastVisited } = useCourseProgress();

  /* Read at render time rather than module load: Dimensions is 0 before
     first layout on some platforms, and this also tracks rotation. */
  const { width } = useWindowDimensions();
  const contentWidth = Math.max(0, width - GUTTER * 2);

  const lesson = getLessonBySlug(slug);

  /* Remember where the student was, so the hub can offer to resume.
     Guarded on `lesson` so a bad slug can't overwrite a good position. */
  useEffect(() => {
    if (lesson) setLastVisited(lesson.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  /* A slug can go stale if a lesson is renamed between app versions while
     a saved lastVisited still points at the old one. */
  if (!lesson) {
    return (
      <Screen>
        <View style={styles.section}>
          <View style={[styles.notFound, shadow(1)]}>
            <Icon name="AlertCircle" size={34} color={colors.danger} />
            <Text style={styles.notFoundTitle}>{t(UI.notFoundTitle)}</Text>
            <Body style={{ marginTop: 8 }}>{t(UI.notFoundBody)}</Body>
            <Pressable
              onPress={onBackToHub}
              accessibilityRole="button"
              style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.primaryBtnText}>{t(UI.backToMap)}</Text>
              <Icon name="ArrowRight" size={16} color={colors.textPrimary} />
            </Pressable>
          </View>
        </View>
      </Screen>
    );
  }

  const { prev, next } = getAdjacentLessons(lesson.slug);
  const complete = isComplete(lesson.slug);

  const completeAndContinue = () => {
    markComplete(lesson.slug);
    if (next) onOpenLesson(next.slug);
    else onBackToHub();
  };

  return (
    <Screen>
      <View style={styles.section}>
        {/* ---------------------------- breadcrumb ---------------------------- */}
        <Pressable onPress={onBackToHub} accessibilityRole="button" style={styles.backRow}>
          <Icon name="ArrowLeft" size={16} color={colors.primary} />
          <Text style={styles.backText}>{t(UI.courseName)}</Text>
        </Pressable>
        <Text style={styles.crumb}>
          {t(UI.unit)} {lesson.unitNumber} · {t(lesson.unitTitle)}
        </Text>

        <QuantumLine width={contentWidth} />

        {/* ------------------------------ header ------------------------------ */}
        <View style={{ marginTop: 16 }}>
          <Eyebrow>
            {t(UI.lesson)} {lesson.courseNumber} {t(UI.of)} {TOTAL_LESSONS}
          </Eyebrow>
          <Text style={styles.title}>{t(lesson.title)}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>
              {lesson.estimatedMinutes} {t(UI.minRead)}
            </Text>
            {complete && (
              <View style={styles.completeTag}>
                <Icon name="CheckCircle2" size={14} color={colors.secondary} />
                <Text style={styles.completeTagText}>{t(UI.completed)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ----------------------------- big idea ----------------------------- */}
        <View style={[styles.bigIdea, shadow(2)]}>
          <Text style={styles.bigIdeaLabel}>{t(UI.bigIdea)}</Text>
          <Text style={styles.bigIdeaText}>{t(lesson.bigIdea)}</Text>
        </View>

        {/* ----------------------------- sections ----------------------------- */}
        {lesson.sections.map((section, i) => (
          <View key={i} style={{ marginTop: i === 0 ? space.xxl : 30 }}>
            <Text style={styles.h3}>{t(section.heading)}</Text>
            <Text style={styles.prose}>{t(section.body)}</Text>
            {section.diagram && (
              <Diagram name={section.diagram} contentWidth={contentWidth} />
            )}
          </View>
        ))}

        {/* ------------------------------- quiz ------------------------------- */}
        <LessonQuiz questions={lesson.quiz} />

        {/* ---------------------------- completion ---------------------------- */}
        <View style={styles.completionBlock}>
          {complete ? (
            <View style={styles.completedRow}>
              <View style={styles.completeTag}>
                <Icon name="CheckCircle2" size={20} color={colors.secondary} />
                <Text style={styles.completedBig}>{t(UI.completed)}</Text>
              </View>
              <Pressable
                onPress={() => markIncomplete(lesson.slug)}
                accessibilityRole="button"
                style={styles.undoRow}
              >
                <Icon name="Circle" size={14} color={colors.textSecondary} />
                <Text style={styles.undoText}>{t(UI.markIncomplete)}</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={completeAndContinue}
              accessibilityRole="button"
              style={({ pressed }) => [styles.completeBtn, shadow(1), pressed && { opacity: 0.85 }]}
            >
              <Icon name="CheckCircle2" size={18} color="#fff" />
              <Text style={styles.completeBtnText}>
                {next ? t(UI.markComplete) : t(UI.markCompleteLast)}
              </Text>
            </Pressable>
          )}
        </View>

        {/* ---------------------------- prev / next ---------------------------- */}
        <View style={{ gap: 10, marginTop: space.xl }}>
          {prev && (
            <Pressable
              onPress={() => onOpenLesson(prev.slug)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.navCard, shadow(1), pressed && { opacity: 0.9 }]}
            >
              <View style={styles.navLabelRow}>
                <Icon name="ArrowLeft" size={13} color={colors.accentDark} />
                <Text style={styles.navLabel}>{t(UI.previous)}</Text>
              </View>
              <Text style={styles.navTitle}>{t(prev.title)}</Text>
            </Pressable>
          )}
          {next && (
            <Pressable
              onPress={() => onOpenLesson(next.slug)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.navCard, shadow(1), pressed && { opacity: 0.9 }]}
            >
              <View style={styles.navLabelRow}>
                <Text style={styles.navLabel}>{t(UI.next)}</Text>
                <Icon name="ArrowRight" size={13} color={colors.accentDark} />
              </View>
              <Text style={styles.navTitle}>{t(next.title)}</Text>
            </Pressable>
          )}
        </View>

        <Pressable onPress={onBackToHub} accessibilityRole="button" style={styles.backMapRow}>
          <Icon name="ArrowLeft" size={15} color={colors.primary} />
          <Text style={styles.backMapText}>{t(UI.backToMap)}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: GUTTER, paddingTop: 8 },

  backRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  backText: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.primary },
  crumb: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 14,
  },

  title: {
    fontFamily: fonts.displayBlack,
    fontSize: 27,
    color: colors.textPrimary,
    letterSpacing: -1,
    lineHeight: 34,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 },
  meta: { fontFamily: fonts.mono, fontSize: 11, color: colors.textSecondary },
  completeTag: { flexDirection: "row", alignItems: "center", gap: 5 },
  completeTagText: { fontFamily: fonts.monoBold, fontSize: 10, color: colors.secondary },

  bigIdea: {
    marginTop: space.xl,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
  },
  bigIdeaLabel: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.textPrimary,
  },
  bigIdeaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15.5,
    color: colors.textPrimary,
    lineHeight: 23,
    marginTop: 8,
  },

  h3: {
    fontFamily: fonts.display,
    fontSize: 19,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  prose: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    color: colors.textSecondary,
    lineHeight: 25,
    marginTop: 10,
  },

  completionBlock: {
    marginTop: space.xxl,
    borderTopWidth: 4,
    borderTopColor: colors.border,
    paddingTop: space.xl,
  },
  completeBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.border,
  },
  completeBtnText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: "#fff",
  },
  completedRow: { gap: 10 },
  completedBig: { fontFamily: fonts.bodyBlack, fontSize: 15, color: colors.secondary },
  undoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  undoText: { fontFamily: fonts.bodyBold, fontSize: 12.5, color: colors.textSecondary },

  navCard: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.lg,
  },
  navLabelRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  navLabel: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.accentDark,
  },
  navTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14.5,
    color: colors.textPrimary,
    lineHeight: 20,
    marginTop: 6,
  },

  backMapRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: space.xl },
  backMapText: { fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.primary },

  notFound: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
    marginTop: space.xxl,
  },
  notFoundTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 27,
    marginTop: 12,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginTop: space.xl,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.border,
  },
  primaryBtnText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: colors.textPrimary,
  },
});
