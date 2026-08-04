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
import { useLanguage } from "../i18n/LanguageContext";

const UI = {
  eyebrow: { en: "FOR REPRESENTATIVES & POLICYMAKERS", es: "PARA REPRESENTANTES Y RESPONSABLES DE POLÍTICAS" },
  heading: { en: "Colorado Quantum Policy Hub", es: "Centro de Política Cuántica de Colorado" },
  intro: {
    en: "Data, analysis, and resources for Colorado state legislators, congressional staff, and economic development officials.",
    es: "Datos, análisis y recursos para legisladores estatales de Colorado, personal del Congreso y funcionarios de desarrollo económico.",
  },
  caseHeading: { en: "The Case for a Colorado Quantum Initiative", es: "El Argumento para una Iniciativa Cuántica de Colorado" },
  chartTitle: { en: "State quantum investment commitments", es: "Compromisos estatales de inversión cuántica" },
  chartSub: { en: "Reported state funding, in $ millions", es: "Financiamiento estatal reportado, en millones de $" },
  chartNote: {
    en: "Figures reflect publicly reported state commitments. Colorado has no coordinated state quantum investment despite hosting federal and university infrastructure other states are spending hundreds of millions to approximate.",
    es: "Las cifras reflejan compromisos estatales reportados públicamente. Colorado no tiene inversión cuántica estatal coordinada a pesar de albergar infraestructura federal y universitaria que otros estados gastan cientos de millones en intentar igualar.",
  },
  calloutText: {
    en: "Colorado has the federal infrastructure — NIST Boulder, JILA — that other states are spending hundreds of millions to approximate. A state Quantum Economic Development Initiative could leverage this existing advantage into jobs, company formation, and national leadership. Illinois and New York are already moving.",
    es: "Colorado cuenta con la infraestructura federal — NIST Boulder, JILA — que otros estados gastan cientos de millones en intentar igualar. Una Iniciativa Estatal de Desarrollo Económico Cuántico podría aprovechar esta ventaja existente para generar empleos, formación de empresas y liderazgo nacional. Illinois y Nueva York ya están avanzando.",
  },
  detailHeading: { en: "Detailed Ecosystem Report", es: "Informe Detallado del Ecosistema" },
  researchFocus: { en: "Research focus", es: "Enfoque de investigación" },
  funding: { en: "Funding", es: "Financiamiento" },
  employment: { en: "Employment", es: "Empleo" },
  connection: { en: "Connection to Colorado", es: "Conexión con Colorado" },
  recommendationsHeading: { en: "Recommended State Actions", es: "Acciones Estatales Recomendadas" },
  precedentLabel: { en: "Precedent: ", es: "Precedente: " },
  impactLabel: { en: "Impact: ", es: "Impacto: " },
  takeActionHeading: { en: "Take Action", es: "Tome Acción" },
  contactCrowTitle: { en: "Contact Rep. Jason Crow's office", es: "Contacte a la oficina del Rep. Jason Crow" },
  contactCQNTitle: { en: "Contact the Colorado Quantum Network", es: "Contacte a la Red Cuántica de Colorado" },
  shareRepTitle: { en: "Share this resource with your representative", es: "Comparta este recurso con su representante" },
  shareRepSub: { en: "Opens a pre-filled email template", es: "Abre una plantilla de correo electrónico prellenada" },
};

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
  const { t } = useLanguage();

  return (
    <Screen>
      <View style={styles.section}>
        <Eyebrow>{t(UI.eyebrow)}</Eyebrow>
        <H2>{t(UI.heading)}</H2>
        <Body style={{ marginTop: 10 }}>{t(UI.intro)}</Body>

        {/* A — Investment gap */}
        <Text style={styles.h3}>{t(UI.caseHeading)}</Text>
        <View style={{ gap: 8, marginTop: 12 }}>
          {INVESTMENT_TABLE.map((r, i) => (
            <View key={i} style={[styles.tableRow, r.highlight && styles.tableRowHi]}>
              <View style={styles.tableTop}>
                <Text style={styles.tableState}>{r.state}</Text>
                <Text style={styles.tableYear}>{t(r.year)}</Text>
              </View>
              <Text style={styles.tableInit}>{t(r.initiative)}</Text>
              <Text style={styles.tableInvest}>{t(r.investment)}</Text>
            </View>
          ))}
        </View>

        {/* chart */}
        <Card style={{ marginTop: 16 }}>
          <Text style={styles.chartTitle}>{t(UI.chartTitle)}</Text>
          <Text style={styles.chartSub}>{t(UI.chartSub)}</Text>
          <View style={{ marginTop: 12 }}>
            <BarChart data={INVESTMENT_CHART} />
          </View>
          <Text style={styles.chartNote}>{t(UI.chartNote)}</Text>
        </Card>

        {/* callout */}
        <View style={styles.callout}>
          <Text style={styles.calloutText}>{t(UI.calloutText)}</Text>
        </View>

        {/* B — Detailed ecosystem accordion */}
        <Text style={styles.h3}>{t(UI.detailHeading)}</Text>
        <View style={styles.accordion}>
          {DETAILED_ECOSYSTEM.map((inst, i) => {
            const isOpen = open === i;
            return (
              <View key={i} style={i > 0 && styles.accDivider}>
                <Pressable style={styles.accHead} onPress={() => setOpen(isOpen ? -1 : i)}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.accName}>{inst.name}</Text>
                    <Text style={styles.accLoc}>{t(inst.location)}</Text>
                  </View>
                  <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={20} color={colors.primary} />
                </Pressable>
                {isOpen && (
                  <View style={styles.accBody}>
                    <Detail label={t(UI.researchFocus)} value={t(inst.focus)} />
                    <Detail label={t(UI.funding)} value={t(inst.funding)} />
                    <Detail label={t(UI.employment)} value={t(inst.employment)} />
                    <Detail label={t(UI.connection)} value={t(inst.connection)} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* C — Recommendations */}
        <Text style={styles.h3}>{t(UI.recommendationsHeading)}</Text>
        <View style={{ gap: 12, marginTop: 12 }}>
          {RECOMMENDATIONS.map((rec, i) => (
            <Card key={i}>
              <View style={styles.recHead}>
                <View style={styles.recNum}>
                  <Text style={styles.recNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.recTitle}>{t(rec.title)}</Text>
              </View>
              <Body style={{ marginTop: 12 }}>{t(rec.rationale)}</Body>
              <View style={{ marginTop: 12, gap: 6 }}>
                <Text style={styles.metaLine}>
                  <Text style={[styles.metaKey, { color: colors.primary }]}>{t(UI.precedentLabel)}</Text>
                  {t(rec.precedent)}
                </Text>
                <Text style={styles.metaLine}>
                  <Text style={[styles.metaKey, { color: colors.secondary }]}>{t(UI.impactLabel)}</Text>
                  {t(rec.impact)}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        {/* D — Take action */}
        <Text style={styles.h3}>{t(UI.takeActionHeading)}</Text>
        <View style={{ gap: 12, marginTop: 12 }}>
          <ContactCard
            icon="Landmark"
            iconColor={colors.primary}
            title={t(UI.contactCrowTitle)}
            sub="crow.house.gov"
            onPress={() => Linking.openURL("https://crow.house.gov")}
          />
          <ContactCard
            icon="Users"
            iconColor={colors.secondary}
            title={t(UI.contactCQNTitle)}
            sub="coloradoquantum.org"
            onPress={() => Linking.openURL("https://coloradoquantum.org")}
          />
          <ContactCard
            icon="Mail"
            iconColor={colors.accentDark}
            title={t(UI.shareRepTitle)}
            sub={t(UI.shareRepSub)}
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
