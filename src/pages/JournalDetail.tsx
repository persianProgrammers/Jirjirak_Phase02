import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { JOURNAL_ARTICLES, JournalArticle } from '../features/journal/data/journalData';

export default function JournalDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const t = useTranslation()(currentLang);

  // Find active article
  const article = useMemo(() => {
    return JOURNAL_ARTICLES.find((a) => a.slug === slug) || JOURNAL_ARTICLES[0];
  }, [slug]);

  // Index and Next/Prev
  const articleIndex = useMemo(() => {
    return JOURNAL_ARTICLES.findIndex((a) => a.slug === article.slug);
  }, [article.slug]);

  const prevArticle = articleIndex > 0 ? JOURNAL_ARTICLES[articleIndex - 1] : JOURNAL_ARTICLES[JOURNAL_ARTICLES.length - 1];
  const nextArticle = articleIndex < JOURNAL_ARTICLES.length - 1 ? JOURNAL_ARTICLES[articleIndex + 1] : JOURNAL_ARTICLES[0];

  // Reading Progress State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0); // -1, 0, 1
  const [focusMode, setFocusMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Calculate reading progress & active heading
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check headings
      const headingElements = article.headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveHeadingId(article.headings[i].id);
            return;
          }
        }
      }
      if (headingElements.length > 0 && window.scrollY < 250) {
        setActiveHeadingId('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Content text in active language
  const title = isFa ? article.titleFa : article.titleEn;
  const excerpt = isFa ? article.excerptFa : article.excerptEn;
  const content = isFa ? article.contentFa : article.contentEn;
  const authorName = isFa ? article.author.nameFa : article.author.nameEn;
  const authorRole = isFa ? article.author.roleFa : article.author.roleEn;
  const date = isFa ? article.dateFa : article.dateEn;
  const readTime = isFa ? article.readTimeFa : article.readTimeEn;
  const categoryLabel = isFa ? article.categoryLabelFa : article.categoryLabelEn;
  const tags = isFa ? article.tagsFa : article.tagsEn;

  // Font size classes
  const fontClass = fontSizeOffset === 1 
    ? 'text-lg sm:text-xl leading-loose' 
    : fontSizeOffset === -1 
      ? 'text-sm sm:text-base leading-relaxed' 
      : 'text-base sm:text-lg leading-relaxed sm:leading-8';

  return (
    <article 
      className={`min-h-screen pt-24 sm:pt-28 pb-32 transition-colors duration-700 ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      {/* 1. Viewport Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-black/10"
        aria-hidden="true"
      >
        <div 
          className={`h-full transition-all duration-150 ease-out ${
            isNight 
              ? 'bg-gradient-to-r from-[#b3a85c] to-amber-600 shadow-[0_0_8px_rgba(179,168,92,0.8)]' 
              : 'bg-gradient-to-r from-brand-yellow to-amber-400 shadow-[0_0_10px_rgba(255,240,131,0.8)]'
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Navigation & Controls Top Bar */}
        <header className="mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-white/10 dark:border-neutral-200">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <Link 
                to="/" 
                className={`transition-colors hover:underline ${
                  isNight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isFa ? 'صفحه اصلی' : 'Home'}
              </Link>
              <span className="opacity-30">/</span>
              <Link 
                to="/journal" 
                className={`transition-colors hover:underline ${
                  isNight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isFa ? 'دفترچه تجربیات' : 'Journal'}
              </Link>
              <span className="opacity-30">/</span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                isNight ? 'bg-neutral-200 text-[#b3a85c]' : 'bg-white/10 text-brand-yellow'
              }`}>
                {categoryLabel}
              </span>
            </div>

            {/* Utility Reading Controls (Font Size, Bookmark, Focus, Share) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Font Size Adjuster */}
              <div className={`hidden sm:flex items-center rounded-full p-1 border text-xs ${
                isNight ? 'bg-white border-neutral-300' : 'bg-brand-surface/70 border-white/10'
              }`}>
                <button
                  onClick={() => setFontSizeOffset(-1)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                    fontSizeOffset === -1 
                      ? (isNight ? 'bg-neutral-200 text-black' : 'bg-brand-yellow text-brand-dark') 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Smaller font"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSizeOffset(0)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                    fontSizeOffset === 0 
                      ? (isNight ? 'bg-neutral-200 text-black' : 'bg-brand-yellow text-brand-dark') 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Default font"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSizeOffset(1)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                    fontSizeOffset === 1 
                      ? (isNight ? 'bg-neutral-200 text-black' : 'bg-brand-yellow text-brand-dark') 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Larger font"
                >
                  A+
                </button>
              </div>

              {/* Focus Reading Mode Toggle */}
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                  focusMode
                    ? (isNight ? 'bg-[#b3a85c] text-white border-[#b3a85c]' : 'bg-brand-yellow text-brand-dark border-brand-yellow')
                    : (isNight ? 'bg-white border-neutral-300 text-neutral-600 hover:border-black' : 'bg-brand-surface/70 border-white/10 text-neutral-300 hover:border-white/30')
                }`}
                title={isFa ? 'حالت تمرکز خواندن' : 'Distraction-free focus mode'}
              >
                <span>{focusMode ? (isFa ? 'خروج از تمرکز' : 'Exit Focus') : (isFa ? 'حالت مطالعه' : 'Focus')}</span>
              </button>

              {/* Bookmark Toggle */}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  isBookmarked
                    ? (isNight ? 'bg-[#b3a85c] text-white border-[#b3a85c]' : 'bg-brand-yellow text-brand-dark border-brand-yellow')
                    : (isNight ? 'bg-white border-neutral-300 text-neutral-500 hover:text-black' : 'bg-brand-surface/70 border-white/10 text-neutral-400 hover:text-white')
                }`}
                title={isBookmarked ? (isFa ? 'نشان شده' : 'Bookmarked') : (isFa ? 'نشان کردن مقاله' : 'Bookmark article')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                </svg>
              </button>

              {/* Copy Share Link */}
              <button
                onClick={handleCopyLink}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold border flex items-center gap-1.5 transition-all ${
                  isNight 
                    ? 'bg-white border-neutral-300 text-neutral-700 hover:border-black' 
                    : 'bg-brand-surface/70 border-white/10 text-neutral-200 hover:border-brand-yellow/60'
                }`}
                title="Copy share link"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
                <span>{copiedLink ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'اشتراک' : 'Share')}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Article Headline Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-widest uppercase mb-5 text-brand-gray">
            <span className={isNight ? 'text-[#b3a85c] font-bold' : 'text-brand-yellow font-bold'}>
              {categoryLabel}
            </span>
            <span>•</span>
            <time dateTime="2026-10-12">{date}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] mb-8">
            {title}
          </h1>

          <p className={`text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto mb-10 ${
            isNight ? 'text-neutral-600' : 'text-neutral-300'
          }`}>
            {excerpt}
          </p>

          {/* Author Badge & Audio Narration Capsule */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 border-t border-white/10 dark:border-neutral-200">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={authorName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-md"
              />
              <div className="text-start">
                <div className="text-sm font-bold">{authorName}</div>
                <div className="text-xs text-brand-gray">{authorRole}</div>
              </div>
            </div>

            <div className="h-6 w-px bg-white/20 dark:bg-neutral-300 hidden sm:block" />

            {/* Vintage Audio Player Preview Capsule */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full border ${
              isNight ? 'bg-white border-neutral-300' : 'bg-brand-surface border-white/10'
            }`}>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isPlayingAudio
                    ? (isNight ? 'bg-[#b3a85c] text-white animate-pulse' : 'bg-brand-yellow text-brand-dark animate-pulse')
                    : (isNight ? 'bg-neutral-100 text-neutral-700 hover:bg-[#b3a85c] hover:text-white' : 'bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark')
                }`}
                aria-label={isPlayingAudio ? 'Pause audio' : 'Play audio narration'}
              >
                {isPlayingAudio ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 translate-x-0.5 rtl:-translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>
              <div className="text-xs font-mono">
                <span className="font-semibold">{isPlayingAudio ? (isFa ? 'در حال پخش...' : 'Listening...') : (isFa ? 'شنیدن صوت یادداشت' : 'Listen to Field Note')}</span>
                <span className="text-brand-gray ms-2">(~5 min)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Cover Image */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/15 dark:border-neutral-300 shadow-2xl mb-16 sm:mb-20 bg-neutral-900 aspect-[16/9] sm:aspect-[21/9] relative">
          <img
            src={article.image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md bg-black/60 text-neutral-300 border border-white/10">
            {isFa ? 'آرشیو بصری جیرجیرک' : 'Jirjirak Studio Visual Archive'}
          </div>
        </div>

        {/* Main Content Layout with Sticky Table of Contents (TOC) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          
          {/* Left / Sidebar Table of Contents (Hidden in Focus Mode) */}
          {!focusMode && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-32">
              <div className={`p-6 rounded-2xl border transition-colors ${
                isNight ? 'bg-white border-neutral-200' : 'bg-brand-surface/40 border-white/10'
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-5 text-brand-gray">
                  <svg className="w-4 h-4 text-brand-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/>
                    <line x1="3" y1="12" x2="3.01" y2="12"/>
                    <line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                  <span>{isFa ? 'سرفصل‌های یادداشت' : 'Contents'}</span>
                </div>

                <nav className="flex flex-col gap-3 text-xs">
                  {article.headings.map((h, idx) => {
                    const hTitle = isFa ? h.titleFa : h.titleEn;
                    const isActive = activeHeadingId === h.id;

                    return (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className={`transition-all py-1 border-s-2 ps-3 flex items-start gap-2 ${
                          isActive
                            ? (isNight 
                                ? 'border-[#b3a85c] text-[#b3a85c] font-bold' 
                                : 'border-brand-yellow text-brand-yellow font-bold')
                            : (isNight 
                                ? 'border-transparent text-neutral-500 hover:text-black hover:border-neutral-300' 
                                : 'border-transparent text-neutral-400 hover:text-white hover:border-white/20')
                        }`}
                      >
                        <span className="font-mono opacity-60">0{idx + 1}.</span>
                        <span className="leading-snug">{hTitle}</span>
                      </a>
                    );
                  })}
                </nav>

                {/* Reading Status Pill */}
                <div className="mt-8 pt-6 border-t border-white/10 dark:border-neutral-200">
                  <div className="flex items-center justify-between text-[11px] font-mono text-brand-gray mb-2">
                    <span>{isFa ? 'پیشرفت مطالعه' : 'Progress'}</span>
                    <span className="font-bold">{Math.round(scrollProgress)}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-neutral-200 overflow-hidden">
                    <div 
                      className={`h-full ${isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'}`}
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Central Article Prose */}
          <main className={focusMode ? 'col-span-12 max-w-3xl mx-auto' : 'lg:col-span-9'}>
            <div className={`prose prose-invert max-w-none ${fontClass}`}>
              
              {/* Lead Paragraph with Elegant Editorial styling */}
              <p className={`text-xl sm:text-2xl font-light leading-relaxed mb-12 pb-8 border-b border-white/10 dark:border-neutral-200 ${
                isNight ? 'text-neutral-800' : 'text-neutral-200'
              }`}>
                {content.lead}
              </p>

              {/* Sections */}
              {content.sections.map((section, sIdx) => (
                <section 
                  key={sIdx} 
                  id={section.headingId} 
                  className="mb-14 scroll-mt-28"
                >
                  {section.heading && (
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'}`} />
                      <span>{section.heading}</span>
                    </h2>
                  )}

                  {section.paragraphs.map((para, pIdx) => (
                    <p 
                      key={pIdx} 
                      className={`mb-6 leading-relaxed ${
                        isNight ? 'text-neutral-700' : 'text-neutral-300'
                      }`}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Pull Quote */}
                  {section.quote && (
                    <figure className={`my-10 p-6 sm:p-8 rounded-2xl border-s-4 relative overflow-hidden ${
                      isNight 
                        ? 'border-[#b3a85c] bg-white border-t border-b border-r border-neutral-200 shadow-sm' 
                        : 'border-brand-yellow bg-brand-surface/60 border-t border-b border-r border-white/10'
                    }`}>
                      <blockquote className="text-lg sm:text-xl font-serif italic mb-3 leading-relaxed">
                        “{section.quote.text}”
                      </blockquote>
                      <figcaption className="text-xs font-mono uppercase tracking-widest text-brand-gray">
                        — {section.quote.citation}
                      </figcaption>
                    </figure>
                  )}

                  {/* Insight Callout Box */}
                  {section.callout && (
                    <div className={`my-8 p-6 rounded-2xl border flex items-start gap-4 ${
                      isNight 
                        ? 'bg-amber-50/60 border-amber-200/80 text-amber-950' 
                        : 'bg-brand-surface border-brand-yellow/30 text-brand-light'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isNight ? 'bg-[#b3a85c] text-white' : 'bg-brand-yellow text-brand-dark'
                      }`}>
                        💡
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-1">
                          {section.callout.title}
                        </h4>
                        <p className="text-sm leading-relaxed opacity-90">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bullet Points */}
                  {section.bulletPoints && (
                    <ul className="my-8 space-y-3 ps-2">
                      {section.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className={`w-2 h-2 mt-2.5 rounded-full shrink-0 ${
                            isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'
                          }`} />
                          <span className={isNight ? 'text-neutral-700' : 'text-neutral-300'}>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Tags & Taxonomy Footer */}
              <div className="pt-8 border-t border-white/10 dark:border-neutral-200 flex flex-wrap items-center justify-between gap-4 mt-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-brand-gray me-1">{isFa ? 'برچسب‌ها:' : 'Tags:'}</span>
                  {tags.map((t, idx) => (
                    <span 
                      key={idx}
                      className={`text-xs font-mono px-3 py-1 rounded-lg border ${
                        isNight 
                          ? 'bg-neutral-100 border-neutral-300 text-neutral-700' 
                          : 'bg-white/5 border-white/10 text-neutral-300'
                      }`}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                      isNight ? 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100' : 'bg-brand-surface border-white/10 text-white hover:bg-brand-yellow hover:text-brand-dark'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    <span>{copiedLink ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی لینک' : 'Copy')}</span>
                  </button>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors ${
                      isNight ? 'bg-white border-neutral-300 text-neutral-700 hover:text-black hover:border-black' : 'bg-brand-surface border-white/10 text-neutral-300 hover:text-white hover:border-white'
                    }`}
                    title="Share on X"
                  >
                    𝕏
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors ${
                      isNight ? 'bg-white border-neutral-300 text-neutral-700 hover:text-black hover:border-black' : 'bg-brand-surface border-white/10 text-neutral-300 hover:text-white hover:border-white'
                    }`}
                    title="Share on LinkedIn"
                  >
                    in
                  </a>
                </div>
              </div>

              {/* Author Bio Card */}
              <div className={`my-12 p-8 rounded-3xl border flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-start ${
                isNight 
                  ? 'bg-white border-neutral-200 shadow-sm' 
                  : 'bg-brand-surface/50 border-white/10'
              }`}>
                <img
                  src={article.author.avatar}
                  alt={authorName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg font-bold">{authorName}</h4>
                      <div className="text-xs font-mono text-brand-gray">{authorRole}</div>
                    </div>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${
                      isNight ? 'bg-neutral-100 text-[#b3a85c]' : 'bg-white/10 text-brand-yellow'
                    }`}>
                      {isFa ? 'هم‌بنیان‌گذار جیرجیرک' : 'Jirjirak Co-Founder'}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isNight ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {isFa 
                      ? 'علاقه‌مند به کاوش در مرزهای مشترک هنر و تکنولوژی، معماری نرم‌افزارهای پایدار و خلق تجارب تعاملی که فراتر از ابزارهای معمولی حس برانگیزند.' 
                      : 'Exploring the intersection of tactile design, durable engineering, and software that makes people feel alive.'
                    }
                  </p>
                </div>
              </div>

            </div>
          </main>
        </div>

        {/* Previous and Next Article Navigation Footer */}
        <section className="mt-20 sm:mt-24 pt-12 border-t border-white/10 dark:border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-gray">
              {isFa ? 'ادامه مطالعه در مجله' : 'Continue Reading'}
            </h3>
            <Link 
              to="/journal" 
              className={`text-xs font-mono font-semibold transition-colors ${
                isNight ? 'text-[#b3a85c] hover:underline' : 'text-brand-yellow hover:underline'
              }`}
            >
              {isFa ? '← بازگشت به تمام یادداشت‌ها' : '← Back to all notes'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prev Article */}
            <Link
              to={`/journal/${prevArticle.slug}`}
              className={`group p-6 rounded-2xl border transition-all flex items-center gap-5 ${
                isNight 
                  ? 'bg-white border-neutral-200 hover:border-[#b3a85c]' 
                  : 'bg-brand-surface/40 border-white/10 hover:border-brand-yellow/50 hover:bg-brand-surface'
              }`}
            >
              <img
                src={prevArticle.image}
                alt={isFa ? prevArticle.titleFa : prevArticle.titleEn}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1">
                <div className="text-[11px] font-mono text-brand-gray mb-1">
                  {isFa ? 'یادداشت قبلی' : 'Previous Note'}
                </div>
                <h4 className={`text-base font-bold leading-snug transition-colors line-clamp-2 ${
                  isNight ? 'group-hover:text-[#b3a85c]' : 'group-hover:text-brand-yellow'
                }`}>
                  {isFa ? prevArticle.titleFa : prevArticle.titleEn}
                </h4>
              </div>
            </Link>

            {/* Next Article */}
            <Link
              to={`/journal/${nextArticle.slug}`}
              className={`group p-6 rounded-2xl border transition-all flex items-center gap-5 ${
                isNight 
                  ? 'bg-white border-neutral-200 hover:border-[#b3a85c]' 
                  : 'bg-brand-surface/40 border-white/10 hover:border-brand-yellow/50 hover:bg-brand-surface'
              }`}
            >
              <div className="flex-1 text-end">
                <div className="text-[11px] font-mono text-brand-gray mb-1">
                  {isFa ? 'یادداشت بعدی' : 'Next Note'}
                </div>
                <h4 className={`text-base font-bold leading-snug transition-colors line-clamp-2 ${
                  isNight ? 'group-hover:text-[#b3a85c]' : 'group-hover:text-brand-yellow'
                }`}>
                  {isFa ? nextArticle.titleFa : nextArticle.titleEn}
                </h4>
              </div>
              <img
                src={nextArticle.image}
                alt={isFa ? nextArticle.titleFa : nextArticle.titleEn}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>
        </section>

      </div>
    </article>
  );
}
