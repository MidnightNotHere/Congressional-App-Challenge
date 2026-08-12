import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "./Icon";
import { colors, fonts, mono, radius, space, shadow, withAlpha } from "../theme";
import { useLanguage, LANGUAGES } from "../i18n/LanguageContext";

/* Amber chip label above section headings (brutalist: solid fill + hard
   black border rather than bare colored text). */
export function Eyebrow({ children, style }) {
  return <Text style={[styles.eyebrow, style]}>{children}</Text>;
}

/* Large section heading. */
export function H2({ children, style }) {
  return <Text style={[styles.h2, style]}>{children}</Text>;
}

export function Body({ children, style }) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

/* White surface card. */
export function Card({ children, style, tint }) {
  return (
    <View style={[styles.card, tint && { backgroundColor: tint }, shadow(1), style]}>{children}</View>
  );
}

/* Small rounded badge. */
export function Pill({ label, bg = colors.primary, color = "#fff", style }) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }, style]}>
      <Text style={[styles.pillText, { color }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/* Bullet row with a colored dot. */
export function Bullet({ children, color = colors.accent }) {
  return (
    <View style={styles.bulletRow}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

/* Pressable button with optional leading/trailing icon. */
export function Button({ label, onPress, variant = "primary", icon, iconRight, style }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: v.bg, borderColor: v.border || v.bg },
        pressed && { opacity: 0.85 },
        style,
      ]}
      accessibilityRole="button"
    >
      {icon ? <Icon name={icon} size={18} color={v.fg} /> : null}
      <Text style={[styles.btnText, { color: v.fg }]}>{label}</Text>
      {iconRight ? <Icon name={iconRight} size={18} color={v.fg} /> : null}
    </Pressable>
  );
}

const VARIANTS = {
  primary: { bg: colors.primary, fg: "#fff" },
  gold: { bg: colors.accent, fg: colors.textPrimary },
  outline: { bg: colors.surface, fg: colors.textPrimary, border: colors.border },
  ghost: { bg: withAlpha("#FFFFFF", 0.12), fg: "#fff", border: withAlpha("#FFFFFF", 0.25) },
};

/* Branded top bar shown on every screen. */
export function BrandBar() {
  const { lang, setLang } = useLanguage();
  return (
    <View style={styles.brandBar}>
      <View style={styles.logoMark}>
        <Icon name="Atom" size={18} color={colors.accent} />
      </View>
      <Text style={[styles.brandText, { flex: 1 }]}>
        Quantum<Text style={{ color: colors.accent }}>4</Text>Colorado
      </Text>
      <View style={styles.langToggle}>
        {LANGUAGES.map((l) => {
          const active = lang === l.code;
          return (
            <Pressable
              key={l.code}
              onPress={() => setLang(l.code)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={[styles.langPill, active && styles.langPillActive]}
            >
              <Text style={[styles.langPillText, active && styles.langPillTextActive]}>
                {l.shortLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/* Screen wrapper: safe area + brand bar + scroll. */
export function Screen({ children, contentStyle }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <BrandBar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, contentStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  eyebrow: {
    alignSelf: "flex-start",
    fontFamily: fonts.monoBold,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: space.md,
    color: colors.textPrimary,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
  },
  h2: { fontSize: 25, fontFamily: fonts.display, color: colors.textPrimary, letterSpacing: -0.8, lineHeight: 32 },
  body: { fontSize: 15, fontFamily: fonts.body, color: colors.textSecondary, lineHeight: 23 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: space.xl,
  },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  pillText: { fontFamily: fonts.monoBold, fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase" },
  bulletRow: { flexDirection: "row", gap: 10, marginBottom: 12, alignItems: "flex-start" },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 8 },
  bulletText: { flex: 1, fontSize: 15, fontFamily: fonts.body, color: colors.textPrimary, lineHeight: 22 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    borderWidth: 2,
  },
  btnText: { fontSize: 14, fontFamily: fonts.bodyBlack, textTransform: "uppercase", letterSpacing: 0.3 },
  brandBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: space.xl,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { fontSize: 15, fontFamily: fonts.display, color: colors.primary, letterSpacing: -0.5 },
  langToggle: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 2,
  },
  langPill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: radius.pill },
  langPillActive: { backgroundColor: colors.primary },
  langPillText: { fontFamily: fonts.monoBold, fontSize: 10, color: colors.textSecondary },
  langPillTextActive: { color: "#fff" },
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 40 },
});
