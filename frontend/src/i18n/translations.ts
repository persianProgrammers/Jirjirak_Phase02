export type Language = 'EN' | 'FA';

export interface WorldTranslation {
  step: string;
  badge: string;
  category: string;
  title: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  desc: string;
  enterWorld: string;
  canvasPlaceholder: string;
}

export interface ServicesTranslation {
  step: string;
  badge: string;
  category: string;
  title: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  desc: string;
  exploreAll: string;
  items: Array<{
    title: string;
    department?: string;
    items: string[];
  }>;
  services: Array<{
    title: string;
    department?: string;
    items: string[];
  }>;
}

export interface AboutTranslation {
  step: string;
  badge: string;
  category: string;
  title: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  desc: string;
  meetTeam: string;
  tagline: string;
  environmentShot: string;
  studioShot: string;
  teamMembers: Array<{
    name: string;
    role: string;
    type: string;
    highlight?: boolean;
  }>;
  team: Array<{
    name: string;
    role: string;
    type: string;
    highlight?: boolean;
  }>;
}

export interface PhilosophyTranslation {
  step: string;
  badge: string;
  category: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  desc: string;
  learnMore: string;
  mascot: string;
}

export interface JournalTranslation {
  step: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  desc: string;
  viewAll: string;
  categories: Array<{ key: string; label: string }>;
  articles: Array<{
    title: string;
    category: string;
    readTime: string;
  }>;
}

export interface ContactTranslation {
  step: string;
  badge: string;
  category: string;
  title: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  desc: string;
  startConversation: string;
  startConvo: string;
  whatBuilding: string;
  interests: string[];
  options: {
    brand: string;
    website: string;
    digitalProduct: string;
    campaign: string;
    somethingWeird: string;
  };
  tellUs: string;
  placeholder: string;
  messagePlaceholder: string;
  howBig: string;
  small: string;
  huge: string;
  sendBtn: string;
  sendButton: string;
}

export interface TranslationSchema {
  nav: {
    world: string;
    work: string;
    services: string;
    about: string;
    journal: string;
    contact: string;
    enterWorld: string;
    menu: string;
    close: string;
  };
  footer: {
    tagline: string;
    rights: string;
    privacy: string;
    terms: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    exploreJirjirak?: string;
    startProject?: string;
    enterWorld: string;
    exploreArchive: string;
    hopDown: string;
    mapFeed: string;
    tapToExplore: string;
    zoomIn: string;
    zoomOut: string;
    lockMap: string;
    interactiveMap: string;
    mapTip: string;
  };
  world: WorldTranslation;
  worldSection: WorldTranslation;
  services: ServicesTranslation;
  servicesSection: ServicesTranslation;
  featuredProjects: {
    step: string;
    badge: string;
    category: string;
    title: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    desc: string;
    viewAll: string;
    prev: string;
    next: string;
    viewProject: string;
    projectVisual: string;
    activeTitle: string;
    activeTags: string;
    activeProject: {
      title: string;
      tags: string;
    };
    prevProject: string;
    nextProject: string;
  };
  caseStudy: {
    step: string;
    badge: string;
    category: string;
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      desc: string;
    }>;
    mockupBrand: string;
    mockupLine1: string;
    mockupLine2: string;
    mockupHighlight: string;
    mockupQuote: string;
    mockupSub: string;
    environmentShot: string;
    envShot: string;
    figure02: string;
    wireframeSketch: string;
    wireframe: string;
  };
  about: AboutTranslation;
  aboutSection: AboutTranslation;
  philosophy: PhilosophyTranslation;
  philosophySection: PhilosophyTranslation;
  journal: JournalTranslation;
  journalSection: JournalTranslation;
  contact: ContactTranslation;
  contactSection: ContactTranslation;
  pages: {
    about: {
      title: string;
      desc: string;
    };
    contact: {
      title: string;
      desc: string;
    };
    services: {
      title: string;
      desc: string;
    };
    work: {
      title: string;
      desc: string;
    };
  };
}

const enWorld: WorldTranslation = {
  step: '01 / 08',
  badge: 'World',
  category: 'World',
  title: 'Explore\nthe Jirjirak World',
  titleLine1: 'Explore',
  titleLine2: 'the Jirjirak World',
  description: 'Step inside our creative space. Discover the departments, meet the team, and see how ideas turn into real things.',
  desc: 'Step inside our creative space. Discover the departments, meet the team, and see how ideas turn into real things.',
  enterWorld: 'Explore',
  canvasPlaceholder: 'Jirjirak 2D World Module (Interactive Canvas)',
};

