import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, ArrowUpDown, Search, Filter } from 'lucide-react';
import { Vehicle } from '../types';
import { VehicleCard } from './VehicleCard';
import { luxuryAudio } from '../utils/audio';

interface GlobalCollectionProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onToggleFavorite: (vehicleId: string) => void;
  favorites: string[];
  onToggleCompare: (vehicle: Vehicle) => void;
  comparedVehicles: Vehicle[];
}

const CATEGORIES = [
  'All',
  'Hypercars',
  'Supercars',
  'Luxury',
  'Performance',
  'Electric',
  'Grand Tourers',
  'Classics',
];

export const GlobalCollection: React.FC<GlobalCollectionProps> = ({
  vehicles,
  onSelectVehicle,
  onToggleFavorite,
  favorites,
  onToggleCompare,
  comparedVehicles,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'hp-desc' | 'acc-asc'>('featured');

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        const matchesCategory =
          selectedCategory === 'All' || v.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.specs.engine.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'hp-desc') return b.specs.horsepower - a.specs.horsepower;
        if (sortBy === 'acc-asc') return a.specs.acceleration - b.specs.acceleration;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [vehicles, selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    luxuryAudio.playClick(800);
    setSelectedCategory(cat);
  };

  return (
    <section id="collection" className="relative w-full py-28 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold">
              <span>Curated Showroom Portfolio</span>
              <span>•</span>
              <span>{filteredVehicles.length} Exceptional Models</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Global Collection
            </h2>
          </div>

          <p className="max-w-md font-sans-modern text-sm text-neutral-400 font-light leading-relaxed">
            Every vehicle in the God Asura collection represents the absolute apex of
            its discipline — from track-focused homologation weapons to sovereign grand tourers.
          </p>
        </div>

        {/* Filter Bar: Category Tabs & Sort Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full font-sans-modern text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(217,119,6,0.4)]'
                      : 'bg-[#121216] text-neutral-300 hover:text-white hover:bg-[#1a1a20] border border-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Dropdowns */}
          <div className="flex items-center gap-3">
            {/* Quick Search Field */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by model, brand..."
                className="w-full bg-[#121216] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400/60 font-sans-modern transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  luxuryAudio.playClick(850);
                  setSortBy(e.target.value as typeof sortBy);
                }}
                className="appearance-none bg-[#121216] border border-white/10 rounded-full pl-4 pr-9 py-2 text-xs text-neutral-200 font-sans-modern focus:outline-none focus:border-amber-400/60 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="hp-desc">Power: Highest HP</option>
                <option value="acc-asc">0–60: Fastest First</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={onSelectVehicle}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleCompare={onToggleCompare}
                isCompared={comparedVehicles.some((c) => c.id === vehicle.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <p className="font-serif-luxury text-xl text-neutral-400 uppercase tracking-widest">
              No Vehicles Found
            </p>
            <p className="font-sans-modern text-xs text-neutral-400 mt-2">
              Try adjusting your category filter or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2.5 rounded-full border border-amber-500/40 text-amber-400 text-xs font-mono-tech tracking-wider uppercase hover:bg-amber-400/10 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
