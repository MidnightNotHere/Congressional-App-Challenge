/* =========================================================================
   Quantum4Colorado (mobile) — data adapter
   Re-exports the shared /data layer (repo root) with the exact export
   names and shapes the mobile screens already import, so no screen file
   needs to change. Content itself lives in /data and is shared verbatim
   with the web app — see /data/*.js. Editing content only ever needs to
   happen in one of those files now, not here.

   Two small mobile-specific adaptations happen in this file only:
   1. Ecosystem/resource tab pills use each entry's `shortLabel` (mobile's
      horizontal tab-pill scroller is narrower than web's), falling back
      to `label` if a `shortLabel` isn't defined.
   2. `CAREER_TRACKS` and `computeQuizResult` are reconstructed from the
      shared `CAREERS` + `QUIZ_RESULTS` (split apart in the shared layer)
      back into the single merged shape mobile's Youth screen expects.
   ========================================================================= */

import {
  HERO_STATS,
  EXPLAINER_CARDS,
  ECOSYSTEM_TABS as SHARED_ECOSYSTEM_TABS,
  STRENGTHS,
  GAPS,
  DETAILED_ECOSYSTEM,
  SOURCES,
} from "../../data/ecosystem.js";
import {
  QUESTIONS,
  ORG_LABELS,
  TIERS,
  NIST_PQC,
  CISA_PQC,
  NSA_PQC,
  calculateResults,
  buildActions,
} from "../../data/pqc-scoring.js";
import {
  INVESTMENT_CHART,
  INVESTMENT_TABLE,
  RECOMMENDATIONS,
} from "../../data/policy-recommendations.js";
import { CAREERS } from "../../data/careers.js";
import {
  HERO_CARDS,
  CONCEPT_CARDS,
  RESOURCE_TABS as SHARED_RESOURCE_TABS,
} from "../../data/resources.js";
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  computeQuizResult as computeQuizResultId,
} from "../../data/quiz-data.js";

export {
  HERO_STATS,
  EXPLAINER_CARDS,
  STRENGTHS,
  GAPS,
  QUESTIONS,
  ORG_LABELS,
  TIERS,
  NIST_PQC,
  CISA_PQC,
  NSA_PQC,
  calculateResults,
  buildActions,
  INVESTMENT_CHART,
  INVESTMENT_TABLE,
  DETAILED_ECOSYSTEM,
  RECOMMENDATIONS,
  SOURCES,
  HERO_CARDS,
  CONCEPT_CARDS,
  QUIZ_QUESTIONS,
};

/* Tab pills render `shortLabel` where the shared data defines one. */
export const ECOSYSTEM_TABS = SHARED_ECOSYSTEM_TABS.map((tab) => ({
  ...tab,
  label: tab.shortLabel || tab.label,
}));

export const RESOURCE_TABS = SHARED_RESOURCE_TABS.map((tab) => ({
  ...tab,
  label: tab.shortLabel || tab.label,
}));

/* Career profile + quiz-result content, merged back into one entry per
   track (the shape the Youth screen's Careers tab and quiz results use). */
export const CAREER_TRACKS = CAREERS.map((career) => ({
  ...career,
  ...QUIZ_RESULTS[career.id],
}));

export function computeQuizResult(answers) {
  const id = computeQuizResultId(answers);
  return CAREER_TRACKS.find((track) => track.id === id);
}