const enServices: ServicesTranslation = {
  step: '02 / 08',
  badge: 'What We Build',
  category: 'What We Build',
  title: 'We build\nwhat matters.',
  titleLine1: 'We build',
  titleLine2: 'what matters.',
  description: 'From strategy to execution, we create modern digital presence to reach, communicate and make an impact.',
  desc: 'From strategy to execution, we create modern digital presence to reach, communicate and make an impact.',
  exploreAll: 'ALL SERVICES',
  items: [
    {
      title: 'Web & Development',
      items: ['Websites & Web Apps', 'Digital Products & UI/UX', 'Architecture & Performance'],
    },
    {
      title: 'Growth & Analytics',
      items: ['SEO & Organic Strategy', 'Data Analytics & Insights', 'Digital Marketing & Growth'],
    },
    {
      title: 'Branding & Creative',
      items: ['Brand Strategy & Naming', 'Visual Identity & Design', 'Motion & Creative Studio'],
    },
    {
      title: 'Game & Interactive',
      items: ['Game Design & Logic', 'Interactive 3D Experiences', 'Academy & Learning Hub'],
    },
  ],
  services: [
    {
      title: 'Web & Development',
      items: ['Websites & Web Apps', 'Digital Products & UI/UX', 'Architecture & Performance'],
    },
    {
      title: 'Growth & Analytics',
      items: ['SEO & Organic Strategy', 'Data Analytics & Insights', 'Digital Marketing & Growth'],
    },
    {
      title: 'Branding & Creative',
      items: ['Brand Strategy & Naming', 'Visual Identity & Design', 'Motion & Creative Studio'],
    },
    {
      title: 'Game & Interactive',
      items: ['Game Design & Logic', 'Interactive 3D Experiences', 'Academy & Learning Hub'],
    },
  ],
};

const enAbout: AboutTranslation = {
  step: '05 / 08',
  badge: 'About',
  category: 'About',
  title: 'We are small.\nOn purpose.',
  titleLine1: 'We are small.',
  titleLine2: 'On purpose.',
  description: 'Jirjirak is a creative studio, built by a small team of passionate people. We believe in quality over quantity, depth over speed, and ideas that actually matter.',
  desc: 'Jirjirak is a creative studio, built by a small team of passionate people. We believe in quality over quantity, depth over speed, and ideas that actually matter.',
  meetTeam: 'Meet the team',
  tagline: 'Small team. Big impact.',
  environmentShot: 'Studio Environment Shot',
  studioShot: 'Studio Environment Shot',
  teamMembers: [
    { name: 'Abdollah', role: 'Architect & Founder', type: 'System & Creative Direction', highlight: true },
    { name: 'Rouhollah', role: 'Lead Developer & Tech', type: 'Architecture & Engineering', highlight: false },
    { name: 'Sina', role: 'Brand & Visual Designer', type: 'Identity & Spatial Design', highlight: false },
  ],
  team: [
    { name: 'Abdollah', role: 'Architect & Founder', type: 'System & Creative Direction', highlight: true },
    { name: 'Rouhollah', role: 'Lead Developer & Tech', type: 'Architecture & Engineering', highlight: false },
    { name: 'Sina', role: 'Brand & Visual Designer', type: 'Identity & Spatial Design', highlight: false },
  ],
};

const enPhilosophy: PhilosophyTranslation = {
  step: '06 / 08',
  badge: 'The Philosophy',
  category: 'The Philosophy',
  titleLine1: 'Build small.',
  titleLine2: 'Think long.',
  titleLine3: 'Make it move.',
  description: "We believe in the power of small teams, focused ideas, and consistent effort. It's not just about what we build, but how we build it.",
  desc: "We believe in the power of small teams, focused ideas, and consistent effort. It's not just about what we build, but how we build it.",
  learnMore: 'Learn More',
  mascot: 'Jirjirak Mascot',
};

