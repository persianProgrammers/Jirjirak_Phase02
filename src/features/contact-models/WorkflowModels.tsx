import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/* =========================================================================
   SHARED WORKFLOW DATA (Jirjirak Chrono Compass)
   ========================================================================= */
export interface WorkflowPhase {
  id: number;
  num: string;
  numFa: string;
  stepNameFa: string;
  stepNameEn: string;
  headlineFa: string;
  headlineEn: string;
  descFa: string;
  descEn: string;
  timeFa: string;
  timeEn: string;
  tagFa: string;
  tagEn: string;
}

export const WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    id: 1,
    num: '01',
    numFa: '۰۱',
    stepNameFa: 'پیام یا تماس',
    stepNameEn: 'First Contact',
    headlineFa: 'فقط یک پیام کافیست',
    headlineEn: 'Just a simple hello',
    descFa: 'نه نیازی به بریف آماده است و نه اسناد اداری؛ فقط در چند کلمه از ایده‌تان برایمان بگویید.',
    descEn: 'No specs or paperwork required—just tell us about your idea in a few words.',
    timeFa: 'کمتر از ۱ دقیقه',
    timeEn: '< 1 min',
    tagFa: 'شروع آسان',
    tagEn: 'Effortless',
  },
  {
    id: 2,
    num: '02',
    numFa: '۰۲',
    stepNameFa: 'تماس و بریف',
    stepNameEn: 'Quick Call',
    headlineFa: 'یک گفتگوی صمیمی ۳۰ دقیقه‌ای',
    headlineEn: 'A focused 30-min chat',
    descFa: 'ظرف ۲۴ ساعت کاری تماس می‌گیریم تا اهداف، سلیقه و مسیر کار را با هم شفاف کنیم.',
    descEn: 'We reach out within 24 business hours to align on your vision and priorities.',
    timeFa: 'ظرف ۲۴ ساعت کاری',
    timeEn: 'Within 24h',
    tagFa: 'شنیدن عمیق',
    tagEn: 'Alignment',
  },
  {
    id: 3,
    num: '03',
    numFa: '۰۳',
    stepNameFa: 'برنامه و بودجه',
    stepNameEn: 'Plan & Budget',
    headlineFa: 'زمان‌بندی و هزینه قطعی',
    headlineEn: 'Clear scope & fixed cost',
    descFa: 'فازبندی شفاف و رقم نهایی با توافق محرمانگی (NDA)؛ بدون هزینه پنهان یا ابهام.',
    descEn: 'Transparent milestones, firm budget, and mutual NDA. Everything is clear from day one.',
    timeFa: '۲ تا ۳ روز کاری',
    timeEn: '2-3 days',
    tagFa: 'شفافیت ۱۰۰٪',
    tagEn: 'Clarity',
  },
  {
    id: 4,
    num: '04',
    numFa: '۰۴',
    stepNameFa: 'ساخت و گزارش',
    stepNameEn: 'Build & Demos',
    headlineFa: 'دموهای زنده مرحله‌به‌مرحله',
    headlineEn: 'Live iterative demos',
    descFa: 'در پایان هر فاز دموی زنده می‌بینید و بازخورد شما بلافاصله در مسیر پروژه اعمال می‌شود.',
    descEn: 'Review live interactive demos at each milestone—your input directly shapes the build.',
    timeFa: 'طبق زمان‌بندی توافقی',
    timeEn: 'Per agreed timeline',
    tagFa: 'تحویل چابک',
    tagEn: 'Iterative',
  },
];

export interface ModelProps {
  isNight: boolean;
  isFa: boolean;
  onScrollToForm: () => void;
}

/* =========================================================================
   MODEL: قطب‌نمای مکانیکی ناوبری (Chrono-Compass)
   ========================================================================= */
