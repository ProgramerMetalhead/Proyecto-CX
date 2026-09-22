import React, { useMemo } from 'react'

export default function GreenFieldStarsBackground() {
  // Stars in the night sky
  const stars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 65, // Keep stars mostly in the upper sky
      size: Math.random() * 2.8 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2.5,
      opacity: Math.random() * 0.7 + 0.3,
      color: i % 4 === 0 ? '#fef08a' : i % 4 === 1 ? '#a7f3d0' : '#ffffff', // soft warm gold, mint starlight, white
    }))
  }, [])

  // Floating Fireflies (Luciérnagas) in the green field
  const fireflies = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      y: Math.random() * 45 + 50, // Rise from the meadow
      size: Math.random() * 4 + 3,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 4,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* ----------------- 1. NIGHT SKY GRADIENT ----------------- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020d18] via-[#052026] via-45% to-[#08332c]" />

      {/* Subtle starlight auroral glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl h-[450px] bg-radial from-emerald-500/10 via-teal-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ----------------- 2. LUMINOUS NIGHT MOON ----------------- */}
      <div className="absolute top-6 right-6 md:top-10 md:right-14 flex flex-col items-center opacity-90">
        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 shadow-[0_0_50px_rgba(254,240,138,0.55),inset_0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center border border-amber-100/60">
          {/* Subtle moon crater spots */}
          <div className="w-4 h-4 rounded-full bg-amber-200/40 absolute top-4 left-5" />
          <div className="w-6 h-6 rounded-full bg-amber-200/30 absolute bottom-5 right-5" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-200/40 absolute top-9 right-4" />
          <span className="text-sm select-none opacity-80">✨</span>
        </div>
        <span className="mt-1 text-[10px] text-emerald-200/80 font-['Patrick_Hand'] tracking-wider">
          Noche estrellada 🌙
        </span>
      </div>

      {/* ----------------- 3. TWINKLING STARS IN THE SKY ----------------- */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 8px 1.5px ${star.color}`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* ----------------- 4. LAYERED GREEN FIELD & MEADOW HILLS ----------------- */}
      <div className="absolute bottom-0 inset-x-0 w-full flex items-end justify-center pointer-events-none">
        <svg
          viewBox="0 0 1440 380"
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Hill 1 - Distant Back Hill (Forest Teal-Green) */}
            <linearGradient id="hillBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#08382c" />
              <stop offset="100%" stopColor="#041f18" />
            </linearGradient>

            {/* Hill 2 - Mid Hill (Rich Lush Emerald Green) */}
            <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f543e" />
              <stop offset="100%" stopColor="#062e22" />
            </linearGradient>

            {/* Hill 3 - Foreground Meadow (Vibrant Night Meadow) */}
            <linearGradient id="hillFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#157347" />
              <stop offset="50%" stopColor="#0d5234" />
              <stop offset="100%" stopColor="#052618" />
            </linearGradient>
          </defs>

          {/* Distant Hills Silhouette */}
          <path
            d="M 0 240 Q 360 140, 720 190 T 1440 180 L 1440 380 L 0 380 Z"
            fill="url(#hillBack)"
            opacity="0.85"
          />

          {/* Distant Pine / Oak Trees Silhouettes on back ridge */}
          <g fill="#04211a" opacity="0.75">
            <polygon points="120,200 130,165 140,200" />
            <polygon points="135,202 145,160 155,202" />
            <polygon points="150,205 160,172 170,205" />
            <polygon points="460,185 470,145 480,185" />
            <polygon points="475,188 485,140 495,188" />
            <polygon points="1120,195 1130,155 1140,195" />
            <polygon points="1135,198 1145,150 1155,198" />
          </g>

          {/* Mid Layer Rolling Hill */}
          <path
            d="M 0 270 Q 280 200, 600 240 T 1200 220 Q 1340 230, 1440 250 L 1440 380 L 0 380 Z"
            fill="url(#hillMid)"
          />

          {/* Foreground Rich Grassy Meadow */}
          <path
            d="M 0 310 Q 350 250, 780 290 T 1440 280 L 1440 380 L 0 380 Z"
            fill="url(#hillFront)"
          />

          {/* Wildflowers and blades of grass along the meadow edge */}
          <g fill="#fef08a" opacity="0.9">
            {/* Tiny night blossoms */}
            <circle cx="80" cy="345" r="3" />
            <circle cx="140" cy="355" r="2.5" />
            <circle cx="210" cy="335" r="3" />
            <circle cx="320" cy="350" r="2.5" fill="#f472b6" />
            <circle cx="390" cy="330" r="3" />
            <circle cx="510" cy="340" r="2.5" fill="#a7f3d0" />
            <circle cx="620" cy="355" r="3" fill="#fef08a" />
            <circle cx="730" cy="335" r="2.5" fill="#f472b6" />
            <circle cx="860" cy="345" r="3" fill="#a7f3d0" />
            <circle cx="980" cy="335" r="3" fill="#fef08a" />
            <circle cx="1100" cy="350" r="2.5" fill="#f472b6" />
            <circle cx="1240" cy="340" r="3" fill="#fef08a" />
            <circle cx="1380" cy="345" r="2.5" fill="#a7f3d0" />
          </g>
        </svg>

        {/* Soft bottom meadow shadow blending into page end */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#021810] to-transparent" />
      </div>

      {/* ----------------- 5. GLOWING FIREFLIES (LUCIÉRNAGAS) ----------------- */}
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            backgroundColor: '#bef264', // Warm lime yellow firefly glow
            boxShadow: '0 0 12px 3px rgba(190, 242, 100, 0.8), 0 0 20px 6px rgba(132, 204, 22, 0.4)',
            animation: `floatSlow ${fly.duration}s ease-in-out infinite, gentlePulse 2s ease-in-out infinite`,
            animationDelay: `${fly.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
