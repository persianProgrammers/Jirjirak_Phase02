import React from 'react';
import { motion } from 'motion/react';

export interface StoryIconProps {
  isNight: boolean;
  isFa: boolean;
}

export interface StoryIconMeta {
  id: string;
  number: string;
  nameEn: string;
  nameFa: string;
  descEn: string;
  descFa: string;
  badgeEn: string;
  badgeFa: string;
}

export const STORY_ICONS_CATALOG: StoryIconMeta[] = [
  {
    id: 'rolling-ladder',
    number: '01',
    nameEn: '3-Tier Grand Library & Rolling Ladder',
    nameFa: 'قفسه ۳ طبقه و نردبان ریلی راست‌گرا',
    descEn: 'Three-tier mahogany bookcase with deep shaded leather volumes and a bright golden rolling ladder tilted to the right, gliding on a top brass rail.',
    descFa: 'قفسه چوبی ۳ طبقه با کتاب‌های تیره، مات و شیدگونه، و نردبان چرخ‌دار طلایی درخشان متمایل به راست که روی ریل سر می‌خورد.',
    badgeEn: '3-Tier Rolling Ladder',
    badgeFa: 'قفسه ۳ طبقه و نردبان طلایی',
  },
  {
    id: 'browsing-shelf',
    number: '02',
    nameEn: 'Browsing The Stacks',
    nameFa: 'قفسه عتیقه و انتخاب کتاب',
    descEn: 'Row of deep shaded antique volumes held by a Victorian brass bookend, with one selected volume smoothly sliding forward.',
    descFa: 'ردیف کتاب‌های چرمی تیره و سایه‌دار با نگه‌دارنده برنجی که یک کتاب زرکوب به آرامی از میان قفسه بیرون کشیده شده و بازمی‌گردد.',
    badgeEn: 'Book Selection & Pull',
    badgeFa: 'بیرون آمدن کتاب از قفسه',
  },
];

