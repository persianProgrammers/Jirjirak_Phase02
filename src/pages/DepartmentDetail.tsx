import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useGlobalStore } from '../stores/globalStore';
import { DEPARTMENTS } from '../data/departmentsData';
import { ArrowLeft, ArrowRight, Sparkles, Layers, ChevronRight, Home } from 'lucide-react';

export default function DepartmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';

  // Find department by slug or fallback to first
  const currentDept = DEPARTMENTS.find((d) => d.slug === slug || d.id === slug) || DEPARTMENTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const currentIndex = DEPARTMENTS.findIndex((d) => d.id === currentDept.id);
  const prevDept = DEPARTMENTS[(currentIndex - 1 + DEPARTMENTS.length) % DEPARTMENTS.length];
  const nextDept = DEPARTMENTS[(currentIndex + 1) % DEPARTMENTS.length];

  return (
    <div
      className={`min-h-screen pt-28 pb-24 transition-colors duration-700 ${
        isNight ? 'bg-[#181818] text-white' : 'bg-[#f4f4f4] text-brand-dark'
      }`}
    >
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-mono mb-8 opacity-60">
          <Link to="/" className="hover:text-brand-yellow flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{isFa ? 'صفحه اصلی' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <Link to="/#services" className="hover:text-brand-yellow transition-colors">
            {isFa ? 'دپارتمان‌ها' : 'Departments'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <span className="text-brand-yellow font-bold">
            {isFa ? currentDept.nameFa : currentDept.nameEn}
          </span>
        </nav>

        {/* Hero Banner / Header Area */}
        <div
          className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border backdrop-blur-xl mb-12 transition-all ${
            isNight
              ? 'bg-[#222222]/80 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
              : 'bg-white/80 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
          }`}
        >
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-brand-yellow/10 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Department Info */}
            <div className="lg:col-span-7 flex flex-col items-start text-start">
              {/* Badge & Number */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-brand-yellow text-brand-dark">
                  DEP // {currentDept.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider opacity-60">
                  Jirjirak Atelier
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                {isFa ? currentDept.nameFa : currentDept.nameEn}
              </h1>

              {/* Slogan */}
              <p className="text-sm sm:text-base font-mono tracking-widest text-brand-yellow mb-4 uppercase">
                {isFa ? currentDept.sloganFa : currentDept.sloganEn}
              </p>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg opacity-80 leading-relaxed mb-6 max-w-xl">
                {isFa ? currentDept.descriptionFa : currentDept.descriptionEn}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(isFa ? currentDept.tagsFa : currentDept.tagsEn).map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      isNight ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-black/5 border-black/10 text-neutral-700'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Department Visual Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className={`relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border p-4 flex items-center justify-center transition-all ${
                  isNight ? 'bg-black/40 border-white/10' : 'bg-neutral-100 border-black/10'
                }`}
              >
                <img
                  src={currentDept.image}
                  alt={currentDept.nameEn}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Clean Landing Placeholder (Empty for now as requested) */}
        <div
          className={`rounded-2xl border-2 border-dashed p-12 sm:p-16 text-center flex flex-col items-center justify-center transition-all ${
            isNight
              ? 'border-white/15 bg-white/[0.02] text-neutral-400'
              : 'border-black/15 bg-black/[0.02] text-neutral-500'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-yellow/15 text-brand-yellow flex items-center justify-center mb-5">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {isFa ? 'صفحه اختصاصی این دپارتمان در حال آماده‌سازی است' : 'Department Landing Under Construction'}
          </h2>
          <p className="text-sm max-w-md opacity-70 mb-6">
            {isFa
              ? 'بخش‌ها و ساختار سفارشی این لندینگ طبق طرح و ایده شما به زودی در اینجا پیاده‌سازی خواهد شد.'
              : 'Custom sections, showcases, and interactive elements for this department will be placed here.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow text-brand-dark hover:opacity-90 transition-opacity"
            >
              {isFa ? 'بازگشت به خانه' : 'Back to Home'}
            </Link>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                isNight
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-black/20 text-black hover:bg-black/5'
              }`}
            >
              {isFa ? 'سفارش پروژه در این دپارتمان' : 'Start a Project in this Department'}
            </a>
          </div>
        </div>

        {/* Department Switcher Bar (Previous / Next Department) */}
        <div className="mt-12 flex items-center justify-between border-t border-neutral-700/30 pt-8">
          <Link
            to={`/departments/${prevDept.slug}`}
            className="flex items-center gap-2 group text-sm font-mono opacity-70 hover:opacity-100 hover:text-brand-yellow transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180" />
            <div className="flex flex-col text-start">
              <span className="text-[10px] uppercase opacity-50">{isFa ? 'دپارتمان قبلی' : 'Previous'}</span>
              <span className="font-bold">{isFa ? prevDept.nameFa : prevDept.nameEn}</span>
            </div>
          </Link>

          <Link
            to={`/departments/${nextDept.slug}`}
            className="flex items-center gap-2 group text-sm font-mono opacity-70 hover:opacity-100 hover:text-brand-yellow transition-all"
          >
            <div className="flex flex-col text-end">
              <span className="text-[10px] uppercase opacity-50">{isFa ? 'دپارتمان بعدی' : 'Next'}</span>
              <span className="font-bold">{isFa ? nextDept.nameFa : nextDept.nameEn}</span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
