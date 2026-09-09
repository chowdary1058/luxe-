import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, BatteryCharging, Gauge, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../types';
import { SHOWROOM_VEHICLES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface ElectricFutureProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const ElectricFuture: React.FC<ElectricFutureProps> = ({ onSelectVehicle }) => {
  const evVehicles = SHOWROOM_VEHICLES.filter(
    (v) => v.category === 'Electric' || v.specs.fuelType === 'Electric' || v.specs.fuelType === 'Hybrid'
  );

  const [selectedEvIndex, setSelectedEvIndex] = useState(0);
  const currentEv = evVehicles[selectedEvIndex] || evVehicles[0];

  return (
    <section id="electric-future" className="relative w-full py-32 bg-[#050508] overflow-hidden border-t border-b border-white/5">
      {/* Electric Subtle Atmospheric Glows (Restrained & Sophisticated) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-950/20 via-amber-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md mb-4">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-cyan-300 font-semibold">
                05 / KINETIC INTELLIGENCE
              </span>
            </div>

            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
              The Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-cyan-200 to-amber-300">
                Is Already Moving.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans-modern text-sm text-neutral-400 font-light leading-relaxed">
            Quiet sovereigns and 2,000+ horsepower record-breakers. Instantaneous torque vectoring delivers
            physics-defying velocity without combustion acoustic compromises.
          </p>
        </div>

        {/* Animated Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-[#09090f] border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.08)] text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
            <p className="font-serif-luxury text-4xl sm:text-5xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              800+ <span className="text-xl font-normal text-cyan-400">KM</span>
            </p>
            <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-neutral-400 mt-2 font-semibold">
              Cruising Range Capacity
            </p>
            <span className="text-[11px] font-sans-modern text-neutral-400 mt-1 block">
              900V Silicon Carbide Architecture
            </span>
          </div>

          <div className="p-8 rounded-2xl bg-[#09090f] border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.08)] text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
            <p className="font-serif-luxury text-4xl sm:text-5xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
              1.74 <span className="text-xl font-normal text-amber-400">SEC</span>
            </p>
            <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-neutral-400 mt-2 font-semibold">
              0–60 Acceleration
            </p>
            <span className="text-[11px] font-sans-modern text-neutral-400 mt-1 block">
              Zero Planetary Wheel Slip
            </span>
          </div>

          <div className="p-8 rounded-2xl bg-[#09090f] border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <p className="font-serif-luxury text-4xl sm:text-5xl font-black text-white tracking-tight group-hover:text-neutral-200 transition-colors">
              100% <span className="text-xl font-normal text-neutral-400">SOVEREIGN</span>
            </p>
            <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-neutral-400 mt-2 font-semibold">
              Whisper-Isolation Cabin
            </p>
            <span className="text-[11px] font-sans-modern text-neutral-400 mt-1 block">
              Double-Glazed Acoustic Glazing
            </span>
          </div>
        </div>

        {/* Featured EV Vehicle Stage with Selector */}
        <div className="rounded-3xl border border-white/10 bg-[#09090f] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Big Media Viewport */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden">
              <motion.img
                key={currentEv.id}
                initial={{ scale: 1.06, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={currentEv.heroImage}
                alt={currentEv.model}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-110 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#09090f]" />

              <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300 font-mono-tech text-xs uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentEv.category} Flagship</span>
              </div>
            </div>

            {/* Right: Telemetry & Model Details */}
            <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono-tech text-xs tracking-widest uppercase text-cyan-400 block mb-1">
                  {currentEv.brand} Atelier
                </span>
                <h3 className="font-serif-luxury text-3xl font-extrabold text-white uppercase">
                  {currentEv.model}
                </h3>
                <p className="font-serif-luxury text-xl font-bold text-amber-300 mt-1">
                  {currentEv.formattedPrice}
                </p>
                <p className="mt-4 font-sans-modern text-xs text-neutral-300 font-light leading-relaxed">
                  {currentEv.description}
                </p>
              </div>

              <div className="my-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 font-mono-tech text-xs">
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Peak Power</span>
                  <span className="font-serif-luxury text-xl font-bold text-white mt-0.5 block">
                    {currentEv.specs.horsepower} HP
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">0–60 MPH</span>
                  <span className="font-serif-luxury text-xl font-bold text-cyan-300 mt-0.5 block">
                    {currentEv.specs.acceleration}s
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Drivetrain</span>
                  <span className="text-neutral-200 block truncate">{currentEv.specs.driveType}</span>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Top Velocity</span>
                  <span className="text-neutral-200 block">{currentEv.specs.topSpeed} MPH</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    luxuryAudio.playClick(800);
                    onSelectVehicle(currentEv);
                  }}
                  className="w-full py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-sans-modern text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore {currentEv.model}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Switch Between Available Electrified Vehicles */}
                <div className="flex items-center gap-2 pt-2">
                  {evVehicles.map((ev, idx) => (
                    <button
                      key={ev.id}
                      onClick={() => {
                        luxuryAudio.playClick(850);
                        setSelectedEvIndex(idx);
                      }}
                      className={`flex-1 py-1.5 rounded-md font-mono-tech text-[10px] uppercase border transition-all ${
                        selectedEvIndex === idx
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {ev.brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
