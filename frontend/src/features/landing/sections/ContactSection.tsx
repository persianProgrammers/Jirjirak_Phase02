import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const [selectedInterest, setSelectedInterest] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current!.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className={`py-32 px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out border-t ${
        isNight 
          ? 'bg-brand-dark text-brand-light border-white/10' 
          : 'bg-brand-light text-brand-dark border-gray-200'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-16">
        
        {/* Left Column (Header) */}
        <div className="lg:w-1/3 flex flex-col items-start lg:self-stretch">
          {/* Pre-title / Step Badge (Pinned at top) */}
          <div className="flex items-center gap-4 mb-8">
            <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-brand-yellow' : 'text-[#b3a85c]'}`}>{t.contact.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.contact.badge}</span>
          </div>
          
          {/* Centered Content: Title, Description & Button */}
          <div className="lg:my-auto flex flex-col items-start py-6 lg:py-0 w-full">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t.contact.titleLine1}<br />{t.contact.titleLine2}
            </h2>
            
            <p className={`text-base leading-relaxed mb-10 max-w-sm ${
              isNight ? 'text-brand-gray' : 'text-neutral-600'
            }`}>
              {t.contact.description}
            </p>

            <button className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              isNight
                ? 'bg-brand-yellow text-brand-dark hover:bg-white hover:text-brand-dark'
                : 'bg-[#b3a85c] text-brand-dark hover:bg-brand-dark hover:text-white'
            }`}>
              {t.contact.startConversation}
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className="hidden lg:block h-8 w-full" aria-hidden="true" />
        </div>

        {/* Right Column (Form) */}
        <div ref={formRef} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
             <h3 className="text-xs font-bold uppercase tracking-widest mb-2">{t.contact.whatBuilding}</h3>
             
             {t.contact.interests.map((interest, idx) => (
               <label 
                 key={idx} 
                 onClick={() => setSelectedInterest(idx)}
                 className="flex items-center gap-3 cursor-pointer group select-none"
               >
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                   selectedInterest === idx 
                     ? isNight ? 'border-brand-yellow' : 'border-[#b3a85c]' 
                     : isNight ? 'border-gray-600 group-hover:border-brand-yellow' : 'border-gray-300 group-hover:border-[#b3a85c]'
                 }`}>
                   {selectedInterest === idx && (
                     <div className={`w-2 h-2 rounded-full ${isNight ? 'bg-brand-yellow' : 'bg-[#b3a85c]'}`}></div>
                   )}
                 </div>
                 <span className="text-sm font-medium">{interest}</span>
               </label>
             ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
             <div className="flex flex-col gap-4">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2">{t.contact.tellUs}</h3>
               <textarea 
                 placeholder={t.contact.placeholder} 
                 className={`w-full h-32 p-4 border rounded-lg text-sm resize-none focus:outline-none transition-colors ${
                   isNight 
                     ? 'bg-brand-surface border-white/10 text-white focus:border-brand-yellow' 
                     : 'bg-gray-50 border-gray-200 text-brand-dark focus:border-[#b3a85c]'
                 }`}
               ></textarea>
             </div>

             <div className="flex flex-col gap-4">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-2">{t.contact.howBig}</h3>
               <div className="relative pt-2 pb-6">
                 {/* Custom Slider Track */}
                 <div className={`w-full h-1 rounded-full relative ${isNight ? 'bg-white/10' : 'bg-gray-200'}`}>
                   {/* Active Track */}
                   <div className={`absolute left-0 rtl:left-auto rtl:right-0 top-0 h-full w-1/3 rounded-full ${
                     isNight ? 'bg-brand-yellow' : 'bg-[#b3a85c]'
                   }`}></div>
                   {/* Thumb */}
                   <div className={`absolute left-1/3 rtl:left-auto rtl:right-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-4 h-4 rounded-full border-2 shadow cursor-pointer ${
                     isNight ? 'bg-brand-dark border-brand-yellow' : 'bg-white border-[#b3a85c]'
                   }`}></div>
                 </div>
                 <div className="flex justify-between mt-3 text-[10px] font-bold text-brand-gray uppercase tracking-widest">
                   <span>{t.contact.small}</span>
                   <span>{t.contact.huge}</span>
                 </div>
               </div>
             </div>

             <button className={`px-8 lg:px-12 xl:px-16 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 self-start w-full md:w-auto ${
               isNight
                 ? 'bg-brand-yellow text-brand-dark hover:bg-white hover:text-brand-dark'
                 : 'bg-[#b3a85c] text-brand-dark hover:bg-brand-dark hover:text-white'
             }`}>
               {t.contact.sendBtn}
               <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M5 12h14M12 5l7 7-7 7"/>
               </svg>
             </button>
          </div>

        </div>

      </div>
    </section>
  );
}
