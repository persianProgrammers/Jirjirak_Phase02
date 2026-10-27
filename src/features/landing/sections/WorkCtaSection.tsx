import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useGlobalStore } from '../../../stores/globalStore';

export function WorkCtaSection() {
  const navigate = useNavigate();
  const { currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  return (
    <section
      id="work-cta"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-[#0A0A0C] text-[#EDEDED] border-y border-white/10 select-none"
    >
      {/* Ambient Lighting Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 75% 50%, rgba(255, 240, 131, 0.1), transparent 75%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 20% 50%, rgba(255, 240, 131, 0.04), transparent 70%)',
        }}
      />

      {/* Grid Pattern Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFF083 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Container - 3 Equal-Width Columns on Desktop (lg:grid-cols-3) */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* =====================================================================
              COLUMN 1 (1/3 WIDTH): STEP BADGE + HEADLINE
             ===================================================================== */}
          <div className="flex flex-col items-start w-full">
            {/* Step Counter & Category Badge */}
            <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
              <span className="text-xs font-semibold tracking-widest font-mono text-[#FFF083]">
                {isFa ? '۰۳ / ۰۳' : '03 / 03'}
              </span>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-white/50 font-mono">
                {isFa ? 'همکاری با ما' : "LET'S WORK TOGETHER"}
              </span>
            </div>

            {/* Headline: Have an idea? Let's build it. */}
            <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-white">
              {isFa ? (
                <>
                  <span>ایده‌ای دارید؟ </span>
                  <span className="text-[#FFF083] inline-block font-extrabold">بیایید بسازیمش.</span>
                </>
              ) : (
                <>
                  <span>Have an idea? </span>
                  <span className="text-[#FFF083] inline-block font-extrabold">Let's build it.</span>
                </>
              )}
            </h2>
          </div>

          {/* =====================================================================
              COLUMN 2 (1/3 WIDTH): DESCRIPTION TEXT
             ===================================================================== */}
          <div className="flex flex-col justify-center w-full">
            <p className="text-sm sm:text-base leading-relaxed text-neutral-300/85">
              {isFa
                ? 'چه در حال آغاز پروژه‌ای نو باشید و چه در اندیشه جان‌بخشیدن به ایده‌های تازه، مشتاقانه آماده شنیدن داستان شما هستیم.'
                : "Whether you're starting a new project or looking to bring fresh ideas to life, we'd love to hear from you."}
            </p>
          </div>

          {/* =====================================================================
              COLUMN 3 (1/3 WIDTH): CTA BUTTON
             ===================================================================== */}
          <div className="flex items-center justify-start lg:justify-end w-full">
            <button
              onClick={() => navigate('/contact')}
              className="group relative flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold bg-[#FFF083] text-[#141416] hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,240,131,0.25)] hover:shadow-[0_0_30px_rgba(255,240,131,0.5)] active:scale-95 cursor-pointer select-none"
            >
              <span>{isFa ? 'شروع گفتگو' : 'Start a conversation'}</span>
              {isFa ? (
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
