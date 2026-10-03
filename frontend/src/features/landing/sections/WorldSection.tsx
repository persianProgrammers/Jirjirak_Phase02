import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import WorldPlaceholder from '../../../world/World';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function WorldSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="world" 
      ref={containerRef} 
      className={`relative py-24 lg:py-32 px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-0 lg:items-stretch items-center relative z-10">
        
        {/* Text Content (Col 1 on Desktop - 5 Cols like HeroSection) */}
        <div className="lg:col-span-5 flex flex-col items-start max-w-xl w-full lg:pr-8 rtl:lg:pr-0 rtl:lg:pl-8 lg:self-stretch">
          {/* Pre-title / Step Badge (Pinned at top) */}
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>{t.world.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.world.badge}</span>
          </div>
          
          {/* Centered Content: Title, Description & Button */}
          <div ref={textRef} className="lg:my-auto flex flex-col items-start w-full py-4 lg:py-0">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t.world.titleLine1}<br />
              {t.world.titleLine2}
            </h2>
            
            <p className={`text-lg mb-6 lg:mb-10 max-w-md leading-relaxed ${isNight ? 'text-brand-gray' : 'text-neutral-400'}`}>
              {t.world.description}
            </p>
            
            {/* Desktop Button - Hidden on mobile */}
            <button className={`hidden lg:flex px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors items-center gap-2 ${
              isNight 
                ? 'bg-[#b3a85c] text-brand-dark hover:bg-brand-dark hover:text-white' 
                : 'bg-brand-yellow text-brand-dark hover:bg-white hover:text-brand-dark'
            }`}>
              {t.world.enterWorld}
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className="hidden lg:block h-6 w-full" aria-hidden="true" />
        </div>

        {/* World Interactive Area (Col 2 on Desktop - 7 Cols like HeroSection) */}
        <div className="lg:col-span-7 relative w-[calc(100%+3rem)] -mx-6 sm:w-[calc(100%+4rem)] sm:-mx-8 lg:w-full lg:mx-0 flex items-center justify-center lg:justify-end">
           <WorldPlaceholder />
        </div>

        {/* Mobile Button - Displayed directly below the image on mobile screens */}
        <div className="flex lg:hidden w-full justify-start mt-4">
          <button className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
            isNight 
              ? 'bg-[#b3a85c] text-brand-dark hover:bg-brand-dark hover:text-white' 
              : 'bg-brand-yellow text-brand-dark hover:bg-white hover:text-brand-dark'
          }`}>
            {t.world.enterWorld}
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
