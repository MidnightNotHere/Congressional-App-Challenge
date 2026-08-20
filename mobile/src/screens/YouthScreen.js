import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Linking, useWindowDimensions } from "react-native";
import { Screen, Eyebrow, H2, Body, Card } from "../components/ui";
import QuantumLine from "../components/QuantumLine";
import Icon from "../components/Icon";
import { colors, mono, radius, space, withAlpha, fonts, shadow } from "../theme";
import { HERO_CARDS, CONCEPT_CARDS, RESOURCE_TABS, CAREER_TRACKS, QUIZ_QUESTIONS, computeQuizResult } from "../data";
import { useLanguage } from "../i18n/LanguageContext";

/* Horizontal padding either side of the screen content. */
const GUTTER = 20;

/* External resource hrefs are still "#" placeholders (see data.js TODOs) —
   openLink no-ops until real URLs are filled in, so nothing crashes today. */
function openLink(href) {
  if (href && href !== "#") Linking.openURL(href);
}

const UI = {
  eyebrow: { en: "YOUTH & EDUCATION", es: "JUVENTUD Y EDUCACIÓN" },
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
  learnThisProperly: { en: "Learn this properly", es: "Aprender esto a fondo" },
  courseCalloutLabel: {
    en: "WANT THE FULL VERSION?",
    es: "¿QUIERE LA VERSIÓN COMPLETA?",
  },
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
  question: { en: "Question", es: "Pregunta" },
  of: { en: "of", es: "de" },
  yourResult: { en: "YOUR RESULT", es: "SU RESULTADO" },
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
};

