'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

function AmbientBlobs() {
  return (
    <>
      <div
        className="ambient-blob"
        style={{
          width: 600,
          height: 600,
          top: '10%',
          left: '20%',
          background: 'radial-gradient(circle, #00FFC6, transparent 70%)',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: 500,
          height: 500,
          bottom: '10%',
          right: '10%',
          background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: 400,
          height: 400,
          top: '50%',
          left: '60%',
          background: 'radial-gradient(circle, #7FDBFF, transparent 70%)',
          animationDelay: '-13s',
        }}
      />
    </>
  );
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(15, 17, 21, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(22, 27, 34, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #050505 0%, #0F1115 50%, #050505 100%)
          `,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 40%, rgba(0, 255, 198, 0.03) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 60%, rgba(127, 219, 255, 0.03) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.03) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 40%, rgba(0, 255, 198, 0.03) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  );
}

export default function HeroSection({ onEnter }: { onEnter: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallax = useMouseParallax(0.015);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const getDayCount = () => {
    const start = new Date('2026-05-29');
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  };

  const dayCount = getDayCount();

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <VideoBackground />
      <AmbientBlobs />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6"
        style={{ x: parallax.x, y: parallax.y }}
      >
        {/* Main Title — GIỮ TIẾNG ANH để tạo cảm xúc điện ảnh tối đa */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-center"
        >
          <h1
            className="cinematic-title text-[clamp(3rem,12vw,10rem)] leading-none glow-green"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            You Are Still{' '}
            <span className="text-accent-green">Becoming</span>
          </h1>
        </motion.div>

        {/* Subtitle — tiếng Việt cho nội dung cá nhân */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="mt-6 text-center"
          style={{
            fontFamily: 'var(--font-space)',
            fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.15em',
          }}
        >
          Ngày {String(dayCount).padStart(3, '0')} xây dựng phiên bản tương lai.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isLoaded ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
          className="section-divider w-48 mt-8"
        />

        {/* Enter button — GIỮ TIẾNG ANH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
          className="mt-10"
        >
          <button
            onClick={onEnter}
            className="group relative px-10 py-3 rounded-full border border-white/10
              hover:border-accent-green/40 transition-all duration-500
              bg-white/[0.02] hover:bg-accent-green/[0.05]"
          >
            <span
              className="text-sm tracking-[0.3em] uppercase transition-colors duration-500
                text-white/50 group-hover:text-accent-green"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Enter
            </span>

            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                transition-opacity duration-700"
              style={{
                boxShadow: '0 0 30px rgba(0, 255, 198, 0.1), inset 0 0 30px rgba(0, 255, 198, 0.03)',
              }}
            />
          </button>
        </motion.div>

        {/* Scroll hint — GIỮ TIẾNG ANH */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 0.3 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span
            className="text-[0.6rem] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-space)' }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-6 bg-white/20"
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #050505, transparent)',
        }}
      />
    </section>
  );
}
