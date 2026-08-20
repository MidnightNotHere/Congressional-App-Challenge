/* =========================================================================
   Quantum4Colorado (mobile) — course progress
   Tracks completed lessons and where the student left off, in AsyncStorage.
   No account, no backend: progress is per-device and nothing is sent
   anywhere.

   This is a provider rather than a plain hook (which is what the web build
   uses) because AsyncStorage is asynchronous. Two screens each calling a
   hook independently would each re-load on mount, so the hub would flash
   empty every time a student came back from a lesson, and a completion
   marked in the lesson wouldn't show on the hub behind it. One provider
   above both screens keeps a single copy in memory and updates instantly.

   Mirrors the shape written by the web app (same key, same schema) — the
   two never sync, but keeping them identical means one mental model.
   ========================================================================= */

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALL_LESSONS, UNITS } from "../data";

const STORAGE_KEY = "q4co-course-progress";

/* Bumped only if the stored shape ever changes incompatibly. Present from
   the first release so a future migration has something to branch on. */
const SCHEMA_VERSION = 1;

const EMPTY = { version: SCHEMA_VERSION, completed: [], lastVisited: null };

/* Slugs that no longer exist (a renamed lesson, an older course version)
   are dropped on read so stale entries can't inflate the progress count. */
const KNOWN_SLUGS = new Set(ALL_LESSONS.map((lesson) => lesson.slug));

/* Defensive parse: a corrupted or hand-edited value resets progress rather
   than crashing the screen. The read and the parse are guarded separately
   because they fail in different ways — storage can be unavailable, and a
   value that reads fine can still be malformed JSON. */
function sanitize(raw) {
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

const CourseProgressContext = createContext(null);

export function CourseProgressProvider({ children }) {
  const [progress, setProgress] = useState(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => setProgress(sanitize(raw)))
      .catch(() => setProgress(EMPTY))
      .finally(() => setReady(true));
  }, []);

  /* Write-through after the initial load has settled, so the empty default
     can't overwrite real saved progress during the first frames. */
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => {
      /* persistence failed — progress still works for this session */
    });
  }, [progress, ready]);

  const markComplete = (slug) => {
    if (!KNOWN_SLUGS.has(slug)) return;
    setProgress((prev) =>
      prev.completed.includes(slug)
        ? prev
        : { ...prev, completed: [...prev.completed, slug] }
    );
  };

  const markIncomplete = (slug) => {
    setProgress((prev) => ({
      ...prev,
      completed: prev.completed.filter((s) => s !== slug),
    }));
  };

  const setLastVisited = (slug) => {
    if (!KNOWN_SLUGS.has(slug)) return;
    setProgress((prev) =>
      prev.lastVisited === slug ? prev : { ...prev, lastVisited: slug }
    );
  };

  const resetProgress = () => setProgress(EMPTY);

  const completedSet = new Set(progress.completed);
  const completedCount = progress.completed.length;

  const value = {
    ready,
    completedSlugs: progress.completed,
    completedCount,
    totalLessons: ALL_LESSONS.length,
    overallPercent:
      ALL_LESSONS.length === 0
        ? 0
        : Math.round((completedCount / ALL_LESSONS.length) * 100),
    lastVisited: progress.lastVisited,
    isComplete: (slug) => completedSet.has(slug),
    markComplete,
    markIncomplete,
    setLastVisited,
    resetProgress,

    /* { done, total } for one unit, for the per-unit bars on the hub. */
    unitProgress: (unitId) => {
      const unit = UNITS.find((u) => u.id === unitId);
      if (!unit) return { done: 0, total: 0 };
      return {
        done: unit.lessons.filter((l) => completedSet.has(l.slug)).length,
        total: unit.lessons.length,
      };
    },

    /* Where "Continue" should go: the lesson last opened if unfinished,
       otherwise the first one still outstanding, otherwise null. */
    nextLesson: (() => {
      if (progress.lastVisited && !completedSet.has(progress.lastVisited)) {
        return ALL_LESSONS.find((l) => l.slug === progress.lastVisited) || null;
      }
      return ALL_LESSONS.find((l) => !completedSet.has(l.slug)) || null;
    })(),

    hasStarted: completedCount > 0 || progress.lastVisited !== null,
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const ctx = useContext(CourseProgressContext);
  if (!ctx) {
    throw new Error("useCourseProgress must be used inside CourseProgressProvider");
  }
  return ctx;
}
