import { useRef, useEffect } from 'react';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { DepartmentFlipBoard } from '../components/DepartmentFlipBoard';

// ==========================================
// 1. BESPOKE GOLDEN BADGE ICONS (Top-Left)
// ==========================================
function IconWebDev() {
  return (
    <svg className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {/* Code bracket symbol with central micro-chip node */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7l5 5-5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l-2 14" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {/* Trending line with analytics node dots and bar cues */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 15l5-6 4 3 7-8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h4v4" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
      <circle cx="13" cy="12" r="1.2" fill="currentColor" />
      <circle cx="20" cy="4" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconBranding() {
  return (
    <svg className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {/* Geometric astrolabe diamond, monogram seal & pen compass */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 9l10 13 10-13L12 2z" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.5v6" />
      <circle cx="12" cy="9" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconGameInteractive() {
  return (
    <svg className="w-5 h-5 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {/* Gamepad controller with D-Pad & interactive gems */}
      <rect x="2" y="6" width="20" height="12" rx="6" stroke="currentColor" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h4m-2-2v4" />
      <circle cx="15.5" cy="10" r="1" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1" fill="currentColor" />
      <circle cx="15.5" cy="14" r="1" fill="currentColor" />
      <circle cx="13.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// =========================================================
// 2. DETAILED ISOMETRIC 3D-STYLED ILLUSTRATIONS (Top-Right)
// =========================================================

// Card 0: Web & Development (Isometric Laptop, Code Lines & Floating Window)
function IsometricWebIllustration() {
  return (
    <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible" fill="none">
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2E39" />
          <stop offset="100%" stopColor="#15171E" />
        </linearGradient>
        <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1C212B" />
          <stop offset="100%" stopColor="#0B0D12" />
        </linearGradient>
        <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFF083" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
      </defs>

      {/* Shadow Base */}
      <ellipse cx="60" cy="74" rx="46" ry="14" fill="rgba(0,0,0,0.4)" />

      {/* Laptop Base Tray (Isometric) */}
      <path d="M 22 62 L 60 78 L 98 62 L 60 48 Z" fill="url(#laptopGrad)" stroke="#3A404E" strokeWidth="1" />
      {/* Base Front Edge */}
      <path d="M 22 62 L 60 78 L 60 82 L 22 65 Z" fill="#181A22" />
      <path d="M 60 78 L 98 62 L 98 65 L 60 82 Z" fill="#111319" />

      {/* Trackpad */}
      <path d="M 52 68 L 68 74 L 64 76 L 48 70 Z" fill="#1E222D" stroke="rgba(255,240,131,0.2)" strokeWidth="0.6" />

      {/* Keyboard Grid Lines */}
      <path d="M 36 57 L 54 64 M 42 55 L 60 62 M 48 53 L 66 60 M 54 51 L 72 58 M 60 49 L 78 56" stroke="#373D4D" strokeWidth="0.8" />

      {/* Laptop Screen (Upright Isometric Angle) */}
      <path d="M 38 18 L 92 18 L 86 52 L 32 52 Z" fill="url(#screenGrad)" stroke="#475569" strokeWidth="1.2" />

      {/* Screen Header Bar & Dots */}
      <path d="M 38 18 L 92 18 L 90 24 L 36 24 Z" fill="#1E293B" />
      <circle cx="41" cy="21" r="1" fill="#EF4444" />
      <circle cx="45" cy="21" r="1" fill="#F59E0B" />
      <circle cx="49" cy="21" r="1" fill="#10B981" />

      {/* Code Syntax Highlighting Lines */}
      <line x1="42" y1="29" x2="62" y2="29" stroke="url(#goldGlow)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="46" y1="34" x2="78" y2="34" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="39" x2="72" y2="39" stroke="url(#goldGlow)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="46" y1="44" x2="66" y2="44" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="42" y1="48" x2="55" y2="48" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />

      {/* Floating Mini Window / Architecture Component */}
      <g className="transform -translate-y-1 group-hover:-translate-y-2 transition-transform duration-300">
        <rect x="76" y="24" width="34" height="24" rx="3" fill="#161922" stroke="#FFF083" strokeWidth="0.8" />
        <rect x="76" y="24" width="34" height="6" fill="#242936" rx="3" />
        <line x1="80" y1="35" x2="102" y2="35" stroke="#FFF083" strokeWidth="1" strokeLinecap="round" />
        <line x1="80" y1="40" x2="96" y2="40" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Card 1: Growth & Analytics (Isometric 3D Bar Columns & Glowing Chart)
function IsometricGrowthIllustration() {
  return (
    <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible" fill="none">
      {/* Shadow */}
      <ellipse cx="60" cy="74" rx="46" ry="14" fill="rgba(0,0,0,0.4)" />

      {/* Isometric Grid Plane Base */}
      <path d="M 20 62 L 60 78 L 100 62 L 60 46 Z" fill="#141720" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M 33 57 L 73 73 M 47 51 L 87 67" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
      <path d="M 40 70 L 80 54 M 50 74 L 90 58" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />

      {/* Column 1 (Short - Bar A) */}
      <g>
        <path d="M 34 56 L 44 52 L 44 64 L 34 68 Z" fill="#1E232E" stroke="#334155" strokeWidth="0.6" />
        <path d="M 44 52 L 52 55 L 52 67 L 44 64 Z" fill="#151922" stroke="#334155" strokeWidth="0.6" />
        <path d="M 34 56 L 44 52 L 52 55 L 42 59 Z" fill="#475569" />
      </g>

      {/* Column 2 (Medium - Bar B) */}
      <g>
        <path d="M 52 44 L 62 40 L 62 60 L 52 64 Z" fill="#854D0E" stroke="#CA8A04" strokeWidth="0.6" />
        <path d="M 62 40 L 70 43 L 70 63 L 62 60 Z" fill="#713F12" stroke="#CA8A04" strokeWidth="0.6" />
        <path d="M 52 44 L 62 40 L 70 43 L 60 47 Z" fill="#EAB308" />
      </g>

      {/* Column 3 (Tall - Bar C - Maximum Growth) */}
      <g className="transform group-hover:-translate-y-1 transition-transform duration-300">
        <path d="M 72 26 L 84 21 L 84 50 L 72 55 Z" fill="#B45309" stroke="#FFF083" strokeWidth="0.8" />
        <path d="M 84 21 L 94 25 L 94 54 L 84 50 Z" fill="#78350F" stroke="#FFF083" strokeWidth="0.8" />
        <path d="M 72 26 L 84 21 L 94 25 L 82 30 Z" fill="#FFF083" />
      </g>

      {/* Floating 3D Vector Trend Line */}
      <path
        d="M 38 48 Q 58 38 88 15"
        stroke="#FFF083"
        strokeWidth="2"
        strokeLinecap="round"
        className="filter drop-shadow-[0_0_6px_rgba(255,240,131,0.6)]"
      />
      <circle cx="38" cy="48" r="2" fill="#FFF083" />
      <circle cx="61" cy="37" r="2.2" fill="#FFF083" />
      <circle cx="88" cy="15" r="3" fill="#FFF083" stroke="#000" strokeWidth="0.8" />

      {/* Percentage Pill Tag */}
      <g className="transform group-hover:scale-110 transition-transform duration-300" style={{ transformOrigin: "90px 10px" }}>
        <rect x="76" y="3" width="28" height="12" rx="6" fill="#0A0A0A" stroke="#FFF083" strokeWidth="0.8" />
        <text x="90" y="12" fill="#FFF083" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">+94%</text>
      </g>
    </svg>
  );
}

// Card 2: Branding & Creative (Isometric Studio Drafting Board & Identity Palette)
function IsometricBrandingIllustration() {
  return (
    <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible" fill="none">
      {/* Shadow */}
      <ellipse cx="60" cy="74" rx="46" ry="14" fill="rgba(0,0,0,0.4)" />

      {/* Drafting Table / Board Slab (Isometric) */}
      <path d="M 22 56 L 62 74 L 102 56 L 62 38 Z" fill="#1E232E" stroke="#384152" strokeWidth="1" />
      <path d="M 22 56 L 62 74 L 62 79 L 22 61 Z" fill="#13161D" />
      <path d="M 62 74 L 102 56 L 102 61 L 62 79 Z" fill="#0C0E13" />

      {/* Brand Book / Canvas Sheet */}
      <path d="M 38 52 L 68 65 L 86 54 L 56 42 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />

      {/* Golden Jirjirak Identity Mark on Canvas */}
      <g className="transform translate-x-2 translate-y-1">
        <polygon points="56,48 64,52 64,59 56,55" fill="#EAB308" stroke="#FFF083" strokeWidth="0.6" />
        <polygon points="64,52 70,49 70,56 64,59" fill="#CA8A04" stroke="#FFF083" strokeWidth="0.6" />
        <polygon points="56,48 64,52 70,49 62,45" fill="#FFF083" />
      </g>

      {/* Color Swatch Tiles (3 Swatches) */}
      <g className="transform group-hover:-translate-y-1 transition-transform duration-300">
        {/* Swatch 1: Gold */}
        <path d="M 30 46 L 40 50 L 36 53 L 26 49 Z" fill="#FFF083" stroke="#EAB308" strokeWidth="0.6" />
        {/* Swatch 2: Amber */}
        <path d="M 34 43 L 44 47 L 40 50 L 30 46 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="0.6" />
        {/* Swatch 3: Dark Slate */}
        <path d="M 38 40 L 48 44 L 44 47 L 34 43 Z" fill="#1E293B" stroke="#475569" strokeWidth="0.6" />
      </g>

      {/* Drafting Ruler / Precision Triangle */}
      <polygon points="76,46 94,40 84,56" fill="none" stroke="#FFF083" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
      <polygon points="80,47 88,44 84,51" fill="#FFF083" opacity="0.3" />
    </svg>
  );
}

// Card 3: Game & Interactive (Isometric Console, Gamepad & Floating Orbit)
function IsometricGameIllustration() {
  return (
    <svg viewBox="0 0 120 90" className="w-24 h-20 overflow-visible" fill="none">
      {/* Shadow */}
      <ellipse cx="60" cy="74" rx="46" ry="14" fill="rgba(0,0,0,0.4)" />

      {/* Isometric Console / Stage Pedestal */}
      <path d="M 24 58 L 60 74 L 96 58 L 60 42 Z" fill="#161820" stroke="#313645" strokeWidth="1" />
      <path d="M 24 58 L 60 74 L 60 80 L 24 64 Z" fill="#101218" />
      <path d="M 60 74 L 96 58 L 96 64 L 60 80 Z" fill="#0A0C10" />

      {/* Holographic Glowing Playfield Floor */}
      <path d="M 36 56 L 60 66 L 84 56 L 60 46 Z" fill="rgba(255,240,131,0.06)" stroke="#FFF083" strokeWidth="0.6" strokeDasharray="3 3" />

      {/* Floating 3D Game Controller */}
      <g className="transform group-hover:-translate-y-2 transition-transform duration-300">
        {/* Controller Body */}
        <path
          d="M 34 40 C 34 34 44 32 60 32 C 76 32 86 34 86 40 C 86 48 76 54 70 50 L 64 46 L 56 46 L 50 50 C 44 54 34 48 34 40 Z"
          fill="#1E232E"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Controller Top Plate Accent */}
        <path d="M 44 36 C 50 34 70 34 76 36" stroke="#FFF083" strokeWidth="1.2" strokeLinecap="round" />

        {/* D-Pad (Left) */}
        <path d="M 42 41 H 48 M 45 38 V 44" stroke="#FFF083" strokeWidth="1.5" strokeLinecap="round" />

        {/* Action Gems (Right) */}
        <circle cx="72" cy="38" r="1.2" fill="#EF4444" />
        <circle cx="76" cy="41" r="1.2" fill="#FFF083" />
        <circle cx="72" cy="44" r="1.2" fill="#3B82F6" />
        <circle cx="68" cy="41" r="1.2" fill="#10B981" />

        {/* Dual Thumbsticks */}
        <circle cx="51" cy="44" r="2.5" fill="#0F1117" stroke="#334155" strokeWidth="0.8" />
        <circle cx="51" cy="44" r="1" fill="#FFF083" />
        <circle cx="63" cy="44" r="2.5" fill="#0F1117" stroke="#334155" strokeWidth="0.8" />
        <circle cx="63" cy="44" r="1" fill="#FFF083" />
      </g>

      {/* Floating Interactive 3D Cube & Knowledge Orbit (Academy & Interactive Lab) */}
      <g className="transform group-hover:rotate-12 transition-transform duration-500" style={{ transformOrigin: "86px 22px" }}>
        {/* Cube Front */}
        <polygon points="80,20 88,16 88,24 80,28" fill="#D97706" stroke="#FFF083" strokeWidth="0.6" />
        <polygon points="88,16 94,19 94,27 88,24" fill="#B45309" stroke="#FFF083" strokeWidth="0.6" />
        <polygon points="80,20 88,16 94,19 86,23" fill="#FFF083" stroke="#FFF083" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

const serviceBadgeIcons = [
  <IconWebDev />,
  <IconGrowth />,
  <IconBranding />,
  <IconGameInteractive />,
];

const serviceIllustrations = [
  <IsometricWebIllustration />,
  <IsometricGrowthIllustration />,
  <IsometricBrandingIllustration />,
  <IsometricGameIllustration />,
];

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight, landingLayoutMode } = useGlobalStore();
  const t = useTranslation()(currentLang);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className={`py-28 lg:py-36 px-8 lg:px-12 xl:px-16 relative overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* Editorial Cinema Mode: Centered Top Header with Full-Width Centered FlipBoard */}
      {landingLayoutMode === 'editorial' ? (
        <div className="max-w-[1600px] mx-auto w-full flex flex-col items-center gap-10 lg:gap-14">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-brand-yellow' : 'text-[#b3a85c]'}`}>
                {t.services.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">
                {t.services.badge}
              </span>
            </div>
            
            <h2 className={`text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.1] mb-5 tracking-tight ${
              isNight ? 'text-white' : 'text-brand-dark'
            }`}>
              {t.services.titleLine1} {t.services.titleLine2}
            </h2>
            
            <p className="text-brand-gray text-base lg:text-[17px] leading-relaxed mb-6 max-w-2xl">
              {t.services.description}
            </p>

            <a
              href="#services"
              className={`group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest transition-colors pb-1 border-b-2 ${
                isNight 
                  ? 'text-brand-yellow hover:text-white border-brand-yellow hover:border-white' 
                  : 'text-[#b3a85c] hover:text-brand-dark border-[#b3a85c] hover:border-brand-dark'
              }`}
            >
              <span>{t.services.exploreAll}</span>
              <svg
                className="w-4 h-4 rtl:rotate-180 transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div ref={cardsRef} className="w-full max-w-6xl mx-auto self-stretch flex items-center justify-center">
            <DepartmentFlipBoard />
          </div>
        </div>
      ) : (
        /* Classic (Row) or ZigZag (Row-Reverse) */
        <div className={`max-w-[1600px] mx-auto w-full flex flex-col gap-16 lg:gap-20 transition-all duration-500 ${
          landingLayoutMode === 'zigzag' ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}>
          
          {/* Text Column */}
          <div className="lg:w-[38%] flex flex-col self-stretch">
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-xs font-semibold tracking-widest ${isNight ? 'text-brand-yellow' : 'text-[#b3a85c]'}`}>
                {t.services.step}
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase">
                {t.services.badge}
              </span>
            </div>
            
            <div className="lg:my-auto flex flex-col items-start py-6 lg:py-0">
              <h2 className={`text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight ${
                isNight ? 'text-white' : 'text-brand-dark'
              }`}>
                {t.services.titleLine1}<br />{t.services.titleLine2}
              </h2>
              
              <p className="text-brand-gray text-base lg:text-[17px] leading-relaxed mb-8 lg:mb-10 max-w-md">
                {t.services.description}
              </p>

              <div>
                <a
                  href="#services"
                  className={`group inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest transition-colors pb-1 border-b-2 ${
                    isNight 
                      ? 'text-brand-yellow hover:text-white border-brand-yellow hover:border-white' 
                      : 'text-[#b3a85c] hover:text-brand-dark border-[#b3a85c] hover:border-brand-dark'
                  }`}
                >
                  <span>{t.services.exploreAll}</span>
                  <svg
                    className="w-4 h-4 rtl:rotate-180 transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="hidden lg:block h-6 w-full" aria-hidden="true" />
          </div>

          {/* Department Flip Board Column */}
          <div ref={cardsRef} className="lg:w-[62%] w-full self-stretch flex items-center">
            <DepartmentFlipBoard />
          </div>

        </div>
      )}
    </section>
  );
}
