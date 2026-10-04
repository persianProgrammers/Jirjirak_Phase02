import { useEffect } from 'react';
import { useGlobalStore } from '../stores/globalStore';
import { AboutSection } from '../features/landing/sections/AboutSection';
import { PhilosophySection } from '../features/landing/sections/PhilosophySection';

export default function About() {
  const { isNight } = useGlobalStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`w-full min-h-screen pt-16 sm:pt-20 transition-colors duration-700 ${
      isNight ? 'bg-brand-light text-brand-dark' : 'bg-brand-dark text-brand-light'
    }`}>
      {/* 05 / 08 About Section: Studio Mission & Full Interactive Team Atelier with Department Filters */}
      <AboutSection variant="full" />

      {/* 06 / 08 The Philosophy Section: Directly underneath the About Section */}
      <PhilosophySection />
    </div>
  );
}
