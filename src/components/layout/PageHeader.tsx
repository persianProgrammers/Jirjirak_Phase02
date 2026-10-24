import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useGlobalStore } from '../../stores/globalStore';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface PageHeaderProps {
  step?: string;
  badge?: string;
  title?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleHighlight?: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  statusText?: string;
  tags?: string[];
  fullHeight?: boolean;
  cta?: React.ReactNode;
  onScrollDown?: () => void;
  scrollLabel?: string;
  className?: string;
}

export function PageHeader({
  step,
  badge,
  title,
  titleLine1,
  titleLine2,
  titleHighlight,
  subtitle,
  breadcrumb,
  tags,
  fullHeight = false,
  cta,
  onScrollDown,
  scrollLabel,
  className = '',
}: PageHeaderProps) {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  return (
    <header
      className={`relative px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ${
        fullHeight
          ? 'min-h-screen lg:min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12'
          : 'pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20'
      } ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      } ${className}`}
    >
      {/* 📐 Architectural Ambient Background Grid & Radial Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] flex items-center justify-center">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Atmospheric Soft Light Orb (Pure radial-gradient without Gaussian blur) */}
      <div
        className={`absolute top-1/3 -start-24 w-96 h-96 rounded-full pointer-events-none opacity-25`}
        style={{
          background: isNight
            ? 'radial-gradient(circle, #fff083 0%, transparent 70%)'
            : 'radial-gradient(circle, #8f6b00 0%, transparent 70%)',
        }}
      />

      {/* Top Meta Bar: Breadcrumbs */}
      <div className="max-w-[1500px] mx-auto w-full relative z-10 shrink-0">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="mb-4 sm:mb-6 text-xs font-mono">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 opacity-80 select-none">
              <Link
                to="/"
                className={`transition-colors hover:underline flex items-center gap-1.5 ${
                  isNight ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>{isFa ? 'صفحه اصلی' : 'Home'}</span>
              </Link>

              {breadcrumb.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="opacity-30">/</span>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className={`transition-colors hover:underline ${
                        isNight ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={`font-semibold ${
                        isNight ? 'text-[#fff083]' : 'text-[#8f6b00]'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Center: Hero Title & Subtitle Container & CTA */}
      <div className={`max-w-[1500px] mx-auto w-full relative z-10 ${fullHeight ? 'my-auto py-8 sm:py-12' : ''}`}>
        {step && (
          <div className="flex items-center gap-3.5 mb-5 sm:mb-6 select-none">
            <span
              className={`text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md border ${
                isNight
                  ? 'bg-[#fff083]/10 text-[#fff083] border-[#fff083]/30'
                  : 'bg-[#8f6b00]/10 text-[#8f6b00] border-[#8f6b00]/30'
              }`}
            >
              {step}
            </span>
          </div>
        )}

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] mb-6"
          >
            {badge && (
              <span
                className={`block text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.24em] select-none mb-3 sm:mb-4 ${
                  isNight ? 'text-[#fff083]/85' : 'text-[#8f6b00]'
                }`}
              >
                {badge}
              </span>
            )}
            {titleLine1 && titleLine2 ? (
              <>
                <span className="block">{titleLine1}</span>
                <span
                  className={`block mt-1 sm:mt-2.5 ${
                    isNight ? 'text-[#fff083]' : 'text-[#8f6b00]'
                  }`}
                >
                  {titleLine2}
                </span>
              </>
            ) : (
              <>
                {title}{' '}
                {titleHighlight && (
                  <span
                    className={`inline-block ${
                      isNight ? 'text-[#fff083]' : 'text-[#8f6b00]'
                    }`}
                  >
                    {titleHighlight}
                  </span>
                )}
              </>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl ${
                isNight ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              {subtitle}
            </motion.p>
          )}

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10"
            >
              {cta}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
