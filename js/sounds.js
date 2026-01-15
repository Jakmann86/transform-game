// Sound effects using Web Audio API
// Modern whoosh, success, and error sounds

let audioContext = null;
let soundsEnabled = true;

// Initialize audio context (must be called after user interaction)
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Play a sound effect
function playSound(type) {
    if (!soundsEnabled) return;
    
    try {
        initAudio();
        
        switch(type) {
            case 'transform':
                playTransformSound();
                break;
            case 'success':
                playSuccessSound();
                break;
            case 'error':
                playErrorSound();
                break;
            case 'undo':
                playUndoSound();
                break;
            case 'worldComplete':
                playWorldCompleteSound();
                break;
            case 'streak':
                playStreakSound();
                break;
        }
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Modern whoosh sound for transformations
function playTransformSound() {
    const ctx = audioContext;
    const now = ctx.currentTime;
    
    // Create oscillator for whoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    // Frequency sweep (high to low)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    
    // Low-pass filter for smoother sound
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.15);
    
    // Volume envelope
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    // Connect nodes
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
    
    // Add noise layer for texture
    addNoiseLayer(ctx, now, 0.15, 0.05);
}

// Success chime
function playSuccessSound() {
    const ctx = audioContext;
    const now = ctx.currentTime;
    
    // Arpeggio of notes
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const startTime = now + i * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.4);
    });
    
    // Add sparkle
    addSparkle(ctx, now + 0.2);
}

// Error buzz
function playErrorSound() {
    const ctx = audioContext;
    const now = ctx.currentTime;
    
    // Low buzz
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.15);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.2);
    
    // Second tone for dissonance
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(155, now);
    osc2.frequency.linearRampToValueAtTime(95, now + 0.15);
    
    gain2.gain.setValueAtTime(0.08, now);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.start(now);
    osc2.stop(now + 0.2);
}

// Undo sound (reverse whoosh)
function playUndoSound() {
    const ctx = audioContext;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    // Frequency sweep (low to high - reverse of transform)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(1500, now + 0.12);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
}

// World complete fanfare
function playWorldCompleteSound() {
    const ctx = audioContext;
    const now = ctx.currentTime;
    
    // Triumphant chord progression
    const chords = [
        [261.63, 329.63, 392.00], // C major
        [293.66, 369.99, 440.00], // D major
        [329.63, 415.30, 493.88], // E major
        [349.23, 440.00, 523.25]  // F major
    ];
    
    chords.forEach((chord, i) => {
        const startTime = now + i * 0.2;
        
        chord.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'triangle';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
            gain.gain.setValueAtTime(0.08, startTime + 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(startTime);
            osc.stop(startTime + 0.5);
        });
    });
}

// Streak sound (rising pitch)
function playStreakSound(streakCount = 1) {
    const ctx = audioContext;
    const now = ctx.currentTime;
    
    // Higher pitch for higher streaks
    const baseFreq = 400 + (streakCount * 50);
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.1);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
}

// Helper: Add noise layer
function addNoiseLayer(ctx, startTime, duration, volume) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    
    const noise = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    noise.buffer = buffer;
    
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 1;
    
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(startTime);
    noise.stop(startTime + duration);
}

// Helper: Add sparkle effect
function addSparkle(ctx, startTime) {
    const frequencies = [2000, 2500, 3000, 3500];
    
    frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const time = startTime + i * 0.03;
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.03, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        osc.stop(time + 0.1);
    });
}

// Toggle sounds
function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    return soundsEnabled;
}

// Initialize audio on first user interaction
document.addEventListener('click', function initOnClick() {
    initAudio();
    document.removeEventListener('click', initOnClick);
}, { once: true });