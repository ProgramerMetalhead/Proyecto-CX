import React, { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  BookMarked,
  Volume2,
  VolumeX,
  Heart,
  BookOpenCheck,
  Sparkles,
  BookOpen,
  Lock,
  Unlock
} from 'lucide-react'
import { defaultStory } from '../data/storyPages'
import {
  TernurinesMemoriesScene,
  WaitingTreeScene,
  CakeOriginScene,
  BakingCakeScene,
  CakeForgivenessScene
} from './InteractiveElements'
import {
  playPageTurnSound,
  playHeartSound,
  playMagicSpellSound,
  playBookOpenSound,
  playBookCloseSound
} from '../utils/soundEffects'

/* ----------------- HELPER: LEFT PAGE (ILUSTRACIÓN & ESCENA INTERACTIVA) ----------------- */
function LeftPageContent({ pageIndex, onSparkle, isApologyAccepted, onAcceptApology }) {
  const page = defaultStory.pages[pageIndex]
  if (!page) return null

  const renderInteractiveScene = () => {
    switch (page.interactiveType) {
      case 'ternurines-memories':
        return <TernurinesMemoriesScene onSparkle={onSparkle} />
      case 'waiting-tree':
        return <WaitingTreeScene onSparkle={onSparkle} />
      case 'cake-origin':
        return <CakeOriginScene onSparkle={onSparkle} />
      case 'baking-cake':
        return <BakingCakeScene onSparkle={onSparkle} />
      case 'cake-forgiveness':
        return (
          <CakeForgivenessScene
            recipientName="Ximena"
            onSparkle={onSparkle}
            isApologyAccepted={isApologyAccepted}
            onAcceptApology={onAcceptApology}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between parchment-texture book-spine-left relative rounded-l-xl overflow-hidden shadow-inner">
      {/* Golden Inner Frame */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-400/40 rounded-xl pointer-events-none" />

      {/* Top Chapter Tag */}
      <div className="flex justify-between items-center mb-2 z-10">
        <span className="text-[10px] font-mono tracking-widest text-amber-900/80 uppercase font-bold">
          {page.chapter}
        </span>
        <span className="text-xs text-rose-700/80 font-['Caveat'] text-base">
          Para Ximena con amor ✨
        </span>
      </div>

      {/* The Interactive Scene Component */}
      <div className="flex-1 flex flex-col justify-center my-1 z-10">
        {renderInteractiveScene()}
      </div>

      {/* Bottom Interactive Footnote */}
      <div className="mt-2 text-center z-10">
        <p className="text-xs font-['Patrick_Hand'] text-amber-900/90 italic">
          {page.footnote}
        </p>
      </div>
    </div>
  )
}

/* ----------------- HELPER: RIGHT PAGE (TEXTO & NARRACIÓN DEL CUENTO) ----------------- */
function RightPageContent({ pageIndex, totalPages, isApologyAccepted }) {
  const page = defaultStory.pages[pageIndex]
  if (!page) return null

  return (
    <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between parchment-texture book-spine-right relative rounded-r-xl overflow-hidden z-10">
      {/* Golden Inner Frame */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-400/40 rounded-xl pointer-events-none" />

      {/* Chapter Title Header */}
      <div className="z-10 text-center mb-2">
        <div className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold mb-0.5">
          {page.subtitle}
        </div>
        <h2 className="font-['Berkshire_Swash'] text-2xl text-amber-950 leading-tight">
          {page.title}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="w-10 h-[1px] bg-amber-400/80" />
          <span className="text-xs text-amber-700 select-none">❦</span>
          <div className="w-10 h-[1px] bg-amber-400/80" />
        </div>
      </div>

      {/* Story Text with Illuminated Drop Cap */}
      <div className="z-10 flex-1 flex flex-col justify-center space-y-2.5 text-stone-800 font-['Quicksand'] font-medium text-xs sm:text-sm leading-relaxed px-1">
        {page.paragraphs.map((p, idx) => {
          if (idx === 0 && page.dropCap) {
            const remainingFirst = p.slice(1)
            return (
              <p key={idx} className="text-justify text-stone-800 leading-relaxed first-letter:float-left first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-['Berkshire_Swash'] first-letter:text-rose-700 first-letter:mr-2 first-letter:leading-none">
                <span className="font-semibold text-rose-800">{page.dropCap}</span>
                {remainingFirst}
              </p>
            )
          }
          return (
            <p key={idx} className="text-justify text-stone-800 leading-relaxed">
              {p}
            </p>
          )
        })}

        {/* Dynamic Locked / Unlocked final part for Chapter V */}
        {pageIndex === 4 && (
          <div className="mt-2 transition-all duration-500">
            {!isApologyAccepted ? (
              <div className="p-2.5 sm:p-3 rounded-xl border-2 border-dashed border-amber-600/50 bg-amber-950/10 backdrop-blur-xs flex items-center gap-3 text-amber-900 shadow-sm animate-pulse-soft">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-200/90 border border-amber-400 flex items-center justify-center text-amber-800 shrink-0 shadow-inner">
                  <Lock className="w-4 h-4 text-amber-900" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wide">
                    <span>Parte Final Bloqueada</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-200/80 rounded text-amber-800 font-mono">
                      Capítulo V
                    </span>
                  </div>
                  <p className="font-['Patrick_Hand'] text-xs sm:text-sm text-stone-700 leading-snug mt-0.5">
                    Para descubrir el final de esta historia, la ternurina debe responder al ternurín en la página izquierda... 🍓🚪
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl border-2 border-amber-400/90 bg-gradient-to-br from-amber-50 via-rose-50/70 to-amber-100/80 shadow-md text-amber-950 animate-fade-in relative overflow-hidden">
                {/* Subtle decorative glow */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider">
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>¡Final Feliz Desbloqueado! ✨</span>
                  </div>
                  <span className="text-xs text-rose-500 font-['Caveat'] text-sm font-bold">
                    Amor Eterno 💖
                  </span>
                </div>
                <p className="font-['Quicksand'] font-semibold text-xs sm:text-sm text-stone-900 leading-relaxed italic text-justify">
                  «La ternurina aceptó el perdón del ternurín, ambos compartieron sus pedazos de felicidad y comieron felices para siempre.» 🧸🍓🥭✨
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Page Footer */}
      <div className="mt-2 pt-2 border-t border-amber-300/40 flex justify-between items-center z-10">
        <span className="text-xs font-['Caveat'] text-stone-600 text-base">
          Con todo mi corazón
        </span>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/50 border border-amber-400/40 text-amber-900 text-xs font-mono font-bold">
          <span>Pág.</span>
          <span>{pageIndex + 1}</span>
          <span className="text-amber-600">/</span>
          <span>{totalPages}</span>
        </div>
      </div>
    </div>
  )
}

/* ----------------- MAIN STORYBOOK COMPONENT ----------------- */
export default function StoryBook() {
  // Book state: 'closed' | 'opening' | 'open' | 'closing'
  const [bookState, setBookState] = useState('closed')
  const [currentPage, setCurrentPage] = useState(1) // 1..5
  const [turningPage, setTurningPage] = useState(null) // { direction: 'next' | 'prev', from: number, to: number } | null
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [floatingHearts, setFloatingHearts] = useState([])
  const [scale, setScale] = useState(1)
  const [isApologyAccepted, setIsApologyAccepted] = useState(false)

  const totalPages = defaultStory.pages.length

  const handleAcceptApology = () => {
    setIsApologyAccepted(true)
    if (soundEnabled) playMagicSpellSound()
  }

  // Responsive scale handler for smaller screens (mobile / tablet)
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      const isWide = bookState === 'open' || bookState === 'opening' || bookState === 'closing'
      const targetWidth = isWide ? 860 : 440
      const availableWidth = windowWidth - 24

      if (availableWidth < targetWidth) {
        const calculatedScale = availableWidth / targetWidth
        setScale(Math.max(0.44, calculatedScale))
      } else {
        setScale(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [bookState])

  // Open Book with authentic 3D cover flap rotation
  const handleOpenBook = () => {
    if (bookState !== 'closed') return
    setBookState('opening')
    if (soundEnabled) playBookOpenSound()

    setTimeout(() => {
      setBookState('open')
    }, 780)
  }

  // Close Book with authentic 3D cover flap closing
  const handleCloseBook = () => {
    if (bookState !== 'open' || turningPage) return
    setBookState('closing')
    if (soundEnabled) playBookCloseSound()

    setTimeout(() => {
      setBookState('closed')
      setCurrentPage(1)
    }, 780)
  }

  // Turn to Next Page (Animated 3D Turning Leaf)
  const handleNextPage = () => {
    if (bookState !== 'open' || turningPage) return
    if (currentPage < totalPages) {
      if (soundEnabled) playPageTurnSound()
      const from = currentPage - 1
      const to = currentPage // next index in 0-based
      setTurningPage({ direction: 'next', from, to })

      setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
        setTurningPage(null)
      }, 650)
    }
  }

  // Turn to Previous Page (Animated 3D Turning Leaf or Close)
  const handlePrevPage = () => {
    if (bookState !== 'open' || turningPage) return
    if (currentPage > 1) {
      if (soundEnabled) playPageTurnSound()
      const from = currentPage - 1
      const to = currentPage - 2
      setTurningPage({ direction: 'prev', from, to })

      setTimeout(() => {
        setCurrentPage((prev) => prev - 1)
        setTurningPage(null)
      }, 650)
    } else {
      // From Page 1, clicking previous closes the book!
      handleCloseBook()
    }
  }

  // Direct Jump
  const handleGoToPage = (target) => {
    if (bookState !== 'open' || turningPage || target === currentPage) return
    if (soundEnabled) playPageTurnSound()
    const from = currentPage - 1
    const to = target - 1
    const direction = target > currentPage ? 'next' : 'prev'
    setTurningPage({ direction, from, to })

    setTimeout(() => {
      setCurrentPage(target)
      setTurningPage(null)
    }, 650)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (bookState === 'closed') {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpenBook()
        }
        return
      }

      if (bookState === 'open') {
        if (e.key === 'ArrowRight') {
          handleNextPage()
        } else if (e.key === 'ArrowLeft') {
          handlePrevPage()
        } else if (e.key === 'Escape') {
          handleCloseBook()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [bookState, currentPage, turningPage])

  // Send Floating Heart
  const handleSendHeart = () => {
    if (soundEnabled) playHeartSound()
    const newHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 60 + 20,
      size: Math.random() * 20 + 20,
    }
    setFloatingHearts((prev) => [...prev, newHeart])
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 2500)
  }

  const isWide = bookState !== 'closed'

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 relative z-10 selection:bg-emerald-200">
      {/* ----------------- TOP HEADER CONTROLS ----------------- */}
      <header className="w-full max-w-5xl flex items-center justify-between py-2 px-3 sm:px-4 mb-2 rounded-2xl bg-emerald-950/70 backdrop-blur-md border border-emerald-400/30 text-emerald-100 shadow-lg">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-emerald-300" />
          <span className="font-['Berkshire_Swash'] text-sm md:text-base text-amber-100 hidden sm:inline">
            El Libro de Mis Disculpas • Pasta Marrón
          </span>
          <span className="font-['Berkshire_Swash'] text-sm text-amber-100 sm:hidden">
            Para Ximena 🌸
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Close Book Button (when open) */}
          {bookState === 'open' && (
            <button
              onClick={handleCloseBook}
              disabled={!!turningPage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-400/40 text-amber-200 text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95 shadow"
              title="Cerrar libro de pasta marrón"
            >
              <BookOpenCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Cerrar Libro</span>
            </button>
          )}

          {/* Send Heart Reaction */}
          <button
            onClick={handleSendHeart}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Mandar amor a Ximena"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span className="hidden sm:inline">Mandar Amor</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-full hover:bg-emerald-400/20 text-emerald-200 transition-colors cursor-pointer"
            title={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
          </button>
        </div>
      </header>

      {/* ----------------- 3D BOOK STAGE ----------------- */}
      <main
        className="w-full flex-1 flex flex-col items-center justify-center my-auto py-2"
        style={{ perspective: '2400px' }}
      >
        <div
          className="relative transition-all duration-700 ease-out origin-center"
          style={{
            transform: `scale(${scale})`,
            height: '560px',
            width: isWide ? '840px' : '420px',
            transition: 'width 0.78s cubic-bezier(0.34, 1.15, 0.64, 1)'
          }}
        >
          {/* ================= 1. CLOSED BOOK VIEW (When bookState === 'closed') ================= */}
          {bookState === 'closed' && (
            <div className="relative w-[420px] h-[560px] mx-auto select-none">
              {/* 3D Paper Thickness Edges */}
              <div className="absolute top-2 -right-3.5 w-3.5 h-[calc(100%-16px)] book-pages-block-right rounded-r-xs pointer-events-none border-y border-r border-amber-900/40 shadow-md" />
              <div className="absolute -bottom-3 left-2 w-[calc(100%-16px)] h-3 book-pages-block-bottom rounded-b-xs pointer-events-none border-x border-b border-amber-900/40 shadow-md" />

              {/* Silk ribbon at bottom */}
              <div className="absolute -bottom-7 left-14 w-6 h-10 bg-gradient-to-b from-emerald-600 to-emerald-800 shadow-md border-x border-b border-emerald-400/50 rounded-b-xs pointer-events-none flex items-end justify-center pb-1">
                <span className="text-[9px] text-amber-200">✦</span>
              </div>

              {/* The Brown Leather Cover (Pasta Marrón) */}
              <div className="relative w-full h-full rounded-2xl brown-leather-cover p-6 sm:p-8 flex flex-col justify-between border-4 border-[#5a2e16] overflow-hidden book-shadow">
                {/* Left Spine Curve Shadow with golden ribs */}
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-stone-950/80 via-[#2d150a] to-transparent pointer-events-none border-r border-amber-900/40 z-20 flex flex-col justify-around py-8">
                  <div className="h-2 w-full bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-800 shadow" />
                  <div className="h-2 w-full bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-800 shadow" />
                  <div className="h-2 w-full bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-800 shadow" />
                  <div className="h-2 w-full bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-800 shadow" />
                </div>

                {/* Stitched Perimeter */}
                <div className="absolute inset-2 sm:inset-3 rounded-xl leather-stitch pointer-events-none z-10" />

                {/* Golden Brass Corner Protectors */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-amber-400/90 rounded-tl-lg pointer-events-none z-20 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-amber-400/90 rounded-tr-lg pointer-events-none z-20 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-amber-400/90 rounded-bl-lg pointer-events-none z-20 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-amber-400/90 rounded-br-lg pointer-events-none z-20 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" />

                {/* Center Title Only: Un pequeño cuento de mis disculpas */}
                <div className="my-auto flex flex-col items-center justify-center text-center z-20 pl-4 pr-2">
                  <h1 className="font-['Berkshire_Swash'] text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-yellow-400 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] leading-snug max-w-xs">
                    Un pequeño cuento de mis disculpas
                  </h1>
                </div>

                {/* Transparent Button with White Letters: Toca para abrir */}
                <div className="mb-4 flex flex-col items-center z-20 pl-4 w-full">
                  <button
                    onClick={handleOpenBook}
                    className="py-3 px-8 rounded-full bg-transparent hover:bg-white/10 border border-white/60 hover:border-white text-white font-['Quicksand'] font-medium text-sm sm:text-base tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center"
                  >
                    <span>Toca para abrir</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. OPEN BOOK / OPENING / CLOSING SPREAD ================= */}
          {isWide && (
            <div
              className="relative w-[840px] h-[560px] select-none rounded-3xl brown-leather-back p-3 sm:p-4 book-shadow border-4 border-[#502914] flex"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Outer Leather Stitching around Book Perimeter */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-2xl leather-stitch pointer-events-none z-10" />

              {/* Brass Corners on Open Book Leather Border */}
              <div className="absolute top-1 left-1 w-8 h-8 border-t-4 border-l-4 border-amber-400/90 rounded-tl-lg pointer-events-none z-30" />
              <div className="absolute top-1 right-1 w-8 h-8 border-t-4 border-r-4 border-amber-400/90 rounded-tr-lg pointer-events-none z-30" />
              <div className="absolute bottom-1 left-1 w-8 h-8 border-b-4 border-l-4 border-amber-400/90 rounded-bl-lg pointer-events-none z-30" />
              <div className="absolute bottom-1 right-1 w-8 h-8 border-b-4 border-r-4 border-amber-400/90 rounded-br-lg pointer-events-none z-30" />

              {/* 3D Paper Thickness Edges on Right and Bottom */}
              <div className="absolute top-2 -right-3.5 w-3.5 h-[calc(100%-16px)] book-pages-block-right rounded-r-xs pointer-events-none border-y border-r border-amber-900/40 shadow-md" />
              <div className="absolute -bottom-3 left-2 w-[calc(100%-16px)] h-3 book-pages-block-bottom rounded-b-xs pointer-events-none border-x border-b border-amber-900/40 shadow-md" />

              {/* Silk ribbon at top */}
              <div className="absolute -top-3 right-12 w-6 h-12 bg-gradient-to-b from-emerald-600 via-teal-700 to-emerald-900 rounded-b shadow-lg border-x border-b border-emerald-300/50 z-40 pointer-events-none flex items-end justify-center pb-1">
                <span className="text-[9px] text-amber-200 font-bold">✦</span>
              </div>

              {/* ============= INNER PARCHMENT BASE: LEFT PAGE + RIGHT PAGE ============= */}
              <div className="relative w-full h-full flex rounded-xl overflow-hidden bg-[#fcf8ee] z-20">
                {/* STATIC LEFT PAGE UNDERNEATH */}
                <div
                  className="w-1/2 h-full relative"
                  style={{
                    // During opening, hide left base so it doesn't show before the cover lands!
                    opacity: bookState === 'opening' ? 0 : 1,
                    transition: 'opacity 0.2s ease 0.4s'
                  }}
                >
                  <LeftPageContent
                    pageIndex={
                      turningPage && turningPage.direction === 'prev'
                        ? turningPage.to
                        : currentPage - 1
                    }
                    onSparkle={() => soundEnabled && playMagicSpellSound()}
                    isApologyAccepted={isApologyAccepted}
                    onAcceptApology={handleAcceptApology}
                  />
                </div>

                {/* STATIC RIGHT PAGE UNDERNEATH */}
                <div className="w-1/2 h-full relative">
                  <RightPageContent
                    pageIndex={
                      turningPage && turningPage.direction === 'next'
                        ? turningPage.to
                        : currentPage - 1
                    }
                    totalPages={totalPages}
                    isApologyAccepted={isApologyAccepted}
                  />
                </div>

                {/* NATURAL BOOK CENTER CREASE SHADOW */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 pointer-events-none z-30 book-crease-shadow" />
                <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-amber-900/20 pointer-events-none z-30" />
              </div>

              {/* ============= 3D ANIMATED TURNING LEAF (Hoja pasando página) ============= */}
              {turningPage && (
                <div
                  className={`absolute top-3 sm:top-4 bottom-3 sm:bottom-4 left-1/2 w-[calc(50%-12px)] sm:w-[calc(50%-16px)] h-[calc(100%-24px)] sm:h-[calc(100%-32px)] z-40 ${
                    turningPage.direction === 'next' ? 'page-turn-next-anim' : 'page-turn-prev-anim'
                  }`}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* FRONT FACE OF TURNING LEAF (Right page content turning away) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-r-xl overflow-hidden shadow-2xl"
                    style={{
                      transform: 'translateZ(1px)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <RightPageContent
                      pageIndex={turningPage.from}
                      totalPages={totalPages}
                      isApologyAccepted={isApologyAccepted}
                    />
                  </div>

                  {/* BACK FACE OF TURNING LEAF (New Left page content turning into place) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-l-xl overflow-hidden shadow-2xl"
                    style={{
                      transform: 'rotateY(180deg) translateZ(1px)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <LeftPageContent
                      pageIndex={turningPage.to}
                      onSparkle={() => soundEnabled && playMagicSpellSound()}
                      isApologyAccepted={isApologyAccepted}
                      onAcceptApology={handleAcceptApology}
                    />
                  </div>
                </div>
              )}

              {/* ============= 3D ANIMATED COVER FLAP (For Opening & Closing) ============= */}
              {(bookState === 'opening' || bookState === 'closing') && (
                <div
                  className={`absolute top-0 bottom-0 left-1/2 w-1/2 h-full z-50 ${
                    bookState === 'opening' ? 'cover-flap-open' : 'cover-flap-close'
                  }`}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* OUTSIDE FACE: Brown Leather Cover (Strictly culled in second half of rotation) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-r-2xl brown-leather-cover p-6 sm:p-8 flex flex-col justify-between border-y-4 border-r-4 border-[#5a2e16] overflow-hidden shadow-2xl ${
                      bookState === 'opening' ? 'front-face-opening' : 'front-face-closing'
                    }`}
                    style={{
                      transform: 'translateZ(1px)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="absolute inset-2 sm:inset-3 rounded-xl leather-stitch pointer-events-none" />
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-amber-400/90 rounded-tr-lg pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-amber-400/90 rounded-br-lg pointer-events-none" />

                    {/* Center Title Only */}
                    <div className="my-auto flex flex-col items-center justify-center text-center px-4">
                      <h3 className="font-['Berkshire_Swash'] text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-yellow-400 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] leading-snug max-w-xs">
                        Un pequeño cuento de mis disculpas
                      </h3>
                    </div>

                    {/* Transparent Button */}
                    <div className="mb-4 flex flex-col items-center w-full px-4">
                      <div className="py-3 px-8 rounded-full bg-transparent border border-white/60 text-white font-['Quicksand'] font-medium text-sm sm:text-base tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center">
                        <span>Toca para abrir</span>
                      </div>
                    </div>
                  </div>

                  {/* INSIDE FACE: Left Inside Parchment Cover (Strictly visible in second half of rotation) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-l-2xl parchment-texture book-spine-left p-4 sm:p-6 flex flex-col justify-between border-y-4 border-l-4 border-amber-900/30 overflow-hidden shadow-2xl ${
                      bookState === 'opening' ? 'back-face-opening' : 'back-face-closing'
                    }`}
                    style={{
                      transform: 'rotateY(180deg) translateZ(1px)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <LeftPageContent
                      pageIndex={0}
                      onSparkle={() => soundEnabled && playMagicSpellSound()}
                      isApologyAccepted={isApologyAccepted}
                      onAcceptApology={handleAcceptApology}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ----------------- BOTTOM BOOK NAVIGATION CONTROLS (ONLY WHEN OPEN) ----------------- */}
      {bookState === 'open' && (
        <footer className="w-full max-w-2xl mt-2 flex flex-col items-center gap-2.5">
          {/* Navigation Buttons: Retroceder y Avanzar */}
          <div className="w-full flex items-center justify-between gap-4">
            {/* Previous Page Button (or Close Book if on Page 1) */}
            <button
              onClick={handlePrevPage}
              disabled={!!turningPage}
              className="flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-['Berkshire_Swash'] text-sm md:text-base transition-all border shadow-lg cursor-pointer bg-emerald-950/85 hover:bg-emerald-900 border-emerald-400/40 text-emerald-100 hover:border-emerald-300 hover:scale-[1.02] active:scale-95 shadow-emerald-950/50"
            >
              <ChevronLeft className="w-5 h-5 text-emerald-300" />
              <span>{currentPage === 1 ? '📕 Cerrar Libro' : 'Página Anterior'}</span>
            </button>

            {/* Page Indicators Dots */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-950/80 border border-emerald-400/40 backdrop-blur-xs shadow-md">
              {defaultStory.pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoToPage(idx + 1)}
                  disabled={!!turningPage}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentPage === idx + 1
                      ? 'bg-emerald-400 scale-125 ring-2 ring-emerald-300/70'
                      : 'bg-stone-600 hover:bg-emerald-300/60'
                  }`}
                  title={`Página ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Page Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || !!turningPage}
              className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-['Berkshire_Swash'] text-sm md:text-base transition-all border shadow-lg cursor-pointer ${
                currentPage === totalPages
                  ? 'opacity-40 bg-emerald-950/30 border-emerald-900/40 text-emerald-800 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-300 hover:from-emerald-500 hover:to-amber-200 border-emerald-300 text-stone-950 font-bold hover:scale-[1.02] active:scale-95 shadow-emerald-500/25'
              }`}
            >
              <span>{currentPage === totalPages ? 'Fin del Cuento 💖' : 'Página Siguiente'}</span>
              <ChevronRight className="w-5 h-5 text-stone-950" />
            </button>
          </div>

          {/* Keyboard navigation hint */}
          <div className="text-[11px] text-emerald-200/80 font-['Patrick_Hand'] tracking-wide">
            ✨ Flechas ◀ ▶ para pasar de página • ESC para cerrar el libro ✨
          </div>
        </footer>
      )}

      {/* Floating Animated Reaction Hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 animate-float-slow text-rose-400"
          style={{
            left: `${heart.x}%`,
            bottom: '100px',
            fontSize: `${heart.size}px`,
            filter: 'drop-shadow(0 0 10px rgba(244,63,94,0.8))',
            animation: 'floatSlow 2.5s ease-out forwards',
          }}
        >
          💖
        </div>
      ))}
    </div>
  )
}
