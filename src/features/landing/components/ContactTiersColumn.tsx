import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TreasureChestIcon,
  TREASURE_CHEST_META,
} from './BudgetIconConcepts';
import {
  LotusBloomIcon,
  LOTUS_BLOOM_META,
} from './TimelineIconConcepts';
import {
  CelestialAstrolabeIcon,
  ASTROLABE_META,
} from './IdeaIconConcepts';
import { SteampunkDialButton } from './SteampunkDialButton';

/* =========================================================================
   1. IDEA SCOPE TIERS
   ========================================================================= */
export interface ProjectTier {
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

export const PROJECT_TIERS: ProjectTier[] = [
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
export interface TimelineTier {
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

export const TIMELINE_TIERS: TimelineTier[] = [
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
export interface BudgetTier {
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

export const BUDGET_TIERS: BudgetTier[] = [
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

interface ContactTiersColumnProps {
  isNight: boolean;
  isFa: boolean;
  accentText: string;
  mutedGrayText: string;
  t: {
    contact: {
      howBig: string;
      small: string;
      huge: string;
    };
  };
  onTierChange?: (tier: number) => void;
  onTimelineChange?: (timeline: number) => void;
  onBudgetChange?: (budget: number) => void;
}

export function ContactTiersColumn({
  isNight,
  isFa,
  accentText,
  mutedGrayText,
  t,
  onTierChange,
  onTimelineChange,
  onBudgetChange,
}: ContactTiersColumnProps) {
  // References for drag tracks
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingTimelineRef = useRef(false);

  const budgetTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingBudgetRef = useRef(false);

  // 1. Idea Scope Tier & Celestial Astrolabe State
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [spinRotation, setSpinRotation] = useState<number>(0);

  // 2. Timeline Tier State (Lotus Bloom)
  const [selectedTimeline, setSelectedTimeline] = useState<number>(1);

  // 3. Budget Tier State (Treasure Chest)
  const [selectedBudget, setSelectedBudget] = useState<number>(1);

  // 4. Interactive Explanation Box State ('idea' | 'timeline' | 'budget' | null)
  const [activeExplanation, setActiveExplanation] = useState<'idea' | 'timeline' | 'budget' | null>(null);

  // Refs for the three interactive rows to detect outside interactions
  const ideaRowRef = useRef<HTMLDivElement>(null);
  const timelineRowRef = useRef<HTMLDivElement>(null);
  const budgetRowRef = useRef<HTMLDivElement>(null);

  // Close explanation boxes when clicking anywhere outside the 3 rows
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

  const ROTATION_PER_TIER = 216;

  // Handlers for Scope (Celestial Astrolabe)
  const handleSelectTier = (newTier: number) => {
    setActiveExplanation('idea');
    if (newTier === selectedTier) return;
    const diff = newTier - selectedTier;
    setSpinRotation((prev) => prev + diff * ROTATION_PER_TIER);
    setSelectedTier(newTier);
    onTierChange?.(newTier);
  };

  const handleSpinAstrolabe = () => {
    setActiveExplanation('idea');
    setSpinRotation((prev) => prev + ROTATION_PER_TIER);
    setSelectedTier((prev) => {
      const next = (prev + 1) % PROJECT_TIERS.length;
      onTierChange?.(next);
      return next;
    });
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
          onTierChange?.(newTier);
          return newTier;
        }
        return prevTier;
      });
    },
    [isFa, onTierChange]
  );

  // Handlers for Timeline (Lotus Bloom)
  const handleSelectTimeline = (newTimeline: number) => {
    setActiveExplanation('timeline');
    if (newTimeline === selectedTimeline) return;
    setSelectedTimeline(newTimeline);
    onTimelineChange?.(newTimeline);
  };

  const handleSpinTimeline = () => {
    setActiveExplanation('timeline');
    setSelectedTimeline((prev) => {
      const next = (prev + 1) % TIMELINE_TIERS.length;
      onTimelineChange?.(next);
      return next;
    });
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
      onTimelineChange?.(newTimeline);
    },
    [isFa, onTimelineChange]
  );

  // Handlers for Budget (Treasure Chest)
  const handleSelectBudget = (newBudget: number) => {
    setActiveExplanation('budget');
    if (newBudget === selectedBudget) return;
    setSelectedBudget(newBudget);
    onBudgetChange?.(newBudget);
  };

  const handleSpinBudget = () => {
    setActiveExplanation('budget');
    setSelectedBudget((prev) => {
      const next = (prev + 1) % BUDGET_TIERS.length;
      onBudgetChange?.(next);
      return next;
    });
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
      onBudgetChange?.(newBudget);
    },
    [isFa, onBudgetChange]
  );

