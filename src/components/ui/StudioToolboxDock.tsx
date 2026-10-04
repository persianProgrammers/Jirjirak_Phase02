import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';
import { DayNightToggle } from './DayNightToggle';
import { LanguageToggle } from './LanguageToggle';
import { AudioToggle } from './AudioToggle';

/**
 * 🧰 Steampunk Vintage Toolbox Dock (جعبه ابزار تعاملی استودیو جیرجیرک)
 * 
 * دکمه اصلی جعبه ابزار مکانیکی با جزئیات برنجی، چرخ‌دنده‌های دقیق، قفل بازشونده و انیمیشن ارگانیک باز و بسته شدن.
 * با کلیک روی آن، سه ابزار سایت (شب/روز، زبان و موزیک گرامافون) به صورت شناور و آبشاری با انیمیشن فنری پدیدار می‌شوند
 * و با بستن آن مجدداً با ظرافت درون جعبه جمع می‌شوند تا فضای صفحه خلوت و مینیمال بماند.
 */
export function StudioToolboxDock() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight, isPlaying } = useGlobalStore();
  const isFa = currentLang === 'FA';

  // Specific Studio Brand Gold requested by user
  const activeGold = '#FEEF83';
  const brassHighlight = '#FFF8C7';
  const brassMid = '#E4D570';
  const brassShadow = '#8C7D2A';

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 lg:bottom-10 lg:right-8 rtl:right-auto rtl:left-3 rtl:sm:left-5 rtl:lg:left-8 z-[60] w-12 lg:w-14 flex flex-col items-center select-none pointer-events-none"
    >
      {/* 🌟 Pop-up Tools Array (Positioned strictly above the trigger button on the exact same vertical center line) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 22,
                staggerChildren: 0.07,
                delayChildren: 0.03,
              },
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.85,
              transition: {
                duration: 0.18,
                staggerChildren: 0.04,
                staggerDirection: -1,
                ease: 'easeIn',
              },
            }}
            className="absolute bottom-full mb-3 flex flex-col items-center gap-3 p-1 rounded-full pointer-events-auto bg-[#0a0a0a]/75 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
          >
            {/* 1. 🌙☀️ Day / Night Toggle */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 12, scale: 0.75 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 10, scale: 0.75 },
              }}
              className="relative group/tool flex items-center justify-center"
            >
              <DayNightToggle />
              <span className={`absolute ${
                isFa ? 'left-full ml-3' : 'right-full mr-3'
              } top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover/tool:opacity-100 transition-opacity duration-200 border shadow-lg ${
                isNight 
                  ? 'bg-[#181818] text-[#fff083] border-white/15' 
                  : 'bg-white text-neutral-800 border-gray-200'
              }`}>
                {isFa ? (isNight ? 'حالت روز' : 'حالت شب') : (isNight ? 'Day Mode' : 'Night Mode')}
              </span>
            </motion.div>

            {/* 2. 🌐 Language Switcher */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 12, scale: 0.75 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 10, scale: 0.75 },
              }}
              className="relative group/tool flex items-center justify-center"
            >
              <LanguageToggle />
              <span className={`absolute ${
                isFa ? 'left-full ml-3' : 'right-full mr-3'
              } top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover/tool:opacity-100 transition-opacity duration-200 border shadow-lg ${
                isNight 
                  ? 'bg-[#181818] text-[#fff083] border-white/15' 
                  : 'bg-white text-neutral-800 border-gray-200'
              }`}>
                {isFa ? 'تغییر زبان به انگلیسی' : 'تغییر به فارسی'}
              </span>
            </motion.div>

            {/* 3. 🎷 Gramophone Audio Toggle */}
            <motion.div
              variants={{
                initial: { opacity: 0, y: 12, scale: 0.75 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 10, scale: 0.75 },
              }}
              className="relative group/tool flex items-center justify-center"
            >
              <AudioToggle />
              <span className={`absolute ${
                isFa ? 'left-full ml-3' : 'right-full mr-3'
              } top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-[11px] font-sans font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover/tool:opacity-100 transition-opacity duration-200 border shadow-lg ${
                isNight 
                  ? 'bg-[#181818] text-[#fff083] border-white/15' 
                  : 'bg-white text-neutral-800 border-gray-200'
              }`}>
                {isFa ? (isPlaying ? 'قطع موزیک' : 'پخش موزیک') : (isPlaying ? 'Mute Music' : 'Play Music')}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧰 Master Interactive Toolbox Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/90 backdrop-blur-md border border-white/15 hover:border-brand-yellow/60 transition-all duration-300 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.6)] overflow-hidden shrink-0"
        aria-label={isFa ? (isOpen ? 'بستن جعبه ابزار' : 'باز کردن جعبه ابزار') : (isOpen ? 'Close Toolbox' : 'Open Toolbox')}
        title={isFa ? (isOpen ? 'بستن جعبه ابزار' : 'جعبه ابزار سایت') : (isOpen ? 'Close Toolbox' : 'Site Toolbox')}
      >
        {/* Ambient Subtle Aura Glow */}
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-700 pointer-events-none"
          style={{
            background: isOpen
              ? 'radial-gradient(circle at center, rgba(255,240,131,0.25) 0%, transparent 75%)'
              : 'radial-gradient(circle at center, rgba(255,240,131,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Status Indicator (Pulse when music is active or toolbox is open) */}
        {isPlaying && !isOpen && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_8px_#fff083] animate-ping pointer-events-none" />
        )}

        {/* Steampunk Toolbox SVG Icon with Real Mechanical Opening Lid & Rising Gear/Tools */}
        <div className="relative flex items-center justify-center pointer-events-none w-full h-full p-1">
          <svg
            viewBox="0 0 48 48"
            className="w-[1.95rem] h-[1.95rem] lg:w-[2.45rem] lg:h-[2.45rem] drop-shadow-md overflow-visible"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Ratchet Wheel (Spins continuously on hover or when opened) */}
            <motion.g
              initial={false}
              animate={{ rotate: isOpen ? 120 : 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              style={{ transformOrigin: '24px 24px' }}
            >
              <circle
                cx="24"
                cy="24"
                r="21.5"
                stroke={activeGold}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity={isOpen ? 0.75 : 0.28}
                className="transition-opacity duration-300 group-hover:opacity-75"
              />
              <circle
                cx="24"
                cy="24"
                r="18.5"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.8"
              />
            </motion.g>

            {/* Toolbox Base Chamber (Solid Brass & Charcoal Structure) */}
            <g>
              {/* Lower Box Tray */}
              <rect
                x="11"
                y="23"
                width="26"
                height="15"
                rx="2.5"
                stroke={brassMid}
                strokeWidth="1.4"
                fill="rgba(16,16,16,0.85)"
              />

              {/* Lower Reinforcement Rivets & Corner Brackets */}
              <path d="M11 26H14.5M37 26H33.5M11 35H14.5M37 35H33.5" stroke={brassHighlight} strokeWidth="1" opacity="0.65" />
              <circle cx="13.5" cy="35" r="0.6" fill="#fff" opacity="0.4" />
              <circle cx="34.5" cy="35" r="0.6" fill="#fff" opacity="0.4" />

              {/* Center Lock Receiver Mount */}
              <path d="M22 23V26.5C22 27.6 22.9 28.5 24 28.5C25.1 28.5 26 27.6 26 26.5V23" stroke={activeGold} strokeWidth="1.2" fill="rgba(254,239,131,0.15)" />
            </g>

            {/* ⚙️ Internal Contents (Revealed & Rising Upward when Lid Flips Open) */}
            <motion.g
              initial={false}
              animate={{
                y: isOpen ? -5 : 4,
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.6,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 18,
                delay: isOpen ? 0.08 : 0,
              }}
              style={{ transformOrigin: '24px 23px' }}
            >
              {/* Crossed Steampunk Screwdriver & Vintage Spanner emerging */}
              <line x1="17" y1="14" x2="31" y2="25" stroke={activeGold} strokeWidth="1.3" strokeLinecap="round" />
              <line x1="31" y1="14" x2="17" y2="25" stroke={brassHighlight} strokeWidth="1.3" strokeLinecap="round" />
              
              {/* Spanner Head & Screwdriver Tip */}
              <circle cx="16.5" cy="13.5" r="1.6" stroke={activeGold} strokeWidth="1" fill="#151515" />
              <rect x="29.5" y="12.5" width="2.2" height="2.2" transform="rotate(45 30.6 13.6)" fill={brassHighlight} />

              {/* Center Interlocking Brass Gear Rising with golden aura */}
              <motion.g
                animate={{ rotate: isOpen ? 360 : 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '24px 17px' }}
              >
                <circle cx="24" cy="17" r="4" stroke={activeGold} strokeWidth="1.1" strokeDasharray="2 1.5" fill="#1c1c1c" />
                <circle cx="24" cy="17" r="1.3" fill={activeGold} />
              </motion.g>
            </motion.g>

            {/* 🧰 Animated Mechanical Toolbox Lid with Real Hinge Physics */}
            {/* The lid physically swings open upwards on hinge at (11, 23) */}
            <motion.g
              initial={false}
              animate={{
                rotate: isOpen ? -72 : 0,
                y: isOpen ? -2 : 0,
                x: isOpen ? -1 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 18,
                mass: 0.8,
              }}
              style={{ transformOrigin: '11px 23px' }}
            >
              {/* Left Hinge Bolt Pivot */}
              <circle cx="11.5" cy="23" r="1.6" fill={activeGold} stroke="#111" strokeWidth="0.8" />
              <circle cx="11.5" cy="23" r="0.6" fill="#fff" />

              {/* Upper Lid Shell */}
              <path
                d="M11 23H37V19.5C37 17.5 35.5 16 33.5 16H14.5C12.5 16 11 17.5 11 19.5V23Z"
                stroke={activeGold}
                strokeWidth="1.3"
                fill="rgba(24,24,24,0.95)"
              />

              {/* Lid Top Handle */}
              <path
                d="M19 16V13C19 12.2 19.8 11.5 20.8 11.5H27.2C28.2 11.5 29 12.2 29 13V16"
                stroke={brassHighlight}
                strokeWidth="1.2"
                fill="none"
              />

              {/* Upper Lock Latch hanging from lid */}
              <motion.g
                animate={{ rotate: isOpen ? 25 : 0 }}
                style={{ transformOrigin: '24px 22px' }}
              >
                <rect x="22.5" y="21" width="3" height="4.5" rx="1" fill={activeGold} />
                <circle cx="24" cy="23" r="0.7" fill="#111" />
              </motion.g>

              {/* Lid Horizontal Groove Line */}
              <line x1="12.5" y1="19.5" x2="35.5" y2="19.5" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            </motion.g>

            {/* Glowing Gem Lock Accent */}
            <circle
              cx="24"
              cy="25.5"
              r="1.4"
              fill={activeGold}
              className={isOpen ? 'animate-pulse' : ''}
            />
          </svg>
        </div>
      </motion.button>
    </div>
  );
}
export default StudioToolboxDock;
