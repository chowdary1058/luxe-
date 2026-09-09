import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Compass, Play, ChevronRight, Gauge, Shield, Flame } from 'lucide-react';
import { luxuryAudio } from '../utils/audio';

interface HeroProps {
  onExploreCollection: () => void;
  onDiscoverBrands: () => void;
  onOpenVideoIntro: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onDiscoverBrands,
  onOpenVideoIntro,
}) => {
  const [activeBackdrop, setActiveBackdrop] = useState(0);

  // Cinematic architectural showroom backdrops
  const heroShowroomViews = [
    {
      title: 'Obsidian Atelier Studio',
      car: 'God Asura Sovereign Flagship',
      image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2400&auto=format&fit=crop',
      stats: '1,800 HP • V16 Hybrid',
    },
    {
      title: 'Stuttgart Precision Vault',
      car: 'Porsche 911 GT3 RS Weissach',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2400&auto=format&fit=crop',
      stats: '518 HP • 9,000 RPM',
    },
    {
      title: 'Maranello Scuderia Pavilion',
      car: 'Ferrari SF90 XX Stradale',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2400&auto=format&fit=crop',
      stats: '1,016 CV • e4WD F1 Tech',
    },
  ];

  const currentView = heroShowroomViews[activeBackdrop];

  const handleBackdropChange = (index: number) => {
    luxuryAudio.playClick(900);
    setActiveBackdrop(index);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#070709]">
      {/* Dynamic Background Showroom Image with Parallax & Soft Volumetric Lighting */}
      <div className="absolute inset-0 z-0">
        {heroShowroomViews.map((view, idx) => (
          <motion.div
            key={view.title}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: activeBackdrop === idx ? 1 : 0,
              scale: activeBackdrop === idx ? 1 : 1.08,
            }}
            transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <img
              src={view.image}
              alt={view.car}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.12]"
            />
          </motion.div>
        ))}

        {/* Sophisticated Dark Cinematic Gradients & Studio Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))]" />

        {/* Reflective Studio Floor Horizon Grid Line */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#070709] to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full flex flex-col justify-between min-h-screen">
        {/* Top Space Reservation */}
        <div className="h-6" />

        {/* Center Editorial Headlines & Storytelling */}
        <div className="max-w-3xl my-auto">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-black/40 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.3em] uppercase text-amber-300 font-semibold">
              The World of Automotive Excellence
            </span>
          </motion.div>

          {/* Huge Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-luxury text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-white leading-[0.92] uppercase select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            Drive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-amber-200 to-amber-500">
              The Extraordinary.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 sm:mt-8 text-neutral-300 font-sans-modern text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl"
          >
            Explore the world's most remarkable automobiles, brought together in one
            extraordinary digital showroom. Handcrafted provenance, limitless speed, and bespoke atelier luxury.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <button
              onClick={() => {
                luxuryAudio.playClick(700);
                onExploreCollection();
              }}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-sans-modern font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(217,119,6,0.5)] flex items-center gap-3"
            >
              <span>Explore Collection</span>
              <ChevronRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                luxuryAudio.playClick(600);
                onDiscoverBrands();
              }}
              className="px-8 py-4 rounded-full border border-white/20 hover:border-amber-400/60 bg-white/5 hover:bg-amber-400/10 text-white font-sans-modern font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Discover Brands</span>
            </button>

            {/* Watch Film Button */}
            <button
              onClick={() => {
                luxuryAudio.playClick(850);
                onOpenVideoIntro();
              }}
              className="flex items-center gap-2 text-xs font-sans-modern tracking-widest text-neutral-400 hover:text-amber-300 transition-colors py-2 px-3"
            >
              <div className="w-8 h-8 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400 translate-x-0.5" />
              </div>
              <span className="uppercase font-semibold text-[11px]">Brand Film</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar: Showroom Angle Switcher + Spec Ticker + Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/10"
        >
          {/* Active Car & Studio Selector */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              Current Spotlight Studio
            </span>
            <div className="flex items-center gap-3">
              {heroShowroomViews.map((view, idx) => (
                <button
                  key={view.title}
                  onClick={() => handleBackdropChange(idx)}
                  className={`text-left px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                    activeBackdrop === idx
                      ? 'border-amber-400/60 bg-amber-400/10 text-amber-300'
                      : 'border-white/10 text-neutral-400 hover:text-white bg-black/40'
                  }`}
                >
                  <p className="font-sans-modern font-semibold text-xs tracking-wider">{view.car}</p>
                  <p className="font-mono-tech text-[10px] text-neutral-400">{view.stats}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center gap-8 text-neutral-300">
            <div>
              <p className="font-serif-luxury text-2xl font-bold text-amber-300">2,107 <span className="text-sm font-sans-modern font-normal text-neutral-400">HP</span></p>
              <p className="font-mono-tech text-[10px] tracking-widest uppercase text-neutral-400">Apex Power</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <p className="font-serif-luxury text-2xl font-bold text-amber-300">1.74 <span className="text-sm font-sans-modern font-normal text-neutral-400">SEC</span></p>
              <p className="font-mono-tech text-[10px] tracking-widest uppercase text-neutral-400">0–60 Record</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <p className="font-serif-luxury text-2xl font-bold text-amber-300">100% <span className="text-sm font-sans-modern font-normal text-neutral-400">VIP</span></p>
              <p className="font-mono-tech text-[10px] tracking-widest uppercase text-neutral-400">White-Glove Concierge</p>
            </div>
          </div>

          {/* Subtle Scroll Down Indicator */}
          <button
            onClick={() => {
              const el = document.getElementById('featured');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-neutral-400 hover:text-amber-400 transition-colors group cursor-pointer"
          >
            <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase">Scroll to Discover</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400 group-hover:translate-y-1 transition-all">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
