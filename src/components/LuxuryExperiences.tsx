import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Calendar, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { ExperienceOffering } from '../types';
import { SHOWROOM_EXPERIENCES } from '../data/showroomData';
import { luxuryAudio } from '../utils/audio';

interface LuxuryExperiencesProps {
  onBookExperience: (experience: ExperienceOffering) => void;
}

export const LuxuryExperiences: React.FC<LuxuryExperiencesProps> = ({ onBookExperience }) => {
  return (
    <section id="experiences" className="relative w-full py-28 bg-[#060608] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>07 / PRIVILEGED ACCESS</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase">
              Bespoke Experiences
            </h2>
          </div>
          <p className="max-w-md font-sans-modern text-sm text-neutral-400 font-light leading-relaxed">
            Automotive mastery extends far beyond ownership. Immerse yourself in private Grand Prix circuits,
            exclusive manufacture ateliers, and Alpine driving rallies.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWROOM_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden flex flex-col justify-between group hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-500 shadow-xl"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono-tech text-[10px] uppercase tracking-wider text-amber-300">
                    {exp.category}
                  </span>

                  <span className="absolute bottom-2 left-3 flex items-center gap-1 font-mono-tech text-[11px] text-neutral-300">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{exp.location}</span>
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between font-mono-tech text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
                    <span>{exp.duration}</span>
                    <span>{exp.availability}</span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-white uppercase group-hover:text-amber-300 transition-colors">
                    {exp.title}
                  </h3>

                  <p className="mt-2 font-sans-modern text-xs text-neutral-300 font-light line-clamp-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 font-sans-modern text-[11px] text-neutral-400">
                    {exp.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 mt-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="font-mono-tech text-[10px] text-neutral-400 uppercase">Tariff</span>
                  <span className="font-serif-luxury text-base font-bold text-amber-300">
                    {exp.price}
                  </span>
                </div>

                <button
                  onClick={() => {
                    luxuryAudio.playClick(850);
                    onBookExperience(exp);
                  }}
                  className="mt-3 w-full py-2.5 rounded-full bg-white/5 hover:bg-amber-400 text-white hover:text-black font-sans-modern text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/10 hover:border-amber-400"
                >
                  <span>Reserve Invitation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
