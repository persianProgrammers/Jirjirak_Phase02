import { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  Send,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  Share2,
} from 'lucide-react';
import { useGlobalStore } from '../../../stores/globalStore';

export interface DirectChannelsSectionProps {
  step?: string;
  stepFa?: string;
  badge?: string;
  badgeFa?: string;
}

interface SocialItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  colorHover: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: 'tg',
    name: 'تلگرام',
    handle: '@JirjirakStudio',
    url: 'https://t.me/JirjirakStudio',
    colorHover: 'hover:text-[#229ED9] hover:border-[#229ED9]/50',
  },
  {
    id: 'ig',
    name: 'اینستاگرام',
    handle: '@jirjirak.studio',
    url: 'https://instagram.com',
    colorHover: 'hover:text-[#E1306C] hover:border-[#E1306C]/50',
  },
  {
    id: 'li',
    name: 'لینکدین',
    handle: 'jirjirak-studio',
    url: 'https://linkedin.com',
    colorHover: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50',
  },
  {
    id: 'gh',
    name: 'گیت‌هاب',
    handle: 'persianProgrammers',
    url: 'https://github.com/persianProgrammers',
    colorHover: 'hover:text-white hover:border-white/50',
  },
  {
    id: 'dr',
    name: 'دریبل',
    handle: 'jirjirak',
    url: 'https://dribbble.com',
    colorHover: 'hover:text-[#EA4C89] hover:border-[#EA4C89]/50',
  },
  {
    id: 'x',
    name: 'توییتر / X',
    handle: '@jirjirak_studio',
    url: 'https://x.com',
    colorHover: 'hover:text-white hover:border-white/50',
  },
];

