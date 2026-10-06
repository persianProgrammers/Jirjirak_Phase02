import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../i18n/translations';
import { JOURNAL_ARTICLES, JournalArticle } from '../features/journal/data/journalData';

export default function Journal() {
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const t = useTranslation()(currentLang);

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    <div className={`min-h-screen pt-28 sm:pt-32 pb-24 transition-colors duration-700 ${
      isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
    }`}>
      <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Breadcrumb & Step indicator */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-xs font-mono mb-8 opacity-75">
          <Link 
            to="/" 
            className={`transition-colors hover:underline ${
              isNight ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isFa ? 'صفحه اصلی' : 'Home'}
          </Link>
          <span className="opacity-40">/</span>
          <span className={isNight ? 'text-[#b3a85c] font-semibold' : 'text-brand-yellow font-semibold'}>
            {isFa ? 'دفترچه تجربیات' : 'Journal'}
          </span>
        </nav>

        {/* Hero Section */}
        <header className="mb-14 sm:mb-16 border-b pb-12 sm:pb-16 border-white/10 dark:border-neutral-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${isNight ? 'bg-[#b3a85c]' : 'bg-brand-yellow'}`} />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold text-brand-gray">
                  {isFa ? 'یادداشت‌های فنی و دیزاین' : 'Field Notes & Essays'}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.15]">
                {isFa ? 'دفترچه تجربیات جیرجیرک' : 'Jirjirak Studio Journal'}
              </h1>
              <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isNight ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                {isFa 
                  ? 'روایت‌هایی از ساخت، شکست‌ها، وسواس در جزئیات، معماری نرم‌افزار و خلق سیستم‌های دیجیتال زنده در استودیو جیرجیرک.' 
                  : 'Reflections on craft, constraints, software architecture, and the emotional resonance of digital products.'
                }
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className={`relative flex items-center rounded-2xl border px-4 py-2.5 transition-all ${
                isNight 
                  ? 'bg-white border-neutral-300 focus-within:border-[#b3a85c] shadow-sm' 
                  : 'bg-brand-surface border-white/15 focus-within:border-brand-yellow/60'
              }`}>
                <svg className="w-4 h-4 text-brand-gray shrink-0 me-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isFa ? 'جستجو در مقالات و کلمات کلیدی...' : 'Search articles, topics, tags...'}
                  className={`w-full bg-transparent text-sm focus:outline-none placeholder:text-neutral-500 ${
                    isNight ? 'text-brand-dark' : 'text-white'
                  }`}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-brand-gray hover:text-white px-1"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 mt-10">
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
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border flex items-center gap-2 ${
                    isActive
                      ? (isNight 
                          ? 'bg-[#b3a85c] text-white border-[#b3a85c] shadow' 
                          : 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-md')
                      : (isNight
                          ? 'bg-white/80 text-neutral-600 border-neutral-200 hover:border-[#b3a85c] hover:text-[#b3a85c]'
                          : 'bg-brand-surface/40 text-neutral-300 border-white/10 hover:border-brand-yellow/50 hover:text-brand-yellow')
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive 
                      ? (isNight ? 'bg-black/20 text-white' : 'bg-black/15 text-brand-dark') 
                      : (isNight ? 'bg-neutral-100 text-neutral-500' : 'bg-white/10 text-neutral-400')
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Featured Article Hero (When no search active and showing ALL) */}
        {!searchQuery && activeCategory === 'ALL' && featuredArticle && (
          <section className="mb-20 sm:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
              }`}>
                ★ {isFa ? 'یادداشت برگزیده' : 'Featured Spotlight'}
              </span>
            </div>

            <Link
              to={`/journal/${featuredArticle.slug}`}
              className={`group block rounded-3xl overflow-hidden border transition-all duration-500 ${
                isNight 
                  ? 'bg-white border-neutral-200 hover:border-[#b3a85c]/50 hover:shadow-2xl hover:shadow-neutral-200/80' 
                  : 'bg-brand-surface/50 border-white/10 hover:border-brand-yellow/40 hover:shadow-2xl hover:shadow-black/60'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                {/* Visual Cover */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-neutral-900">
                  <img
                    src={featuredArticle.image}
                    alt={isFa ? featuredArticle.titleFa : featuredArticle.titleEn}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                  <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/70 text-brand-yellow border border-white/15">
                    {isFa ? featuredArticle.categoryLabelFa : featuredArticle.categoryLabelEn}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-brand-gray mb-4">
                      <span>{isFa ? featuredArticle.dateFa : featuredArticle.dateEn}</span>
                      <span>•</span>
                      <span className={isNight ? 'text-[#b3a85c] font-semibold' : 'text-brand-yellow font-semibold'}>
                        {isFa ? featuredArticle.readTimeFa : featuredArticle.readTimeEn}
                      </span>
                    </div>

                    <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 transition-colors ${
                      isNight ? 'group-hover:text-[#b3a85c]' : 'group-hover:text-brand-yellow'
                    }`}>
                      {isFa ? featuredArticle.titleFa : featuredArticle.titleEn}
                    </h2>

                    <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                      isNight ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {isFa ? featuredArticle.excerptFa : featuredArticle.excerptEn}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(isFa ? featuredArticle.tagsFa : featuredArticle.tagsEn).slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className={`text-xs px-2.5 py-1 rounded-lg border font-mono ${
                            isNight 
                              ? 'bg-neutral-100 border-neutral-200 text-neutral-600' 
                              : 'bg-white/5 border-white/10 text-neutral-300'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & CTA */}
                  <div className="pt-6 border-t border-white/10 dark:border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredArticle.author.avatar}
                        alt={isFa ? featuredArticle.author.nameFa : featuredArticle.author.nameEn}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-sm font-bold">
                          {isFa ? featuredArticle.author.nameFa : featuredArticle.author.nameEn}
                        </div>
                        <div className="text-xs text-brand-gray">
                          {isFa ? featuredArticle.author.roleFa : featuredArticle.author.roleEn}
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                      isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
                    }`}>
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
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold">
              {searchQuery 
                ? (isFa ? `نتایج جستجو برای "${searchQuery}"` : `Search results for "${searchQuery}"`)
                : (isFa ? 'تمام یادداشت‌ها' : 'All Articles')
              }
            </h3>
            <span className="text-xs font-mono text-brand-gray">
              {filteredArticles.length} {isFa ? 'یادداشت' : 'Articles'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className={`p-12 sm:p-16 rounded-3xl text-center border ${
              isNight ? 'bg-white border-neutral-200 text-neutral-500' : 'bg-brand-surface/40 border-white/10 text-neutral-400'
            }`}>
              <div className="text-3xl mb-4">🔍</div>
              <p className="text-lg font-bold mb-2">
                {isFa ? 'هیچ مقاله‌ای یافت نشد' : 'No articles match your criteria'}
              </p>
              <p className="text-sm text-brand-gray mb-6">
                {isFa ? 'لطفاً کلمه کلیدی دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.' : 'Try adjusting your search terms or selecting another category.'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  isNight ? 'bg-[#b3a85c] text-white border-[#b3a85c]' : 'bg-brand-yellow text-brand-dark border-brand-yellow'
                }`}
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
                    className={`group rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
                      isNight 
                        ? 'bg-white border-neutral-200/90 hover:border-[#b3a85c]/50 hover:shadow-xl hover:shadow-neutral-200/60' 
                        : 'bg-brand-surface/40 border-white/10 hover:bg-brand-surface hover:border-brand-yellow/30 hover:shadow-2xl hover:shadow-black/50'
                    }`}
                  >
                    <Link to={`/journal/${article.slug}`} className="block">
                      {/* Image Frame with Golden Hover Hue */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                        <img
                          src={article.image}
                          alt={title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-4 right-4 rtl:right-auto rtl:left-4 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/70 text-brand-yellow border border-white/15">
                          {categoryLabel}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3 text-xs font-mono text-brand-gray mb-3">
                          <span>{date}</span>
                          <span>•</span>
                          <span className={isNight ? 'text-[#b3a85c] font-semibold' : 'text-brand-yellow font-semibold'}>
                            {readTime}
                          </span>
                        </div>

                        <h3 className={`text-xl sm:text-2xl font-bold leading-snug mb-3 transition-colors ${
                          isNight ? 'group-hover:text-[#b3a85c]' : 'group-hover:text-brand-yellow'
                        }`}>
                          {title}
                        </h3>

                        <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
                          isNight ? 'text-neutral-600' : 'text-neutral-400'
                        }`}>
                          {excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {(isFa ? article.tagsFa : article.tagsEn).map((tag, idx) => (
                            <span
                              key={idx}
                              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${
                                isNight 
                                  ? 'bg-neutral-50 border-neutral-200 text-neutral-600' 
                                  : 'bg-white/5 border-white/10 text-neutral-400'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>

                    {/* Footer Author Bar */}
                    <div className="px-6 sm:px-8 py-4 border-t border-white/10 dark:border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={article.author.avatar}
                          alt={authorName}
                          className="w-7 h-7 rounded-full object-cover border border-white/20"
                        />
                        <span className="text-xs font-medium">{authorName}</span>
                      </div>

                      <Link
                        to={`/journal/${article.slug}`}
                        className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                          isNight ? 'text-[#b3a85c] hover:text-black' : 'text-brand-yellow hover:text-white'
                        }`}
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

        {/* Quiet Studio Dispatch Newsletter Capsule */}
        <section className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden ${
          isNight 
            ? 'bg-gradient-to-br from-white to-neutral-100 border-neutral-300 text-brand-dark' 
            : 'bg-gradient-to-br from-brand-surface to-[#222] border-white/10 text-brand-light'
        }`}>
          <div className="max-w-2xl relative z-10">
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold block mb-3 ${
              isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'
            }`}>
              {isFa ? 'اشتراک خبرنامه تخصصی' : 'The Studio Dispatch'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {isFa 
                ? 'تنها زمانی می‌نویسیم که حرفی عمیق برای گفتن باشد.' 
                : 'Quiet dispatches, released only when we have something profound to share.'}
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isNight ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              {isFa 
                ? 'بدون اسپم یا تبلیغات بازاریابی؛ تحلیل‌های پشت‌صحنه پروژه‌ها، معماری کدهای مدرن و فلسفه دیزاین جیرجیرک را مستقیماً در ایمیل خود دریافت کنید.' 
                : 'No marketing spam. Deep architecture case studies, design philosophy, and boutique studio lessons directly to your inbox.'}
            </p>

            <form 
              onSubmit={(e) => { e.preventDefault(); alert(isFa ? 'با تشکر! اشتراک شما با موفقیت ثبت شد.' : 'Thank you! You are now subscribed to the Jirjirak Dispatch.'); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                required
                placeholder={isFa ? 'ایمیل کاری شما...' : 'Your business email...'}
                className={`px-4 py-3 rounded-full text-sm border focus:outline-none flex-1 ${
                  isNight 
                    ? 'bg-white border-neutral-300 focus:border-[#b3a85c] text-black' 
                    : 'bg-black/40 border-white/15 focus:border-brand-yellow text-white'
                }`}
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  isNight 
                    ? 'bg-[#b3a85c] text-white hover:bg-neutral-900' 
                    : 'bg-brand-yellow text-brand-dark hover:bg-white'
                }`}
              >
                {isFa ? 'عضویت' : 'Subscribe'}
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
