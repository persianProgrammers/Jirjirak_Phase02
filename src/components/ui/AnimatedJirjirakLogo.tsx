import { useState, useEffect, useId } from 'react';
import { useGlobalStore } from '../../stores/globalStore';
import { Logo3DStyleId } from './logo-3d/types';

/**
 * =========================================================================
 * ⚠️ اخطار بسیار مهم سیستمی (CRITICAL PRESERVATION NOTICE)
 * به هیچ‌عنوان هیچ هوش مصنوعی (AI) یا برنامه‌نویسی حق ندارد استایل‌های
 * سه‌بعدی و شیشه‌ای (گرادینت‌ها، پترن‌ها، فیلترها و کانتورها) را پاک کند،
 * تا زمانی که تایید صریح و مستقیم از کارفرما دریافت نشده باشد.
 * استایل انتخابی و دائمی فعلی: 'glass-crystal-prism' (کریستال منشوری با پخ شفاف)
 * سایر استایل‌های تعریف‌شده برای قابلیت سوییچ در پنل ادمین آینده حفظ شده‌اند.
 * =========================================================================
 */

export interface AnimatedJirjirakLogoProps {
  className?: string;
  variant?: 'header' | 'footer';
  tone?: 'dark' | 'light';
  /**
   * اگر true باشد، بال می‌زند (مانند پرده ترنزیشن یا در پنل تست).
   * اگر false یا تعریف‌نشده باشد، با هاور ماوس شروع به بال زدن در لوپ بی‌نهایت می‌کند و با خروج ماوس متوقف می‌شود.
   */
  alwaysAnimate?: boolean;
  /**
   * تاخیر بر حسب میلی‌ثانیه قبل از شروع حرکت بال‌ها (مثلا ۱۰۰۰ میلی‌ثانیه در پرده ترنزیشن).
   * در این مدت لوگو کاملاً نمایش داده می‌شود اما بال‌ها ساکن هستند.
   */
  startDelayMs?: number;
  /**
   * استایل سه‌بعدی شیشه‌ای دلخواه برای لوگو.
   * در صورت عدم تعیین، از استایل انتخابی در استور سراسری (پیش‌فرض: کریستال منشوری) استفاده می‌شود.
   */
  style3d?: Logo3DStyleId;
}

// مسیرهای هندسی وکتوری دقیق بال‌های جیرجیرک (۱۰۰٪ حفظ نسبت‌ها)
const BACK_WING_D = "M163.69,18.24L34.47,34.93c-5.94.77-11.38,3.83-15.21,8.56l-10.61,13.09c-5.56,6.86-6.99,16.29-3.72,24.51l86.85,217.94c3.98,10,14.01,15.99,24.49,14.63h0c9.2-1.19,16.88-7.81,19.62-16.9l25.12-83.56c.58-1.92.92-3.91,1.02-5.92l8.72-182.32c.19-4.01-3.18-7.21-7.07-6.71Z";

const FRONT_WING_D = "M87.92,3.28l136.39,11.63c4.91.42,9.44,2.74,12.6,6.47l15.6,18.37c4.22,4.97,5.46,11.79,3.26,17.91l-87.83,243.95c-2.84,7.88-10.71,12.88-19.14,12.16l-7.56-.64c-7.45-.64-13.78-5.63-16.05-12.66l-29.76-92.08c-.45-1.39-.73-2.83-.83-4.29L80.8,10.2c-.28-3.97,3.1-7.26,7.12-6.92Z";

