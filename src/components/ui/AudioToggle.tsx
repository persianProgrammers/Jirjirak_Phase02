import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

/**
 * گرامافون شاهکار کلاسیک جیرجیرک (The Grand Lotus Horn & Interactive Tonearm Gramophone)
 * 
 * ترکیب بی‌نظیر زاویه دید گرامافون شیپوردار (گزینه ۲) با مکانیک بازو و سوزن متحرک (گزینه ۱):
 * ۱. شیپور برنجی اصیل و با ابهت با دهانه دالبری طلایی (The Iconic Morning Glory Horn)
 * ۲. پایه چوبی نفیس کابینت با لبه‌های برنجی
 * ۳. صفحه وینیل مشکی با شیارهای صوتی درخشان
 * ۴. بازوی مکانیکی سوزن گرامافون با فیزیک واقعی:
 *    - وقتی خاموش است: بازو بالا می‌رود و کاملاً کنار صفحه در وضعیت استراحت قرار می‌گیرد (هیچ چرخشی در صفحه یا هندل وجود ندارد).
 *    - وقتی روشن می‌شود: صفحه شروع به چرخش می‌کند، هندل مکانیکی می‌چرخد، بازو با فرود نرم فنری پایین آمده و سوزن دقیقا روی شیار وینیل می‌نشیند!
 *    - در محل تماس سوزن با شیار، پالس و بارقه‌های نوری طلایی ساطع می‌شود.
 * ۵. امواج صوتی رسا و نت‌های معلق طلایی که از دهانه شیپور بیرون می‌آیند.
 */
