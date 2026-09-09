import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Sliders, Shield, Download, Mail, RefreshCw } from 'lucide-react';
import { Vehicle } from '../types';
import { SHOWROOM_VEHICLES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface InteractiveConfiguratorProps {
  initialVehicle?: Vehicle;
  onInquireConfig: (summary: string) => void;
}

export const InteractiveConfigurator: React.FC<InteractiveConfiguratorProps> = ({
  initialVehicle,
  onInquireConfig,
}) => {
  const configurableVehicles = SHOWROOM_VEHICLES.slice(0, 6);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    initialVehicle || configurableVehicles[0]
  );

  // Exterior Finishes
  const exteriorFinishes = [
    { name: 'Obsidian Black', hex: '#0f172a', metallic: '#1e293b', price: 0, previewFilter: 'contrast(1.15) brightness(0.85)' },
    { name: 'Pearl White', hex: '#f8fafc', metallic: '#e2e8f0', price: 2800, previewFilter: 'brightness(1.18) contrast(1.05)' },
    { name: 'Racing Red', hex: '#dc2626', metallic: '#991b1b', price: 3900, previewFilter: 'sepia(0.6) hue-rotate(320deg) saturate(2)' },
    { name: 'Liquid Silver', hex: '#94a3b8', metallic: '#cbd5e1', price: 1500, previewFilter: 'grayscale(0.6) brightness(1.1)' },
    { name: 'Midnight Blue', hex: '#1e3a8a', metallic: '#172554', price: 4200, previewFilter: 'sepia(0.4) hue-rotate(180deg) saturate(1.8)' },
    { name: 'Emerald Green', hex: '#065f46', metallic: '#047857', price: 4800, previewFilter: 'sepia(0.5) hue-rotate(85deg) saturate(1.6)' },
  ];

  // Wheels
  const wheelChoices = [
    { id: 'sport', name: '20/21" Lightweight Sport Forged', desc: 'Satin Dark Chrome finish', price: 0 },
    { id: 'performance', name: '20/21" Performance Aeroblade Carbon', desc: 'Directional aero turbine', price: 8500 },
    { id: 'carbon', name: '21" Monolithic Carbon Fiber Weave', desc: 'Track-tested ultralight 6.8kg', price: 16200 },
  ];

  // Interior Themes
  const interiorChoices = [
    { id: 'black', name: 'Obsidian Black Nappa & Alcantara', hex: '#18181b', accent: '#dc2626', desc: 'Raw carbon trim with crimson contrast stitching', price: 0 },
    { id: 'tan', name: 'Tuscan Tan Hand-Tanned Hides', hex: '#92400e', accent: '#d97706', desc: 'Open-pore burl walnut veneers with warm saddle tones', price: 4200 },
    { id: 'burgundy', name: 'Connolly Burgundy & Diamond Quilting', hex: '#831843', accent: '#fda4af', desc: 'Deep wine red with 400,000 diamond-stitched micro-perforations', price: 6800 },
    { id: 'cream', name: 'Royal Cream & Polished Platinum', hex: '#fef3c7', accent: '#f59e0b', desc: 'Butter-soft Scandinavian hides with champagne piping', price: 5400 },
  ];

  const [activeExterior, setActiveExterior] = useState(exteriorFinishes[0]);
  const [activeWheel, setActiveWheel] = useState(wheelChoices[0]);
  const [activeInterior, setActiveInterior] = useState(interiorChoices[0]);
  const [activeTab, setActiveTab] = useState<'exterior' | 'wheels' | 'interior' | 'bespoke'>('exterior');

  // Bespoke Option Toggles
  const [options, setOptions] = useState({
    carbonCeramicBrakes: true,
    starlightHeadliner: false,
    titaniumSportExhaust: true,
    bespokeLuggageSet: false,
  });

  const optionPrices = {
    carbonCeramicBrakes: 12500,
    starlightHeadliner: 14800,
    titaniumSportExhaust: 9200,
    bespokeLuggageSet: 7500,
  };

  // Calculate dynamic total price
  const totalPrice =
    selectedVehicle.price +
    activeExterior.price +
    activeWheel.price +
    activeInterior.price +
    (options.carbonCeramicBrakes ? optionPrices.carbonCeramicBrakes : 0) +
    (options.starlightHeadliner ? optionPrices.starlightHeadliner : 0) +
    (options.titaniumSportExhaust ? optionPrices.titaniumSportExhaust : 0) +
    (options.bespokeLuggageSet ? optionPrices.bespokeLuggageSet : 0);

  const formattedTotalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const handleToggleOption = (key: keyof typeof options) => {
    luxuryAudio.playClick(800);
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInquire = () => {
    luxuryAudio.playClick(900);
    const summary = `${selectedVehicle.brand} ${selectedVehicle.model} configured in ${activeExterior.name}, ${activeWheel.name}, and ${activeInterior.name} interior. Total: ${formattedTotalPrice}`;
    onInquireConfig(summary);
  };

  return (
    <section id="configurator" className="relative w-full py-28 bg-[#09090c] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 / BESPOKE ATELIER</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Build Your Dream Car
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest">
              Vehicle Base:
            </span>
            <select
              value={selectedVehicle.id}
              onChange={(e) => {
                const found = configurableVehicles.find((v) => v.id === e.target.value);
                if (found) {
                  luxuryAudio.playClick(850);
                  setSelectedVehicle(found);
                }
              }}
              className="bg-[#14141a] border border-white/10 text-white rounded-full px-4 py-2 font-sans-modern text-xs focus:outline-none focus:border-amber-400/60 cursor-pointer"
            >
              {configurableVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model} ({v.formattedPrice})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Configurator Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive 3D/Visual Studio Stage */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0c0c10] shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center group">
              {/* Studio Stage Spotlight Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,6,0.15),rgba(5,5,8,0.95))]" />

              {/* Dynamic Vehicle Image with Applied Custom Shader / Finish Filter */}
              <motion.div
                key={`${selectedVehicle.id}-${activeExterior.name}-${activeTab}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                <img
                  src={activeTab === 'interior' ? selectedVehicle.interiorImage : selectedVehicle.heroImage}
                  alt={selectedVehicle.model}
                  referrerPolicy="no-referrer"
                  style={{
                    filter: activeTab === 'interior' ? 'none' : activeExterior.previewFilter,
                  }}
                  className="w-full h-full object-cover object-center transition-all duration-700"
                />
              </motion.div>

              {/* Studio Floor Reflection Grid */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/70 to-transparent" />

              {/* Real-time Config Watermark Pill */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono-tech text-[11px] text-neutral-300">
                <div
                  className="w-3 h-3 rounded-full border border-white/40"
                  style={{ backgroundColor: activeExterior.hex }}
                />
                <span>{activeExterior.name}</span>
                <span className="text-white/40">•</span>
                <span>{activeWheel.name.split(' ')[0]}</span>
              </div>

              {/* Quick Audio Start */}
              <button
                onClick={() => luxuryAudio.playEngineRev('V12')}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-black/60 hover:bg-amber-400/20 text-neutral-300 hover:text-amber-300 border border-white/10 transition-colors"
                title="Ignite Engine"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
              </button>

              {/* View Mode Indicator on Image Bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono-tech text-neutral-400">
                <span>Model: {selectedVehicle.brand} {selectedVehicle.model}</span>
                <span className="text-amber-400 font-semibold">{activeTab.toUpperCase()} STUDIO VIEW</span>
              </div>
            </div>

            {/* Live Pricing Ticker Bar */}
            <div className="p-6 rounded-2xl bg-[#121218] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">
                  Configured Commission Estimate
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-amber-300">
                    {formattedTotalPrice}
                  </span>
                  <span className="font-mono-tech text-xs text-neutral-400">
                    (Base: {selectedVehicle.formattedPrice})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleInquire}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-sans-modern font-bold text-xs tracking-wider uppercase transition-all hover:brightness-110 shadow-[0_0_20px_rgba(217,119,6,0.35)] flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Request Bespoke Allocation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Customization Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#121218] border border-white/10">
              {(['exterior', 'wheels', 'interior', 'bespoke'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    luxuryAudio.playClick(850);
                    setActiveTab(tab);
                  }}
                  className={`flex-1 py-2 rounded-full font-sans-modern text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: Exterior Colors */}
            {activeTab === 'exterior' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest">
                    Select Paint Finish
                  </span>
                  <span className="font-mono-tech text-xs text-amber-400 font-semibold">
                    {activeExterior.name} {activeExterior.price > 0 && `(+${activeExterior.price.toLocaleString()})`}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {exteriorFinishes.map((paint) => {
                    const isSelected = activeExterior.name === paint.name;
                    return (
                      <button
                        key={paint.name}
                        onClick={() => {
                          luxuryAudio.playClick(900);
                          setActiveExterior(paint);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(217,119,6,0.25)]'
                            : 'border-white/10 bg-[#121218] hover:border-white/25'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded-lg mb-2 shadow-inner border border-white/20"
                          style={{
                            background: `linear-gradient(135deg, ${paint.hex}, ${paint.metallic})`,
                          }}
                        />
                        <p className="font-sans-modern font-semibold text-xs text-white truncate">{paint.name}</p>
                        <p className="font-mono-tech text-[10px] text-neutral-400 mt-0.5">
                          {paint.price === 0 ? 'Standard' : `+$${paint.price}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Wheels */}
            {activeTab === 'wheels' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <span className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest block">
                  Select Wheel Architecture
                </span>

                {wheelChoices.map((wheel) => {
                  const isSelected = activeWheel.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      onClick={() => {
                        luxuryAudio.playClick(900);
                        setActiveWheel(wheel);
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-white/10 bg-[#121218] hover:border-white/25'
                      }`}
                    >
                      <div>
                        <p className="font-serif-luxury font-bold text-sm text-white">{wheel.name}</p>
                        <p className="font-sans-modern text-xs text-neutral-400 mt-0.5">{wheel.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono-tech text-xs font-semibold text-amber-300">
                          {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 ml-auto mt-1" />}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Tab 3: Interior */}
            {activeTab === 'interior' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <span className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest block">
                  Select Atelier Upholstery
                </span>

                {interiorChoices.map((interior) => {
                  const isSelected = activeInterior.id === interior.id;
                  return (
                    <button
                      key={interior.id}
                      onClick={() => {
                        luxuryAudio.playClick(900);
                        setActiveInterior(interior);
                      }}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-white/10 bg-[#121218] hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full border border-white/30 flex-shrink-0"
                          style={{ backgroundColor: interior.hex }}
                        />
                        <div>
                          <p className="font-serif-luxury font-bold text-sm text-white">{interior.name}</p>
                          <p className="font-sans-modern text-xs text-neutral-400 mt-0.5">{interior.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono-tech text-xs font-semibold text-amber-300">
                          {interior.price === 0 ? 'Included' : `+$${interior.price.toLocaleString()}`}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 ml-auto mt-1" />}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Tab 4: Bespoke Packages */}
            {activeTab === 'bespoke' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <span className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest block">
                  Bespoke Options & Equipment
                </span>

                {[
                  {
                    key: 'carbonCeramicBrakes' as const,
                    title: 'Carbon Ceramic Braking System',
                    desc: '420mm front rotors with 10-piston monobloc titanium calipers',
                    price: optionPrices.carbonCeramicBrakes,
                  },
                  {
                    key: 'starlightHeadliner' as const,
                    title: 'Starlight Fiber-Optic Ceiling',
                    desc: '1,340 hand-fitted fiber-optic stars with shooting star algorithm',
                    price: optionPrices.starlightHeadliner,
                  },
                  {
                    key: 'titaniumSportExhaust' as const,
                    title: 'Titanium Inconel Exhaust System',
                    desc: 'Weight reduction of 18kg with electronically actuated sound valves',
                    price: optionPrices.titaniumSportExhaust,
                  },
                  {
                    key: 'bespokeLuggageSet' as const,
                    title: 'Matched 5-Piece Leather Luggage',
                    desc: 'Handmade Connolly leather duffels tailored to trunk contours',
                    price: optionPrices.bespokeLuggageSet,
                  },
                ].map((item) => {
                  const isActive = options[item.key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleToggleOption(item.key)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-white/10 bg-[#121218] hover:border-white/25'
                      }`}
                    >
                      <div>
                        <p className="font-serif-luxury font-bold text-sm text-white">{item.title}</p>
                        <p className="font-sans-modern text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono-tech text-xs font-semibold text-amber-300 block">
                          +${item.price.toLocaleString()}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border mt-1.5 flex items-center justify-center ml-auto ${
                            isActive ? 'bg-amber-400 border-amber-400 text-black' : 'border-white/20'
                          }`}
                        >
                          {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
