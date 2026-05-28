# Rohit's Journey — Interactive 3D Portfolio

> **Source of truth.** This document is the spec. AI agents (Claude Code, Cursor, Codex) should read this in full before writing any code. Update this file when scope changes.

> **The compass test — use this for every decision during the build:**
> *"Does this make the project feel more like a handcrafted short film, or more like an ambitious indie game?"*
> **Always pick the short film.**

---

## 1. The Vision

A first-person walkable 3D portfolio that tells the story of Rohit Gireesh's life as a short, cinematic journey through a series of handcrafted scenes. The geography of the world *is* the narrative: visitors walk through Rohit's life chronologically, from Sainik School in Kerala, through undergrad in Kochi, MBA in Pune, back to a professional life in Kochi, with personal-life zones (Munnar mountains, beach) and a small easter egg or two (F1, basketball, watches) tucked along the way.

This replaces the current portfolio at `r8dot.in` / `rohitgireesh.com`.

> **Mental model:** This project is a **handcrafted interactive short film**, *not* an ambitious indie open-world game. Think Firewatch, Journey, Sable, Tiny Glade, A Short Hike — small, dense, atmospheric, emotionally grounded. Quality comes from lighting, audio, color, composition, and pacing — never from scale, polygons, or technical ambition.

### Aesthetic North Star
- **Stylized atmospheric minimalism** with a warm, cohesive, slightly painterly feeling
- Compact continuous landscape — small and dense, never empty
- Linear path with one or two optional detours
- Strong silhouettes, controlled palette, fog-as-depth, cinematic composition
- Visual mood evolves emotionally across the journey rather than swinging between visual extremes — every zone feels like the same world, just a different chapter
- Memorable and emotionally human, while still professional enough for recruiters

### Visual References
- **Firewatch** — bold colors, painterly fog, strong silhouettes, restrained detail
- **Journey** — controlled palette, sand/wind atmosphere, emotional pacing
- **Sable** — flat-shaded stylization, environmental storytelling
- **Tiny Glade** — handcrafted intimacy, no UI noise
- **A Short Hike** — warmth, small worlds that feel dense and personal

When in doubt about a visual decision, ask: *"Would this fit in Firewatch?"* If not, simplify.

### Budget Reality (non-negotiable constraint)
- **Additional cash budget: ≤ ₹2,000 total (~$25)**
- Domains and hosting already owned. AI subscriptions already available.
- **Default is free.** Every asset, font, audio clip, and tool must be free unless it's a genuine hero asset that cannot be replicated. Spending money is the last resort, not the first instinct.
- If you're about to spend money, ask first: *"Can I modify a free asset to do this job?"* Usually: yes.

### Success Criteria
1. A recruiter who has never met Rohit completes the full journey in **under 5 minutes** and comes away with a clear sense of his career *and* his personality
2. It loads in under 4 seconds on a 4G mobile connection and holds 30+ fps on a 2020 mid-range phone
3. All written content from the current portfolio is accessible somewhere in the world
4. It works without instructions — controls are discoverable
5. Every screenshot looks intentional — no awkward empty fields, no clashing styles, no "this looks unfinished" moments
6. **The world feels cohesive** — one visual language, not six mismatched zones

---

## 2. Phased Release Plan

We ship in three releases. Each release is shippable on its own — never leave the project in a half-broken state. Each phase prioritizes *perceived quality* (lighting, fog, audio, pacing) over *technical complexity*.

### v1 — "Walkable Short Film" (Weekend 1)
**Goal: Ship a small, complete, atmospheric experience. Even at v1 it should feel like a finished short film, not a tech demo.**

- Vite + React + TS + R3F project set up and deployed to Vercel
- One compact continuous terrain with 6 zones — dense, no long traversal sections
- First-person walk controls (WASD + mouse-look on desktop)
- Basic mobile controls (virtual joystick + drag-to-look)
- Proximity-triggered HTML panels at each zone with full content from current portfolio
- **Fixed time-of-day per zone** (no day/night cycle) — each zone has one carefully chosen lighting mood
- **Atmospheric fog from day one** — fog is the project's most important visual tool, not a v2 addition
- Cohesive controlled palette across the whole world (max ~8 hero colors total)
- Stylized flat-shaded look — basic materials only, no PBR, no custom shaders
- Skybox + one directional sun light per scene + ambient
- Loading screen with a single hero illustration or color wash
- Audio toggle in UI (even if no audio yet — placeholder)
- Deployed live to a staging URL (e.g. `v1.r8dot.in`) before replacing the main site

