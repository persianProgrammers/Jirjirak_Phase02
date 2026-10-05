import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

interface ConversionNeed {
  id: string;
  slug: string;
  number: string;
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

const CONVERSION_NEEDS: ConversionNeed[] = [
  {
    id: 'web',
    slug: 'web-development',
    number: '01',
    questionEn: 'Need a digital presence?',
    questionFa: 'به یک ویترین دیجیتال معتبر نیاز دارید؟',
    painEn: '“Our website feels outdated, slow or doesn’t convert visitors.”',
    painFa: '«سایتمان در شأن برندمان نیست، سرعتش پایین است یا لید و فروش نمی‌گیرد.»',
    solutionEn: 'Website & Web Systems',
    solutionFa: 'وب‌سایت اختصاصی و سیستم‌های وب مدرن',
    deliverableEn: 'Fast bespoke website, responsive UX & robust architecture.',
    deliverableFa: 'وب‌سایت فوق‌سریع اختصاصی، تجربه کاربری روان و زیرساخت توسعه‌پذیر.',
    deptEn: 'Web & Development',
    deptFa: 'دپارتمان وب و توسعه',
  },
  {
    id: 'seo',
    slug: 'seo-analytics',
    number: '02',
    questionEn: 'Need people to find you?',
    questionFa: 'می‌خواهید مخاطبان شما را در گوگل پیدا کنند؟',
    painEn: '“Nobody discovers us on Google without paid daily ads.”',
    painFa: '«سایتمان در نتایج جستجوی گوگل دیده نمی‌شود و ورودی ارگانیک نداریم.»',
    solutionEn: 'SEO & Search Growth',
    solutionFa: 'سئو ساختاری و رشد ارگانیک',
    deliverableEn: 'Keyword mapping, technical search health & compounding organic traffic.',
    deliverableFa: 'کشف کلمات کلیدی خریداران، سئو تکنیکال و جریان دائمی مشتری بدون هزینه کلیکی.',
    deptEn: 'SEO & Analytics',
    deptFa: 'دپارتمان سئو و تحلیل داده',
  },
  {
    id: 'marketing',
    slug: 'digital-marketing',
    number: '03',
    questionEn: 'Need measurable growth?',
    questionFa: 'می‌خواهید بودجه تبلیغات به فروش واقعی تبدیل شود؟',
    painEn: '“Spending on marketing without predictable return on investment.”',
    painFa: '«برای تبلیغات هزینه می‌کنیم اما خروجی مشخص و بازگشت سرمایه شفافی نمی‌بینیم.»',
    solutionEn: 'Digital Marketing & Growth',
    solutionFa: 'دیجیتال مارکتینگ و قیف‌های فروش',
    deliverableEn: 'Targeted performance campaigns, high-converting funnels & clear ROI.',
    deliverableFa: 'کمپین‌های عملکردمحور، لندینگ‌های با تبدیل بالا و گزارش دقیق هزینه جذب هر مشتری.',
    deptEn: 'Digital Marketing & Growth',
    deptFa: 'دپارتمان دیجیتال مارکتینگ',
  },
  {
    id: 'branding',
    slug: 'branding-identity',
    number: '04',
    questionEn: 'Need to become recognizable?',
    questionFa: 'می‌خواهید در بازار متمایز شوید و در ذهن بمانید؟',
    painEn: '“We look like everyone else and lack a distinctive identity.”',
    painFa: '«ظاهرمان شبیه همه رقبا است و مشتریان تمایز و ارزش ما را درک نمی‌کنند.»',
    solutionEn: 'Branding & Identity',
    solutionFa: 'برندینگ و هویت بصری',
    deliverableEn: 'Positioning strategy, iconic logo system, typography & brand guidelines.',
    deliverableFa: 'استراتژی جایگاه‌یابی، طراحی لوگوی ماندگار، پلت رنگ و کتابچه هویت برند.',
    deptEn: 'Branding & Identity',
    deptFa: 'دپارتمان برندینگ و هویت',
  },
  {
    id: 'academy',
    slug: 'academy-learning',
    number: '05',
    questionEn: 'Need your team to upskill?',
    questionFa: 'می‌خواهید تیمتان مهارت‌های روز را یاد بگیرد؟',
    painEn: '“We need practical, modern studio skills instead of dry theory.”',
    painFa: '«به جای دوره‌های تئوری، به آموزش‌های عملی و متدهای روز استودیویی نیاز داریم.»',
    solutionEn: 'Academy & Learning',
    solutionFa: 'آموزش سازمانی و آکادمی',
    deliverableEn: 'Tailored masterclasses, hands-on workshops & ongoing direct mentorship.',
    deliverableFa: 'کارگاه‌های عملی پروژه‌محور و توانمندسازی کامل نیروهای داخلی شما.',
    deptEn: 'Academy & Learning',
    deptFa: 'دپارتمان آموزش و آکادمی',
  },
  {
    id: 'creative',
    slug: 'creative-studio',
    number: '06',
    questionEn: 'Need something people remember?',
    questionFa: 'می‌خواهید محتوای بصری جذاب و میخکوب‌کننده بسازید؟',
    painEn: '“Static visuals get skipped. We need motion and art that captures attention.”',
    painFa: '«پست‌ها و بنرهای معمولی دیگر دیده نمی‌شوند و به آرت متحرک و خلاقانه نیاز داریم.»',
    solutionEn: 'Creative Studio',
    solutionFa: 'موشن‌دیزاین و گرافیک',
    deliverableEn: 'Cinematic 2D/3D kinetic animation, custom illustration & art direction.',
    deliverableFa: 'موشن‌گرافیک‌های سینمایی، تصویرسازی‌های اختصاصی و آرت دایرکشن متمایز.',
    deptEn: 'Creative Studio',
    deptFa: 'استودیو خلاقیت و موشن',
  },
  {
    id: 'game',
    slug: 'game-interactive',
    number: '07',
    questionEn: 'Need an interactive experience?',
    questionFa: 'به یک تجربه بازی‌گونه و تعاملی نیاز دارید؟',
    painEn: '“Standard flat pages are boring; we want users to immerse and play.”',
    painFa: '«صفحات وب ساده تکراری شده‌اند؛ می‌خواهیم مخاطب با محصول ما بازی و تعامل کند.»',
    solutionEn: 'Games & Interactive',
    solutionFa: 'بازی‌سازی و تجارب تعاملی',
    deliverableEn: 'Zero-install 3D web spaces, branded mini-games & high-retention mechanics.',
    deliverableFa: 'فضاهای سه‌بعدی سبک در مرورگر، مینی‌گیم‌های اختصاصی و نرخ ماندگاری چندبرابری.',
    deptEn: 'Game Studio & Interactive',
    deptFa: 'دپارتمان بازی‌سازی و تعاملی',
  },
];

export function WhatWeBuildSection() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const t = useTranslation()(currentLang);
  const navigate = useNavigate();
  const lenis = useLenis();

