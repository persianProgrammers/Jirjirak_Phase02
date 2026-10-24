import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

export function LanguageToggle() {
  const { currentLang, iconLangPreview, toggleLang } = useGlobalStore();
  
  // Use iconLangPreview so the typewriter keycap 180-deg flip and mechanical gear spin
  // occur immediately upon user click, allowing the user to watch the full animation finish
  // before the curtain covers the screen and flips the page layout/text
  const displayLang = iconLangPreview ?? currentLang;
  const isFa = displayLang === 'FA';

  const activeColor = "#FEEF83";

  return (
    <button
      onClick={toggleLang}
      className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
      aria-label="Toggle Language"
    >
      {/* Mechanical Typewriter Key Interface */}
      <div className="relative flex items-center justify-center pointer-events-none w-full h-full" style={{ perspective: '800px' }}>
         <svg viewBox="0 0 48 48" className="w-[1.9rem] h-[1.9rem] lg:w-[2.4rem] lg:h-[2.4rem] drop-shadow-md overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
            
            {/* 1. Outer Mechanical Gear (Spins on click) */}
            <motion.g
               initial={false}
               animate={{ rotate: isFa ? 90 : 0 }}
               transition={{ type: "spring", stiffness: 100, damping: 15 }}
               style={{ transformOrigin: "24px 24px" }}
            >
               {/* Thinner, delicate gear teeth to match Gramophone's fine lines */}
               <circle cx="24" cy="24" r="21" stroke={activeColor} strokeWidth="1.2" strokeDasharray="6 5" opacity="0.35" className="transition-opacity duration-300 group-hover:opacity-70" />
               {/* Inner smooth track */}
               <circle cx="24" cy="24" r="18" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            </motion.g>

            {/* 2. Central Flipping Keycap */}
            <motion.g
               initial={false}
               animate={{ rotateY: isFa ? 180 : 0 }}
               transition={{ type: "spring", stiffness: 110, damping: 18 }}
               style={{ transformOrigin: "24px 24px", transformStyle: "preserve-3d" }}
            >
               {/* FRONT FACE: ENGLISH (Classic Glass Lens) */}
               <g style={{ backfaceVisibility: "hidden" }}>
                  {/* Lighter, semi-transparent base */}
                  <circle cx="24" cy="24" r="16" fill="rgba(10, 10, 10, 0.4)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  {/* Glass/Indentation Ring */}
                  <circle cx="24" cy="24" r="13" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                  
                  {/* Delicate Industrial Rivets */}
                  <circle cx="15" cy="15" r="0.8" fill="white" opacity="0.3" />
                  <circle cx="33" cy="15" r="0.8" fill="white" opacity="0.3" />
                  <circle cx="15" cy="33" r="0.8" fill="white" opacity="0.3" />
                  <circle cx="33" cy="33" r="0.8" fill="white" opacity="0.3" />

                  {/* Character - Yellow matching Persian */}
                  <text x="24" y="24.5" fontSize="20" fontFamily="Georgia, serif" fill={activeColor} opacity="0.85" textAnchor="middle" dominantBaseline="central">A</text>
               </g>

               {/* BACK FACE: PERSIAN (Khatam Core) */}
               <g style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  {/* Lighter, semi-transparent base */}
                  <circle cx="24" cy="24" r="16" fill="rgba(10, 10, 10, 0.4)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  
                  {/* Persian Geometric Pattern (Khatam simplified) - very delicate */}
                  <rect x="15" y="15" width="18" height="18" rx="0.5" fill="none" stroke={activeColor} strokeWidth="0.6" opacity="0.4" />
                  <rect x="15" y="15" width="18" height="18" rx="0.5" fill="none" stroke={activeColor} strokeWidth="0.6" opacity="0.4" transform="rotate(45 24 24)" />
                  
                  {/* Delicate Industrial Rivets */}
                  <circle cx="15" cy="15" r="0.8" fill="white" opacity="0.3" />
                  <circle cx="33" cy="15" r="0.8" fill="white" opacity="0.3" />
                  <circle cx="15" cy="33" r="0.8" fill="white" opacity="0.3" />
                  <circle cx="33" cy="33" r="0.8" fill="white" opacity="0.3" />

                  {/* Character - Gold but not overpowering */}
                  <text x="24" y="23.5" fontSize="21" fontFamily="system-ui, sans-serif" fill={activeColor} opacity="0.85" textAnchor="middle" dominantBaseline="central">آ</text>
               </g>
            </motion.g>

         </svg>
      </div>
    </button>
  );
}
