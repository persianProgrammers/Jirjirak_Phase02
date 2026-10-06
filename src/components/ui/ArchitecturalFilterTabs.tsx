import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Check } from 'lucide-react';

export interface FilterTabItem<T extends string = string> {
  id: T;
  labelEn: string;
  labelFa: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface ArchitecturalFilterTabsProps<T extends string = string> {
  items: FilterTabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  isNight: boolean;
  isFa: boolean;
  isDarkBg?: boolean;
  className?: string;
  layoutId?: string;
}

export function ArchitecturalFilterTabs<T extends string = string>({
  items,
  activeId,
  onChange,
  isNight,
  isFa,
  isDarkBg,
  className = '',
  layoutId = 'architecturalFilterTabs',
}: ArchitecturalFilterTabsProps<T>) {
  // If isDarkBg is not explicitly provided, infer it from isNight
  const isDark = isDarkBg !== undefined ? isDarkBg : isNight;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check scroll overflows for fade edges and arrows
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    
    // In RTL, scrollLeft can be negative or positive depending on browser implementation
    const maxScroll = scrollWidth - clientWidth;
    const absScrollLeft = Math.abs(scrollLeft);
    
    setCanScrollLeft(absScrollLeft > 8);
    setCanScrollRight(absScrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, items]);

  // Center active tab on change
  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeId]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -220 : 220;
    el.scrollBy({ left: isFa ? -amount : amount, behavior: 'smooth' });
  };

  const activeItem = items.find((it) => it.id === activeId) || items[0];

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET ARCHITECTURAL CAPSULE DOCK                               */}
      {/* ========================================================================= */}
      <div className="relative w-full flex items-center gap-2">
        {/* Scroll Left Arrow (Subtle micro-control) */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount('left')}
            aria-label="Scroll filter left"
            className={`hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center transition-all cursor-pointer z-10 border shadow-sm ${
              isDark
                ? 'bg-neutral-900/90 text-neutral-300 border-white/10 hover:text-white hover:border-[#fff083]'
                : 'bg-white/90 text-neutral-700 border-black/10 hover:text-black hover:border-[#8f6b00]'
            }`}
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
        )}

        {/* The Track Container with Edge Fade Mask */}
        <div
          ref={scrollContainerRef}
          className="relative flex-1 flex items-center gap-1.5 overflow-x-auto scroll-smooth py-1 px-1 no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item) => {
            const isActive = item.id === activeId;
            const label = isFa ? item.labelFa : item.labelEn;

            return (
              <button
                key={item.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => onChange(item.id)}
                className={`relative shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'text-[#222] font-black'
                      : 'text-white font-black'
                    : isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                      : 'text-neutral-600 hover:text-black hover:bg-black/[0.04]'
                }`}
              >
                {/* Magnetic Sliding Active Capsule Background */}
                {isActive && (
                  <motion.div
                    layoutId={`${layoutId}-pill`}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                    }}
                    className={`absolute inset-0 rounded-xl shadow-md z-0 ${
                      isDark
                        ? 'bg-[#fff083] shadow-[0_0_20px_rgba(255,240,131,0.28)]'
                        : 'bg-[#8f6b00] shadow-[0_0_16px_rgba(143,107,0,0.25)]'
                    }`}
                  />
                )}

                {/* Optional Icon */}
                {item.icon && (
                  <span className={`relative z-10 text-sm ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                    {item.icon}
                  </span>
                )}

                {/* Tab Label */}
                <span className="relative z-10 whitespace-nowrap">
                  {label}
                </span>

                {/* Optional Monospace Counter Badge */}
                {item.count !== undefined && (
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                      isActive
                        ? isDark
                          ? 'bg-black/15 text-[#222]'
                          : 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-white/10 text-neutral-400'
                          : 'bg-black/10 text-neutral-600'
                    }`}
                  >
                    {isFa ? String(item.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]) : item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Scroll Right Arrow (Subtle micro-control) */}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount('right')}
            aria-label="Scroll filter right"
            className={`hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center transition-all cursor-pointer z-10 border shadow-sm ${
              isDark
                ? 'bg-neutral-900/90 text-neutral-300 border-white/10 hover:text-white hover:border-[#fff083]'
                : 'bg-white/90 text-neutral-700 border-black/10 hover:text-black hover:border-[#8f6b00]'
            }`}
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        )}

        {/* Mobile Quick Dropdown Trigger for One-Tap Category Selection */}
        <div className="sm:hidden shrink-0 relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
              isDark
                ? 'bg-white/5 border-white/15 text-[#fff083] hover:bg-white/10'
                : 'bg-black/5 border-black/15 text-[#8f6b00] hover:bg-black/10'
            }`}
            aria-label="Toggle filter dropdown"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.18 }}
                className={`absolute top-full mt-2 end-0 w-56 rounded-2xl p-2 shadow-2xl border backdrop-blur-2xl z-50 flex flex-col gap-1 ${
                  isDark
                    ? 'bg-neutral-900/95 border-white/15 text-white'
                    : 'bg-white/95 border-black/10 text-neutral-900'
                }`}
              >
                <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider opacity-50 font-bold border-b border-white/10 mb-1">
                  {isFa ? 'انتخاب دپارتمان' : 'SELECT DEPARTMENT'}
                </div>
                {items.map((item) => {
                  const isSelected = item.id === activeId;
                  const label = isFa ? item.labelFa : item.labelEn;

                  return (
                    <button
                      key={`mobile-${item.id}`}
                      onClick={() => {
                        onChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-start ${
                        isSelected
                          ? isDark
                            ? 'bg-[#fff083] text-[#222] font-black'
                            : 'bg-[#8f6b00] text-white font-black'
                          : isDark
                            ? 'hover:bg-white/10 text-neutral-300'
                            : 'hover:bg-black/5 text-neutral-700'
                      }`}
                    >
                      <span className="truncate">{label}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.count !== undefined && (
                          <span className="text-[10px] font-mono opacity-70">
                            {isFa ? String(item.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]) : item.count}
                          </span>
                        )}
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ArchitecturalFilterTabs;
