import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitCompare, Plus, X, Gauge, Zap, Check, ArrowRight, Shield } from 'lucide-react';
import { Vehicle } from '../types';
import { SHOWROOM_VEHICLES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface VehicleComparisonProps {
  comparedVehicles: Vehicle[];
  onRemoveVehicle: (vehicleId: string) => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const VehicleComparison: React.FC<VehicleComparisonProps> = ({
  comparedVehicles,
  onRemoveVehicle,
  onAddVehicle,
  onSelectVehicle,
}) => {
  const [selectorSlotIdx, setSelectorSlotIdx] = useState<number | null>(null);

  // Benchmarks for comparative bars
  const maxHp = 2200;
  const minZeroToSixty = 1.5;
  const maxTopSpeed = 300;

  return (
    <section id="comparison" className="relative w-full py-28 bg-[#070709] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold">
              <GitCompare className="w-3.5 h-3.5" />
              <span>04 / TELEMETRY COMPARATOR</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Benchmark Analysis
            </h2>
          </div>
          <p className="max-w-md font-sans-modern text-sm text-neutral-400 font-light leading-relaxed">
            Compare up to 3 sovereign automobiles side-by-side. Analyze horsepower, aerodynamic top speed,
            and launch dynamics through certified factory telemetry.
          </p>
        </div>

        {/* 3 Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((slotIdx) => {
            const vehicle = comparedVehicles[slotIdx];

            if (vehicle) {
              return (
                <div
                  key={vehicle.id}
                  className="rounded-2xl border border-white/10 bg-[#0c0c12] p-5 flex flex-col justify-between shadow-xl group relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      luxuryAudio.playClick(700);
                      onRemoveVehicle(vehicle.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-white/10 transition-colors z-10"
                    title="Remove Vehicle"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-neutral-900 relative">
                      <img
                        src={vehicle.heroImage}
                        alt={vehicle.model}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-3 font-mono-tech text-[10px] text-amber-400 uppercase tracking-widest">
                        {vehicle.category}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono-tech text-xs text-amber-500/90 uppercase tracking-widest font-semibold">
                        {vehicle.brand}
                      </span>
                      <span className="font-serif-luxury text-base font-bold text-amber-200">
                        {vehicle.formattedPrice}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-xl font-bold text-white uppercase truncate">
                      {vehicle.model}
                    </h3>
                  </div>

                  {/* Visual Comparison Telemetry Bars */}
                  <div className="mt-6 space-y-4 pt-4 border-t border-white/10">
                    {/* Horsepower Bar */}
                    <div>
                      <div className="flex justify-between font-mono-tech text-xs mb-1">
                        <span className="text-neutral-400 uppercase tracking-wider">Horsepower</span>
                        <span className="text-white font-bold">{vehicle.specs.horsepower} HP</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((vehicle.specs.horsepower / maxHp) * 100, 100)}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* 0-60 Speed Bar (Faster = fuller) */}
                    <div>
                      <div className="flex justify-between font-mono-tech text-xs mb-1">
                        <span className="text-neutral-400 uppercase tracking-wider">0–60 MPH</span>
                        <span className="text-amber-300 font-bold">{vehicle.specs.acceleration}s</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.max(10, (1 - (vehicle.specs.acceleration - minZeroToSixty) / 4) * 100)}%`,
                          }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Top Speed Bar */}
                    <div>
                      <div className="flex justify-between font-mono-tech text-xs mb-1">
                        <span className="text-neutral-400 uppercase tracking-wider">Top Velocity</span>
                        <span className="text-white font-bold">{vehicle.specs.topSpeed} MPH</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(vehicle.specs.topSpeed / maxTopSpeed) * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Key Technical Matrix */}
                    <div className="pt-3 border-t border-white/5 space-y-1.5 font-mono-tech text-[11px] text-neutral-400">
                      <div className="flex justify-between">
                        <span>Engine:</span>
                        <span className="text-neutral-200 truncate max-w-[170px]">{vehicle.specs.engine}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Drive:</span>
                        <span className="text-neutral-200">{vehicle.specs.driveType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transmission:</span>
                        <span className="text-neutral-200 truncate max-w-[170px]">{vehicle.specs.transmission}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      luxuryAudio.playClick(800);
                      onSelectVehicle(vehicle);
                    }}
                    className="mt-6 w-full py-2.5 rounded-full border border-white/15 hover:border-amber-400/60 bg-white/5 text-neutral-200 hover:text-white text-xs font-sans-modern font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            }

            // Empty Slot
            return (
              <div
                key={`empty-${slotIdx}`}
                className="rounded-2xl border-2 border-dashed border-white/10 bg-[#0a0a0d]/50 p-8 flex flex-col items-center justify-center text-center min-h-[380px] hover:border-amber-400/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-neutral-400">
                  <Plus className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-white uppercase tracking-wider">
                  Slot 0{slotIdx + 1} Empty
                </h4>
                <p className="font-sans-modern text-xs text-neutral-400 max-w-xs mt-1 mb-6">
                  Select an automobile from the God Asura collection to analyze head-to-head performance.
                </p>

                <button
                  onClick={() => {
                    luxuryAudio.playClick(800);
                    setSelectorSlotIdx(slotIdx);
                  }}
                  className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-sans-modern text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Choose Vehicle
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Vehicle Picker for Empty Slot */}
        <AnimatePresence>
          {selectorSlotIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl bg-[#0e0e14] border border-white/15 rounded-2xl p-6 max-h-[85vh] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif-luxury text-xl font-bold text-white uppercase">
                    Select Vehicle for Benchmark
                  </h3>
                  <button
                    onClick={() => setSelectorSlotIdx(null)}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-y-auto divide-y divide-white/5 py-3 flex-1 space-y-1">
                  {SHOWROOM_VEHICLES.map((v) => {
                    const isAlreadyCompared = comparedVehicles.some((c) => c.id === v.id);
                    return (
                      <button
                        key={v.id}
                        disabled={isAlreadyCompared}
                        onClick={() => {
                          luxuryAudio.playClick(850);
                          onAddVehicle(v);
                          setSelectorSlotIdx(null);
                        }}
                        className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors text-left ${
                          isAlreadyCompared
                            ? 'opacity-40 cursor-not-allowed'
                            : 'hover:bg-white/5 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={v.heroImage}
                            alt={v.model}
                            referrerPolicy="no-referrer"
                            className="w-16 h-11 object-cover rounded-md"
                          />
                          <div>
                            <p className="font-serif-luxury font-bold text-sm text-white">
                              {v.brand} {v.model}
                            </p>
                            <p className="font-mono-tech text-[11px] text-neutral-400">
                              {v.specs.horsepower} HP • {v.specs.acceleration}s • {v.formattedPrice}
                            </p>
                          </div>
                        </div>

                        {isAlreadyCompared ? (
                          <span className="font-mono-tech text-[10px] text-amber-400 uppercase tracking-widest">
                            Added
                          </span>
                        ) : (
                          <span className="font-sans-modern text-xs font-semibold text-amber-400 uppercase">
                            Select +
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