const enJournal: JournalTranslation = {
  step: '07 / 08',
  badge: 'Journal',
  category: 'Journal',
  title: 'Field Notes',
  description: 'Ideas, lessons and experiments from our journey.',
  desc: 'Ideas, lessons and experiments from our journey.',
  viewAll: 'View All Articles',
  categories: [
    { key: 'ALL', label: 'ALL' },
    { key: 'DESIGN', label: 'DESIGN' },
    { key: 'BUILD', label: 'BUILD' },
    { key: 'GROW', label: 'GROW' },
    { key: 'EXPERIMENT', label: 'EXPERIMENT' },
  ],
  articles: [
    {
      title: 'Why we killed our first idea',
      category: 'Design',
      readTime: '8 min read',
    },
    {
      title: 'The power of good constraints',
      category: 'Build',
      readTime: '6 min read',
    },
    {
      title: "SEO is not a tactic, it's a mindset",
      category: 'Grow',
      readTime: '9 min read',
    },
    {
      title: 'What we learned from building a game',
      category: 'Experiment',
      readTime: '7 min read',
    },
  ],
};

const enContact: ContactTranslation = {
  step: '08 / 08',
  badge: 'Contact',
  category: 'Contact',
  title: 'Got something\nto build?',
  titleLine1: 'Got something',
  titleLine2: 'to build?',
  description: "Tell us about your idea, project or just say hi. We'd love to hear from you.",
  desc: "Tell us about your idea, project or just say hi. We'd love to hear from you.",
  startConversation: 'Start a conversation',
  startConvo: 'Start a conversation',
  whatBuilding: 'What are we building?',
  interests: ['A brand', 'A website', 'A digital product', 'A campaign', 'Something weird'],
  options: {
    brand: 'A brand',
    website: 'A website',
    digitalProduct: 'A digital product',
    campaign: 'A campaign',
    somethingWeird: 'Something weird',
  },
  tellUs: 'Tell us about it',
  placeholder: 'Write a short message...',
  messagePlaceholder: 'Write a short message...',
  howBig: 'How big is the idea?',
  small: 'Small',
  huge: 'Huge',
  sendBtn: 'Send it to Jirjirak',
  sendButton: 'Send it to Jirjirak',
};

const faWorld: WorldTranslation = {
  step: '۰۱ / ۰۸',
  badge: 'جهان جیرجیرک',
  category: 'جهان جیرجیرک',
  title: 'کاوش در\nدنیای جیرجیرک',
  titleLine1: 'کاوش در',
  titleLine2: 'دنیای جیرجیرک',
  description: 'قدم به فضای خلاق ما بگذارید. بخش‌های مختلف را کشف کنید، با تیم آشنا شوید و ببینید چگونه ایده‌ها به واقعیت تبدیل می‌شوند.',
  desc: 'قدم به فضای خلاق ما بگذارید. بخش‌های مختلف را کشف کنید، با تیم آشنا شوید و ببینید چگونه ایده‌ها به واقعیت تبدیل می‌شوند.',
  enterWorld: 'کاوش',
  canvasPlaceholder: 'ماژول جهان تعاملی جیرجیرک',
};

const faServices: ServicesTranslation = {
  step: '۰۲ / ۰۸',
  badge: 'آنچه می‌سازیم',
  category: 'آنچه می‌سازیم',
  title: 'ما آنچه اهمیت دارد\nرا می‌سازیم.',
  titleLine1: 'ما آنچه اهمیت دارد',
  titleLine2: 'را می‌سازیم.',
  description: 'از استراتژی تا اجرا، ما حضور دیجیتال معناداری خلق می‌کنیم تا به مخاطب برسید، ارتباطی ماندگار بسازید و اثربخش باشید.',
  desc: 'از استراتژی تا اجرا، ما حضور دیجیتال معناداری خلق می‌کنیم تا به مخاطب برسید، ارتباطی ماندگار بسازید و اثربخش باشید.',
  exploreAll: 'مشاهده همه خدمات',
  items: [
    {
      title: 'وب و توسعه',
      items: ['وب‌سایت‌ها و وب‌اپلیکیشن‌ها', 'محصولات دیجیتال و رابط کاربری', 'معماری کد و عملکرد پایدار'],
    },
    {
      title: 'رشد و تحلیل داده',
      items: ['سئو و استراتژی رشد ارگانیک', 'تحلیل داده و شاخص‌های کلیدی', 'دیجیتال مارکتینگ و کمپین‌ها'],
    },
    {
      title: 'برندینگ و استودیو خلاق',
      items: ['استراتژی برند و نام‌گذاری', 'هویت بصری و زبان دیزاین', 'موشن‌گرافیک و انیمیشن'],
    },
    {
      title: 'بازی‌سازی و تعاملی',
      items: ['طراحی و ساخت بازی‌های دیجیتال', 'تجربه‌های تعاملی و سه‌بعدی', 'آکادمی و کارگاه‌های توسعه مهارت'],
    },
  ],
  services: [
    {
      title: 'وب و توسعه',
      items: ['وب‌سایت‌ها و وب‌اپلیکیشن‌ها', 'محصولات دیجیتال و رابط کاربری', 'معماری کد و عملکرد پایدار'],
    },
    {
      title: 'رشد و تحلیل داده',
      items: ['سئو و استراتژی رشد ارگانیک', 'تحلیل داده و شاخص‌های کلیدی', 'دیجیتال مارکتینگ و کمپین‌ها'],
    },
    {
      title: 'برندینگ و استودیو خلاق',
      items: ['استراتژی برند و نام‌گذاری', 'هویت بصری و زبان دیزاین', 'موشن‌گرافیک و انیمیشن'],
    },
    {
      title: 'بازی‌سازی و تعاملی',
      items: ['طراحی و ساخت بازی‌های دیجیتال', 'تجربه‌های تعاملی و سه‌بعدی', 'آکادمی و کارگاه‌های توسعه مهارت'],
    },
  ],
};

