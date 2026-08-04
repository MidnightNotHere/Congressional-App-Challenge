/* Vercel serverless function — records one anonymous PQC assessment
   completion. No PII, no session/IP tracking: just which of the fixed
   organization-type and risk-tier categories the completed assessment
   fell into, aggregated as Redis counters via the Upstash Redis
   integration (Vercel's KV storage migrated there — see README's Phase 5
   setup notes). */

import { Redis } from "@upstash/redis";
import { ORG_LABELS, TIERS } from "../data/pqc-scoring.js";

const ORG_TYPES = new Set(Object.keys(ORG_LABELS));
const TIER_NAMES = new Set(TIERS.map((t) => t.name.en));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orgType, tier } = req.body || {};
  if (!ORG_TYPES.has(orgType) || !TIER_NAMES.has(tier)) {
    return res.status(400).json({ error: "Invalid orgType or tier" });
  }

  try {
    const redis = Redis.fromEnv();
    await Promise.all([
      redis.incr("q4co:stats:total"),
      redis.incr(`q4co:stats:org:${orgType}`),
      redis.incr(`q4co:stats:tier:${tier}`),
    ]);
    return res.status(204).end();
  } catch (err) {
    console.error("track-assessment failed:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
