import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen, Eyebrow, H2, Body, Card, Button, Bullet } from "../components/ui";
import QuantumLine from "../components/QuantumLine";
import Icon from "../components/Icon";
import { colors, mono, radius, space, withAlpha, fonts } from "../theme";
import { HERO_STATS, EXPLAINER_CARDS, ECOSYSTEM_TABS, STRENGTHS, GAPS } from "../data";
import { useLanguage } from "../i18n/LanguageContext";

const W = Dimensions.get("window").width;

const UI = {
  heroEyebrow: { en: "A CIVIC RESOURCE FOR COLORADO · CO-06", es: "UN RECURSO CÍVICO PARA COLORADO · CO-06" },
  heroTitle: {
    en: "Colorado is at the center of the quantum revolution.",
    es: "Colorado está en el centro de la revolución cuántica.",
  },
  heroSub: {
    en: "From NIST Boulder to JILA to the startups reshaping cryptography, here is what is happening in our state and why it matters to every Coloradan.",
    es: "Desde NIST Boulder hasta JILA y las startups que están transformando la criptografía, esto es lo que sucede en nuestro estado y por qué le importa a cada habitante de Colorado.",
  },
  assessCta: { en: "Assess your organization", es: "Evalúe su organización" },
  forRepsCta: { en: "For representatives", es: "Para representantes" },
  explainerLabel: { en: "THE 60-SECOND EXPLANATION", es: "LA EXPLICACIÓN DE 60 SEGUNDOS" },
  explainerHeading: {
    en: "What is quantum computing, and why should you care?",
    es: "¿Qué es la computación cuántica y por qué debería importarle?",
  },
  mapLabel: { en: "THE MAP", es: "EL MAPA" },
  mapHeading: { en: "Colorado's Quantum Infrastructure", es: "La Infraestructura Cuántica de Colorado" },
  mapIntro: {
    en: "Every major quantum research program, federal facility, and quantum-adjacent organization operating in Colorado.",
    es: "Todos los programas principales de investigación cuántica, instalaciones federales y organizaciones relacionadas con la computación cuántica que operan en Colorado.",
  },
  significanceLabel: { en: "Significance:", es: "Importancia:" },
  stakesLabel: { en: "THE STAKES", es: "LO QUE ESTÁ EN JUEGO" },
  stakesHeading: {
    en: "Why Colorado's Lead Matters, And Could Be Lost",
    es: "Por Qué el Liderazgo de Colorado Importa y Podría Perderse",
  },
  strengthsHeading: { en: "Colorado's strengths", es: "Las fortalezas de Colorado" },
  gapHeading: { en: "The investment gap", es: "La brecha de inversión" },
  ctaAssessTitle: { en: "Is your organization ready?", es: "¿Está lista su organización?" },
  ctaAssessSub: { en: "Take the 3-minute readiness assessment", es: "Realice la evaluación de preparación de 3 minutos" },
  ctaRepsTitle: { en: "For representatives", es: "Para representantes" },
  ctaRepsSub: { en: "Ecosystem data & policy recommendations", es: "Datos del ecosistema y recomendaciones de políticas" },
};

