/* =========================================================================
   Quantum4Colorado — course progress
   Tracks which lessons a student has completed and where they left off,
   in localStorage. No account, no backend: progress is per-browser and
   nothing about it is sent anywhere.

   This follows the same approach as the language preference in
   Quantum4Colorado.jsx, but stores JSON rather than a bare string, so
   reads guard the parse separately from the storage access — a corrupted
   or hand-edited value should reset progress, never break the page.

   Known limitation, accepted: there's no `storage` event listener, so two
   tabs open on the course won't see each other's progress until reload.
   ========================================================================= */

import { useCallback, useEffect, useState } from "react";
import { ALL_LESSONS, UNITS } from "../../data/curriculum.js";

const STORAGE_KEY = "q4co-course-progress";

/* Bumped only if the stored shape ever changes incompatibly. Present from
   the first release so a future migration has something to branch on
   rather than having to guess at untagged data already in browsers. */
const SCHEMA_VERSION = 1;

const EMPTY = { version: SCHEMA_VERSION, completed: [], lastVisited: null };

/* Slugs that no longer exist (a renamed lesson, an older course version)
   are dropped on read so stale entries can't inflate the progress count. */
const KNOWN_SLUGS = new Set(ALL_LESSONS.map((lesson) => lesson.slug));

function readProgress() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* Storage unavailable — private browsing, disabled cookies. Progress
       just won't persist; the course still works for this session. */
    return EMPTY;
  }
  if (!raw) return EMPTY;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return EMPTY;
  }
  if (!parsed || typeof parsed !== "object") return EMPTY;

  const completed = Array.isArray(parsed.completed)
    ? [...new Set(parsed.completed.filter((slug) => KNOWN_SLUGS.has(slug)))]
    : [];
  const lastVisited =
    typeof parsed.lastVisited === "string" && KNOWN_SLUGS.has(parsed.lastVisited)
      ? parsed.lastVisited
      : null;

  return { version: SCHEMA_VERSION, completed, lastVisited };
}

function writeProgress(next) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    /* Quota or unavailable storage — keep the in-memory state so the
       current session behaves normally. */
  }
}

export function useCourseProgress() {
  /* Lazy initializer: localStorage is synchronous, so the first render
     already has the real progress and the UI never flashes empty. */
  const [progress, setProgress] = useState(readProgress);

  /* Write-through on every change rather than in each setter, so the two
     stay in sync no matter which action triggered the update. */
  useEffect(() => {
    writeProgress(progress);
  }, [progress]);

  const markComplete = useCallback((slug) => {
    if (!KNOWN_SLUGS.has(slug)) return;
    setProgress((prev) =>
      prev.completed.includes(slug)
        ? prev
        : { ...prev, completed: [...prev.completed, slug] }
    );
  }, []);

  const markIncomplete = useCallback((slug) => {
    setProgress((prev) => ({
      ...prev,
      completed: prev.completed.filter((s) => s !== slug),
    }));
  }, []);

  const setLastVisited = useCallback((slug) => {
    if (!KNOWN_SLUGS.has(slug)) return;
    setProgress((prev) =>
      prev.lastVisited === slug ? prev : { ...prev, lastVisited: slug }
    );
  }, []);

  const resetProgress = useCallback(() => setProgress(EMPTY), []);

  const completedSet = new Set(progress.completed);
  const isComplete = (slug) => completedSet.has(slug);

  const completedCount = progress.completed.length;
  const overallPercent =
    ALL_LESSONS.length === 0
      ? 0
      : Math.round((completedCount / ALL_LESSONS.length) * 100);

  /* { done, total } for one unit, for the per-unit bars on the hub. */
  const unitProgress = (unitId) => {
    const unit = UNITS.find((u) => u.id === unitId);
    if (!unit) return { done: 0, total: 0 };
    return {
      done: unit.lessons.filter((lesson) => completedSet.has(lesson.slug)).length,
      total: unit.lessons.length,
    };
  };

  /* Where "Continue" should send the student: the lesson they last opened
     if they haven't finished it, otherwise the first one still outstanding,
     otherwise nothing (course complete). */
  const nextLesson = (() => {
    if (progress.lastVisited && !completedSet.has(progress.lastVisited)) {
      return ALL_LESSONS.find((l) => l.slug === progress.lastVisited) || null;
    }
    return ALL_LESSONS.find((l) => !completedSet.has(l.slug)) || null;
  })();

  return {
    completedSlugs: progress.completed,
    completedCount,
    totalLessons: ALL_LESSONS.length,
    overallPercent,
    lastVisited: progress.lastVisited,
    isComplete,
    markComplete,
    markIncomplete,
    setLastVisited,
    resetProgress,
    unitProgress,
    nextLesson,
    hasStarted: completedCount > 0 || progress.lastVisited !== null,
  };
}
