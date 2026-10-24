import { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArchitecturalClouds } from '../components/ArchitecturalClouds';
import { StudioTitleRenderer } from '../components/StudioTitleSystem';
import { HeroDepartmentShowcase } from '../components/HeroDepartmentShowcase';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const lenis = useLenis();
  const { isNight, currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  // Night Mode: Fireflies (Optimized count for 120fps smooth scrolling)
  const firefliesCount = 18;
  const fireflies = useMemo(() => Array.from({ length: firefliesCount }), []);
  const firefliesRef = useRef<(HTMLDivElement | null)[]>([]);

  /* =========================================================================
     [RESERVED FOR FUTURE SEASONAL FEATURE]
     برگ‌های پاییزی، افرا و جینکو برای ویژگی تم فصول در آینده ذخیره شده‌اند:
     ========================================================================= */

  const [isDayImageLoaded, setIsDayImageLoaded] = useState(false);
  const [isNightImageLoaded, setIsNightImageLoaded] = useState(false);

  // Single-line Concise Services Rotator (9 distinct disciplines with semantic color-topic harmony)
  const servicesList = useMemo(() => {
    return currentLang === 'FA' ? [
      {
        text: 'طراحی وب',
        nightGradient: 'from-cyan-300 via-sky-200 to-teal-100',
        dayColor: 'text-cyan-800',
        glow: 'rgba(6, 182, 212, 0.28)',
      },
      {
        text: 'طراحی UI/UX',
        nightGradient: 'from-violet-300 via-purple-200 to-indigo-300',
        dayColor: 'text-violet-800',
        glow: 'rgba(168, 85, 247, 0.28)',
      },
      {
        text: 'سئو و تحلیل داده',
        nightGradient: 'from-emerald-300 via-teal-200 to-green-300',
        dayColor: 'text-emerald-800',
        glow: 'rgba(16, 185, 129, 0.28)',
      },
      {
        text: 'دیجیتال مارکتینگ و رشد',
        nightGradient: 'from-orange-300 via-amber-200 to-rose-400',
        dayColor: 'text-orange-800',
        glow: 'rgba(249, 115, 22, 0.28)',
      },
      {
        text: 'تولید محتوا',
        nightGradient: 'from-amber-200 via-orange-100 to-yellow-100',
        dayColor: 'text-amber-800',
        glow: 'rgba(245, 158, 11, 0.28)',
      },
      {
        text: 'برندینگ و هویت بصری',
        nightGradient: 'from-rose-400 via-fuchsia-300 to-pink-300',
        dayColor: 'text-rose-800',
        glow: 'rgba(236, 72, 153, 0.28)',
      },
      {
        text: 'طراحی گرافیک',
        nightGradient: 'from-blue-400 via-indigo-300 to-sky-300',
        dayColor: 'text-blue-800',
        glow: 'rgba(59, 130, 246, 0.28)',
      },
      {
        text: 'بازی‌سازی دیجیتال',
        nightGradient: 'from-lime-300 via-emerald-300 to-teal-300',
        dayColor: 'text-lime-800',
        glow: 'rgba(132, 204, 22, 0.28)',
      },
      {
        text: 'آکادمی و هاب آموزش',
        nightGradient: 'from-sky-200 via-indigo-100 to-slate-100',
        dayColor: 'text-indigo-900',
        glow: 'rgba(147, 197, 253, 0.3)',
      },
    ] : [
      {
        text: 'Web Design',
        nightGradient: 'from-cyan-300 via-sky-200 to-teal-100',
        dayColor: 'text-cyan-800',
        glow: 'rgba(6, 182, 212, 0.28)',
      },
      {
        text: 'UI/UX',
        nightGradient: 'from-violet-300 via-purple-200 to-indigo-300',
        dayColor: 'text-violet-800',
        glow: 'rgba(168, 85, 247, 0.28)',
      },
      {
        text: 'SEO & Analytics',
        nightGradient: 'from-emerald-300 via-teal-200 to-green-300',
        dayColor: 'text-emerald-800',
        glow: 'rgba(16, 185, 129, 0.28)',
      },
      {
        text: 'Digital Marketing & Growth',
        nightGradient: 'from-orange-300 via-amber-200 to-rose-400',
        dayColor: 'text-orange-800',
        glow: 'rgba(249, 115, 22, 0.28)',
      },
      {
        text: 'Content Creation',
        nightGradient: 'from-amber-200 via-orange-100 to-yellow-100',
        dayColor: 'text-amber-800',
        glow: 'rgba(245, 158, 11, 0.28)',
      },
      {
        text: 'Branding & Visual Identity',
        nightGradient: 'from-rose-400 via-fuchsia-300 to-pink-300',
        dayColor: 'text-rose-800',
        glow: 'rgba(236, 72, 153, 0.28)',
      },
      {
        text: 'Graphic Design',
        nightGradient: 'from-blue-400 via-indigo-300 to-sky-300',
        dayColor: 'text-blue-800',
        glow: 'rgba(59, 130, 246, 0.28)',
      },
      {
        text: 'Game Development',
        nightGradient: 'from-lime-300 via-emerald-300 to-teal-300',
        dayColor: 'text-lime-800',
        glow: 'rgba(132, 204, 22, 0.28)',
      },
      {
        text: 'Academy & Learning Hub',
        nightGradient: 'from-sky-200 via-indigo-100 to-slate-100',
        dayColor: 'text-indigo-900',
        glow: 'rgba(147, 197, 253, 0.3)',
      },
    ];
  }, [currentLang]);

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isServiceVisible, setIsServiceVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsServiceVisible(false);
      setTimeout(() => {
        setActiveServiceIndex((prev) => (prev + 1) % servicesList.length);
        setIsServiceVisible(true);
      }, 250);
    }, 2200);
    return () => clearInterval(interval);
  }, [servicesList.length]);

  useEffect(() => {
    const dayImg = new Image();
    dayImg.src = '/assets/images/ui/hero-building-day.png';
    if (dayImg.complete && dayImg.naturalWidth > 0) {
      setIsDayImageLoaded(true);
    } else {
      dayImg.onload = () => setIsDayImageLoaded(true);
      dayImg.onerror = () => setIsDayImageLoaded(true);
    }

    const nightImg = new Image();
    nightImg.src = '/assets/images/ui/hero-building-night.png';
    if (nightImg.complete && nightImg.naturalWidth > 0) {
      setIsNightImageLoaded(true);
    } else {
      nightImg.onload = () => setIsNightImageLoaded(true);
      nightImg.onerror = () => setIsNightImageLoaded(true);
    }
  }, []);

  // Initial text entrance
  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Mode-dependent ambient particle animation (paused when offscreen to save 100% GPU/CPU during scroll)
  useEffect(() => {
    let isVisible = true;
    const activeTweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      if (isNight) {
        // Night: Fireflies wandering in the darkness
        firefliesRef.current.forEach((fly) => {
          if (!fly) return;
          gsap.set(fly, {
            x: () => gsap.utils.random(0, window.innerWidth),
            y: () => gsap.utils.random(0, window.innerHeight),
            scale: () => gsap.utils.random(0.3, 1.2),
            opacity: () => gsap.utils.random(0.15, 0.6)
          });

          const animateFly = () => {
            if (!isVisible) return;
            const tw = gsap.to(fly, {
              x: `+=${gsap.utils.random(-100, 100)}`,
              y: `+=${gsap.utils.random(-100, 100)}`,
              opacity: () => gsap.utils.random(0.15, 0.85),
              duration: () => gsap.utils.random(6, 12),
              ease: "sine.inOut",
              onComplete: animateFly
            });
            activeTweens.push(tw);
          };
          animateFly();
        });
      }
    }, containerRef);

    // Observer: Pause when hero is out of view (e.g. user scrolled down)
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
  }, [isNight]);

  return (
    <section 
      id="hero"
      ref={containerRef} 
      className={`relative px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* Abstract Background Ambient Glow (Night Mode Only - 0ms blur raster cost) */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        isNight ? 'opacity-15' : 'opacity-0'
      }`}>
        <div 
          className="absolute top-1/4 -right-1/4 w-[650px] h-[650px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,131,0.22) 0%, rgba(255,240,131,0.04) 45%, transparent 70%)'
          }}
        />
      </div>

      {/* Fireflies Background (Night Mode ONLY - completely unmounted in Day) */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {fireflies.map((_, i) => (
            <div
              key={`firefly-${i}`}
              ref={(el) => { firefliesRef.current[i] = el; }}
              className="absolute top-0 left-0 w-1.5 h-1.5 bg-brand-yellow rounded-full shadow-[0_0_8px_rgba(255,240,131,0.7)] will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            ></div>
          ))}
        </div>
      )}

      {/* Day Mode: Architectural Contour Clouds (کانتور معمارانه بهینه برای موبایل و دسکتاپ) */}
      {!isNight && <ArchitecturalClouds />}

      <div className="max-w-[1600px] mx-auto w-full flex flex-col items-center relative z-10">
        {/* Text Section (Full 100vh Viewport Optically Balanced) */}
        <div 
          ref={textRef} 
          className="relative flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full min-h-[100dvh] h-[100dvh] px-6 pt-24 sm:pt-28 pb-16 sm:pb-20"
        >
          {/* Studio Name - Final Choice: Outline vs Solid Duo */}
          <StudioTitleRenderer
            styleId="outline-fill-duo"
            isNight={isNight}
            currentLang={currentLang}
          />
          
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-[1.06] sm:leading-[1.02] tracking-tight mb-7 sm:mb-8 text-center transition-colors duration-700 ${
            isNight ? 'text-brand-light' : 'text-brand-dark'
          }`}>
            {currentLang === 'FA' ? (
              <>
                <span>ایده‌ها سزاوار</span>
                <br />
                <span className={isNight ? "text-[#fff083]" : "text-[#8f6b00]"}>
                  دیده‌شدن هستند.
                </span>
              </>
            ) : (
              <>
                <span>Ideas Deserve</span>
                <br />
                <span className={isNight ? "text-[#fff083]" : "text-[#8f6b00]"}>
                  to Be Seen.
                </span>
              </>
            )}
          </h1>

          {/* Single-line Animated Service Rotator */}
          <div className="relative h-11 sm:h-14 flex items-center justify-center overflow-visible max-w-xl mx-auto mb-10 sm:mb-12 select-none">
            {/* Subtle gentle ambient aura */}
            <div 
              className="absolute -inset-x-8 -inset-y-3 rounded-full blur-2xl pointer-events-none transition-all duration-700 opacity-70"
              style={{
                background: isNight ? servicesList[activeServiceIndex].glow : 'transparent',
              }}
            />

            <div
              className={`relative z-10 transition-all duration-300 ease-out transform ${
                isServiceVisible
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 -translate-y-2 blur-[1px]'
              }`}
            >
              <span className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider uppercase transition-all duration-500 ${
                isNight 
                  ? `bg-gradient-to-r ${servicesList[activeServiceIndex].nightGradient} bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]` 
                  : `${servicesList[activeServiceIndex].dayColor}`
              }`}>
                {servicesList[activeServiceIndex].text}
              </span>
            </div>
          </div>
          
          {/* Dual Action CTAs: Explore Jirjirak & Start a Project */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Button 1: Explore Jirjirak */}
            <button 
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo('#hero-image-section', { offset: -30, duration: 1.2 });
                } else {
                  document.getElementById('hero-image-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`relative inline-flex items-center justify-center px-8 sm:px-9 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                isNight 
                  ? 'bg-brand-yellow text-brand-dark hover:bg-yellow-300 shadow-[0_0_25px_rgba(255,240,131,0.25)]' 
                  : 'bg-[#8f6b00] text-white hover:bg-[#755700] shadow-md'
              }`}
            >
              <span>{t.hero.exploreJirjirak || (currentLang === 'FA' ? 'کاوش در جیرجیرک' : 'Explore Jirjirak')}</span>
            </button>

            {/* Button 2: Start a Project */}
            <button 
              onClick={() => navigate('/contact')} 
              className={`relative inline-flex items-center justify-center px-8 sm:px-9 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-md border hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                isNight 
                  ? 'bg-white/5 border-white/20 text-white/90 hover:bg-white/10 hover:border-brand-yellow/60 shadow-sm' 
                  : 'bg-black/5 border-neutral-300 text-neutral-900 hover:bg-black/10 hover:border-neutral-500 shadow-sm'
              }`}
            >
              <span>{t.hero.startProject || (currentLang === 'FA' ? 'شروع یک پروژه' : 'Start a Project')}</span>
            </button>
          </div>
        </div>

        {/* Image Section (Located directly BELOW the 100vh text section) */}
        <div id="hero-image-section" className="relative w-full flex flex-col items-center justify-center py-6 lg:py-16">
          <HeroDepartmentShowcase
            isNight={isNight}
            isDayImageLoaded={isDayImageLoaded}
            isNightImageLoaded={isNightImageLoaded}
          />
        </div>
      </div>
    </section>
  );
}
