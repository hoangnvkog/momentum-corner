'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import archiveData from '@/data/archive.json';

/* ==================================================
   TIMELINE ENTRY
   ================================================== */
function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof archiveData)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeColors: Record<string, string> = {
    milestone: '#00FFC6',
    reflection: '#7FDBFF',
    lesson: '#8B5CF6',
  };

  const typeLabels: Record<string, string> = {
    milestone: 'Cột mốc',
    reflection: 'Chiêm nghiệm',
    lesson: 'Bài học',
  };

  const color = typeColors[entry.type] || '#7FDBFF';
  const label = typeLabels[entry.type] || entry.type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      className="relative group"
    >
      <div className="flex gap-3 md:gap-6">
        <div className="flex flex-col items-center">
          <div
            className="w-3 h-3 rounded-full transition-all duration-500 group-hover:scale-125"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}40`,
            }}
          />
          {index < archiveData.length - 1 && (
            <div
              className="w-px h-full min-h-[80px] mt-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            />
          )}
        </div>

        <div className="flex-1 pb-12">
          <div
            className="glass-card p-6 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-[0.6rem] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: `${color}30`,
                    color: `${color}`,
                    fontFamily: 'var(--font-space)',
                  }}
                >
                  {label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-space)' }}
                >
                  {entry.date}
                </span>
              </div>
            </div>

            <h4
              className="text-lg mb-2 transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-space)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {entry.title}
            </h4>

            <p
              className={`text-sm leading-relaxed transition-all duration-500 ${
                isExpanded ? '' : 'line-clamp-2'
              }`}
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontFamily: 'var(--font-space)',
              }}
            >
              {entry.content}
            </p>

            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="mt-2"
              >
                <span
                  className="text-[0.6rem] tracking-[0.15em]"
                  style={{
                    color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'var(--font-space)',
                  }}
                >
                  Nhấn để mở rộng
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==================================================
   ARCHIVE SECTION
   ================================================== */
export default function ArchiveSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto">
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
          Lưu Trữ
        </h2>
        <div className="flex-1 h-px section-divider" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-sm mb-12 pl-14"
        style={{
          color: 'rgba(255,255,255,0.25)',
          fontFamily: 'var(--font-space)',
        }}
      >
        Kho ký ức. Mọi cột mốc, mọi bài học, mọi khoảnh khắc định hình con đường.
      </motion.p>

      <div className="relative">
        <div
          className="absolute top-0 left-4 w-px h-full opacity-20"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,255,198,0.1), rgba(139,92,246,0.1), transparent)',
          }}
        />

        {archiveData.map((entry, i) => (
          <TimelineEntry key={entry.date} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
