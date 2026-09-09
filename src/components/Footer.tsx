import React, { useState } from 'react';
import { BrandLogoEmblem } from './BrandLogoEmblem';
import { MapPin, Mail, ArrowRight, ShieldCheck, Phone, Globe, Sparkles } from 'lucide-react';
import { luxuryAudio } from '../utils/audio';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const ateliers = [
    { city: 'Monaco', address: '14 Quai Jean-Charles Rey, Port Hercule', phone: '+377 98 06 20 00' },
    { city: 'Zurich', address: 'Bahnhofstrasse 45, 8001 Zürich', phone: '+41 44 220 50 00' },
    { city: 'London', address: '12 Berkeley Square, Mayfair, London', phone: '+44 20 7499 8000' },
    { city: 'Dubai', address: 'Gate Village 04, DIFC, Dubai', phone: '+971 4 362 7000' },
    { city: 'Los Angeles', address: '9600 Wilshire Blvd, Beverly Hills', phone: '+1 310 550 4000' },
    { city: 'Tokyo', address: '6-10-1 Roppongi Hills, Minato-ku', phone: '+81 3 6406 6000' },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    luxuryAudio.playClick(900);
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="relative bg-[#040406] text-neutral-400 border-t border-white/10 overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-amber-500/5 blur-[160px] pointer-events-none" />

      {/* Top Banner: Bespoke Newsletter & Private Allocations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-amber-400 font-semibold block mb-2">
              Privileged Dispatch
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              First Notice On Limited Allocations
            </h3>
            <p className="font-sans-modern text-xs text-neutral-400 mt-2 font-light max-w-md">
              Receive confidential telegraphs prior to public manufacture announcements,
              chassis build slots, and private track day invitations.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your confidential email..."
                  className="flex-1 bg-[#0b0b10] border border-white/15 focus:border-amber-400 rounded-full px-5 py-3.5 text-xs text-white placeholder-neutral-400 focus:outline-none transition-colors font-sans-modern"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-sans-modern font-bold text-xs tracking-widest uppercase transition-all hover:brightness-110 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Join Atelier Registry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-full bg-amber-400/10 border border-amber-400/30 text-center font-mono-tech text-xs text-amber-300">
                Registered to Private Atelier Dispatch • Welcome to God Asura
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & International Ateliers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogoEmblem size="md" />
            <p className="font-sans-modern text-xs text-neutral-400 leading-relaxed font-light mt-4 max-w-sm">
              God Asura represents the international confluence of artisanal coachbuilding,
              motorsport engineering, and high-security luxury client stewardship.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono-tech text-amber-400/80 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Sovereign Quality Verified</span>
            </div>
          </div>

          {/* Global Ateliers Col */}
          <div className="lg:col-span-5">
            <p className="font-serif-luxury text-sm font-bold text-white uppercase tracking-widest mb-6">
              International Salons & Vaults
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ateliers.map((item) => (
                <div key={item.city} className="space-y-1">
                  <div className="flex items-center gap-1.5 font-serif-luxury text-xs font-bold text-amber-300 uppercase">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{item.city}</span>
                  </div>
                  <p className="font-sans-modern text-[11px] text-neutral-400">{item.address}</p>
                  <p className="font-mono-tech text-[10px] text-neutral-400">{item.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-serif-luxury text-sm font-bold text-white uppercase tracking-widest mb-6">
              Navigation
            </p>
            <ul className="space-y-2.5 font-sans-modern text-xs">
              {[
                { name: 'Global Vehicle Collection', href: '#collection' },
                { name: 'Sovereign Marques', href: '#brands' },
                { name: 'Bespoke Atelier Configurator', href: '#configurator' },
                { name: 'Telemetry Benchmark Comparator', href: '#comparison' },
                { name: 'The Art of Performance', href: '#performance' },
                { name: 'Electric Hypercar Future', href: '#electric-future' },
                { name: 'Chronicles of Heritage', href: '#heritage' },
                { name: 'Privileged Client Experiences', href: '#experiences' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => luxuryAudio.playClick(750)}
                    className="hover:text-amber-400 transition-colors block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Provenance */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-neutral-400">
          <p>© {new Date().getFullYear()} GOD ASURA LUXURY AUTOMOTIVE GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">TERMS OF COMMISSION</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">CONFIDENTIAL ESCROW</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">SECURITY PRIVACY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
