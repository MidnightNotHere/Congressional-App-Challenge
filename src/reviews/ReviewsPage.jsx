/* =========================================================================
   Quantum4Colorado — community reviews (/reviews)
   The curated set from data/reviews.js, an average-rating summary, and a
   submission form. New submissions POST to api/submit-review.js (an
   Upstash-backed moderation queue — see that file) and are never published
   automatically; the submitter still sees their own review appended below,
   tagged "Just submitted," for this browser session only.
   ========================================================================= */

import React, { useState } from "react";
import { Star, Quote, Send, CheckCircle2 } from "lucide-react";
import { REVIEWS, averageRating } from "../../data/reviews.js";
import { QuantumLine, SectionLabel, useLanguage } from "../shared/uiKit.jsx";

const UI = {
  sectionLabel: { en: "Reviews", es: "Reseñas" },
  heading: { en: "What people are saying", es: "Lo que dice la gente" },
  intro: {
    en: "Feedback from students, educators, and outside reviewers who tested Quantum4Colorado during Congressional App Challenge development.",
    es: "Comentarios de estudiantes, educadores y revisores externos que probaron Quantum4Colorado durante el desarrollo para el Congressional App Challenge.",
  },
  avgLabel: { en: "average rating", es: "calificación promedio" },
  countLabel: { en: "reviews", es: "reseñas" },
  fiveStarLabel: { en: "5-star reviews", es: "reseñas de 5 estrellas" },
  pendingBadge: { en: "Just submitted", es: "Recién enviado" },
  formEyebrow: { en: "Add yours", es: "Agregue la suya" },
  formHeading: { en: "Share your feedback", es: "Comparta su opinión" },
  formIntro: {
    en: "Used the site? Tell us what worked and what didn't. Submissions are reviewed by the team before appearing publicly, but you'll see yours below right away.",
    es: "¿Usó el sitio? Cuéntenos qué funcionó y qué no. El equipo revisa los envíos antes de publicarlos, pero verá el suyo abajo de inmediato.",
  },
  nameLabel: { en: "Name", es: "Nombre" },
  namePlaceholder: { en: "Jordan", es: "Jordan" },
  roleLabel: { en: "Role", es: "Rol" },
  rolePlaceholder: {
    en: "High School Student, Teacher, Parent…",
    es: "Estudiante de secundaria, Maestro, Padre…",
  },
  ratingLabel: { en: "Rating", es: "Calificación" },
  quoteLabel: { en: "Your review", es: "Su reseña" },
  quotePlaceholder: {
    en: "What stood out, and what would you improve?",
    es: "¿Qué se destacó y qué mejoraría?",
  },
  submit: { en: "Submit review", es: "Enviar reseña" },
  submitting: { en: "Submitting…", es: "Enviando…" },
  thanksHeading: { en: "Thanks for the feedback", es: "Gracias por sus comentarios" },
  thanksBody: {
    en: "Your review has been sent to the team and added below for this visit.",
    es: "Su reseña fue enviada al equipo y se agregó abajo para esta visita.",
  },
  errorRequired: {
    en: "Fill in every field and pick a star rating before submitting.",
    es: "Complete todos los campos y elija una calificación antes de enviar.",
  },
};

