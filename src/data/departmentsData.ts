export interface DepartmentData {
  id: string;
  slug: string;
  number: string;
  nameEn: string;
  nameFa: string;
  sloganEn: string;
  sloganFa: string;
  descriptionEn: string;
  descriptionFa: string;
  tagsEn: string[];
  tagsFa: string[];
  image: string;
  iconType: 'web' | 'seo' | 'marketing' | 'branding' | 'academy' | 'creative' | 'game';
}

export const DEPARTMENTS: DepartmentData[] = [
  {
    id: 'web-dev',
    slug: 'web-development',
    number: '01',
    nameEn: 'Web & Development',
    nameFa: 'وب و توسعه',
    sloganEn: 'WHERE IDEAS TURN TO CODE',
    sloganFa: 'جایی که ایده‌ها به کد تبدیل می‌شوند',
    descriptionEn: 'Architecture, clean coding, high performance & modern user experience.',
    descriptionFa: 'ساختار، کدنویسی اصولی، عملکرد بالا و تجربه کاربری روان و سریع',
    tagsEn: ['Architecture', 'Clean Code', 'Performance', 'UI / UX Systems'],
    tagsFa: ['معماری نرم‌افزار', 'کدنویسی تمیز', 'عملکرد بالا', 'طراحی رابط و تجربه کاربری'],
    image: '/assets/images/departments/Web-&-Development.png',
    iconType: 'web',
  },
  {
    id: 'seo-analytics',
    slug: 'seo-analytics',
    number: '02',
    nameEn: 'SEO & Analytics',
    nameFa: 'سئو و تحلیل داده',
    sloganEn: 'DATA DRIVES GROWTH',
    sloganFa: 'داده‌ها پیشران رشد ارگانیک',
    descriptionEn: 'Data analytics, search engine optimization, strategy & organic impact.',
    descriptionFa: 'داده، تحلیل عمیق، استراتژی سئو، بهینه‌سازی و رشد هدفمند پایدار',
    tagsEn: ['Data Analytics', 'Technical SEO', 'Growth Strategy', 'Conversion Rate'],
    tagsFa: ['تحلیل داده', 'سئو تکنیکال', 'استراتژی رشد', 'بهینه‌سازی نرخ تبدیل'],
    image: '/assets/images/departments/Seo-&-Analytics.png',
    iconType: 'seo',
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    number: '03',
    nameEn: 'Digital Marketing & Growth',
    nameFa: 'دیجیتال مارکتینگ و رشد',
    sloganEn: 'THINK • CREATE • SHARE • GROW',
    sloganFa: 'تفکر • خلق • اشتراک • رشد',
    descriptionEn: 'Performance campaigns, social networks, content strategy & scaled funnels.',
    descriptionFa: 'طراحی کمپین‌های عملکردمحور، تبلیغات هدفمند، شبکه‌های اجتماعی و جذب مخاطب',
    tagsEn: ['Paid Campaigns', 'Social Media', 'Content Strategy', 'Growth Funnel'],
    tagsFa: ['کمپین‌های تبلیغاتی', 'شبکه‌های اجتماعی', 'استراتژی محتوا', 'قیف رشد و لید'],
    image: '/assets/images/departments/Digital-Marketing-&-Growth.png',
    iconType: 'marketing',
  },
  {
    id: 'branding-identity',
    slug: 'branding-identity',
    number: '04',
    nameEn: 'Branding & Identity',
    nameFa: 'برندینگ و هویت',
    sloganEn: 'BRAND STORY',
    sloganFa: 'داستان متمایز و ماندگار برند',
    descriptionEn: 'Brand strategy, naming, visual identity systems & bespoke storytelling.',
    descriptionFa: 'استراتژی برند، نام‌گذاری، زبان طراحی بصری و روایت‌گری منحصر‌به‌فرد',
    tagsEn: ['Brand Strategy', 'Naming', 'Visual Identity', 'Brand Guidelines'],
    tagsFa: ['استراتژی برند', 'نام‌گذاری', 'هویت بصری', 'کتابچه هویت برند'],
    image: '/assets/images/departments/Branding-&-Identity.png',
    iconType: 'branding',
  },
  {
    id: 'academy-hub',
    slug: 'academy-learning',
    number: '05',
    nameEn: 'Academy & Learning',
    nameFa: 'آموزش و آکادمی',
    sloganEn: 'LEARN • APPLY • GROW',
    sloganFa: 'یادگیری • به‌کارگیری • رشد مستمر',
    descriptionEn: 'Online education, practical workshops, courses & lifelong creative community.',
    descriptionFa: 'آموزش آنلاین، کارگاه‌های عملی، دوره‌های تخصصی و جامعه یادگیری پویا',
    tagsEn: ['Specialized Courses', 'Live Workshops', 'Mentorship', 'Creative Hub'],
    tagsFa: ['دوره‌های تخصصی', 'کارگاه‌های عملی', 'جامعه متخصصان', 'منتورشیپ خلاق'],
    image: '/assets/images/departments/Academy-&-Learning-Hub.png',
    iconType: 'academy',
  },
  {
    id: 'creative-studio',
    slug: 'creative-studio',
    number: '06',
    nameEn: 'Creative Studio',
    nameFa: 'استودیو خلاقیت',
    sloganEn: 'GRAPHIC & ANIMATION',
    sloganFa: 'خلق دنیاهای بصری پویا و جذاب',
    descriptionEn: 'Creative ideation, motion graphics, 2D/3D illustration & visual art.',
    descriptionFa: 'ایده‌پردازی، طراحی گرافیک، موشن‌گرافیک و تصویرسازی دیجیتال اختصاصی',
    tagsEn: ['Motion Design', 'Visual Art', 'Illustration', 'Creative Direction'],
    tagsFa: ['موشن‌دیزاین', 'تصویرسازی اختصاصی', 'طراحی گرافیک', 'ایده‌پردازی خلاق'],
    image: '/assets/images/departments/Creative-Studio.png',
    iconType: 'creative',
  },
  {
    id: 'game-interactive',
    slug: 'game-interactive',
    number: '07',
    nameEn: 'Game Studio & Interactive',
    nameFa: 'بازی‌سازی و تجارب تعاملی',
    sloganEn: 'PLAY • CREATE • INSPIRE',
    sloganFa: 'بازی • آفرینش • الهام‌بخشی',
    descriptionEn: 'Game mechanics design, interactive 3D spaces, programming & playful fun.',
    descriptionFa: 'طراحی گیم‌پلی، دنیاهای سه‌بعدی وب، برنامه‌نویسی خلاق و سرگرمی تعاملی',
    tagsEn: ['Interactive 3D', 'Game Mechanics', 'Creative Coding', 'Character Art'],
    tagsFa: ['بازی‌سازی سه‌بعدی', 'تجارب تعاملی وب', 'برنامه‌نویسی خلاق', 'طراحی مکانیک بازی'],
    image: '/assets/images/departments/Game-Studio-&-Interactive.png',
    iconType: 'game',
  },
];
