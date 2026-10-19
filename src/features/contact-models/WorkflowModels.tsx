import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Ship, Compass, Sparkles, MapPin, Flag, Star } from 'lucide-react';

/* =========================================================================
   SHARED WORKFLOW DATA (Concise, authentic Jirjirak tone)
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
   MODEL 1: قطب‌نمای مکانیکی ناوبری (Chrono-Compass) - PRESERVED AS REQUESTED
   ========================================================================= */
export function Model1ChronoCompass({ isNight, isFa, onScrollToForm }: ModelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WORKFLOW_PHASES[activeIdx];
  // Since Section 2 is inverted: in Night mode background is light, in Day mode background is dark!
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
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
   MODEL 10: لامپ‌های نیکسی رترو (Nixie Tubes) - PRESERVED AS REQUESTED
   ========================================================================= */
export function Model10NixieTubes({ isNight, isFa, onScrollToForm }: ModelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WORKFLOW_PHASES[activeIdx];
  const isSectionDark = !isNight;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col items-center gap-10">
        {/* 4 Glass Tubes */}
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {WORKFLOW_PHASES.map((stage, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className="group flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
              >
                {/* Glass Dome */}
                <div
                  className={`w-14 sm:w-16 h-24 sm:h-28 rounded-t-full border-2 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 shadow-xl ${
                    isActive
                      ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)]'
                      : isSectionDark
                      ? 'bg-neutral-900/60 border-white/10 hover:border-amber-500/40'
                      : 'bg-neutral-200/70 border-black/10 hover:border-amber-600/40'
                  }`}
                >
                  {/* Internal Grid Mesh */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent" />
                  {/* Glowing Wire Number */}
                  <span
                    className={`font-mono text-2xl sm:text-3xl font-black transition-all ${
                      isActive
                        ? 'text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,1)]'
                        : 'text-amber-800/40'
                    }`}
                  >
                    {isFa ? stage.numFa : stage.num}
                  </span>
                </div>
                {/* Tube Socket Base */}
                <div
                  className={`w-14 sm:w-16 h-3 rounded-b-md border-t mt-1 ${
                    isSectionDark ? 'bg-neutral-700 border-black/40' : 'bg-neutral-300 border-black/20'
                  }`}
                />
                <span
                  className={`text-[11px] mt-2 font-bold transition-colors ${
                    isActive ? 'text-amber-500' : 'opacity-50'
                  }`}
                >
                  {isFa ? stage.stepNameFa : stage.stepNameEn}
                </span>
              </button>
            );
          })}
        </div>

        <ReadoutSummary current={current} isNight={isNight} isFa={isFa} onScrollToForm={onScrollToForm} />
      </div>
    </div>
  );
}

/* =========================================================================
   NEW MODEL A: «نقشه گنج مجمع‌الجزایر» (Archipelago Pirate Treasure Map)
   Fun animated dotted sailing route, pirate ship token, island waypoints,
   and X marks the spot for final delivery!
   ========================================================================= */
