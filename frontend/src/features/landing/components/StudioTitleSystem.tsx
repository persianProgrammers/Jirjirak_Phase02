import React, { useState, useEffect } from 'react';

export type TitleStyleId =
  | 'aurora-liquid'
  | 'molten-solar'
  | 'kinetic-wave-bounce'
  | 'outline-fill-duo'
  | 'morphing-scale-stagger'
  | 'glass-refraction-lens'
  | 'split-vertical-slide'
  | 'neon-pulse-marquee'
  | 'floating-levitation'
  | 'golden-ember-spark';

export interface TitleStyleOption {
  id: TitleStyleId;
  number: number;
  icon: string;
  nameEn: string;
  nameFa: string;
  descEn: string;
  descFa: string;
  tag: string;
}

export const TITLE_STYLE_OPTIONS: TitleStyleOption[] = [
  {
    id: 'aurora-liquid',
    number: 1,
    icon: '🌊',
    nameEn: 'Aurora Liquid',
    nameFa: 'شفق سیال ۳۶۰ درجه',
    descEn: 'Continuous shifting iridescent pastel gradient flowing across letters',
    descFa: 'موج رنگین‌کمانی متغیر و شیشه‌ای در امتداد حروف (حفظ شده)',
    tag: 'Kept Option',
  },
  {
    id: 'molten-solar',
    number: 2,
    icon: '🔥',
    nameEn: 'Molten Solar Flare',
    nameFa: 'طلای مذاب و گدازه خورشیدی',
    descEn: 'Warm plasma heat with radiant liquid gold and amber energy',
    descFa: 'پلاسمای گرم خورشیدی با انعکاس گرمای طلای مذاب و کهربا (حفظ شده)',
    tag: 'Kept Option',
  },
  {
    id: 'kinetic-wave-bounce',
    number: 3,
    icon: '〰️',
    nameEn: 'Kinetic Wave Bounce',
    nameFa: 'موج متوالی کاراکترها',
    descEn: 'Individual characters undulating in a staggered liquid sine wave',
    descFa: 'شناوری موجی پلکانی تک‌تک حروف به صورت پیوسته و زنده',
    tag: 'Letter Play',
  },
  {
    id: 'outline-fill-duo',
    number: 4,
    icon: '🔳',
    nameEn: 'Outline vs Solid Duo',
    nameFa: 'دوگانه استروک و توپر',
    descEn: 'Architectural contrast between solid typography and laser outline that dynamically swaps',
    descFa: 'تضاد معمارانه حروف کانتوری خطی و توپر با تبادل نوری مداوم',
    tag: 'Letter Play',
  },
  {
    id: 'morphing-scale-stagger',
    number: 5,
    icon: '🎹',
    nameEn: 'Accordion Scale Rhythm',
    nameFa: 'ریتم آکاردئونی و مقیاس حروف',
    descEn: 'Individual letters breathing and stretching vertically in organic cadence',
    descFa: 'تنفس و کشش ارتفاعی ریتمیک حروف مانند اکولایزر معمارانه',
    tag: 'Letter Play',
  },
  {
    id: 'glass-refraction-lens',
    number: 6,
    icon: '🔍',
    nameEn: 'Glass Optical Lens',
    nameFa: 'ذره‌بین اپتیکال شیشه‌ای',
    descEn: 'A magnified crystal glass lens sweeping over individual letters with chromatic prism fringes',
    descFa: 'گذر لنز شیشه‌ای بزرگ‌نما با شکست منشور رنگی روی تک‌تک حروف',
    tag: 'Optical FX',
  },
  {
    id: 'split-vertical-slide',
    number: 7,
    icon: '✂️',
    nameEn: 'Split Shift Typo',
    nameFa: 'برش متقاطع و لغزش حروف',
    descEn: 'Alternating characters split vertically with precise scissor offset before snapping to baseline',
    descFa: 'لغزش متناوب بالا و پایین حروف با برش معمارانه و بازگشت به خط کرسی',
    tag: 'Letter Play',
  },
  {
    id: 'neon-pulse-marquee',
    number: 8,
    icon: '⚡',
    nameEn: 'Sequential Electric Current',
    nameFa: 'جریان الکتریکی متوالی حروف',
    descEn: 'Electric luminance traveling in rapid sequence from letter to letter like neon tube conduits',
    descFa: 'حرکت سیگنال نوری خیره‌کننده از حرف به حرف در امتداد کلمه',
    tag: 'Electric FX',
  },
  {
    id: 'floating-levitation',
    number: 9,
    icon: '🪐',
    nameEn: 'Zero-Gravity Floating',
    nameFa: 'معلق در جاذبه صفر',
    descEn: 'Each letter floats independently in 3D space with subtle organic tilts and weightless drift',
    descFa: 'معلق بودن مستقل کاراکترها در فضا با چرخش‌های ظریف و بی‌وزنی فضایی',
    tag: '3D Physics',
  },
  {
    id: 'golden-ember-spark',
    number: 10,
    icon: '✨',
    nameEn: 'Brushed Bronze & Diamond Sparks',
    nameFa: 'ورق برنز و بارقه‌های الماس',
    descEn: 'Brushed metallic bronze finish with glittering diamond starbursts pulsating on key characters',
    descFa: 'بافت ورق برنز متالیک همراه با چشمک‌های الماسی روی حروف کلیدی',
    tag: 'Fine Metal',
  },
];