export default function StoryScreen({ navigation }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("federal");
  const active = ECOSYSTEM_TABS.find((rt) => rt.id === tab) || ECOSYSTEM_TABS[0];

  return (
    <Screen>
      {/* ---------------- Hero ---------------- */}
      <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.hero}>
        <QuantumLine width={W - 40} />
        <Text style={styles.heroEyebrow}>{t(UI.heroEyebrow)}</Text>
        <Text style={styles.heroTitle}>{t(UI.heroTitle)}</Text>
        <Text style={styles.heroSub}>{t(UI.heroSub)}</Text>

        <View style={{ gap: 12, marginTop: 20 }}>
          {HERO_STATS.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{t(s.label)}</Text>
            </View>
          ))}
        </View>

        <View style={{ gap: 10, marginTop: 20 }}>
          <Button
            label={t(UI.assessCta)}
            variant="gold"
            iconRight="ArrowRight"
            onPress={() => navigation.navigate("Assessment")}
          />
          <Button
            label={t(UI.forRepsCta)}
            variant="ghost"
            onPress={() => navigation.navigate("Reps")}
          />
        </View>
      </LinearGradient>

      {/* ---------------- Explainer ---------------- */}
      <View style={styles.section}>
        <Eyebrow>{t(UI.explainerLabel)}</Eyebrow>
        <H2>{t(UI.explainerHeading)}</H2>
        <View style={{ gap: 14, marginTop: 18 }}>
          {EXPLAINER_CARDS.map((c, i) => (
            <Card key={i}>
              <View style={styles.iconBadge}>
                <Icon name={c.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>{t(c.title)}</Text>
              <Body style={{ marginTop: 8 }}>{t(c.body)}</Body>
            </Card>
          ))}
        </View>
      </View>

      {/* ---------------- Ecosystem ---------------- */}
      <View style={[styles.section, styles.sectionWhite]}>
        <Eyebrow>{t(UI.mapLabel)}</Eyebrow>
        <H2>{t(UI.mapHeading)}</H2>
        <Body style={{ marginTop: 8 }}>{t(UI.mapIntro)}</Body>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16, marginHorizontal: -20 }}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {ECOSYSTEM_TABS.map((et) => {
            const on = et.id === tab;
            return (
              <Pressable
                key={et.id}
                onPress={() => setTab(et.id)}
                style={[styles.tabPill, on ? { backgroundColor: colors.primary, borderColor: colors.primary } : null]}
              >
                <Icon name={et.icon} size={15} color={on ? "#fff" : colors.textSecondary} />
                <Text style={[styles.tabText, on && { color: "#fff" }]}>{t(et.label)}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ gap: 12, marginTop: 16 }}>
          {active.orgs.map((org) => (
            <Card key={org.name} tint={colors.bg}>
              <View style={styles.orgHead}>
                <Text style={styles.orgName}>{org.name}</Text>
                <View style={[styles.catBadge, { backgroundColor: active.color }]}>
                  <Text style={styles.catBadgeText}>{t(active.label)}</Text>
                </View>
              </View>
              <View style={styles.locRow}>
                <Icon name="MapPin" size={13} color={colors.accent} />
                <Text style={styles.locText}>{t(org.location)}</Text>
              </View>
              <Body style={{ marginTop: 8 }}>{t(org.role)}</Body>
              <View style={styles.sigRow}>
                <Icon name="TrendingUp" size={15} color={colors.secondary} />
                <Text style={styles.sigText}>
                  <Text style={{ fontFamily: fonts.bodyBold, color: colors.textPrimary }}>
                    {t(UI.significanceLabel)}{" "}
                  </Text>
                  {t(org.significance)}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* ---------------- National position ---------------- */}
      <View style={styles.section}>
        <Eyebrow>{t(UI.stakesLabel)}</Eyebrow>
        <H2>{t(UI.stakesHeading)}</H2>

        <Card tint={colors.greenTint} style={{ marginTop: 18, borderColor: withAlpha(colors.secondary, 0.35) }}>
          <View style={styles.panelHead}>
            <Icon name="CheckCircle2" size={18} color={colors.secondary} />
            <Text style={[styles.panelTitle, { color: colors.secondary }]}>{t(UI.strengthsHeading)}</Text>
          </View>
          <View style={{ marginTop: 14 }}>
            {STRENGTHS.map((s, i) => (
              <Bullet key={i} color={colors.secondary}>{t(s)}</Bullet>
            ))}
          </View>
        </Card>

        <Card tint={colors.goldTint} style={{ marginTop: 14, borderColor: withAlpha(colors.accent, 0.4) }}>
          <View style={styles.panelHead}>
            <Icon name="AlertTriangle" size={18} color={colors.accentDark} />
            <Text style={[styles.panelTitle, { color: colors.accentDark }]}>{t(UI.gapHeading)}</Text>
          </View>
          <View style={{ marginTop: 14 }}>
            {GAPS.map((g, i) => (
              <Bullet key={i} color={colors.accent}>{t(g)}</Bullet>
            ))}
          </View>
        </Card>

        {/* CTAs */}
        <View style={styles.ctaWrap}>
          <Pressable style={styles.ctaRow} onPress={() => navigation.navigate("Assessment")}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>{t(UI.ctaAssessTitle)}</Text>
              <Text style={styles.ctaSub}>{t(UI.ctaAssessSub)}</Text>
            </View>
            <Icon name="ArrowRight" size={20} color={colors.accent} />
          </Pressable>
          <View style={styles.ctaDivider} />
          <Pressable style={styles.ctaRow} onPress={() => navigation.navigate("Reps")}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>{t(UI.ctaRepsTitle)}</Text>
              <Text style={styles.ctaSub}>{t(UI.ctaRepsSub)}</Text>
            </View>
            <Icon name="ArrowRight" size={20} color={colors.accent} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  heroEyebrow: {
    fontFamily: mono,
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.3,
    marginTop: 14,
    fontFamily: fonts.bodyBold,
  },
  heroTitle: { color: "#fff", fontSize: 32, fontFamily: fonts.bodyBlack, letterSpacing: -0.8, lineHeight: 37, marginTop: 12 },
  heroSub: { color: withAlpha("#DCE7F5", 0.95), fontSize: 15, lineHeight: 23, marginTop: 14 },
  statCard: {
    backgroundColor: withAlpha("#FFFFFF", 0.1),
    borderWidth: 1,
    borderColor: withAlpha("#FFFFFF", 0.15),
    borderRadius: radius.lg,
    padding: 18,
  },
  statValue: { fontFamily: mono, color: colors.accent, fontSize: 34, fontFamily: fonts.bodyBlack },
  statLabel: { color: withAlpha("#FFFFFF", 0.9), fontSize: 13, marginTop: 6, lineHeight: 18 },

  section: { paddingHorizontal: 20, paddingVertical: 32 },
  sectionWhite: { backgroundColor: colors.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: withAlpha(colors.primary, 0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 17, fontFamily: fonts.bodyBlack, color: colors.textPrimary, marginTop: 14 },

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
  orgHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 },
  orgName: { flex: 1, fontSize: 16, fontFamily: fonts.bodyBlack, color: colors.textPrimary, lineHeight: 21 },
  catBadge: { borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 },
  catBadgeText: { color: "#fff", fontFamily: mono, fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase", fontFamily: fonts.bodyBold },
  locRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 6 },
  locText: { fontFamily: mono, fontSize: 12, color: colors.textSecondary },
  sigRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sigText: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 19 },

  panelHead: { flexDirection: "row", alignItems: "center", gap: 8 },
  panelTitle: { fontSize: 17, fontFamily: fonts.bodyBlack },

  ctaWrap: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: 8, marginTop: 20 },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  ctaTitle: { color: "#fff", fontSize: 16, fontFamily: fonts.bodyBlack },
  ctaSub: { color: withAlpha("#DCE7F5", 0.85), fontSize: 13, marginTop: 2 },
  ctaDivider: { height: 1, backgroundColor: withAlpha("#FFFFFF", 0.12), marginHorizontal: 14 },
});
