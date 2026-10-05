import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function CaseStudySection() {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight, landingLayoutMode } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current!.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const accentText = isNight ? 'text-[#8f6b00]' : 'text-[#fff083]';
  const accentBorder = isNight ? 'border-[#8f6b00]' : 'border-[#fff083]';

  return (
    <section 
      id="case-study" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-32 px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className={`max-w-[1600px] mx-auto w-full flex flex-col ${
        landingLayoutMode === 'zigzag' ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } gap-16 relative transition-all duration-500`}>
        
        {/* Left Column (Info & Steps) */}
        <div className="lg:w-1/4 flex flex-col relative z-10 lg:self-stretch">
          {/* Pre-title / Step Badge (Pinned at top) */}
          <div className="flex items-center gap-4 mb-8">
            <span className={`text-xs font-semibold tracking-widest ${accentText}`}>{t.caseStudy.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.caseStudy.badge}</span>
          </div>
          
          {/* Centered Content: Title, Subtitle & Timeline Steps */}
          <div className="lg:my-auto flex flex-col items-start py-4 lg:py-0 w-full">
            <h2 className="text-4xl font-bold leading-tight mb-2 tracking-tight">{t.caseStudy.title}</h2>
            <p className={`text-sm mb-10 lg:mb-12 ${isNight ? 'text-neutral-600' : 'text-neutral-400'}`}>{t.caseStudy.subtitle}</p>
            
            <div ref={elementsRef} className="space-y-8 relative w-full">
               {/* Vertical Timeline Line */}
               <div className={`absolute left-3 rtl:left-auto rtl:right-3 top-2 bottom-2 w-[1px] -z-10 ${
                 isNight ? 'bg-black/10' : 'bg-brand-surface-light'
               }`}></div>
               
              {t.caseStudy.steps.map((step, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isNight ? 'bg-white border-black/15' : 'bg-brand-dark border-brand-surface-light'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-[#8f6b00]' : 'bg-[#fff083]'}`}></div>
                  </div>
                  <div>
                    <h4 className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${accentText}`}>{step.title}</h4>
                    <p className={`text-xs leading-relaxed pr-4 rtl:pr-0 rtl:pl-4 ${
                      isNight ? 'text-neutral-700' : 'text-neutral-400'
                    }`}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block h-8 w-full" aria-hidden="true" />
        </div>

        {/* Center Column (Main Mockup) */}
        <div className="lg:w-1/2 flex items-center justify-center relative">
          <div className={`w-full h-[600px] rounded-xl border shadow-2xl relative overflow-hidden group ${
            isNight ? 'bg-white border-black/10' : 'bg-brand-surface border-brand-surface-light'
          }`}>
            {/* Mockup Screen Placeholder */}
            <div className={`absolute inset-4 rounded shadow-inner overflow-hidden flex flex-col items-center justify-center ${
              isNight ? 'bg-[#e0e0e0]' : 'bg-brand-dark'
            }`}>
               <div className="text-center">
                 <p className={`text-xs tracking-widest mb-4 ${isNight ? 'text-neutral-600' : 'text-brand-gray'}`}>{t.caseStudy.mockupBrand}</p>
                 <h3 className={`text-3xl font-bold tracking-tight ${isNight ? 'text-brand-dark' : 'text-brand-light'}`}>
                   {t.caseStudy.mockupLine1}<br/>{t.caseStudy.mockupLine2}<br/>
                   <span className={accentText}>{t.caseStudy.mockupHighlight}</span>
                 </h3>
               </div>
            </div>
            
            {/* Phone Mockup Overlap */}
            <div className={`absolute bottom-10 right-10 rtl:right-auto rtl:left-10 w-[140px] h-[280px] rounded-2xl border-4 shadow-2xl overflow-hidden transform rotate-12 rtl:-rotate-12 transition-transform duration-500 group-hover:rotate-0 ${
              isNight ? 'bg-neutral-200 border-white' : 'bg-brand-surface-light border-brand-dark'
            }`}>
               <div className={`absolute top-2 w-1/2 left-1/4 h-3 rounded-b-xl z-10 ${
                 isNight ? 'bg-neutral-400' : 'bg-brand-dark'
               }`}></div>
               <div className={`w-full h-full flex flex-col pt-8 px-4 ${
                 isNight ? 'bg-neutral-100' : 'bg-brand-dark'
               }`}>
                  <div className={`w-full h-24 rounded mb-4 ${isNight ? 'bg-neutral-200' : 'bg-brand-surface'}`}></div>
                  <div className={`w-full h-12 rounded ${isNight ? 'bg-neutral-200' : 'bg-brand-surface'}`}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column (Supporting Images) */}
        <div className="lg:w-1/4 flex flex-col gap-4">
          <div className={`w-full h-[180px] rounded-lg border overflow-hidden flex items-center justify-center ${
            isNight ? 'bg-white border-black/10' : 'bg-brand-surface border-brand-surface-light'
          }`}>
            <span className={`text-[10px] ${isNight ? 'text-neutral-600' : 'text-brand-gray'}`}>{t.caseStudy.environmentShot}</span>
          </div>
          <div className={`w-full h-[180px] rounded-lg border overflow-hidden flex items-center justify-center relative ${
            isNight ? 'bg-white border-[#8f6b00]/30' : 'bg-brand-surface border-[#fff083]/30'
          }`}>
             <div className={`${accentText} text-xs font-bold tracking-widest text-center`}>{t.caseStudy.title}<br/><span className={`text-[8px] font-normal ${isNight ? 'text-neutral-600' : 'text-brand-gray'}`}>{t.caseStudy.figure02}</span></div>
          </div>
          <div className={`w-full h-[180px] rounded-lg border overflow-hidden flex items-center justify-center ${
            isNight ? 'bg-white border-black/10' : 'bg-brand-surface border-brand-surface-light'
          }`}>
             <span className={`text-[10px] ${isNight ? 'text-neutral-600' : 'text-brand-gray'}`}>{t.caseStudy.wireframeSketch}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
