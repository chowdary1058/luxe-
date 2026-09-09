import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Shield, Calendar, MapPin, Send, PhoneCall } from 'lucide-react';
import { Vehicle, ExperienceOffering } from '../types';
import { luxuryAudio } from '../utils/audio';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetVehicle?: Vehicle | null;
  targetExperience?: ExperienceOffering | null;
  customSummary?: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  targetVehicle,
  targetExperience,
  customSummary,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    atelierLocation: 'Monaco Private Atelier',
    preferredDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    luxuryAudio.playClick(900);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      atelierLocation: 'Monaco Private Atelier',
      preferredDate: '',
      notes: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-[#0e0e14] border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-8"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => {
              luxuryAudio.playClick(700);
              onClose();
            }}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold block mb-2">
                  White-Glove Private Concierge
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                  {targetVehicle
                    ? `Private Allocation: ${targetVehicle.brand} ${targetVehicle.model}`
                    : targetExperience
                    ? `Experience Invitation: ${targetExperience.title}`
                    : 'Confidential Commission Inquiry'}
                </h3>
                <p className="font-sans-modern text-xs text-neutral-400 mt-2 font-light leading-relaxed">
                  Our private client directors provide bespoke chassis allocations, factory delivery arrangements,
                  and confidential international transit.
                </p>

                {customSummary && (
                  <div className="mt-3 p-3 rounded-lg bg-black/50 border border-amber-500/20 font-mono-tech text-[11px] text-amber-300">
                    {customSummary}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Client Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Lord / Lady / Mr. / Ms. Alexander Sterling"
                    className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-sans-modern"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Confidential Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@familyoffice.com"
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-sans-modern"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Direct Telephone / Signal
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 20 7946 0912"
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-sans-modern"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Preferred Atelier Lounge
                    </label>
                    <select
                      value={formData.atelierLocation}
                      onChange={(e) => setFormData({ ...formData, atelierLocation: e.target.value })}
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-sans-modern"
                    >
                      <option value="Monaco Private Atelier">Monaco • Port Hercule Pavilion</option>
                      <option value="Zurich Private Vault">Zurich • Bahnhofstrasse Vault</option>
                      <option value="London Mayfair Lounge">London • Mayfair Atelier</option>
                      <option value="Dubai DIFC Lounge">Dubai • DIFC Gate Sky Lounge</option>
                      <option value="Los Angeles Beverly Hills">Los Angeles • Beverly Hills Salon</option>
                      <option value="Tokyo Ginza Atelier">Tokyo • Ginza Precision Studio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Preferred Date Window
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-sans-modern"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Bespoke Directives & Trade-In Inquiries
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Detail bespoke PTS coachwork preferences, private air transport logistics, or existing vehicle consignment..."
                    className="w-full bg-[#14141c] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors font-sans-modern"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-black font-sans-modern font-bold text-xs tracking-widest uppercase transition-all hover:brightness-110 shadow-[0_0_25px_rgba(217,119,6,0.35)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Transmit Private Brief</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-mono-tech text-neutral-400 uppercase">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>256-Bit Encrypted Transmission • Non-Disclosure Adherent</span>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center mx-auto mb-6 text-amber-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold block mb-2">
                Transmission Confirmed
              </span>

              <h3 className="font-serif-luxury text-3xl font-bold text-white uppercase">
                Direct Dossier Dispatched
              </h3>

              <p className="font-sans-modern text-sm text-neutral-300 font-light mt-4 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-amber-300 font-semibold">{formData.fullName}</span>.
                Your private dossier has been routed to our Managing Director at the{' '}
                <span className="text-white">{formData.atelierLocation}</span>. An encrypted confirmation will arrive at{' '}
                <span className="text-neutral-200">{formData.email}</span> within two business hours.
              </p>

              <button
                onClick={handleReset}
                className="mt-8 px-8 py-3 rounded-full border border-amber-400/50 text-amber-300 font-sans-modern text-xs uppercase tracking-widest hover:bg-amber-400/10 transition-colors"
              >
                Return to Showroom
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
