import { motion } from 'motion/react';

export interface TreasureStageMeta {
  subBadges: [string, string, string, string];
  stageLabelsFa: [string, string, string, string];
  stageLabelsEn: [string, string, string, string];
}

export const TREASURE_CHEST_META: TreasureStageMeta = {
  subBadges: ['LOCKED', 'UNLOCKED', 'OPENING', 'JACKPOT'],
  stageLabelsFa: [
    'صندوقچه قفل‌شده (< ۵۰ م)',
    'قفل باز با پرتو نور (۵۰ تا ۱۰۰ م)',
    'جام و سکه نیمه‌باز (۱۰۰ تا ۵۰۰ م)',
    'گنجینه لبریز علی‌بابا (> ۵۰۰ م)',
  ],
  stageLabelsEn: [
    'Locked Sturdy Chest (< 50M)',
    'Unlocked Beams of Light (50M - 100M)',
    'Half-Open Coins & Goblet (100M - 500M)',
    'Jackpot Treasure Mountain (> 500M)',
  ],
};

interface TreasureChestIconProps {
  tier: number; // 0, 1, 2, 3
  isNight?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 🏴‍☠️ Treasure Chest Icon (صندوقچه گنج جادویی و طلسم طلا)
 * Evolves from a locked pirate chest to an erupting jackpot of gems and gold.
 */
export function TreasureChestIcon({
  tier,
  isNight = true,
  size = 'md',
}: TreasureChestIconProps) {
  const primaryStroke = isNight ? '#fff083' : '#8f6b00';
  const primaryFill = isNight ? '#fff083' : '#8f6b00';
  const secondaryStroke = isNight ? 'rgba(255, 240, 131, 0.7)' : 'rgba(143, 107, 0, 0.7)';
  const mutedStroke = isNight ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.35)';
  const surfaceFill = isNight ? '#141414' : '#ffffff';
  const surfaceFillDarker = isNight ? '#0c0c0c' : '#f5f5f5';

  const viewBox = '0 0 48 48';
  const dim = 'w-full h-full';

