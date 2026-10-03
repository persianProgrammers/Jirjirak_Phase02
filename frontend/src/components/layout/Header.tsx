import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { useGlobalStore } from '../../stores/globalStore';
import { useTranslation } from '../../i18n/translations';
import { AnimatedJirjirakLogo } from '../ui/AnimatedJirjirakLogo';

const LANDING_SECTIONS = [
  { id: 'hero' },
  { id: 'world' },
  { id: 'services' },
  { id: 'work' },
  { id: 'case-study' },
  { id: 'about' },
  { id: 'journal' },
  { id: 'contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);
  const isFa = currentLang === 'FA';
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Smooth Section Jump with Lenis Integration
  const handleNavClick = (e: React.MouseEvent, href: string, to: string) => {
    if (href.startsWith('#') && isHomePage) {
      e.preventDefault();
      closeMenu();
      if (lenis) {
        lenis.scrollTo(href, { offset: -30, duration: 1.2 });
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      navigate(to);
    } else {
      closeMenu();
    }
  };

  // 1. Direction-Aware Smart Conceal & Active Section Detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY.current;

          setIsScrolled(currentScrollY > 45);

          // Smart auto-hide on scroll down, reveal on scroll up
          if (currentScrollY <= 45) {
            setIsVisible(true);
          } else if (diff > 6 && currentScrollY > 120) {
            // Scrolling down -> hide to give full immersive focus to content
            setIsVisible(false);
          } else if (diff < -6) {
            // Scrolling up -> instantly reveal
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;

          // Track active section for nav link highlight (without showing section counter)
          if (isHomePage) {
            const probeY = 140;
            for (const section of LANDING_SECTIONS) {
              const el = document.getElementById(section.id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= probeY && rect.bottom > probeY) {
                  setActiveSectionId(section.id);
                  break;
                }
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Reveal header when mouse touches top edge of screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 35) {
        setIsVisible(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation variants for mobile drawer
  const menuVariants = {
    closed: { 
      clipPath: isFa ? "circle(0% at 0% 0%)" : "circle(0% at 100% 0%)",
      transition: { type: "spring" as const, bounce: 0, duration: 0.8 }
    },
    open: { 
      clipPath: isFa ? "circle(150% at 0% 0%)" : "circle(150% at 100% 0%)",
      transition: { type: "spring" as const, bounce: 0, duration: 0.8 }
    }
  };

  const navItemVariants = {
    closed: { y: 40, opacity: 0 },
    open: (i: number) => ({
      y: 0, 
      opacity: 1,
      transition: { delay: i * 0.08 + 0.15, duration: 0.45, ease: "easeOut" as const }
    })
  };

  const navLinks = [
    { href: '#world', to: '/#world', label: t.nav.world, id: 'world' },
    { href: '#services', to: '/#services', label: t.nav.services, id: 'services' },
    { href: '#work', to: '/#work', label: t.nav.work, id: 'work' },
    { href: '/about', to: '/about', label: t.nav.about, id: 'about' },
    { href: '/journal', to: '/journal', label: t.nav.journal, id: 'journal' },
    { href: '/contact', to: '/contact', label: t.nav.contact, id: 'contact' },
  ];

  return (
    <>
      {/* 
        ✨ JIRJIRAK SMART FLOATING DOCK
        - Stable color theme tied to isNight (no jarring section-by-section flickering).
        - Frosted glass shield (backdrop-blur-2xl) prevents text collision with page content.
        - Direction-aware auto-hide: tucks away when scrolling down for pure focus; glides back down on scroll up.
        - Logo swaps wings between Header & Footer across Day & Night.
      */}
      <header 
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrolled 
            ? 'pt-3 sm:pt-4 px-4 sm:px-6' 
            : 'pt-5 lg:pt-6 px-6 lg:px-12 xl:px-16'
        }`}
      >
        <div 
          className={`mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? 'max-w-4xl rounded-full px-5 sm:px-7 py-2 sm:py-2.5 backdrop-blur-2xl shadow-xl border'
              : 'max-w-[1600px] w-full py-1 bg-transparent border-transparent'
          } ${
            isNight
              // 🌙 Night Mode: exact section dark color (bg-brand-dark / #222222)
              ? (isScrolled 
                  ? 'bg-brand-dark/95 border-white/10 text-brand-light shadow-[0_12px_40px_rgba(0,0,0,0.5)]' 
                  : 'text-brand-light')
              // ☀️ Day Mode: exact section light color (bg-brand-light / #e9e9e9)
              : (isScrolled 
                  ? 'bg-brand-light/95 border-brand-dark/15 text-brand-dark shadow-[0_12px_40px_rgba(0,0,0,0.08)]' 
                  : 'text-brand-dark')
          }`}
        >
          <div className="flex items-center justify-between w-full relative z-10">
            {/* 
              Brand Logo
              - In Night: Header gets yellow-wing logo ('header')
              - In Day: Header gets dark-wing logo ('footer')
              - Footer always uses the opposite!
            */}
            <Link 
              to="/" 
              className="flex items-center group focus:outline-none" 
              onClick={closeMenu}
              aria-label="Jirjirak Studio"
            >
              <AnimatedJirjirakLogo 
                variant={isNight ? 'header' : 'footer'}
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-8 sm:h-9 w-auto' : 'h-10 md:h-12 w-auto'
                }`} 
              />
            </Link>

            {/* Desktop Navigation Links with Magnetic Floating Pill */}
            <nav 
              className="hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] font-semibold tracking-wider uppercase relative"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {navLinks.map((item) => {
                const isActive = isHomePage && activeSectionId === item.id;

                return (
                  <div key={item.id} className="relative">
                    {/* Magnetic Floating Hover Pill */}
                    {hoveredNav === item.id && (
                      <motion.div
                        layoutId="headerHoverPill"
                        className={`absolute inset-0 rounded-full pointer-events-none -z-10 ${
                          isNight ? 'bg-white/12' : 'bg-black/8'
                        }`}
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}

                    {item.href.startsWith('#') && isHomePage ? (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.to)}
                        onMouseEnter={() => setHoveredNav(item.id)}
                        className={`px-3 py-1.5 rounded-full transition-colors duration-200 block select-none ${
                          isActive
                            ? (isNight ? 'text-brand-yellow font-bold' : 'text-[#b3a85c] font-bold')
                            : (isNight ? 'text-white/85 hover:text-brand-yellow' : 'text-brand-dark/85 hover:text-[#b3a85c]')
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={(e) => handleNavClick(e, item.href, item.to)}
                        onMouseEnter={() => setHoveredNav(item.id)}
                        className={`px-3 py-1.5 rounded-full transition-colors duration-200 block select-none ${
                          location.pathname === item.to
                            ? (isNight ? 'text-brand-yellow font-bold' : 'text-[#b3a85c] font-bold')
                            : (isNight ? 'text-white/85 hover:text-brand-yellow' : 'text-brand-dark/85 hover:text-[#b3a85c]')
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a 
                href="#world" 
                onClick={(e) => handleNavClick(e, '#world', '/#world')}
                className={`px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 select-none shadow-sm ${
                  isNight
                    ? 'border border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark hover:shadow-[0_0_15px_rgba(255,240,131,0.4)]'
                    : 'border border-[#b3a85c] text-[#b3a85c] hover:bg-[#b3a85c] hover:text-brand-dark hover:shadow-[0_0_15px_rgba(179,168,92,0.3)]'
                }`}
              >
                {t.nav.enterWorld}
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center">
              <button 
                className={`flex flex-col justify-center items-center w-9 h-9 rounded-full transition-colors cursor-pointer ${
                  isNight ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t.nav.close : t.nav.menu}
                data-cursor="pointer"
              >
                <motion.span 
                  animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className={`w-6 h-0.5 block transition-all duration-300 ${
                    isNight ? 'bg-brand-yellow' : 'bg-[#b3a85c]'
                  }`} 
                />
                <motion.span 
                  animate={isMenuOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                  className={`w-6 h-0.5 block my-1 transition-all duration-300 ${
                    isNight ? 'bg-white' : 'bg-brand-dark/70'
                  }`} 
                />
                <motion.span 
                  animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`w-6 h-0.5 block transition-all duration-300 ${
                    isNight ? 'bg-brand-yellow' : 'bg-[#b3a85c]'
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        🎭 Mobile Fullscreen Curtained Drawer
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`fixed inset-0 z-[70] flex flex-col justify-center px-8 sm:px-12 pointer-events-auto transition-colors duration-500 ${
              isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
            }`}
          >
            {/* Close Button inside Drawer */}
            <button
              onClick={closeMenu}
              aria-label={t.nav.close}
              className={`absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                isNight 
                  ? 'border-white/20 text-brand-yellow hover:bg-white/10' 
                  : 'border-brand-dark/20 text-[#b3a85c] hover:bg-black/10'
              }`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Decorative Ambient Fireflies Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center">
              <div className={`w-[320px] h-[320px] rounded-full filter blur-[120px] ${
                isNight ? 'bg-brand-yellow' : 'bg-[#b3a85c]'
              }`}></div>
            </div>

            <nav className="flex flex-col gap-5 sm:gap-6 text-2xl sm:text-3xl font-bold tracking-tight uppercase relative z-10">
              {[
                { href: '#world', to: '/#world', label: t.nav.world, step: isFa ? '۰۲' : '02' },
                { href: '#services', to: '/#services', label: t.nav.services, step: isFa ? '۰۳' : '03' },
                { href: '#work', to: '/#work', label: t.nav.work, step: isFa ? '۰۴' : '04' },
                { href: '/about', to: '/about', label: t.nav.about, step: isFa ? '۰۶' : '06' },
                { href: '/journal', to: '/journal', label: t.nav.journal, step: isFa ? '۰۸' : '08' },
                { href: '/contact', to: '/contact', label: t.nav.contact, step: isFa ? '۰۹' : '09' },
              ].map((item, i) => (
                <motion.div 
                  custom={i} 
                  variants={navItemVariants} 
                  initial="closed" 
                  animate="open" 
                  exit="closed" 
                  key={item.label}
                  className="flex items-center gap-4 group"
                >
                  <span className={`text-xs font-mono transition-colors ${
                    isNight ? 'text-brand-yellow/80 group-hover:text-brand-yellow' : 'text-[#b3a85c]/90 group-hover:text-[#b3a85c]'
                  }`}>
                    {item.step}
                  </span>
                  {item.href.startsWith('#') && isHomePage ? (
                    <a 
                      href={item.href} 
                      onClick={(e) => handleNavClick(e, item.href, item.to)}
                      className={`transition-colors inline-block ${
                        isNight ? 'hover:text-brand-yellow' : 'hover:text-[#b3a85c]'
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      to={item.to} 
                      onClick={(e) => handleNavClick(e, item.href, item.to)}
                      className={`transition-colors inline-block ${
                        isNight ? 'hover:text-brand-yellow' : 'hover:text-[#b3a85c]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              custom={7} 
              variants={navItemVariants} 
              initial="closed" 
              animate="open" 
              exit="closed" 
              className="mt-10 sm:mt-12 relative z-10 max-w-xs"
            >
              <a 
                href="#world" 
                onClick={(e) => handleNavClick(e, '#world', '/#world')}
                className={`inline-block text-center px-6 py-3.5 border-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 w-full shadow-lg ${
                  isNight 
                    ? 'border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark' 
                    : 'border-[#b3a85c] text-[#b3a85c] hover:bg-[#b3a85c] hover:text-brand-dark'
                }`}
              >
                {t.nav.enterWorld}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
