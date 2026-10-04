import { HeroSection } from '../features/landing/sections/HeroSection';
import { WorldSection } from '../features/landing/sections/WorldSection';
import { ServicesSection } from '../features/landing/sections/ServicesSection';
import { FeaturedProjectsSection } from '../features/landing/sections/FeaturedProjectsSection';
import { CaseStudySection } from '../features/landing/sections/CaseStudySection';
import { AboutSection } from '../features/landing/sections/AboutSection';
import { JournalSection } from '../features/landing/sections/JournalSection';
import { ContactSection } from '../features/landing/sections/ContactSection';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <WorldSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <CaseStudySection />
      <AboutSection variant="landing" />
      <JournalSection />
      <ContactSection />
    </div>
  );
}
