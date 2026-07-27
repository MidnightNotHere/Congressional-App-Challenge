import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "./Icon";
import { colors, mono, radius, space, shadow, withAlpha } from "../theme";

/* Gold uppercase eyebrow label above section headings. */
export function Eyebrow({ children, color = colors.accent }) {
  return <Text style={[styles.eyebrow, { color }]}>{children}</Text>;
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
  gold: { bg: colors.accent, fg: "#fff" },
  outline: { bg: colors.surface, fg: colors.textPrimary, border: colors.border },
  ghost: { bg: withAlpha("#FFFFFF", 0.12), fg: "#fff", border: withAlpha("#FFFFFF", 0.25) },
};

/* Branded top bar shown on every screen. */
export function BrandBar() {
  return (
    <View style={styles.brandBar}>
      <View style={styles.logoMark}>
        <Icon name="Atom" size={18} color={colors.accent} />
      </View>
      <Text style={styles.brandText}>
        Quantum<Text style={{ color: colors.accent }}>4</Text>Colorado
      </Text>
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
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: space.sm,
    fontWeight: "700",
  },
  h2: { fontSize: 26, fontWeight: "900", color: colors.textPrimary, letterSpacing: -0.5, lineHeight: 32 },
  body: { fontSize: 15, color: colors.textSecondary, lineHeight: 23 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.xl,
  },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  pillText: { fontFamily: mono, fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: "700" },
  bulletRow: { flexDirection: "row", gap: 10, marginBottom: 12, alignItems: "flex-start" },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 8 },
  bulletText: { flex: 1, fontSize: 15, color: colors.textPrimary, lineHeight: 22 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  btnText: { fontSize: 15, fontWeight: "700" },
  brandBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: space.xl,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: { fontSize: 17, fontWeight: "900", color: colors.primary, letterSpacing: -0.3 },
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingBottom: 40 },
});
