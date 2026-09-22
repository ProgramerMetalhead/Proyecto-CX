// Audio effects using Web Audio API (Zero external assets needed)
let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

/**
 * Realistic gentle page turn / paper rustle sound
 */
export function playPageTurnSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const bufferSize = ctx.sampleRate * 0.15
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    
    // Generate pinkish soft noise
    let b0 = 0, b1 = 0, b2 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      const pink = b0 + b1 + b2 + white * 0.5362
      const env = Math.sin((i / bufferSize) * Math.PI)
      data[i] = pink * 0.06 * env
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.4, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start()
  } catch {
    // Graceful fallback
  }
}

/**
 * Heavy antique leather book opening sound
 */
export function playBookOpenSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Part 1: Deep leather hinge creak / whoosh
    const bufferSize = ctx.sampleRate * 0.35
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      const env = Math.sin((i / bufferSize) * Math.PI)
      data[i] = white * 0.08 * env
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(350, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.3)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.35, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start()

    // Part 2: Fairy chime sparkle on opening
    playMagicSpellSound()
  } catch {
    // Graceful fallback
  }
}

/**
 * Heavy antique leather book closing thud / snap sound
 */
export function playBookCloseSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.22)

    gain.gain.setValueAtTime(0.55, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.25)

    // Paper flap noise
    const bufferSize = ctx.sampleRate * 0.12
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.09 * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const nGain = ctx.createGain()
    nGain.gain.setValueAtTime(0.3, ctx.currentTime)
    nGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)
    noise.connect(nGain)
    nGain.connect(ctx.destination)
    noise.start()
  } catch {
    // Graceful fallback
  }
}

/**
 * Sweet music box chime when clicking interactive stars or cards
 */
export function playChimeSound(frequency = 659.25) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)

    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.8)
  } catch {
    // Graceful fallback
  }
}

/**
 * Magical fairy dust harp arpeggio
 */
export function playMagicSpellSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.08
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, startTime)

      gain.gain.setValueAtTime(0.15, startTime)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.6)
    })
  } catch {
    // Graceful fallback
  }
}

/**
 * Gentle heartbeat pop sound for sending hugs
 */
export function playHeartSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.18)

    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.2)
  } catch {
    // Graceful fallback
  }
}
