import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Sparkles,
  Heart,
  CloudRain,
  Sun,
  CheckCircle2,
  HelpCircle,
  Wheat,
  Milk,
  Flame,
  Utensils
} from 'lucide-react'
import { playChimeSound, playMagicSpellSound, playHeartSound } from '../utils/soundEffects'

/* ----------------- CHAPTER 1: TERNURINES & RECUERDOS FELICES ----------------- */
export function TernurinesMemoriesScene({ onSparkle }) {
  const [activeMemory, setActiveMemory] = useState(0)

  const memories = [
    {
      emoji: "🧺",
      title: "Nuestros Picnics",
      desc: "Comer juntitos sobre el pasto verde, compartiendo risas y comida deliciosa bajo el sol."
    },
    {
      emoji: "🎬",
      title: "Tardes de Cine",
      desc: "Ir al cine a ver nuestras películas favoritas, bien abrazados en la oscuridad."
    },
    {
      emoji: "🎮",
      title: "Horas de Videojuegos",
      desc: "Riendo, jugando y haciendo el mejor equipo del mundo frente a la pantalla."
    },
    {
      emoji: "🎨",
      title: "Dibujando Juntos",
      desc: "Pintando sonrisas y mundos bonitos donde siempre estamos los dos."
    }
  ]

  const handleSelectMemory = (idx) => {
    setActiveMemory(idx)
    playChimeSound(560 + idx * 80)
    if (onSparkle) onSparkle()
  }

  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[330px] flex flex-col justify-between p-4 bg-gradient-to-b from-emerald-950/60 via-amber-950/40 to-emerald-950/70 rounded-2xl border-2 border-emerald-400/30 overflow-hidden shadow-inner">
      {/* Top Banner with Two Cute Ternurines */}
      <div className="flex items-center justify-center gap-3 z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-emerald-200 text-xs shadow-sm font-['Quicksand']">
          <span className="text-base select-none">🧸</span>
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
          <span className="text-base select-none">🧸</span>
          <span className="font-['Berkshire_Swash'] text-amber-200 text-xs ml-1">Dos Pequeños Ternurines</span>
        </div>
      </div>

      {/* 4 Interactive Memory Buttons */}
      <div className="grid grid-cols-2 gap-2 my-2 z-10">
        {memories.map((m, idx) => {
          const isSelected = activeMemory === idx
          return (
            <button
              key={idx}
              onClick={() => handleSelectMemory(idx)}
              className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-100 border-amber-500 shadow-md scale-[1.02] text-amber-950'
                  : 'bg-emerald-950/70 border-emerald-400/30 hover:bg-emerald-900/60 text-emerald-100'
              }`}
            >
              <span className="text-xl select-none">{m.emoji}</span>
              <div className="overflow-hidden">
                <div className="text-xs font-bold truncate">{m.title}</div>
                <div className="text-[10px] opacity-75 truncate">Toca para recordar</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Memory Note Card */}
      <div className="p-3 bg-[#fdfbf7] rounded-xl border border-amber-300 shadow-md text-amber-950 z-10 animate-fade-in">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-0.5">
          <span>{memories[activeMemory].emoji}</span>
          <span className="font-['Berkshire_Swash']">{memories[activeMemory].title}</span>
        </div>
        <p className="text-xs font-['Patrick_Hand'] text-stone-700 leading-snug">
          "{memories[activeMemory].desc}"
        </p>
      </div>

      <div className="text-center text-[10px] text-emerald-200/80 italic font-['Patrick_Hand'] z-10">
        Toca los recuerdos que hacían tan felices a los dos ternurines ✨
      </div>
    </div>
  )
}

/* ----------------- CHAPTER 2: LA ESPERA Y LA NUBE GRIS ----------------- */
export function WaitingTreeScene({ onSparkle }) {
  const [cleared, setCleared] = useState(false)

  const handleToggle = () => {
    setCleared(!cleared)
    if (!cleared) {
      playMagicSpellSound()
      if (onSparkle) onSparkle()
    } else {
      playChimeSound(420)
    }
  }

  return (
    <div className={`relative w-full h-full min-h-[280px] md:min-h-[330px] flex flex-col items-center justify-between p-4 rounded-2xl border-2 border-emerald-400/30 overflow-hidden shadow-inner transition-colors duration-700 ${
      cleared
        ? 'bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-100'
        : 'bg-gradient-to-b from-slate-900 via-zinc-800 to-emerald-950/70'
    }`}>
      {/* Sun ray / rainbow when cleared */}
      {cleared && (
        <div className="absolute top-2 inset-x-0 flex justify-center opacity-85 pointer-events-none">
          <div className="w-56 h-28 border-t-[8px] border-r-[8px] border-l-[8px] border-rose-400 rounded-t-full relative">
            <div className="w-48 h-24 border-t-[6px] border-r-[6px] border-l-[6px] border-amber-400 rounded-t-full absolute top-1 left-2">
              <div className="w-40 h-20 border-t-[6px] border-r-[6px] border-l-[6px] border-emerald-400 rounded-t-full absolute top-1 left-2" />
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Character & Tree Scene */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 my-2">
        <button
          onClick={handleToggle}
          className="group cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
          title="Toca para consolar la tarde"
        >
          {!cleared ? (
            <div className="flex flex-col items-center">
              <div className="relative bg-slate-700/90 text-slate-200 px-5 py-3 rounded-2xl border border-slate-500 shadow-xl flex items-center gap-3">
                <CloudRain className="w-8 h-8 text-sky-300 animate-bounce" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200">Bajo el gran árbol 🌳</div>
                  <div className="text-[11px] text-sky-200">"Esperó y esperó... pero no traía su pastel"</div>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <span className="text-sky-300 text-sm animate-bounce" style={{ animationDelay: '0.1s' }}>💧</span>
                <span className="text-sky-300 text-sm animate-bounce" style={{ animationDelay: '0.3s' }}>💧</span>
                <span className="text-sky-300 text-sm animate-bounce" style={{ animationDelay: '0.2s' }}>💧</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-gentle-pulse">
              <div className="relative bg-amber-50 text-amber-900 px-5 py-3 rounded-2xl border-2 border-amber-300 shadow-xl flex items-center gap-3">
                <Sun className="w-8 h-8 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                <div className="text-left">
                  <div className="text-xs font-bold text-amber-900">Reconociendo el dolor ☀️</div>
                  <div className="text-[11px] text-amber-700">"El ternurín entendió que ella merecía su esfuerzo"</div>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="text-rose-500 text-base animate-bounce">🍓</span>
                <span className="text-pink-500 text-base animate-bounce" style={{ animationDelay: '0.2s' }}>🌸</span>
                <span className="text-amber-500 text-base animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
              </div>
            </div>
          )}
        </button>
      </div>

      <div className="z-10 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-amber-200/20 text-center">
        <p className={`text-[11px] font-medium ${cleared ? 'text-amber-950 font-bold' : 'text-amber-100'}`}>
          {cleared ? "✨ Comprendiendo su dolor... (Toca para alternar)" : "👆 Toca la nube gris para entender la tristeza de la espera"}
        </p>
      </div>
    </div>
  )
}

/* ----------------- CHAPTER 3: EL PASTEL DE MANGO Y EL DE FRESA ----------------- */
export function CakeOriginScene({ onSparkle }) {
  const [united, setUnited] = useState(false)

  const handleToggle = () => {
    setUnited(!united)
    if (!united) {
      playMagicSpellSound()
      if (onSparkle) onSparkle()
    } else {
      playHeartSound()
    }
  }

  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[330px] flex flex-col items-center justify-between p-4 bg-gradient-to-b from-amber-950/60 via-amber-900/40 to-stone-900/80 rounded-2xl border-2 border-amber-400/30 overflow-hidden shadow-inner">
      <div className="text-center z-10">
        <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold font-mono">
          🍰 El Significado de Compartir
        </span>
      </div>

      {/* Two Cakes uniting into shared happiness */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <button
          onClick={handleToggle}
          className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        >
          <div className="flex items-center gap-3 bg-[#fffef9] p-3.5 rounded-2xl border-2 border-amber-300 shadow-xl">
            {/* Mango Cake */}
            <div className={`p-2.5 rounded-xl text-center transition-all ${united ? 'bg-amber-100 scale-105 ring-2 ring-amber-400' : 'bg-amber-50'}`}>
              <span className="text-3xl select-none">🥭🍰</span>
              <div className="text-[11px] font-bold text-amber-900 mt-1">Pastel de Mango</div>
              <div className="text-[9px] text-amber-700">El de su felicidad</div>
            </div>

            {/* Glowing Heart Connector */}
            <div className="flex flex-col items-center px-1">
              <Heart className={`w-6 h-6 transition-all ${united ? 'fill-rose-500 text-rose-500 scale-125 animate-pulse' : 'text-stone-300'}`} />
              <span className="text-[9px] text-stone-500 font-mono mt-0.5">unidos</span>
            </div>

            {/* Strawberry Cake */}
            <div className={`p-2.5 rounded-xl text-center transition-all ${united ? 'bg-rose-100 scale-105 ring-2 ring-rose-400' : 'bg-rose-50'}`}>
              <span className="text-3xl select-none">🍓🍰</span>
              <div className="text-[11px] font-bold text-rose-900 mt-1">Pastel de Fresa</div>
              <div className="text-[9px] text-rose-700">El de la ternurina</div>
            </div>
          </div>
        </button>

        {/* Revealed Moral / Meaning */}
        <div className="mt-3 p-3 bg-black/40 backdrop-blur-xs rounded-xl border border-amber-300/40 text-center max-w-xs animate-fade-in">
          <p className="text-xs text-amber-100 font-['Patrick_Hand'] leading-snug">
            {united
              ? "«Ese pedazo de pastel no era solo un postre: era su forma más dulce de compartir su felicidad mutua.» 💖"
              : "Toca los dos pasteles para recordar por qué eran tan especiales ✨"}
          </p>
        </div>
      </div>

      <div className="text-[10px] text-amber-200/80 font-['Patrick_Hand'] text-center z-10">
        Bajo el gran árbol donde dos soledades se convirtieron en un solo corazón 🌳
      </div>
    </div>
  )
}

/* ----------------- CHAPTER 4: HORNEANDO CON AMOR (LOS 4 INGREDIENTES) ----------------- */
export function BakingCakeScene({ onSparkle }) {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: Wheat,
      title: "Harina del Molino",
      desc: "Fue hasta el molino buscando la mejor harina, dispuesto a caminar lo que fuera necesario."
    },
    {
      icon: Milk,
      title: "Crema Dulce",
      desc: "Ordeñó una vaca para conseguir la crema fresca y suave que cuidara su corazón."
    },
    {
      icon: Utensils,
      title: "Fresas del Bosque",
      desc: "Se adentró en el bosque para elegir las fresas más rojas y dulces para ella."
    },
    {
      icon: Flame,
      title: "Horno con Amor",
      desc: "Encendió el horno de su casa y vigiló cada minuto con devoción y paciencia."
    }
  ]

  const handleSelectStep = (idx) => {
    setActiveStep(idx)
    playChimeSound(540 + idx * 75)
    if (onSparkle) onSparkle()
  }

  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[330px] flex flex-col justify-between p-4 bg-gradient-to-b from-amber-950/50 via-emerald-950/40 to-stone-900 rounded-2xl border-2 border-amber-400/30 overflow-hidden shadow-inner">
      <div className="text-center mb-1 z-10">
        <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold font-mono">
          🧑‍🍳 La Receta del Verdadero Esfuerzo
        </span>
      </div>

      {/* 4 Clickable Step Cards */}
      <div className="grid grid-cols-2 gap-2 z-10">
        {steps.map((s, idx) => {
          const IconComp = s.icon
          const isSelected = activeStep === idx
          return (
            <button
              key={idx}
              onClick={() => handleSelectStep(idx)}
              className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-100 border-amber-500 shadow-md scale-[1.02] text-amber-950'
                  : 'bg-emerald-950/70 border-emerald-400/30 hover:bg-emerald-900/60 text-emerald-100'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-300 text-amber-950' : 'bg-emerald-900/80 text-emerald-300'}`}>
                <IconComp className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold truncate">{s.title}</div>
                <div className="text-[9px] opacity-75 truncate">Paso {idx + 1}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Expanded Ingredient Card */}
      <div className="my-1 p-3 bg-[#fdfbf7] rounded-xl border border-amber-300 shadow-md text-amber-950 z-10 animate-fade-in">
        <div className="flex items-center gap-1.5 mb-0.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <h4 className="font-['Berkshire_Swash'] text-xs text-amber-900">
            {steps[activeStep].title}
          </h4>
        </div>
        <p className="text-xs font-['Patrick_Hand'] text-stone-700 leading-snug">
          "{steps[activeStep].desc}"
        </p>
      </div>

      <div className="text-center text-[10px] text-amber-200/80 italic font-['Patrick_Hand'] z-10">
        Toca cada ingrediente que el ternurín buscó para hacer feliz a su ternurina 🍓✨
      </div>
    </div>
  )
}

