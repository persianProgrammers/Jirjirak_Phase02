export interface JournalArticle {
  id: string;
  slug: string;
  category: 'DESIGN' | 'BUILD' | 'GROW' | 'EXPERIMENT';
  categoryLabelEn: string;
  categoryLabelFa: string;
  titleEn: string;
  titleFa: string;
  excerptEn: string;
  excerptFa: string;
  readTimeEn: string;
  readTimeFa: string;
  dateEn: string;
  dateFa: string;
  featured?: boolean;
  image: string;
  author: {
    nameEn: string;
    nameFa: string;
    roleEn: string;
    roleFa: string;
    avatar: string;
  };
  tagsEn: string[];
  tagsFa: string[];
  headings: {
    id: string;
    titleEn: string;
    titleFa: string;
  }[];
  contentEn: {
    lead: string;
    sections: {
      headingId?: string;
      heading?: string;
      paragraphs: string[];
      quote?: {
        text: string;
        citation: string;
      };
      callout?: {
        type: 'tip' | 'insight' | 'warning';
        title: string;
        text: string;
      };
      bulletPoints?: string[];
    }[];
  };
  contentFa: {
    lead: string;
    sections: {
      headingId?: string;
      heading?: string;
      paragraphs: string[];
      quote?: {
        text: string;
        citation: string;
      };
      callout?: {
        type: 'tip' | 'insight' | 'warning';
        title: string;
        text: string;
      };
      bulletPoints?: string[];
    }[];
  };
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    slug: 'why-we-killed-our-first-idea',
    category: 'DESIGN',
    categoryLabelEn: 'Design',
    categoryLabelFa: 'طراحی',
    titleEn: 'Why we killed our first idea',
    titleFa: 'چرا اولین ایده خود را کنار گذاشتیم؟',
    excerptEn: 'How letting go of months of polished work opened the door to something truly authentic, lightweight, and meaningful.',
    excerptFa: 'چگونه دل کندن از ماه‌ها کار پولیش‌شده اما کم‌اثر، راه را برای محصولی اصیل، چابک و واقعی باز کرد.',
    readTimeEn: '8 min read',
    readTimeFa: '۸ دقیقه مطالعه',
    dateEn: 'October 12, 2026',
    dateFa: '۲۱ مهر ۱۴۰۵',
    featured: true,
    image: '/assets/images/journal/killed-idea.jpg',
    author: {
      nameEn: 'Abdollah',
      nameFa: 'عبدالله',
      roleEn: 'Lead Software Architect',
      roleFa: 'معمار ارشد نرم‌افزار',
      avatar: '/assets/images/team/abdollah.png',
    },
    tagsEn: ['Product Strategy', 'UX Philosophy', 'Lessons', 'Design Thinking'],
    tagsFa: ['استراتژی محصول', 'فلسفه تجربه کاربری', 'درس‌های مسیر', 'تفکر طراحی'],
    headings: [
      { id: 'the-trap-of-perfection', titleEn: 'The Trap of Polish', titleFa: 'تله کمال‌گرایی کاذب' },
      { id: 'listening-to-friction', titleEn: 'Listening to the Friction', titleFa: 'شنیدن صدای اصطکاک' },
      { id: 'the-courage-to-delete', titleEn: 'The Courage to Delete', titleFa: 'شجاعت پاک کردن کد' },
      { id: 'what-emerged-instead', titleEn: 'What Emerged in the Silence', titleFa: 'آنچه در فضای خالی زاده شد' },
    ],
    contentEn: {
      lead: 'Every creative team has that one project: six months of relentless craft, pixel-perfect layouts, thousands of lines of pristine code, yet an uncomfortable lingering realization that nobody actually needed it.',
      sections: [
        {
          headingId: 'the-trap-of-perfection',
          heading: 'The Trap of Polish',
          paragraphs: [
            'When we set out to build our inaugural agency platform, we wanted to prove everything at once. We crafted custom shaders, thirty micro-animations per viewport, and complex modular states that tested the boundaries of modern browsers.',
            'It was visually breathtaking, and yet, sitting together in the late-night studio coffee corner, a heavy quiet settled in. The product felt heavy. The essential spark—the clear emotional signal between our studio and the visitors—was lost under layers of decorative cleverness.',
          ],
          quote: {
            text: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
            citation: 'Antoine de Saint-Exupéry',
          },
        },
        {
          headingId: 'listening-to-friction',
          heading: 'Listening to the Friction',
          paragraphs: [
            'Friction in design rarely announces itself with catastrophic crashes. Instead, it whispers through hesitant clicks, users pausing before interacting, and the feeling that you need an instruction manual to navigate a creative space.',
            'We conducted three blinded user observation sessions. Not a single person noticed our sophisticated matrix transforms; what they looked for was immediate resonance, warmth, and clarity.',
          ],
          callout: {
            type: 'insight',
            title: 'Key Takeaway',
            text: 'If a feature requires defensive justification in every internal meeting, it is not an asset—it is cognitive debt.',
          },
        },
        {
          headingId: 'the-courage-to-delete',
          heading: 'The Courage to Delete',
          paragraphs: [
            'Deleting code hurts. The sunk cost fallacy is the single greatest enemy of boutique creative direction. On a rainy Tuesday morning, we archived the branch. Not hidden behind a feature flag, but genuinely wiped from the active roadmap.',
            'We stripped the interface down to five pure elements: spacious typography that speaks like an intimate letter, natural warm wood textures, tactile retro switches, and seamless performance that never drops a single frame.',
          ],
          bulletPoints: [
            'Reduced bundle weight from 4.2MB down to sub-450KB',
            'Time-to-interactive dropped by 74% across mobile networks',
            'Immediate qualitative feedback jumped from "impressive tech" to "this feels like home"',
          ],
        },
        {
          headingId: 'what-emerged-instead',
          heading: 'What Emerged in the Silence',
          paragraphs: [
            'What emerged became the foundation of Jirjirak: a studio identity anchored in timeless craftsmanship, warmth, and kinetic poetry. By killing the bloated prototype, we made room for the living, breathing project you see today.',
            'Never be afraid to kill your darlings. When you prune away the excessive, the truly vital shoots finally catch the light.',
          ],
        },
      ],
    },
    contentFa: {
      lead: 'هر تیم خلاقی روزی با این تجربه مواجه می‌شود: ۶ ماه تلاش بی‌وقفه، طراحی‌های مویی و بدون نقص، هزاران خط کد تمیز، اما این احساس پنهان و سنگین که شاید تمام این زرق‌وبرق چیزی نیست که کاربر به آن نیاز دارد.',
      sections: [
        {
          headingId: 'the-trap-of-perfection',
          heading: 'تله کمال‌گرایی کاذب',
          paragraphs: [
            'وقتی کار روی نسخه اولیه پلتفرم استودیو را آغاز کردیم، می‌خواستیم همه مهارت‌های فنی‌مان را یک‌جا به رخ بکشیم. شیدرهای سه‌بعدی سنگین، بیش از سی میکروانیمیشن در هر ویوپورت و استیت‌های تو‌در‌تویی که حتی سخت‌افزارهای مدرن را به چالش می‌کشیدند.',
            'از نظر تکنیکال خیره‌کننده بود؛ اما یک شب وقتی دور میز کارگاه نشسته بودیم و سکوت شب فضا را پر کرده بود، یک واقعیت ساده آشکار شد: پروژه نفس نمی‌کشید. صدای صمیمی و اصیل جیرجیرک زیر لایه‌های پیچیده خودنمایی فنی خفه شده بود.',
          ],
          quote: {
            text: 'کمال زمانی محقق نمی‌شود که چیزی برای اضافه کردن نمانده باشد، بلکه زمانی است که چیزی برای حذف کردن نمانده باشد.',
            citation: 'آنتوان دو سنت‌اگزوپری',
          },
        },
        {
          headingId: 'listening-to-friction',
          heading: 'شنیدن صدای اصطکاک',
          paragraphs: [
            'اصطکاک در تجربه کاربری معمولاً با انفجار یا ارورهای ۵۰۰ خودش را نشان نمی‌دهد؛ بلکه با تردید انگشت کاربر روی دکمه‌ها، سردرگمی در درک پیام و حس سنگینی ناخودآگاه بروز می‌کند.',
            'ما چند تست رفتاری بی سر و صدا برگزار کردیم. هیچ‌کس متوجه محاسبات پیچیده ماتریسی انیمیشن‌های ما نشد؛ آنچه مخاطب به دنبالش بود ارتباط حسی، گرما، خوانایی و داستانی روشن بود.',
          ],
          callout: {
            type: 'insight',
            title: 'نکته کلیدی',
            text: 'اگر برای توجیه یک فیچر در جلسات تیم مدام به دفاع و استدلال نیاز دارید، آن فیچر ارزش نیست؛ بدهی ذهنی است.',
          },
        },
        {
          headingId: 'the-courage-to-delete',
          heading: 'شجاعت پاک کردن کد',
          paragraphs: [
            'حذف کردن کدی که برایش شب‌زنده‌داری کرده‌اید دردناک است. خطای «هزینه غرق‌شده» بزرگ‌ترین دشمن یک استودیوی دیزاین پیشرو است. یک صبح سه‌شنبه بارانی، بدون هیچ محافظه‌کاری برنچ را آرشیو کردیم و از ریشه شروع کردیم.',
            'رابط کاربری را به پنج عنصر کلیدی تقلیل دادیم: تایپوگرافی اصیل با فضای تنفس بی‌نظیر، متریال طبیعی و چوب گردو، کلیدهای فیزیکی که لذت لمس دارند و پرفورمنسی روان که هرگز حتی یک فریم لکنت ندارد.',
          ],
          bulletPoints: [
            'کاهش حجم باندل اولیه از ۴.۲ مگابایت به کمتر از ۴۵۰ کیلوبایت',
            'کاهش ۷۴ درصدی زمان بارگذاری در اینترنت‌های ضعیف همراه',
            'تغییر بازخورد مخاطبان از «عجب تکنولوژی سنگینی» به «چقدر این فضا به دل می‌نشیند»',
          ],
        },
        {
          headingId: 'what-emerged-instead',
          heading: 'آنچه در فضای خالی زاده شد',
          paragraphs: [
            'آنچه از میان آن خاکستر برخاست، جوهره اصلی جیرجیرک امروز شد: استودیویی با وقار، اصالت و انیمیشن‌های هوشمند و معنادار. با کنار گذاشتن آن ایده پرزرق‌وبرق، فضا برای نبوغ واقعی باز شد.',
            'از هرس کردن نترسید؛ شاخه‌هایی که زیادی کش آمده‌اند نور را از گل‌های اصلی می‌گیرند. وقتی زیادی‌ها را کنار می‌زنید، حقیقت دیزاین می‌درخشد.',
          ],
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'the-power-of-good-constraints',
    category: 'BUILD',
    categoryLabelEn: 'Build',
    categoryLabelFa: 'توسعه',
    titleEn: 'The power of good constraints',
    titleFa: 'قدرت محدودیت‌های درست و هدفمند',
    excerptEn: 'Why infinite possibilities lead to creative paralysis, and how voluntary boundaries foster engineering elegance.',
    excerptFa: 'چرا آزادی بی‌نهایت سرچشمه سردرگمی است و چگونه محدودیت‌های خودخواسته باعث نبوغ مهندسی و سرعت اجرایی می‌شوند.',
    readTimeEn: '6 min read',
    readTimeFa: '۶ دقیقه مطالعه',
    dateEn: 'September 28, 2026',
    dateFa: '۶ مهر ۱۴۰۵',
    featured: false,
    image: '/assets/images/journal/constraints.jpg',
    author: {
      nameEn: 'Rouhollah',
      nameFa: 'روح‌الله',
      roleEn: 'Creative Director',
      roleFa: 'مدیر هنری و خلاقیت',
      avatar: '/assets/images/team/rouhollah.png',
    },
    tagsEn: ['Engineering', 'Architecture', 'Performance', 'Minimalism'],
    tagsFa: ['مهندسی نرم‌افزار', 'معماری سیستم', 'عملکرد بالا', 'مینیمالیسم'],
    headings: [
      { id: 'blank-canvas-paralysis', titleEn: 'Blank Canvas Paralysis', titleFa: 'فلج بوم سفید' },
      { id: 'three-sacred-rules', titleEn: 'Our Three Sacred Guardrails', titleFa: 'سه مرز نفوذناپذیر ما' },
      { id: 'creative-velocity', titleEn: 'Speed Through Subtraction', titleFa: 'سرعت از طریق کسر کردن' },
    ],
    contentEn: {
      lead: 'Give an engineering team an unbounded tech stack and indefinite deadlines, and you will receive a monument to over-engineering. Set radical constraints, and you spark pure innovation.',
      sections: [
        {
          headingId: 'blank-canvas-paralysis',
          heading: 'Blank Canvas Paralysis',
          paragraphs: [
            'Modern web development gives us too many tools. Hundreds of state libraries, endless UI kits, and thousands of utility classes often leave teams debating dependencies instead of shipping experiences.',
            'At Jirjirak, we realized that our best work consistently happens within strict physical and digital parameters: strict palettes, single-purpose components, and a relentless commitment to 60fps animations.',
          ],
        },
        {
          headingId: 'three-sacred-rules',
          heading: 'Our Three Sacred Guardrails',
          paragraphs: [
            'We enforce three voluntary rules on every digital artifact we construct:',
          ],
          bulletPoints: [
            'Zero layout shift (CLS < 0.01) — all visual assets have strict aspect ratios and pre-computed bounds.',
            'Zero external icon fonts — purely handcrafted lightweight SVG paths that morph smoothly.',
            'Every interaction must trigger feedback within 16 milliseconds.',
          ],
          callout: {
            type: 'tip',
            title: 'Rule of Thumb',
            text: 'Constraints are not handcuffs; they are the walls of a musical instrument that allow the sound to resonate.',
          },
        },
        {
          headingId: 'creative-velocity',
          heading: 'Speed Through Subtraction',
          paragraphs: [
            'When choices are predetermined by coherent principles, decision fatigue vanishes. Designers know exactly what scale to use, engineers know exactly which motion primitive to apply, and products reach our clients weeks ahead of schedule.',
          ],
        },
      ],
    },
    contentFa: {
      lead: 'اگر به یک تیم فنی بی‌نهایت امکانات و مهلت نامحدود بدهید، نتیجه بنای یادبودی از پیچیدگی غیرضروری خواهد بود. اما اگر مرزهای سفت‌وسخت و هوشمندانه بگذارید، خلاقیت ناب شعله‌ور می‌شود.',
      sections: [
        {
          headingId: 'blank-canvas-paralysis',
          heading: 'فلج بوم سفید',
          paragraphs: [
            'دنیای وب امروز ما را در میان انبوه ابزارها غرق کرده است. صدها لایبرری استیت منیجمنت، ابزارهای انیمیشن و فریم‌ورک‌های رنگارنگ که روزها وقت تیم را صرف بحث درباره تنظیمات کانفیگ می‌کند به جای آنکه محصولی واقعی خلق شود.',
            'در جیرجیرک متوجه شدیم بهترین دستاوردهای ما همیشه در چارچوب‌های دقیق متولد شده‌اند: پالت رنگی کنترل‌شده، کامپوننت‌های تک‌منظوره و تعهد سرسختانه به اجرای نرم و پیوسته روی همه دستگاه‌ها.',
          ],
        },
        {
          headingId: 'three-sacred-rules',
          heading: 'سه مرز نفوذناپذیر ما',
          paragraphs: [
            'ما برای هر پروژه‌ای سه قانون طلایی تعیین کرده‌ایم:',
          ],
          bulletPoints: [
            'صفر بودن جابجایی المان‌ها (CLS < ۰.۰۱) — تمام تصاویر و بافت‌ها ابعاد هندسی دقیق و از پیش رزرو شده دارند.',
            'استفاده نکردن از فونت‌های آیکون حجیم — تنها SVGهای بهینه‌شده و اختصاصی که مثل ساعت کار می‌کنند.',
            'پاسخگویی تمام تعاملات در کمتر از ۱۶ میلی‌ثانیه برای حفظ احساس لمس زنده.',
          ],
          callout: {
            type: 'tip',
            title: 'اصل اساسی',
            text: 'محدودیت دستبند نیست؛ بلکه دیواره‌های ساز موسیقی است که امکان طنین‌انداز شدن ملودی را فراهم می‌کند.',
          },
        },
        {
          headingId: 'creative-velocity',
          heading: 'سرعت از طریق کسر کردن',
          paragraphs: [
            'وقتی گزینه‌ها توسط اصولی عمیق غربال شده باشند، خستگی تصمیم‌گیری از بین می‌رود. طراح دقیقاً وزن و تناسب را می‌داند، توسعه‌دهنده بدون تردید انیمیشن را می‌نویسد و کار هفته‌ها سریع‌تر از موعد به مقصد می‌رسد.',
          ],
        },
      ],
    },
  },
  {
    id: '3',
    slug: 'seo-is-not-a-tactic',
    category: 'GROW',
    categoryLabelEn: 'Grow',
    categoryLabelFa: 'رشد',
    titleEn: "SEO is not a tactic, it's a mindset",
    titleFa: 'سئو یک ترفند نیست، یک طرز فکر است',
    excerptEn: 'Why treating search as an afterthought breaks modern brands, and how architectural relevance compounds organic reach over years.',
    excerptFa: 'چرا نگاه ابزاری به سئو به هویت برند لطمه می‌زند و چگونه درهم‌تنیدگی معماری محتوا با کد باعث رشد ارگانیک تصاعدی می‌شود.',
    readTimeEn: '9 min read',
    readTimeFa: '۹ دقیقه مطالعه',
    dateEn: 'September 15, 2026',
    dateFa: '۲۴ شهریور ۱۴۰۵',
    featured: false,
    image: '/assets/images/journal/seo-growth.jpg',
    author: {
      nameEn: 'Sina',
      nameFa: 'سینا',
      roleEn: 'Brand & Spatial Designer',
      roleFa: 'طراح هویت برند و سیستم‌های بصری',
      avatar: '/assets/images/team/sina.png',
    },
    tagsEn: ['Organic Growth', 'Semantic Web', 'Search Architecture', 'Content Strategy'],
    tagsFa: ['رشد ارگانیک', 'وب معنایی', 'معماری جستجو', 'استراتژی محتوا'],
    headings: [
      { id: 'beyond-keyword-stuffing', titleEn: 'Beyond the Keyword Shell', titleFa: 'فراتر از پوسته‌سازی کلمات کلیدی' },
      { id: 'architecture-as-signal', titleEn: 'Architecture as High-Fidelity Signal', titleFa: 'معماری فنی به عنوان سیگنال اصالت' },
      { id: 'compound-growth', titleEn: 'The Compounding Interest of Truth', titleFa: 'سود مرکب حقیقت و ارزش افزوده' },
    ],
    contentEn: {
      lead: 'Most marketing agencies treat SEO as a coat of paint applied after the building is done. In our experience, true search resonance is embedded directly in the concrete of your information architecture.',
      sections: [
        {
          headingId: 'beyond-keyword-stuffing',
          heading: 'Beyond the Keyword Shell',
          paragraphs: [
            'Search algorithms have matured from simplistic phrase matchers into sophisticated semantic reasoning engines. In the age of AI search agents and LLM summarization, shallow keyword tricks are actively penalized.',
            'When your website structure mirrors human curiosity and answers deep, authentic inquiries, machines naturally prioritize your canonical source.',
          ],
        },
        {
          headingId: 'architecture-as-signal',
          heading: 'Architecture as High-Fidelity Signal',
          paragraphs: [
            'Speed, semantic HTML, rich JSON-LD graph structures, and logical hierarchy are not technical checkboxes. They are signals of respect to your audience.',
            'A user who finds exactly what they seek within two seconds because your routing is crystal-clear will stay, read, bookmark, and recommend your studio.',
          ],
          callout: {
            type: 'insight',
            title: 'Modern SEO Truth',
            text: 'If you optimize for the algorithm first, you lose the human. If you obsessively delight the human with lightning-fast technical clarity, the algorithm follows.',
          },
        },
        {
          headingId: 'compound-growth',
          heading: 'The Compounding Interest of Truth',
          paragraphs: [
            'Invest in profound cornerstones of knowledge rather than thirty disposable blog posts. A single comprehensive field note published with impeccable clarity continues to deliver high-intent leads three years down the line.',
          ],
        },
      ],
    },
    contentFa: {
      lead: 'بسیاری از آژانس‌ها سئو را شبیه رنگ‌آمیزی ظاهری پس از پایان ساختمان می‌دانند؛ اما تجربه ما ثابت کرده سئوی پایدار در همان بتن‌ریزی معماری اطلاعات و روح ساختار شکل می‌گیرد.',
      sections: [
        {
          headingId: 'beyond-keyword-stuffing',
          heading: 'فراتر از پوسته‌سازی کلمات کلیدی',
          paragraphs: [
            'موتورهای جستجو از مچ‌کننده‌های ساده لغات به سیستم‌های تحلیل معنایی عمیق بدل شده‌اند. در دوره چت‌بات‌ها و جستجوهای مبتنی بر هوش مصنوعی، ترفندهای سطحی و کلمات کلیدی مصنوعی به سرعت بی‌اثر و جریمه می‌شوند.',
            'وقتی ساختار وب‌سایت شما بازتاب کنجکاوی واقعی انسان‌ها باشد و پاسخی اصیل به پرسش‌های عمیق مخاطب بدهد، موتورها به شکلی طبیعی منبع شما را مرجع قرار می‌دهند.',
          ],
        },
        {
          headingId: 'architecture-as-signal',
          heading: 'معماری فنی به عنوان سیگنال اصالت',
          paragraphs: [
            'سرعت بارگذاری، معناشناسی در تگ‌های HTML، اسکیمای داده‌ای JSON-LD و سلسه‌مراتب منطقی فقط چک‌لیست‌های فنی نیستند؛ بلکه نشانه احترام عمیق به وقت مخاطب هستند.',
            'کاربری که به لطف معماری درست در عرض دو ثانیه دقیقاً به پاسخ مورد نظرش می‌رسد، در سایت می‌ماند، بوک‌مارک می‌کند و شما را به دیگران پیشنهاد می‌دهد.',
          ],
          callout: {
            type: 'insight',
            title: 'حقیقت سئوی مدرن',
            text: 'اگر صرفاً برای جلب رضایت ربات بنویسید، مخاطب انسانی را از دست می‌دهید. اما اگر مخاطب را با وضوح و سرعت شگفت‌زده کنید، الگوریتم‌ها چاره‌ای جز ترجیح شما ندارند.',
          },
        },
        {
          headingId: 'compound-growth',
          heading: 'سود مرکب حقیقت و ارزش افزوده',
          paragraphs: [
            'به جای نوشتن ده‌ها مطلب سطحی برای پر کردن صفحه، روی چند ستون اصیل و راهنمای جامع وقت بگذارید. یک یادداشت عمیق و اصیل می‌تواند تا سال‌ها معتبر بماند و مخاطبان باکیفیت را به سمت استودیو جذب کند.',
          ],
        },
      ],
    },
  },
  {
    id: '4',
    slug: 'what-we-learned-from-building-a-game',
    category: 'EXPERIMENT',
    categoryLabelEn: 'Experiment',
    categoryLabelFa: 'تجربه',
    titleEn: 'What we learned from building a game',
    titleFa: 'آنچه از ساخت یک بازی دیجیتال آموختیم',
    excerptEn: 'Translating game physics, tactile soundscapes, and game loop principles into interactive web architecture.',
    excerptFa: 'چگونه اصول فیزیک بازی، طراحی صدا و چرخه‌های گیم‌پلی به جذابیت نرم‌افزارهای تجاری و تجارب تعاملی وب جان می‌بخشند.',
    readTimeEn: '7 min read',
    readTimeFa: '۷ دقیقه مطالعه',
    dateEn: 'August 30, 2026',
    dateFa: '۸ شهریور ۱۴۰۵',
    featured: false,
    image: '/assets/images/journal/game-craft.jpg',
    author: {
      nameEn: 'Abdollah',
      nameFa: 'عبدالله',
      roleEn: 'Lead Software Architect',
      roleFa: 'معمار ارشد نرم‌افزار',
      avatar: '/assets/images/team/abdollah.png',
    },
    tagsEn: ['Game Design', 'Interactive Audio', 'Creative Coding', 'Playfulness'],
    tagsFa: ['طراحی بازی', 'صدای تعاملی', 'برنامه‌نویسی خلاق', 'روح سرگرمی'],
    headings: [
      { id: 'the-physics-of-delight', titleEn: 'The Physics of Delight', titleFa: 'فیزیک لذت و لمس مجازی' },
      { id: 'sound-as-subconscious-guide', titleEn: 'Sound as Subconscious Architecture', titleFa: 'صدا به مثابه معماری ناخودآگاه' },
      { id: 'bringing-play-to-saas', titleEn: 'Infusing Play into Purpose', titleFa: 'دمیدن روح بازی در کاربردهای جدی' },
    ],
    contentEn: {
      lead: 'Software does not have to be cold and utilitarian. When we built our experimental game engine, we unlocked principles that permanently altered how we craft ordinary web interfaces.',
      sections: [
        {
          headingId: 'the-physics-of-delight',
          heading: 'The Physics of Delight',
          paragraphs: [
            'In video games, every collision has weight, momentum, and consequence. When a user presses a button on a web page and receives an instantaneous micro-spring recoil, their brain registers the screen as a tangible, physical instrument.',
            'We spent weeks tuning spring dampening values until a toggle flip felt as satisfying as flicking a real mechanical toggle on a vintage amplifier.',
          ],
        },
        {
          headingId: 'sound-as-subconscious-guide',
          heading: 'Sound as Subconscious Architecture',
          paragraphs: [
            'Silent interfaces miss half of the sensory spectrum. Subtle clicks, low-frequency hums on mode changes, and ambient soundscapes provide subconscious reassurance that the system is alive.',
            'The key is restraint: auditory cues must be soft, acoustic, and entirely respectful of the user’s ambient environment.',
          ],
          callout: {
            type: 'tip',
            title: 'Design Philosophy',
            text: 'Sound should whisper confirmation, never shout for attention.',
          },
        },
        {
          headingId: 'bringing-play-to-saas',
          heading: 'Infusing Play into Purpose',
          paragraphs: [
            'Utility and fun are not mutually exclusive. When your users smile during what could have been a tedious form-submission or department navigation, trust and loyalty are born.',
          ],
        },
      ],
    },
    contentFa: {
      lead: 'نرم‌افزار محکوم به سردی و خشکی نیست. وقتی پروژه ساخت موتور بازی تجربی‌مان را شروع کردیم، به اصولی دست یافتیم که شیوه نگاه ما به طراحی وب‌سایت‌های مدرن را برای همیشه دگرگون کرد.',
      sections: [
        {
          headingId: 'the-physics-of-delight',
          heading: 'فیزیک لذت و لمس مجازی',
          paragraphs: [
            'در بازی‌های ویدیویی، هر برخوردی وزن، اینرسی و بازخورد حسی دارد. وقتی کاربری روی یک کلید وب کلیک می‌کند و جهش فنری بسیار ظریفی را حس می‌کند، ذهن ناخودآگاه صفحه را به عنوان یک ابزار واقعی و زنده لمس می‌کند.',
            'ما روزها وقت صرف تنظیم مقادیر فیزیک فنر (Spring Dampening) کردیم تا کلیک روی یک تاگل، همان حس لذت‌بخش روشن کردن یک امپلی‌فایر آنتیک را القا کند.',
          ],
        },
        {
          headingId: 'sound-as-subconscious-guide',
          heading: 'صدا به مثابه معماری ناخودآگاه',
          paragraphs: [
            'وب صامت نیمی از طیف حسی انسان را نادیده می‌گیرد. یک کلیک چوبی ملایم، بازخورد لرزشی یا یک زمزمه امبینت آرام در پس‌زمینه به کاربر اطمینان می‌دهد که این دنیا نفس می‌کشد.',
            'راز اصلی در خویشتن‌داری است: صدا باید بسیار لطیف، ارگانیک و در خدمت محتوا باشد، نه مایه آزار و جلب توجه کاذب.',
          ],
          callout: {
            type: 'tip',
            title: 'فلسفه دیزاین',
            text: 'صدا باید تاییدیه را نجوا کند، نه اینکه برای جلب توجه فریاد بکشد.',
          },
        },
        {
          headingId: 'bringing-play-to-saas',
          heading: 'دمیدن روح بازی در کاربردهای جدی',
          paragraphs: [
            'کارایی و لذت با هم در تضاد نیستند. وقتی کاربر در خلال انجام یک کار روزمره یا پر کردن یک فرم لبخند می‌زند، آن لحظه جادویی پیوند وفاداری و اعتماد میان برند و مخاطب شکل می‌گیرد.',
          ],
        },
      ],
    },
  },
];
