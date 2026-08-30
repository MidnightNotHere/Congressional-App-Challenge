/* Vercel serverless function — stores one visitor-submitted review in a
   moderation queue (an Upstash Redis list), same integration
   track-assessment.js uses. Submissions land here only; the public site
   keeps showing the curated set in data/reviews.js until the team reviews
   a submission and adds it there by hand. The submitter still sees their
   own review appended to the page immediately — that's handled client-side
   in ReviewsPage.jsx, independent of this store. */

import { Redis } from "@upstash/redis";

function clean(value, maxLen) {
  return typeof value === "string" ? value.trim().slice(0, maxLen) : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = clean(req.body?.name, 80);
  const role = clean(req.body?.role, 80);
  const quote = clean(req.body?.quote, 1000);
  const rating = Number(req.body?.rating);

  if (
    !name ||
    !role ||
    !quote ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return res.status(400).json({ error: "Invalid submission" });
  }

  try {
    const redis = Redis.fromEnv();
    await redis.lpush(
      "q4co:reviews:pending",
      JSON.stringify({
        name,
        role,
        quote,
        rating,
        submittedAt: new Date().toISOString(),
      })
    );
    return res.status(204).end();
  } catch (err) {
    console.error("submit-review failed:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
