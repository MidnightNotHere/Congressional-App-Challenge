import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Screen, Eyebrow, H2, Body } from "../components/ui";
import Icon from "../components/Icon";
import QuantumLine from "../components/QuantumLine";
import { colors, mono, radius, withAlpha, fonts } from "../theme";
import { SOURCES, LEGAL, LEGAL_UPDATED, CONTACT_EMAILS } from "../data";
import { useLanguage } from "../i18n/LanguageContext";

export default function AboutScreen() {
  const { t } = useLanguage();
  const [openDoc, setOpenDoc] = useState(null); // "terms" | "privacy" | null
  return (
    <Screen>
      <View style={styles.section}>
        <Eyebrow>ABOUT</Eyebrow>
        <H2>About Quantum4Colorado</H2>

        <Block title="What this is">
          Quantum4Colorado was built by Aarush Goradia, Arnav Rohilla, and Christian Lee for the
          2026 Congressional App Challenge. It is a nonpartisan civic information resource.
        </Block>

        <Block title="Why we built it">
          Colorado is one of the country's quantum hubs. NIST Boulder, JILA, and Quantinuum are all
          here, and most Coloradans have no idea. We built this app to change that, and to give the
          organizations and representatives who need to act on it a clear place to start.
        </Block>

        <Text style={styles.blockTitle}>Where This Data Comes From</Text>
        <Body style={{ marginTop: 6 }}>
          Every ecosystem entry, assessment recommendation, and policy claim in this app comes from
          one of these sources.
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
          Statistics come from public sources. Figures like federal investment and researcher
          counts are approximate and match the most recent public reporting. Nobody knows when
          quantum computers will break today's encryption, so this site treats preparation as
          sensible planning, not a prediction of a specific date.
        </Text>

        <Text style={styles.blockTitle}>Contact & feedback</Text>
        {CONTACT_EMAILS.map((addr) => (
          <Pressable
            key={addr}
            style={styles.mail}
            onPress={() => Linking.openURL(`mailto:${addr}`)}
          >
            <Icon name="Mail" size={16} color={colors.primary} />
            <Text style={styles.mailText}>{addr}</Text>
          </Pressable>
        ))}

        <Text style={styles.blockTitle}>{t({ en: "Terms & Privacy", es: "Términos y Privacidad" })}</Text>
        {["terms", "privacy"].map((key) => {
          const doc = LEGAL[key];
          const open = openDoc === key;
          return (
            <View key={key} style={styles.legalCard}>
              <Pressable
                onPress={() => setOpenDoc(open ? null : key)}
                style={styles.legalHead}
                accessibilityRole="button"
                accessibilityState={{ expanded: open }}
              >
                <Text style={styles.sourceOrg}>{t(doc.title)}</Text>
                <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} color={colors.primary} />
              </Pressable>
              {open && (
                <View style={styles.legalBody}>
                  <Text style={styles.disclaimer}>
                    {t({ en: "Last updated", es: "Última actualización" })}: {t(LEGAL_UPDATED)}
                  </Text>
                  <Body style={{ marginTop: 8 }}>{t(doc.intro)}</Body>
                  {doc.sections.map((s, i) => (
                    <View key={i} style={{ marginTop: 16 }}>
                      <Text style={styles.sourceOrg}>{t(s.heading)}</Text>
                      {s.paragraphs.map((p, j) => (
                        <Body key={j} style={{ marginTop: 6 }}>{t(p)}</Body>
                      ))}
                      {(s.bullets || []).map((b, j) => (
                        <Body key={`b${j}`} style={{ marginTop: 6 }}>• {t(b)}</Body>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

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
  legalCard: {
    marginTop: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  legalHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14 },
  legalBody: { paddingHorizontal: 14, paddingBottom: 16, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10 },
  mailText: { fontSize: 15, fontFamily: fonts.bodyBlack, color: colors.primary },
  foot: { fontSize: 12, color: colors.textSecondary, textAlign: "center", marginTop: 10, lineHeight: 18 },
});
