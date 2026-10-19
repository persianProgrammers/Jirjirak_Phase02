/**
 * گزینه ۱ نشانگر موقعیت اسکرول: قطب‌نمای ناوبری و اسطرلاب طلایی (Celestial Navigation Compass & Altimeter)
 * ذخیره شده به عنوان نسخه پشتیبان گزینه ۱
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

export function Option1AstrolabeCompassScroll() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dialRadius = 20;
  const dialCircumference = 2 * Math.PI * dialRadius;

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [dialCircumference, 0]
  );

  const needleRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 180]
  );

  const scrollPercent = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const unsub = scrollPercent.on('change', (v) => setDisplayPercent(v));
    return () => unsub();
  }, [scrollPercent]);

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
  const darkBrass = "#8C6819";

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
                className="absolute inset-0 rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,240,131,0.18) 0%, transparent 70%)',
                }}
              />

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
                  className="drop-shadow-[0_0_6px_rgba(255,240,131,0.7)]"
                />
              </svg>

              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 44 44" className="w-[1.8rem] h-[1.8rem] lg:w-[2.25rem] lg:h-[2.25rem] drop-shadow-md overflow-visible" fill="none">
                  <circle
                    cx="22"
                    cy="22"
                    r="15.5"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="0.8"
                    strokeDasharray="2 3.5"
                  />
                  <circle cx="22" cy="7.5" r="0.9" fill={activeGold} opacity="0.8" />
                  <circle cx="36.5" cy="22" r="0.7" fill="rgba(255,255,255,0.4)" />
                  <circle cx="22" cy="36.5" r="0.9" fill={darkBrass} opacity="0.8" />
                  <circle cx="7.5" cy="22" r="0.7" fill="rgba(255,255,255,0.4)" />

                  <path
                    d="M 22 13.5 L 18 17.5 M 22 13.5 L 26 17.5"
                    stroke={activeGold}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.35"
                    className="group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <motion.g
                    style={{
                      rotate: needleRotation,
                      transformOrigin: "22px 22px",
                    }}
                  >
                    <path
                      d="M 22 10.5 L 23.8 20 L 22 22 L 20.2 20 Z"
                      fill={activeGold}
                      stroke={warmGold}
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 22 33.5 L 23.5 24 L 22 22 L 20.5 24 Z"
                      fill="#222"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="0.5"
                      strokeLinejoin="round"
                    />
                  </motion.g>

                  <circle cx="22" cy="22" r="2.8" fill="#141414" stroke={warmGold} strokeWidth="0.9" />
                  <circle cx="22" cy="22" r="1.3" fill={activeGold} />

                  {displayPercent > 0 && (
                    <text
                      x="22"
                      y="31"
                      fill="rgba(255,255,255,0.7)"
                      fontSize="6"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none font-bold"
                    >
                      {displayPercent}%
                    </text>
                  )}
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
