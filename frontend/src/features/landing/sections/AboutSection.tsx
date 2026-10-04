import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

import { StudioTeamAtelier } from '../components/team-models/StudioTeamAtelier';

interface AboutSectionProps {
  variant?: 'landing' | 'full';
}

export function AboutSection({ variant = 'landing' }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight, landingLayoutMode } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(false);

  const accentTextClass = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const isLanding = variant === 'landing';
  const shouldFlipOrder = isLanding && (landingLayoutMode === 'zigzag' || landingLayoutMode === 'editorial');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className={`py-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        
        {/* Main Grid: Left Column Text & Right Column (Founders Photo on Landing OR Atelier on About page) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Mission & Studio Ethos Text Column */}
          <div className={`${
            shouldFlipOrder 
              ? 'lg:order-last lg:col-span-5 lg:pl-6 rtl:lg:pl-0 rtl:lg:pr-6' 
              : 'lg:order-first lg:col-span-4'
          } flex flex-col items-start lg:sticky lg:top-28 transition-all duration-500`}>
            {/* Step Badge */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-xs font-semibold tracking-widest ${accentTextClass}`}>
                {t.about.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">
                {t.about.badge}
              </span>
            </div>
            
            {/* Content: Title & Description */}
            <div ref={textRef} className="flex flex-col items-start py-2 w-full">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {t.about.titleLine1}<br />{t.about.titleLine2}
              </h2>
              
              <p className={`text-sm leading-relaxed mb-8 ${
                isNight ? 'text-brand-gray' : 'text-neutral-400'
              }`}>
                {t.about.description}
              </p>
              
              {isLanding ? (
                <Link 
                  to="/about" 
                  className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
                    isNight 
                      ? 'text-[#b3a85c] border-[#b3a85c] hover:text-brand-dark hover:border-brand-dark' 
                      : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
                  }`}
                >
                  {t.about.meetTeam}
                  <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ) : (
                <Link 
                  to="/contact" 
                  className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
                    isNight 
                      ? 'text-[#b3a85c] border-[#b3a85c] hover:text-brand-dark hover:border-brand-dark' 
                      : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
                  }`}
                >
                  {isFa ? 'شروع همکاری با تیم' : 'Collaborate With Us'}
                  <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Media Column: Founders Photo on Landing OR Full Studio Atelier on About page */}
          <div className={`${
            shouldFlipOrder 
              ? 'lg:order-first lg:col-span-7' 
              : 'lg:order-last lg:col-span-8'
          } w-full transition-all duration-500`}>
            {isLanding ? (
              <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group transition-all duration-700 bg-neutral-900 aspect-[16/10] sm:aspect-[16/10]">
                {/* 1. Low-res blurred instant placeholder */}
                <img
                  src="/assets/images/team/founders-thumb.webp"
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover object-center filter blur-md transition-opacity duration-700 ${
                    isPhotoLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* 2. Full-res Crisp Founders Image */}
                <img
                  src="/assets/images/team/founders-opt.webp"
                  alt="Jirjirak Studio Founders"
                  onLoad={() => setIsPhotoLoaded(true)}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.endsWith('.png')) {
                      target.src = '/assets/images/team/founders.png';
                    }
                  }}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.02] ${
                    isPhotoLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                  }`}
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Co-Founders Badge */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 rtl:left-auto rtl:right-4 sm:rtl:right-6 z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-md bg-black/60 border border-white/15 text-white shadow-lg">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse" />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-brand-yellow">
                      {isFa ? 'هم‌بنیان‌گذاران استودیو جیرجیرک' : 'Jirjirak Studio Co-Founders'}
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-300 font-medium">
                      {isFa ? 'عبدالله • روح‌الله • سینا' : 'Abdollah • Rouhollah • Sina'}
                    </span>
                  </div>
                </div>

                {/* Explore Full Team button linking to /about */}
                <Link
                  to="/about"
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-20 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-black/55 hover:bg-brand-yellow hover:text-brand-dark text-white border border-white/20 transition-all duration-300 flex items-center gap-2 group/btn shadow-md"
                >
                  <span>{isFa ? 'مشاهده تمام اعضای تیم' : 'Explore Full Team'}</span>
                  <svg className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            ) : (
              <StudioTeamAtelier isNight={isNight} isFa={isFa} />
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
export default AboutSection;
