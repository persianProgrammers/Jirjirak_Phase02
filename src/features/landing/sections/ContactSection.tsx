import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

interface ProjectTier {
  id: number;
  roman: string;
  numFa: string;
  badgeFa: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  flatteryFa: string;
  flatteryEn: string;
}

const PROJECT_TIERS: ProjectTier[] = [
  {
    id: 0,
    roman: 'I',
    numFa: '۰۱',
    badgeFa: '⚡ تیز و لیزری (Laser Focus)',
    badgeEn: 'LASER FOCUS',
    titleFa: 'سنگ بنای چابک و متمرکز',
    titleEn: 'Lean & Surgical Launchpad',
    flatteryFa: 'بهترین استراتژی دنیا مال آدم‌های باهوشیه که اول با دقت و چابکی تیر رو دقیق به هدف می‌زنن؛ ما هسته پروژه‌ت رو مثل الماس برات تراش می‌دیم!',
    flatteryEn: 'Smart pioneers test the waters with surgical precision; we will polish your core project vision into an indestructible diamond.',
  },
  {
    id: 1,
    roman: 'II',
    numFa: '۰۲',
    badgeFa: '🚀 موتور توربو (High Gear)',
    badgeEn: 'HIGH GEAR',
    titleFa: 'معماری رشد و تسخیر بازار',
    titleEn: 'Growth Architecture & Traction',
    flatteryFa: 'پروژه‌ای که به این مرحله رسیده آماده پروازه؛ سیستم و خروجی‌ای برات پیاده می‌کنیم که مخاطب‌هات رو شیفته و رقبات رو مات و مبهوت کنه!',
    flatteryEn: 'A project at this stage is primed to soar; we will engineer a complete outcome that turns audiences into believers and leaves rivals in awe.',
  },
  {
    id: 2,
    roman: 'III',
    numFa: '۰۳',
    badgeFa: '💎 شاهکار وحشی (Beast Mode)',
    badgeEn: 'BEAST MODE',
    titleFa: 'تجربه غوطه‌ور و اثر متمایز',
    titleEn: 'Immersive Craft & Distinction',
    flatteryFa: 'پروژه‌ای با این جاه‌طلبی لیاقت یک امضای هنری و ساختاری بی‌همتا رو داره؛ خروجی‌ای خلق می‌کنیم که کل مارکت انگشت‌به‌دهن بمونه و تا سال‌ها نقل محافل باشه!',
    flatteryEn: 'Ambition of this caliber demands pure artisanal glory; we will engineer a benchmark that sets the gold standard for your entire domain.',
  },
  {
    id: 3,
    roman: 'IV',
    numFa: '۰۴',
    badgeFa: '🔥 دیوانه‌وار و تاریخ‌ساز (Insane Scale)',
    badgeEn: 'INSANE SCALE',
    titleFa: 'اکوسیستم تاریخی و پرچمدار صنف',
    titleEn: 'Monumental Flagship Legacy',
    flatteryFa: 'شما داری قواعد این بازی رو از نو بازنویسی می‌کنی؛ جیرجیرک با تمام دپارتمان‌ها و تمام قوا کنارت می‌ایسته تا با هم یک اثر تاریخی و ماندگار خلق کنیم!',
    flatteryEn: 'You are rewriting the rules of the entire landscape; our full multidisciplinary atelier unites with you to engrave a permanent historic monument.',
  },
];

