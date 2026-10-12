import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { PageHeader } from '../components/layout/PageHeader';

interface ProjectTier {
  id: number;
  roman: string;
  numFa: string;
  numEn: string;
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
    numEn: '01',
    badgeFa: '⚡ تیز و لیزری (Laser Focus)',
    badgeEn: '⚡ LASER FOCUS',
    titleFa: 'سنگ بنای چابک و متمرکز',
    titleEn: 'Lean & Surgical Launchpad',
    flatteryFa:
      'بهترین استراتژی دنیا مال آدم‌های باهوشیه که اول با دقت و چابکی تیر رو دقیق به هدف می‌زنن؛ ما هسته پروژه‌ت رو مثل الماس برات تراش می‌دیم!',
    flatteryEn:
      'Smart pioneers test the waters with surgical precision; we will polish your core project vision into an indestructible diamond.',
  },
  {
    id: 1,
    roman: 'II',
    numFa: '۰۲',
    numEn: '02',
    badgeFa: '🚀 موتور توربو (High Gear)',
    badgeEn: '🚀 HIGH GEAR',
    titleFa: 'معماری رشد و تسخیر بازار',
    titleEn: 'Growth Architecture & Traction',
    flatteryFa:
      'پروژه‌ای که به این مرحله رسیده آماده پروازه؛ سیستم و خروجی‌ای برات پیاده می‌کنیم که مخاطب‌هات رو شیفته و رقبات رو مات و مبهوت کنه!',
    flatteryEn:
      'A project at this stage is primed to soar; we will engineer a complete outcome that turns audiences into believers and leaves rivals in awe.',
  },
  {
    id: 2,
    roman: 'III',
    numFa: '۰۳',
    numEn: '03',
    badgeFa: '💎 شاهکار وحشی (Beast Mode)',
    badgeEn: '💎 BEAST MODE',
    titleFa: 'تجربه غوطه‌ور و اثر متمایز',
    titleEn: 'Immersive Craft & Distinction',
    flatteryFa:
      'پروژه‌ای با این جاه‌طلبی لیاقت یک امضای هنری و ساختاری بی‌همتا رو داره؛ خروجی‌ای خلق می‌کنیم که کل مارکت انگشت‌به‌دهن بمونه و تا سال‌ها نقل محافل باشه!',
    flatteryEn:
      'Ambition of this caliber demands pure artisanal glory; we will engineer a benchmark that sets the gold standard for your entire domain.',
  },
  {
    id: 3,
    roman: 'IV',
    numFa: '۰۴',
    numEn: '04',
    badgeFa: '🔥 دیوانه‌وار و تاریخ‌ساز (Insane Scale)',
    badgeEn: '🔥 INSANE SCALE',
    titleFa: 'اکوسیستم تاریخی و پرچمدار صنف',
    titleEn: 'Monumental Flagship Legacy',
    flatteryFa:
      'شما داری قواعد این بازی رو از نو بازنویسی می‌کنی؛ جیرجیرک با تمام دپارتمان‌ها و تمام قوا کنارت می‌ایسته تا با هم یک اثر تاریخی و ماندگار خلق کنیم!',
    flatteryEn:
      'You are rewriting the rules of the entire landscape; our full multidisciplinary atelier unites with you to engrave a permanent historic monument.',
  },
];

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
    titleFa: 'طراحی وب',
    titleEn: 'Web Design',
    descFa: 'وب‌سایت‌های آوانگارد، تعاملی و پرفورمنس‌بالا',
    descEn: 'Avant-garde, interactive & high-performance websites',
  },
  {
    id: 'ui-ux',
    titleFa: 'طراحی UI/UX',
    titleEn: 'UI/UX Design',
    descFa: 'معماری سیستم‌های پیچیده با کاربری بی‌نقص',
    descEn: 'Design systems & intuitive product experiences',
  },
  {
    id: 'seo-analytics',
    titleFa: 'سئو و تحلیل داده',
    titleEn: 'SEO & Analytics',
    descFa: 'رشد ارگانیک پایدار و مهندسی داده‌های ترافیک',
    descEn: 'Organic discovery architecture & analytics',
  },
  {
    id: 'digital-marketing',
    titleFa: 'دیجیتال مارکتینگ و رشد',
    titleEn: 'Digital Marketing & Growth',
    descFa: 'کمپین‌های هدفمند با بازگشت سرمایه واقعی',
    descEn: 'Precision growth engines & creative campaigns',
  },
  {
    id: 'content-creation',
    titleFa: 'تولید محتوا',
    titleEn: 'Content Creation',
    descFa: 'روایت‌گری هویت، متن‌های عمیق و رسانه اختصاصی',
    descEn: 'Brand narrative, editorial craft & visuals',
  },
  {
    id: 'branding-identity',
    titleFa: 'برندینگ و هویت بصری',
    titleEn: 'Branding & Visual Identity',
    descFa: 'هویت یکپارچه، لوگوتایپ و زبان طراحی پایدار',
    descEn: 'Distinctive visual language & iconic identities',
  },
  {
    id: 'graphic-design',
    titleFa: 'طراحی گرافیک',
    titleEn: 'Graphic Design',
    descFa: 'آرت‌ورک، پوستر، پکیجینگ و تصویرسازی‌های مدرن',
    descEn: 'Art direction, packaging & refined assets',
  },
  {
    id: 'something-weird',
    titleFa: 'ایده‌ای عجیب و دیوانه‌وار',
    titleEn: 'Something weird and insane',
    descFa: 'تجارب سه‌بعدی، بازی‌های تجربی و ناشناخته‌ها',
    descEn: 'Spatial 3D, wild experiments & radical ideas',
  },
];

