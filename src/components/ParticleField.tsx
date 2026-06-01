'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

/* ==================================================
   PARTICLE FIELD — floating light particles
   Creates depth and atmosphere in the hero section
   ================================================== */
export default function ParticleField({ count = 30 }: { count?: number }) {
  const theme = useTheme();
  const isDark = theme.textPrimary.startsWith('rgba(255');

  const particles = useMemo(() => {
    // In dark mode: white-ish particles with cyan glow
    // In light mode: dark-ish particles with green accent glow
    const particleColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.3)';
    const glowColor = isDark ? 'rgba(0,255,198,0.3)' : 'rgba(0,184,148,0.2)';

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.3,
      color: particleColor,
      glow: glowColor,
    }));
  }, [count, isDark]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.glow}`,
          }}
          animate={{
            y: [0, -15 - Math.random() * 20, 0],
            opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
