import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../../animations/gsap';
import { useGlobalStore } from '../../../stores/globalStore';
import { useTranslation } from '../../../i18n/translations';
import { JOURNAL_ARTICLES } from '../../journal/data/journalData';

export function JournalSection() {
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { currentLang, isNight } = useGlobalStore();
  const isFa = currentLang === 'FA';
  const t = useTranslation()(currentLang);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredArticles = activeCategory === 'ALL'
    ? JOURNAL_ARTICLES
    : JOURNAL_ARTICLES.filter((art) => art.category === activeCategory);

  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current!.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section 
      id="journal" 
      ref={containerRef} 
      className={`py-28 sm:py-32 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden transition-colors duration-700 ease-in-out ${
        isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row gap-12 lg:gap-16">
        
        {/* Header */}
        <div className="md:w-1/3 flex flex-col items-start lg:self-stretch">
          {/* Pre-title / Step Badge (Pinned at top) */}
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <span className={`text-xs font-semibold tracking-widest font-mono ${isNight ? 'text-[#b3a85c]' : 'text-brand-yellow'}`}>{t.journal.step}</span>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.journal.badge}</span>
          </div>
          
          {/* Centered Content: Title, Description & Button */}
          <div className="lg:my-auto flex flex-col items-start py-4 lg:py-0 w-full">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-5 sm:mb-6">
              {t.journal.title}
            </h2>
            
            <p className={`text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 ${
              isNight ? 'text-brand-gray' : 'text-neutral-400'
            }`}>
              {t.journal.description}
            </p>

            <Link 
              to="/journal" 
              className={`group text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 px-5 py-3 rounded-full border ${
                isNight 
                  ? 'border-neutral-300 text-[#b3a85c] hover:bg-neutral-900 hover:text-white hover:border-neutral-900' 
                  : 'border-white/20 text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark hover:border-brand-yellow'
              }`}
            >
              <span>{t.journal.viewAll}</span>
              <svg className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="hidden lg:block h-8 w-full" aria-hidden="true" />
        </div>

        {/* Content List */}
        <div className="md:w-2/3 flex flex-col">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 sm:mb-12">
            {t.journal.categories.map((cat) => (
              <button 
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all border ${
                  activeCategory === cat.key 
                    ? (isNight ? 'bg-[#b3a85c] text-white border-[#b3a85c] shadow-sm' : 'bg-brand-yellow text-brand-dark border-brand-yellow shadow-md') 
                    : isNight 
                      ? 'bg-transparent text-neutral-600 border-gray-300 hover:border-[#b3a85c] hover:text-[#b3a85c]'
                      : 'bg-transparent text-neutral-400 border-brand-surface-light hover:border-brand-yellow hover:text-brand-yellow'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div ref={listRef} className="flex flex-col gap-6 sm:gap-8">
            {filteredArticles.map((article) => {
              const title = isFa ? article.titleFa : article.titleEn;
              const excerpt = isFa ? article.excerptFa : article.excerptEn;
              const categoryLabel = isFa ? article.categoryLabelFa : article.categoryLabelEn;
              const readTime = isFa ? article.readTimeFa : article.readTimeEn;
              const authorName = isFa ? article.author.nameFa : article.author.nameEn;
              const date = isFa ? article.dateFa : article.dateEn;

              return (
                <Link 
                  key={article.id} 
                  to={`/journal/${article.slug}`} 
                  className={`group flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-7 p-4 sm:p-5 rounded-2xl transition-all duration-300 border ${
                    isNight 
                      ? 'border-neutral-200/80 bg-white hover:border-[#b3a85c]/40 hover:shadow-lg hover:shadow-neutral-200/50' 
                      : 'border-white/[0.08] bg-brand-surface/40 hover:bg-brand-surface hover:border-brand-yellow/30 hover:shadow-xl hover:shadow-black/40'
                  }`}
                >
                  {/* Thumbnail with Rich Cover Image */}
                  <div className="w-full sm:w-52 h-44 sm:h-32 rounded-xl bg-neutral-900 shrink-0 border border-white/10 overflow-hidden relative group-hover:border-brand-yellow/50 transition-colors">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md bg-black/60 text-brand-yellow border border-white/15">
                      {categoryLabel}
                    </span>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-snug transition-colors ${
                        isNight ? 'text-brand-dark group-hover:text-[#b3a85c]' : 'text-brand-light group-hover:text-brand-yellow'
                      }`}>
                        {title}
                      </h3>
                      <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3 ${
                        isNight ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                        {excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-brand-gray tracking-wide">
                      <div className="flex items-center gap-1.5">
                        <img 
                          src={article.author.avatar} 
                          alt={authorName} 
                          className="w-4 h-4 rounded-full object-cover border border-white/20" 
                        />
                        <span className={isNight ? 'text-neutral-700' : 'text-neutral-300'}>{authorName}</span>
                      </div>
                      <span className="w-1 h-1 bg-neutral-500 rounded-full"></span>
                      <span>{date}</span>
                      <span className="w-1 h-1 bg-neutral-500 rounded-full"></span>
                      <span className={isNight ? 'text-[#b3a85c] font-semibold' : 'text-brand-yellow font-semibold'}>{readTime}</span>
                    </div>
                  </div>

                  {/* Arrow cue */}
                  <div className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full shrink-0 border transition-all ${
                    isNight 
                      ? 'border-neutral-200 text-neutral-400 group-hover:bg-[#b3a85c] group-hover:text-white group-hover:border-[#b3a85c]' 
                      : 'border-white/10 text-neutral-400 group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-brand-yellow'
                  }`}>
                    <svg className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
