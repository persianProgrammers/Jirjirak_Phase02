import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ProjectItem } from '../components/featured-models/types';
import { KineticBladesModel } from '../components/featured-models/KineticBladesModel';

// Direct Vite asset imports - guarantees bundled and resolved paths in dev and prod
import toyooranImg from '@/src/assets/images/projects/project_toyooran.png';
import kafiImg from '@/src/assets/images/projects/project_kafi_1790411104227.jpg';
import gamingImg from '@/src/assets/images/projects/project_gaming_1790411118596.jpg';
import fintechImg from '@/src/assets/images/projects/project_fintech_1790411153505.jpg';

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'toyooran',
    titleEn: 'TOYOORAN',
    titleFa: 'طیوران',
    categoryEn: 'Web / Brand / Experience',
    categoryFa: 'وب‌سایت / هویت برند / تجربه کاربری',
    descEn: 'Architectural, immersive digital flagship capturing sensory depth and physical space.',
    descFa: 'طراحی پیشرو و معماری دیجیتال برای تجربه‌ای فراتر از یک وب‌سایت متعارف.',
    image: toyooranImg,
    accentColor: '#fff083',
    link: '#project',
    year: '2026',
    client: 'Toyooran Agro Industrial',
    techStack: ['Spatial 3D', 'WebGL', 'Tailwind 4', 'GSAP'],
  },
  {
    id: 'kafi',
    titleEn: 'KAFI',
    titleFa: 'کافی',
    categoryEn: 'Brand Experience',
    categoryFa: 'طراحی هویت و تجربه فضایی',
    descEn: 'Sensory boutique coffee atelier with warm ambient amber lighting and dark walnut textures.',
    descFa: 'آتلیه تخصصی قهوه با فضاسازی گرم، نورپردازی کهربایی و بافت‌های مینیمال چوب.',
    image: kafiImg,
    accentColor: '#e5a952',
    link: '#project',
    year: '2025',
    client: 'Kafi Atelier',
    techStack: ['Sensory UX', 'React 19', 'Audio Engine', 'Amber Bloom'],
  },
  {
    id: 'jirjirak-world',
    titleEn: 'JIRJIRAK WORLD',
    titleFa: 'جهان جیرجیرک',
    categoryEn: 'Gaming',
    categoryFa: 'بازی‌سازی و شبیه‌سازی سه‌بعدی',
    descEn: 'Expansive open-world adventure universe with stylized low-poly art and spatial dynamic sound.',
    descFa: 'دنیای ماجراجویی تعاملی با آرت‌استایل اختصاصی، هویت بصری پویا و شبیه‌سازی صدا.',
    image: gamingImg,
    accentColor: '#4cd964',
    link: '#project',
    year: '2025',
    client: 'Jirjirak Game Studios',
    techStack: ['Three.js', 'Shader Graph', 'GLSL', 'Spatial Audio'],
  },
  {
    id: 'noura',
    titleEn: 'NOURA BANKING',
    titleFa: 'سامانه نورا',
    categoryEn: 'Fintech Architecture',
    categoryFa: 'سامانه بانکی و زیرساخت مالی',
    descEn: 'Next-generation financial intelligence hub balancing ultra-low latency with biometric security.',
    descFa: 'هاب هوشمند مالی با امنیت بیومتریک، معماری بدون تأخیر و داشبورد تحلیلی مدرن.',
    image: fintechImg,
    accentColor: '#5ac8fa',
    link: '#project',
    year: '2026',
    client: 'Noura Capital Group',
    techStack: ['Microfrontends', 'Biometrics', 'Realtime Stream', 'High Security'],
  },
];

const containerVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: 'blur(6px)',
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const childVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};

export function FeaturedProjectsSection() {
  const { isNight, currentLang, landingLayoutMode } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
  }, []);

  const handleSelect = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (isFa) handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isFa) handlePrev();
        else handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isFa]);

  const activeProject = FEATURED_PROJECTS[currentIndex] || FEATURED_PROJECTS[0];

  return (
    <section 
      id="work" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-20 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col">
        <div className={`w-full flex flex-col ${
          landingLayoutMode === 'editorial' ? 'xl:flex-row-reverse' : 'xl:flex-row'
        } gap-10 lg:gap-14 items-center transition-all duration-500`}>
          
          {/* ===================== LEFT COLUMN (PROJECT META & CONTEXT WITH FLUID TRANSITIONS) ===================== */}
          <div className="xl:w-[32%] flex flex-col items-start z-20 relative w-full">
            
            {/* Section Step Badge & Counter */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>
                {t.featuredProjects.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-brand-gray">
                {t.featuredProjects.category || 'JIRJIRAK ARCHIVE'}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30 font-bold"
                >
                  0{currentIndex + 1} / 0{FEATURED_PROJECTS.length}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Dynamic Text Information Animating on Project Change */}
            <div className="w-full min-h-[290px] flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-start w-full"
                >
                  {/* Main Title */}
                  <motion.h2 
                    variants={childVariants}
                    className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] mb-3 tracking-tight"
                  >
                    {isFa ? activeProject.titleFa : activeProject.titleEn}
                  </motion.h2>

                  {/* Category Subtitle */}
                  <motion.p 
                    variants={childVariants}
                    className="text-xs font-mono tracking-wider text-brand-yellow uppercase mb-3 font-semibold"
                  >
                    {isFa ? activeProject.categoryFa : activeProject.categoryEn}
                  </motion.p>
                  
                  {/* Description */}
                  <motion.p 
                    variants={childVariants}
                    className={`text-sm sm:text-base leading-relaxed mb-6 max-w-md ${
                      isNight ? 'text-brand-gray' : 'text-neutral-400'
                    }`}
                  >
                    {isFa ? activeProject.descFa : activeProject.descEn}
                  </motion.p>

                  {/* Client & Tech Spec Tags */}
                  <motion.div 
                    variants={childVariants}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {activeProject.techStack?.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                          isNight
                            ? 'bg-black/5 border-black/10 text-neutral-700'
                            : 'bg-white/5 border-white/10 text-neutral-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                  
                  {/* View All Projects Action */}
                  <motion.a 
                    variants={childVariants}
                    href="#work" 
                    className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 group ${
                      isNight 
                        ? 'text-[#b3a85c] border-[#b3a85c] hover:text-brand-dark hover:border-brand-dark' 
                        : 'text-brand-yellow border-brand-yellow hover:text-white hover:border-white'
                    }`}
                  >
                    {t.featuredProjects.viewAll}
                    <svg className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.a>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ===================== RIGHT COLUMN (ARCHITECTURAL KINETIC BLADES) ===================== */}
          <div className="xl:w-[68%] relative w-full flex items-center justify-center">
            <div className="w-full">
              <KineticBladesModel
                projects={FEATURED_PROJECTS}
                currentIndex={currentIndex}
                onSelect={handleSelect}
                isNight={isNight}
                isFa={isFa}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
