import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useGlobalStore } from '../stores/globalStore';
import { DEPARTMENTS_DATA, getDepartmentMembers } from '../features/departments/departmentData';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Sparkles, Users } from 'lucide-react';

export default function Departments() {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const accentText = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const accentBg = isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark';
  const cardBgClass = isNight
    ? 'bg-white border-neutral-300 text-brand-dark shadow-sm'
    : 'bg-brand-surface border-brand-surface-light text-brand-light shadow-xl';

  return (
    <div
      className={`min-h-screen pt-24 pb-24 transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-12">

        {/* HERO HEADER */}
        <div className="flex flex-col gap-4 pb-8 border-b border-white/10 dark:border-white/10 border-neutral-300">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${accentText}`}>
              {isFa ? 'ساختار استودیو و دپارتمان‌ها' : 'ATELIER DEPARTMENTS'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            <span className="text-xs font-mono opacity-60">
              {isFa ? '۷ بخش تخصصی' : '7 Dedicated Disciplines'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {isFa ? 'جهان و دپارتمان‌های جیرجیرک' : 'The Jirjirak Campus'}
          </h1>

          <p
            className={`text-base sm:text-lg max-w-3xl leading-relaxed ${
              isNight ? 'text-neutral-700' : 'text-brand-gray'
            }`}
          >
            {isFa
              ? 'جیرجیرک یک استودیوی چندرشته‌ای مستقل است که مرز میان نوآوری خلاقانه و انضباط مهندسی را شکل می‌دهد. هر دپارتمان فضایی فیزیکی و مفهومی در جهان استودیو است که متخصصان و نمونه‌کارهای خود را در بر می‌گیرد.'
              : 'Jirjirak is an independent multidisciplinary creative studio bridging creative experimentation with engineering-level discipline. Explore our specialized departments, their teams, and their flagship works.'}
          </p>
        </div>

        {/* 7 DEPARTMENTS SHOWCASE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DEPARTMENTS_DATA.map((dept) => {
            const members = getDepartmentMembers(dept.id);
            return (
              <Link
                key={dept.id}
                to={`/departments/${dept.id}`}
                className={`group rounded-3xl p-5 sm:p-6 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${cardBgClass}`}
              >
                <div>
                  {/* Top Bar with Number & Specialists count */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className={`font-bold ${accentText}`}>0{dept.number}</span>
                    <span className="opacity-60 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {members.length} {isFa ? 'عضو' : 'P'}
                    </span>
                  </div>

                  {/* 3D Isometric Room Thumbnail */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-neutral-900 border border-white/10 dark:border-white/10 border-neutral-300 flex items-center justify-center p-3">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/80 pointer-events-none">
                      CAMPUS // ROOM 0{dept.number}
                    </span>
                  </div>

                  {/* Department Title & Slogan */}
                  <div className="flex items-center justify-between mb-1.5">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:underline">
                      {isFa ? dept.titleFa : dept.titleEn}
                    </h2>
                    <ArrowUpRight className={`w-5 h-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${accentText}`} />
                  </div>

                  <p className={`text-xs font-semibold mb-3 ${accentText}`}>
                    "{isFa ? dept.sloganFa : dept.sloganEn}"
                  </p>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                      isNight ? 'text-neutral-700' : 'text-brand-gray'
                    }`}
                  >
                    {isFa ? dept.manifestoFa : dept.manifestoEn}
                  </p>
                </div>

                {/* Footer with Member Avatars & Enter Link */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center -space-x-2 rtl:space-x-reverse">
                    {members.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        className="w-7 h-7 rounded-full overflow-hidden border border-current bg-neutral-900"
                        title={isFa ? m.nameFa : m.nameEn}
                      >
                        <img src={m.image} alt={m.nameEn} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {members.length > 4 && (
                      <div className="w-7 h-7 rounded-full border border-current bg-black/60 text-[9px] font-mono text-white flex items-center justify-center">
                        +{members.length - 4}
                      </div>
                    )}
                  </div>

                  <span className={`text-xs font-mono font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1 ${accentText}`}>
                    <span>{isFa ? 'ورود به دپارتمان' : 'Enter'}</span>
                    {isFa ? '←' : '→'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