const faAbout: AboutTranslation = {
  step: '۰۵ / ۰۸',
  badge: 'درباره ما',
  category: 'درباره ما',
  title: 'ما کوچکیم.\nاز روی قصد و اراده.',
  titleLine1: 'ما کوچکیم.',
  titleLine2: 'از روی قصد و اراده.',
  description: 'جیرجیرک یک استودیوی خلاق است که توسط تیمی کوچک از افراد مشتاق ساخته شده است. ما به کیفیت به جای کمیت، عمق به جای سرعت، و ایده‌های معنادار باور داریم.',
  desc: 'جیرجیرک یک استودیوی خلاق است که توسط تیمی کوچک از افراد مشتاق ساخته شده است. ما به کیفیت به جای کمیت، عمق به جای سرعت، و ایده‌های معنادار باور داریم.',
  meetTeam: 'دیدار با اعضای تیم',
  tagline: 'تیمی کوچک. تاثیری ماندگار.',
  environmentShot: 'نمای محیط استودیو',
  studioShot: 'نمای محیط استودیو',
  teamMembers: [
    { name: 'عبدالله', role: 'معمار و بنیان‌گذار', type: 'هدایت خلاق و تفکر ساختاری', highlight: true },
    { name: 'روح‌الله', role: 'توسعه‌دهنده ارشد و تکنولوژی', type: 'معماری فنی و مهندسی سیستم', highlight: false },
    { name: 'سینا', role: 'طراح برند و هویت بصری', type: 'دیزاین تعاملی و فضاسازی', highlight: false },
  ],
  team: [
    { name: 'عبدالله', role: 'معمار و بنیان‌گذار', type: 'هدایت خلاق و تفکر ساختاری', highlight: true },
    { name: 'روح‌الله', role: 'توسعه‌دهنده ارشد و تکنولوژی', type: 'معماری فنی و مهندسی سیستم', highlight: false },
    { name: 'سینا', role: 'طراح برند و هویت بصری', type: 'دیزاین تعاملی و فضاسازی', highlight: false },
  ],
};

const faPhilosophy: PhilosophyTranslation = {
  step: '۰۶ / ۰۸',
  badge: 'فلسفه ما',
  category: 'فلسفه ما',
  titleLine1: 'کوچک بساز.',
  titleLine2: 'بلندمدت فکر کن.',
  titleLine3: 'به حرکت درآور.',
  description: 'ما به قدرت تیم‌های کوچک، تمرکز روی ایده‌های ناب و تلاش پیوسته باور داریم. مسئله فقط این نیست که چه می‌سازیم، بلکه چگونه ساختن آن اهمیت دارد.',
  desc: 'ما به قدرت تیم‌های کوچک، تمرکز روی ایده‌های ناب و تلاش پیوسته باور داریم. مسئله فقط این نیست که چه می‌سازیم، بلکه چگونه ساختن آن اهمیت دارد.',
  learnMore: 'بیشتر بخوانید',
  mascot: 'نشان جیرجیرک',
};

