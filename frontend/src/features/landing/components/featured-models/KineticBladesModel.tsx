import { motion } from 'motion/react';
import { ProjectItem } from './types';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface KineticBladesModelProps {
  projects: ProjectItem[];
  currentIndex: number;
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
  const handlePrev = () => {
    onSelect((currentIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    onSelect((currentIndex + 1) % projects.length);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Kinetic Blades Stage */}
      <div className="relative w-full h-[390px] sm:h-[450px] md:h-[490px] lg:h-[530px] rounded-3xl overflow-hidden border border-white/10 p-2 sm:p-3 bg-black/40 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-2 sm:gap-3">
        {projects.map((project, idx) => {
          const isActive = idx === currentIndex;

          return (
            <motion.div
              key={project.id}
              onClick={() => onSelect(idx)}
              layout
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 24,
                mass: 0.8,
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer select-none border transition-all duration-300 ${
                isActive
                  ? 'flex-[5] border-brand-yellow/80 shadow-2xl shadow-brand-yellow/10'
                  : 'flex-[1] sm:flex-[1.2] border-white/10 hover:border-white/40 hover:brightness-110'
              } ${isNight ? 'bg-white' : 'bg-brand-surface'}`}
            >
              {/* Project Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.titleEn}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105' : 'scale-120 filter brightness-75 hover:brightness-90'
                  }`}
                  loading="eager"
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

                {/* Ambient Colored Backlight on active edge */}
                {isActive && (
                  <div 
                    className="absolute top-0 bottom-0 left-0 w-1.5 opacity-90 shadow-[0_0_16px_#fff083]"
                    style={{ backgroundColor: project.accentColor || '#fff083' }}
                  />
                )}
              </div>

              {/* ================= IF ACTIVE: EXPANDED FULL VIEW ================= */}
              {isActive ? (
                <div className="relative z-10 w-full h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between text-white">
                  {/* Top Bar inside active blade */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-brand-yellow font-bold uppercase">
                      {isFa ? project.categoryFa : project.categoryEn}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/20 backdrop-blur-md border border-white/20 font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Information */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div className="max-w-md">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 text-white drop-shadow-md">
                        {isFa ? project.titleFa : project.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 drop-shadow">
                        {isFa ? project.descFa : project.descEn}
                      </p>
                    </div>

                    <a
                      href={project.link || '#work'}
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-brand-yellow text-brand-dark font-bold text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-xl shrink-0"
                    >
                      <span>{isFa ? 'مشاهده پرونده' : 'Inspect Case'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ) : (
                /* ================= IF COLLAPSED: VERTICAL PILLAR ================= */
                <div className="relative z-10 w-full h-full p-2 sm:p-3 flex md:flex-col items-center justify-between text-white">
                  {/* Project Number */}
                  <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold flex items-center justify-center text-brand-yellow">
                    0{idx + 1}
                  </span>

                  {/* Vertical Label on Desktop / Horizontal on Mobile */}
                  <div className="hidden md:flex items-center justify-center my-auto">
                    <span 
                      className="font-bold text-xs tracking-wider uppercase text-neutral-200 whitespace-nowrap opacity-80"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {isFa ? project.titleFa : project.titleEn}
                    </span>
                  </div>

                  <span className="md:hidden text-xs font-bold text-neutral-200 line-clamp-1 mx-2">
                    {isFa ? project.titleFa : project.titleEn}
                  </span>

                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Clean Bottom Steppers & Pagination Dots */}
      <div className="flex items-center justify-between px-2 pt-1">
        {/* Project progress living cell dots */}
        <div className="flex items-center gap-1.5 sm:gap-2" role="tablist">
          {projects.map((p, idx) => {
            const isActive = idx === currentIndex;
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
                  {/* Active Living Amoeba Cell (Translucent membrane, continuous organic deformation, no inner solid block) */}
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
                            borderColor: isNight ? '#b3a85c' : '#fff083',
                            backgroundColor: isNight 
                              ? 'rgba(204, 192, 105, 0.22)' 
                              : 'rgba(255, 240, 131, 0.18)',
                            boxShadow: isNight
                              ? [
                                  '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                  '0 0 14px rgba(204,192,105,0.8), inset 0 0 8px rgba(204,192,105,0.45)',
                                  '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                  '0 0 15px rgba(204,192,105,0.85), inset 0 0 9px rgba(204,192,105,0.48)',
                                  '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                ]
                              : [
                                  '0 0 8px rgba(255,240,131,0.5), inset 0 0 6px rgba(255,240,131,0.3)',
                                  '0 0 16px rgba(255,240,131,0.85), inset 0 0 9px rgba(255,240,131,0.45)',
                                  '0 0 10px rgba(255,240,131,0.55), inset 0 0 6px rgba(255,240,131,0.3)',
                                  '0 0 18px rgba(255,240,131,0.9), inset 0 0 10px rgba(255,240,131,0.5)',
                                  '0 0 8px rgba(255,240,131,0.5), inset 0 0 6px rgba(255,240,131,0.3)',
                                ],
                          }
                        : {
                            scale: 1,
                            borderRadius: '50%',
                            rotate: 0,
                            borderColor: isNight 
                              ? 'rgba(0, 0, 0, 0.22)' 
                              : 'rgba(255, 255, 255, 0.22)',
                            backgroundColor: isNight 
                              ? 'rgba(0, 0, 0, 0.08)' 
                              : 'rgba(255, 255, 255, 0.08)',
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
                            ease: [0.22, 1, 0.36, 1], // Fluid deflating release from living back to dormant dot
                          }
                    }
                    className={`w-3.5 h-3.5 border transition-colors ${
                      !isActive 
                        ? (isNight ? 'group-hover:border-[#b3a85c]/80 group-hover:scale-110' : 'group-hover:border-brand-yellow/80 group-hover:scale-110') 
                        : ''
                    }`}
                  />
                </div>

                {/* Tooltip on Hover */}
                <span className={`absolute bottom-full mb-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border shadow-lg z-40 ${
                  isNight 
                    ? 'bg-white text-[#8c823d] border-gray-200' 
                    : 'bg-brand-dark text-brand-yellow border-white/10'
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
            onClick={handlePrev}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isNight ? 'bg-white hover:bg-neutral-100 border-black/10' : 'bg-brand-surface hover:bg-white/10 border-white/10'
            }`}
            title="Previous Blade"
            aria-label="Previous Blade"
          >
            {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={handleNext}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isNight ? 'bg-white hover:bg-neutral-100 border-black/10' : 'bg-brand-surface hover:bg-white/10 border-white/10'
            }`}
            title="Next Blade"
            aria-label="Next Blade"
          >
            {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
