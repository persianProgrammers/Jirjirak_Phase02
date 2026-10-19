import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { PageHeader } from '../components/layout/PageHeader';
import { ContactSection } from '../features/landing/sections/ContactSection';
import { WhatWeBuildSection } from '../features/landing/sections/WhatWeBuildSection';
import {
  Model1ChronoCompass,
  Model10NixieTubes,
  ModelTreasureIsland,
  ModelTopoExpedition,
  ModelCelestialStarmap,
} from '../features/contact-models/WorkflowModels';

const WORKFLOW_MODELS = [
  {
    id: 2,
    badgeFa: 'نقشه گنج ۱',
    badgeEn: 'Treasure Map 1',
    nameFa: 'نقشه گنج مجمع‌الجزایر',
    nameEn: 'Pirate Treasure Map',
    descFa: 'مسیر دریانوردی نقطه‌چین، کشتی متحرک و ضربدر گنج',
    descEn: 'Animated dotted sailing trail & pirate ship',
  },
  {
    id: 3,
    badgeFa: 'نقشه گنج ۲',
    badgeEn: 'Treasure Map 2',
    nameFa: 'رول نقشه توپوگرافی صعود',
    nameEn: 'Topo Adventure Trail',
    descFa: 'خطوط ارتفاعی، ایستگاه‌ها و کمپ‌های صعود',
    descEn: 'Contour curves & waypoint surveyor flags',
  },
  {
    id: 4,
    badgeFa: 'نقشه گنج ۳',
    badgeEn: 'Treasure Map 3',
    nameFa: 'نقشه آسمانی و صور فلکی',
    nameEn: 'Celestial Constellation',
    descFa: 'مسیر نقطه‌چین کهکشانی و مدار ستاره‌ها',
    descEn: 'Dotted starlight trails & orbit probes',
  },
  {
    id: 1,
    badgeFa: 'طرح ۱',
    badgeEn: 'Model 1',
    nameFa: 'قطب‌نمای مکانیکی',
    nameEn: 'Chrono-Compass',
    descFa: 'عقربه فیزیکی، چرخ‌دنده و دیسک مدرج',
    descEn: 'Mechanical dial & spring needle',
  },
  {
    id: 10,
    badgeFa: 'طرح ۱۰',
    badgeEn: 'Model 10',
    nameFa: 'لامپ‌های نیکسی رترو',
    nameEn: 'Nixie Tubes',
    descFa: 'حباب شیشه‌ای با فیلامان درخشان نئون',
    descEn: 'Warm neon gas glow filaments',
  },
];

