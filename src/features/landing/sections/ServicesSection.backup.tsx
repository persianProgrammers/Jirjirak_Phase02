import React, { useEffect, useRef } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

// Bespoke Golden Badge Icons
const serviceBadgeIcons = [
  // 01. Web & Development - Golden Browser / Code Window
  <svg key="web" className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" />
    <line x1="2" y1="7" x2="22" y2="7" stroke="currentColor" />
    <circle cx="5" cy="5" r="0.75" fill="currentColor" />
    <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    <polyline points="8 12 10 14 8 16" />
    <line x1="12" y1="16" x2="15" y2="16" />
  </svg>,
  // 02. SEO & Analytics - Golden Ascending Growth Chart
  <svg key="seo" className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="3 17 9 11 13 15 21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 7 21 7 21 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="21" cy="7" r="1.5" fill="currentColor" />
    <line x1="3" y1="21" x2="21" y2="21" stroke="currentColor" strokeOpacity="0.4" />
  </svg>,
  // 03. Branding & Identity - Golden Diamond / Sparkling Gem
  <svg key="branding" className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polygon points="12 2 21 8.5 17 21 7 21 3 8.5 12 2" stroke="currentColor" strokeLinejoin="round" />
    <polyline points="3 8.5 12 13 21 8.5" />
    <line x1="12" y1="13" x2="12" y2="21" />
  </svg>,
  // 04. Creative Studio - Golden Drafting Pen / Compass
  <svg key="creative" className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2L19 21M12 2L5 21" stroke="currentColor" strokeLinecap="round" />
    <path d="M8 14H16" stroke="currentColor" strokeLinecap="round" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
  </svg>,
];

// Isometric 3D Artwork
const serviceIllustrations = [
  // 01. Web Dev Isometric Server / Monitor
  <svg key="art-web" className="w-16 h-16 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" viewBox="0 0 100 100" fill="none">
    <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" fill="rgba(255,240,131,0.06)" stroke="#fff083" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M50 15L85 35L50 55L15 35L50 15Z" fill="rgba(255,240,131,0.12)" />
    <path d="M15 35L50 55V85L15 65V35Z" fill="rgba(255,240,131,0.04)" />
    <path d="M85 35L50 55V85L85 65V35Z" fill="rgba(255,240,131,0.08)" />
    <path d="M35 46L45 52L35 58" stroke="#fff083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M65 46L55 52L65 58" stroke="#fff083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="52" r="3" fill="#fff083" />
  </svg>,
  // 02. SEO Isometric 3D Bar Graph
  <svg key="art-seo" className="w-16 h-16 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" viewBox="0 0 100 100" fill="none">
    <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" fill="rgba(255,240,131,0.06)" stroke="#fff083" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M30 65V52L38 47V60L30 65Z" fill="#fff083" fillOpacity="0.5" />
    <path d="M46 65V40L54 35V60L46 65Z" fill="#fff083" fillOpacity="0.75" />
    <path d="M62 65V28L70 23V60L62 65Z" fill="#fff083" />
    <polyline points="28 48 44 36 60 22 74 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    <circle cx="74" cy="15" r="2.5" fill="#fff083" />
  </svg>,
  // 03. Branding Isometric Prism
  <svg key="art-brand" className="w-16 h-16 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" viewBox="0 0 100 100" fill="none">
    <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" fill="rgba(255,240,131,0.06)" stroke="#fff083" strokeWidth="1.5" strokeOpacity="0.4" />
    <polygon points="50 25 72 38 72 62 50 75 28 62 28 38" fill="rgba(255,240,131,0.15)" stroke="#fff083" strokeWidth="1.5" />
    <line x1="50" y1="25" x2="50" y2="75" stroke="#fff083" strokeWidth="1.2" strokeOpacity="0.6" />
    <line x1="28" y1="38" x2="72" y2="62" stroke="#fff083" strokeWidth="1.2" strokeOpacity="0.6" />
    <line x1="28" y1="62" x2="72" y2="38" stroke="#fff083" strokeWidth="1.2" strokeOpacity="0.6" />
  </svg>,
  // 04. Creative Studio Isometric Layered Canvas
  <svg key="art-creative" className="w-16 h-16 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" viewBox="0 0 100 100" fill="none">
    <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" fill="rgba(255,240,131,0.06)" stroke="#fff083" strokeWidth="1.5" strokeOpacity="0.4" />
    <path d="M50 30L75 44L50 58L25 44L50 30Z" fill="rgba(255,240,131,0.2)" stroke="#fff083" strokeWidth="1.5" />
    <path d="M50 42L75 56L50 70L25 56L50 42Z" fill="rgba(255,240,131,0.1)" stroke="#fff083" strokeWidth="1.2" strokeOpacity="0.6" />
    <circle cx="50" cy="44" r="3.5" fill="#fff083" />
  </svg>,
];

