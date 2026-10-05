import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ProjectItem } from '../components/featured-models/types';
import { KineticBladesModel } from '../components/featured-models/KineticBladesModel';
import { FilterTabItem } from '../../../components/ui/filters/types';
import { MasterFilterRenderer } from '../../../components/ui/filters/MasterFilterRenderer';
import { FilterSwitcherPanel } from '../../../components/ui/filters/FilterSwitcherPanel';

// Standard public asset paths served by Vite
const toyooranImg = '/assets/images/projects/project_toyooran.png';
const kafiImg = '/assets/images/projects/project_kafi_1790411104227.jpg';
const gamingImg = '/assets/images/projects/project_gaming_1790411118596.jpg';
const fintechImg = '/assets/images/projects/project_fintech_1790411153505.jpg';

// Department Category Definitions
const PROJECT_DEPARTMENTS: FilterTabItem[] = [
  { id: 'all', labelEn: 'All Projects', labelFa: 'همه پروژه‌ها' },
  { id: 'web-dev', labelEn: 'Web & Dev', labelFa: 'وب و توسعه' },
  { id: 'branding', labelEn: 'Branding & Identity', labelFa: 'برندینگ و هویت' },
  { id: 'game', labelEn: 'Game & 3D', labelFa: 'بازی‌سازی و سه‌بعدی' },
  { id: 'seo-analytics', labelEn: 'SEO & Growth', labelFa: 'سئو و رشد' },
  { id: 'creative', labelEn: 'Creative Studio', labelFa: 'استودیو خلاقیت' },
  { id: 'marketing', labelEn: 'Marketing', labelFa: 'دیجیتال مارکتینگ' },
  { id: 'academy', labelEn: 'Academy', labelFa: 'آموزش و آکادمی' },
];

