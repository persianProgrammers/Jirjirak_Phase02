import { HeroSection } from '../features/landing/sections/HeroSection';
import { WorldSection } from '../features/landing/sections/WorldSection';
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
      <FeaturedProjectsSection />
      <CaseStudySection />
      <AboutSection variant="landing" />
      <JournalSection />
      <ContactSection />
    </div>
  );
}
