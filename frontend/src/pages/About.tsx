import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../stores/globalStore';
import { DEPARTMENTS_DATA } from '../features/departments/departmentData';
import { VisionaryTeamShowcase } from '../features/landing/sections/VisionaryTeamShowcase';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Compass,
} from 'lucide-react';

export default function About() {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Interactive Balance state (0 = Pure Imagination, 100 = Engineering Precision, 50 = The Jirjirak Sweet Spot)
  const [balanceRatio, setBalanceRatio] = useState<number>(50);

  // Jirjirak Brand Color Tokens
  // In Night mode (dark bg): Brand yellow is #FFF083 with high contrast against #181818 / #222222
  // In Day mode (light bg): Deep olive #b3a85c with high contrast against crisp white / paper tones
  const accentText = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const accentBg = isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark';
  const accentBorder = isNight ? 'border-[#b3a85c]' : 'border-brand-yellow';

  // 3 Equal Co-Founders of Jirjirak
  const CO_FOUNDERS = [
    {
      id: 'abdollah',
      nameEn: 'Abdollah',
      nameFa: 'عبدالله',
      roleEn: 'Spatial Architect & Co-Founder',
      roleFa: 'هم‌بنیان‌گذار و معمار فضا',
      image: '/assets/images/team/abdollah.jpg',
      ethosEn: 'Shaping physical and systemic spatial balance with architectural clarity.',
      ethosFa: 'طراحی ساختار فضاها، سیستم‌های چندرشته‌ای و هارمونی فرم و کارکرد.',
      disciplineEn: 'Spatial Architecture',
      disciplineFa: 'معماری و فرم فضا',
    },
    {
      id: 'rouhollah',
      nameEn: 'Rouhollah',
      nameFa: 'روح‌الله',
      roleEn: 'Lead Tech Architect & Co-Founder',
      roleFa: 'هم‌بنیان‌گذار و معمار وب سه‌بعدی',
      image: '/assets/images/team/rouhollah.jpg',
      ethosEn: 'Pushing creative engineering, real-time shaders, and high-performance WebGL.',
      ethosFa: 'توسعه وب سه‌بعدی تعاملی، شیدرهای بلادرنگ و زیرساخت‌های مهندسی با عملکرد بالا.',
      disciplineEn: 'Creative Engineering',
      disciplineFa: 'مهندسی خلاق و وب سه‌بعدی',
    },
    {
      id: 'sina',
      nameEn: 'Sina',
      nameFa: 'سینا',
      roleEn: 'Brand Art Director & Co-Founder',
      roleFa: 'هم‌بنیان‌گذار و مدیر آرت و هویت بصری',
      image: '/assets/images/team/sina.jpg',
      ethosEn: 'Directing bespoke visual identities, tactile typography, and brand stories.',
      ethosFa: 'خلق هویت‌های ماندگار بصری، تایپوگرافی متمایز و هدایت سبک هنری استودیو.',
      disciplineEn: 'Visual Identity',
      disciplineFa: 'هویت بصری و آرت‌دایرکشن',
    },
  ];

  // 3 Core Creative Tensions of Jirjirak
  const CREATIVE_DUALITIES = [
    {
      index: '01',
      titleEn: 'Visual Originality × Systemic Logic',
      titleFa: 'اصالت بصری × منطق سیستماتیک',
      descEn: 'Visually unexpected and distinctive, yet organized by strict architectural principles.',
      descFa: 'غیرمنتظره و متمایز در نگاه نخست، اما استوار بر یک سیستم مهندسی عمیق و منطقی.',
    },
    {
      index: '02',
      titleEn: 'Alive & Energetic × Controlled Restraint',
      titleFa: 'سرزنده و پویا × کنترل و انضباط',
      descEn: 'Dynamic interactions that invite curiosity without descending into chaotic noise.',
      descFa: 'تعاملاتی که حس کنجکاوی را بیدار می‌کنند، بدون اینکه صفحه را به هیاهو بکشانند.',
    },
    {
      index: '03',
      titleEn: 'Human & Friendly × Rigorous Discipline',
      titleFa: 'صمیمی و انسانی × تعهد سرسختانه به نتیجه',
      descEn: 'A team that enjoys creating, thinks deeply, and takes the final outcome seriously.',
      descFa: 'تیمی که از آفرینش لذت می‌برد، اما کیفیت خروجی را با سخت‌گیری فنی تضمین می‌کند.',
    },
  ];

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      
      {/* =========================================================================
          SECTION 1: THE ATELIER OVERTURE (HERO)
          Spacious, bold, distinctive, airy, with lots of whitespace
          ========================================================================= */}
      <section className="relative w-full pt-16 pb-28 md:pt-24 md:pb-36 px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        <div className="flex flex-col gap-12 max-w-5xl">
          
          {/* Quiet, unboxed top metadata */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase opacity-75">
            <span className={accentText}>JIRJIRAK</span>
            <span aria-hidden="true">·</span>
            <span>{isFa ? 'استودیوی خلاق مستقل' : 'Independent Creative Studio'}</span>
          </div>

          {/* Hero Statement: Spacious & Powerful */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.08] text-balance">
            {isFa ? (
              <>
                جیرجیرک؛ مرز میان{' '}
                <span className={`underline decoration-2 underline-offset-8 ${accentText}`}>
                  خلاقیت تجربی
                </span>{' '}
                و{' '}
                <span className="opacity-90">
                  انضباط مهندسی.
                </span>
              </>
            ) : (
              <>
                A creative studio built on{' '}
                <span className={`underline decoration-2 underline-offset-8 ${accentText}`}>
                  experimental vision
                </span>{' '}
                and engineering-level discipline.
              </>
            )}
          </h1>

          {/* Brief, punchy subtitle with ample negative space */}
          <p
            className={`text-lg sm:text-xl lg:text-2xl font-normal max-w-3xl leading-relaxed ${
              isNight ? 'text-neutral-700' : 'text-neutral-400'
            }`}
          >
            {isFa
              ? 'ما نه یک آژانس اداری خسته‌کننده‌ایم و نه یک آتلیه هنری بی‌برنامه. ما آثاری متمایز، غیرمنتظره و زنده خلق می‌کنیم که با بالاترین استانداردهای مهندسی پشتیبانی می‌شوند.'
              : 'Neither a rigid corporate agency nor an unstructured art lab. We craft distinctive, unexpected, and living digital experiences backed by absolute engineering rigor.'}
          </p>

          {/* Creative Interplay Dial: "Curiosity Meets Precision" */}
          <div
            className={`mt-4 p-6 sm:p-8 rounded-3xl border transition-colors duration-500 max-w-3xl ${
              isNight
                ? 'bg-neutral-100/80 border-neutral-300/80 shadow-sm'
                : 'bg-white/[0.03] border-white/10 shadow-2xl'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider block opacity-60 mb-0.5">
                  {isFa ? 'توازن بنیادین جیرجیرک' : 'THE CORE BALANCE DIAL'}
                </span>
                <span className="text-base font-bold">
                  {balanceRatio < 40
                    ? isFa ? 'تمرکز بیشتر بر تخیل و شکستن مرزها' : 'Dominant: Bold Exploration'
                    : balanceRatio > 60
                    ? isFa ? 'تمرکز بیشتر بر دقت و معماری پایدار' : 'Dominant: Engineering Rigor'
                    : isFa ? 'تعادل آرمانی جیرجیرک (۵۰/۵۰)' : 'The Jirjirak Golden Ratio'}
                </span>
              </div>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${accentBorder} ${accentText}`}>
                {balanceRatio}% / {100 - balanceRatio}%
              </span>
            </div>

            {/* Slider track */}
            <input
              type="range"
              min="10"
              max="90"
              value={balanceRatio}
              onChange={(e) => setBalanceRatio(Number(e.target.value))}
              className="w-full accent-[#fff083] dark:accent-[#b3a85c] cursor-pointer h-2 rounded-lg bg-neutral-300 dark:bg-neutral-700"
            />

            <div className="flex items-center justify-between mt-3 text-xs font-mono opacity-70">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {isFa ? 'تخیل و اصالت' : 'Imagination & Art'}
              </span>
              <span className="flex items-center gap-1.5">
                {isFa ? 'انضباط و دقت مهندسی' : 'Engineering & Structure'}
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 2: THE DUALISM MANIFESTO (DISTINCT CONTRASTING BAND)
          Clear boundary, different background tone, generous negative space
          ========================================================================= */}
      <section
        className={`w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-y transition-colors duration-700 ${
          isNight
            ? 'bg-[#f0ece1] border-neutral-300 text-brand-dark'
            : 'bg-[#181818] border-white/10 text-brand-light'
        }`}
      >
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Provocative Editorial Manifesto */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${accentText}`}>
              {isFa ? 'منشور فکری استودیو' : 'ATELIER MANIFESTO'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              {isFa ? (
                <>
                  متفاوت و اصیل بساز،<br />اما <span className={accentText}>منطقی و هدفمند</span>.
                </>
              ) : (
                <>
                  Make it distinctive,<br />but make it <span className={accentText}>make sense</span>.
                </>
              )}
            </h2>
            <p className={`text-base leading-relaxed ${isNight ? 'text-neutral-700' : 'text-neutral-400'}`}>
              {isFa
                ? 'جیرجیرک «خلاقیت تصادفی» نیست. کار ما از نظر بصری شگفت‌انگیز و غیرمنتظره است، اما سیستم زیربنایی و معماری کد، همیشه سنجیده و با بالاترین استانداردهای فنی اجرا می‌شود.'
                : 'Jirjirak is not random novelty. The output can be visually daring and unexpected, but the underlying system remains structured, intentional, and technically sound.'}
            </p>
          </div>

          {/* Right Column: 3 Clean Creative Dualities with ample whitespace (NO 7 SQUARES!) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {CREATIVE_DUALITIES.map((d) => (
              <div
                key={d.index}
                className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 ${
                  isNight
                    ? 'bg-white border-neutral-300/80 shadow-sm hover:border-black'
                    : 'bg-[#222222] border-white/10 hover:border-white/25 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold ${accentText}`}>
                    {d.index}
                  </span>
                  <span className="text-xs font-mono opacity-40">
                    {isFa ? 'اصل طراحی' : 'CORE TENET'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                  {isFa ? d.titleFa : d.titleEn}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isNight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {isFa ? d.descFa : d.descEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: THE 3 CO-FOUNDERS (ARCHITECTURAL VISION)
          Spacious gallery aesthetic, equal stature, high-end photography
          ========================================================================= */}
      <section className="w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-300">
          <div>
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${accentText}`}>
              {isFa ? 'هدایت استودیو' : 'STUDIO LEADERSHIP'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">
              {isFa ? 'هم‌بنیان‌گذاران جیرجیرک' : 'Co-Founders & System Architects'}
            </h2>
          </div>
          <p className="text-xs font-mono opacity-60">
            {isFa ? '۳ معمار مستقل با مسئولیت و چشم‌انداز مشترک' : 'Equal Leads · Unified Vision'}
          </p>
        </div>

        {/* 3 Co-Founders Grid: Generous spacing, beautiful portraits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CO_FOUNDERS.map((founder) => (
            <div
              key={founder.id}
              className={`group rounded-3xl p-6 sm:p-7 border flex flex-col justify-between gap-6 transition-all duration-500 ${
                isNight
                  ? 'bg-white border-neutral-300/80 hover:border-black shadow-sm'
                  : 'bg-brand-surface border-white/10 hover:border-white/20 shadow-xl'
              }`}
            >
              <div className="flex flex-col gap-5">
                {/* Portrait with subtle tone & hover transition */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 dark:border-white/10 border-neutral-300">
                  <img
                    src={founder.image}
                    alt={founder.nameEn}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Floating discipline tag on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 block">
                      {isFa ? founder.disciplineFa : founder.disciplineEn}
                    </span>
                    <span className="text-lg font-bold block mt-0.5">
                      {isFa ? founder.nameFa : founder.nameEn}
                    </span>
                  </div>
                </div>

                {/* Role and Vision */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-sm font-bold ${accentText}`}>
                    {isFa ? founder.roleFa : founder.roleEn}
                  </span>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${isNight ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    {isFa ? founder.ethosFa : founder.ethosEn}
                  </p>
                </div>
              </div>

              {/* Founder Stature Indicator */}
              <div className="pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200 flex items-center justify-between text-xs font-mono">
                <span className="opacity-50">{isFa ? 'جایگاه در استودیو' : 'Role'}</span>
                <span className={`font-bold ${accentText}`}>CO-FOUNDER</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          SECTION 4: THE 7 DISCIPLINES CAMPUS (ROOMS SHOWCASE)
          Visually rich, distinct background tone, intuitive exploration
          ========================================================================= */}
      <section
        className={`w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-y transition-colors duration-700 ${
          isNight
            ? 'bg-[#f8f6f0] border-neutral-300 text-brand-dark'
            : 'bg-[#1c1c1c] border-white/10 text-brand-light'
        }`}
      >
        <div className="max-w-[1500px] mx-auto flex flex-col gap-14">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-300">
            <div>
              <span className={`text-xs font-mono font-bold uppercase tracking-widest ${accentText}`}>
                {isFa ? 'جهان جیرجیرک' : 'THE JIRJIRAK CAMPUS'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">
                {isFa ? '۷ دپارتمان تخصصی استودیو' : '7 Interdisciplinary Rooms'}
              </h2>
            </div>
            <Link
              to="/departments"
              className={`text-xs font-mono font-bold flex items-center gap-2 hover:underline ${accentText}`}
            >
              <span>{isFa ? 'کاوش کامل پردیس' : 'Explore All Rooms'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Clean 3-Column Rooms Showcase with generous spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS_DATA.slice(0, 6).map((dept) => (
              <Link
                key={dept.id}
                to={`/departments/${dept.id}`}
                className={`group rounded-3xl p-6 border flex flex-col justify-between gap-5 transition-all duration-300 hover:-translate-y-1.5 ${
                  isNight
                    ? 'bg-white border-neutral-300/80 hover:border-black shadow-sm'
                    : 'bg-brand-surface border-white/10 hover:border-white/20 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className={`font-bold ${accentText}`}>ROOM 0{dept.number}</span>
                    <span className="opacity-50">{isFa ? 'اتاق تخصصی' : 'Specialized Room'}</span>
                  </div>

                  {/* Room Space Image Preview */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-neutral-900 border border-white/10 dark:border-white/10 border-neutral-300 p-2 flex items-center justify-center">
                    <img
                      src={dept.roomImage}
                      alt={dept.titleEn}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        if (dept.roomImageThumb) {
                          (e.target as HTMLImageElement).src = dept.roomImageThumb;
                        }
                      }}
                    />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight group-hover:underline mb-1">
                    {isFa ? dept.titleFa : dept.titleEn}
                  </h3>
                  <p className={`text-xs font-semibold mb-2 ${accentText}`}>
                    "{isFa ? dept.sloganFa : dept.sloganEn}"
                  </p>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isNight ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    {isFa ? dept.manifestoFa : dept.manifestoEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200 flex items-center justify-between text-xs font-mono font-bold">
                  <span className="opacity-60">{isFa ? 'ورود به دپارتمان' : 'Enter Room'}</span>
                  <span className={accentText}>{isFa ? '←' : '→'}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 5: THE SPOTLIGHT DOSSIER (THE ATELIER TEAM)
          Dedicated team lounge with clear boundary and perfected UX
          ========================================================================= */}
      <div
        className={`w-full py-28 sm:py-36 px-6 sm:px-10 lg:px-16 border-y transition-colors duration-700 ${
          isNight
            ? 'bg-[#f3f0e8] border-neutral-300 text-brand-dark'
            : 'bg-[#191919] border-white/10 text-brand-light'
        }`}
      >
        <div className="max-w-[1500px] mx-auto">
          <VisionaryTeamShowcase />
        </div>
      </div>


      {/* =========================================================================
          SECTION 6: THE DIRECT INVITATION (CALL TO ACTION)
          Expansive, clean, uncluttered closing
          ========================================================================= */}
      <section
        className={`w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 border-t transition-colors duration-700 ${
          isNight
            ? 'bg-[#eae6db] border-neutral-300 text-brand-dark'
            : 'bg-[#151515] border-white/10 text-brand-light'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left rtl:md:text-right">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${accentText}`}>
              {isFa ? 'شروع همکاری' : 'LET’S BUILD SOMETHING DISTINCTIVE'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              {isFa ? 'پروژه‌ای متمایز در ذهن دارید؟' : 'Ready to create something unexpected?'}
            </h2>
            <p className={`text-base leading-relaxed ${isNight ? 'text-neutral-700' : 'text-neutral-400'}`}>
              {isFa
                ? 'استودیو جیرجیرک با ایده‌های جسورانه و اجرای دقیق، همراه برندهایی است که می‌خواهند از روزمرگی و کلیشه‌ها فاصله بگیرند.'
                : 'Jirjirak partners with forward-thinking brands seeking bold originality backed by meticulous engineering.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/departments"
              className={`px-7 py-3.5 rounded-full font-bold text-sm border transition-all ${
                isNight
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-brand-dark border-neutral-300'
                  : 'bg-white/5 hover:bg-white/10 text-brand-light border-white/10'
              }`}
            >
              {isFa ? 'کاوش دپارتمان‌ها' : 'Explore Departments'}
            </Link>
            <Link
              to="/contact"
              className={`px-7 py-3.5 rounded-full font-bold text-sm border transition-all ${accentBg} ${accentBorder} shadow-lg`}
            >
              {isFa ? 'گفتگو با استودیو' : 'Start a Conversation'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
