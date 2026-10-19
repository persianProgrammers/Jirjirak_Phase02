import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import {
  Globe,
  Search,
  Palette,
  Sparkles,
  TrendingUp,
  Gamepad2,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface ConversionAccordionItem {
  id: string;
  slug: string;
  number: string;
  icon: any;
  questionEn: string;
  questionFa: string;
  painEn: string;
  painFa: string;
  solutionEn: string;
  solutionFa: string;
  deliverableEn: string;
  deliverableFa: string;
  deptEn: string;
  deptFa: string;
}

const ACCORDION_ITEMS: ConversionAccordionItem[] = [
  {
    id: 'web',
    slug: 'web-development',
    number: '01',
    icon: Globe,
    questionEn: 'Need a digital presence?',
    questionFa: 'به یک ویترین دیجیتال معتبر نیاز دارید؟',
    painEn: '“Our website feels slow, looks outdated, or visitors leave without ever converting.”',
    painFa: '«سایتمان کُند یا قدیمی است و لید یا فروش مناسبی جذب نمی‌کند.»',
    solutionEn: 'Website & High-Performance Web Systems',
    solutionFa: 'وب‌سایت اختصاصی و زیرساخت وب مدرن',
    deliverableEn: 'Fast bespoke website, responsive UX & robust scalable architecture.',
    deliverableFa: 'سرعت لود زیر یک ثانیه، طراحی واکنش‌گرا و تجربه کاربری روان.',
    deptEn: 'Web & Development',
    deptFa: 'دپارتمان وب و توسعه',
  },
  {
    id: 'seo',
    slug: 'seo-analytics',
    number: '02',
    icon: Search,
    questionEn: 'Need people to find you?',
    questionFa: 'می‌خواهید در گوگل دیده شوید؟',
    painEn: '“Nobody discovers us on Google search without pouring money into daily paid ads.”',
    painFa: '«در نتایج جستجو گم هستیم و بدون تبلیغات پرهزینه کلیکی ورودی ارگانیک نداریم.»',
    solutionEn: 'SEO & Organic Search Growth',
    solutionFa: 'سئو ساختاری و رشد ارگانیک در جستجو',
    deliverableEn: 'High-intent keywords, technical health & compounding organic traffic.',
    deliverableFa: 'ورودی دائمی خریداران از گوگل با سئو تکنیکال و معماری محتوا.',
    deptEn: 'SEO & Analytics',
    deptFa: 'دپارتمان سئو و تحلیل داده',
  },
  {
    id: 'branding',
    slug: 'branding-identity',
    number: '03',
    icon: Palette,
    questionEn: 'Need to become recognizable?',
    questionFa: 'می‌خواهید در بازار متمایز شوید و در ذهن بمانید؟',
    painEn: '“We look identical to competitors and customers fail to grasp our true value.”',
    painFa: '«ظاهرمان شبیه صدها رقیب است و مشتریان تمایز و ارزش کار ما را درک نمی‌کنند.»',
    solutionEn: 'Brand Positioning & Visual Identity',
    solutionFa: 'برندینگ استراتژیک و هویت بصری ماندگار',
    deliverableEn: 'Strategic positioning, memorable logo system & complete brand guidelines.',
    deliverableFa: 'استراتژی جایگاه‌یابی، طراحی لوگوی ماندگار و کتابچه هویت برند.',
    deptEn: 'Branding & Identity',
    deptFa: 'دپارتمان برندینگ و هویت',
  },
  {
    id: 'creative',
    slug: 'creative-studio',
    number: '04',
    icon: Sparkles,
    questionEn: 'Need something people remember?',
    questionFa: 'به محتوای ویدیویی و جذاب نیاز دارید؟',
    painEn: '“Static visuals get skipped in a second. We need motion and art that halts viewers.”',
    painFa: '«پست‌ها و بنرهای معمولی اسکرول می‌شوند؛ به آرت و موشن‌گرافیک‌های میخکوب‌کننده نیاز داریم.»',
    solutionEn: 'Cinematic Motion Design & Visual Art',
    solutionFa: 'موشن‌دیزاین سینمایی و هنر بصری چشم‌نواز',
    deliverableEn: 'Kinetic 2D/3D animation, custom illustration & scroll-stopping visuals.',
    deliverableFa: 'موشن‌گرافیک‌های ریتم‌دار و تصویرسازی‌های اختصاصی که پیام را سریع منتقل می‌کنند.',
    deptEn: 'Creative Studio',
    deptFa: 'استودیو خلاقیت و موشن',
  },
  {
    id: 'marketing',
    slug: 'digital-marketing',
    number: '05',
    icon: TrendingUp,
    questionEn: 'Need measurable growth?',
    questionFa: 'می‌خواهید بودجه تبلیغات به فروش تبدیل شود؟',
    painEn: '“Spending on marketing every month without predictable return on investment.”',
    painFa: '«برای بازاریابی هزینه می‌کنیم اما خروجی مشخص و بازگشت سرمایه شفافی نمی‌بینیم.»',
    solutionEn: 'Performance Marketing & Conversion Funnels',
    solutionFa: 'دیجیتال مارکتینگ عملکردمحور و قیف‌های تبدیل',
    deliverableEn: 'High-converting funnels, laser-targeted campaigns & clear ROI tracking.',
    deliverableFa: 'کمپین‌های هدفمند و بازگشت سرمایه شفاف برای هر ریال بودجه تبلیغات.',
    deptEn: 'Digital Marketing & Growth',
    deptFa: 'دپارتمان دیجیتال مارکتینگ',
  },
  {
    id: 'game',
    slug: 'game-interactive',
    number: '06',
    icon: Gamepad2,
    questionEn: 'Need an interactive experience?',
    questionFa: 'یک تجربه تعاملی و بازی‌گونه می‌خواهید؟',
    painEn: '“Flat web pages feel lifeless; we want users to immerse themselves and interact.”',
    painFa: '«صفحات وب ساده تکراری شده‌اند؛ می‌خواهیم مخاطب با محصول ما بازی و تعامل کند.»',
    solutionEn: '3D Web Spaces & Branded Mini-Games',
    solutionFa: 'بازی‌سازی و فضاهای سه‌بعدی وب',
    deliverableEn: 'Zero-install browser games, 3D product spaces & high-retention mechanics.',
    deliverableFa: 'فضاهای سه‌بعدی سبک در مرورگر و مینی‌گیم‌های اختصاصی با ماندگاری چندبرابری مخاطب.',
    deptEn: 'Game Studio & Interactive',
    deptFa: 'دپارتمان بازی‌سازی و تعاملی',
  },
  {
    id: 'academy',
    slug: 'academy-learning',
    number: '07',
    icon: GraduationCap,
    questionEn: 'Need your team to upskill?',
    questionFa: 'می‌خواهید تیمتان مهارت‌های روز را یاد بگیرد؟',
    painEn: '“Generic theoretical courses fail. Our in-house designers and coders need real studio skills.”',
    painFa: '«دوره‌های تئوری نتیجه نمی‌دهند؛ نیروهای داخلی ما به مهارت‌های عملیاتی و پروژه‌محور نیاز دارند.»',
    solutionEn: 'Enterprise Mentorship & Hands-on Workshops',
    solutionFa: 'آموزش سازمانی و منتورشیپ عملیاتی',
    deliverableEn: 'Hands-on masterclasses directly upskilling your team on live pipelines.',
    deliverableFa: 'کارگاه‌های عملی پروژه‌محور و توانمندسازی کامل نیروهای داخلی شما.',
    deptEn: 'Academy & Learning',
    deptFa: 'دپارتمان آموزش و آکادمی',
  },
];

export function WhatWeBuildSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const navigate = useNavigate();

  // Active expanded item id (defaults to first item)
  const [activeId, setActiveId] = useState<string>('web');

  // Color tokens matching CaseStudySection & JournalSection exactly
  const accentText = isNight ? 'text-[#8f6b00]' : 'text-[#fff083]';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0.9 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleItem = (id: string) => {
    setActiveId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="world"
      ref={containerRef}
      className={`py-28 sm:py-32 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Consistent Section Header (1/3 Width)                       */}
        {/* ========================================================================= */}
        <div className="lg:w-1/3 flex flex-col items-start lg:self-stretch">
          
          {/* Pre-title / Step Badge (Matching CaseStudy & Journal sections) */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className={`text-xs font-semibold tracking-widest font-mono ${accentText}`}>
              {isFa ? '۰۲ / ۰۶' : '02 / 06'}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase">
              {isFa ? 'آنچه خلق می‌کنیم' : 'WHAT WE BUILD'}
            </span>
          </div>

          {/* Centered Content: Title, Description & Action Button */}
          <div className="lg:my-auto flex flex-col items-start py-4 lg:py-0 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 sm:mb-6 tracking-tight">
              {isFa ? (
                <>
                  شما یک چالش یا نیاز دارید؛ <br />
                  <span className={accentText}>ما مسئله را حل می‌کنیم.</span>
                </>
              ) : (
                <>
                  You have a challenge. <br />
                  <span className={accentText}>We engineer the solution.</span>
                </>
              )}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 ${
              isNight ? 'text-neutral-700' : 'text-neutral-400'
            }`}>
              {isFa
                ? 'کاربر الزاماً نام دپارتمان‌ها را نمی‌داند، اما دغدغه خود را می‌شناسد. روی چالش خود کلیک کنید تا راه‌حل دقیق را ببینید و مستقیماً وارد دپارتمان تخصصی آن شوید.'
                : 'You do not need to guess department names. Tap into your current bottleneck to see the engineered solution and explore that dedicated department.'}
            </p>

            <button
              onClick={() => navigate('/contact')}
              className={`group text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 px-5 py-3 rounded-full border cursor-pointer ${
                isNight
                  ? 'border-[#8f6b00] text-[#8f6b00] hover:bg-[#8f6b00] hover:text-white'
                  : 'border-[#fff083] text-[#fff083] hover:bg-[#fff083] hover:text-[#222]'
              }`}
            >
              <span>{isFa ? 'مشاوره اختصاصی پروژه' : 'Discuss Your Project'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>
          </div>

          <div className="hidden lg:block h-8 w-full" aria-hidden="true" />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Ultra-Sleek Accordion (2/3 Width)                           */}
        {/* ========================================================================= */}
        <div className="lg:w-2/3 flex flex-col justify-center">
          <div className={`divide-y border-y transition-colors duration-300 ${
            isNight ? 'divide-black/10 border-black/10' : 'divide-white/10 border-white/10'
          }`}>
            {ACCORDION_ITEMS.map((item) => {
              const isOpen = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className={`transition-colors duration-300 ${
                    isOpen
                      ? isNight
                        ? 'bg-white/80 shadow-sm'
                        : 'bg-white/[0.04]'
                      : isNight
                      ? 'hover:bg-white/40'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Clickable Row Header */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 sm:py-6 px-4 sm:px-6 flex items-center justify-between gap-4 text-start cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
                      {/* Editorial Static Dash (-) */}
                      <span
                        aria-hidden="true"
                        className={`font-mono text-base sm:text-lg font-bold shrink-0 select-none transition-colors duration-200 ${
                          isOpen
                            ? isNight
                              ? 'text-[#8f6b00]'
                              : 'text-brand-yellow'
                            : isNight
                            ? 'text-neutral-400 group-hover:text-[#8f6b00]'
                            : 'text-neutral-500 group-hover:text-brand-yellow'
                        }`}
                      >
                        —
                      </span>

                      {/* Question Text */}
                      <span
                        className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                          isOpen
                            ? isNight
                              ? 'text-black'
                              : 'text-white'
                            : isNight
                            ? 'text-neutral-800 group-hover:text-[#8f6b00]'
                            : 'text-neutral-200 group-hover:text-brand-yellow'
                        }`}
                      >
                        {isFa ? item.questionFa : item.questionEn}
                      </span>
                    </div>

                    {/* Chevron Indicator at the other side */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 transition-all duration-300 ${
                        isOpen
                          ? isNight
                            ? 'border-[#8f6b00] text-[#8f6b00] rotate-180 bg-[#8f6b00]/10'
                            : 'border-brand-yellow text-brand-yellow rotate-180 bg-brand-yellow/10'
                          : isNight
                          ? 'border-black/10 text-neutral-600 group-hover:border-[#8f6b00]'
                          : 'border-white/15 text-neutral-400 group-hover:border-brand-yellow'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Expandable Content Box */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-1 flex flex-col gap-4">
                          
                          {/* Pain Quote Box */}
                          <div className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm leading-relaxed italic ${
                            isNight
                              ? 'bg-neutral-50/90 border-neutral-200 text-neutral-700'
                              : 'bg-black/30 border-white/10 text-neutral-300'
                          }`}>
                            <span className="opacity-60 block text-[10px] font-mono not-italic uppercase font-bold mb-1">
                              {isFa ? 'دغدغه و مشکل شما:' : 'YOUR BOTTLENECK:'}
                            </span>
                            {isFa ? item.painFa : item.painEn}
                          </div>

                          {/* Engineered Solution & Deliverable */}
                          <div className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isNight
                              ? 'bg-white border-neutral-200/90 text-brand-dark'
                              : 'bg-white/[0.04] border-white/10 text-white'
                          }`}>
                            <div className="space-y-1.5">
                              {/* Department Name (Clean tag without department number) */}
                              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase block ${accentText}`}>
                                {isFa ? item.deptFa : item.deptEn}
                              </span>

                              <div className="flex items-center gap-2">
                                <span className={`text-base font-black ${accentText}`}>→</span>
                                <h4 className="text-sm sm:text-base font-bold">
                                  {isFa ? item.solutionFa : item.solutionEn}
                                </h4>
                              </div>
                              <p className={`text-xs leading-relaxed ms-5 ${
                                isNight ? 'text-neutral-600' : 'text-neutral-400'
                              }`}>
                                {isFa ? item.deliverableFa : item.deliverableEn}
                              </p>
                            </div>

                            {/* Direct Link to Dedicated Department Landing Page */}
                            <Link
                              to={`/departments/${item.slug}`}
                              className={`shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                                isNight
                                  ? 'border-[#8f6b00] bg-[#8f6b00] text-white hover:bg-[#725500] hover:border-[#725500] shadow-sm'
                                  : 'border-brand-yellow bg-brand-yellow text-brand-dark hover:bg-white hover:border-white shadow-md'
                              }`}
                            >
                              <span>
                                {isFa ? 'مشاهده پروژه‌ها' : 'See Projects'}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                            </Link>
                          </div>

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
    </section>
  );
}

export default WhatWeBuildSection;
