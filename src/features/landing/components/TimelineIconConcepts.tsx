import { motion } from 'motion/react';

export interface LotusStageMeta {
  subBadges: [string, string, string, string];
  stageLabelsFa: [string, string, string, string];
  stageLabelsEn: [string, string, string, string];
}

export const LOTUS_BLOOM_META: LotusStageMeta = {
  subBadges: ['BUD', 'OPENING', 'LOTUS', 'ROYAL BLOOM'],
  stageLabelsFa: [
    'غنچه بسته شبنم‌زده (< ۱ ماه)',
    'گل نیمه‌شکفته (۱ تا ۲ ماه)',
    'نیلوفر آبی متقارن (۲ تا ۳ ماه)',
    'نیلوفر سلطنتی زرین (> ۳ ماه)',
  ],
  stageLabelsEn: [
    'Dewy Closed Bud (< 1 Mo)',
    'Semi-Opened Blossom (1 - 2 Mos)',
    'Symmetric Water Lotus (2 - 3 Mos)',
    'Royal Golden Lotus (> 3 Mos)',
  ],
};

interface LotusBloomIconProps {
  tier: number; // 0, 1, 2, 3
  isNight?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 🪷 Lotus Bloom Icon (شکوفایی گل و نیلوفر آبی)
 * Progresses organically through 4 stages matching project timeline horizon.
 */
export function LotusBloomIcon({
  tier,
  isNight = true,
  size = 'md',
}: LotusBloomIconProps) {
  const primaryStroke = isNight ? '#fff083' : '#8f6b00';
  const primaryFill = isNight ? '#fff083' : '#8f6b00';
  const secondaryStroke = isNight ? 'rgba(255, 240, 131, 0.7)' : 'rgba(143, 107, 0, 0.7)';
  const mutedStroke = isNight ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.35)';
  const surfaceFill = isNight ? '#141414' : '#ffffff';
  const surfaceFillDarker = isNight ? '#0c0c0c' : '#f5f5f5';

  const viewBox = '0 0 48 48';
  const dim = 'w-full h-full';

