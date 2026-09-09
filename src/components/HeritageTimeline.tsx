import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Calendar, Trophy, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { HERITAGE_MILESTONES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

export const HeritageTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = HERITAGE_MILESTONES[activeIdx];

  const handleSelect = (idx: number) => {
    luxuryAudio.playClick(850);
    setActiveIdx(idx);
  };

  return (
    <section id="heritage" className="relative w-full py-28 bg-[#07070a] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold mb-2">
              <History className="w-3.5 h-3.5" />
              <span>06 / CHRONICLES OF EXCELLENCE</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase">
              Automotive Heritage
            </h2>
          </div>
          <p className="max-w-md font-sans-modern text-sm text-neutral-400 font-light leading-relaxed">
            Seven decades of relentless obsession. Trace the seminal eras that forged modern
            motorsport dominance and ultra-luxury coachbuilding.
          </p>
        </div>

        {/* Interactive Era Milestone Selector Ribbon */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {HERITAGE_MILESTONES.map((era, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={era.year}
                onClick={() => handleSelect(idx)}
                className={`relative px-6 py-3 rounded-full border transition-all duration-300 whitespace-nowrap text-left ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/10 text-white shadow-[0_0_20px_rgba(217,119,6,0.3)]'
                    : 'border-white/10 bg-black/40 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="font-serif-luxury text-lg font-bold block">
                  {era.year}
                </span>
                <span className="font-sans-modern text-[11px] text-amber-400/80 block uppercase tracking-wider">
                  {era.title.split(' ')[0]} {era.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Exhibition Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-[#0b0b10] p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            {/* Left: Milestone Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-serif-luxury text-5xl sm:text-6xl font-black text-amber-400/30 select-none block mb-2">
                  {current.year}
                </span>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                  {current.title}
                </h3>

                <p className="mt-4 font-sans-modern text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                  {current.description}
                </p>

                <div className="mt-6 p-4 rounded-xl bg-black/50 border border-white/5 font-mono-tech text-xs text-amber-300">
                  <span className="text-neutral-400 uppercase tracking-wider block mb-1">Archival Breakthrough Record:</span>
                  <span>{current.engineeringBreakthrough}</span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  disabled={activeIdx === 0}
                  onClick={() => handleSelect(activeIdx - 1)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono-tech uppercase text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Era</span>
                </button>

                <span className="font-mono-tech text-xs text-neutral-400">
                  {activeIdx + 1} / {HERITAGE_MILESTONES.length}
                </span>

                <button
                  disabled={activeIdx === HERITAGE_MILESTONES.length - 1}
                  onClick={() => handleSelect(activeIdx + 1)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono-tech uppercase text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span>Next Era</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Archival Imagery */}
            <div className="lg:col-span-6">
              <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <img
                  src={current.image}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale-[25%] contrast-115 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-neutral-300">
                  <span>Archival Provenance Vault</span>
                  <span className="text-amber-400">Era {current.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