// Rich, believable featured projects for every department
const ALL_ARCHIVE_PROJECTS: ProjectItem[] = [
  // 1. Web & Development
  {
    id: 'toyooran',
    department: 'web-dev',
    titleEn: 'TOYOORAN',
    titleFa: 'طیوران',
    categoryEn: 'Web / Brand / Experience',
    categoryFa: 'وب‌سایت / هویت برند / تجربه کاربری',
    descEn: 'Architectural, immersive digital flagship capturing sensory depth and physical space.',
    descFa: 'طراحی پیشرو و معماری دیجیتال برای تجربه‌ای فراتر از یک وب‌سایت متعارف صنعتی.',
    image: toyooranImg,
    accentColor: '#fff083',
    link: '#project',
    year: '2026',
    client: 'Toyooran Agro Industrial',
    techStack: ['Spatial 3D', 'WebGL', 'Tailwind 4', 'GSAP'],
  },
  {
    id: 'noura',
    department: 'web-dev',
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
  {
    id: 'atelier-sol',
    department: 'web-dev',
    titleEn: 'ATELIER SOL',
    titleFa: 'آتلیه سول',
    categoryEn: 'Architectural E-Commerce',
    categoryFa: 'تجارت الکترونیک معماری و فضایی',
    descEn: 'Minimalist high-fashion portfolio with kinetic typography and ultra-fast headless checkout.',
    descFa: 'پلتفرم تجارت الکترونیک مینیمال با تایپوگرافی کینتیک و معماری هدلس فوق‌سریع.',
    image: '/assets/images/projects/project_atelier_sol.jpg',
    accentColor: '#e5a952',
    link: '#project',
    year: '2026',
    client: 'Sol Maison de Couture',
    techStack: ['Next.js 15', 'Shopify Storefront', 'Framer Motion', 'Tailwind'],
  },

  // 2. Branding & Identity
  {
    id: 'kafi',
    department: 'branding',
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
    id: 'zirin',
    department: 'branding',
    titleEn: 'ZIRIN LUXURY',
    titleFa: 'جواهرات زرین',
    categoryEn: 'Visual Identity & Packaging',
    categoryFa: 'هویت بصری لوکس و بسته‌بندی',
    descEn: 'Bespoke monogram typography, dark obsidian tactile stationery, and gilded architectural seal.',
    descFa: 'طراحی مونوگرام اختصاصی، اوراق اداری بافت‌دار ابسیدین و نشان طلایی معماری.',
    image: '/assets/images/projects/project_zirin.jpg',
    accentColor: '#ffd700',
    link: '#project',
    year: '2026',
    client: 'Zirin High Jewelry',
    techStack: ['Brand Codex', 'Editorial Print', 'Packaging Design', 'Typography'],
  },
  {
    id: 'kohan',
    department: 'branding',
    titleEn: 'KOHAN LIVING',
    titleFa: 'کهن دیزاین',
    categoryEn: 'Heritage Living Identity',
    categoryFa: 'هویت معاصر میراث ایرانی',
    descEn: 'Bridging timeless Persian geometry with Scandinavian functional brutalism.',
    descFa: 'پیوند هندسه اصیل ایرانی با مینی‌مالیسم عملکردگرای اسکاندیناوی در خانه مدرن.',
    image: '/assets/images/departments/Branding-&-Identity.png',
    accentColor: '#b3a85c',
    link: '#project',
    year: '2025',
    client: 'Kohan Studio',
    techStack: ['Visual System', 'Spatial Curation', 'Editorial Book'],
  },

  // 3. Game Studio & Interactive
  {
    id: 'jirjirak-world',
    department: 'game',
    titleEn: 'JIRJIRAK WORLD',
    titleFa: 'جهان جیرجیرک',
    categoryEn: 'Gaming Universe',
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
    id: 'cyber-chaharbagh',
    department: 'game',
    titleEn: 'CYBER CHAHARBAGH',
    titleFa: 'چهارباغ سایبر',
    categoryEn: '3D Spatial Exploration',
    categoryFa: 'اکتشاف سه‌بعدی فضای تعاملی',
    descEn: 'Futuristic interactive reinterpretation of classic Persian paradise gardens with real-time reflections.',
    descFa: 'بازآفرینی تعاملی باغ‌های کلاسیک ایرانی در محیط سایبرپانک سه‌بعدی با نورپردازی داینامیک.',
    image: '/assets/images/projects/project_cyber_chaharbagh.jpg',
    accentColor: '#00f5d4',
    link: '#project',
    year: '2026',
    client: 'Metropolis Virtual Labs',
    techStack: ['WebGL', 'GLTF Pipeline', 'Spatial Acoustics', 'React Three Fiber'],
  },
  {
    id: 'robaee',
    department: 'game',
    titleEn: 'ROBAEE KINETICS',
    titleFa: 'رباعی کینتیک',
    categoryEn: 'Typographic Physics Game',
    categoryFa: 'بازی فیزیک‌محور تایپوگرافی',
    descEn: 'Award-winning puzzle game where Nastaliq calligraphy curves morph to solve gravity challenges.',
    descFa: 'بازی پازل تعاملی که در آن انحناهای خط نستعلیق برای حل چالش‌های گرانشی تغییر شکل می‌دهند.',
    image: '/assets/images/departments/Game-Studio-&-Interactive.png',
    accentColor: '#ff007f',
    link: '#project',
    year: '2025',
    client: 'Indie Game Foundation',
    techStack: ['Matter.js', 'Canvas 2D', 'Procedural Audio', 'Font Shaders'],
  },

  // 4. SEO & Analytics
  {
    id: 'parsi-radar',
    department: 'seo-analytics',
    titleEn: 'PARSI RADAR',
    titleFa: 'رادار پارسی',
    categoryEn: 'Organic Search Engine',
    categoryFa: 'موتور رشد ارگانیک و سئو تخصصی',
    descEn: 'Algorithmic topical authority system scaling organic enterprise search footprint by 440%.',
    descFa: 'سیستم ساختاریافته معماری محتوا و اتوریتی موضعی با رشد ۴۴۰ درصدی ترافیک ارگانیک ارزیابی‌شده.',
    image: '/assets/images/departments/Seo-&-Analytics.png',
    accentColor: '#10b981',
    link: '#project',
    year: '2026',
    client: 'Radar FinTech Portal',
    techStack: ['Schema Graph', 'Core Web Vitals', 'Semantic Clustering', 'SERP Intel'],
  },
  {
    id: 'data-pulse',
    department: 'seo-analytics',
    titleEn: 'DATA PULSE',
    titleFa: 'نبض داده',
    categoryEn: 'Real-time Telemetry & CRO',
    categoryFa: 'تلمتری نرخ تبدیل و بهینه‌سازی',
    descEn: 'Full-funnel behavioral analytics engine capturing real user paths with zero privacy invasion.',
    descFa: 'داشبورد بلادرنگ رفتارشناسی کاربر و تست‌های چندمتغیره برای افزایش نرخ تبدیل فروشگاهی.',
    image: '/assets/images/journal/seo-growth.jpg',
    accentColor: '#06b6d4',
    link: '#project',
    year: '2025',
    client: 'ScaleCommerce Global',
    techStack: ['Clickhouse', 'Event Pipeline', 'CRO Experiments', 'Attribution Matrix'],
  },

  // 5. Creative Studio
  {
    id: 'simorgh-motion',
    department: 'creative',
    titleEn: 'SIMORGH REEL',
    titleFa: 'موشن سیمرغ',
    categoryEn: '3D Brand Cinematic',
    categoryFa: 'فیلم کوتاه برند و انیمیشن سه‌بعدی',
    descEn: 'Mythological Persian flight narrative visualized through dynamic cloth physics and gold leaf particles.',
    descFa: 'روایت سینمایی هویت برند با شبیه‌سازی فیزیک پارچه، ذرات طلای معلق و نورپردازی استودیویی.',
    image: '/assets/images/departments/Creative-Studio.png',
    accentColor: '#f59e0b',
    link: '#project',
    year: '2026',
    client: 'National Symphony Hall',
    techStack: ['Cinema 4D', 'Redshift', 'Houdini FX', 'Sound Design'],
  },
  {
    id: 'negar-frame',
    department: 'creative',
    titleEn: 'NEGAR FRAME',
    titleFa: 'قاب نگار',
    categoryEn: 'Generative Spatial Installation',
    categoryFa: 'چیدمان فضایی و آرت ژنراتیو',
    descEn: 'Sensory physical pavilion reactive to real visitor movements through lidar spatial tracking.',
    descFa: 'اینستالیشن تعاملی گالری با سنسورهای لایدار و تولید بلادرنگ نقش‌مایه‌های هندسی.',
    image: '/assets/images/journal/killed-idea.jpg',
    accentColor: '#ec4899',
    link: '#project',
    year: '2025',
    client: 'Tehran Contemporary Biennial',
    techStack: ['TouchDesigner', 'Lidar Sensors', 'Spatial Projection', 'Generative GLSL'],
  },

  // 6. Digital Marketing & Growth
  {
    id: 'boomi-launch',
    department: 'marketing',
    titleEn: 'BOOMI LAUNCH',
    titleFa: 'کمپین بومی',
    categoryEn: 'Omni-channel Viral Storytelling',
    categoryFa: 'روایت‌گری یکپارچه و کمپین وایرال',
    descEn: 'Cohesive launch strategy generating 1.8M organic impressions and 38,000 active community members.',
    descFa: 'استراتژی لانچ محصول با ۱.۸ میلیون ایمپرشن ارگانیک و جذب ۳۸ هزار عضو فعال در ۴۸ ساعت.',
    image: '/assets/images/departments/Digital-Marketing-&-Growth.png',
    accentColor: '#f97316',
    link: '#project',
    year: '2026',
    client: 'Boomi Smart Hardware',
    techStack: ['Viral Architecture', 'Performance Marketing', 'Creator Matrix', 'Funnel Optimization'],
  },

  // 7. Academy & Learning
  {
    id: 'design-codex',
    department: 'academy',
    titleEn: 'DESIGN CODEX',
    titleFa: 'کودکس دیزاین',
    categoryEn: 'Creative Engineering Bootcamp',
    categoryFa: 'بوت‌کمپ مهندسی خلاقیت و دیزاین',
    descEn: 'Intensive studio masterclasses training senior engineers in spatial UI and creative design engineering.',
    descFa: 'دوره فشرده و تخصصی تربیت معماران فرانت‌اند در تلفیق دیزاین معمارانه و کدنویسی پیشرفته.',
    image: '/assets/images/departments/Academy-&-Learning-Hub.png',
    accentColor: '#8b5cf6',
    link: '#project',
    year: '2026',
    client: 'Jirjirak Academy',
    techStack: ['Curriculum Design', 'Interactive Labs', 'Spatial UI Frameworks', 'Mentorship'],
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
  const { isNight, currentLang, landingLayoutMode, filterModelId } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Compute tabs with dynamic real counts
  const filterTabsWithCounts = useMemo(() => {
    return PROJECT_DEPARTMENTS.map((dept) => ({
      ...dept,
      count: dept.id === 'all'
        ? ALL_ARCHIVE_PROJECTS.length
        : ALL_ARCHIVE_PROJECTS.filter((p) => p.department === dept.id).length,
    }));
  }, []);

  // Filtered project list based on current active department
  const filteredProjects = useMemo(() => {
    if (selectedDept === 'all') return ALL_ARCHIVE_PROJECTS;
    return ALL_ARCHIVE_PROJECTS.filter((p) => p.department === selectedDept);
  }, [selectedDept]);

  // Ensure currentIndex stays within bounds when filtering
  useEffect(() => {
    if (currentIndex >= filteredProjects.length) {
      setCurrentIndex(0);
    }
  }, [filteredProjects.length, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  }, [filteredProjects.length]);

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

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  return (
    <section 
      id="work" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-20 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: STEP BADGE, TITLE, AND DYNAMIC STATUS                     */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-[#fff083]' : 'text-[#8f6b00]'}`}>
                {t.featuredProjects.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-brand-gray">
                {t.featuredProjects.category || 'JIRJIRAK ARCHIVE'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {isFa ? 'آرشیو آثار و پروژه‌های شاخص' : 'Featured Works & Archive'}
            </h2>
          </div>

          {/* Active Projects Counter Pill */}
          <div className={`hidden sm:flex items-center gap-2.5 text-xs font-mono font-semibold px-3.5 py-1.5 rounded-full border shrink-0 ${
            isNight ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-black/5 border-black/10 text-neutral-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isNight ? 'bg-[#fff083] animate-pulse' : 'bg-[#8f6b00] animate-pulse'}`} />
            <span>
              {isFa
                ? `${filteredProjects.length} پروژه در این شاخه`
                : `${filteredProjects.length} Projects in Department`}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 20-MODELS SWITCHER PANEL & ACTIVE MODEL FILTER DOCK           */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col gap-4 mb-8 sm:mb-12">
          {/* Creative Switcher Control Panel */}
          <FilterSwitcherPanel
            isNight={isNight}
            isFa={isFa}
            isDarkBg={isNight}
          />

          {/* Render Current Selected Filter Model from the 20 Models */}
          <MasterFilterRenderer
            modelId={filterModelId}
            items={filterTabsWithCounts}
            activeId={selectedDept}
            onChange={(deptId) => {
              setSelectedDept(deptId);
              setCurrentIndex(0);
            }}
            isNight={isNight}
            isFa={isFa}
            isDarkBg={isNight}
            layoutId="featuredProjectsDeptFilter"
          />
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN SHOWCASE: META INFO (LEFT) & KINETIC BLADES (RIGHT)              */}
        {/* ========================================================================= */}
        <div className={`w-full flex flex-col ${
          landingLayoutMode === 'editorial' ? 'xl:flex-row-reverse' : 'xl:flex-row'
        } gap-10 lg:gap-14 items-center transition-all duration-500`}>
          
          {/* ===================== LEFT COLUMN (PROJECT META & CONTEXT WITH FLUID TRANSITIONS) ===================== */}
          <div className="xl:w-[32%] flex flex-col items-start z-20 relative w-full">
            
            {/* Project Index in Current Department */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-brand-gray">
                {isFa ? 'پروژه منتخب' : 'FEATURED DELIVERABLE'}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${selectedDept}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    isNight 
                      ? 'bg-[#fff083]/15 text-[#fff083] border-[#fff083]/30' 
                      : 'bg-[#8f6b00]/15 text-[#8f6b00] border-[#8f6b00]/30'
                  }`}
                >
                  0{currentIndex + 1} / 0{filteredProjects.length}
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
                  <motion.h3 
                    variants={childVariants}
                    className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] mb-3 tracking-tight"
                  >
                    {isFa ? activeProject.titleFa : activeProject.titleEn}
                  </motion.h3>

                  {/* Category Subtitle */}
                  <motion.p 
                    variants={childVariants}
                    className={`text-xs font-mono tracking-wider uppercase mb-3 font-semibold ${
                      isNight ? 'text-[#fff083]' : 'text-[#8f6b00]'
                    }`}
                  >
                    {isFa ? activeProject.categoryFa : activeProject.categoryEn}
                  </motion.p>
                  
                  {/* Description */}
                  <motion.p 
                    variants={childVariants}
                    className={`text-sm sm:text-base leading-relaxed mb-6 max-w-md ${
                      isNight ? 'text-neutral-400' : 'text-neutral-700'
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
                            ? 'bg-white/5 border-white/10 text-neutral-300'
                            : 'bg-black/5 border-black/10 text-neutral-700'
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
                    className={`text-xs font-bold uppercase tracking-widest border-b-2 pb-1 transition-colors flex items-center gap-2 group cursor-pointer ${
                      isNight 
                        ? 'text-[#fff083] border-[#fff083] hover:text-white hover:border-white' 
                        : 'text-[#8f6b00] border-[#8f6b00] hover:text-black hover:border-black'
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
                key={selectedDept}
                projects={filteredProjects}
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

export default FeaturedProjectsSection;

