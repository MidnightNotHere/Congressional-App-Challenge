import React from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Screen, Eyebrow, H2, Body } from "../components/ui";
import Icon from "../components/Icon";
import QuantumLine from "../components/QuantumLine";
import { colors, mono, radius, withAlpha, fonts } from "../theme";
import { SOURCES } from "../data";
import { useLanguage } from "../i18n/LanguageContext";

export default function AboutScreen() {
  const { t } = useLanguage();
  return (
    <Screen>
      <View style={styles.section}>
        <Eyebrow>ABOUT</Eyebrow>
        <H2>About Quantum4Colorado</H2>

        <Block title="What this is">
          Quantum4Colorado was built by a team of Colorado high school students for the 2026
          Congressional App Challenge. It is a nonpartisan civic information resource.
        </Block>

        <Block title="Why we built it">
          Colorado sits at the center of the quantum computing revolution. NIST Boulder, JILA, and
          Quantinuum put this state in a position no other one holds. We built this app because most
          Coloradans have no idea, and because the organizations and representatives who need to act
          on it deserve a clear place to start.
        </Block>

        <Text style={styles.blockTitle}>Where This Data Comes From</Text>
        <Body style={{ marginTop: 6 }}>
          Every ecosystem entry, assessment recommendation, and policy claim in this app traces
          back to one of these sources.
        </Body>
        <View style={styles.sourceList}>
          {SOURCES.map((s, i) => {
            const row = (
              <>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sourceOrg}>{t(s.organization)}</Text>
                  <Text style={styles.sourceSupports}>{t(s.supports)}</Text>
                </View>
                {s.url && <Icon name="ExternalLink" size={16} color={colors.primary} />}
              </>
            );
            return s.url ? (
              <Pressable
                key={i}
                onPress={() => Linking.openURL(s.url)}
                style={[styles.sourceRow, i > 0 && styles.sourceDivider]}
              >
                {row}
              </Pressable>
            ) : (
              <View key={i} style={[styles.sourceRow, i > 0 && styles.sourceDivider]}>
                {row}
              </View>
            );
          })}
        </View>
        <Text style={styles.disclaimer}>
          Statistics are drawn from public sources and are approximate, reflecting the most recent
          publicly available reporting. Quantum-threat timelines are inherently uncertain; this
          resource frames preparation as prudent, not as a prediction of a specific date.
        </Text>

        <Text style={styles.blockTitle}>Contact & feedback</Text>
        <Pressable
          style={styles.mail}
          onPress={() => Linking.openURL("mailto:team@quantum4colorado.org")}
        >
          <Icon name="Mail" size={16} color={colors.primary} />
          <Text style={styles.mailText}>team@quantum4colorado.org</Text>
        </Pressable>

        <View style={{ alignItems: "center", marginTop: 32, opacity: 0.7 }}>
          <QuantumLine width={220} />
          <Text style={styles.foot}>
            A nonpartisan civic resource · 2026 Congressional App Challenge · CO-06
          </Text>
        </View>
      </View>
    </Screen>
  );
}

function Block({ title, children }) {
  return (
    <View style={{ marginTop: 22 }}>
      <Text style={styles.blockTitle}>{title}</Text>
      <Body style={{ marginTop: 8 }}>{children}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, paddingVertical: 28 },
  blockTitle: { fontSize: 17, fontFamily: fonts.bodyBlack, color: colors.textPrimary, marginTop: 24 },
  sourceList: {
    marginTop: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  sourceRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, padding: 14 },
  sourceDivider: { borderTopWidth: 1, borderTopColor: colors.border },
  sourceOrg: { fontSize: 14, fontFamily: fonts.bodyBold, color: colors.textPrimary },
  sourceSupports: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginTop: 3 },
  disclaimer: { fontSize: 12, color: colors.textMuted, lineHeight: 18, marginTop: 12 },
  mail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  mailText: { fontSize: 15, fontFamily: fonts.bodyBlack, color: colors.primary },
  foot: { fontSize: 12, color: colors.textSecondary, textAlign: "center", marginTop: 10, lineHeight: 18 },
});
