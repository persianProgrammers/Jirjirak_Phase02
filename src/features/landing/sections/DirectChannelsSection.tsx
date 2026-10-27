import { useState, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useGlobalStore } from '../../../stores/globalStore';

export interface DirectChannelsSectionProps {
  step?: string;
  stepFa?: string;
  badge?: string;
  badgeFa?: string;
}

interface DirectContact {
  id: string;
  type: 'phone' | 'email' | 'location';
  labelEn: string;
  labelFa: string;
  value: string;
  displayValue: string;
  actionUrl: string;
  actionTextEn: string;
  actionTextFa: string;
  badgeEn: string;
  badgeFa: string;
  isExternal?: boolean;
}

interface SocialItem {
  id: string;
  nameEn: string;
  nameFa: string;
  handle: string;
  url: string;
  brandGradient: string;
  glowColor: string;
  svgIcon: () => React.ReactNode;
}

// ============================================================================
// 1. DATA DEFINITIONS: 3 DIRECT PRIMARY CARDS (Phone, Address, Email)
// ============================================================================
const DIRECT_CONTACTS: DirectContact[] = [
  {
    id: 'phone',
    type: 'phone',
    labelEn: 'Direct Phone',
    labelFa: 'تماس مستقیم',
    value: '+982191004404',
    displayValue: '۰۲۱ - ۹۱۰۰ ۴۴۰۴',
    actionUrl: 'tel:+982191004404',
    actionTextEn: 'Call Now',
    actionTextFa: 'برقراری تماس',
    badgeEn: 'Sat–Wed 9–18',
    badgeFa: 'شنبه تا چهارشنبه ۹ الی ۱۸',
  },
  {
    id: 'location',
    type: 'location',
    labelEn: 'Studio Atelier',
    labelFa: 'آتلیه و دفتر مرکزی',
    value: 'تهران، خیابان ولیعصر، عمارت جیرجیرک',
    displayValue: 'تهران، ولیعصر، عمارت جیرجیرک',
    actionUrl: 'https://maps.google.com',
    actionTextEn: 'Open Map',
    actionTextFa: 'مسیریابی روی نقشه',
    badgeEn: 'By Appointment',
    badgeFa: 'جلسات با هماهنگی قبلی',
    isExternal: true,
  },
  {
    id: 'email',
    type: 'email',
    labelEn: 'Official Inquiries',
    labelFa: 'مکاتبات و پروپوزال',
    value: 'hello@jirjirak.studio',
    displayValue: 'hello@jirjirak.studio',
    actionUrl: 'mailto:hello@jirjirak.studio',
    actionTextEn: 'Send Email',
    actionTextFa: 'ارسال ایمیل',
    badgeEn: 'Official RFP',
    badgeFa: 'پروپوزال رسمی استودیو',
  },
];

