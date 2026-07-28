import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Linking, Dimensions } from "react-native";
import { Screen, Eyebrow, H2, Body, Card } from "../components/ui";
import QuantumLine from "../components/QuantumLine";
import Icon from "../components/Icon";
import { colors, mono, radius, space, withAlpha } from "../theme";
import { HERO_CARDS, CONCEPT_CARDS, RESOURCE_TABS, CAREER_TRACKS, QUIZ_QUESTIONS, computeQuizResult } from "../data";

const W = Dimensions.get("window").width;

/* External resource hrefs are still "#" placeholders (see data.js TODOs) —
   openLink no-ops until real URLs are filled in, so nothing crashes today. */
function openLink(href) {
  if (href && href !== "#") Linking.openURL(href);
}

export default function YouthScreen({ navigation }) {
  // Layer 1: entry-point hero (expand-in-place)
  const [expandedHero, setExpandedHero] = useState(null);

  // Layer 3: resource platform tabs + expandable career cards
  const [activeResourceTab, setActiveResourceTab] = useState("competitions");
  const [expandedCareer, setExpandedCareer] = useState(null);

  // Layer 4: "Find Your Quantum Path" quiz — self-contained state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  const activeTab = RESOURCE_TABS.find((t) => t.id === activeResourceTab) || RESOURCE_TABS[0];
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
        <QuantumLine width={W - 40} />
        <View style={{ marginTop: 18 }}>
          <Eyebrow>YOUTH & EDUCATION</Eyebrow>
          <H2>Quantum for Colorado Youth</H2>
          <Body style={{ marginTop: 10 }}>
            You don't need to know any physics to start here. This is what quantum computing
            actually means for you — your privacy, your future job, and Colorado's place in a race
            that's already underway.
          </Body>
        </View>

        {/* ---------------- Layer 1: hero cards ---------------- */}
        <View style={{ gap: 12, marginTop: 24 }}>
          {HERO_CARDS.map((card, i) => {
            const open = expandedHero === i;
            return (
              <Pressable
                key={card.title}
                onPress={() => setExpandedHero(open ? null : i)}
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
                style={[styles.heroCard, open && styles.heroCardOpen]}
              >
                <View style={styles.iconBadge}>
                  <Icon name={card.icon} size={22} color={colors.primary} />
                </View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Body style={{ marginTop: 8 }}>{card.teaser}</Body>
                <View style={styles.expandRow}>
                  <Text style={styles.expandText}>{open ? "Show less" : "Tell me more"}</Text>
                  <Icon
                    name={open ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    color={colors.primary}
                  />
                </View>
                {open && (
                  <Text style={styles.heroExpanded}>{card.expanded}</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* ---------------- Layer 2: concept cards ---------------- */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.h3}>Quantum Concepts You Can Actually Understand</Text>
          <Body style={{ marginTop: 6 }}>
            No math. No formulas. Just the ideas, explained with things you already know.
          </Body>
          <View style={{ gap: 12, marginTop: 16 }}>
            {CONCEPT_CARDS.map((c) => (
              <Card key={c.title}>
                <View style={[styles.iconBadge, { backgroundColor: withAlpha(colors.secondary, 0.1) }]}>
                  <Icon name={c.icon} size={22} color={colors.secondary} />
                </View>
                <Text style={styles.cardTitle}>{c.title}</Text>
                <Body style={{ marginTop: 8 }}>{c.body}</Body>
                <Pressable
                  onPress={() => openLink(c.href)}
                  accessibilityRole="link"
                  style={styles.goDeeper}
                >
                  <Text style={styles.goDeeperText}>Go deeper on {c.resourceLabel}</Text>
                  <Icon name="ArrowRight" size={14} color={colors.accentDark} />
                </Pressable>
              </Card>
            ))}
          </View>
        </View>

        {/* ---------------- Layer 3: resource platform ---------------- */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.h3}>Your Roadmap: Competitions, Programs, and Careers</Text>
          <Body style={{ marginTop: 6 }}>Real opportunities, organized by what you're looking for.</Body>

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
                  <Text style={[styles.tabText, on && { color: "#fff" }]}>{tab.label}</Text>
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
                  <Text style={styles.resourceDesc}>{item.description}</Text>
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
                      <Text style={styles.cardTitle}>{track.label}</Text>
                      <Text style={styles.careerOneLiner}>{track.oneLiner}</Text>
                    </Pressable>
                    {open && (
                      <View style={styles.careerBody}>
                        <Detail label="What they build" value={track.whatTheyBuild} />
                        <Detail label="Degree path" value={track.degreePath} />
                        <Detail label="Colorado employers" value={track.coloradoEmployers} />

                        {track.id === "crypto" && (
                          <Pressable
                            onPress={() => navigation.navigate("Assessment")}
                            accessibilityRole="button"
                            style={styles.crossLink}
                          >
                            <Text style={styles.crossLinkText}>See the PQC Readiness Tool in action</Text>
                            <Icon name="ArrowRight" size={14} color={colors.primary} />
                          </Pressable>
                        )}
                        {track.id === "policy" && (
                          <Pressable
                            onPress={() => navigation.navigate("Reps")}
                            accessibilityRole="button"
                            style={styles.crossLink}
                          >
                            <Text style={styles.crossLinkText}>See Colorado quantum policy in action</Text>
                            <Icon name="ArrowRight" size={14} color={colors.primary} />
                          </Pressable>
                        )}

                        <Text style={styles.nextStep}>
                          <Text style={{ fontWeight: "800" }}>Your Next Step From High School: </Text>
                          {track.nextStep}
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
              <Text style={styles.quizTitle}>Find Your Quantum Path</Text>
              <Text style={styles.quizSub}>Five quick questions. No wrong answers.</Text>
            </View>
          </View>

          {!quizDone && (
            <View style={{ marginTop: 22 }}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>
                  Question {Math.min(quizStep + 1, QUIZ_QUESTIONS.length)} of {QUIZ_QUESTIONS.length}
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

              <Text style={styles.quizPrompt}>{QUIZ_QUESTIONS[quizStep].prompt}</Text>
              <View style={{ gap: 8, marginTop: 12 }}>
                {QUIZ_QUESTIONS[quizStep].options.map((opt) => {
                  const selected = quizAnswers[quizStep] === opt.track;
                  return (
                    <Pressable
                      key={opt.label}
                      onPress={() => selectQuizAnswer(quizStep, opt.track)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      style={[styles.quizOpt, selected && styles.quizOptSelected]}
                    >
                      <Text style={[styles.quizOptText, selected && styles.quizOptTextSelected]}>
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {quizDone && quizResult && (
            <View style={{ marginTop: 22 }}>
              <Text style={styles.resultEyebrow}>YOUR RESULT</Text>
              <View style={styles.resultHeadRow}>
                <Icon name="Sparkles" size={22} color={colors.accent} />
                <Text style={styles.resultTitle}>You're built for {quizResult.label}</Text>
              </View>
              <Text style={styles.resultBlurb}>{quizResult.resultBlurb}</Text>

              <View style={{ gap: 10, marginTop: 16 }}>
                {quizResult.firstSteps.map((step, i) => (
                  <View key={i} style={styles.stepCard}>
                    <Text style={styles.stepLabel}>Step {i + 1}</Text>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>

              {quizResult.id === "policy" && (
                <View style={styles.calloutBox}>
                  <Text style={styles.calloutText}>
                    Quantum policy work looks a lot like the Representatives section of this very app.
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate("Reps")}
                    accessibilityRole="button"
                    style={styles.calloutLink}
                  >
                    <Text style={styles.calloutLinkText}>See what quantum policy work looks like in practice</Text>
                    <Icon name="ArrowRight" size={14} color={colors.accent} />
                  </Pressable>
                </View>
              )}
              {quizResult.id === "crypto" && (
                <View style={styles.calloutBox}>
                  <Text style={styles.calloutText}>Curious what this looks like in the real world?</Text>
                  <Pressable
                    onPress={() => navigation.navigate("Assessment")}
                    accessibilityRole="button"
                    style={styles.calloutLink}
                  >
                    <Text style={styles.calloutLinkText}>See how quantum cryptography protects real organizations</Text>
                    <Icon name="ArrowRight" size={14} color={colors.accent} />
                  </Pressable>
                </View>
              )}

              <Pressable onPress={retakeQuiz} accessibilityRole="button" style={styles.retakeRow}>
                <Icon name="RotateCcw" size={16} color={withAlpha("#FFFFFF", 0.8)} />
                <Text style={styles.retakeText}>Retake quiz</Text>
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
  section: { paddingHorizontal: 20, paddingVertical: 24 },
  h3: { fontSize: 19, fontWeight: "800", color: colors.textPrimary },

  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: withAlpha(colors.primary, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: colors.textPrimary, marginTop: 12 },

  heroCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
  },
  heroCardOpen: { borderColor: colors.primary, backgroundColor: withAlpha(colors.primary, 0.04) },
  expandRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 },
  expandText: { fontSize: 13, fontWeight: "700", color: colors.primary },
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
  goDeeperText: { fontSize: 13, fontWeight: "700", color: colors.accentDark },

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
  tabText: { fontSize: 13, fontWeight: "700", color: colors.textSecondary },

  resourceCard: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 16,
  },
  resourceHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 },
  resourceName: { flex: 1, fontSize: 15, fontWeight: "800", color: colors.textPrimary, lineHeight: 20 },
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
    fontWeight: "700",
  },
  detailValue: { fontSize: 13, color: colors.textPrimary, lineHeight: 19, marginTop: 4 },
  crossLink: { flexDirection: "row", alignItems: "center", gap: 5 },
  crossLinkText: { fontSize: 13, fontWeight: "700", color: colors.primary },
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
  quizTitle: { color: "#fff", fontSize: 20, fontWeight: "900", letterSpacing: -0.4 },
  quizSub: { color: withAlpha("#DCE7F5", 0.8), fontSize: 12, marginTop: 2 },

  progressLabels: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressText: { fontFamily: mono, fontSize: 11, color: withAlpha("#DCE7F5", 0.8) },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: withAlpha("#FFFFFF", 0.15), overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 999, backgroundColor: colors.accent },

  quizPrompt: { color: "#fff", fontSize: 16, fontWeight: "800", marginTop: 18, lineHeight: 22 },
  quizOpt: {
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: withAlpha("#FFFFFF", 0.2),
    backgroundColor: withAlpha("#FFFFFF", 0.05),
  },
  quizOptSelected: { borderColor: colors.accent, backgroundColor: withAlpha("#FFFFFF", 0.1) },
  quizOptText: { fontSize: 14, color: withAlpha("#FFFFFF", 0.9), lineHeight: 20 },
  quizOptTextSelected: { fontWeight: "800", color: "#fff" },

  resultEyebrow: { fontFamily: mono, fontSize: 11, letterSpacing: 1.2, color: colors.accent, fontWeight: "700" },
  resultHeadRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  resultTitle: { flex: 1, color: "#fff", fontSize: 22, fontWeight: "900", letterSpacing: -0.4, lineHeight: 27 },
  resultBlurb: { marginTop: 12, color: withAlpha("#DCE7F5", 0.9), fontSize: 14, lineHeight: 21 },

  stepCard: {
    backgroundColor: withAlpha("#FFFFFF", 0.1),
    borderWidth: 1,
    borderColor: withAlpha("#FFFFFF", 0.15),
    borderRadius: radius.md,
    padding: 14,
  },
  stepLabel: { fontFamily: mono, fontSize: 11, color: colors.accent, fontWeight: "700" },
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
  calloutLinkText: { fontSize: 13, fontWeight: "700", color: colors.accent },

  retakeRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 18 },
  retakeText: { fontSize: 13, fontWeight: "700", color: withAlpha("#FFFFFF", 0.8) },
});
