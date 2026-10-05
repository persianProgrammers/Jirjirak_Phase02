import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';

/**
 * VintageJazzCapsule Component: قطب‌نمای ناوبری و اسطرلاب جیرجیرک با ستاره قطبی راهنما
 * بهینه‌سازی شده برای بالاترین نرخ فریم (120fps smooth scrolling):
 * - صفر ری‌رندر اضافی هنگام اسکرول (استفاده از ref محافظتی برای کنترل دیداری)
 * - فیزیک حرکتی نرم بدون حلقه انیمیشن مزاحم
 * - حذف فیلترهای سنگین SVG Drop-shadow روی المان‌های در حال تغییر
 */
export function VintageJazzCapsule() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isVisibleRef = useRef(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // شعاع و محیط رینگ پیشروی دور دکمه
  const dialRadius = 20;
  const dialCircumference = 2 * Math.PI * dialRadius;

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [dialCircumference, 0]
  );

  // محاسبه زاویه مبنای عقربه بر اساس اسکرول (از ۰ درجه در بالا تا ۱۸۰ درجه در انتهای صفحه)
  const baseRotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // فیزیک فنری و ارتعاش ملایم عقربه
  const smoothNeedleRotation = useSpring(baseRotation, {
    stiffness: 120,
    damping: 14,
    mass: 0.5,
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const scrolledPastTop = latest > 0.012;

      if (scrolledPastTop) {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }

        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = setTimeout(() => {
          isVisibleRef.current = false;
          setIsVisible(false);
        }, 1300);
      } else {
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
      }
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeGold = "#FFF083";
  const warmGold = "#FFD700";
  const needleSilverLight = "#F1F5F9";
  const needleSilverBorder = "#CBD5E1";
  const darkBrass = "#8C6819";

  const shouldRender = isVisible || isHovered;

  return (
    <div className="fixed bottom-4 left-3 sm:bottom-6 sm:left-4 lg:bottom-10 lg:left-8 rtl:left-auto rtl:right-3 rtl:sm:right-4 rtl:lg:right-8 z-[60] pointer-events-none will-change-transform">
      <AnimatePresence mode="wait">
        {shouldRender && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative pointer-events-auto flex items-center justify-center origin-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={scrollToTop}
              className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/90 border border-white/10 hover:border-brand-yellow/50 transition-colors duration-300 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.6)] overflow-hidden shrink-0 p-0"
              aria-label="Scroll to top"
            >
              {/* هاله نور پس‌زمینه */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,240,131,0.18) 0%, transparent 70%)',
                }}
              />

              {/* رینگ دور درصد پیشروی اسکرول (Progress Ring) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r={dialRadius}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2.2"
                  fill="none"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={dialRadius}
                  stroke={activeGold}
                  strokeWidth="2.2"
                  fill="none"
                  strokeDasharray={dialCircumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                />
              </svg>

              {/* صحنه وکتور قطب‌نمای اسطرلابی با عقربه شناور */}
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 44 44" className="w-[1.8rem] h-[1.8rem] lg:w-[2.25rem] lg:h-[2.25rem] overflow-visible" fill="none">
                  {/* رینگ نقطه‌چین درجات زاویه‌ای اسطرلاب */}
                  <circle
                    cx="22"
                    cy="22"
                    r="15.5"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="0.8"
                    strokeDasharray="2 3.5"
                  />

                  {/* نقاط ۴ جهت قطب‌نما در حالت عادی */}
                  <circle cx="36.5" cy="22" r="0.7" fill="rgba(255,255,255,0.4)" />
                  <circle cx="22" cy="36.5" r="0.9" fill={darkBrass} opacity="0.85" />
                  <circle cx="7.5" cy="22" r="0.7" fill="rgba(255,255,255,0.4)" />

                  {/* ستاره قطبی راهنما در موقعیت شمال (سرآغاز صفحه) */}
                  <g className="transition-transform duration-300 group-hover:scale-125" style={{ transformOrigin: "22px 7.5px" }}>
                    {/* هاله ستاره در هاور */}
                    <circle
                      cx="22"
                      cy="7.5"
                      r="3"
                      fill={activeGold}
                      className="opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                    />

                    {/* پرتوهای چهارپر ستاره قطبی در هاور (Celestial 4-Point Star) */}
                    <path
                      d="M 22 4.5 L 22.8 6.7 L 25 7.5 L 22.8 8.3 L 22 10.5 L 21.2 8.3 L 19 7.5 L 21.2 6.7 Z"
                      fill={activeGold}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* نقطه مرکزی ستاره قطبی (همیشه درخشان) */}
                    <circle
                      cx="22"
                      cy="7.5"
                      r="1"
                      fill={activeGold}
                    />
                  </g>

                  {/* عقربه دوطرفه قطب‌نما با حرکت روان مبتنی بر فنر فیزیکی */}
                  <motion.g
                    style={{
                      rotate: smoothNeedleRotation,
                      transformOrigin: "22px 22px",
                    }}
                  >
                    {/* ۱. نیمه بالایی طلایی درخشان (پیکان شمال) */}
                    <path
                      d="M 22 10.5 L 23.8 20 L 22 22 L 20.2 20 Z"
                      fill={activeGold}
                      stroke={warmGold}
                      strokeWidth="0.6"
                      strokeLinejoin="round"
                    />

                    {/* خط برجستگی سایه روشن وسط نیمه طلایی */}
                    <line x1="22" y1="11" x2="22" y2="22" stroke="#FFF" strokeWidth="0.5" opacity="0.7" />

                    {/* ۲. نیمه پایینی نقره‌ای/پلاتینیومی بسیار روشن و واضح (پیکان جنوب) */}
                    <path
                      d="M 22 33.5 L 23.8 24 L 22 22 L 20.2 24 Z"
                      fill={needleSilverLight}
                      stroke={needleSilverBorder}
                      strokeWidth="0.6"
                      strokeLinejoin="round"
                    />

                    {/* خط برجستگی وسط نیمه روشن نقره‌ای */}
                    <line x1="22" y1="33" x2="22" y2="22" stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
                  </motion.g>

                  {/* محور و مهره پیوت برنجی در مرکز عقربه با پین طلایی */}
                  <circle cx="22" cy="22" r="3" fill="#141414" stroke={warmGold} strokeWidth="1" />
                  <circle cx="22" cy="22" r="1.4" fill={activeGold} />
                  <circle cx="22" cy="22" r="0.6" fill="#0A0A0A" />
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
