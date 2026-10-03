import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../../stores/globalStore';
import { ALL_TEAM_MEMBERS, DepartmentCategory } from '../components/team-models/teamData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryFilter {
  id: string;
  nameEn: string;
  nameFa: string;
  deptKeys: DepartmentCategory[];
}

const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: 'all', nameEn: 'All Atelier', nameFa: 'همه اعضا', deptKeys: [] },
  { id: 'leadership', nameEn: 'Co-Founders', nameFa: 'هم‌بنیان‌گذاران', deptKeys: ['leadership'] },
  { id: 'engineering', nameEn: 'Engineering & Tech', nameFa: 'فنی و مهندسی', deptKeys: ['web-dev', 'game-interactive'] },
  { id: 'creative', nameEn: 'Design & Visuals', nameFa: 'دیزاین و هنر', deptKeys: ['branding-identity', 'creative-studio'] },
  { id: 'strategy', nameEn: 'Growth & Strategy', nameFa: 'رشد و استراتژی', deptKeys: ['seo-analytics', 'digital-marketing', 'academy-hub'] },
];

export function VisionaryTeamShowcase() {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtered members list
  const filteredMembers = useMemo(() => {
    if (selectedCategory === 'all') return ALL_TEAM_MEMBERS;
    const cat = CATEGORY_FILTERS.find((c) => c.id === selectedCategory);
    if (!cat) return ALL_TEAM_MEMBERS;
    return ALL_TEAM_MEMBERS.filter((m) => cat.deptKeys.includes(m.department));
  }, [selectedCategory]);

  // Selected member state
  const [selectedMemberId, setSelectedMemberId] = useState<string>(ALL_TEAM_MEMBERS[0].id);

  // Sync selection if current member is filtered out
  useEffect(() => {
    if (!filteredMembers.some((m) => m.id === selectedMemberId)) {
      if (filteredMembers.length > 0) {
        setSelectedMemberId(filteredMembers[0].id);
      }
    }
  }, [filteredMembers, selectedMemberId]);

  const activeMember =
    filteredMembers.find((m) => m.id === selectedMemberId) || filteredMembers[0] || ALL_TEAM_MEMBERS[0];

  const currentIdx = filteredMembers.findIndex((m) => m.id === activeMember.id);

  // Navigation handlers:
  // '<' (Left / ChevronLeft) moves to PREVIOUS
  // '>' (Right / ChevronRight) moves to NEXT
  const handlePrev = () => {
    const prev = (currentIdx - 1 + filteredMembers.length) % filteredMembers.length;
    setSelectedMemberId(filteredMembers[prev].id);
  };

  const handleNext = () => {
    const next = (currentIdx + 1) % filteredMembers.length;
    setSelectedMemberId(filteredMembers[next].id);
  };

  // Jirjirak Brand Styling Tokens
  // In Night mode (dark bg): Brand Yellow is #fff083 with high contrast
  // In Day mode (light bg): Brand Olive is #b3a85c with high contrast
  const accentText = isNight ? 'text-[#b3a85c]' : 'text-brand-yellow';
  const accentBg = isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark';
  const accentBorder = isNight ? 'border-[#b3a85c]' : 'border-brand-yellow';
  const cardBgClass = isNight
    ? 'bg-white border-neutral-300 text-brand-dark shadow-sm'
    : 'bg-brand-surface border-brand-surface-light text-brand-light shadow-xl';

  return (
    <section
      id="visionary-team"
      className="w-full flex flex-col gap-8 transition-colors duration-700 ease-in-out"
    >
      {/* 1. SECTION HEADER: Disciplined Studio Atelier Title & Clean Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10 dark:border-white/10 border-neutral-300">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${accentText}`}>
              JIRJIRAK ATELIER
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
            <span className="text-xs font-mono opacity-60">
              {filteredMembers.length} {isFa ? 'عضو' : 'Members'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {isFa ? 'اعضای استودیو' : 'Studio Members'}
          </h2>
        </div>

        {/* Clean, uncrowded category filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORY_FILTERS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? `${accentBg} ${accentBorder} font-bold shadow-sm`
                    : isNight
                    ? 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:border-neutral-500'
                    : 'bg-white/5 text-brand-light/75 border-white/10 hover:border-white/30'
                }`}
              >
                {isFa ? cat.nameFa : cat.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. THE SPOTLIGHT DOSSIER: Flawless Mobile & Desktop Experience */}
      <div className="w-full flex flex-col gap-6">

        {/* 📱 MOBILE VIEW (< lg): Carousel Strip + In-View Dossier Card */}
        <div className="lg:hidden flex flex-col gap-4">
          
          {/* Mobile Controller: [ < ] [ > ] Stepper + Quick Horizontal Member Avatars */}
          <div className={`p-3 rounded-2xl border flex flex-col gap-3 ${cardBgClass}`}>
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono font-bold opacity-70">
                0{currentIdx + 1} / 0{filteredMembers.length}
              </span>

              {/* Standard Linear Navigation Buttons: [ < ] on left, [ > ] on right */}
              <div className="flex items-center gap-1.5" dir="ltr">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={isFa ? 'قبلی' : 'Previous'}
                  title={isFa ? 'قبلی' : 'Previous'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isNight
                      ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                      : 'border-white/15 hover:bg-white/10 text-brand-light'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={isFa ? 'بعدی' : 'Next'}
                  title={isFa ? 'بعدی' : 'Next'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isNight
                      ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                      : 'border-white/15 hover:bg-white/10 text-brand-light'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Tap-to-Select Avatar Row */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 no-scrollbar">
              {filteredMembers.map((m, idx) => {
                const isSelected = m.id === activeMember.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMemberId(m.id)}
                    className={`shrink-0 flex items-center gap-2 p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? isNight
                          ? 'bg-neutral-100 border-[#b3a85c] shadow-sm font-bold scale-105'
                          : 'bg-white/15 border-brand-yellow shadow-md font-bold scale-105'
                        : isNight
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-600'
                        : 'bg-black/25 border-white/5 text-brand-light/70'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 transition-colors ${
                        isSelected ? (isNight ? 'border-[#b3a85c]' : 'border-brand-yellow') : 'border-transparent'
                      }`}
                    >
                      <img src={m.image} alt={m.nameEn} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col text-left rtl:text-right pr-1">
                      <span className="text-xs font-bold whitespace-nowrap">
                        {isFa ? m.nameFa.split(' ')[0] : m.nameEn.split(' ')[0]}
                      </span>
                      <span className="text-[9px] font-mono opacity-50">0{idx + 1}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile In-View Dossier Card */}
          <div className={`rounded-3xl p-5 border relative overflow-hidden transition-colors duration-500 ${cardBgClass}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${accentText}`}>
                    0{currentIdx + 1} / 0{filteredMembers.length}
                  </span>
                  <span className="text-xs font-mono opacity-50">
                    {activeMember.isFounder ? (isFa ? 'هم‌بنیان‌گذار' : 'Co-Founder') : (isFa ? 'متخصص استودیو' : 'Specialist')}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-neutral-300 bg-neutral-900 shadow-md">
                    <img
                      src={activeMember.image}
                      alt={activeMember.nameEn}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {isFa ? activeMember.nameFa : activeMember.nameEn}
                    </h3>
                    <p className={`text-sm font-semibold ${accentText}`}>
                      {isFa ? activeMember.roleFa : activeMember.roleEn}
                    </p>
                    <p className={`text-xs leading-relaxed mt-1 ${isNight ? 'text-neutral-700' : 'text-brand-gray'}`}>
                      {isFa ? activeMember.bioFa : activeMember.bioEn}
                    </p>
                  </div>
                </div>

                {/* Focus areas / Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(isFa ? activeMember.skillsFa : activeMember.skillsEn).map((skill) => (
                    <span
                      key={skill}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                        isNight
                          ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                          : 'bg-white/5 border-white/10 text-brand-light/90'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 dark:border-white/10 border-neutral-200">
                  {activeMember.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-center ${
                        isNight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/20 border-white/5'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-60 block truncate mb-0.5">
                        {isFa ? st.labelFa : st.labelEn}
                      </span>
                      <span className={`text-xs font-bold block truncate ${accentText}`}>
                        {st.val}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 💻 DESKTOP VIEW (lg+): 2-Column Split: Left Roster List + Right Spotlight Card */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (5 Cols): Clean Editorial Member Roster */}
          <div className={`lg:col-span-5 rounded-3xl p-6 border flex flex-col justify-between gap-5 transition-colors duration-500 ${cardBgClass}`}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10 border-neutral-200">
                <span className="text-xs font-mono font-bold uppercase opacity-60">
                  {isFa ? 'فهرست اعضا' : 'ATELIER ROSTER'}
                </span>
                <span className="text-xs font-mono opacity-50">
                  0{currentIdx + 1} / 0{filteredMembers.length}
                </span>
              </div>

              {/* Scrollable member rows */}
              <div className="flex flex-col gap-1.5 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {filteredMembers.map((m, i) => {
                  const isSelected = m.id === activeMember.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMemberId(m.id)}
                      className={`w-full p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-left rtl:text-right border ${
                        isSelected
                          ? isNight
                            ? 'bg-neutral-100 border-[#b3a85c] shadow-sm font-bold'
                            : 'bg-white/10 border-brand-yellow/60 shadow-md font-bold'
                          : isNight
                          ? 'border-transparent hover:bg-neutral-50 text-neutral-700 hover:text-black'
                          : 'border-transparent hover:bg-white/5 text-brand-light/75 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span
                          className={`text-xs font-mono font-bold w-6 text-center ${
                            isSelected ? accentText : 'opacity-40'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-current opacity-80">
                          <img
                            src={m.image}
                            alt={m.nameEn}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="truncate">
                          <span className="text-sm font-bold block truncate">
                            {isFa ? m.nameFa : m.nameEn}
                          </span>
                          <span
                            className={`text-xs block truncate ${
                              isNight ? 'text-neutral-500' : 'text-brand-gray'
                            }`}
                          >
                            {isFa ? m.roleFa : m.roleEn}
                          </span>
                        </div>
                      </div>

                      <span className={`text-xs font-mono ${isSelected ? accentText : 'opacity-40'}`}>
                        0{i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Nav Stepper: [ < ] on left, [ > ] on right */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 dark:border-white/10 border-neutral-200">
              <span className="text-xs font-mono opacity-60">
                0{currentIdx + 1} / 0{filteredMembers.length}
              </span>
              
              <div className="flex items-center gap-1.5" dir="ltr">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={isFa ? 'قبلی' : 'Previous'}
                  title={isFa ? 'قبلی' : 'Previous'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isNight
                      ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                      : 'border-white/15 hover:bg-white/10 text-brand-light'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={isFa ? 'بعدی' : 'Next'}
                  title={isFa ? 'بعدی' : 'Next'}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isNight
                      ? 'border-neutral-300 hover:bg-neutral-100 text-brand-dark'
                      : 'border-white/15 hover:bg-white/10 text-brand-light'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): The Spotlight Dossier Card */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden transition-colors duration-500 ${cardBgClass}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col gap-6"
              >
                {/* Top Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${accentText}`}>
                    0{currentIdx + 1} / 0{filteredMembers.length}
                  </span>
                  <span className="text-xs font-mono opacity-50">
                    {activeMember.isFounder ? (isFa ? 'هم‌بنیان‌گذار' : 'Co-Founder') : (isFa ? 'متخصص استودیو' : 'Specialist')}
                  </span>
                </div>

                {/* Profile Grid: Photo + Bio */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 border-neutral-300 bg-neutral-900 shadow-md">
                    <img
                      src={activeMember.image}
                      alt={activeMember.nameEn}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="sm:col-span-7 flex flex-col gap-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                        {isFa ? activeMember.nameFa : activeMember.nameEn}
                      </h3>
                      <p className={`text-sm font-semibold ${accentText}`}>
                        {isFa ? activeMember.roleFa : activeMember.roleEn}
                      </p>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-neutral-700' : 'text-brand-gray'}`}>
                      {isFa ? activeMember.bioFa : activeMember.bioEn}
                    </p>

                    {/* Clean Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(isFa ? activeMember.skillsFa : activeMember.skillsEn).map((skill) => (
                        <span
                          key={skill}
                          className={`text-xs font-mono px-3 py-1 rounded-lg border ${
                            isNight
                              ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                              : 'bg-white/5 border-white/10 text-brand-light/90'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Disciplined Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 dark:border-white/10 border-neutral-200">
                  {activeMember.stats.map((st, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center ${
                        isNight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/20 border-white/5'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-60 block truncate mb-0.5">
                        {isFa ? st.labelFa : st.labelEn}
                      </span>
                      <span className={`text-xs sm:text-sm font-bold block truncate ${accentText}`}>
                        {st.val}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
