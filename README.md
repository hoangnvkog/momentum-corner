# Momentum Corner

> *"You are still becoming."*

A cinematic personal operating system for the mind — a digital sanctuary for reflection, focus, and momentum.

---

## 🌌 Live Demo

**Local:** http://localhost:3005

---

## 🧭 Architecture

```
src/
 ├── app/
 │    ├── layout.tsx            ← Root layout + fonts (Bebas Neue, Inter, Space Grotesk)
 │    ├── page.tsx              ← Main orchestrator (Hero → Today → Future Self → Archive → Night)
 │    └── globals.css           ← Cinematic styles: film grain, vignette, glow, glass-card
 ├── components/
 │    └── Navigation.tsx        ← Floating nav + ambient audio controller + night mode toggle
 ├── sections/
 │    ├── HeroSection.tsx        ← Fullscreen cinematic landing with parallax, blobs, text reveal
 │    ├── TodaySection.tsx       ← Daily command center: mission, habits, focus timer, energy, quotes
 │    ├── FutureSelfSection.tsx  ← Identity statements, principles, philosophy
 │    ├── ArchiveSection.tsx     ← Memory vault / timeline with expandable entries
 │    └── NightReflectionSection.tsx  ← 2AM journaling with rain particles, typing sound, localStorage
 ├── data/
 │    ├── quotes.json            ← Rotating motivational quotes
 │    ├── principles.json        ← Future self identity statements
 │    ├── archive.json           ← Journal entries + milestones + lessons
 │    └── today.json             ← Daily habits, focus tasks, energy level
 ├── hooks/
 │    ├── useMouseParallax.ts    ← Mouse movement parallax
 │    ├── useRandomQuote.ts      ← Auto-rotating quotes with fade
 │    ├── useTypingEffect.ts     ← Character-by-character text reveal
 │    └── useAudioController.ts  ← Ambient audio management
 └── styles/                     ← Additional style modules (future)
```

---

## 🚀 Quick Start

```bash
cd website/momentum-corner
npm install
npm run dev
```

Open → http://localhost:3005

**Build for production:**
```bash
npm run build
npm start
```

**Deploy to Vercel:**
```bash
npx vercel
```

---

## 🎨 Cinematic Features

| Feature | Implementation |
|---------|---------------|
| **Film Grain** | SVG noise filter + CSS animation overlay |
| **Vignette** | Radial gradient fixed overlay |
| **Parallax** | Mouse tracking via `useMouseParallax` hook |
| **Ambient Blobs** | 3 layered radial gradients with blur + float animation |
| **Scanlines** | CSS repeating-linear-gradient overlay |
| **Glass Cards** | backdrop-filter blur + subtle border |
| **Glow Effects** | text-shadow + box-shadow utilities |
| **Text Reveal** | Framer Motion: opacity + y-offset + blur transitions |
| **Scroll Hint** | Animated bouncing line indicator |
| **Smooth Transitions** | AnimatePresence with scale + blur exit |

---

## 🎵 Sections

### 1. Hero
- Fullscreen dark gradient background
- Animated ambient glow blobs (cyan, purple, blue)
- Parallax mouse movement on title
- Cinematic text reveal: "You Are Still **Becoming**"
- Day counter subtitle
- Animated Enter button with glow hover
- Scroll hint indicator

### 2. Today (Daily Command Center)
- Current mission card
- Focus timer (25min Pomodoro with circular SVG progress)
- Habit streak tracker with dot indicators
- Rotating quote display with fade transitions
- Energy level bar (10-segment color-coded)

### 3. Future Self
- Cinematic title: "Who I Am Becoming"
- 12 principle cards with hover accent lines
- Gradient text treatment
- Staggered reveal animations
- Bottom philosophy statement

### 4. Archive
- Vertical timeline with color-coded dots
- Expandable journal entries
- Type badges: Milestone / Reflection / Lesson
- Ambient gradient connector line
- Click-to-expand content

### 5. Night Reflection
- Pure black background
- Animated rain particle overlay (40 drops)
- Subtle ambient typing sound (Web Audio API noise)
- Journal textarea with localStorage persistence
- Word count + timestamp display
- Previous entries carousel
- "Release" button with save confirmation
- Closing thought footer

### Navigation
- Floating top bar with scroll detection
- Active section tracking
- Night mode toggle (sun/moon icons)
- Ambient audio toggle with volume slider
- Smooth scroll to sections

---

## 🎭 Color Palette

```
Background:   #050505  #0F1115  #161B22
Accent Cyan:  #7FDBFF
Accent Purple:#8B5CF6
Accent Green: #00FFC6
```

---

## 🔤 Typography

| Role | Font | Source |
|------|------|--------|
| Headings | Bebas Neue | Google Fonts |
| Body | Inter | Google Fonts |
| Alt / UI | Space Grotesk | Google Fonts |

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next@16` | React framework |
| `framer-motion` | All animations & transitions |
| `lucide-react` | Icons (Volume, Sun, Moon) |
| `clsx` | Class name utilities |
| `tailwind-merge` | Tailwind class dedup |

**No paid tools. All free/open-source.**

---

## 📱 Mobile Responsive

- `clamp()` for fluid typography
- Responsive grid: 1 → 2 → 3 columns
- Touch-friendly button sizes
- Optimized scroll performance
- No broken layouts at any breakpoint

---

## 🔮 Future Enhancements

- [ ] Background video (Pexels/Pixabay `.webm` files)
- [ ] Real ambient sounds (rain, tape hiss, cinematic drone)
- [ ] Supabase/Notion sync for journal entries
- [ ] Theme customization panel
- [ ] Day counter from actual start date
- [ ] PWA offline support
- [ ] Markdown journal import/export
- [ ] Achievement/badge system for habit streaks
- [ ] Spline 3D element in Hero

---

## 📄 License

Personal project. Not for commercial use.

---

*Built with calm, focus, and intention.*
