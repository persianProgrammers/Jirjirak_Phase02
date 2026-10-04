import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DepartmentCategory,
  DEPARTMENTS_LIST,
  ALL_TEAM_MEMBERS,
} from './teamData';
import { Sparkles } from 'lucide-react';

interface Props {
  isNight: boolean;
  isFa: boolean;
}

// Auto-scrolling ticker for long roles on card hover
function MarqueeRole({
  text,
  isHovered,
  isFa,
  isNight,
}: {
  text: string;
  isHovered: boolean;
  isFa: boolean;
  isNight: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflowDistance, setOverflowDistance] = useState<number>(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const textWidth = textRef.current.scrollWidth;
        if (textWidth > containerWidth) {
          setOverflowDistance(textWidth - containerWidth + 10);
        } else {
          setOverflowDistance(0);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  const shouldAnimate = isHovered && overflowDistance > 0;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative"
      style={{
        maskImage:
          overflowDistance > 0 && isHovered
            ? 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
            : 'none',
        WebkitMaskImage:
          overflowDistance > 0 && isHovered
            ? 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
            : 'none',
      }}
    >
      <motion.span
        ref={textRef}
        animate={
          shouldAnimate
            ? {
                x: isFa ? [0, overflowDistance, 0] : [0, -overflowDistance, 0],
              }
            : { x: 0 }
        }
        transition={
          shouldAnimate
            ? {
                duration: Math.max(3.5, overflowDistance / 22),
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.8,
              }
            : { duration: 0.25 }
        }
        className={`inline-block text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
          overflowDistance > 0 && !isHovered ? 'truncate max-w-full' : ''
        } ${isNight ? 'text-neutral-500' : 'text-neutral-400'}`}
      >
        {text}
      </motion.span>
    </div>
  );
}

export function StudioTeamAtelier({ isNight, isFa }: Props) {
  // Brand Color Tokens:
  // When background is dark (!isNight): Accent is brand-yellow (#fff083)
  // When background is light (isNight): Accent is brand-olive (#b3a85c)
  const accentColor = isNight ? '#b3a85c' : '#fff083';

  // Default to Leadership (3 Co-Founders with 100% equal stature)
  const [selectedDept, setSelectedDept] = useState<DepartmentCategory>('leadership');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // ONLY members of the selected category are shown
  const displayedMembers = useMemo(() => {
    return ALL_TEAM_MEMBERS.filter((m) => m.department === selectedDept);
  }, [selectedDept]);

  // Scalable architectural grid layout that adapts seamlessly whether 1, 2, 3, 4, 5, 6 or 10+ members
  const gridLayoutClass = useMemo(() => {
    const count = displayedMembers.length;
    if (count === 1) {
      return 'grid-cols-1 max-w-xs mx-auto';
    }
    if (count === 2) {
      return 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-6';
    }
    if (count === 3) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-4 sm:gap-6';
    }
    if (count === 4) {
      return 'grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto gap-4 sm:gap-5';
    }
    if (count === 6) {
      // Clean 3x2 two-row architectural grid
      return 'grid-cols-2 sm:grid-cols-3 max-w-5xl mx-auto gap-4 sm:gap-6';
    }
    // 5 or 7+ members: seamless fluid wrapping grid
    return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 max-w-7xl mx-auto';
  }, [displayedMembers.length]);

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      
      {/* 1. DISCIPLINED ARCHITECTURAL DEPARTMENT SELECTOR */}
      <div className="w-full flex flex-wrap items-center gap-2">
        {DEPARTMENTS_LIST.map((dept) => {
          const isSelected = selectedDept === dept.key;
          const count = ALL_TEAM_MEMBERS.filter((m) => m.department === dept.key).length;

          return (
            <button
              key={dept.key}
              onClick={() => setSelectedDept(dept.key)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? isNight
                    ? 'bg-[#b3a85c] text-brand-dark border-[#b3a85c] shadow-sm font-bold'
                    : 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-sm font-bold'
                  : isNight
                    ? 'bg-neutral-200/60 hover:bg-neutral-300/60 text-brand-dark border-neutral-300/80'
                    : 'bg-brand-surface hover:bg-brand-surface-light text-neutral-300 border-white/5'
              }`}
            >
              <span>{isFa ? dept.nameFa : dept.nameEn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-black/15 text-brand-dark'
                    : isNight
                      ? 'bg-black/10 text-neutral-700'
                      : 'bg-white/10 text-neutral-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. THE ATELIER GALLERY GRID (Clean Editorial Portrait Cards, No Bios, Scalable & Responsive) */}
      <div
        className={`w-full rounded-3xl p-5 sm:p-7 lg:p-9 border transition-all duration-500 relative overflow-hidden ${
          isNight
            ? 'bg-neutral-100/90 border-neutral-300/80 shadow-md'
            : 'bg-brand-surface/70 border-white/10 backdrop-blur-md shadow-xl'
        }`}
      >
        {/* Subtle Architectural Drafting Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${isNight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${isNight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'} 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient Soft Studio Spotlight */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none filter blur-3xl opacity-15"
          style={{ backgroundColor: accentColor }}
        />

        {/* Dynamic & Scalable Member Cards Grid */}
        <div className={`relative z-10 grid ${gridLayoutClass}`}>
          <AnimatePresence mode="popLayout">
            {displayedMembers.map((member, idx) => {
              const isHovered = hoveredCardId === member.id;

              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: idx * 0.04 }}
                  onMouseEnter={() => setHoveredCardId(member.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 border flex flex-col ${
                    isNight
                      ? 'bg-white hover:border-[#b3a85c] border-neutral-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1'
                      : 'bg-brand-surface/90 hover:border-brand-yellow/80 border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  {/* Member Portrait Frame */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <img
                      src={member.image}
                      alt={isFa ? member.nameFa : member.nameEn}
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 filter contrast-[1.03]"
                      draggable={false}
                    />

                    {/* Gradient Tint at Bottom for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Status Badge: Co-Founder (100% Equal for all 3 Founders) or Department Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      {member.isFounder ? (
                        <span
                          className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1"
                          style={{
                            backgroundColor: accentColor,
                            color: '#222222',
                          }}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{isFa ? 'هم‌بنیان‌گذار' : 'CO-FOUNDER'}</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white border border-white/10 uppercase">
                          {isFa ? member.badgeFa : member.badgeEn}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Minimal Typography Strip: Name & Auto-Scrolling Marquee Role */}
                  <div
                    className={`p-3.5 sm:p-4 text-center sm:text-start transition-colors ${
                      isNight ? 'bg-white' : 'bg-brand-surface/95'
                    }`}
                  >
                    <h4
                      className={`text-base sm:text-lg font-bold tracking-tight truncate ${
                        isNight ? 'text-brand-dark' : 'text-white'
                      }`}
                    >
                      {isFa ? member.nameFa : member.nameEn}
                    </h4>
                    
                    {/* Role with Auto-Marquee Scroll on Hover if Long */}
                    <div className="mt-0.5">
                      <MarqueeRole
                        text={isFa ? member.roleFa : member.roleEn}
                        isHovered={isHovered}
                        isFa={isFa}
                        isNight={isNight}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
