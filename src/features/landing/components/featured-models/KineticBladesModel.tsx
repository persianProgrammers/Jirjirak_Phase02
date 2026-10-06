import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from './types';
import { ArrowUpRight, X } from 'lucide-react';
// Preserved imports for future use when navigation controls are uncommented:
// import { ChevronLeft, ChevronRight } from 'lucide-react';

interface KineticBladesModelProps {
  projects: ProjectItem[];
  currentIndex: number | null;
  onSelect: (index: number) => void;
  isNight: boolean;
  isFa: boolean;
}

export function KineticBladesModel({
  projects,
  currentIndex,
  onSelect,
  isNight,
  isFa,
}: KineticBladesModelProps) {
  // Safe guard: only active if index is valid and not null
  const safeCurrentIndex = currentIndex !== null && currentIndex >= 0 && currentIndex < projects.length 
    ? currentIndex 
    : null;

  // Track category changes to choreograph exit (downward) and entrance (upward in turn)
  const prevProjectsRef = useRef(projects);
  const isDeptSwitching = prevProjectsRef.current.some(
    (prevP) => !projects.some((p) => p.id === prevP.id)
  );

  useEffect(() => {
    prevProjectsRef.current = projects;
  }, [projects]);

  // Preserved handlers for future use when navigation steppers are uncommented
  /*
  const handlePrev = () => {
    if (projects.length === 0) return;
    onSelect((safeCurrentIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    if (projects.length === 0) return;
    onSelect((safeCurrentIndex + 1) % projects.length);
  };
  */

  const isAnyBookOpen = safeCurrentIndex !== null;
  const totalCount = projects.length;

  // Adaptive mobile height for closed book strips:
  // - 1-3 books: h-13 sm:h-14 (comfortable strip, doesn't stretch into massive tall blocks)
  // - 4-7 books: h-10 sm:h-11 (medium strip)
  // - 8+ books:
  //     - if another book is open: h-8 sm:h-8.5 (ultra-compact so open book has maximal room)
  //     - if no book is open: h-9 sm:h-10 (compact strip)
  const closedMobileHeight = totalCount <= 3 
    ? 'h-13 sm:h-14' 
    : totalCount <= 7 
      ? 'h-10 sm:h-11' 
      : isAnyBookOpen 
        ? 'h-8 sm:h-8.5' 
        : 'h-9 sm:h-10';

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Kinetic Blades Stage / Architectural Bookshelf */}
      <div className={`relative w-full h-auto min-h-[300px] md:h-[490px] lg:h-[530px] max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-hidden no-scrollbar rounded-3xl border p-2 sm:p-3 shadow-2xl flex flex-col md:flex-row gap-2 sm:gap-3 justify-center items-center md:items-stretch transition-colors ${
        isNight ? 'bg-neutral-950/85 border-white/10' : 'bg-neutral-100/90 border-black/10'
      }`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project, idx) => {
            const isActive = idx === safeCurrentIndex;
            const brandColor = project.accentColor || (isNight ? '#fff083' : '#8f6b00');
            // Clean staggered upward entrance delay: when previous books are sinking, pause slightly then cascade upwards in turn
            const enterDelay = (isDeptSwitching ? 0.12 : 0) + idx * 0.045;

            return (
              <motion.div
                key={project.id}
                onClick={() => onSelect(idx)}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 45,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    layout: {
                      type: 'spring',
                      stiffness: 260,
                      damping: 28,
                      mass: 0.8,
                    },
                    opacity: { duration: 0.32, delay: enterDelay },
                    scale: { duration: 0.35, delay: enterDelay },
                    y: {
                      type: 'spring',
                      stiffness: 240,
                      damping: 26,
                      mass: 0.8,
                      delay: enterDelay,
                    },
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 45,
                  transition: {
                    duration: 0.2,
                    ease: [0.32, 0, 0.67, 0], // Smooth accelerating sink down into the bookshelf floor
                    delay: idx * 0.02,
                  },
                }}
                style={{
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
                transition={{
                  layout: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                    mass: 0.8,
                  },
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer select-none border transition-[border-color,box-shadow] duration-300 ${
                  isActive
                    ? [
                        // Open Book Dimensions:
                        // On Mobile: dedicated comfortable height (never squished, full content visible)
                        'w-full h-[310px] sm:h-[350px] shrink-0 max-w-[500px]',
                        // On Desktop: flex-[5] with bounded max-width (single book never stretches huge)
                        'md:w-auto md:h-full md:flex-[5] md:max-w-[700px] lg:max-w-[760px] md:min-w-[340px]',
                        isNight
                          ? 'border-[#fff083] shadow-2xl shadow-[#fff083]/20'
                          : 'border-[#8f6b00] shadow-2xl shadow-[#8f6b00]/20',
                      ].join(' ')
                    : [
                        // Closed Book Dimensions:
                        // On Mobile: clean adaptive height, bounded max-width
                        `w-full ${closedMobileHeight} shrink-0 max-w-[500px]`,
                        // On Desktop: narrow rectangular book spine (max-width prevents stretching, shrink allows 15 books)
                        'md:w-auto md:h-full md:flex-1 md:max-w-[76px] lg:max-w-[84px] md:min-w-[28px] md:shrink',
                        isNight
                          ? 'border-white/10 hover:border-white/40 hover:brightness-110'
                          : 'border-black/10 hover:border-black/40 hover:brightness-95',
                      ].join(' ')
                } ${isNight ? 'bg-neutral-900' : 'bg-white'}`}
              >
              {/* Project Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.titleEn}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105' : 'scale-120 filter brightness-75 hover:brightness-90'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('public/')) {
                      target.src = `/public${project.image.startsWith('/') ? '' : '/'}${project.image}`;
                    }
                  }}
                />

                {/* Subtle Cinematic Shading */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-t from-black/85 via-black/20 to-black/10' 
                      : 'bg-black/50 hover:bg-black/30'
                  }`} 
                />

                {/* Exquisite Client Brand Spine Edge Indicator (Delicate Luminous Optical Fiber) */}
                {isActive && (
                  <div 
                    className="absolute top-0 bottom-0 pointer-events-none z-20 transition-all duration-500 rtl:right-0 rtl:left-auto ltr:left-0 ltr:right-auto flex items-center justify-center"
                    style={{ width: '28px' }}
                  >
                    {/* Soft atmospheric colored ambient bloom radiating inwards */}
                    <div 
                      className="absolute inset-y-0 w-full pointer-events-none opacity-60"
                      style={{
                        background: isFa
                          ? `radial-gradient(ellipse 26px 70% at 100% 50%, ${brandColor}55 0%, transparent 80%)`
                          : `radial-gradient(ellipse 26px 70% at 0% 50%, ${brandColor}55 0%, transparent 80%)`,
                      }}
                    />

                    {/* Fine 2.5px Luminous Optical Spine Line with vertical taper */}
                    <div 
                      className="absolute inset-y-3 w-[2.5px] rounded-full rtl:right-0 ltr:left-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${brandColor} 12%, ${brandColor} 88%, transparent)`,
                        boxShadow: `0 0 10px ${brandColor}, 0 0 20px ${brandColor}70`,
                      }}
                    />

                    {/* Precision Central Jewel Pip */}
                    <div 
                      className="absolute w-1 h-5 rounded-full rtl:right-[-1px] ltr:left-[-1px] shadow-sm"
                      style={{
                        backgroundColor: '#ffffff',
                        boxShadow: `0 0 8px #ffffff, 0 0 14px ${brandColor}`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* ================= IF ACTIVE: EXPANDED FULL VIEW ================= */}
              {isActive ? (
                <div className="relative z-10 w-full h-full p-3.5 sm:p-5 md:p-8 flex flex-col justify-between text-white">
                  {/* Top Bar inside active blade */}
                  <div className="flex items-center justify-between shrink-0">
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-brand-yellow font-bold uppercase">
                      {isFa ? project.categoryFa : project.categoryEn}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(idx);
                        }}
                        title={isFa ? 'بستن کتاب' : 'Close Book'}
                        aria-label="Close Book"
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/25 text-white/90 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-md"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>{isFa ? 'بستن' : 'Close'}</span>
                      </button>

                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/20 backdrop-blur-md border border-white/20 font-bold">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Information */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 shrink-0 mt-auto">
                    <div className="max-w-md">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1 text-white drop-shadow-md line-clamp-1 sm:line-clamp-2">
                        {isFa ? project.titleFa : project.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 drop-shadow">
                        {isFa ? project.descFa : project.descEn}
                      </p>
                    </div>

                    <a
                      href={project.link || '#work'}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-brand-yellow text-brand-dark font-bold text-xs flex items-center gap-1.5 sm:gap-2 hover:scale-105 active:scale-95 transition-transform shadow-xl shrink-0"
                    >
                      <span>{isFa ? 'مشاهده پرونده' : 'Inspect Case'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                /* ================= IF COLLAPSED: VERTICAL PILLAR (DESKTOP) / HORIZONTAL STRIP (MOBILE) ================= */
                <div className="relative z-10 w-full h-full px-2.5 py-1 sm:p-2 md:p-3 flex md:flex-col items-center justify-between text-white">
                  {/* Project Number */}
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono font-bold flex items-center justify-center text-brand-yellow shrink-0">
                    0{idx + 1}
                  </span>

                  {/* Vertical Label on Desktop / Horizontal on Mobile */}
                  <div className="hidden md:flex items-center justify-center my-auto overflow-hidden">
                    <span 
                      className="font-bold text-xs tracking-wider uppercase text-neutral-200 whitespace-nowrap opacity-80"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {isFa ? project.titleFa : project.titleEn}
                    </span>
                  </div>

                  {/* Client Brand Accent Dot - Laser-Sharp Precision Diode (قاطع، لیزری و بدون بلور) */}
                  <div 
                    className="relative flex items-center justify-center shrink-0 w-4 h-4"
                    title={isFa ? `رنگ برند پروژه: ${project.titleFa}` : `Brand Color: ${project.titleEn}`}
                  >
                    {/* Precision Optical Chassis Ring (نگهدارنده مشکی تراش‌خورده با کانتراست قاطع) */}
                    <div className="w-3.5 h-3.5 rounded-full bg-black/85 border border-white/20 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                      {/* Laser Diode Core (هسته لیزری درخشان و قاطع با رنگ اصلی برند) */}
                      <div 
                        className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-110 flex items-center justify-center relative"
                        style={{
                          backgroundColor: brandColor,
                          boxShadow: `0 0 0 0.5px rgba(0,0,0,0.6), 0 0 4px ${brandColor}`,
                        }}
                      >
                        {/* High-Intensity Laser Micro-Focal Point (نقطه کانونی فوق‌العاده تیز لیزر) */}
                        <span className="w-0.5 h-0.5 rounded-full bg-white opacity-95 shadow-[0_0_1px_#fff]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>

      {/* 
        [TEMPORARILY HIDDEN AS REQUESTED] 
        Navigation steppers & pagination dots are preserved in codebase for future use.
      */}
      {false && (
        <div className="flex items-center justify-between px-2 pt-1">
          {/* Project progress living cell dots */}
          <div className="flex items-center gap-1.5 sm:gap-2" role="tablist">
            {projects.map((p, idx) => {
              const isActive = idx === safeCurrentIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelect(idx)}
                  className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Project 0${idx + 1}: ${isFa ? p.titleFa : p.titleEn}`}
                >
                  {/* 2D Living Cell Dot / Amoeba Organic Morphing State */}
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {/* Active Living Amoeba Cell */}
                    <motion.div
                      initial={false}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.25, 0.95, 1.18, 1],
                              borderRadius: [
                                '50% 50% 50% 50%',
                                '62% 38% 68% 32% / 44% 65% 35% 56%',
                                '41% 59% 33% 67% / 60% 38% 62% 40%',
                                '58% 42% 64% 36% / 37% 58% 42% 63%',
                                '50% 50% 50% 50%',
                              ],
                              rotate: [0, 45, 180, 290, 360],
                              borderColor: isNight ? '#fff083' : '#8f6b00',
                              backgroundColor: isNight 
                                ? 'rgba(255, 240, 131, 0.22)' 
                                : 'rgba(143, 107, 0, 0.22)',
                              boxShadow: isNight
                                ? [
                                    '0 0 8px rgba(255,240,131,0.5), inset 0 0 5px rgba(255,240,131,0.3)',
                                    '0 0 16px rgba(255,240,131,0.85), inset 0 0 9px rgba(255,240,131,0.45)',
                                    '0 0 8px rgba(255,240,131,0.5), inset 0 0 5px rgba(255,240,131,0.3)',
                                    '0 0 18px rgba(255,240,131,0.9), inset 0 0 10px rgba(255,240,131,0.5)',
                                    '0 0 8px rgba(255,240,131,0.5), inset 0 0 5px rgba(255,240,131,0.3)',
                                  ]
                                : [
                                    '0 0 8px rgba(143,107,0,0.5), inset 0 0 6px rgba(143,107,0,0.3)',
                                    '0 0 16px rgba(143,107,0,0.85), inset 0 0 9px rgba(143,107,0,0.45)',
                                    '0 0 10px rgba(143,107,0,0.55), inset 0 0 6px rgba(143,107,0,0.3)',
                                    '0 0 18px rgba(143,107,0,0.9), inset 0 0 10px rgba(143,107,0,0.5)',
                                    '0 0 8px rgba(143,107,0,0.5), inset 0 0 6px rgba(143,107,0,0.3)',
                                  ],
                            }
                          : {
                              scale: 1,
                              borderRadius: '50%',
                              rotate: 0,
                              borderColor: isNight 
                                ? 'rgba(255, 255, 255, 0.22)' 
                                : 'rgba(0, 0, 0, 0.22)',
                              backgroundColor: isNight 
                                ? 'rgba(255, 255, 255, 0.08)' 
                                : 'rgba(0, 0, 0, 0.08)',
                              boxShadow: '0 0 0px rgba(0,0,0,0)',
                            }
                      }
                      transition={
                        isActive
                          ? {
                              duration: 3.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          : {
                              duration: 0.55,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className={`w-3.5 h-3.5 border transition-colors ${
                        !isActive 
                          ? isNight ? 'group-hover:border-[#fff083] group-hover:scale-110' : 'group-hover:border-[#8f6b00] group-hover:scale-110'
                          : ''
                      }`}
                    />
                  </div>

                  {/* Tooltip on Hover */}
                  <span className={`absolute bottom-full mb-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border shadow-lg z-40 ${
                    isNight 
                      ? 'bg-neutral-900 text-[#fff083] border-white/10' 
                      : 'bg-white text-[#8f6b00] border-black/10'
                  }`}>
                    0{idx + 1} • {isFa ? p.titleFa : p.titleEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (projects.length === 0) return;
                const activeIdx = safeCurrentIndex ?? 0;
                onSelect((activeIdx - 1 + projects.length) % projects.length);
              }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isNight ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-white hover:bg-neutral-100 border-black/10 text-black'
              }`}
              title="Previous Blade"
              aria-label="Previous Blade"
            >
              {isFa ? <span className="text-xs">&gt;</span> : <span className="text-xs">&lt;</span>}
            </button>
            <button
              onClick={() => {
                if (projects.length === 0) return;
                const activeIdx = safeCurrentIndex ?? -1;
                onSelect((activeIdx + 1) % projects.length);
              }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isNight ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-white hover:bg-neutral-100 border-black/10 text-black'
              }`}
              title="Next Blade"
              aria-label="Next Blade"
            >
              {isFa ? <span className="text-xs">&lt;</span> : <span className="text-xs">&gt;</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
