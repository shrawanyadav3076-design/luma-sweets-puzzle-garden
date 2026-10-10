/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Web Audio API Sound & Music Synthesizer System
 * Generates high quality, procedural chimes, whooshes, explosions, fanfares, and ambient music
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.musicNode = null;
    this.musicTimer = null;
    this.isMusicPlaying = false;
    this.settings = { ...CONFIG.AUDIO_DEFAULTS };

    // Note frequencies for melodic chimes & music (Pentatonic Garden Scale)
    this.notes = {
      C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00,
      C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00,
      C6: 1046.50, D6: 1174.66, E6: 1318.51, G6: 1567.98
    };

    this.musicStep = 0;
  }

  initContext() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    } catch (_) {
      // AudioContext unavailable or restricted
    }
  }

  updateSettings(settings) {
    this.settings = { ...this.settings, ...settings };
    if (this.settings.masterMute || !this.settings.musicEnabled) {
      this.stopMusic();
    } else if (this.settings.musicEnabled && !this.isMusicPlaying) {
      this.startMusic();
    }
  }

  getEffectiveVolume(type = "sfx") {
    if (this.settings.masterMute) return 0;
    if (type === "music") {
      return this.settings.musicEnabled ? this.settings.musicVolume : 0;
    }
    return this.settings.sfxEnabled ? this.settings.sfxVolume : 0;
  }

  // --- Sound Effects Synthesis ---

  playButton() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.12 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playCandySelect() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(659.25, now); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.06);

    gain.gain.setValueAtTime(0.15 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playSwap() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);

    gain.gain.setValueAtTime(0.18 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  }

  playInvalidSwap() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.18);

    gain.gain.setValueAtTime(0.12 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  playMatch(comboCount = 1) {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const scale = [
      this.notes.C5,
      this.notes.E5,
      this.notes.G5,
      this.notes.A5,
      this.notes.C6,
      this.notes.D6,
      this.notes.E6,
      this.notes.G6
    ];
    const pitchIndex = Math.min(comboCount - 1, scale.length - 2);
    const baseFreq = scale[pitchIndex];
    const secondFreq = scale[pitchIndex + 1];

    const now = this.ctx.currentTime;

    [baseFreq, secondFreq].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.2 * vol, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.24);
    });
  }

  playLineBlast() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.25);

    gain.gain.setValueAtTime(0.25 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  playBombExplosion() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const now = this.ctx.currentTime;

    // Deep sub bass
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

    subGain.gain.setValueAtTime(0.4 * vol, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.42);

    // Sparkling high crackle
    const highOsc = this.ctx.createOscillator();
    const highGain = this.ctx.createGain();
    highOsc.type = "square";
    highOsc.frequency.setValueAtTime(800, now);
    highOsc.frequency.exponentialRampToValueAtTime(200, now + 0.2);

    highGain.gain.setValueAtTime(0.12 * vol, now);
    highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    highOsc.connect(highGain);
    highGain.connect(this.ctx.destination);

    highOsc.start(now);
    highOsc.stop(now + 0.22);
  }

  playRainbowLaser() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const now = this.ctx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

    arpeggio.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.18 * vol, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.22);
    });
  }

  playVictory() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const now = this.ctx.currentTime;
    const fanfare = [
      { f: this.notes.C5, t: 0.00, d: 0.15 },
      { f: this.notes.E5, t: 0.14, d: 0.15 },
      { f: this.notes.G5, t: 0.28, d: 0.15 },
      { f: this.notes.C6, t: 0.44, d: 0.45 },
      { f: this.notes.E6, t: 0.70, d: 0.60 }
    ];

    fanfare.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0.22 * vol, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.05);
    });
  }

  playDefeat() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const now = this.ctx.currentTime;
    const sadNotes = [
      { f: this.notes.G4, t: 0.00, d: 0.25 },
      { f: this.notes.E4, t: 0.22, d: 0.25 },
      { f: this.notes.D4, t: 0.44, d: 0.30 },
      { f: this.notes.C4, t: 0.70, d: 0.50 }
    ];

    sadNotes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, now + note.t);

      gain.gain.setValueAtTime(0.2 * vol, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.05);
    });
  }

  playBooster() {
    this.initContext();
    const vol = this.getEffectiveVolume("sfx");
    if (!this.ctx || vol <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.25);

    gain.gain.setValueAtTime(0.25 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // --- Background Ambient Music Loop ---
  startMusic() {
    this.initContext();
    if (this.isMusicPlaying || !this.settings.musicEnabled || this.settings.masterMute) {
      return;
    }
    this.isMusicPlaying = true;
    this.scheduleMusicPattern();
  }

  stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  scheduleMusicPattern() {
    if (!this.isMusicPlaying) return;

    const vol = this.getEffectiveVolume("music");
    if (this.ctx && vol > 0) {
      const melody = [
        this.notes.C5, this.notes.E5, this.notes.G5, this.notes.A5,
        this.notes.G5, this.notes.E5, this.notes.D5, this.notes.C5,
        this.notes.E5, this.notes.A5, this.notes.G5, this.notes.E5,
        this.notes.D5, this.notes.E5, this.notes.G5, this.notes.C5
      ];

      const freq = melody[this.musicStep % melody.length];
      const now = this.ctx.currentTime;

      // Gentle celesta chime
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);

      this.musicStep++;
    }

    // Next beat in 380ms (relaxing ~79 BPM tempo)
    this.musicTimer = setTimeout(() => {
      this.scheduleMusicPattern();
    }, 380);
  }
}

// Global Sound Instance
const Sound = new SoundSystem();
