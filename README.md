# Momentum Corner

> *"You are still becoming."*

Một góc riêng điện ảnh cho tâm trí — hệ điều hành cá nhân cho phản chiếu, tập trung và đà tiến.

**Live:** https://momentum-corner.vercel.app/

---

## 🎬 Trải Nghiệm

### Cinematic Intro
Mở website → animation mở màn kiểu phim: đen → line sáng → "Momentum Corner" → fade vào hero. Chỉ hiện lần đầu trong session.

### Hero Section
- **Particle Field** — 35 hạt sáng floating tạo chiều sâu vũ trụ
- **Ambient Blobs** — 3 lớp gradient glow (cyan/purple/blue) float chậm
- **Parallax** — nội dung di chuyển theo chuột
- **Gradient Title** — "You Are Still **Becoming**" với gradient white→green + drop-shadow
- **Film Grain** — SVG noise overlay animation
- **Vignette** — viền tối radial gradient bao quanh
- **Scanlines** — subtle CRT scanline effect

### Today Dashboard
- **Current Mission** — nhiệm vụ hôm nay (edit được trong `data/today.json`)
- **Focus Timer** — Pomodoro 25 phút, circular SVG progress
- **Habit Streaks** — dot grid hiển thị chuỗi thói quen
- **Energy Level** — 10-segment bar, đổi màu theo mức (green/cyan/purple)
- **Signal (Quotes)** — 25 câu quote tiếng Việt, auto-rotate mỗi 12s với fade

### Future Self
- 15 principle cards, hover accent line animation
- Staggered reveal khi scroll vào view
- Gradient title: "Mày Đang Trở Thành Ai"

### Archive
- Timeline dọc với connector line gradient
- 3 loại entry: Cột mốc (green), Chiêm nghiệm (cyan), Bài học (purple)
- Click để expand nội dung đầy đủ

### Night Reflection
- Background đen hoàn toàn
- **Rain Particles** — 40 hạt mưa rơi animation
- **Generative Ambient Sound** — Web Audio API tạo 3 lớp audio:
  - Tape hiss (brown noise filtered)
  - Cinematic drone (55Hz sub bass + pad oscillator + LFO)
  - Rain simulation (bandpass filtered white noise)
- **Journal** — textarea + localStorage save + previous entries carousel
- **Blinking Cursor** — dot indicator nhấp nháy

### Navigation
- Floating top bar, blur background khi scroll
- Active section tracking + underline animation
- **Mobile hamburger menu** với animated icon + slide-in panel
- Night mode toggle (auto-detect 22h-6h)
- Sound toggle + volume slider

### Cursor Glow
- Radial glow xanh theo chuột (desktop only, ẩn trên mobile)
- rAF throttled để performance

---

## 🏗️ Architecture

```
src/
 ├── app/
 │    ├── layout.tsx           ← Fonts: Bebas Neue, Inter (Vietnamese), Space Grotesk
 │    ├── page.tsx             ← Main orchestrator + intro + cursor glow
 │    └── globals.css          ← 200+ lines cinematic styles
 ├── components/
 │    ├── Navigation.tsx        ← Floating nav + mobile menu + audio toggle
 │    ├── CinematicIntro.tsx    ← Movie-style opening animation
 │    ├── CursorGlow.tsx        ← Mouse-following radial glow
 │    └── ParticleField.tsx     ← Floating light particles
 ├── sections/
 │    ├── HeroSection.tsx        ← Fullscreen hero: blobs, particles, parallax
 │    ├── TodaySection.tsx       ← Daily dashboard
 │    ├── FutureSelfSection.tsx  ← Principles grid
 │    ├── ArchiveSection.tsx     ← Timeline
 │    └── NightReflectionSection.tsx ← Night journal + rain
 ├── hooks/
 │    ├── useAmbientAudio.ts     ← Generative Web Audio engine (no files needed!)
 │    ├── useMouseParallax.ts    ← Mouse tracking → parallax offset
 │    ├── useRandomQuote.ts      ← Auto-rotate quotes with fade
 │    └── useTypingEffect.ts     ← Character-by-character reveal
 └── data/
      ├── quotes.json            ← 25 Vietnamese motivational quotes
      ├── principles.json        ← 15 future-self identity statements
      ├── archive.json           ← 8 journal entries (milestone/reflection/lesson)
      └── today.json             ← Habits, focus tasks, energy level
```

---

## 🔊 Audio Engine (Zero External Files)

Sử dụng **Web Audio API** để generate audio real-time — không cần file MP3:

| Layer | Technique | Feel |
|-------|-----------|------|
| Tape Hiss | Brown noise → bandpass filter @ 800Hz | Ấm, analog |
| Cinematic Drone | Sine 55Hz + Sine 82.5Hz + LFO modulation | Sâu, cinematic |
| Rain | White noise → bandpass @ 3kHz → highpass @ 500Hz | Mưa, ambient |

Toggle âm thanh bằng nút 🔊/🔇 ở navigation bar.

---

## 🎨 Visual Effects

| Effect | Technique |
|--------|-----------|
| Film Grain | SVG feTurbulence noise filter + CSS animation |
| Vignette | Radial gradient fixed overlay |
| Scanlines | CSS repeating-linear-gradient |
| Glass Cards | backdrop-filter blur + subtle border |
| Glow | text-shadow + box-shadow + drop-shadow |
| Ambient Blobs | 3x radial-gradient with blur + float keyframes |
| Particles | Framer Motion staggered floating dots |
| Cursor Glow | Radial gradient div following mouse (rAF throttled) |
| Page Transitions | AnimatePresence with blur + scale exit |

---

## 🚀 Quick Start

```bash
cd website/momentum-corner
npm install
npm run dev
```

Open → http://localhost:3005

**Deploy:** Push lên `main` branch → Vercel tự động deploy.

---

## 📦 Tech Stack

| Category | Tool |
|----------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Audio | Web Audio API (native, no deps) |
| Fonts | Google Fonts (Bebas Neue, Inter, Space Grotesk) |
| Deployment | Vercel |

**Không có paid tools. 100% free/open-source.**

---

## 📱 Responsive

- Fluid typography với `clamp()`
- Responsive grid: 1 → 2 → 3 columns
- Mobile hamburger menu
- Cursor glow ẩn trên touch devices
- Optimized scroll performance

---

*Built with calm, focus, and intention.*
