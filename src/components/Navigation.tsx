'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';

interface Props {
  isNight: boolean;
  onToggleNight: () => void;
}

function AmbientAudio({ isMuted, volume }: { isMuted: boolean; volume: number }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.src = 'https://cdn.pixabay.com/audio/2022/03/24/audio_0782345687.mp3';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, [isMuted, volume]);

  return null;
}

export default function Navigation({ isNight, onToggleNight }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [showVolume, setShowVolume] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = ['today', 'future-self', 'archive', 'night'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // NAV LABELS = English (UI chrome, cinematic feel)
  const navItems = [
    { id: 'today', label: 'Today' },
    { id: 'future-self', label: 'Future Self' },
    { id: 'archive', label: 'Archive' },
    { id: 'night', label: 'Night' },
  ];

  return (
    <>
      <AmbientAudio isMuted={muted} volume={volume} />

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 3 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green transition-all duration-500 group-hover:shadow-[0_0_8px_rgba(0,255,198,0.6)]" />
            <span
              className="text-xs tracking-[0.25em] uppercase transition-colors duration-500
                text-white/40 group-hover:text-white/70"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Momentum
            </span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-500
                  ${
                    activeSection === item.id
                      ? 'text-accent-green'
                      : 'text-white/25 hover:text-white/50'
                  }`}
                style={{ fontFamily: 'var(--font-space)' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleNight}
              className="p-1.5 rounded-full hover:bg-white/[0.05] transition-all duration-300"
            >
              {isNight ? (
                <Sun className="w-4 h-4 text-white/30 hover:text-white/60 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-white/30 hover:text-white/60 transition-colors" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setMuted(!muted)}
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
                className="p-1.5 rounded-full hover:bg-white/[0.05] transition-all duration-300"
              >
                {muted ? (
                  <VolumeX className="w-4 h-4 text-white/30 hover:text-white/60 transition-colors" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white/30 hover:text-white/60 transition-colors" />
                )}
              </button>

              <AnimatePresence>
                {showVolume && !muted && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 p-3 glass-card"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 accent-accent-green"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
