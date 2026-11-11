import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { JOURNAL_ARTICLES } from '../features/journal/data/journalData';

export default function Journal() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const t = useTranslation()(currentLang);

  const lenis = useLenis();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleScrollToArticles = () => {
    if (lenis) {
      lenis.scrollTo('#articles', { offset: -30, duration: 1.2 });
    } else {
      const el = document.getElementById('articles');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(() => [
    { key: 'ALL', labelEn: 'All Notes', labelFa: 'تمام یادداشت‌ها' },
    { key: 'DESIGN', labelEn: 'Design', labelFa: 'طراحی' },
    { key: 'BUILD', labelEn: 'Build', labelFa: 'توسعه و مهندسی' },
    { key: 'GROW', labelEn: 'Grow', labelFa: 'رشد و سئو' },
    { key: 'EXPERIMENT', labelEn: 'Experiment', labelFa: 'تجربه و بازی' },
  ], []);

  const filteredArticles = useMemo(() => {
    return JOURNAL_ARTICLES.filter((article) => {
      const matchesCategory = activeCategory === 'ALL' || article.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const title = (isFa ? article.titleFa : article.titleEn).toLowerCase();
      const excerpt = (isFa ? article.excerptFa : article.excerptEn).toLowerCase();
      const tags = (isFa ? article.tagsFa : article.tagsEn).join(' ').toLowerCase();
      return title.includes(q) || excerpt.includes(q) || tags.includes(q);
    });
  }, [activeCategory, searchQuery, isFa]);

  // Featured article is the first article or one with featured: true
  const featuredArticle = useMemo(() => {
    return JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0];
  }, []);

  return (
    <div className="min-h-screen w-full transition-colors duration-700 bg-brand-dark">
      
      {/* =========================================================================
          BESPOKE JOURNAL HERO (100VH) - Centered Editorial Archive
          Distinct from other pages: Centered alignment, concise copy, prominent
          frosted-glass search bar, without duplicate filters or CTA button.
         ========================================================================= */}
      <header className="relative min-h-screen lg:min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-brand-dark text-brand-light transition-colors duration-700">
        
        {/* Ambient Subtle Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05] flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* Ambient Glow Orb Behind Search Box */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] rounded-full pointer-events-none opacity-20 -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, #fff083 0%, transparent 70%)',
          }}
        />

        {/* Top: Centered Breadcrumb Navigation */}
        <div className="max-w-[1500px] mx-auto w-full relative z-10 shrink-0">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2.5 text-xs font-mono opacity-75 select-none">
            <Link
              to="/"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>{isFa ? 'صفحه اصلی' : 'Home'}</span>
            </Link>
            <span className="opacity-30">/</span>
            <span className="text-[#fff083] font-semibold">
              {isFa ? 'دفترچه تجربیات' : 'Journal'}
            </span>
          </nav>
        </div>

        {/* Center: Hero Centered Title, Concise Subtitle, and Prominent Search Box */}
        <div className="max-w-3xl mx-auto w-full relative z-10 text-center my-auto py-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#fff083] shadow-[0_0_8px_rgba(255,240,131,0.6)]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-neutral-300">
              {isFa ? 'دفترچه تجربیات استودیو' : 'Studio Field Notes'}
            </span>
          </div>

          {/* Centered Bold Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] mb-5 text-white">
            {isFa ? (
              <>
                روایت ساخت، <br className="sm:hidden" />
                <span className="text-[#fff083]">کد و دیزاین.</span>
              </>
            ) : (
              <>
                Craft, Code & <br className="sm:hidden" />
                <span className="text-[#fff083]">Design Lore.</span>
              </>
            )}
          </h1>

          {/* Short, Concise, Crisp Subtext */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-neutral-400 max-w-xl mx-auto mb-10">
            {isFa
              ? 'تأملاتی کوتاه بر هنر، وسواس در جزئیات مهندسی و مرزهای تعامل دیجیتال.'
              : 'Quiet dispatches on obsessive engineering, software craft, and interactive form.'}
          </p>

          {/* Prominent Centered Search Box */}
          <div className="max-w-xl mx-auto">
            <div className="relative flex items-center rounded-2xl sm:rounded-full border border-white/20 bg-brand-surface/90 backdrop-blur-xl px-5 py-3.5 sm:py-4 transition-all duration-300 focus-within:border-[#fff083] focus-within:shadow-[0_0_30px_rgba(255,240,131,0.22)] shadow-2xl">
              <svg className="w-5 h-5 text-neutral-400 shrink-0 me-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleScrollToArticles();
                  }
                }}
                placeholder={isFa ? 'جستجو در یادداشت‌ها، کلمات کلیدی، مباحث...' : 'Search dispatches, tags, ideas...'}
                className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder:text-neutral-500 text-white"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-neutral-400 hover:text-white px-2 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : (
                <span className="hidden sm:inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/10 text-neutral-400 shrink-0 select-none">
                  {isFa ? `${JOURNAL_ARTICLES.length} یادداشت` : `${JOURNAL_ARTICLES.length} Notes`}
                </span>
              )}
            </div>
            
            {/* Contextual hint beneath search */}
            <p className="text-xs font-mono text-neutral-500 mt-3 flex items-center justify-center gap-2">
              <span>{isFa ? 'برای مشاهده نتایج، اینتر را بزنید یا به پایین اسکرول کنید' : 'Press Enter or scroll down to explore entries'}</span>
            </p>
          </div>
        </div>

        {/* Bottom: Centered Scroll Indicator */}
        <div className="max-w-[1500px] mx-auto w-full relative z-10 shrink-0 pt-4 flex items-center justify-center text-xs font-mono">
          <button
            type="button"
            onClick={handleScrollToArticles}
            className="flex items-center gap-2 text-neutral-400 hover:text-[#fff083] transition-colors cursor-pointer group select-none"
          >
            <span className="font-semibold">{isFa ? 'اسکرول به آرشیو یادداشت‌ها' : 'Scroll to Dispatches'}</span>
            <svg 
              className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN ARTICLES SHOWCASE (Architectural Light Slab - Landing Pattern)
          Theme: Luminous linen canvas with crisp white cards & brass #8f6b00 accents
         ========================================================================= */}
      <main id="articles" className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-brand-light text-brand-dark border-b border-black/10 relative overflow-hidden transition-colors duration-700">
        {/* Subtle Ambient Radial Vignette */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(143,107,0,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-[1500px] mx-auto">
          {/* Quick Filter Bar in Light Slab for Fast Access */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-neutral-200/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider me-1">
                {isFa ? 'فیلتر یادداشت‌ها:' : 'Filter Notes:'}
              </span>
              {categories.map((cat) => {
                const label = isFa ? cat.labelFa : cat.labelEn;
                const count = cat.key === 'ALL' 
                  ? JOURNAL_ARTICLES.length 
                  : JOURNAL_ARTICLES.filter((a) => a.category === cat.key).length;
                const isActive = activeCategory === cat.key;

                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-[#8f6b00] text-white border-[#8f6b00] shadow-sm font-bold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#8f6b00]/50 hover:text-[#8f6b00]'
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-white' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 bg-white border border-neutral-200 px-3 py-1.5 rounded-full shadow-sm">
                <span>{isFa ? `جستجو: "${searchQuery}"` : `Query: "${searchQuery}"`}</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-400 hover:text-neutral-900 font-bold px-0.5"
                  aria-label="Clear filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          
          {/* Featured Article Spotlight (When showing ALL and no search) */}
          {!searchQuery && activeCategory === 'ALL' && featuredArticle && (
            <section className="mb-16 sm:mb-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8f6b00] flex items-center gap-1.5">
                  <span>★</span>
                  <span>{isFa ? 'یادداشت برگزیده' : 'Featured Spotlight'}</span>
                </span>
              </div>

              <Link
                to={`/journal/${featuredArticle.slug}`}
                className="group block rounded-3xl overflow-hidden border border-neutral-200/90 bg-white hover:border-[#8f6b00]/40 shadow-xl hover:shadow-2xl hover:shadow-neutral-300/60 transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  {/* Visual Cover */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-neutral-900">
                    <img
                      src={featuredArticle.image}
                      alt={isFa ? featuredArticle.titleFa : featuredArticle.titleEn}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                    <span className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/75 text-[#fff083] border border-white/15">
                      {isFa ? featuredArticle.categoryLabelFa : featuredArticle.categoryLabelEn}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-4">
                        <span>{isFa ? featuredArticle.dateFa : featuredArticle.dateEn}</span>
                        <span>•</span>
                        <span className="text-[#8f6b00] font-semibold">
                          {isFa ? featuredArticle.readTimeFa : featuredArticle.readTimeEn}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-neutral-900 group-hover:text-[#8f6b00] transition-colors">
                        {isFa ? featuredArticle.titleFa : featuredArticle.titleEn}
                      </h2>

                      <p className="text-sm sm:text-base leading-relaxed mb-6 text-neutral-600">
                        {isFa ? featuredArticle.excerptFa : featuredArticle.excerptEn}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {(isFa ? featuredArticle.tagsFa : featuredArticle.tagsEn).slice(0, 3).map((tag, i) => (
                          <span 
                            key={i} 
                            className="text-xs px-2.5 py-1 rounded-lg border font-mono bg-neutral-100 border-neutral-200 text-neutral-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Author & CTA */}
                    <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredArticle.author.avatar}
                          alt={isFa ? featuredArticle.author.nameFa : featuredArticle.author.nameEn}
                          loading="lazy"
                          decoding="async"
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                        />
                        <div>
                          <div className="text-sm font-bold text-neutral-900">
                            {isFa ? featuredArticle.author.nameFa : featuredArticle.author.nameEn}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {isFa ? featuredArticle.author.roleFa : featuredArticle.author.roleEn}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8f6b00] group-hover:text-neutral-900 transition-colors">
                        <span>{isFa ? 'مطالعه یادداشت' : 'Read Note'}</span>
                        <svg className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Articles Grid */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {searchQuery 
                  ? (isFa ? `نتایج جستجو برای "${searchQuery}"` : `Search results for "${searchQuery}"`)
                  : (isFa ? 'تمام یادداشت‌ها' : 'All Articles')
                }
              </h3>
              <span className="text-xs font-mono font-semibold text-[#8f6b00] bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-sm">
                {filteredArticles.length} {isFa ? 'یادداشت' : 'Articles'}
              </span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="p-12 sm:p-16 rounded-3xl text-center border bg-white border-neutral-200 text-neutral-600 shadow-md">
                <div className="text-3xl mb-4">🔍</div>
                <p className="text-lg font-bold mb-2 text-neutral-900">
                  {isFa ? 'هیچ مقاله‌ای یافت نشد' : 'No articles match your criteria'}
                </p>
                <p className="text-sm text-neutral-500 mb-6">
                  {isFa ? 'لطفاً کلمه کلیدی دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.' : 'Try adjusting your search terms or selecting another category.'}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-[#8f6b00] text-white border-[#8f6b00] cursor-pointer hover:bg-[#755700] transition-colors shadow-sm"
                >
                  {isFa ? 'مشاهده همه یادداشت‌ها' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredArticles.map((article) => {
                  const title = isFa ? article.titleFa : article.titleEn;
                  const excerpt = isFa ? article.excerptFa : article.excerptEn;
                  const categoryLabel = isFa ? article.categoryLabelFa : article.categoryLabelEn;
                  const readTime = isFa ? article.readTimeFa : article.readTimeEn;
                  const authorName = isFa ? article.author.nameFa : article.author.nameEn;
                  const date = isFa ? article.dateFa : article.dateEn;

                  return (
                    <article
                      key={article.id}
                      className="group rounded-3xl overflow-hidden border border-neutral-200/90 bg-white hover:border-[#8f6b00]/40 hover:shadow-xl hover:shadow-neutral-300/40 flex flex-col justify-between transition-all duration-300"
                    >
                      <Link to={`/journal/${article.slug}`} className="block">
                        {/* Image Frame with Golden Hover Hue */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                          <img
                            src={article.image}
                            alt={title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/75 text-[#fff083] border border-white/15">
                            {categoryLabel}
                          </span>
                        </div>

                        {/* Content block */}
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-3">
                            <span>{date}</span>
                            <span>•</span>
                            <span className="text-[#8f6b00] font-semibold">
                              {readTime}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-3 text-neutral-900 group-hover:text-[#8f6b00] transition-colors">
                            {title}
                          </h3>

                          <p className="text-sm leading-relaxed mb-6 text-neutral-600 line-clamp-3">
                            {excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {(isFa ? article.tagsFa : article.tagsEn).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border bg-neutral-100 border-neutral-200 text-neutral-600"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>

                      {/* Footer Author Bar */}
                      <div className="px-6 sm:px-8 py-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={article.author.avatar}
                            alt={authorName}
                            loading="lazy"
                            decoding="async"
                            className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                          />
                          <span className="text-xs font-medium text-neutral-700">{authorName}</span>
                        </div>

                        <Link
                          to={`/journal/${article.slug}`}
                          className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#8f6b00] hover:text-neutral-900 transition-colors"
                        >
                          <span>{isFa ? 'خواندن' : 'Read'}</span>
                          <svg className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

        </div>
      </main>

      {/* =========================================================================
          3. STUDIO DISPATCH NEWSLETTER (Deep Architectural Dark Capsule)
         ========================================================================= */}
      <footer className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-brand-dark text-brand-light">
        <div className="max-w-[1500px] mx-auto">
          <section className="rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-gradient-to-br from-brand-surface to-[#1c1c1c] text-brand-light shadow-2xl">
            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest font-semibold block mb-3 text-brand-yellow">
                {isFa ? 'اشتراک خبرنامه تخصصی' : 'The Studio Dispatch'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                {isFa 
                  ? 'تنها زمانی می‌نویسیم که حرفی عمیق برای گفتن باشد.' 
                  : 'Quiet dispatches, released only when we have something profound to share.'}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed mb-6 text-neutral-400">
                {isFa 
                  ? 'بدون اسپم یا تبلیغات بازاریابی؛ تحلیل‌های پشت‌صحنه پروژه‌ها، معماری کدهای مدرن و فلسفه دیزاین جیرجیرک را مستقیماً در ایمیل خود دریافت کنید.' 
                  : 'No marketing spam. Deep architecture case studies, design philosophy, and boutique studio lessons directly to your inbox.'}
              </p>

              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-white/10 border border-brand-yellow/40 text-brand-yellow text-sm font-semibold max-w-md flex items-center gap-2.5">
                  <span className="text-base">✓</span>
                  <span>
                    {isFa
                      ? 'با تشکر! اشتراک شما در خبرنامه تخصصی جیرجیرک با موفقیت ثبت شد.'
                      : 'Thank you! You are now subscribed to the Jirjirak Studio Dispatch.'}
                  </span>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md"
                >
                  <input
                    type="email"
                    required
                    placeholder={isFa ? 'ایمیل کاری شما...' : 'Your business email...'}
                    className="px-4 py-3 rounded-full text-sm border border-white/15 focus:border-brand-yellow text-white bg-black/40 focus:outline-none flex-1 placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 bg-brand-yellow text-brand-dark hover:bg-white cursor-pointer shadow-lg"
                  >
                    {isFa ? 'عضویت' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </footer>

    </div>
  );
}
