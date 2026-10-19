import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';
import { AnimatedJirjirakLogo } from './AnimatedJirjirakLogo';

/**
 * ScreenTransitionCurtain Component
 * 
 * المان‌های طراحی ارتقایافته و متناسب با هویت برند استودیو جیرجیرک:
 * ۱. موشن اصلی و دایره‌ای پرده (clipPath circle spring bounce 0) محفوظ و بدون تغییر.
 * ۲. موشن بال‌های جیرجیرک با ریتم chirp طبیعی با شروع بعد از ۰.۲۵ ثانیه کاملاً حفظ شده است.
 * ۳. مدار دندانه‌دار گردان، رقص نور، هاله تنفسی کرم‌شب‌تاب زرد رنگ کاملاً محفوظ و درخشان هستند.
 * ۴. نوشته‌های اضافی بالای صفحه به طور کامل حذف شدند تا تمرکز خالص روی مرکز صفحه باشد.
 * ۵. شعار بازنویسی شده، عمیق و هوشمندانه:
 *    - انگلیسی: "Where Small Sparks Ignite Grand Constellations." / "Crafting Digital Echoes that Resonate."
 *      -> انتخابی فاخر و هوشمندانه: "Crafting Whispers That Echo Far."
 *    - فارسی: "ظرافت‌های کوچک، طنین‌های ماندگار."
 * ۶. زبان پرده از همان فریم اول باز شدن، زبان مقصد کاربر است:
 *    اگر از فارسی به انگلیسی رفتید، پرده از ابتدا انگلیسی است.
 *    اگر از انگلیسی به فارسی رفتید، پرده از ابتدا فارسی است.
 * ۷. متن‌های بالای نوار پیشرفت (Progress Bar) متناسب با زبان ترجمه شده‌اند:
 *    - در فارسی: «در حال تنظیم مدار» و «خلق دقیق و دست‌ساز»
 *    - در انگلیسی: «CALIBRATING ORBIT» و «100% HANDCRAFTED»
 */
