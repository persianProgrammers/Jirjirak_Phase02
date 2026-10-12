import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { PageHeader } from '../components/layout/PageHeader';
import { ContactSection } from '../features/landing/sections/ContactSection';
import { WhatWeBuildSection } from '../features/landing/sections/WhatWeBuildSection';

interface RoadmapStep {
  id: number;
  num: string;
  numFa: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    num: '01',
    numFa: '۰۱',
    titleFa: 'بررسی بریف',
    titleEn: 'Brief Review',
    descFa: 'تحلیل دقیق اهداف، دپارتمان‌های مورد نیاز و امکان‌سنجی اولیه استودیو',
    descEn: 'Deep technical analysis of requirements and studio capacity',
  },
  {
    id: 2,
    num: '02',
    numFa: '۰۲',
    titleFa: 'جلسه کشف',
    titleEn: 'Discovery Call',
    descFa: 'گفتگوی ۳۰ دقیقه‌ای جهت شفاف‌سازی ابعاد، روح برند و بنچ‌مارک‌ها',
    descEn: '30-minute session to align on vision, audience, and benchmarks',
  },
  {
    id: 3,
    num: '03',
    numFa: '۰۳',
    titleFa: 'نقشه راه و NDA',
    titleEn: 'Roadmap & NDA',
    descFa: 'ارائه پروپوزال با بودجه شفاف، فازبندی مشخص و انعقاد رسمی محرمانگی',
    descEn: 'Transparent milestone architecture, fixed terms, and mutual NDA',
  },
  {
    id: 4,
    num: '04',
    numFa: '۰۴',
    titleFa: 'شروع اسپرینت‌ها',
    titleEn: 'Sprint Kickoff',
    descFa: 'آغاز سریع فرآیند خلق با کانال ارتباطی مستقیم و دموهای مرحله‌ای',
    descEn: 'Direct pipeline kickoff with dedicated channel and live demos',
  },
];

