/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Jirjirak Studio - Single Project Showcase & Case Study (Pixel-Faithful UI Reference)
 */

import React, { useState } from 'react';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';

// High-fidelity image assets for Toyooran showcase
const HERO_RENDER = '/assets/images/projects/toyooran_hero_render_1791202411845.jpg';
const GALLERY_VILLA = '/assets/images/projects/toyooran_villa_garden_1791202427508.jpg';
const GALLERY_BRAND = '/assets/images/projects/toyooran_brand_gold_1791202442579.jpg';
const GALLERY_BLUEPRINT = '/assets/images/projects/toyooran_cad_blueprint_1791202456136.jpg';
const GALLERY_GOLD = '/assets/images/projects/toyooran_gold_duotone_1791202471558.jpg';

interface ProjectCase {
  id: string;
  stepNum: string;
  projectCode: string;
  title: string;
  titleFa: string;
  tagsEn: string;
  tagsFa: string;
  heroImage: string;
  heroHeadline: string;
  heroHeadlineFa: string;
  problemEn: string;
  problemFa: string;
  ideaEn: string;
  ideaFa: string;
  resultEn: string;
  resultFa: string;
  learnedEn: string;
  learnedFa: string;
  gallery: Array<{
    id: string;
    image: string;
    captionEn: string;
    captionFa: string;
    tag: string;
  }>;
}