export function AnimatedJirjirakLogo({ 
  className = "h-16 md:h-20 lg:h-24 w-auto",
  variant = 'header',
  tone,
  alwaysAnimate = false,
  startDelayMs = 0,
  style3d
}: AnimatedJirjirakLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [initialPlay, setInitialPlay] = useState(true);
  const [delayElapsed, setDelayElapsed] = useState(startDelayMs <= 0);

  // وضعیت‌های عمومی تم و لوگو
  const storeLogo3dStyle = useGlobalStore((state) => state.logo3dStyle);
  const isNightStore = useGlobalStore((state) => state.isNight);

  // محاسبه وضعیت روز/شب
  const isNightEffective = tone ? tone === 'dark' : isNightStore;

  // استایل نهایی فعال (پیش‌فرض دائمی: کریستال منشوری glass-crystal-prism)
  const activeStyle: Logo3DStyleId = style3d || storeLogo3dStyle || 'glass-crystal-prism';

  // شناسه یکتا برای تعریف‌های SVG
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');

  // اجرای یک‌باره انیمیشن در هنگام لود سایت به مدت ۱.۲ ثانیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialPlay(false);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startDelayMs <= 0) {
      setDelayElapsed(true);
      return;
    }
    setDelayElapsed(false);
    const timer = setTimeout(() => {
      setDelayElapsed(true);
    }, startDelayMs);
    return () => clearTimeout(timer);
  }, [startDelayMs]);

  // انیمیشن فعال است اگر:
  // ۱. همیشه متحرک باشد (مانند پرده ترنزیشن)
  // ۲. هنگام لود اولیه (یک چرخه کامل اولیه)
  // ۳. با هاور ماوس
  const shouldAnimate = alwaysAnimate ? delayElapsed : (initialPlay || isHovered);

  // ریتم جیرجیرک ارگانیک و فوری:
  const keyTimes = "0; 0.025; 0.050; 0.075; 0.100; 0.125; 0.150; 0.175; 0.200; 0.283; 0.308; 0.333; 0.358; 0.383; 0.408; 0.433; 0.458; 0.483; 1";

  // ۱. بال عقب: زاویه -۷.۵ درجه حول مفصل ثابت (112, 292)
  const backWingValues = 
    "0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; 0 112 292";

  // ۲. بال جلو: زاویه +۸.۰ درجه حول مفصل ثابت (147, 290)
  const frontWingValues = 
    "0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 0 147 290";

  const isFooter = variant === 'footer';

  // استروک تفکیک‌کننده برای بال عقب در حالت روز تا در پس‌زمینه همرنگ گم نشود
  const backWingDayStroke = !isNightEffective ? "#1e1e1e" : "rgba(255, 255, 255, 0.45)";
  const backWingDayStrokeWidth = !isNightEffective ? "3.2px" : "3px";

  return (
    <svg 
      id={isFooter ? "Jirjirak_Footer_Logo" : "Jirjirak_Header_Logo"}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 260.1 317.1"
      className={`${className} overflow-visible select-none cursor-pointer transition-transform duration-300 ${
        alwaysAnimate ? 'drop-shadow-[0_0_25px_rgba(255,240,131,0.3)]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <style>{`
          .j-wing-contour-${uid} {
            stroke-miterlimit: 10;
          }
        `}</style>

        {/* فیلتر سایه افتان بال جلو روی بال عقب */}
        <filter id={`inter-wing-shadow-${uid}`} x="-25%" y="-25%" width="160%" height="160%">
          <feDropShadow dx="-5" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity={isNightEffective ? "0.6" : "0.35"} />
        </filter>

        {/* فیلتر سایه محیطی نرم زیرین */}
        <filter id={`ambient-shadow-${uid}`} x="-30%" y="-30%" width="170%" height="170%">
          <feDropShadow dx="-3" dy="6" stdDeviation="7" floodColor="#000000" floodOpacity={isNightEffective ? "0.45" : "0.25"} />
        </filter>

        {/* فیلتر درخشش خطوط نوری شیشه */}
        <filter id={`glass-glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ============================================================== */}
        {/* ۱. گرادینت‌های شیشه مات نئونی (Frosted Glass & Core Glow)       */}
        {/* ============================================================== */}
        <linearGradient id={`frost-front-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          {isFooter ? (
            <>
              <stop offset="0%" stopColor="#383838" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#222222" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0f0f0f" stopOpacity="0.95" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#fffde6" stopOpacity="0.88" />
              <stop offset="35%" stopColor="#fff083" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f5ce3b" stopOpacity="0.9" />
            </>
          )}
        </linearGradient>

        <linearGradient id={`frost-back-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="50%" stopColor="#dce4ea" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#9fb0bc" stopOpacity="0.85" />
        </linearGradient>

        {/* ============================================================== */}
        {/* ۲. گرادینت‌های کریستال منشوری با پخ شفاف (Crystal Prism)         */}
        {/* ============================================================== */}
        <linearGradient id={`prism-front-${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
          {isFooter ? (
            <>
              <stop offset="0%" stopColor="#555555" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#2e2e2e" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#1a1a1a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0.98" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="18%" stopColor="#fff8b0" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#ffd447" stopOpacity="0.72" />
              <stop offset="85%" stopColor="#ffb703" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#d48b00" stopOpacity="0.95" />
            </>
          )}
        </linearGradient>

        <linearGradient id={`prism-back-${uid}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#f1f5f9" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#cbd5e1" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id={`prism-rim-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#fff5a5" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#93c5fd" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>

        {/* ============================================================== */}
        {/* ۳. گرادینت‌های شیشه دودی و کهربایی ژرف (Tinted & Smoked Glass)  */}
        {/* ============================================================== */}
        <linearGradient id={`smoked-front-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          {isFooter ? (
            <>
              <stop offset="0%" stopColor="#2b2b2b" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#171717" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0.98" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ffe57f" stopOpacity="0.92" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.96" />
            </>
          )}
        </linearGradient>

        <linearGradient id={`smoked-back-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.92" />
          <stop offset="45%" stopColor="#475569" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#334155" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
        </linearGradient>

        {/* ============================================================== */}
        {/* ۴. گرادینت‌های آکرلیک مایع و انحنای براق (Liquid Acrylic Gloss)   */}
        {/* ============================================================== */}
        <radialGradient id={`liquid-front-${uid}`} cx="35%" cy="25%" r="80%">
          {isFooter ? (
            <>
              <stop offset="0%" stopColor="#4a4a4a" stopOpacity="0.92" />
              <stop offset="45%" stopColor="#262626" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0c0c0c" stopOpacity="0.96" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="20%" stopColor="#fff8b5" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ffd700" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0.9" />
            </>
          )}
        </radialGradient>

        <radialGradient id={`liquid-back-${uid}`} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#f1f5f9" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#cbd5e1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.92" />
        </radialGradient>

        {/* ============================================================== */}
        {/* ۵. الگو و فیلتر شیشه شیاردار معماری (Fluted Glass Texture)     */}
        {/* ============================================================== */}
        <pattern id={`fluted-pattern-${uid}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="2.5" />
          <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(0, 0, 0, 0.18)" strokeWidth="2" />
        </pattern>
      </defs>

      {/* ================================================================ */}
      {/* ۱. بال عقب (Back Wing) - مفصل چرخش ثابت: (112, 292)             */}
      {/* ================================================================ */}
      <g 
        id="Back_Wing" 
        data-name="Back Wing"
        style={activeStyle !== 'classic-flat' ? { filter: `url(#ambient-shadow-${uid})` } : undefined}
      >
        {/* الف: مسیر اصلی بال عقب با رنگ‌بندی شیشه‌ای منتخب یا فلت */}
        <path 
          className={`j-wing-contour-${uid}`}
          style={{ 
            fill: 
              activeStyle === 'classic-flat' ? '#e9e9e9' :
              activeStyle === 'glass-frosted-neon' ? `url(#frost-back-${uid})` :
              activeStyle === 'glass-crystal-prism' ? `url(#prism-back-${uid})` :
              activeStyle === 'glass-tinted-smoked' ? `url(#smoked-back-${uid})` :
              activeStyle === 'glass-liquid-gloss' ? `url(#liquid-back-${uid})` :
              activeStyle === 'glass-architectural-fluted' ? `url(#frost-back-${uid})` :
              '#e9e9e9',
            // در حالت فلت استروک ۶.۴ مشکی است؛ در حالت شیشه‌ای در روز استروک تفکیک‌کننده مشکی ۳.۲px دارد
            stroke: activeStyle === 'classic-flat' ? '#222222' : backWingDayStroke,
            strokeWidth: activeStyle === 'classic-flat' ? '6.4px' : backWingDayStrokeWidth,
          }}
          d={BACK_WING_D} 
        />

        {/* ب: لایه بافت شیاردار در استایل معماری fluted */}
        {activeStyle === 'glass-architectural-fluted' && (
          <path
            d={BACK_WING_D}
            fill={`url(#fluted-pattern-${uid})`}
            style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
          />
        )}

        {/* ج: خطوط شکست نور و های‌لایت لبه برای استایل کریستال منشوری */}
        {activeStyle === 'glass-crystal-prism' && (
          <path
            d={BACK_WING_D}
            fill="none"
            stroke={`url(#prism-rim-${uid})`}
            strokeWidth="2.5px"
            strokeLinecap="round"
            style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
          />
        )}

        {/* د: انعکاس محدب صیقلی برای استایل آکرلیک مایع */}
        {activeStyle === 'glass-liquid-gloss' && (
          <path
            d="M45,45 Q70,120 100,240"
            fill="none"
            stroke="#ffffff"
            strokeWidth="5px"
            strokeLinecap="round"
            opacity="0.65"
            style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
          />
        )}

        {/* هـ: خط نوری درونی ستون فقرات (بدون نقطه در پایین مفصل) */}
        {activeStyle === 'glass-frosted-neon' && (
          <path
            d="M52,48 L112,215"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3px"
            strokeLinecap="round"
            filter={`url(#glass-glow-${uid})`}
            opacity={isNightEffective ? "0.85" : "0.55"}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* موشن بال عقب */}
        {shouldAnimate && (
          <animateTransform
            key={isHovered ? 'hover' : (initialPlay ? 'init' : 'always')}
            attributeName="transform"
            type="rotate"
            values={backWingValues}
            keyTimes={keyTimes}
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </g>

      {/* ================================================================ */}
      {/* ۲. بال جلو (Front Wing) - مفصل چرخش ثابت: (147, 290)            */}
      {/* ================================================================ */}
      <g 
        id="Fornt_Wing" 
        data-name="Fornt Wing"
        style={activeStyle !== 'classic-flat' ? { filter: `url(#inter-wing-shadow-${uid})` } : undefined}
      >
        {/* الف: مسیر اصلی بال جلو */}
        <path 
          className={`j-wing-contour-${uid}`}
          style={{ 
            fill: 
              activeStyle === 'classic-flat' ? (isFooter ? '#222222' : '#fff083') :
              activeStyle === 'glass-frosted-neon' ? `url(#frost-front-${uid})` :
              activeStyle === 'glass-crystal-prism' ? `url(#prism-front-${uid})` :
              activeStyle === 'glass-tinted-smoked' ? `url(#smoked-front-${uid})` :
              activeStyle === 'glass-liquid-gloss' ? `url(#liquid-front-${uid})` :
              activeStyle === 'glass-architectural-fluted' ? `url(#frost-front-${uid})` :
              (isFooter ? '#222222' : '#fff083'),
            stroke: 
              activeStyle === 'classic-flat' ? '#222222' :
              !isNightEffective ? '#222222' :
              (isFooter ? '#444444' : '#fff8b3'),
            strokeWidth: activeStyle === 'classic-flat' ? '6.51px' : '4px',
          }}
          d={FRONT_WING_D} 
        />

        {/* ب: لایه بافت شیاردار در استایل معماری fluted */}
        {activeStyle === 'glass-architectural-fluted' && (
          <path
            d={FRONT_WING_D}
            fill={`url(#fluted-pattern-${uid})`}
            style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
          />
        )}

        {/* ج: های‌لایت لبه پخ منشوری */}
        {activeStyle === 'glass-crystal-prism' && (
          <>
            <path
              d={FRONT_WING_D}
              fill="none"
              stroke={`url(#prism-rim-${uid})`}
              strokeWidth="3px"
              strokeLinecap="round"
              style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
            />
            {/* انعکاس منشوری لبه فوقانی */}
            <path
              d="M92,8 L220,18 L238,36"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4px"
              strokeLinecap="round"
              opacity="0.9"
              style={{ pointerEvents: 'none' }}
            />
          </>
        )}

        {/* د: انعکاس فوق‌العاده براق آکرلیک صیقلی (Liquid Acrylic Gloss) */}
        {activeStyle === 'glass-liquid-gloss' && (
          <>
            {/* نوار انعکاس قوس فوقانی */}
            <path
              d="M95,15 Q160,25 225,24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5px"
              strokeLinecap="round"
              opacity="0.9"
              style={{ pointerEvents: 'none' }}
            />
            {/* انعکاس طولی انحنای بال */}
            <path
              d="M102,30 L168,235"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4.5px"
              strokeLinecap="round"
              opacity="0.65"
              style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
            />
          </>
        )}

        {/* هـ: نوار های‌لایت براق در شیشه دودی و کهربایی */}
        {activeStyle === 'glass-tinted-smoked' && (
          <path
            d="M98,20 L165,225"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3px"
            strokeLinecap="round"
            opacity="0.75"
            style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
          />
        )}

        {/* و: خط نور نئونی در امتداد ستون فقرات بال (دقت: بدون نقطه و بدون circle در پایین مفصل) */}
        {activeStyle === 'glass-frosted-neon' && (
          <path
            d="M102,22 L158,220"
            fill="none"
            stroke={isFooter ? "#777777" : "#fff083"}
            strokeWidth="3.8px"
            strokeLinecap="round"
            filter={`url(#glass-glow-${uid})`}
            opacity="0.9"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* موشن بال جلو */}
        {shouldAnimate && (
          <animateTransform
            key={isHovered ? 'hover' : (initialPlay ? 'init' : 'always')}
            attributeName="transform"
            type="rotate"
            values={frontWingValues}
            keyTimes={keyTimes}
            dur="1.2s"
            repeatCount="indefinite"
          />
        )}
      </g>
    </svg>
  );
}

// ============================================================================
// 🎨 سایر طرح‌های لوگو کامنت‌شده و آماده استفاده (Commented Alternative Logo Variants)
// برای استفاده از هرکدام، کافیست کامنت آن را باز کرده و در هدر/فوتر فراخوانی کنید:
// ============================================================================

/*
// ۱. لوگوی تخت کلاسیک دو بعدی (اورجینال - Classic Flat 2D)
export function ClassicFlatLogo(props: Omit<AnimatedJirjirakLogoProps, 'style3d'>) {
  return <AnimatedJirjirakLogo {...props} style3d="classic-flat" />;
}
*/

/*
// ۲. لوگوی شیشه مات و درخشش درونی (Frosted Glass & Core Glow)
export function FrostedGlassLogo(props: Omit<AnimatedJirjirakLogoProps, 'style3d'>) {
  return <AnimatedJirjirakLogo {...props} style3d="glass-frosted-neon" />;
}
*/

/*
// ۳. لوگوی کریستال منشوری و پخ شفاف (Prismatic Beveled Crystal - هم‌اکنون استایل پیش‌فرض فعال است)
export function CrystalPrismLogo(props: Omit<AnimatedJirjirakLogoProps, 'style3d'>) {
  return <AnimatedJirjirakLogo {...props} style3d="glass-crystal-prism" />;
}
*/

/*
// ۴. لوگوی شیشه دودی و کهربایی ژرف (Deep Amber & Smoked Glass)
export function SmokedGlassLogo(props: Omit<AnimatedJirjirakLogoProps, 'style3d'>) {
  return <AnimatedJirjirakLogo {...props} style3d="glass-tinted-smoked" />;
}
*/

/*
// ۵. لوگوی آکرلیک مایع و انحنای براق (Liquid Acrylic & Convex Gloss)
export function LiquidGlossLogo(props: Omit<AnimatedJirjirakLogoProps, 'style3d'>) {
  return <AnimatedJirjirakLogo {...props} style3d="glass-liquid-gloss" />;
}
*/

/*
// ۶. لوگوی شیشه شیاردار معماری (Architectural Fluted Glass)
export function FlutedGlassLogo(props: Omit<AnimatedJirjirakLogoProps, 'style3d'>) {
  return <AnimatedJirjirakLogo {...props} style3d="glass-architectural-fluted" />;
}
*/

