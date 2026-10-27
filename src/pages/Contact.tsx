import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { PageHeader } from '../components/layout/PageHeader';
import { DirectChannelsSection } from '../features/landing/sections/DirectChannelsSection';
import { ContactSection } from '../features/landing/sections/ContactSection';
import { WhatWeBuildSection } from '../features/landing/sections/WhatWeBuildSection';
import { Model1ChronoCompass } from '../features/contact-models/WorkflowModels';

export default function Contact() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

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

  // Section 1 color tokens (Inverted rhythm: Light in Night, Dark in Day - opposite of Hero)
  const s1AccentText = isNight ? 'text-[#8f6b00]' : 'text-[#fff083]';

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* =========================================================================
          HERO HEADER (100VH)
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
          SECTION 01 / 04: "How We Work Together" (Workflow: Chrono-Compass)
          Theme: Inverted (Night: Light / Day: Dark) - Alternating after Hero
         ========================================================================= */}
      <section
        id="what-happens-next"
        className={`py-20 sm:py-28 px-6 sm:px-8 lg:px-12 border-t relative overflow-hidden transition-colors duration-700 ${
          isNight
            ? 'bg-brand-light text-brand-dark border-black/10'
            : 'bg-brand-dark text-brand-light border-white/10'
        }`}
      >
        {/* Ambient Radial Vignette - Pure CSS gradient without expensive Gaussian blur shader */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none -z-10"
          style={{
            background: isNight
              ? 'radial-gradient(ellipse at center, rgba(143,107,0,0.12) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(255,240,131,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-5xl mx-auto">
          {/* Section Header - Consistent Landing Page Format (Centered) */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className={`text-xs font-semibold tracking-widest font-mono ${s1AccentText}`}>
                {isFa ? '۰۱ / ۰۴' : '01 / 04'}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase opacity-75">
                {isFa ? 'مسیر همکاری' : 'WORKFLOW'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
              {isFa ? (
                <>
                  ایده بزرگ دارید؟ <br />
                  <span className={s1AccentText}>این‌گونه در ۴ گام به واقعیت تبدیلش می‌کنیم.</span>
                </>
              ) : (
                <>
                  Got a bold vision? <br />
                  <span className={s1AccentText}>Here is how we build it in 4 clear steps.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed opacity-75 max-w-xl mx-auto">
              {isFa
                ? 'پیش از ارسال بریف، دقیقا بدانید از اولین ارتباط تا تحویل شاهکار نهایی چه اتفاقی خواهد افتاد؛ شفافیت کامل، بدون بروکراسی و بدون غافلگیری.'
                : 'Before you submit your brief, see the exact expedition from initial ping to final launch—complete clarity, no bureaucracy, no surprises.'}
            </p>
          </div>

          {/* CHRONO COMPASS CONTAINER */}
          <div
            className={`rounded-3xl p-6 sm:p-10 lg:p-12 border relative backdrop-blur-md transition-all duration-500 shadow-2xl flex items-center justify-center ${
              isNight
                ? 'bg-white/80 border-black/10 text-neutral-900 shadow-xl'
                : 'bg-neutral-900/60 border-white/10 text-neutral-100 shadow-2xl'
            }`}
          >
            <Model1ChronoCompass
              isNight={isNight}
              isFa={isFa}
              onScrollToForm={handleScrollToForm}
            />
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
          SECTION 02 / 04: DIRECT CHANNELS & SOCIAL ECOSYSTEM
          Theme: Standard (Night: Dark / Day: Light) - Alternating after Sec 01
         ========================================================================= */}
      <DirectChannelsSection
        step="02 / 04"
        stepFa="۰۲ / ۰۴"
        badge="DIRECT CHANNELS"
        badgeFa="تماس مستقیم"
      />

      {/* =========================================================================
          SECTION 03 / 04: EXACT LANDING PAGE CONTACT SECTION (QUESTIONNAIRE WIZARD)
          Theme: Inverted (Night: Light / Day: Dark) - Alternating after Sec 02
         ========================================================================= */}
      <ContactSection
        step="03 / 04"
        stepFa="۰۳ / ۰۴"
        inverted={true}
      />

      {/* =========================================================================
          SECTION 04 / 04: EXACT LANDING PAGE FAQ / WHAT WE BUILD ACCORDION
          Theme: Standard (Night: Dark / Day: Light) - Alternating after Sec 03
         ========================================================================= */}
      <WhatWeBuildSection
        step="04 / 04"
        stepFa="۰۴ / ۰۴"
        badge="WHAT WE DO"
        badgeFa="آنچه انجام می‌دهیم"
        inverted={true}
      />
    </div>
  );
}