  if (tier === 0) {
    // Stage 0: Sturdy Locked Pirate Chest with Padlock
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
          {/* Arched Closed Lid */}
          <path
            d="M 10 22 C 10 16 16 13 24 13 C 32 13 38 16 38 22 Z"
            fill={surfaceFillDarker}
            stroke={primaryStroke}
            strokeWidth="2.2"
          />
          {/* Iron straps on lid */}
          <path d="M 16 14.5 Q 16 18 16 22 M 32 14.5 Q 32 18 32 22" stroke={mutedStroke} strokeWidth="1.4" />

          {/* Lower Chest Body */}
          <rect x="10" y="22" width="28" height="17" rx="2" stroke={primaryStroke} strokeWidth="2.2" fill={surfaceFill} />
          {/* Vertical bands */}
          <line x1="16" y1="22" x2="16" y2="39" stroke={mutedStroke} strokeWidth="1.4" />
          <line x1="32" y1="22" x2="32" y2="39" stroke={mutedStroke} strokeWidth="1.4" />

          {/* Center Lock Plate & Hanging Padlock */}
          <rect x="21" y="20" width="6" height="5" rx="1" fill={surfaceFillDarker} stroke={primaryStroke} strokeWidth="1.4" />
          {/* Padlock shackle */}
          <path d="M 22.5 25 C 22.5 22.5 25.5 22.5 25.5 25" stroke={primaryStroke} strokeWidth="1.3" />
          <rect x="22" y="25" width="4" height="4.5" rx="1" fill={primaryFill} stroke={primaryStroke} strokeWidth="1" />
          <circle cx="24" cy="27" r="0.6" fill={surfaceFill} />
        </g>
      </svg>
    );
  }

  if (tier === 1) {
    // Stage 1: Padlock Unlocked, Lid Slightly Cracked with Golden Rays
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
          {/* Light Beams raying out from the crack */}
          <line x1="24" y1="18" x2="24" y2="9" stroke={primaryStroke} strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="17" y1="18" x2="13" y2="11" stroke={secondaryStroke} strokeWidth="1.2" />
          <line x1="31" y1="18" x2="35" y2="11" stroke={secondaryStroke} strokeWidth="1.2" />

          {/* Lid lifted slightly (tilted up) */}
          <g transform="rotate(-6 10 21)">
            <path
              d="M 10 20 C 10 14 16 11 24 11 C 32 11 38 14 38 20 Z"
              fill={surfaceFillDarker}
              stroke={primaryStroke}
              strokeWidth="2.2"
            />
            <path d="M 16 12.5 Q 16 16 16 20 M 32 12.5 Q 32 16 32 20" stroke={mutedStroke} strokeWidth="1.4" />
          </g>

          {/* Golden glow inside the crack */}
          <rect x="12" y="19" width="24" height="3" fill={primaryFill} opacity="0.8" />

          {/* Chest Body */}
          <rect x="10" y="22" width="28" height="17" rx="2" stroke={primaryStroke} strokeWidth="2.2" fill={surfaceFill} />
          <line x1="16" y1="22" x2="16" y2="39" stroke={mutedStroke} strokeWidth="1.4" />
          <line x1="32" y1="22" x2="32" y2="39" stroke={mutedStroke} strokeWidth="1.4" />

          {/* Open Padlock popped on side */}
          <rect x="22" y="22" width="4" height="4.5" rx="1" fill={primaryFill} />
          <path d="M 22.5 22 C 22.5 19 26 19 26 21" stroke={primaryStroke} strokeWidth="1.2" />
        </g>
      </svg>
    );
  }

  if (tier === 2) {
    // Stage 2: Lid Open 45°, Golden Chalice & Coins Peeking Out
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
          {/* Angled Open Lid */}
          <g transform="rotate(-22 10 22)">
            <path
              d="M 10 20 C 10 14 16 11 24 11 C 32 11 38 14 38 20 Z"
              fill={surfaceFillDarker}
              stroke={primaryStroke}
              strokeWidth="2.2"
            />
          </g>

          {/* Heaps of gold coins & chalice inside */}
          <polygon points="21,17 27,17 25,23 23,23" fill={primaryFill} stroke={primaryStroke} strokeWidth="1" />
          <ellipse cx="24" cy="17" rx="3" ry="1.2" fill={surfaceFill} stroke={primaryStroke} strokeWidth="1" />
          <ellipse cx="17" cy="20" rx="3.5" ry="1.8" stroke={primaryStroke} strokeWidth="1.2" fill={primaryFill} />
          <ellipse cx="31" cy="20" rx="3.5" ry="1.8" stroke={primaryStroke} strokeWidth="1.2" fill={primaryFill} />

          {/* Chest Body (identical dimensions to stages 0 and 1) */}
          <rect x="10" y="22" width="28" height="17" rx="2" stroke={primaryStroke} strokeWidth="2.2" fill={surfaceFill} />
          <line x1="16" y1="22" x2="16" y2="39" stroke={mutedStroke} strokeWidth="1.4" />
          <line x1="32" y1="22" x2="32" y2="39" stroke={mutedStroke} strokeWidth="1.4" />

          {/* Golden Diamond Emblem */}
          <polygon points="24,27 27.5,30.5 24,34 20.5,30.5" fill={primaryFill} />

          {/* Coins on floor */}
          <ellipse cx="10" cy="39" rx="3" ry="1.4" fill={primaryFill} stroke={primaryStroke} strokeWidth="1" />
        </g>
      </svg>
    );
  }

  // Stage 3: FULLY OPEN ALIBABA TREASURE CHEST! Jewels, Gold Bars, Goblets, Rays!
  // Same base scale and chest size as stages 0, 1, and 2, conveying climax through rich contents
  return (
    <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
      <g transform="translate(24, 24) scale(0.86) translate(-24, -24)">
        {/* Radiant Sunburst Rays */}
        <line x1="24" y1="9" x2="24" y2="4.5" stroke={primaryStroke} strokeWidth="1.5" />
        <line x1="18" y1="10.5" x2="13.5" y2="6.5" stroke={primaryStroke} strokeWidth="1.3" />
        <line x1="30" y1="10.5" x2="34.5" y2="6.5" stroke={primaryStroke} strokeWidth="1.3" />
        <line x1="14" y1="15" x2="8.5" y2="12" stroke={secondaryStroke} strokeWidth="1.2" />
        <line x1="34" y1="15" x2="39.5" y2="12" stroke={secondaryStroke} strokeWidth="1.2" />

        {/* 1. Wide Open Lid swung back nicely (-46 deg) so chest opening is fully visible */}
        <g transform="rotate(-46 10 22)">
          <path
            d="M 10 20 C 10 14 16 11 24 11 C 32 11 38 14 38 20 Z"
            fill={surfaceFillDarker}
            stroke={primaryStroke}
            strokeWidth="2.2"
          />
          <path d="M 16 13 Q 16 16.5 16 20 M 32 13 Q 32 16.5 32 20" stroke={mutedStroke} strokeWidth="1.3" />
        </g>

        {/* 2. Mountain of Gold & Jewels bursting naturally out of the chest opening */}
        {/* Golden glow inside chest aperture */}
        <ellipse cx="24" cy="21.5" rx="12" ry="3.5" fill={primaryFill} opacity="0.35" />

        {/* Layer 1: Heaps of Gold Coins overflowing inside chest */}
        <ellipse cx="16" cy="20" rx="4" ry="2" stroke={primaryStroke} strokeWidth="1.2" fill={primaryFill} />
        <ellipse cx="32" cy="20" rx="4" ry="2" stroke={primaryStroke} strokeWidth="1.2" fill={primaryFill} />
        <ellipse cx="21" cy="21" rx="3.5" ry="1.8" stroke={primaryStroke} strokeWidth="1.1" fill={primaryFill} />
        <ellipse cx="27" cy="21" rx="3.5" ry="1.8" stroke={primaryStroke} strokeWidth="1.1" fill={primaryFill} />

        {/* Layer 2: Gold Bullion Ingot standing proudly */}
        <polygon points="19,18 29,18 27.5,14 20.5,14" fill={primaryFill} stroke={primaryStroke} strokeWidth="1.2" />

        {/* Layer 3: Golden Chalice on the left rim */}
        <polygon points="13.5,14 17.5,14 16.2,18.5 14.8,18.5" fill={primaryFill} stroke={primaryStroke} strokeWidth="1" />
        <ellipse cx="15.5" cy="14" rx="2" ry="0.8" fill={surfaceFill} stroke={primaryStroke} strokeWidth="0.9" />

        {/* Layer 4: Brilliant Crown Jewel / Floating Diamond */}
        <polygon points="24,8.5 28,12.5 24,16.5 20,12.5" fill={primaryFill} stroke={surfaceFill} strokeWidth="1.3" />
        {/* Inner facet of jewel */}
        <polygon points="24,10.2 26.3,12.5 24,14.8 21.7,12.5" fill={isNight ? '#ffffff' : '#fff9b0'} opacity="0.85" />

        {/* 3. Chest Body (identical dimensions to stages 0, 1, and 2) */}
        <rect x="10" y="22" width="28" height="17" rx="2" stroke={primaryStroke} strokeWidth="2.2" fill={surfaceFill} />
        <line x1="16" y1="22" x2="16" y2="39" stroke={mutedStroke} strokeWidth="1.4" />
        <line x1="32" y1="22" x2="32" y2="39" stroke={mutedStroke} strokeWidth="1.4" />

        {/* Front Royal Lock Emblem */}
        <polygon points="24,26.5 28,30.5 24,34.5 20,30.5" stroke={primaryStroke} strokeWidth="1.4" fill={primaryFill} />
        <polygon points="24,28 26.5,30.5 24,33 21.5,30.5" fill={surfaceFill} />

        {/* Coins cascading down rims & ground */}
        <ellipse cx="10" cy="39" rx="3.2" ry="1.4" stroke={primaryStroke} strokeWidth="1" fill={primaryFill} />
        <ellipse cx="38" cy="39" rx="3.2" ry="1.4" stroke={primaryStroke} strokeWidth="1" fill={primaryFill} />
        <ellipse cx="10.5" cy="22.5" rx="2.5" ry="1.3" stroke={primaryStroke} strokeWidth="1" fill={primaryFill} />
        <ellipse cx="37.5" cy="22.5" rx="2.5" ry="1.3" stroke={primaryStroke} strokeWidth="1" fill={primaryFill} />

        {/* Top Diamond Sparkle Star */}
        <polygon points="24,3 25.1,4.5 24,6 22.9,4.5" fill={primaryFill} />
      </g>
    </svg>
  );
}
