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
  const dim = size === 'sm' ? 'w-full h-full' : size === 'lg' ? 'w-full h-full max-w-16 max-h-16' : 'w-full h-full max-w-12 max-h-12';

  if (tier === 0) {
    // Stage 0: Sturdy Locked Pirate Chest with Padlock
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
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
      </svg>
    );
  }

  if (tier === 1) {
    // Stage 1: Padlock Unlocked, Lid Slightly Cracked with Golden Rays
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
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
      </svg>
    );
  }

  if (tier === 2) {
    // Stage 2: Lid Open 45°, Golden Chalice & Coins Peeking Out
    return (
      <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
        {/* Angled Open Lid */}
        <g transform="rotate(-26 10 23)">
          <path
            d="M 10 21 C 10 15 16 12 24 12 C 32 12 38 15 38 21 Z"
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

        {/* Chest Body */}
        <rect x="10" y="23" width="28" height="17" rx="2" stroke={primaryStroke} strokeWidth="2.2" fill={surfaceFill} />
        <line x1="16" y1="23" x2="16" y2="40" stroke={mutedStroke} strokeWidth="1.4" />
        <line x1="32" y1="23" x2="32" y2="40" stroke={mutedStroke} strokeWidth="1.4" />

        {/* Golden Diamond Emblem */}
        <polygon points="24,28 27.5,31.5 24,35 20.5,31.5" fill={primaryFill} />

        {/* Coins on floor */}
        <ellipse cx="7" cy="39" rx="3.5" ry="1.5" fill={primaryFill} stroke={primaryStroke} strokeWidth="1" />
      </svg>
    );
  }

  // Stage 3: FULLY OPEN ALIBABA TREASURE CHEST! Jewels, Gold Bars, Goblets, Rays!
  return (
    <svg viewBox={viewBox} className={`${dim} overflow-visible`} fill="none">
      {/* Brilliant Radiance Sunburst Rays */}
      <line x1="24" y1="12" x2="24" y2="0" stroke={primaryStroke} strokeWidth="2" />
      <line x1="16" y1="14" x2="8" y2="4" stroke={primaryStroke} strokeWidth="1.6" />
      <line x1="32" y1="14" x2="40" y2="4" stroke={primaryStroke} strokeWidth="1.6" />
      <line x1="12" y1="18" x2="2" y2="13" stroke={secondaryStroke} strokeWidth="1.4" />
      <line x1="36" y1="18" x2="46" y2="13" stroke={secondaryStroke} strokeWidth="1.4" />

      {/* Wide Open Back Lid */}
      <g transform="rotate(-50 10 24)">
        <path
          d="M 10 20 C 10 14 16 11 24 11 C 32 11 38 14 38 20 Z"
          fill={surfaceFillDarker}
          stroke={primaryStroke}
          strokeWidth="2.2"
        />
      </g>

      {/* Huge Mountain of Gold & Jewels bursting out */}
      {/* Gold Bullion Ingot */}
      <polygon points="18,17 30,17 28,12 20,12" fill={primaryFill} stroke={primaryStroke} strokeWidth="1.2" />
      {/* Brilliant Ruby/Diamond Jewel */}
      <polygon points="24,6 28,10 24,15 20,10" fill={primaryFill} stroke={surfaceFill} strokeWidth="1.2" />
      {/* Golden Goblet */}
      <polygon points="13,11 18,11 16.5,17 14.5,17" fill={primaryFill} stroke={primaryStroke} strokeWidth="1" />

      {/* Chest Body */}
      <rect x="9" y="22" width="30" height="18" rx="2" stroke={primaryStroke} strokeWidth="2.4" fill={surfaceFill} />
      <line x1="15" y1="22" x2="15" y2="40" stroke={mutedStroke} strokeWidth="1.4" />
      <line x1="33" y1="22" x2="33" y2="40" stroke={mutedStroke} strokeWidth="1.4" />

      {/* Front Royal Lock Emblem */}
      <polygon points="24,27 29,32 24,37 19,32" stroke={primaryStroke} strokeWidth="1.5" fill={primaryFill} />
      <polygon points="24,29 27,32 24,35 21,32" fill={surfaceFill} />

      {/* Overflowing coins cascading over rims & ground */}
      <ellipse cx="6" cy="40" rx="4.5" ry="2" stroke={primaryStroke} strokeWidth="1.2" fill={primaryFill} />
      <ellipse cx="42" cy="40" rx="4.5" ry="2" stroke={primaryStroke} strokeWidth="1.2" fill={primaryFill} />
      <ellipse cx="9" cy="22" rx="3.5" ry="1.8" stroke={primaryStroke} strokeWidth="1" fill={primaryFill} />
      <ellipse cx="39" cy="22" rx="3.5" ry="1.8" stroke={primaryStroke} strokeWidth="1" fill={primaryFill} />

      {/* Sparkles */}
      <path d="M 24 -2 L 25.5 0.5 L 28 1.5 L 25.5 2.5 L 24 5 L 22.5 2.5 L 20 1.5 L 22.5 0.5 Z" fill={primaryFill} />
    </svg>
  );
}
