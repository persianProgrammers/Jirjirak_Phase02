/**
 * گزینه ۱ (فعلی و بسیار موفق): ترن‌تیبل و صفحه وینیل تخت با بازوی مکانیکی متحرک
 * محفوظ نگه‌داشته شده تا بتوانیم به راحتی بین این دو گزینه سوییچ کنیم.
 */
import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

export function Option1VinylTurntable() {
  const { isPlaying, togglePlay, currentLang, isNight } = useGlobalStore();

  const isFa = currentLang === 'FA';
  const activeGold = isNight ? '#FFF083' : '#FFD700';
  const labelText = isPlaying
    ? (isFa ? 'قطع موزیک جیرجیرک' : 'Mute Music')
    : (isFa ? 'پخش موزیک جیرجیرک' : 'Play Music');

  return (
    <div className="relative pointer-events-auto">
      <button
        onClick={togglePlay}
        className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/85 backdrop-blur-md border border-white/10 hover:border-brand-yellow/50 transition-all duration-500 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.6)] overflow-hidden shrink-0"
        aria-label={labelText}
        title={labelText}
      >
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isNight
              ? 'radial-gradient(circle at center, rgba(255,240,131,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(255,215,0,0.22) 0%, transparent 70%)',
          }}
        />

        <div className="relative flex items-center justify-center pointer-events-none w-full h-full p-1">
          <svg
            viewBox="0 0 48 48"
            className="w-[1.95rem] h-[1.95rem] lg:w-[2.45rem] lg:h-[2.45rem] drop-shadow-md overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="opt1VinylSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                <stop offset="20%" stopColor="#000000" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.18" />
                <stop offset="80%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
              </linearGradient>

              <radialGradient id="opt1CenterLabel" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF280" />
                <stop offset="70%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#B38728" />
              </radialGradient>
            </defs>

            <circle
              cx="24"
              cy="24"
              r="22.5"
              stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.15)'}
              strokeWidth="0.8"
              strokeDasharray="2 4"
              opacity={isPlaying ? 0.6 : 0.25}
              className="transition-colors duration-500"
            />

            <motion.g
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: isPlaying
                  ? { repeat: Infinity, duration: 2.4, ease: 'linear' }
                  : { duration: 0.8, ease: 'easeOut' },
              }}
              style={{ transformOrigin: '21px 24px' }}
            >
              <circle
                cx="21"
                cy="24"
                r="17"
                fill="#121212"
                stroke={isPlaying ? '#2A2A2A' : '#222222'}
                strokeWidth="1"
              />
              <circle
                cx="21"
                cy="24"
                r="15.8"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.6"
              />
              <circle
                cx="21"
                cy="24"
                r="14"
                stroke={isPlaying ? 'rgba(255,240,131,0.22)' : 'rgba(255,255,255,0.08)'}
                strokeWidth="0.5"
                strokeDasharray="6 3 12 4"
              />
              <circle
                cx="21"
                cy="24"
                r="12.2"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
                strokeDasharray="4 2 8 3"
              />
              <circle
                cx="21"
                cy="24"
                r="10.5"
                stroke={isPlaying ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)'}
                strokeWidth="0.5"
                strokeDasharray="8 4 4 2"
              />
              <circle
                cx="21"
                cy="24"
                r="8.8"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="0.5"
              />
              <circle
                cx="21"
                cy="24"
                r="16.5"
                fill="url(#opt1VinylSheen)"
                opacity={isPlaying ? 0.75 : 0.4}
                className="transition-opacity duration-500"
              />
              <circle
                cx="21"
                cy="24"
                r="5.5"
                fill="url(#opt1CenterLabel)"
                stroke="#1A1A1A"
                strokeWidth="0.7"
              />
              <circle
                cx="21"
                cy="24"
                r="3.8"
                stroke="#66460B"
                strokeWidth="0.4"
                strokeDasharray="3 2"
              />
              <circle cx="21" cy="24" r="1.3" fill="#0A0A0A" stroke="#FFD700" strokeWidth="0.5" />
            </motion.g>

            <g>
              <circle cx="39" cy="10" r="3.2" fill="#181818" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <circle cx="39" cy="10" r="1.8" fill={isPlaying ? activeGold : '#555'} />
              <rect
                x="37.5"
                y="5"
                width="3"
                height="4.2"
                rx="0.8"
                fill="#2A2A2A"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.3)'}
                strokeWidth="0.6"
              />
            </g>

            <motion.g
              animate={{ rotate: isPlaying ? 21 : 0 }}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 14,
                mass: 0.8,
              }}
              style={{ transformOrigin: '39px 10px' }}
            >
              <path
                d="M 39 10 L 38 21 L 32 30"
                fill="none"
                stroke={isPlaying ? '#E6E6E6' : 'rgba(255,255,255,0.5)'}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 32 30 L 29 33.5"
                fill="none"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.6)'}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <line
                x1="29"
                y1="33.5"
                x2="28"
                y2="34.8"
                stroke={isPlaying ? '#FFF' : 'rgba(255,255,255,0.5)'}
                strokeWidth="0.9"
                strokeLinecap="round"
              />

              {isPlaying && (
                <motion.g>
                  <motion.circle
                    cx="28"
                    cy="34.8"
                    r="1.2"
                    fill={activeGold}
                    animate={{
                      scale: [0.8, 1.6, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.circle
                    cx="28"
                    cy="34.8"
                    r="2.8"
                    stroke={activeGold}
                    strokeWidth="0.5"
                    fill="none"
                    animate={{
                      scale: [0.8, 2],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: 'easeOut',
                    }}
                  />
                </motion.g>
              )}
            </motion.g>

            {isPlaying && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.path
                  d="M 12 14 L 12 9 L 16 7.5 L 16 11 M 12 11.5 L 16 10"
                  stroke={activeGold}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    y: [-1, -6, -11],
                    x: [0, -2, -4],
                    opacity: [0, 1, 0],
                    rotate: [0, -10, 5],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  style={{ transformOrigin: '12px 14px' }}
                />
                <motion.circle
                  cx="10.8"
                  cy="14"
                  r="1.2"
                  fill={activeGold}
                  animate={{
                    y: [-1, -6, -11],
                    x: [0, -2, -4],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />

                <motion.path
                  d="M 6 22 L 6 18 L 9 17 L 9 19.5"
                  stroke={activeGold}
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  fill="none"
                  animate={{
                    y: [0, -5, -9],
                    x: [0, -1, -3],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
                />
                <motion.circle
                  cx="5"
                  cy="22"
                  r="1"
                  fill={activeGold}
                  animate={{
                    y: [0, -5, -9],
                    x: [0, -1, -3],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
                />
              </motion.g>
            )}
          </svg>
        </div>
      </button>
    </div>
  );
}
