import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import {
  TreasureChestIcon,
  TREASURE_CHEST_META,
} from '../components/BudgetIconConcepts';
import {
  LotusBloomIcon,
  LOTUS_BLOOM_META,
} from '../components/TimelineIconConcepts';

/* =========================================================================
   1. IDEA SCOPE TIERS
   ========================================================================= */
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

/* =========================================================================
   2. TIMELINE TIERS
   ========================================================================= */
interface TimelineTier {
  id: number;
  numFa: string;
  numEn: string;
  badgeFa: string;
  badgeEn: string;
  labelFa: string;
  labelEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
}

const TIMELINE_TIERS: TimelineTier[] = [
  {
    id: 0,
    numFa: '۰۱',
    numEn: '01',
    badgeFa: '⚡ اسپرینت فوق‌سریع',
    badgeEn: 'SPRINT LAUNCH',
    labelFa: 'کمتر از ۱ ماه',
    labelEn: '< 1 Month',
    titleFa: 'لانچ سریع و فوق‌چابک',
    titleEn: 'Ultra-Fast Agile Launch',
    descFa: 'اجرای فشرده و چرخه تحویل چابک؛ تمرکز بی‌وقفه بر راه‌اندازی سریع محصول بدون تلف کردن حتی یک روز کاری.',
    descEn: 'Ultra-fast intensive sprint with dedicated focus to launch your core product without losing a single day.',
  },
  {
    id: 1,
    numFa: '۰۲',
    numEn: '02',
    badgeFa: '⚖️ ریتم متوازن و پرداخت‌شده',
    badgeEn: 'BALANCED PACE',
    labelFa: '۱ تا ۲ ماه',
    labelEn: '1 - 2 Months',
    titleFa: 'توسعه متوازن و استاندارد',
    titleEn: 'Standard Refined Pipeline',
    descFa: 'تعادل ایده‌آل میان سرعت تولید و عمق بصری؛ زمان کافی برای بازبینی‌های دقیق، آزمون کاربری و پرداخت جزئیات.',
    descEn: 'Ideal equilibrium between velocity and polish, allowing thorough design iterations and rigorous quality assurance.',
  },
  {
    id: 2,
    numFa: '۰۳',
    numEn: '03',
    badgeFa: '🔬 مهندسی عمیق و لایه‌لایه',
    badgeEn: 'DEEP ENGAGEMENT',
    labelFa: '۲ تا ۳ ماه',
    labelEn: '2 - 3 Months',
    titleFa: 'تولید اختصاصی و سفارشی',
    titleEn: 'Bespoke Craft & Depth',
    descFa: 'فرصت خلق تجربه‌ای چندبعدی با تعاملات سفارشی، هویت بصری منحصر‌به‌فرد و زیرساخت فنی مقاوم در برابر مقیاس بالا.',
    descEn: 'Dedicated runway to engineer multidimensional experiences, bespoke kinetic interactions, and high-load architecture.',
  },
  {
    id: 3,
    numFa: '۰۴',
    numEn: '04',
    badgeFa: '🏛️ معماری افق بلندمدت',
    badgeEn: 'MONUMENTAL ROADMAP',
    labelFa: 'بیش از ۳ ماه',
    labelEn: '> 3 Months',
    titleFa: 'اکوسیستم جامع و ماندگار',
    titleEn: 'Monumental Flagship Ecosystem',
    descFa: 'همکاری راهبردی همه‌جانبه میان تمام دپارتمان‌های آتلیه جهت بنا نهادن یک محصول دگرگون‌کننده و پیشرو در صنعت.',
    descEn: 'Long-term strategic atelier partnership uniting design, tech, and narrative to engrave an enduring industry benchmark.',
  },
];

/* =========================================================================
   3. BUDGET TIERS
   ========================================================================= */
interface BudgetTier {
  id: number;
  numFa: string;
  numEn: string;
  badgeFa: string;
  badgeEn: string;
  labelFa: string;
  labelEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
}

