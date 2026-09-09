import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Volume2, Sparkles, Activity, Shield } from 'lucide-react';
import { Vehicle } from '../types';
import { luxuryAudio } from '../utils/audio';

interface FeaturedVehicleProps {
  vehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onConfigureVehicle: (vehicle: Vehicle) => void;
}

export const FeaturedVehicle: React.FC<FeaturedVehicleProps> = ({
  vehicle,
  onSelectVehicle,
  onConfigureVehicle,
}) => {
  const handleRevEngine = () => {
    luxuryAudio.playEngineRev('V8');
  };

  return (
    <section id="featured" className="relative w-full py-32 bg-[#08080b] overflow-hidden border-t border-b border-white/5">
      {/* Background Architectural Grid Lines and Ambient Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(217,119,6,0.08),rgba(0,0,0,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Number Tag */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-amber-400 text-sm tracking-[0.3em] font-bold">
              01 / FEATURED
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-sans-modern text-xs text-neutral-400 tracking-widest uppercase">
              Current Spotlight Masterpiece
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs text-neutral-400">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Maranello & Weissach Allocations</span>
          </div>
        </div>

        {/* Big Full-Width Vehicle Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c10] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Main Cinematic Vehicle Photography */}
          <div className="relative h-[480px] sm:h-[580px] lg:h-[680px] overflow-hidden group">
            <motion.img
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              src={vehicle.heroImage}
              alt={`${vehicle.brand} ${vehicle.model}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c10]/80 via-transparent to-[#0c0c10]/30" />

            {/* Top Badge */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
              <span className="px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-black/60 backdrop-blur-md font-mono-tech text-[11px] text-amber-300 font-semibold tracking-widest uppercase">
                {vehicle.editionBadge || 'Weissach Lightweight Spec'}
              </span>
            </div>

            {/* Sound Ignition Pill on Top Right */}
            <button
              onClick={handleRevEngine}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white hover:text-amber-300 hover:border-amber-400/60 transition-all group/rev"
              title="Listen to Exhaust Audio"
            >
              <Volume2 className="w-4 h-4 text-amber-400 group-hover/rev:scale-110 transition-transform" />
              <span className="font-mono-tech text-xs tracking-wider uppercase">9,000 RPM Rev</span>
            </button>

            {/* Overlaid Vehicle Information in Lower Stage */}
            <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
              {/* Left Side: Brand, Model & Quote */}
              <div className="max-w-xl">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6 }}
                  className="font-mono-tech text-xs tracking-[0.4em] uppercase text-amber-400 font-semibold block mb-2"
                >
                  {vehicle.brand} • {vehicle.year}
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none drop-shadow-lg"
                >
                  {vehicle.model}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-4 font-sans-modern text-neutral-300 text-sm sm:text-base font-light line-clamp-2 max-w-lg"
                >
                  {vehicle.storyQuote}
                </motion.p>
              </div>

              {/* Right Side: Key Specs Animating Upward */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-10">
                {/* Spec 1: Engine */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="font-mono-tech text-[10px] tracking-[0.25em] text-neutral-400 uppercase">Engine</p>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">4.0L Flat-Six</p>
                  <p className="font-sans-modern text-[11px] text-amber-400/90 font-medium">Naturally Aspirated</p>
                </motion.div>

                {/* Spec 2: Horsepower */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="font-mono-tech text-[10px] tracking-[0.25em] text-neutral-400 uppercase">Power</p>
                  <p className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">518 HP</p>
                  <p className="font-sans-modern text-[11px] text-neutral-400">@ 8,500 rpm</p>
                </motion.div>

                {/* Spec 3: 0-60 Acceleration */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="font-mono-tech text-[10px] tracking-[0.25em] text-neutral-400 uppercase">0–60 MPH</p>
                  <p className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-white mt-1">3.0s</p>
                  <p className="font-sans-modern text-[11px] text-neutral-400">Launch Control</p>
                </motion.div>

                {/* Spec 4: Price & CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col gap-2"
                >
                  <button
                    onClick={() => {
                      luxuryAudio.playClick(800);
                      onSelectVehicle(vehicle);
                    }}
                    className="group px-6 py-3.5 rounded-full bg-white text-black hover:bg-amber-400 font-sans-modern font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <span>EXPLORE VEHICLE</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <button
                    onClick={() => {
                      luxuryAudio.playClick(750);
                      onConfigureVehicle(vehicle);
                    }}
                    className="text-center font-mono-tech text-[11px] text-neutral-400 hover:text-amber-400 tracking-wider transition-colors uppercase underline underline-offset-4"
                  >
                    Bespoke Atelier Configurator
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
