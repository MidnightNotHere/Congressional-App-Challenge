import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Share,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandBar, Eyebrow, H2, Body, Card, Button } from "../components/ui";
import Icon from "../components/Icon";
import ScoreRing from "../components/ScoreRing";
import { colors, mono, radius, space, withAlpha, shadow, fonts } from "../theme";
import { QUESTIONS, calculateResults, NIST_PQC, CISA_PQC, NSA_PQC, PRIORITY_LABELS } from "../data";
import { generateReport } from "../report";
import { useLanguage } from "../i18n/LanguageContext";

const PRIORITY_BG = {
  Immediate: colors.danger,
  "Within 6 Months": colors.accent,
  "Within 1 Year": colors.primary,
};

const UI = {
  eyebrow: { en: "READINESS ASSESSMENT", es: "EVALUACIÓN DE PREPARACIÓN" },
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
  profileHeading: { en: "Your Readiness Profile", es: "Su Perfil de Preparación" },
  retake: { en: "Retake", es: "Repetir" },
  riskFactorsHeading: { en: "Your specific risk factors", es: "Sus factores de riesgo específicos" },
  actionListHeading: { en: "Your priority action list", es: "Su lista de acciones prioritarias" },
  preparingReport: { en: "Preparing report…", es: "Preparando informe…" },
  downloadPdf: { en: "Download my report (PDF)", es: "Descargar mi informe (PDF)" },
  shareAssessment: { en: "Share this assessment", es: "Compartir esta evaluación" },
  learnMore: { en: "Learn more from the source", es: "Más información de la fuente" },
  shareMessage: {
    en: "Is your organization ready for the quantum era? Take the free Quantum4Colorado post-quantum cybersecurity readiness assessment.",
    es: "¿Está su organización lista para la era cuántica? Realice la evaluación gratuita de preparación en ciberseguridad poscuántica de Quantum4Colorado.",
  },
  reportError: { en: "Could not create report", es: "No se pudo crear el informe" },
};