export function ModelTreasureIsland({ isNight, isFa, onScrollToForm }: ModelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WORKFLOW_PHASES[activeIdx];
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  // Coordinates on 800x320 SVG canvas for 4 treasure islands
  const WAYPOINTS = [
    { x: 110, y: 220, islandFa: 'بندرگاه پیام', islandEn: 'Port of Signal', icon: '✉️' },
    { x: 310, y: 90, islandFa: 'تنگه همفکری', islandEn: 'Briefing Cove', icon: '🧭' },
    { x: 520, y: 230, islandFa: 'جزیره ساخت', islandEn: 'Forge Isle', icon: '⚙️' },
    { x: 700, y: 100, islandFa: 'گنجینه نهایی', islandEn: 'Treasure Bay', icon: '🏆' },
  ];

  // SVG curved path connecting the 4 islands
  const mapPath = 'M 110 220 C 190 220, 230 90, 310 90 C 390 90, 440 230, 520 230 C 600 230, 630 100, 700 100';

  const activeCoord = WAYPOINTS[activeIdx];

  return (
    <div className="flex flex-col items-center w-full">
      {/* 🗺️ Pirate Treasure Map Board */}
      <div
        className={`w-full rounded-2xl p-4 sm:p-6 lg:p-8 border relative overflow-hidden transition-all duration-500 shadow-xl ${
          isSectionDark
            ? 'bg-[#141418] border-white/10 text-brand-light'
            : 'bg-[#f7f4ea] border-[#d8d1bc] text-brand-dark'
        }`}
      >
        {/* Parchment Topo & Watermark Decor */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="seaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 20 Q 10 16 20 20 T 40 20" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#seaGrid)" />
          </svg>
        </div>

        {/* Vintage Map Compass Rose in top corner */}
        <div className="absolute top-4 start-4 sm:top-6 sm:start-6 opacity-30 pointer-events-none">
          <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center">
            <Compass className="w-full h-full" style={{ color: accent }} />
            <span className="absolute top-0 text-[9px] font-mono font-bold">N</span>
          </div>
        </div>

        {/* Map Header Banner */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 border-b pb-3 border-current/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">🗺️</span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold tracking-wider">
                {isFa ? 'نقشه گنج همکاری؛ مسیر ما تا تحویل نهایی' : 'Expedition Route: From First Ping to Treasure'}
              </h4>
              <p className="text-[10px] opacity-60">
                {isFa ? 'روی هر جزیره کلیک کنید تا کشتی استودیو حرکت کند' : 'Click any island to navigate the studio ship'}
              </p>
            </div>
          </div>
          <div
            className="px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold"
            style={{ borderColor: `${accent}60`, color: accent }}
          >
            {isFa ? `جزیره ${activeIdx + 1} از ۴` : `Island ${activeIdx + 1} of 4`}
          </div>
        </div>

        {/* Interactive Nautical Canvas */}
        <div className="relative w-full aspect-[8/3.8] min-h-[220px] sm:min-h-[260px] max-h-[340px]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 320">
            {/* Sea wave ripples */}
            <g opacity="0.25" stroke="currentColor" strokeWidth="1" fill="none">
              <path d="M 180 160 Q 195 152 210 160 T 240 160" />
              <path d="M 400 70 Q 415 62 430 70 T 460 70" />
              <path d="M 580 180 Q 595 172 610 180 T 640 180" />
              <path d="M 80 80 Q 95 72 110 80 T 140 80" />
            </g>

            {/* Inactive Dashed Background Trail */}
            <path
              d={mapPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              opacity="0.2"
            />

            {/* Active Marching Dotted Trail (animated strokeDashoffset) */}
            <path
              d={mapPath}
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
              strokeDasharray="8 8"
              strokeLinecap="round"
              className="animate-[dashMove_2s_linear_infinite]"
              style={{
                filter: `drop-shadow(0 0 6px ${accent}80)`,
              }}
            />

            {/* X Marks the Spot at Destination */}
            <g transform="translate(700, 100)">
              <line x1="-12" y1="-12" x2="12" y2="12" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              <line x1="12" y1="-12" x2="-12" y2="12" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            </g>

            {/* 4 Island Milestone Buttons */}
            {WAYPOINTS.map((pt, idx) => {
              const isPassed = activeIdx >= idx;
              const isCurrent = activeIdx === idx;
              const phase = WORKFLOW_PHASES[idx];

              return (
                <g
                  key={idx}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  onClick={() => setActiveIdx(idx)}
                  className="cursor-pointer group"
                >
                  {/* Island Landmass Contour */}
                  <path
                    d="M -30 0 C -28 -22, 28 -24, 32 0 C 34 22, -26 24, -30 0 Z"
                    fill={isCurrent ? `${accent}25` : isSectionDark ? '#27272a' : '#eae5d7'}
                    stroke={isCurrent ? accent : 'currentColor'}
                    strokeWidth={isCurrent ? 2 : 1}
                    opacity={isPassed ? 1 : 0.6}
                    className="transition-all duration-300 group-hover:scale-110"
                    style={{ transformOrigin: '0 0' }}
                  />

                  {/* Island Pulse ring if active */}
                  {isCurrent && (
                    <circle
                      cx="0"
                      cy="0"
                      r="26"
                      fill="none"
                      stroke={accent}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                  )}

                  {/* Island Pin & Icon */}
                  <circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill={isCurrent ? accent : isSectionDark ? '#18181b' : '#ffffff'}
                    stroke={isCurrent ? '#ffffff' : 'currentColor'}
                    strokeWidth="1.5"
                    className="shadow-md"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill={isCurrent ? (isSectionDark ? '#1a1a1a' : '#ffffff') : 'currentColor'}
                    className="select-none font-mono"
                  >
                    {isFa ? phase.numFa : phase.num}
                  </text>

                  {/* Island Label Badge */}
                  <g transform="translate(0, 32)">
                    <rect
                      x="-55"
                      y="-12"
                      width="110"
                      height="22"
                      rx="11"
                      fill={isSectionDark ? '#18181b' : '#ffffff'}
                      stroke={isCurrent ? accent : 'currentColor'}
                      strokeWidth={isCurrent ? 1.5 : 0.6}
                      opacity={isCurrent ? 1 : 0.75}
                      className="shadow-sm"
                    />
                    <text
                      x="0"
                      y="2"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight={isCurrent ? 'bold' : 'normal'}
                      fill={isCurrent ? accent : 'currentColor'}
                      className="select-none"
                    >
                      {isFa ? pt.islandFa : pt.islandEn}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* ⛵ The Animated Expedition Pirate Ship Traversing The Map */}
            <motion.g
              animate={{ x: activeCoord.x, y: activeCoord.y - 18 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              className="pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
            >
              {/* Ship Wake Ripples */}
              <circle cx="0" cy="14" r="16" fill={accent} opacity="0.2" className="animate-ping" />
              {/* Ship Emblem Frame */}
              <rect
                x="-16"
                y="-14"
                width="32"
                height="28"
                rx="6"
                fill={isSectionDark ? '#222' : '#ffffff'}
                stroke={accent}
                strokeWidth="2"
              />
              <text x="0" y="5" textAnchor="middle" fontSize="16" className="select-none">
                ⛵
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Step controls & reassurance */}
        <div className="mt-4 pt-4 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:bg-current/5"
            >
              {isFa ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isFa ? 'جزیره قبلی' : 'Previous Island'}</span>
            </button>
            <button
              type="button"
              disabled={activeIdx === WAYPOINTS.length - 1}
              onClick={() => setActiveIdx((prev) => Math.min(WAYPOINTS.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              style={{ borderColor: accent, backgroundColor: `${accent}15`, color: accent }}
            >
              <span>{isFa ? 'جزیره بعدی' : 'Next Island'}</span>
              {isFa ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>

          <span className="text-xs font-mono opacity-65">
            {isFa ? 'زمان‌بندی: ' + current.timeFa : 'Timeline: ' + current.timeEn}
          </span>
        </div>
      </div>

      {/* Narrative Card Readout for the current Island */}
      <div className="w-full mt-6">
        <ReadoutSummary current={current} isNight={isNight} isFa={isFa} onScrollToForm={onScrollToForm} />
      </div>
    </div>
  );
}

/* =========================================================================
   NEW MODEL B: «رول نقشه توپوگرافی مهندسی و ماجراجویی» (Architectural Topo Trail)
   Topographic contour curves, dotted trail with waypoint surveyor flags,
   and moving surveyor rover token!
   ========================================================================= */
export function ModelTopoExpedition({ isNight, isFa, onScrollToForm }: ModelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WORKFLOW_PHASES[activeIdx];
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  const CAMPS = [
    { x: 90, y: 150, campFa: 'کمپ اصلی ۰۱ (سیگنال)', campEn: 'Basecamp 01' },
    { x: 280, y: 70, campFa: 'ایستگاه ۰۲ (بریف)', campEn: 'Station 02' },
    { x: 490, y: 170, campFa: 'یال صعود ۰۳ (تولید)', campEn: 'Ridge 03' },
    { x: 710, y: 80, campFa: 'قله ۰۴ (تحویل)', campEn: 'Summit 04' },
  ];

  const trailPath = 'M 90 150 Q 180 30 280 70 T 490 170 T 710 80';
  const activeCoord = CAMPS[activeIdx];

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`w-full rounded-2xl p-4 sm:p-6 lg:p-8 border relative overflow-hidden transition-all duration-500 shadow-xl ${
          isSectionDark
            ? 'bg-[#15171c] border-white/10 text-brand-light'
            : 'bg-[#faf9f4] border-black/10 text-brand-dark'
        }`}
      >
        {/* Topo elevation contour lines background */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 240" fill="none" stroke="currentColor">
            <path d="M -50 80 C 150 20, 250 180, 500 120 S 750 20, 850 100" strokeWidth="1.5" />
            <path d="M -50 120 C 150 60, 250 220, 500 160 S 750 60, 850 140" strokeWidth="1" />
            <path d="M -50 160 C 150 100, 250 260, 500 200 S 750 100, 850 180" strokeWidth="1" />
            <path d="M -50 40 C 150 -20, 250 140, 500 80 S 750 -20, 850 60" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-current/10">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4" style={{ color: accent }} />
            <span className="text-xs sm:text-sm font-bold tracking-wider">
              {isFa ? 'نقشه توپوگرافی صعود پروژه؛ گام‌های شفاف تا قله' : 'Architectural Elevation Route'}
            </span>
          </div>
          <span className="text-[11px] font-mono opacity-60">
            {isFa ? 'پیمایش زنده مسیر' : 'Live Traversal'}
          </span>
        </div>

        {/* Trail SVG */}
        <div className="relative w-full aspect-[8/2.8] min-h-[190px] sm:min-h-[220px]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240">
            {/* Elevation guides */}
            <line x1="40" y1="200" x2="760" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" />
            <line x1="40" y1="120" x2="760" y2="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" />
            <line x1="40" y1="50" x2="760" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" />

            {/* Inactive Dashed Base Path */}
            <path
              d={trailPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.25"
            />

            {/* Glowing Dotted Trail with Marching Animation */}
            <path
              d={trailPath}
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              className="animate-[dashMove_2s_linear_infinite]"
              style={{ filter: `drop-shadow(0 0 8px ${accent}80)` }}
            />

            {/* 4 Camp Stations */}
            {CAMPS.map((camp, idx) => {
              const isCurrent = activeIdx === idx;
              const phase = WORKFLOW_PHASES[idx];

              return (
                <g
                  key={idx}
                  transform={`translate(${camp.x}, ${camp.y})`}
                  onClick={() => setActiveIdx(idx)}
                  className="cursor-pointer group"
                >
                  {/* Outer Radar Pulse if active */}
                  {isCurrent && (
                    <circle
                      cx="0"
                      cy="0"
                      r="20"
                      fill="none"
                      stroke={accent}
                      strokeWidth="1.5"
                      className="animate-ping"
                      opacity="0.4"
                    />
                  )}

                  {/* Pin Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r="10"
                    fill={isCurrent ? accent : isSectionDark ? '#27272a' : '#ffffff'}
                    stroke={isCurrent ? '#ffffff' : 'currentColor'}
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-125"
                  />

                  {/* Number inside pin */}
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill={isCurrent ? (isSectionDark ? '#1a1a1a' : '#ffffff') : 'currentColor'}
                    className="select-none font-mono"
                  >
                    {isFa ? phase.numFa : phase.num}
                  </text>

                  {/* Camp Badge */}
                  <g transform="translate(0, 24)">
                    <rect
                      x="-55"
                      y="-10"
                      width="110"
                      height="20"
                      rx="4"
                      fill={isSectionDark ? '#1a1a1e' : '#ffffff'}
                      stroke={isCurrent ? accent : 'currentColor'}
                      strokeWidth={isCurrent ? 1.5 : 0.5}
                      opacity={isCurrent ? 1 : 0.75}
                      className="shadow-sm"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight={isCurrent ? 'bold' : 'normal'}
                      fill={isCurrent ? accent : 'currentColor'}
                      className="select-none"
                    >
                      {isFa ? camp.campFa : camp.campEn}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Moving Surveyor Token */}
            <motion.g
              animate={{ x: activeCoord.x, y: activeCoord.y - 14 }}
              transition={{ type: 'spring', stiffness: 140, damping: 15 }}
              className="pointer-events-none"
            >
              <circle cx="0" cy="0" r="14" fill={accent} className="shadow-lg" />
              <text x="0" y="4" textAnchor="middle" fontSize="12" className="select-none">
                🚩
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Bottom controls */}
        <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {CAMPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`w-7 h-7 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeIdx === i
                    ? 'scale-110 shadow-md'
                    : 'opacity-50 hover:opacity-100'
                }`}
                style={{
                  borderColor: activeIdx === i ? accent : 'currentColor',
                  backgroundColor: activeIdx === i ? accent : 'transparent',
                  color: activeIdx === i ? (isSectionDark ? '#1a1a1a' : '#ffffff') : 'currentColor',
                }}
              >
                {isFa ? `۰${i + 1}` : `0${i + 1}`}
              </button>
            ))}
          </div>
          <span className="font-mono opacity-60">{current.timeFa}</span>
        </div>
      </div>

      <div className="w-full mt-6">
        <ReadoutSummary current={current} isNight={isNight} isFa={isFa} onScrollToForm={onScrollToForm} />
      </div>
    </div>
  );
}

/* =========================================================================
   NEW MODEL C: «نقشه آسمانی و صور فلکی نقطه‌چین» (Celestial Constellation Route)
   Star clusters connected by glowing dotted cosmic rays, with traveling starlight probe!
   ========================================================================= */
export function ModelCelestialStarmap({ isNight, isFa, onScrollToForm }: ModelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = WORKFLOW_PHASES[activeIdx];
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  const STARS = [
    { x: 100, y: 160, starFa: 'نجم الاول (سیگنال)', starEn: 'Stella Alpha' },
    { x: 290, y: 60, starFa: 'سحابی بریف (دیدار)', starEn: 'Nebula Beta' },
    { x: 510, y: 190, starFa: 'مدار ساخت (اسپرینت)', starEn: 'Orbital Gamma' },
    { x: 700, y: 80, starFa: 'سوپرنووای تحویل (گنج)', starEn: 'Nova Delta' },
  ];

  const starPath = 'M 100 160 L 290 60 L 510 190 L 700 80';
  const activeCoord = STARS[activeIdx];

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`w-full rounded-2xl p-4 sm:p-6 lg:p-8 border relative overflow-hidden transition-all duration-500 shadow-2xl ${
          isSectionDark
            ? 'bg-[#0f1118] border-white/10 text-brand-light'
            : 'bg-[#f4f3ec] border-black/10 text-brand-dark'
        }`}
      >
        {/* Stellar Dust Ambient Glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: accent }}
        />

        {/* Starmap Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-current/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: accent }} />
            <span className="text-xs sm:text-sm font-bold tracking-wider">
              {isFa ? 'نقشه کهکشانی همکاری؛ مسیر نقطه‌چین صور فلکی' : 'Celestial Constellation Pathway'}
            </span>
          </div>
          <span className="text-[11px] font-mono opacity-60">
            {isFa ? 'صورت فلکی جیرجیرک' : 'Jirjirak Constellation'}
          </span>
        </div>

        {/* Constellation Canvas */}
        <div className="relative w-full aspect-[8/2.8] min-h-[190px] sm:min-h-[220px]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240">
            {/* Ambient background micro-stars */}
            <circle cx="150" cy="40" r="1.5" fill="currentColor" opacity="0.3" />
            <circle cx="220" cy="180" r="1" fill="currentColor" opacity="0.2" />
            <circle cx="390" cy="120" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="440" cy="30" r="1" fill="currentColor" opacity="0.2" />
            <circle cx="620" cy="190" r="1.5" fill="currentColor" opacity="0.3" />
            <circle cx="660" cy="40" r="1" fill="currentColor" opacity="0.2" />

            {/* Dotted Constellation Line Base */}
            <path
              d={starPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.2"
            />

            {/* Glowing Dotted Constellation Line */}
            <path
              d={starPath}
              fill="none"
              stroke={accent}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-[dashMove_2s_linear_infinite]"
              style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
            />

            {/* 4 Constellation Stars */}
            {STARS.map((star, idx) => {
              const isCurrent = activeIdx === idx;
              const phase = WORKFLOW_PHASES[idx];

              return (
                <g
                  key={idx}
                  transform={`translate(${star.x}, ${star.y})`}
                  onClick={() => setActiveIdx(idx)}
                  className="cursor-pointer group"
                >
                  {/* Halo */}
                  {isCurrent && (
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill={accent}
                      opacity="0.2"
                      className="animate-pulse"
                    />
                  )}

                  {/* 4-point star cross */}
                  <path
                    d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z"
                    fill={isCurrent ? accent : isSectionDark ? '#ffffff' : '#222222'}
                    className="transition-transform group-hover:scale-150"
                    style={{ filter: isCurrent ? `drop-shadow(0 0 8px ${accent})` : 'none' }}
                  />

                  {/* Star Tag */}
                  <g transform="translate(0, 24)">
                    <rect
                      x="-55"
                      y="-10"
                      width="110"
                      height="20"
                      rx="10"
                      fill={isSectionDark ? '#1a1d26' : '#ffffff'}
                      stroke={isCurrent ? accent : 'currentColor'}
                      strokeWidth={isCurrent ? 1.5 : 0.5}
                      opacity={isCurrent ? 1 : 0.7}
                      className="shadow-sm"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight={isCurrent ? 'bold' : 'normal'}
                      fill={isCurrent ? accent : 'currentColor'}
                      className="select-none font-mono"
                    >
                      {isFa ? star.starFa : star.starEn}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Moving Starlight Probe */}
            <motion.g
              animate={{ x: activeCoord.x, y: activeCoord.y }}
              transition={{ type: 'spring', stiffness: 130, damping: 15 }}
              className="pointer-events-none"
            >
              <circle cx="0" cy="0" r="16" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 3" className="animate-spin" />
              <circle cx="0" cy="0" r="6" fill="#ffffff" style={{ filter: `drop-shadow(0 0 10px ${accent})` }} />
            </motion.g>
          </svg>
        </div>

        {/* Quick Click Steps */}
        <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {STARS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                className="px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold transition-all cursor-pointer"
                style={{
                  borderColor: activeIdx === i ? accent : 'currentColor',
                  backgroundColor: activeIdx === i ? `${accent}20` : 'transparent',
                  color: activeIdx === i ? accent : 'currentColor',
                }}
              >
                {isFa ? `ستاره ۰${i + 1}` : `Star 0${i + 1}`}
              </button>
            ))}
          </div>
          <span className="font-mono opacity-60">{current.timeFa}</span>
        </div>
      </div>

      <div className="w-full mt-6">
        <ReadoutSummary current={current} isNight={isNight} isFa={isFa} onScrollToForm={onScrollToForm} />
      </div>
    </div>
  );
}

/* =========================================================================
   REUSABLE READOUT COMPONENTS
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

function ReadoutSummary({
  current,
  isNight,
  isFa,
  onScrollToForm,
}: {
  current: WorkflowPhase;
  isNight: boolean;
  isFa: boolean;
  onScrollToForm: () => void;
}) {
  const isSectionDark = !isNight;
  const accent = isSectionDark ? '#fff083' : '#8f6b00';

  return (
    <div className="pt-4 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-lg mb-1">{isFa ? current.headlineFa : current.headlineEn}</h3>
        <p className="text-xs opacity-75 max-w-lg">{isFa ? current.descFa : current.descEn}</p>
      </div>
      <button
        type="button"
        onClick={onScrollToForm}
        className="text-xs font-bold shrink-0 hover:underline cursor-pointer"
        style={{ color: accent }}
      >
        {isFa ? 'شروع پروژه ↑' : 'Start ↑'}
      </button>
    </div>
  );
}