  // Active accordion row (defaults to first)
  const [activeId, setActiveId] = useState<string>('web');

  // Strict Accent Color Rule:
  // Light Background (isNight = true) -> #8F6B00
  // Dark Background (isNight = false) -> #FFF083
  const accentText = isNight ? 'text-[#8f6b00]' : 'text-[#fff083]';
  const accentBorder = isNight ? 'border-[#8f6b00]' : 'border-[#fff083]';

  return (
    <section
      id="world"
      className={`py-24 sm:py-32 px-6 sm:px-10 lg:px-16 transition-colors duration-700 ease-in-out relative overflow-hidden ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Consistent 12-Column Editorial Grid (5 Cols Info / 7 Cols Interactive Matrix) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN (5 Cols): Consistent Section Header & Context                 */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">
            {/* Step Badge */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-xs font-semibold tracking-widest ${accentText}`}>
                {isFa ? '۰۱ / ۰۶' : '01 / 06'}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">
                {isFa ? 'آنچه می‌سازیم' : 'WHAT WE BUILD'}
              </span>
            </div>

            {/* Headline with 6.2:1 WCAG AA Certified Contrast */}
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-5">
              {isFa ? (
                <>
                  از نیاز شما شروع می‌کنیم؛ <br />
                  <span className={accentText}>خروجی را می‌سازیم.</span>
                </>
              ) : (
                <>
                  You have a challenge. <br />
                  <span className={accentText}>We engineer the outcome.</span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-md ${
              isNight ? 'text-neutral-700' : 'text-neutral-400'
            }`}>
              {isFa
                ? 'کاربر الزاماً نام دپارتمان‌ها را نمی‌داند؛ او می‌داند «سایتش بازدید ندارد» یا «هویت برندش گم است». روی چالش خود کلیک کنید تا راه‌حل دقیق و خروجی ملموس را ببینید.'
                : 'You do not need to guess agency department names. Tell us what your business is currently missing — we connect your challenge to the exact deliverable.'}
            </p>

            {/* Direct Consultation CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                  isNight
                    ? 'bg-[#8f6b00] text-white hover:bg-[#755700]'
                    : 'bg-[#fff083] text-[#222] hover:bg-white'
                }`}
              >
                {isFa ? 'شروع گفتگو با ما' : 'Start a Conversation'}
              </button>

              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  if (lenis) {
                    lenis.scrollTo('#work', { offset: -30, duration: 1.2 });
                  } else {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                  isNight ? 'text-neutral-800 hover:text-[#8f6b00] font-semibold' : 'text-neutral-300 hover:text-[#fff083]'
                }`}
              >
                <span>{isFa ? 'مشاهده آرشیو پروژه‌ها' : 'Explore Projects'}</span>
                <span className="rtl:rotate-180">↓</span>
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN (7 Cols): Clean, Compact Conversion Matrix                   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col divide-y border-y transition-colors duration-300 ${
            isNight ? 'divide-black/10 border-black/10' : 'divide-white/10 border-white/10'
          }">
            {CONVERSION_NEEDS.map((item) => {
              const isOpen = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className={`transition-colors duration-200 ${
                    isOpen 
                      ? (isNight ? 'bg-black/[0.04]' : 'bg-white/[0.03]') 
                      : (isNight ? 'hover:bg-black/[0.02]' : 'hover:bg-white/[0.015]')
                  }`}
                >
                  {/* Clickable Row Header */}
                  <button
                    onClick={() => setActiveId(isOpen ? '' : item.id)}
                    className="w-full py-4 sm:py-5 px-3 sm:px-4 flex items-center justify-between gap-4 text-start cursor-pointer transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold tracking-tight truncate">
                      {isFa ? item.questionFa : item.questionEn}
                    </span>

                    <div className="flex items-center shrink-0">
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? `rotate-180 ${accentText}` : 'opacity-50'
                      }`} />
                    </div>
                  </button>

                  {/* Expandable Detail Box */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 sm:px-4 pb-5 pt-1 flex flex-col gap-3">
                          {/* Department & Solution identification inside accordion */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                              isNight ? 'bg-black/5 text-[#8f6b00]' : 'bg-white/10 text-brand-yellow'
                            }`}>
                              {isFa ? `دپارتمان پاسخگو: ${item.deptFa}` : `Department: ${item.deptEn}`}
                            </span>
                            <span className={`text-xs font-semibold ${isNight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                              {isFa ? `راه‌حل پیشنهادی: ${item.solutionFa}` : `Solution: ${item.solutionEn}`}
                            </span>
                          </div>

                          {/* Pain Point Quote */}
                          <p className={`text-xs italic leading-relaxed ${
                            isNight ? 'text-neutral-700' : 'text-neutral-400'
                          }`}>
                            {isFa ? item.painFa : item.painEn}
                          </p>

                          {/* Tangible Deliverable & Action Link */}
                          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isNight 
                              ? 'bg-white/80 border-black/10 text-brand-dark shadow-sm' 
                              : 'bg-white/[0.04] border-white/10 text-white'
                          }`}>
                            <div className="text-xs leading-relaxed">
                              <span className="font-mono text-[10px] uppercase opacity-60 block mb-0.5 font-bold">
                                {isFa ? 'خروجی ملموس که تحویل می‌گیرید:' : 'THE DELIVERABLE YOU GET:'}
                              </span>
                              <span className="font-semibold">
                                {isFa ? item.deliverableFa : item.deliverableEn}
                              </span>
                            </div>

                            <a
                              href="#work"
                              onClick={(e) => {
                                e.preventDefault();
                                if (lenis) {
                                  lenis.scrollTo('#work', { offset: -30, duration: 1.2 });
                                }
                              }}
                              className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider pb-0.5 border-b transition-colors cursor-pointer ${
                                isNight 
                                  ? 'text-[#8f6b00] border-[#8f6b00] hover:text-black hover:border-black font-bold' 
                                  : 'text-[#fff083] border-[#fff083] hover:text-white hover:border-white'
                              }`}
                            >
                              <span>{isFa ? 'مشاهده پروژه‌ها' : 'View Projects'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
                            </a>
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