  if (tier === 0) {
    // Stage 0 (< 1 Month): Tight Dewy Flower Bud
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
          {/* Ground / Water Ripples */}
          <ellipse cx="24" cy="40" rx="14" ry="3" stroke={primaryStroke} strokeWidth="1.4" fill="none" />
          <ellipse cx="24" cy="40" rx="8" ry="1.8" stroke={mutedStroke} strokeWidth="1" strokeDasharray="2 2" fill="none" />

          {/* Graceful Floral Stem */}
          <path d="M 24 40 C 24 32 23 27 24 22" stroke={primaryStroke} strokeWidth="2.2" strokeLinecap="round" />

          {/* Protective Calyx Sepals */}
          <path d="M 20 25 Q 16 22 17 18 Q 21 21 22 25" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.4" />
          <path d="M 28 25 Q 32 22 31 18 Q 27 21 26 25" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.4" />

          {/* Slender Tight Bud Petals */}
          <path
            d="M 24 8 C 17 15 18 24 24 25 C 30 24 31 15 24 8 Z"
            fill={surfaceFill}
            stroke={primaryStroke}
            strokeWidth="2"
          />

          {/* Overlapping Petal Seam */}
          <path d="M 24 8 Q 20 16 24 25" stroke={primaryStroke} strokeWidth="1.4" />

          {/* Sparkling Dewdrop on Bud Tip */}
          <circle cx="24" cy="7" r="1.6" fill={primaryFill} />
        </g>
      </svg>
    );
  }

  if (tier === 1) {
    // Stage 1 (1 - 2 Months): Semi-Opened Blossom
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
          {/* Water ripples */}
          <ellipse cx="24" cy="39" rx="15" ry="3" stroke={primaryStroke} strokeWidth="1.4" fill="none" />

          {/* Stem */}
          <line x1="24" y1="39" x2="24" y2="28" stroke={primaryStroke} strokeWidth="2.2" strokeLinecap="round" />

          {/* Two Outer Peeling Petals */}
          <path
            d="M 22 28 C 12 25 10 16 15 13 C 19 16 21 23 22 28 Z"
            fill={surfaceFillDarker}
            stroke={primaryStroke}
            strokeWidth="1.6"
          />
          <path
            d="M 26 28 C 36 25 38 16 33 13 C 29 16 27 23 26 28 Z"
            fill={surfaceFillDarker}
            stroke={primaryStroke}
            strokeWidth="1.6"
          />

          {/* Inner Petal Heart */}
          <path
            d="M 24 10 C 19 16 19 26 24 28 C 29 26 29 16 24 10 Z"
            fill={surfaceFill}
            stroke={primaryStroke}
            strokeWidth="2"
          />

          {/* Center Emerging Pistil Core */}
          <circle cx="24" cy="18" r="2.2" fill={primaryFill} />
        </g>
      </svg>
    );
  }

  if (tier === 2) {
    // Stage 2 (2 - 3 Months): Full Symmetric Water Lotus
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
          {/* Wide Water Lily Pad underneath */}
          <ellipse cx="24" cy="38" rx="16" ry="3.8" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.6" />
          <line x1="24" y1="38" x2="38" y2="38" stroke={mutedStroke} strokeWidth="1" />

          {/* Base Calyx */}
          <ellipse cx="24" cy="33" rx="6" ry="2.5" fill={primaryFill} />

          {/* Outer Lower Flaring Petals */}
          <path d="M 24 33 C 12 33 6 24 12 18 C 16 24 21 31 24 33 Z" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1.6" />
          <path d="M 24 33 C 36 33 42 24 36 18 C 32 24 27 31 24 33 Z" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1.6" />

          {/* Mid Layer Diagonal Petals */}
          <path d="M 24 33 C 16 29 14 18 18 13 C 22 19 23 28 24 33 Z" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.6" />
          <path d="M 24 33 C 32 29 34 18 30 13 C 26 19 25 28 24 33 Z" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.6" />

          {/* Central Tall King Petal */}
          <path d="M 24 9 C 20 16 20 28 24 33 C 28 28 28 16 24 9 Z" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1.8" />

          {/* Golden Pistil Heart Jewel */}
          <circle cx="24" cy="22" r="2.5" fill={primaryFill} />
        </g>
      </svg>
    );
  }

  // Stage 3 (> 3 Months): Royal Radiant Water Lotus with Floating Pollen Stars
  // Same base scale as stages 0, 1, and 2, conveying climax through full bloom and halo
  return (
    <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
      <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
        {/* Glowing Halo Rings */}
        <circle cx="24" cy="22" r="15" stroke={secondaryStroke} strokeWidth="1.1" strokeDasharray="2.5 2.5" opacity="0.75" />

        {/* Floating Sacred Lily Pad */}
        <ellipse cx="24" cy="36" rx="15" ry="3.6" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.7" />
        <path d="M 24 36 L 36 34.5" stroke={primaryStroke} strokeWidth="0.9" strokeLinecap="round" />

        {/* Multi-Tiered Sacred Blossom Petals */}
        <path d="M 24 33 C 11 33 8 23 14 17 C 18 23 21 31 24 33 Z" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1.5" />
        <path d="M 24 33 C 37 33 40 23 34 17 C 30 23 27 31 24 33 Z" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1.5" />

        <path d="M 24 33 C 16 28 14 17 18 12 C 22 18 23 28 24 33 Z" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.5" />
        <path d="M 24 33 C 32 28 34 17 30 12 C 26 18 25 28 24 33 Z" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.5" />

        {/* Center Apex Crown Petal */}
        <path d="M 24 9 C 20 16 20 28 24 33 C 28 28 28 16 24 9 Z" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1.8" />

        {/* Golden Royal Crown Stamens */}
        <circle cx="24" cy="20" r="2.8" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.3" />
        <circle cx="24" cy="20" r="1.6" fill={primaryFill} />

        {/* Floating Starlight Pollen */}
        <circle cx="11" cy="15" r="1.3" fill={primaryFill} />
        <circle cx="37" cy="15" r="1.3" fill={primaryFill} />
        <circle cx="17" cy="9" r="1.1" fill={primaryFill} />
        <circle cx="31" cy="9" r="1.1" fill={primaryFill} />
        <circle cx="24" cy="7" r="1.4" fill={primaryFill} />
      </g>
    </svg>
  );
}
