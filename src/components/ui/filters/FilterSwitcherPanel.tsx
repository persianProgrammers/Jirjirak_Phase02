import React from 'react';
import { motion } from 'motion/react';
import { FILTER_MODELS_CATALOG, FilterModelMeta } from './types';
import { useGlobalStore } from '../../../stores/globalStore';
import {
  ChevronLeft,
  ChevronRight,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface FilterSwitcherPanelProps {
  isNight: boolean;
  isFa: boolean;
  isDarkBg: boolean;
  className?: string;
}

export function FilterSwitcherPanel({
  isNight,
  isFa,
  isDarkBg,
  className = '',
}: FilterSwitcherPanelProps) {
  const { filterModelId, setFilterModelId } = useGlobalStore();

  // Ensure current model is one of the 3 finalists (fallback to model-01)
  const safeModelId = FILTER_MODELS_CATALOG.some((m) => m.id === filterModelId)
    ? filterModelId
    : 'model-01';

  const currentIndex = FILTER_MODELS_CATALOG.findIndex((m) => m.id === safeModelId);
  const currentModel: FilterModelMeta =
    FILTER_MODELS_CATALOG[currentIndex >= 0 ? currentIndex : 0];

  const handlePrev = () => {
    const nextIdx =
      (currentIndex - 1 + FILTER_MODELS_CATALOG.length) % FILTER_MODELS_CATALOG.length;
    setFilterModelId(FILTER_MODELS_CATALOG[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % FILTER_MODELS_CATALOG.length;
    setFilterModelId(FILTER_MODELS_CATALOG[nextIdx].id);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`w-full p-2 sm:p-2.5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg ${
          isDarkBg
            ? 'bg-neutral-900/90 border-white/15 text-white shadow-black/60'
            : 'bg-white/95 border-black/15 text-neutral-900 shadow-neutral-200/80'
        }`}
      >
        {/* Left: 3 Finalists Segmented Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-current/5 border border-current/10 overflow-x-auto no-scrollbar">
          {FILTER_MODELS_CATALOG.map((model) => {
            const isSelected = model.id === safeModelId;

            return (
              <button
                key={model.id}
                onClick={() => setFilterModelId(model.id)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 cursor-pointer shrink-0 z-10 select-none flex items-center gap-2 ${
                  isSelected
                    ? isDarkBg ? 'text-[#222] font-black' : 'text-white font-black'
                    : isDarkBg ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="curatedModelSwitcherPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`absolute inset-0 rounded-lg shadow-md -z-10 ${
                      isDarkBg
                        ? 'bg-[#fff083] shadow-[0_0_15px_rgba(255,240,131,0.35)]'
                        : 'bg-[#8f6b00] shadow-[0_0_12px_rgba(143,107,0,0.3)]'
                    }`}
                  />
                )}
                <span className="font-mono text-[10px] opacity-60">
                  {model.number}
                </span>
                <span className="whitespace-nowrap">
                  {isFa ? model.nameFa : model.nameEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center/Right: Active Model Info & Stepper */}
        <div className="flex items-center justify-between md:justify-end gap-3 ms-0 md:ms-auto">
          {/* Active Tagline info */}
          <div className="hidden sm:flex flex-col text-end">
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-50 font-bold">
              {isFa ? `مدل ${currentModel.number} • ${currentModel.category}` : `MODEL ${currentModel.number} • ${currentModel.category}`}
            </span>
            <span className="text-xs opacity-75 truncate max-w-xs">
              {isFa ? currentModel.taglineFa : currentModel.taglineEn}
            </span>
          </div>

          {/* Stepper Buttons (< >) */}
          <div className="flex items-center gap-1 border rounded-xl p-0.5 border-current/15">
            <button
              onClick={handlePrev}
              title={isFa ? 'مدل قبلی' : 'Previous Model'}
              className="p-1.5 rounded-lg hover:bg-current/10 transition-colors cursor-pointer"
              aria-label="Previous filter model"
            >
              {isFa ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <span className="px-2 text-[11px] font-mono font-bold">
              {currentIndex + 1} / {FILTER_MODELS_CATALOG.length}
            </span>
            <button
              onClick={handleNext}
              title={isFa ? 'مدل بعدی' : 'Next Model'}
              className="p-1.5 rounded-lg hover:bg-current/10 transition-colors cursor-pointer"
              aria-label="Next filter model"
            >
              {isFa ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSwitcherPanel;