const SHOWCASE_PROJECTS: ProjectCase[] = [
  {
    id: 'toyooran',
    stepNum: '04 / 07',
    projectCode: '01',
    title: 'TOYOORAN',
    titleFa: 'طیوران',
    tagsEn: 'Web / Brand / Experience',
    tagsFa: 'وب‌سایت / هویت بصری / تجربه کاربری',
    heroImage: HERO_RENDER,
    heroHeadline: 'More\nthan a place.\nA feeling.',
    heroHeadlineFa: 'فراتر از\nیک مکان.\nیک احساس.',
    problemEn: 'A traditional brand needed a modern digital presence to reach a new generation.',
    problemFa: 'یک برند باسابقه نیاز به حضور دیجیتال مدرن و پویا برای ارتباط با نسل جدید داشت.',
    ideaEn: "A minimal, immersive web experience that reflects the brand's essence and values.",
    ideaFa: 'تجربه تعاملی مینیمال و فراگیر وب که جوهره، عمق و اصالت برند را به نمایش می‌گذارد.',
    resultEn: 'A high-performing website and stronger brand identity, leading to increased engagement and sales.',
    resultFa: 'یک وب‌سایت با معماری بی‌نقص و هویتی پایدار که منجر به افزایش چشمگیر اعتبار و فروش شد.',
    learnedEn: 'Simplicity creates depth.',
    learnedFa: 'سادگی و خلوص، عمیق‌ترین فرم بیان است.',
    gallery: [
      {
        id: 'villa-exterior',
        image: GALLERY_VILLA,
        captionEn: 'Villa Estate Landscape Architecture',
        captionFa: 'معماری و محوطه‌سازی اقامتگاه ویلایی',
        tag: 'ARCH',
      },
      {
        id: 'brand-identity',
        image: GALLERY_BRAND,
        captionEn: 'Kinetic Golden Emblem & Typography',
        captionFa: 'هویت بصری و نشان کینتیک طلایی',
        tag: 'BRAND',
      },
      {
        id: 'cad-blueprint',
        image: GALLERY_BLUEPRINT,
        captionEn: 'Axonometric Spatial Blueprint & Drafting',
        captionFa: 'پلان فنی آکسونومتریک و نقشه‌کشی فضا',
        tag: 'DRAFT',
      },
      {
        id: 'gold-perspective',
        image: GALLERY_GOLD,
        captionEn: 'Curved Spatial Ribbon Duotone',
        captionFa: 'زاویه دید هوایی و قوس ساختاری دو رنگ',
        tag: 'CRAFT',
      },
    ],
  },
  {
    id: 'noura-banking',
    stepNum: '04 / 07',
    projectCode: '02',
    title: 'NOURA BANKING',
    titleFa: 'نورا بانک',
    tagsEn: 'Fintech / Security / Mobile App',
    tagsFa: 'فین‌تک / امنیت داده / اپلیکیشن موبایل',
    heroImage: '/assets/images/projects/project_fintech_1790411153505.jpg',
    heroHeadline: 'Financial clarity\nEngineered\nfor tomorrow.',
    heroHeadlineFa: 'وضوح مالی\nمهندسی‌شده\nبرای فردا.',
    problemEn: 'Complex legacy banking interfaces created friction and distrust among tech-savvy users.',
    problemFa: 'سیستم‌های مالی سنتی و پیچیده مانع تعامل سریع کاربران مدرن بودند.',
    ideaEn: 'Real-time liquidity telemetry combined with fluid biometric authorization.',
    ideaFa: 'نمایش بی‌درنگ جریان نقدینگی به همراه اعتبارسنجی ارگونومیک و امن.',
    resultEn: '40% higher daily transaction volume with sub-second payment settlement.',
    resultFa: 'افزایش ۴۰ درصدی تراکنش‌های روزانه و تجربه بدون تأخیر در پرداخت‌ها.',
    learnedEn: 'Trust is built through speed and transparency.',
    learnedFa: 'اعتماد در سرعت و شفافیت متولد می‌شود.',
    gallery: [
      {
        id: 'noura-1',
        image: '/assets/images/projects/project_fintech_1790411153505.jpg',
        captionEn: 'Core Banking Dashboard View',
        captionFa: 'داشبورد مرکزی و مدیریت سرمایه',
        tag: 'APP',
      },
      {
        id: 'noura-2',
        image: GALLERY_BRAND,
        captionEn: 'Cryptographic Micro-Animations',
        captionFa: 'نشان‌های متحرک رمزنگاری‌شده',
        tag: 'SECURITY',
      },
      {
        id: 'noura-3',
        image: GALLERY_BLUEPRINT,
        captionEn: 'Microservices Dataflow Schema',
        captionFa: 'دیاگرام جریان داده ریزسرویس‌ها',
        tag: 'SYSTEM',
      },
      {
        id: 'noura-4',
        image: GALLERY_GOLD,
        captionEn: 'Night Matrix Kinetic Visualizer',
        captionFa: 'جلوه بصری ماتریس شبکه مالی',
        tag: 'DATA',
      },
    ],
  },
  {
    id: 'atelier-sol',
    stepNum: '04 / 07',
    projectCode: '03',
    title: 'ATELIER SOL',
    titleFa: 'آتلیه سل',
    tagsEn: 'Spatial / 3D / Haute Interior',
    tagsFa: 'معماری داخلی / سه‌بعدی / تجمل فضایی',
    heroImage: '/assets/images/projects/project_atelier_sol.jpg',
    heroHeadline: 'Pure form.\nSculpted light.\nEnduring space.',
    heroHeadlineFa: 'فرم ناب.\nنور تراش‌خورده.\nفضای مانا.',
    problemEn: 'Physical interior ateliers lacked a spatial medium to preview brutalist textures online.',
    problemFa: 'نبود بستری برای لمس بافت‌های بتنی و چوبی در فضای وب پیش از ساخت.',
    ideaEn: 'WebGL physically-based material lighting simulator directly inside the browser viewport.',
    ideaFa: 'شبیه‌ساز فیزیکی متریال و نور بر پایه وب بدون نیاز به دانلود نرم‌افزار.',
    resultEn: 'Awarded Awwwards Site of the Month; client consultations tripled.',
    resultFa: 'کسب جایزه سایت ماه و ۳ برابر شدن سفارش‌های طراحی اختصاصی.',
    learnedEn: 'Tactile fidelity transforms digital into physical.',
    learnedFa: 'کیفیت بافت دیجیتال، لمس فیزیکی پدید می‌آورد.',
    gallery: [
      {
        id: 'sol-1',
        image: '/assets/images/projects/project_atelier_sol.jpg',
        captionEn: 'Brutalist Concrete & Wood Pavilion',
        captionFa: 'پاویون بتن اکسپوز و چوب دست‌ساز',
        tag: 'SPACE',
      },
      {
        id: 'sol-2',
        image: GALLERY_VILLA,
        captionEn: 'Sunlight Angle Simulation',
        captionFa: 'شبیه‌سازی زوایای تابش نور طبیعی',
        tag: 'LIGHT',
      },
      {
        id: 'sol-3',
        image: GALLERY_BLUEPRINT,
        captionEn: 'Joinery Section Details',
        captionFa: 'جزئیات اتصالات نجاری معماری',
        tag: 'DETAIL',
      },
      {
        id: 'sol-4',
        image: GALLERY_GOLD,
        captionEn: 'Material Specular Mapping',
        captionFa: 'نقشه شکست نور متریال‌ها',
        tag: 'SPEC',
      },
    ],
  },
  {
    id: 'kafi',
    stepNum: '04 / 07',
    projectCode: '04',
    title: 'KAFI ATELIER',
    titleFa: 'کافی آتلیه',
    tagsEn: 'Brand / Craft / Atmosphere',
    tagsFa: 'برندینگ / قهوه تخصصی / هویت مکان',
    heroImage: '/assets/images/projects/project_kafi_1790411104227.jpg',
    heroHeadline: 'The ritual\nof slow roast\n& quiet wood.',
    heroHeadlineFa: 'آیین\nرست آرام\nو چوب خاموش.',
    problemEn: 'Third-wave coffee atelier struggled to express the slow, artisanal aroma digitally.',
    problemFa: 'انتقال حس آرامش و بوی برشته‌کاری قهوه در یک فروشگاه اینترنتی.',
    ideaEn: 'Soundscapes of brewing matched with warm macro photography and typography.',
    ideaFa: 'ترکیب صداهای محیطی کافه همراه با تایپوگرافی کشیده و تصاویر ماکرو.',
    resultEn: 'Subscriptions sold out within 48 hours of public launch.',
    resultFa: 'تمام بسته‌های اشتراک در ۴۸ ساعت اولیه پیش‌فروش تکمیل شد.',
    learnedEn: 'Sensory storytelling bridges the digital gap.',
    learnedFa: 'درگیر کردن حواس چندگانه مرزهای دیجیتال را می‌شکند.',
    gallery: [
      {
        id: 'kafi-1',
        image: '/assets/images/projects/project_kafi_1790411104227.jpg',
        captionEn: 'Atmospheric Espresso Counter',
        captionFa: 'کانتر سنگ بازالت و اسپرسو',
        tag: 'SPACE',
      },
      {
        id: 'kafi-2',
        image: GALLERY_BRAND,
        captionEn: 'Wax Seal Packaging System',
        captionFa: 'بسته‌بندی با مهر و موم سنتی',
        tag: 'PACK',
      },
      {
        id: 'kafi-3',
        image: GALLERY_BLUEPRINT,
        captionEn: 'Acoustic Layout Plan',
        captionFa: 'طرح آکوستیک و تهویه فضا',
        tag: 'ACOUSTIC',
      },
      {
        id: 'kafi-4',
        image: GALLERY_GOLD,
        captionEn: 'Roast Profile Curve Graph',
        captionFa: 'منحنی ترمودینامیک برشته‌کاری',
        tag: 'PROFILE',
      },
    ],
  },
  {
    id: 'zirin',
    stepNum: '04 / 07',
    projectCode: '05',
    title: 'ZIRIN LUXURY',
    titleFa: 'زرین گالری',
    tagsEn: 'Haute Horlogerie / Gold / Vault',
    tagsFa: 'جواهرات فاخر / طلای دست‌ساز / گاوصندوق',
    heroImage: '/assets/images/projects/project_zirin.jpg',
    heroHeadline: 'Eternal weight.\nPure karat.\nTimeless silence.',
    heroHeadlineFa: 'وزن جاودانه.\nعیار خالص.\nسکوت بی‌زمان.',
    problemEn: 'Ultra-exclusive private jewelry maison required bank-level digital discretion.',
    problemFa: 'یک خانه جواهر خصوصی نیاز به فضایی با پرستیژ بالا و دسترسی گزینش‌شده داشت.',
    ideaEn: 'Private viewing digital salons with bespoke biometric invitations.',
    ideaFa: 'اتاق‌های اختصاصی مشاهده با لینک‌های رمزشده یک‌بارمصرف برای مشتریان ویژه.',
    resultEn: 'Zero public leaks; $2.4M in private high-jewelry acquisitions facilitated.',
    resultFa: 'حفظ ۱۰۰٪ محرمانگی و تسهیل فروش قطعات کمیاب به ارزش چند میلیون دلار.',
    learnedEn: 'Exclusivity demands restrained grandeur.',
    learnedFa: 'شکوه و اصالت در آرامش و سکوت نمایان می‌شود.',
    gallery: [
      {
        id: 'zirin-1',
        image: '/assets/images/projects/project_zirin.jpg',
        captionEn: 'Obsidian Jewelry Display Chamber',
        captionFa: 'محفظه مخملی نمایش جواهرات',
        tag: 'SALON',
      },
      {
        id: 'zirin-2',
        image: GALLERY_BRAND,
        captionEn: 'Gilded Vault Lock Cipher',
        captionFa: 'نشان زرکوب رمزشده خزانه‌داری',
        tag: 'CIPHER',
      },
      {
        id: 'zirin-3',
        image: GALLERY_BLUEPRINT,
        captionEn: 'Diamond Setting Micro-Draft',
        captionFa: 'نقشه میلی‌متری مخرج‌کاری برلیان',
        tag: 'CRAFT',
      },
      {
        id: 'zirin-4',
        image: GALLERY_GOLD,
        captionEn: 'Luster Spectrometry Analysis',
        captionFa: 'طیف‌سنجی درخشش و عیار طلا',
        tag: 'GOLD',
      },
    ],
  },
  {
    id: 'cyber-chaharbagh',
    stepNum: '04 / 07',
    projectCode: '06',
    title: 'CYBER CHAHARBAGH',
    titleFa: 'چهارباغ سایبر',
    tagsEn: 'WebGL / Spatial Metaverse / Heritage',
    tagsFa: 'وب‌جی‌ال / متاورس بومی / میراث معماری',
    heroImage: '/assets/images/projects/project_cyber_chaharbagh.jpg',
    heroHeadline: 'Persian geometry\nmeets\ncybernetic dreams.',
    heroHeadlineFa: 'هندسه پارسی\nدر پیوند با\nرؤیاهای سایبری.',
    problemEn: 'Safavid garden geometry was forgotten by youth immersed in foreign metaverses.',
    problemFa: 'فراموشی شکوه هندسه باغ‌های صفوی در میان نسل متولد عصر بازی‌های ویدیویی.',
    ideaEn: 'Reconstructing the symmetry of Chaharbagh with neon shaders and real-time audio reactive water.',
    ideaFa: 'بازسازی تقارن و جوی‌های آب چهارباغ با شیدرهای نئونی و فیزیک سیالات در وب.',
    resultEn: 'Over 120,000 visitors explored the virtual pavilion during opening weekend.',
    resultFa: 'بیش از ۱۲۰ هزار بازدیدکننده همزمان در هفته اول افتتاحیه پاویون مجازی.',
    learnedEn: 'Heritage thrives when translated into the future.',
    learnedFa: 'میراث کهن با زبان آینده زنده می‌ماند.',
    gallery: [
      {
        id: 'cyber-1',
        image: '/assets/images/projects/project_cyber_chaharbagh.jpg',
        captionEn: 'Neon Waterway & Tile Dome Pavilion',
        captionFa: 'گنبد فیروزه‌ای و آبراه نئونی',
        tag: 'VIRTUAL',
      },
      {
        id: 'cyber-2',
        image: GALLERY_BRAND,
        captionEn: 'Cybernetic Muqarnas Geometric Seal',
        captionFa: 'مقرنس سایبرنتیک و نشان هندسی',
        tag: 'SEAL',
      },
      {
        id: 'cyber-3',
        image: GALLERY_BLUEPRINT,
        captionEn: 'Octagonal Axial Layout Plan',
        captionFa: 'پلان محوری هشت‌ضلعی باغ',
        tag: 'GEOM',
      },
      {
        id: 'cyber-4',
        image: GALLERY_GOLD,
        captionEn: 'Particle Stream & Sound Reflection',
        captionFa: 'ذرات نوری در واکنش به نوای موسیقی',
        tag: 'AUDIO',
      },
    ],
  },
];