const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 0,
    numFa: '۰۱',
    numEn: '01',
    badgeFa: '🌱 بذر چابک (Seed Scope)',
    badgeEn: 'SEED SCOPE',
    labelFa: 'کمتر از ۵۰ م.ت',
    labelEn: '< 50M Tomans',
    titleFa: 'راه‌اندازی کم‌ریسک و متمرکز',
    titleEn: 'Lean Precision Investment',
    descFa: 'سرمایه‌گذاری هوشمندانه و هدفمند جهت ساخت نسخه کمینه معتبر (MVP) یا بازطراحی اساسی بخش‌های کلیدی.',
    descEn: 'Smart, low-risk capital deployment focused on surgical MVP launch or high-impact critical conversions.',
  },
  {
    id: 1,
    numFa: '۰۲',
    numEn: '02',
    badgeFa: '🚀 مقیاس تجاری (Growth)',
    badgeEn: 'GROWTH SCALE',
    labelFa: '۵۰ تا ۱۰۰ م.ت',
    labelEn: '50M - 100M Tomans',
    titleFa: 'پروژه تجاری پربازده',
    titleEn: 'High-Impact Commercial Scope',
    descFa: 'بودجه استاندارد پروژه‌های حرفه‌ای برای تولید سیستم دیزاین یکپارچه، وب‌اپلیکیشن مدرن و هویت برند قدرتمند.',
    descEn: 'Standard tier for high-impact commercial projects, unified design systems, and lightning-fast web applications.',
  },
  {
    id: 2,
    numFa: '۰۳',
    numEn: '03',
    badgeFa: '💎 امضای ویژه (Prime Signature)',
    badgeEn: 'PRIME SIGNATURE',
    labelFa: '۱۰۰ تا ۵۰۰ م.ت',
    labelEn: '100M - 500M Tomans',
    titleFa: 'سرمایه‌گذاری تمایز رقابتی',
    titleEn: 'Distinctive Benchmark Grade',
    descFa: 'سرمایه‌گذاری جامع جهت تسلط کامل بر بازار، موشن‌ها و انیمیشن‌های سفارشی و پروداکشن هنری استثنایی.',
    descEn: 'Comprehensive investment for undisputed market distinction, bespoke animation pipelines, and signature UX craft.',
  },
  {
    id: 3,
    numFa: '۰۴',
    numEn: '04',
    badgeFa: '🔥 پرچمدار کلان (Enterprise)',
    badgeEn: 'ENTERPRISE SCALE',
    labelFa: 'بیش از ۵۰۰ م.ت',
    labelEn: '> 500M Tomans',
    titleFa: 'اکوسیستم تاریخی بی‌رقیب',
    titleEn: 'Monumental Enterprise Legacy',
    descFa: 'فعال‌سازی همزمان چند دپارتمان تخصصی استودیو برای خلق خروجی در سطح پرچمداران بین‌المللی با پشتیبانی کامل.',
    descEn: 'Full-scale mobilization across multidisciplinary studio departments for a peerless global-tier digital benchmark.',
  },
];

