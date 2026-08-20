/* =========================================================================
   Quantum4Colorado (mobile) — Youth tab
   Owns the three views reachable from this tab: the Youth screen itself,
   the course map, and a single lesson.

   Why local state rather than a stack navigator: the app ships only
   @react-navigation/bottom-tabs, and a two-level drill-down inside one tab
   doesn't justify pulling in native-stack and restructuring App.js. Every
   other screen in this app keeps its own view state the same way (see the
   tabs and expanding cards in YouthScreen). The Android hardware back
   button is wired up below so the drill-down still behaves natively.
   ========================================================================= */

import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import YouthScreen from "./YouthScreen";
import LearnHubScreen from "../education/LearnHubScreen";
import LessonScreen from "../education/LessonScreen";

export default function YouthTab() {
  /* { name: "youth" } | { name: "hub" } | { name: "lesson", slug } */
  const [view, setView] = useState({ name: "youth" });

  const openCourse = () => setView({ name: "hub" });
  const openLesson = (slug) => setView({ name: "lesson", slug });
  const backToHub = () => setView({ name: "hub" });
  const backToYouth = () => setView({ name: "youth" });

  /* Hardware back steps out one level at a time: lesson -> hub -> youth,
     and only falls through to the OS (leaving the app) from the Youth
     screen. Returning true tells Android the press was handled.

     RN 0.85 removed BackHandler.removeEventListener — addEventListener
     hands back a subscription, and .remove() is the only teardown. */
  useEffect(() => {
    if (view.name === "youth") return undefined;

    const onBack = () => {
      if (view.name === "lesson") backToHub();
      else backToYouth();
      return true;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [view.name]);

  if (view.name === "hub") {
    return <LearnHubScreen onOpenLesson={openLesson} onBack={backToYouth} />;
  }

  if (view.name === "lesson") {
    /* Keyed by slug so moving between lessons remounts the screen and the
       scroll position starts at the top, as a real navigation push would. */
    return (
      <LessonScreen
        key={view.slug}
        slug={view.slug}
        onOpenLesson={openLesson}
        onBackToHub={backToHub}
      />
    );
  }

  return <YouthScreen onOpenCourse={openCourse} onOpenLesson={openLesson} />;
}
