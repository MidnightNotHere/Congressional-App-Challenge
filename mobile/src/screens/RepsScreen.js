import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Screen, Eyebrow, H2, Body, Card } from "../components/ui";
import Icon from "../components/Icon";
import BarChart from "../components/BarChart";
import { colors, mono, radius, withAlpha } from "../theme";
import {
  INVESTMENT_TABLE,
  INVESTMENT_CHART,
  DETAILED_ECOSYSTEM,
  RECOMMENDATIONS,
} from "../data";

function emailTemplate() {
  const subject = encodeURIComponent(
    "Colorado Quantum Economic Development — Resource for Your Office"
  );
  const body = encodeURIComponent(
    "I wanted to share a Colorado-specific quantum computing resource that may be relevant to your office's work on technology and economic development. Quantum4Colorado provides an overview of Colorado's quantum infrastructure, a constituent-facing readiness tool, and policy recommendations for state action."
  );
  Linking.openURL(`mailto:?subject=${subject}&body=${body}`);
}

export default function RepsScreen() {
  const [open, setOpen] = useState(0);

  return (
    <Screen>
      <View style={styles.section}>
        <Eyebrow>FOR REPRESENTATIVES & POLICYMAKERS</Eyebrow>
        <H2>Colorado Quantum Policy Hub</H2>
        <Body style={{ marginTop: 10 }}>
          Data, analysis, and resources for Colorado state legislators, congressional staff, and
          economic development officials.
        </Body>

        {/* A — Investment gap */}
        <Text style={styles.h3}>The Case for a Colorado Quantum Initiative</Text>
        <View style={{ gap: 8, marginTop: 12 }}>
          {INVESTMENT_TABLE.map((r) => (
            <View key={r.state} style={[styles.tableRow, r.highlight && styles.tableRowHi]}>
              <View style={styles.tableTop}>
                <Text style={styles.tableState}>{r.state}</Text>
                <Text style={styles.tableYear}>{r.year}</Text>
              </View>
              <Text style={styles.tableInit}>{r.initiative}</Text>
              <Text style={styles.tableInvest}>{r.investment}</Text>
            </View>
          ))}
        </View>

        {/* chart */}
        <Card style={{ marginTop: 16 }}>
          <Text style={styles.chartTitle}>State quantum investment commitments</Text>
          <Text style={styles.chartSub}>Reported state funding, in $ millions</Text>
          <View style={{ marginTop: 12 }}>
            <BarChart data={INVESTMENT_CHART} />
          </View>
          <Text style={styles.chartNote}>
            Figures reflect publicly reported state commitments. Colorado has no coordinated state
            quantum investment despite hosting federal and university infrastructure other states are
            spending hundreds of millions to approximate.
          </Text>
        </Card>

        {/* callout */}
        <View style={styles.callout}>
          <Text style={styles.calloutText}>
            Colorado has the federal infrastructure — NIST Boulder, JILA — that other states are
            spending hundreds of millions to approximate. A state Quantum Economic Development
            Initiative could leverage this existing advantage into jobs, company formation, and
            national leadership. Illinois and New York are already moving.
          </Text>
        </View>

        {/* B — Detailed ecosystem accordion */}
        <Text style={styles.h3}>Detailed Ecosystem Report</Text>
        <View style={styles.accordion}>
          {DETAILED_ECOSYSTEM.map((inst, i) => {
            const isOpen = open === i;
            return (
              <View key={inst.name} style={i > 0 && styles.accDivider}>
                <Pressable style={styles.accHead} onPress={() => setOpen(isOpen ? -1 : i)}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.accName}>{inst.name}</Text>
                    <Text style={styles.accLoc}>{inst.location}</Text>
                  </View>
                  <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={20} color={colors.primary} />
                </Pressable>
                {isOpen && (
                  <View style={styles.accBody}>
                    <Detail label="Research focus" value={inst.focus} />
                    <Detail label="Funding" value={inst.funding} />
                    <Detail label="Employment" value={inst.employment} />
                    <Detail label="Connection to Colorado" value={inst.connection} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* C — Recommendations */}
        <Text style={styles.h3}>Recommended State Actions</Text>
        <View style={{ gap: 12, marginTop: 12 }}>
          {RECOMMENDATIONS.map((rec, i) => (
            <Card key={rec.title}>
              <View style={styles.recHead}>
                <View style={styles.recNum}>
                  <Text style={styles.recNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.recTitle}>{rec.title}</Text>
              </View>
              <Body style={{ marginTop: 12 }}>{rec.rationale}</Body>
              <View style={{ marginTop: 12, gap: 6 }}>
                <Text style={styles.metaLine}>
                  <Text style={[styles.metaKey, { color: colors.primary }]}>Precedent: </Text>
                  {rec.precedent}
                </Text>
                <Text style={styles.metaLine}>
                  <Text style={[styles.metaKey, { color: colors.secondary }]}>Impact: </Text>
                  {rec.impact}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        {/* D — Take action */}
        <Text style={styles.h3}>Take Action</Text>
        <View style={{ gap: 12, marginTop: 12 }}>
          <ContactCard
            icon="Landmark"
            iconColor={colors.primary}
            title="Contact Rep. Jason Crow's office"
            sub="crow.house.gov"
            onPress={() => Linking.openURL("https://crow.house.gov")}
          />
          <ContactCard
            icon="Users"
            iconColor={colors.secondary}
            title="Contact the Colorado Quantum Network"
            sub="coloradoquantum.org"
            onPress={() => Linking.openURL("https://coloradoquantum.org")}
          />
          <ContactCard
            icon="Mail"
            iconColor={colors.accentDark}
            title="Share this resource with your representative"
            sub="Opens a pre-filled email template"
            tint={colors.goldTint}
            onPress={emailTemplate}
          />
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

function ContactCard({ icon, iconColor, title, sub, onPress, tint }) {
  return (
    <Pressable onPress={onPress}>
      <Card tint={tint}>
        <Icon name={icon} size={24} color={iconColor} />
        <Text style={styles.contactTitle}>{title}</Text>
        <View style={styles.contactSubRow}>
          <Text style={styles.contactSub}>{sub}</Text>
          <Icon name="ArrowRight" size={14} color={colors.primary} />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingVertical: 28 },
  h3: { fontSize: 19, fontWeight: "800", color: colors.textPrimary, marginTop: 30 },
  tableRow: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
  },
  tableRowHi: { backgroundColor: colors.goldTint, borderColor: withAlpha(colors.accent, 0.4) },
  tableTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tableState: { fontSize: 15, fontWeight: "800", color: colors.textPrimary },
  tableYear: { fontFamily: mono, fontSize: 12, color: colors.textSecondary },
  tableInit: { fontSize: 13, color: colors.textSecondary, marginTop: 3 },
  tableInvest: { fontFamily: mono, fontSize: 13, color: colors.textPrimary, marginTop: 3 },

  chartTitle: { fontSize: 15, fontWeight: "800", color: colors.textPrimary },
  chartSub: { fontFamily: mono, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  chartNote: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginTop: 12 },

  callout: { backgroundColor: colors.accent, borderRadius: radius.lg, padding: 20, marginTop: 16 },
  calloutText: { color: "#fff", fontSize: 15, lineHeight: 23 },

  accordion: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginTop: 12,
    overflow: "hidden",
  },
  accDivider: { borderTopWidth: 1, borderTopColor: colors.border },
  accHead: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16 },
  accName: { fontSize: 15, fontWeight: "800", color: colors.textPrimary },
  accLoc: { fontFamily: mono, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  accBody: { paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  detail: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 12 },
  detailLabel: {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.accent,
    fontWeight: "700",
  },
  detailValue: { fontSize: 14, color: colors.textPrimary, lineHeight: 20, marginTop: 4 },

  recHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  recNum: { width: 34, height: 34, borderRadius: 9, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  recNumText: { fontFamily: mono, color: "#fff", fontWeight: "800", fontSize: 15 },
  recTitle: { flex: 1, fontSize: 15, fontWeight: "800", color: colors.textPrimary, lineHeight: 20 },
  metaLine: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  metaKey: { fontWeight: "800" },

  contactTitle: { fontSize: 15, fontWeight: "800", color: colors.textPrimary, marginTop: 12 },
  contactSubRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  contactSub: { fontSize: 13, fontWeight: "700", color: colors.primary },
});
