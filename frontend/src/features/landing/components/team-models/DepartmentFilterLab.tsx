import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DepartmentCategory, DEPARTMENTS_LIST, ALL_TEAM_MEMBERS } from './teamData';
import {
  Sparkles,
  Layers,
  Terminal,
  FolderOpen,
  Cpu,
  Bookmark,
  Sliders,
  Compass,
  Palette,
  CheckCircle2,
  Radio,
  ChevronDown,
  Code,
  Crown,
  TrendingUp,
  Gamepad2,
  Lightbulb,
  Disc,
  Clock,
  Minimize2,
  SlidersHorizontal,
  Film,
  GitBranch,
  Gauge,
  Tag,
  Boxes,
} from 'lucide-react';

/* =========================================================================
   LOGICAL DEPARTMENT GROUPING (Categorization into 4 Clean Clusters)
   ========================================================================= */
export interface DepartmentGroup {
  id: string;
  nameEn: string;
  nameFa: string;
  icon: any;
  deptKeys: DepartmentCategory[];
}

export const DEPARTMENT_GROUPS: DepartmentGroup[] = [
  {
    id: 'core',
    nameEn: 'Core & Leadership',
    nameFa: 'هسته و رهبری',
    icon: Crown,
    deptKeys: ['leadership'],
  },
  {
    id: 'tech',
    nameEn: 'Tech & Interactive',
    nameFa: 'فنی و بازی‌سازی',
    icon: Code,
    deptKeys: ['web-dev', 'game-interactive'],
  },
  {
    id: 'studio',
    nameEn: 'Design & Visual Arts',
    nameFa: 'دیزاین و گرافیک',
    icon: Palette,
    deptKeys: ['branding-identity', 'creative-studio'],
  },
  {
    id: 'growth',
    nameEn: 'Growth & Academy',
    nameFa: 'مارکتینگ و آموزش',
    icon: TrendingUp,
    deptKeys: ['seo-analytics', 'digital-marketing', 'academy-hub'],
  },
];

export function findGroupForDept(deptKey: DepartmentCategory): DepartmentGroup {
  return DEPARTMENT_GROUPS.find((g) => g.deptKeys.includes(deptKey)) || DEPARTMENT_GROUPS[0];
}

export function getDepartmentIcon(deptKey: DepartmentCategory) {
  switch (deptKey) {
    case 'leadership':
      return Crown;
    case 'web-dev':
      return Code;
    case 'seo-analytics':
      return TrendingUp;
    case 'branding-identity':
    case 'creative-studio':
      return Palette;
    case 'digital-marketing':
      return TrendingUp;
    case 'game-interactive':
      return Gamepad2;
    case 'academy-hub':
      return Lightbulb;
    default:
      return Sparkles;
  }
}

export type FilterStyleId =
  // ── 5 PRESERVED MODELS (مورد ۶، ۹، ۱۳، ۱۵، ۱۶) ──
  | 'case-files' // 06
  | 'swiss-index' // 09
  | 'micro-icon-strip' // 13
  | 'split-flap-retro' // 15
  | 'morse-rail' // 16
  // ── 15 NEW COMPACT & GROUPED MODELS ──
  | 'hierarchical-cluster-pills' // 01
  | 'cascading-dual-segment' // 02
  | 'matrix-compact-grid' // 03
  | 'grouped-steampunk-bezel' // 04
  | 'cinema-slate-groups' // 05
  | 'tree-branch-terminal' // 07
  | 'pocket-slide-rule' // 08
  | 'cassette-tape-tracks' // 10
  | 'floating-pill-command-dock' // 11
  | 'accordion-ribbon-compact' // 12
  | 'grouped-frequency-dial' // 14
  | 'compact-pill-drawer' // 17
  | 'rotary-selector-switch' // 18
  | 'split-capsule-scroller' // 19
  | 'segmented-grouped-matrix'; // 20

export interface FilterStyleMeta {
  id: FilterStyleId;
  number: string;
  nameEn: string;
  nameFa: string;
  categoryEn: string;
  categoryFa: string;
  isPreserved: boolean;
  icon: any;
}