export default function AssessmentScreen() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  const allAnswered = answers.q8 != null;
  const progress = Math.round(((step + (allAnswered ? 1 : 0)) / QUESTIONS.length) * 100);

  const answerSingle = (qid, value, index) => {
    setAnswers((p) => ({ ...p, [qid]: value }));
    if (index === step && step < QUESTIONS.length - 1) setStep(step + 1);
  };

  const toggleMulti = (qid, value) => {
    setAnswers((p) => {
      const cur = p[qid] || [];
      let next;
      if (value === "none" || value === "none-reg") {
        next = cur.includes(value) ? [] : [value];
      } else {
        next = cur.includes(value)
          ? cur.filter((v) => v !== value)
          : [...cur.filter((v) => v !== "none" && v !== "none-reg"), value];
      }
      return { ...p, [qid]: next };
    });
  };

  const generate = () => {
    setResults(calculateResults(answers));
    setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: true }), 60);
  };

  const restart = () => {
    setAnswers({});
    setResults(null);
    setStep(0);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const onDownload = async () => {
    try {
      setBusy(true);
      await generateReport(results, lang);
    } catch (e) {
      Alert.alert(t(UI.reportError), String(e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  const onShare = async () => {
    try {
      await Share.share({ message: t(UI.shareMessage) });
    } catch (e) {
      /* user dismissed */
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <BrandBar />
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: colors.bg }}
        contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow>{t(UI.eyebrow)}</Eyebrow>
        <H2>{t(UI.heading)}</H2>
        <Body style={{ marginTop: 10 }}>{t(UI.intro)}</Body>

        <View style={styles.explainBox}>
          <Text style={styles.explainText}>{t(UI.explainer)}</Text>
        </View>

        {!results ? (
          <>
            {/* progress */}
            <View style={{ marginTop: 24 }}>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>
                  {t(UI.question)} {Math.min(step + 1, QUESTIONS.length)} {t(UI.of)} {QUESTIONS.length}
                </Text>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>

            {/* questions */}
            <View style={{ gap: 16, marginTop: 20 }}>
              {QUESTIONS.slice(0, step + 1).map((q, index) => {
                const isMulti = q.type === "multi";
                const value = answers[q.id];
                return (
                  <View key={q.id} style={styles.qCard}>
                    <Text style={styles.qNum}>Q{index + 1}</Text>
                    <Text style={styles.qPrompt}>{t(q.prompt)}</Text>
                    <View style={{ gap: 8, marginTop: 12 }}>
                      {q.options.map((opt) => {
                        const selected = isMulti
                          ? (value || []).includes(opt.id)
                          : value === opt.id;
                        return (
                          <Pressable
                            key={opt.id}
                            onPress={() =>
                              isMulti
                                ? toggleMulti(q.id, opt.id)
                                : answerSingle(q.id, opt.id, index)
                            }
                            style={[styles.opt, selected && styles.optSelected]}
                          >
                            <View
                              style={[
                                styles.check,
                                { borderRadius: isMulti ? 6 : 999 },
                                selected && { backgroundColor: colors.primary, borderColor: colors.primary },
                              ]}
                            >
                              {selected && <Icon name="CheckCircle2" size={13} color="#fff" />}
                            </View>
                            <Text style={[styles.optText, selected && styles.optTextSelected]}>
                              {t(opt.label)}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>

                    {isMulti && index === step && step < QUESTIONS.length - 1 && (
                      <Button
                        label={t(UI.continue)}
                        iconRight="ArrowRight"
                        onPress={() => setStep(step + 1)}
                        style={{ marginTop: 14, alignSelf: "flex-start", paddingHorizontal: 24 }}
                      />
                    )}
                  </View>
                );
              })}

              {allAnswered && (
                <Button
                  label={t(UI.generate)}
                  variant="gold"
                  icon="ClipboardCheck"
                  onPress={generate}
                  style={{ marginTop: 4 }}
                />
              )}
            </View>
          </>
        ) : (
          <Results
            results={results}
            busy={busy}
            onDownload={onDownload}
            onShare={onShare}
            onRestart={restart}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Results({ results, busy, onDownload, onShare, onRestart }) {
  const { t } = useLanguage();
  const tier = results.tier;
  return (
    <View style={{ marginTop: 24 }}>
      <View style={styles.resultsHead}>
        <Text style={styles.resultsTitle}>{t(UI.profileHeading)}</Text>
        <Pressable onPress={onRestart} style={styles.retake}>
          <Icon name="RotateCcw" size={15} color={colors.textSecondary} />
          <Text style={styles.retakeText}>{t(UI.retake)}</Text>
        </Pressable>
      </View>

      {/* score */}
      <Card tint={tier.bg} style={{ marginTop: 14, alignItems: "center", borderColor: withAlpha(tier.color, 0.35) }}>
        <ScoreRing score={results.score} color={tier.color} />
        <View style={styles.tierRow}>
          <Icon name={tier.icon} size={18} color={tier.color} />
          <Text style={[styles.tierName, { color: tier.color }]}>{t(tier.name)}</Text>
        </View>
        <Text style={styles.interpret}>{t(results.interpretation)}</Text>
      </Card>

      {/* factors */}
      <Card style={{ marginTop: 14 }}>
        <Text style={styles.panelH}>{t(UI.riskFactorsHeading)}</Text>
        <View style={{ marginTop: 12, gap: 12 }}>
          {results.factors.map((f, i) => (
            <View key={i} style={styles.factorRow}>
              <Icon name="AlertCircle" size={16} color={tier.color} />
              <Text style={styles.factorText}>{t(f)}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* actions */}
      <Card style={{ marginTop: 14 }}>
        <Text style={styles.panelH}>{t(UI.actionListHeading)}</Text>
        <View style={{ marginTop: 14, gap: 18 }}>
          {results.priorityActions.map((a, i) => (
            <View key={i}>
              <View style={[styles.prioBadge, { backgroundColor: PRIORITY_BG[a.priority] || colors.primary }]}>
                <Text style={styles.prioText}>{t(PRIORITY_LABELS[a.priority]) || a.priority}</Text>
              </View>
              <Text style={styles.actionTitle}>{t(a.title)}</Text>
              <Text style={styles.actionDesc}>{t(a.description)}</Text>
              {a.resource && (
                <Pressable style={styles.resLink} onPress={() => Linking.openURL(a.resource.url)}>
                  <Text style={styles.resLinkText}>{t(a.resource.label)}</Text>
                  <Icon name="ExternalLink" size={12} color={colors.primary} />
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </Card>

      {/* buttons */}
      <View style={{ gap: 10, marginTop: 18 }}>
        <Button
          label={busy ? t(UI.preparingReport) : t(UI.downloadPdf)}
          icon="Download"
          onPress={busy ? undefined : onDownload}
        />
        <Button label={t(UI.shareAssessment)} variant="outline" icon="Share2" onPress={onShare} />
      </View>

      {/* resources */}
      <Card tint={colors.bg} style={{ marginTop: 18 }}>
        <Text style={styles.panelH}>{t(UI.learnMore)}</Text>
        <View style={{ marginTop: 12, gap: 8 }}>
          {[NIST_PQC, CISA_PQC, NSA_PQC].map((r) => (
            <Pressable key={r.url} style={styles.sourceRow} onPress={() => Linking.openURL(r.url)}>
              <Icon name="ExternalLink" size={16} color={colors.primary} />
              <Text style={styles.sourceText}>{t(r.label)}</Text>
            </Pressable>
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  explainBox: {
    marginTop: 16,
    backgroundColor: colors.blueTint,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderTopRightRadius: radius.md,
    borderBottomRightRadius: radius.md,
    padding: 16,
  },
  explainText: { fontSize: 14, color: colors.textPrimary, lineHeight: 21 },
  progressLabels: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  progressText: { fontFamily: mono, fontSize: 12, color: colors.textSecondary },
  progressTrack: { height: 8, borderRadius: 999, backgroundColor: colors.border, overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 999, backgroundColor: colors.primary },

  qCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
  },
  qNum: { fontFamily: mono, fontSize: 11, color: colors.accent, fontFamily: fonts.bodyBold },
  qPrompt: { fontSize: 16, fontFamily: fonts.bodyBlack, color: colors.textPrimary, marginTop: 4, lineHeight: 22 },
  opt: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 13,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optSelected: { borderColor: colors.primary, backgroundColor: withAlpha(colors.primary, 0.06) },
  check: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#CBD5E0",
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  optText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  optTextSelected: { color: colors.textPrimary, fontFamily: fonts.bodyBold },

  resultsHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resultsTitle: { fontSize: 22, fontFamily: fonts.bodyBlack, color: colors.textPrimary, letterSpacing: -0.5 },
  retake: { flexDirection: "row", alignItems: "center", gap: 5 },
  retakeText: { fontSize: 14, fontFamily: fonts.bodyBold, color: colors.textSecondary },
  tierRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 16 },
  tierName: { fontSize: 18, fontFamily: fonts.bodyBlack },
  interpret: { fontSize: 14, color: colors.textPrimary, lineHeight: 21, textAlign: "center", marginTop: 10 },
  panelH: { fontSize: 17, fontFamily: fonts.bodyBlack, color: colors.textPrimary },
  factorRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  factorText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  prioBadge: { alignSelf: "flex-start", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  prioText: { color: "#fff", fontFamily: mono, fontSize: 10, fontFamily: fonts.bodyBold, letterSpacing: 0.5, textTransform: "uppercase" },
  actionTitle: { fontSize: 15, fontFamily: fonts.bodyBlack, color: colors.textPrimary, marginTop: 6, lineHeight: 20 },
  actionDesc: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginTop: 4 },
  resLink: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 6 },
  resLinkText: { fontSize: 13, fontFamily: fonts.bodyBold, color: colors.primary },
  sourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
  },
  sourceText: { flex: 1, fontSize: 14, fontFamily: fonts.bodyBold, color: colors.textPrimary },
});
