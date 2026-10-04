import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useGlobalStore } from '../../../stores/globalStore';

export interface DepartmentItem {
  id: string;
  nameEn: string;
  nameFa: string;
  image: string;
  iconType: 'web' | 'seo' | 'branding' | 'creative' | 'marketing' | 'game' | 'academy';
}

export const SHOWCASE_DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'web-dev',
    nameEn: 'Web & Development',
    nameFa: 'وب و توسعه',
    image: '/assets/images/departments/Web-&-Development.png',
    iconType: 'web',
  },
  {
    id: 'seo-analytics',
    nameEn: 'SEO & Analytics',
    nameFa: 'سئو و تحلیل داده',
    image: '/assets/images/departments/Seo-&-Analytics.png',
    iconType: 'seo',
  },
  {
    id: 'digital-marketing',
    nameEn: 'Digital Marketing & Growth',
    nameFa: 'دیجیتال مارکتینگ و رشد',
    image: '/assets/images/departments/Digital-Marketing-&-Growth.png',
    iconType: 'marketing',
  },
  {
    id: 'branding-identity',
    nameEn: 'Branding & Identity',
    nameFa: 'برندینگ و هویت',
    image: '/assets/images/departments/Branding-&-Identity.png',
    iconType: 'branding',
  },
  {
    id: 'academy-hub',
    nameEn: 'Academy & Learning',
    nameFa: 'آموزش و آکادمی',
    image: '/assets/images/departments/Academy-&-Learning-Hub.png',
    iconType: 'academy',
  },
  {
    id: 'creative-studio',
    nameEn: 'Creative Studio',
    nameFa: 'استودیو خلاقیت',
    image: '/assets/images/departments/Creative-Studio.png',
    iconType: 'creative',
  },
  {
    id: 'game-interactive',
    nameEn: 'Game Studio & Interactive',
    nameFa: 'بازی‌سازی و تجارب تعاملی',
    image: '/assets/images/departments/Game-Studio-&-Interactive.png',
    iconType: 'game',
  },
];

// Department Hexagon Icons Matching the User's Screenshot
function DepartmentIcon({ type }: { type: DepartmentItem['iconType'] }) {
  switch (type) {
    case 'web':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 4l-4 16" />
        </svg>
      );
    case 'seo':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          <circle cx="13" cy="7" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'branding':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
    case 'game':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h4m-2-2v4m9-2h.01m3 0h.01" />
        </svg>
      );
    case 'academy':
      return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
  }
}

