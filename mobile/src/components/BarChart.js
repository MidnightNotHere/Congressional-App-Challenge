import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, mono } from "../theme";

/* Lightweight bar chart (plain Views, no chart dependency). */
export default function BarChart({ data, height = 160 }) {
  const max = Math.max(...data.map((d) => d.amount), 1);
  return (
    <View>
      <View style={[styles.row, { height }]}>
        {data.map((d) => {
          const isCO = d.state === "Colorado";
          const barH = Math.max(2, (d.amount / max) * (height - 28));
          return (
            <View key={d.state} style={styles.col}>
              <Text style={styles.value}>{d.amount === 0 ? "$0" : `$${d.amount}M`}</Text>
              <View
                style={[
                  styles.bar,
                  { height: barH, backgroundColor: isCO ? colors.danger : colors.primary },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {data.map((d) => (
          <Text key={d.state} style={styles.label} numberOfLines={1}>
            {d.state}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end" },
  col: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  bar: { width: "60%", borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  value: { fontFamily: mono, fontSize: 11, color: colors.textPrimary, marginBottom: 4 },
  labels: { flexDirection: "row", marginTop: 6 },
  label: { flex: 1, textAlign: "center", fontSize: 11, color: colors.textSecondary },
});
