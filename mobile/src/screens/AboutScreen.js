import React from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Screen, Eyebrow, H2, Body, Card } from "../components/ui";
import Icon from "../components/Icon";
import QuantumLine from "../components/QuantumLine";
import { colors, mono, radius, withAlpha } from "../theme";
import { DATA_SOURCES } from "../data";

export default function AboutScreen() {
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
          Colorado sits at the center of the quantum computing revolution — NIST Boulder, JILA, and
          Quantinuum make this state uniquely positioned nationally. We built this app because most
          Coloradans don't know that, and because the organizations and representatives who need to
          act on it deserve a clear, accessible resource to start from.
        </Block>

        <Text style={styles.blockTitle}>Data sources</Text>
        <Card tint={colors.bg} style={{ marginTop: 10 }}>
          <View style={{ gap: 10 }}>
            {DATA_SOURCES.map((s) => (
              <View key={s} style={styles.srcRow}>
                <View style={styles.srcDot} />
                <Text style={styles.srcText}>{s}</Text>
              </View>
            ))}
          </View>
        </Card>
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
  blockTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary, marginTop: 24 },
  srcRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  srcDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.accent, marginTop: 7 },
  srcText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  disclaimer: { fontSize: 12, color: colors.textMuted, lineHeight: 18, marginTop: 12 },
  mail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  mailText: { fontSize: 15, fontWeight: "800", color: colors.primary },
  foot: { fontSize: 12, color: colors.textSecondary, textAlign: "center", marginTop: 10, lineHeight: 18 },
});