const faJournal: JournalTranslation = {
  step: '۰۷ / ۰۸',
  badge: 'یادداشت‌ها',
  category: 'یادداشت‌ها',
  title: 'دفترچه تجربیات',
  description: 'ایده‌ها، درس‌ها و آزمایش‌های مسیر کاری ما.',
  desc: 'ایده‌ها، درس‌ها و آزمایش‌های مسیر کاری ما.',
  viewAll: 'مشاهده تمام یادداشت‌ها',
  categories: [
    { key: 'ALL', label: 'همه' },
    { key: 'DESIGN', label: 'طراحی' },
    { key: 'BUILD', label: 'توسعه' },
    { key: 'GROW', label: 'رشد' },
    { key: 'EXPERIMENT', label: 'تجربه' },
  ],
  articles: [
    {
      title: 'چرا اولین ایده خود را کنار گذاشتیم؟',
      category: 'طراحی',
      readTime: '۸ دقیقه مطالعه',
    },
    {
      title: 'قدرت محدودیت‌های درست و هدفمند',
      category: 'توسعه',
      readTime: '۶ دقیقه مطالعه',
    },
    {
      title: 'سئو یک ترفند نیست، یک طرز فکر است',
      category: 'رشد',
      readTime: '۹ دقیقه مطالعه',
    },
    {
      title: 'آنچه از ساخت یک بازی دیجیتال آموختیم',
      category: 'تجربه',
      readTime: '۷ دقیقه مطالعه',
    },
  ],
};

const faContact: ContactTranslation = {
  step: '۰۸ / ۰۸',
  badge: 'تماس با ما',
  category: 'تماس با ما',
  title: 'پروژه‌ای برای ساخت\nدر ذهن دارید؟',
  titleLine1: 'پروژه‌ای برای ساخت',
  titleLine2: 'در ذهن دارید؟',
  description: 'درباره ایده و برنامه‌تان به ما بگویید یا فقط یک سلام بفرستید. مشتاقانه آماده شنیدن صدای شما هستیم.',
  desc: 'درباره ایده و برنامه‌تان به ما بگویید یا فقط یک سلام بفرستید. مشتاقانه آماده شنیدن صدای شما هستیم.',
  startConversation: 'آغاز یک گفتگو',
  startConvo: 'آغاز یک گفتگو',
  whatBuilding: 'قرار است چه چیزی بسازیم؟',
  interests: ['هویت برند', 'یک وب‌سایت مدرن', 'یک محصول دیجیتال', 'یک کمپین تعاملی', 'یک ایده خاص و نامتعارف'],
  options: {
    brand: 'هویت برند',
    website: 'یک وب‌سایت مدرن',
    digitalProduct: 'یک محصول دیجیتال',
    campaign: 'یک کمپین تعاملی',
    somethingWeird: 'یک ایده خاص و نامتعارف',
  },
  tellUs: 'کمی درباره‌اش بنویسید',
  placeholder: 'پیام کوتاه خود را اینجا بنویسید...',
  messagePlaceholder: 'پیام کوتاه خود را اینجا بنویسید...',
  howBig: 'ابعاد این ایده چقدر است؟',
  small: 'کوچک و چابک',
  huge: 'بزرگ و جامع',
  sendBtn: 'ارسال برای تیم جیرجیرک',
  sendButton: 'ارسال برای تیم جیرجیرک',
};

