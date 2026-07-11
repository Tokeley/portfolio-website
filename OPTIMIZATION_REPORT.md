# Portfolio Website — Performance Optimization Report

Audit date: 2026-07-11, updated 2026-07-11 (follow-up pass). Scope: full codebase, with a
focus on animated components.

Legend: ✅ implemented on this branch · 📋 recommended, not implemented (needs your judgement)

Everything marked ✅ in sections 1–4 and 5.4 involves **no** visible content or visual change.
Items 1.7, 1.8, 5.2, and 5.3 are flagged inline as they either intentionally change visible
behaviour (by your request) or touch content/binary assets.

---

## 1. FlowField (p5.js animated background) — the biggest CPU cost on the site

The flow field runs every frame, forever, for every visitor. Several issues compound:

### ✅ 1.1 Per-particle, per-frame object allocation (severe)
`FlowField.jsx` built the `greenStops` array — including **five `p.color()` objects** — inside
the particle loop. On a 1920×1080 screen that is ~4,100 particles × 5 colors × 60 fps ≈
**1.2 million color-object allocations per second**, plus `lerpColor`, `red()`, `green()`,
`blue()` calls each returning/parsing color objects. This causes constant garbage-collection
pauses (visible as stutter, especially while scrolling).

**Fix:** precompute the gradient once as plain numbers and interpolate with arithmetic.
Zero allocations in the draw loop.

### ✅ 1.2 Unbounded particle count (severe on large screens)
`num = width × height / 500` with no cap. A 4K display spawns **~16,600 particles** (4× the
work of a laptop), which is exactly where smoothness matters least — the particles are a
background. Capped at 3,000 (a 1080p screen was already ~4,100, so most screens keep their
exact look; only very large screens are capped).

### ✅ 1.3 Retina pixel density
p5 defaults to the device pixel ratio, so on a 2× display the canvas rasterizes 4× the
pixels. For a soft particle background this sharpness is imperceptible; `pixelDensity(1)`
cuts canvas raster work by up to 75% on Retina/mobile screens.

### ✅ 1.4 p5 wrapper overhead in the hot loop
`p.cos/p.sin/p.map/p.constrain/p.TAU` go through p5's wrapper layer per particle per frame.
Replaced with native `Math` operations and inline arithmetic. `strokeWeight(2)` was also set
every frame; it's now set once in `setup()`.

### ✅ 1.5 No `prefers-reduced-motion` support
Users with reduced-motion enabled (accessibility, or battery saving) still got a perpetual
animation. The sketch now renders a single static frame for them and stops the loop
(`noLoop`). Also good for battery on mobile.

### ✅ 1.6 No resize handling
The canvas was created once at mount size; resizing the window (or rotating a phone) left
blank margins or overflow. Added `windowResized` → `resizeCanvas` + background repaint.

### ✅ 1.7 Stale dark-mode capture — now fixed (changes visible behaviour, by request)
`isDarkMode` used to be read from the DOM once at mount, so toggling dark mode mid-session
never repainted the canvas. `FlowField` now reads `darkModeOn` from `DarkModeContext`
reactively; on toggle it does one fully-opaque `background()` repaint so the canvas snaps to
the new theme immediately instead of carrying old-theme trails. **Visible change:** the flow
field now visibly clears to solid black/white the instant you toggle dark mode (previously it
did nothing). Verified in-browser and covered by tests in `FlowField.test.jsx`.

### ✅ 1.8 Pause the sketch when scrolled past the hero — now implemented
The canvas is a fixed, full-screen layer that kept animating (and burning CPU/GPU) even once
scrolled far below the fold. An `IntersectionObserver` on the `#Home` section now calls
`p.noLoop()` when the hero scrolls out of view and `p.loop()` when it scrolls back in.
Skipped entirely under `prefers-reduced-motion` (already static). **Visible change:** trails
freeze the moment you scroll past the hero instead of continuing to animate underneath the
overlay. Covered by tests in `FlowField.test.jsx`.

---

## 2. Scroll-driven re-renders (janky scrolling)