// Crisp Sci-Fi Hexagon Badge Wrapper
function HexagonBadge({
  active,
  locked,
  children,
}: {
  active: boolean;
  locked: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
      <svg
        viewBox="0 0 28 32"
        className={`w-full h-full transition-all duration-300 ${
          locked
            ? 'text-brand-yellow drop-shadow-[0_0_10px_rgba(255,240,131,0.85)] scale-105'
            : active
            ? 'text-brand-yellow drop-shadow-[0_0_8px_rgba(255,240,131,0.65)] scale-105'
            : 'text-neutral-500 group-hover:text-brand-yellow group-hover:drop-shadow-[0_0_6px_rgba(255,240,131,0.4)]'
        }`}
        fill="none"
      >
        <polygon
          points="14,1.5 26.5,8.8 26.5,23.2 14,30.5 1.5,23.2 1.5,8.8"
          fill={locked ? 'rgba(255, 240, 131, 0.22)' : active ? 'rgba(255, 240, 131, 0.12)' : 'rgba(20, 20, 20, 0.75)'}
          stroke="currentColor"
          strokeWidth={locked ? '1.8' : active ? '1.5' : '1.1'}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
          locked
            ? 'text-brand-yellow'
            : active
            ? 'text-brand-yellow'
            : 'text-neutral-400 group-hover:text-brand-yellow'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

interface HeroDepartmentShowcaseProps {
  isNight: boolean;
  isDayImageLoaded: boolean;
  isNightImageLoaded: boolean;
}

export function HeroDepartmentShowcase({
  isNight,
  isDayImageLoaded,
  isNightImageLoaded,
}: HeroDepartmentShowcaseProps) {
  const { currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  const [hoveredDeptId, setHoveredDeptId] = useState<string | null>(null);
  const [lockedDeptId, setLockedDeptId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Active department resolution:
  // If user is actively hovering on an item, show that item.
  // Otherwise, if an item was locked by click, show that locked item.
  // Otherwise, show default building image (null).
  const activeDeptId = hoveredDeptId ?? lockedDeptId;
  const isDisplayingDept = activeDeptId !== null;
  const activeDept = SHOWCASE_DEPARTMENTS.find((d) => d.id === activeDeptId);

  // Preload all department images instantly on mount for zero-latency switching
  useEffect(() => {
    SHOWCASE_DEPARTMENTS.forEach((dept) => {
      const img = new Image();
      img.src = dept.image;
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [dept.id]: true }));
      };
      img.onerror = () => {
        setLoadedImages((prev) => ({ ...prev, [dept.id]: true }));
      };
    });
  }, []);

  // Department click handler:
  // If clicked department is already locked, unlock it and return to default building.
  // If not locked, lock this department so it stays active.
  const handleDeptClick = useCallback((deptId: string) => {
    setLockedDeptId((prev) => (prev === deptId ? null : deptId));
  }, []);

  // Cycling via bottom-right arrow buttons (< and >)
  const handlePrev = useCallback(() => {
    if (!lockedDeptId) {
      setLockedDeptId(SHOWCASE_DEPARTMENTS[SHOWCASE_DEPARTMENTS.length - 1].id);
    } else {
      const currentIndex = SHOWCASE_DEPARTMENTS.findIndex((d) => d.id === lockedDeptId);
      if (currentIndex === 0) {
        // Unlock back to default building
        setLockedDeptId(null);
      } else {
        setLockedDeptId(SHOWCASE_DEPARTMENTS[currentIndex - 1].id);
      }
    }
  }, [lockedDeptId]);

  const handleNext = useCallback(() => {
    if (!lockedDeptId) {
      setLockedDeptId(SHOWCASE_DEPARTMENTS[0].id);
    } else {
      const currentIndex = SHOWCASE_DEPARTMENTS.findIndex((d) => d.id === lockedDeptId);
      if (currentIndex === SHOWCASE_DEPARTMENTS.length - 1) {
        // Unlock back to default building
        setLockedDeptId(null);
      } else {
        setLockedDeptId(SHOWCASE_DEPARTMENTS[currentIndex + 1].id);
      }
    }
  }, [lockedDeptId]);

  const handleResetToDefault = useCallback(() => {
    setLockedDeptId(null);
    setHoveredDeptId(null);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ========================================================================= */}
        {/* LEFT / CENTER COLUMN: DISPLAY VIEWPORT (Building or Department Image)    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 relative flex flex-col items-center justify-center">
          {/* Main Visual Display Frame with Futuristic HUD Styling */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden group">
            {/* Ambient Background Aura */}
            <div
              className={`absolute -inset-10 pointer-events-none rounded-full blur-[100px] transition-all duration-1000 ${
                isNight ? 'bg-indigo-950/25 opacity-100' : 'bg-amber-100/30 opacity-60'
              }`}
            />

            {/* Futuristic Corner Brackets on the Visual Container */}
            <div className="absolute inset-2 sm:inset-4 pointer-events-none z-20">
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-brand-yellow/50 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-brand-yellow/50 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-brand-yellow/50 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-brand-yellow/50 transition-all duration-300 group-hover:w-7 group-hover:h-7" />
            </div>

            {/* Bottom-Left 3D Wireframe Cube (Exact match to screenshot) */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-25 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9 text-brand-yellow/70"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M16 2 L28 8 L28 22 L16 28 L4 22 L4 8 Z" />
                <path d="M16 2 L16 28" />
                <path d="M16 16 L28 8" />
                <path d="M16 16 L4 8" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              </svg>
            </div>

            {/* Top HUD Status Pill */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-25 flex items-center gap-2 pointer-events-auto">
              {isDisplayingDept ? (
                <div
                  onClick={handleResetToDefault}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider backdrop-blur-md border cursor-pointer transition-all duration-300 ${
                    lockedDeptId === activeDeptId
                      ? 'bg-brand-yellow/15 border-brand-yellow/60 text-brand-yellow shadow-[0_0_12px_rgba(255,240,131,0.25)] hover:bg-brand-yellow/25'
                      : 'bg-black/60 border-white/20 text-neutral-300 hover:border-brand-yellow/40'
                  }`}
                  title={isFa ? 'برای بازگشت به حالت اولیه کلیک کنید' : 'Click to reset to default building'}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      lockedDeptId === activeDeptId ? 'bg-brand-yellow animate-ping' : 'bg-emerald-400 animate-pulse'
                    }`}
                  />
                  <span>
                    {lockedDeptId === activeDeptId
                      ? isFa
                        ? `قفل‌شده: ${activeDept?.nameFa || activeDept?.nameEn}`
                        : `LOCKED: ${activeDept?.nameEn}`
                      : isFa
                      ? `پیش‌نمایش: ${activeDept?.nameFa || activeDept?.nameEn}`
                      : `PREVIEW: ${activeDept?.nameEn}`}
                  </span>
                  {lockedDeptId === activeDeptId && (
                    <span className="text-[10px] text-brand-yellow/80 hover:text-white ml-1">✕</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider backdrop-blur-md border bg-black/40 border-white/10 text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/80 animate-pulse" />
                  <span>{isFa ? 'نمای استودیو جیرجیرک' : 'JIRJIRAK HEADQUARTERS'}</span>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* LAYER 1 & 2: DEFAULT ISOMETRIC BUILDING (Day and Night Modes)  */}
            {/* ------------------------------------------------------------- */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                !isDisplayingDept
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-[0.98] pointer-events-none'
              }`}
            >
              {/* Day Image Layer */}
              <img
                src="/assets/images/ui/hero-building-day.png"
                alt="Jirjirak Studio (Day)"
                className={`w-full h-full object-contain origin-center select-none transition-all duration-700 ease-in-out ${
                  !isNight ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                } ${isDayImageLoaded ? 'blur-0' : 'blur-lg'}`}
              />

              {/* Night Image Layer */}
              <img
                src="/assets/images/ui/hero-building-night.png"
                alt="Jirjirak Studio (Night)"
                className={`w-full h-full object-contain origin-center select-none transition-all duration-700 ease-in-out ${
                  isNight ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                } ${isNightImageLoaded ? 'blur-0' : 'blur-lg'}`}
              />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* LAYERS 3 TO 9: THE 7 DEPARTMENT IMAGES                        */}
            {/* ------------------------------------------------------------- */}
            {SHOWCASE_DEPARTMENTS.map((dept) => {
              const isCurrent = activeDeptId === dept.id;
              return (
                <div
                  key={dept.id}
                  className={`absolute inset-0 flex items-center justify-center p-2 sm:p-4 transition-all duration-500 ease-out ${
                    isCurrent
                      ? 'opacity-100 scale-100 pointer-events-auto z-15'
                      : 'opacity-0 scale-[0.97] pointer-events-none z-10'
                  }`}
                >
                  <img
                    src={dept.image}
                    alt={dept.nameEn}
                    className="w-full h-full object-contain rounded-xl drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] select-none"
                    loading="eager"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 7 DEPARTMENTS HUD SELECTOR (Exact layout as screenshot)    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 relative flex flex-col justify-between py-2 sm:py-4">
          {/* Top Section: "7 DISCOVER OUR DEPARTMENTS" Header */}
          <div className="relative mb-6 sm:mb-7">
            <div className="flex items-center gap-3.5">
              {/* Outer Golden Circuit Ring with number "7" */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-brand-yellow/70 flex items-center justify-center bg-brand-yellow/5 shadow-[0_0_16px_rgba(255,240,131,0.25)] shrink-0">
                <div className="absolute inset-[-4px] rounded-full border border-brand-yellow/25 border-dashed animate-spin-slow pointer-events-none" />
                <span className="font-mono text-lg sm:text-xl font-black text-brand-yellow tracking-tight">7</span>
              </div>

              {/* Title Text */}
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-neutral-400 uppercase font-semibold">
                  DISCOVER
                </span>
                <span className="font-sans text-xs sm:text-sm font-extrabold tracking-[0.16em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  OUR DEPARTMENTS
                </span>
              </div>
            </div>

            {/* Connecting Golden Line from Header down to the items */}
            <div className="absolute left-[21px] sm:left-[23px] top-[48px] sm:top-[52px] bottom-[-16px] w-[1px] bg-gradient-to-b from-brand-yellow/60 via-brand-yellow/30 to-brand-yellow/10 pointer-events-none hidden sm:block" />
          </div>

          {/* List of 7 Departments */}
          <div className="relative flex flex-col gap-2 sm:gap-2.5 my-2">
            {/* Extended vertical circuit trace */}
            <div className="absolute left-[21px] sm:left-[23px] top-0 bottom-6 w-[1px] bg-gradient-to-b from-brand-yellow/30 via-brand-yellow/20 to-transparent pointer-events-none hidden sm:block" />

            {SHOWCASE_DEPARTMENTS.map((dept, index) => {
              const isHovered = hoveredDeptId === dept.id;
              const isLocked = lockedDeptId === dept.id;
              const isActive = isHovered || isLocked;

              return (
                <div
                  key={dept.id}
                  onMouseEnter={() => setHoveredDeptId(dept.id)}
                  onMouseLeave={() => setHoveredDeptId(null)}
                  onClick={() => handleDeptClick(dept.id)}
                  className={`group relative flex items-center gap-3 px-2 py-1.5 rounded-xl cursor-pointer transition-all duration-300 ${
                    isLocked
                      ? 'bg-brand-yellow/15 border border-brand-yellow/45 shadow-[0_0_15px_rgba(255,240,131,0.18)] translate-x-1.5'
                      : isHovered
                      ? 'bg-white/5 border border-brand-yellow/25 translate-x-1'
                      : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDeptClick(dept.id);
                    }
                  }}
                  aria-pressed={isLocked}
                >
                  {/* Hexagon Badge */}
                  <HexagonBadge active={isActive} locked={isLocked}>
                    <DepartmentIcon type={dept.iconType} />
                  </HexagonBadge>

                  {/* Department Title */}
                  <div className="flex flex-col flex-1 min-w-0 text-left">
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 truncate ${
                        isLocked
                          ? 'text-brand-yellow font-bold drop-shadow-[0_0_8px_rgba(255,240,131,0.4)]'
                          : isHovered
                          ? 'text-brand-yellow'
                          : 'text-neutral-300 group-hover:text-brand-yellow'
                      }`}
                    >
                      {dept.nameEn}
                    </span>
                    {isFa && (
                      <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300">
                        {dept.nameFa}
                      </span>
                    )}
                  </div>

                  {/* Locked indicator or interactive cue */}
                  <div className="flex items-center shrink-0">
                    {isLocked ? (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-yellow text-brand-dark font-bold shadow-sm">
                        {isFa ? 'قفل' : 'LOCKED'}
                      </span>
                    ) : isHovered ? (
                      <span className="text-[9px] font-mono text-brand-yellow/80 animate-pulse">
                        {isFa ? 'کلیک = قفل' : 'CLICK'}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Section: JIRJIRAK WORLD and Navigation Controls */}
          <div className="relative mt-8 sm:mt-10 pt-4 border-t border-white/10 flex items-center justify-between">
            {/* JIRJIRAK WORLD (Clicking resets to default building) */}
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-2.5 text-neutral-400 hover:text-brand-yellow transition-colors group cursor-pointer"
              title={isFa ? 'بازگشت به نمای اصلی ساختمان' : 'Return to Headquarters Building'}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-neutral-400 group-hover:text-brand-yellow transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-[11px] sm:text-xs font-black tracking-[0.2em] text-neutral-300 group-hover:text-brand-yellow uppercase">
                  JIRJIRAK
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] text-neutral-500 group-hover:text-neutral-300 uppercase">
                  WORLD
                </span>
              </div>
            </button>

            {/* Navigation Arrows < and > */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-white/20 hover:border-brand-yellow flex items-center justify-center text-neutral-400 hover:text-brand-yellow transition-all duration-200 hover:scale-105 active:scale-95 bg-black/40 hover:bg-brand-yellow/10 cursor-pointer"
                aria-label="Previous Department"
                title={isFa ? 'دپارتمان قبلی' : 'Previous department'}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-white/20 hover:border-brand-yellow flex items-center justify-center text-neutral-400 hover:text-brand-yellow transition-all duration-200 hover:scale-105 active:scale-95 bg-black/40 hover:bg-brand-yellow/10 cursor-pointer"
                aria-label="Next Department"
                title={isFa ? 'دپارتمان بعدی' : 'Next department'}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