export const translations: Record<Language, TranslationSchema> = {
  EN: {
    nav: {
      world: 'World',
      work: 'Work',
      services: 'What We Do',
      about: 'About',
      journal: 'Journal',
      contact: 'Contact',
      enterWorld: 'Explore',
      menu: 'Menu',
      close: 'Close',
    },
    footer: {
      tagline: 'A small creative studio. Big ideas. Real impact.',
      rights: '© 2026 Jirjirak Studio. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    hero: {
      badge: 'Jirjirak Creative Studio',
      titleLine1: 'Ideas Deserve',
      titleLine2: 'to Be Seen.',
      titleLine3: '',
      subtitle: 'We build digital experiences, brands and products that move people, not just screens.',
      exploreJirjirak: 'Explore Jirjirak',
      startProject: 'Start a Project',
      enterWorld: 'Enter World',
      exploreArchive: 'Explore Archive',
      hopDown: 'Hop Down',
      mapFeed: 'Map.Sys // Live Feed',
      tapToExplore: 'Tap to Explore Map',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      lockMap: 'Lock map',
      interactiveMap: 'Interactive Map',
      mapTip: 'Tap and drag or use controls to inspect the studio grounds.',
    },
    world: enWorld,
    worldSection: enWorld,
    services: enServices,
    servicesSection: enServices,
    featuredProjects: {
      step: '03 / 08',
      badge: 'Archive',
      category: 'Jirjirak Archive',
      title: 'Featured\nProjects',
      titleLine1: 'Featured',
      titleLine2: 'Projects',
      description: "A collection of ideas, collaborations and products we've built. Each project is a new world to explore.",
      desc: "A collection of ideas, collaborations and products we've built. Each project is a new world to explore.",
      viewAll: 'View All Projects',
      prev: 'PREV',
      next: 'NEXT',
      viewProject: 'View Project',
      projectVisual: 'Project Visual',
      activeTitle: 'TOYOORAN',
      activeTags: 'Web / Brand / Experience',
      activeProject: {
        title: 'TOYOORAN',
        tags: 'Web / Brand / Experience',
      },
      prevProject: 'KAFI Branding',
      nextProject: 'JIRJIRAK Gaming',
    },
    caseStudy: {
      step: '04 / 08',
      badge: 'Project',
      category: 'Project',
      title: 'TOYOORAN',
      subtitle: 'Web / Brand / Experience',
      steps: [
        {
          title: 'THE PROBLEM',
          desc: 'A traditional brand needed a modern digital presence to reach a new generation.',
        },
        {
          title: 'THE IDEA',
          desc: "A minimal, immersive web experience that reflects the brand's essence and values.",
        },
        {
          title: 'THE RESULT',
          desc: 'A high-performing website and stronger brand identity, leading to increased engagement and sales.',
        },
        {
          title: 'WHAT WE LEARNED',
          desc: 'Simplicity creates depth.',
        },
      ],
      mockupBrand: 'TOYOORAN',
      mockupLine1: 'More than a place.',
      mockupLine2: 'A feeling.',
      mockupHighlight: 'TOYOORAN',
      mockupQuote: 'More\nthan a place.\nA feeling.',
      mockupSub: 'TOYOORAN',
      environmentShot: 'Environment Shot',
      envShot: 'Environment Shot',
      figure02: 'FIG. 02 — ARCHIVE',
      wireframeSketch: 'Wireframe Sketch',
      wireframe: 'Wireframe Sketch',
    },
    about: enAbout,
    aboutSection: enAbout,
    philosophy: enPhilosophy,
    philosophySection: enPhilosophy,
    journal: enJournal,
    journalSection: enJournal,
    contact: enContact,
    contactSection: enContact,
    pages: {
      about: {
        title: 'About Us',
        desc: 'Learn more about Jirjirak Studio.',
      },
      contact: {
        title: 'Contact Us',
        desc: 'Get in touch.',
      },
      services: {
        title: 'Our Services',
        desc: 'What we offer.',
      },
      work: {
        title: 'Our Work',
        desc: 'Portfolio of Jirjirak Studio.',
      },
    },
  },
  FA: {
    nav: {
      world: 'جهان جیرجیرک',
      work: 'نمونه‌کارها',
      services: 'خدمات ما',
      about: 'درباره ما',
      journal: 'یادداشت‌ها',
      contact: 'تماس',
      enterWorld: 'کاوش',
      menu: 'منو',
      close: 'بستن',
    },
    footer: {
      tagline: 'یک استودیوی خلاق و مستقل. ایده‌های بزرگ. تاثیر واقعی.',
      rights: '© ۲۰۲۶ استودیو جیرجیرک. تمامی حقوق محفوظ است.',
      privacy: 'حریم خصوصی',
      terms: 'شرایط خدمات',
    },
    hero: {
      badge: 'استودیو خلاق جیرجیرک',
      titleLine1: 'ایده‌ها سزاوار',
      titleLine2: 'دیده‌شدن هستند.',
      titleLine3: '',
      subtitle: 'ما تجربه‌های دیجیتال، برندها و محصولاتی خلق می‌کنیم که انسان‌ها را به حرکت درمی‌آورند، نه فقط پیکسل‌های روی صفحه را.',
      exploreJirjirak: 'کاوش در جیرجیرک',
      startProject: 'شروع یک پروژه',
      enterWorld: 'ورود به جهان',
      exploreArchive: 'کاوش در آرشیو',
      hopDown: 'پرش به پایین',
      mapFeed: 'نقشه تعاملی // استودیو زنده',
      tapToExplore: 'برای کاوش نقشه لمس کنید',
      zoomIn: 'بزرگنمایی',
      zoomOut: 'کوچک‌نمایی',
      lockMap: 'قفل مجدد نقشه',
      interactiveMap: 'نقشه تعاملی استودیو',
      mapTip: 'نقشه را بکشید یا با دکمه‌ها محیط استودیو را بررسی کنید.',
    },
    world: faWorld,
    worldSection: faWorld,
    services: faServices,
    servicesSection: faServices,
    featuredProjects: {
      step: '۰۳ / ۰۸',
      badge: 'آرشیو',
      category: 'آرشیو جیرجیرک',
      title: 'پروژه‌های\nبرگزیده',
      titleLine1: 'پروژه‌های',
      titleLine2: 'برگزیده',
      description: 'مجموعه‌ای از ایده‌ها، همکاری‌ها و محصولاتی که ساخته‌ایم. هر پروژه دنیایی نو برای کاوش است.',
      desc: 'مجموعه‌ای از ایده‌ها، همکاری‌ها و محصولاتی که ساخته‌ایم. هر پروژه دنیایی نو برای کاوش است.',
      viewAll: 'مشاهده تمام پروژه‌ها',
      prev: 'قبلی',
      next: 'بعدی',
      viewProject: 'مشاهده پروژه',
      projectVisual: 'تصویر پروژه',
      activeTitle: 'طیوران',
      activeTags: 'وب‌سایت / برند / تجربه تعاملی',
      activeProject: {
        title: 'طیوران',
        tags: 'وب‌سایت / برند / تجربه تعاملی',
      },
      prevProject: 'برندینگ کافی',
      nextProject: 'گیمینگ جیرجیرک',
    },
    caseStudy: {
      step: '۰۴ / ۰۸',
      badge: 'مطالعه موردی',
      category: 'پروژه شاخص',
      title: 'طیوران',
      subtitle: 'وب‌سایت / برند / تجربه تعاملی',
      steps: [
        {
          title: 'مسئله و چالش',
          desc: 'یک برند باسابقه نیاز به حضور دیجیتال مدرن داشت تا با نسل جدید مخاطبان ارتباط برقرار کند.',
        },
        {
          title: 'ایده و راهکار',
          desc: 'یک تجربه وب مینیمال و فراگیر که ارزش‌ها، هویت و جوهره اصلی برند را منعکس می‌کند.',
        },
        {
          title: 'نتیجه و دستاورد',
          desc: 'یک وب‌سایت با کارایی فوق‌العاده و هویت قدرتمندتر که منجر به افزایش چشمگیر تعامل و فروش شد.',
        },
        {
          title: 'آنچه آموختیم',
          desc: 'سادگی و ظرافت، عمق واقعی خلق می‌کند.',
        },
      ],
      mockupBrand: 'طیوران',
      mockupLine1: 'فراتر از یک مکان.',
      mockupLine2: 'یک حس ماندگار.',
      mockupHighlight: 'طیوران',
      mockupQuote: 'فراتر از یک مکان.\nیک حس ماندگار.',
      mockupSub: 'طیوران',
      environmentShot: 'نمای محیطی پروژه',
      envShot: 'نمای محیطی پروژه',
      figure02: 'تصویر ۰۲ — آرشیو',
      wireframeSketch: 'اسکچ وایرفریم',
      wireframe: 'اسکچ وایرفریم',
    },
    about: faAbout,
    aboutSection: faAbout,
    philosophy: faPhilosophy,
    philosophySection: faPhilosophy,
    journal: faJournal,
    journalSection: faJournal,
    contact: faContact,
    contactSection: faContact,
    pages: {
      about: {
        title: 'درباره ما',
        desc: 'با استودیو جیرجیرک، اعضای تیم و دیدگاه‌های ما بیشتر آشنا شوید.',
      },
      contact: {
        title: 'تماس با ما',
        desc: 'راه‌های ارتباطی و فرم پیام به استودیو جیرجیرک.',
      },
      services: {
        title: 'خدمات ما',
        desc: 'ارائه راهکارهای خلاق، طراحی وب، توسعه و برندینگ.',
      },
      work: {
        title: 'نمونه‌کارهای ما',
        desc: 'مجموعه پروژه‌ها و دستاوردهای استودیو جیرجیرک.',
      },
    },
  },
};

export function useTranslation() {
  return (lang: Language) => translations[lang] || translations.EN;
}
