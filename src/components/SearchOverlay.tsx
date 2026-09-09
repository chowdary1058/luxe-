import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Gauge, Sliders } from 'lucide-react';
import { Vehicle } from '../types';
import { SHOWROOM_VEHICLES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectVehicle,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = SHOWROOM_VEHICLES.filter((v) => {
    const q = query.toLowerCase();
    return (
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.specs.engine.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#060609]/95 backdrop-blur-2xl flex flex-col p-6 sm:p-12 overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto w-full">
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold">
              Global Showroom Search
            </span>
            <button
              onClick={() => {
                luxuryAudio.playClick(700);
                onClose();
              }}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <Search className="w-7 h-7 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Marque, Model (e.g. Porsche, Ferrari, Bugatti, V12, Electric)..."
              className="w-full bg-[#0c0c12] border border-white/15 focus:border-amber-400 rounded-2xl pl-16 pr-6 py-5 text-lg sm:text-xl font-sans-modern text-white placeholder-neutral-400 focus:outline-none transition-colors shadow-2xl"
            />
          </div>

          {/* Quick Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <span className="font-mono-tech text-xs text-neutral-400 uppercase mr-2">Quick:</span>
            {['Ferrari', 'Porsche', 'Bugatti', 'Rolls-Royce', 'Electric', 'V12'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  luxuryAudio.playClick(800);
                  setQuery(tag);
                }}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:border-amber-400/40 text-xs font-sans-modern text-neutral-300 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono-tech text-xs text-neutral-400 uppercase pb-2">
              <span>{results.length} Matches Found</span>
              <span>Select to view specifications</span>
            </div>

            {results.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  luxuryAudio.playClick(800);
                  onSelectVehicle(v);
                  onClose();
                }}
                className="p-4 rounded-xl border border-white/10 hover:border-amber-400/50 bg-[#0c0c12] hover:bg-[#12121a] transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={v.heroImage}
                    alt={v.model}
                    referrerPolicy="no-referrer"
                    className="w-20 h-14 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-mono-tech text-[10px] text-amber-400 uppercase tracking-widest">
                      <span>{v.brand}</span>
                      <span>•</span>
                      <span>{v.category}</span>
                    </div>
                    <h4 className="font-serif-luxury text-lg font-bold text-white uppercase group-hover:text-amber-300 transition-colors">
                      {v.model}
                    </h4>
                    <p className="font-mono-tech text-xs text-neutral-400">
                      {v.specs.horsepower} HP • {v.specs.engine}
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="font-mono-tech text-[10px] text-neutral-400 uppercase block">Price</span>
                    <span className="font-serif-luxury text-base font-bold text-amber-200">
                      {v.formattedPrice}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