function StarRow({ rating, size = "w-4 h-4", interactive = false, onChange }) {
  if (interactive) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = n <= rating;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={filled}
              className="p-1 -m-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#375FFF] rounded"
            >
              <Star
                className={`${size} ${
                  filled ? "fill-[#FFE600] text-[#0A0A0A]" : "text-[#0A0A0A]"
                }`}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={`${size} ${
            n <= rating ? "fill-[#FFE600] text-[#0A0A0A]" : "text-[#CBD5E0]"
          }`}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, pending }) {
  return (
    <div className="relative bg-white border-2 border-[#0A0A0A] p-6 shadow-[6px_6px_0_0_#FFFFFF] flex flex-col">
      {pending && (
        <span className="absolute -top-3 left-5 font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-[#FFE600] text-[#04070F] border-2 border-[#0A0A0A]">
          {pending}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <StarRow rating={review.rating} />
        <Quote className="w-6 h-6 text-[#375FFF]/25 shrink-0" aria-hidden="true" />
      </div>
      <p className="mt-4 text-[#0A0A0A] leading-relaxed flex-1">“{review.quote}”</p>
      <div className="mt-5 pt-4 border-t-2 border-[#0A0A0A]">
        <p className="font-bold text-[#0A0A0A]">{review.name}</p>
        <p className="font-mono text-xs text-[#2B2B2B] mt-0.5">{review.role}</p>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const { t } = useLanguage();
  const [pendingReviews, setPendingReviews] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", quote: "", rating: 0 });
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  const avg = averageRating(REVIEWS);
  const fiveStarCount = REVIEWS.filter((r) => r.rating === 5).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const role = form.role.trim();
    const quote = form.quote.trim();
    if (!name || !role || !quote || form.rating < 1) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    fetch("/api/submit-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, quote, rating: form.rating }),
    }).catch(() => {});

    setPendingReviews((prev) => [{ id: `pending-${Date.now()}`, name, role, quote, rating: form.rating }, ...prev]);
    setForm({ name: "", role: "", quote: "", rating: 0 });
    setStatus("done");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 pb-20">
      <QuantumLine tone="cyber" />

      <div className="mt-10 max-w-3xl">
        <SectionLabel tone="cyber">{t(UI.sectionLabel)}</SectionLabel>
        <h2 className="font-display font-black tracking-tight text-2xl sm:text-4xl text-[#EEF1FA]">
          {t(UI.heading)}
        </h2>
        <p className="mt-4 text-[#9FA8C4] text-lg leading-relaxed">{t(UI.intro)}</p>
      </div>

      {/* summary stats */}
      <div className="mt-8 flex flex-wrap gap-3">
        <div className="bg-white border-2 border-[#0A0A0A] px-5 py-3 shadow-[3px_3px_0_0_#FFFFFF]">
          <span className="font-mono text-2xl font-bold text-[#375FFF]">{avg.toFixed(1)}</span>
          <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#2B2B2B]">
            {t(UI.avgLabel)}
          </span>
        </div>
        <div className="bg-white border-2 border-[#0A0A0A] px-5 py-3 shadow-[3px_3px_0_0_#FFFFFF]">
          <span className="font-mono text-2xl font-bold text-[#375FFF]">{REVIEWS.length}</span>
          <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#2B2B2B]">
            {t(UI.countLabel)}
          </span>
        </div>
        <div className="bg-white border-2 border-[#0A0A0A] px-5 py-3 shadow-[3px_3px_0_0_#FFFFFF]">
          <span className="font-mono text-2xl font-bold text-[#375FFF]">{fiveStarCount}</span>
          <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#2B2B2B]">
            {t(UI.fiveStarLabel)}
          </span>
        </div>
      </div>

      {/* reviews grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingReviews.map((review) => (
          <ReviewCard key={review.id} review={review} pending={t(UI.pendingBadge)} />
        ))}
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* submission form */}
      <div className="mt-16 bg-[#375FFF] border-2 border-[#0A0A0A] shadow-[6px_6px_0_0_#FFFFFF] p-6 sm:p-10 text-white">
        <SectionLabel tone="cyber">{t(UI.formEyebrow)}</SectionLabel>
        <h3 className="font-display font-black tracking-tight text-xl sm:text-2xl">
          {t(UI.formHeading)}
        </h3>
        <p className="mt-3 text-white max-w-2xl leading-relaxed">{t(UI.formIntro)}</p>

        {status === "done" ? (
          <div className="mt-6 bg-white border-2 border-[#0A0A0A] p-6 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#00707A] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-[#0A0A0A]">{t(UI.thanksHeading)}</p>
              <p className="mt-1 text-sm text-[#2B2B2B]">{t(UI.thanksBody)}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                  {t(UI.nameLabel)}
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder={t(UI.namePlaceholder)}
                  maxLength={80}
                  className="mt-2 w-full bg-white border-2 border-[#0A0A0A] px-3 py-2.5 text-[#0A0A0A] placeholder:text-[#2B2B2B]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                />
              </label>
              <label className="block">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                  {t(UI.roleLabel)}
                </span>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder={t(UI.rolePlaceholder)}
                  maxLength={80}
                  className="mt-2 w-full bg-white border-2 border-[#0A0A0A] px-3 py-2.5 text-[#0A0A0A] placeholder:text-[#2B2B2B]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                />
              </label>
            </div>

            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                {t(UI.ratingLabel)}
              </span>
              <div className="mt-2 inline-flex bg-white border-2 border-[#0A0A0A] px-3 py-2.5">
                <StarRow
                  rating={form.rating}
                  size="w-6 h-6"
                  interactive
                  onChange={(n) => setForm((f) => ({ ...f, rating: n }))}
                />
              </div>
            </div>

            <label className="block">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                {t(UI.quoteLabel)}
              </span>
              <textarea
                value={form.quote}
                onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                placeholder={t(UI.quotePlaceholder)}
                maxLength={1000}
                rows={4}
                className="mt-2 w-full bg-white border-2 border-[#0A0A0A] px-3 py-2.5 text-[#0A0A0A] placeholder:text-[#2B2B2B]/50 leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              />
            </label>

            {status === "error" && (
              <p className="text-[#FFE600] font-semibold text-sm" role="alert">
                {t(UI.errorRequired)}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 bg-[#FFE600] hover:bg-[#E5CE00] text-[#04070F] border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#FFFFFF] font-bold px-6 py-3 transition-colors disabled:opacity-70"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {status === "submitting" ? t(UI.submitting) : t(UI.submit)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