**Out of scope for v1:** water shaders, monsoon, neon, day/night cycle, easter eggs, custom audio, complex models, physics-based interactions

### v2 — "Atmosphere & Sound" (Weekend 2)
**Goal: Make it *feel*. Audio and atmosphere are the biggest perceived-quality multipliers.**

- **Audio is the headline feature of v2** — ambient bed per zone (waves, rain, wind, distant chatter), footsteps tuned to surface, subtle UI sounds, one music track that crossfades across zones
- Light fog grading per zone — warmer in Kerala, cooler/misty in Munnar, hazy-warm in Pune — without breaking palette cohesion
- One lightweight stylized water shader (reused across all water — backwater, beach) — no per-zone custom shaders
- Color grading via post-processing (`@react-three/postprocessing`) — vignette + tone-mapping + per-zone color LUT-style grade
- Subtle bloom (only where it genuinely helps — sun, lanterns)
- Replace placeholder landmarks with curated free assets from Quaternius / Kenney / Poly Pizza / Sketchfab CC, **modified for visual consistency** rather than dropped in raw
- Smooth transitions between zones (camera ease, audio crossfade, slight fog/color grade shift)

### v3 — "Polish & Soul" (Weekend 3+)
**Goal: The handcrafted details that make people remember it.**

- One or two easter eggs (pick the strongest two, not all three):
  - Parked F1 car along the path (short interaction — honk, favorite driver fact)
  - Basketball hoop with a light tap-to-shoot interaction (no full physics simulation — a scripted arc is fine)
  - Hidden floating watch as a "collectible"
- Micro-interactions: leaves rustling, water lapping, ferry slowly drifting, lantern flicker — small loops, no procedural systems
- Subtle "visited all zones" acknowledgement at the end
- Photo mode (hide UI, free camera)
- Final pass: every screenshot should look intentional

---

## 3. World Map & Content Layout

The world is a single compact landscape — think theme-park storytelling, not open-world exploration. Total walk time from spawn to end should be under 5 minutes for a recruiter at a normal pace. Zones are dense, intentional, and visually distinct, but every transition is on foot through a guided path with no dead space.

