import { useState, useEffect } from 'react';

export interface AnimatedJirjirakLogoProps {
  className?: string;
  variant?: 'header' | 'footer';
  tone?: 'dark' | 'light';
  /**
   * اگر true باشد، بال می‌زند (مانند پرده ترنزیشن).
   * اگر false یا تعریف‌نشده باشد، با هاور ماوس شروع به بال زدن در لوپ بی‌نهایت می‌کند و با خروج ماوس متوقف می‌شود.
   */
  alwaysAnimate?: boolean;
  /**
   * تاخیر بر حسب میلی‌ثانیه قبل از شروع حرکت بال‌ها (مثلا ۱۰۰۰ میلی‌ثانیه در پرده ترنزیشن).
   * در این مدت لوگو کاملاً نمایش داده می‌شود اما بال‌ها ساکن هستند.
   */
  startDelayMs?: number;
}

/**
 * AnimatedJirjirakLogo Component
 * 
 * بال‌های متحرک جیرجیرک با دو تم رنگی:
 * ۱. variant="header":
 *    - بال عقب: خاکستری #e9e9e9
 *    - بال جلو: زرد #fff083
 *    - خطوط کانتور: #222222
 * 
 * ۲. variant="footer":
 *    - بال عقب: خاکستری #e9e9e9
 *    - بال جلو: مشکی تیره #222222
 *    - خطوط کانتور: #222222
 * 
 * رفتار:
 * - بدون هیچ‌گونه تولتیپ پیش‌فرض مرورگر (حذف هرگونه attribute title).
 * - در هدر و فوتر بدون جابجایی یا زوم در همان مکان دقیق شروع به بال‌زدن لوپ می‌کند.
 * - در پرده ترنزیشن لوگو بلافاصله نمایش داده می‌شود و بعد از ۱ ثانیه تاخیر شروع به بال زدن می‌کند.
 */
export function AnimatedJirjirakLogo({ 
  className = "h-16 md:h-20 lg:h-24 w-auto",
  variant = 'header',
  tone,
  alwaysAnimate = false,
  startDelayMs = 0
}: AnimatedJirjirakLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [initialPlay, setInitialPlay] = useState(true);
  const [delayElapsed, setDelayElapsed] = useState(startDelayMs <= 0);

  // اجرای یک‌باره انیمیشن در هنگام لود سایت به مدت ۱.۲ ثانیه (یک چرخه کامل)
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
  // ۲. هنگام لود اولیه برای بار اول (یک بار اجرا شده و ساکن می‌شود)
  // ۳. کاربر روی لوگو هاور کرده باشد (بدون تاخیر درجا آغاز می‌شود)
  const shouldAnimate = alwaysAnimate ? delayElapsed : (initialPlay || isHovered);

  // ریتم جیرجیرک ارگانیک و فوری (بدون وقفه مرده در ابتدای هاور):
  // چرخه ۱.۲ ثانیه‌ای: بال‌زدن برق‌آسا و پرانرژی بلافاصله در ۳۰ میلی‌ثانیه اول
  const keyTimes = "0; 0.025; 0.050; 0.075; 0.100; 0.125; 0.150; 0.175; 0.200; 0.283; 0.308; 0.333; 0.358; 0.383; 0.408; 0.433; 0.458; 0.483; 1";

  // ۱. بال عقب (خاکستری): زاویه -۷.۵ درجه حول مفصل ثابت (112, 292)
  const backWingValues = 
    "0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; -7.5 112 292; 0 112 292; 0 112 292";

  // ۲. بال جلو (زرد در هدر / مشکی در فوتر): زاویه +۸.۰ درجه حول مفصل ثابت (147, 290)
  const frontWingValues = 
    "0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 8 147 290; 0 147 290; 0 147 290";

  // رنگ‌بندی بال‌ها متناسب با هدر یا فوتر:
  const backFill = "#e9e9e9";
  const frontFill = variant === 'footer' ? "#222222" : "#fff083";

  return (
    <svg 
      id={variant === 'footer' ? "Jirjirak_Footer_Logo" : "Jirjirak_Header_Logo"}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 260.1 317.1"
      className={`${className} overflow-visible select-none cursor-pointer ${
        alwaysAnimate ? 'drop-shadow-[0_0_25px_rgba(255,240,131,0.3)]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <style>{`
          .j-wing-contour {
            stroke: #222222;
            stroke-miterlimit: 10;
          }
        `}</style>
      </defs>

      {/* 
        ۱. بال عقب (خاکستری #e9e9e9) - Back Wing
        مفصل چرخش ثابت: (112, 292)
      */}
      <g id="Back_Wing" data-name="Back Wing">
        <path 
          className="j-wing-contour"
          style={{ 
            fill: backFill, 
            strokeWidth: "6.4px" 
          }}
          d="M163.69,18.24L34.47,34.93c-5.94.77-11.38,3.83-15.21,8.56l-10.61,13.09c-5.56,6.86-6.99,16.29-3.72,24.51l86.85,217.94c3.98,10,14.01,15.99,24.49,14.63h0c9.2-1.19,16.88-7.81,19.62-16.9l25.12-83.56c.58-1.92.92-3.91,1.02-5.92l8.72-182.32c.19-4.01-3.18-7.21-7.07-6.71Z" 
        />
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

      {/* 
        ۲. بال جلو (زرد #fff083 در هدر / مشکی #222222 در فوتر) - Front Wing
        مفصل چرخش ثابت: (147, 290)
      */}
      <g id="Fornt_Wing" data-name="Fornt Wing">
        <path 
          className="j-wing-contour"
          style={{ 
            fill: frontFill, 
            strokeWidth: "6.51px" 
          }}
          d="M87.92,3.28l136.39,11.63c4.91.42,9.44,2.74,12.6,6.47l15.6,18.37c4.22,4.97,5.46,11.79,3.26,17.91l-87.83,243.95c-2.84,7.88-10.71,12.88-19.14,12.16l-7.56-.64c-7.45-.64-13.78-5.63-16.05-12.66l-29.76-92.08c-.45-1.39-.73-2.83-.83-4.29L80.8,10.2c-.28-3.97,3.1-7.26,7.12-6.92Z" 
        />
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