export default function Contact() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  // Active temporary model selection (defaults to new Treasure Map model)
  const [selectedModel, setSelectedModel] = useState<number>(2);

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

  // Section 2 color tokens (Inverted rhythm matching landing page WorldSection & CaseStudySection)
  const s2AccentText = isNight ? 'text-[#8f6b00]' : 'text-[#fff083]';
  const s2AccentBg = isNight ? 'bg-[#8f6b00]' : 'bg-[#fff083]';
  const s2AccentBorder = isNight ? 'border-[#8f6b00]' : 'border-[#fff083]';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* =========================================================================
          1. FULL 100VH HERO HEADER
             Theme: Standard (Night: Dark / Day: Light)
         ========================================================================= */}
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

      {/* =========================================================================
          2. VISUAL COLLABORATION WORKFLOW SECTION: "How We Work Together"
             Position: 2nd Section on the Contact Page (As requested)
             Theme: Alternating / Inverted (Night: Light / Day: Dark)
             Zero clutter, fun treasure map trails with marching dots, preserved Models 1 & 10
         ========================================================================= */}
      <section
        id="what-happens-next"
        className={`py-20 sm:py-28 px-6 sm:px-8 lg:px-12 border-t relative overflow-hidden transition-colors duration-700 ${
          isNight
            ? 'bg-brand-light text-brand-dark border-black/10'
            : 'bg-brand-dark text-brand-light border-white/10'
        }`}
      >
        {/* Ambient Radial Vignette */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none -z-10"
          style={{
            backgroundColor: isNight ? 'rgba(143,107,0,0.06)' : 'rgba(255,240,131,0.04)',
          }}
        />

        <div className="max-w-5xl mx-auto">
          {/* Section Header - Clean typography, zero icons */}
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className={`text-xs font-semibold tracking-widest ${s2AccentText}`}>
                {isFa ? 'مسیر همکاری' : 'COLLABORATION'}
              </span>
              <span className="text-xs opacity-30">•</span>
              <span className="text-xs font-semibold tracking-widest uppercase opacity-60">
                {isFa ? 'چهار فاز سرراست' : 'FOUR PHASES'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              {isFa ? 'مسیر همکاری؛ کوتاه، شفاف و لذت‌بخش.' : 'The Atelier Workflow.'}
            </h2>
            <p className="text-xs sm:text-sm opacity-70">
              {isFa
                ? 'بی‌نیاز از تشریفات و بروکراسی؛ مسیر از ارتباط اولیه تا رسیدن به گنجینه نهایی پروژه را ببینید.'
                : 'A transparent expedition from first ping to final delivery.'}
            </p>
          </div>

          {/* 🎛️ TEMPORARY TESTING SUITE & SELECTOR PANEL */}
          <div
            className={`mb-8 p-4 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
              isNight
                ? 'bg-white/90 border-black/10 shadow-lg text-neutral-900'
                : 'bg-neutral-900/90 border-white/10 shadow-2xl text-neutral-100'
            }`}
          >
            {/* Panel Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 mb-4 border-b border-current/10">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full animate-ping ${s2AccentBg}`} />
                <span className="text-xs font-bold tracking-wider">
                  {isFa ? 'پنل انتخاب مدل طراحی مسیر' : 'DESIGN SELECTION LAB'}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border"
                  style={{
                    borderColor: isNight ? 'rgba(143,107,0,0.5)' : 'rgba(255,240,131,0.5)',
                    color: isNight ? '#8f6b00' : '#fff083',
                  }}
                >
                  {WORKFLOW_MODELS.findIndex((m) => m.id === selectedModel) + 1} / {WORKFLOW_MODELS.length}
                </span>
              </div>
              <p className="text-[11px] opacity-75 text-center sm:text-right">
                {isFa
                  ? 'طرح‌های ۱ و ۱۰ نگه‌داشته شدند + ۳ مدل نقشه گنج و مسیر نقطه‌چین اضافه شدند.'
                  : 'Models 1 & 10 preserved + 3 Treasure Map dotted trails.'}
              </p>
            </div>

            {/* Model Tab Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 select-none">
              {WORKFLOW_MODELS.map((model) => {
                const isCurrent = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setSelectedModel(model.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                      isCurrent
                        ? isNight
                          ? 'bg-[#8f6b00] text-white border-[#8f6b00] font-bold shadow-[0_0_14px_rgba(143,107,0,0.3)] scale-[1.02]'
                          : 'bg-[#fff083] text-[#1a1a1a] border-[#fff083] font-bold shadow-[0_0_18px_rgba(255,240,131,0.4)] scale-[1.02]'
                        : isNight
                        ? 'bg-neutral-100/80 border-black/10 text-neutral-700 hover:text-black hover:bg-neutral-200/70'
                        : 'bg-neutral-800/60 border-white/10 text-neutral-300 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded-full border opacity-75">
                        {isFa ? model.badgeFa : model.badgeEn}
                      </span>
                      <span className="text-xs leading-tight font-medium">
                        {isFa ? model.nameFa : model.nameEn}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-60 truncate w-full hidden sm:block">
                      {isFa ? model.descFa : model.descEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🎭 ACTIVE MODEL CONTAINER CANVAS */}
          <div
            className={`rounded-3xl p-6 sm:p-10 lg:p-12 border relative backdrop-blur-md shadow-2xl transition-all duration-500 min-h-[440px] flex items-center justify-center ${
              isNight
                ? 'bg-white/80 border-black/10 text-neutral-900 shadow-xl'
                : 'bg-neutral-900/40 border-white/10 text-neutral-100 shadow-2xl'
            }`}
          >
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {selectedModel === 2 && (
                    <ModelTreasureIsland
                      isNight={isNight}
                      isFa={isFa}
                      onScrollToForm={handleScrollToForm}
                    />
                  )}
                  {selectedModel === 3 && (
                    <ModelTopoExpedition
                      isNight={isNight}
                      isFa={isFa}
                      onScrollToForm={handleScrollToForm}
                    />
                  )}
                  {selectedModel === 4 && (
                    <ModelCelestialStarmap
                      isNight={isNight}
                      isFa={isFa}
                      onScrollToForm={handleScrollToForm}
                    />
                  )}
                  {selectedModel === 1 && (
                    <Model1ChronoCompass
                      isNight={isNight}
                      isFa={isFa}
                      onScrollToForm={handleScrollToForm}
                    />
                  )}
                  {selectedModel === 10 && (
                    <Model10NixieTubes
                      isNight={isNight}
                      isFa={isFa}
                      onScrollToForm={handleScrollToForm}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Minimal 3-Point Reassurance Footer Strip */}
          <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs opacity-65">
            <span>{isFa ? 'پاسخ‌گویی کمتر از ۲۴ ساعت' : '24-hour turnaround'}</span>
            <span className="opacity-30">•</span>
            <span>{isFa ? 'بدون هزینه‌های پنهان یا ابهام' : 'Fixed budget & mutual NDA'}</span>
            <span className="opacity-30">•</span>
            <span>{isFa ? 'دموهای زنده مرحله‌به‌مرحله' : 'Live iterative milestones'}</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. EXACT LANDING PAGE CONTACT SECTION (QUESTIONNAIRE WIZARD & FORM)
             Position: 3rd Section on the Contact Page (As requested)
             Theme: Alternating / Standard (Night: Dark / Day: Light)
         ========================================================================= */}
      <ContactSection />

      {/* =========================================================================
          4. EXACT LANDING PAGE FAQ / WHAT WE BUILD ACCORDION
             Position: 4th Section on the Contact Page
             Theme: Alternating / Inverted (Night: Light / Day: Dark)
         ========================================================================= */}
      <WhatWeBuildSection />
    </div>
  );
}
