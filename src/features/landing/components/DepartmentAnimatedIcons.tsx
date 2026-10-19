import React from 'react';
import { motion } from 'motion/react';

interface IconProps {
  isNight: boolean;
  className?: string;
}

/**
 * Calculates a smooth SVG path for a polygon with gently rounded corners (Filleted vertices)
 * Ensures no sharp points exist, matching the website's smooth organic aesthetic.
 */
function getRoundedPolygonPath(points: [number, number][], radius = 6): string {
  if (points.length < 3) return '';
  const len = points.length;
  let d = '';

  for (let i = 0; i < len; i++) {
    const prev = points[(i - 1 + len) % len];
    const curr = points[i];
    const next = points[(i + 1) % len];

    const vPrev = [prev[0] - curr[0], prev[1] - curr[1]];
    const vNext = [next[0] - curr[0], next[1] - curr[1]];

    const lenPrev = Math.hypot(vPrev[0], vPrev[1]);
    const lenNext = Math.hypot(vNext[0], vNext[1]);

    const actualRadius = Math.min(radius, lenPrev / 2.6, lenNext / 2.6);

    const startX = curr[0] + (vPrev[0] / lenPrev) * actualRadius;
    const startY = curr[1] + (vPrev[1] / lenPrev) * actualRadius;

    const endX = curr[0] + (vNext[0] / lenNext) * actualRadius;
    const endY = curr[1] + (vNext[1] / lenNext) * actualRadius;

    if (i === 0) {
      d += `M ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    } else {
      d += ` L ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    }
    d += ` Q ${curr[0]} ${curr[1]}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  }
  d += ' Z';
  return d;
}

/**
 * 7 Unique Asymmetrical Polygons for each Department Frame
 * (چند ضلعی‌های با گوشه‌های منحنی و ملایم، بدون لبه نوک‌تیز)
 */
export const DEPARTMENT_POLYGON_VERTICES: [number, number][][] = [
  // 01. Web & Dev: Soft Rounded Hexagon
  [[14, 6], [58, 6], [68, 36], [58, 66], [14, 66], [4, 36]],
  // 02. SEO & Analytics: Soft Rounded Heptagon
  [[18, 6], [54, 4], [68, 26], [60, 62], [28, 68], [6, 56], [6, 24]],
  // 03. Branding & Identity: Soft Rounded Octagon
  [[22, 4], [50, 4], [68, 22], [68, 50], [50, 68], [22, 68], [4, 50], [4, 22]],
  // 04. Creative Studio: Soft Rounded Asymmetric Facet
  [[36, 4], [68, 24], [58, 66], [14, 66], [4, 24]],
  // 05. Digital Marketing: Soft Dynamic 7-Gon
  [[12, 10], [58, 4], [68, 32], [58, 66], [24, 68], [6, 56], [8, 26]],
  // 06. Game Studio: Soft Cyber 8-Gon
  [[24, 6], [52, 8], [68, 28], [62, 58], [44, 68], [20, 66], [6, 48], [8, 22]],
  // 07. Academy Hub: Soft Shield 6-Gon
  [[36, 6], [66, 18], [62, 56], [36, 68], [10, 56], [6, 18]],
];

/**
 * Handcrafted Polygonal Plaque Frame
 * - Background exactly matches carousel container (#2c2c2c in night, #FFFFFF in day)
 * - Border exactly matches title separator line (rgba(255,255,255,0.2) in night, #d4d4d4 in day)
 * - Gently rounded polygon edges (no sharp vertices)
 * - Generous dimensions providing ample breathing room around the icon
 */
export function DepartmentPolygonalFrame({
  departmentIndex,
  isNight,
  children,
}: {
  departmentIndex: number;
  isNight: boolean;
  children: React.ReactNode;
}) {
  const vertices = DEPARTMENT_POLYGON_VERTICES[departmentIndex % DEPARTMENT_POLYGON_VERTICES.length];
  const roundedPath = getRoundedPolygonPath(vertices, 8);

  return (
    <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center select-none">
      {/* SVG Polygonal Frame Base */}
      <svg
        viewBox="0 0 72 72"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none drop-shadow-sm"
      >
        {/* Background matching Carousel frame (#2c2c2c in dark, #FFFFFF in light) */}
        {/* Border matching Title separator line (rgba(255,255,255,0.2) in dark, #d4d4d4 in light) */}
        <path
          d={roundedPath}
          fill={isNight ? '#2c2c2c' : '#FFFFFF'}
          stroke={isNight ? 'rgba(255, 255, 255, 0.2)' : '#d4d4d4'}
          strokeWidth="1.3"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="transition-colors duration-500"
        />
      </svg>

      {/* Centered Delicate Icon with Ample Breathing Room */}
      <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/**
 * 01. WEB & DEVELOPMENT (وب و توسعه)
 * Concept: Chunky Code Terminal with High-Contrast Brackets, Animated Live Coding Data Stream & Server Nodes
 */
export function WebDevAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';
  const muted = isNight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.25)';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Terminal Window Box */}
      <rect x="7" y="10" width="50" height="38" rx="4" stroke={stroke} strokeWidth="2.2" fill={isNight ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} />
      {/* Window Top Bar */}
      <line x1="7" y1="20" x2="57" y2="20" stroke={stroke} strokeWidth="1.8" />
      
      {/* 3 Header Window Dots */}
      <circle cx="13" cy="15" r="1.6" fill={gold} stroke="none" />
      <circle cx="18" cy="15" r="1.4" fill={muted} stroke="none" />
      <circle cx="23" cy="15" r="1.4" fill={muted} stroke="none" />

      {/* Terminal Title Dash */}
      <line x1="30" y1="15" x2="48" y2="15" stroke={muted} strokeWidth="1" strokeDasharray="3 2" />

      {/* Left Code Bracket < */}
      <motion.path
        d="M 23 26 L 16 32 L 23 38"
        stroke={gold}
        strokeWidth="2.6"
        animate={{ x: [0, -2.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center Division Slash / */}
      <motion.line
        x1="35"
        y1="25"
        x2="29"
        y2="39"
        stroke={stroke}
        strokeWidth="2.4"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Right Code Bracket > */}
      <motion.path
        d="M 41 26 L 48 32 L 41 38"
        stroke={gold}
        strokeWidth="2.6"
        animate={{ x: [0, 2.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blinking Console Prompt Cursor */}
      <motion.line
        x1="36"
        y1="39"
        x2="40"
        y2="39"
        stroke={gold}
        strokeWidth="2.2"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />

      {/* Terminal Stand Base */}
      <path d="M 24 48 L 20 54 L 44 54 L 40 48" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

/**
 * 02. SEO & ANALYTICS (سئو و تحلیل داده)
 * Concept: Unmistakable Big Magnifying Lens scanning an Ascending #1 Growth Rocket Chart
 */
export function SeoAnalyticsAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';
  const muted = isNight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Background Radar Guide Lines */}
      <circle cx="28" cy="28" r="22" stroke={muted} strokeWidth="1" strokeDasharray="3 3" />

      {/* Big Search Glass Rim */}
      <circle
        cx="28"
        cy="28"
        r="17"
        stroke={stroke}
        strokeWidth="2.6"
        fill={isNight ? 'rgba(255, 240, 131, 0.05)' : 'rgba(212, 175, 55, 0.06)'}
      />

      {/* Magnifier Handle */}
      <line x1="41" y1="41" x2="56" y2="56" stroke={gold} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="47" y1="47" x2="53" y2="53" stroke={stroke} strokeWidth="2" strokeLinecap="round" />

      {/* Chart Baseline */}
      <line x1="17" y1="37" x2="39" y2="37" stroke={muted} strokeWidth="1.5" />

      {/* Rising Bar Chart Columns inside the Lens */}
      {/* Bar 1 */}
      <motion.rect
        x="18"
        y="30"
        width="4.5"
        height="7"
        rx="1"
        stroke={stroke}
        strokeWidth="1.6"
        fill={isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
        animate={{ height: [6, 9, 6], y: [31, 28, 31] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Bar 2 */}
      <motion.rect
        x="25"
        y="24"
        width="4.5"
        height="13"
        rx="1"
        stroke={stroke}
        strokeWidth="1.6"
        fill={isNight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
        animate={{ height: [11, 15, 11], y: [26, 22, 26] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* Bar 3 (Hero Gold Bar) */}
      <motion.rect
        x="32"
        y="17"
        width="4.5"
        height="20"
        rx="1"
        stroke={gold}
        strokeWidth="1.8"
        fill={gold}
        fillOpacity="0.3"
        animate={{ height: [17, 22, 17], y: [20, 15, 20] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* Rising Trendline Arrow */}
      <path d="M 16 32 L 24 25 L 34 16" stroke={gold} strokeWidth="2.2" />
      <path d="M 29 16 H 34 V 21" stroke={gold} strokeWidth="2.2" />

      {/* Search Radar Pulse Star */}
      <motion.g
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        style={{ transformOrigin: '34px 16px' }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="34" cy="16" r="3.5" stroke={gold} strokeWidth="1.4" />
      </motion.g>
    </svg>
  );
}

/**
 * 03. BRANDING & IDENTITY (برندینگ و هویت)
 * Concept: Brilliant Diamond Standard Gemstone & Luxury Heraldic Brand Crest with Sparkling Light
 */
export function BrandingIdentityAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Heraldic Shield / Laurel Wings in Background */}
      <path
        d="M 10 24 C 6 40 16 52 32 58 C 48 52 58 40 54 24"
        stroke={stroke}
        strokeWidth="1.8"
        strokeDasharray="4 3"
        opacity={isNight ? '0.45' : '0.35'}
      />

      {/* Big Multi-Faceted Brilliant Diamond */}
      {/* Crown Top Bar */}
      <line x1="20" y1="20" x2="44" y2="20" stroke={gold} strokeWidth="2.4" />
      {/* Crown Facets */}
      <polygon
        points="14,28 20,20 44,20 50,28"
        stroke={stroke}
        strokeWidth="2.2"
        fill={isNight ? 'rgba(255, 240, 131, 0.12)' : 'rgba(212, 175, 55, 0.1)'}
      />
      {/* Pavilion to Culet (Bottom Point) */}
      <polygon
        points="14,28 32,52 50,28"
        stroke={gold}
        strokeWidth="2.4"
        fill={isNight ? 'rgba(255, 240, 131, 0.2)' : 'rgba(212, 175, 55, 0.18)'}
      />
      {/* Internal Reflection Triangular Facets */}
      <line x1="20" y1="20" x2="32" y2="52" stroke={stroke} strokeWidth="1.6" />
      <line x1="44" y1="20" x2="32" y2="52" stroke={stroke} strokeWidth="1.6" />
      <line x1="20" y1="20" x2="32" y2="28" stroke={stroke} strokeWidth="1.6" />
      <line x1="44" y1="20" x2="32" y2="28" stroke={stroke} strokeWidth="1.6" />
      <line x1="32" y1="28" x2="32" y2="52" stroke={gold} strokeWidth="1.8" />

      {/* Floating 4-Point Brand Sparkle Star */}
      <motion.g
        animate={{
          scale: [0.8, 1.35, 0.8],
          rotate: [0, 45, 0],
          opacity: [0.5, 1, 0.5],
        }}
        style={{ transformOrigin: '48px 14px' }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M 48 8 L 50 13 L 55 14 L 50 15 L 48 20 L 46 15 L 41 14 L 46 13 Z"
          fill={gold}
          stroke={gold}
          strokeWidth="1"
        />
      </motion.g>

      {/* Micro Sparkle 2 */}
      <motion.circle
        cx="16"
        cy="18"
        r="1.5"
        fill={gold}
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </svg>
  );
}

/**
 * 04. CREATIVE STUDIO (گرافیک و انیمیشن)
 * Concept: Iconic Designer Bézier Pen Tool with Tangent Handles, Vector Curves & Burst of Color/Ink
 */
export function CreativeStudioAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Active Bézier Curve being designed */}
      <motion.path
        d="M 10 50 C 18 26 34 54 54 36"
        stroke={isNight ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.25)'}
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* Bézier Tangent Control Handle Bar */}
      <line x1="16" y1="28" x2="38" y2="44" stroke={gold} strokeWidth="1.8" />
      <circle cx="16" cy="28" r="2.8" stroke={gold} strokeWidth="1.6" fill={isNight ? '#0E0E0E' : '#FFFFFF'} />
      <circle cx="38" cy="44" r="2.8" stroke={gold} strokeWidth="1.6" fill={isNight ? '#0E0E0E' : '#FFFFFF'} />

      {/* Central Vector Anchor Point (Filled Square) */}
      <rect x="24.5" y="33.5" width="5.5" height="5.5" fill={gold} stroke={stroke} strokeWidth="1.4" />

      {/* Classic Designer Pen Tool (Stylus Nib) */}
      <motion.g
        animate={{
          x: [0, 3, 0],
          y: [0, -3, 0],
          rotate: [0, 5, 0],
        }}
        style={{ transformOrigin: '42px 18px' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Pen Shaft Handle */}
        <path
          d="M 52 10 L 42 20 L 36 26 L 38 28 L 44 22 L 54 12 Z"
          stroke={stroke}
          strokeWidth="2.2"
          fill={isNight ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
        />
        {/* Metallic Pen Collar */}
        <line x1="36" y1="26" x2="44" y2="22" stroke={gold} strokeWidth="2" />
        {/* Fountain/Stylus Nib */}
        <path
          d="M 36 26 L 27 35 L 30 38 L 38 28 Z"
          stroke={gold}
          strokeWidth="2.2"
          fill={gold}
          fillOpacity="0.3"
        />
        {/* Center Ink Slit */}
        <line x1="28" y1="36" x2="35" y2="29" stroke={stroke} strokeWidth="1.4" />
        {/* Breather Hole */}
        <circle cx="35" cy="29" r="1" fill={stroke} stroke="none" />
      </motion.g>

      {/* Creative Motion Splash Particles */}
      <motion.circle
        cx="25"
        cy="39"
        r="1.8"
        fill={gold}
        animate={{
          x: [-3, -10],
          y: [2, 7],
          opacity: [0, 1, 0],
          scale: [0.6, 1.4, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  );
}

/**
 * 05. DIGITAL MARKETING & GROWTH (دیجیتال مارکتینگ و رشد)
 * Concept: Bold Brass Acoustic Megaphone blasting Viral Concentric Waves & Rocketing Target
 */
export function DigitalMarketingAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Megaphone Body with gentle blast recoil vibration */}
      <motion.g
        animate={{
          rotate: [0, -3, 1, 0],
          scale: [1, 1.03, 1],
        }}
        style={{ transformOrigin: '14px 32px' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Megaphone Cone */}
        <path
          d="M 12 26 L 26 20 L 34 14 L 34 50 L 26 44 L 12 38 Z"
          stroke={stroke}
          strokeWidth="2.4"
          fill={isNight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
        />
        {/* Brass Rib Ring */}
        <line x1="26" y1="20" x2="26" y2="44" stroke={gold} strokeWidth="2" />
        {/* Megaphone Bell Rim */}
        <ellipse cx="34" cy="32" rx="3.5" ry="18" stroke={gold} strokeWidth="2.4" />

        {/* Handgrip Handle */}
        <path d="M 16 36 L 16 48 L 21 48 L 21 34" stroke={stroke} strokeWidth="2.2" />
        {/* Rear Acoustic Mic Cap */}
        <rect x="7" y="27" width="5" height="10" rx="2" stroke={stroke} strokeWidth="2" fill={gold} fillOpacity="0.3" />
      </motion.g>

      {/* 3 High-Energy Concentric Broadcast Waves */}
      {/* Wave 1 */}
      <motion.path
        d="M 42 24 C 47 28 47 36 42 40"
        stroke={gold}
        strokeWidth="2.6"
        animate={{ opacity: [0.2, 1, 0.2], x: [0, 2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Wave 2 */}
      <motion.path
        d="M 48 18 C 55 24 55 40 48 46"
        stroke={gold}
        strokeWidth="2.4"
        animate={{ opacity: [0.1, 0.9, 0.1], x: [0, 3.5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* Wave 3 */}
      <motion.path
        d="M 54 12 C 63 20 63 44 54 52"
        stroke={stroke}
        strokeWidth="2"
        animate={{ opacity: [0, 0.7, 0], x: [0, 5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* Upward Growth Arrow Indicator */}
      <path d="M 46 14 L 56 8 M 56 8 L 50 8 M 56 8 L 56 14" stroke={gold} strokeWidth="2.2" />
    </svg>
  );
}

/**
 * 06. GAME STUDIO & INTERACTIVE (بازی‌سازی و تجارب تعاملی)
 * Concept: Unmistakable Ergonomic Gaming Controller / Gamepad with D-PAD, Action Buttons & Interactive Joy-Sticks
 */
export function GameStudioAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Top Shoulder Triggers (L1 & R1) */}
      <path d="M 14 20 C 18 16 24 16 26 18" stroke={gold} strokeWidth="2.4" />
      <path d="M 38 18 C 40 16 46 16 50 20" stroke={gold} strokeWidth="2.4" />

      {/* Iconic Ergonomic Gamepad Chassis with Dual Grips */}
      <path
        d="M 13 36 C 8 46 13 54 22 50 L 26 44 C 28 42 36 42 38 44 L 42 50 C 51 54 56 46 51 36 C 49 26 44 20 32 20 C 20 20 15 26 13 36 Z"
        stroke={stroke}
        strokeWidth="2.4"
        fill={isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'}
      />

      {/* Directional D-PAD Cross (Left Grip) */}
      <path
        d="M 18 29 H 22 V 33 H 26 V 37 H 22 V 41 H 18 V 37 H 14 V 33 H 18 Z"
        stroke={stroke}
        strokeWidth="1.8"
        fill={isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
      />
      <circle cx="20" cy="35" r="1" fill={gold} stroke="none" />

      {/* 4 Action Buttons (X, Y, A, B on Right Grip) */}
      {/* North Button (Y) */}
      <motion.circle
        cx="44"
        cy="30"
        r="2.2"
        stroke={gold}
        strokeWidth="1.6"
        fill={gold}
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
      />
      {/* South Button (A) */}
      <motion.circle
        cx="44"
        cy="40"
        r="2.2"
        stroke={gold}
        strokeWidth="1.6"
        fill={gold}
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      {/* West Button (X) */}
      <motion.circle
        cx="39"
        cy="35"
        r="2.2"
        stroke={stroke}
        strokeWidth="1.6"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* East Button (B) */}
      <motion.circle
        cx="49"
        cy="35"
        r="2.2"
        stroke={stroke}
        strokeWidth="1.6"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />

      {/* Left Analog Thumbstick */}
      <circle cx="27" cy="40" r="4" stroke={stroke} strokeWidth="1.6" />
      <circle cx="27" cy="40" r="1.5" fill={gold} stroke="none" />

      {/* Right Analog Thumbstick */}
      <circle cx="37" cy="40" r="4" stroke={stroke} strokeWidth="1.6" />
      <circle cx="37" cy="40" r="1.5" fill={gold} stroke="none" />

      {/* Center 1-UP / Interactive Gem Spark floating out */}
      <motion.polygon
        points="32,24 35,28 32,32 29,28"
        fill={gold}
        stroke={gold}
        strokeWidth="1"
        animate={{ y: [0, -3, 0], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/**
 * 07. ACADEMY & LEARNING HUB (آموزش و توسعه مهارت)
 * Concept: Iconic Graduation Mortarboard Cap + Illuminated Open Folio Book with Knowledge Stars
 */
export function AcademyHubAnimatedIcon({ isNight, className = 'w-full h-full' }: IconProps) {
  const gold = isNight ? '#FFF083' : '#D4AF37';
  const stroke = isNight ? '#FFFFFF' : '#1A1A1A';

  return (
    <svg viewBox="0 0 64 64" className={`${className} overflow-visible`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Diamond Mortarboard Board */}
      <polygon
        points="32,10 54,19 32,28 10,19"
        stroke={stroke}
        strokeWidth="2.4"
        fill={isNight ? 'rgba(255, 240, 131, 0.15)' : 'rgba(212, 175, 55, 0.15)'}
      />
      {/* Cap Skull Underneath */}
      <path
        d="M 21 24 L 21 31 C 21 37 43 37 43 31 L 43 24"
        stroke={stroke}
        strokeWidth="2.2"
        fill={isNight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)'}
      />

      {/* Dangling Academic Tassel with Physics Sway */}
      <motion.g
        animate={{ rotate: [-8, 8, -8] }}
        style={{ transformOrigin: '32px 19px' }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="32" y1="19" x2="48" y2="24" stroke={gold} strokeWidth="1.8" />
        <circle cx="48" cy="24" r="1.5" fill={gold} stroke="none" />
        <path d="M 48 24 L 46 34 L 50 34 Z" fill={gold} stroke={gold} strokeWidth="1" />
      </motion.g>

      {/* Illuminated Open Folio Book of Knowledge below */}
      <path
        d="M 12 50 C 21 46 32 48 32 48 C 32 48 43 46 52 50 L 52 38 C 43 34 32 36 32 36 C 32 36 21 34 12 38 Z"
        stroke={stroke}
        strokeWidth="2.2"
        fill={isNight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
      />
      {/* Center Book Spine Ribbon in Gold */}
      <line x1="32" y1="36" x2="32" y2="48" stroke={gold} strokeWidth="2.2" />

      {/* Orbiting Knowledge Beacon Star */}
      <motion.g
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.4, 1, 0.4],
        }}
        style={{ transformOrigin: '15px 14px' }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M 15 10 L 16 13 L 19 14 L 16 15 L 15 18 L 14 15 L 11 14 L 14 13 Z"
          fill={gold}
          stroke={gold}
          strokeWidth="0.8"
        />
      </motion.g>
    </svg>
  );
}

export const DEPARTMENT_ANIMATED_ICONS = [
  WebDevAnimatedIcon,
  SeoAnalyticsAnimatedIcon,
  BrandingIdentityAnimatedIcon,
  CreativeStudioAnimatedIcon,
  DigitalMarketingAnimatedIcon,
  GameStudioAnimatedIcon,
  AcademyHubAnimatedIcon,
];
