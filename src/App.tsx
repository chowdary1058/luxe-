import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedVehicle } from './components/FeaturedVehicle';
import { GlobalCollection } from './components/GlobalCollection';
import { CarBrands } from './components/CarBrands';
import { InteractiveConfigurator } from './components/InteractiveConfigurator';
import { VehicleDetailExperience } from './components/VehicleDetailExperience';
import { VehicleComparison } from './components/VehicleComparison';
import { ArtOfPerformance } from './components/ArtOfPerformance';
import { ElectricFuture } from './components/ElectricFuture';
import { HeritageTimeline } from './components/HeritageTimeline';
import { LuxuryExperiences } from './components/LuxuryExperiences';
import { Footer } from './components/Footer';
import { SearchOverlay } from './components/SearchOverlay';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ConciergeModal } from './components/ConciergeModal';
import { BrandVideoIntroModal } from './components/BrandVideoIntroModal';

import { Vehicle, ExperienceOffering } from './types';
import { SHOWROOM_VEHICLES, FEATURED_VEHICLE } from './data/showroomData';
import { luxuryAudio } from './utils/audio';

export default function App() {
  // Navigation & Interactive states
  const [activeSection, setActiveSection] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [configuratorVehicle, setConfiguratorVehicle] = useState<Vehicle>(FEATURED_VEHICLE);

  // Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isVideoIntroOpen, setIsVideoIntroOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Concierge targets
  const [conciergeTargetVehicle, setConciergeTargetVehicle] = useState<Vehicle | null>(null);
  const [conciergeTargetExperience, setConciergeTargetExperience] = useState<ExperienceOffering | null>(null);
  const [conciergeCustomSummary, setConciergeCustomSummary] = useState<string>('');

  // Favorites collection (saved locally)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('god_asura_favorites');
      return saved ? JSON.parse(saved) : [FEATURED_VEHICLE.id, 'bugatti-tourbillon'];
    } catch {
      return [FEATURED_VEHICLE.id];
    }
  });

  // Telemetry comparison slots (defaults to 2 iconic vehicles)
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([
    FEATURED_VEHICLE,
    SHOWROOM_VEHICLES.find((v) => v.id === 'ferrari-sf90-xx') || SHOWROOM_VEHICLES[2],
  ]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('god_asura_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Global keybindings (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      'featured',
      'collection',
      'brands',
      'configurator',
      'performance',
      'comparison',
      'electric-future',
      'heritage',
      'experiences',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Favorite handler
  const handleToggleFavorite = (vehicleId: string) => {
    setFavorites((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  };

  // Compare handlers
  const handleToggleCompare = (vehicle: Vehicle) => {
    setComparedVehicles((prev) => {
      if (prev.some((v) => v.id === vehicle.id)) {
        return prev.filter((v) => v.id !== vehicle.id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], vehicle];
      }
      return [...prev, vehicle];
    });
  };

  const handleRemoveCompare = (vehicleId: string) => {
    setComparedVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
  };

  const handleAddCompare = (vehicle: Vehicle) => {
    setComparedVehicles((prev) => {
      if (prev.some((v) => v.id === vehicle.id)) return prev;
      if (prev.length >= 3) return [prev[1], prev[2], vehicle];
      return [...prev, vehicle];
    });
  };

  // Navigation callbacks
  const handleExploreCollection = () => {
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDiscoverBrands = () => {
    const el = document.getElementById('brands');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConfiguratorForVehicle = (vehicle: Vehicle) => {
    setConfiguratorVehicle(vehicle);
    const el = document.getElementById('configurator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Concierge openers
  const handleOpenConciergeForVehicle = (vehicle: Vehicle) => {
    setConciergeTargetVehicle(vehicle);
    setConciergeTargetExperience(null);
    setConciergeCustomSummary('');
    setIsConciergeOpen(true);
  };

  const handleOpenConciergeForExperience = (experience: ExperienceOffering) => {
    setConciergeTargetExperience(experience);
    setConciergeTargetVehicle(null);
    setConciergeCustomSummary('');
    setIsConciergeOpen(true);
  };

  const handleOpenConciergeForConfig = (summary: string) => {
    setConciergeCustomSummary(summary);
    setConciergeTargetVehicle(null);
    setConciergeTargetExperience(null);
    setIsConciergeOpen(true);
  };

  const handleOpenConciergeForFleet = () => {
    setConciergeCustomSummary(`Client requests private dossier & viewings for saved fleet (${favorites.length} vehicles).`);
    setConciergeTargetVehicle(null);
    setConciergeTargetExperience(null);
    setIsConciergeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 selection:bg-amber-400 selection:text-black font-sans-modern">
      {/* Top Floating Luxury Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenVideoIntro={() => setIsVideoIntroOpen(true)}
        favoritesCount={favorites.length}
        activeSection={activeSection}
      />

      {/* Main Automotive Showroom Canvas */}
      <main>
        {/* 1. Full-screen Cinematic Hero */}
        <Hero
          onExploreCollection={handleExploreCollection}
          onDiscoverBrands={handleDiscoverBrands}
          onOpenVideoIntro={() => setIsVideoIntroOpen(true)}
        />

        {/* 2. Spotlight Featured Vehicle (Porsche 911 GT3 RS) */}
        <FeaturedVehicle
          vehicle={FEATURED_VEHICLE}
          onSelectVehicle={setSelectedVehicle}
          onConfigureVehicle={handleOpenConfiguratorForVehicle}
        />

        {/* 3. Filterable Global Collection */}
        <GlobalCollection
          vehicles={SHOWROOM_VEHICLES}
          onSelectVehicle={setSelectedVehicle}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          onToggleCompare={handleToggleCompare}
          comparedVehicles={comparedVehicles}
        />

        {/* 4. Sovereign Marques (Interactive Brands Experience) */}
        <CarBrands onSelectVehicle={setSelectedVehicle} />

        {/* 5. Bespoke Atelier Vehicle Configurator */}
        <InteractiveConfigurator
          initialVehicle={configuratorVehicle}
          onInquireConfig={handleOpenConciergeForConfig}
        />

        {/* 6. The Art of Performance (Storytelling & Aerodynamics) */}
        <ArtOfPerformance />

        {/* 7. Telemetry Benchmark Comparator */}
        <VehicleComparison
          comparedVehicles={comparedVehicles}
          onRemoveVehicle={handleRemoveCompare}
          onAddVehicle={handleAddCompare}
          onSelectVehicle={setSelectedVehicle}
        />

        {/* 8. The Electric Future (Hypercar Electrification) */}
        <ElectricFuture onSelectVehicle={setSelectedVehicle} />

        {/* 9. Automotive Heritage Chronicles */}
        <HeritageTimeline />

        {/* 10. Privileged Client Experiences & Track Days */}
        <LuxuryExperiences onBookExperience={handleOpenConciergeForExperience} />
      </main>

      {/* Luxury Footer with Global Ateliers & Privileged Dispatch */}
      <Footer />

      {/* Fullscreen Vehicle Detail Dossier Modal */}
      <VehicleDetailExperience
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onConfigure={handleOpenConfiguratorForVehicle}
        onScheduleViewing={handleOpenConciergeForVehicle}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedVehicle ? favorites.includes(selectedVehicle.id) : false}
      />

      {/* Fullscreen Search Overlay (Cmd+K) */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVehicle={setSelectedVehicle}
      />

      {/* Saved Portfolio Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        onSelectVehicle={setSelectedVehicle}
        onScheduleFleetViewing={handleOpenConciergeForFleet}
      />

      {/* Private Concierge & Allocation Inquire Modal */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        targetVehicle={conciergeTargetVehicle}
        targetExperience={conciergeTargetExperience}
        customSummary={conciergeCustomSummary}
      />

      {/* Cinematic Brand Film & Logo Intro Animation Modal */}
      <BrandVideoIntroModal
        isOpen={isVideoIntroOpen}
        onClose={() => setIsVideoIntroOpen(false)}
        onExploreCollection={handleExploreCollection}
      />
    </div>
  );
}
