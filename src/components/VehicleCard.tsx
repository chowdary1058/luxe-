import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Heart, GitCompare, Zap, Gauge } from 'lucide-react';
import { Vehicle } from '../types';
import { luxuryAudio } from '../utils/audio';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  isFavorite: boolean;
  onToggleCompare: (vehicle: Vehicle) => void;
  isCompared: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared,
}) => {
  return (
    <div
      onClick={() => {
        luxuryAudio.playClick(800);
        onSelect(vehicle);
      }}
      className="group relative rounded-2xl overflow-hidden bg-[#0a0a0d] border border-white/5 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(217,119,6,0.15)] flex flex-col cursor-pointer"
    >
      {/* Vehicle Photography Viewport */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={vehicle.heroImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-black/20" />

        {/* Top Badges & Quick Action Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono-tech text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
            {vehicle.category}
          </span>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Compare Toggle */}
            <button
              onClick={() => {
                luxuryAudio.playClick(850);
                onToggleCompare(vehicle);
              }}
              className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                isCompared
                  ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                  : 'bg-black/50 text-neutral-300 border-white/10 hover:text-white hover:border-white/30'
              }`}
              title={isCompared ? 'Remove from Comparison' : 'Add to Comparison'}
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>

            {/* Favorite Toggle */}
            <button
              onClick={() => {
                luxuryAudio.playClick(900);
                onToggleFavorite(vehicle.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                isFavorite
                  ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                  : 'bg-black/50 text-neutral-300 border-white/10 hover:text-red-400 hover:border-red-400/40'
              }`}
              title={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Acceleration or Powertrain Pill */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono-tech text-[11px] text-neutral-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
          <Gauge className="w-3 h-3 text-amber-400" />
          <span>0–60 in {vehicle.specs.acceleration}s</span>
        </div>
      </div>

      {/* Editorial Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Year */}
          <div className="flex items-center justify-between font-mono-tech text-[11px] text-amber-500/80 uppercase tracking-widest mb-1">
            <span>{vehicle.brand}</span>
            <span>{vehicle.year}</span>
          </div>

          {/* Model Headline */}
          <h3 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider group-hover:text-amber-300 transition-colors">
            {vehicle.model}
          </h3>

          {/* Horsepower & Engine summary */}
          <p className="mt-1 font-sans-modern text-xs text-neutral-400 line-clamp-1">
            {vehicle.specs.horsepower} HP • {vehicle.specs.engine}
          </p>
        </div>

        {/* Footer: Starting Price & View Vehicle Link */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="font-mono-tech text-[9px] tracking-[0.2em] uppercase text-neutral-400 block">
              Starting Price
            </span>
            <span className="font-serif-luxury text-base font-bold text-amber-200">
              {vehicle.formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-1 font-sans-modern text-xs font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-amber-400 transition-colors">
            <span>VIEW VEHICLE</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