interface StudioTitleRendererProps {
  styleId: TitleStyleId;
  isNight: boolean;
  currentLang: string;
}

export const StudioTitleRenderer: React.FC<StudioTitleRendererProps> = ({
  styleId,
  isNight,
  currentLang,
}) => {
  const isFa = currentLang === 'FA';
  const text = isFa ? 'استودیو جیرجیرک' : 'Jirjirak Studio';

  return (
    <div className="relative inline-flex flex-col items-center justify-center mb-5 sm:mb-6 group cursor-default select-none">
      <style>{`
        /* 1. Aurora Liquid */
        @keyframes auroraWaveSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* 2. Molten Solar Flare */
        @keyframes brandGleamMolten {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes moltenHeatPulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px #f59e0b) brightness(1);
            transform: scale(0.99);
          }
          50% {
            filter: drop-shadow(0 0 24px #ef4444) brightness(1.22);
            transform: scale(1.02);
          }
        }

        /* 3. Kinetic Wave Bounce */
        @keyframes letterSineWave {
          0%, 100% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 2px rgba(255,255,255,0.2));
          }
          50% {
            transform: translateY(-5px);
            color: #fff083;
            filter: drop-shadow(0 0 14px rgba(255, 240, 131, 0.7));
          }
        }

        /* 4. Outline vs Solid Duo */
        @keyframes outlineSwapGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 240, 131, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(255, 240, 131, 0.75));
          }
        }

        /* 5. Accordion Scale Rhythm */
        @keyframes accordionStretch {
          0%, 100% {
            transform: scaleY(0.92) scaleX(0.96);
            opacity: 0.85;
          }
          50% {
            transform: scaleY(1.22) scaleX(1.08);
            opacity: 1;
            filter: drop-shadow(0 0 12px rgba(255, 240, 131, 0.6));
          }
        }

        /* 6. Glass Optical Lens */
        @keyframes lensSweepAcross {
          0% { left: -30%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { left: 120%; opacity: 0; }
        }

        /* 7. Split Shift Typo */
        @keyframes splitShiftEven {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3.5px); color: #fff083; }
        }
        @keyframes splitShiftOdd {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3.5px); color: #ffffff; }
        }

        /* 8. Sequential Electric Current */
        @keyframes electricLetterPulse {
          0%, 100% {
            color: rgba(255, 255, 255, 0.45);
            text-shadow: none;
          }
          30% {
            color: #ffffff;
            text-shadow: 0 0 10px #00f0ff, 0 0 22px #00f0ff, 0 0 35px #00f0ff;
          }
        }

        /* 9. Zero-Gravity Floating */
        @keyframes zeroGravA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4.5px) rotate(-3.5deg); }
        }
        @keyframes zeroGravB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes zeroGravC {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(-1.5deg); }
        }

        /* 10. Brushed Bronze & Diamond Sparks */
        @keyframes diamondGlintPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.3) rotate(45deg);
            filter: drop-shadow(0 0 10px #ffd700);
          }
        }
      `}</style>

      {/* Model 1: Aurora Liquid (KEPT) */}
      {styleId === 'aurora-liquid' && (
        <>
          <span
            className="absolute -inset-x-8 -inset-y-3 rounded-full blur-2xl pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.3) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 75%)',
            }}
          />
          <p
            className="relative z-10 text-xs sm:text-sm font-black tracking-[0.36em] uppercase transition-all duration-500"
            style={{
              backgroundImage: 'linear-gradient(270deg, #38bdf8, #a855f7, #f43f5e, #34d399, #38bdf8)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'auroraWaveSweep 6s ease infinite',
              filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.35))',
            }}
          >
            {text}
          </p>
        </>
      )}

      {/* Model 2: Molten Solar Flare (KEPT) */}
      {styleId === 'molten-solar' && (
        <>
          <span
            className="absolute -inset-x-8 -inset-y-3 rounded-full blur-2xl pointer-events-none opacity-45"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.3) 0%, rgba(239, 68, 68, 0.15) 60%, transparent 80%)',
            }}
          />
          <p
            className="relative z-10 text-xs sm:text-sm font-black tracking-[0.36em] uppercase transition-all duration-500"
            style={{
              backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f97316 40%, #ffffff 50%, #f97316 60%, #fbbf24 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'brandGleamMolten 4s linear infinite, moltenHeatPulse 3.5s ease-in-out infinite',
            }}
          >
            {text}
          </p>
        </>
      )}

      {/* Model 3: Kinetic Wave Bounce (NEW - Staggered Letter Floating Wave) */}
      {styleId === 'kinetic-wave-bounce' && (
        <p
          className={`relative z-10 text-xs sm:text-sm font-black tracking-[0.36em] uppercase transition-colors duration-500 flex items-center justify-center flex-wrap ${
            isNight ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block transform-gpu"
              style={{
                animation: 'letterSineWave 2.2s ease-in-out infinite',
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      )}

      {/* Model 4: Outline vs Solid Duo (NEW - Architectural Stroke and Solid Contrast) */}
      {styleId === 'outline-fill-duo' && (
        <div className="relative z-10 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black uppercase tracking-[0.34em]">
          {isFa ? (
            <>
              <span className={`px-2.5 py-0.5 rounded ${isNight ? 'bg-brand-yellow/15 text-brand-yellow' : 'bg-black/10 text-neutral-900'} drop-shadow-sm`}>
                استودیو
              </span>
              <span 
                className="transition-all"
                style={{
                  WebkitTextStroke: isNight ? '1.2px #ffffff' : '1.2px #222222',
                  color: 'transparent',
                  animation: 'outlineSwapGlow 3s ease-in-out infinite',
                }}
              >
                جیرجیرک
              </span>
            </>
          ) : (
            <>
              <span className={`px-2.5 py-0.5 rounded ${isNight ? 'bg-brand-yellow text-brand-dark font-extrabold shadow-[0_0_15px_rgba(255,240,131,0.3)]' : 'bg-neutral-900 text-white font-extrabold'}`}>
                JIRJIRAK
              </span>
              <span
                className="transition-all"
                style={{
                  WebkitTextStroke: isNight ? '1.2px #fff083' : '1.2px #222222',
                  color: 'transparent',
                  letterSpacing: '0.4em',
                  animation: 'outlineSwapGlow 3s ease-in-out infinite',
                }}
              >
                STUDIO
              </span>
            </>
          )}
        </div>
      )}

      {/* Model 5: Accordion Scale Rhythm (NEW - Organic vertical stretch and pulse) */}
      {styleId === 'morphing-scale-stagger' && (
        <p
          className={`relative z-10 text-xs sm:text-sm font-black tracking-[0.36em] uppercase flex items-center justify-center ${
            isNight ? 'text-amber-100' : 'text-neutral-900'
          }`}
        >
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block origin-bottom transform-gpu"
              style={{
                animation: 'accordionStretch 2.5s ease-in-out infinite',
                animationDelay: `${(index % 5) * 0.18}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      )}

      {/* Model 6: Glass Optical Lens (NEW - Moving Magnifier with Chromatic Flare) */}
      {styleId === 'glass-refraction-lens' && (
        <div className="relative overflow-hidden py-1 px-4">
          {/* Gliding Lens Element */}
          <div
            className="absolute top-0 bottom-0 w-16 pointer-events-none rounded-full blur-md z-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.4), rgba(244, 114, 182, 0.4), transparent)',
              animation: 'lensSweepAcross 4.2s ease-in-out infinite',
            }}
          />
          <p
            className={`relative z-10 text-xs sm:text-sm font-black tracking-[0.4em] uppercase transition-colors ${
              isNight ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-neutral-900'
            }`}
          >
            {text}
          </p>
        </div>
      )}

      {/* Model 7: Split Shift Typo (NEW - Scissor offset of alternating letters) */}
      {styleId === 'split-vertical-slide' && (
        <p
          className={`relative z-10 text-xs sm:text-sm font-black tracking-[0.36em] uppercase flex items-center justify-center ${
            isNight ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {text.split('').map((char, index) => {
            const isEven = index % 2 === 0;
            return (
              <span
                key={index}
                className="inline-block transform-gpu"
                style={{
                  animation: isEven
                    ? 'splitShiftEven 3s ease-in-out infinite'
                    : 'splitShiftOdd 3s ease-in-out infinite',
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </p>
      )}

      {/* Model 8: Sequential Electric Current (NEW - Rapid marquee current running through letters) */}
      {styleId === 'neon-pulse-marquee' && (
        <p className="relative z-10 text-xs sm:text-sm font-mono font-bold tracking-[0.38em] uppercase flex items-center justify-center">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block transition-all"
              style={{
                animation: 'electricLetterPulse 2s ease-in-out infinite',
                animationDelay: `${index * 0.12}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      )}

      {/* Model 9: Zero-Gravity Floating (NEW - Multi-angle 3D spatial levitation) */}
      {styleId === 'floating-levitation' && (
        <p
          className={`relative z-10 text-xs sm:text-sm font-black tracking-[0.38em] uppercase flex items-center justify-center ${
            isNight ? 'text-slate-100' : 'text-neutral-900'
          }`}
        >
          {text.split('').map((char, index) => {
            const anim =
              index % 3 === 0
                ? 'zeroGravA 3.6s ease-in-out infinite'
                : index % 3 === 1
                ? 'zeroGravB 4.2s ease-in-out infinite'
                : 'zeroGravC 3.2s ease-in-out infinite';

            return (
              <span
                key={index}
                className="inline-block transform-gpu"
                style={{
                  animation: anim,
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </p>
      )}

      {/* Model 10: Brushed Bronze & Diamond Sparks (NEW - Metallic finish with diamond glints) */}
      {styleId === 'golden-ember-spark' && (
        <div className="relative inline-flex items-center">
          {/* Diamond glints on corners */}
          <span
            className="absolute -left-3 -top-1 text-[10px] text-amber-300 pointer-events-none"
            style={{ animation: 'diamondGlintPulse 2.8s ease-in-out infinite' }}
          >
            ✦
          </span>
          <span
            className="absolute -right-3 -bottom-1 text-[10px] text-yellow-200 pointer-events-none"
            style={{ animation: 'diamondGlintPulse 2.8s ease-in-out infinite 1.4s' }}
          >
            ✦
          </span>

          <p
            className="relative z-10 text-xs sm:text-sm font-black tracking-[0.4em] uppercase transition-all duration-500"
            style={{
              backgroundImage: isNight
                ? 'linear-gradient(120deg, #d4af37 0%, #fff7b2 30%, #e2ba45 60%, #ffffff 80%, #d4af37 100%)'
                : 'linear-gradient(120deg, #604e18 0%, #a3933c 30%, #2e2608 60%, #a3933c 80%, #604e18 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'brandGleamMolten 5s linear infinite',
              filter: isNight ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.45))' : 'none',
            }}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

interface TitleStyleSwitcherProps {
  currentStyle: TitleStyleId;
  onChangeStyle: (style: TitleStyleId) => void;
  isNight: boolean;
  currentLang: string;
}

export const TitleStyleSwitcher: React.FC<TitleStyleSwitcherProps> = ({
  currentStyle,
  onChangeStyle,
  isNight,
  currentLang,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAutoCycling, setIsAutoCycling] = useState(false);

  const activeOption =
    TITLE_STYLE_OPTIONS.find((o) => o.id === currentStyle) ||
    TITLE_STYLE_OPTIONS[0];

  // Auto cycle feature
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      const currentIndex = TITLE_STYLE_OPTIONS.findIndex((o) => o.id === currentStyle);
      const nextIndex = (currentIndex + 1) % TITLE_STYLE_OPTIONS.length;
      onChangeStyle(TITLE_STYLE_OPTIONS[nextIndex].id);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoCycling, currentStyle, onChangeStyle]);

  const handleNext = () => {
    const currentIndex = TITLE_STYLE_OPTIONS.findIndex((o) => o.id === currentStyle);
    const nextIndex = (currentIndex + 1) % TITLE_STYLE_OPTIONS.length;
    onChangeStyle(TITLE_STYLE_OPTIONS[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = TITLE_STYLE_OPTIONS.findIndex((o) => o.id === currentStyle);
    const prevIndex =
      (currentIndex - 1 + TITLE_STYLE_OPTIONS.length) % TITLE_STYLE_OPTIONS.length;
    onChangeStyle(TITLE_STYLE_OPTIONS[prevIndex].id);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans select-none"
      dir={currentLang === 'FA' ? 'rtl' : 'ltr'}
    >
      {/* Minimized Floating Control Pill */}
      {!isExpanded ? (
        <div className="flex items-center gap-1.5 p-1 rounded-full backdrop-blur-xl border shadow-2xl transition-all duration-300 bg-brand-dark/90 border-brand-yellow/30 text-white">
          {/* Quick Prev Button */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer"
            title={currentLang === 'FA' ? 'مدل قبلی' : 'Previous Style'}
            aria-label="Previous style"
          >
            ←
          </button>

          {/* Main Trigger Pill */}
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-brand-yellow/15 active:scale-95 transition-all text-xs font-semibold cursor-pointer group"
          >
            <span className="text-sm group-hover:scale-125 transition-transform">
              {activeOption.icon}
            </span>
            <span className="text-brand-yellow font-mono text-[11px]">
              {activeOption.number}/10
            </span>
            <span className="text-neutral-200 group-hover:text-white text-[11px] sm:text-xs">
              {currentLang === 'FA' ? activeOption.nameFa : activeOption.nameEn}
            </span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-400">
              {currentLang === 'FA' ? 'تغییر مدل' : 'Change'}
            </span>
          </button>

          {/* Quick Next Button */}
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer"
            title={currentLang === 'FA' ? 'مدل بعدی' : 'Next Style'}
            aria-label="Next style"
          >
            →
          </button>
        </div>
      ) : (
        /* Expanded 10-Style Selector Panel */
        <div
          className={`p-4 sm:p-5 rounded-2xl backdrop-blur-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 w-[320px] sm:w-[380px] max-h-[85vh] flex flex-col ${
            isNight
              ? 'bg-neutral-950/95 border-brand-yellow/30 text-white'
              : 'bg-neutral-900/95 border-white/20 text-white'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-base text-brand-yellow">✨</span>
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-wide">
                  {currentLang === 'FA'
                    ? 'انتخاب استایل نام استودیو'
                    : 'Studio Title Style (10 Models)'}
                </h3>
                <p className="text-[10px] text-neutral-400">
                  {currentLang === 'FA'
                    ? '۲ مدل حفظ‌شده + ۸ مدل بازی با حروف'
                    : '2 kept models + 8 brand-new letter-play models'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white text-xs transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>

          {/* Quick Controls Bar (Auto Cycle + Arrows) */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/5 mb-3 text-xs">
            <button
              onClick={() => setIsAutoCycling(!isAutoCycling)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all cursor-pointer ${
                isAutoCycling
                  ? 'bg-brand-yellow text-brand-dark font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300'
              }`}
            >
              <span>{isAutoCycling ? '⏸' : '▶'}</span>
              <span>
                {currentLang === 'FA'
                  ? isAutoCycling
                    ? 'توقف گردش خودکار'
                    : 'پخش خودکار ۱۰ مدل'
                  : isAutoCycling
                  ? 'Pause Auto Cycle'
                  : 'Auto Cycle 10'}
              </span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                title="Previous"
              >
                ←
              </button>
              <span className="text-[11px] font-mono text-brand-yellow px-1">
                {activeOption.number} / 10
              </span>
              <button
                onClick={handleNext}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                title="Next"
              >
                →
              </button>
            </div>
          </div>

          {/* List of 10 Options */}
          <div className="flex flex-col gap-1.5 overflow-y-auto pr-1 max-h-[380px] custom-scrollbar">
            {TITLE_STYLE_OPTIONS.map((opt) => {
              const isSelected = opt.id === currentStyle;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChangeStyle(opt.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl text-right transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-brand-yellow/15 border-brand-yellow text-white shadow-[0_0_20px_rgba(255,240,131,0.15)] scale-[1.01]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/15 text-neutral-300'
                  }`}
                  style={{
                    direction: currentLang === 'FA' ? 'rtl' : 'ltr',
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm ${
                      isSelected
                        ? 'bg-brand-yellow text-brand-dark font-bold'
                        : 'bg-white/10 text-neutral-200'
                    }`}
                  >
                    {opt.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-brand-yellow' : 'text-neutral-100'
                        }`}
                      >
                        {opt.icon} {currentLang === 'FA' ? opt.nameFa : opt.nameEn}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 uppercase tracking-wider shrink-0">
                        {opt.tag}
                      </span>
                    </div>

                    <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                      {currentLang === 'FA' ? opt.descFa : opt.descEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400">
            <span>
              {currentLang === 'FA'
                ? 'مدل انتخابی ذخیره می‌شود'
                : 'Selection saved automatically'}
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-brand-yellow hover:underline cursor-pointer"
            >
              {currentLang === 'FA' ? 'بستن' : 'Done'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