export function ServicesSectionBackup() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`min-h-screen flex items-center justify-center px-8 lg:px-24 py-24 transition-colors duration-700 ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-stretch">
        
        {/* Left Column: Fixed pre-title at top, centered headline/description/button */}
        <div className="lg:w-[38%] flex flex-col items-start lg:self-stretch">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-widest text-brand-gray">{t.services.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.services.badge}</span>
          </div>

          <div ref={textRef} className="lg:my-auto flex flex-col items-start py-6 lg:py-0 w-full">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
              {t.services.titleLine1}<br />
              {t.services.titleLine2}
            </h2>
            
            <p className={`text-base leading-relaxed mb-10 max-w-md ${
              isNight ? 'text-brand-gray' : 'text-neutral-600'
            }`}>
              {t.services.description}
            </p>
            
            <a 
              href="#services" 
              className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 ${
                isNight 
                  ? 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
                  : 'text-brand-dark border-brand-dark hover:text-brand-gray hover:border-brand-gray'
              }`}
            >
              {t.services.exploreAll}
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div className="hidden lg:block h-6 w-full" aria-hidden="true" />
        </div>

        {/* Right Column: 4 Cards */}
        <div ref={cardsRef} className="lg:w-[62%] grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 self-stretch">
          {t.services.items.map((service, index) => (
            <div
              key={index}
              className={`group p-7 lg:p-8 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[290px] lg:min-h-[310px] ${
                isNight 
                  ? 'bg-[#121212] border border-white/[0.08] hover:border-brand-yellow/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]' 
                  : 'bg-white border border-gray-200/80 hover:border-brand-dark/40 shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
              }`}
            >
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300 ${
                  isNight 
                    ? 'border-brand-yellow/70 bg-brand-yellow/10 group-hover:bg-brand-yellow/15 group-hover:border-brand-yellow shadow-[0_0_15px_rgba(255,240,131,0.12)]'
                    : 'border-brand-dark/20 bg-brand-yellow/25 group-hover:bg-brand-yellow/40 group-hover:border-brand-dark/40'
                }`}>
                  {serviceBadgeIcons[index % serviceBadgeIcons.length]}
                </div>
                <div className="relative">
                  {serviceIllustrations[index % serviceIllustrations.length]}
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold mb-3 tracking-tight transition-colors duration-300 ${
                  isNight ? 'text-white group-hover:text-brand-yellow' : 'text-brand-dark group-hover:text-black'
                }`}>
                  {service.title}
                </h3>
                <ul className="space-y-1.5">
                  {service.items.map((item, i) => (
                    <li key={i} className={`text-sm flex items-center gap-2 ${
                      isNight ? 'text-brand-gray/90' : 'text-neutral-600'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors duration-300 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`absolute bottom-6 right-6 rtl:right-auto rtl:left-6 opacity-40 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 transition-all duration-300 pointer-events-none ${
                isNight ? 'text-brand-yellow' : 'text-brand-dark'
              }`}>
                <svg className="w-5 h-5 rtl:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default ServicesSectionBackup;
