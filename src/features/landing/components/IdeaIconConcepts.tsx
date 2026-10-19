import React from 'react';
import { motion } from 'motion/react';

export interface AstrolabeMeta {
  subBadge: string;
  nameFa: string;
  nameEn: string;
}

export const ASTROLABE_META: AstrolabeMeta = {
  subBadge: 'ORRERY',
  nameFa: 'اسطرلاب و اورری فلکی',
  nameEn: 'Celestial Astrolabe',
};

interface CelestialAstrolabeIconProps {
  tier: number; // 0, 1, 2, 3
  isNight?: boolean;
  spinRotation?: number;
}

/**
 * 🔭 Celestial Astrolabe & Planetary Orrery Icon
 * (اسطرلاب و اورری فلکی استودیو جیرجیرک)
 * کانسپت منتخب برای بخش مقیاس ایده (How Big is the Idea)
 */
export function CelestialAstrolabeIcon({
  tier,
  isNight = true,
  spinRotation = 0,
}: CelestialAstrolabeIconProps) {
  const gold = isNight ? '#fff083' : '#8f6b00';
  const goldLight = isNight ? '#fff9b0' : '#b88900';
  const mutedWhite = isNight ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.4)';
  const surfaceDark = isNight ? '#121212' : '#f4f4f4';

  const planetAngles = [
    [35, 215],
    [45, 160, 290],
    [15, 110, 215, 305],
    [0, 60, 120, 180, 240, 300],
  ][tier] || [35, 215];

  return (
    <motion.div
      animate={{ rotate: spinRotation }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 48 48" className="w-full h-full block overflow-visible" fill="none">
        <g transform="translate(24, 24) scale(0.96) translate(-24, -24)">
          {/* Meridian Crosshairs (خطوط راهنمای افلاک‌نما) */}
          <line x1="7" y1="24" x2="41" y2="24" stroke={mutedWhite} strokeWidth="1" opacity="0.45" />
          <line x1="24" y1="7" x2="24" y2="41" stroke={mutedWhite} strokeWidth="1" opacity="0.45" />

          {/* Meridian Ticks at the quadrants */}
          <line x1="24" y1="9" x2="24" y2="11.8" stroke={gold} strokeWidth="1.2" opacity="0.75" />
          <line x1="24" y1="36.2" x2="24" y2="39" stroke={gold} strokeWidth="1.2" opacity="0.75" />
          <line x1="9" y1="24" x2="11.8" y2="24" stroke={gold} strokeWidth="1.2" opacity="0.75" />
          <line x1="36.2" y1="24" x2="39" y2="24" stroke={gold} strokeWidth="1.2" opacity="0.75" />

          {/* Primary Planetary Orbit Ring (حلقه مدار اصلی - اندازه متعادل و چشم‌نواز) */}
          <circle
            cx="24"
            cy="24"
            r="16.5"
            stroke={gold}
            strokeWidth="1.55"
            strokeDasharray={tier >= 2 ? '3.5 2' : 'none'}
            opacity="0.9"
          />

          {/* Secondary Inner Orbit for Tier >= 1 */}
          {tier >= 1 && (
            <circle
              cx="24"
              cy="24"
              r="11.8"
              stroke={goldLight}
              strokeWidth="1.25"
              opacity="0.8"
            />
          )}

          {/* Inclined Elliptical Orbit for Tier >= 2 (مدار بیضوی شیب‌دار) */}
          {tier >= 2 && (
            <ellipse
              cx="24"
              cy="24"
              rx="16.8"
              ry="8.4"
              stroke={gold}
              strokeWidth="1.3"
              opacity="0.85"
              transform="rotate(-25 24 24)"
            />
          )}

          {/* Outer Fine Orbit Track for Tier 3 */}
          {tier === 3 && (
            <circle
              cx="24"
              cy="24"
              r="18.5"
              stroke={goldLight}
              strokeWidth="0.9"
              strokeDasharray="2.8 2.2"
              opacity="0.7"
            />
          )}

          {/* Orbiting Celestial Planets (سیارات در مقیاس متعادل و خوش‌فرم) */}
          {planetAngles.map((deg, i) => {
            const planetRadius = 2.2 + (i % 2) * 0.55;
            const orbitDistance = 8.8 - (i % 2) * 4.2;
            return (
              <g key={i} transform={`rotate(${deg} 24 24)`}>
                {/* Orbit path glow for planet */}
                <circle
                  cx="24"
                  cy={orbitDistance}
                  r={planetRadius + 1.2}
                  fill={gold}
                  opacity="0.2"
                />
                {/* Main Planet Sphere */}
                <circle
                  cx="24"
                  cy={orbitDistance}
                  r={planetRadius}
                  fill={gold}
                  stroke={isNight ? '#0a0a0a' : '#ffffff'}
                  strokeWidth="0.65"
                />
                {/* Planet core highlight */}
                <circle
                  cx="23.4"
                  cy={orbitDistance - 0.45}
                  r={planetRadius * 0.38}
                  fill={isNight ? '#ffffff' : '#fff9b0'}
                  opacity="0.85"
                />
                {/* Ring for first planet in Tier 3 */}
                {tier === 3 && i === 0 && (
                  <ellipse
                    cx="24"
                    cy={orbitDistance}
                    rx={planetRadius * 1.8}
                    ry={planetRadius * 0.65}
                    stroke={goldLight}
                    strokeWidth="0.7"
                    fill="none"
                    transform={`rotate(-25 24 ${orbitDistance})`}
                  />
                )}
              </g>
            );
          })}

          {/* Central Solar Engine Core (کانون خورشیدی متناسب و باوقار) */}
          {/* Solar corona outer ring */}
          <circle
            cx="24"
            cy="24"
            r={tier >= 2 ? 7.2 : 6.4}
            fill={surfaceDark}
            stroke={gold}
            strokeWidth="1.55"
          />

          {/* Radiating mini solar spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="24"
              y1="24"
              x2="24"
              y2={tier >= 2 ? "18" : "18.5"}
              stroke={gold}
              strokeWidth="0.8"
              opacity="0.65"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}

          {/* Radiant Sun Disc */}
          <circle
            cx="24"
            cy="24"
            r={tier >= 2 ? 4.7 : 4.0}
            fill={gold}
            stroke={isNight ? '#000000' : '#ffffff'}
            strokeWidth="0.55"
          />

          {/* Solar Pupil Eye / Core */}
          <circle
            cx="24"
            cy="24"
            r={tier >= 2 ? 2.0 : 1.7}
            fill={isNight ? '#ffffff' : '#382b00'}
            opacity="0.9"
          />

          {/* 4 Cardinal Diamond Stars (پوینترهای چهار جهت) */}
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 24 24)`}>
              <polygon points="24,5 25.2,7.2 24,9.4 22.8,7.2" fill={gold} />
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}