Each zone follows the **"one of each" rule**:
- **One** strong visual identity (silhouette + palette)
- **One** memorable hero moment (the screenshot you'd put on the case-study slide)
- **One** primary interaction focus (the station(s) at that zone)

Visitor spawns at Sainik School. A soft directional cue (path, fence line, ambient audio shift, fog falloff) guides them onward. No invisible walls — fog and composition do the wayfinding.

```
                  [MUNNAR]
                     ↑
                  (detour)
                     |
[SAINIK] → [KOCHI UG] → [PUNE] → [KOCHI NOW] → [BEACH]
                                       |
                                  (detour)
                                       ↓
                              [EASTER EGG NOOK]
```

### Zone 1 — Sainik School, Kazhakootam
- **Time of day:** Early morning, low warm sun, light mist
- **Hero moment:** A lone flagpole silhouetted against the morning haze, school building soft in the fog behind it
- **Landmarks:** Stylized school building (only partially visible through fog), flagpole, a single banyan tree
- **Interaction:** One station — schooling years, what discipline + structure taught Rohit
- **Audio:** Distant bugle/whistle, light wind, faint birds

### Zone 2 — Kochi (Undergrad)
- **Time of day:** Warm afternoon, golden side-light
- **Hero moment:** A small wooden ferry dock leading into still backwater, palms framing the composition
- **Landmarks:** Ferry dock, a moored boat, coconut palms, calm water
- **Interaction:** One station — undergrad years, discovering marketing, early projects
- **Audio:** Water lapping, distant birds, occasional boat horn

### Zone 3 — Pune (MBA at Symbiosis)
- **Time of day:** Late afternoon, slightly cooler, faint urban haze
- **Hero moment:** A warm-lit chai stall under a tree at dusk, small medals/trophies arranged nearby
- **Landmarks:** Stylized campus archway (Symbiosis nod), chai stall with a hanging lantern, a low wall with a few books
- **Interaction:** Two stations — (a) MBA + internships (OYO, Airtel, Chipo), (b) case competition wins (IIM K, Sirmaur, Rohtak, SPJIMR) shown as small medal pickups arranged near the chai stall
- **Audio:** Soft urban hum, distant chatter, faint chai-stall sounds

### Zone 4 — Kochi (Now)
- **Time of day:** Twilight / early evening, deep blue sky with warm window lights
- **Hero moment:** A single tall office silhouette against twilight, windows lit warm, one small neon sign nearby — restrained, not Blade Runner
- **Landmarks:** Stylized office building (Axis Bank vibe, not literal), one small neon sign, suggestion of a city skyline behind fog
- **Interaction:** One station — current role, performance marketing repositioning, resume PDF link
- **Audio:** Light city ambient, faint distant traffic

### Zone 5 — Munnar (Personal — Detour)
- **Time of day:** Cool overcast, soft diffused light, light mist
- **Hero moment:** Looking out from a viewpoint over rolling tea hills disappearing into fog
- **Landmarks:** Tea-hill terraces (a few low layered slopes, not a full plantation), a viewpoint with a small camera tripod, a single shelf with a watch
- **Interaction:** One station with three sub-content cards — photography & nature videography, the Kumbalangi bioluminescence video, watch collection
- **Audio:** Wind, distant birds, very quiet

### Zone 6 — Beach (About / Contact)
- **Time of day:** Late golden hour, sun low on the horizon
- **Hero moment:** A driftwood log or hammock framing the sunset over still water
- **Landmarks:** Sandy shore, gentle waves, a hammock or driftwood log, a small lantern on the sand
- **Interaction:** One station — full about-me, contact form, socials, "currently building" note
- **Audio:** Waves, occasional gull, very gentle wind

### Easter Egg Nook (Optional Detour, v3)
A small partially-hidden offshoot off the Kochi-Now → Beach path. Contains *one or two* of:
- F1 car parked under a streetlight
- Basketball hoop with a tap-to-shoot interaction (scripted arc, not physics)
- A floating watch as a "collectible"

Pick the two strongest in v3 — don't build all three.

---

## 4. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite | Fast dev server, modern, works everywhere |
| Framework | React 18 + TypeScript | TS catches AI-generated errors; React fits Rohit's existing skill |
| 3D | Three.js via `@react-three/fiber` | Industry-standard, fits React patterns |
| 3D helpers | `@react-three/drei` | Sky, useGLTF, KeyboardControls, PointerLockControls, Environment, Stats |
| Post-processing | `@react-three/postprocessing` | The single biggest perceived-quality lever — vignette, tone mapping, color grading, light bloom |
| Physics | `@react-three/rapier` | **Collision only** — capsule-vs-world. No dynamic physics objects in v1/v2 |
| State | `zustand` | Minimal, no boilerplate, good for game state |
| UI animation | `framer-motion` | For 2D HTML panel transitions |
| Audio | `howler` | Reliable cross-browser audio with crossfade support |
| Dev tweaking | `leva` | GUI controls during development; strip from production build |
| Hosting | Vercel | Free, fast, automatic deploys, great DX |
| Domain | `r8dot.in` / `rohitgireesh.com` | Already owned, point to Vercel |

### Why NOT certain things
- **Next.js** — overkill, no SSR needed for a 3D app, slower dev
- **Cannon.js** — Rapier is faster and actively maintained
- **Redux** — way too much ceremony for this scale
- **Tailwind** — fine if Rohit prefers, but CSS modules are simpler for the small 2D UI surface
- **Procedural terrain/foliage** — too much complexity for the return; we handcraft every scene
- **Heavy PBR materials** — flat-shaded / toon-leaning materials are cheaper *and* fit the art direction better
- **Custom shaders beyond one stylized water shader** — diminishing returns vs. fog + post-processing
- **Day/night cycle** — fixed time-of-day per zone, no expensive transitions

---

## 5. Project Architecture

```
rohit-journey/
├── public/
│   ├── models/              # .glb files (compressed with Draco/Meshopt)
│   ├── textures/            # .ktx2 or .webp
│   ├── audio/               # .mp3 / .ogg
│   └── hdri/                # environment maps
├── src/
│   ├── components/
│   │   ├── World/
│   │   │   ├── Terrain.tsx
│   │   │   ├── Sky.tsx
│   │   │   ├── Water.tsx          # v2
│   │   │   ├── Fog.tsx
│   │   │   └── Lighting.tsx
│   │   ├── Zones/
│   │   │   ├── SainikSchool.tsx
│   │   │   ├── KochiUndergrad.tsx
│   │   │   ├── Pune.tsx
│   │   │   ├── KochiNow.tsx
│   │   │   ├── Munnar.tsx
│   │   │   └── Beach.tsx
│   │   ├── Player/
│   │   │   ├── Player.tsx          # capsule collider + controls
│   │   │   ├── DesktopControls.tsx
│   │   │   ├── MobileControls.tsx
│   │   │   └── Footsteps.tsx       # v2
│   │   ├── Stations/
│   │   │   ├── Station.tsx         # the reusable proximity-trigger component
│   │   │   └── StationPrompt.tsx
│   │   ├── UI/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── Panel.tsx           # 2D HTML overlay for station content
│   │   │   ├── HUD.tsx
│   │   │   ├── Menu.tsx
│   │   │   ├── AudioToggle.tsx
│   │   │   └── Compass.tsx
│   │   ├── Easter/                 # v3
│   │   │   ├── F1Car.tsx
│   │   │   ├── Basketball.tsx
│   │   │   └── HiddenWatch.tsx
│   │   └── Scene.tsx               # top-level Canvas + composition
│   ├── hooks/
│   │   ├── useProximity.ts         # detects player-to-object distance
│   │   ├── useAudio.ts
│   │   ├── useDeviceDetect.ts
│   │   └── usePerformance.ts       # adaptive quality
│   ├── store/
│   │   ├── playerStore.ts          # position, velocity
│   │   ├── uiStore.ts              # active panel, menu open
│   │   ├── audioStore.ts           # muted, current ambient track
│   │   └── progressStore.ts        # visited zones, found easter eggs
│   ├── content/
│   │   └── zones.json              # all written content — edit without touching code
│   ├── shaders/                    # v2 — one shader only
│   │   └── water.glsl              # reused for backwater + beach
│   ├── lib/
│   │   ├── constants.ts            # zone positions, world bounds, speeds
│   │   └── utils.ts
│   ├── styles/
│   │   └── ui.module.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
├── PROJECT_BRIEF.md                # this file
├── ARCHITECTURE.md                 # detailed decisions
├── CONTENT.md                      # all text content drafts
└── README.md
```

---

## 6. Critical Patterns (the AI agents MUST follow these)

### Pattern A — Station component (the most-used abstraction)

Every interactive landmark uses `<Station>`. It handles proximity detection, prompt display, and panel triggering. Agents must NOT reinvent this per zone.

```tsx
<Station
  id="oyo-internship"
  position={[42, 0, -18]}
  radius={3}
  promptLabel="OYO Internship"
  onActivate={() => openPanel('oyo-internship')}
>
  <TrophyModel />
</Station>
```

### Pattern B — Content lives in JSON, not in components

All written content lives in `src/content/zones.json`. Components read from there. This lets Rohit edit copy without touching code.

### Pattern C — Adaptive quality

A `usePerformance` hook detects device and sets a quality tier (low / med / high). Components conditionally enable/disable shadows, post-processing, particle counts based on tier. NEVER hardcode "always high-quality."

### Pattern D — Position constants in one place

All zone positions, world dimensions, player speeds live in `src/lib/constants.ts`. Never hardcode `[42, 0, -18]` inline; it should be `ZONES.OYO.position`.

### Pattern E — Suspense + lazy loading

Each zone's heavy assets load via `useGLTF` inside `<Suspense>`. Initial bundle stays small. Zones load as you approach them.

### Pattern F — Single material vocabulary

The world uses **one consistent material style** — flat-shaded / toon-leaning, no PBR mix-and-match. Any imported free asset must be re-materialed to match before it ships. This is the single biggest cohesion lever. A "raw Quaternius tree next to a Sketchfab realistic dock" is an automatic reject.

### Pattern G — Fog as composition tool, not afterthought

Fog is configured per zone and is part of the scene composition, not a post-step. It defines how far you can see, what silhouettes read against the sky, and what mood the zone has. Every zone has a fog color tuned to its time-of-day. Agents should treat fog density + color as core scene parameters, not as v2 polish.

### Pattern H — One light setup, not a lighting rig

Each zone has: one directional sun (color + intensity matched to time-of-day) + ambient. That's it. No fill lights, no rim lights, no per-object spotlights. Lean on baked vertex colors and material self-illumination for the rest. v3 may add one practical light (lantern, neon sign) where it serves a hero moment.

---

## 7. Performance Budget (non-negotiable)

Smoothness matters more than graphical complexity. A smaller polished world running at 60fps beats a larger ambitious world stuttering at 25fps every time. If we exceed limits, stop adding features and optimize first.

| Metric | Target | Hard limit |
|---|---|---|
| Initial JS bundle (gzipped) | <400 KB | 700 KB |
| Total assets for v1 | <4 MB | 8 MB |
| Total polygons in scene | <60k | 120k |
| Texture max dim | 1024px | 2048px |
| Dynamic lights | ≤2 per zone | 4 |
| Draw calls | <80 | 150 |
| FPS on mid-range mobile | 30+ | 24 |
| FPS on desktop | 60 | 45 |
| Time to first interaction | <4s on 4G | 8s |

**Performance levers in priority order:**
1. Aggressive fog → smaller render distance → fewer draw calls
2. Lazy-loaded zones via Suspense — only load assets you're near
3. Instanced meshes for repeated objects (palms, rocks, tea-hill plants)
4. Single material per asset family — fewer material swaps = fewer draw calls
5. KTX2 compressed textures, Draco-compressed GLB meshes
6. No shadow maps on mobile; baked vertex AO instead
7. Cap pixel ratio at `min(devicePixelRatio, 1.5)` — retina hurts more than it helps here

Use `r3f-perf` or `drei`'s `<Stats>` during development. Profile before every merge.

---

## 7b. Quality Philosophy

**Perceived quality comes primarily from, in this order:**

1. **Lighting** — directional sun + ambient, tuned per zone, is doing 80% of the work
2. **Atmosphere** — fog is the most important visual tool in this entire project
3. **Audio** — ambient bed + footsteps + UI sounds turn "a 3D scene" into "a place"
4. **Color grading** — post-processing per zone (vignette, tone-mapping, LUT-like grade)
5. **Composition** — silhouettes, framing, what's in front of what
6. **Narrative cohesion** — the world tells the story before any text panel does
7. **Smooth performance** — 60fps feels like polish; 30fps feels broken
8. **Transitions** — how zones blend into each other (fog crossfade, audio crossfade, palette shift)

**Perceived quality does NOT come from:**
- Polygon count
- Asset budget
- Realism
- World size
- Custom shader count
- Number of features

**Practical rules:**
- **Cohesive art direction is a hard constraint.** A consistent average-quality look beats a mixed-quality high-detail look. Every time.
- **Consistent material vocabulary.** One material style across the whole world — flat-shaded / lightly toon-leaning. Imported assets must be re-materialed.
- **Consistent lighting language.** Same lighting model in every zone, only the parameters (sun color, intensity, fog) change.
- **Controlled environmental density.** Each scene has 3–7 hero elements + supporting silhouettes. Not 50 objects.
- **Negative space is composition.** A foggy empty middle-distance is a feature, not unfinished work.

### Locked World Palette (~8 colors — do not add to this list without justification)

These are the only colors that appear in 3D world geometry and materials. UI overlays may use near-white/near-black variants.

| Role | Hex | Used for |
|---|---|---|
| Warm sand | `#E8C99A` | Ground, beach, path |
| Deep Kerala green | `#2D5016` | Dense foliage, far trees |
| Soft sage | `#7A9E5C` | Grass, tea hills, near foliage |
| Monsoon blue-grey | `#8BA3B5` | Sky mid-tones, water, Pune haze |
| Warm terracotta | `#C4714A` | Rooftops, chai stall, warm accents |
| Deep twilight | `#1A2744` | Kochi-Now sky, far fog |
| Muted gold | `#D4A84B` | Sun rays, lanterns, warm light props |
| Fog base | `#C8D4D0` | Fog color for Kerala zones; lightens to `#D0C8C0` for Pune, darkens to `#1E2A3A` for Kochi-Now |

**Rules:**
- Every imported asset gets re-materialed to use colors *from this list only* before it ships
- Fog color must always be sampled from this palette — never white (`#ffffff`), never default grey
- If an asset "doesn't look right" with this palette, the answer is adjusting the palette slightly — not adding an 9th color

---

## 7c. Narrative Pacing

The world is a short film. Pacing is a design responsibility, not an afterthought.

**Pacing rules:**
- **Transitions between zones should feel emotional, not mechanical.** A path bends, fog shifts color, music gently crossfades — the visitor *feels* the move from undergrad-Kochi to Pune before they read a panel
- **The environment communicates the story before any text panel does.** A recruiter who reads zero panels should still get the gist from the silhouettes, palette, and audio alone
- **UI interruptions are minimal.** No popups, no "Welcome!" modals, no tutorial overlays after the first 10 seconds. Let the world speak
- **Movement should encourage curiosity, not speedrunning.** Walking speed is calibrated so the visitor *wants* to pause and look around. Slightly slow > slightly fast
- **Emotional tone evolves naturally across the journey** — disciplined dawn (Sainik) → warm afternoon (Kochi UG) → energetic dusk (Pune) → urban twilight (Kochi Now) → quiet mist (Munnar) → golden calm (Beach). The arc is a curve, not a roller-coaster
- **Every zone is distinct but part of the same world.** Same material vocabulary, same lighting language, same UI style. Only the mood changes
- **Each zone earns 30–60 seconds of attention.** Long enough to absorb the mood + read one panel, short enough to keep momentum
- **The first 10 seconds matter most.** Spawn into Sainik School with the hero shot already framed by the default camera direction. No "where am I" disorientation

---

## 8. Mobile Strategy

- Detect on mount: `'ontouchstart' in window || maxTouchPoints > 0`
- Mobile UI:
  - Virtual joystick (left thumb, bottom-left) for movement — use `nipplejs` or roll a custom one
  - Drag-anywhere-else for look — single finger, threshold to differentiate from joystick
  - Pinch to zoom FOV (optional)
  - Tap a station landmark to walk toward it (auto-walk) as a fallback
- Mobile performance:
  - Force quality tier "low" unless device is high-end (use `navigator.hardwareConcurrency` ≥ 8 as a rough proxy)
  - Disable shadows, post-processing, particles
  - Use lower-res textures
  - Reduce fog distance (= smaller render distance)
- Mobile UI overlays: full-screen panels, large touch targets (44px min)

---

## 9. Content Migration

Rohit currently has content at `r8dot.in` covering: about, experience, projects, contact. Plus material from his recent resume rebuild work (RAC bullets, performance marketing positioning, internships at OYO/Airtel/Chipo, case comp wins).

**Action item before/during build:** Draft `CONTENT.md` with the exact copy for each zone's panel. Don't write copy inside JSX. Recommend 100-200 words per main panel; recruiters skim.

---

## 10. Working Style with AI Agents

### When using Claude Code
- Always: `cd` into the project, then start a session. Claude Code reads PROJECT_BRIEF.md and ARCHITECTURE.md automatically if pointed to them.
- Break work into PR-sized chunks. Don't say "build the whole thing." Say "set up the project, install dependencies, create folder structure, ship a 'hello world' R3F cube."
- After each chunk: review the diff, run `npm run dev`, check it actually works, *then* commit.
- If the agent invents an API (`drei`'s `<MagicSky>` doesn't exist), tell it to check the actual package docs.

### When using Cursor
- Use for tight inline edits, refactors, autocomplete
- Pair Cursor's inline chat with the file you're editing — better than Claude Code for "tweak this component"

### When using Codex / cloud agents
- Good for spinning off parallel research tasks ("find me a free low-poly Kerala palm tree GLB")
- Don't use to write code that needs to integrate tightly with the rest of the project — you'll get merge pain

### Universal rules for all agents
1. **Read PROJECT_BRIEF.md and ARCHITECTURE.md before writing code**
2. **TypeScript strict mode is on; no `any` types**
3. **No new dependencies without justification in commit message**
4. **All commits ship working code** — never break `npm run dev`
5. **Performance budget is law** — check before merging
6. **No assets committed to git over 500 KB** — use `public/` and reference paths

---

## 11. Asset Sourcing Strategy

**Budget reality:** Additional spend capped at approximately **₹2k** (~$25). Domains and hosting are already owned. AI subscriptions already available. Assume near-zero asset budget unless absolutely necessary. Free and CC0/CC-BY assets are the default.

### Primary asset sources (all free)

| Source | Use for |
|---|---|
| **Quaternius** (CC0) | Trees, rocks, generic landscape — the bulk fill |
| **Kenney** (CC0) | UI elements, small props, simple buildings |
| **Poly Pizza** (CC) | Stylized one-offs that fit the painterly look |
| **Sketchfab** (CC filter) | Specific landmarks (ferry, houseboat, chai stall) — filter to "Downloadable" + "CC" |
| **AmbientCG** (CC0) | Ground textures, water normal maps, any tiling textures |
| **Pixabay audio** (royalty-free) | Music beds, ambient loops |
| **Freesound** (CC) | One-shot SFX — footsteps, UI clicks, water lap, bugle |

### Core rule: Modify free assets for consistency, do not chase expensive assets

A free Quaternius tree re-materialed to match the project's flat-shaded palette beats a $20 PBR-textured Sketchfab tree every time. The painterly cohesive look *comes from* the unification pass, not from individual asset quality.

### Lightweight Blender workflow (free tool)

Use Blender for:
- Scaling assets to consistent units (1 unit = 1m)
- Cleanup — remove unused materials, decimate over-dense meshes
- Mesh combining — merge multiple props into a single GLB to reduce draw calls
- Simple material edits — swap PBR materials for flat-shaded with one base color + optional vertex color
- Exporting optimized GLB with Draco compression

**Avoid in Blender:**
- Advanced sculpting
- Complex custom modeling from scratch
- High-detail/high-poly workflows
- Custom UV-unwrapping (use vertex colors instead)

### When to spend (the ~₹2k budget)

Only if free options have genuinely failed for a *hero* asset that defines a zone. Likely candidates:
- A specific Kerala houseboat or ferry GLB if the free options look wrong
- A stylized F1 car for the v3 easter egg
- Background music license if free options sound generic

**Process for finding an asset:**
1. Check Quaternius/Kenney first (90% of the time, done here)
2. Sketchfab CC search with style filter
3. Poly Pizza
4. Try modifying an existing free asset to fit
5. *Only then* consider spending — and ask: is this asset doing enough work to justify ₹500-2000?

### What not to use
- **AI-generated 3D models as final assets** — quality is inconsistent and topology is bad. Acceptable as early placeholders only
- **Realistic photogrammetry assets** — break the painterly look immediately
- **Asset packs you haven't verified the license for** — verify *before* committing to git

---

## 12. Open Questions (resolve before starting)

1. **Domain rollout:** v1 goes to staging URL (`v1.r8dot.in`) first, then replaces `r8dot.in` once stable — strongly recommended over direct replacement
2. **Resume:** Should the Kochi Now zone offer a direct PDF download of the latest resume? (Likely yes)
3. **Analytics:** Plausible / Umami / nothing? (Lightweight, no cookies, privacy-friendly — pick one)
4. **Palette lock-in:** Should the next step be locking in a 6–8 color world palette before any code is written? (Strongly recommended — palette consistency is the single biggest cohesion lever, and it's free to decide now)
5. **Reference moodboard:** Worth assembling 8–12 screenshots from Firewatch / Journey / Sable / Tiny Glade / A Short Hike to commit to a specific visual register before the AI agent starts generating scenes?

---

## 13. First Five Tasks (the Day 1 plan)

1. Create GitHub repo, init Vite + React + TS, deploy "hello world" to Vercel — *prove the pipeline works end to end before writing real code*
2. Install R3F + drei + rapier + zustand + postprocessing; render a flat ground plane with a sky, **graded fog**, and a movable capsule (the "player") — fog goes in from day one, not as polish
3. Implement first-person controls (PointerLockControls on desktop) — walk around the empty plane
4. Build the `<Station>` component + one test station that opens a `<Panel>` on proximity
5. Drop in placeholder boxes at the six zone positions, each with a test station — confirm the loop works end-to-end before any visual work

Once these five are done, v1 is 30% built. The rest is content and atmosphere — and atmosphere is where the project lives or dies.

---

## 14. Final Direction

The project should feel:
- Deeply personal
- Visually cohesive
- Atmospheric
- Memorable
- Polished
- Emotionally human

While remaining:
- Realistic to ship in a few weekends
- Maintainable
- Performant on mid-range hardware
- Beginner-manageable with AI assistance
- Within a ₹2k additional cash budget

---

## End of Brief
