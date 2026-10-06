/**
 * گزینه ۳ نشانگر موقعیت اسکرول: ساعت شنی جادویی جیرجیرک (The Celestial Sandglass Chronometer)
 * ذخیره شده به عنوان نسخه پشتیبان گزینه ۳
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

export function Option3HourglassScroll() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dialRadius = 21;
  const dialCircumference = 2 * Math.PI * dialRadius;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [dialCircumference, 0]
  );

  const topSandScale = useTransform(scrollYProgress, [0, 1], [1, 0.05]);
  const bottomSandScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

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
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,240,131,0.22) 0%, transparent 70%)',
                }}
              />

              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r={dialRadius}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={dialRadius}
                  stroke={activeGold}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={dialCircumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_6px_rgba(255,240,131,0.7)]"
                />
              </svg>

              <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-1">
                <svg viewBox="0 0 48 48" className="w-[1.95rem] h-[1.95rem] lg:w-[2.45rem] lg:h-[2.45rem] drop-shadow-md overflow-visible" fill="none">
                  <line x1="14" y1="10" x2="34" y2="10" stroke={warmGold} strokeWidth="1.6" strokeLinecap="round" />
                  <rect x="16" y="8.5" width="16" height="2" rx="0.8" fill="#181818" stroke={brassShadow} strokeWidth="0.6" />

                  <line x1="14" y1="38" x2="34" y2="38" stroke={warmGold} strokeWidth="1.6" strokeLinecap="round" />
                  <rect x="16" y="37.5" width="16" height="2" rx="0.8" fill="#181818" stroke={brassShadow} strokeWidth="0.6" />

                  <line x1="16" y1="10.5" x2="16" y2="37.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />
                  <line x1="32" y1="10.5" x2="32" y2="37.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" />

                  <path
                    d="M 18 12 C 18 20 22 23 24 24 C 22 25 18 28 18 36 C 18 37 30 37 30 36 C 30 28 26 25 24 24 C 26 23 30 20 30 12 Z"
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                  />

                  <g style={{ transformOrigin: '24px 23px' }}>
                    <motion.path
                      d="M 19 14 C 19 18 22 22 24 23 C 26 22 29 18 29 14 Z"
                      fill={activeGold}
                      style={{ scaleY: topSandScale }}
                      opacity="0.85"
                    />
                  </g>

                  <line
                    x1="24"
                    y1="23"
                    x2="24"
                    y2="32"
                    stroke={activeGold}
                    strokeWidth="0.8"
                    strokeDasharray="2 1.5"
                    opacity="0.9"
                  />

                  <g style={{ transformOrigin: '24px 36px' }}>
                    <motion.path
                      d="M 19 36 C 20 32 23 29 24 29 C 25 29 28 32 29 36 Z"
                      fill={activeGold}
                      style={{ scaleY: bottomSandScale }}
                      opacity="0.9"
                    />
                  </g>

                  <motion.g
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <circle cx="24" cy="24" r="12" fill="#0A0A0A" fillOpacity="0.8" />
                    <path
                      d="M 24 28 L 24 20 M 24 20 L 20 23.5 M 24 20 L 28 23.5"
                      stroke={activeGold}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.g>
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