export const ChronoCompass = Model1ChronoCompass;
export function Model1ChronoCompass({ isNight, isFa, onScrollToForm }: ModelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WORKFLOW_PHASES[activeIdx];
  // Since Section 2 is inverted: in Night mode background is light, in Day mode background is dark
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 w-full">
      {/* Dial Instrument */}
      <div className="flex flex-col items-center select-none shrink-0">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-500"
            style={{ borderColor: `${accent}40` }}
          />
          <div
            className={`absolute inset-4 rounded-full border transition-colors duration-500 shadow-inner ${
              isSectionDark ? 'bg-[#18181b]/80 border-white/10' : 'bg-white/80 border-black/10'
            }`}
          >
            <svg className="w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            </svg>
          </div>

          {/* Rotating Spring Needle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            animate={{ rotate: activeIdx * 90 }}
            transition={{ type: 'spring', stiffness: 150, damping: 16 }}
          >
            <div className="relative w-1 h-44 sm:h-48 flex flex-col items-center">
              <div
                className="w-3.5 h-3.5 rotate-45 border transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: accent,
                  borderColor: isSectionDark ? '#fff' : '#222',
                  boxShadow: `0 0 14px ${accent}`,
                }}
              />
              <div
                className="w-0.5 h-16 sm:h-20"
                style={{
                  background: `linear-gradient(to bottom, ${accent}, transparent)`,
                }}
              />
            </div>
          </motion.div>

          {/* 4 Cardinal Points */}
          {WORKFLOW_PHASES.map((stage, idx) => {
            const isActive = activeIdx === idx;
            const pos = [
              'top-1 left-1/2 -translate-x-1/2',
              'top-1/2 right-1 -translate-y-1/2',
              'bottom-1 left-1/2 -translate-x-1/2',
              'top-1/2 left-1 -translate-y-1/2',
            ][idx];

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`absolute ${pos} z-20 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold transition-all duration-300 cursor-pointer shadow-md select-none ${
                  isActive
                    ? isSectionDark
                      ? 'bg-[#fff083] text-[#1a1a1a] border-[#fff083] scale-110 shadow-[0_0_20px_rgba(255,240,131,0.6)]'
                      : 'bg-[#8f6b00] text-white border-[#8f6b00] scale-110 shadow-[0_0_16px_rgba(143,107,0,0.4)]'
                    : isSectionDark
                    ? 'bg-[#222]/90 border-white/15 text-neutral-400 hover:text-white'
                    : 'bg-white border-black/15 text-neutral-600 hover:text-black'
                }`}
              >
                {isFa ? stage.numFa : stage.num}
              </button>
            );
          })}

          {/* Center Hub */}
          <button
            type="button"
            onClick={() => setActiveIdx((prev) => (prev + 1) % 4)}
            className={`relative z-20 w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-90 shadow-xl ${
              isSectionDark ? 'bg-neutral-900 border-[#fff083]/40' : 'bg-white border-[#8f6b00]/40'
            }`}
          >
            <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: accent }} />
          </button>
        </div>

        <span className="mt-3 text-[11px] font-mono opacity-60 tracking-wider">
          {isFa ? 'برای چرخش روی مرکز یا نشانگرها کلیک کنید' : 'Click dial or numbers to rotate'}
        </span>
      </div>

      {/* Crystal Readout */}
      <ReadoutPane
        current={current}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        isNight={isNight}
        isFa={isFa}
        onScrollToForm={onScrollToForm}
      />
    </div>
  );
}

/* =========================================================================
   READOUT COMPONENT
   ========================================================================= */
function ReadoutPane({
  current,
  activeIdx,
  setActiveIdx,
  isNight,
  isFa,
  onScrollToForm,
}: {
  current: WorkflowPhase;
  activeIdx: number;
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;
  isNight: boolean;
  isFa: boolean;
  onScrollToForm: () => void;
}) {
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  return (
    <div className="flex-1 w-full lg:max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: isFa ? -12 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isFa ? 12 : -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex flex-col"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-current/10">
            <div className="flex items-center gap-2.5">
              <span
                className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{
                  borderColor: `${accent}60`,
                  backgroundColor: `${accent}15`,
                  color: accent,
                }}
              >
                {isFa ? `فاز ${current.numFa}` : `PHASE ${current.num}`}
              </span>
              <span className="text-xs font-semibold opacity-80">
                {isFa ? current.stepNameFa : current.stepNameEn}
              </span>
            </div>
            <span className="text-xs font-mono opacity-50">{isFa ? current.timeFa : current.timeEn}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {isFa ? current.headlineFa : current.headlineEn}
          </h3>
          <p className="text-sm leading-relaxed opacity-75 mb-8">
            {isFa ? current.descFa : current.descEn}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-current/10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:bg-current/5"
              >
                {isFa ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
              <button
                type="button"
                disabled={activeIdx === WORKFLOW_PHASES.length - 1}
                onClick={() => setActiveIdx((prev) => Math.min(WORKFLOW_PHASES.length - 1, prev + 1))}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  borderColor: accent,
                  backgroundColor: `${accent}15`,
                  color: accent,
                }}
              >
                {isFa ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={onScrollToForm}
              className="text-xs font-bold hover:underline cursor-pointer"
              style={{ color: accent }}
            >
              {isFa ? 'شروع پروژه با استودیو ↑' : 'Start your project ↑'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
