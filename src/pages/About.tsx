import { useEffect } from 'react';
import { useGlobalStore } from '../stores/globalStore';
import { AboutSection } from '../features/landing/sections/AboutSection';
import { PhilosophySection } from '../features/landing/sections/PhilosophySection';
import { PageHeader } from '../components/layout/PageHeader';

export default function About() {
  const { isNight, currentLang } = useGlobalStore();
  const isFa = currentLang === 'FA';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-700 ${
        isNight ? 'bg-brand-dark text-brand-light' : 'bg-brand-light text-brand-dark'
      }`}
    >
      {/* 🏛️ Harmonious Shared Page Header */}
      <PageHeader
        step={isFa ? '۰۶ / ۰۹' : '06 / 09'}
        badge={isFa ? 'درباره استودیو جیرجیرک' : 'ABOUT JIRJIRAK'}
        title={isFa ? 'خلق تجربه‌های ناب با' : 'Crafting Digital Soul With'}
        titleHighlight={isFa ? 'وسواس در جزئیات' : 'Obsessive Precision'}
        subtitle={
          isFa
            ? 'روایت آتلیه چندرشته‌ای ما، باور به ارزش کارهای کوچک اما عمیق، و پیوند هنر، معماری و مهندسی نرم‌افزار.'
            : 'The story of our multidisciplinary atelier, rooted in small team velocity, deep focus, and timeless digital craftsmanship.'
        }
        breadcrumb={[
          {
            label: isFa ? 'درباره ما' : 'About',
          },
        ]}
        statusText={
          isFa
            ? 'آتلیه چندرشته‌ای هنر و مهندسی'
            : 'Multidisciplinary Art & Code Atelier'
        }
        tags={
          isFa
            ? ['تیم مستقل و بوتیک', 'تاسیس ۲۰۲۴', 'هویت، تعامل، نرم‌افزار', 'کیفیت بی‌قید و شرط']
            : ['Independent Atelier', 'Est. 2024', 'Identity, Code & Interaction', 'Uncompromising Quality']
        }
      />

      {/* 05 / 08 About Section: Studio Mission & Full Interactive Team Atelier with Department Filters */}
      <AboutSection variant="full" />

      {/* 06 / 08 The Philosophy Section: Directly underneath the About Section */}
      <PhilosophySection />
    </div>
  );
}
