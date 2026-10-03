import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../stores/globalStore';
import {
  DEPARTMENTS_DATA,
  getDepartmentById,
  getDepartmentMembers,
  DepartmentProject,
} from '../features/departments/departmentData';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  CheckCircle2,
  Code,
  Compass,
} from 'lucide-react';

export default function DepartmentDetail() {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  const department = getDepartmentById(deptId || 'web-dev') || DEPARTMENTS_DATA[0];
  const members = getDepartmentMembers(department.id);

  // Active project modal
  const [selectedProject, setSelectedProject] = useState<DepartmentProject | null>(null);

  // Next / Previous department cycler
  const currentIndex = DEPARTMENTS_DATA.findIndex((d) => d.id === department.id);
  const prevDept = DEPARTMENTS_DATA[(currentIndex - 1 + DEPARTMENTS_DATA.length) % DEPARTMENTS_DATA.length];
  const nextDept = DEPARTMENTS_DATA[(currentIndex + 1) % DEPARTMENTS_DATA.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [deptId]);

  // Brand Color tokens
  const accentText = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const accentBg = isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark';
  const accentBorder = isNight ? 'border-[#b3a85c]' : 'border-brand-yellow';
  const cardBgClass = isNight
    ? 'bg-white border-neutral-300 text-brand-dark shadow-sm'
    : 'bg-brand-surface border-brand-surface-light text-brand-light shadow-xl';

  return (
    <div
      className={`min-h-screen pt-24 pb-24 transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-16">

        {/* 1. TOP BREADCRUMB & DEPARTMENT QUICK JUMP */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-300">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              to="/departments"
              className="opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              {isFa ? 'دپارتمان‌های جیرجیرک' : 'Departments'}
            </Link>
            <span className="opacity-40">/</span>
            <span className={`font-bold ${accentText}`}>
              0{department.number} • {isFa ? department.titleFa : department.titleEn}
            </span>
          </div>

          {/* Quick Department Steppers with Correct RTL/LTR Arrow Orientation */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Previous */}
            <Link
              to={`/departments/${prevDept.id}`}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isNight
                  ? 'border-neutral-300 bg-white hover:bg-neutral-100 text-brand-dark'
                  : 'border-white/10 bg-brand-surface hover:bg-white/10 text-brand-light'
              }`}
            >
              {isFa ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isFa ? prevDept.titleFa.split(' ')[0] : prevDept.titleEn.split(' ')[0]}</span>
            </Link>

            {/* Next */}
            <Link
              to={`/departments/${nextDept.id}`}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isNight
                  ? 'border-neutral-300 bg-white hover:bg-neutral-100 text-brand-dark'
                  : 'border-white/10 bg-brand-surface hover:bg-white/10 text-brand-light'
              }`}
            >
              <span>{isFa ? nextDept.titleFa.split(' ')[0] : nextDept.titleEn.split(' ')[0]}</span>
              {isFa ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>

        {/* 2. HERO: 3D ISOMETRIC DEPARTMENT ROOM + MANIFESTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Department Text & Mission */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${accentBorder} ${accentText}`}>
                DEPARTMENT 0{department.number}
              </span>
              <span className="text-xs font-mono opacity-60">
                {isFa ? department.disciplineFa : department.disciplineEn}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {isFa ? department.titleFa : department.titleEn}
            </h1>

            <p className={`text-base sm:text-lg font-semibold ${accentText}`}>
              "{isFa ? department.sloganFa : department.sloganEn}"
            </p>

            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isNight ? 'text-neutral-700' : 'text-brand-gray'
              }`}
            >
              {isFa ? department.manifestoFa : department.manifestoEn}
            </p>

            {/* Core Capabilities Chips */}
            <div className="pt-2">
              <span className="text-xs font-mono opacity-60 block mb-2 uppercase">
                {isFa ? 'توانمندی‌های تخصصی این دپارتمان:' : 'Core Capabilities:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(isFa ? department.capabilitiesFa : department.capabilitiesEn).map((cap, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                      isNight
                        ? 'bg-white border-neutral-300 text-neutral-800'
                        : 'bg-white/5 border-white/10 text-brand-light'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'}`} />
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3D Isometric Room Hero Image from Landing Page */}
          <div className="lg:col-span-6">
            <div
              className={`rounded-3xl p-4 sm:p-6 border relative overflow-hidden group shadow-2xl transition-colors duration-500 ${
                isNight ? 'bg-white border-neutral-300' : 'bg-brand-surface border-brand-surface-light'
              }`}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                <img
                  src={department.roomImage}
                  alt={department.titleEn}
                  className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to thumbnail if high-res PNG has issue
                    if (department.roomImageThumb) {
                      (e.target as HTMLImageElement).src = department.roomImageThumb;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono font-bold tracking-wider opacity-80">
                    JIRJIRAK WORLD // CAMPUS ROOM 0{department.number}
                  </span>
                  <span className="text-xs font-mono bg-black/60 px-2 py-0.5 rounded">
                    3D ATELIER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SECTION: RESUME & PORTFOLIO (نمونه‌کارهای تخصصی این دپارتمان) */}
        <div className="flex flex-col gap-6 pt-6 border-t border-white/10 dark:border-white/10 border-neutral-300">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className={`w-4 h-4 ${accentText}`} />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${accentText}`}>
                  {isFa ? 'رزومه و پرونده کاری' : 'DEPARTMENT PORTFOLIO'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isFa ? 'نمونه‌کارهای تخصصی این دپارتمان' : 'Selected Works & Case Studies'}
              </h2>
            </div>
            <span className="text-xs font-mono opacity-60">
              {isFa ? `${department.projects.length} پروژه شاخص` : `${department.projects.length} Flagship Projects`}
            </span>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {department.projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`group rounded-3xl p-5 sm:p-6 border flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-1 ${cardBgClass}`}
              >
                <div>
                  {/* Project Image */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-neutral-900">
                    <img
                      src={proj.image}
                      alt={proj.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-mono">
                      {proj.year} • {proj.client}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-semibold ${accentText}`}>
                      {isFa ? proj.categoryFa : proj.categoryEn}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                    {isFa ? proj.titleFa : proj.titleEn}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isNight ? 'text-neutral-700' : 'text-brand-gray'
                    }`}
                  >
                    {isFa ? proj.descFa : proj.descEn}
                  </p>
                </div>

                {/* Metrics & Tech Stack */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200 flex flex-col gap-3">
                  <div className="grid grid-cols-3 gap-2">
                    {proj.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl text-center border ${
                          isNight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/30 border-white/5'
                        }`}
                      >
                        <span className="text-[9px] font-mono opacity-60 block truncate">
                          {isFa ? m.labelFa : m.labelEn}
                        </span>
                        <span className={`text-xs sm:text-sm font-bold block truncate ${accentText}`}>
                          {m.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isNight
                            ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                            : 'bg-white/5 border-white/10 text-brand-light/80'
                        }`}
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. SECTION: DEPARTMENT SPECIALISTS (اعضای این دپارتمان) */}
        <div className="flex flex-col gap-6 pt-6 border-t border-white/10 dark:border-white/10 border-neutral-300">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className={`w-4 h-4 ${accentText}`} />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${accentText}`}>
                  {isFa ? 'تیم متخصصین' : 'DEPARTMENT TEAM'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isFa ? 'اعضا و پژوهشگران این دپارتمان' : 'Specialists & Practitioners'}
              </h2>
            </div>
            <span className="text-xs font-mono opacity-60">
              {isFa ? `${members.length} متخصص فعال` : `${members.length} Active Personnel`}
            </span>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {members.map((m, i) => (
              <div
                key={m.id}
                className={`rounded-2xl p-4 border flex flex-col justify-between transition-colors duration-500 ${cardBgClass}`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60 mb-3">
                    <span>0{i + 1}</span>
                    <span>{m.code}</span>
                  </div>

                  {/* Photo */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-neutral-900 group shadow-md">
                    <img
                      src={m.image}
                      alt={m.nameEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {m.isFounder && (
                      <span className={`absolute top-2 right-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${accentBg}`}>
                        CO-FOUNDER
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold truncate">
                    {isFa ? m.nameFa : m.nameEn}
                  </h3>
                  <p className={`text-xs font-semibold mb-2 truncate ${accentText}`}>
                    {isFa ? m.roleFa : m.roleEn}
                  </p>

                  <p
                    className={`text-xs line-clamp-3 leading-relaxed mb-3 ${
                      isNight ? 'text-neutral-700' : 'text-brand-gray'
                    }`}
                  >
                    {isFa ? m.bioFa : m.bioEn}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-3 border-t border-white/10 dark:border-white/10 border-neutral-200">
                  {(isFa ? m.skillsFa : m.skillsEn).slice(0, 3).map((sk) => (
                    <span
                      key={sk}
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                        isNight
                          ? 'bg-neutral-100 border-neutral-200 text-neutral-700'
                          : 'bg-white/5 border-white/10 text-brand-light/75'
                      }`}
                    >
                      #{sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. BOTTOM NAVIGATION: CAMPUS JUMP BAR */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-500 ${cardBgClass}`}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase opacity-60 block mb-1">
              {isFa ? 'کاوش در سایر بخش‌های استودیو' : 'CONTINUE EXPLORING'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              {isFa ? 'مشاهده تمام دپارتمان‌های جهان جیرجیرک' : 'View the Full Jirjirak Campus'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/departments"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all ${accentBg} ${accentBorder} shadow-md`}
            >
              {isFa ? 'نمایش همه دپارتمان‌ها' : 'All Departments'}
            </Link>
            <Link
              to="/contact"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                isNight
                  ? 'bg-white border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-brand-light'
              }`}
            >
              {isFa ? 'شروع همکاری' : 'Start a Project'}
            </Link>
          </div>
        </div>

      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`relative z-10 w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${cardBgClass}`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer font-bold text-sm"
              >
                ✕
              </button>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-neutral-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className={`text-xs font-mono font-bold ${accentText}`}>
                {isFa ? selectedProject.categoryFa : selectedProject.categoryEn}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 mb-3">
                {isFa ? selectedProject.titleFa : selectedProject.titleEn}
              </h2>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  isNight ? 'text-neutral-700' : 'text-brand-gray'
                }`}
              >
                {isFa ? selectedProject.descFa : selectedProject.descEn}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {selectedProject.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center ${
                      isNight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/30 border-white/5'
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-60 block truncate mb-1">
                      {isFa ? m.labelFa : m.labelEn}
                    </span>
                    <span className={`text-sm sm:text-base font-bold block truncate ${accentText}`}>
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200">
                <span className="text-xs font-mono opacity-60">
                  {selectedProject.client} • {selectedProject.year}
                </span>
                <Link
                  to="/contact"
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${accentBg}`}
                >
                  {isFa ? 'سفارش پروژه مشابه' : 'Build Similar Project'}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