/* =========================================================================
   4. SERVICE OPTIONS
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

  // References for drag tracks
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingTimelineRef = useRef(false);

  const budgetTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingBudgetRef = useRef(false);

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

  // 1. Idea Scope Tier & Film Reel State
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [spinRotation, setSpinRotation] = useState<number>(0);

  // 2. Timeline Tier State (Lotus Bloom)
  const [selectedTimeline, setSelectedTimeline] = useState<number>(1);

  // 3. Budget Tier State (Treasure Chest)
  const [selectedBudget, setSelectedBudget] = useState<number>(1);

  // 4. Interactive Explanation Box State ('idea' | 'timeline' | 'budget' | null)
  // Initially null: no explanation box is open by default until user interacts with one
  const [activeExplanation, setActiveExplanation] = useState<'idea' | 'timeline' | 'budget' | null>(null);

  // Refs for the three interactive rows to detect outside interactions
  const ideaRowRef = useRef<HTMLDivElement>(null);
  const timelineRowRef = useRef<HTMLDivElement>(null);
  const budgetRowRef = useRef<HTMLDivElement>(null);

  // Close explanation boxes when clicking anywhere else on the page outside the 3 rows
  useEffect(() => {
    const handleGlobalPointerDown = (e: PointerEvent | MouseEvent) => {
      if (!activeExplanation) return;
      const target = e.target as Node | null;
      if (!target) return;

      if (
        ideaRowRef.current?.contains(target) ||
        timelineRowRef.current?.contains(target) ||
        budgetRowRef.current?.contains(target)
      ) {
        return;
      }

      setActiveExplanation(null);
    };

    document.addEventListener('pointerdown', handleGlobalPointerDown);
    return () => {
      document.removeEventListener('pointerdown', handleGlobalPointerDown);
    };
  }, [activeExplanation]);

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
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Constants for icon rotations
  const ROTATION_PER_TIER = 216;

  // Handlers for Scope (Film Reel)
  const handleSelectTier = (newTier: number) => {
    setActiveExplanation('idea');
    if (newTier === selectedTier) return;
    const diff = newTier - selectedTier;
    setSpinRotation((prev) => prev + diff * ROTATION_PER_TIER);
    setSelectedTier(newTier);
  };

  const handleSpinFilmReel = () => {
    setActiveExplanation('idea');
    setSpinRotation((prev) => prev + ROTATION_PER_TIER);
    setSelectedTier((prev) => (prev + 1) % PROJECT_TIERS.length);
  };

  const updateTierFromPointer = useCallback(
    (clientX: number) => {
      setActiveExplanation('idea');
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      let pct = isFa ? (rect.right - clientX) / rect.width : (clientX - rect.left) / rect.width;
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
    },
    [isFa]
  );

  // Handlers for Timeline (Lotus Bloom)
  const handleSelectTimeline = (newTimeline: number) => {
    setActiveExplanation('timeline');
    if (newTimeline === selectedTimeline) return;
    setSelectedTimeline(newTimeline);
  };

  const handleSpinTimeline = () => {
    setActiveExplanation('timeline');
    setSelectedTimeline((prev) => (prev + 1) % TIMELINE_TIERS.length);
  };

  const updateTimelineFromPointer = useCallback(
    (clientX: number) => {
      setActiveExplanation('timeline');
      if (!timelineTrackRef.current) return;
      const rect = timelineTrackRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      let pct = isFa ? (rect.right - clientX) / rect.width : (clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      const newTimeline = Math.round(pct * 3);

      setSelectedTimeline(newTimeline);
    },
    [isFa]
  );

  // Handlers for Budget (Treasure Chest)
  const handleSelectBudget = (newBudget: number) => {
    setActiveExplanation('budget');
    if (newBudget === selectedBudget) return;
    setSelectedBudget(newBudget);
  };

  const handleSpinBudget = () => {
    setActiveExplanation('budget');
    setSelectedBudget((prev) => (prev + 1) % BUDGET_TIERS.length);
  };

  const updateBudgetFromPointer = useCallback(
    (clientX: number) => {
      setActiveExplanation('budget');
      if (!budgetTrackRef.current) return;
      const rect = budgetTrackRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      let pct = isFa ? (rect.right - clientX) / rect.width : (clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      const newBudget = Math.round(pct * 3);

      setSelectedBudget(newBudget);
    },
    [isFa]
  );

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
  const activeTier = PROJECT_TIERS[selectedTier];
  const activeTimeline = TIMELINE_TIERS[selectedTimeline];
  const activeBudget = BUDGET_TIERS[selectedBudget];
  const mutedGrayText = isNight ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`py-28 sm:py-32 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out border-t ${
        isNight
          ? 'bg-brand-dark text-brand-light border-white/10'
          : 'bg-brand-light text-brand-dark border-gray-200'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* ========================================================================= */}
        {/* Left Column (Section Header & Studio Intro)                               */}
        {/* ========================================================================= */}
        <div className="lg:w-1/3 flex flex-col items-start lg:self-stretch">
          {/* Pre-title / Step Badge */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className={`text-xs font-semibold tracking-widest ${accentText}`}>
              {t.contact.step}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase">
              {t.contact.badge}
            </span>
          </div>

          {/* Centered Content: Title, Description & Action Button */}
          <div className="lg:my-auto flex flex-col items-start py-4 lg:py-0 w-full">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6">
              {t.contact.titleLine1}
              <br />
              {t.contact.titleLine2}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-sm ${mutedGrayText}`}>
              {t.contact.description}
            </p>

            <a
              href="#contact-form-inputs"
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                isNight
                  ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,240,131,0.3)]'
                  : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
              }`}
            >
              {t.contact.startConversation}
              <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="hidden lg:block h-8 w-full" aria-hidden="true" />
        </div>

        {/* ========================================================================= */}
        {/* Right Area: Form & Interactive Engineering (2 Columns)                    */}
        {/* ========================================================================= */}
        <form
          id="contact-form-inputs"
          onSubmit={handleFormSubmit}
          ref={formRef}
          className="lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-12 gap-y-10"
        >
          {/* ===================================================================== */}
          {/* COLUMN 1: Services Selection + Name + Email + Tell Us About It        */}
          {/* ===================================================================== */}
          <div className="flex flex-col gap-6">
            
            {/* 1.1 Multi-Select Services (What are we building?) */}
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

            {/* 1.2 Tell Us Your Name Input */}
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

            {/* 1.3 Your Email Input */}
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

            {/* 1.4 Tell Us About It (Message Textarea) */}
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

          </div>

          {/* ===================================================================== */}
          {/* COLUMN 2: Three Geometric Tier Selectors (Scope, Timeline, Budget)     */}
          {/* ===================================================================== */}
          <div className="flex flex-col gap-6">
            
            {/* ----------------------------------------------------------------- */}
            {/* 2.1 Scope Spool: How Big is the Idea? (Cinema Film Reel)           */}
            {/* ----------------------------------------------------------------- */}
            <div ref={ideaRowRef} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  {t.contact.howBig}
                </h3>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${
                    isNight
                      ? 'bg-[#fff083]/10 text-[#fff083] border-[#fff083]/30'
                      : 'bg-[#8f6b00]/10 text-[#8f6b00] border-[#8f6b00]/30'
                  }`}
                >
                  {isFa ? `سطح ${activeTier.numFa}` : `Tier ${activeTier.roman}`}
                </span>
              </div>

              {/* Interactive Row: Reel Disk + Draggable Track */}
              <div
                className={`flex items-center gap-3.5 sm:gap-4 p-3 rounded-2xl border transition-all ${
                  isNight
                    ? 'bg-neutral-900/90 border-white/10 shadow-lg'
                    : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                {/* 🎬 Vintage Cinema Film Reel Disk Button */}
                <button
                  type="button"
                  onClick={handleSpinFilmReel}
                  title={isFa ? 'چرخش دیسک فیلم و تعویض سطح ایده' : 'Spin film reel to advance tier'}
                  className={`relative w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 border cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
                    isNight
                      ? 'bg-neutral-950 border-[#fff083]/50 hover:border-[#fff083] shadow-[0_0_18px_rgba(255,240,131,0.25)]'
                      : 'bg-neutral-50 border-[#8f6b00]/50 hover:border-[#8f6b00] shadow-[0_0_18px_rgba(143,107,0,0.2)]'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: spinRotation }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center pointer-events-none"
                  >
                    <svg viewBox="0 0 48 48" className="w-full h-full block" fill="none">
                      {/* Heavy Outer Rim */}
                      <circle
                        cx="24"
                        cy="24"
                        r="21"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className={isNight ? 'stroke-[#fff083]' : 'stroke-[#8f6b00]'}
                      />
                      {/* Perforations Track */}
                      <circle
                        cx="24"
                        cy="24"
                        r="18.5"
                        stroke="currentColor"
                        strokeWidth="0.9"
                        strokeDasharray="2 2"
                        className={isNight ? 'stroke-white/40' : 'stroke-black/30'}
                      />
                      {/* 5 Ports */}
                      {[0, 72, 144, 216, 288].map((angle, i) => (
                        <g key={i} transform={`rotate(${angle} 24 24)`}>
                          <circle
                            cx="24"
                            cy="12"
                            r="4.2"
                            fill={isNight ? '#121212' : '#f0f0f0'}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className={isNight ? 'stroke-[#fff083]/80' : 'stroke-[#8f6b00]/80'}
                          />
                        </g>
                      ))}
                      {/* Inner Hub */}
                      <circle
                        cx="24"
                        cy="24"
                        r="7"
                        fill={isNight ? '#1a1a1a' : '#ffffff'}
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className={isNight ? 'stroke-[#fff083]' : 'stroke-[#8f6b00]'}
                      />
                      {/* Center Jewel */}
                      <circle cx="24" cy="24" r="2.6" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                    </svg>
                  </motion.div>
                  <span
                    className={`absolute -bottom-1 text-[7px] font-bold px-1.5 py-0.2 rounded-full border uppercase ${
                      isNight
                        ? 'bg-neutral-900 text-[#fff083] border-[#fff083]/40'
                        : 'bg-white text-[#8f6b00] border-[#8f6b00]/40'
                    }`}
                  >
                    REEL
                  </span>
                </button>

                {/* Alongside: Progress Bar */}
                <div className="flex-1 flex flex-col justify-center gap-1.5 select-none pr-1 pl-1">
                  <div className="flex justify-between items-center text-[10px] font-bold px-1">
                    {PROJECT_TIERS.map((tier) => {
                      const isCurrent = tier.id === selectedTier;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleSelectTier(tier.id)}
                          className={`cursor-pointer transition-colors p-1 focus:outline-none ${
                            isCurrent
                              ? isNight
                                ? 'text-[#fff083]'
                                : 'text-[#8f6b00]'
                              : 'text-neutral-400 opacity-60 hover:opacity-100'
                          }`}
                        >
                          {isFa ? tier.numFa : `0${tier.id + 1}`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Progress Track */}
                  <div
                    ref={trackRef}
                    onPointerDown={(e) => {
                      isDraggingRef.current = true;
                      try {
                        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                      } catch (_) {}
                      updateTierFromPointer(e.clientX);
                    }}
                    onPointerMove={(e) => {
                      if (!isDraggingRef.current) return;
                      updateTierFromPointer(e.clientX);
                    }}
                    onPointerUp={(e) => {
                      if (isDraggingRef.current) {
                        isDraggingRef.current = false;
                        try {
                          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                        } catch (_) {}
                      }
                    }}
                    className="relative h-6 flex items-center cursor-pointer touch-none"
                  >
                    <div
                      className={`w-full h-2 rounded-full relative overflow-hidden ${
                        isNight ? 'bg-neutral-800 border border-white/5' : 'bg-neutral-200 border border-black/5'
                      }`}
                    >
                      <motion.div
                        className={`absolute top-0 bottom-0 rounded-full ${
                          isNight
                            ? 'bg-gradient-to-r from-[#fff083]/50 via-[#fff083] to-[#fff083] shadow-[0_0_12px_rgba(255,240,131,0.6)]'
                            : 'bg-gradient-to-r from-[#8f6b00]/50 via-[#8f6b00] to-[#8f6b00]'
                        }`}
                        animate={{
                          width: `${(selectedTier / 3) * 100}%`,
                          right: isFa ? 0 : 'auto',
                          left: isFa ? 'auto' : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    </div>

                    {/* Spool Thumb */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                      style={{
                        [isFa ? 'right' : 'left']: `${(selectedTier / 3) * 100}%`,
                      }}
                      animate={{
                        [isFa ? 'right' : 'left']: `${(selectedTier / 3) * 100}%`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
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

                  <div className="flex justify-between items-center text-[9px] text-neutral-400 opacity-60 px-1 font-medium">
                    <span>{t.contact.small}</span>
                    <span>{t.contact.huge}</span>
                  </div>
                </div>
              </div>

              {/* Animated Explanation Card for Idea */}
              <AnimatePresence>
                {activeExplanation === 'idea' && (
                  <motion.div
                    key="idea-box"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`p-3.5 rounded-xl border transition-all relative ${
                        isNight
                          ? 'bg-neutral-900/90 border-[#fff083]/25 shadow-lg shadow-black/40'
                          : 'bg-white border-[#8f6b00]/25 shadow-md'
                      }`}
                    >
                      {/* Header with 4 Stages Selector & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold opacity-60">
                            {isFa ? 'مراحل ۴ گانه:' : '4 Stages:'}
                          </span>
                          <div className="flex items-center gap-1">
                            {PROJECT_TIERS.map((tier) => (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => handleSelectTier(tier.id)}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                                  tier.id === selectedTier
                                    ? isNight
                                      ? 'bg-[#fff083] text-black shadow-xs'
                                      : 'bg-[#8f6b00] text-white shadow-xs'
                                    : isNight
                                    ? 'bg-neutral-800 text-neutral-400 hover:text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:text-black'
                                }`}
                              >
                                {isFa ? tier.numFa : `0${tier.id + 1}`}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isNight ? 'bg-[#fff083]/15 text-[#fff083]' : 'bg-[#8f6b00]/12 text-[#8f6b00]'
                            }`}
                          >
                            {isFa ? activeTier.badgeFa : activeTier.badgeEn}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveExplanation(null)}
                            title={isFa ? 'بستن' : 'Close'}
                            className="w-5 h-5 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 text-xs transition-opacity cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold tracking-tight mb-1">
                        {isFa ? activeTier.titleFa : activeTier.titleEn}
                      </h4>
                      <p className={`text-xs leading-relaxed ${mutedGrayText}`}>
                        {isFa ? activeTier.flatteryFa : activeTier.flatteryEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* 2.2 Timeline Selector: Delivery Horizon (Lotus Bloom 🪷)          */}
            {/* ----------------------------------------------------------------- */}
            <div ref={timelineRowRef} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    {isFa ? 'زمان‌بندی مورد انتظار' : 'Expected Timeline'}
                  </h3>
                  <span className="text-[10px] opacity-60 font-medium">{isFa ? '(اختیاری)' : '(Optional)'}</span>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${
                    isNight
                      ? 'bg-[#fff083]/10 text-[#fff083] border-[#fff083]/30'
                      : 'bg-[#8f6b00]/10 text-[#8f6b00] border-[#8f6b00]/30'
                  }`}
                >
                  {isFa ? activeTimeline.labelFa : activeTimeline.labelEn}
                </span>
              </div>

              {/* Interactive Row: Lotus Bloom Icon + Draggable Track */}
              <div
                className={`flex items-center gap-3.5 sm:gap-4 p-3 rounded-2xl border transition-all ${
                  isNight
                    ? 'bg-neutral-900/90 border-white/10 shadow-lg'
                    : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                {/* 🪷 Interactive Lotus Bloom Icon Button */}
                <button
                  type="button"
                  onClick={handleSpinTimeline}
                  title={isFa ? 'کلیک جهت افزایش مرحله زمان‌بندی پروژه (شکوفایی نیلوفر آبی)' : 'Click to advance project timeline (Lotus Bloom)'}
                  className={`relative w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 border cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
                    isNight
                      ? 'bg-neutral-950 border-[#fff083]/50 hover:border-[#fff083] shadow-[0_0_18px_rgba(255,240,131,0.25)]'
                      : 'bg-neutral-50 border-[#8f6b00]/50 hover:border-[#8f6b00] shadow-[0_0_18px_rgba(143,107,0,0.2)]'
                  }`}
                >
                  <motion.div
                    key={`lotus-${selectedTimeline}`}
                    initial={{ scale: 0.88, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center pointer-events-none"
                  >
                    <LotusBloomIcon
                      tier={selectedTimeline}
                      isNight={isNight}
                      size="md"
                    />
                  </motion.div>
                  <span
                    className={`absolute -bottom-1 text-[7px] font-black px-1.5 py-0.2 rounded-full border uppercase tracking-wider ${
                      isNight
                        ? 'bg-neutral-900 text-[#fff083] border-[#fff083]/40'
                        : 'bg-white text-[#8f6b00] border-[#8f6b00]/40'
                    }`}
                  >
                    {LOTUS_BLOOM_META.subBadges[selectedTimeline]}
                  </span>
                </button>

                {/* Alongside: Progress Bar */}
                <div className="flex-1 flex flex-col justify-center gap-1.5 select-none pr-1 pl-1">
                  <div className="flex justify-between items-center text-[10px] font-bold px-1">
                    {TIMELINE_TIERS.map((tier) => {
                      const isCurrent = tier.id === selectedTimeline;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleSelectTimeline(tier.id)}
                          className={`cursor-pointer transition-colors p-1 focus:outline-none ${
                            isCurrent
                              ? isNight
                                ? 'text-[#fff083]'
                                : 'text-[#8f6b00]'
                              : 'text-neutral-400 opacity-60 hover:opacity-100'
                          }`}
                        >
                          {isFa ? tier.numFa : tier.numEn}
                        </button>
                      );
                    })}
                  </div>

                  {/* Progress Track */}
                  <div
                    ref={timelineTrackRef}
                    onPointerDown={(e) => {
                      isDraggingTimelineRef.current = true;
                      try {
                        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                      } catch (_) {}
                      updateTimelineFromPointer(e.clientX);
                    }}
                    onPointerMove={(e) => {
                      if (!isDraggingTimelineRef.current) return;
                      updateTimelineFromPointer(e.clientX);
                    }}
                    onPointerUp={(e) => {
                      if (isDraggingTimelineRef.current) {
                        isDraggingTimelineRef.current = false;
                        try {
                          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                        } catch (_) {}
                      }
                    }}
                    className="relative h-6 flex items-center cursor-pointer touch-none"
                  >
                    <div
                      className={`w-full h-2 rounded-full relative overflow-hidden ${
                        isNight ? 'bg-neutral-800 border border-white/5' : 'bg-neutral-200 border border-black/5'
                      }`}
                    >
                      <motion.div
                        className={`absolute top-0 bottom-0 rounded-full ${
                          isNight
                            ? 'bg-gradient-to-r from-[#fff083]/50 via-[#fff083] to-[#fff083] shadow-[0_0_12px_rgba(255,240,131,0.6)]'
                            : 'bg-gradient-to-r from-[#8f6b00]/50 via-[#8f6b00] to-[#8f6b00]'
                        }`}
                        animate={{
                          width: `${(selectedTimeline / 3) * 100}%`,
                          right: isFa ? 0 : 'auto',
                          left: isFa ? 'auto' : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    </div>

                    {/* Timeline Thumb */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                      style={{
                        [isFa ? 'right' : 'left']: `${(selectedTimeline / 3) * 100}%`,
                      }}
                      animate={{
                        [isFa ? 'right' : 'left']: `${(selectedTimeline / 3) * 100}%`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
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

                  <div className="flex justify-between items-center text-[9px] text-neutral-400 opacity-60 px-1 font-medium">
                    <span>{isFa ? '< ۱ ماه' : '< 1 Month'}</span>
                    <span>{isFa ? '> ۳ ماه' : '> 3 Months'}</span>
                  </div>
                </div>
              </div>

              {/* Animated Explanation Card for Timeline */}
              <AnimatePresence>
                {activeExplanation === 'timeline' && (
                  <motion.div
                    key="timeline-box"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`p-3.5 rounded-xl border transition-all relative ${
                        isNight
                          ? 'bg-neutral-900/90 border-[#fff083]/25 shadow-lg shadow-black/40'
                          : 'bg-white border-[#8f6b00]/25 shadow-md'
                      }`}
                    >
                      {/* Header with 4 Stages Selector & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold opacity-60">
                            {isFa ? 'مراحل ۴ گانه:' : '4 Stages:'}
                          </span>
                          <div className="flex items-center gap-1">
                            {TIMELINE_TIERS.map((tier) => (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => handleSelectTimeline(tier.id)}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                                  tier.id === selectedTimeline
                                    ? isNight
                                      ? 'bg-[#fff083] text-black shadow-xs'
                                      : 'bg-[#8f6b00] text-white shadow-xs'
                                    : isNight
                                    ? 'bg-neutral-800 text-neutral-400 hover:text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:text-black'
                                }`}
                              >
                                {isFa ? tier.numFa : tier.numEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isNight ? 'bg-[#fff083]/15 text-[#fff083]' : 'bg-[#8f6b00]/12 text-[#8f6b00]'
                            }`}
                          >
                            {isFa ? activeTimeline.badgeFa : activeTimeline.badgeEn}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveExplanation(null)}
                            title={isFa ? 'بستن' : 'Close'}
                            className="w-5 h-5 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 text-xs transition-opacity cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Lotus Metaphor Subtitle */}
                      <div className="text-[11px] font-medium mb-1.5 flex items-center gap-1.5">
                        <span className={accentText}>🪷 {LOTUS_BLOOM_META.subBadges[selectedTimeline]}</span>
                        <span className="opacity-40">•</span>
                        <span className="opacity-80">
                          {isFa ? LOTUS_BLOOM_META.stageLabelsFa[selectedTimeline] : LOTUS_BLOOM_META.stageLabelsEn[selectedTimeline]}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold tracking-tight mb-1">
                        {isFa ? activeTimeline.titleFa : activeTimeline.titleEn}
                      </h4>
                      <p className={`text-xs leading-relaxed ${mutedGrayText}`}>
                        {isFa ? activeTimeline.descFa : activeTimeline.descEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* 2.3 Budget Selector: Estimated Budget (Treasure Chest 🏴‍☠️💎)       */}
            {/* ----------------------------------------------------------------- */}
            <div ref={budgetRowRef} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    {isFa ? 'بودجه تخمینی پروژه' : 'Estimated Budget'}
                  </h3>
                  <span className="text-[10px] opacity-60 font-medium">{isFa ? '(اختیاری)' : '(Optional)'}</span>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${
                    isNight
                      ? 'bg-[#fff083]/10 text-[#fff083] border-[#fff083]/30'
                      : 'bg-[#8f6b00]/10 text-[#8f6b00] border-[#8f6b00]/30'
                  }`}
                >
                  {isFa ? activeBudget.labelFa : activeBudget.labelEn}
                </span>
              </div>

              {/* Interactive Row: Treasure Chest + Draggable Track */}
              <div
                className={`flex items-center gap-3.5 sm:gap-4 p-3 rounded-2xl border transition-all ${
                  isNight
                    ? 'bg-neutral-900/90 border-white/10 shadow-lg'
                    : 'bg-white border-black/10 shadow-sm'
                }`}
              >
                {/* 🏴‍☠️ Interactive Treasure Chest Icon Button */}
                <button
                  type="button"
                  onClick={handleSpinBudget}
                  title={isFa ? 'کلیک جهت افزایش سطح بودجه (صندوقچه گنج)' : 'Click to advance project budget tier (Treasure Chest)'}
                  className={`relative w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 border cursor-pointer select-none transition-transform duration-300 active:scale-95 ${
                    isNight
                      ? 'bg-neutral-950 border-[#fff083]/60 hover:border-[#fff083] shadow-[0_0_18px_rgba(255,240,131,0.25)]'
                      : 'bg-neutral-50 border-[#8f6b00]/60 hover:border-[#8f6b00] shadow-[0_0_18px_rgba(143,107,0,0.2)]'
                  }`}
                >
                  <motion.div
                    key={`treasure-${selectedBudget}`}
                    initial={{ scale: 0.88, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center pointer-events-none"
                  >
                    <TreasureChestIcon
                      tier={selectedBudget}
                      isNight={isNight}
                      size="md"
                    />
                  </motion.div>
                  <span
                    className={`absolute -bottom-1 text-[7px] font-black px-1.5 py-0.2 rounded-full border uppercase tracking-wider ${
                      isNight
                        ? 'bg-neutral-900 text-[#fff083] border-[#fff083]/40'
                        : 'bg-white text-[#8f6b00] border-[#8f6b00]/40'
                    }`}
                  >
                    {TREASURE_CHEST_META.subBadges[selectedBudget]}
                  </span>
                </button>

                {/* Alongside: Progress Bar */}
                <div className="flex-1 flex flex-col justify-center gap-1.5 select-none pr-1 pl-1">
                  <div className="flex justify-between items-center text-[10px] font-bold px-1">
                    {BUDGET_TIERS.map((tier) => {
                      const isCurrent = tier.id === selectedBudget;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleSelectBudget(tier.id)}
                          className={`cursor-pointer transition-colors p-1 focus:outline-none ${
                            isCurrent
                              ? isNight
                                ? 'text-[#fff083]'
                                : 'text-[#8f6b00]'
                              : 'text-neutral-400 opacity-60 hover:opacity-100'
                          }`}
                        >
                          {isFa ? tier.numFa : tier.numEn}
                        </button>
                      );
                    })}
                  </div>

                  {/* Progress Track */}
                  <div
                    ref={budgetTrackRef}
                    onPointerDown={(e) => {
                      isDraggingBudgetRef.current = true;
                      try {
                        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                      } catch (_) {}
                      updateBudgetFromPointer(e.clientX);
                    }}
                    onPointerMove={(e) => {
                      if (!isDraggingBudgetRef.current) return;
                      updateBudgetFromPointer(e.clientX);
                    }}
                    onPointerUp={(e) => {
                      if (isDraggingBudgetRef.current) {
                        isDraggingBudgetRef.current = false;
                        try {
                          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
                        } catch (_) {}
                      }
                    }}
                    className="relative h-6 flex items-center cursor-pointer touch-none"
                  >
                    <div
                      className={`w-full h-2 rounded-full relative overflow-hidden ${
                        isNight ? 'bg-neutral-800 border border-white/5' : 'bg-neutral-200 border border-black/5'
                      }`}
                    >
                      <motion.div
                        className={`absolute top-0 bottom-0 rounded-full ${
                          isNight
                            ? 'bg-gradient-to-r from-[#fff083]/50 via-[#fff083] to-[#fff083] shadow-[0_0_12px_rgba(255,240,131,0.6)]'
                            : 'bg-gradient-to-r from-[#8f6b00]/50 via-[#8f6b00] to-[#8f6b00]'
                        }`}
                        animate={{
                          width: `${(selectedBudget / 3) * 100}%`,
                          right: isFa ? 0 : 'auto',
                          left: isFa ? 'auto' : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    </div>

                    {/* Vault Thumb */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                      style={{
                        [isFa ? 'right' : 'left']: `${(selectedBudget / 3) * 100}%`,
                      }}
                      animate={{
                        [isFa ? 'right' : 'left']: `${(selectedBudget / 3) * 100}%`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
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

                  <div className="flex justify-between items-center text-[9px] text-neutral-400 opacity-60 px-1 font-medium">
                    <span>{isFa ? '< ۵۰ م' : '< 50M'}</span>
                    <span>{isFa ? '> ۵۰۰ م' : '> 500M'}</span>
                  </div>
                </div>
              </div>

              {/* Animated Explanation Card for Budget */}
              <AnimatePresence>
                {activeExplanation === 'budget' && (
                  <motion.div
                    key="budget-box"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`p-3.5 rounded-xl border transition-all relative ${
                        isNight
                          ? 'bg-neutral-900/90 border-[#fff083]/25 shadow-lg shadow-black/40'
                          : 'bg-white border-[#8f6b00]/25 shadow-md'
                      }`}
                    >
                      {/* Header with 4 Stages Selector & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold opacity-60">
                            {isFa ? 'مراحل ۴ گانه:' : '4 Stages:'}
                          </span>
                          <div className="flex items-center gap-1">
                            {BUDGET_TIERS.map((tier) => (
                              <button
                                key={tier.id}
                                type="button"
                                onClick={() => handleSelectBudget(tier.id)}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                                  tier.id === selectedBudget
                                    ? isNight
                                      ? 'bg-[#fff083] text-black shadow-xs'
                                      : 'bg-[#8f6b00] text-white shadow-xs'
                                    : isNight
                                    ? 'bg-neutral-800 text-neutral-400 hover:text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:text-black'
                                }`}
                              >
                                {isFa ? tier.numFa : tier.numEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              isNight ? 'bg-[#fff083]/15 text-[#fff083]' : 'bg-[#8f6b00]/12 text-[#8f6b00]'
                            }`}
                          >
                            {isFa ? activeBudget.badgeFa : activeBudget.badgeEn}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveExplanation(null)}
                            title={isFa ? 'بستن' : 'Close'}
                            className="w-5 h-5 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 text-xs transition-opacity cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Treasure Metaphor Subtitle */}
                      <div className="text-[11px] font-medium mb-1.5 flex items-center gap-1.5">
                        <span className={accentText}>🏴‍☠️ {TREASURE_CHEST_META.subBadges[selectedBudget]}</span>
                        <span className="opacity-40">•</span>
                        <span className="opacity-80">
                          {isFa ? TREASURE_CHEST_META.stageLabelsFa[selectedBudget] : TREASURE_CHEST_META.stageLabelsEn[selectedBudget]}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold tracking-tight mb-1">
                        {isFa ? activeBudget.titleFa : activeBudget.titleEn}
                      </h4>
                      <p className={`text-xs leading-relaxed ${mutedGrayText}`}>
                        {isFa ? activeBudget.descFa : activeBudget.descEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* Submit Action Button                                              */}
            {/* ----------------------------------------------------------------- */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 lg:px-12 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 w-full cursor-pointer shadow-lg active:scale-95 disabled:opacity-60 ${
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
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                      isNight
                        ? 'bg-[#fff083]/15 border-[#fff083]/40 text-white'
                        : 'bg-[#8f6b00]/15 border-[#8f6b00]/40 text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
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
                      className="underline font-bold text-[11px] opacity-80 hover:opacity-100"
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
