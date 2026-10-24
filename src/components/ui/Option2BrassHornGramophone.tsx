/**
 * گزینه ۲: گرامافون اصیل با شیپور برنجی لوتوسی (The Grand Brass Horn Gramophone)
 * محفوظ نگه‌داشته شده تا همیشه در دسترس باشد.
 */
import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

export function Option2BrassHornGramophone() {
  const { isPlaying, togglePlay, currentLang, isNight } = useGlobalStore();

  const isFa = currentLang === 'FA';
  const activeGold = isNight ? '#FFF083' : '#FFD700';
  const brassHighlight = '#FFF4A3';
  const brassMid = isNight ? '#E6C845' : '#D4AF37';
  const brassShadow = '#8C6819';
  const labelText = isPlaying
    ? (isFa ? 'قطع موزیک جیرجیرک' : 'Mute Music')
    : (isFa ? 'پخش موزیک جیرجیرک' : 'Play Music');

  return (
    <div className="relative pointer-events-auto">
      <button
        onClick={togglePlay}
        className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/85 backdrop-blur-md border border-white/10 hover:border-brand-yellow/50 transition-all duration-500 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.65)] overflow-hidden shrink-0"
        aria-label={labelText}
        title={labelText}
      >
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isNight
              ? 'radial-gradient(circle at 35% 35%, rgba(255,240,131,0.25) 0%, transparent 75%)'
              : 'radial-gradient(circle at 35% 35%, rgba(255,215,0,0.28) 0%, transparent 75%)',
          }}
        />

        <div className="relative flex items-center justify-center pointer-events-none w-full h-full p-0.5">
          <svg
            viewBox="0 0 50 50"
            className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] drop-shadow-md overflow-visible"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <radialGradient id="opt2HornMouthGrad" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor={brassHighlight} />
                <stop offset="45%" stopColor={brassMid} />
                <stop offset="85%" stopColor={brassShadow} />
                <stop offset="100%" stopColor="#2A1B05" />
              </radialGradient>

              <linearGradient id="opt2HornTubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={brassHighlight} />
                <stop offset="35%" stopColor={brassMid} />
                <stop offset="75%" stopColor={brassShadow} />
                <stop offset="100%" stopColor="#1E1404" />
              </linearGradient>

              <linearGradient id="opt2CabinetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#301A10" />
                <stop offset="50%" stopColor="#1D0E07" />
                <stop offset="100%" stopColor="#0B0503" />
              </linearGradient>
            </defs>

            <circle
              cx="25"
              cy="25"
              r="23"
              stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.15)'}
              strokeWidth="0.8"
              strokeDasharray="2 4"
              opacity={isPlaying ? 0.6 : 0.25}
              className="transition-colors duration-500"
            />

            {isPlaying && (
              <g>
                <motion.path
                  d="M 12 11 Q 8 16 12 21"
                  stroke={activeGold}
                  strokeWidth="1"
                  fill="none"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [-1, -5, -9],
                    scaleY: [0.8, 1.2, 1.4],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  style={{ transformOrigin: '12px 16px' }}
                />
                <motion.path
                  d="M 9 9 Q 4 16 9 23"
                  stroke={brassMid}
                  strokeWidth="0.9"
                  fill="none"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: [-2, -7, -12],
                    scaleY: [0.9, 1.3, 1.5],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  style={{ transformOrigin: '9px 16px' }}
                />

                <motion.g
                  animate={{
                    x: [-1, -6, -10],
                    y: [-1, -8, -14],
                    opacity: [0, 1, 0],
                    rotate: [0, -15, 10],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                  style={{ transformOrigin: '14px 11px' }}
                >
                  <path d="M 14 11 L 14 6 L 18 4.5 L 18 8" stroke={activeGold} strokeWidth="0.8" fill="none" />
                  <circle cx="12.8" cy="11" r="1.2" fill={activeGold} />
                  <circle cx="16.8" cy="9.5" r="1.2" fill={activeGold} />
                </motion.g>
              </g>
            )}

            <g>
              <ellipse cx="32" cy="43" rx="13" ry="3" fill="rgba(0,0,0,0.6)" />
              <rect
                x="20"
                y="34"
                width="22"
                height="8"
                rx="1.5"
                fill="url(#opt2CabinetGrad)"
                stroke={isPlaying ? brassShadow : 'rgba(255,255,255,0.2)'}
                strokeWidth="0.8"
              />
              <line
                x1="19"
                y1="34"
                x2="43"
                y2="34"
                stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.4)'}
                strokeWidth="1.2"
              />
              <line x1="22" y1="42" x2="20" y2="44" stroke={isPlaying ? brassMid : '#666'} strokeWidth="1.2" />
              <line x1="40" y1="42" x2="42" y2="44" stroke={isPlaying ? brassMid : '#666'} strokeWidth="1.2" />
            </g>

            <g style={{ transformOrigin: '31px 31px' }}>
              <ellipse
                cx="31"
                cy="31"
                rx="11.5"
                ry="3.2"
                fill="#0A0A0A"
                stroke={isPlaying ? '#222' : '#1A1A1A'}
                strokeWidth="0.8"
              />
              <motion.ellipse
                cx="31"
                cy="31"
                rx="10.5"
                ry="2.8"
                fill="#151515"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.25)'}
                strokeWidth="0.8"
                strokeDasharray={isPlaying ? '6 2 4 2' : 'none'}
                animate={{ strokeDashoffset: isPlaying ? -30 : 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
              <ellipse
                cx="31"
                cy="31"
                rx="7"
                ry="1.8"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
              <ellipse cx="31" cy="31" rx="3.2" ry="1" fill={activeGold} />
              <line x1="31" y1="29.5" x2="31" y2="31" stroke="#FFF" strokeWidth="1" />
            </g>

            <motion.g
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              style={{ transformOrigin: '42px 38px' }}
            >
              <line x1="42" y1="38" x2="45.5" y2="40.5" stroke={isPlaying ? brassMid : '#777'} strokeWidth="1" />
              <circle cx="45.5" cy="40.5" r="1.2" fill={isPlaying ? activeGold : '#999'} />
            </motion.g>

            <path
              d="M 38 34 C 41 28 38 23 34 22"
              fill="none"
              stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.4)'}
              strokeWidth="2"
            />

            <motion.g
              animate={isPlaying ? { rotate: 6 } : { rotate: -12 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              style={{ transformOrigin: '38px 29px' }}
            >
              <path
                d="M 38 29 L 32 29.5 L 30 31"
                fill="none"
                stroke={isPlaying ? '#FFF' : 'rgba(255,255,255,0.5)'}
                strokeWidth="1.2"
              />
              <circle cx="30" cy="31" r="1" fill={isPlaying ? activeGold : '#888'} />
            </motion.g>

            <motion.g
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.03, 1],
                      rotate: [0, -1.5, 1, 0],
                    }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '34px 22px' }}
            >
              <path
                d="M 34 22 C 30 21 24 19 19 16 C 16 14 14 13 14 16 C 14 19 16 18 19 16"
                fill="url(#opt2HornTubeGrad)"
                stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.3)'}
                strokeWidth="1.1"
              />
              <path
                d="M 34 22 C 29 20 22 18 15 16 C 14.5 12 14.5 20 15 16 Z"
                fill="url(#opt2HornTubeGrad)"
              />
              <path
                d="M 34 22 C 30 20 25 18 20 16 C 16 14.5 14 11 14 7 C 18 8 26 12 34 22 Z"
                fill="url(#opt2HornTubeGrad)"
                stroke={isPlaying ? brassHighlight : 'rgba(255,255,255,0.3)'}
                strokeWidth="0.8"
              />
              <path
                d="M 34 22 C 30 21 25 21 20 18 C 16 17.5 14 21 14 25 C 18 24 26 23 34 22 Z"
                fill="url(#opt2HornTubeGrad)"
                stroke={isPlaying ? brassShadow : 'rgba(255,255,255,0.2)'}
                strokeWidth="0.8"
              />
              <ellipse
                cx="14"
                cy="16"
                rx="4.2"
                ry="9.5"
                fill="url(#opt2HornMouthGrad)"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.5)'}
                strokeWidth="1.2"
              />
              <path
                d="M 14 6.5 C 16 8 16 11 14 12 C 16 13.5 16 18.5 14 20 C 16 21.5 16 24 14 25.5"
                fill="none"
                stroke={isPlaying ? brassHighlight : 'rgba(255,255,255,0.35)'}
                strokeWidth="0.8"
                opacity="0.8"
              />
              <ellipse
                cx="14"
                cy="16"
                rx="1.6"
                ry="4"
                fill="#150C03"
                stroke={isPlaying ? brassShadow : '#333'}
                strokeWidth="0.6"
              />
              {isPlaying && (
                <ellipse
                  cx="14"
                  cy="16"
                  rx="1"
                  ry="2.5"
                  fill={activeGold}
                  opacity="0.6"
                />
              )}
            </motion.g>
          </svg>
        </div>
      </button>
    </div>
  );
}
