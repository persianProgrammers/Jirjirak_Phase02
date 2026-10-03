import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';

export interface DepartmentItem {
  id: string;
  number: string;
  titleEn: string;
  titleFa: string;
  sloganEn: string;
  sloganFa: string;
  subtitleEn: string;
  subtitleFa: string;
  tagsEn: string[];
  tagsFa: string[];
  bgImage?: string;
  thumbImage?: string;
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'web-dev',
    number: '01',
    titleEn: 'WEB & DEVELOPMENT',
    titleFa: 'وب و توسعه',
    sloganEn: 'WHERE IDEAS TURN TO CODE',
    sloganFa: 'جایی که ایده‌ها به کد تبدیل می‌شوند',
    subtitleEn: 'Architecture, clean coding, high performance & modern user experience.',
    subtitleFa: 'ساختار، کدنویسی اصولی، عملکرد بالا و تجربه کاربری روان و سریع',
    tagsEn: ['Architecture', 'Clean Code', 'Performance', 'UI / UX Systems'],
    tagsFa: ['معماری نرم‌افزار', 'کدنویسی تمیز', 'عملکرد بالا', 'طراحی رابط و تجربه کاربری'],
    bgImage: '/assets/images/departments/Web-&-Development-opt.webp',
    thumbImage: '/assets/images/departments/Web-&-Development-thumb.webp',
  },
  {
    id: 'seo-analytics',
    number: '02',
    titleEn: 'SEO & ANALYTICS',
    titleFa: 'سئو و تحلیل داده',
    sloganEn: 'DATA DRIVES GROWTH',
    sloganFa: 'داده‌ها پیشران رشد ارگانیک',
    subtitleEn: 'Data analytics, search engine optimization, strategy & organic impact.',
    subtitleFa: 'داده، تحلیل عمیق، استراتژی سئو، بهینه‌سازی و رشد هدفمند پایدار',
    tagsEn: ['Data Analytics', 'Technical SEO', 'Growth Strategy', 'Conversion Rate'],
    tagsFa: ['تحلیل داده', 'سئو تکنیکال', 'استراتژی رشد', 'بهینه‌سازی نرخ تبدیل'],
    bgImage: '/assets/images/departments/Seo-&-Analytics-opt.webp',
    thumbImage: '/assets/images/departments/Seo-&-Analytics-thumb.webp',
  },
  {
    id: 'branding-identity',
    number: '03',
    titleEn: 'BRANDING & IDENTITY',
    titleFa: 'برندینگ و هویت',
    sloganEn: 'BRAND STORY',
    sloganFa: 'داستان متمایز و ماندگار برند',
    subtitleEn: 'Brand strategy, naming, visual identity systems & bespoke storytelling.',
    subtitleFa: 'استراتژی برند، نام‌گذاری، زبان طراحی بصری و روایت‌گری منحصر‌به‌فرد',
    tagsEn: ['Brand Strategy', 'Naming', 'Visual Identity', 'Brand Guidelines'],
    tagsFa: ['استراتژی برند', 'نام‌گذاری', 'هویت بصری', 'کتابچه هویت برند'],
    bgImage: '/assets/images/departments/Branding-&-Identity-opt.webp',
    thumbImage: '/assets/images/departments/Branding-&-Identity-thumb.webp',
  },
  {
    id: 'creative-studio',
    number: '04',
    titleEn: 'CREATIVE STUDIO',
    titleFa: 'گرافیک و انیمیشن',
    sloganEn: 'GRAPHIC & ANIMATION',
    sloganFa: 'خلق دنیاهای بصری پویا و جذاب',
    subtitleEn: 'Creative ideation, motion graphics, 2D/3D illustration & visual art.',
    subtitleFa: 'ایده‌پردازی، طراحی گرافیک، موشن‌گرافیک و تصویرسازی دیجیتال اختصاصی',
    tagsEn: ['Motion Design', 'Visual Art', 'Illustration', 'Creative Direction'],
    tagsFa: ['موشن‌دیزاین', 'تصویرسازی اختصاصی', 'طراحی گرافیک', 'ایده‌پردازی خلاق'],
    bgImage: '/assets/images/departments/Creative-Studio-opt.webp',
    thumbImage: '/assets/images/departments/Creative-Studio-thumb.webp',
  },
  {
    id: 'digital-marketing',
    number: '05',
    titleEn: 'DIGITAL MARKETING & GROWTH',
    titleFa: 'دیجیتال مارکتینگ و رشد',
    sloganEn: 'THINK • CREATE • SHARE • GROW',
    sloganFa: 'تفکر • خلق • اشتراک • رشد',
    subtitleEn: 'Performance campaigns, social networks, content strategy & scaled funnels.',
    subtitleFa: 'طراحی کمپین‌های عملکردمحور، تبلیغات هدفمند، شبکه‌های اجتماعی و جذب مخاطب',
    tagsEn: ['Paid Campaigns', 'Social Media', 'Content Strategy', 'Growth Funnel'],
    tagsFa: ['کمپین‌های تبلیغاتی', 'شبکه‌های اجتماعی', 'استراتژی محتوا', 'قیف رشد و لید'],
    bgImage: '/assets/images/departments/Digital-Marketing-&-Growth-opt.webp',
    thumbImage: '/assets/images/departments/Digital-Marketing-&-Growth-thumb.webp',
  },
  {
    id: 'game-interactive',
    number: '06',
    titleEn: 'GAME STUDIO & INTERACTIVE',
    titleFa: 'بازی‌سازی و تجارب تعاملی',
    sloganEn: 'PLAY • CREATE • INSPIRE',
    sloganFa: 'بازی • آفرینش • الهام‌بخشی',
    subtitleEn: 'Game mechanics design, interactive 3D spaces, programming & playful fun.',
    subtitleFa: 'طراحی گیم‌پلی، دنیاهای سه‌بعدی وب، برنامه‌نویسی خلاق و سرگرمی تعاملی',
    tagsEn: ['Interactive 3D', 'Game Mechanics', 'Creative Coding', 'Character Art'],
    tagsFa: ['بازی‌سازی سه‌بعدی', 'تجارب تعاملی وب', 'برنامه‌نویسی خلاق', 'طراحی مکانیک بازی'],
    bgImage: '/assets/images/departments/Game-Studio-&-Interactive-opt.webp',
    thumbImage: '/assets/images/departments/Game-Studio-&-Interactive-thumb.webp',
  },
  {
    id: 'academy-hub',
    number: '07',
    titleEn: 'ACADEMY & LEARNING HUB',
    titleFa: 'آموزش و توسعه مهارت',
    sloganEn: 'LEARN • APPLY • GROW',
    sloganFa: 'یادگیری • به‌کارگیری • رشد مستمر',
    subtitleEn: 'Online education, practical workshops, courses & lifelong creative community.',
    subtitleFa: 'آموزش آنلاین، کارگاه‌های عملی، دوره‌های تخصصی و جامعه یادگیری پویا',
    tagsEn: ['Specialized Courses', 'Live Workshops', 'Mentorship', 'Creative Hub'],
    tagsFa: ['دوره‌های تخصصی', 'کارگاه‌های عملی', 'جامعه متخصصان', 'منتورشیپ خلاق'],
    bgImage: '/assets/images/departments/Academy-&-Learning-Hub-opt.webp',
    thumbImage: '/assets/images/departments/Academy-&-Learning-Hub-thumb.webp',
  },
];

