'use client';

import { motion } from 'framer-motion';
import principles from '@/data/principles.json';
import { useTheme } from '@/contexts/ThemeContext';

/* ==================================================
   IDENTITY CARD
   ================================================== */
function IdentityCard({
  principle,
  index,
}: {
  principle: string;
  index: number;
}) {
  const isLarge = index % 4 === 0;
  const isAccent = index % 3 === 0;
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      className={`p-5 md:p-8 rounded-2xl border transition-all duration-700 group hover:bg-white/[0.02]`}
      style={{
        borderColor: theme.borderSubtle,
        backgroundColor: theme.bgCard,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = theme.borderHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = theme.borderSubtle;
      }}
    >
      <div
        className="w-6 h-px mb-4 transition-all duration-500 group-hover:w-12"
        style={{
          backgroundColor: isAccent
            ? '#00FFC6'
            : theme.textFaint,
        }}
      />

      <p
        className={`leading-snug transition-colors duration-500 ${
          isLarge
            ? 'text-xl md:text-2xl'
            : 'text-base md:text-lg'
        } ${
          isAccent
            ? 'group-hover:text-accent-green/80'
            : 'group-hover:text-opacity-60'
        }`}
        style={{ 
          fontFamily: 'var(--font-space)',
          color: isAccent ? theme.textSecondary : theme.textMuted,
        }}
      >
        {principle}
      </p>
    </motion.div>
  );
}

/* ==================================================
   PHILOSOPHY BLOCK
   ================================================== */
function PhilosophyBlock() {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 px-6 text-center"
    >
      <p
        className="cinematic-title text-[clamp(2rem,6vw,5rem)] leading-none"
        style={{
          fontFamily: 'var(--font-bebas)',
          background: `linear-gradient(135deg, ${theme.gradientPhilosophyStart}, ${theme.gradientPhilosophyEnd})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.12em',
        }}
      >
        Mày Đang Trở Thành Ai
      </p>
      <p
        className="mt-6 text-sm tracking-[0.2em] uppercase"
        style={{
          color: theme.textDim,
          fontFamily: 'var(--font-space)',
        }}
      >
        Không phải người mày đã từng. Không phải người mày nên là.
      </p>
    </motion.div>
  );
}

/* ==================================================
   FUTURE SELF SECTION
   ================================================== */
export default function FutureSelfSection() {
  const theme = useTheme();

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto" style={{ background: theme.bgSection }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-4"
      >
        <div className="w-8 h-px" style={{ backgroundColor: theme.textFaint }} />
        <h2
          className="cinematic-title text-3xl tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          Bản Thân Tương Lai
        </h2>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.divider}, transparent)` }} />
      </motion.div>

      <PhilosophyBlock />

      <div className="relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]
            opacity-[0.04] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #00FFC6, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {principles.map((p, i) => (
            <IdentityCard key={p} principle={p} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mt-24 pb-12 text-center"
      >
        <div className="w-full h-px mb-8" style={{ background: `linear-gradient(90deg, transparent, ${theme.divider}, transparent)` }} />
        <p
          className="text-sm tracking-[0.25em] uppercase"
          style={{
            color: 'rgba(0, 255, 198, 0.35)',
            fontFamily: 'var(--font-space)',
          }}
        >
          Tin vào dòng thời gian.
        </p>
      </motion.div>
    </section>
  );
}