export function AudioToggle() {
  const { isPlaying, togglePlay, currentLang, isNight } = useGlobalStore();

  const isFa = currentLang === 'FA';
  const activeGold = '#FEEF83';
  const brassHighlight = '#FFF8C7';
  const brassMid = '#E4D570';
  const brassShadow = '#8C6819';
  const labelText = isPlaying
    ? (isFa ? 'قطع موزیک جیرجیرک' : 'Mute Music')
    : (isFa ? 'پخش موزیک جیرجیرک' : 'Play Music');

  return (
    <div className="relative pointer-events-auto">
      <button
        onClick={togglePlay}
        className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
        aria-label={labelText}
      >
        {/* هاله نور متمرکز هنگام پخش موزیک */}
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

        {/* صحنه وکتور گرامافون شیپوردار با بازوی متحرک */}
        <div className="relative flex items-center justify-center pointer-events-none w-full h-full p-0.5">
          <svg
            viewBox="0 0 50 50"
            className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] drop-shadow-md overflow-visible"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              {/* گرادیان دهانه شیپور طلایی */}
              <radialGradient id="masterHornMouth" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor={brassHighlight} />
                <stop offset="45%" stopColor={brassMid} />
                <stop offset="85%" stopColor={brassShadow} />
                <stop offset="100%" stopColor="#2A1B05" />
              </radialGradient>

              {/* گرادیان بدنه لوله‌ای شیپور */}
              <linearGradient id="masterHornTube" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={brassHighlight} />
                <stop offset="35%" stopColor={brassMid} />
                <stop offset="75%" stopColor={brassShadow} />
                <stop offset="100%" stopColor="#1E1404" />
              </linearGradient>

              {/* گرادیان چوب جعبه گرامافون */}
              <linearGradient id="masterCabinet" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#301A10" />
                <stop offset="50%" stopColor="#1D0E07" />
                <stop offset="100%" stopColor="#0B0503" />
              </linearGradient>
            </defs>

            {/* ۱. چرخ‌دنده و خط‌چین‌های مکانیکی دقیقاً مشابه دکمه‌های تغییر زبان و روز/شب با افکت روشن‌شدن در هاور */}
            <motion.g
              initial={false}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "25px 25px" }}
            >
              {/* خط‌چین چرخ‌دنده‌ای بیرونی: در حالت عادی کم‌رنگ (opacity-35) و در هاور کامپوننت روشن (group-hover:opacity-75) */}
              <circle
                cx="25"
                cy="25"
                r="22"
                stroke={activeGold}
                strokeWidth="1.15"
                strokeDasharray="4 4"
                opacity={isPlaying ? 0.75 : 0.35}
                className="transition-all duration-500 group-hover:opacity-75"
              />
              {/* شیار پیوسته و ظریف داخلی */}
              <circle
                cx="25"
                cy="25"
                r="19"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.8"
                className="transition-all duration-500 group-hover:stroke-white/25"
              />
            </motion.g>

            {/* ۲. امواج صوتی و نت‌های معلق طلایی خارج شده از دهانه شیپور هنگام پخش */}
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

            {/* ۳. جعبه زیرین (کابینت چوبی کلاسیک با پایه‌ها و لبه‌های طلایی) */}
            <g>
              {/* سایه زیرین */}
              <ellipse cx="32" cy="43" rx="13" ry="3" fill="rgba(0,0,0,0.6)" />

              {/* بدنه چوبی کابینت */}
              <rect
                x="20"
                y="34"
                width="22"
                height="8"
                rx="1.5"
                fill="url(#masterCabinet)"
                stroke={isPlaying ? brassShadow : 'rgba(255,255,255,0.2)'}
                strokeWidth="0.8"
              />
              {/* لبه بالایی کابینت */}
              <line
                x1="19"
                y1="34"
                x2="43"
                y2="34"
                stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.4)'}
                strokeWidth="1.2"
              />
              {/* پایه‌ها */}
              <line x1="22" y1="42" x2="20" y2="44" stroke={isPlaying ? brassMid : '#666'} strokeWidth="1.2" />
              <line x1="40" y1="42" x2="42" y2="44" stroke={isPlaying ? brassMid : '#666'} strokeWidth="1.2" />
            </g>

            {/* ۴. صفحه وینیل چرخان: فقط و فقط وقتی isPlaying است می‌چرخد */}
            <g style={{ transformOrigin: '31px 31px' }}>
              {/* بستر ثابت صفحه */}
              <ellipse
                cx="31"
                cy="31"
                rx="11.5"
                ry="3.2"
                fill="#0A0A0A"
                stroke={isPlaying ? '#222' : '#1A1A1A'}
                strokeWidth="0.8"
              />

              {/* صفحه گردان وینیل با شیارها */}
              <motion.ellipse
                cx="31"
                cy="31"
                rx="10.5"
                ry="2.8"
                fill="#151515"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.25)'}
                strokeWidth="0.8"
                strokeDasharray={isPlaying ? '6 2 4 2' : 'none'}
                animate={isPlaying ? { strokeDashoffset: -30 } : { strokeDashoffset: 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 1.5, ease: 'linear' } : { duration: 0.3 }}
              />

              {/* شیار میانی */}
              <ellipse
                cx="31"
                cy="31"
                rx="7"
                ry="1.8"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />

              {/* لیبل زرد رنگ مرکز صفحه */}
              <ellipse cx="31" cy="31" rx="3.2" ry="1" fill={activeGold} />
              {/* اسپیندل مرکزی */}
              <line x1="31" y1="29.5" x2="31" y2="31" stroke="#FFF" strokeWidth="1" />
            </g>

            {/* ۵. هندل چرخشی کلاسیک استیم‌پانک: فقط وقتی isPlaying است می‌چرخد */}
            <motion.g
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { repeat: Infinity, duration: 1.4, ease: 'linear' } : { duration: 0.5 }}
              style={{ transformOrigin: '42px 38px' }}
            >
              <line x1="42" y1="38" x2="45.5" y2="40.5" stroke={isPlaying ? brassMid : '#777'} strokeWidth="1" />
              <circle cx="45.5" cy="40.5" r="1.2" fill={isPlaying ? activeGold : '#999'} />
            </motion.g>

            {/* ۶. لوله برنجی هدایت صدا از پشت جعبه به شیپور */}
            <path
              d="M 38 34 C 41 28 38 23 34 22"
              fill="none"
              stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.4)'}
              strokeWidth="2"
            />

            {/* پایه پیوت و محور بازوی سوزن (Tonearm Pivot Base) */}
            <circle
              cx="39"
              cy="28"
              r="1.8"
              fill="#181818"
              stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.3)'}
              strokeWidth="0.8"
            />
            <circle cx="39" cy="28" r="0.8" fill={isPlaying ? activeGold : '#666'} />

            {/* ۷. بازوی مکانیکی متحرک سوزن (Interactive Precision Tonearm):
                - خاموش (Muted): بازو ۲۰- درجه به سمت بالا و راست منحرف است (کاملاً برداشته شده و در استراحت).
                - روشن (Playing): بازو با انیمیشن فنری نرم (Spring) پایین می‌آید و سوزن روی شیار دیسک قرار می‌گیرد!
            */}
            <motion.g
              animate={isPlaying ? { rotate: 0 } : { rotate: -26 }}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 13,
                mass: 0.8,
              }}
              style={{ transformOrigin: '39px 28px' }}
            >
              {/* بازوی فلزی نقره‌ای کرومی */}
              <path
                d="M 39 28 L 33 28.5 L 28 30.5"
                fill="none"
                stroke={isPlaying ? '#FFFFFF' : 'rgba(255,255,255,0.5)'}
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* سرکارتریج طلایی سوزن (Headshell) */}
              <path
                d="M 28 30.5 L 26 31.8"
                fill="none"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.7)'}
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* نوک سوزن الماسی که دقیقاً روی دیسک قرار می‌گیرد */}
              <circle
                cx="25.5"
                cy="32.2"
                r="0.75"
                fill="#FFF"
              />

              {/* درخشش و جرقه‌های طلایی محل تماس سوزن با شیار در حال چرخش دیسک */}
              {isPlaying && (
                <motion.g>
                  <motion.circle
                    cx="25.5"
                    cy="32.2"
                    r="1.2"
                    fill={activeGold}
                    animate={{
                      scale: [0.8, 1.7, 0.8],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.circle
                    cx="25.5"
                    cy="32.2"
                    r="2.6"
                    stroke={activeGold}
                    strokeWidth="0.5"
                    fill="none"
                    animate={{
                      scale: [0.8, 2],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.1,
                      ease: 'easeOut',
                    }}
                  />
                </motion.g>
              )}
            </motion.g>

            {/* ۸. شیپور بزرگ برنجی لوتوسی گرامافون (The Grand Brass Horn) */}
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
              {/* لوله هدایت و مخروط شیپور با گرادیان طلایی */}
              <path
                d="M 34 22 C 30 21 24 19 19 16 C 16 14 14 13 14 16 C 14 19 16 18 19 16"
                fill="url(#masterHornTube)"
                stroke={isPlaying ? brassMid : 'rgba(255,255,255,0.3)'}
                strokeWidth="1.1"
              />

              {/* شیپور متسع شده اصلی */}
              <path
                d="M 34 22 C 29 20 22 18 15 16 C 14.5 12 14.5 20 15 16 Z"
                fill="url(#masterHornTube)"
              />

              {/* بدنه گل لوتوس شیپور با گلبرگ‌های برنجی */}
              <path
                d="M 34 22 C 30 20 25 18 20 16 C 16 14.5 14 11 14 7 C 18 8 26 12 34 22 Z"
                fill="url(#masterHornTube)"
                stroke={isPlaying ? brassHighlight : 'rgba(255,255,255,0.3)'}
                strokeWidth="0.8"
              />
              <path
                d="M 34 22 C 30 21 25 21 20 18 C 16 17.5 14 21 14 25 C 18 24 26 23 34 22 Z"
                fill="url(#masterHornTube)"
                stroke={isPlaying ? brassShadow : 'rgba(255,255,255,0.2)'}
                strokeWidth="0.8"
              />

              {/* دهانه دالبری بیضوی رو به بیرون شیپور */}
              <ellipse
                cx="14"
                cy="16"
                rx="4.2"
                ry="9.5"
                fill="url(#masterHornMouth)"
                stroke={isPlaying ? activeGold : 'rgba(255,255,255,0.5)'}
                strokeWidth="1.2"
              />

              {/* گلبرگ‌های دالبری لبه شیپور */}
              <path
                d="M 14 6.5 C 16 8 16 11 14 12 C 16 13.5 16 18.5 14 20 C 16 21.5 16 24 14 25.5"
                fill="none"
                stroke={isPlaying ? brassHighlight : 'rgba(255,255,255,0.35)'}
                strokeWidth="0.8"
                opacity="0.8"
              />

              {/* گلوی عمیق و تاریک داخل شیپور */}
              <ellipse
                cx="14"
                cy="16"
                rx="1.6"
                ry="4"
                fill="#150C03"
                stroke={isPlaying ? brassShadow : '#333'}
                strokeWidth="0.6"
              />

              {/* درخشش مرکز دهانه شیپور هنگام پخش */}
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
