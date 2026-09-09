import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Shield, Zap, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { luxuryAudio } from '../utils/audio';

export const ArtOfPerformance: React.FC = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const performanceChapters = [
    {
      id: 'aerodynamics',
      pillar: '01 / FLUID DYNAMICS',
      title: 'Aerodynamics as High Sculpture',
      subtitle: '860 kg of active ground downforce at 285 km/h',
      description: 'Active drag reduction systems (DRS), dual-plane rear swan-neck wings, and underfloor Venturi tunnels sculpt the invisible atmosphere into uninterrupted downward suction.',
      metricValue: '0.24 Cd',
      metricLabel: 'Aerodynamic Drag Coefficient',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop',
      icon: Wind,
    },
    {
      id: 'carbon-tub',
      pillar: '02 / MONOCOQUE RIGIDITY',
      title: 'Torsional Carbon Purity',
      subtitle: '50,000 Nm/degree of structural stiffness',
      description: 'Single-piece monolithic carbon tubs cured under 12 bars of autoclave pressure. Weighing under 100 kg while providing Formula 1-standard driver cocoon survival cells.',
      metricValue: '50k Nm/°',
      metricLabel: 'Torsional Stiffness Index',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000&auto=format&fit=crop',
      icon: Shield,
    },
    {
      id: 'acoustics',
      pillar: '03 / VISCERAL HARMONICS',
      title: 'Acoustic Orchestration',
      subtitle: 'Naturally aspirated 9,000 RPM symphonies',
      description: 'Inconel manifolds and titanium equal-length exhaust runners tuned like brass instruments. The raw mechanical vibration communicates road texture directly through carbon bucket seats.',
      metricValue: '9,000',
      metricLabel: 'Engine Rev Limit Peak RPM',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2000&auto=format&fit=crop',
      icon: Volume2,
    },
    {
      id: 'hybrid-torque',
      pillar: '04 / INSTANT KINETICS',
      title: 'Torque-Vectoring Electrification',
      subtitle: 'Sub-millisecond wheel torque allocation',
      description: 'Axial-flux electric motors paired with silicon-carbide inverters deliver instantaneous zero-lag torque to individual wheels, rotating apex corners with supernatural agility.',
      metricValue: '1.74s',
      metricLabel: '0–60 MPH Acceleration Time',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2000&auto=format&fit=crop',
      icon: Zap,
    },
  ];

  const currentChapter = performanceChapters[activeStoryIdx];

  const handleSelectChapter = (index: number) => {
    luxuryAudio.playClick(850);
    setActiveStoryIdx(index);
  };

  return (
    <section id="performance" className="relative w-full py-32 bg-[#050507] overflow-hidden border-t border-b border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={currentChapter.image}
              alt={currentChapter.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale-[40%]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-[#050507]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(217,119,6,0.1),rgba(0,0,0,0))]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Massive Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-black/40 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-300 font-semibold">
              The Art of Performance
            </span>
          </div>

          <h2 className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.92]">
            Engineered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-amber-200 to-amber-500">
              To Move You.
            </span>
          </h2>

          <p className="mt-6 text-neutral-300 font-sans-modern text-base sm:text-lg font-light max-w-2xl mx-auto">
            Beyond conventional measurements lies the poetry of absolute mechanical equilibrium.
            Where carbon, titanium, and thermodynamics merge into pure emotion.
          </p>
        </div>

        {/* Interactive Storyteller Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {performanceChapters.map((chapter, idx) => {
            const isSelected = activeStoryIdx === idx;
            const Icon = chapter.icon;
            return (
              <button
                key={chapter.id}
                onClick={() => handleSelectChapter(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(217,119,6,0.2)]'
                    : 'border-white/10 bg-black/50 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-[10px] tracking-widest uppercase text-amber-400 font-semibold">
                    {chapter.pillar}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                </div>
                <p className="font-serif-luxury font-bold text-sm sm:text-base text-white truncate">
                  {chapter.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Story Focus Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/15 bg-[#0a0a0f]/90 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold block mb-2">
                  {currentChapter.pillar}
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                  {currentChapter.title}
                </h3>
                <p className="font-serif-luxury text-amber-200/90 text-lg sm:text-xl italic mt-2">
                  {currentChapter.subtitle}
                </p>
                <p className="mt-4 font-sans-modern text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                  {currentChapter.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-8">
                <div>
                  <p className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-amber-300">
                    {currentChapter.metricValue}
                  </p>
                  <p className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest mt-1">
                    {currentChapter.metricLabel}
                  </p>
                </div>

                <div className="w-[1px] h-12 bg-white/10" />

                <div>
                  <p className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white">
                    FIA
                  </p>
                  <p className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest mt-1">
                    Homologated Purity
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group">
                <img
                  src={currentChapter.image}
                  alt={currentChapter.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-tech text-white">
                  <span>God Asura Laboratory</span>
                  <span className="text-amber-400">Phase 0{activeStoryIdx + 1}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