  const activeTier = PROJECT_TIERS[selectedTier];
  const activeTimeline = TIMELINE_TIERS[selectedTimeline];
  const activeBudget = BUDGET_TIERS[selectedBudget];

  return (
    <div className="flex flex-col gap-6">
      
      {/* ----------------------------------------------------------------- */}
      {/* 1.1 Scope Spool: How Big is the Idea? (Celestial Astrolabe)       */}
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

        {/* Interactive Row: Steampunk Dial Button + Draggable Track */}
        <div
          className={`flex items-center gap-3.5 sm:gap-4 p-3 rounded-2xl border transition-all ${
            isNight
              ? 'bg-neutral-900/90 border-white/10 shadow-lg'
              : 'bg-white border-black/10 shadow-sm'
          }`}
        >
          {/* 🔭 Steampunk Dial Button with Rotating Dotted Border */}
          <SteampunkDialButton
            onClick={handleSpinAstrolabe}
            title={isFa ? 'چرخش اسطرلاب و تعویض سطح ایده' : 'Spin astrolabe to advance idea tier'}
            subBadge={ASTROLABE_META.subBadge}
            isNight={isNight}
            tier={selectedTier}
          >
            <CelestialAstrolabeIcon
              tier={selectedTier}
              isNight={isNight}
              spinRotation={spinRotation}
            />
          </SteampunkDialButton>

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
                {/* Header with Badge on Left & Close Button on Right */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
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
      {/* 1.2 Timeline Selector: Delivery Horizon (Lotus Bloom 🪷)          */}
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
          {/* 🪷 Interactive Lotus Bloom Icon Button with Rotating Dotted Border */}
          <SteampunkDialButton
            onClick={handleSpinTimeline}
            title={isFa ? 'کلیک جهت افزایش مرحله زمان‌بندی پروژه (شکوفایی نیلوفر آبی)' : 'Click to advance project timeline (Lotus Bloom)'}
            subBadge={LOTUS_BLOOM_META.subBadges[selectedTimeline]}
            isNight={isNight}
            tier={selectedTimeline}
          >
            <motion.div
              key={`lotus-${selectedTimeline}`}
              initial={{ scale: 0.88, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full h-full flex items-center justify-center pointer-events-none"
            >
              <LotusBloomIcon
                tier={selectedTimeline}
                isNight={isNight}
                size="md"
              />
            </motion.div>
          </SteampunkDialButton>

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
                {/* Header with Badge on Left & Close Button on Right */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
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
      {/* 1.3 Budget Selector: Estimated Budget (Treasure Chest 🏴‍☠️💎)       */}
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
          {/* 🏴‍☠️ Interactive Treasure Chest Icon Button with Rotating Dotted Border */}
          <SteampunkDialButton
            onClick={handleSpinBudget}
            title={isFa ? 'کلیک جهت افزایش سطح بودجه (صندوقچه گنج)' : 'Click to advance project budget tier (Treasure Chest)'}
            subBadge={TREASURE_CHEST_META.subBadges[selectedBudget]}
            isNight={isNight}
            tier={selectedBudget}
          >
            <motion.div
              key={`treasure-${selectedBudget}`}
              initial={{ scale: 0.88, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full h-full flex items-center justify-center pointer-events-none"
            >
              <TreasureChestIcon
                tier={selectedBudget}
                isNight={isNight}
                size="md"
              />
            </motion.div>
          </SteampunkDialButton>

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
                {/* Header with Badge on Left & Close Button on Right */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
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

    </div>
  );
}
