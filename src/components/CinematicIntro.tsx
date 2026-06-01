'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/* ==================================================
   CINEMATIC INTRO — plays once on first page load
   Feels like a movie opening: dark → light → reveal
   ================================================== */
export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0=black, 1=line, 2=text, 3=done
  const theme = useTheme();
  const isDark = theme.textPrimary.startsWith('rgba(255');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);    // Show line
    const t2 = setTimeout(() => setPhase(2), 1800);   // Show text
    const t3 = setTimeout(() => {
      setPhase(3);
      setTimeout(onComplete, 800);
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase >= 2 ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center`}
          style={{
            backgroundColor: isDark ? '#000' : '#FAFAFA',
          }}>
          {/* Animated horizontal line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 1 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-accent-green to-transparent mb-6"
          />

          {/* Brand text reveal */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={phase >= 2 ? {
              opacity: 0.6,
              letterSpacing: '0.25em',
            } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm uppercase tracking-widest"
            style={{
              fontFamily: 'var(--font-space)',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            }}
          >
            Momentum Corner
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
