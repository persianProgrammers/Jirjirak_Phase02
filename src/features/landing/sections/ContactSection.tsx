import { useRef, useEffect, useState, Fragment } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useLenis } from 'lenis/react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ContactTiersColumn } from '../components/ContactTiersColumn';

/* =========================================================================
   SERVICE OPTIONS FOR STEP 1
   ========================================================================= */
interface ServiceOption {
  id: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'web-design',
    titleFa: 'طراحی وب و توسعه پلتفرم',
    titleEn: 'Web Design & Development',
    descFa: 'سایت‌های مدرن، پرفورمنس بالا و انیمیشن‌های روان',
    descEn: 'Bespoke, high-performance sites with fluid interactions',
  },
  {
    id: 'ui-ux',
    titleFa: 'طراحی UI/UX محصول',
    titleEn: 'UI/UX Product Design',
    descFa: 'طراحی تجربه کاربری، پروتوتایپینگ و دیزاین سیستم',
    descEn: 'Intuitive user experiences, wireframes & design systems',
  },
  {
    id: 'branding-identity',
    titleFa: 'برندینگ و هویت بصری',
    titleEn: 'Branding & Visual Identity',
    descFa: 'لوگو، تایپوگرافی اختصاصی و کتابچه هویت برند',
    descEn: 'Identity systems, typography, color palettes & guidelines',
  },
  {
    id: 'digital-marketing',
    titleFa: 'دیجیتال مارکتینگ و رشد',
    titleEn: 'Digital Marketing & Growth',
    descFa: 'استراتژی جذب کاربر، کمپین‌ها و نرخ تبدیل',
    descEn: 'Acquisition strategy, performance marketing & CRO',
  },
  {
    id: 'content-creation',
    titleFa: 'تولید محتوا و روایت‌گری',
    titleEn: 'Content Creation & Storytelling',
    descFa: 'سناریونویسی، مدیاهای تعاملی و داستان برند',
    descEn: 'Creative copy, brand narrative & interactive media',
  },
  {
    id: 'seo-analytics',
    titleFa: 'سئو تخصصی و تحلیل داده',
    titleEn: 'Technical SEO & Analytics',
    descFa: 'بهینه‌سازی موتورهای جستجو و تحلیل رفتار مخاطب',
    descEn: 'Search performance, telemetry & conversion insights',
  },
  {
    id: 'graphic-design',
    titleFa: 'طراحی گرافیک و تصویرسازی',
    titleEn: 'Graphic Design & Illustration',
    descFa: 'طراحی پوستر، آرت‌ورک‌های بصری و بسته‌بندی',
    descEn: 'Visual arts, packaging, collateral & digital assets',
  },
  {
    id: 'something-weird',
    titleFa: 'ایده‌ای عجیب و دیوانه‌وار',
    titleEn: 'Something Weird & Insane',
    descFa: 'پروژه‌های نامتعارف، هوش مصنوعی یا خلاقیت مرزگستر',
    descEn: 'Experimental 3D/AI frontiers or radical unconventional concepts',
  },
];

/* =========================================================================
   TIER LABELS FOR STEP 3 RECAP
   ========================================================================= */
const SCOPE_LABELS = {
  fa: ['ایده چابک و اولیه (Micro)', 'محصول محوری و پایدار (Core)', 'شاهکار پرچمدار (Flagship)', 'اکوسیستم جامع (Enterprise)'],
  en: ['Micro Launch', 'Core Foundation', 'Flagship Experience', 'Comprehensive Ecosystem'],
};

const TIMELINE_LABELS = {
  fa: ['ضرب‌الاجل (۲ الی ۴ هفته)', 'منطقی و پیوسته (۱ الی ۳ ماه)', 'عمیق و جامع (۳ الی ۶ ماه)'],
  en: ['Sprint (2-4 Weeks)', 'Steady (1-3 Months)', 'Deep Horizon (3-6 Months)'],
};

