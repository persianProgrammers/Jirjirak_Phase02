import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

/**
 * گزینه ۲: آمپرسنج و فشارسنج عقربه‌ای آنتیک جیرجیرک
 * (Antique Steampunk Chrono-Gauge & Scroll Barometer)
 * 
 * ویژگی‌های این گزینه:
 * ۱. صفحه نیم‌دایره‌ای کالیبره‌شده شبیه فشارسنج‌ها و آمپلی‌فایرهای لامپی قدیمی استودیو (Vintage VU/Pressure Gauge)
 * ۲. درجه‌بندی عددی و خطی با تقسیمات مدرج از Min تا Max (نمایانگر پیمایش از بالا تا انتهای صفحه)
 * ۳. عقربه برنجی با نوک ظریف قرمز/طلایی که با پایین رفتن در صفحه، مثل بالا رفتن فشار صوتی یا گذر زمان، با انیمیشن روان از چپ به راست حرکت می‌کند
 * ۴. پیکان صعود به بالا در مرکز صفحه که با هاور روشن می‌شود و با کلیک صفحه را به بالا هدایت می‌کند
 */
export function VintageJazzCapsule() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // زاویه چرخش عقربه فشارسنج: از 45- درجه (شروع صفحه در سمت چپ) تا 45+ درجه (انتهای صفحه در سمت راست)
  const needleAngle = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  // رینگ پر شونده مسیر پیرامونی نیم‌دایره
  const arcLength = 80; // طول قوس
  const strokeOffset = useTransform(scrollYProgress, [0, 1], [arcLength, 0]);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const scrolledPastTop = latest > 0.012;

      if (scrolledPastTop) {
        setIsVisible(true);

        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 1200);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeGold = "#FFF083";
  const warmGold = "#FFD700";
  const brassShadow = "#8C6819";

  const shouldRender = isVisible || isHovered;

  return (
    <div className="fixed bottom-4 left-3 sm:bottom-6 sm:left-4 lg:bottom-10 lg:left-8 rtl:left-auto rtl:right-3 rtl:sm:right-4 rtl:lg:right-8 z-[60] pointer-events-none">
      <AnimatePresence mode="wait">
        {shouldRender && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative pointer-events-auto flex items-center justify-center origin-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={scrollToTop}
              className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/85 backdrop-blur-md border border-white/10 hover:border-brand-yellow/50 transition-all duration-500 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.65)] overflow-hidden shrink-0 p-0"
              aria-label="Scroll to top"
            >
              {/* هاله نور پس‌زمینه */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,240,131,0.2) 0%, transparent 70%)',
                }}
              />

              {/* صحنه وکتور فشارسنج آنتیک */}
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-1">
                <svg viewBox="0 0 50 50" className="w-[1.95rem] h-[1.95rem] lg:w-[2.45rem] lg:h-[2.45rem] drop-shadow-md overflow-visible" fill="none">
                  {/* رینگ خارجی دندانه‌دار فشارسنج */}
                  <circle
                    cx="25"
                    cy="25"
                    r="22"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.8"
                    strokeDasharray="1.5 3.5"
                  />

                  {/* قوس مدرج درجه‌بندی (Arc Scale) */}
                  <path
                    d="M 12 28 A 15 15 0 0 1 38 28"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* پیشروی پر شونده قوس با رنگ طلایی */}
                  <motion.path
                    d="M 12 28 A 15 15 0 0 1 38 28"
                    stroke={activeGold}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={arcLength}
                    style={{ strokeDashoffset: strokeOffset }}
                    className="drop-shadow-[0_0_6px_rgba(255,240,131,0.6)]"
                  />

                  {/* خطوط درجه‌بندی آنتیک (Ticks) روی صفحه */}
                  {/* تیک چپ (شروع صفحه) */}
                  <line x1="14" y1="26" x2="16.5" y2="25" stroke={activeGold} strokeWidth="1" strokeLinecap="round" />
                  {/* تیک‌های میانی */}
                  <line x1="18" y1="18" x2="20" y2="19.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
                  <line x1="25" y1="14" x2="25" y2="16.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="32" y1="18" x2="30" y2="19.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" />
                  {/* تیک راست (انتهای صفحه) */}
                  <line x1="36" y1="26" x2="33.5" y2="25" stroke={warmGold} strokeWidth="1" strokeLinecap="round" />

                  {/* پیکان صعود به بالا در مرکز برای هدایت ذهن کاربر */}
                  <motion.g
                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M 25 36 L 25 28 M 25 28 L 22 31 M 25 28 L 28 31"
                      stroke={activeGold}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.g>

                  {/* عقربه مکانیکی آمپرسنج / فشارسنج: از مرکز (25, 33) می‌چرخد */}
                  <motion.g
                    style={{
                      rotate: needleAngle,
                      transformOrigin: "25px 33px",
                    }}
                  >
                    {/* میله نازک عقربه */}
                    <line
                      x1="25"
                      y1="33"
                      x2="25"
                      y2="15"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    {/* نوک پیکانی قرمز/طلایی عقربه */}
                    <circle cx="25" cy="14" r="1.3" fill={activeGold} />
                    <line x1="25" y1="14" x2="25" y2="12" stroke={activeGold} strokeWidth="1.2" strokeLinecap="round" />

                    {/* وزنه گرد انتهای عقربه */}
                    <circle cx="25" cy="35" r="1.2" fill="#333" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  </motion.g>

                  {/* پایه و پیچ مرکزی برنجی عقربه */}
                  <circle cx="25" cy="33" r="3.5" fill="#121212" stroke={brassShadow} strokeWidth="1" />
                  <circle cx="25" cy="33" r="1.6" fill={warmGold} />
                  <circle cx="25" cy="33" r="0.7" fill="#0A0A0A" />
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
