'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/* ==================================================
   CURSOR GLOW — subtle radial glow follows mouse
   Only on desktop (hidden on mobile)
   ================================================== */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isDark = theme.textPrimary.startsWith('rgba(255');

  useEffect(() => {
    // Detect if device has fine pointer (desktop)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsVisible(true);

    let ticking = false;
    const handleMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setPos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9997] mix-blend-screen"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        background: isDark
          ? 'radial-gradient(circle, rgba(0,255,198,0.04) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0,184,148,0.06) 0%, transparent 70%)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    />
  );
}