// ============================================================================
// MODEL 01: THREE-TIER GRAND LIBRARY & RIGHT-TILTED GOLDEN ROLLING LADDER
// (قفسه سه طبقه کتابخانه بزرگ با نردبان طلایی متمایل به راست و رنگ‌های تیره Shade)
// ============================================================================
export function RollingLadderStoryIcon({ isNight, isFa }: StoryIconProps) {
  // Gleaming Bright Gold Ladder that pops boldly against dark shaded volumes
  const activeGold = isNight ? '#FFF083' : '#8f6b00';
  const woodDark = isNight ? '#140f0c' : '#c9b197';
  const metalStroke = isNight ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)';

  // Deep Shaded, Moody, Muted Book Leather Palette (تیره، مات، اصیل و متناسب با تم استیم‌پانک سایت)
  const shadeBurgundy = isNight ? '#380a0a' : '#581c1c';
  const shadeForest = isNight ? '#041f12' : '#06331e';
  const shadeNavy = isNight ? '#081329' : '#0d1f42';
  const shadeUmber = isNight ? '#241004' : '#3d1c07';
  const shadePlum = isNight ? '#1f0933' : '#330f54';
  const shadeCharcoal = isNight ? '#121214' : '#232326';
  const shadeOchre = isNight ? '#2a1a06' : '#452b0a';

  return (
    <div
      className={`relative w-[76px] sm:w-[84px] h-[40px] sm:h-[44px] flex items-center justify-center ${
        isFa ? '' : 'scale-x-[-1]'
      }`}
    >
      <svg
        viewBox="0 0 78 50"
        className="w-full h-full overflow-visible drop-shadow-sm"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Bookshelf Outer Wooden Framework (Three-Tier Grand Cabinet) */}
        <rect x="4" y="3" width="70" height="44" rx="2" fill={woodDark} stroke={metalStroke} strokeWidth="1.3" />
        
        {/* Tier 1 to Tier 2 Shelf Divider (y=17.5) */}
        <line x1="4" y1="17.5" x2="74" y2="17.5" stroke={metalStroke} strokeWidth="1.2" />
        
        {/* Tier 2 to Tier 3 Shelf Divider (y=32) */}
        <line x1="4" y1="32" x2="74" y2="32" stroke={metalStroke} strokeWidth="1.2" />

        {/* Lower Base Shelf Plinth (y=47) */}
        <line x1="2" y1="47" x2="76" y2="47" stroke={metalStroke} strokeWidth="1.6" />

        {/* =================================================================== */}
        {/* 📚 TIER 1 (TOP SHELF): y=6 to y=17.5                                */}
        {/* =================================================================== */}
        <rect x="6" y="6.5" width="5.5" height="11" rx="0.7" fill={shadeBurgundy} stroke={activeGold} strokeWidth="0.6" />
        <line x1="6" y1="9.5" x2="11.5" y2="9.5" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />
        <line x1="6" y1="15" x2="11.5" y2="15" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="12" y="8" width="4.5" height="9.5" rx="0.7" fill={shadeForest} stroke={metalStroke} strokeWidth="0.6" />
        <line x1="12" y1="11" x2="16.5" y2="11" stroke={activeGold} strokeWidth="0.4" opacity="0.7" />

        <rect x="17" y="6" width="6" height="11.5" rx="0.7" fill={shadeNavy} stroke={activeGold} strokeWidth="0.6" />
        <line x1="17" y1="9" x2="23" y2="9" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />
        <line x1="17" y1="14.5" x2="23" y2="14.5" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="23.5" y="7.5" width="5" height="10" rx="0.7" fill={shadeUmber} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="29" y="6.5" width="5.5" height="11" rx="0.7" fill={shadePlum} stroke={activeGold} strokeWidth="0.6" />
        <line x1="29" y1="10" x2="34.5" y2="10" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="35" y="8.5" width="4.5" height="9" rx="0.7" fill={shadeOchre} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="40" y="6" width="5" height="11.5" rx="0.7" fill={shadeCharcoal} stroke={activeGold} strokeWidth="0.6" />
        <line x1="40" y1="9" x2="45" y2="9" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="45.5" y="7.5" width="5.5" height="10" rx="0.7" fill={shadeBurgundy} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="51.5" y="6.5" width="5" height="11" rx="0.7" fill={shadeNavy} stroke={activeGold} strokeWidth="0.6" />
        <rect x="57" y="8" width="5" height="9.5" rx="0.7" fill={shadeForest} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="62.5" y="6" width="5.5" height="11.5" rx="0.7" fill={shadePlum} stroke={activeGold} strokeWidth="0.6" />
        <rect x="68.5" y="7.5" width="4" height="10" rx="0.7" fill={shadeCharcoal} stroke={metalStroke} strokeWidth="0.6" />

        {/* =================================================================== */}
        {/* 📚 TIER 2 (MIDDLE SHELF): y=18.5 to y=32                            */}
        {/* =================================================================== */}
        <rect x="6" y="19" width="6" height="13" rx="0.7" fill={shadeForest} stroke={activeGold} strokeWidth="0.6" />
        <line x1="6" y1="23" x2="12" y2="23" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />
        <line x1="6" y1="29" x2="12" y2="29" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="12.5" y="21" width="4.5" height="11" rx="0.7" fill={shadeUmber} stroke={metalStroke} strokeWidth="0.6" />
        
        <rect x="17.5" y="18.5" width="6.5" height="13.5" rx="0.7" fill={shadeBurgundy} stroke={activeGold} strokeWidth="0.6" />
        <line x1="17.5" y1="22" x2="24" y2="22" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />
        <line x1="17.5" y1="28" x2="24" y2="28" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="24.5" y="20" width="5" height="12" rx="0.7" fill={shadeNavy} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="30" y="19" width="5.5" height="13" rx="0.7" fill={shadePlum} stroke={activeGold} strokeWidth="0.6" />
        <line x1="30" y1="23" x2="35.5" y2="23" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="36" y="21.5" width="4.5" height="10.5" rx="0.7" fill={shadeOchre} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="41" y="19" width="5.5" height="13" rx="0.7" fill={shadeCharcoal} stroke={activeGold} strokeWidth="0.6" />
        <line x1="41" y1="23" x2="46.5" y2="23" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="47" y="20.5" width="5" height="11.5" rx="0.7" fill={shadeForest} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="52.5" y="18.5" width="6" height="13.5" rx="0.7" fill={shadeBurgundy} stroke={activeGold} strokeWidth="0.6" />
        <rect x="59" y="20" width="5" height="12" rx="0.7" fill={shadeNavy} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="64.5" y="19" width="5" height="13" rx="0.7" fill={shadeUmber} stroke={activeGold} strokeWidth="0.6" />

        {/* =================================================================== */}
        {/* 📚 TIER 3 (BOTTOM SHELF): y=33 to y=47                              */}
        {/* =================================================================== */}
        <rect x="6" y="34" width="5.5" height="13" rx="0.7" fill={shadeNavy} stroke={activeGold} strokeWidth="0.6" />
        <line x1="6" y1="38" x2="11.5" y2="38" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />
        <line x1="6" y1="44" x2="11.5" y2="44" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="12" y="36" width="5" height="11" rx="0.7" fill={shadeBurgundy} stroke={metalStroke} strokeWidth="0.6" />
        
        <rect x="17.5" y="33.5" width="6" height="13.5" rx="0.7" fill={shadeForest} stroke={activeGold} strokeWidth="0.6" />
        <line x1="17.5" y1="37" x2="23.5" y2="37" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />
        <line x1="17.5" y1="43" x2="23.5" y2="43" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="24" y="35" width="5" height="12" rx="0.7" fill={shadeCharcoal} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="29.5" y="34" width="5.5" height="13" rx="0.7" fill={shadeUmber} stroke={activeGold} strokeWidth="0.6" />
        <line x1="29.5" y1="38" x2="35" y2="38" stroke={activeGold} strokeWidth="0.5" opacity="0.8" />

        <rect x="35.5" y="36.5" width="4.5" height="10.5" rx="0.7" fill={shadePlum} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="40.5" y="34" width="5.5" height="13" rx="0.7" fill={shadeNavy} stroke={activeGold} strokeWidth="0.6" />
        <rect x="46.5" y="35.5" width="5" height="11.5" rx="0.7" fill={shadeForest} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="52" y="33.5" width="6" height="13.5" rx="0.7" fill={shadeBurgundy} stroke={activeGold} strokeWidth="0.6" />
        <rect x="58.5" y="35" width="5" height="12" rx="0.7" fill={shadeOchre} stroke={metalStroke} strokeWidth="0.6" />
        <rect x="64" y="34" width="5.5" height="13" rx="0.7" fill={shadeCharcoal} stroke={activeGold} strokeWidth="0.6" />

        {/* Polished Brass Ladder Rail with Wall Brackets */}
        <line x1="2" y1="5.5" x2="76" y2="5.5" stroke={activeGold} strokeWidth="1.6" />
        <circle cx="4" cy="5.5" r="1.4" fill={activeGold} />
        <circle cx="28" cy="5.5" r="1.4" fill={activeGold} />
        <circle cx="50" cy="5.5" r="1.4" fill={activeGold} />
        <circle cx="74" cy="5.5" r="1.4" fill={activeGold} />

        {/* 🪜 THE ICONIC GOLDEN ROLLING LADDER */}
        {/* Tilted to the RIGHT (کج شده به سمت راست: بالا در x=11، پایین در x=16.5) */}
        {/* Bright Gleaming Gold: Pops brilliantly against the dark shaded background */}
        <motion.g
          animate={{ x: [0, 24, 24, 0, 0] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
        >
          {/* Top Rail Brass Wheel Mounts */}
          <circle cx="11" cy="5.5" r="1.8" fill={activeGold} stroke="#111" strokeWidth="0.6" />
          <circle cx="18" cy="5.5" r="1.8" fill={activeGold} stroke="#111" strokeWidth="0.6" />

          {/* Ladder Side Rails - TILTED TO THE RIGHT (Top: 11 & 18 -> Bottom: 16.5 & 23.5) */}
          <line x1="11" y1="4.5" x2="16.5" y2="47" stroke={activeGold} strokeWidth="1.7" strokeLinecap="round" />
          <line x1="18" y1="4.5" x2="23.5" y2="47" stroke={activeGold} strokeWidth="1.7" strokeLinecap="round" />

          {/* 7 Step Rungs Spanning all 3 tiers */}
          <line x1="11.7" y1="10.5" x2="18.7" y2="10.5" stroke={activeGold} strokeWidth="1.2" />
          <line x1="12.5" y1="16.5" x2="19.5" y2="16.5" stroke={activeGold} strokeWidth="1.2" />
          <line x1="13.3" y1="22.5" x2="20.3" y2="22.5" stroke={activeGold} strokeWidth="1.2" />
          <line x1="14.1" y1="28.5" x2="21.1" y2="28.5" stroke={activeGold} strokeWidth="1.2" />
          <line x1="14.9" y1="34.5" x2="21.9" y2="34.5" stroke={activeGold} strokeWidth="1.2" />
          <line x1="15.7" y1="40.5" x2="22.7" y2="40.5" stroke={activeGold} strokeWidth="1.2" />
          <line x1="16.3" y1="45" x2="23.3" y2="45" stroke={activeGold} strokeWidth="1.2" />

          {/* Bottom Brass Rolling Castor Wheels */}
          <circle cx="16.5" cy="47" r="1.5" fill={activeGold} stroke="#111" strokeWidth="0.6" />
          <circle cx="23.5" cy="47" r="1.5" fill={activeGold} stroke="#111" strokeWidth="0.6" />
        </motion.g>

        {/* Vintage Top Reading Lamp Hood with subtle golden accent */}
        <path d="M 5 11 Q 1 8 3 4 Q 5 1.5 10 3" fill="none" stroke={activeGold} strokeWidth="1.3" />
        <ellipse cx="10" cy="3.5" rx="2.6" ry="1.5" fill={activeGold} />
      </svg>
    </div>
  );
}

