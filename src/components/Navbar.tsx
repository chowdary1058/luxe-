import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Heart,
  Menu,
  X,
  Volume2,
  VolumeX,
  Play,
  Sliders,
  GitCompare,
  ArrowRight,
} from 'lucide-react';
import { BrandLogoEmblem } from './BrandLogoEmblem';
import { luxuryAudio } from '../utils/audio';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenVideoIntro: () => void;
  favoritesCount: number;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenFavorites,
  onOpenVideoIntro,
  favoritesCount,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = luxuryAudio.toggleAmbient();
    setIsSoundOn(active);
  };

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Brands', href: '#brands' },
    { label: 'Configurator', href: '#configurator' },
    { label: 'Performance', href: '#performance' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'Electric Future', href: '#electric-future' },
    { label: 'Heritage', href: '#heritage' },
    { label: 'Experiences', href: '#experiences' },
  ];

  const handleNavClick = (href: string) => {
    luxuryAudio.playClick(750);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-2.5 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group transition-transform duration-300"
          >
            <BrandLogoEmblem size={isScrolled ? 'sm' : 'md'} showTagline={!isScrolled} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-3 py-1.5 text-xs tracking-[0.14em] uppercase font-sans-modern font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cinema Video Intro Button */}
            <button
              onClick={() => {
                luxuryAudio.playClick(800);
                onOpenVideoIntro();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 text-[11px] font-sans-modern font-medium tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(217,119,6,0.15)]"
              title="Watch Official Brand Film"
            >
              <Play className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Cinema Film</span>
            </button>

            {/* Ambient Luxury Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isSoundOn
                  ? 'border-amber-400/50 bg-amber-400/10 text-amber-400 shadow-[0_0_12px_rgba(217,119,6,0.25)]'
                  : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/25 bg-white/5'
              }`}
              title={isSoundOn ? 'Mute Ambient Audio' : 'Play Ambient Showroom Audio'}
              aria-label="Toggle Sound"
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => {
                luxuryAudio.playClick(900);
                onOpenSearch();
              }}
              className="p-2 rounded-full border border-white/10 text-neutral-300 hover:text-amber-400 hover:border-amber-400/40 bg-white/5 transition-all duration-300"
              title="Search Vehicles (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites / Wishlist Trigger */}
            <button
              onClick={() => {
                luxuryAudio.playClick(900);
                onOpenFavorites();
              }}
              className="relative p-2 rounded-full border border-white/10 text-neutral-300 hover:text-red-400 hover:border-red-400/40 bg-white/5 transition-all duration-300"
              title="Saved Collection"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center font-mono-tech shadow-[0_0_8px_rgba(217,119,6,0.6)]">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                luxuryAudio.playClick(700);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-full border border-white/10 text-neutral-300 hover:text-white bg-white/5 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 lg:hidden bg-[#070709]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <BrandLogoEmblem size="sm" />
                <button
                  onClick={onOpenVideoIntro}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono-tech"
                >
                  <Play className="w-3 h-3 fill-amber-400" />
                  <span>Play Intro Film</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between py-2.5 text-lg font-serif-luxury tracking-widest text-neutral-200 hover:text-amber-400 border-b border-white/5 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-amber-500/60" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-4 text-xs font-sans-modern text-neutral-400">
              <div className="flex items-center justify-between">
                <span>Showroom Audio</span>
                <button
                  onClick={toggleSound}
                  className="px-3 py-1 rounded-full border border-amber-500/30 text-amber-400 text-xs"
                >
                  {isSoundOn ? 'Mute' : 'Play Sound'}
                </button>
              </div>
              <p className="tracking-widest uppercase font-mono-tech text-[10px] text-amber-500/70">
                God Asura Luxury Showroom • Drive Beyond Limits
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