### ✅ 2.1 `App.jsx` re-rendered the entire site on every scroll event
The scroll handler called `setBgOpacity(...)` per scroll event, re-rendering `App` → `Pages`
→ **all five page sections** dozens of times per second while scrolling — at the same time
the flow field was competing for the main thread.

**Fix:** the overlay opacity is now written straight to a CSS custom property
(`--dynamic-bg-opacity`) inside a `requestAnimationFrame`-throttled, passive scroll listener.
React no longer re-renders at all during scroll; the browser just recomposites. The opacity
formula is unchanged, so the visual result is identical.

### ✅ 2.2 `Navigation` / `NavigationMobile` forced synchronous layout per scroll event
Both ran `querySelectorAll('section')` + `offsetTop`/`clientHeight` reads and a style write
on every scroll event (unthrottled, non-passive). Now rAF-throttled with passive listeners,
element lookups cached, and the bar style only written when the active section actually
changes.

---

## 3. Audio object churn

### ✅ 3.1 `new Audio(...)` created on every render
`MuteSwitch`, `DarkModeSwitch`, and `Contact` constructed fresh `Audio` objects (each a
potential network fetch) on **every render**. `SoundWidget` did the same for its click sound,
and its `useState(new Audio(...))` initializer constructed-and-discarded an Audio object per
render too (non-lazy initializer). All are now created once (lazy `useState`/memoized refs).

### ✅ 3.2 Unused `useSound` imports
`Navigation.jsx` and `SoundWidget.jsx` imported `use-sound` (which drags in Howler.js)
without using it. Removed, and the `use-sound` dependency dropped.

---

## 4. Bundle & dependency hygiene

### ✅ 4.1 Suspicious / junk packages (security)
- `fortawesome@0.0.1-security` — a placeholder squat package, not the real Font Awesome.
- `tailwing@0.0.1` — a typo-squat of "tailwind".

Neither is imported anywhere. **Removed** — packages like these are classic supply-chain
risk vectors.

### ✅ 4.2 Unused dependencies
- `framer-motion` — never imported. Removed.
- `use-sound` — only unused imports (see 3.2). Removed.

### ✅ 4.3 Runtime error on page load
`main.jsx` called `reportWebVitals()` — a leftover from Create React App — without importing
or defining it, throwing an uncaught `ReferenceError` on every page load. Removed.

### ✅ 4.4 Dead files
- `src/TitleAndNavLinks.js` — unused, and it imports `./App.css` which doesn't exist (would
  crash the build if ever imported).
- `src/App.test.js` — broken CRA leftover (tested for a "learn react" link that doesn't
  exist, with no test runner installed). Replaced by the new real test suite.

### ✅ 4.5 Font Awesome ships its entire icon library — now migrated to react-icons
Every `<i className="fa-...">` (Navigation, NavigationMobile, MuteSwitch, DarkModeSwitch,
SoundWidget, ProjectCard, About) has been replaced with the equivalent `react-icons/fa`
component, and the `@fortawesome/fontawesome-free` import in `index.css` plus its dependency
are removed. Built CSS dropped from 86 KB to 20 KB and the ~500 KB of Font Awesome webfont
files no longer ship at all. Verified pixel-identical in the browser; tests updated to target
`data-testid` attributes on the icons instead of the old `.fa-*` class names.

### ✅ 4.6 `emailjs-com` migrated to `@emailjs/browser`
Swapped the deprecated `emailjs-com` package for the maintained `@emailjs/browser`. Now calls
`emailjs.init(publicKey)` once at module load and `emailjs.send(serviceId, templateId, params)`
without the key on every call (the modern API). Same service/template IDs, same behaviour —
verified with the existing Contact test suite.

### 📋 4.7 Chakra UI v3 is heavy for its usage here
Chakra (plus Emotion + next-themes) is used for one page's timeline, the project cards, and
the contact form. Long-term, replacing those with Tailwind (already in use) would remove the
largest chunk of the JS bundle. Big refactor — report only.

---

## 5. Assets (the largest byte-wins available)

### ✅ 5.1 Images lazy-load and decode off the main thread
Project card images (all below the fold) now have `loading="lazy"` + `decoding="async"`,
so ~19 MB of PNGs no longer compete with the initial render.

