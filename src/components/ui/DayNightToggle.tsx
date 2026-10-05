import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

/**
 * DayNightToggle Component (Steampunk Celestial Astrolabe / ساعت آفتابی و مهتابی چرخ‌دنده‌ای)
 * Controls the Day / Night (Dark / Light) atmospheric mode of Jirjirak Studio.
 * Crafted with delicate brass mechanics matching the Gramophone & Vintage Keycap buttons.
 */
export function DayNightToggle() {
  const { isNight, iconNightPreview, toggleNight } = useGlobalStore();

  // Use iconNightPreview so the astrolabe gear and sun/moon flip animation triggers IMMEDIATELY on click,
  // letting the user see the mechanical transformation finish BEFORE the curtain covers the page
  const displayNight = iconNightPreview ?? isNight;

  const activeGold = "#FEEF83";
  const warmSun = "#FEEF83";

  return (
    <button
      onClick={toggleNight}
      className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] flex items-center justify-center cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
      aria-label={displayNight ? "Switch to Day Mode" : "Switch to Night Mode"}
    >
      {/* Ambient Celestial Glow */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-1000 pointer-events-none" 
        style={{ 
          background: displayNight 
            ? 'radial-gradient(circle at center, rgba(255,240,131,0.14) 0%, transparent 70%)' 
            : 'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, transparent 70%)' 
        }} 
      />

      {/* Astrolabe / Celestial Orrery Dial */}
      <div className="relative flex items-center justify-center pointer-events-none w-full h-full" style={{ perspective: '800px' }}>
        <svg viewBox="0 0 48 48" className="w-[1.85rem] h-[1.85rem] lg:w-[2.35rem] lg:h-[2.35rem] drop-shadow-md overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
          
          {/* 1. Outer Astronomical Degree Gear (Spins with ratchet spring on toggle) */}
          <motion.g
            initial={false}
            animate={{ rotate: displayNight ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            style={{ transformOrigin: "24px 24px" }}
          >
            {/* Fine Astrolabe Gear Teeth */}
            <circle 
              cx="24" 
              cy="24" 
              r="21" 
              stroke={displayNight ? activeGold : warmSun} 
              strokeWidth="1.1" 
              strokeDasharray="4 4" 
              opacity="0.35" 
              className="transition-colors duration-500 group-hover:opacity-75" 
            />
            
            {/* Degree Marks Track */}
            <circle 
              cx="24" 
              cy="24" 
              r="18.5" 
              stroke="rgba(255,255,255,0.15)" 
              strokeWidth="0.8" 
            />

            {/* 4 Cardinal Astrolabe Pins */}
            <circle cx="24" cy="4.5" r="0.8" fill={displayNight ? activeGold : warmSun} opacity="0.6" />
            <circle cx="43.5" cy="24" r="0.8" fill={displayNight ? activeGold : warmSun} opacity="0.6" />
            <circle cx="24" cy="43.5" r="0.8" fill={displayNight ? activeGold : warmSun} opacity="0.6" />
            <circle cx="4.5" cy="24" r="0.8" fill={displayNight ? activeGold : warmSun} opacity="0.6" />
          </motion.g>

          {/* 2. Orbiting Floating Particles (Night Fireflies / Day Solar Motes) */}
          {displayNight ? (
            <g>
              {/* Wandering Night Firefly Particle 1 */}
              <motion.circle
                cx="13"
                cy="14"
                r="1"
                fill={activeGold}
                animate={{
                  x: [0, 4, -2, 0],
                  y: [0, -3, 2, 0],
                  opacity: [0.3, 0.9, 0.4, 0.3],
                  scale: [0.8, 1.4, 0.9, 0.8]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Wandering Night Firefly Particle 2 */}
              <motion.circle
                cx="35"
                cy="32"
                r="0.8"
                fill={activeGold}
                animate={{
                  x: [0, -3, 3, 0],
                  y: [0, 4, -2, 0],
                  opacity: [0.2, 0.8, 0.3, 0.2],
                  scale: [0.7, 1.3, 0.8, 0.7]
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </g>
          ) : (
            <g>
              {/* Solar Flare Particle 1 */}
              <motion.circle
                cx="34"
                cy="14"
                r="1"
                fill={warmSun}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Solar Flare Particle 2 */}
              <motion.circle
                cx="14"
                cy="33"
                r="0.8"
                fill={warmSun}
                animate={{
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0.3, 0.9, 0.3]
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </g>
          )}

          {/* 3. Central Celestial Shifting Orrery (3D Coin/Astronomical Flip) */}
          <motion.g
            initial={false}
            animate={{ rotateY: displayNight ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 100, damping: 17 }}
            style={{ transformOrigin: "24px 24px", transformStyle: "preserve-3d" }}
          >
            {/* FRONT FACE: NIGHT (Mechanical Clockwork Crescent & Stars) */}
            <g style={{ backfaceVisibility: "hidden" }}>
              {/* Semi-transparent Dark Lens Base */}
              <circle cx="24" cy="24" r="15" fill="rgba(10, 10, 10, 0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              
              {/* Steampunk Crescent Moon with Internal Filigree */}
              <path
                d="M 28 13 C 20.5 13.8 15 19.5 15 27 C 15 31.8 17.5 35 21 36.5 C 15.5 35 12 29.5 12 23 C 12 16.5 17 12 24.5 11 C 25.8 11 27 11.5 28 13 Z"
                fill="rgba(255,240,131,0.12)"
                stroke={activeGold}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              
              {/* Clockwork Crescent Internal Gear Segment */}
              <path
                d="M 16 19 C 18 23 18 28 16 32"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.8"
                strokeDasharray="1.5 2"
              />

              {/* 3 Mechanical Rivets on the Moon Spine */}
              <circle cx="14" cy="18" r="0.7" fill="white" opacity="0.6" />
              <circle cx="13" cy="24" r="0.7" fill="white" opacity="0.6" />
              <circle cx="15" cy="30" r="0.7" fill="white" opacity="0.6" />

              {/* Glowing Celestial 4-Point Star (Polaris) */}
              <motion.g
                animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "30px 22px" }}
              >
                {/* 4-Point Star Path */}
                <path
                  d="M 30 17 L 31.2 20.8 L 35 22 L 31.2 23.2 L 30 27 L 28.8 23.2 L 25 22 L 28.8 20.8 Z"
                  fill="none"
                  stroke={activeGold}
                  strokeWidth="0.9"
                  strokeLinejoin="round"
                />
                <circle cx="30" cy="22" r="1.2" fill={activeGold} stroke="none" />
              </motion.g>

              {/* Small Auxiliary Star */}
              <circle cx="33" cy="14" r="0.7" fill="white" opacity="0.6" />
              <circle cx="26" cy="32" r="0.6" fill="white" opacity="0.4" />
            </g>

            {/* BACK FACE: DAY (Mechanical Clockwork Solar Sun) */}
            <g style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              {/* Semi-transparent Day Lens Base */}
              <circle cx="24" cy="24" r="15" fill="rgba(10, 10, 10, 0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              
              {/* Rotating Clockwork Sunbeams */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "24px 24px" }}
              >
                {/* 8 Mechanical Sun Ray Teeth */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <g key={angle} transform={`rotate(${angle} 24 24)`}>
                    {idx % 2 === 0 ? (
                      // Sharp Ray with Gear Tip
                      <>
                        <line x1="24" y1="14.5" x2="24" y2="10" stroke={warmSun} strokeWidth="1" />
                        <circle cx="24" cy="9.5" r="0.7" fill={warmSun} />
                      </>
                    ) : (
                      // Stepped Cog Ray
                      <path d="M 23 14 L 23 11 L 25 11 L 25 14" fill="none" stroke={warmSun} strokeWidth="0.8" opacity="0.75" />
                    )}
                  </g>
                ))}
              </motion.g>

              {/* Central Sun Core */}
              <circle 
                cx="24" 
                cy="24" 
                r="7.5" 
                fill="rgba(255, 215, 0, 0.15)" 
                stroke={warmSun} 
                strokeWidth="1.2" 
              />
              
              {/* Inner Concentric Sun Gear Ring */}
              <circle 
                cx="24" 
                cy="24" 
                r="4.5" 
                stroke="white" 
                strokeWidth="0.7" 
                strokeDasharray="1.5 1.5" 
                opacity="0.5" 
              />

              {/* Sun Center Rivet / Spindle */}
              <circle cx="24" cy="24" r="1.5" fill={warmSun} />
              <circle cx="24" cy="24" r="0.6" fill="#0A0A0A" />
            </g>
          </motion.g>

        </svg>
      </div>
    </button>
  );
}
