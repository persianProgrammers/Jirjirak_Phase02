import React, { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArchitecturalClouds } from '../components/ArchitecturalClouds';
import { StudioTitleRenderer } from '../components/StudioTitleSystem';
import { HeroDepartmentShowcase } from '../components/HeroDepartmentShowcase';

// 32 Static GPU-Composited Firefly Positions & Timings - Slow, graceful, elegant night drift (0% CPU)
const FIREFLY_CONFIGS = [
  { left: '10%', top: '16%', anim: 'fireflyFloatA', dur: '22s', delay: '0s', size: 4 },
  { left: '16%', top: '42%', anim: 'fireflyFloatD', dur: '26s', delay: '3.5s', size: 3.5 },
  { left: '24%', top: '22%', anim: 'fireflyFloatB', dur: '24s', delay: '1.2s', size: 5 },
  { left: '29%', top: '65%', anim: 'fireflyFloatC', dur: '28s', delay: '5.1s', size: 4 },
  { left: '36%', top: '35%', anim: 'fireflyFloatA', dur: '21s', delay: '8.4s', size: 3 },
  { left: '42%', top: '14%', anim: 'fireflyFloatD', dur: '25s', delay: '2.0s', size: 4.5 },
  { left: '48%', top: '55%', anim: 'fireflyFloatB', dur: '30s', delay: '6.7s', size: 5 },
  { left: '54%', top: '26%', anim: 'fireflyFloatC', dur: '23s', delay: '4.2s', size: 3.5 },
  { left: '60%', top: '72%', anim: 'fireflyFloatA', dur: '27s', delay: '1.8s', size: 4 },
  { left: '66%', top: '18%', anim: 'fireflyFloatD', dur: '29s', delay: '9.3s', size: 5 },
  { left: '72%', top: '48%', anim: 'fireflyFloatB', dur: '22s', delay: '3.0s', size: 3.5 },
  { left: '79%', top: '30%', anim: 'fireflyFloatC', dur: '26s', delay: '7.5s', size: 4.5 },
  { left: '85%', top: '68%', anim: 'fireflyFloatA', dur: '24s', delay: '0.5s', size: 3 },
  { left: '91%', top: '24%', anim: 'fireflyFloatD', dur: '31s', delay: '4.8s', size: 4 },
  { left: '95%', top: '58%', anim: 'fireflyFloatB', dur: '25s', delay: '8.1s', size: 5 },
  { left: '7%',  top: '78%', anim: 'fireflyFloatC', dur: '28s', delay: '2.4s', size: 3.5 },
  { left: '20%', top: '85%', anim: 'fireflyFloatA', dur: '23s', delay: '6.2s', size: 4.5 },
  { left: '33%', top: '12%', anim: 'fireflyFloatD', dur: '27s', delay: '10.5s', size: 3 },
  { left: '45%', top: '82%', anim: 'fireflyFloatB', dur: '29s', delay: '4.0s', size: 4 },
  { left: '58%', top: '40%', anim: 'fireflyFloatC', dur: '22s', delay: '1.5s', size: 5 },
  { left: '63%', top: '88%', anim: 'fireflyFloatA', dur: '32s', delay: '7.0s', size: 3.5 },
  { left: '75%', top: '12%', anim: 'fireflyFloatD', dur: '24s', delay: '5.8s', size: 4 },
  { left: '82%', top: '82%', anim: 'fireflyFloatB', dur: '26s', delay: '11.0s', size: 3 },
  { left: '88%', top: '42%', anim: 'fireflyFloatC', dur: '28s', delay: '3.2s', size: 4.5 },
  { left: '14%', top: '58%', anim: 'fireflyFloatA', dur: '25s', delay: '9.0s', size: 4 },
  { left: '26%', top: '48%', anim: 'fireflyFloatD', dur: '30s', delay: '2.8s', size: 3.5 },
  { left: '39%', top: '70%', anim: 'fireflyFloatB', dur: '23s', delay: '7.8s', size: 5 },
  { left: '51%', top: '38%', anim: 'fireflyFloatC', dur: '27s', delay: '0.8s', size: 3 },
  { left: '68%', top: '62%', anim: 'fireflyFloatA', dur: '31s', delay: '5.4s', size: 4.5 },
  { left: '80%', top: '46%', anim: 'fireflyFloatD', dur: '24s', delay: '8.7s', size: 3.5 },
  { left: '87%', top: '14%', anim: 'fireflyFloatB', dur: '29s', delay: '1.6s', size: 4 },
  { left: '5%',  top: '32%', anim: 'fireflyFloatC', dur: '26s', delay: '6.0s', size: 4.5 },
];

// Isolated Memoized Rotator: Prevents entire HeroSection from re-rendering every 2.4s
const HeroServiceRotator = React.memo(function HeroServiceRotator({
  isNight,
  currentLang,
}: {
  isNight: boolean;
  currentLang: string;
}) {
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
    }, 2400);
    return () => clearInterval(interval);
  }, [servicesList.length]);

  const currentService = servicesList[activeServiceIndex];

  return (
    <div className="relative h-11 sm:h-14 flex items-center justify-center overflow-visible max-w-xl mx-auto mb-10 sm:mb-12 select-none">
      <div 
        className="absolute -inset-x-8 -inset-y-3 rounded-full pointer-events-none transition-opacity duration-700 opacity-70"
        style={{
          background: isNight
            ? `radial-gradient(ellipse at center, ${currentService.glow} 0%, transparent 70%)`
            : 'transparent',
        }}
      />

      <div
        className={`relative z-10 transition-all duration-300 ease-out transform ${
          isServiceVisible
            ? 'opacity-100 translate-y-0 filter-none'
            : 'opacity-0 -translate-y-2'
        }`}
      >
        <span className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider uppercase transition-colors duration-500 ${
          isNight 
            ? `bg-gradient-to-r ${currentService.nightGradient} bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]` 
            : `${currentService.dayColor}`
        }`}>
          {currentService.text}
        </span>
      </div>
    </div>
  );
});

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const lenis = useLenis();
  const { isNight, currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);

  const [isDayImageLoaded, setIsDayImageLoaded] = useState(false);
  const [isNightImageLoaded, setIsNightImageLoaded] = useState(false);

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

  return (
    <section 
      id="hero"
      ref={containerRef} 
      style={{ contain: 'paint' }}
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

      {/* Fireflies Background (Night Mode ONLY - pure GPU compositor animation, 0% JS CPU) */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {FIREFLY_CONFIGS.map((f, i) => (
            <div
              key={`firefly-${i}`}
              className="absolute rounded-full pointer-events-none will-change-transform"
              style={{
                left: f.left,
                top: f.top,
                width: `${f.size}px`,
                height: `${f.size}px`,
                background: 'radial-gradient(circle, #ffffff 15%, #fff083 60%, rgba(255, 240, 131, 0.4) 100%)',
                boxShadow: f.size >= 4.5
                  ? '0 0 10px 2px rgba(255, 240, 131, 0.75), 0 0 4px rgba(255, 255, 255, 0.9)'
                  : '0 0 6px 1px rgba(255, 240, 131, 0.65)',
                animation: `${f.anim} ${f.dur} ease-in-out ${f.delay} infinite alternate`,
              }}
            />
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

          {/* Single-line Animated Service Rotator (Isolated to avoid re-rendering Hero) */}
          <HeroServiceRotator isNight={isNight} currentLang={currentLang} />
          
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
        <div id="hero-image-section" style={{ contain: 'layout paint' }} className="relative w-full flex flex-col items-center justify-center py-6 lg:py-16">
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
