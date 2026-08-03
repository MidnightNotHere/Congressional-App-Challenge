# Mobile On-Device Testing Checklist (Phase 2)

The mobile app has only been verified via `expo start --web` (a browser-based
DOM check) inside this development environment, which has no access to real
iOS/Android hardware or the Expo Go app. Everything below needs a pass on
**actual devices** before the app is submission-ready. Report back anything
that fails — I can fix rendering/layout/interaction bugs once you tell me
what broke and on which device.

## How to run it

```bash
cd mobile
npx expo start
```

Scan the QR code with the **Expo Go** app (iOS) or the Expo Go app's
built-in scanner (Android). Test on at least one iOS device and one Android
device — ideally one iPhone with a notch/Dynamic Island.

## Checklist

### Native rendering
- [ ] **Quantum-circuit line** (the SVG line with gold dot nodes) renders correctly at the top of the Story screen's hero and between Youth screen sections — check both iOS and Android, since `react-native-svg` occasionally renders subtly differently per platform.
- [ ] **Score ring** (the circular progress indicator on the Readiness results screen) animates smoothly and shows the correct color for each risk tier — run the assessment once with low-risk answers and once with high-risk answers to see both green and red tiers.
- [ ] **Bar chart** (Representatives/Policy screen's investment comparison) renders with Colorado's bar in red and the others in blue, with legible labels.

### Touch interactions
- [ ] **Quiz progress bar** (Youth screen, "Find Your Quantum Path") fills correctly as you answer each of the 5 questions.
- [ ] **Quiz answer selection** — tapping an option selects it and auto-advances to the next question; tapping doesn't require a precise/tiny hit target (check on a smaller phone screen).
- [ ] **Assessment answer selection** — same check for the 8-question PQC Readiness Tool, including the two multi-select questions (Q2, Q5) and their "Continue" button.
- [ ] **Expand-in-place cards** — the Youth screen's 3 hero cards and 6 career cards expand/collapse correctly on tap.

### Scroll behavior
- [ ] All 5 Youth resource tabs (Competitions, Summer Programs, Online Learning, Colorado-Specific, Careers) scroll horizontally in the tab-pill row without clipping, and each tab's content scrolls vertically without the bottom tab bar overlapping content.
- [ ] Long screens (Representatives/Policy's ecosystem accordion, Youth's full page) scroll to the bottom without content getting cut off above the tab bar.

### PDF export (expo-print / expo-sharing)
- [ ] Complete the PQC Readiness Tool, tap **"Download my report (PDF)"**, and confirm a PDF is generated and the OS share sheet opens.
- [ ] Confirm the generated PDF's content (org type, score, risk tier, action list) matches what's on screen — this is the part most likely to have broken silently in the Phase 1 data-layer refactor, since `data/pqc-scoring.js`'s `calculateResults` output feeds both the on-screen results and `mobile/src/report.js`'s PDF generator.

### Safe area / notch handling (iOS)
- [ ] On a notched or Dynamic Island iPhone, confirm the brand bar at the top of every screen isn't obscured by the notch/status bar.
- [ ] Confirm the bottom tab bar isn't obscured by the home indicator.

### Android back button
- [ ] From any non-Story tab, press the Android hardware/gesture back button and confirm it behaves reasonably (either returns to the Story tab or exits the app on the first tab — it should not crash or get stuck).
- [ ] While a career card or hero card is expanded, confirm back button behavior doesn't leave the UI in a broken state.

### Accessibility text scaling
- [ ] In iOS Settings → Accessibility → Display & Text Size → Larger Text, enable a large text size and relaunch Expo Go. Confirm question prompts, option labels, and card text wrap instead of truncating or overlapping.
- [ ] Repeat on Android: Settings → Accessibility → Font size.

### Cross-platform label consistency
- [ ] Bottom tab labels read **Colorado / Readiness / Policy / Youth / About** — confirm these match the web nav's section names (Colorado's Quantum Story / Is Your Org Ready? / For Representatives / Youth and Education / About) closely enough that a judge moving between web and mobile isn't confused. (Mobile's shorter labels are an intentional mobile-UI adaptation, not a mismatch — flag it here only if it reads as genuinely inconsistent rather than just abbreviated.)

## After testing

Once you've been through this list, let me know what failed (device + OS
version + what broke) and I'll fix it directly. If everything passes, this
file's checkboxes can be filled in and Phase 2 is done.
