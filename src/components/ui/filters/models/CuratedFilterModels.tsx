import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { BaseFilterProps } from '../types';
import { Folder } from 'lucide-react';

/* ========================================================================= */
/* MODEL 01: SLIDING CAPSULE (الگوی کپسول لغزان معماری)                         */
/* ========================================================================= */
export function Model01_SlidingCapsule<T extends string>({
  items,
  activeId,
  onChange,
  isFa,
  isDarkBg,
  className = '',
}: BaseFilterProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeId]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex items-center gap-1.5 overflow-x-auto scroll-smooth py-1 px-1 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                  ? isDarkBg ? 'text-[#222] font-black' : 'text-white font-black'
                  : isDarkBg ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]' : 'text-neutral-600 hover:text-black hover:bg-black/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="model01-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={`absolute inset-0 rounded-xl shadow-md z-0 ${
                    isDarkBg
                      ? 'bg-[#fff083] shadow-[0_0_20px_rgba(255,240,131,0.28)]'
                      : 'bg-[#8f6b00] shadow-[0_0_16px_rgba(143,107,0,0.25)]'
                  }`}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{label}</span>
              {item.count !== undefined && (
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold ${
                    isActive
                      ? isDarkBg ? 'bg-black/15 text-[#222]' : 'bg-white/20 text-white'
                      : isDarkBg ? 'bg-white/10 text-neutral-400' : 'bg-black/10 text-neutral-600'
                  }`}
                >
                  {isFa ? String(item.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]) : item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* MODEL 05: FLOATING ISLAND (جزیره معلق داینامیک)                            */
/* ========================================================================= */
export function Model05_MagneticIsland<T extends string>({
  items,
  activeId,
  onChange,
  isFa,
  isDarkBg,
  className = '',
}: BaseFilterProps<T>) {
  return (
    <div className={`relative w-full flex justify-center ${className}`}>
      <div
        className={`relative inline-flex items-center p-1.5 rounded-full border shadow-2xl backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar ${
          isDarkBg
            ? 'bg-neutral-900/80 border-white/15 shadow-black/80'
            : 'bg-white/80 border-black/10 shadow-neutral-300/60'
        }`}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          const label = isFa ? item.labelFa : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer shrink-0 z-10 ${
                isActive
                  ? isDarkBg ? 'text-[#222] font-black' : 'text-white font-black'
                  : isDarkBg ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="model05-aura"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className={`absolute inset-0 rounded-full shadow-lg -z-10 ${
                    isDarkBg
                      ? 'bg-[#fff083] shadow-[#fff083]/30'
                      : 'bg-[#8f6b00] shadow-[#8f6b00]/30'
                  }`}
                />
              )}
              <span className="whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* MODEL 17: ARCHIVAL TAB FOLDERS (پوشه‌های پرونده بایگانی)                    */
/* ========================================================================= */
export function Model17_ArchivalIndexFolder<T extends string>({
  items,
  activeId,
  onChange,
  isFa,
  isDarkBg,
  className = '',
}: BaseFilterProps<T>) {
  return (
    <div className={`relative w-full overflow-x-auto no-scrollbar pt-3 pb-1 ${className}`}>
      <div className="flex items-end gap-1.5 min-w-max px-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const label = isFa ? item.labelFa : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative px-4 pt-2.5 pb-2 rounded-t-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer border-t border-x ${
                isActive
                  ? isDarkBg
                    ? 'bg-[#fff083] text-[#222] border-[#fff083] -translate-y-1 z-10 shadow-lg font-black'
                    : 'bg-[#8f6b00] text-white border-[#8f6b00] -translate-y-1 z-10 shadow-lg font-black'
                  : isDarkBg
                    ? 'bg-neutral-900 text-neutral-400 border-white/10 hover:bg-neutral-800'
                    : 'bg-neutral-200 text-neutral-700 border-black/10 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Folder className="w-3 h-3 opacity-60" />
                <span>{label}</span>
                {item.count !== undefined && (
                  <span className="text-[9px] opacity-60">({item.count})</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
