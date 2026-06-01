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
      className={`glass-card p-5 md:p-6 glow-box-cyan transition-all duration-700 ${className}`}
      style={{
        background: theme.bgCard,
        borderColor: theme.borderPrimary,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 rounded-full" style={{ backgroundColor: theme.accentGreen + '99' }} />
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
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accentGreen + '99' }}
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
          className="text-sm font-semibold"
          style={{ fontFamily: 'var(--font-space)', color: theme.accentGreen + 'cc' }}
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
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: items.indexOf(item) * 0.08 }}
          className="flex items-center gap-3 py-1.5 px-3 rounded-lg transition-colors"
          style={{
            backgroundColor: item.done ? theme.accentGreen + '0a' : 'transparent',
          }}
        >
          <div
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: item.done ? theme.accentGreen : theme.textUltraFaint,
            }}
          />
          <span
            className="text-sm transition-all"
            style={{
              fontFamily: 'var(--font-space)',
              color: item.done ? theme.textDim : theme.textSecondary,
              textDecoration: item.done ? 'line-through' : 'none',
            }}
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
                  ? theme.accentGreen
                  : level >= 5
                  ? theme.accentCyan
                  : theme.accentPurple
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
            color: level >= 8 ? theme.accentGreen : level >= 5 ? theme.accentCyan : theme.accentPurple,
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
  const focusColor = mode === 'focus' ? theme.accentGreen : theme.accentPurple;
  const focusColorHalf = mode === 'focus' ? theme.accentGreen + '80' : theme.accentPurple + '80';

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
            stroke={focusColor}
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
              color: focusColorHalf,
              fontFamily: 'var(--font-space)',
            }}
          >
            {modeLabel}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <TimerButton
          label={startLabel}
          accentColor={theme.accentGreen}
          theme={theme}
          onClick={toggle}
        />
        <TimerButton
          label="Switch"
          accentColor={theme.accentPurple}
          theme={theme}
          onClick={switchMode}
        />
      </div>
    </div>
  );
}

function TimerButton({
  label,
  accentColor,
  theme,
  onClick,
}: {
  label: string;
  accentColor: string;
  theme: ReturnType<typeof import('@/contexts/ThemeContext').useTheme> extends infer T ? T : any;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300"
      style={{
        fontFamily: 'var(--font-space)',
        color: theme.focusBtnText,
        borderColor: theme.focusBtnBorder,
        backgroundColor: theme.focusBtnBg,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor + '66';
        e.currentTarget.style.color = accentColor;
        e.currentTarget.style.backgroundColor = accentColor + '0d';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.focusBtnBorder;
        e.currentTarget.style.color = theme.focusBtnText;
        e.currentTarget.style.backgroundColor = theme.focusBtnBg;
      }}
    >
      {label}
    </button>
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
        <div className="w-8 h-px" style={{ backgroundColor: theme.dividerLine }} />
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
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: theme.accentGreen }} />
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