### ✅ 5.2 Project images resized (biggest single win) — 19 MB → 6.8 MB
The five images actually used in project cards that were oversized (`zen-zone.png`,
`reel-it-in.png`, `meap.png`, `snipify.png`, `lightspeed.png`) were all ~1,500–2,900 px wide
but displayed at ≲420 px. Downsized in place to a 1440 px max width with `sips -Z 1440`
(no format change, no visible difference at display size):

| file | before | after |
|---|---|---|
| zen-zone.png | 6.8 MB | 1.8 MB |
| reel-it-in.png | 4.2 MB | 2.4 MB |
| meap.png | 2.2 MB | 1.9 MB |
| snipify.png | 948 KB | 248 KB |
| lightspeed.png | 116 KB | 104 KB |

`devastation.png` and `now-salt.png` were already ≤1440 px and untouched. Converting to WebP
would shrink these further but wasn't done — that changes file extensions referenced in
`Projects.jsx`, a bigger-blast-radius change than a straight resize.

### ✅ 5.3 Unreferenced ambience tracks deleted (light-speed.apk kept, by request)
`ocean_waves.mp3`, `rain_ambience.mp3`, `room_ambience.mp3` (~15 MB total) were confirmed
unreferenced anywhere in the source or in `light-speed.html`, and deleted. `light-speed.apk`
(13 MB) is linked from `light-speed.html` (the Lightspeed project's "Play Now!" page) and was
left in place. `now-salt.png` and `portfolio-website.png` in `public/resources/` also appear
unreferenced by any component — flagging here rather than deleting, since that wasn't in
scope for this pass.

### ✅ 5.4 Font loading
- `Inter-Regular.woff2` was declared as `format('opentype')` — an incorrect format hint that
  can make browsers skip the file. Fixed to `format('woff2')`.
- All `@font-face` rules now have `font-display: swap`, so text renders immediately instead
  of flashing invisible while Montserrat/Francy download.

### 📋 5.5 Montserrat served as raw OTF
`.otf` files are ~2–4× larger than `.woff2`. Converting the three Montserrat weights to
woff2 is a quick win (no visual change).

---

## 6. Minor / code quality (implemented where free)

- ✅ `Home.jsx` imported `FlowField` without using it — removed.
- ✅ `Navigation.jsx` imported `useState`/`useEffect` partly unused — cleaned.
- 📋 `About.jsx` has a stray duplicated `a` attribute (`<a key={index} a href=...>`) and the
  `key` sits on the wrong element (the map's root is the un-keyed div). Functional today;
  worth fixing when you next touch that file. (Left as-is; out of scope for this pass.)
- ✅ `index.html` now has a `<meta name="description">` summarizing the site for search
  engines/link previews.

---

## Test suite

**Vitest + React Testing Library + jsdom** (`npm test` / `npm run test:watch`), 39 tests:
- App renders all sections with the flow-field background (p5 mocked)
- Scroll handler updates the CSS opacity variable with the original formula (rAF-throttled)
- FlowField: mounts p5 once, cleans up on unmount, respects `prefers-reduced-motion`
- Gradient math: new numeric interpolation matches the original p5 `lerpColor` values
- FlowField dark-mode toggle: no repaint on mount, full opaque repaint on each toggle
  thereafter (1.7)
- FlowField hero visibility: `noLoop()`/`loop()` fire on IntersectionObserver
  enter/exit, skipped under reduced motion, no crash without a `#Home` element (1.8)
- Navigation active-bar tracking on scroll (desktop + mobile)
- Audio components: single Audio instance across re-renders, mute toggling, track cycling
- ProjectCard: lazy/async image attributes, links and badges intact
- Contact form: sends via `@emailjs/browser`, clears fields, no audio while typing
- Dark mode: class toggling on `<html>`, context propagation

All icon migrations (4.5) were verified visually in the browser (identical appearance,
zero Font Awesome network requests) since react-icons renders plain SVGs that don't need
their own dedicated unit tests beyond the existing interaction tests, which were updated
to target `data-testid` instead of the old `.fa-*` classes.
