import React from 'react';

interface LegacyServicesCardsProps {
  cardsRef: React.RefObject<HTMLDivElement | null>;
  isNight: boolean;
  services: Array<{
    title: string;
    items: string[];
  }>;
  serviceBadgeIcons: React.ReactNode[];
  serviceIllustrations: React.ReactNode[];
}

export function LegacyServicesCards({
  cardsRef,
  isNight,
  services,
  serviceBadgeIcons,
  serviceIllustrations,
}: LegacyServicesCardsProps) {
  return (
    <div ref={cardsRef} className="lg:w-[62%] grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 self-stretch">
      {services.map((service, index) => (
        <div
          key={index}
          className={`group p-7 lg:p-8 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[290px] lg:min-h-[310px] ${
            isNight 
              ? 'bg-[#121212] border border-white/[0.08] hover:border-brand-yellow/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]' 
              : 'bg-white border border-gray-200/80 hover:border-brand-dark/40 shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
          }`}
        >
          {/* Subtle hover background radial ambient light */}
          <div
            className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: isNight 
                ? 'radial-gradient(circle at center, rgba(255,240,131,0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(204,192,105,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Top Row: Left Golden Icon Badge + Right Isometric 3D Illustration */}
          <div className="flex justify-between items-start mb-5 relative z-10">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300 ${
              isNight 
                ? 'border-brand-yellow/70 bg-brand-yellow/10 group-hover:bg-brand-yellow/15 group-hover:border-brand-yellow shadow-[0_0_15px_rgba(255,240,131,0.12)]'
                : 'border-brand-dark/20 bg-brand-yellow/25 group-hover:bg-brand-yellow/40 group-hover:border-brand-dark/40'
            }`}>
              {serviceBadgeIcons[index % serviceBadgeIcons.length]}
            </div>

            <div className="relative">
              {serviceIllustrations[index % serviceIllustrations.length]}
            </div>
          </div>
          
          {/* Middle & Bottom Rows: Title & Core Capabilities */}
          <div className="relative z-10">
            <h3 className={`text-2xl font-bold mb-3 tracking-tight transition-colors duration-300 ${
              isNight 
                ? 'text-white group-hover:text-brand-yellow' 
                : 'text-brand-dark group-hover:text-black'
            }`}>
              {service.title}
            </h3>

            <ul className="space-y-1.5">
              {service.items.map((item, i) => (
                <li key={i} className={`text-sm flex items-center gap-2 ${
                  isNight ? 'text-brand-gray/90' : 'text-neutral-600'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors duration-300 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Interactive Diagonal Arrow */}
          <div className={`absolute bottom-6 right-6 rtl:right-auto rtl:left-6 opacity-40 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 transition-all duration-300 pointer-events-none ${
            isNight ? 'text-brand-yellow' : 'text-brand-dark'
          }`}>
            <svg className="w-5 h-5 rtl:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
