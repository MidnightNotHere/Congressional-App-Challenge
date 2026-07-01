import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen, Eyebrow, H2, Body, Card, Button, Bullet } from "../components/ui";
import QuantumLine from "../components/QuantumLine";
import Icon from "../components/Icon";
import { colors, mono, radius, space, withAlpha } from "../theme";
import { HERO_STATS, EXPLAINER_CARDS, ECOSYSTEM_TABS, STRENGTHS, GAPS } from "../data";

const W = Dimensions.get("window").width;

export default function StoryScreen({ navigation }) {
  const [tab, setTab] = useState("federal");
  const active = ECOSYSTEM_TABS.find((t) => t.id === tab) || ECOSYSTEM_TABS[0];

  return (
    <Screen>
      {/* ---------------- Hero ---------------- */}
      <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.hero}>
        <QuantumLine width={W - 40} />
        <Text style={styles.heroEyebrow}>A CIVIC RESOURCE FOR COLORADO · CO-06</Text>
        <Text style={styles.heroTitle}>Colorado is at the center of the quantum revolution.</Text>
        <Text style={styles.heroSub}>
          From NIST Boulder to JILA to the startups reshaping cryptography — here's what's happening
          in our state, and why it matters to every Coloradan.
        </Text>

        <View style={{ gap: 12, marginTop: 20 }}>
          {HERO_STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ gap: 10, marginTop: 20 }}>
          <Button
            label="Assess your organization"
            variant="gold"
            iconRight="ArrowRight"
            onPress={() => navigation.navigate("Assessment")}
          />
          <Button
            label="For representatives"
            variant="ghost"
            onPress={() => navigation.navigate("Reps")}
          />
        </View>
      </LinearGradient>

      {/* ---------------- Explainer ---------------- */}
      <View style={styles.section}>
        <Eyebrow>THE 60-SECOND EXPLANATION</Eyebrow>
        <H2>What is quantum computing — and why should you care?</H2>
        <View style={{ gap: 14, marginTop: 18 }}>
          {EXPLAINER_CARDS.map((c) => (
            <Card key={c.title}>
              <View style={styles.iconBadge}>
                <Icon name={c.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Body style={{ marginTop: 8 }}>{c.body}</Body>
            </Card>
          ))}
        </View>
      </View>

      {/* ---------------- Ecosystem ---------------- */}
      <View style={[styles.section, styles.sectionWhite]}>
        <Eyebrow>THE MAP</Eyebrow>
        <H2>Colorado's Quantum Infrastructure</H2>
        <Body style={{ marginTop: 8 }}>
          Every major quantum research program, federal facility, and quantum-adjacent organization
          operating in Colorado.
        </Body>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16, marginHorizontal: -20 }}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {ECOSYSTEM_TABS.map((t) => {
            const on = t.id === tab;
            return (
              <Pressable
                key={t.id}
                onPress={() => setTab(t.id)}
                style={[styles.tabPill, on ? { backgroundColor: colors.primary, borderColor: colors.primary } : null]}
              >
                <Icon name={t.icon} size={15} color={on ? "#fff" : colors.textSecondary} />
                <Text style={[styles.tabText, on && { color: "#fff" }]}>{t.label}</Text>
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
                  <Text style={styles.catBadgeText}>{active.label}</Text>
                </View>
              </View>
              <View style={styles.locRow}>
                <Icon name="MapPin" size={13} color={colors.accent} />
                <Text style={styles.locText}>{org.location}</Text>
              </View>
              <Body style={{ marginTop: 8 }}>{org.role}</Body>
              <View style={styles.sigRow}>
                <Icon name="TrendingUp" size={15} color={colors.secondary} />
                <Text style={styles.sigText}>
                  <Text style={{ fontWeight: "700", color: colors.textPrimary }}>
                    Significance:{" "}
                  </Text>
                  {org.significance}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* ---------------- National position ---------------- */}
      <View style={styles.section}>
        <Eyebrow>THE STAKES</Eyebrow>
        <H2>Why Colorado's Lead Matters — And Could Be Lost</H2>

        <Card tint={colors.greenTint} style={{ marginTop: 18, borderColor: withAlpha(colors.secondary, 0.35) }}>
          <View style={styles.panelHead}>
            <Icon name="CheckCircle2" size={18} color={colors.secondary} />
            <Text style={[styles.panelTitle, { color: colors.secondary }]}>Colorado's strengths</Text>
          </View>
          <View style={{ marginTop: 14 }}>
            {STRENGTHS.map((s) => (
              <Bullet key={s} color={colors.secondary}>{s}</Bullet>
            ))}
          </View>
        </Card>

        <Card tint={colors.goldTint} style={{ marginTop: 14, borderColor: withAlpha(colors.accent, 0.4) }}>
          <View style={styles.panelHead}>
            <Icon name="AlertTriangle" size={18} color={colors.accentDark} />
            <Text style={[styles.panelTitle, { color: colors.accentDark }]}>The investment gap</Text>
          </View>
          <View style={{ marginTop: 14 }}>
            {GAPS.map((g) => (
              <Bullet key={g} color={colors.accent}>{g}</Bullet>
            ))}
          </View>
        </Card>

        {/* CTAs */}
        <View style={styles.ctaWrap}>
          <Pressable style={styles.ctaRow} onPress={() => navigation.navigate("Assessment")}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>Is your organization ready?</Text>
              <Text style={styles.ctaSub}>Take the 3-minute readiness assessment</Text>
            </View>
            <Icon name="ArrowRight" size={20} color={colors.accent} />
          </Pressable>
          <View style={styles.ctaDivider} />
          <Pressable style={styles.ctaRow} onPress={() => navigation.navigate("Reps")}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ctaTitle}>For representatives</Text>
              <Text style={styles.ctaSub}>Ecosystem data & policy recommendations</Text>
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
    fontWeight: "700",
  },
  heroTitle: { color: "#fff", fontSize: 32, fontWeight: "900", letterSpacing: -0.8, lineHeight: 37, marginTop: 12 },
  heroSub: { color: withAlpha("#DCE7F5", 0.95), fontSize: 15, lineHeight: 23, marginTop: 14 },
  statCard: {
    backgroundColor: withAlpha("#FFFFFF", 0.1),
    borderWidth: 1,
    borderColor: withAlpha("#FFFFFF", 0.15),
    borderRadius: radius.lg,
    padding: 18,
  },
  statValue: { fontFamily: mono, color: colors.accent, fontSize: 34, fontWeight: "900" },
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
  cardTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary, marginTop: 14 },

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
  orgHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 },
  orgName: { flex: 1, fontSize: 16, fontWeight: "800", color: colors.textPrimary, lineHeight: 21 },
  catBadge: { borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 },
  catBadgeText: { color: "#fff", fontFamily: mono, fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: "700" },
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
  panelTitle: { fontSize: 17, fontWeight: "800" },

  ctaWrap: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: 8, marginTop: 20 },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14 },
  ctaTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  ctaSub: { color: withAlpha("#DCE7F5", 0.85), fontSize: 13, marginTop: 2 },
  ctaDivider: { height: 1, backgroundColor: withAlpha("#FFFFFF", 0.12), marginHorizontal: 14 },
});
