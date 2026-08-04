# Screenshot Checklist

I can't capture real screenshots myself in this environment (no visual
browser rendering available here), so this is a shot list for you to
capture instead — same situation as `mobile/ON_DEVICE_TESTING.md`.
Aim for 6–10 images total; the CAC portal typically wants a handful of
representative screens, not exhaustive coverage.

Run `npm run dev` (web) and/or `cd mobile && npm run web` (mobile),
then capture at a clean browser window size (1440×900 works well) with
no dev tools open.

## Must-have (web)

- [ ] **Story hero** — top of the page, showing the headline and the
      $800M+ / 140+ / #1 stat row.
- [ ] **Ecosystem map** — the tabbed Federal/University/Industry/Policy
      view with a few institution cards visible.
- [ ] **PQC assessment — a mid-flow question** — shows the multi-step
      UI, not just the landing state.
- [ ] **PQC assessment — completed results** — score ring, risk tier,
      and at least one visible risk factor / action item.
- [ ] **QR code share panel** — after clicking "Show QR code" on a
      completed result.
- [ ] **For Representatives — investment gap chart**.
- [ ] **Spanish version of any one of the above** — proves the
      bilingual toggle, e.g. the Story hero with the ES toggle active.

## Nice-to-have (web)

- [ ] Youth & Education quiz result.
- [ ] Policy recommendation cards.
- [ ] About → sources/citations list.

## Must-have (mobile)

- [ ] Story screen on a phone-sized viewport (or a real device/Expo Go
      screenshot, which reads better to judges than a resized browser
      window).
- [ ] Assessment results screen on mobile.
- [ ] Bottom tab bar visible in at least one shot, showing all 5 tabs.

## Where to put them

Save into `submission/screenshots/` with descriptive filenames (e.g.
`story-hero.png`, `assessment-results-es.png`) — that folder already
exists and is empty, waiting for these.
