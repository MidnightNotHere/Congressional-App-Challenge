/* =========================================================================
   Quantum4Colorado — Terms of Service (/terms) and Privacy Policy (/privacy)
   Copy lives in data/legal.js (shared with the mobile app). Both pages share
   one layout; a pair of links at the bottom jumps between them.
   ========================================================================= */

import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { LEGAL, LEGAL_UPDATED, CONTACT_EMAILS } from "../../data/legal.js";
import { QuantumLine, SectionLabel, useLanguage } from "../shared/uiKit.jsx";

const UI = {
  updated: { en: "Last updated", es: "Última actualización" },
  contactHeading: { en: "Contact", es: "Contacto" },
  contactBody: {
    en: "Questions, corrections, or removal requests? Write to either address.",
    es: "¿Preguntas, correcciones o solicitudes de eliminación? Escriba a cualquiera de las dos direcciones.",
  },
  other: {
    terms: { en: "Read the Privacy Policy", es: "Leer la Política de Privacidad" },
    privacy: { en: "Read the Terms of Service", es: "Leer los Términos de Servicio" },
  },
};

function LegalPage({ doc, otherPath, otherLabel }) {
  const { t } = useLanguage();
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-6 pb-20">
      <QuantumLine tone="cyber" />

      <div className="mt-10">
        <SectionLabel tone="cyber">{t(UI.updated)}: {t(LEGAL_UPDATED)}</SectionLabel>
        <h1 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#EEF1FA]">
          {t(doc.title)}
        </h1>
        <p className="mt-4 text-[#9FA8C4] text-lg leading-relaxed">{t(doc.intro)}</p>
      </div>

      <div className="mt-10 space-y-8">
        {doc.sections.map((s, i) => (
          <section key={i} className="border-t-2 border-[#375FFF] pt-6">
            <h2 className="font-bold text-lg sm:text-xl text-[#EEF1FA]">{t(s.heading)}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j} className="mt-3 text-[#9FA8C4] leading-relaxed">
                {t(p)}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 space-y-3">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-[#9FA8C4] leading-relaxed">
                    <span className="mt-2.5 w-2 h-2 shrink-0 bg-[#FFE600]" aria-hidden="true" />
                    <span>{t(b)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="border-t-2 border-[#375FFF] pt-6">
          <h2 className="font-bold text-lg sm:text-xl text-[#EEF1FA]">{t(UI.contactHeading)}</h2>
          <p className="mt-3 text-[#9FA8C4] leading-relaxed">{t(UI.contactBody)}</p>
          <div className="mt-3 flex flex-col gap-2">
            {CONTACT_EMAILS.map((addr) => (
              <a
                key={addr}
                href={`mailto:${addr}`}
                className="inline-flex items-center gap-2 text-[#6E8CFF] font-semibold hover:underline w-fit"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {addr}
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12">
        <Link
          to={otherPath}
          className="inline-block bg-[#375FFF] hover:bg-[#2748CC] text-white font-bold uppercase tracking-wide text-sm px-5 py-3 border-2 border-[#0A0A0A] shadow-[4px_4px_0_0_#FFFFFF]"
        >
          {t(otherLabel)}
        </Link>
      </div>
    </div>
  );
}

export function TermsPage() {
  return <LegalPage doc={LEGAL.terms} otherPath="/privacy" otherLabel={UI.other.terms} />;
}

export function PrivacyPage() {
  return <LegalPage doc={LEGAL.privacy} otherPath="/terms" otherLabel={UI.other.privacy} />;
}
