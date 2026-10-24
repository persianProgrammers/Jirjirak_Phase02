import React, { useState } from 'react';
import { DayFxType } from './DayFloatingFx';

interface DayFxSwitcherProps {
  currentType: DayFxType;
  onChangeType: (type: DayFxType) => void;
  enabled: boolean;
  onToggleEnabled: () => void;
  isNight: boolean;
}

interface FxOption {
  id: DayFxType;
  icon: string;
  nameFa: string;
  nameEn: string;
}

const FX_OPTIONS: FxOption[] = [
  { id: 'paper-planes', icon: '✈️', nameFa: 'هواپیمای کاغذی', nameEn: 'Paper Planes' },
  { id: 'spinning-seeds', icon: '🚁', nameFa: 'دانه چرخنده', nameEn: 'Spinning Seeds' },
  { id: 'glass-bubbles', icon: '🫧', nameFa: 'حباب شیشه‌ای', nameEn: 'Glass Bubbles' },
  { id: 'linear-clouds', icon: '☁️', nameFa: 'ابرهای معمارانه', nameEn: 'Linear Clouds' },
  { id: 'dandelions', icon: '🌾', nameFa: 'قاصدک تعاملی', nameEn: 'Interactive Dandelions' },
];

export const DayFxSwitcher: React.FC<DayFxSwitcherProps> = ({
  currentType,
  onChangeType,
  enabled,
  onToggleEnabled,
  isNight,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Only relevant in Day Mode, but keep it accessible or display hint if night
  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 font-sans"
      dir="rtl"
    >
      {/* Minimized Pill Button */}
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-dark text-brand-light border border-brand-yellow/40 shadow-xl hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 text-xs font-semibold cursor-pointer group"
          title="باز کردن پنل تست افکت‌های شناور روز"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🎨</span>
          <span>تست المان‌های شناور روز ({FX_OPTIONS.find(o => o.id === currentType)?.nameFa || 'قاصدک'})</span>
        </button>
      ) : (
        /* Expanded Floating Studio Panel */
        <div className={`p-4 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-500 max-w-[320px] sm:max-w-[360px] ${
          isNight 
            ? 'bg-brand-dark/95 border-brand-yellow/30 text-brand-light' 
            : 'bg-[#e9e9e9]/95 border-[#222222]/20 text-brand-dark'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-current/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse"></span>
              <div>
                <h4 className="text-xs font-bold leading-tight">آزمایشگاه المان‌های شناور روز</h4>
                <p className="text-[10px] opacity-60">Day Ambient FX Studio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Collapse button */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-current/10 text-xs transition-colors"
                title="بستن پنل"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Master ON/OFF Toggle */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-current/5 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[11px]">وضعیت المان‌های شناور:</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                enabled ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/20 text-red-500'
              }`}>
                {enabled ? 'فعال (ON)' : 'غیرفعال (OFF)'}
              </span>
            </div>

            <button
              onClick={onToggleEnabled}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 p-0.5 cursor-pointer ${
                enabled ? 'bg-brand-yellow' : 'bg-current/20'
              }`}
              aria-label="تغییر وضعیت فعال بودن"
            >
              <div className={`w-5 h-5 rounded-full bg-brand-dark transition-transform duration-300 transform ${
                enabled ? '-translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Note if currently in night mode */}
          {isNight && (
            <div className="p-2 mb-3 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 text-[11px] leading-relaxed text-brand-yellow">
              💡 برای مشاهده این افکت‌ها، حالت شب/روز را روی <strong>«روز»</strong> قرار دهید.
            </div>
          )}

          {/* Options Grid */}
          <div className="flex flex-col gap-1.5">
            {FX_OPTIONS.map((opt, idx) => {
              const isActive = currentType === opt.id && enabled;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    onChangeType(opt.id);
                    if (!enabled) onToggleEnabled();
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer text-right group ${
                    isActive
                      ? isNight 
                        ? 'bg-brand-yellow text-brand-dark font-bold shadow-md' 
                        : 'bg-[#222222] text-[#e9e9e9] font-bold shadow-md'
                      : 'hover:bg-current/10 border border-transparent hover:border-current/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{opt.icon}</span>
                    <div className="flex flex-col">
                      <span className="leading-tight font-medium">
                        {idx + 1}. {opt.nameFa}
                      </span>
                      <span className="text-[9px] opacity-60 uppercase font-mono">
                        {opt.nameEn}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-current/15 font-mono">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Tip Footer */}
          <div className="mt-3 pt-2 border-t border-current/10 text-[10px] opacity-60 text-center leading-normal">
            روی هر گزینه کلیک کنید تا بلافاصله روی صفحه هیرو ظاهر شود.
          </div>
        </div>
      )}
    </div>
  );
};
