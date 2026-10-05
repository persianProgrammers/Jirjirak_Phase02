import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Folder, Layers } from 'lucide-react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { ProjectItem } from '../components/featured-models/types';
import { KineticBladesModel } from '../components/featured-models/KineticBladesModel';
import { FilterTabItem } from '../../../components/ui/filters/types';
import { RollingLadderStoryIcon } from '../components/story-icons/StoryIcons';

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

// Exact Geometric Sci-Fi Hexagon Badge (identical to HeroDepartmentShowcase)
function ArchivalBadge({
  active,
  children,
  isNight,
  size = 'md',
}: {
  active: boolean;
  children: React.ReactNode;
  isNight: boolean;
  size?: 'sm' | 'md';
}) {
  const sizeClass = size === 'sm' ? 'w-7 h-8' : 'w-8 h-9 sm:w-9 sm:h-10';
  return (
    <div className={`relative ${sizeClass} flex items-center justify-center shrink-0`}>
      <svg
        viewBox="0 0 28 32"
        className={`w-full h-full transition-all duration-300 ${
          active
            ? isNight
              ? 'text-brand-yellow drop-shadow-[0_0_10px_rgba(255,240,131,0.85)] scale-105'
              : 'text-[#8f6b00] drop-shadow-[0_0_8px_rgba(143,107,0,0.5)] scale-105'
            : isNight
            ? 'text-neutral-500 group-hover:text-brand-yellow group-hover:drop-shadow-[0_0_6px_rgba(255,240,131,0.4)]'
            : 'text-neutral-400 group-hover:text-[#8f6b00] group-hover:drop-shadow-[0_0_6px_rgba(143,107,0,0.3)]'
        }`}
        fill="none"
      >
        <polygon
          points="14,1.5 26.5,8.8 26.5,23.2 14,30.5 1.5,23.2 1.5,8.8"
          fill={
            active
              ? isNight
                ? 'rgba(255, 240, 131, 0.18)'
                : 'rgba(143, 107, 0, 0.15)'
              : isNight
              ? 'rgba(20, 20, 20, 0.75)'
              : 'rgba(240, 238, 232, 0.85)'
          }
          stroke="currentColor"
          strokeWidth={active ? '1.6' : '1.1'}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
          active
            ? isNight
              ? 'text-brand-yellow'
              : 'text-[#8f6b00]'
            : isNight
            ? 'text-neutral-400 group-hover:text-brand-yellow'
            : 'text-neutral-600 group-hover:text-[#8f6b00]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Animated Mechanical Vintage Cinema Film Projector (دستگاه آپارات سینمایی کلاسیک با قرقره‌های چرخان، نوار آپارات و پرتو نور انیمیشنی)
function VintageCinemaProjector({
  isNight,
  isFa,
}: {
  isNight: boolean;
  isFa: boolean;
}) {
  const activeColor = isNight ? '#FFF083' : '#8f6b00';
  const bodyColor = isNight ? '#0A0A0A' : '#f5f3ec';
  const metalStroke = isNight ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)';
  const mutedColor = isNight ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';

  return (
    <div 
      className="relative flex items-center shrink-0 select-none group"
      title={isFa ? 'پروژکتور سینمایی ۳۵ میلیمتری آرشیو استودیو جیرجیرک' : 'Jirjirak 35mm Archive Cinema Projector'}
    >
      <div className={`relative h-10 sm:h-11 px-2.5 rounded-xl border flex items-center justify-center shrink-0 backdrop-blur-md transition-all duration-300 ${
        isNight
          ? 'bg-neutral-900/80 border-white/10 shadow-[0_0_16px_rgba(255,240,131,0.12)]'
          : 'bg-white/80 border-black/10 shadow-sm'
      }`}>
        {/* SVG Projector Art - in Persian (RTL) pointing to the left shines onto filters; in English (LTR) flipped horizontally pointing to the right */}
        <div className={`relative w-[60px] sm:w-[66px] h-[36px] sm:h-[40px] flex items-center justify-center ${
          isFa ? '' : 'scale-x-[-1]'
        }`}>
          <svg
            viewBox="-20 0 60 48"
            className="w-full h-full overflow-visible drop-shadow-sm"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="archiveProjectorBeamGrad" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor={activeColor} stopOpacity="0.85" />
                <stop offset="40%" stopColor={activeColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Glowing Conical Light Beam streaming from the front lens */}
            <motion.polygon
              points="12,27 -20,5 -20,49"
              fill="url(#archiveProjectorBeamGrad)"
              animate={{
                opacity: [0.55, 0.95, 0.65, 1, 0.55],
                scaleY: [0.98, 1.02, 0.98],
              }}
              style={{ transformOrigin: '12px 27px' }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />

            {/* Floating Dust / Cinema Sparkles drifting through the light cone */}
            <motion.circle
              cx="-4"
              cy="23"
              r="0.8"
              fill={activeColor}
              animate={{
                x: [0, -7, -15],
                y: [0, -3, 2],
                opacity: [0, 0.9, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
            />
            <motion.circle
              cx="4"
              cy="28"
              r="0.7"
              fill={activeColor}
              animate={{
                x: [0, -8, -14],
                y: [0, 4, -2],
                opacity: [0, 0.8, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut', delay: 0.7 }}
            />

            {/* Reel 2 (Background Reel - Spins smoothly) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              style={{ transformOrigin: '28px 12px' }}
            >
              <circle cx="28" cy="12" r="7" fill={bodyColor} stroke={isNight ? 'white' : metalStroke} strokeWidth="1.4" />
              <circle cx="28" cy="12" r="2" fill="none" stroke={isNight ? 'white' : metalStroke} strokeWidth="1" />
              <line x1="28" y1="5" x2="28" y2="9" stroke={isNight ? 'white' : metalStroke} strokeWidth="1.2" />
              <line x1="28" y1="15" x2="28" y2="19" stroke={isNight ? 'white' : metalStroke} strokeWidth="1.2" />
              <line x1="21" y1="12" x2="25" y2="12" stroke={isNight ? 'white' : metalStroke} strokeWidth="1.2" />
              <line x1="31" y1="12" x2="35" y2="12" stroke={isNight ? 'white' : metalStroke} strokeWidth="1.2" />
            </motion.g>

            {/* Film Strip (Threading through the machine) */}
            <motion.path
              d="M 28 19 C 28 26, 22 26, 18 20 C 14 14, 18 9, 20 9"
              fill="none"
              stroke={activeColor}
              strokeWidth="1.4"
              strokeDasharray="2 2.5"
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 1.9, ease: 'linear' }}
            />

            {/* Projector Body & Legs */}
            <path d="M 22,34 L 20,40 M 30,34 L 32,40" stroke={isNight ? 'white' : metalStroke} strokeWidth="1.4" strokeLinecap="round" />
            <line x1="16" y1="40" x2="36" y2="40" stroke={isNight ? 'white' : metalStroke} strokeWidth="1.4" strokeLinecap="round" />
            
            <rect x="18" y="20" width="16" height="14" rx="2" fill={bodyColor} stroke={isNight ? 'white' : metalStroke} strokeWidth="1.4" />
            
            {/* Body Mechanical Details */}
            <circle cx="26" cy="27" r="3" fill="none" stroke={isNight ? 'white' : metalStroke} strokeWidth="1" />
            <line x1="22" y1="27" x2="30" y2="27" stroke={isNight ? 'white' : metalStroke} strokeWidth="1" />
            <circle cx="26" cy="27" r="1" fill={activeColor} />

            {/* Lens Tube (Front) */}
            <path d="M 18,24 L 12,22 L 12,32 L 18,30 Z" fill={bodyColor} stroke={isNight ? 'white' : metalStroke} strokeWidth="1.4" />
            <line x1="15" y1="23" x2="15" y2="31" stroke={activeColor} strokeWidth="1.4" />

            {/* Reel 1 (Foreground Reel - Spins smoothly) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.8, ease: 'linear' }}
              style={{ transformOrigin: '20px 16px' }}
            >
              <circle cx="20" cy="16" r="7" fill={bodyColor} stroke={activeColor} strokeWidth="1.4" />
              <circle cx="20" cy="16" r="2" fill="none" stroke={activeColor} strokeWidth="1" />
              <line x1="20" y1="9" x2="20" y2="13" stroke={activeColor} strokeWidth="1.2" />
              <line x1="20" y1="19" x2="20" y2="23" stroke={activeColor} strokeWidth="1.2" />
              <line x1="13" y1="16" x2="17" y2="16" stroke={activeColor} strokeWidth="1.2" />
              <line x1="23" y1="16" x2="27" y2="16" stroke={activeColor} strokeWidth="1.2" />
            </motion.g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function renderArchivalIcon(deptId: string) {
  switch (deptId) {
    case 'all':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      );
    case 'web-dev':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 4l-4 16" />
        </svg>
      );
    case 'branding':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'game':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h4m-2-2v4m9-2h.01m3 0h.01" />
        </svg>
      );
    case 'seo-analytics':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          <circle cx="13" cy="7" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'creative':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'marketing':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7c-.571 0-1.115.12-1.564.337z" />
        </svg>
      );
    case 'academy':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    default:
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

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
  const navigate = useNavigate();
  const { isNight, currentLang, landingLayoutMode, filterModelId } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Buttery-smooth horizontal click+drag and touch+drag scroller with kinetic momentum physics
  const filtersScrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const lastMouseX = useRef(0);
  const lastMouseTime = useRef(0);
  const mouseVelocity = useRef(0);
  const momentumRaf = useRef<number | null>(null);
  const hasDragged = useRef(false);
  const dragDistance = useRef(0);
  const touchStartX = useRef(0);

  const stopMomentum = useCallback(() => {
    if (momentumRaf.current) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  }, []);

  const handleFiltersMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!filtersScrollRef.current) return;
    stopMomentum();
    setIsMouseDown(true);
    hasDragged.current = false;
    dragDistance.current = 0;
    lastMouseX.current = e.clientX;
    lastMouseTime.current = performance.now();
    mouseVelocity.current = 0;
  };

  const handleFiltersMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !filtersScrollRef.current) return;
    const now = performance.now();
    const dt = now - lastMouseTime.current;
    const dx = e.clientX - lastMouseX.current;

    dragDistance.current += Math.abs(dx);
    if (dragDistance.current > 4) {
      hasDragged.current = true;
    }

    // Direct, light and responsive drag (1.3x for fluid feel)
    filtersScrollRef.current.scrollLeft -= dx * 1.3;

    if (dt > 0) {
      mouseVelocity.current = dx / dt;
    }

    lastMouseX.current = e.clientX;
    lastMouseTime.current = now;
  };

  const handleFiltersMouseUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);

    // If mouse had flick velocity, apply smooth momentum glide
    if (Math.abs(mouseVelocity.current) > 0.12 && filtersScrollRef.current) {
      let currentSpeed = mouseVelocity.current * 18;
      const glide = () => {
        if (!filtersScrollRef.current || Math.abs(currentSpeed) < 0.2) {
          momentumRaf.current = null;
          return;
        }
        filtersScrollRef.current.scrollLeft -= currentSpeed;
        currentSpeed *= 0.93; // buttery-smooth friction decay
        momentumRaf.current = requestAnimationFrame(glide);
      };
      momentumRaf.current = requestAnimationFrame(glide);
    }

    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  const handleFiltersTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    stopMomentum();
    hasDragged.current = false;
    if (e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleFiltersTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const deltaX = Math.abs(e.touches[0].pageX - touchStartX.current);
      if (deltaX > 7) {
        hasDragged.current = true;
      }
    }
  };

  const handleFiltersTouchEnd = () => {
    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  const handleFiltersWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!filtersScrollRef.current) return;
    if (e.deltaY !== 0 && !e.shiftKey) {
      // Smooth horizontal scroll on mouse wheel
      filtersScrollRef.current.scrollBy({ left: e.deltaY * 0.9, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      stopMomentum();
    };
  }, [stopMomentum]);

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

  // Ensure currentIndex stays within bounds when filtering, otherwise reset to closed
  useEffect(() => {
    if (currentIndex !== null && currentIndex >= filteredProjects.length) {
      setCurrentIndex(null);
    }
  }, [filteredProjects.length, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % filteredProjects.length;
    });
  }, [filteredProjects.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === null) return filteredProjects.length - 1;
      return (prev - 1 + filteredProjects.length) % filteredProjects.length;
    });
  }, [filteredProjects.length]);

  // Toggle book: clicking open book closes it, clicking closed book opens it
  const handleSelect = useCallback((idx: number) => {
    setCurrentIndex((prev) => (prev === idx ? null : idx));
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

  const activeProject = currentIndex !== null ? filteredProjects[currentIndex] : null;
  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';

  return (
    <section 
      id="work" 
      ref={containerRef} 
      data-cursor="project" 
      className={`py-28 sm:py-32 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-8 sm:gap-10 lg:gap-12">
        
        {/* ========================================================================= */}
        {/* ROW 1: EDITORIAL TEXT HEADER & PUNCHY CHALLENGER CTA                      */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-1">
          <div className="flex flex-col items-start max-w-2xl">
            {/* Pre-title / Step Badge */}
            <div className="flex items-center gap-4 mb-3 sm:mb-4">
              <span className={`text-xs font-semibold tracking-widest font-mono ${accentText}`}>
                {isFa ? '۰۲ / ۰۶' : '02 / 06'}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase opacity-75">
                {isFa ? 'آثار برگزیده' : 'Featured Works'}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 tracking-tight">
              {isFa ? 'داستان هر پروژه در یک کتاب' : 'Every Project, A Story'}
            </h2>

            {/* Crisp & Concise Description */}
            <p className={`text-sm sm:text-base leading-relaxed ${
              isNight ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {isFa
                ? 'آرشیو زنده ساخته‌های تجربی استودیو جیرجیرک؛ هر پرونده هویت، ساختار و مهندسی مستقل خود را دارد.'
                : 'Jirjirak’s living archive of spatial experiments; each volume holds an authentic engineered narrative.'}
            </p>
          </div>

          {/* Integrated Archival Challenge Box (Compact, Punchy & Provocative) */}
          <div className="shrink-0 pb-1">
            <button
              onClick={() => navigate('/contact')}
              className={`group text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full border cursor-pointer active:scale-95 shadow-sm ${
                isNight 
                  ? 'border-[#fff083] text-[#fff083] hover:bg-[#fff083] hover:text-[#1a1a1a] hover:shadow-[0_0_20px_rgba(255,240,131,0.25)]' 
                  : 'border-[#8f6b00] text-[#8f6b00] hover:bg-[#8f6b00] hover:text-white hover:shadow-[0_0_20px_rgba(143,107,0,0.25)]'
              }`}
            >
              <span>{isFa ? 'پرونده‌تان را به ما بسپارید' : 'Entrust Your Case File'}</span>
              <svg className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: 3-TIER GRAND LIBRARY & GOLDEN ROLLING LADDER ARCHIVAL DOCK         */}
        {/* ========================================================================= */}
        <div 
          data-suppress-header="true"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent('jirjirak:suppress-header', { detail: true }))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent('jirjirak:suppress-header', { detail: false }))}
          className={`w-full flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-2.5 rounded-2xl border transition-all shadow-lg ${
            isNight 
              ? 'bg-neutral-900/90 border-white/10 shadow-black/40' 
              : 'bg-white/95 border-black/8 shadow-neutral-200/50'
          }`}
        >
          {/* Authentic 3-Tier Grand Library & Golden Rolling Ladder Icon */}
          <div className={`relative h-11 sm:h-[46px] px-2.5 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
            isNight
              ? 'bg-neutral-950/80 border-white/10 shadow-[0_0_16px_rgba(255,240,131,0.08)]'
              : 'bg-white/90 border-black/10 shadow-sm'
          }`}>
            <RollingLadderStoryIcon isNight={isNight} isFa={isFa} />
          </div>

          {/* Vertical Divider Line */}
          <div className={`h-8 w-[1px] shrink-0 ${isNight ? 'bg-white/10' : 'bg-black/10'}`} />

          {/* Horizontal Refined Archival Filters Dock with Click+Drag & Touch+Drag */}
          <div
            ref={filtersScrollRef}
            onMouseDown={handleFiltersMouseDown}
            onMouseMove={handleFiltersMouseMove}
            onMouseUp={handleFiltersMouseUp}
            onMouseLeave={handleFiltersMouseUp}
            onTouchStart={handleFiltersTouchStart}
            onTouchMove={handleFiltersTouchMove}
            onTouchEnd={handleFiltersTouchEnd}
            onWheel={handleFiltersWheel}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className={`flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 select-none ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {filterTabsWithCounts.map((dept) => {
              const isActive = selectedDept === dept.id;
              const label = isFa ? dept.labelFa : dept.labelEn;

              return (
                <button
                  key={dept.id}
                  onClick={(e) => {
                    if (hasDragged.current) {
                      e.preventDefault();
                      return;
                    }
                    setSelectedDept(dept.id);
                    setCurrentIndex(null);
                  }}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 select-none border shrink-0 ${
                    isActive
                      ? isNight
                        ? 'bg-[#fff083]/15 text-[#fff083] border-[#fff083]/50 shadow-[0_0_12px_rgba(255,240,131,0.2)]'
                        : 'bg-[#8f6b00]/12 text-[#8f6b00] border-[#8f6b00]/40 shadow-sm'
                      : isNight
                      ? 'text-neutral-400 hover:text-white border-transparent hover:bg-white/5 hover:border-white/10'
                      : 'text-neutral-600 hover:text-black border-transparent hover:bg-black/5 hover:border-black/10'
                  }`}
                >
                  {/* Miniature Chamfered Archival Badge */}
                  <ArchivalBadge active={isActive} isNight={isNight} size="sm">
                    {renderArchivalIcon(dept.id)}
                  </ArchivalBadge>

                  {/* Department Title */}
                  <span className="truncate">
                    {label}
                  </span>

                  {/* Monospace Document Count Stamp */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full transition-colors font-bold ${
                    isActive
                      ? isNight ? 'bg-[#fff083]/25 text-[#fff083]' : 'bg-[#8f6b00]/20 text-[#8f6b00]'
                      : isNight ? 'bg-white/5 text-neutral-400 group-hover:text-white' : 'bg-black/5 text-neutral-600 group-hover:text-black'
                  }`}>
                    {isFa ? String(dept.count).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]) : dept.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: FULL-WIDTH ARCHITECTURAL BOOKSHELF (DEDICATED FULL ROW)            */}
        {/* ========================================================================= */}
        <div 
          data-suppress-header="true"
          onMouseEnter={() => window.dispatchEvent(new CustomEvent('jirjirak:suppress-header', { detail: true }))}
          onMouseLeave={() => window.dispatchEvent(new CustomEvent('jirjirak:suppress-header', { detail: false }))}
          className="w-full"
        >
          <KineticBladesModel
            projects={filteredProjects}
            currentIndex={currentIndex}
            onSelect={handleSelect}
            isNight={isNight}
            isFa={isFa}
          />
        </div>

      </div>
    </section>
  );
}

export default FeaturedProjectsSection;

