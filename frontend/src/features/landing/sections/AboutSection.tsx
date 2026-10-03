import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { Sparkles } from 'lucide-react';

import { StudioTeamAtelier } from '../components/team-models/StudioTeamAtelier';
import { ALL_TEAM_MEMBERS } from '../components/team-models/teamData';

interface AboutSectionProps {
  isAboutPage?: boolean;
}

export function AboutSection({ isAboutPage = false }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // Strict Theme Color System:
  // When background is dark (!isNight): Accent is brand-yellow (#fff083)
  // When background is light (isNight): Accent is brand-olive (#b3a85c)
  const accentTextClass = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const accentBorderClass = isNight ? 'border-[#b3a85c]' : 'border-brand-yellow';

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
        
        {/* Main Grid: Left Column Text & Right Column Detective Corkboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (Mission, Studio Ethos, Equal Founders) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-28">
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
              
              <a 
                href="#about" 
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
              </a>
            </div>
          </div>

          {/* Right Column: Studio Creative Atelier Gallery */}
          <div className="lg:col-span-8 w-full">
            <StudioTeamAtelier isNight={isNight} isFa={isFa} isAboutPage={isAboutPage} />
          </div>

        </div>

      </div>
    </section>
  );
}
