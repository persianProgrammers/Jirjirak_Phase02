import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * ArchitecturalClouds Component (Contour / Isoline Topographic Clouds)
 * نهایی‌شده بر اساس انتخاب کاربر:
 * - حداکثر ۲ ابر در نمای موبایل (برای جلوگیری از شلوغی و حفظ زیبایی مینیمال)
 * - حداکثر ۴ ابر در نمایشگرهای بزرگ‌تر دسکتاپ و تبلت
 * - فواصل افقی و عمودی مناسب و سرعت متعادل و روان
 * - سبک کانتور معمارانه با خطوط تراز توپوگرافی و تگ ارتفاعی مهندسی
 */
export const ArchitecturalClouds: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Dynamic cloud count: max 2 on mobile (< 768px), max 4 on desktop (>= 768px)
  const [cloudCount, setCloudCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 2 : 4;
    }
    return 4;
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setCloudCount(isMobile ? 2 : 4);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cloudsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let isVisible = true;
    const activeTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Clean positioning and well-spaced initial coordinates
      cloudsRef.current.forEach((cloud, i) => {
        if (!cloud) return;

        // Controlled subtle scale variation
        const scale = isMobile ? (i === 0 ? 0.95 : 0.85) : 0.9 + (i % 3) * 0.12;
        const baseOpacity = 0.55 + (i % 2) * 0.15;

        // Well-spaced layout across screen width & top sky section:
        const totalClouds = cloudCount;
        const screenW = window.innerWidth;
        const segmentW = screenW / totalClouds;

        const initialX = (i * segmentW) - 60 + (i % 2 === 1 ? 40 : -20);
        // Kept exclusively in upper 35% of hero screen (the sky zone above the building)
        const initialY = isMobile 
          ? (i === 0 ? 25 : 82) 
          : 22 + (i * 28) + (i % 2 === 1 ? 15 : 0);

        gsap.set(cloud, {
          x: initialX,
          y: initialY,
          scale,
          opacity: baseOpacity,
        });

        // Disciplined and balanced speed (neither too slow to freeze, nor fast to distract)
        const minDuration = isMobile ? 32 : 36;
        const maxDuration = isMobile ? 48 : 54;

        const drift = () => {
          if (!isVisible) return;
          const deltaX = gsap.utils.random(260, 420);
          const deltaY = gsap.utils.random(-8, 10);
          const duration = gsap.utils.random(minDuration, maxDuration);

          const tw = gsap.to(cloud, {
            x: `+=${deltaX}`,
            y: `+=${deltaY}`,
            duration,
            ease: 'sine.inOut',
            onComplete: () => {
              const curX = gsap.getProperty(cloud, 'x') as number;
              // Reset with ample distance when passing screen right edge
              if (curX > window.innerWidth + 120) {
                const newY = isMobile
                  ? (i === 0 ? gsap.utils.random(20, 40) : gsap.utils.random(75, 95))
                  : gsap.utils.random(20, Math.min(window.innerHeight * 0.35, 130));
                
                // Spawn behind the left edge with spacing
                gsap.set(cloud, {
                  x: -300 - (i * 80),
                  y: newY,
                });
              }
              drift();
            },
          });
          activeTweens.push(tw);
        };

        drift();
      });
    }, containerRef);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          activeTweens.forEach((t) => t.pause());
        } else {
          activeTweens.forEach((t) => t.resume());
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      activeTweens.forEach((t) => t.kill());
      ctx.revert();
    };
  }, [cloudCount]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {Array.from({ length: cloudCount }).map((_, i) => (
        <div
          key={`contour-cloud-${i}`}
          ref={(el) => { cloudsRef.current[i] = el; }}
          className="absolute top-0 left-0 will-change-transform"
        >
          <ContourCloudSvg index={i} />
        </div>
      ))}
    </div>
  );
};

/* =========================================================================
   CONTOUR / TOPOGRAPHIC ISOLINE CLOUD SVG
   خطوط تراز کانتوری با ۳ لایه هم‌پایه، هاشورهای برداری، نشانگر کراس‌هیر و تگ ارتفاع
   ========================================================================= */
interface ContourCloudSvgProps {
  index: number;
}

const ContourCloudSvg: React.FC<ContourCloudSvgProps> = ({ index }) => {
  const isAlt = index % 2 === 1;
  const isLarge = index === 0;

  // Elevation tags matching architectural surveying standards
  const elevationTag = index === 0 ? '+14.2m' : index === 1 ? '+18.6m' : index === 2 ? '+12.0m' : '+16.4m';

  return (
    <svg 
      width={isLarge ? "280" : isAlt ? "230" : "200"} 
      height="54" 
      viewBox="0 0 280 54" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-brand-dark drop-shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
    >
      {/* Outer Contour Level 0 */}
      <path 
        d="M12 36 C12 24, 38 18, 65 20 C82 8, 128 6, 150 16 C175 10, 215 12, 235 24 C255 24, 268 32, 268 42 C268 48, 245 50, 210 49 C160 48, 80 50, 12 44 Z" 
        stroke="currentColor" 
        strokeWidth="1.1" 
        strokeOpacity="0.75" 
      />
      {/* Inner Contour Level +1 */}
      <path 
        d="M32 35 C32 27, 52 23, 72 25 C88 16, 124 14, 142 22 C164 17, 198 18, 214 28 C228 28, 242 34, 242 41 C242 44, 215 45, 185 44 C135 43, 85 45, 32 41 Z" 
        stroke="currentColor" 
        strokeWidth="0.75" 
        strokeDasharray="4 3" 
        strokeOpacity="0.5" 
      />
      {/* Core Contour Level +2 */}
      <path 
        d="M60 32 C60 26, 75 22, 95 24 C108 19, 132 19, 145 25 C162 21, 185 23, 195 31 C200 35, 180 37, 140 37 C100 37, 60 36, 60 32 Z" 
        stroke="currentColor" 
        strokeWidth="0.6" 
        strokeOpacity="0.38" 
      />

      {/* Technical Surveying Crosshairs (+) */}
      <g stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.65">
        <line x1="148" y1="4" x2="152" y2="4" />
        <line x1="150" y1="2" x2="150" y2="6" />
        
        <line x1="266" y1="22" x2="270" y2="22" />
        <line x1="268" y1="20" x2="268" y2="24" />
      </g>

      {/* Tiny subtle brass pinpoint for studio brand accent */}
      <circle cx="150" cy="4" r="1.2" fill="#FFF083" stroke="currentColor" strokeWidth="0.5" />

      {/* Engineering elevation tag */}
      <text 
        x="68" 
        y="13" 
        fontSize="7" 
        fontFamily="monospace" 
        fill="currentColor" 
        fillOpacity="0.6" 
        letterSpacing="0.05em"
      >
        {elevationTag}
      </text>
    </svg>
  );
};
