import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, RotateCcw, Sparkles, Play, ShieldCheck } from 'lucide-react';
import { BrandLogoEmblem } from './BrandLogoEmblem';
import { luxuryAudio } from '../utils/audio';

interface BrandVideoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandVideoIntroModal: React.FC<BrandVideoIntroModalProps> = ({
  isOpen,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Canvas particle and starlight simulation
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate gold sparkles and embers
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      pulse: number;
    }

    const goldHues = ['#fde047', '#eab308', '#f59e0b', '#d97706', '#ffffff'];
    const particles: Particle[] = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      speedY: -(Math.random() * 1.5 + 0.4),
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      color: goldHues[Math.floor(Math.random() * goldHues.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      // Progress from 0 to 1 over 10 seconds, then loop or hold
      setProgress(Math.min((elapsed % 12) / 12, 1));

      ctx.clearRect(0, 0, width, height);

      // Dark radial spotlight background
      const radial = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      radial.addColorStop(0, 'rgba(30, 25, 15, 0.6)');
      radial.addColorStop(0.5, 'rgba(10, 10, 12, 0.95)');
      radial.addColorStop(1, 'rgba(5, 5, 7, 1)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Floor reflection line
      const floorY = height * 0.76;
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.1, floorY);
      ctx.lineTo(width * 0.9, floorY);
      ctx.stroke();

      // Render floating golden dust & sparkling stars
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.05;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Trigger engine rev sound on modal launch
    if (!isAudioMuted) {
      luxuryAudio.playEngineRev('V12');
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, isAudioMuted]);

  const handleRestart = () => {
    luxuryAudio.playClick(600);
    if (!isAudioMuted) {
      luxuryAudio.playEngineRev('V12');
    }
  };

  const toggleMute = () => {
    setIsAudioMuted(!isAudioMuted);
    luxuryAudio.playClick(800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8"
      >
        {/* Cinema Container */}
        <div className="relative w-full max-w-5xl h-[85vh] max-h-[760px] bg-[#09090b] border border-amber-500/20 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(217,119,6,0.15)] flex flex-col">
          {/* Top Bar Controls */}
          <div className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono-tech text-xs tracking-[0.25em] text-amber-400/90 uppercase font-semibold">
                4K HDR Cinema Presentation
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="p-2 text-neutral-400 hover:text-amber-400 hover:bg-white/5 rounded-full transition-colors"
                title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isAudioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={handleRestart}
                className="p-2 text-neutral-400 hover:text-amber-400 hover:bg-white/5 rounded-full transition-colors"
                title="Replay Sequence"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Interactive Cinematic Stage Canvas */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Central Animated Holographic Brand Reveal */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              {/* Emblem Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Aura rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/10 to-red-500/10 blur-2xl -z-10"
                />

                <BrandLogoEmblem size="xl" showText={false} />
              </motion.div>

              {/* Title Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-6 flex flex-col items-center"
              >
                <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_4px_25px_rgba(217,119,6,0.5)]">
                  GOD ASURA
                </h2>

                <div className="flex items-center gap-3 my-2">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                  <span className="font-sans-modern text-xs sm:text-sm tracking-[0.45em] uppercase font-bold text-neutral-300">
                    LUXURY SHOWROOM
                  </span>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                </div>

                <p className="font-sans-modern text-[11px] sm:text-xs tracking-[0.55em] uppercase font-medium text-amber-400/90 mt-1">
                  DRIVE BEYOND LIMITS
                </p>
              </motion.div>

              {/* Tagline / Curatorial Mission Statement */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="max-w-xl text-neutral-400 font-sans-modern text-sm mt-6 leading-relaxed font-light px-4"
              >
                The holy sanctuary of automotive sovereignty. Where titanium engineering meets
                haute-horlogerie aesthetics, reserved exclusively for the world’s most discerning collectors.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-4 mt-8"
              >
                <button
                  onClick={() => {
                    luxuryAudio.playEngineRev('V12');
                  }}
                  className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-sans-modern font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-[0_0_25px_rgba(217,119,6,0.4)] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Unleash V12 Engine Sound</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full border border-white/20 hover:border-amber-400/60 bg-white/5 hover:bg-amber-400/10 text-white font-sans-modern font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <span>Enter Showroom</span>
                  <span className="text-amber-400">→</span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Scrubber & Info bar */}
          <div className="relative z-20 px-6 py-3 border-t border-white/5 bg-black/50 backdrop-blur-md flex items-center justify-between text-[11px] text-neutral-400 font-mono-tech">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Global Trademark • God Asura Atelier</span>
            </div>

            {/* Video Progress Bar */}
            <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <span>2026 Sovereign Masterpiece</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
