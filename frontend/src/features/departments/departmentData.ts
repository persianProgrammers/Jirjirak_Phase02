import { ALL_TEAM_MEMBERS, MemberData, DepartmentCategory } from '../landing/components/team-models/teamData';

// Direct project images
import toyooranImg from '@/src/assets/images/projects/project_toyooran.png';
import kafiImg from '@/src/assets/images/projects/project_kafi_1790411104227.jpg';
import gamingImg from '@/src/assets/images/projects/project_gaming_1790411118596.jpg';
import fintechImg from '@/src/assets/images/projects/project_fintech_1790411153505.jpg';

export interface DepartmentProject {
  id: string;
  titleEn: string;
  titleFa: string;
  categoryEn: string;
  categoryFa: string;
  descEn: string;
  descFa: string;
  client: string;
  year: string;
  metrics: {
    labelEn: string;
    labelFa: string;
    val: string;
  }[];
  techStack: string[];
  image: string;
  accentColor: string;
}

export interface DepartmentDetailData {
  id: DepartmentCategory;
  number: string;
  slug: string;
  titleEn: string;
  titleFa: string;
  sloganEn: string;
  sloganFa: string;
  manifestoEn: string;
  manifestoFa: string;
  disciplineEn: string;
  disciplineFa: string;
  roomImage: string;
  roomImageThumb: string;
  accentColor: string;
  capabilitiesEn: string[];
  capabilitiesFa: string[];
  standardsEn: { title: string; desc: string }[];
  standardsFa: { title: string; desc: string }[];
  projects: DepartmentProject[];
}

