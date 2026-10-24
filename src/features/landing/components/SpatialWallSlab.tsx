import { motion, type Variants } from 'motion/react';

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleFa: string;
  categoryEn: string;
  categoryFa: string;
  descEn: string;
  descFa: string;
  image: string;
  accentColor: string;
  link?: string;
}

export type SlabSlot = 'center' | 'left' | 'right' | 'back';

interface SpatialWallSlabProps {
  project: ProjectItem;
  slot: SlabSlot;
  zIndex: number;
  isNight: boolean;
  isFa: boolean;
  viewProjectText: string;
  onSelect?: () => void;
}

export function SpatialWallSlab({
  project,
  slot,
  zIndex,
  isNight,
  isFa,
  viewProjectText,
  onSelect,
}: SpatialWallSlabProps) {
  const isActive = slot === 'center';

  // 3D Carousel positions with water float depth physics:
  // - center: in front, completely flat, closest to user (rotateY: 0, z: 70)
  // - right-rear: sinks deep in distance (z: -250), pushed outward (x: 56%), rotated 45° into depth
  // - left-rear: sinks deep in distance (z: -250), pushed outward (x: -56%), rotated -45° into depth
  // - back: deep reserve in background (z: -460)
  const slabTransition = {
    type: 'spring' as const,
    stiffness: 140,
    damping: 20,
    mass: 0.9,
  };

  const variants: Variants = {
    center: {
      x: '0%',
      z: 70,
      rotateY: 0,
      rotateX: 2,
      scale: 1,
      opacity: 1,
      visibility: 'visible',
      transition: slabTransition,
    },
    left: {
      x: '-56%',
      z: -250,
      rotateY: -45, // Left side sinks 45° deep into water/depth, right side rises towards user
      rotateX: 3,
      scale: 0.82,
      opacity: 0.9,
      visibility: 'visible',
      transition: slabTransition,
    },
    right: {
      x: '56%',
      z: -250,
      rotateY: 45, // Right side sinks 45° deep into water/depth, left side rises towards user
      rotateX: 3,
      scale: 0.82,
      opacity: 0.9,
      visibility: 'visible',
      transition: slabTransition,
    },
    back: {
      x: '0%',
      z: -460,
      rotateY: 0,
      rotateX: 0,
      scale: 0.52,
      opacity: 0,
      visibility: 'hidden',
      transition: slabTransition,
    },
  };

  const title = isFa ? project.titleFa : project.titleEn;
  const category = isFa ? project.categoryFa : project.categoryEn;

  return (
    <motion.div
      variants={variants}
      animate={slot}
      initial={false}
      onClick={!isActive && slot !== 'back' ? onSelect : undefined}
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
      className={`absolute w-[280px] sm:w-[380px] md:w-[440px] lg:w-[490px] xl:w-[530px] aspect-[16/10] select-none ${
        isActive 
          ? 'cursor-default pointer-events-auto' 
          : slot === 'back'
            ? 'pointer-events-none'
            : 'cursor-pointer group pointer-events-auto'
      }`}
    >
      {/* 3D Physical Extruded Slab Container */}
      <div 
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ===================== FRONT FACE (SCREEN) ===================== */}
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden border transition-all duration-300 ${
            isActive
              ? (isNight 
                  ? 'border-white/15 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.7)]' 
                  : 'border-black/10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]')
              : 'border-white/10 group-hover:border-white/30 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]'
          }`}
          style={{
            transform: 'translateZ(9px)',
            backgroundColor: '#141414',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Main Landscape Visual Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900">
            <img
              src={project.image}
              alt={title}
              loading="eager"
              onError={(e) => {
                // If direct import or public path had an issue, fallback to public assets folder
                const target = e.currentTarget;
                if (!target.src.includes('/assets/images/projects/')) {
                  target.src = `/assets/images/projects/${project.id === 'toyooran' ? 'project_toyooran.png' : project.id === 'kafi' ? 'project_kafi_1790411104227.jpg' : project.id === 'jirjirak-world' ? 'project_gaming_1790411118596.jpg' : 'project_fintech_1790411153505.jpg'}`;
                }
              }}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isActive ? 'scale-100' : 'scale-105 group-hover:scale-102'
              }`}
            />
          </div>

          {/* Clean cinematic lighting gradient overlay - allows artwork to shine */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Active Yellow Geometric Accent Framing (from Reference Image) */}
          <div 
            className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Top-right polygon accent bracket */}
            <svg 
              className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 text-brand-yellow" 
              viewBox="0 0 140 140" 
              fill="none"
            >
              <path 
                d="M140 0 H40 L0 40 V0 H140 Z" 
                fill="currentColor" 
                className="opacity-90"
              />
              <path 
                d="M140 0 L40 0 L0 40 L0 14" 
                stroke="#ffffff" 
                strokeWidth="1.5" 
                className="opacity-60"
              />
            </svg>

            {/* Glowing corner bracket at bottom-right */}
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-brand-yellow/80 rounded-br-lg" />
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-brand-yellow/80 rounded-tl-lg" />
          </div>

          {/* Dimmed Overlay & Submersion Gradient on Inactive Slabs */}
          {!isActive && (
            <>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none z-10" />
              {/* If Left slab: Left edge is sunken in water/depth */}
              {slot === 'left' && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent pointer-events-none z-10" />
              )}
              {/* If Right slab: Right edge is sunken in water/depth */}
              {slot === 'right' && (
                <div className="absolute inset-0 bg-gradient-to-l from-black/65 via-black/20 to-transparent pointer-events-none z-10" />
              )}
            </>
          )}

          {/* Content Layer (Title, Category, View Project Button) */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8 flex flex-col justify-end z-20">
            <span className={`text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-1.5 transition-colors ${
              isActive 
                ? (isNight ? 'text-brand-yellow' : 'text-[#b3a85c]') 
                : 'text-brand-gray/90'
            }`}>
              {category}
            </span>

            <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 sm:mb-3 drop-shadow-md ${
              isActive ? 'scale-100' : 'text-white/90'
            }`}>
              {title}
            </h3>

            {/* View Project Action (on Active Card) */}
            {isActive ? (
              <a
                href={project.link || '#work'}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-yellow hover:text-white transition-colors duration-200 mt-1 group/btn"
              >
                <span>{viewProjectText}</span>
                <svg 
                  className="w-4 h-4 rtl:rotate-180 transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ) : (
              <span className="text-[11px] font-medium text-white/60 group-hover:text-white transition-colors flex items-center gap-1.5">
                <span>{isFa ? 'برای مشاهده کلیک کنید' : 'Click to inspect'}</span>
                <span className="text-brand-yellow font-bold">→</span>
              </span>
            )}
          </div>
        </div>

        {/* ===================== PHYSICAL 3D EXTRUDED THICKNESS (22px) ===================== */}
        {/* Render physical extrusion only when tilted in perspective (left or right) */}
        {(slot === 'left' || slot === 'right') && (
          <>
            {/* Right Edge (Prominently visible when left-rear slab tilts) */}
            {slot === 'left' && (
              <div
                className="absolute top-0 rounded-r-xl pointer-events-none"
                style={{
                  width: '22px',
                  height: '100%',
                  right: '-11px',
                  transform: 'rotateY(90deg)',
                  background: 'linear-gradient(to right, #1a1a1a, #2e2e2e, #141414)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -1px 3px rgba(0,0,0,0.85)',
                  borderRight: '1px solid rgba(255,255,255,0.12)',
                  backfaceVisibility: 'hidden',
                }}
              />
            )}

            {/* Left Edge (Prominently visible when right-rear slab tilts) */}
            {slot === 'right' && (
              <div
                className="absolute top-0 rounded-l-xl pointer-events-none"
                style={{
                  width: '22px',
                  height: '100%',
                  left: '-11px',
                  transform: 'rotateY(-90deg)',
                  background: 'linear-gradient(to left, #1a1a1a, #2e2e2e, #141414)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -1px 3px rgba(0,0,0,0.85)',
                  borderLeft: '1px solid rgba(255,255,255,0.12)',
                  backfaceVisibility: 'hidden',
                }}
              />
            )}

            {/* Top Edge (Specularity / Sky reflection from above) */}
            <div
              className="absolute left-0 rounded-t-xl pointer-events-none"
              style={{
                width: '100%',
                height: '22px',
                top: '-11px',
                transform: 'rotateX(90deg)',
                background: 'linear-gradient(to bottom, #3a3a3a, #1f1f1f)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Bottom Edge */}
            <div
              className="absolute left-0 rounded-b-xl pointer-events-none"
              style={{
                width: '100%',
                height: '22px',
                bottom: '-11px',
                transform: 'rotateX(-90deg)',
                background: 'linear-gradient(to top, #0d0d0d, #1a1a1a)',
                backfaceVisibility: 'hidden',
              }}
            />

            {/* Back Face (Completes the solid 3D monolithic block) */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                transform: 'translateZ(-11px)',
                backgroundColor: '#121212',
                border: '1px solid rgba(255,255,255,0.05)',
                backfaceVisibility: 'hidden',
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
