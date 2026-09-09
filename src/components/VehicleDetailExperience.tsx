import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Volume2,
  Heart,
  Sliders,
  Calendar,
  Share2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Gauge,
  Zap,
  Flame,
} from 'lucide-react';
import { Vehicle } from '../types';
import { luxuryAudio } from '../utils/audio';

interface VehicleDetailExperienceProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onConfigure: (vehicle: Vehicle) => void;
  onScheduleViewing: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  isFavorite: boolean;
}

export const VehicleDetailExperience: React.FC<VehicleDetailExperienceProps> = ({
  vehicle,
  onClose,
  onConfigure,
  onScheduleViewing,
  onToggleFavorite,
  isFavorite,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!vehicle) return null;

  const allImages = [vehicle.heroImage, vehicle.interiorImage, ...(vehicle.gallery || [])];

  const handleRev = () => {
    luxuryAudio.playEngineRev(
      vehicle.specs.fuelType === 'Electric' ? 'EV' : vehicle.specs.engine.includes('V12') ? 'V12' : 'V8'
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex flex-col"
      >
        {/* Floating Header */}
        <div className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#070709]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold">
              {vehicle.brand} • {vehicle.year}
            </span>
            <span className="text-white/30">•</span>
            <span className="font-serif-luxury text-sm font-bold text-white uppercase hidden sm:inline">
              {vehicle.model}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Engine Rev Audio button */}
            <button
              onClick={handleRev}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono-tech text-xs uppercase tracking-wider transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Rev Engine</span>
            </button>

            {/* Favorite toggle */}
            <button
              onClick={() => {
                luxuryAudio.playClick(900);
                onToggleFavorite(vehicle.id);
              }}
              className={`p-2 rounded-full border transition-all ${
                isFavorite
                  ? 'border-red-500/50 bg-red-500/20 text-red-400'
                  : 'border-white/10 text-neutral-300 hover:text-white bg-white/5'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-400' : ''}`} />
            </button>

            {/* Close Modal */}
            <button
              onClick={() => {
                luxuryAudio.playClick(700);
                onClose();
              }}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col gap-12">
          {/* Main Cinematic Hero Media Stage */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0e] shadow-[0_25px_80px_rgba(0,0,0,0.9)] aspect-[16/9] max-h-[640px]">
            <motion.img
              key={activeImageIdx}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={allImages[activeImageIdx]}
              alt={vehicle.model}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.08]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-black/30" />

            {/* Bottom Title & Price Badge inside Hero */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono-tech text-xs tracking-[0.4em] uppercase text-amber-400 font-semibold block mb-1">
                  {vehicle.editionBadge || `${vehicle.category} Masterpiece`}
                </span>
                <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-none drop-shadow-md">
                  {vehicle.brand} {vehicle.model}
                </h1>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">
                  Commencing Acquisition Price
                </span>
                <span className="font-serif-luxury text-2xl sm:text-4xl font-extrabold text-amber-300">
                  {vehicle.formattedPrice}
                </span>
              </div>
            </div>

            {/* Thumbnail switcher at bottom center */}
            <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 z-20">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    luxuryAudio.playClick(850);
                    setActiveImageIdx(idx);
                  }}
                  className={`w-14 h-9 rounded-lg overflow-hidden border transition-all ${
                    activeImageIdx === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-white/20 opacity-60'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Specifications Grid with Smooth Animated Numbers */}
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono-tech text-xs tracking-[0.3em] uppercase text-neutral-400">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>Certified Engineering Benchmark Metrics</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'ENGINE', value: vehicle.specs.engine.split(' ')[0] + ' ' + (vehicle.specs.engine.split(' ')[1] || ''), sub: vehicle.specs.fuelType },
                { label: 'POWER', value: `${vehicle.specs.horsepower} HP`, sub: 'Peak Brake Power' },
                { label: '0–60 MPH', value: `${vehicle.specs.acceleration}s`, sub: 'Launch Control' },
                { label: 'TOP SPEED', value: `${vehicle.specs.topSpeed} MPH`, sub: 'Track Verified' },
                { label: 'DRIVE', value: vehicle.specs.driveType.split(' ')[0], sub: vehicle.specs.transmission.split(' ')[0] },
                { label: 'WEIGHT', value: `${vehicle.specs.weightKg} KG`, sub: 'Dry Mass' },
              ].map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="p-5 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-400/30 transition-colors"
                >
                  <span className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-neutral-400 block">
                    {spec.label}
                  </span>
                  <p className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
                    {spec.value}
                  </p>
                  <span className="font-sans-modern text-[11px] text-amber-400/80 font-medium block mt-0.5">
                    {spec.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Deep Narrative & Atelier Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="p-8 rounded-3xl bg-[#0c0c12] border border-white/10">
                <h3 className="font-serif-luxury text-2xl font-bold text-white uppercase tracking-wider mb-4">
                  Curator’s Monograph
                </h3>
                <p className="font-sans-modern text-neutral-300 text-base leading-relaxed font-light">
                  {vehicle.description}
                </p>

                <blockquote className="mt-6 pl-4 border-l-2 border-amber-400 italic font-serif-luxury text-lg text-amber-200/90">
                  “{vehicle.storyQuote}”
                </blockquote>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 font-mono-tech text-xs text-neutral-400">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>{vehicle.curatorNote}</span>
                </div>
              </div>

              {/* Full Specs Table */}
              <div className="p-8 rounded-3xl bg-[#0c0c12] border border-white/10">
                <h4 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider mb-6">
                  Technical Architecture
                </h4>
                <div className="divide-y divide-white/5 font-sans-modern text-sm">
                  {[
                    { name: 'Powertrain', value: vehicle.specs.engine },
                    { name: 'Torque Output', value: vehicle.specs.torque },
                    { name: 'Transmission Unit', value: vehicle.specs.transmission },
                    { name: 'Drivetrain Configuration', value: vehicle.specs.driveType },
                    { name: 'Fuel / Energy Source', value: vehicle.specs.fuelType },
                    ...(vehicle.specs.rangeKm ? [{ name: 'Electric Range', value: `${vehicle.specs.rangeKm} km WLTP` }] : []),
                    { name: 'Chassis & Structure', value: 'Lightweight Carbon-Fiber Monocoque / Aluminium Subframes' },
                    { name: 'Braking System', value: 'Multi-Piston Ceramic Composite with Dynamic Energy Recuperation' },
                  ].map((row) => (
                    <div key={row.name} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-neutral-400 font-mono-tech text-xs uppercase tracking-wider">{row.name}</span>
                      <span className="text-white font-medium sm:text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Card: Booking Concierge & Config */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="p-6 rounded-3xl bg-[#0e0e14] border border-amber-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-amber-400 uppercase font-semibold block">
                  God Asura Concierge
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-white uppercase mt-1">
                  Private Allocation
                </h4>
                <p className="font-sans-modern text-xs text-neutral-400 mt-2 leading-relaxed">
                  Direct allocation slots with factory delivery, confidential escrow handling, and bespoke coachwork options.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      luxuryAudio.playClick(800);
                      onScheduleViewing(vehicle);
                    }}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-sans-modern font-bold text-xs tracking-widest uppercase transition-all hover:brightness-110 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Private Viewing</span>
                  </button>

                  <button
                    onClick={() => {
                      luxuryAudio.playClick(800);
                      onClose();
                      onConfigure(vehicle);
                    }}
                    className="w-full py-3.5 rounded-full border border-white/20 hover:border-amber-400/60 bg-white/5 hover:bg-amber-400/10 text-white font-sans-modern font-semibold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>Customize in Bespoke Atelier</span>
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-[11px] font-sans-modern text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Authenticated Manufacturer Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Worldwide Armored Enclosed Transport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Single-Point Confidential Escrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