export default function YouthScreen({ onOpenCourse, onOpenLesson }) {
  const { t } = useLanguage();

  /* Read at render time rather than module load: Dimensions is 0 before
     first layout on some platforms, and this also tracks rotation. */
  const { width } = useWindowDimensions();
  const contentWidth = Math.max(0, width - GUTTER * 2);

  // Layer 1: entry-point hero (expand-in-place)
  const [expandedHero, setExpandedHero] = useState(null);

  // Layer 3: resource platform tabs + expandable career cards
  const [activeResourceTab, setActiveResourceTab] = useState("competitions");
  const [expandedCareer, setExpandedCareer] = useState(null);

  // Layer 4: "Find Your Quantum Path" quiz — self-contained state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  const activeTab = RESOURCE_TABS.find((rt) => rt.id === activeResourceTab) || RESOURCE_TABS[0];
  const quizAnsweredCount = quizAnswers.filter(Boolean).length;
  const quizResult = quizDone ? computeQuizResult(quizAnswers) : null;

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

  return (
    <Screen>
      <View style={styles.section}>
        <QuantumLine width={contentWidth} />
        <View style={{ marginTop: 18 }}>
          <Eyebrow>{t(UI.eyebrow)}</Eyebrow>
          <H2>{t(UI.heading)}</H2>
          <Body style={{ marginTop: 10 }}>{t(UI.intro)}</Body>
        </View>

        {/* ---------------- Layer 1: hero cards ---------------- */}
        <View style={{ gap: 12, marginTop: 24 }}>
          {HERO_CARDS.map((card, i) => {
            const open = expandedHero === i;
            return (
              <Pressable
                key={i}
                onPress={() => setExpandedHero(open ? null : i)}
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
                style={[styles.heroCard, open && styles.heroCardOpen]}
              >
                <View style={styles.iconBadge}>
                  <Icon name={card.icon} size={22} color={colors.primary} />
                </View>
                <Text style={styles.cardTitle}>{t(card.title)}</Text>
                <Body style={{ marginTop: 8 }}>{t(card.teaser)}</Body>
                <View style={styles.expandRow}>
                  <Text style={styles.expandText}>{open ? t(UI.showLess) : t(UI.tellMeMore)}</Text>
                  <Icon
                    name={open ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    color={colors.primary}
                  />
                </View>
                {open && (
                  <Text style={styles.heroExpanded}>{t(card.expanded)}</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* ---------------- Layer 2: concept cards ---------------- */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.h3}>{t(UI.conceptsHeading)}</Text>
          <Body style={{ marginTop: 6 }}>{t(UI.conceptsIntro)}</Body>
          <View style={{ gap: 12, marginTop: 16 }}>
            {CONCEPT_CARDS.map((c, i) => (
              <Card key={i}>
                <View style={[styles.iconBadge, { backgroundColor: withAlpha(colors.secondary, 0.1) }]}>
                  <Icon name={c.icon} size={22} color={colors.secondary} />
                </View>
                <Text style={styles.cardTitle}>{t(c.title)}</Text>
                <Body style={{ marginTop: 8 }}>{t(c.body)}</Body>
                {/* Opens the matching course lesson. The slug lives in its
                    own field rather than in the shared `href`, which stays
                    an external URL both platforms can open. */}
                <Pressable
                  onPress={() => onOpenLesson && onOpenLesson(c.lessonSlug)}
                  accessibilityRole="button"
                  style={styles.goDeeper}
                >
                  <Text style={styles.goDeeperText}>{t(UI.learnThisProperly)}</Text>
                  <Icon name="ArrowRight" size={14} color={colors.accentDark} />
                </Pressable>
              </Card>
            ))}
          </View>

          {/* Bridge into the full course — these four cards are the summary,
              the course is the long version. */}
          <View style={[styles.courseCallout, shadow(2)]}>
            <Text style={styles.courseCalloutLabel}>{t(UI.courseCalloutLabel)}</Text>
            <Text style={styles.courseCalloutHeading}>{t(UI.courseCalloutHeading)}</Text>
            <Text style={styles.courseCalloutBody}>{t(UI.courseCalloutBody)}</Text>
            <Pressable
              onPress={() => onOpenCourse && onOpenCourse()}
              accessibilityRole="button"
              style={({ pressed }) => [styles.courseCalloutBtn, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.courseCalloutBtnText}>{t(UI.courseCalloutCta)}</Text>
              <Icon name="ArrowRight" size={16} color={colors.textPrimary} />
            </Pressable>
          </View>
        </View>

        {/* ---------------- Layer 3: resource platform ---------------- */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.h3}>{t(UI.roadmapHeading)}</Text>
          <Body style={{ marginTop: 6 }}>{t(UI.roadmapIntro)}</Body>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 14, marginHorizontal: -20 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          >
            {RESOURCE_TABS.map((tab) => {
              const on = tab.id === activeResourceTab;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActiveResourceTab(tab.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: on }}
                  style={[styles.tabPill, on && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                >
                  <Icon name={tab.icon} size={15} color={on ? "#fff" : colors.textSecondary} />
                  <Text style={[styles.tabText, on && { color: "#fff" }]}>{t(tab.label)}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {activeResourceTab !== "careers" && (
            <View style={{ gap: 12, marginTop: 16 }}>
              {activeTab.items.map((item) => (
                <Pressable
                  key={item.name}
                  onPress={() => openLink(item.href)}
                  accessibilityRole="link"
                  style={styles.resourceCard}
                >
                  <View style={styles.resourceHead}>
                    <Text style={styles.resourceName}>{item.name}</Text>
                    <Icon name="ExternalLink" size={16} color={colors.primary} />
                  </View>
                  <Text style={styles.resourceDesc}>{t(item.description)}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {activeResourceTab === "careers" && (
            <View style={{ gap: 12, marginTop: 16 }}>
              {CAREER_TRACKS.map((track, i) => {
                const open = expandedCareer === i;
                return (
                  <View key={track.id} style={[styles.careerCard, open && styles.careerCardOpen]}>
                    <Pressable
                      onPress={() => setExpandedCareer(open ? null : i)}
                      accessibilityRole="button"
                      accessibilityState={{ expanded: open }}
                    >
                      <View style={styles.careerHead}>
                        <View style={styles.iconBadge}>
                          <Icon name={track.icon} size={20} color={colors.primary} />
                        </View>
                        <Icon
                          name={open ? "ChevronUp" : "ChevronDown"}
                          size={18}
                          color={colors.primary}
                        />
                      </View>
                      <Text style={styles.cardTitle}>{t(track.label)}</Text>
                      <Text style={styles.careerOneLiner}>{t(track.oneLiner)}</Text>
                    </Pressable>
                    {open && (
                      <View style={styles.careerBody}>
                        <Detail label={t(UI.whatTheyBuild)} value={t(track.whatTheyBuild)} />
                        <Detail label={t(UI.degreePath)} value={t(track.degreePath)} />
                        <Detail label={t(UI.coloradoEmployers)} value={t(track.coloradoEmployers)} />

                        {track.id === "crypto" && (
                          <Pressable
                            onPress={() => navigation.navigate("Assessment")}
                            accessibilityRole="button"
                            style={styles.crossLink}
                          >
                            <Text style={styles.crossLinkText}>{t(UI.crossLinkCrypto)}</Text>
                            <Icon name="ArrowRight" size={14} color={colors.primary} />
                          </Pressable>
                        )}
                        {track.id === "policy" && (
                          <Pressable
                            onPress={() => navigation.navigate("Reps")}
                            accessibilityRole="button"
                            style={styles.crossLink}
                          >
                            <Text style={styles.crossLinkText}>{t(UI.crossLinkPolicy)}</Text>
                            <Icon name="ArrowRight" size={14} color={colors.primary} />
                          </Pressable>
                        )}

                        <Text style={styles.nextStep}>
                          <Text style={{ fontFamily: fonts.bodyBlack }}>{t(UI.nextStepLabel)} </Text>
                          {t(track.nextStep)}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* ---------------- Layer 4: quiz ---------------- */}
        <View style={styles.quizBox}>
          <View style={styles.quizHead}>
            <View style={styles.quizIconBadge}>
              <Icon name="Compass" size={22} color={colors.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.quizTitle}>{t(UI.quizHeading)}</Text>
              <Text style={styles.quizSub}>{t(UI.quizSubheading)}</Text>
            </View>
          </View>

          {!quizDone && (
            <View style={{ marginTop: 22 }}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>
                  {t(UI.question)} {Math.min(quizStep + 1, QUIZ_QUESTIONS.length)} {t(UI.of)} {QUIZ_QUESTIONS.length}
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(quizAnsweredCount / QUIZ_QUESTIONS.length) * 100}%` },
                  ]}
                />
              </View>

              <Text style={styles.quizPrompt}>{t(QUIZ_QUESTIONS[quizStep].prompt)}</Text>
              <View style={{ gap: 8, marginTop: 12 }}>
                {QUIZ_QUESTIONS[quizStep].options.map((opt) => {
                  const selected = quizAnswers[quizStep] === opt.track;
                  return (
                    <Pressable
                      key={opt.track}
                      onPress={() => selectQuizAnswer(quizStep, opt.track)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      style={[styles.quizOpt, selected && styles.quizOptSelected]}
                    >
                      <Text style={[styles.quizOptText, selected && styles.quizOptTextSelected]}>
                        {t(opt.label)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {quizDone && quizResult && (
            <View style={{ marginTop: 22 }}>
              <Text style={styles.resultEyebrow}>{t(UI.yourResult)}</Text>
              <View style={styles.resultHeadRow}>
                <Icon name="Sparkles" size={22} color={colors.accent} />
                <Text style={styles.resultTitle}>{t(UI.builtFor)} {t(quizResult.label)}</Text>
              </View>
              <Text style={styles.resultBlurb}>{t(quizResult.resultBlurb)}</Text>

              <View style={{ gap: 10, marginTop: 16 }}>
                {quizResult.firstSteps.map((step, i) => (
                  <View key={i} style={styles.stepCard}>
                    <Text style={styles.stepLabel}>{t(UI.step)} {i + 1}</Text>
                    <Text style={styles.stepText}>{t(step)}</Text>
                  </View>
                ))}
              </View>

              {quizResult.id === "policy" && (
                <View style={styles.calloutBox}>
                  <Text style={styles.calloutText}>{t(UI.calloutPolicyText)}</Text>
                  <Pressable
                    onPress={() => navigation.navigate("Reps")}
                    accessibilityRole="button"
                    style={styles.calloutLink}
                  >
                    <Text style={styles.calloutLinkText}>{t(UI.calloutPolicyLink)}</Text>
                    <Icon name="ArrowRight" size={14} color={colors.accent} />
                  </Pressable>
                </View>
              )}
              {quizResult.id === "crypto" && (
                <View style={styles.calloutBox}>
                  <Text style={styles.calloutText}>{t(UI.calloutCryptoText)}</Text>
                  <Pressable
                    onPress={() => navigation.navigate("Assessment")}
                    accessibilityRole="button"
                    style={styles.calloutLink}
                  >
                    <Text style={styles.calloutLinkText}>{t(UI.calloutCryptoLink)}</Text>
                    <Icon name="ArrowRight" size={14} color={colors.accent} />
                  </Pressable>
                </View>
              )}

              <Pressable onPress={retakeQuiz} accessibilityRole="button" style={styles.retakeRow}>
                <Icon name="RotateCcw" size={16} color={withAlpha("#FFFFFF", 0.8)} />
                <Text style={styles.retakeText}>{t(UI.retakeQuiz)}</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: GUTTER, paddingVertical: 24 },
  h3: { fontSize: 19, fontFamily: fonts.bodyBlack, color: colors.textPrimary },

  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: withAlpha(colors.primary, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 16, fontFamily: fonts.bodyBlack, color: colors.textPrimary, marginTop: 12 },

  heroCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
  },
  heroCardOpen: { borderColor: colors.primary, backgroundColor: withAlpha(colors.primary, 0.04) },
  expandRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 },
  expandText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.primary },
  heroExpanded: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  goDeeper: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 12 },
  goDeeperText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.accentDark },

  courseCallout: {
    marginTop: space.lg,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
  },
  courseCalloutLabel: {
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.accent,
  },
  courseCalloutHeading: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: "#fff",
    letterSpacing: -0.5,
    lineHeight: 25,
    marginTop: space.md,
  },
  courseCalloutBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: "rgba(255,255,255,0.88)",
    lineHeight: 21,
    marginTop: 8,
  },
  courseCalloutBtn: {
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
  courseCalloutBtnText: {
    fontFamily: fonts.bodyBlack,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    color: colors.textPrimary,
  },

  tabPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tabText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.textSecondary },

  resourceCard: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 16,
  },
  resourceHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 },
  resourceName: { flex: 1, fontSize: 15, fontFamily: fonts.bodyBlack, color: colors.textPrimary, lineHeight: 20 },
  resourceDesc: { marginTop: 8, fontSize: 13, color: colors.textSecondary, lineHeight: 19 },

  careerCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
  },
  careerCardOpen: { borderColor: colors.primary },
  careerHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  careerOneLiner: { marginTop: 4, fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  careerBody: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border, gap: 10 },
  detail: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 12 },
  detailLabel: {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.accent,
    fontFamily: fonts.bodyBold,
  },
  detailValue: { fontSize: 13, color: colors.textPrimary, lineHeight: 19, marginTop: 4 },
  crossLink: { flexDirection: "row", alignItems: "center", gap: 5 },
  crossLinkText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.primary },
  nextStep: { fontSize: 13, color: colors.textPrimary, lineHeight: 20 },

  quizBox: {
    marginTop: 30,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 20,
  },
  quizHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  quizIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: withAlpha("#FFFFFF", 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  quizTitle: { color: "#fff", fontSize: 20, fontFamily: fonts.bodyBlack, letterSpacing: -0.4 },
  quizSub: { color: withAlpha("#DCE7F5", 0.8), fontSize: 12, marginTop: 2 },

  progressLabels: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressText: { fontFamily: mono, fontSize: 11, color: withAlpha("#DCE7F5", 0.8) },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: withAlpha("#FFFFFF", 0.15), overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 999, backgroundColor: colors.accent },

  quizPrompt: { color: "#fff", fontSize: 16, fontFamily: fonts.bodyBlack, marginTop: 18, lineHeight: 22 },
  quizOpt: {
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: withAlpha("#FFFFFF", 0.2),
    backgroundColor: withAlpha("#FFFFFF", 0.05),
  },
  quizOptSelected: { borderColor: colors.accent, backgroundColor: withAlpha("#FFFFFF", 0.1) },
  quizOptText: { fontSize: 14, color: withAlpha("#FFFFFF", 0.9), lineHeight: 20 },
  quizOptTextSelected: { fontFamily: fonts.bodyBlack, color: "#fff" },

  resultEyebrow: { fontFamily: mono, fontSize: 11, letterSpacing: 1.2, color: colors.accent, fontFamily: fonts.bodyBold },
  resultHeadRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  resultTitle: { flex: 1, color: "#fff", fontSize: 22, fontFamily: fonts.bodyBlack, letterSpacing: -0.4, lineHeight: 27 },
  resultBlurb: { marginTop: 12, color: withAlpha("#DCE7F5", 0.9), fontSize: 14, lineHeight: 21 },

  stepCard: {
    backgroundColor: withAlpha("#FFFFFF", 0.1),
    borderWidth: 1,
    borderColor: withAlpha("#FFFFFF", 0.15),
    borderRadius: radius.md,
    padding: 14,
  },
  stepLabel: { fontFamily: mono, fontSize: 11, color: colors.accent, fontFamily: fonts.bodyBold },
  stepText: { marginTop: 4, color: "#fff", fontSize: 13, lineHeight: 19 },

  calloutBox: {
    marginTop: 16,
    backgroundColor: withAlpha(colors.accent, 0.2),
    borderWidth: 1,
    borderColor: withAlpha(colors.accent, 0.5),
    borderRadius: radius.md,
    padding: 16,
  },
  calloutText: { color: "#fff", fontSize: 13, lineHeight: 19, marginBottom: 8 },
  calloutLink: { flexDirection: "row", alignItems: "center", gap: 5 },
  calloutLinkText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.accent },

  retakeRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 18 },
  retakeText: { fontSize: 13, fontFamily: fonts.bodyBold, color: withAlpha("#FFFFFF", 0.8) },
});
