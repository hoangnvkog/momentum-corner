'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/sections/HeroSection';
import TodaySection from '@/sections/TodaySection';
import FutureSelfSection from '@/sections/FutureSelfSection';
import ArchiveSection from '@/sections/ArchiveSection';
import NightReflectionSection from '@/sections/NightReflectionSection';
import Navigation from '@/components/Navigation';
import CinematicIntro from '@/components/CinematicIntro';
import CursorGlow from '@/components/CursorGlow';

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 22 || hour < 6);
    // Skip intro on return visits
    const visited = sessionStorage.getItem('mc-intro-seen');
    if (visited) setIntroDone(true);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('mc-intro-seen', '1');
    setIntroDone(true);
  };

  return (
    <main className={`relative min-h-screen transition-colors duration-1000 ${isNight ? 'bg-black' : 'bg-bg-primary'}`}>
      {/* Cursor glow effect — desktop only */}
      <CursorGlow />

      {/* Cinematic intro animation */}
      <AnimatePresence>
        {!introDone && <CinematicIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main navigation */}
      <Navigation isNight={isNight} onToggleNight={() => setIsNight(!isNight)} />

      {/* Hero → Content transition */}
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="hero"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection onEnter={() => setEntered(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-24" style={{ background: 'linear-gradient(to bottom, #050505, transparent)' }} />

            <div id="today"><TodaySection /></div>
            <div className="section-divider max-w-6xl mx-auto" />

            <div id="future-self"><FutureSelfSection /></div>
            <div className="section-divider max-w-6xl mx-auto" />

            <div id="archive"><ArchiveSection /></div>

            <div id="night"><NightReflectionSection /></div>

            {/* Footer */}
            <footer className="py-12 px-6 text-center">
              <div className="section-divider w-24 mx-auto mb-6" />
              <p className="text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'var(--font-space)' }}>
                Momentum Corner — {new Date().getFullYear()}
              </p>
              <p className="mt-2 text-[0.55rem] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-space)' }}>
                A digital sanctuary for the becoming.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
