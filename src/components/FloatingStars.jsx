import React, { useMemo } from 'react'

export default function FloatingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.7 + 0.3,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 8px 2px rgba(254, 240, 138, 0.6)',
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
