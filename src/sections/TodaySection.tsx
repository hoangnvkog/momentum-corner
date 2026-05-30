'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import todayData from '@/data/today.json';
import quotes from '@/data/quotes.json';
import { useRandomQuote } from '@/hooks/useRandomQuote';
import { useTheme } from '@/contexts/ThemeContext';

/* ==================================================
   HUD CARD
   ================================================== */
function HudCard({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`glass-card p-5 md:p-6 glow-box-cyan hover:border-white/[0.08] transition-all duration-700 ${className}`}
      style={{
        background: theme.bgCard,
        borderColor: theme.borderPrimary,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 rounded-full bg-accent-green/60" />
        <h3
          className="text-xs tracking-[0.25em] uppercase"
          style={{
            color: theme.textMuted,
            fontFamily: 'var(--font-space)',
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

/* ==================================================
   HABIT STREAK
   ================================================== */
function HabitStreak({
  name,
  streak,
  icon,
  index,
}: {
  name: string;
  streak: number;
  icon: string;
  index: number;
}) {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center justify-between py-2"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span
          className="text-sm"
          style={{ fontFamily: 'var(--font-space)', color: theme.textSecondary }}
        >
          {name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent-green/60"
            />
          ))}
          {streak > 7 && (
            <span
              className="text-xs ml-1"
              style={{ color: theme.textDim }}
            >
              +{streak - 7}
            </span>
          )}
        </div>
        <span
          className="text-sm font-semibold text-accent-green/80"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          {streak}
        </span>
      </div>
    </motion.div>
  );
}

/* ==================================================
   DAILY FOCUS
   ================================================== */
function DailyFocus({ items }: { items: { label: string; done: boolean }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className={`flex items-center gap-3 py-1.5 px-3 rounded-lg transition-colors ${
            item.done
              ? 'bg-accent-green/[0.04]'
              : 'bg-white/[0.01]'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full transition-all ${
              item.done ? 'bg-accent-green' : 'bg-white/10'
            }`}
          />
          <span
            className={`text-sm transition-all ${
              item.done
                ? 'line-through text-white/30'
                : 'text-white/70'
            }`}
            style={{ fontFamily: 'var(--font-space)' }}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ==================================================
   ENERGY BAR
   ================================================== */
function EnergyBar({ level }: { level: number }) {
  const segments = Array.from({ length: 10 }, (_, i) => i < level);
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {segments.map((active, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-500"
            style={{
              backgroundColor: active
                ? level >= 8
                  ? '#00FFC6'
                  : level >= 5
                  ? '#7FDBFF'
                  : '#8B5CF6'
                : theme.timelineLine,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span
          className="text-[0.6rem] tracking-[0.2em] uppercase"
          style={{ color: theme.textFaint, fontFamily: 'var(--font-space)' }}
        >
          Năng lượng
        </span>
        <span
          className="text-[0.6rem] tracking-[0.2em] uppercase"
          style={{
            color: level >= 8 ? '#00FFC6' : level >= 5 ? '#7FDBFF' : '#8B5CF6',
            fontFamily: 'var(--font-space)',
          }}
        >
          {level}/10
        </span>
      </div>
    </div>
  );
}

/* ==================================================
   FOCUS TIMER
   ================================================== */
function FocusTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const theme = useTheme();

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress =
    mode === 'focus'
      ? 1 - time / (25 * 60)
      : 1 - time / (5 * 60);
  const circumference = 2 * Math.PI * 54;

  const toggle = () => {
    if (time <= 0) {
      setTime(mode === 'focus' ? 25 * 60 : 5 * 60);
    }
    setIsRunning((p) => !p);
  };

  const switchMode = () => {
    setIsRunning(false);
    const newMode = mode === 'focus' ? 'break' : 'focus';
    setMode(newMode);
    setTime(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const modeLabel = mode === 'focus' ? 'Focus' : 'Break';
  const startLabel = isRunning ? 'Pause' : time <= 0 ? 'Reset' : 'Start';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={theme.timelineLine}
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={mode === 'focus' ? '#00FFC6' : '#8B5CF6'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-light"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span
            className="text-[0.55rem] tracking-[0.25em] uppercase mt-1"
            style={{
              color: mode === 'focus' ? 'rgba(0,255,198,0.5)' : 'rgba(139,92,246,0.5)',
              fontFamily: 'var(--font-space)',
            }}
          >
            {modeLabel}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggle}
          className="px-5 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase
            border border-white/10 hover:border-accent-green/40 transition-all duration-300
            text-white/50 hover:text-accent-green bg-white/[0.02] hover:bg-accent-green/[0.05]"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          {startLabel}
        </button>
        <button
          onClick={switchMode}
          className="px-5 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase
            border border-white/10 hover:border-accent-purple/40 transition-all duration-300
            text-white/50 hover:text-accent-purple bg-white/[0.02] hover:bg-accent-purple/[0.05]"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Switch
        </button>
      </div>
    </div>
  );
}

/* ==================================================
   TODAY SECTION
   ================================================== */
export default function TodaySection() {
  const { quote, fade } = useRandomQuote(quotes);
  const today = todayData;
  const theme = useTheme();

  const getDayCount = () => {
    const start = new Date('2026-05-29');
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  };

  const dayCount = getDayCount();

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto" style={{ background: theme.bgSection }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="w-8 h-px bg-white/15" />
        <h2
          className="cinematic-title text-3xl tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          Today
        </h2>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.divider}, transparent)` }} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Mission */}
        <HudCard title="Current Mission" className="md:col-span-2">
          <p
            className="text-lg leading-relaxed"
            style={{
              color: theme.textSecondary,
              fontFamily: 'var(--font-space)',
            }}
          >
            {today.currentMission}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot" />
            <span
              className="text-xs tracking-[0.15em]"
              style={{ color: theme.textDim, fontFamily: 'var(--font-space)' }}
            >
              Ngày {String(dayCount).padStart(3, '0')}
            </span>
          </div>
        </HudCard>

        {/* Energy */}
        <HudCard title="Energy Level">
          <EnergyBar level={today.energyLevel} />
        </HudCard>

        {/* Daily Focus */}
        <HudCard title="Daily Focus">
          <DailyFocus items={today.dailyFocus} />
        </HudCard>

        {/* Habits */}
        <HudCard title="Habit Streaks">
          <div className="flex flex-col">
            {today.habits.map((habit, i) => (
              <HabitStreak
                key={habit.name}
                name={habit.name}
                streak={habit.streak}
                icon={habit.icon}
                index={i}
              />
            ))}
          </div>
        </HudCard>

        {/* Timer */}
        <HudCard title="Focus Timer">
          <FocusTimer />
        </HudCard>

        {/* Quote */}
        <HudCard title="Signal" className="md:col-span-2 lg:col-span-3">
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: fade ? 0.7 : 0,
              y: fade ? 0 : 10,
            }}
            transition={{ duration: 0.6 }}
            className="text-center text-lg md:text-xl italic"
            style={{
              fontFamily: 'var(--font-space)',
              color: theme.textMuted,
            }}
          >
            &ldquo;{quote}&rdquo;
          </motion.p>
        </HudCard>
      </div>
    </section>
  );
}
