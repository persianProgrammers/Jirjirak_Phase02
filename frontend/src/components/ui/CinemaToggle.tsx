import { useState } from 'react';
import { motion } from 'motion/react';

export function CinemaToggle() {
  const [isCinematic, setIsCinematic] = useState(false);

  // Colors
  const activeColor = "#FFF083";
  const mutedColor = "rgba(255,255,255,0.3)";

  return (
    <button
      onClick={() => setIsCinematic(!isCinematic)}
      className="relative flex items-center justify-end cursor-pointer group pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-brand-yellow/40 transition-all duration-500 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-hidden shrink-0"
      aria-label={isCinematic ? "Exit Cinema Mode" : "Enter Cinema Mode"}
    >
      {/* Ambient Background Glow when active */}
      <div 
        className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${!isCinematic ? 'opacity-0' : 'opacity-100'}`} 
        style={{ background: 'radial-gradient(circle at center, rgba(255,240,131,0.15) 0%, transparent 70%)' }} 
      />

      {/* Dynamic Text Pill (Expands when off) */}
      <motion.div
        initial={false}
        animate={{
          width: !isCinematic ? 98 : 0,
          opacity: !isCinematic ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="overflow-hidden whitespace-nowrap flex items-center justify-start pl-4"
      >
        <span className="font-mono text-[9px] lg:text-[10px] font-medium tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
          CINEMA OFF
        </span>
      </motion.div>

      {/* The Orb (Always fixed size on the right) */}
      <div className="relative w-10 h-10 lg:w-11 lg:h-11 shrink-0 flex items-center justify-center pointer-events-none pr-1">
        
        {/* Vintage Film Projector SVG */}
        <svg viewBox="-20 0 60 48" className="w-[1.6rem] h-[1.6rem] lg:w-[1.8rem] lg:h-[1.8rem] drop-shadow-md" fill="none" strokeLinecap="round" strokeLinejoin="round">
          
          <defs>
            <linearGradient id="beam-gradient" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#FFF083" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFF083" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Light Beam (Shooting to the left) */}
          <motion.polygon
            points="12,27 -20,5 -20,49"
            fill="url(#beam-gradient)"
            initial={false}
            animate={{
              opacity: isCinematic ? [0.5, 0.9, 0.6, 1, 0.7] : 0,
              scaleX: isCinematic ? 1 : 0,
            }}
            style={{ transformOrigin: "12px 27px" }}
            transition={
              isCinematic 
                ? { opacity: { repeat: Infinity, duration: 0.5, ease: "linear" }, scaleX: { duration: 0.4, ease: "backOut" } } 
                : { duration: 0.4, ease: "circOut" }
            }
          />

          {/* Reel 2 (Background Reel) */}
          <motion.g
            animate={{ rotate: isCinematic ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            style={{ transformOrigin: "28px 12px" }}
          >
            <circle cx="28" cy="12" r="7" fill="#0A0A0A" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <circle cx="28" cy="12" r="2" fill="none" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1" className="transition-colors duration-500"/>
            <line x1="28" y1="5" x2="28" y2="9" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <line x1="28" y1="15" x2="28" y2="19" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <line x1="21" y1="12" x2="25" y2="12" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <line x1="31" y1="12" x2="35" y2="12" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
          </motion.g>

          {/* Film Strip (Threading through the machine) */}
          <motion.path
            d="M 28 19 C 28 26, 22 26, 18 20 C 14 14, 18 9, 20 9"
            fill="none"
            stroke={isCinematic ? activeColor : mutedColor}
            strokeWidth="1.5"
            strokeDasharray="2 3"
            initial={false}
            animate={{ strokeDashoffset: isCinematic ? -20 : 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="transition-colors duration-500"
          />

          {/* Projector Body & Legs */}
          <path d="M 22,34 L 20,40 M 30,34 L 32,40" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" strokeLinecap="round" className="transition-colors duration-500"/>
          <line x1="16" y1="40" x2="36" y2="40" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" strokeLinecap="round" className="transition-colors duration-500"/>
          
          <rect x="18" y="20" width="16" height="14" rx="2" fill="#0A0A0A" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
          
          {/* Body Mechanical Details */}
          <circle cx="26" cy="27" r="3" fill="none" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1" className="transition-colors duration-500"/>
          <line x1="22" y1="27" x2="30" y2="27" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1" className="transition-colors duration-500"/>

          {/* Lens Tube (Front) */}
          <path d="M 18,24 L 12,22 L 12,32 L 18,30 Z" fill="#0A0A0A" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
          <line x1="15" y1="23" x2="15" y2="31" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1" className="transition-colors duration-500"/>

          {/* Reel 1 (Foreground Reel) */}
          <motion.g
            animate={{ rotate: isCinematic ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            style={{ transformOrigin: "20px 16px" }}
          >
            <circle cx="20" cy="16" r="7" fill="#0A0A0A" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <circle cx="20" cy="16" r="2" fill="none" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1" className="transition-colors duration-500"/>
            <line x1="20" y1="9" x2="20" y2="13" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <line x1="20" y1="19" x2="20" y2="23" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <line x1="13" y1="16" x2="17" y2="16" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
            <line x1="23" y1="16" x2="27" y2="16" stroke={isCinematic ? "white" : mutedColor} strokeWidth="1.5" className="transition-colors duration-500"/>
          </motion.g>

        </svg>
      </div>
    </button>
  );
}
