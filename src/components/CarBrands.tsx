import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Trophy, History, Gauge, Compass, Sparkles } from 'lucide-react';
import { Brand, Vehicle } from '../types';
import { SHOWROOM_BRANDS, SHOWROOM_VEHICLES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface CarBrandsProps {
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const CarBrands: React.FC<CarBrandsProps> = ({ onSelectVehicle }) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(SHOWROOM_BRANDS[0].id);

  const selectedBrand = SHOWROOM_BRANDS.find((b) => b.id === selectedBrandId) || SHOWROOM_BRANDS[0];
  const signatureVehicle = SHOWROOM_VEHICLES.find((v) => v.id === selectedBrand.heroVehicleId) || SHOWROOM_VEHICLES[0];

  const handleBrandSelect = (brandId: string) => {
    luxuryAudio.playClick(900);
    setSelectedBrandId(brandId);
  };

  return (
    <section id="brands" className="relative w-full py-28 bg-[#060608] overflow-hidden border-t border-b border-white/5">
      {/* Dynamic Background Image with Smooth Cross-fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.38, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={selectedBrand.backdropImage}
              alt={selectedBrand.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale-[30%] contrast-[1.1]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-[#060608]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold block mb-2">
              02 / CURATED HOUSES
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              The Sovereign Marques
            </h2>
          </div>
          <p className="font-sans-modern text-xs sm:text-sm text-neutral-400 max-w-sm font-light">
            Select an illustrious manufacture to explore its racing lineage, bespoke philosophy, and flagship commission.
          </p>
        </div>

        {/* Brand Selector Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {SHOWROOM_BRANDS.map((brand) => {
            const isSelected = brand.id === selectedBrand.id;
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandSelect(brand.id)}
                className={`px-5 py-2.5 rounded-full font-serif-luxury text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_25px_rgba(217,119,6,0.5)] scale-105'
                    : 'bg-black/60 text-neutral-300 hover:text-white hover:bg-neutral-800/80 border border-white/10'
                }`}
              >
                <span>{brand.name}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Card for Selected Brand */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-[#09090d]/90 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column: Brand Story, Quote, Lineage */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono-tech text-xs tracking-widest text-amber-400 uppercase font-semibold">
                    {selectedBrand.origin} • Est. {selectedBrand.founded}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  <span className="font-mono-tech text-xs tracking-widest text-neutral-400 uppercase">
                    {selectedBrand.tagline}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-none">
                  {selectedBrand.name}
                </h3>

                <blockquote className="mt-4 text-amber-200/90 font-serif-luxury text-xl sm:text-2xl italic font-medium leading-snug">
                  “{selectedBrand.quote}”
                </blockquote>

                <p className="mt-4 font-sans-modern text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                  {selectedBrand.description}
                </p>
              </div>

              {/* Heritage Statistics Bento Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
                <div>
                  <p className="font-mono-tech text-[10px] text-neutral-400 uppercase tracking-widest">Heritage</p>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {selectedBrand.stats.heritageYears}+ <span className="text-xs text-neutral-400 font-normal">Yrs</span>
                  </p>
                </div>

                <div>
                  <p className="font-mono-tech text-[10px] text-neutral-400 uppercase tracking-widest">Titles</p>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-300 mt-0.5">
                    {selectedBrand.stats.championships > 0 ? `${selectedBrand.stats.championships} F1 / WEC` : 'Bespoke Icon'}
                  </p>
                </div>

                <div>
                  <p className="font-mono-tech text-[10px] text-neutral-400 uppercase tracking-widest">Peak Power</p>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {selectedBrand.stats.highestHp} <span className="text-xs text-neutral-400 font-normal">HP</span>
                  </p>
                </div>

                <div>
                  <p className="font-mono-tech text-[10px] text-neutral-400 uppercase tracking-widest">Speed Benchmark</p>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-amber-300 mt-0.5">
                    {selectedBrand.stats.topSpeedRecord} <span className="text-xs text-neutral-400 font-normal">MPH</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Signature Vehicle Display Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={signatureVehicle.heroImage}
                    alt={`${signatureVehicle.brand} ${signatureVehicle.model}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.08] transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono-tech text-[10px] text-amber-400 uppercase tracking-widest block">
                        Signature Showcase Model
                      </span>
                      <h4 className="font-serif-luxury text-2xl font-bold text-white uppercase mt-0.5">
                        {signatureVehicle.model}
                      </h4>
                      <p className="font-mono-tech text-xs text-neutral-400 mt-1">
                        {signatureVehicle.specs.engine} • {signatureVehicle.specs.horsepower} HP
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-mono-tech text-[9px] text-neutral-400 uppercase tracking-widest block">
                        Price
                      </span>
                      <span className="font-serif-luxury text-lg font-bold text-amber-300">
                        {signatureVehicle.formattedPrice}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        luxuryAudio.playClick(800);
                        onSelectVehicle(signatureVehicle);
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-amber-400 font-sans-modern text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
                    >
                      <span>Explore {signatureVehicle.model}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        luxuryAudio.playEngineRev(signatureVehicle.specs.fuelType === 'Electric' ? 'EV' : 'V12');
                      }}
                      className="font-mono-tech text-xs text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
                    >
                      Listen to Engine →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
