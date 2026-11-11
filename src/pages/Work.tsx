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
    <div className="min-h-screen w-full transition-colors duration-700 bg-brand-dark">
      {/* =========================================================================
          HERO HEADER (100VH) - Matching Contact Page Architecture Pattern
          Theme: Standard Deep Cinematic Dark
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
          SECTION 01 / 04: FEATURED PROJECTS (Spatial 3D Model & Interactive Portfolio)
          Theme: Deep Dark
         ========================================================================= */}
      <FeaturedProjectsSection stepBadge={{ en: '01 / 04', fa: '۰۱ / ۰۴' }} />

      {/* =========================================================================
          SECTION 02 / 04: STUDIO CRAFT & ARCHITECTURAL BENCHMARKS (Luminous Light Slab)
          Theme: Architectural Light Slab - Inspired by Landing Page Contrast Rhythm
         ========================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 lg:px-12 xl:px-16 bg-brand-light text-brand-dark border-y border-black/10 relative overflow-hidden transition-colors duration-700">
        {/* Ambient Radial Vignette */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(143,107,0,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1500px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="text-xs font-semibold tracking-widest font-mono text-[#8f6b00]">
                {isFa ? '۰۲ / ۰۴' : '02 / 04'}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase opacity-75 font-mono">
                {isFa ? 'فلسفه و استانداردهای ساخت' : 'CRAFT & BENCHMARKS'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight text-neutral-900">
              {isFa ? (
                <>
                  معماری فراتر از تصویر؛ <br />
                  <span className="text-[#8f6b00]">خلق محصولاتی که زنده نفس می‌کشند.</span>
                </>
              ) : (
                <>
                  Beyond Visual Surface; <br />
                  <span className="text-[#8f6b00]">Engineering Digital Worlds That Feel Alive.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-neutral-600 max-w-xl mx-auto">
              {isFa
                ? 'هر اثر در جیرجیرک ترکیبی است از ریاضیات دقیق انیمیشن، کاهش بی‌رحمانه بایت‌های زائد و آفرینش هویت‌های بصری که فراموش نمی‌شوند.'
                : 'Every project combines mathematical kinetic rhythm, zero-bloat asset architecture, and evocative spatial atmosphere.'}
            </p>
          </div>

          {/* 3 Pillars Grid on Crisp White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl hover:border-[#8f6b00]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl mb-6 border border-neutral-200 text-[#8f6b00] font-bold">
                  ⚡
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">
                  {isFa ? 'روانی ۶۰ فریم و رندرینگ بدون لرزش' : 'Fluid 60 FPS Kinetic Rhythms'}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 mb-6">
                  {isFa
                    ? 'هماهنگی دقیق Lenis و GSAP بر روی یک تایکر واحد RAF، بارگذاری تصویر زیر ۵۰ میلی‌ثانیه و بدون حتی یک میلی‌ثانیه افت فریم روی دستگاه‌های مختلف.'
                    : 'Unified master RAF synchronizing smooth scroll, GPU-accelerated spring kinematics, and zero micro-stutter across screens.'}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#8f6b00] font-semibold">
                <span>{isFa ? 'شاخص عملکرد' : 'Benchmark'}</span>
                <span>0ms Layout Shift</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl hover:border-[#8f6b00]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl mb-6 border border-neutral-200 text-[#8f6b00] font-bold">
                  💎
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">
                  {isFa ? 'هویت بصری انحصاری و غیرتکراری' : 'Bespoke Spatial Typography'}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 mb-6">
                  {isFa
                    ? 'پرهیز کامل از قالب‌های آماده یا پترن‌های تکراری وب؛ هر هویت بر اساس ماهیت فلسفی و بافت اختصاصی همان پروژه پی‌ریزی می‌شود.'
                    : 'No off-the-shelf templates or generic components. Tailored typography, bespoke 3D assets, and handcrafted textures.'}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#8f6b00] font-semibold">
                <span>{isFa ? 'رویکرد دیزاین' : 'Approach'}</span>
                <span>100% Signature Form</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl hover:border-[#8f6b00]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl mb-6 border border-neutral-200 text-[#8f6b00] font-bold">
                  🚀
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">
                  {isFa ? 'فشرده‌سازی عمیق و بهینه‌سازی وب‌پپ' : 'Sub-Second Global Delivery'}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 mb-6">
                  {isFa
                    ? 'بیش از ۸۷ درصد کاهش پهنای باند با پایپ‌لاین شارپ، پری‌لود دارایی‌های LCP و کش هوشمند حافظه برای تجربه کاربری آنی.'
                    : '87%+ asset bandwidth optimization, eager LCP hydration, and intelligent memory caching for instant interactions.'}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#8f6b00] font-semibold">
                <span>{isFa ? 'بهینه‌سازی شبکه' : 'Bandwidth'}</span>
                <span>87.1% Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 / 04: CASE STUDY SHOWCASE (Toyooran Spatial Showcase)
          Theme: Deep Obsidian Terrain & Warm Ground Beams
         ========================================================================= */}
      <CaseStudySection stepBadge={{ en: '03 / 04', fa: '۰۳ / ۰۴' }} />

      {/* =========================================================================
          SECTION 04 / 04: CALL TO ACTION DOCK (Architectural Light Slab)
          Theme: Luminous Contrast Slab - Matching Landing Page Rhythm
         ========================================================================= */}
      <WorkCtaSection />
    </div>
  );
}
