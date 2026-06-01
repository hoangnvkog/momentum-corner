'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
  isNight: boolean;
  onToggleNight: () => void;
}

export default function Navigation({ isNight, onToggleNight }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggle, isPlaying, volume, setVolume } = useAmbientAudio();
  const theme = useTheme();

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
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'today', label: 'Today' },
    { id: 'future-self', label: 'Future Self' },
    { id: 'archive', label: 'Archive' },
    { id: 'night', label: 'Night' },
  ];

  const navTextColor = isNight ? 'text-white/40 group-hover:text-white/70' : 'text-black/40 group-hover:text-black/70';
  const navLinkBase = isNight ? 'text-white/25 group-hover:text-white/50' : 'text-black/25 group-hover:text-black/50';
  const iconColor = isNight ? 'text-white/30 hover:text-white/60' : 'text-black/30 hover:text-black/60';
  const mobileMenuBg = isNight ? 'bg-bg-primary/95' : 'bg-[#FAFAFA]/95';
  const mobileMenuBorder = isNight ? 'border-white/[0.04]' : 'border-black/[0.06]';
  const mobileMenuText = isNight ? 'text-white/30' : 'text-black/30';
  const mobileIconBg = isNight ? 'hover:bg-white/[0.05]' : 'hover:bg-black/[0.05]';
  const mobileIconLine = isNight ? 'bg-white/40' : 'bg-black/40';
  const navBorder = isNight ? 'border-white/[0.06]' : 'border-black/[0.08]';

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 3 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? `backdrop-blur-xl border-b ${navBorder}`
            : 'bg-transparent'
        }`}
        style={{
          backgroundColor: scrolled ? theme.navBg : 'transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-1.5 h-1.5 rounded-full transition-all duration-500" style={{ backgroundColor: theme.accentGreen, boxShadow: `0 0 8px ${theme.accentGreen}99` }} />
            <span
              className={`text-xs tracking-[0.25em] uppercase transition-colors duration-500 ${navTextColor}`}
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Momentum
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-500 group"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                <span className={activeSection === item.id ? 'text-accent-green' : navLinkBase}>
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent-green transition-all duration-500 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-full transition-colors ${mobileIconBg}`}
            >
              <div className="w-4 h-4 flex flex-col justify-center gap-1">
                <span className={`block h-px ${mobileIconLine} transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
                <span className={`block h-px ${mobileIconLine} transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
              </div>
            </button>

            {/* Night/Light mode toggle */}
            <button
              onClick={onToggleNight}
              className={`p-1.5 rounded-full transition-all duration-300 ${mobileIconBg}`}
              title={isNight ? 'Chế độ sáng' : 'Chế độ tối'}
            >
              {isNight ? (
                <Sun className={`w-4 h-4 ${iconColor} transition-colors`} />
              ) : (
                <Moon className={`w-4 h-4 ${iconColor} transition-colors`} />
              )}
            </button>

            {/* Sound toggle + volume slider wrapper */}
            <div
              className="relative"
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              <button
                onClick={toggle}
                className={`p-1.5 rounded-full transition-all duration-300 ${mobileIconBg}`}
                title="Âm thanh nền"
              >
                {isPlaying ? (
                  <Volume2 className="w-4 h-4 text-accent-green/60 hover:text-accent-green transition-colors" />
                ) : (
                  <VolumeX className={`w-4 h-4 ${iconColor} transition-colors`} />
                )}
              </button>

              <AnimatePresence>
                {showVolume && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 p-3 glass-card"
                    style={{
                      background: theme.bgCard,
                      borderColor: theme.borderPrimary,
                    }}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 accent-accent-green cursor-pointer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${mobileMenuBg} backdrop-blur-xl border-t ${mobileMenuBorder}`}
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left text-xs tracking-[0.2em] uppercase py-1 transition-colors ${
                      activeSection === item.id
                        ? 'text-accent-green'
                        : mobileMenuText
                    }`}
                    style={{ fontFamily: 'var(--font-space)' }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