interface ServiceOption {
  id: string;
  titleFa: string;
  titleEn: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'web-design',
    titleFa: 'طراحی وب',
    titleEn: 'Web Design',
  },
  {
    id: 'ui-ux',
    titleFa: 'طراحی UI/UX',
    titleEn: 'UI/UX Design',
  },
  {
    id: 'seo-analytics',
    titleFa: 'سئو و تحلیل داده',
    titleEn: 'SEO & Analytics',
  },
  {
    id: 'digital-marketing',
    titleFa: 'دیجیتال مارکتینگ و رشد',
    titleEn: 'Digital Marketing & Growth',
  },
  {
    id: 'content-creation',
    titleFa: 'تولید محتوا',
    titleEn: 'Content Creation',
  },
  {
    id: 'branding-identity',
    titleFa: 'برندینگ و هویت بصری',
    titleEn: 'Branding & Visual Identity',
  },
  {
    id: 'graphic-design',
    titleFa: 'طراحی گرافیک',
    titleEn: 'Graphic Design',
  },
  {
    id: 'something-weird',
    titleFa: 'ایده‌ای عجیب و دیوانه‌وار (Something weird and insane)',
    titleEn: 'Something weird and insane',
  },
];

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // Multi-select services state
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-design']);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Default to Tier 2 (index 1: معماری رشد و تسخیر بازار) so yellow light is visible on the track
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [spinRotation, setSpinRotation] = useState<number>(0);

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

  // Rotation per tier step (216 deg aligns with the 5-port film reel cutout geometry: 3 * 72° = 216°)
  const ROTATION_PER_TIER = 216;

  // Unified Handler when manually selecting a tier (e.g. clicking milestones)
  const handleSelectTier = (newTier: number) => {
    if (newTier === selectedTier) return;
    const diff = newTier - selectedTier;
    setSpinRotation((prev) => prev + diff * ROTATION_PER_TIER);
    setSelectedTier(newTier);
  };

  // Vintage Film Reel Spin Handler (clicking the reel disk directly)
  const handleSpinFilmReel = () => {
    setSpinRotation((prev) => prev + ROTATION_PER_TIER);
    setSelectedTier((prev) => (prev + 1) % PROJECT_TIERS.length);
  };

  // Drag & Click Handler on the Progress Bar Track
  const updateTierFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;

    let pct: number;
    if (isFa) {
      pct = (rect.right - clientX) / rect.width;
    } else {
      pct = (clientX - rect.left) / rect.width;
    }
    pct = Math.max(0, Math.min(1, pct));
    const newTier = Math.round(pct * 3);

    setSelectedTier((prevTier) => {
      if (prevTier !== newTier) {
        const diff = newTier - prevTier;
        setSpinRotation((prevRot) => prevRot + diff * ROTATION_PER_TIER);
        return newTier;
      }
      return prevTier;
    });
  }, [isFa]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
    updateTierFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateTierFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';
  const activeTier = PROJECT_TIERS[selectedTier];
  const mutedGrayText = isNight ? 'text-neutral-400' : 'text-neutral-600';

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
            <span className={`text-xs font-semibold tracking-widest font-mono ${accentText}`}>{t.contact.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.contact.badge}</span>
          </div>
          
          {/* Centered Content: Title, Description & Button */}
          <div className="lg:my-auto flex flex-col items-start py-6 lg:py-0 w-full">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t.contact.titleLine1}<br />{t.contact.titleLine2}
            </h2>
            
            <p className={`text-base leading-relaxed mb-10 max-w-sm ${mutedGrayText}`}>
              {t.contact.description}
            </p>

            <button className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
              isNight
                ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,240,131,0.3)]'
                : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
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
          
          {/* Column 1: Multi-Select Services (Compact, Clean & Non-Numbered) */}
          <div className="flex flex-col gap-2.5">
             <h3 className="text-xs font-bold uppercase tracking-widest mb-1">
               {t.contact.whatBuilding}
             </h3>
             
             <div className="flex flex-col gap-1.5">
               {SERVICE_OPTIONS.map((service) => {
                 const isSelected = selectedServices.includes(service.id);
                 return (
                   <div 
                     key={service.id} 
                     onClick={() => toggleService(service.id)}
                     className={`flex items-center justify-between py-2 px-3 rounded-xl border transition-all cursor-pointer select-none group ${
                       isSelected 
                         ? (isNight 
                             ? 'bg-[#fff083]/10 border-[#fff083]/45 text-white shadow-[0_0_12px_rgba(255,240,131,0.06)]' 
                             : 'bg-[#8f6b00]/8 border-[#8f6b00]/35 text-neutral-900 shadow-xs')
                         : (isNight 
                             ? 'bg-neutral-900/40 border-white/5 hover:border-white/15 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/70' 
                             : 'bg-gray-50/80 border-gray-200/70 hover:border-gray-300 text-neutral-600 hover:text-neutral-900 hover:bg-white')
                     }`}
                   >
                     <div className="flex items-center gap-2.5 min-w-0">
                       {/* Square Checkbox (NOT radio button) */}
                       <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                         isSelected 
                           ? (isNight ? 'bg-[#fff083] border-[#fff083] text-neutral-950 shadow-[0_0_8px_rgba(255,240,131,0.3)]' : 'bg-[#8f6b00] border-[#8f6b00] text-white shadow-[0_0_8px_rgba(143,107,0,0.25)]') 
                           : (isNight ? 'border-neutral-600 bg-neutral-800/60 group-hover:border-[#fff083]/70' : 'border-neutral-300 bg-white group-hover:border-[#8f6b00]/70')
                       }`}>
                         {isSelected && (
                           <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M2.5 6.5l2.5 2.5 5-5" />
                           </svg>
                         )}
                       </div>

                       {/* Service Label (No numbering) */}
                       <span className={`text-xs sm:text-[13px] transition-colors truncate ${
                         isSelected 
                           ? (isNight ? 'text-white font-semibold' : 'text-neutral-950 font-bold') 
                           : 'font-medium'
                       }`}>
                         {isFa ? service.titleFa : service.titleEn}
                       </span>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

          {/* Column 2: Email, Message & Interactive Scope Spool */}
          <div className="flex flex-col gap-5">
             {/* Email Input Field */}
             <div className="flex flex-col gap-1.5">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-1">
                 {isFa ? 'ایمیل شما جهت ارتباط' : 'Your Email'}
               </h3>
               <input
                 type="email"
                 required
                 placeholder={isFa ? 'name@company.com' : 'name@company.com'}
                 className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                   isNight 
                     ? 'bg-brand-surface border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]' 
                     : 'bg-gray-50 border-gray-200 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                 }`}
               />
             </div>

             {/* Message Box */}
             <div className="flex flex-col gap-1.5">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-1">
                 {t.contact.tellUs}
               </h3>
               <textarea 
                 placeholder={t.contact.placeholder} 
                 className={`w-full h-24 p-3.5 border rounded-xl text-sm resize-none focus:outline-none transition-colors overflow-y-auto ${
                   isNight 
                     ? 'bg-brand-surface border-white/10 text-white focus:border-[#fff083] contact-scrollbar-night' 
                     : 'bg-gray-50 border-gray-200 text-brand-dark focus:border-[#8f6b00] contact-scrollbar-day'
                 }`}
               ></textarea>
             </div>

             {/* 🎯 Compact 4-Tier Interactive Project Scope */}
             <div className="flex flex-col gap-3">
               {/* Section Title */}
               <div className="flex items-center justify-between">
                 <h3 className="text-xs font-bold uppercase tracking-widest">
                   {t.contact.howBig}
                 </h3>
                 <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${
                   isNight 
                     ? 'bg-[#fff083]/10 text-[#fff083] border-[#fff083]/30' 
                     : 'bg-[#8f6b00]/10 text-[#8f6b00] border-[#8f6b00]/30'
                 }`}>
                   {isFa ? `سطح ${activeTier.numFa}` : `Tier ${activeTier.roman}`}
                 </span>
               </div>

               {/* Interactive Row: Vintage Film Reel Disk Icon + Draggable Progress Bar */}
               <div className={`flex items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-2xl border transition-all ${
                 isNight 
                   ? 'bg-neutral-900/90 border-white/10 shadow-lg' 
                   : 'bg-white border-black/10 shadow-sm'
               }`}>
                 
                 {/* 🎬 Vintage Cinema Film Reel Disk Button (Spins smoothly on click) */}
                 <button
                   type="button"
                   onClick={handleSpinFilmReel}
                   title={isFa ? 'برای چرخش دیسک فیلم و تعویض سطح کلیک کنید' : 'Click to spin cinema film reel & advance tier'}
                   className={`relative w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center shrink-0 border cursor-pointer select-none transition-transform duration-300 active:scale-95 group ${
                     isNight 
                       ? 'bg-neutral-950 border-[#fff083]/50 hover:border-[#fff083] shadow-[0_0_15px_rgba(255,240,131,0.25)]' 
                       : 'bg-neutral-50 border-[#8f6b00]/50 hover:border-[#8f6b00] shadow-[0_0_15px_rgba(143,107,0,0.2)]'
                   }`}
                 >
                   {/* Mechanical Vintage 35mm Cinema Film Reel SVG */}
                   <motion.div
                     animate={{ rotate: spinRotation }}
                     transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                     className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center"
                   >
                     <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" fill="none">
                       {/* Outer Heavy Film Reel Flange Rim */}
                       <circle
                         cx="24"
                         cy="24"
                         r="21"
                         stroke="currentColor"
                         strokeWidth="2.2"
                         className={isNight ? 'stroke-[#fff083]' : 'stroke-[#8f6b00]'}
                       />
                       {/* Film Edge Perforations Track */}
                       <circle
                         cx="24"
                         cy="24"
                         r="18.5"
                         stroke="currentColor"
                         strokeWidth="0.9"
                         strokeDasharray="2 2"
                         className={isNight ? 'stroke-white/40' : 'stroke-black/30'}
                       />

                       {/* 5 Classic Cinema Reel Cutout Ports */}
                       {[0, 72, 144, 216, 288].map((angle, i) => (
                         <g key={i} transform={`rotate(${angle} 24 24)`}>
                           {/* Film Port Hole */}
                           <circle
                             cx="24"
                             cy="12"
                             r="4.2"
                             fill={isNight ? '#121212' : '#f0f0f0'}
                             stroke="currentColor"
                             strokeWidth="1.5"
                             className={isNight ? 'stroke-[#fff083]/80' : 'stroke-[#8f6b00]/80'}
                           />
                           {/* Inner Specular Highlight Arc */}
                           <circle
                             cx="24"
                             cy="12"
                             r="2"
                             fill="none"
                             stroke="currentColor"
                             strokeWidth="0.8"
                             className={isNight ? 'stroke-white/35' : 'stroke-black/25'}
                           />
                         </g>
                       ))}

                       {/* Inner Film Spool Hub */}
                       <circle
                         cx="24"
                         cy="24"
                         r="7"
                         fill={isNight ? '#1a1a1a' : '#ffffff'}
                         stroke="currentColor"
                         strokeWidth="1.6"
                         className={isNight ? 'stroke-[#fff083]' : 'stroke-[#8f6b00]'}
                       />

                       {/* Center Drive Pins / Tri-Lug Lock */}
                       <circle cx="24" cy="20.2" r="1.1" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                       <circle cx="20.7" cy="25.8" r="1.1" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                       <circle cx="27.3" cy="25.8" r="1.1" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />

                       {/* Center Brass Axle Jewel */}
                       <circle
                         cx="24"
                         cy="24"
                         r="2.6"
                         className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'}
                       />
                       <circle cx="24" cy="24" r="1" fill="#ffffff" />
                     </svg>
                   </motion.div>

                   {/* Sub Micro-Badge "REEL" */}
                   <span className={`absolute -bottom-1 text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full border shadow-sm uppercase ${
                     isNight 
                       ? 'bg-neutral-900 text-[#fff083] border-[#fff083]/40' 
                       : 'bg-white text-[#8f6b00] border-[#8f6b00]/40'
                   }`}>
                     REEL
                   </span>
                 </button>

                 {/* Alongside: Click & Drag Progress Bar with Checkpoints and Precision Centered Spool Thumb */}
                 <div className="flex-1 flex flex-col justify-center gap-1.5 select-none pr-1 pl-1">
                   {/* Step Milestones Row (Above Track) */}
                   <div className="flex justify-between items-center text-[10px] font-mono font-bold px-1">
                     {PROJECT_TIERS.map((tier) => {
                       const isCurrent = tier.id === selectedTier;
                       return (
                         <button
                           key={tier.id}
                           type="button"
                           onClick={() => handleSelectTier(tier.id)}
                           className={`cursor-pointer transition-colors p-1 focus:outline-none ${
                             isCurrent 
                               ? (isNight ? 'text-[#fff083]' : 'text-[#8f6b00]') 
                               : 'text-neutral-400 opacity-60 hover:opacity-100'
                           }`}
                         >
                           {isFa ? tier.numFa : tier.roman}
                         </button>
                       );
                     })}
                   </div>

                   {/* Draggable & Clickable Progress Track */}
                   <div 
                     ref={trackRef}
                     onPointerDown={handlePointerDown}
                     onPointerMove={handlePointerMove}
                     onPointerUp={handlePointerUp}
                     onPointerCancel={handlePointerUp}
                     className="relative h-6 flex items-center cursor-pointer touch-none"
                   >
                     {/* Track Background Line */}
                     <div 
                       className={`w-full h-2 rounded-full relative overflow-hidden ${
                         isNight ? 'bg-neutral-800 border border-white/5' : 'bg-neutral-200 border border-black/5'
                       }`}
                     >
                       {/* Active Progress Fill (Yellow Light) */}
                       <motion.div 
                         className={`absolute top-0 bottom-0 rounded-full ${
                           isNight 
                             ? 'bg-gradient-to-r from-[#fff083]/50 via-[#fff083] to-[#fff083] shadow-[0_0_12px_rgba(255,240,131,0.6)]' 
                             : 'bg-gradient-to-r from-[#8f6b00]/50 via-[#8f6b00] to-[#8f6b00]'
                         }`}
                         initial={false}
                         animate={{
                           width: `${((selectedTier) / 3) * 100}%`,
                           right: isFa ? 0 : 'auto',
                           left: isFa ? 'auto' : 0,
                         }}
                         transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                       />
                     </div>

                     {/* 4 Checkpoint Nodes along the Track (Subtle nodes, hide current so it doesn't fight thumb) */}
                     <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-0.5">
                       {PROJECT_TIERS.map((tier) => {
                         const isReached = tier.id <= selectedTier;
                         const isCurrent = tier.id === selectedTier;

                         return (
                           <div
                             key={tier.id}
                             className="relative w-4 h-4 flex items-center justify-center -translate-x-1/2 rtl:translate-x-1/2"
                           >
                             <span
                               className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                 isCurrent
                                   ? 'opacity-0'
                                   : isReached
                                   ? isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'
                                   : isNight ? 'bg-neutral-700' : 'bg-neutral-300'
                               }`}
                             />
                           </div>
                         );
                       })}
                     </div>

                     {/* 🎯 Precision Gliding Spool Thumb (Dead-centered directly on the track line) */}
                     <motion.div
                       className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                       style={{
                         [isFa ? 'right' : 'left']: `${((selectedTier) / 3) * 100}%`,
                       }}
                       initial={false}
                       animate={{
                         [isFa ? 'right' : 'left']: `${((selectedTier) / 3) * 100}%`,
                       }}
                       transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                     >
                       {/* Concentric Spool Thumb with Glowing Core */}
                       <div 
                         className={`w-5 h-5 -translate-x-1/2 rtl:translate-x-1/2 rounded-full border-2 shadow-md flex items-center justify-center transition-all ${
                           isNight 
                             ? 'bg-neutral-950 border-[#fff083] shadow-[0_0_12px_#fff083]' 
                             : 'bg-white border-[#8f6b00] shadow-[0_0_10px_rgba(143,107,0,0.4)]'
                         }`}
                       >
                         <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'}`} />
                       </div>
                     </motion.div>
                   </div>

                   {/* Sub-label showing small / huge anchors */}
                   <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 opacity-60 px-1">
                     <span>{t.contact.small}</span>
                     <span>{t.contact.huge}</span>
                   </div>
                 </div>

               </div>

               {/* 🍉 Punchy 1-Title & 1-Line Flattering Copy in Light/Muted Gray */}
               <div className="overflow-hidden">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTier.id}
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -8 }}
                     transition={{ duration: 0.22, ease: 'easeOut' }}
                     className={`p-3 sm:p-3.5 rounded-xl border transition-all ${
                       isNight 
                         ? 'bg-neutral-900/80 border-white/10 shadow-sm' 
                         : 'bg-white border-black/8 shadow-sm'
                     }`}
                   >
                     {/* 1 Catchy Title with Badge */}
                     <div className="flex items-center gap-2 mb-1">
                       <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                         isNight ? 'bg-[#fff083]/15 text-[#fff083]' : 'bg-[#8f6b00]/12 text-[#8f6b00]'
                       }`}>
                         {isFa ? activeTier.badgeFa : activeTier.badgeEn}
                       </span>
                       <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                         {isFa ? activeTier.titleFa : activeTier.titleEn}
                       </h4>
                     </div>

                     {/* 1 Line of Warm & Flattering Copy in light/muted gray (universal to all 7 departments) */}
                     <p className={`text-xs leading-relaxed ${mutedGrayText}`}>
                       {isFa ? activeTier.flatteryFa : activeTier.flatteryEn}
                     </p>
                   </motion.div>
                 </AnimatePresence>
               </div>
             </div>

             {/* Submit Button */}
             <button className={`px-8 lg:px-12 xl:px-16 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 self-start w-full md:w-auto cursor-pointer shadow-lg active:scale-95 ${
               isNight
                 ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,240,131,0.3)]'
                 : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
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