// ============================================================================
// MODEL 02: BROWSING THE STACKS (قفسه کتاب با رنگ‌های تیره Shade و بیرون آمدن کتاب)
// ============================================================================
export function BrowsingShelfStoryIcon({ isNight, isFa }: StoryIconProps) {
  const activeGold = isNight ? '#FFF083' : '#8f6b00';
  const woodDark = isNight ? '#140f0c' : '#c9b197';
  const metalStroke = isNight ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.65)';

  // Deep Shaded Moody Palette
  const shadeBurgundy = isNight ? '#380a0a' : '#581c1c';
  const shadeForest = isNight ? '#041f12' : '#06331e';
  const shadeNavy = isNight ? '#081329' : '#0d1f42';
  const shadeUmber = isNight ? '#241004' : '#3d1c07';
  const shadePlum = isNight ? '#1f0933' : '#330f54';
  const shadeCharcoal = isNight ? '#121214' : '#232326';

  return (
    <div
      className={`relative w-[76px] sm:w-[84px] h-[40px] sm:h-[44px] flex items-center justify-center ${
        isFa ? '' : 'scale-x-[-1]'
      }`}
    >
      <svg
        viewBox="0 0 78 48"
        className="w-full h-full overflow-visible drop-shadow-sm"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Polished Wooden Library Shelf Base */}
        <rect x="4" y="40" width="70" height="5" rx="1.2" fill={woodDark} stroke={metalStroke} strokeWidth="1.3" />
        
        {/* Brass Shelf Catalog Tag Plate */}
        <rect x="31" y="41.5" width="16" height="3.2" rx="0.6" stroke={activeGold} strokeWidth="0.9" fill="#111" />
        <line x1="34" y1="43.1" x2="44" y2="43.1" stroke={activeGold} strokeWidth="0.6" />

        {/* Ornate Victorian Brass Bookend on the right */}
        <path d="M 68 40 L 68 15 Q 68 8 61 8 L 61 40" fill={activeGold} stroke={metalStroke} strokeWidth="1.2" />
        <circle cx="64.5" cy="13" r="1.3" fill="#111" />
        <path d="M 62.5 20 Q 67 25 62.5 30" stroke="#111" strokeWidth="0.8" fill="none" />

        {/* 📚 Books Shelved Together (Deep Shaded Colors) */}
        {/* Book 1 (Leftmost, dark antique calfskin) */}
        <rect x="6" y="17" width="5.5" height="23" rx="0.8" fill={shadeCharcoal} stroke={activeGold} strokeWidth="0.7" />
        <line x1="6" y1="22" x2="11.5" y2="22" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />
        <line x1="6" y1="34" x2="11.5" y2="34" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />

        {/* Book 2 (Deep Hunter Green) */}
        <rect x="12.5" y="14" width="6" height="26" rx="0.8" fill={shadeForest} stroke={metalStroke} strokeWidth="0.7" />
        <line x1="12.5" y1="19" x2="18.5" y2="19" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />

        {/* Book 3 (Dark Oxblood Burgundy) */}
        <rect x="19.5" y="18" width="5" height="22" rx="0.8" fill={shadeBurgundy} stroke={activeGold} strokeWidth="0.7" />
        <line x1="19.5" y1="23" x2="24.5" y2="23" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />

        {/* 📖 THE BROWSING BOOK (Smoothly slides out of shelf as if selected by reader) */}
        <motion.g
          animate={{
            y: [0, -7, -7, 0, 0],
            scale: [1, 1.07, 1.07, 1, 1],
          }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          style={{ transformOrigin: '28px 40px' }}
        >
          {/* Subtle golden halo around selected volume */}
          <rect
            x="25.2"
            y="11.8"
            width="7.8"
            height="28.4"
            rx="1.4"
            fill={activeGold}
            opacity="0.25"
            className="filter blur-[1px]"
          />
          {/* Main Selected Volume (Rich Midnight Navy with Gleaming Gold Spine Ribs) */}
          <rect x="25.5" y="12.2" width="7.2" height="27.8" rx="1.2" fill={shadeNavy} stroke={activeGold} strokeWidth="1.3" />
          
          {/* Spine Title & Gold Ribs */}
          <line x1="25.5" y1="17" x2="32.7" y2="17" stroke={activeGold} strokeWidth="0.9" />
          <line x1="25.5" y1="26" x2="32.7" y2="26" stroke={activeGold} strokeWidth="0.9" />
          <line x1="25.5" y1="34" x2="32.7" y2="34" stroke={activeGold} strokeWidth="0.9" />
          <circle cx="29.1" cy="21.5" r="1.1" fill={activeGold} />

          {/* Crimson Ribbon Bookmark trailing out */}
          <path d="M 29.1 12.2 Q 32 8 35 10" stroke="#e11d48" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Book 5 (Dark Umber / Burnt Leather) */}
        <rect x="34" y="15" width="6" height="25" rx="0.8" fill={shadeUmber} stroke={metalStroke} strokeWidth="0.7" />
        <line x1="34" y1="20" x2="40" y2="20" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />

        {/* Book 6 (Deep Aubergine Plum) */}
        <rect x="41" y="17" width="5.5" height="23" rx="0.8" fill={shadePlum} stroke={activeGold} strokeWidth="0.7" />

        {/* Book 7 (Tilted against the bookend) */}
        <g transform="rotate(11 50 40)">
          <rect x="48.5" y="16" width="6" height="24" rx="0.8" fill={shadeBurgundy} stroke={activeGold} strokeWidth="0.7" />
          <line x1="48.5" y1="21" x2="54.5" y2="21" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />
          <line x1="48.5" y1="31" x2="54.5" y2="31" stroke={activeGold} strokeWidth="0.5" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// MASTER DISPATCHER: StoryArchitecturalIcon
// ============================================================================
export function StoryArchitecturalIcon({
  modelId,
  isNight,
  isFa,
}: {
  modelId: string;
  isNight: boolean;
  isFa: boolean;
}) {
  const currentModel = STORY_ICONS_CATALOG.find((m) => m.id === modelId) || STORY_ICONS_CATALOG[0];

  return (
    <div 
      className="relative flex items-center shrink-0 select-none group"
      title={isFa ? `${currentModel.nameFa} - استودیو جیرجیرک` : `${currentModel.nameEn} - Jirjirak Studio`}
    >
      <div className={`relative h-11 sm:h-[46px] px-2.5 rounded-xl border flex items-center justify-center shrink-0 backdrop-blur-md transition-all duration-300 ${
        isNight
          ? 'bg-neutral-900/80 border-white/10 shadow-[0_0_16px_rgba(255,240,131,0.12)]'
          : 'bg-white/80 border-black/10 shadow-sm'
      }`}>
        {modelId === 'browsing-shelf' ? (
          <BrowsingShelfStoryIcon isNight={isNight} isFa={isFa} />
        ) : (
          <RollingLadderStoryIcon isNight={isNight} isFa={isFa} />
        )}
      </div>
    </div>
  );
}