export function DirectChannelsSection({
  step = '02 / 04',
  stepFa = '۰۲ / ۰۴',
  badge = 'DIRECT CHANNELS',
  badgeFa = 'تماس مستقیم',
}: DirectChannelsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  // Section 2: Standard Dark in Night, Light in Day (Alternating: Sec 1 is Light, Sec 2 is Dark)
  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';
  const cardBg = isNight
    ? 'bg-neutral-900/70 border-white/10 text-white hover:border-[#fff083]/30 shadow-xl'
    : 'bg-white border-black/10 text-neutral-900 hover:border-[#8f6b00]/30 shadow-sm hover:shadow-md';
  const innerBoxBg = isNight ? 'bg-neutral-950/70 border-white/5' : 'bg-neutral-100/80 border-black/5';
  const metaText = isNight ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <section
      id="direct-channels"
      ref={containerRef}
      className={`py-20 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-t relative overflow-hidden transition-colors duration-700 ${
        isNight
          ? 'bg-brand-dark text-brand-light border-white/10'
          : 'bg-brand-light text-brand-dark border-gray-200'
      }`}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none -z-10"
        style={{
          backgroundColor: isNight ? 'rgba(255,240,131,0.03)' : 'rgba(143,107,0,0.04)',
        }}
      />

      <div className="max-w-[1240px] mx-auto w-full">
        {/* ========================================================================= */}
        {/* HEADER: Short, Punchy, Zero Fluff                                        */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className={`text-xs font-semibold tracking-widest font-mono ${accentText}`}>
              {isFa ? stepFa : step}
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase opacity-75">
              {isFa ? badgeFa : badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 tracking-tight">
            {isFa ? (
              <>
                <span>یک تماس، یک پیام، یا یک چای.</span> <br />
                <span className={accentText}>بی‌معطلی و بدون تشریفات.</span>
              </>
            ) : (
              <>
                <span>A call, a ping, or a coffee.</span> <br />
                <span className={accentText}>Fast, direct, unscripted.</span>
              </>
            )}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${metaText}`}>
            {isFa
              ? 'اگر تمایلی به پر کردن فرم بریف ندارید، در کمتر از چند دقیقه با ما ارتباط بگیرید.'
              : 'Skip the detailed brief form and reach out to our studio leads directly.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TOP ROW: 3 Direct Communication Channels (Phone, Telegram, Email)        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-5">
          {/* 1. Phone Card */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${cardBg}`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    isNight ? 'bg-[#fff083]/10 text-[#fff083]' : 'bg-[#8f6b00]/10 text-[#8f6b00]'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${innerBoxBg} ${metaText}`}>
                  {isFa ? 'شنبه تا چهارشنبه | ۹ الی ۱۸' : 'Sat–Wed | 9–18'}
                </span>
              </div>

              <div className="text-xs uppercase font-bold tracking-wider opacity-60 mb-1">
                {isFa ? 'تماس تلفنی مستقیم' : 'Direct Phone'}
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono tracking-tight direction-ltr text-left mb-4" dir="ltr">
                ۰۲۱ - ۹۱۰۰ ۴۴۰۴
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-current/10">
              <a
                href="tel:+982191004404"
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isNight
                    ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black'
                    : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
                }`}
              >
                <span>{isFa ? 'تماس' : 'Call'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy('+982191004404', 'phone')}
                title={isFa ? 'کپی شماره' : 'Copy'}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${innerBoxBg} hover:opacity-100`}
              >
                {copiedKey === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] text-emerald-500">{isFa ? 'کپی شد' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-[11px] opacity-75">{isFa ? 'کپی' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Telegram Card */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${cardBg}`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    isNight ? 'bg-[#fff083]/10 text-[#fff083]' : 'bg-[#8f6b00]/10 text-[#8f6b00]'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 text-emerald-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isFa ? 'پاسخ زیر ۱ ساعت' : '< 1h Response'}
                </span>
              </div>

              <div className="text-xs uppercase font-bold tracking-wider opacity-60 mb-1">
                {isFa ? 'پیام‌رسان تلگرام' : 'Telegram Desk'}
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono tracking-tight direction-ltr text-left mb-4" dir="ltr">
                @JirjirakStudio
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-current/10">
              <a
                href="https://t.me/JirjirakStudio"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isNight
                    ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black'
                    : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
                }`}
              >
                <span>{isFa ? 'پیام در تلگرام' : 'Message'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy('@JirjirakStudio', 'tg')}
                title={isFa ? 'کپی آیدی' : 'Copy'}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${innerBoxBg} hover:opacity-100`}
              >
                {copiedKey === 'tg' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] text-emerald-500">{isFa ? 'کپی شد' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-[11px] opacity-75">{isFa ? 'کپی' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. Email Card */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${cardBg}`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    isNight ? 'bg-[#fff083]/10 text-[#fff083]' : 'bg-[#8f6b00]/10 text-[#8f6b00]'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${innerBoxBg} ${metaText}`}>
                  {isFa ? 'مکاتبات رسمی و RFP' : 'Proposals & RFPs'}
                </span>
              </div>

              <div className="text-xs uppercase font-bold tracking-wider opacity-60 mb-1">
                {isFa ? 'ایمیل استودیو' : 'Studio Email'}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono tracking-tight direction-ltr text-left mb-4 truncate" dir="ltr">
                hello@jirjirak.studio
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-current/10">
              <a
                href="mailto:hello@jirjirak.studio"
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isNight
                    ? 'bg-[#fff083] text-[#222] hover:bg-white hover:text-black'
                    : 'bg-[#8f6b00] text-white hover:bg-[#755700]'
                }`}
              >
                <span>{isFa ? 'ارسال ایمیل' : 'Email Us'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy('hello@jirjirak.studio', 'email')}
                title={isFa ? 'کپی ایمیل' : 'Copy'}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${innerBoxBg} hover:opacity-100`}
              >
                {copiedKey === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] text-emerald-500">{isFa ? 'کپی شد' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-[11px] opacity-75">{isFa ? 'کپی' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ROW: Studio Location & Social Pills System                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Location Block (5 cols) */}
          <div className={`p-5 sm:p-6 rounded-3xl border flex items-center justify-between gap-4 lg:col-span-5 ${cardBg}`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  isNight ? 'bg-[#fff083]/10 text-[#fff083]' : 'bg-[#8f6b00]/10 text-[#8f6b00]'
                }`}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-60 mb-0.5">
                  {isFa ? 'آتلیه حضوری (جلسات با هماهنگی)' : 'Physical Atelier (By Appointment)'}
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  {isFa ? 'تهران، خیابان ولیعصر، عمارت جیرجیرک' : 'Tehran, Valiasr Ave, Jirjirak Atelier'}
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              title={isFa ? 'مشاهده روی نقشه' : 'Open Map'}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${innerBoxBg} hover:opacity-100`}
            >
              <span>{isFa ? 'نقشه' : 'Map'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Social Pills Strip (7 cols) */}
          <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 lg:col-span-7 ${cardBg}`}>
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isNight ? 'bg-[#fff083]/10 text-[#fff083]' : 'bg-[#8f6b00]/10 text-[#8f6b00]'
                }`}
              >
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">
                {isFa ? 'شبکه‌های اجتماعی' : 'Socials'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              {SOCIAL_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${innerBoxBg} ${item.colorHover}`}
                >
                  <span>{item.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-40 rtl:rotate-[-90deg]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