export const FILTER_STYLES: FilterStyleMeta[] = [
  // 01: NEW
  {
    id: 'hierarchical-cluster-pills',
    number: '01',
    nameEn: 'Hierarchical Cluster Pills',
    nameFa: 'کپسول خوشه‌ای دو سطحی (گروه + زیرشاخه)',
    categoryEn: 'Grouped Cascading Pills',
    categoryFa: 'دسته‌بندی خوشه‌ای فشرده',
    isPreserved: false,
    icon: Boxes,
  },
  // 02: NEW
  {
    id: 'cascading-dual-segment',
    number: '02',
    nameEn: 'Cascading Dual Segment',
    nameFa: 'نوار دوقلوی گروه و دپارتمان',
    categoryEn: 'Dual-Selector Bar',
    categoryFa: 'نوار باریک دوگانه',
    isPreserved: false,
    icon: SlidersHorizontal,
  },
  // 03: NEW
  {
    id: 'matrix-compact-grid',
    number: '03',
    nameEn: 'Compact 2x4 Matrix Grid',
    nameFa: 'ماتریس مینیاتوری ۲×۴ مهندسی',
    categoryEn: 'Micro Tile Grid',
    categoryFa: 'شبکه فشرده ۲×۴ مینی',
    isPreserved: false,
    icon: Layers,
  },
  // 04: NEW
  {
    id: 'grouped-steampunk-bezel',
    number: '04',
    nameEn: 'Grouped Bezel Gauge',
    nameFa: 'بزل چرخشی ۴ گانه ساعت مکانیکی',
    categoryEn: '4-Quadrant Dial',
    categoryFa: 'صفحه ۴ ناحیه‌ای مکانیکی',
    isPreserved: false,
    icon: Clock,
  },
  // 05: NEW
  {
    id: 'cinema-slate-groups',
    number: '05',
    nameEn: 'Film Slate Grouped Bar',
    nameFa: 'کلاکت سینمایی مینیاتوری دسته‌بندی‌شده',
    categoryEn: 'Cinema Scene Clapper',
    categoryFa: 'کلاکت جمع‌وجور استودیو',
    isPreserved: false,
    icon: Film,
  },
  // 06: ⭐ PRESERVED
  {
    id: 'case-files',
    number: '06',
    nameEn: 'Detective Case Folders',
    nameFa: 'پوشه‌های کارآگاهی مانیلا',
    categoryEn: 'Vintage Case Files',
    categoryFa: 'پرونده‌های وینتیج (حفظ‌شده)',
    isPreserved: true,
    icon: FolderOpen,
  },
  // 07: NEW
  {
    id: 'tree-branch-terminal',
    number: '07',
    nameEn: 'Tree Branch CLI Bar',
    nameFa: 'مسیر درختی یونیکس (Path Terminal)',
    categoryEn: 'Command Path Navigator',
    categoryFa: 'ترمینال شاخه‌ای فشرده',
    isPreserved: false,
    icon: GitBranch,
  },
  // 08: NEW
  {
    id: 'pocket-slide-rule',
    number: '08',
    nameEn: 'Pocket Slide-Rule Rail',
    nameFa: 'خط‌کش لغزان جیبی مهندسی',
    categoryEn: 'Analog Sliding Hairline',
    categoryFa: 'خط‌کش کشویی باریک',
    isPreserved: false,
    icon: Sliders,
  },
  // 09: ⭐ PRESERVED
  {
    id: 'swiss-index',
    number: '09',
    nameEn: 'Swiss Typographic Index',
    nameFa: 'ایندکس حروف‌چینی سوئیسی',
    categoryEn: 'Giant Numbers & Monolith',
    categoryFa: 'اعداد بزرگ سوئیسی (حفظ‌شده)',
    isPreserved: true,
    icon: CheckCircle2,
  },
  // 10: NEW
  {
    id: 'cassette-tape-tracks',
    number: '10',
    nameEn: 'Cassette Tape Tracks (Side A/B)',
    nameFa: 'نوار کاست صوتی (ساید A و B)',
    categoryEn: 'Retro Dual-Track Strip',
    categoryFa: 'نوار کاست دودسته',
    isPreserved: false,
    icon: Disc,
  },
  // 11: NEW
  {
    id: 'floating-pill-command-dock',
    number: '11',
    nameEn: 'Compact Cluster Command Dock',
    nameFa: 'داک فرمان شناور با آیکون‌های خوشه‌ای',
    categoryEn: 'Floating Action Pill',
    categoryFa: 'کپسول شناور بدون اشغال فضا',
    isPreserved: false,
    icon: Minimize2,
  },
  // 12: NEW
  {
    id: 'accordion-ribbon-compact',
    number: '12',
    nameEn: 'Compact Accordion Ribbon',
    nameFa: 'روبان فشرده پلیسه‌ای (Horizontal Ribbon)',
    categoryEn: 'Sliding Micro Ribbon',
    categoryFa: 'روبان تاشو جمع‌وجور',
    isPreserved: false,
    icon: Bookmark,
  },
  // 13: ⭐ PRESERVED
  {
    id: 'micro-icon-strip',
    number: '13',
    nameEn: 'Micro Icon Expand Strip',
    nameFa: 'نوار آیکون‌های مینیاتوری شناور',
    categoryEn: 'Icon Only + Hover Expand',
    categoryFa: 'آیکون‌های مینی با بازشو نرم (حفظ‌شده)',
    isPreserved: true,
    icon: Sparkles,
  },
  // 14: NEW
  {
    id: 'grouped-frequency-dial',
    number: '14',
    nameEn: 'Grouped Radio Tuner Band',
    nameFa: 'تیونر رادیویی چندبانده (AM/FM Groups)',
    categoryEn: 'Multi-Band Radio Ticker',
    categoryFa: 'تیونر فرکانس چندبانده',
    isPreserved: false,
    icon: Radio,
  },
  // 15: ⭐ PRESERVED
  {
    id: 'split-flap-retro',
    number: '15',
    nameEn: 'Split-Flap Airport Indicator',
    nameFa: 'نمایشگر فلیپ تک‌ردیفه مکانیکی',
    categoryEn: 'Retro Stepper Bar',
    categoryFa: 'استپر رترو فلیپ تک‌ردیفه (حفظ‌شده)',
    isPreserved: true,
    icon: Cpu,
  },
  // 16: ⭐ PRESERVED
  {
    id: 'morse-rail',
    number: '16',
    nameEn: 'Morse Code Micro Baseline',
    nameFa: 'خط فنی نودهای مورس',
    categoryEn: 'Interactive Minimal Nodes',
    categoryFa: 'نودهای مینیاتوری روی خط (حفظ‌شده)',
    isPreserved: true,
    icon: CheckCircle2,
  },
  // 17: NEW
  {
    id: 'compact-pill-drawer',
    number: '17',
    nameEn: 'Single Active Chip + Slider Drawer',
    nameFa: 'تک‌چیپ گروهی با کشوی افقی شناور',
    categoryEn: 'Slide Drawer Over Teams',
    categoryFa: 'کشوی افقی سریع',
    isPreserved: false,
    icon: Tag,
  },
  // 18: NEW
  {
    id: 'rotary-selector-switch',
    number: '18',
    nameEn: 'Industrial 4-Way Rotary Switch',
    nameFa: 'سلکتور صنعتی ۴حالته با زیرشاخه‌ها',
    categoryEn: 'Rotary Switch Console',
    categoryFa: 'کلید گردان صنعتی',
    isPreserved: false,
    icon: Gauge,
  },
  // 19: NEW
  {
    id: 'split-capsule-scroller',
    number: '19',
    nameEn: 'Split Capsule Cluster Stepper',
    nameFa: 'کپسول دوقلو با شماره‌گیر خوشه‌ای',
    categoryEn: 'Connected Micro Stepper',
    categoryFa: 'استپر دوقلوی فشرده',
    isPreserved: false,
    icon: Compass,
  },
  // 20: NEW
  {
    id: 'segmented-grouped-matrix',
    number: '20',
    nameEn: 'Color-Coded Cluster Micro Bar',
    nameFa: 'نوار باریک یکپارچه با کد رنگی دسته‌ها',
    categoryEn: 'Unified Dense Matrix',
    categoryFa: 'نوار کدرنگی خوشه‌ای',
    isPreserved: false,
    icon: Terminal,
  },
];

interface FilterLabProps {
  selectedDept: DepartmentCategory;
  onSelectDept: (dept: DepartmentCategory) => void;
  isNight: boolean;
  isFa: boolean;
}

