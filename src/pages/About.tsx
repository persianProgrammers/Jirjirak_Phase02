import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { AboutSection } from '../features/landing/sections/AboutSection';
import { PhilosophySection } from '../features/landing/sections/PhilosophySection';
import { PageHeader } from '../components/layout/PageHeader';

export default function About() {
  const { isNight, currentLang } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const lenis = useLenis();

  const handleScrollToAbout = () => {
    if (lenis) {
      lenis.scrollTo('#about', { offset: -30, duration: 1.2 });
    } else {
      const el = document.getElementById('about');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaElement = (
    <button
      type="button"
      onClick={handleScrollToAbout}
      className={`px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 shadow-xl select-none ${
        isNight
          ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black hover:shadow-[0_0_28px_rgba(255,240,131,0.4)]'
          : 'bg-[#8f6b00] text-white hover:bg-[#755700] hover:shadow-[0_0_20px_rgba(143,107,0,0.3)]'
      }`}
    >
      {isFa ? 'داستان استودیو' : 'Discover Our Story'}
    </button>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-700 ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* =========================================================================
          HERO HEADER (100VH) - Matching Work & Contact Architectural Standard
         ========================================================================= */}
      <PageHeader
        fullHeight={true}
        badge={isFa ? 'درباره استودیو جیرجیرک' : 'ABOUT JIRJIRAK'}
        titleLine1={isFa ? 'خلق روح دیجیتال.' : 'Crafting Digital Soul.'}
        titleLine2={isFa ? 'وسواس در جزئیات.' : 'Obsessive Precision.'}
        subtitle={
          isFa
            ? 'روایت آتلیه چندرشته‌ای ما، باور به ارزش کارهای کوچک اما عمیق، و پیوند هنر، معماری و مهندسی نرم‌افزار.'
            : 'The story of our multidisciplinary atelier, rooted in small team velocity, deep focus, and timeless digital craftsmanship.'
        }
        breadcrumb={[
          {
            label: isFa ? 'درباره ما' : 'About',
          },
        ]}
        cta={ctaElement}
        onScrollDown={handleScrollToAbout}
        scrollLabel={isFa ? 'اسکرول به داستان استودیو' : 'Scroll to Studio Story'}
      />

      {/* 05 / 08 About Section: Studio Mission & Full Interactive Team Atelier with Department Filters */}
      <AboutSection variant="full" />

      {/* 06 / 08 The Philosophy Section: Directly underneath the About Section */}
      <PhilosophySection />
    </div>
  );
}
