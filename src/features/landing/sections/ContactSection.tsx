import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ContactTiersColumn } from '../components/ContactTiersColumn';

/* =========================================================================
   SERVICE OPTIONS
   ========================================================================= */
interface ServiceOption {
  id: string;
  titleFa: string;
  titleEn: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'web-design', titleFa: 'طراحی وب', titleEn: 'Web Design' },
  { id: 'ui-ux', titleFa: 'طراحی UI/UX', titleEn: 'UI/UX Design' },
  { id: 'seo-analytics', titleFa: 'سئو و تحلیل داده', titleEn: 'SEO & Analytics' },
  { id: 'digital-marketing', titleFa: 'دیجیتال مارکتینگ و رشد', titleEn: 'Digital Marketing & Growth' },
  { id: 'content-creation', titleFa: 'تولید محتوا', titleEn: 'Content Creation' },
  { id: 'branding-identity', titleFa: 'برندینگ و هویت بصری', titleEn: 'Branding & Visual Identity' },
  { id: 'graphic-design', titleFa: 'طراحی گرافیک', titleEn: 'Graphic Design' },
  { id: 'something-weird', titleFa: 'ایده‌ای عجیب و دیوانه‌وار', titleEn: 'Something weird and insane' },
];

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  // Form Inputs State (Name, Email, Message)
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Selected Tiers tracking (can be used for analytics or form payload)
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [selectedTimeline, setSelectedTimeline] = useState<number>(1);
  const [selectedBudget, setSelectedBudget] = useState<number>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setUserName('');
    setUserEmail('');
    setUserMessage('');
  };

  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';
  const mutedGrayText = isNight ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`py-24 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out border-t ${
        isNight
          ? 'bg-brand-dark text-brand-light border-white/10'
          : 'bg-brand-light text-brand-dark border-gray-200'
      }`}
    >
      <div className="max-w-[1560px] mx-auto w-full">
        
        {/* ========================================================================= */}
        {/* Row 1: Centered Section Title & Intro Description                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 tracking-tight">
            <span>{t.contact.titleLine1}</span>{' '}
            <span className={accentText}>{t.contact.titleLine2}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${mutedGrayText}`}>
            {t.contact.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Row 2: 3-Column Responsive Grid Layout                                    */}
        {/* Col 1: Scope, Timeline & Budget Tiers (Last column moved to first)        */}
        {/* Col 2: What are we building? (Services selection stays second)            */}
        {/* Col 3: Contact Inputs & Send it to Jirjirak button                        */}
        {/* ========================================================================= */}
        <form
          id="contact-form-inputs"
          onSubmit={handleFormSubmit}
          ref={formRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 xl:gap-10 items-start"
        >
          {/* ===================================================================== */}
          {/* COLUMN 1: Three Geometric Tier Selectors (Scope, Timeline, Budget)     */}
          {/* ===================================================================== */}
          <ContactTiersColumn
            isNight={isNight}
            isFa={isFa}
            accentText={accentText}
            mutedGrayText={mutedGrayText}
            t={t}
            onTierChange={setSelectedTier}
            onTimelineChange={setSelectedTimeline}
            onBudgetChange={setSelectedBudget}
          />

          {/* ===================================================================== */}
          {/* COLUMN 2: Multi-Select Services (What are we building?)               */}
          {/* ===================================================================== */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest">
                {t.contact.whatBuilding}
              </h3>
              <span className="text-[11px] opacity-60">
                {isFa ? '(انتخاب چندگانه)' : '(Multi-select)'}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center justify-between py-2 px-3 rounded-xl border transition-all cursor-pointer select-none group ${
                      isSelected
                        ? isNight
                          ? 'bg-[#fff083]/10 border-[#fff083]/45 text-white shadow-[0_0_12px_rgba(255,240,131,0.06)]'
                          : 'bg-[#8f6b00]/8 border-[#8f6b00]/35 text-neutral-900 shadow-xs'
                        : isNight
                        ? 'bg-neutral-900/40 border-white/5 hover:border-white/15 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/70'
                        : 'bg-gray-50/80 border-gray-200/70 hover:border-gray-300 text-neutral-600 hover:text-neutral-900 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Square Checkbox */}
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? isNight
                              ? 'bg-[#fff083] border-[#fff083] text-neutral-950 shadow-[0_0_8px_rgba(255,240,131,0.3)]'
                              : 'bg-[#8f6b00] border-[#8f6b00] text-white shadow-[0_0_8px_rgba(143,107,0,0.25)]'
                            : isNight
                            ? 'border-neutral-600 bg-neutral-800/60 group-hover:border-[#fff083]/70'
                            : 'border-neutral-300 bg-white group-hover:border-[#8f6b00]/70'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.5 6.5l2.5 2.5 5-5" />
                          </svg>
                        )}
                      </div>

                      {/* Service Label */}
                      <span
                        className={`text-xs sm:text-[13px] transition-colors truncate ${
                          isSelected
                            ? isNight
                              ? 'text-white font-semibold'
                              : 'text-neutral-950 font-bold'
                            : 'font-medium'
                        }`}
                      >
                        {isFa ? service.titleFa : service.titleEn}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* COLUMN 3: Contact Inputs (Name, Email, Message) & Send Action         */}
          {/* ===================================================================== */}
          <div className="flex flex-col gap-4">
            
            {/* 3.1 Tell Us Your Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                <span>{isFa ? 'نام و نام‌خانوادگی شما' : 'Tell Us Your Name'}</span>
                <span className="text-[10px] opacity-60 font-medium">{isFa ? '(الزامی)' : '(Required)'}</span>
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={isFa ? 'مثال: سهراب کیهانی' : 'e.g. Jordan Scott'}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                  isNight
                    ? 'bg-brand-surface border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                    : 'bg-gray-50 border-gray-200 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                }`}
              />
            </div>

            {/* 3.2 Your Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                <span>{isFa ? 'ایمیل شما جهت ارتباط' : 'Your Email Address'}</span>
                <span className="text-[10px] opacity-60 font-medium">{isFa ? '(الزامی)' : '(Required)'}</span>
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder={isFa ? 'name@company.com' : 'name@company.com'}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
                  isNight
                    ? 'bg-brand-surface border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                    : 'bg-gray-50 border-gray-200 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                }`}
              />
            </div>

            {/* 3.3 Tell Us About It (Message Textarea) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                <span>{t.contact.tellUs}</span>
                <span className="text-[10px] opacity-60 font-medium">{isFa ? '(اختیاری)' : '(Optional)'}</span>
              </label>
              <textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder={t.contact.placeholder}
                rows={4}
                className={`w-full p-3.5 border rounded-xl text-sm resize-none focus:outline-none transition-colors overflow-y-auto ${
                  isNight
                    ? 'bg-brand-surface border-white/10 text-white focus:border-[#fff083] contact-scrollbar-night'
                    : 'bg-gray-50 border-gray-200 text-brand-dark focus:border-[#8f6b00] contact-scrollbar-day'
                }`}
              />
            </div>

            {/* 3.4 Submit Action Button (Send it to Jirjirak) */}
            <div className="flex flex-col gap-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 w-full cursor-pointer shadow-lg active:scale-95 disabled:opacity-60 ${
                  isNight
                    ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,240,131,0.35)]'
                    : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
                }`}
              >
                {isSubmitting ? (
                  <span>{isFa ? 'در حال ارسال...' : 'Sending brief...'}</span>
                ) : (
                  <>
                    <span>{t.contact.sendBtn}</span>
                    <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Submission Success Banner */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                      isNight
                        ? 'bg-[#fff083]/15 border-[#fff083]/40 text-white'
                        : 'bg-[#8f6b00]/15 border-[#8f6b00]/40 text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isNight ? 'bg-[#fff083] text-black' : 'bg-[#8f6b00] text-white'
                        }`}
                      >
                        ✓
                      </span>
                      <span>
                        {isFa
                          ? 'بریف شما دریافت شد. ظرف ۲۴ ساعت کاری با شما تماس می‌گیریم.'
                          : 'Brief received! We will follow up within 24 business hours.'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="underline font-bold text-[11px] opacity-80 hover:opacity-100 shrink-0"
                    >
                      {isFa ? 'ارسال مجدد' : 'Reset'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </form>

      </div>
    </section>
  );
}