export function CaseStudySection() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const t = useTranslation()(currentLang);

  // Active project carousel index
  const [projectIndex, setProjectIndex] = useState(0);
  // Active gallery preview item or modal
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<{
    image: string;
    caption: string;
  } | null>(null);
  // Share toast status
  const [showShareToast, setShowShareToast] = useState(false);

  // Active gallery hover index for 3D perspective animations
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Alternating trapezoid geometric polygons (sharp corners, no rounding)
  // Even index (0, 2): Left vertices closer together, right vertices farther apart
  // Odd index (1, 3): Left vertices farther apart, right vertices closer together
  const getCardPolygon = (idx: number) => {
    return idx % 2 === 0
      ? 'polygon(0% 7%, 100% 0%, 100% 100%, 0% 93%)'
      : 'polygon(0% 0%, 100% 7%, 100% 93%, 0% 100%)';
  };

  const getSvgPoints = (idx: number) => {
    return idx % 2 === 0 ? '0,7 100,0 100,100 0,93' : '0,0 100,7 100,93 0,100';
  };

  const currentProject = SHOWCASE_PROJECTS[projectIndex];

  // Navigation handlers
  const handlePrevProject = () => {
    setProjectIndex((prev) => (prev > 0 ? prev - 1 : SHOWCASE_PROJECTS.length - 1));
  };

  const handleNextProject = () => {
    setProjectIndex((prev) => (prev < SHOWCASE_PROJECTS.length - 1 ? prev + 1 : 0));
  };

  const handleShareClick = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2400);
    }
  };

  return (
    <section
      id="case-study"
      data-cursor="project"
      className="relative w-full min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-[#0A0A0C] text-[#EDEDED] select-none"
    >
      {/* ===================================================================== */}
      {/* ATMOSPHERIC BACKGROUND: Rocky Obsidian Terrain & Warm Ground Beams     */}
      {/* ===================================================================== */}
      {/* Soft warm light pool under the device stage */}
      <div 
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[480px] opacity-40"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 90%, rgba(255, 240, 131, 0.14), transparent 75%)',
        }}
      />
      {/* Deep vignette gradient */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#0A0A0C]/50 to-[#0A0A0C] opacity-90" />

      {/* Container matching standard 1600px width */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col justify-between min-h-[820px] gap-8 lg:gap-12">
        
        {/* ===================================================================== */}
        {/* TOP BAR: Step Counter & Project Number on Left | Share on Right       */}
        {/* ===================================================================== */}
        <div className="w-full flex items-center justify-between border-b border-white/5 pb-4 sm:pb-6">
          {/* Left: Step indicator & Project Tag */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#FFF083]">
              {isFa ? '۰۴ / ۰۷' : currentProject.stepNum}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/50">
                {isFa ? 'پروژه' : 'PROJECT'}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/80 bg-white/5">
                {isFa ? String(currentProject.projectCode).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]) : currentProject.projectCode}
              </span>
            </div>
          </div>

          {/* Right: Share Button with Icon */}
          <div className="relative">
            <button
              onClick={handleShareClick}
              className="group flex items-center gap-2 text-xs font-mono tracking-widest text-white/60 hover:text-[#FFF083] transition-colors cursor-pointer"
            >
              <span className="uppercase">{isFa ? 'اشتراک' : 'SHARE'}</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:scale-110" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>

            {/* Toast feedback */}
            {showShareToast && (
              <div className="absolute top-8 right-0 rtl:right-auto rtl:left-0 px-3 py-1.5 rounded-lg bg-[#FFF083] text-[#121212] font-mono text-[11px] font-bold shadow-xl animate-fade-in z-50 whitespace-nowrap">
                {isFa ? 'لینک کپی شد' : 'Link Copied!'}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3-COLUMN MAIN STAGE                                                   */}
        {/* Left: Project Narrative Specs | Center: 3D Stage | Right: 4-Card Gallery */}
        {/* ===================================================================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 1 (LEFT ~3.5 COLS): Title, Tags & 4 Circular Target Steps    */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between order-1">
            <div className="flex flex-col">
              {/* Project Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 uppercase">
                {isFa ? currentProject.titleFa : currentProject.title}
              </h1>

              {/* Category / Subtitle */}
              <p className="text-xs sm:text-sm font-medium tracking-wide text-[#FFF083]/90 mb-8 sm:mb-10">
                {isFa ? currentProject.tagsFa : currentProject.tagsEn}
              </p>

              {/* 4 Steps with Golden Concentric Target / Lens Icons */}
              <div className="space-y-6 sm:space-y-7">
                {/* 1. THE PROBLEM */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-full border border-[#FFF083]/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FFF083] transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full border border-[#FFF083] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#FFF083]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold tracking-widest text-[#FFF083] uppercase mb-1">
                      {isFa ? 'مسئله و چالش' : 'THE PROBLEM'}
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {isFa ? currentProject.problemFa : currentProject.problemEn}
                    </p>
                  </div>
                </div>

                {/* 2. THE IDEA */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FFF083] transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full border border-white/40 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#FFF083] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold tracking-widest text-white/90 uppercase mb-1">
                      {isFa ? 'ایده و راهکار' : 'THE IDEA'}
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {isFa ? currentProject.ideaFa : currentProject.ideaEn}
                    </p>
                  </div>
                </div>

                {/* 3. THE RESULT */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FFF083] transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full border border-white/40 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#FFF083] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold tracking-widest text-white/90 uppercase mb-1">
                      {isFa ? 'نتیجه و دستاورد' : 'THE RESULT'}
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {isFa ? currentProject.resultFa : currentProject.resultEn}
                    </p>
                  </div>
                </div>

                {/* 4. WHAT WE LEARNED */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#FFF083] transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full border border-white/40 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#FFF083] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-mono font-bold tracking-widest text-white/90 uppercase mb-1">
                      {isFa ? 'آنچه آموختیم' : 'WHAT WE LEARNED'}
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {isFa ? currentProject.learnedFa : currentProject.learnedEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls: Scroll Prompt & Project Navigation Arrows */}
            <div className="flex items-center justify-between pt-8 sm:pt-10 border-t border-white/5 mt-8">
              {/* Scroll prompt */}
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/40 uppercase">
                <span className="text-xs">↓</span>
                <span>{isFa ? 'اسکرول' : 'SCROLL'}</span>
              </div>

              {/* Carousel Pagination: [ ← ] 1 / 6 [ → ] */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevProject}
                  aria-label="Previous Project"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-[#FFF083] hover:text-[#FFF083] transition-all cursor-pointer active:scale-90"
                >
                  <svg className="w-3.5 h-3.5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <span className="text-xs font-mono tracking-widest text-white/80 px-1">
                  {projectIndex + 1} / {SHOWCASE_PROJECTS.length}
                </span>

                <button
                  onClick={handleNextProject}
                  aria-label="Next Project"
                  className="w-8 h-8 rounded-full border border-[#FFF083]/60 bg-[#FFF083]/10 flex items-center justify-center text-[#FFF083] hover:border-[#FFF083] hover:bg-[#FFF083] hover:text-[#0A0A0C] transition-all cursor-pointer active:scale-90 shadow-[0_0_12px_rgba(255,240,131,0.2)]"
                >
                  <svg className="w-3.5 h-3.5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 2 (CENTER ~5.5 COLS): 3D Folded Display & Mobile Smartphone  */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative min-h-[440px] sm:min-h-[520px] lg:min-h-[600px] order-2 py-4">
            
            {/* Ground paved stone plane & reflections */}
            <div className="absolute inset-x-0 bottom-4 h-24 rounded-full bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Floating 3D Wireframe Cube (Hovering in air on the right) */}
            <div className="hidden sm:block absolute top-8 sm:top-14 right-4 sm:right-10 pointer-events-none opacity-40 animate-pulse">
              <svg className="w-12 h-12 text-white/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                {/* Isometric Cube Wireframe */}
                <polygon points="50,15 85,35 50,55 15,35" />
                <polygon points="15,35 50,55 50,95 15,75" />
                <polygon points="85,35 50,55 50,95 85,75" />
                <line x1="50" y1="55" x2="50" y2="95" strokeDasharray="3 3" />
                <line x1="50" y1="15" x2="50" y2="55" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Central Stage Devices Container */}
            <div className="relative w-full max-w-[620px] flex items-center justify-center">
              
              {/* 1. MAIN FOLDED DUAL-PANEL DISPLAY */}
              <div className="relative w-full aspect-[16/10] rounded-2xl p-2 sm:p-2.5 bg-[#141519] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex overflow-hidden group">
                
                {/* Left Primary Display Panel (Main Screen) */}
                <div className="relative flex-1 h-full rounded-xl overflow-hidden bg-black border border-white/5">
                  <img
                    src={currentProject.heroImage}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Header bar inside the screen mockup */}
                  <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-white/90">
                      {isFa ? currentProject.titleFa : currentProject.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                  </div>

                  {/* Dramatic Editorial Headline on Display Screen */}
                  <div className="absolute bottom-6 left-5 sm:left-7 right-6 pointer-events-none">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white tracking-tight whitespace-pre-line drop-shadow-md">
                      {isFa ? currentProject.heroHeadlineFa : currentProject.heroHeadline}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="w-2 h-0.5 bg-[#FFF083]" />
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#FFF083]">
                        {isFa ? 'استودیو جیرجیرک' : 'JIRJIRAK ARCHIVE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Angled Wing (Dual-Fold Glass Panel) */}
                <div 
                  className="hidden sm:block w-24 md:w-32 h-full rounded-r-xl overflow-hidden border-l border-white/10 bg-neutral-900/80 relative"
                  style={{
                    transform: 'perspective(600px) rotateY(-22deg)',
                    transformOrigin: 'left center',
                  }}
                >
                  <img
                    src={currentProject.gallery[0]?.image || GALLERY_VILLA}
                    alt="Extended View"
                    className="w-full h-full object-cover opacity-40 blur-[0.5px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0C] to-transparent pointer-events-none" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[9px] font-mono text-[#FFF083] uppercase tracking-wider mb-1">
                      {isFa ? 'زاویه ۲' : 'VIEW 02'}
                    </span>
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/70">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SMARTPHONE (iPhone Standing in Foreground) */}
              <div 
                className="absolute -bottom-4 right-2 sm:right-6 md:right-8 w-28 sm:w-36 md:w-40 aspect-[9/19] rounded-[28px] sm:rounded-[36px] p-1.5 sm:p-2 bg-[#1b1c20] border-2 border-[#D4AF37]/50 shadow-[0_25px_50px_rgba(0,0,0,0.95)] z-20 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 ease-out"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 15px rgba(212,175,55,0.25)',
                }}
              >
                {/* Dynamic island / Speaker notch */}
                <div className="absolute top-2.5 inset-x-0 mx-auto w-12 sm:w-16 h-3 rounded-full bg-black z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e2024] ml-auto mr-2" />
                </div>

                {/* Mobile Screen */}
                <div className="w-full h-full rounded-[22px] sm:rounded-[28px] overflow-hidden bg-black relative">
                  <img
                    src={currentProject.heroImage}
                    alt="Mobile View"
                    className="w-full h-full object-cover object-center filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />
                  
                  {/* Status Bar */}
                  <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-[8px] font-mono text-white/80 pointer-events-none">
                    <span>9:41</span>
                    <div className="w-2.5 h-1.5 border border-white/60 rounded-xs" />
                  </div>

                  {/* Mobile UI Overlay */}
                  <div className="absolute bottom-3 left-2.5 right-2.5 pointer-events-none">
                    <p className="text-[10px] font-bold text-white tracking-tight leading-tight mb-1 truncate">
                      {isFa ? currentProject.titleFa : currentProject.title}
                    </p>
                    <div className="w-full h-1 bg-[#FFF083]/40 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-[#FFF083]" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* COLUMN 3 (RIGHT ~3 COLS): THE 4-CARD PROJECT GALLERY (USER'S FOCUS) */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between gap-3 sm:gap-4 order-3">
            
            {/* Gallery Column Header */}
            <div className="flex items-center justify-between pb-1 border-b border-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/60">
                {isFa ? 'گالری پرونده' : 'CASE GALLERY'}
              </span>
              <span className="text-[10px] font-mono text-[#FFF083]">
                {isFa ? '۴ سند' : '4 ASSETS'}
              </span>
            </div>

            {/* 4 STACKED INTERACTIVE GALLERY CARDS (Precise 7px Seam Gap) */}
            <div className="flex flex-col py-1">
              {currentProject.gallery.map((item, idx) => {
                const isHovered = hoveredCardIndex === idx;
                const polygon = getCardPolygon(idx);
                const points = getSvgPoints(idx);

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                    onClick={() => setSelectedGalleryItem({ image: item.image, caption: isFa ? item.captionFa : item.captionEn })}
                    className={`group relative w-full h-28 sm:h-32 md:h-36 lg:h-34 xl:h-[148px] cursor-pointer select-none transition-all duration-300 ${
                      idx > 0 ? '-mt-[3px] sm:-mt-[4px] xl:-mt-[4.5px]' : ''
                    } ${isHovered ? 'z-30' : `z-[${idx + 1}]`}`}
                    style={{
                      filter: isHovered
                        ? 'drop-shadow(0 0 16px rgba(255,240,131,0.45)) drop-shadow(0 12px 24px rgba(0,0,0,0.85))'
                        : 'drop-shadow(0 6px 14px rgba(0,0,0,0.55))',
                      transform: isHovered ? 'scale(1.025) translateY(-2px)' : 'scale(1)',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
                    }}
                  >
                    {/* Inner Clipped Container with Sharp Corners (No border-radius) */}
                    <div
                      className="relative w-full h-full overflow-hidden bg-[#121316]"
                      style={{
                        clipPath: polygon,
                      }}
                    >
                      {/* Card Background Image */}
                      <img
                        src={item.image}
                        alt={item.captionEn}
                        className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out filter brightness-90 group-hover:brightness-100"
                      />
                      
                      {/* Gradient Shadow Mask (Top & Bottom for text clarity) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

                      {/* Corner Index Tag (Safe distance from slanted top edge) */}
                      <div className="absolute top-3.5 sm:top-4 left-4 sm:left-5 rtl:left-auto rtl:right-4 sm:rtl:right-5 px-2.5 py-0.5 bg-black/85 border border-white/20 text-[9px] font-mono font-bold text-white/90 group-hover:text-[#FFF083] group-hover:border-[#FFF083]/60 transition-colors shadow-sm">
                        {item.tag}
                      </div>

                      {/* Bottom Caption & Action Arrow (Safe distance from slanted bottom edge) */}
                      <div className="absolute bottom-3.5 sm:bottom-4 inset-x-4 sm:inset-x-5 flex items-center justify-between">
                        <p className="text-[11px] sm:text-xs font-semibold text-white group-hover:text-[#FFF083] transition-colors truncate pr-2 rtl:pr-0 rtl:pl-2 drop-shadow-md">
                          {isFa ? item.captionFa : item.captionEn}
                        </p>
                        <div className="w-5 h-5 border border-white/30 group-hover:border-[#FFF083] group-hover:bg-[#FFF083] group-hover:text-black flex items-center justify-center text-white/80 shrink-0 transition-all shadow-sm">
                          <svg className="w-2.5 h-2.5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Sharp Geometric SVG Perimeter Stroke Overlay (Exact Polygon Border) */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-30"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points={points}
                        fill="none"
                        stroke={isHovered ? '#FFF083' : 'rgba(255, 255, 255, 0.22)'}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        className="transition-colors duration-300"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>

            {/* Bottom Gallery Action Note */}
            <div className="pt-2 text-center lg:text-start">
              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                {isFa ? 'برای بزرگ‌نمایی روی هر سند کلیک کنید' : 'Click any document for high-res inspection'}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ===================================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR GALLERY INSPECTION                      */}
      {/* ===================================================================== */}
      {selectedGalleryItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-[#FFF083] hover:text-black transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Expanded Image */}
            <div className="w-full max-h-[78vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.caption}
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            {/* Caption Bar */}
            <div className="w-full mt-4 flex items-center justify-between px-2 text-white">
              <span className="text-sm font-semibold tracking-wide text-neutral-200">
                {selectedGalleryItem.caption}
              </span>
              <span className="text-xs font-mono text-[#FFF083] uppercase tracking-widest">
                {isFa ? 'آرشیو استودیو جیرجیرک' : 'JIRJIRAK ARCHIVE VAULT'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CaseStudySection;