// ============================================================================
// 2. SOCIAL ECOSYSTEM WITH EXACT AUTHENTIC BRAND COLORS & GRADIENTS
// ============================================================================
const SOCIAL_ECOSYSTEM: SocialItem[] = [
  {
    id: 'instagram',
    nameEn: 'Instagram',
    nameFa: 'اینستاگرام',
    handle: '@jirjirak.studio',
    url: 'https://instagram.com/jirjirak.studio',
    brandGradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    glowColor: 'rgba(225, 48, 108, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <radialGradient id="ig-prism-grad" cx="20%" cy="100%" r="130%">
            <stop offset="0%" stopColor="#ffc107" />
            <stop offset="30%" stopColor="#f44336" />
            <stop offset="60%" stopColor="#e91e63" />
            <stop offset="80%" stopColor="#9c27b0" />
            <stop offset="100%" stopColor="#673ab7" />
          </radialGradient>
        </defs>
        <path
          fill="url(#ig-prism-grad)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
    ),
  },
  {
    id: 'telegram',
    nameEn: 'Telegram',
    nameFa: 'تلگرام',
    handle: '@JirjirakStudio',
    url: 'https://t.me/JirjirakStudio',
    brandGradient: 'linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)',
    glowColor: 'rgba(34, 158, 217, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="tg-prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2AABEE" />
            <stop offset="100%" stopColor="#229ED9" />
          </linearGradient>
        </defs>
        <path
          fill="url(#tg-prism-grad)"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
        />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    nameEn: 'LinkedIn',
    nameFa: 'لینکدین',
    handle: 'jirjirak-studio',
    url: 'https://linkedin.com/company/jirjirak-studio',
    brandGradient: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
    glowColor: 'rgba(10, 102, 194, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="li-prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A66C2" />
            <stop offset="100%" stopColor="#004182" />
          </linearGradient>
        </defs>
        <path
          fill="url(#li-prism-grad)"
          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.4 9.74V9.92H5.06v8.58h2.8z"
        />
      </svg>
    ),
  },
  {
    id: 'github',
    nameEn: 'GitHub',
    nameFa: 'گیت‌هاب',
    handle: 'persianProgrammers',
    url: 'https://github.com/persianProgrammers',
    brandGradient: 'linear-gradient(135deg, #f0f6fc 0%, #c9d1d9 100%)',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    svgIcon: () => (
      <svg className="w-5 h-5 fill-current text-white dark:text-white" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'dribbble',
    nameEn: 'Dribbble',
    nameFa: 'دریبل',
    handle: 'jirjirak',
    url: 'https://dribbble.com/jirjirak',
    brandGradient: 'linear-gradient(135deg, #FF6598 0%, #EA4C89 100%)',
    glowColor: 'rgba(234, 76, 137, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="dr-prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6598" />
            <stop offset="100%" stopColor="#EA4C89" />
          </linearGradient>
        </defs>
        <path
          fill="url(#dr-prism-grad)"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.74 8.79a8.03 8.03 0 0 0-4.14-5.28 16.5 16.5 0 0 1 3.56 5.28h.58zm-5.74-5.74c1.19.46 2.27 1.15 3.19 2.02a14.7 14.7 0 0 0-3.19-2.02zm-2-.84c1.67 0 3.23.47 4.56 1.28a15.8 15.8 0 0 0-3.32 4.19c-1.32-.47-2.73-.8-4.22-.97.77-2.65 1.86-4.5 2.98-4.5zm-4.7 2.05c1.45.18 2.82.5 4.1.95A17.6 17.6 0 0 1 8.5 11.5c-2.42-.04-4.63.5-6.19 1.12.78-3.03 2.72-5.54 5-6.41zm-3.23 8.76c1.39-.56 3.42-1.04 5.67-1.01.21.57.4 1.15.56 1.74a16.3 16.3 0 0 1-5.91 3.33 8.04 8.04 0 0 1-.32-4.06zm7.25 5.86c-1.53-.17-3-.7-4.27-1.54a14.4 14.4 0 0 0 5.42-3.06c.64 1.75 1.11 3.48 1.39 5.06-1.02-.27-1.89-.4-2.54-.46zm4.19-1.28c-.27-1.46-.71-3.07-1.31-4.7 1.83-.24 3.78.07 5.37.7a7.99 7.99 0 0 1-4.06 4zm-1.84-6.38c.55 1.53.96 3.03 1.22 4.4a15.2 15.2 0 0 0-4.84-.66c-.15-.54-.33-1.08-.53-1.61 1.4-.73 2.8-1.44 4.15-2.13z"
        />
      </svg>
    ),
  },
  {
    id: 'x',
    nameEn: 'X / Twitter',
    nameFa: 'ایکس / توییتر',
    handle: '@jirjirak_studio',
    url: 'https://x.com/jirjirak_studio',
    brandGradient: 'linear-gradient(135deg, #ffffff 0%, #a8a8a8 100%)',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    svgIcon: () => (
      <svg className="w-5 h-5 fill-current text-white dark:text-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'figma',
    nameEn: 'Figma Community',
    nameFa: 'فیگما',
    handle: '@jirjirak',
    url: 'https://figma.com/@jirjirak',
    brandGradient: 'linear-gradient(135deg, #F24E1E 0%, #A259FF 50%, #1ABCFE 100%)',
    glowColor: 'rgba(162, 89, 255, 0.45)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#F24E1E" d="M8 2h4v8H8a4 4 0 0 1 0-8z" />
        <path fill="#FF7262" d="M12 2h4a4 4 0 0 1 0 8h-4V2z" />
        <path fill="#A259FF" d="M8 10h4v8H8a4 4 0 0 1 0-8z" />
        <path fill="#1ABCFE" d="M12 10h4a4 4 0 0 1 0 8h-4v-8z" />
        <path fill="#0ACF83" d="M8 18h4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-2z" />
      </svg>
    ),
  },
  {
    id: 'behance',
    nameEn: 'Behance',
    nameFa: 'بیهنس',
    handle: 'jirjirak',
    url: 'https://behance.net/jirjirak',
    brandGradient: 'linear-gradient(135deg, #0057FF 0%, #003ECC 100%)',
    glowColor: 'rgba(0, 87, 255, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="be-prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0057FF" />
            <stop offset="100%" stopColor="#003ECC" />
          </linearGradient>
        </defs>
        <path
          fill="url(#be-prism-grad)"
          d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.266 0-5.5-2.266-5.5-5.5 0-3.328 2.297-5.5 5.5-5.5 3.328 0 5.25 2.188 5.25 5.5v1h-8c0 1.844 1.344 3 3.031 3 1.25 0 2.281-.594 2.766-1.5h1.679zm-7.442-3h5.453c-.156-1.422-1.188-2.281-2.641-2.281-1.547 0-2.594.922-2.812 2.281zm-11.284 3h3.5c1.641 0 2.5-.734 2.5-2 0-.969-.641-1.641-1.609-1.844.75-.297 1.359-.953 1.359-1.844 0-1.156-.844-1.812-2.25-1.812h-3.5v7.5zm2.5-4.5h1c.594 0 1 .313 1 .844 0 .547-.406.875-1 .875h-1v-1.719zm0-2h.844c.547 0 .906.281.906.75 0 .484-.359.75-.906.75h-.844v-1.5z"
        />
      </svg>
    ),
  },
  {
    id: 'youtube',
    nameEn: 'YouTube',
    nameFa: 'یوتیوب',
    handle: '@JirjirakStudio',
    url: 'https://youtube.com',
    brandGradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
    glowColor: 'rgba(255, 0, 0, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="yt-prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="100%" stopColor="#B30000" />
          </linearGradient>
        </defs>
        <path
          fill="url(#yt-prism-grad)"
          d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
    ),
  },
  {
    id: 'discord',
    nameEn: 'Discord Community',
    nameFa: 'دیسکورد',
    handle: 'discord.gg/jirjirak',
    url: 'https://discord.gg',
    brandGradient: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
    glowColor: 'rgba(88, 101, 242, 0.4)',
    svgIcon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="dc-prism-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5865F2" />
            <stop offset="100%" stopColor="#4752C4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#dc-prism-grad)"
          d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
        />
      </svg>
    ),
  },
];

