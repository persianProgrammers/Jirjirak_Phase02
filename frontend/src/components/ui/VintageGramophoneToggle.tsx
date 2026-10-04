/**
 * @file VintageGramophoneToggle.tsx
 * @description
 * نگهداری کامل و دست‌نخورده کامپوننت گرامافون کلاسیک (Vintage Gramophone Audio Toggle).
 * طبق درخواست کاربر این کامپوننت به هیچ وجه پاک نشده و به صورت کامل نگهداری می‌شود.
 */
import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

export function VintageGramophoneToggle() {
  const { isPlaying, togglePlay, currentLang, isNight } = useGlobalStore();

  const isFa = currentLang === 'FA';
  const activeColor = isNight ? '#FFF083' : '#FFD700';
  const mutedColor = 'rgba(255,255,255,0.35)';

  return (
    <div className="relative pointer-events-auto">
      <button
        onClick={togglePlay}
        className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
        aria-label={
          isPlaying
            ? (isFa ? 'قطع صدا' : 'Mute Sound')
            : (isFa ? (isNight ? 'پخش جاز شبانه' : 'پخش صدای شرکت') : 'Play Sound')
        }
      >
        {/* Ambient Background Glow when active */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isNight
              ? 'radial-gradient(circle at center, rgba(255,240,131,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(255,215,0,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Animated Gramophone Device */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-1.5 lg:p-2">
          <div className="w-[1.6rem] h-[1.6rem] lg:w-[2.1rem] lg:h-[2.1rem] flex items-center justify-center">
            <svg
              viewBox="-10 -10 68 68"
              className="w-full h-full drop-shadow-md overflow-visible"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Floating Notes & Particles when playing */}
              <motion.g animate={{ opacity: isPlaying ? 1 : 0 }} transition={{ duration: 0.3 }}>
                <motion.g
                  animate={{
                    x: isPlaying ? -8 : 0,
                    y: isPlaying ? -14 : 0,
                    opacity: isPlaying ? [0, 1, 0] : 0,
                    rotate: isPlaying ? [0, -15, 10] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                >
                  <path d="M 12 18 L 12 10 L 17 8 L 17 12 M 12 13 L 17 11" stroke={activeColor} strokeWidth="1" />
                  <circle cx="10" cy="18" r="2" fill={activeColor} stroke="none" />
                  <circle cx="15" cy="17" r="2" fill={activeColor} stroke="none" />
                </motion.g>
                <motion.circle
                  cx="4"
                  cy="18"
                  r="1"
                  fill={activeColor}
                  stroke="none"
                  animate={{
                    x: isPlaying ? -10 : 0,
                    y: isPlaying ? -6 : 0,
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                />
              </motion.g>

              <g stroke={isPlaying ? 'white' : mutedColor} strokeWidth="1.5" className="transition-colors duration-500">
                {/* Base Cabinet */}
                <rect x="20" y="34" width="22" height="8" rx="1.5" fill="#0A0A0A" />
                <line x1="18" y1="34" x2="44" y2="34" strokeWidth="2" />
                <line x1="22" y1="42" x2="40" y2="42" strokeWidth="1" opacity="0.5" />
                <path d="M 22 42 L 20 45 M 40 42 L 42 45" strokeWidth="2" />

                {/* Hand Crank (Spins when playing) */}
                <motion.g
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  style={{ transformOrigin: '42px 38px' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx="42" cy="38" r="1.5" fill="#0A0A0A" />
                  <line x1="42" y1="38" x2="46" y2="41" strokeWidth="1.5" />
                  <circle cx="46" cy="41" r="1.5" fill={isPlaying ? activeColor : mutedColor} stroke="none" />
                </motion.g>

                {/* Turntable Platter & Spindle */}
                <line x1="24" y1="30" x2="38" y2="30" strokeWidth="2" />
                <line x1="31" y1="26" x2="31" y2="30" strokeWidth="1.5" />

                {/* Spinning Record */}
                <motion.line
                  x1="26"
                  y1="28"
                  x2="36"
                  y2="28"
                  stroke={isPlaying ? activeColor : mutedColor}
                  strokeWidth="1.5"
                  strokeDasharray={isPlaying ? '2 2' : 'none'}
                  animate={{ strokeDashoffset: isPlaying ? -20 : 0 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                />

                {/* Multi-jointed Tonearm (Drops onto record) */}
                <motion.g
                  animate={{ rotate: isPlaying ? 0 : -22 }}
                  style={{ transformOrigin: '36px 28px' }}
                  transition={{ duration: 0.6, ease: 'backOut' }}
                >
                  <path d="M 36 28 L 36 22 L 28 25 L 26 27.5" fill="none" strokeWidth="1.5" />
                  <circle cx="36" cy="28" r="2" fill="#0A0A0A" />
                  <path d="M 26 27.5 L 25 29" strokeWidth="1" />
                </motion.g>

                {/* Brass Horn Neck */}
                <path d="M 38 34 C 42 20 35 15 28 14" fill="none" strokeWidth="2.5" />
                <line x1="36.5" y1="21" x2="38.5" y2="19" strokeWidth="1" />

                {/* Fluted Horn Bell (Breathes and vibrates) */}
                <motion.g
                  animate={isPlaying ? { scale: [1, 1.03, 1], rotate: [0, -2, 1, 0] } : { scale: 1, rotate: 0 }}
                  style={{ transformOrigin: '28px 14px' }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  stroke={isPlaying ? activeColor : mutedColor}
                >
                  <path
                    d="M 28 14 C 22 14 14 8 8 4 C 4 8 2 14 2 20 C 6 26 18 20 28 14 Z"
                    fill={isPlaying ? (isNight ? 'rgba(255, 240, 131, 0.12)' : 'rgba(255, 215, 0, 0.15)') : 'none'}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M 28 14 C 20 14 12 12 4 12" fill="none" strokeWidth="0.8" opacity="0.6" />
                  <path d="M 28 14 C 20 14 12 16 6 18" fill="none" strokeWidth="0.8" opacity="0.6" />
                  <ellipse cx="6" cy="12" rx="1.5" ry="7" strokeWidth="0.5" opacity="0.4" transform="rotate(30 6 12)" />
                </motion.g>
              </g>
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
