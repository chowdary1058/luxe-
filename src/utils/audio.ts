// Web Audio API based ambient luxury soundscape and supercar engine synthesizer
class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  public isMuted: boolean = true;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAmbient(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      this.isMuted = true;
      return false;
    } else {
      this.startAmbient();
      this.isMuted = false;
      return true;
    }
  }

  public startAmbient() {
    this.initContext();
    if (!this.ctx) return;
    if (this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.06, now + 2);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(260, now);

      // Low 55Hz foundation note (A1 warm drone)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(55, now);

      // Warm 110Hz fifth/octave harmonic
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(110, now);

      this.ambientOsc1.connect(this.filter);
      this.ambientOsc2.connect(this.filter);
      this.filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
      this.isAmbientPlaying = true;
      this.isMuted = false;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        if (this.ambientOsc1) {
          this.ambientOsc1.stop();
          this.ambientOsc1.disconnect();
          this.ambientOsc1 = null;
        }
        if (this.ambientOsc2) {
          this.ambientOsc2.stop();
          this.ambientOsc2.disconnect();
          this.ambientOsc2 = null;
        }
        this.isAmbientPlaying = false;
      }, 1100);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  // Play luxury UI click / tactile feedback
  public playClick(pitch: number = 880) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, now + 0.05);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore click error
    }
  }

  // Synthesize realistic twin-turbo V8/V12 supercar roar
  public playEngineRev(cylinders: 'V8' | 'V12' | 'EV' = 'V8') {
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      if (cylinders === 'EV') {
        // Futuristic electric hypercar jet-turbine whine
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
        osc.frequency.exponentialRampToValueAtTime(600, now + 1.8);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 2.1);
        return;
      }

      // Combustion V8/V12 Growl
      const baseFreq = cylinders === 'V12' ? 70 : 55;
      const revMultiplier = cylinders === 'V12' ? 4.5 : 3.6;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const distortion = this.ctx.createWaveShaper();
      const filter = this.ctx.createBiquadFilter();

      // Custom soft-clipping curve for aggressive exhaust tone
      const curve = new Float32Array(256);
      for (let i = 0; i < 256; ++i) {
        const x = (i * 2) / 256 - 1;
        curve[i] = ((3 + 20) * x * 20 * (Math.PI / 180)) / (Math.PI + 20 * Math.abs(x));
      }
      distortion.curve = curve;
      distortion.oversample = '4x';

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(600, now + 1.8);

      // Pitch sweep mimicking throttle blip
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * revMultiplier, now + 0.6);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 1.8);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.5 * revMultiplier, now + 0.6);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 1.8);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc1.connect(distortion);
      osc2.connect(distortion);
      distortion.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.3);
      osc2.stop(now + 2.3);
    } catch {
      // Audio error safety
    }
  }
}

export const luxuryAudio = new LuxuryAudioEngine();