export const DEPARTMENTS_DATA: DepartmentDetailData[] = [
  {
    id: 'web-dev',
    number: '01',
    slug: 'web-development',
    titleEn: 'Web & Development',
    titleFa: 'وب و توسعه نرم‌افزار',
    sloganEn: 'Where Ideas Turn to Code',
    sloganFa: 'جایی که ایده‌ها به کد پایدار تبدیل می‌شوند',
    manifestoEn:
      'We treat software development as an architectural discipline. Clean coding, zero bloat, ultra-high performance, and resilience are not afterthoughts—they are the foundation.',
    manifestoFa:
      'ما توسعه نرم‌افزار را شاخه‌ای از معماری می‌دانیم. کدنویسی تمیز، حذف بار اضافی، عملکرد بسیار بالا و پایداری برای ما اصل بنیادین هستند، نه یک ویژگی فرعی.',
    disciplineEn: 'Engineering-Level Software Precision',
    disciplineFa: 'انضباط و دقت مهندسی در توسعه وب',
    roomImage: '/assets/images/departments/Web-&-Development.png',
    roomImageThumb: '/assets/images/departments/Web-&-Development-thumb.webp',
    accentColor: '#fff083',
    capabilitiesEn: [
      'High-Performance Web Applications',
      'System Architecture & Microfrontends',
      'Interactive 3D / WebGL Canvas Experiences',
      'Clean Code & Automated Testing',
      'Scalable Fullstack Systems',
    ],
    capabilitiesFa: [
      'وب‌اپلیکیشن‌های پیشرفته با سرعت و عملکرد بالا',
      'معماری سیستم و سیستم‌های میکروسرویس و فرانت‌اند',
      'تجارب تعاملی سه‌بعدی و بوم وب‌جی‌ال (WebGL)',
      'کدنویسی استاندارد، تمیز و آزمون‌پذیر',
      'توسعه سیستم‌های مقیاس‌پذیر فول‌استک',
    ],
    standardsEn: [
      { title: 'Sub-second Load Times', desc: 'Optimized rendering pipeline ensuring instant response.' },
      { title: 'Modular Architecture', desc: 'Maintainable, clean separation of concerns.' },
      { title: 'Design Fidelity', desc: 'Pixel-perfect translation from Figma to dynamic React code.' },
    ],
    standardsFa: [
      { title: 'پاسخگویی زیر ۱ ثانیه', desc: 'بهینه‌سازی خط رندر و دارایی‌ها برای سرعت آنی.' },
      { title: 'معماری ماژولار', desc: 'کد تمیز با قابلیت نگهداری و توسعه درازمدت.' },
      { title: 'دقت میلی‌متری به دیزاین', desc: 'پیاده‌سازی دقیق رابط کاربری از فیگما به کد زنده.' },
    ],
    projects: [
      {
        id: 'toyooran-web',
        titleEn: 'Toyooran Digital Flagship',
        titleFa: 'پلتفرم دیجیتال صنعتی طیوران',
        categoryEn: 'Web / Architecture / 3D Space',
        categoryFa: 'وب‌سایت / معماری دیجیتال / فضای تعاملی',
        descEn: 'Architectural, immersive digital flagship capturing sensory depth and physical space with zero lag.',
        descFa: 'طراحی پیشرو و معماری دیجیتال برای تجربه‌ای فراتر از یک وب‌سایت متعارف، با ساختار سریع و روان.',
        client: 'Toyooran Industrial Group',
        year: '2026',
        metrics: [
          { labelEn: 'Performance Score', labelFa: 'امتیاز لایت‌هاوس', val: '99/100' },
          { labelEn: 'Interaction Latency', labelFa: 'تاخیر تعاملات', val: '< 16ms' },
          { labelEn: 'Architecture', labelFa: 'معماری سیستم', val: 'Decoupled' },
        ],
        techStack: ['React 19', 'Tailwind CSS', 'WebGL', 'GSAP', 'Vite'],
        image: toyooranImg,
        accentColor: '#fff083',
      },
      {
        id: 'noura-banking-core',
        titleEn: 'Noura Intelligent Financial Engine',
        titleFa: 'موتور پردازش مالی هوشمند نورا',
        categoryEn: 'Fintech / Enterprise Web System',
        categoryFa: 'فین‌تک / سامانه مدیریت مالی پیشرفته',
        descEn: 'Next-generation financial intelligence hub balancing ultra-low latency with biometric security.',
        descFa: 'هاب هوشمند مالی با امنیت بیومتریک، معماری بدون تأخیر و داشبورد تحلیلی مدرن.',
        client: 'Noura Capital Group',
        year: '2026',
        metrics: [
          { labelEn: 'Security Standard', labelFa: 'استاندارد امنیتی', val: 'Grade-A' },
          { labelEn: 'Stream Throughput', labelFa: 'نرخ داده زنده', val: '12k ops/s' },
          { labelEn: 'Uptime', labelFa: 'پایداری عملیاتی', val: '99.99%' },
        ],
        techStack: ['TypeScript', 'Microfrontends', 'Biometrics', 'Realtime Stream'],
        image: fintechImg,
        accentColor: '#b3a85c',
      },
    ],
  },
  {
    id: 'seo-analytics',
    number: '02',
    slug: 'seo-analytics',
    titleEn: 'SEO & Analytics',
    titleFa: 'سئو، داده و تحلیل رشد',
    sloganEn: 'Data Drives Growth',
    sloganFa: 'داده‌ها پیشران رشد ارگانیک و پایدار',
    manifestoEn:
      'We do not chase temporary algorithms or gimmicky keywords. We engineer technical organic visibility, semantic content relevance, and conversion architecture grounded in statistical reality.',
    manifestoFa:
      'ما به دنبال ترفندهای زودگذر یا کلمات کلیدی بی‌ارزش نیستیم. ما دیده شدن ارگانیک را با معماری تکنیکال، ساختار معنایی داده‌ها و قیف‌های دقیق نرخ تبدیل مهندسی می‌کنیم.',
    disciplineEn: 'Statistical Rigor & Technical SEO',
    disciplineFa: 'دقت آماری و معماری سئو تکنیکال',
    roomImage: '/assets/images/departments/Seo-&-Analytics.png',
    roomImageThumb: '/assets/images/departments/Seo-&-Analytics-thumb.webp',
    accentColor: '#b3a85c',
    capabilitiesEn: [
      'Technical SEO Audit & Infrastructure',
      'Semantic Search & Knowledge Graph Mapping',
      'User Funnel Analytics & Conversion Optimization',
      'Competitor Signal Intelligence',
      'Data-Backed Growth Engineering',
    ],
    capabilitiesFa: [
      'آدیت زیرساخت و معماری سئو تکنیکال',
      'سئوی معنایی و طراحی گراف دانش موضوعی',
      'تحلیل عمیق رفتار کاربر و بهبود نرخ تبدیل (CRO)',
      'هوش رقابتی و استخراج سیگنال‌های بازار',
      'مهندسی رشد ارگانیک مبتنی بر داده‌های واقعی',
    ],
    standardsEn: [
      { title: 'Zero Vanity Metrics', desc: 'Focus strictly on qualified traffic and conversions.' },
      { title: 'Structured Schema', desc: 'Deep semantic JSON-LD linked data for search engines.' },
      { title: 'Technical Speed', desc: 'Core Web Vitals optimized in the green threshold.' },
    ],
    standardsFa: [
      { title: 'حذف معیارهای نمایشی', desc: 'تمرکز صددرصدی بر جذب مخاطب هدف و تبدیل واقعی.' },
      { title: 'داده‌های ساخت‌یافته', desc: 'پیاده‌سازی دقیق اسکیما و ارتباط معنایی برای موتورهای جستجو.' },
      { title: 'سرعت هسته وب', desc: 'پاس کردن شاخص‌های Core Web Vitals در وضعیت سبز.' },
    ],
    projects: [
      {
        id: 'seo-growth-matrix',
        titleEn: 'Enterprise Organic Growth Matrix',
        titleFa: 'مهندسی رشد ارگانیک پلتفرم B2B',
        categoryEn: 'Technical SEO / Data Architecture',
        categoryFa: 'سئو تکنیکال / معماری داده‌های سازمانی',
        descEn: 'Rebuilding data pipelines and semantic graph resulting in 430% organic visibility increase.',
        descFa: 'بازطراحی ساختار معنایی، سئو تکنیکال و هاب محتوا که منجر به افزایش ۴۳۰ درصدی ورودی ارگانیک شد.',
        client: 'Industrial Nexus Corp',
        year: '2025',
        metrics: [
          { labelEn: 'Organic Growth', labelFa: 'رشد ورودی ارگانیک', val: '+430%' },
          { labelEn: 'Core Web Vitals', labelFa: 'شاخص هسته وب', val: '100% Pass' },
          { labelEn: 'Keywords Ranked #1', labelFa: 'کلمات رتبه ۱', val: '180+' },
        ],
        techStack: ['Schema.org', 'BigQuery', 'Search Console API', 'Core Web Vitals'],
        image: toyooranImg,
        accentColor: '#b3a85c',
      },
    ],
  },
  {
    id: 'branding-identity',
    number: '03',
    slug: 'branding-identity',
    titleEn: 'Branding & Identity',
    titleFa: 'برندینگ و هویت استراتژیک',
    sloganEn: 'Distinctive Character, Not Generic Clichés',
    sloganFa: 'شخصیت متمایز، فراتر از کلیشه‌های تکراری',
    manifestoEn:
      'A brand is not merely a logo. It is the distinct atmosphere, personality, voice, and system that people remember. We shape brands with intelligence, cultural depth, and typographic character.',
    manifestoFa:
      'برند صرفاً یک لوگو نیست؛ برند همان اتمسفر متمایز، لحن، صدا و سیستمی است که در ذهن مخاطب نقش می‌بندد. ما برندها را با هوشمندی، عمق فرهنگی و استواری تایپوگرافی خلق می‌کنیم.',
    disciplineEn: 'Strategic Identity Systems',
    disciplineFa: 'سیستم‌های هویت استراتژیک و پایدار',
    roomImage: '/assets/images/departments/Branding-&-Identity.png',
    roomImageThumb: '/assets/images/departments/Branding-&-Identity-thumb.webp',
    accentColor: '#fff083',
    capabilitiesEn: [
      'Brand Strategy & Positioning',
      'Bespoke Naming & Linguistic Craft',
      'Visual Identity Systems & Guidelines',
      'Custom Typography & Monogram Design',
      'Packaging & Spatial Brand Touchpoints',
    ],
    capabilitiesFa: [
      'استراتژی و جایگاه‌یابی متمایز برند',
      'نام‌گذاری تخصصی، ریشه‌یابی و لحن کلامی',
      'طراحی سیستم و کتابچه جامع هویت بصری',
      'طراحی تایپوگرافی اختصاصی و نشان‌ها',
      'طراحی بسته‌بندی و نقاط تماس فضایی برند',
    ],
    standardsEn: [
      { title: 'Timeless Geometry', desc: 'Avoiding trend-chasing in favor of enduring form.' },
      { title: 'Systemic Cohesion', desc: 'Rules that adapt across physical and digital media.' },
      { title: 'Human Resonance', desc: 'Identity that sparks emotional curiosity and confidence.' },
    ],
    standardsFa: [
      { title: 'فرم پایدار و بی‌زمان', desc: 'اجتناب از ترندهای گذرا به نفع هویت ریشه‌دار.' },
      { title: 'یکپارچگی سیستمی', desc: 'قواعد بصری منسجم در رسانه‌های فیزیکی و دیجیتال.' },
      { title: 'طنین انسانی', desc: 'هویتی که همزمان حس کنجکاوی و اعتماد را برمی‌انگیزد.' },
    ],
    projects: [
      {
        id: 'kafi-brand-system',
        titleEn: 'Kafi Specialty Atelier Identity',
        titleFa: 'هویت بصری و فضایی آتلیه قهوه کافی',
        categoryEn: 'Brand Strategy / Spatial Identity',
        categoryFa: 'استراتژی برند / تجربه فضایی و هویت',
        descEn: 'Sensory boutique coffee atelier with warm ambient amber lighting, minimal typography and dark walnut textures.',
        descFa: 'خلق هویت حسی برای آتلیه قهوه با نور کهربایی، تایپوگرافی مینیمال و جزئیات ظریف بسته‌بندی.',
        client: 'Kafi Atelier',
        year: '2025',
        metrics: [
          { labelEn: 'Brand Recognition', labelFa: 'شاخص تمایز برند', val: 'Top 3%' },
          { labelEn: 'Touchpoints Designed', labelFa: 'نقاط تماس طراحی‌شده', val: '45+' },
          { labelEn: 'Retention Impact', labelFa: 'ماندگاری ذهنی', val: 'High' },
        ],
        techStack: ['Brand Guidelines', 'Custom Typography', 'Packaging Design', 'Sensory Identity'],
        image: kafiImg,
        accentColor: '#e5a952',
      },
    ],
  },
  {
    id: 'creative-studio',
    number: '04',
    slug: 'creative-studio',
    titleEn: 'Creative Studio',
    titleFa: 'استودیو گرافیک و انیمیشن',
    sloganEn: 'Motion, Form & Visual Worlds',
    sloganFa: 'جهان‌های بصری، فرم‌های پویا و موشن‌گرافیک',
    manifestoEn:
      'We combine illustration, kinetic motion design, and visual storytelling to make digital experiences feel alive, memorable, and captivating without sacrificing performance.',
    manifestoFa:
      'ما تصویرسازی، موشن‌دیزاین و روایت‌گری بصری را در هم می‌آمیزیم تا تجارب دیجیتال زنده، ماندگار و چشم‌نواز شوند، بدون آنکه سرعت و عملکرد افت کند.',
    disciplineEn: 'Kinetic & Visual Craftsmanship',
    disciplineFa: 'مهارت سینمایی و هنرهای بصری پویا',
    roomImage: '/assets/images/departments/Creative-Studio.png',
    roomImageThumb: '/assets/images/departments/Creative-Studio-thumb.webp',
    accentColor: '#fff083',
    capabilitiesEn: [
      'Motion Design & Kinetic Storytelling',
      'Art Direction & 2D/3D Illustration',
      'Brand Video & Micro-interactions',
      'Visual Concept Development',
      'Performance-Optimized SVG / Lottie Animations',
    ],
    capabilitiesFa: [
      'موشن‌دیزاین و انیمیشن‌های تعاملی باکیفیت',
      'هدایت هنری و تصویرسازی دوبعدی و سه‌بعدی',
      'ویدیوهای مفهومی برند و میکرواینترکشن‌ها',
      'توسعه کانسپت و استوری‌بورد بصری',
      'انیمیشن‌های بهینه‌شده وب (SVG و Lottie)',
    ],
    standardsEn: [
      { title: 'Motion with Purpose', desc: 'No animation without UX or narrative reason.' },
      { title: '60 FPS Smoothness', desc: 'Silky rendering across all devices.' },
      { title: 'Visual Distinctiveness', desc: 'Original artworks, avoiding stock clichés.' },
    ],
    standardsFa: [
      { title: 'حرکت هدفمند', desc: 'هیچ انیمیشنی صرفاً برای شلوغی اضافه نمی‌شود.' },
      { title: 'روانی ۶۰ فریم بر ثانیه', desc: 'اجرای نرم و روان در تمامی موبایل‌ها و نمایشگرها.' },
      { title: 'اصالت بصری', desc: 'تصویرسازی‌های کاملاً اختصاصی بدون استفاده از قالب‌های آماده.' },
    ],
    projects: [
      {
        id: 'motion-system-showcase',
        titleEn: 'Kinetic Studio Brand Reel',
        titleFa: 'سیستم موشن و ویدیوآرت استودیو جیرجیرک',
        categoryEn: 'Motion Graphics / Visual Storytelling',
        categoryFa: 'موشن‌گرافیک / روایت بصری برند',
        descEn: 'Dynamic choreography of geometric forms, sound design, and brand identity in perfect rhythm.',
        descFa: 'رقص دقیق هندسه‌ها، طراحی صدای ظریف و زبان بصری جیرجیرک در قالبی ریتمیک و مدرن.',
        client: 'Jirjirak Studio Showcase',
        year: '2026',
        metrics: [
          { labelEn: 'Frame Rate', labelFa: 'نرخ فریم خروجی', val: '60 FPS' },
          { labelEn: 'Engagement Rate', labelFa: 'نرخ تعامل', val: '88%' },
          { labelEn: 'Asset Weight', labelFa: 'حجم بهینه‌شده', val: '< 1.8MB' },
        ],
        techStack: ['After Effects', 'Cinema 4D', 'Lottie', 'WebM', 'Sound FX'],
        image: gamingImg,
        accentColor: '#fff083',
      },
    ],
  },
  {
    id: 'digital-marketing',
    number: '05',
    slug: 'digital-marketing',
    titleEn: 'Digital Marketing & Growth',
    titleFa: 'دیجیتال مارکتینگ و رشد یکپارچه',
    sloganEn: 'Think • Create • Share • Grow',
    sloganFa: 'تفکر عمیق • خلق محتوا • انتشار هوشمند • رشد پایدار',
    manifestoEn:
      'We do not blast empty noise into the digital void. We design targeted performance campaigns, intelligent content funnels, and human narratives that build real client loyalty.',
    manifestoFa:
      'ما سر و صدای توخالی در فضای دیجیتال تولید نمی‌کنیم. ما کمپین‌های هدفمند عملکردمحور، قیف‌های فروش هوشمند و روایت‌های اصیل انسانی طراحی می‌کنیم که وفاداری واقعی می‌سازند.',
    disciplineEn: 'Disciplined Growth Architecture',
    disciplineFa: 'مهندسی رشد منظم و هدفمند',
    roomImage: '/assets/images/departments/Digital-Marketing-&-Growth.png',
    roomImageThumb: '/assets/images/departments/Digital-Marketing-&-Growth-thumb.webp',
    accentColor: '#b3a85c',
    capabilitiesEn: [
      'Targeted Performance Campaigns',
      'Content Strategy & High-Impact Copywriting',
      'Social Media Architecture & Narrative',
      'Lead Generation & Acquisition Funnels',
      'Retention & Client Lifecycle Optimization',
    ],
    capabilitiesFa: [
      'کمپین‌های عملکردمحور و تبلیغات کلیکی هوشمند',
      'استراتژی محتوا، کپی‌رایتینگ و سناریونویسی',
      'مدیریت هوشمند و هدفمند شبکه‌های اجتماعی',
      'طراحی قیف جذب سرنخ و مشتریان بالقوه (Leads)',
      'بهینه‌سازی چرخه عمر مخاطب و وفادارسازی',
    ],
    standardsEn: [
      { title: 'Audience Respect', desc: 'Honest communication over clickbait.' },
      { title: 'ROI Precision', desc: 'Tracking every dollar to measurable business outcome.' },
      { title: 'Brand Alignment', desc: 'Marketing that reinforces rather than cheapens brand stature.' },
    ],
    standardsFa: [
      { title: 'احترام به مخاطب', desc: 'ارتباط صادقانه به جای تیترهای زرد و فریبنده.' },
      { title: 'بازگشت سرمایه دقیق', desc: 'سنجش و اتصال هر ریال هزینه به نتیجه ملموس تجاری.' },
      { title: 'حفظ شأن برند', desc: 'مارکتینگی که اعتبار برند را تقویت می‌کند نه ارزان.' },
    ],
    projects: [
      {
        id: 'campaign-growth-nexus',
        titleEn: 'Omnichannel Precision Campaign',
        titleFa: 'کمپین جامع معرفی محصول نوآورانه',
        categoryEn: 'Omnichannel / Performance Marketing',
        categoryFa: 'مارکتینگ چندکاناله / جذب مخاطب کلیدی',
        descEn: 'Structured campaign blending thought leadership copy, targeted ads and conversion landing funnels.',
        descFa: 'کمپین یکپارچه مبتنی بر داستان‌سرایی معتبر، تبلیغات داده‌محور و صفحات فرود با نرخ تبدیل بالا.',
        client: 'Fintech Vanguard',
        year: '2025',
        metrics: [
          { labelEn: 'ROAS', labelFa: 'بازگشت هزینه تبلیغات', val: '4.8x' },
          { labelEn: 'Conversion Boost', labelFa: 'رشد نرخ تبدیل', val: '+62%' },
          { labelEn: 'Qualified Leads', labelFa: 'سرنخ‌های تاییدشده', val: '3,400+' },
        ],
        techStack: ['Analytics 4', 'Campaign Funnels', 'Copywriting', 'Heatmaps'],
        image: fintechImg,
        accentColor: '#b3a85c',
      },
    ],
  },
  {
    id: 'game-interactive',
    number: '06',
    slug: 'game-interactive',
    titleEn: 'Game Studio & Interactive',
    titleFa: 'بازی‌سازی و تجارب تعاملی',
    sloganEn: 'Play • Create • Inspire',
    sloganFa: 'بازی • آفرینش • الهام‌بخشی بی‌مرز',
    manifestoEn:
      'We build games and interactive spatial environments where playfulness meets technical mastery. From 3D web spaces to full gameplay mechanics, we bring wonder to the screen.',
    manifestoFa:
      'ما بازی‌ها و فضاهای تعاملی سه‌بعدی خلق می‌کنیم که در آن شوخ‌طبعی و سرگرمی با تسلط عمیق فنی گره می‌خورد؛ از دنیاهای وب تعاملی تا مکانیک‌های کامل بازی.',
    disciplineEn: 'Playful Engineering & Real-time 3D',
    disciplineFa: 'مهندسی تجارب تعاملی و سه‌بعدی بلادرنگ',
    roomImage: '/assets/images/departments/Game-Studio-&-Interactive.png',
    roomImageThumb: '/assets/images/departments/Game-Studio-&-Interactive-thumb.webp',
    accentColor: '#fff083',
    capabilitiesEn: [
      'Interactive 3D Web & Spatial Simulations',
      'Game Mechanics Design & Systems',
      'WebGL / Three.js / Shader Programming',
      'Character Art & World Environment Design',
      'Gamified Brand & Educational Experiences',
    ],
    capabilitiesFa: [
      'فضاهای تعاملی سه‌بعدی و شبیه‌سازی‌های وب',
      'طراحی مکانیک بازی، سیستم‌ها و منطق گیم‌پلی',
      'برنامه‌نویسی شیدر و وب‌جی‌ال (Three.js / WebGL)',
      'طراحی کاراکتر، محیط و اتمسفر بصری جهان بازی',
      'گیمیفیکیشن و خلق بازی‌های تعاملی برند',
    ],
    standardsEn: [
      { title: 'Intrinsic Play', desc: 'Mechanics that feel inherently delightful to interact with.' },
      { title: 'Engine Efficiency', desc: 'Fast rendering without dropping frame rates.' },
      { title: 'Sensory Detail', desc: 'Sound, physics, and visual feedback harmonized.' },
    ],
    standardsFa: [
      { title: 'لذت درونی تعامل', desc: 'مکانیک‌هایی که لمس و کار با آن‌ها ذاتاً سرگرم‌کننده است.' },
      { title: 'بهینه‌سازی موتور بازی', desc: 'رندرینگ سبک و بدون افت فریم در وب و دستگاه‌ها.' },
      { title: 'هماهنگی حسی', desc: 'ترکیب بی‌نقص فیزیک حرکت، نورپردازی و افکت‌های صوتی.' },
    ],
    projects: [
      {
        id: 'jirjirak-world-game',
        titleEn: 'Jirjirak World 3D Interactive Universe',
        titleFa: 'جهان تعاملی سه‌بعدی جیرجیرک',
        categoryEn: 'Gaming / Spatial World / WebGL',
        categoryFa: 'بازی‌سازی / شبیه‌سازی جهان سه‌بعدی وب',
        descEn: 'Expansive open-world adventure universe with stylized architectural art, dynamic physics and spatial sound.',
        descFa: 'دنیای ماجراجویی تعاملی با آرت‌استایل اختصاصی، هویت بصری پویا و شبیه‌سازی صدا در بستر وب.',
        client: 'Jirjirak Game Studios',
        year: '2025',
        metrics: [
          { labelEn: 'Render Engine', labelFa: 'موتور رندرینگ', val: 'Three.js / WebGL' },
          { labelEn: 'Frame Stability', labelFa: 'پایداری فریم', val: '60 FPS Solid' },
          { labelEn: 'Avg Session Time', labelFa: 'میانگین زمان کاوش', val: '8.4 Min' },
        ],
        techStack: ['Three.js', 'Shader Graph', 'GLSL', 'Spatial Audio', 'Physics Engine'],
        image: gamingImg,
        accentColor: '#4cd964',
      },
    ],
  },
  {
    id: 'academy-hub',
    number: '07',
    slug: 'academy-learning',
    titleEn: 'Academy & Learning Hub',
    titleFa: 'آکادمی و توسعه مهارت‌های تخصصی',
    sloganEn: 'Learn • Apply • Grow Continuously',
    sloganFa: 'یادگیری عمیق • کاربرد عملی • رشد مستمر',
    manifestoEn:
      'We believe the best way to master a discipline is to learn from active practitioners. Our academy bridges creative theory with real studio production for next-generation talent.',
    manifestoFa:
      'ما باور داریم بهترین روش تسلط بر یک تخصص، آموختن از کسانی است که خود در خط مقدم تولید هستند. آکادمی جیرجیرک پل میان دانش تئوری و واقعیت تولید استودیویی است.',
    disciplineEn: 'Practitioner-Led Pedagogy',
    disciplineFa: 'آموزش پروژه‌محور توسط طراحان و مهندسان فعال',
    roomImage: '/assets/images/departments/Academy-&-Learning-Hub.png',
    roomImageThumb: '/assets/images/departments/Academy-&-Learning-Hub-thumb.webp',
    accentColor: '#fff083',
    capabilitiesEn: [
      'Masterclasses in Creative Development & WebGL',
      'Advanced UI/UX Architecture & Design Systems',
      'Strategic Brand Thinking & Naming Workshops',
      'One-on-One Mentorship for Senior Creators',
      'Studio Production Labs & Internships',
    ],
    capabilitiesFa: [
      'دوره‌های پیشرفته توسعه نرم‌افزار خلاق و وب‌جی‌ال',
      'کارگاه‌های معماری رابط و تجربه کاربری (Design Systems)',
      'بوت‌کمپ‌های استراتژی برند و مهارت‌های نام‌گذاری',
      'جلسات منتورشیپ فردی برای طراحان و توسعه‌دهندگان',
      'ورود به پروژه‌های واقعی استودیو و کارآموزی تخصصی',
    ],
    standardsEn: [
      { title: 'Zero Theory Fluff', desc: 'Real production code and real design files.' },
      { title: 'Direct Mentorship', desc: 'Critiques from the studio founders and leads.' },
      { title: 'Portfolio-First', desc: 'Graduates build real, world-class works.' },
    ],
    standardsFa: [
      { title: 'بدون تئوری‌بافی‌های بیهوده', desc: 'بررسی کدهای واقعی خط تولید و فایل‌های واقعی دیزاین.' },
      { title: 'منتورشیپ مستقیم', desc: 'بازخورد فردی از بنیان‌گذاران و سرپرستان استودیو.' },
      { title: 'خروجی پورتفولیومحور', desc: 'هر دوره با خلق یک نمونه‌کار واقعی و باکیفیت پایان می‌یابد.' },
    ],
    projects: [
      {
        id: 'academy-masterclass-series',
        titleEn: 'Spatial Web Architecture Masterclass',
        titleFa: 'دوره جامع معماری وب و تجارب تعاملی',
        categoryEn: 'Education / Creative Engineering',
        categoryFa: 'آموزش تخصصی / مهندسی نرم‌افزار خلاق',
        descEn: 'Hands-on intensive masterclass taking developers from standard web layouts to 3D architectural canvas engineering.',
        descFa: 'کارگاه فشرده عملی برای انتقال مهندسان از وب متداول به طراحی و برنامه‌نویسی بوم‌های سه‌بعدی و مدرن.',
        client: 'Jirjirak Academy Alumni',
        year: '2026',
        metrics: [
          { labelEn: 'Graduates Placed', labelFa: 'نرخ اشتغال فارغ‌التحصیلان', val: '94%' },
          { labelEn: 'Hands-on Projects', labelFa: 'پروژه‌های عملی ساخته‌شده', val: '120+' },
          { labelEn: 'Student Satisfaction', labelFa: 'رضایت دانشجویان', val: '4.9/5' },
        ],
        techStack: ['Live Mentorship', 'Figma Systems', 'React & Three.js', 'Case Study Reviews'],
        image: toyooranImg,
        accentColor: '#fff083',
      },
    ],
  },
];

// Helper to get department by ID or slug
export function getDepartmentById(idOrSlug: string): DepartmentDetailData | undefined {
  return DEPARTMENTS_DATA.find((d) => d.id === idOrSlug || d.slug === idOrSlug);
}

// Helper to get members of a specific department
export function getDepartmentMembers(deptId: DepartmentCategory): MemberData[] {
  return ALL_TEAM_MEMBERS.filter((m) => m.department === deptId);
}