// ============================================================================
// 3. MAIN KINETIC PRISM COMPONENT
// ============================================================================
export function DirectChannelsSection({
  step = '02 / 04',
  stepFa = '۰۲ / ۰۴',
  badge = 'DIRECT CHANNELS',
  badgeFa = 'ارتباط مستقیم',
}: DirectChannelsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);
  };

  const accentText = isNight ? 'text-[#fff083]' : 'text-[#8f6b00]';

  return (
    <section
      id="direct-channels"
      ref={containerRef}
      className={`py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-t relative overflow-hidden transition-colors duration-700 ${
        isNight
          ? 'bg-brand-dark text-brand-light border-white/10'
          : 'bg-brand-light text-brand-dark border-black/10'
      }`}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none -z-10"
        style={{
          backgroundColor: isNight ? 'rgba(255,240,131,0.035)' : 'rgba(143,107,0,0.04)',
        }}
      />

      <div className="max-w-[1400px] mx-auto w-full">
        {/* =====================================================================
            HEADER: Clean, Punchy & Architectural
           ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className={`text-xs font-semibold tracking-widest font-mono ${accentText}`}>
                {isFa ? stepFa : step}
              </span>
              <span className="text-[11px] font-semibold tracking-widest uppercase opacity-65 font-mono">
                {isFa ? badgeFa : badge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              {isFa ? (
                <>
                  <span>ارتباط مستقیم </span>
                  <span className={accentText}>و اکوسیستم شبکه‌ها</span>
                </>
              ) : (
                <>
                  <span>Direct Lines </span>
                  <span className={accentText}>& Social Nexus</span>
                </>
              )}
            </h2>
          </div>

          <div className="text-xs font-mono opacity-50 self-start md:self-end">
            {isFa ? 'پاسخ‌گویی مستقیم بدون واسطه' : 'Direct unscripted studio access'}
          </div>
        </div>

        {/* =====================================================================
            KINETIC PRISM DESIGN
           ===================================================================== */}
        <div className="flex flex-col gap-6 sm:gap-8">
          
          {/* ===================================================================
              TOP ROW: 3 DIRECT PRIMARY CARDS (Phone, Address, Email)
              Without Numbering, Perfectly Balanced in 3 Columns
             =================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {DIRECT_CONTACTS.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`relative p-5 sm:p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between overflow-hidden group shadow-lg ${
                    isNight
                      ? 'bg-gradient-to-b from-neutral-900/85 via-neutral-900/60 to-neutral-950/90 border-white/10 hover:border-[#fff083]/50 hover:shadow-[0_8px_30px_rgba(255,240,131,0.08)]'
                      : 'bg-gradient-to-b from-white via-white to-neutral-50 border-black/8 hover:border-[#8f6b00]/50 hover:shadow-md'
                  }`}
                >
                  {/* Top Spectral Gradient Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#fff083]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon & Status Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${
                        isNight
                          ? 'bg-neutral-950 border-white/10 text-[#fff083]'
                          : 'bg-neutral-100 border-black/10 text-[#8f6b00]'
                      }`}
                    >
                      {item.type === 'phone' && <Phone className="w-5 h-5" />}
                      {item.type === 'location' && <MapPin className="w-5 h-5" />}
                      {item.type === 'email' && <Mail className="w-5 h-5" />}
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                        isNight
                          ? 'bg-neutral-950/80 border-white/10 text-neutral-400'
                          : 'bg-neutral-100 border-black/10 text-neutral-600'
                      }`}
                    >
                      {isFa ? item.badgeFa : item.badgeEn}
                    </span>
                  </div>

                  {/* Title & Display Value */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider opacity-60 mb-1">
                      {isFa ? item.labelFa : item.labelEn}
                    </div>
                    <div
                      className="text-sm sm:text-base font-bold font-mono tracking-tight truncate group-hover:text-[#fff083] transition-colors"
                      dir={item.type === 'location' ? undefined : 'ltr'}
                    >
                      {item.displayValue}
                    </div>
                  </div>

                  {/* Actions: Action Button + 1-Click Copy Button */}
                  <div className="flex items-center gap-2 pt-3.5 border-t border-current/10">
                    <a
                      href={item.actionUrl}
                      target={item.isExternal ? '_blank' : undefined}
                      rel="noreferrer"
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95 ${
                        isNight
                          ? 'bg-[#fff083] text-[#141416] hover:bg-white hover:text-black shadow-sm'
                          : 'bg-[#8f6b00] text-white hover:bg-[#705400] shadow-sm'
                      }`}
                    >
                      <span>{isFa ? item.actionTextFa : item.actionTextEn}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.value, item.id)}
                      className={`p-2 rounded-xl border text-xs font-mono transition-colors cursor-pointer shrink-0 flex items-center justify-center ${
                        isNight
                          ? 'border-white/10 hover:bg-white/10 text-neutral-300'
                          : 'border-black/10 hover:bg-black/5 text-neutral-700'
                      }`}
                      title={isFa ? 'کپی' : 'Copy'}
                    >
                      {isCopied ? (
                        <div className="flex items-center gap-1 text-emerald-500">
                          <Check className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">{isFa ? 'کپی شد' : 'Copied'}</span>
                        </div>
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-65 group-hover:opacity-100" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================
              BOTTOM PRISM CONTAINER: JEWEL-LIKE SOCIAL TOKENS GRID
              Accurate Official Brand Gradients & Spectral Halos
             =================================================================== */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              isNight
                ? 'bg-neutral-900/40 border-white/10 shadow-2xl backdrop-blur-md'
                : 'bg-white/80 border-black/8 shadow-xl'
            }`}
          >
            {/* Header info bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-current/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#fff083]/15 text-[#fff083] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold tracking-tight">
                    {isFa ? 'اکوسیستم شبکه‌های اجتماعی استودیو جیرجیرک' : 'Studio Social Ecosystem'}
                  </h3>
                  <p className="text-xs opacity-50 font-mono">
                    {isFa
                      ? 'برای مشاهده و عضویت در هر شبکه کلیک کنید'
                      : 'Tap any brand jewel token to inspect & connect'}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono px-3 py-1 rounded-full border border-current/20 opacity-70 self-start md:self-auto">
                {SOCIAL_ECOSYSTEM.length} {isFa ? 'شبکه فعال' : 'Active Gateways'}
              </div>
            </div>

            {/* Exact-Color Jewelry-Like Jewel Tokens Array (Scalable for 10, 15, 20+ channels) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
              {SOCIAL_ECOSYSTEM.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`aspect-square p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 group cursor-pointer relative overflow-hidden active:scale-95 ${
                    isNight
                      ? 'bg-neutral-950/70 border-white/10 hover:border-white/50 text-neutral-300'
                      : 'bg-neutral-50 border-black/10 hover:border-black/40 text-neutral-700'
                  }`}
                  style={{
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.06)`,
                  }}
                >
                  {/* Spectral Refraction Glow On Hover in Exact Brand Gradient / Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${social.glowColor} 0%, transparent 80%)`,
                    }}
                  />

                  {/* Logo with Authentic Official Colors */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-120 group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]">
                    {social.svgIcon()}
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-mono font-bold tracking-wider opacity-65 group-hover:opacity-100 transition-opacity truncate max-w-full">
                    {isFa ? social.nameFa : social.nameEn}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