interface FaqItem {
  qFa: string;
  qEn: string;
  aFa: string;
  aEn: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    qFa: 'فرآیند همکاری با استودیو جیرجیرک چگونه آغاز می‌شود؟',
    qEn: 'How does the collaboration process begin?',
    aFa: 'پس از ارسال فرم، نیازمندی‌های اولیه شما توسط تیم بررسی شده و حداکثر ظرف ۲۴ ساعت کاری، جهت هماهنگی جلسه کشف آنلاین (Discovery Session) با شما تماس می‌گیریم. در این جلسه ابعاد، زمان‌بندی و اهداف شفاف بررسی می‌شوند.',
    aEn: 'After submitting the brief, our team conducts a focused review within 24 business hours. We then schedule a 30-minute discovery call to map exact requirements, timelines, and technical benchmarks.',
  },
  {
    qFa: 'نحوه برآورد هزینه و قیمت‌گذاری پروژه‌ها به چه صورت است؟',
    qEn: 'How do you price and estimate projects?',
    aFa: 'ما برای هر پروژه بسته به اسکوپ، دپارتمان‌های درگیر و سطح عمق فنی/هنری، پروپوزال شفاف با هزینه ثابت یا قرارداد فازبندی‌شده ارائه می‌دهیم. هیچ هزینه پنهانی وجود ندارد و شفافیت کامل اولویت ماست.',
    aEn: 'Every engagement receives a transparent fixed-scope or milestone-based proposal tailored to your tier and domain complexity. We operate with zero hidden costs.',
  },
  {
    qFa: 'آیا برای حفظ محرمانگی ایده و اطلاعات قرارداد NDA منعقد می‌شود؟',
    qEn: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    aFa: 'بله، امنیت داده‌ها و حق مالکیت فکری ایده شما در بالاترین درجه اهمیت قرار دارد و پیش از دریافت اسناد فنی، قرارداد رسمی حفظ محرمانگی امضا خواهد شد.',
    aEn: 'Absolutely. Intellectual property and confidentiality are paramount. We routinely execute mutual NDAs prior to in-depth technical disclosures.',
  },
  {
    qFa: 'آیا پس از تحویل پروژه، خدمات پشتیبانی و توسعه مداوم ارائه می‌دهید؟',
    qEn: 'Do you offer ongoing support and retainer partnerships?',
    aFa: 'قطعاً. ما معتقدیم محصول دیجیتال زنده است؛ از این رو بسته‌های پشتیبانی دوره‌ای، بهینه‌سازی سئو، مانیتورینگ عملکرد و قراردادهای ریتینر اختصاصی در دسترس است.',
    aEn: 'Digital products are living organisms. We provide structured post-launch SLAs, performance monitoring, continuous design sprints, and boutique retainer arrangements.',
  },
];

