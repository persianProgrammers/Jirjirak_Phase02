import { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArchitecturalClouds } from '../components/ArchitecturalClouds';
import { StudioTitleRenderer } from '../components/StudioTitleSystem';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isMapLocked, setIsMapLocked] = useState(true);
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
                <span className={isNight ? "text-brand-yellow" : "text-[#b3a85c]"}>
                  دیده‌شدن هستند.
                </span>
              </>
            ) : (
              <>
                <span>Ideas Deserve</span>
                <br />
                <span className={isNight ? "text-brand-yellow" : "text-[#b3a85c]"}>
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
                document.getElementById('hero-image-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative inline-flex items-center justify-center px-8 sm:px-9 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                isNight 
                  ? 'bg-brand-yellow text-brand-dark hover:bg-yellow-300 shadow-[0_0_25px_rgba(255,240,131,0.25)]' 
                  : 'bg-[#222] text-[#fff083] hover:bg-black shadow-md'
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
        <div id="hero-image-section" className="relative w-full flex flex-col items-center justify-center py-10 lg:py-20">
          <div id="mobile-map-section" className="relative w-full flex flex-col items-center justify-center">
          
          {/* Desktop Image with Seamless Architectural Daylight / Night Blend */}
          <div className="hidden lg:flex relative w-full items-center justify-center max-w-5xl mx-auto px-4">
            <div className="relative w-full flex items-center justify-center">
              
              {/* Subtle Architectural Backlight Bloom (Night Mode Only) */}
              <div className={`absolute -inset-16 pointer-events-none rounded-full blur-[110px] transition-all duration-1000 ${
                isNight ? 'bg-indigo-950/20 opacity-100' : 'opacity-0'
              }`} />

              {/* Day Building Image Layer */}
              <img 
                src="/assets/images/ui/hero-building-day.png" 
                alt="Jirjirak Isometric Studio (Day)" 
                className={`w-auto h-auto max-h-[85vh] object-contain origin-center relative z-10 select-none transition-all duration-700 ease-in-out ${
                  !isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${
                  isDayImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                }`} 
              />

              {/* Night Building Image Layer (Mathematically aligned) */}
              <img 
                src="/assets/images/ui/hero-building-night.png" 
                alt="Jirjirak Isometric Studio (Night)" 
                className={`w-auto h-auto max-h-[85vh] object-contain origin-center absolute inset-0 m-auto z-10 select-none transition-all duration-700 ease-in-out ${
                  isNight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${
                  isNightImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                }`} 
              />
            </div>
          </div>

          {/* Mobile Image (Interactive Zoom/Pan Edge-to-Edge) */}
          <div className="lg:hidden relative w-[calc(100%+4rem)] -mx-8 sm:w-[calc(100%+6rem)] sm:-mx-12 flex flex-col items-center justify-center flex-1 h-full">
            
            {/* Animated Section Divider */}
            <div className="w-full relative py-6 flex items-center justify-center shrink-0">
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"></div>
              <div className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/60 to-transparent animate-pulse blur-[1px]"></div>
              <div className="w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_15px_4px_rgba(255,240,131,0.6)] animate-ping"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            </div>

            {/* Edge-to-edge map container with Gamer HUD Frame */}
            <div className="w-full flex-1 min-h-[50vh] relative group overflow-hidden">
              
              {/* Sci-Fi HUD Borders & Decorations (Pointer-events-none) */}
              <div className="absolute inset-x-4 inset-y-4 sm:inset-x-8 sm:inset-y-6 z-20 pointer-events-none">
                {/* Dynamic Corner Brackets */}
                <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:-translate-x-1 group-hover:-translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:-translate-x-1 group-hover:translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:translate-x-1 group-hover:translate-y-1 ${
                  isNight ? 'border-brand-yellow/60 shadow-[0_0_10px_rgba(255,240,131,0.2)]' : 'border-brand-dark/40'
                }`}></div>
                
                {/* HUD Data Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-0.5 opacity-80">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm backdrop-blur-md border ${
                    isNight ? 'bg-brand-dark/60 border-brand-yellow/20' : 'bg-brand-light/75 border-brand-dark/15'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${
                      isNight ? 'text-brand-yellow' : 'text-brand-dark'
                    }`}>
                      {t.hero.mapFeed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sci-Fi Screen Effects Overlay (Subtle Depth & Dynamics) */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <style>{`
                  @keyframes slowRadarPulse {
                    0% { box-shadow: inset 0 0 40px rgba(0,0,0,0.8), inset 0 0 0px rgba(255, 240, 131, 0); }
                    50% { box-shadow: inset 0 0 60px rgba(0,0,0,0.9), inset 0 0 15px rgba(255, 240, 131, 0.05); }
                    100% { box-shadow: inset 0 0 40px rgba(0,0,0,0.8), inset 0 0 0px rgba(255, 240, 131, 0); }
                  }
                  @keyframes subtleDrift {
                    0% { transform: translateY(-5%) scale(1.05); opacity: 0.1; }
                    50% { transform: translateY(5%) scale(1); opacity: 0.2; }
                    100% { transform: translateY(-5%) scale(1.05); opacity: 0.1; }
                  }
                `}</style>
                
                {/* Dynamic Vignette (Active only at night to keep daylight clean) */}
                {isNight && (
                  <div className="absolute inset-0 z-10 pointer-events-none" style={{ animation: 'slowRadarPulse 8s ease-in-out infinite' }}></div>
                )}
                
                {/* Subtle ambient dust floating over the map */}
                <div className={`absolute inset-0 z-10 mix-blend-screen transition-opacity duration-700 ${
                  isNight ? 'bg-[radial-gradient(ellipse_at_center,rgba(255,240,131,0.15)_0%,transparent_70%)]' : 'bg-[radial-gradient(ellipse_at_center,rgba(254,240,138,0.1)_0%,transparent_70%)]'
                }`} style={{ animation: 'subtleDrift 15s ease-in-out infinite' }}></div>
              </div>

              {/* Interactive Map Area */}
              <div className="w-full h-full bg-transparent relative">
                <TransformWrapper 
                  initialScale={1} 
                  minScale={1} 
                  maxScale={4} 
                  centerOnInit={true}
                  wheel={{ disabled: true }}
                  doubleClick={{ disabled: false }}
                  panning={{ disabled: isMapLocked }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className={`w-full h-full transition-all duration-300 ${isMapLocked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}>
                        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                          <div className="relative w-[90%] sm:w-[85%] mx-auto h-full flex items-center justify-center">
                            {/* Day Building Image Layer */}
                            <img 
                              src="/assets/images/ui/hero-building-day.png" 
                              alt="Jirjirak Isometric Studio (Day)" 
                              className={`w-full h-full object-contain pointer-events-none select-none transition-all duration-700 ease-in-out ${
                                isMapLocked ? 'brightness-90' : 'brightness-100'
                              } ${
                                !isNight ? 'relative z-10 opacity-100' : 'opacity-0 absolute inset-0'
                              } ${
                                isDayImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                              }`} 
                            />

                            {/* Night Building Image Layer */}
                            <img 
                              src="/assets/images/ui/hero-building-night.png" 
                              alt="Jirjirak Isometric Studio (Night)" 
                              className={`w-full h-full object-contain pointer-events-none select-none transition-all duration-700 ease-in-out ${
                                isMapLocked ? 'brightness-75' : 'brightness-100'
                              } ${
                                isNight ? 'relative z-10 opacity-100' : 'opacity-0 absolute inset-0'
                              } ${
                                isNightImageLoaded ? 'blur-0 scale-100' : 'blur-xl scale-[1.02]'
                              }`} 
                            />
                          </div>
                        </TransformComponent>
                      </div>

                      {/* Locked State Overlay */}
                      {isMapLocked && (
                        <div 
                           className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer"
                          onClick={() => setIsMapLocked(false)}
                        >
                          <div className={`border px-6 py-3 rounded-full flex items-center gap-3 animate-pulse shadow-lg ${
                            isNight ? 'bg-brand-dark/85 border-brand-yellow/30 text-white' : 'bg-brand-light/90 border-brand-dark/20 text-brand-dark'
                          }`}>
                            <svg className={`w-5 h-5 ${isNight ? 'text-brand-yellow' : 'text-brand-dark'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                            <span className="font-bold text-sm tracking-widest uppercase">{t.hero.tapToExplore}</span>
                          </div>
                        </div>
                      )}

                      {/* Sci-Fi Floating Map Controls */}
                      <div className={`absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 flex flex-col gap-3 z-30 pointer-events-auto transition-opacity duration-300 ${isMapLocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <button 
                          onClick={() => zoomIn()} 
                          className={`group relative w-10 h-10 backdrop-blur-md border flex items-center justify-center rounded-[4px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${
                            isNight 
                              ? 'bg-brand-dark/90 border-brand-yellow/30 text-white hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-dark' 
                              : 'bg-brand-light/90 border-[#b3a85c]/30 text-brand-dark hover:bg-[#b3a85c] hover:text-brand-dark hover:border-[#b3a85c]'
                          }`} 
                          aria-label={t.hero.zoomIn}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => zoomOut()} 
                          className={`group relative w-10 h-10 backdrop-blur-md border flex items-center justify-center rounded-[4px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${
                            isNight 
                              ? 'bg-brand-dark/90 border-brand-yellow/30 text-white hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-dark' 
                              : 'bg-brand-light/90 border-[#b3a85c]/30 text-brand-dark hover:bg-[#b3a85c] hover:text-brand-dark hover:border-[#b3a85c]'
                          }`} 
                          aria-label={t.hero.zoomOut}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <div className={`w-6 h-[1px] mx-auto my-1 ${isNight ? 'bg-brand-yellow/20' : 'bg-[#b3a85c]/20'}`}></div>
                        
                        <button 
                          onClick={() => { resetTransform(); setIsMapLocked(true); }} 
                          className={`group relative w-10 h-10 backdrop-blur-md border flex items-center justify-center rounded-[4px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${
                            isNight 
                              ? 'bg-brand-dark/90 border-brand-yellow/30 text-brand-yellow hover:bg-red-500 hover:border-red-500 hover:text-white' 
                              : 'bg-brand-light/90 border-brand-dark/25 text-[#b3a85c] hover:bg-red-500 hover:border-red-500 hover:text-white'
                          }`} 
                          aria-label={t.hero.lockMap}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </TransformWrapper>
              </div>
            </div>
            
            {/* Mobile Context Info (Moved below map, non-overlapping) */}
            <div className="w-full px-8 sm:px-12 mt-4 flex justify-center shrink-0">
              <div className={`border rounded-2xl p-4 w-full flex flex-col items-center text-center gap-1.5 transition-colors duration-700 ${
                isNight ? 'bg-brand-dark/60 border-white/5' : 'bg-brand-light/90 border-brand-dark/10 shadow-sm'
              }`}>
                <div className={`flex items-center justify-center gap-2 mb-0.5 transition-colors duration-700 ${
                  isNight ? 'text-brand-yellow' : 'text-[#b3a85c] font-bold'
                }`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span className="font-bold text-[10px] tracking-wider uppercase">{t.hero.interactiveMap}</span>
                </div>
                <p className={`text-[10px] leading-relaxed transition-colors duration-700 ${
                  isNight ? 'text-brand-gray' : 'text-brand-dark/70'
                }`}>
                  {t.hero.mapTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