export function DepartmentFlipBoard() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedHighResMap, setLoadedHighResMap] = useState<Record<string, boolean>>({});
  const boardRef = useRef<HTMLDivElement>(null);

  // Instant Preloading of all thumbnails and optimized webp assets
  useEffect(() => {
    DEPARTMENTS.forEach((dept) => {
      // 1. Preload thumbnail immediately
      if (dept.thumbImage) {
        const thumb = new Image();
        thumb.src = dept.thumbImage;
      }
      // 2. Preload high-res webp
      if (dept.bgImage) {
        const img = new Image();
        img.src = dept.bgImage;
        img.onload = () => {
          setLoadedHighResMap((prev) => ({ ...prev, [dept.id]: true }));
        };
      }
    });
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % DEPARTMENTS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + DEPARTMENTS.length) % DEPARTMENTS.length);
  }, []);

  const goToIndex = useCallback((targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
  }, [currentIndex]);

  // Smooth Auto-cycle every 5.5 seconds (gives ample viewing time, paused on user hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      goToNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, goToNext]);

  const currentDept = DEPARTMENTS[currentIndex];

  // Natural directional mapping:
  // When advancing to next slide (idx increases, dots move top-to-bottom),
  // new content should arrive from top (y: -28) and exit towards bottom (y: 28),
  // perfectly echoing the downward travel of the active dot!
  const titleContainerVariants: Variants = {
    enter: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
    center: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.04,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const wordVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -24 : 24, // Matches the dot navigation direction!
      opacity: 0,
      scale: 0.92,
      filter: 'blur(4px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 22,
        mass: 0.7,
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 24 : -24,
      opacity: 0,
      scale: 0.94,
      filter: 'blur(3px)',
      transition: {
        duration: 0.18,
        ease: 'easeIn' as const,
      },
    }),
  };

  const descContainerVariants: Variants = {
    enter: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.08,
      },
    },
    center: {
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.015,
        staggerDirection: -1,
      },
    },
  };

  const descWordVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -16 : 16,
      opacity: 0,
      filter: 'blur(3px)',
    }),
    center: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 20,
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 16 : -16,
      opacity: 0,
      filter: 'blur(3px)',
      transition: {
        duration: 0.16,
        ease: 'easeIn' as const,
      },
    }),
  };

  const tagsVariants: Variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -16 : 16,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.12,
        y: { type: 'spring', stiffness: 220, damping: 24 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 16 : -16,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.18, ease: 'easeIn' as const },
    }),
  };

  return (
    <div 
      ref={boardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full h-full min-h-[480px] lg:min-h-[520px] self-stretch rounded-2xl transition-colors duration-500 relative overflow-hidden flex items-center justify-center select-none cursor-default border shadow-md ${
        isNight 
          ? 'bg-[#151619] border-brand-surface-light text-brand-light shadow-[0_16px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-[#1a1b1e] border-gray-200 text-brand-dark shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
      }`}
      aria-label="Department Showcase Board"
    >
      {/* Progressive Background Image Layer: Low-res blurred placeholder first, then high-res crisp WebP */}
      <AnimatePresence mode="wait">
        {currentDept.bgImage && (
          <motion.div
            key={`bg-${currentDept.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none flex items-center justify-center"
          >
            {/* 1. Low-res blurred instant placeholder (Blur-up like Hero) */}
            {currentDept.thumbImage && (
              <img
                src={currentDept.thumbImage}
                alt=""
                className={`absolute inset-0 w-full h-full object-contain p-4 sm:p-6 lg:p-8 scale-[0.86] origin-center filter blur-md transition-opacity duration-700 ease-out ${
                  loadedHighResMap[currentDept.id] ? 'opacity-0' : 'opacity-100'
                } ${
                  isNight ? 'brightness-[0.75] contrast-[1.08]' : 'brightness-[0.95] contrast-[1.05]'
                }`}
              />
            )}

            {/* 2. High-res crisp room illustration (Zoomed out to comfortably fit without touching container edges) */}
            <img
              src={currentDept.bgImage}
              alt=""
              onLoad={() => {
                setLoadedHighResMap((prev) => ({ ...prev, [currentDept.id]: true }));
              }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.endsWith('.png')) {
                  target.src = target.src.replace('-opt.webp', '.png');
                }
              }}
              className={`absolute inset-0 w-full h-full object-contain p-4 sm:p-6 lg:p-8 origin-center transition-all duration-700 ease-out ${
                loadedHighResMap[currentDept.id] 
                  ? 'opacity-100 blur-0 scale-[0.86]' 
                  : 'opacity-0 blur-sm scale-[0.88]'
              } ${
                isNight 
                  ? 'brightness-[0.75] contrast-[1.08] saturate-[1.05]' 
                  : 'brightness-[0.92] contrast-[1.08] saturate-[1.05]'
              }`}
            />

            {/* Architectural Subtle Vignette & Gradient (Preserves image details while keeping text clear) */}
            <div 
              className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
                isNight 
                  ? 'bg-gradient-to-b from-[#151619]/75 via-transparent to-[#151619]/75' 
                  : 'bg-gradient-to-b from-white/70 via-white/35 to-white/70'
              }`} 
            />

            {/* Radial vignette spotlight to naturally elevate the centered text */}
            <div 
              className={`absolute inset-0 pointer-events-none ${
                isNight
                  ? 'bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(21,22,25,0.6)_85%)]'
                  : 'bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(245,245,245,0.45)_85%)]'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delicate Ambient Radial Glow */}
      <div 
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl z-[1]"
        style={{
          background: isNight
            ? 'radial-gradient(circle, rgba(255,240,131,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(204,192,105,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Living Amoeba Cell Navigation Dots on the Vertical Edge */}
      <div 
        className="absolute right-3.5 sm:right-5 rtl:right-auto rtl:left-3.5 sm:rtl:left-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 py-3 px-1.5 rounded-full transition-all"
        role="tablist"
        aria-label="Department Navigation"
      >
        {DEPARTMENTS.map((dept, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={dept.id}
              onClick={() => goToIndex(idx)}
              className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
              role="tab"
              aria-selected={isActive}
              aria-label={`Slide ${dept.number}: ${isFa ? dept.titleFa : dept.titleEn}`}
            >
              {/* 2D Living Cell Dot / Amoeba Organic Morphing State */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Active Living Amoeba Cell (Translucent membrane, continuous organic deformation, no inner solid block) */}
                <motion.div
                  initial={false}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.25, 0.95, 1.18, 1],
                          borderRadius: [
                            '50% 50% 50% 50%',
                            '62% 38% 68% 32% / 44% 65% 35% 56%',
                            '41% 59% 33% 67% / 60% 38% 62% 40%',
                            '58% 42% 64% 36% / 37% 58% 42% 63%',
                            '50% 50% 50% 50%',
                          ],
                          rotate: [0, 45, 180, 290, 360],
                          borderColor: '#fff083',
                          backgroundColor: isNight 
                            ? 'rgba(255, 240, 131, 0.18)' 
                            : 'rgba(204, 192, 105, 0.22)',
                          boxShadow: isNight
                            ? [
                                '0 0 8px rgba(255,240,131,0.5), inset 0 0 6px rgba(255,240,131,0.3)',
                                '0 0 16px rgba(255,240,131,0.85), inset 0 0 9px rgba(255,240,131,0.45)',
                                '0 0 10px rgba(255,240,131,0.55), inset 0 0 6px rgba(255,240,131,0.3)',
                                '0 0 18px rgba(255,240,131,0.9), inset 0 0 10px rgba(255,240,131,0.5)',
                                '0 0 8px rgba(255,240,131,0.5), inset 0 0 6px rgba(255,240,131,0.3)',
                              ]
                            : [
                                '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                '0 0 14px rgba(204,192,105,0.8), inset 0 0 8px rgba(204,192,105,0.45)',
                                '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                                '0 0 15px rgba(204,192,105,0.85), inset 0 0 9px rgba(204,192,105,0.48)',
                                '0 0 8px rgba(204,192,105,0.5), inset 0 0 5px rgba(204,192,105,0.3)',
                              ],
                        }
                      : {
                          scale: 1,
                          borderRadius: '50%',
                          rotate: 0,
                          borderColor: isNight 
                            ? 'rgba(255, 255, 255, 0.22)' 
                            : 'rgba(0, 0, 0, 0.22)',
                          backgroundColor: isNight 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'rgba(0, 0, 0, 0.08)',
                          boxShadow: '0 0 0px rgba(0,0,0,0)',
                        }
                  }
                  transition={
                    isActive
                      ? {
                          duration: 3.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                      : {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1], // Fluid deflating release from living back to dormant dot
                        }
                  }
                  className={`w-3.5 h-3.5 border transition-colors ${
                    !isActive ? (isNight ? 'group-hover:border-brand-yellow/80 group-hover:scale-110' : 'group-hover:border-[#b3a85c]/80 group-hover:scale-110') : ''
                  }`}
                />
              </div>

              {/* Tooltip on Hover */}
              <span className={`absolute ${
                isFa 
                  ? 'left-full ml-2.5' 
                  : 'right-full mr-2.5'
              } px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 border shadow-md z-40 ${
                isNight 
                  ? 'bg-brand-dark text-brand-yellow border-brand-surface-light' 
                  : 'bg-white text-[#b3a85c] border-gray-200'
              }`}>
                {dept.number} • {isFa ? dept.titleFa : dept.titleEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Single Container Stage (Static Anchor Layout with Separator Firmly Anchored) */}
      <div className="w-full flex items-center justify-center px-4 sm:px-8 lg:px-10 py-7 relative z-10">
        {/* Subtle Central Focal Scrim (Enhances contrast behind text without altering corner vignette) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isNight
              ? 'bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.22)_50%,_transparent_75%)]'
              : 'bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.65)_0%,_rgba(255,255,255,0.3)_50%,_transparent_75%)]'
          }`}
        />

        <div
          className="w-full max-w-xl flex flex-col items-center justify-center text-center relative z-10"
        >
          {/* Distinctly Animated Title Header with Word-by-Word Kinetic Animation */}
          <div className="min-h-[42px] sm:min-h-[48px] flex items-center justify-center w-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.h3
                key={`title-${currentDept.id}`}
                custom={direction}
                variants={titleContainerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-center leading-snug flex flex-wrap items-center justify-center gap-x-2 transition-colors duration-300 ${
                  isNight ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]' : 'text-brand-dark drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]'
                }`}
              >
                {(isFa ? currentDept.titleFa : currentDept.titleEn).split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={`w-${wordIdx}`}
                    custom={direction}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* 3. STATIC / PERMANENT DIVIDER LINE (Remains completely still and rock-solid during transitions) */}
          <div className="flex items-center justify-center my-4 sm:my-5 w-full pointer-events-none">
            <div className={`h-[1.5px] w-64 sm:w-80 md:w-96 max-w-md rounded-full transition-all duration-500 ${
              isNight 
                ? 'bg-gradient-to-r from-transparent via-brand-yellow/75 to-transparent shadow-[0_0_12px_rgba(255,240,131,0.45)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]' 
                : 'bg-gradient-to-r from-transparent via-[#b3a85c]/75 to-transparent drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]'
            }`} />
          </div>

          {/* 4. Distinctly Animated Description Paragraph with Word-by-Word Staggered Kinetic Timing */}
          <div className="min-h-[56px] sm:min-h-[64px] flex items-center justify-center w-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.p
                key={`desc-${currentDept.id}`}
                custom={direction}
                variants={descContainerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto text-center font-medium flex flex-wrap items-center justify-center gap-x-1.5 transition-colors duration-300 ${
                  isNight 
                    ? 'text-white/95 [text-shadow:_0_2px_10px_rgba(0,0,0,0.95),_0_1px_3px_rgba(0,0,0,0.9)]' 
                    : 'text-neutral-900 [text-shadow:_0_1px_8px_rgba(255,255,255,0.95),_0_1px_2px_rgba(255,255,255,0.9)]'
                }`}
              >
                {(isFa ? currentDept.subtitleFa : currentDept.subtitleEn).split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={`dw-${wordIdx}`}
                    custom={direction}
                    variants={descWordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 5. Distinctly Animated Activity Tags (Clean, Minimal Pill Badges) */}
          <div className="min-h-[46px] flex items-center justify-center w-full mt-4 sm:mt-5 overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`tags-${currentDept.id}`}
                custom={direction}
                variants={tagsVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-lg mx-auto"
              >
                {(isFa ? currentDept.tagsFa : currentDept.tagsEn).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-normal tracking-normal border transition-all duration-200 text-center ${
                      isNight 
                        ? 'bg-brand-surface-light/40 border-white/[0.08] text-brand-light/90 hover:border-brand-yellow/40 hover:text-brand-yellow' 
                        : 'bg-neutral-50 border-gray-200 text-neutral-700 hover:border-[#b3a85c] hover:text-[#b3a85c]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DepartmentFlipBoard;
