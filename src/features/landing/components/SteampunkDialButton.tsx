import React, { useState } from 'react';
import { motion } from 'motion/react';

interface SteampunkDialButtonProps {
  onClick: () => void;
  title: string;
  subBadge?: string;
  isNight?: boolean;
  tier?: number;
  children: React.ReactNode;
}

/**
 * ⚙️ SteampunkDialButton
 * 
 * کاملاً منطبق با دکمه‌های شب/روز، زبان و گرامافون استودیو جیرجیرک:
 * - دورچین نقطه‌چین و شیار مدرج در حالت عادی ثابت و کم‌رنگ (opacity-35) هستند.
 * - هنگام هاور (Hover) بدون چرخش مداوم فقط روشن‌تر می‌شوند (group-hover:opacity-75).
 * - هنگام کلیک (Click) یا تغییر سطح، با فیزیک فنری دقیق به نرمی کمی به چپ یا راست می‌چرخند (Spins with spring).
 */
export function SteampunkDialButton({
  onClick,
  title,
  isNight = true,
  tier = 0,
  children,
}: SteampunkDialButtonProps) {
  const [clickNudge, setClickNudge] = useState(0);

  // چرخش دقیق چرخ‌دنده بر اساس فاز (هر فاز ۴۵ درجه) بعلاوه حرکت جهشی با کلیک
  const gearRotationAngle = (tier * 45) + (clickNudge * 20);

  const handleClick = () => {
    setClickNudge((prev) => prev + 1);
    onClick();
  };

  const activeGold = isNight ? '#fff083' : '#8f6b00';
  const warmSun = isNight ? '#fff083' : '#8f6b00';

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title}
      className={`relative w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] flex items-center justify-center cursor-pointer group pointer-events-auto rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.5)] overflow-hidden shrink-0 transition-transform duration-300 active:scale-95 border ${
        isNight
          ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-white/10 hover:border-[#fff083]/45 shadow-[0_4px_14px_rgba(0,0,0,0.6)]'
          : 'bg-white/90 backdrop-blur-md border-black/10 hover:border-[#8f6b00]/45 shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* 1. هاله نوری در مرکز (Ambient Celestial Glow) دقیقاً مشابه DayNightToggle */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-700 pointer-events-none"
        style={{
          background: isNight
            ? 'radial-gradient(circle at center, rgba(255,240,131,0.14) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(143,107,0,0.18) 0%, transparent 70%)',
        }}
      />

      {/* 2. دورچین نقطه‌چین و چرخ‌دنده نجومی (دقیقاً کپی ساختار SVG در DayNightToggle) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none w-full h-full p-1"
        style={{ perspective: '800px' }}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full drop-shadow-md overflow-visible"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* چرخ‌دنده دورچین: در حالت عادی کاملاً ثابت و کم‌رنگ؛ موقع کلیک با فنر می‌چرخد */}
          <motion.g
            initial={false}
            animate={{ rotate: gearRotationAngle }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            style={{ transformOrigin: '24px 24px' }}
          >
            {/* خط‌چین چرخ‌دنده‌ای بیرونی: ثابت و کم‌رنگ (opacity-35)، هنگام هاور روشن می‌شود (group-hover:opacity-75) */}
            <circle
              cx="24"
              cy="24"
              r="21"
              stroke={displayGoldColor(isNight, activeGold, warmSun)}
              strokeWidth="1.1"
              strokeDasharray="4 4"
              opacity="0.35"
              className="transition-opacity duration-500 group-hover:opacity-75"
            />

            {/* شیار مدرج داخلی (Degree Marks Track) */}
            <circle
              cx="24"
              cy="24"
              r="18.5"
              stroke={isNight ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
              strokeWidth="0.8"
            />

            {/* پین‌های چهارگانه اسطرلاب (4 Cardinal Astrolabe Pins) */}
            <circle
              cx="24"
              cy="4.5"
              r="0.8"
              fill={activeGold}
              opacity="0.6"
              className="transition-opacity duration-500 group-hover:opacity-90"
            />
            <circle
              cx="43.5"
              cy="24"
              r="0.8"
              fill={activeGold}
              opacity="0.6"
              className="transition-opacity duration-500 group-hover:opacity-90"
            />
            <circle
              cx="24"
              cy="43.5"
              r="0.8"
              fill={activeGold}
              opacity="0.6"
              className="transition-opacity duration-500 group-hover:opacity-90"
            />
            <circle
              cx="4.5"
              cy="24"
              r="0.8"
              fill={activeGold}
              opacity="0.6"
              className="transition-opacity duration-500 group-hover:opacity-90"
            />
          </motion.g>
        </svg>
      </div>

      {/* 3. محتوای آیکون مرکزی (Central Kinetic Icon) */}
      <div className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] flex items-center justify-center pointer-events-none relative z-10">
        {children}
      </div>
    </button>
  );
}

function displayGoldColor(isNight: boolean, activeGold: string, warmSun: string) {
  return isNight ? activeGold : warmSun;
}