export function ScreenTransitionCurtain() {
  const { transitionPhase, currentLang, transitionLang } = useGlobalStore();

  const isVisible = transitionPhase !== 'idle';
  
  // زبانی که پرده در این لحظه باید نمایش دهد:
  // اگر transitionLang مشخص شده باشد (هنگام تغییر زبان)، بلافاصله از همان فریم اول از آن استفاده می‌کند.
  // در غیر این صورت از currentLang استفاده می‌شود.
  const activeLang = transitionLang || currentLang;
  const isEnglish = activeLang === 'EN';

  // مبدأ باز شدن و بازگشت متقارن به همان مبدأ بر اساس زبان فعال:
  // انگلیسی: بالا-راست (100% 0%)
  // فارسی: بالا-چپ (0% 0%)
  const origin = isEnglish ? "100% 0%" : "0% 0%";

  const isCovered = transitionPhase === 'covering' || transitionPhase === 'paused';

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden">
          <motion.div
            initial={{ clipPath: `circle(0% at ${origin})` }}
            animate={{ 
              clipPath: isCovered 
                ? `circle(160% at ${origin})` 
                : `circle(0% at ${origin})` 
            }}
            transition={{ 
              type: "spring", 
              bounce: 0, 
              duration: 0.8 
            }}
            className="fixed inset-0 z-[9999] bg-[#181818] flex flex-col justify-center items-center px-6 sm:px-12 py-12"
          >
            {/* ۱. بافت و گرید نوری ظریف پس‌زمینه (استودیویی و مکانیکی) */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'radial-gradient(rgba(255, 240, 131, 0.18) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />

            {/* ۲. رقص نور و پرتو گرم زرد رنگ در مرکز (هاله تنفس کرم‌شب‌تاب) */}
            <motion.div 
              animate={{ 
                scale: [1, 1.18, 1],
                opacity: [0.24, 0.36, 0.24]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 pointer-events-none flex justify-center items-center"
            >
              <div className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] bg-[#fff083] rounded-full filter blur-[120px]" />
            </motion.div>

            {/* ۳. بخش مرکزی: لوگوی اصلی جیرجیرک با مدار گردان + تایپوگرافی کینتیک و شعار هوشمندانه */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                opacity: isCovered ? 1 : 0, 
                scale: isCovered ? 1 : 0.95,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center justify-center pointer-events-none my-auto"
            >
              {/* دایره چرخان و مدار دندانه‌دار دور لوگو (حفظ شده دقیقاً طبق درخواست) */}
              <div className="relative flex items-center justify-center p-8 sm:p-12">
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 240 240"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="120"
                    cy="120"
                    r="108"
                    stroke="#fff083"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    opacity="0.25"
                    fill="none"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="92"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="0.75"
                    strokeDasharray="2 6"
                    fill="none"
                  />
                </motion.svg>

                {/* لوگوی زنده و متحرک جیرجیرک (بال‌ها بعد از ۰.۲۵ ثانیه شروع به بال‌زدن می‌کنند) */}
                <div className="relative z-10">
                  <AnimatedJirjirakLogo 
                    className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]" 
                    alwaysAnimate={true} 
                    startDelayMs={250} 
                  />
                </div>
              </div>

              {/* تایپوگرافی کینتیک و باابهت استودیو جیرجیرک */}
              <div className="flex flex-col items-center gap-3 mt-2 sm:mt-3 text-center">
                {/* نام استودیو */}
                <div className="overflow-hidden">
                  <motion.h2
                    key={`title-${activeLang}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans"
                    dir={isEnglish ? 'ltr' : 'rtl'}
                  >
                    {isEnglish ? (
                      <span className="tracking-[0.25em] font-semibold text-white/95">
                        JIRJIRAK <span className="text-[#fff083] font-light">STUDIO</span>
                      </span>
                    ) : (
                      <span className="font-sahel font-bold text-white/95">
                        استودیو <span className="text-[#fff083]">جیرجیرک</span>
                      </span>
                    )}
                  </motion.h2>
                </div>

                {/* خط مدرج تزئینی مرکزی با لوزی طلایی */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-3 w-48 sm:w-64 my-0.5"
                >
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fff083]/40 to-transparent" />
                  <span className="w-1.5 h-1.5 rotate-45 border border-[#fff083]/80 bg-[#fff083]/20" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#fff083]/40 to-transparent" />
                </motion.div>

                {/* شعار هوشمندانه، شاعرانه و عمیق هویت استودیو */}
                <motion.p
                  key={`slogan-${activeLang}`}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
                  className="text-xs sm:text-sm text-[#888c8f] tracking-wide max-w-xs sm:max-w-md font-sans leading-relaxed"
                  dir={isEnglish ? 'ltr' : 'rtl'}
                >
                  {isEnglish 
                    ? "Crafting Whispers That Echo Far." 
                    : "ظرافت‌های کوچک، طنین‌های ماندگار."
                  }
                </motion.p>
              </div>
            </motion.div>

            {/* ۴. نوار پیشرفت و خط زمان انتقال در پایین صفحه (Progress Pulse Track) */}
            <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center gap-2.5 select-none mt-auto pt-4">
              {/* متن بالای progress bar کاملاً دو زبانه و هماهنگ */}
              <div 
                className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-sans tracking-wider"
                dir={isEnglish ? 'ltr' : 'rtl'}
              >
                <span className="text-[#fff083]/85 font-medium">
                  {isEnglish ? 'CALIBRATING ORBIT' : 'در حال تنظیم مدار'}
                </span>
                <span className="text-[#888c8f] opacity-80">
                  {isEnglish ? '100% HANDCRAFTED' : 'خلق دقیق و دست‌ساز'}
                </span>
              </div>
              
              {/* خط سیر نوری ۴ ثانیه‌ای */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  key={`bar-${activeLang}`}
                  initial={{ x: isEnglish ? "-100%" : "100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 3.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fff083] to-white"
                />
              </div>

              {/* نشانگر ریتم صدای جیرجیرک */}
              <div className="flex items-center gap-1 mt-1 opacity-70">
                {[0.15, 0.45, 0.25, 0.85, 0.35, 0.65, 0.25].map((height, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      scaleY: [height, 1, height],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: idx * 0.12,
                      ease: "easeInOut",
                    }}
                    className="w-[2px] h-3 bg-[#fff083] rounded-full origin-bottom"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