/** Convert numbers to Persian digits if Persian language is active, otherwise keep English digits */
function toPersianDigits(val: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(val).replace(/\d/g, (d) => farsiDigits[parseInt(d, 10)]);
}

export default function Contact() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // Helper for localized numbers
  const num = (val: number | string) => (isFa ? toPersianDigits(val) : String(val));

  // Multi-select services state
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-design', 'branding-identity']);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Tier selection & Vintage Film Reel rotation state
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [spinRotation, setSpinRotation] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Rotation constant aligned with 5-port cinema film reel
  const ROTATION_PER_TIER = 216;

  const handleSelectTier = (newTier: number) => {
    if (newTier === selectedTier) return;
    const diff = newTier - selectedTier;
    setSpinRotation((prev) => prev + diff * ROTATION_PER_TIER);
    setSelectedTier(newTier);
  };

  const handleSpinFilmReel = () => {
    setSpinRotation((prev) => prev + ROTATION_PER_TIER);
    setSelectedTier((prev) => (prev + 1) % PROJECT_TIERS.length);
  };

  const updateTierFromPointer = useCallback(
    (clientX: number) => {
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
    },
    [isFa]
  );

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

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';
  const activeTier = PROJECT_TIERS[selectedTier];
  const mutedGrayText = isNight ? 'text-neutral-400' : 'text-neutral-600';

  const lenis = useLenis();

  const handleScrollToForm = () => {
    if (lenis) {
      lenis.scrollTo('#configure-brief', { offset: -30, duration: 1.2 });
    } else {
      const el = document.getElementById('configure-brief');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaElement = (
    <button
      type="button"
      onClick={handleScrollToForm}
      className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow-xl select-none ${
        isNight
          ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_28px_rgba(255,240,131,0.4)]'
          : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_20px_rgba(143,107,0,0.3)]'
      }`}
    >
      {isFa ? 'شروع کنیم' : 'Start Building'}
    </button>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* 🏛️ 1. Full 100vh Hero Header with Clean Minimalist CTA */}
      <PageHeader
        fullHeight={true}
        badge={isFa ? 'تماس با ما' : 'CONTACT'}
        titleLine1={isFa ? 'شروع یک پروژه.' : 'Start a Project.'}
        titleLine2={isFa ? 'بیایید بسازیمش.' : "Let's Build It."}
        subtitle={
          isFa
            ? 'ایده، چالش یا پروژه‌ای در ذهن دارید؟ بیشتر از آنچه به دنبالش هستید برایمان بنویسید، در سریع‌ترین زمان ممکن با شما در تماس خواهیم بود.'
            : "Have an idea, a challenge, or a project in mind? Tell us more about what you're looking for, and we'll get back to you as soon as possible."
        }
        breadcrumb={[
          {
            label: isFa ? 'تماس با ما' : 'Contact',
          },
        ]}
        cta={ctaElement}
      />

      {/* 📐 2. Main Two-Column Master Layout */}
      <div id="configure-brief" className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN (lg:col-span-7 / 8): The Complete Interactive Configurator & Form
             ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12">
            
            {/* Step 1 Header: Choose Services */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                      isNight
                        ? 'border-[#fff083] text-[#fff083] bg-[#fff083]/10'
                        : 'border-[#8f6b00] text-[#8f6b00] bg-[#8f6b00]/10'
                    }`}
                  >
                    {isFa ? '۱' : '1'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {isFa ? 'انتخاب حوزه‌ها و خدمات مورد نیاز' : 'Select Project Disciplines'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {num(selectedServices.length)} {isFa ? 'مورد انتخاب شده' : 'selected'}
                </span>
              </div>
              <p className={`text-sm leading-relaxed mb-6 ${mutedGrayText}`}>
                {isFa
                  ? 'می‌توانید یک یا چند دپارتمان را برای همکاری جامع انتخاب کنید:'
                  : 'Select one or multiple disciplines tailored to your roadmap:'}
              </p>

              {/* Multi-Select Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer select-none group flex items-start gap-3.5 ${
                        isSelected
                          ? isNight
                            ? 'bg-[#fff083]/10 border-[#fff083]/50 text-white shadow-[0_0_20px_rgba(255,240,131,0.08)]'
                            : 'bg-[#8f6b00]/8 border-[#8f6b00]/40 text-neutral-900 shadow-sm'
                          : isNight
                          ? 'bg-neutral-900/50 border-white/8 hover:border-white/20 text-neutral-300 hover:bg-neutral-900/90'
                          : 'bg-white/80 border-black/8 hover:border-black/20 text-neutral-700 hover:bg-white shadow-2xs'
                      }`}
                    >
                      {/* Checkbox indicator */}
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                          isSelected
                            ? isNight
                              ? 'bg-[#fff083] border-[#fff083] text-neutral-950 shadow-[0_0_10px_rgba(255,240,131,0.4)]'
                              : 'bg-[#8f6b00] border-[#8f6b00] text-white shadow-[0_0_8px_rgba(143,107,0,0.3)]'
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

                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-bold mb-1 transition-colors ${
                            isSelected
                              ? isNight
                                ? 'text-white'
                                : 'text-neutral-950'
                              : 'text-neutral-300 group-hover:text-white dark:group-hover:text-white'
                          }`}
                        >
                          {isFa ? service.titleFa : service.titleEn}
                        </div>
                        <div
                          className={`text-xs line-clamp-1 ${
                            isSelected ? mutedGrayText : 'text-neutral-500'
                          }`}
                        >
                          {isFa ? service.descFa : service.descEn}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Interactive 4-Tier Project Scope & Vintage Film Reel */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isNight
                  ? 'bg-neutral-900/60 border-white/10 shadow-xl'
                  : 'bg-white border-black/10 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                      isNight
                        ? 'border-[#fff083] text-[#fff083] bg-[#fff083]/10'
                        : 'border-[#8f6b00] text-[#8f6b00] bg-[#8f6b00]/10'
                    }`}
                  >
                    {isFa ? '۲' : '2'}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">
                    {t.contact.howBig}
                  </h3>
                </div>

                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${
                    isNight
                      ? 'bg-[#fff083]/10 text-[#fff083] border-[#fff083]/30'
                      : 'bg-[#8f6b00]/10 text-[#8f6b00] border-[#8f6b00]/30'
                  }`}
                >
                  {isFa ? `سطح ${activeTier.numFa}` : `Tier ${activeTier.numEn}`}
                </span>
              </div>

              <p className={`text-sm mb-6 ${mutedGrayText}`}>
                {isFa
                  ? 'روی دیسک فیلم ریل کلیک کنید یا اسلایدر را جا‌به‌جا نمایید تا مقیاس، روح و جاه‌طلبی پروژه‌تان را مشخص کنید:'
                  : 'Click the cinema reel disk or drag along the track to dial in your ambition:'}
              </p>

              {/* Film Reel + Draggable Track Row */}
              <div
                className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border transition-all mb-6 ${
                  isNight
                    ? 'bg-neutral-950/80 border-white/10 shadow-inner'
                    : 'bg-neutral-50 border-black/8 shadow-inner'
                }`}
              >
                {/* 🎬 Vintage Cinema Film Reel Disk Button */}
                <button
                  type="button"
                  onClick={handleSpinFilmReel}
                  title={
                    isFa
                      ? 'برای چرخش دیسک فیلم و تعویض سطح کلیک کنید'
                      : 'Click to spin cinema film reel & advance tier'
                  }
                  className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shrink-0 border cursor-pointer select-none transition-transform duration-300 active:scale-95 group ${
                    isNight
                      ? 'bg-neutral-950 border-[#fff083]/50 hover:border-[#fff083] shadow-[0_0_20px_rgba(255,240,131,0.25)]'
                      : 'bg-white border-[#8f6b00]/50 hover:border-[#8f6b00] shadow-[0_0_20px_rgba(143,107,0,0.2)]'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: spinRotation }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 48 48" className="w-full h-full overflow-visible" fill="none">
                      <circle
                        cx="24"
                        cy="24"
                        r="21"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className={isNight ? 'stroke-[#fff083]' : 'stroke-[#8f6b00]'}
                      />
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
                          <circle
                            cx="24"
                            cy="12"
                            r="4.2"
                            fill={isNight ? '#121212' : '#f0f0f0'}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className={isNight ? 'stroke-[#fff083]/80' : 'stroke-[#8f6b00]/80'}
                          />
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

                      {/* Center Hub */}
                      <circle
                        cx="24"
                        cy="24"
                        r="7"
                        fill={isNight ? '#1a1a1a' : '#ffffff'}
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className={isNight ? 'stroke-[#fff083]' : 'stroke-[#8f6b00]'}
                      />
                      <circle cx="24" cy="20.2" r="1.1" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                      <circle cx="20.7" cy="25.8" r="1.1" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                      <circle cx="27.3" cy="25.8" r="1.1" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                      <circle cx="24" cy="24" r="2.6" className={isNight ? 'fill-[#fff083]' : 'fill-[#8f6b00]'} />
                      <circle cx="24" cy="24" r="1" fill="#ffffff" />
                    </svg>
                  </motion.div>

                  <span
                    className={`absolute -bottom-1 text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full border shadow-sm uppercase ${
                      isNight
                        ? 'bg-neutral-900 text-[#fff083] border-[#fff083]/40'
                        : 'bg-white text-[#8f6b00] border-[#8f6b00]/40'
                    }`}
                  >
                    REEL
                  </span>
                </button>

                {/* Alongside: Click & Drag Progress Bar with Checkpoints */}
                <div className="flex-1 flex flex-col justify-center gap-2 select-none pr-1 pl-1">
                  {/* Milestones row with localized numbers */}
                  <div className="flex justify-between items-center text-xs font-mono font-bold px-1">
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
                                ? 'text-[#fff083] font-black'
                                : 'text-[#8f6b00] font-black'
                              : 'text-neutral-400 opacity-60 hover:opacity-100'
                          }`}
                        >
                          {isFa ? tier.numFa : tier.numEn}
                        </button>
                      );
                    })}
                  </div>

                  {/* Draggable & Clickable Track */}
                  <div
                    ref={trackRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="relative h-7 flex items-center cursor-pointer touch-none"
                  >
                    <div
                      className={`w-full h-2.5 rounded-full relative overflow-hidden ${
                        isNight ? 'bg-neutral-800 border border-white/5' : 'bg-neutral-200 border border-black/5'
                      }`}
                    >
                      <motion.div
                        className={`absolute top-0 bottom-0 rounded-full ${
                          isNight
                            ? 'bg-gradient-to-r from-[#fff083]/50 via-[#fff083] to-[#fff083] shadow-[0_0_14px_rgba(255,240,131,0.7)]'
                            : 'bg-gradient-to-r from-[#8f6b00]/50 via-[#8f6b00] to-[#8f6b00]'
                        }`}
                        initial={false}
                        animate={{
                          width: `${(selectedTier / 3) * 100}%`,
                          right: isFa ? 0 : 'auto',
                          left: isFa ? 'auto' : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    </div>

                    {/* Checkpoints */}
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
                                  ? isNight
                                    ? 'bg-[#fff083]'
                                    : 'bg-[#8f6b00]'
                                  : isNight
                                  ? 'bg-neutral-700'
                                  : 'bg-neutral-300'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Gliding Spool Thumb */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                      style={{
                        [isFa ? 'right' : 'left']: `${(selectedTier / 3) * 100}%`,
                      }}
                      initial={false}
                      animate={{
                        [isFa ? 'right' : 'left']: `${(selectedTier / 3) * 100}%`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      <div
                        className={`w-5 h-5 -translate-x-1/2 rtl:translate-x-1/2 rounded-full border-2 shadow-md flex items-center justify-center transition-all ${
                          isNight
                            ? 'bg-neutral-950 border-[#fff083] shadow-[0_0_14px_#fff083]'
                            : 'bg-white border-[#8f6b00] shadow-[0_0_10px_rgba(143,107,0,0.4)]'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'}`} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Range labels */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 opacity-70 px-1">
                    <span>{t.contact.small}</span>
                    <span>{t.contact.huge}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Flattering Tier Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTier.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isNight
                      ? 'bg-neutral-950/70 border-white/10 shadow-sm'
                      : 'bg-white border-black/8 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                        isNight ? 'bg-[#fff083]/15 text-[#fff083]' : 'bg-[#8f6b00]/12 text-[#8f6b00]'
                      }`}
                    >
                      {isFa ? activeTier.badgeFa : activeTier.badgeEn}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold tracking-tight">
                      {isFa ? activeTier.titleFa : activeTier.titleEn}
                    </h4>
                  </div>
                  <p className={`text-sm leading-relaxed ${mutedGrayText}`}>
                    {isFa ? activeTier.flatteryFa : activeTier.flatteryEn}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step 3: Contact Inputs & Form Submission */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                    isNight
                      ? 'border-[#fff083] text-[#fff083] bg-[#fff083]/10'
                      : 'border-[#8f6b00] text-[#8f6b00] bg-[#8f6b00]/10'
                  }`}
                >
                  {isFa ? '۳' : '3'}
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  {isFa ? 'اطلاعات شما و شرح نیازمندی‌ها' : 'Your Details & Project Brief'}
                </h3>
              </div>

              {/* Input Grid: Name, Email, Phone/Telegram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider">
                    {isFa ? 'نام شما / سازمان' : 'Your Name / Org'} <span className={accentText}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isFa ? 'مثال: علیرضا رادمنش' : 'e.g. Elena Vance'}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all ${
                      isNight
                        ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                        : 'bg-white border-neutral-300 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider">
                    {isFa ? 'ایمیل کاری شما' : 'Work Email'} <span className={accentText}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all ${
                      isNight
                        ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                        : 'bg-white border-neutral-300 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                    }`}
                  />
                </div>

                {/* Phone / Telegram */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider">
                    {isFa ? 'تلفن همراه یا آیدی تلگرام' : 'Phone or Telegram'}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isFa ? '۰۹۱۲۰۰۰۰۰۰۰ یا @username' : '+1 (555) 000-0000 or @handle'}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all ${
                      isNight
                        ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500 focus:border-[#fff083]'
                        : 'bg-white border-neutral-300 text-brand-dark placeholder-neutral-400 focus:border-[#8f6b00]'
                    }`}
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider">
                  {t.contact.tellUs} <span className={accentText}>*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isFa
                      ? 'چالش اصلی شما چیست؟ چه نتیجه‌ای مد نظرتان است و زمان‌بندی تخمینی‌تان تا کجاست؟'
                      : 'Describe your vision, core challenge, target benchmarks, and estimated milestone timeline...'
                  }
                  className={`w-full p-4 border rounded-2xl text-sm resize-none focus:outline-none transition-all ${
                    isNight
                      ? 'bg-neutral-900 border-white/10 text-white focus:border-[#fff083] contact-scrollbar-night'
                      : 'bg-white border-neutral-300 text-brand-dark focus:border-[#8f6b00] contact-scrollbar-day'
                  }`}
                />
              </div>

              {/* Submit CTA & Status Notice */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className={`text-xs font-mono ${mutedGrayText}`}>
                  {isFa
                    ? '🔒 اطلاعات و ایده شما نزد استودیو جیرجیرک محفوظ خواهد ماند.'
                    : '🔒 Your idea and project details are held under strict confidentiality.'}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full sm:w-auto px-8 sm:px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95 ${
                    isNight
                      ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_24px_rgba(255,240,131,0.35)]'
                      : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_20px_rgba(143,107,0,0.3)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>{isFa ? 'در حال ارسال...' : 'Dispatching...'}</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{isFa ? 'پیام دریافت شد ✓' : 'Brief Received ✓'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.sendBtn}</span>
                      <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Submitted Feedback Notification Modal / Card */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isNight
                      ? 'bg-[#fff083]/10 border-[#fff083]/40 text-white'
                      : 'bg-[#8f6b00]/10 border-[#8f6b00]/40 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isNight ? 'bg-[#fff083] text-black' : 'bg-[#8f6b00] text-white'
                      }`}
                    >
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">
                        {isFa ? 'پیام شما با موفقیت به آتلیه جیرجیرک رسید!' : 'Brief Received at Jirjirak Atelier!'}
                      </h4>
                      <p className="text-xs opacity-80 mt-0.5">
                        {isFa
                          ? 'لید تیم نیازمندی‌های ارسالی را بررسی کرده و ظرف ۲۴ ساعت کاری با شما تماس می‌گیرد.'
                          : 'Our lead will review your scope and follow up within 24 business hours.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-bold border transition-colors cursor-pointer shrink-0 ${
                      isNight
                        ? 'border-white/20 hover:bg-white/10'
                        : 'border-black/20 hover:bg-black/5'
                    }`}
                  >
                    {isFa ? 'ارسال پیام جدید' : 'Send another brief'}
                  </button>
                </motion.div>
              )}
            </form>

          </div>

          {/* =========================================================================
              RIGHT COLUMN (lg:col-span-5 / 4): Studio Dossier & Direct Coordinates
             ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28">
            
            {/* Direct Studio Channels Card */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                isNight
                  ? 'bg-neutral-900/60 border-white/10 shadow-lg'
                  : 'bg-white border-black/10 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'}`} />
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest">
                  {isFa ? 'راه‌های ارتباط مستقیم' : 'Direct Coordinates'}
                </h3>
              </div>

              {/* Email Copier */}
              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-neutral-400 block mb-1">
                    {isFa ? 'ایمیل استودیو (سفارش و همکاری):' : 'Project Inquiries Email:'}
                  </span>
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      isNight ? 'bg-neutral-950 border-white/10' : 'bg-neutral-50 border-black/10'
                    }`}
                  >
                    <span className="font-mono text-xs sm:text-sm font-semibold select-all">
                      projects@jirjirak.studio
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail('projects@jirjirak.studio')}
                      className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer font-mono font-bold ${
                        copiedEmail
                          ? isNight
                            ? 'bg-[#fff083] text-black'
                            : 'bg-[#8f6b00] text-white'
                          : isNight
                          ? 'bg-white/10 hover:bg-white/20 text-white'
                          : 'bg-black/10 hover:bg-black/20 text-black'
                      }`}
                    >
                      {copiedEmail ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی' : 'Copy')}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-neutral-400 block mb-1">
                    {isFa ? 'تلگرام مستقیم مدیریت آتلیه:' : 'Direct Studio Telegram:'}
                  </span>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors group ${
                      isNight
                        ? 'bg-neutral-950 border-white/10 hover:border-[#fff083]/40'
                        : 'bg-neutral-50 border-black/10 hover:border-[#8f6b00]/40'
                    }`}
                  >
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      @jirjirak_studio
                    </span>
                    <span className={`text-xs font-mono ${accentText} group-hover:underline`}>
                      {isFa ? 'ارسال پیام ↗' : 'Message ↗'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Working Hours & Response Times with Localized Numbers */}
              <div
                className={`pt-6 border-t ${
                  isNight ? 'border-white/10' : 'border-black/10'
                } flex flex-col gap-3 text-xs`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">{isFa ? 'زمان پاسخ‌گویی معمول:' : 'Average Response Time:'}</span>
                  <span className="font-mono font-semibold">
                    {isFa ? `کمتر از ${toPersianDigits(24)} ساعت کاری` : '< 24 Business Hours'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">{isFa ? 'ساعات کاری آتلیه:' : 'Studio Hours:'}</span>
                  <span className="font-mono font-semibold">
                    {isFa ? `شنبه تا چهارشنبه، ${toPersianDigits('10:00')} الی ${toPersianDigits('18:00')}` : 'Sat – Wed, 10:00 – 18:00'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">{isFa ? 'موقعیت مرکزی:' : 'Studio Base:'}</span>
                  <span className="font-mono font-semibold">{isFa ? 'تهران، خیابان ولیعصر' : 'Tehran, Valiasr Ave.'}</span>
                </div>
              </div>
            </div>

            {/* The 3-Step Journey Card with Localized Step Numbers */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                isNight
                  ? 'bg-neutral-900/60 border-white/10'
                  : 'bg-white border-black/10'
              }`}
            >
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest mb-4">
                {isFa ? 'چه اتفاقی پس از ارسال می‌افتد؟' : 'What Happens Next?'}
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                      isNight ? 'bg-white/10 text-[#fff083]' : 'bg-black/10 text-[#8f6b00]'
                    }`}
                  >
                    {isFa ? '۱' : '1'}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">
                      {isFa ? `بررسی تخصصی در ${toPersianDigits(24)} ساعت` : '24h Technical Appraisal'}
                    </h4>
                    <p className={`text-xs mt-0.5 leading-relaxed ${mutedGrayText}`}>
                      {isFa
                        ? 'تیم فنی و طراحی شرایط، اهداف و هماهنگی ظرفیت استودیو را بررسی می‌کنند.'
                        : 'Core team inspects your benchmarks and studio resource alignment.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                      isNight ? 'bg-white/10 text-[#fff083]' : 'bg-black/10 text-[#8f6b00]'
                    }`}
                  >
                    {isFa ? '۲' : '2'}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">
                      {isFa ? `جلسه کشف ${toPersianDigits(30)} دقیقه‌ای` : '30-Min Discovery Session'}
                    </h4>
                    <p className={`text-xs mt-0.5 leading-relaxed ${mutedGrayText}`}>
                      {isFa
                        ? 'گفتگوی مستقیم برای تعیین ساختار، چالش‌ها و چشم‌انداز دقیق خروجی.'
                        : 'Focused video session to calibrate vision, scope, and technical stack.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                      isNight ? 'bg-white/10 text-[#fff083]' : 'bg-black/10 text-[#8f6b00]'
                    }`}
                  >
                    {isFa ? '۳' : '3'}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">{isFa ? 'پروپوزال و نقشه راه اختصاصی' : 'Tailored Scope & Roadmap'}</h4>
                    <p className={`text-xs mt-0.5 leading-relaxed ${mutedGrayText}`}>
                      {isFa
                        ? 'ارائه سند شفاف هزینه‌ها، زمان‌بندی دقیق فازها و قرارداد رسمی.'
                        : 'Clear milestone architecture, fixed commitments, and transparent terms.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Creed Mini Quote Card */}
            <div
              className={`p-6 rounded-3xl border relative overflow-hidden ${
                isNight
                  ? 'bg-gradient-to-br from-neutral-900 to-black border-white/10'
                  : 'bg-gradient-to-br from-neutral-50 to-neutral-100 border-black/10'
              }`}
            >
              <div
                className={`text-2xl font-serif font-black mb-2 opacity-30 ${
                  isNight ? 'text-[#fff083]' : 'text-[#8f6b00]'
                }`}
              >
                “
              </div>
              <p className={`text-xs italic leading-relaxed ${mutedGrayText}`}>
                {isFa
                  ? 'ما پروژه‌های بی‌شمار نمی‌پذیریم؛ در عوض روی هر اثری که انتخاب می‌کنیم، با تمام وسواس، روح و مهندسی دقیق پای کار می‌مانیم.'
                  : 'We refuse high-volume assembly lines. Every commission we undertake receives our obsessive multidisciplinary mastery.'}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold ${accentText}`}>
                  JIRJIRAK ATELIER
                </span>
                <span className="text-[10px] opacity-40 font-mono">
                  {isFa ? `• ${toPersianDigits(2026)}` : '• 2026'}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            3. BOTTOM SECTION: Frequently Asked Questions (FAQ) Accordion
           ========================================================================= */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-white/10 dark:border-black/10">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-widest block mb-2 ${accentText}`}
            >
              {isFa ? 'شفافیت و پاسخ به پرسش‌ها' : 'CLARITY & ENGAGEMENT'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {isFa ? 'پرسش‌های متداول پیش از آغاز همکاری' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isNight
                      ? isExpanded
                        ? 'bg-neutral-900 border-[#fff083]/40 shadow-md'
                        : 'bg-neutral-950/60 border-white/8 hover:border-white/15'
                      : isExpanded
                      ? 'bg-white border-[#8f6b00]/40 shadow-sm'
                      : 'bg-white/70 border-black/8 hover:border-black/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start cursor-pointer select-none"
                  >
                    <span className="text-sm sm:text-base font-bold">
                      {isFa ? item.qFa : item.qEn}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 text-xs transition-transform duration-300 ${
                        isExpanded
                          ? isNight
                            ? 'rotate-180 bg-[#fff083] text-black border-[#fff083]'
                            : 'rotate-180 bg-[#8f6b00] text-white border-[#8f6b00]'
                          : isNight
                          ? 'border-white/20 text-neutral-400'
                          : 'border-black/20 text-neutral-600'
                      }`}
                    >
                      ↓
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <div
                          className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                            isNight ? 'border-white/5 text-neutral-400' : 'border-black/5 text-neutral-600'
                          }`}
                        >
                          {isFa ? item.aFa : item.aEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