export default function Contact() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // Active step for visual roadmap hover state
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number | null>(null);

  const lenis = useLenis();

  const handleScrollToForm = () => {
    if (lenis) {
      lenis.scrollTo('#contact', { offset: -30, duration: 1.2 });
    } else {
      const el = document.getElementById('contact');
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

      {/* 📐 2. Exact Landing Page Contact Section (Identical to Landing, 100% Consistent & Responsive) */}
      <ContactSection />

      {/* =========================================================================
          3. VISUAL ROADMAP SECTION: "What Happens Next?"
          Clean, elegant pathway with 4 nodes, clear titles, and hover reveal descriptions
         ========================================================================= */}
      <section
        id="what-happens-next"
        className={`py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t transition-colors duration-700 ${
          isNight
            ? 'bg-neutral-900/60 text-brand-light border-white/10'
            : 'bg-neutral-100 text-brand-dark border-neutral-200'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span
              className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border inline-block mb-3 ${
                isNight
                  ? 'border-[#fff083]/40 bg-[#fff083]/10 text-[#fff083]'
                  : 'border-[#8f6b00]/40 bg-[#8f6b00]/10 text-[#8f6b00]'
              }`}
            >
              {isFa ? 'مسیر همکاری' : 'COLLABORATION ROADMAP'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              {isFa ? 'چهار گام شفاف تا آغاز آفرینش' : 'Four Steps to Creation'}
            </h2>
            <p className="text-xs sm:text-sm opacity-70">
              {isFa
                ? '(نشانگر را روی هر گام ببرید تا جزئیات را مشاهده کنید)'
                : '(Hover over each milestone to reveal details)'}
            </p>
          </div>

          {/* DESKTOP VISUAL PATHWAY */}
          <div className="hidden md:block relative py-12 px-6">
            
            {/* Guide line connecting the stations */}
            <div
              className={`absolute top-[4.25rem] left-16 right-16 h-[2px] ${
                isNight ? 'bg-white/15' : 'bg-black/15'
              }`}
            />

            {/* Glowing active line extending to hovered node */}
            {activeRoadmapStep !== null && (
              <div
                className={`absolute top-[4.25rem] h-[2px] transition-all duration-300 ${
                  isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'
                }`}
                style={{
                  [isFa ? 'right' : 'left']: '4rem',
                  width: `${(activeRoadmapStep / 3) * 78}%`,
                }}
              />
            )}

            {/* 4 Stations */}
            <div className="relative z-10 flex justify-between items-start">
              {ROADMAP_STEPS.map((step, idx) => {
                const isHovered = activeRoadmapStep === idx;

                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => setActiveRoadmapStep(idx)}
                    onMouseLeave={() => setActiveRoadmapStep(null)}
                    className="flex flex-col items-center cursor-pointer group relative w-44"
                  >
                    {/* Station Node Badge */}
                    <div
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 select-none shadow-md ${
                        isHovered
                          ? isNight
                            ? 'bg-neutral-900 border-[#fff083] text-[#fff083] scale-110 shadow-[0_0_24px_rgba(255,240,131,0.5)]'
                            : 'bg-white border-[#8f6b00] text-[#8f6b00] scale-110 shadow-[0_0_24px_rgba(143,107,0,0.35)]'
                          : isNight
                          ? 'bg-neutral-900 border-white/20 text-neutral-300 group-hover:border-white/50'
                          : 'bg-white border-black/20 text-neutral-700 group-hover:border-black/50'
                      }`}
                    >
                      {isFa ? step.numFa : step.num}
                    </div>

                    {/* Step Title Underneath Node */}
                    <span
                      className={`mt-4 text-sm font-bold tracking-tight transition-colors duration-200 text-center ${
                        isHovered
                          ? isNight
                            ? 'text-[#fff083]'
                            : 'text-[#8f6b00]'
                          : ''
                      }`}
                    >
                      {isFa ? step.titleFa : step.titleEn}
                    </span>

                    {/* Floating Tooltip Reveal on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                          className={`absolute bottom-full mb-3 w-56 p-3.5 rounded-2xl border text-xs text-center shadow-xl pointer-events-none z-30 ${
                            isNight
                              ? 'bg-neutral-900/95 border-[#fff083]/40 text-neutral-200 backdrop-blur-md'
                              : 'bg-white/95 border-[#8f6b00]/40 text-neutral-800 backdrop-blur-md shadow-lg'
                          }`}
                        >
                          <p className="leading-relaxed">
                            {isFa ? step.descFa : step.descEn}
                          </p>
                          {/* Tooltip pointer */}
                          <div
                            className={`absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b ${
                              isNight ? 'bg-neutral-900 border-[#fff083]/40' : 'bg-white border-[#8f6b00]/40'
                            }`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE VISUAL PATHWAY (Vertical Timeline) */}
          <div className="block md:hidden relative px-4">
            <div
              className={`absolute top-4 bottom-4 start-8 w-[2px] ${
                isNight ? 'bg-white/15' : 'bg-black/15'
              }`}
            />

            <div className="flex flex-col gap-8 relative z-10">
              {ROADMAP_STEPS.map((step, idx) => {
                const isExpanded = activeRoadmapStep === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveRoadmapStep(isExpanded ? null : idx)}
                    className="flex items-start gap-4 cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isExpanded
                          ? isNight
                            ? 'bg-neutral-900 border-[#fff083] text-[#fff083]'
                            : 'bg-white border-[#8f6b00] text-[#8f6b00]'
                          : isNight
                          ? 'bg-neutral-900 border-white/20 text-neutral-300'
                          : 'bg-white border-black/20 text-neutral-700'
                      }`}
                    >
                      {isFa ? step.numFa : step.num}
                    </div>

                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold">
                          {isFa ? step.titleFa : step.titleEn}
                        </h4>
                        <span className="text-xs opacity-60 font-bold">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs mt-2 leading-relaxed opacity-75"
                          >
                            {isFa ? step.descFa : step.descEn}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prominent 24-Hour SLA / Turnaround Reassurance Strip */}
          <div className="mt-14 sm:mt-16 text-center">
            <div
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-xs sm:text-sm font-medium ${
                isNight
                  ? 'bg-neutral-900/80 border-white/10 text-neutral-300'
                  : 'bg-white border-black/10 text-neutral-700 shadow-xs'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isNight ? 'bg-[#fff083]' : 'bg-[#8f6b00]'
                }`}
              />
              <span>
                {isFa
                  ? 'پاسخ‌گویی اولیه و هماهنگی جلسه، ظرف حداکثر ۲۴ ساعت کاری انجام خواهد شد.'
                  : 'We will review your brief and follow up within 24 business hours.'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. EXACT LANDING PAGE FAQ / WHAT WE BUILD ACCORDION
          Exact copy with full project consistency & alternating background
         ========================================================================= */}
      <WhatWeBuildSection />

    </div>
  );
}
