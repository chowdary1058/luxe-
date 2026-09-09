import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Heart, ArrowRight, Calendar } from 'lucide-react';
import { Vehicle } from '../types';
import { SHOWROOM_VEHICLES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (vehicleId: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onScheduleFleetViewing: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectVehicle,
  onScheduleFleetViewing,
}) => {
  if (!isOpen) return null;

  const favoriteVehicles = SHOWROOM_VEHICLES.filter((v) => favorites.includes(v.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-y-0 right-0 max-w-md w-full bg-[#0b0b10] border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                <h3 className="font-serif-luxury text-xl font-bold text-white uppercase tracking-wider">
                  Saved Portfolio ({favoriteVehicles.length})
                </h3>
              </div>
              <button
                onClick={() => {
                  luxuryAudio.playClick(700);
                  onClose();
                }}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            {favoriteVehicles.length > 0 ? (
              <div className="space-y-4">
                {favoriteVehicles.map((v) => (
                  <div
                    key={v.id}
                    className="p-3.5 rounded-xl border border-white/10 bg-[#101016] flex items-center justify-between gap-3 group"
                  >
                    <div
                      onClick={() => {
                        luxuryAudio.playClick(800);
                        onSelectVehicle(v);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <img
                        src={v.heroImage}
                        alt={v.model}
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 object-cover rounded-md"
                      />
                      <div>
                        <span className="font-mono-tech text-[10px] text-amber-400 uppercase tracking-wider block">
                          {v.brand}
                        </span>
                        <h4 className="font-serif-luxury text-sm font-bold text-white uppercase group-hover:text-amber-300">
                          {v.model}
                        </h4>
                        <span className="font-serif-luxury text-xs text-amber-200">
                          {v.formattedPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        luxuryAudio.playClick(700);
                        onRemoveFavorite(v.id);
                      }}
                      className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="w-10 h-10 text-neutral-400 mx-auto mb-3 stroke-[1]" />
                <p className="font-serif-luxury text-base text-neutral-300 uppercase">
                  Your Portfolio is Empty
                </p>
                <p className="font-sans-modern text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Click the heart icon on any automobile in the collection to curate your private acquisition list.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {favoriteVehicles.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  luxuryAudio.playClick(850);
                  onScheduleFleetViewing();
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-sans-modern font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire on Portfolio</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
