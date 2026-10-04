import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [percent, setPercent] = useState('00');

  // Engineering precision physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setIsVisible(latest > 0.02);
      setPercent(Math.min(99, Math.floor(latest * 100)).toString().padStart(2, '0'));
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate the physical position for the indicator dot
  const topPosition = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 h-[20vh] sm:h-[30vh] min-h-[100px] sm:min-h-[150px] lg:min-h-[250px] flex justify-end items-center pointer-events-none group"
    >
      {/* 
        JIRJIRAK COORDINATE AXIS
      */}

      {/* Interactive hit area */}
      <button 
        onClick={scrollToTop}
        className="absolute inset-y-0 -left-12 right-[-1rem] cursor-pointer pointer-events-auto"
        aria-label="Scroll to top"
      />

      {/* 
        Structural Axis Track
        Universal Contrast Rule: Dark core (#222222) + Light border (white/30). 
        This guarantees visibility on pure white AND pure black backgrounds.
      */}
      <div className="relative w-[2px] sm:w-[4px] h-full bg-[#222222] border border-white/20 sm:border-white/30 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)] group-hover:border-brand-yellow/50 transition-colors duration-300" />

      {/* Moving Coordinate Assembly (Node + Connector + Data) */}
      <motion.div 
        className="absolute right-0 flex items-center justify-end pointer-events-none"
        style={{ top: topPosition, y: '-50%' }}
      >
        {/* Data Box (Hidden on mobile, only visible on sm and up) */}
        <div className="hidden sm:flex items-center justify-center min-w-[32px] h-[22px] px-1.5 bg-[#222222] border border-white/30 group-hover:border-brand-yellow/50 rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.8)] overflow-hidden relative transition-colors duration-300">
          {/* Default state */}
          <span className="font-mono text-[10px] tracking-widest text-brand-yellow/90 group-hover:-translate-y-[150%] group-hover:opacity-0 absolute transition-all duration-300">
            {percent}
          </span>
          {/* Hover state action (Moved further down to prevent subpixel bleeding) */}
          <span className="font-mono text-[9px] tracking-widest text-brand-yellow font-bold group-hover:translate-y-0 translate-y-[150%] opacity-0 group-hover:opacity-100 absolute transition-all duration-300 uppercase">
            Top
          </span>
        </div>

        {/* Precision Connector Line (Hidden on mobile) */}
        <div className="hidden sm:block w-3 h-[3px] bg-brand-yellow border-y border-[#222222] group-hover:w-5 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10" />

        {/* The Node (Smaller on mobile, full size on desktop) */}
        <div className="w-[4px] h-4 sm:w-[6px] sm:h-6 bg-brand-yellow border border-[#222222] shadow-[0_0_8px_rgba(255,240,131,0.8),0_2px_4px_rgba(0,0,0,0.8)] sm:shadow-[0_0_12px_rgba(255,240,131,1),0_2px_4px_rgba(0,0,0,0.8)] rounded-full group-hover:h-6 sm:group-hover:h-8 transition-all duration-300 z-20 translate-x-[1px] sm:translate-x-[1px]" />
      </motion.div>
    </motion.div>
  );
}
