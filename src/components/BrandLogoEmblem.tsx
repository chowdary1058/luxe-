import React from 'react';

interface BrandLogoEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
  animate?: boolean;
}

export const BrandLogoEmblem: React.FC<BrandLogoEmblemProps> = ({
  size = 'md',
  showText = true,
  showTagline = true,
  className = '',
  animate = true,
}) => {
  const iconDimensions = {
    sm: { w: 38, h: 38 },
    md: { w: 56, h: 56 },
    lg: { w: 90, h: 90 },
    xl: { w: 140, h: 140 },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Luxury Winged Emblem SVG */}
      <div className={`relative flex-shrink-0 ${animate ? 'group cursor-pointer' : ''}`}>
        <svg
          width={iconDimensions.w}
          height={iconDimensions.h}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_0_15px_rgba(217,119,6,0.35)] transition-transform duration-500 ${
            animate ? 'group-hover:scale-105' : ''
          }`}
        >
          <defs>
            {/* Gold Metallic Gradients */}
            <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="75%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="50%" stopColor="#fef9c3" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            {/* Dark Asura Wing Gradient */}
            <linearGradient id="asuraDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Halo Glow */}
            <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Royal Ring */}
          <circle cx="100" cy="100" r="92" stroke="url(#goldMetallic)" strokeWidth="3" strokeDasharray="3 2" opacity="0.6" />
          <circle cx="100" cy="100" r="86" stroke="url(#goldShine)" strokeWidth="1.5" opacity="0.9" />

          {/* Halo over left angel wing */}
          <ellipse cx="65" cy="45" rx="16" ry="6" stroke="url(#goldShine)" strokeWidth="2" fill="none" opacity="0.8" />

          {/* Royal Crown on Top */}
          <path
            d="M 82,34 L 88,48 L 100,30 L 112,48 L 118,34 L 116,54 L 84,54 Z"
            fill="url(#goldMetallic)"
            stroke="#fef08a"
            strokeWidth="1.2"
          />
          <circle cx="100" cy="30" r="2.5" fill="#ffffff" />
          <circle cx="82" cy="34" r="2" fill="#ffffff" />
          <circle cx="118" cy="34" r="2" fill="#ffffff" />

          {/* Left Wing (Golden Divine Feathered Wing) */}
          <g filter="drop-shadow(0 0 6px rgba(234,179,8,0.5))">
            <path
              d="M 78,82 C 55,60 30,55 18,36 C 24,54 36,68 46,78 C 30,76 22,86 16,92 C 26,98 42,102 54,106 C 36,110 26,120 22,130 C 38,130 55,124 70,118 Z"
              fill="url(#goldMetallic)"
              stroke="#fef08a"
              strokeWidth="1"
            />
            {/* Wing Feather striations */}
            <path d="M 32,58 C 45,70 60,82 72,92" stroke="#fef9c3" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 28,84 C 42,92 56,102 68,110" stroke="#fef9c3" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 32,112 C 45,116 58,120 68,122" stroke="#fef9c3" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Right Wing (Asura Onyx-Black & Crimson Blade Wing) */}
          <g filter="drop-shadow(0 0 6px rgba(185,28,28,0.4))">
            <path
              d="M 122,82 C 145,60 170,55 182,36 C 176,54 164,68 154,78 C 170,76 178,86 184,92 C 174,98 158,102 146,106 C 164,110 174,120 178,130 C 162,130 145,124 130,118 Z"
              fill="url(#asuraDark)"
              stroke="#ef4444"
              strokeWidth="1.2"
            />
            <path d="M 168,58 C 155,70 140,82 128,92" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 172,84 C 158,92 144,102 132,110" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Center Monogram: G & A Intertwined */}
          <g>
            {/* Outer G curved sweep */}
            <path
              d="M 112,74 C 98,62 76,68 68,88 C 60,108 72,126 94,128 C 108,129 118,122 122,114 L 122,98 L 96,98 L 96,106 L 112,106 L 112,112 C 106,118 98,120 92,118 C 78,114 74,100 80,88 C 85,78 98,74 108,82 Z"
              fill="url(#goldShine)"
              stroke="#fff"
              strokeWidth="0.8"
            />
            {/* Bold Sharp 'A' Apex */}
            <path
              d="M 102,68 L 128,128 L 116,128 L 110,114 L 94,114 L 88,128 L 78,128 L 102,68 Z M 102,86 L 97,106 L 107,106 Z"
              fill="url(#goldMetallic)"
              stroke="#fef08a"
              strokeWidth="1"
            />
          </g>

          {/* Supercar Front Silhouette at Bottom */}
          <g transform="translate(0, 10)">
            {/* Windshield and roof */}
            <path
              d="M 76,132 C 84,124 116,124 124,132 L 138,142 L 62,142 Z"
              fill="#09090b"
              stroke="url(#goldMetallic)"
              strokeWidth="1"
            />
            {/* Low-slung Hood & Aerodynamic Front Splitter */}
            <path
              d="M 58,142 C 68,140 132,140 142,142 L 148,154 C 140,158 60,158 52,154 Z"
              fill="#18181b"
              stroke="url(#goldShine)"
              strokeWidth="1.2"
            />
            {/* Luminous LED Headlights */}
            <polygon points="64,145 74,144 80,147 68,148" fill="#fef08a" filter="drop-shadow(0 0 5px #fde047)" />
            <polygon points="136,145 126,144 120,147 132,148" fill="#fef08a" filter="drop-shadow(0 0 5px #fde047)" />
            {/* Front Intake Grille */}
            <polygon points="86,148 114,148 112,154 88,154" fill="#09090b" stroke="#ca8a04" strokeWidth="0.8" />
          </g>
        </svg>

        {/* Ambient Gold Particle/Glow backplate */}
        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl pointer-events-none -z-10" />
      </div>

      {/* Brand Name Typography matching official user logo */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <span className="font-serif-luxury text-base md:text-xl lg:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(217,119,6,0.3)] leading-none">
              GOD ASURA
            </span>
            <span className="text-[9px] font-sans-modern font-semibold text-amber-400/80 -translate-y-1">
              TM
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-2.5 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="font-sans-modern text-[8px] md:text-[9.5px] tracking-[0.32em] uppercase font-semibold text-neutral-300/90 whitespace-nowrap">
              Luxury Showroom
            </span>
            <span className="h-[1px] w-2.5 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>

          {showTagline && (
            <span className="font-sans-modern text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-amber-500/70 font-medium mt-0.5">
              Drive Beyond Limits
            </span>
          )}
        </div>
      )}
    </div>
  );
};
