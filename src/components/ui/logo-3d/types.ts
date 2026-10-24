/**
 * =========================================================================
 * ⚠️ اخطار بسیار مهم سیستمی (CRITICAL PRESERVATION NOTICE)
 * به هیچ‌عنوان هیچ هوش مصنوعی (AI) یا برنامه‌نویسی حق ندارد این تایپ‌ها،
 * استایل‌ها و تعاریف لوگوهای سه‌بعدی و شیشه‌ای جیرجیرک را پاک یا دستکاری کند،
 * تا زمانی که تایید صریح و مستقیم از کارفرما گرفته نشده باشد.
 * این ۶ طراحی منتخب برای قابلیت سوییچ در پنل ادمین (Admin Studio Panel)
 * که در مراحل بعدی ساخته می‌شود کاملاً حفظ و رزرو شده‌اند.
 * =========================================================================
 */

export type Logo3DStyleId = 
  | 'classic-flat'
  | 'glass-frosted-neon'
  | 'glass-crystal-prism'
  | 'glass-tinted-smoked'
  | 'glass-liquid-gloss'
  | 'glass-architectural-fluted';

export interface Logo3DStyleOption {
  id: Logo3DStyleId;
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  badgeEn: string;
  badgeFa: string;
  accentColor: string;
  lightingType: string;
}

export const LOGO_3D_STYLES: Logo3DStyleOption[] = [
  {
    id: 'classic-flat',
    titleEn: 'Classic Flat 2D',
    titleFa: 'تخت کلاسیک (اورجینال)',
    subtitleEn: 'Original Studio Vector',
    subtitleFa: 'وکتور اولیه دو بعدی استودیو',
    descriptionEn: 'The original clean 2D vector logo with solid brand yellow and studio contour lines.',
    descriptionFa: 'طراحی مینی‌مال و اورجینال دو بعدی جیرجیرک با رنگ‌های سازمانی و بدون سایه.',
    badgeEn: 'Original 2D',
    badgeFa: 'طرح اصلی',
    accentColor: '#fff083',
    lightingType: 'Flat 2D',
  },
  {
    id: 'glass-frosted-neon',
    titleEn: 'Frosted Glass & Core Glow',
    titleFa: 'شیشه مات و درخشش درونی',
    subtitleEn: 'Translucent Volume & Soft Glow',
    subtitleFa: 'طرح شیشه‌ای محبوب اولیه با لبه‌های نرم',
    descriptionEn: 'The favorite translucent frosted glass with an internal luminous light spine and soft refractive edge highlights.',
    descriptionFa: 'همان استایل شیشه‌ای مات منتخب با خط نور درونی، بدون نقطه مفصل در پایین و دارای استروک تفکیک‌کننده برای حالت روز.',
    badgeEn: 'Frosted Glass',
    badgeFa: 'گلس مات',
    accentColor: '#fff083',
    lightingType: 'Frosted Translucent',
  },
  {
    id: 'glass-crystal-prism',
    titleEn: 'Prismatic Beveled Crystal',
    titleFa: 'کریستال منشوری و پخ شفاف',
    subtitleEn: 'Faceted Optical Glass & Crisp Chamfer',
    subtitleFa: 'تراش چندوجهی، شکست نور منشوری و های‌لایت اوپتیکال',
    descriptionEn: 'Precision optical crystal with chiseled facets, prismatic chromatic edge highlights, and sparkling specular reflections.',
    descriptionFa: 'شیشه کریستالی تراش‌خورده با لبه‌های پخ با زاویه نور تند، بازتاب‌های منشوری براق و شفافیت فوق‌العاده.',
    badgeEn: 'Crystal Prism',
    badgeFa: 'کریستال منشوری',
    accentColor: '#ffe875',
    lightingType: 'Optical Dispersion',
  },
  {
    id: 'glass-tinted-smoked',
    titleEn: 'Deep Amber & Smoked Glass',
    titleFa: 'شیشه دودی و کهربایی ژرف',
    subtitleEn: 'High-Contrast Architectural Glass',
    subtitleFa: 'شیشه رنگی متراکم با کانتراست لوکس و سایه ژرف',
    descriptionEn: 'Dense architectural smoked and deep amber glass with high refractive contrast, deep shadows, and glossy surface sheens.',
    descriptionFa: 'الهام‌گرفته از پنل‌های شیشه سکوریت دودی و شیشه‌های طلایی معماری؛ با غلظت بالای رنگ و کانتورینگ بسیار واضح.',
    badgeEn: 'Smoked Glass',
    badgeFa: 'شیشه دودی',
    accentColor: '#f59e0b',
    lightingType: 'Tinted Vitreous',
  },
  {
    id: 'glass-liquid-gloss',
    titleEn: 'Liquid Acrylic & Convex Gloss',
    titleFa: 'آکرلیک مایع و انحنای براق',
    subtitleEn: 'Polished Resin & Curved Glare',
    subtitleFa: 'حجم محدب صیقلی با خطوط نور خمیده سه‌بعدی',
    descriptionEn: 'Ultra-glossy thick resin and convex acrylic look with curved specular glare along the aerofoil wings.',
    descriptionFa: 'جلوه آکرلیک صیقلی ضخیم و رزین براق با انعکاس‌های منحنی نور در طول انحنای بال‌ها که حس دست‌ساز و صیقلی سه‌بعدی می‌دهد.',
    badgeEn: 'Liquid Gloss',
    badgeFa: 'آکرلیک صیقلی',
    accentColor: '#fff5a0',
    lightingType: 'Convex Specular',
  },
  {
    id: 'glass-architectural-fluted',
    titleEn: 'Architectural Fluted Glass',
    titleFa: 'شیشه شیاردار معماری (Fluted)',
    subtitleEn: 'Reeded Texture & Linear Refraction',
    subtitleFa: 'خطوط بافت‌دار ریبد با حرکت نوری پویا حین بال‌زدن',
    descriptionEn: 'Inspired by ribbed fluted glass used in premium architecture, creating stunning dynamic refraction streaks when the wings flap.',
    descriptionFa: 'الهام از شیشه‌های شیاردار و بافت‌دار مدرن؛ شیارهای خطی نور هنگام بال‌زدن جیرجیرک یک حرکت نوری زنده و خاص خلق می‌کنند.',
    badgeEn: 'Fluted Glass',
    badgeFa: 'شیاردار معماری',
    accentColor: '#fde047',
    lightingType: 'Reeded Refraction',
  },
];
