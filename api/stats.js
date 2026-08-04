/* Vercel serverless function — returns aggregate, anonymous PQC
   assessment usage stats (total count + breakdowns by organization type
   and risk tier). Safe to expose publicly: every value is a count, never
   an individual response. */

import { Redis } from "@upstash/redis";
import { ORG_LABELS, TIERS } from "../data/pqc-scoring.js";

const ORG_TYPES = Object.keys(ORG_LABELS);
const TIER_NAMES = TIERS.map((t) => t.name.en);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const redis = Redis.fromEnv();
    const orgKeys = ORG_TYPES.map((id) => `q4co:stats:org:${id}`);
    const tierKeys = TIER_NAMES.map((name) => `q4co:stats:tier:${name}`);

    const [total, orgCounts, tierCounts] = await Promise.all([
      redis.get("q4co:stats:total"),
      redis.mget(...orgKeys),
      redis.mget(...tierKeys),
    ]);

    const byOrgType = {};
    ORG_TYPES.forEach((id, i) => {
      byOrgType[id] = Number(orgCounts[i]) || 0;
    });
    const byTier = {};
    TIER_NAMES.forEach((name, i) => {
      byTier[name] = Number(tierCounts[i]) || 0;
    });

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ total: Number(total) || 0, byOrgType, byTier });
  } catch (err) {
    console.error("stats failed:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
