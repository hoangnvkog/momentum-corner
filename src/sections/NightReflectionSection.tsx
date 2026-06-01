'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/* ==================================================
   RAIN OVERLAY
   ================================================== */
function RainOverlay() {
  const theme = useTheme();
  const drops = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1.2 + Math.random() * 0.8,
    height: 12 + Math.random() * 20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute w-px bg-accent-cyan"
          style={{
            left: `${d.left}%`,
            height: d.height,
          }}
          animate={{ y: [-20, typeof window !== 'undefined' ? window.innerHeight + 20 : 1000] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ==================================================
   TYPING SOUND — subtle tape hiss
   ================================================== */
function TypingSound() {
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      audioRef.current = new AudioContext();
      const bufferSize = 2 * audioRef.current.sampleRate;
      const noiseBuffer = audioRef.current.createBuffer(1, bufferSize, audioRef.current.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 0.003;
      }
      const whiteNoise = audioRef.current.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const gain = audioRef.current.createGain();
      gain.gain.value = 0.15;
      whiteNoise.connect(gain);
      gain.connect(audioRef.current.destination);
      whiteNoise.start();
    } catch {}
    return () => {
      try { audioRef.current?.close(); } catch {}
    };
  }, []);

  return null;
}

/* ==================================================
   JOURNAL ENTRY — English chrome / Vietnamese soul
   ================================================== */
function JournalEntry() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [text]);

  const save = () => {
    if (!text.trim()) return;
    try {
      const entries = JSON.parse(localStorage.getItem('night-journal') || '[]');
      entries.unshift({
        date: new Date().toISOString(),
        text,
        words: wordCount,
      });
      localStorage.setItem('night-journal', JSON.stringify(entries));
      setSaved(true);
      setText('');
      setTimeout(() => setSaved(false), 2500);
    } catch {}
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Hôm nay dạy mày điều gì..."
          className="w-full h-40 md:h-48 bg-transparent border rounded-2xl
            px-6 py-5 text-base leading-relaxed resize-none
            focus:outline-none transition-all duration-500"
          style={{
            fontFamily: 'var(--font-space)',
            color: theme.textSecondary,
            caretColor: theme.accentGreen,
            borderColor: theme.inputBorder,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.inputBorderFocus;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.inputBorder;
          }}
        />

        <div
          className={`absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full transition-opacity duration-300 ${
            cursorVisible ? 'opacity-60' : 'opacity-0'
          }`}
          style={{ backgroundColor: theme.accentGreen, boxShadow: `0 0 8px ${theme.accentGreen}80` }}
        />
      </div>

      {/* Bottom bar — English labels */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-4">
          <span
            className="text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ color: theme.textFaint, fontFamily: 'var(--font-space)' }}
          >
            {wordCount} words
          </span>
          <span
            className="text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ color: theme.textFaint, fontFamily: 'var(--font-space)' }}
          >
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[0.6rem] tracking-[0.2em] uppercase text-accent-green/60"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              Saved.
            </motion.span>
          )}
          <button
            onClick={save}
            disabled={!text.trim()}
            className="px-6 py-2 rounded-full text-[0.65rem] tracking-[0.25em] uppercase border transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'var(--font-space)',
              color: theme.textDim,
              borderColor: theme.borderSubtle,
            }}
            onMouseEnter={(e) => {
              if (text.trim()) {
                e.currentTarget.style.borderColor = theme.accentGreen + '4d';
                e.currentTarget.style.color = theme.accentGreen;
                e.currentTarget.style.backgroundColor = theme.accentGreen + '08';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.borderSubtle;
              e.currentTarget.style.color = theme.textDim;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Release
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   PREVIOUS ENTRIES
   ================================================== */
function PreviousEntries() {
  const [entries, setEntries] = useState<Array<{ date: string; text: string; words: number }>>([]);
  const theme = useTheme();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('night-journal') || '[]');
      setEntries(stored.slice(0, 5));
    } catch {}
  }, []);

  if (entries.length === 0) return null;

  return (
    <div className="mt-16 w-full max-w-2xl mx-auto">
      <div className="w-full h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, ${theme.divider}, transparent)` }} />
      <h4
        className="text-[0.6rem] tracking-[0.25em] uppercase mb-4"
        style={{ color: theme.textFaint, fontFamily: 'var(--font-space)' }}
      >
        Previous echoes
      </h4>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.date + i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="p-4 rounded-xl border transition-colors"
            style={{
              borderColor: theme.borderSubtle,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = theme.borderHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = theme.borderSubtle;
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[0.55rem] tracking-[0.2em] uppercase"
                style={{ color: theme.textFaint, fontFamily: 'var(--font-space)' }}
              >
                {new Date(entry.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span
                className="text-[0.55rem] tracking-[0.15em]"
                style={{ color: theme.textUltraFaint, fontFamily: 'var(--font-space)' }}
              >
                {entry.words}w
              </span>
            </div>
            <p
              className="text-sm leading-relaxed line-clamp-2"
              style={{ color: theme.textDim, fontFamily: 'var(--font-space)' }}
            >
              {entry.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================
   NIGHT REFLECTION SECTION — English chrome title, Vietnamese soul
   ================================================== */
export default function NightReflectionSection() {
  const theme = useTheme();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24" style={{ background: theme.bgSection }}>
      <RainOverlay />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
          opacity-[0.02] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${theme.accentGreen}, transparent 70%)`,
          filter: 'blur(120px)',
        }}
      />

      <TypingSound />

      {/* Section title — English for cinematic chrome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2
          className="cinematic-title text-4xl md:text-5xl tracking-[0.15em]"
          style={{
            fontFamily: 'var(--font-bebas)',
            background: `linear-gradient(135deg, ${theme.gradientNightTitleStart}, ${theme.gradientNightTitleEnd})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Night Reflection
        </h2>
        <p
          className="mt-3 text-sm"
          style={{
            color: theme.textFaint,
            fontFamily: 'var(--font-space)',
          }}
        >
          Thế giới yên tĩnh rồi. Mày nghe thấy gì?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <JournalEntry />
      </motion.div>

      <PreviousEntries />

      {/* Closing thought — Vietnamese soul */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="mt-20 text-center text-xs tracking-[0.2em]"
        style={{
          color: theme.textUltraFaint,
          fontFamily: 'var(--font-space)',
        }}
      >
        Lưu nó. Buông nó. Ngủ đi. Ngày mai là một chương mới.
      </motion.p>
    </section>
  );
}
