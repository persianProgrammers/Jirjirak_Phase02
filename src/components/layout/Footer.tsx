import { Link } from 'react-router-dom';
import { useGlobalStore } from '../../stores/globalStore';
import { useTranslation } from '../../i18n/translations';
import { AnimatedJirjirakLogo } from '../ui/AnimatedJirjirakLogo';

export function Footer() {
  const { currentLang, isNight } = useGlobalStore();
  const t = useTranslation()(currentLang);

  return (
    <footer className={`px-8 lg:px-12 xl:px-16 py-12 border-t transition-colors duration-500 ${
      isNight ? 'bg-brand-dark text-brand-light border-white/10' : 'bg-brand-light text-brand-dark border-neutral-300'
    }`}>
      <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-center text-xs font-medium uppercase tracking-wider gap-6 md:gap-4">
        <Link to="/" className="flex items-center group cursor-pointer">
          <AnimatedJirjirakLogo variant={isNight ? 'footer' : 'header'} className="h-8 md:h-10 w-auto" />
        </Link>
        
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="#world" className="hover:text-brand-gray transition-colors cursor-pointer">{t.nav.world}</a>
          <a href="#work" className="hover:text-brand-gray transition-colors cursor-pointer">{t.nav.work}</a>
          <Link to="/services" className="hover:text-brand-gray transition-colors cursor-pointer">{t.nav.services}</Link>
          <Link to="/about" className="hover:text-brand-gray transition-colors cursor-pointer">{t.nav.about}</Link>
          <Link to="/journal" className="hover:text-brand-gray transition-colors cursor-pointer">{t.nav.journal}</Link>
          <Link to="/contact" className="hover:text-brand-gray transition-colors cursor-pointer">{t.nav.contact}</Link>
        </nav>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="hover:text-brand-gray transition-colors cursor-pointer">TW</a>
          <a href="#" className="hover:text-brand-gray transition-colors cursor-pointer">IN</a>
          <a href="#" className="hover:text-brand-gray transition-colors cursor-pointer">BE</a>
          <span className="text-brand-gray mx-2">{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
