import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { PageHeader } from '../components/layout/PageHeader';
import { FeaturedProjectsSection } from '../features/landing/sections/FeaturedProjectsSection';
import { CaseStudySection } from '../features/landing/sections/CaseStudySection';
import { WorkCtaSection } from '../features/landing/sections/WorkCtaSection';

export default function Work() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const lenis = useLenis();

  const handleScrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo('#work', { offset: -30, duration: 1.2 });
    } else {
      const el = document.getElementById('work');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaElement = (
    <button
      type="button"
      onClick={handleScrollToProjects}
      className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow-xl select-none ${
        isNight
          ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_28px_rgba(255,240,131,0.4)]'
          : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_20px_rgba(143,107,0,0.3)]'
      }`}
    >
      {isFa ? 'کاوش در پروژه‌ها' : 'Explore Projects'}
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
      {/* =========================================================================
          HERO HEADER (100VH) - Matching Contact Page Architecture Pattern
          Theme: Standard (Night: Dark / Day: Light)
         ========================================================================= */}
      <PageHeader
        fullHeight={true}
        badge={isFa ? 'آرشیو گزیده' : 'CURATED ARCHIVE'}
        titleLine1={isFa ? 'ایده‌های جسورانه.' : 'Bold Visions.'}
        titleLine2={isFa ? 'دنیاهایی که ساختیم.' : 'Worlds We Built.'}
        subtitle={
          isFa
            ? 'روایت زنده آثاری که مرز دیزاین، کد و فضاسازی تعاملی را جابجا کردند؛ مجموعه‌ای گزیده از ساخته‌های ماندگار استودیو جیرجیرک.'
            : 'A curated living record of projects pushing the outer rim of digital craft, spatial sound, and engineered form.'
        }
        breadcrumb={[
          {
            label: isFa ? 'پروژه‌ها' : 'Work',
          },
        ]}
        cta={ctaElement}
        onScrollDown={handleScrollToProjects}
        scrollLabel={isFa ? 'اسکرول به آثار برگزیده' : 'Scroll to Featured Works'}
      />

      {/* =========================================================================
          SECTION 01 / 03: FEATURED PROJECTS (Copied from Landing, numbered 01 / 03)
         ========================================================================= */}
      <FeaturedProjectsSection stepBadge={{ en: '01 / 03', fa: '۰۱ / ۰۳' }} />

      {/* =========================================================================
          SECTION 02 / 03: CASE STUDY SHOWCASE (Next Landing Section, numbered 02 / 03)
         ========================================================================= */}
      <CaseStudySection stepBadge={{ en: '02 / 03', fa: '۰۲ / ۰۳' }} />

      {/* =========================================================================
          SECTION 03 / 03: CALL TO ACTION DOCK (3 Columns Responsive Banner)
         ========================================================================= */}
      <WorkCtaSection />
    </div>
  );
}