/* ----------------- CHAPTER 5: TOCANDO A TU PUERTA & EL PERDÓN ----------------- */
export function CakeForgivenessScene({
  onSparkle,
  recipientName,
  isApologyAccepted,
  onAcceptApology,
  isMobile,
  onSwitchToStory
}) {
  const [thinkingCount, setThinkingCount] = useState(0)
  const [isThinking, setIsThinking] = useState(false)

  const triggerConfetti = () => {
    try {
      const end = Date.now() + 2.5 * 1000
      const colors = ['#f43f5e', '#fbbf24', '#34d399', '#ec4899', '#f97316']

      ;(function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    } catch {
      // Graceful fallback
    }
  }

  const handleYes = () => {
    setIsThinking(false)
    playMagicSpellSound()
    triggerConfetti()
    if (onAcceptApology) onAcceptApology()
    if (onSparkle) onSparkle()
  }

  const handleThinking = () => {
    setThinkingCount((prev) => prev + 1)
    setIsThinking(true)
    playChimeSound(490)
  }

  const thinkingMessages = [
    "Tu ternurín cuidará el pastel en la puerta con paciencia y amor hasta que tú estés lista, Ximena hermosa. 🧸🍓",
    "No hay prisa en el amor verdadero. Cada minuto que tenga que esperar por tu sonrisa vale la pena infinitamente. 💕",
    "¿Y si te prometo hornearte tus postres favoritos y darte abrazos eternos por siempre? 🥺🍰",
    "Tu corazón manda, mi ternurina. Aquí estaré siempre esperándote con los brazos abiertos. 🥰"
  ]

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[350px] flex flex-col items-center justify-between p-4 bg-gradient-to-b from-rose-950/60 via-amber-950/50 to-emerald-950/70 rounded-2xl border-2 border-amber-300/30 overflow-hidden shadow-inner">
      {/* Top Header */}
      <div className="text-center z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-300/40 text-rose-200 text-xs font-semibold">
          <span className="text-sm select-none">🚪🍓</span>
          <span>En la puerta de tu casa</span>
        </div>
      </div>

      {/* Main interactive state */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-2 z-10 text-center">
        {isApologyAccepted ? (
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-pink-50 p-4 sm:p-5 rounded-2xl border-2 border-rose-300 shadow-2xl max-w-sm text-stone-800 animate-fade-in">
            <div className="text-3xl mb-1.5">🎉🧸🍰🍓💖</div>
            <h3 className="font-['Berkshire_Swash'] text-lg sm:text-xl text-rose-700 mb-1">
              ¡Ambos compartieron su felicidad!
            </h3>
            <p className="font-['Patrick_Hand'] text-xs sm:text-sm text-stone-700 leading-snug">
              La ternurina aceptó el perdón del ternurín. Ambos compartieron sus pedazos de felicidad y comieron felices para siempre.
            </p>
            <div className="mt-2 text-xs font-['Caveat'] text-rose-800 font-bold text-sm">
              Con todo mi amor eterno, tu ternurín 💍🍓
            </div>
            {isMobile && onSwitchToStory && (
              <button
                onClick={onSwitchToStory}
                className="mt-3 py-1.5 px-4 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all active:scale-95 shadow cursor-pointer"
              >
                <span>📖 Ver el final en la historia</span>
                <span>➔</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* The Ternurín holding the Fresh Strawberry Cake */}
            <div className="relative mb-2 flex items-center justify-center">
              <div className="w-18 h-18 rounded-full bg-rose-500/20 border-2 border-rose-400/50 flex items-center justify-center shadow-lg animate-pulse-soft">
                <span className="text-3xl select-none">🧸🍓🍰</span>
              </div>
            </div>

            <h3 className="text-sm sm:text-base text-amber-100 font-['Berkshire_Swash'] max-w-xs leading-snug mb-1">
              Ximena, ¿aceptas este pastel y el perdón sincero de tu ternurín?
            </h3>

            {isThinking && (
              <div className="mt-1 mb-2 px-3 py-1.5 bg-amber-950/80 border border-amber-300/40 rounded-xl text-amber-200 text-xs font-['Patrick_Hand'] max-w-xs animate-fade-in">
                {thinkingMessages[(thinkingCount - 1) % thinkingMessages.length]}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5 justify-center items-center mt-2">
              <button
                onClick={handleYes}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 border border-rose-300"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>¡Acepto el pastel y te perdono! 🍓💖</span>
              </button>

              <button
                onClick={handleThinking}
                className="px-3.5 py-1.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-amber-200 font-medium text-xs border border-amber-300/30 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span>Aún lo estoy pensando... 🤔</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-[10px] text-amber-300/80 font-['Patrick_Hand'] text-center">
        {isApologyAccepted ? "✨ Y comieron felices para siempre ✨" : "Tu ternurín esperará en la puerta el tiempo que haga falta 🍓"}
      </div>
    </div>
  )
}