const BUDGET_LABELS = {
  fa: ['چابک (Lean)', 'استاندارد استودیویی (Standard)', 'بدون محدودیت و فاخر (Bold)'],
  en: ['Lean Seed', 'Studio Standard', 'Unrestricted Bold'],
};

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const lenis = useLenis();

  // Smooth scroll to top of contact section whenever step changes
  const scrollToContactTop = () => {
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -30, duration: 0.8 });
    } else {
      const el = document.getElementById('contact');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Wizard state: Step 1, 2, or 3
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Validation warning state for Step 1
  const [step1Error, setStep1Error] = useState(false);

  // 1. Step 1 State: Multi-select services
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-design']);

  // 2. Step 2 State: Tiers (Scope, Timeline, Budget)
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [selectedTimeline, setSelectedTimeline] = useState<number>(1);
  const [selectedBudget, setSelectedBudget] = useState<number>(1);

  // 3. Step 3 State: User Contact Details
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  const toggleService = (id: string) => {
    setStep1Error(false);
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Step transitions
  const goToNextStep = () => {
    if (currentStep === 1) {
      if (selectedServices.length === 0) {
        setStep1Error(true);
        return;
      }
      setDirection(1);
      setCurrentStep(2);
      scrollToContactTop();
    } else if (currentStep === 2) {
      setDirection(1);
      setCurrentStep(3);
      scrollToContactTop();
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
      scrollToContactTop();
    }
  };

  const jumpToStep = (targetStep: 1 | 2 | 3) => {
    if (targetStep < currentStep) {
      setDirection(-1);
      setCurrentStep(targetStep);
      scrollToContactTop();
    } else if (targetStep > currentStep) {
      if (currentStep === 1 && selectedServices.length === 0) {
        setStep1Error(true);
        return;
      }
      setDirection(1);
      setCurrentStep(targetStep);
      scrollToContactTop();
    }
  };

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Form submission handler: Packages all 3 steps' data together for future backend API
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !userEmail.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Complete Structured Payload across all 3 questionnaire steps
    const fullBriefPayload = {
      step1_services: {
        selectedIds: selectedServices,
        labels: selectedServices.map((id) => {
          const item = SERVICE_OPTIONS.find((s) => s.id === id);
          return isFa ? item?.titleFa : item?.titleEn;
        }),
      },
      step2_scopeAndBudget: {
        ideaTierIndex: selectedTier,
        ideaTierLabel: isFa ? SCOPE_LABELS.fa[selectedTier] : SCOPE_LABELS.en[selectedTier],
        timelineTierIndex: selectedTimeline,
        timelineTierLabel: isFa ? TIMELINE_LABELS.fa[selectedTimeline] : TIMELINE_LABELS.en[selectedTimeline],
        budgetTierIndex: selectedBudget,
        budgetTierLabel: isFa ? BUDGET_LABELS.fa[selectedBudget] : BUDGET_LABELS.en[selectedBudget],
      },
      step3_contactDetails: {
        name: userName.trim(),
        email: userEmail.trim(),
        message: userMessage.trim(),
      },
      metadata: {
        submittedAt: new Date().toISOString(),
        language: currentLang,
        source: 'Jirjirak Studio Questionnaire Wizard',
      },
    };

    // Stored for developer reference and console log
    setLastSubmittedData(fullBriefPayload);
    console.log('[Jirjirak 3-Step Brief Ready for Backend Integration]:', fullBriefPayload);

    // Mock API dispatch delay (Front-end ready for future backend endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setSelectedServices(['web-design']);
    setSelectedTier(1);
    setSelectedTimeline(1);
    setSelectedBudget(1);
    setUserName('');
    setUserEmail('');
    setUserMessage('');
    setLastSubmittedData(null);
    scrollToContactTop();
  };

  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';
  const mutedGrayText = isNight ? 'text-neutral-400' : 'text-neutral-600';

  // Slide Animation Variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.38, ease: 'easeOut' },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    }),
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`py-24 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out border-t ${
        isNight
          ? 'bg-brand-dark text-brand-light border-white/10'
          : 'bg-brand-light text-brand-dark border-gray-200'
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* ========================================================================= */}
        {/* Row 1: Centered Section Title & Intro Description                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 tracking-tight">
            <span>{t.contact.titleLine1}</span>{' '}
            <span className={accentText}>{t.contact.titleLine2}</span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${mutedGrayText}`}>
            {isFa
              ? 'در سه گام کوتاه، نقشه راه، مقیاس و جزئیات پروژه خود را مشخص کنید تا دقیق‌ترین پیشنهاد ممکن را از جیرجیرک دریافت نمایید.'
              : 'In three quick steps, outline your vision, scope, and parameters to receive a tailored proposal from Jirjirak Studio.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Row 2: Questionnaire Wizard Container                                     */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto w-full">
          
          {/* STEP PROGRESS INDICATOR */}
          <div className="mb-8 sm:mb-10 max-w-xl mx-auto px-2">
            <div className="flex items-start w-full">
              {[
                {
                  num: 1,
                  titleFa: '۱. چه می‌سازیم؟',
                  titleEn: '1. What to Build',
                },
                {
                  num: 2,
                  titleFa: '۲. ابعاد و بودجه',
                  titleEn: '2. Scope & Budget',
                },
                {
                  num: 3,
                  titleFa: '۳. اطلاعات و ارسال',
                  titleEn: '3. Contact & Launch',
                },
              ].map((s, idx, arr) => {
                const isActive = currentStep === s.num;
                const isPassed = currentStep > s.num;
                const isNextSegmentFilled = currentStep > s.num;

                return (
                  <Fragment key={s.num}>
                    {/* Step Node */}
                    <button
                      type="button"
                      onClick={() => jumpToStep(s.num as 1 | 2 | 3)}
                      className="flex flex-col items-center group cursor-pointer shrink-0 z-10 select-none"
                      style={{ minWidth: '70px', maxWidth: '120px' }}
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm ${
                          isActive
                            ? isNight
                              ? 'bg-[#fff083] text-[#222] ring-4 ring-[#fff083]/25 scale-110 font-black'
                              : 'bg-[#8f6b00] text-white ring-4 ring-[#8f6b00]/25 scale-110 font-black'
                            : isPassed
                            ? isNight
                              ? 'bg-neutral-800 text-[#fff083] border border-[#fff083]/60'
                              : 'bg-white text-[#8f6b00] border border-[#8f6b00]/60'
                            : isNight
                            ? 'bg-neutral-900 border border-white/20 text-neutral-400 group-hover:border-white/40'
                            : 'bg-gray-100 border border-black/15 text-neutral-500 group-hover:border-black/30'
                        }`}
                      >
                        {isPassed ? '✓' : s.num}
                      </div>

                      <span
                        className={`text-[11px] sm:text-xs font-bold mt-2.5 text-center transition-colors ${
                          isActive
                            ? isNight
                              ? 'text-[#fff083]'
                              : 'text-[#8f6b00]'
                            : isPassed
                            ? isNight
                              ? 'text-white/80'
                              : 'text-neutral-800'
                            : 'text-neutral-400'
                        }`}
                      >
                        {isFa ? s.titleFa : s.titleEn}
                      </span>
                    </button>

                    {/* Connecting Line Segment between this step and next step */}
                    {idx < arr.length - 1 && (
                      <div className="flex-1 mt-4.5 sm:mt-5 h-[2px] relative -mx-2 z-0 overflow-hidden">
                        {/* Track */}
                        <div
                          className={`absolute inset-0 ${
                            isNight ? 'bg-white/15' : 'bg-black/15'
                          }`}
                        />
                        {/* Progress Fill */}
                        <div
                          className={`absolute inset-y-0 start-0 transition-all duration-500 ease-out ${
                            isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'
                          }`}
                          style={{
                            width: isNextSegmentFilled ? '100%' : '0%',
                          }}
                        />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* MAIN QUESTIONNAIRE FORM CONTAINER */}
          <form
            id="contact-form-inputs"
            onSubmit={handleFormSubmit}
            ref={formRef}
            className={`p-6 sm:p-8 lg:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden shadow-2xl ${
              isNight
                ? 'bg-brand-surface/70 border-white/10 backdrop-blur-xl shadow-black/40'
                : 'bg-white/90 border-gray-200 backdrop-blur-xl shadow-xl'
            }`}
          >
            {/* SUBMITTED SUCCESS VIEW */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-12 px-4 text-center flex flex-col items-center justify-center max-w-lg mx-auto"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl text-2xl font-black ${
                    isNight
                      ? 'bg-[#fff083] text-black shadow-[0_0_30px_rgba(255,240,131,0.4)]'
                      : 'bg-[#8f6b00] text-white shadow-[0_0_24px_rgba(143,107,0,0.3)]'
                  }`}
                >
                  ✓
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                  {isFa ? 'بریف شما با موفقیت ثبت شد!' : 'Brief Received Successfully!'}
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${mutedGrayText}`}>
                  {isFa
                    ? `سپاسگزاریم ${userName} عزیز! تمامی جزئیات بریف و انتخاب‌های شما دریافت شد. تیم استودیو جیرجیرک ظرف حداکثر ۲۴ ساعت کاری با شما از طریق ${userEmail} تماس خواهد گرفت.`
                    : `Thank you, ${userName}! All questionnaire parameters and specifications have been logged. Jirjirak Studio will follow up via ${userEmail} within 24 business hours.`}
                </p>

                {/* Brief Summary Box */}
                <div
                  className={`w-full p-4 rounded-2xl border text-xs text-start mb-8 flex flex-col gap-2 ${
                    isNight ? 'bg-neutral-900/60 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="font-bold text-xs uppercase tracking-wider opacity-60">
                    {isFa ? 'خلاصه بریف ثبت‌شده:' : 'Summary of Logged Brief:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedServices.map((id) => {
                      const item = SERVICE_OPTIONS.find((s) => s.id === id);
                      return (
                        <span
                          key={id}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                            isNight
                              ? 'bg-[#fff083]/10 border-[#fff083]/30 text-[#fff083]'
                              : 'bg-[#8f6b00]/10 border-[#8f6b00]/30 text-[#8f6b00]'
                          }`}
                        >
                          {isFa ? item?.titleFa : item?.titleEn}
                        </span>
                      );
                    })}
                  </div>
                  <div className="text-[11px] opacity-75 pt-1 flex flex-col gap-0.5">
                    <span>
                      {isFa ? 'مقیاس:' : 'Scope:'}{' '}
                      <strong className="opacity-100">
                        {isFa ? SCOPE_LABELS.fa[selectedTier] : SCOPE_LABELS.en[selectedTier]}
                      </strong>
                    </span>
                    <span>
                      {isFa ? 'زمان‌بندی:' : 'Timeline:'}{' '}
                      <strong className="opacity-100">
                        {isFa
                          ? TIMELINE_LABELS.fa[selectedTimeline]
                          : TIMELINE_LABELS.en[selectedTimeline]}
                      </strong>
                    </span>
                    <span>
                      {isFa ? 'بودجه:' : 'Budget:'}{' '}
                      <strong className="opacity-100">
                        {isFa ? BUDGET_LABELS.fa[selectedBudget] : BUDGET_LABELS.en[selectedBudget]}
                      </strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
                    isNight
                      ? 'bg-[#fff083] text-[#222] hover:bg-white'
                      : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
                  }`}
                >
                  {isFa ? 'ثبت یک بریف یا پروژه دیگر' : 'Start Another Brief'}
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                
                {/* ===================================================================== */}
                {/* STEP 1: WHAT ARE WE BUILDING? (SERVICES SELECTION)                   */}
                {/* ===================================================================== */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col"
                  >
                    {/* Step Title & Subtitle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-2">
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                          {isFa ? 'گام نخست • انتخاب قلمرو' : 'Step 1 • Select Territory'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                          {t.contact.whatBuilding}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold border ${
                            selectedServices.length > 0
                              ? isNight
                                ? 'bg-[#fff083]/10 border-[#fff083]/40 text-[#fff083]'
                                : 'bg-[#8f6b00]/10 border-[#8f6b00]/40 text-[#8f6b00]'
                              : 'opacity-50 border-neutral-500'
                          }`}
                        >
                          {isFa
                            ? `${selectedServices.length} مورد انتخاب شده`
                            : `${selectedServices.length} selected`}
                        </span>
                        <span className="text-[11px] opacity-60">
                          {isFa ? '(انتخاب چندگانه)' : '(Multi-select)'}
                        </span>
                      </div>
                    </div>

                    {/* Services Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = selectedServices.includes(service.id);
                        return (
                          <div
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none group flex items-start gap-3.5 ${
                              isSelected
                                ? isNight
                                  ? 'bg-[#fff083]/12 border-[#fff083] text-white shadow-[0_0_20px_rgba(255,240,131,0.12)] -translate-y-0.5'
                                  : 'bg-[#8f6b00]/10 border-[#8f6b00] text-neutral-950 shadow-sm -translate-y-0.5'
                                : isNight
                                ? 'bg-neutral-900/50 border-white/5 hover:border-white/20 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/80'
                                : 'bg-gray-50/90 border-gray-200 hover:border-gray-300 text-neutral-600 hover:text-neutral-950 hover:bg-white'
                            }`}
                          >
                            {/* Checkbox indicator */}
                            <div
                              className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                                isSelected
                                  ? isNight
                                    ? 'bg-[#fff083] border-[#fff083] text-neutral-950 shadow-[0_0_10px_rgba(255,240,131,0.4)]'
                                    : 'bg-[#8f6b00] border-[#8f6b00] text-white shadow-[0_0_10px_rgba(143,107,0,0.3)]'
                                  : isNight
                                  ? 'border-neutral-600 bg-neutral-800/80 group-hover:border-[#fff083]/70'
                                  : 'border-neutral-300 bg-white group-hover:border-[#8f6b00]/70'
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-3 h-3"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M2.5 6.5l2.5 2.5 5-5" />
                                </svg>
                              )}
                            </div>

                            {/* Service Content */}
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`text-sm font-bold transition-colors ${
                                  isSelected
                                    ? isNight
                                      ? 'text-white'
                                      : 'text-neutral-950'
                                    : ''
                                }`}
                              >
                                {isFa ? service.titleFa : service.titleEn}
                              </h4>
                              <p className="text-xs opacity-60 mt-1 leading-relaxed line-clamp-2">
                                {isFa ? service.descFa : service.descEn}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step 1 Error Feedback */}
                    {step1Error && (
                      <div className="mb-4 text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2.5 rounded-xl text-center">
                        {isFa
                          ? '⚠️ لطفاً حداقل یکی از حوزه‌ها را برای شروع بریف انتخاب کنید.'
                          : '⚠️ Please select at least one service to continue.'}
                      </div>
                    )}

                    {/* Navigation Actions */}
                    <div className="flex items-center justify-end pt-3">
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className={`w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 text-center ${
                          isNight
                            ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,240,131,0.4)]'
                            : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_18px_rgba(143,107,0,0.3)]'
                        }`}
                      >
                        <span>
                          {isFa
                            ? 'قفل کردن حوزه‌ها و ورود به بازی'
                            : 'Lock in Scope & Enter the Arena'}
                        </span>
                        <svg
                          className="w-4 h-4 rtl:rotate-180 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ===================================================================== */}
                {/* STEP 2: SCOPE, TIMELINE & BUDGET TIERS (IDEA / LOTUS / CHEST)          */}
                {/* ===================================================================== */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col"
                  >
                    {/* Step Title & Subtitle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-2">
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                          {isFa ? 'گام دوم • تنظیم مختصات' : 'Step 2 • Set Coordinates'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                          {isFa ? 'مقیاس، زمان‌بندی و بودجه پروژه' : 'Project Scope, Timeline & Budget'}
                        </h3>
                      </div>
                      <p className="text-xs opacity-65 max-w-xs">
                        {isFa
                          ? 'چرخش اسطرلاب، باز شدن نیلوفر زمان و گشودن صندوقچه بودجه'
                          : 'Interact with the celestial astrolabe, lotus bloom, and treasure chest'}
                      </p>
                    </div>

                    {/* Renders the full 3-row interactive tier module */}
                    <div className="mb-8">
                      <ContactTiersColumn
                        isNight={isNight}
                        isFa={isFa}
                        accentText={accentText}
                        mutedGrayText={mutedGrayText}
                        t={t}
                        initialTier={selectedTier}
                        initialTimeline={selectedTimeline}
                        initialBudget={selectedBudget}
                        onTierChange={setSelectedTier}
                        onTimelineChange={setSelectedTimeline}
                        onBudgetChange={setSelectedBudget}
                      />
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between pt-5 border-t border-white/10 gap-3">
                      <button
                        type="button"
                        onClick={goToPrevStep}
                        className={`w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center justify-center gap-2 shrink-0 ${
                          isNight
                            ? 'border-white/20 text-neutral-300 hover:border-white/40 hover:text-white bg-neutral-900/60'
                            : 'border-black/20 text-neutral-700 hover:border-black/40 hover:text-neutral-950 bg-gray-50'
                        }`}
                      >
                        <svg
                          className="w-4 h-4 rtl:rotate-180 rotate-180 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span>{isFa ? 'مرحله قبل (خدمات)' : 'Back to Services'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={goToNextStep}
                        className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 text-center ${
                          isNight
                            ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,240,131,0.4)]'
                            : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_18px_rgba(143,107,0,0.3)]'
                        }`}
                      >
                        <span>
                          {isFa
                            ? 'مختصات ثبت شد؛ بزن بریم مرحله آخر'
                            : 'Coordinates Locked — Next Step'}
                        </span>
                        <svg
                          className="w-4 h-4 rtl:rotate-180 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ===================================================================== */}
                {/* STEP 3: CONTACT INPUTS & FINAL SUBMISSION                             */}
                {/* ===================================================================== */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col"
                  >
                    {/* Step Title & Subtitle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-2">
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${accentText}`}>
                          {isFa ? 'گام نهایی • معرفی و ارسال' : 'Final Step • Introduce & Send'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                          {isFa ? 'مشخصات شما و پرتاب بریف' : 'Your Details & Launch Brief'}
                        </h3>
                      </div>
                      <p className="text-xs opacity-65 max-w-xs">
                        {isFa
                          ? 'پاسخ‌گویی تضمین‌شده ظرف حداکثر ۲۴ ساعت کاری'
                          : 'Guaranteed 24 business hours response time'}
                      </p>
                    </div>

                    {/* Recap Summary Strip of Previous 2 Steps */}
                    <div
                      className={`p-4 rounded-2xl border mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                        isNight ? 'bg-neutral-900/60 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                          {isFa ? 'خلاصه انتخاب‌های شما:' : 'Your Selections Summary:'}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {selectedServices.map((id) => {
                            const item = SERVICE_OPTIONS.find((s) => s.id === id);
                            return (
                              <span
                                key={id}
                                className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                                  isNight
                                    ? 'bg-[#fff083]/10 border-[#fff083]/30 text-[#fff083]'
                                    : 'bg-[#8f6b00]/10 border-[#8f6b00]/30 text-[#8f6b00]'
                                }`}
                              >
                                {isFa ? item?.titleFa : item?.titleEn}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => jumpToStep(1)}
                          className="text-[11px] font-bold underline opacity-70 hover:opacity-100 cursor-pointer"
                        >
                          {isFa ? 'ویرایش گزینه‌ها' : 'Edit'}
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Name Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                          <span>{isFa ? 'نام و نام‌خانوادگی شما' : 'Tell Us Your Name'}</span>
                          <span className="text-[10px] opacity-60 font-medium">
                            {isFa ? '(الزامی)' : '(Required)'}
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder={isFa ? 'مثال: سهراب کیهانی' : 'e.g. Jordan Scott'}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
                            isNight
                              ? 'bg-brand-surface border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                              : 'bg-gray-50 border-gray-200 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                          }`}
                        />
                      </div>

                      {/* Email Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                          <span>{isFa ? 'ایمیل شما جهت ارتباط' : 'Your Email Address'}</span>
                          <span className="text-[10px] opacity-60 font-medium">
                            {isFa ? '(الزامی)' : '(Required)'}
                          </span>
                        </label>
                        <input
                          type="email"
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-colors ${
                            isNight
                              ? 'bg-brand-surface border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                              : 'bg-gray-50 border-gray-200 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-1.5 mb-8">
                      <label className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                        <span>{t.contact.tellUs}</span>
                        <span className="text-[10px] opacity-60 font-medium">
                          {isFa ? '(اختیاری اما راهگشا)' : '(Optional)'}
                        </span>
                      </label>
                      <textarea
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder={t.contact.placeholder}
                        rows={4}
                        className={`w-full p-4 border rounded-xl text-sm resize-none focus:outline-none transition-colors overflow-y-auto ${
                          isNight
                            ? 'bg-brand-surface border-white/10 text-white focus:border-[#fff083] contact-scrollbar-night'
                            : 'bg-gray-50 border-gray-200 text-brand-dark focus:border-[#8f6b00] contact-scrollbar-day'
                        }`}
                      />
                    </div>

                    {/* Final Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between pt-5 border-t border-white/10 gap-3">
                      <button
                        type="button"
                        onClick={goToPrevStep}
                        className={`w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border flex items-center justify-center gap-2 shrink-0 ${
                          isNight
                            ? 'border-white/20 text-neutral-300 hover:border-white/40 hover:text-white bg-neutral-900/60'
                            : 'border-black/20 text-neutral-700 hover:border-black/40 hover:text-neutral-950 bg-gray-50'
                        }`}
                      >
                        <svg
                          className="w-4 h-4 rtl:rotate-180 rotate-180 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span>{isFa ? 'مرحله قبل (مقیاس و بودجه)' : 'Back to Scale'}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer shadow-xl active:scale-95 disabled:opacity-60 text-center ${
                          isNight
                            ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_28px_rgba(255,240,131,0.45)]'
                            : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_22px_rgba(143,107,0,0.35)]'
                        }`}
                      >
                        {isSubmitting ? (
                          <span>{isFa ? 'در حال ثبت بریف...' : 'Sending brief...'}</span>
                        ) : (
                          <>
                            <span>{t.contact.sendBtn}</span>
                            <span className="text-base shrink-0">🚀</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