export function DepartmentFilterLab({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  // Saved active filter model state
  const [activeStyle, setActiveStyle] = useState<FilterStyleId>(() => {
    try {
      const saved = localStorage.getItem('jirjirak_about_filter_style');
      if (saved && FILTER_STYLES.some((s) => s.id === saved)) {
        return saved as FilterStyleId;
      }
    } catch {}
    return 'hierarchical-cluster-pills';
  });

  const handleSelectStyle = (id: FilterStyleId) => {
    setActiveStyle(id);
    try {
      localStorage.setItem('jirjirak_about_filter_style', id);
    } catch {}
  };

  const currentMeta = FILTER_STYLES.find((s) => s.id === activeStyle) || FILTER_STYLES[0];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 🧪 THE 20-STYLE FILTER LAB SWITCHER CONTROL PANEL */}
      <div
        className={`w-full rounded-2xl p-3.5 sm:p-4 border transition-colors duration-500 ${
          isNight
            ? 'bg-white border-neutral-300 text-brand-dark shadow-md'
            : 'bg-brand-surface border-brand-surface-light text-brand-light shadow-xl'
        }`}
      >
        {/* Header Summary */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b ${
            isNight ? 'border-neutral-200' : 'border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                currentMeta.isPreserved
                  ? isNight
                    ? 'bg-[#b3a85c] text-white'
                    : 'bg-brand-yellow text-brand-dark'
                  : isNight
                  ? 'bg-brand-dark text-white'
                  : 'bg-white/15 text-white border border-white/20'
              }`}
            >
              {currentMeta.number}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  {isFa ? 'آزمایشگاه انتخاب فیلتر (دسته‌بندی‌شده و فشرده)' : 'Grouped & Compact Filter Lab'}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                    currentMeta.isPreserved
                      ? isNight
                        ? 'bg-[#b3a85c]/15 text-[#b3a85c] border-[#b3a85c]/30'
                        : 'bg-brand-yellow/15 text-brand-yellow border-brand-yellow/30'
                      : isNight
                      ? 'bg-neutral-100 text-brand-dark border-neutral-300'
                      : 'bg-white/10 text-brand-light border-white/15'
                  }`}
                >
                  {currentMeta.isPreserved
                    ? isFa
                      ? '★ مدل حفظ‌شده'
                      : '★ Preserved'
                    : isFa
                    ? '✨ جدید کم‌جا و خوشه‌ای'
                    : '✨ New Compact Grouped'}
                </span>
              </div>
              <p
                className={`text-[11px] font-medium ${
                  isNight ? 'text-neutral-600' : 'text-brand-gray'
                }`}
              >
                {isFa
                  ? `سبک فعال: مدل ${currentMeta.number} - ${currentMeta.nameFa} (${currentMeta.categoryFa})`
                  : `Active: ${currentMeta.number} • ${currentMeta.nameEn} (${currentMeta.categoryEn})`}
              </p>
            </div>
          </div>

          <div
            className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
              isNight
                ? 'bg-neutral-50 border-neutral-300 text-neutral-700'
                : 'bg-black/30 border-white/10 text-brand-light/80'
            }`}
          >
            <span className={isNight ? 'text-[#b3a85c] font-bold' : 'text-brand-yellow font-bold'}>
              ★ ۶، ۹، ۱۳، ۱۵، ۱۶
            </span>
            <span className="opacity-70"> | ۱۵ مدل جدید خوشه‌ای</span>
          </div>
        </div>

        {/* 20 BUTTONS GRID */}
        <div className="flex flex-col gap-2.5 pt-3">
          
          {/* ROW 1: PRESERVED 5 FAVORITES (06, 09, 13, 15, 16) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                  isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
                }`}
              >
                <span>★</span>
                {isFa ? '۵ مدل انتخابی شما (حفظ‌شده: ۶، ۹، ۱۳، ۱۵، ۱۶)' : 'Your 5 Kept Favorites (06, 09, 13, 15, 16)'}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {FILTER_STYLES.filter((s) => s.isPreserved).map((style) => {
                const isCurrent = activeStyle === style.id;
                const Icon = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => handleSelectStyle(style.id)}
                    title={`${style.number}: ${isFa ? style.nameFa : style.nameEn}`}
                    className={`group relative py-2 px-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer border ${
                      isCurrent
                        ? isNight
                          ? 'bg-[#b3a85c] text-white border-[#b3a85c] font-bold shadow-md scale-[1.02]'
                          : 'bg-brand-yellow text-brand-dark border-brand-yellow font-bold shadow-md scale-[1.02]'
                        : isNight
                        ? 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-[#b3a85c]/40 hover:border-[#b3a85c]'
                        : 'bg-white/5 hover:bg-white/10 text-brand-light/90 border-brand-yellow/30 hover:border-brand-yellow'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-mono font-bold">مدل {style.number}</span>
                    <span className="text-[10px] truncate hidden md:inline opacity-90">
                      {isFa ? style.nameFa.split(' ')[0] : style.nameEn.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ROW 2: 15 NEW COMPACT & GROUPED MODELS */}
          <div className={`pt-2 border-t ${isNight ? 'border-neutral-200' : 'border-white/10'}`}>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                  isNight ? 'text-brand-dark' : 'text-brand-light'
                }`}
              >
                <Minimize2 className="w-2.5 h-2.5" />
                {isFa ? '۱۵ مدل کاملاً جدید: دسته‌بندی‌شده، کم‌جا و خوشه‌ای' : '15 Brand New Models: Compact, Grouped & Minimal'}
              </span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                  isNight
                    ? 'text-neutral-700 bg-neutral-100 border-neutral-300'
                    : 'text-brand-gray bg-white/5 border-white/10'
                }`}
              >
                {isFa ? 'طراحی هماهنگ با تم سایت' : 'Brand Matched'}
              </span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-1.5">
              {FILTER_STYLES.filter((s) => !s.isPreserved).map((style) => {
                const isCurrent = activeStyle === style.id;
                const Icon = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => handleSelectStyle(style.id)}
                    title={`${style.number}: ${isFa ? style.nameFa : style.nameEn}`}
                    className={`group relative py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 cursor-pointer border ${
                      isCurrent
                        ? isNight
                          ? 'bg-brand-dark text-white border-brand-dark font-bold shadow-md scale-[1.04]'
                          : 'bg-white text-brand-dark border-white font-bold shadow-md scale-[1.04]'
                        : isNight
                        ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300 hover:border-neutral-400'
                        : 'bg-white/5 hover:bg-white/10 text-brand-light/75 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="text-[10px] font-mono font-bold">{style.number}</span>
                    <span className="text-[7.5px] truncate max-w-full px-0.5 opacity-90 hidden lg:block">
                      {isFa ? style.nameFa.split(' ')[0] : style.nameEn.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 🎨 THE RENDERED ACTIVE FILTER STYLE (01 TO 20) */}
      <div className="w-full">
        {/* ── 5 PRESERVED MODELS ── */}
        {activeStyle === 'case-files' && (
          <StyleCaseFiles
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'swiss-index' && (
          <StyleSwissIndex
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'micro-icon-strip' && (
          <StyleMicroIconStrip
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'split-flap-retro' && (
          <StyleSplitFlapRetro
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'morse-rail' && (
          <StyleMorseRail
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}

        {/* ── 15 NEW COMPACT & GROUPED MODELS ── */}
        {activeStyle === 'hierarchical-cluster-pills' && (
          <StyleHierarchicalClusterPills
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'cascading-dual-segment' && (
          <StyleCascadingDualSegment
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'matrix-compact-grid' && (
          <StyleMatrixCompactGrid
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'grouped-steampunk-bezel' && (
          <StyleGroupedSteampunkBezel
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'cinema-slate-groups' && (
          <StyleCinemaSlateGroups
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'tree-branch-terminal' && (
          <StyleTreeBranchTerminal
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'pocket-slide-rule' && (
          <StylePocketSlideRule
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'cassette-tape-tracks' && (
          <StyleCassetteTapeTracks
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'floating-pill-command-dock' && (
          <StyleFloatingPillCommandDock
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'accordion-ribbon-compact' && (
          <StyleAccordionRibbonCompact
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'grouped-frequency-dial' && (
          <StyleGroupedFrequencyDial
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'compact-pill-drawer' && (
          <StyleCompactPillDrawer
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'rotary-selector-switch' && (
          <StyleRotarySelectorSwitch
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'split-capsule-scroller' && (
          <StyleSplitCapsuleScroller
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
        {activeStyle === 'segmented-grouped-matrix' && (
          <StyleSegmentedGroupedMatrix
            selectedDept={selectedDept}
            onSelectDept={onSelectDept}
            isNight={isNight}
            isFa={isFa}
          />
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   ⭐ PRESERVED MODEL 06: DETECTIVE MANILA CASE FOLDERS (Vintage Stamped Tabs)
   ========================================================================= */
function StyleCaseFiles({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  return (
    <div
      className={`w-full flex flex-wrap items-end gap-1.5 border-b-2 pt-2 transition-colors duration-500 ${
        isNight ? 'border-neutral-400' : 'border-brand-surface-light'
      }`}
    >
      {DEPARTMENTS_LIST.map((dept, idx) => {
        const isSelected = selectedDept === dept.key;
        const count = ALL_TEAM_MEMBERS.filter((m) => m.department === dept.key).length;
        const fileNum = `CASE_${String(idx + 1).padStart(2, '0')}`;

        return (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className={`group relative px-3.5 py-2 rounded-t-xl text-xs font-mono transition-all cursor-pointer border-t border-x ${
              isSelected
                ? isNight
                  ? 'bg-white text-brand-dark border-[#b3a85c] shadow-md font-bold -mb-[2px] pb-2.5'
                  : 'bg-brand-surface text-brand-yellow border-brand-yellow/60 shadow-lg font-bold -mb-[2px] pb-2.5'
                : isNight
                ? 'bg-neutral-200/80 text-neutral-700 border-neutral-300 hover:bg-neutral-100 hover:text-black'
                : 'bg-black/40 text-brand-gray border-white/10 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] uppercase tracking-widest opacity-60">📁 {fileNum}</span>
              <span className="font-sans font-bold text-xs">{isFa ? dept.nameFa : dept.nameEn}</span>
              <span
                className={`text-[10px] px-1 rounded ${
                  isNight ? 'bg-neutral-200 text-neutral-800' : 'bg-white/10 text-brand-light'
                }`}
              >
                x{count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   ⭐ PRESERVED MODEL 09: SWISS TYPOGRAPHIC INDEX (Giant Indices & Monolith)
   ========================================================================= */
function StyleSwissIndex({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  return (
    <div className="w-full flex flex-wrap items-center gap-2">
      {DEPARTMENTS_LIST.map((dept, idx) => {
        const isSelected = selectedDept === dept.key;
        const count = ALL_TEAM_MEMBERS.filter((m) => m.department === dept.key).length;
        const number = String(idx + 1).padStart(2, '0');

        return (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className={`group relative p-2 sm:px-2.5 sm:py-2 rounded-lg transition-all cursor-pointer flex items-baseline gap-1.5 border ${
              isSelected
                ? isNight
                  ? 'bg-brand-dark text-white border-brand-dark font-bold shadow-md'
                  : 'bg-brand-yellow text-brand-dark border-brand-yellow font-bold shadow-md'
                : isNight
                ? 'bg-white text-brand-dark border-neutral-300 hover:border-brand-dark shadow-sm'
                : 'bg-brand-surface border-white/10 text-brand-light/80 hover:border-white/30'
            }`}
          >
            <span
              className={`text-base font-black font-mono leading-none tracking-tighter ${
                isSelected
                  ? isNight
                    ? 'text-[#b3a85c]'
                    : 'text-brand-dark'
                  : isNight
                  ? 'text-neutral-500'
                  : 'text-brand-yellow'
              }`}
            >
              {number}
            </span>
            <span className="text-xs font-semibold">{isFa ? dept.nameFa : dept.nameEn}</span>
            <span className="text-[9px] font-mono opacity-50">/ {count}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   ⭐ PRESERVED MODEL 13: MICRO ICON STRIP (Icons Only with Smart Hover Expand)
   ========================================================================= */
function StyleMicroIconStrip({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  return (
    <div
      className={`inline-flex items-center p-1.5 rounded-2xl border shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {DEPARTMENTS_LIST.map((dept) => {
        const isSelected = selectedDept === dept.key;
        const count = ALL_TEAM_MEMBERS.filter((m) => m.department === dept.key).length;
        const Icon = getDepartmentIcon(dept.key);

        return (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className={`group relative h-9 px-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              isSelected
                ? isNight
                  ? 'bg-[#b3a85c] text-white font-bold shadow-sm'
                  : 'bg-brand-yellow text-brand-dark font-bold shadow-sm'
                : isNight
                ? 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                : 'text-brand-gray hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />

            {isSelected && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="text-xs font-bold whitespace-nowrap overflow-hidden"
              >
                {isFa ? dept.nameFa : dept.nameEn}
              </motion.span>
            )}

            <span
              className={`text-[9px] font-mono px-1 rounded-full ${
                isSelected
                  ? isNight
                    ? 'bg-white/20 text-white'
                    : 'bg-black/20 text-brand-dark'
                  : 'opacity-50'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   ⭐ PRESERVED MODEL 15: SPLIT-FLAP AIRPORT RETRO INDICATOR (Single Row Stepper)
   ========================================================================= */
function StyleSplitFlapRetro({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentIndex = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);
  const activeDept = DEPARTMENTS_LIST[currentIndex] || DEPARTMENTS_LIST[0];
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === activeDept.key).length;

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + DEPARTMENTS_LIST.length) % DEPARTMENTS_LIST.length;
    onSelectDept(DEPARTMENTS_LIST[nextIdx].key);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % DEPARTMENTS_LIST.length;
    onSelectDept(DEPARTMENTS_LIST[nextIdx].key);
  };

  return (
    <div
      className={`w-full max-w-lg mx-auto p-1.5 rounded-xl border flex items-center justify-between gap-3 shadow-inner transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark shadow-sm'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      <div className="flex items-center gap-2 px-2">
        <span
          className={`text-[10px] font-mono font-bold tracking-wider ${
            isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
          }`}
        >
          DEP_SYS//0{currentIndex + 1}
        </span>
        <span className={isNight ? 'text-neutral-400' : 'text-neutral-600'}>|</span>
        <span className="text-xs sm:text-sm font-bold font-mono">
          {isFa ? activeDept.nameFa : activeDept.nameEn}
        </span>
        <span
          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            isNight ? 'bg-neutral-100 text-neutral-700' : 'bg-white/10 text-brand-light'
          }`}
        >
          {count} PAX
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handlePrev}
          className={`p-1.5 rounded transition-colors cursor-pointer text-xs ${
            isNight
              ? 'bg-neutral-100 hover:bg-neutral-200 text-brand-dark border border-neutral-300'
              : 'bg-brand-surface-light hover:bg-white/15 text-brand-light'
          }`}
        >
          ▲
        </button>
        <button
          onClick={handleNext}
          className={`p-1.5 rounded transition-colors cursor-pointer text-xs ${
            isNight
              ? 'bg-neutral-100 hover:bg-neutral-200 text-brand-dark border border-neutral-300'
              : 'bg-brand-surface-light hover:bg-white/15 text-brand-light'
          }`}
        >
          ▼
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   ⭐ PRESERVED MODEL 16: MORSE CODE MICRO BASELINE (Ultra-Thin Technical Nodes)
   ========================================================================= */
function StyleMorseRail({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentIndex = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);
  const activeDept = DEPARTMENTS_LIST[currentIndex] || DEPARTMENTS_LIST[0];
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === activeDept.key).length;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full h-6 flex items-center justify-between px-2">
        <div
          className={`absolute inset-x-2 h-[1px] top-1/2 -translate-y-1/2 ${
            isNight ? 'bg-neutral-300' : 'bg-white/20'
          }`}
        />

        {DEPARTMENTS_LIST.map((d, i) => {
          const isSelected = d.key === selectedDept;
          return (
            <button
              key={d.key}
              onClick={() => onSelectDept(d.key)}
              className="relative z-10 p-2 cursor-pointer focus:outline-none group flex flex-col items-center"
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all ${
                  isSelected
                    ? isNight
                      ? 'bg-[#b3a85c] border-brand-dark scale-125 shadow-[0_0_8px_#b3a85c]'
                      : 'bg-brand-yellow border-white scale-125 shadow-[0_0_10px_#fff083]'
                    : isNight
                    ? 'bg-white border-neutral-400 group-hover:border-brand-dark'
                    : 'bg-brand-dark border-brand-gray group-hover:border-white'
                }`}
              />
              <span
                className={`text-[9px] font-mono mt-1 ${
                  isNight ? 'text-neutral-500' : 'text-brand-gray'
                }`}
              >
                0{i + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-sm ${isNight ? 'text-brand-dark' : 'text-white'}`}>
            {isFa ? activeDept.nameFa : activeDept.nameEn}
          </span>
          <span className={`text-[10px] ${isNight ? 'text-neutral-500' : 'text-brand-gray'}`}>
            ({count} نفر)
          </span>
        </div>
        <span
          className={`text-[10px] font-mono uppercase ${
            isNight ? 'text-neutral-500' : 'text-brand-gray'
          }`}
        >
          NODE 0{currentIndex + 1} / 0{DEPARTMENTS_LIST.length}
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 01: HIERARCHICAL CLUSTER PILLS (Two-tier Cluster + Sub-pills)
   ========================================================================= */
function StyleHierarchicalClusterPills({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const [activeGroupId, setActiveGroupId] = useState(currentGroup.id);

  const handleGroupClick = (group: DepartmentGroup) => {
    setActiveGroupId(group.id);
    if (!group.deptKeys.includes(selectedDept)) {
      onSelectDept(group.deptKeys[0]);
    }
  };

  const activeGroup = DEPARTMENT_GROUPS.find((g) => g.id === activeGroupId) || DEPARTMENT_GROUPS[0];

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Tier 1: 4 Compact Cluster Tabs */}
      <div
        className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border ${
          isNight ? 'bg-white border-neutral-300' : 'bg-brand-surface border-brand-surface-light'
        }`}
      >
        {DEPARTMENT_GROUPS.map((group) => {
          const isGroupActive = activeGroup.id === group.id;
          const GroupIcon = group.icon;
          return (
            <button
              key={group.id}
              onClick={() => handleGroupClick(group)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isGroupActive
                  ? isNight
                    ? 'bg-[#b3a85c] text-white shadow-sm'
                    : 'bg-brand-yellow text-brand-dark shadow-sm'
                  : isNight
                  ? 'text-neutral-600 hover:text-brand-dark hover:bg-neutral-100'
                  : 'text-brand-gray hover:text-white hover:bg-white/5'
              }`}
            >
              <GroupIcon className="w-3.5 h-3.5" />
              <span>{isFa ? group.nameFa : group.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Tier 2: Sub-departments belonging to active cluster (Single row) */}
      <div className="flex items-center gap-2 px-1">
        <span
          className={`text-[10px] font-mono uppercase ${
            isNight ? 'text-neutral-500' : 'text-brand-gray'
          }`}
        >
          {isFa ? 'دپارتمان‌های شاخه:' : 'Sub-departments:'}
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {activeGroup.deptKeys.map((deptKey) => {
            const dept = DEPARTMENTS_LIST.find((d) => d.key === deptKey)!;
            const isSelected = selectedDept === deptKey;
            const count = ALL_TEAM_MEMBERS.filter((m) => m.department === deptKey).length;

            return (
              <button
                key={deptKey}
                onClick={() => onSelectDept(deptKey)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? isNight
                      ? 'border-[#b3a85c] text-[#b3a85c] bg-[#b3a85c]/10 font-bold'
                      : 'border-brand-yellow text-brand-yellow bg-brand-yellow/10 font-bold'
                    : isNight
                    ? 'border-neutral-300 text-neutral-700 hover:border-brand-dark hover:text-black'
                    : 'border-white/10 text-brand-light/75 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{isFa ? dept.nameFa : dept.nameEn}</span>
                <span className="text-[9px] font-mono opacity-60">[{count}]</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 02: CASCADING DUAL SEGMENT (Unified 36px Dual-Selector Bar)
   ========================================================================= */
function StyleCascadingDualSegment({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === selectedDept).length;
  const groupIdx = DEPARTMENT_GROUPS.findIndex((g) => g.id === currentGroup.id);

  const cycleGroup = () => {
    const nextGroup = DEPARTMENT_GROUPS[(groupIdx + 1) % DEPARTMENT_GROUPS.length];
    onSelectDept(nextGroup.deptKeys[0]);
  };

  const cycleDeptInGroup = () => {
    const siblingKeys = currentGroup.deptKeys;
    const currentInGroupIdx = siblingKeys.indexOf(selectedDept);
    const nextKey = siblingKeys[(currentInGroupIdx + 1) % siblingKeys.length];
    onSelectDept(nextKey);
  };

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-xl border flex items-center divide-x rtl:divide-x-reverse text-xs shadow-sm overflow-hidden transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 divide-neutral-200 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light divide-white/10 text-brand-light'
      }`}
    >
      {/* Left side: Cluster Cycler */}
      <button
        onClick={cycleGroup}
        className={`px-3.5 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
          isNight ? 'hover:bg-neutral-100' : 'hover:bg-white/5'
        }`}
        title="کلیک برای تعویض گروه اصلی"
      >
        <currentGroup.icon
          className={`w-3.5 h-3.5 ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}
        />
        <span className="font-bold">{isFa ? currentGroup.nameFa : currentGroup.nameEn}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {/* Right side: Department Sub-item Cycler */}
      <div className="flex-1 px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-[10px] font-mono opacity-50 uppercase">SUB:</span>
          <span className="font-bold truncate">{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
          <span
            className={`text-[10px] font-mono px-1 rounded ${
              isNight ? 'bg-neutral-100 text-neutral-700' : 'bg-white/10 text-brand-light'
            }`}
          >
            {count}
          </span>
        </div>

        <button
          onClick={cycleDeptInGroup}
          className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
            isNight
              ? 'bg-[#b3a85c] text-white hover:bg-[#b3a85c]/90'
              : 'bg-brand-yellow text-brand-dark hover:bg-brand-yellow/90'
          }`}
        >
          {isFa ? 'بعدی ↵' : 'Next ↵'}
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 03: MATRIX COMPACT GRID (2x4 Strict Hairline Architecture)
   ========================================================================= */
function StyleMatrixCompactGrid({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  return (
    <div
      className={`w-full max-w-2xl mx-auto grid grid-cols-4 grid-rows-2 rounded-xl border overflow-hidden divide-x rtl:divide-x-reverse divide-y text-xs transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 divide-neutral-200 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light divide-white/10 text-brand-light'
      }`}
    >
      {DEPARTMENTS_LIST.map((dept, i) => {
        const isSelected = selectedDept === dept.key;
        const count = ALL_TEAM_MEMBERS.filter((m) => m.department === dept.key).length;

        return (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className={`p-2 flex items-center justify-between gap-1 transition-colors cursor-pointer ${
              isSelected
                ? isNight
                  ? 'bg-[#b3a85c] text-white font-bold'
                  : 'bg-brand-yellow text-brand-dark font-bold'
                : isNight
                ? 'hover:bg-neutral-100 text-neutral-800'
                : 'hover:bg-white/5 text-brand-light/80'
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-[9px] font-mono opacity-60">0{i + 1}</span>
              <span className="truncate text-[11px] font-semibold">
                {isFa ? dept.nameFa : dept.nameEn}
              </span>
            </div>
            <span className="text-[9px] font-mono opacity-50 shrink-0">x{count}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 04: GROUPED STEAMPUNK BEZEL (4-Quadrant Dial Ring)
   ========================================================================= */
function StyleGroupedSteampunkBezel({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === selectedDept).length;
  const groupIdx = DEPARTMENT_GROUPS.findIndex((g) => g.id === currentGroup.id);

  return (
    <div
      className={`w-full max-w-lg mx-auto p-2 rounded-2xl border flex items-center gap-3 shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {/* 4-Sector Rotating Bezel Disk */}
      <div className="relative w-10 h-10 rounded-full border-2 border-dashed border-current opacity-80 flex items-center justify-center shrink-0">
        <motion.div
          animate={{ rotate: groupIdx * 90 }}
          transition={{ type: 'spring', stiffness: 320, damping: 25 }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <div
            className={`w-1.5 h-4 rounded-full -translate-y-2.5 ${
              isNight ? 'bg-[#b3a85c] shadow-[0_0_6px_#b3a85c]' : 'bg-brand-yellow shadow-[0_0_8px_#fff083]'
            }`}
          />
        </motion.div>
        <span className="text-[9px] font-mono font-bold">Q{groupIdx + 1}</span>
      </div>

      {/* Sector Name & Sub-dept buttons */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] opacity-60 uppercase">
            {isFa ? currentGroup.nameFa : currentGroup.nameEn}
          </span>
          <span className="font-bold text-[11px]">{count} نفر</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {currentGroup.deptKeys.map((k) => {
            const d = DEPARTMENTS_LIST.find((item) => item.key === k)!;
            const isSel = selectedDept === k;
            return (
              <button
                key={k}
                onClick={() => onSelectDept(k)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer border ${
                  isSel
                    ? isNight
                      ? 'bg-[#b3a85c] text-white border-[#b3a85c] font-bold'
                      : 'bg-brand-yellow text-brand-dark border-brand-yellow font-bold'
                    : isNight
                    ? 'border-neutral-300 text-neutral-700 hover:border-brand-dark'
                    : 'border-white/10 text-brand-light/75 hover:border-white/30'
                }`}
              >
                {isFa ? d.nameFa : d.nameEn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 05: CINEMA SLATE GROUPS (Film Slate Grouped Clapper Bar)
   ========================================================================= */
function StyleCinemaSlateGroups({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === selectedDept).length;
  const deptIdx = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);

  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-xl border overflow-hidden font-mono text-xs shadow-md transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {/* Top Clapper Chevron Stripes */}
      <div
        className={`h-2 w-full opacity-80 ${
          isNight
            ? 'bg-[repeating-linear-gradient(45deg,#222,#222_8px,#eee_8px,#eee_16px)]'
            : 'bg-[repeating-linear-gradient(45deg,#fff,#fff_8px,#222_8px,#222_16px)]'
        }`}
      />

      <div className="p-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
              isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark'
            }`}
          >
            SCENE 0{deptIdx + 1}
          </span>
          <span className="text-[10px] opacity-60">[{currentGroup.nameEn.split(' ')[0]}]</span>
          <span className="font-sans font-bold text-xs sm:text-sm">
            {isFa ? activeDept.nameFa : activeDept.nameEn}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] opacity-75 mr-1">{count} CAST</span>
          <button
            onClick={() => {
              const prev = (deptIdx - 1 + DEPARTMENTS_LIST.length) % DEPARTMENTS_LIST.length;
              onSelectDept(DEPARTMENTS_LIST[prev].key);
            }}
            className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer text-xs ${
              isNight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-brand-dark border border-neutral-300'
                : 'bg-brand-surface-light hover:bg-white/15 text-brand-light'
            }`}
          >
            ‹
          </button>
          <button
            onClick={() => {
              const next = (deptIdx + 1) % DEPARTMENTS_LIST.length;
              onSelectDept(DEPARTMENTS_LIST[next].key);
            }}
            className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer text-xs ${
              isNight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-brand-dark border border-neutral-300'
                : 'bg-brand-surface-light hover:bg-white/15 text-brand-light'
            }`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 07: TREE BRANCH CLI BAR (UNIX Command Path Navigator)
   ========================================================================= */
function StyleTreeBranchTerminal({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === selectedDept).length;

  return (
    <div
      className={`w-full max-w-xl mx-auto px-3 py-2 rounded-xl border font-mono text-xs flex items-center justify-between gap-2 shadow-inner transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      <div className="flex items-center gap-1.5 truncate">
        <span className={isNight ? 'text-neutral-500' : 'text-brand-gray'}>~/atelier/</span>
        <button
          onClick={() => {
            const nextG = DEPARTMENT_GROUPS[(DEPARTMENT_GROUPS.findIndex((g) => g.id === currentGroup.id) + 1) % DEPARTMENT_GROUPS.length];
            onSelectDept(nextG.deptKeys[0]);
          }}
          className={`font-bold hover:underline cursor-pointer ${
            isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
          }`}
        >
          {currentGroup.id}
        </button>
        <span className={isNight ? 'text-neutral-500' : 'text-brand-gray'}>/</span>
        <span className="font-bold truncate">{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] opacity-60">({count} obj)</span>
        <button
          onClick={() => {
            const currentIdx = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);
            onSelectDept(DEPARTMENTS_LIST[(currentIdx + 1) % DEPARTMENTS_LIST.length].key);
          }}
          className={`px-2 py-0.5 rounded text-[10px] cursor-pointer font-bold ${
            isNight
              ? 'bg-[#b3a85c]/15 text-[#b3a85c] border border-[#b3a85c]/30'
              : 'bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30'
          }`}
        >
          next ↵
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 08: POCKET SLIDE-RULE RAIL (Analog Sliding Hairline)
   ========================================================================= */
function StylePocketSlideRule({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentIndex = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);
  const activeDept = DEPARTMENTS_LIST[currentIndex] || DEPARTMENTS_LIST[0];
  const count = ALL_TEAM_MEMBERS.filter((m) => m.department === activeDept.key).length;

  return (
    <div
      className={`w-full max-w-xl mx-auto p-2.5 rounded-xl border flex flex-col gap-1.5 shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {/* 8 Ticks Track with Sliding Runner */}
      <div
        className={`relative w-full h-5 flex items-center justify-between px-2 rounded ${
          isNight ? 'bg-neutral-100 border border-neutral-200' : 'bg-black/30 border border-white/5'
        }`}
      >
        {DEPARTMENTS_LIST.map((dept, i) => (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className="w-4 h-full flex flex-col items-center justify-center cursor-pointer focus:outline-none"
            title={isFa ? dept.nameFa : dept.nameEn}
          >
            <div
              className={`w-[1.5px] rounded-full transition-all ${
                i === currentIndex
                  ? isNight
                    ? 'h-4 bg-[#b3a85c] shadow-[0_0_6px_#b3a85c]'
                    : 'h-4 bg-brand-yellow shadow-[0_0_8px_#fff083]'
                  : isNight
                  ? 'h-2 bg-neutral-400'
                  : 'h-2 bg-brand-gray/40'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Info Line */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="font-bold">{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
        <span className="font-mono text-[10px] opacity-60">
          [{currentIndex + 1}/08] • {count} MEMBER(S)
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 10: CASSETTE TAPE TRACKS (Side A & Side B Vintage Strip)
   ========================================================================= */
function StyleCassetteTapeTracks({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentIdx = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);
  const isSideA = currentIdx < 4;
  const sideDepts = isSideA ? DEPARTMENTS_LIST.slice(0, 4) : DEPARTMENTS_LIST.slice(4, 8);

  return (
    <div
      className={`w-full max-w-xl mx-auto p-2 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {/* Side A / Side B Toggle */}
      <button
        onClick={() => {
          const target = isSideA ? DEPARTMENTS_LIST[4].key : DEPARTMENTS_LIST[0].key;
          onSelectDept(target);
        }}
        className={`px-2 py-1 rounded font-bold cursor-pointer transition-colors ${
          isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark'
        }`}
      >
        {isSideA ? 'SIDE A' : 'SIDE B'} ⇄
      </button>

      {/* 4 Tracks on current side */}
      <div className="flex items-center gap-1.5 flex-1">
        {sideDepts.map((d, i) => {
          const isSel = d.key === selectedDept;
          const trackNum = isSideA ? i + 1 : i + 5;
          return (
            <button
              key={d.key}
              onClick={() => onSelectDept(d.key)}
              className={`flex-1 py-1 px-1 rounded truncate text-[11px] transition-colors cursor-pointer border ${
                isSel
                  ? isNight
                    ? 'border-[#b3a85c] text-[#b3a85c] font-bold bg-[#b3a85c]/10'
                    : 'border-brand-yellow text-brand-yellow font-bold bg-brand-yellow/10'
                  : isNight
                  ? 'border-transparent text-neutral-600 hover:text-black'
                  : 'border-transparent text-brand-gray hover:text-white'
              }`}
            >
              T{trackNum}: {isFa ? d.nameFa.split(' ')[0] : d.nameEn.split(' ')[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 11: FLOATING PILL COMMAND DOCK (Ultra-Compact Floating Action)
   ========================================================================= */
function StyleFloatingPillCommandDock({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full border shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {/* 4 Group Icons */}
      <div
        className={`flex items-center gap-1 px-1 border-r rtl:border-r-0 rtl:border-l ${
          isNight ? 'border-neutral-200' : 'border-white/10'
        }`}
      >
        {DEPARTMENT_GROUPS.map((g) => {
          const isG = g.id === currentGroup.id;
          const Icon = g.icon;
          return (
            <button
              key={g.id}
              onClick={() => onSelectDept(g.deptKeys[0])}
              title={isFa ? g.nameFa : g.nameEn}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isG
                  ? isNight
                    ? 'bg-[#b3a85c] text-white'
                    : 'bg-brand-yellow text-brand-dark'
                  : isNight
                  ? 'text-neutral-500 hover:text-brand-dark'
                  : 'text-brand-gray hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>

      {/* Active Department Name inline */}
      <div className="px-3 py-1 flex items-center gap-2 text-xs">
        <span className="font-bold">{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
        <button
          onClick={() => {
            const siblings = currentGroup.deptKeys;
            const nextK = siblings[(siblings.indexOf(selectedDept) + 1) % siblings.length];
            onSelectDept(nextK);
          }}
          className={`text-[10px] font-mono hover:underline cursor-pointer ${
            isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
          }`}
        >
          {isFa ? 'بعدی ↻' : 'Next ↻'}
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 12: ACCORDION RIBBON COMPACT (Horizontal Ribbon)
   ========================================================================= */
function StyleAccordionRibbonCompact({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  return (
    <div
      className={`w-full max-w-xl mx-auto flex items-center rounded-xl border p-1 gap-1 overflow-hidden transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {DEPARTMENTS_LIST.map((dept) => {
        const isSelected = selectedDept === dept.key;
        const Icon = getDepartmentIcon(dept.key);

        return (
          <button
            key={dept.key}
            onClick={() => onSelectDept(dept.key)}
            className={`h-8 rounded-lg flex items-center gap-1.5 px-2 transition-all cursor-pointer ${
              isSelected
                ? isNight
                  ? 'flex-1 bg-[#b3a85c] text-white font-bold'
                  : 'flex-1 bg-brand-yellow text-brand-dark font-bold'
                : isNight
                ? 'w-8 justify-center text-neutral-500 hover:bg-neutral-100 hover:text-black'
                : 'w-8 justify-center text-brand-gray hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            {isSelected && (
              <span className="text-xs truncate">{isFa ? dept.nameFa : dept.nameEn}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 14: GROUPED FREQUENCY DIAL (Multi-Band Radio Ticker)
   ========================================================================= */
function StyleGroupedFrequencyDial({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;

  return (
    <div
      className={`w-full max-w-lg mx-auto p-2 rounded-xl border flex flex-col gap-1 text-xs shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      {/* 4 Bands Selector */}
      <div
        className={`flex items-center justify-between text-[10px] font-mono opacity-60 px-1 border-b pb-1 ${
          isNight ? 'border-neutral-200' : 'border-white/10'
        }`}
      >
        {DEPARTMENT_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelectDept(g.deptKeys[0])}
            className={`cursor-pointer ${
              g.id === currentGroup.id
                ? isNight
                  ? 'font-bold text-[#b3a85c]'
                  : 'font-bold text-brand-yellow'
                : ''
            }`}
          >
            BAND_{g.id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Department Ticker inside Band */}
      <div className="flex items-center justify-between px-1">
        <span className="font-bold">{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
        <div className="flex items-center gap-1">
          {currentGroup.deptKeys.map((k) => (
            <button
              key={k}
              onClick={() => onSelectDept(k)}
              className={`w-2 h-2 rounded-full ${
                k === selectedDept
                  ? isNight
                    ? 'bg-[#b3a85c] shadow-[0_0_6px_#b3a85c]'
                    : 'bg-brand-yellow shadow-[0_0_6px_#fff083]'
                  : isNight
                  ? 'bg-neutral-300'
                  : 'bg-brand-gray/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 17: COMPACT PILL DRAWER (Single Active Chip + Slider Drawer)
   ========================================================================= */
function StyleCompactPillDrawer({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 shadow-sm ${
          isNight
            ? 'bg-[#b3a85c] text-white border-[#b3a85c]'
            : 'bg-brand-yellow text-brand-dark border-brand-yellow'
        }`}
      >
        <span>{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
        <span className="text-[10px] opacity-75 font-mono">[{currentGroup.nameEn.split(' ')[0]}]</span>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2.5 py-1.5 rounded-full border text-xs font-mono transition-colors cursor-pointer ${
          isNight
            ? 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100'
            : 'bg-white/5 border-white/10 text-brand-light hover:bg-white/10'
        }`}
      >
        {isOpen ? '✕' : '+ سایر شاخه‌ها'}
      </button>

      {isOpen && (
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {DEPARTMENTS_LIST.filter((d) => d.key !== selectedDept).map((d) => (
            <button
              key={d.key}
              onClick={() => {
                onSelectDept(d.key);
                setIsOpen(false);
              }}
              className={`px-2.5 py-0.5 rounded text-[11px] border cursor-pointer truncate ${
                isNight
                  ? 'bg-white border-neutral-300 text-neutral-800 hover:border-[#b3a85c]'
                  : 'bg-brand-surface border-white/10 text-brand-light hover:border-brand-yellow'
              }`}
            >
              {isFa ? d.nameFa : d.nameEn}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 18: ROTARY SELECTOR SWITCH (Industrial 4-Way Console)
   ========================================================================= */
function StyleRotarySelectorSwitch({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentGroup = findGroupForDept(selectedDept);
  const activeDept = DEPARTMENTS_LIST.find((d) => d.key === selectedDept)!;

  return (
    <div
      className={`w-full max-w-md mx-auto p-2 rounded-xl border flex items-center justify-between gap-3 text-xs shadow-sm transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light text-brand-light'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isNight ? 'bg-[#b3a85c] shadow-[0_0_6px_#b3a85c]' : 'bg-brand-yellow shadow-[0_0_8px_#fff083]'
          }`}
        />
        <span className="font-bold">{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
      </div>

      <div className="flex items-center gap-1">
        {DEPARTMENT_GROUPS.map((g, i) => (
          <button
            key={g.id}
            onClick={() => onSelectDept(g.deptKeys[0])}
            className={`w-6 h-6 rounded text-[10px] font-mono font-bold flex items-center justify-center cursor-pointer transition-colors ${
              g.id === currentGroup.id
                ? isNight
                  ? 'bg-[#b3a85c] text-white'
                  : 'bg-brand-yellow text-brand-dark'
                : isNight
                ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
                : 'bg-white/10 text-brand-light/75 hover:bg-white/15'
            }`}
          >
            P{i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 19: SPLIT CAPSULE SCROLLER (Connected Micro Stepper)
   ========================================================================= */
function StyleSplitCapsuleScroller({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  const currentIndex = DEPARTMENTS_LIST.findIndex((d) => d.key === selectedDept);
  const activeDept = DEPARTMENTS_LIST[currentIndex];

  const handlePrev = () => {
    onSelectDept(DEPARTMENTS_LIST[(currentIndex - 1 + DEPARTMENTS_LIST.length) % DEPARTMENTS_LIST.length].key);
  };
  const handleNext = () => {
    onSelectDept(DEPARTMENTS_LIST[(currentIndex + 1) % DEPARTMENTS_LIST.length].key);
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border divide-x rtl:divide-x-reverse text-xs shadow-sm overflow-hidden transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 divide-neutral-200 text-brand-dark'
          : 'bg-brand-surface border-brand-surface-light divide-white/10 text-brand-light'
      }`}
    >
      <button
        onClick={handlePrev}
        className={`px-3 py-1.5 cursor-pointer ${
          isNight ? 'hover:bg-neutral-100 text-[#b3a85c]' : 'hover:bg-white/5 text-brand-yellow'
        }`}
      >
        ‹
      </button>
      <div className="px-3 py-1.5 font-bold flex items-center gap-2">
        <span className="font-mono text-[10px] opacity-60">0{currentIndex + 1}</span>
        <span>{isFa ? activeDept.nameFa : activeDept.nameEn}</span>
      </div>
      <button
        onClick={handleNext}
        className={`px-3 py-1.5 cursor-pointer ${
          isNight ? 'hover:bg-neutral-100 text-[#b3a85c]' : 'hover:bg-white/5 text-brand-yellow'
        }`}
      >
        ›
      </button>
    </div>
  );
}

/* =========================================================================
   ✨ NEW MODEL 20: SEGMENTED GROUPED MATRIX (Unified Dense Bar)
   ========================================================================= */
function StyleSegmentedGroupedMatrix({
  selectedDept,
  onSelectDept,
  isNight,
  isFa,
}: FilterLabProps) {
  return (
    <div
      className={`w-full max-w-xl mx-auto rounded-lg border overflow-hidden flex divide-x rtl:divide-x-reverse text-[10px] font-mono transition-colors duration-500 ${
        isNight
          ? 'bg-white border-neutral-300 divide-neutral-200'
          : 'bg-brand-surface border-brand-surface-light divide-white/10'
      }`}
    >
      {DEPARTMENTS_LIST.map((d, i) => {
        const isSel = d.key === selectedDept;
        return (
          <button
            key={d.key}
            onClick={() => onSelectDept(d.key)}
            className={`flex-1 py-1.5 px-0.5 text-center truncate cursor-pointer transition-colors ${
              isSel
                ? isNight
                  ? 'bg-[#b3a85c] text-white font-bold'
                  : 'bg-brand-yellow text-brand-dark font-bold'
                : isNight
                ? 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                : 'text-brand-gray hover:bg-white/5 hover:text-white'
            }`}
          >
            0{i + 1}
          </button>
        );
      })}
    </div>
  );
}
