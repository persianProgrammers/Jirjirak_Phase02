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
      
      {/* Off-screen Landing Sections with Native GPU Content-Visibility (Eliminates off-screen rendering while scrolling top half) */}
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}>
        <FeaturedProjectsSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1000px' }}>
        <CaseStudySection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <AboutSection variant="landing" />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 800px' }}>
        <JournalSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1100px' }}>
        <ContactSection />
      </div>
    </div>
  );
}
