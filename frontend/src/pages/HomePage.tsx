import HeroSection from '../components/HeroSection';
import ShowcaseSection from '../components/ShowcaseSection';
import ServicesSection from '../components/ServicesSection';
import PastEventsSection from '../components/PastEventsSection';
import AboutSection from '../components/AboutSection';
import PackagesSection from '../components/PackagesSection';
import CtaBandSection from '../components/CtaBandSection';
import TestimonialsSection from '../components/TestimonialsSection';
import GalleryStripSection from '../components/GalleryStripSection';
import ContactSection from '../components/ContactSection';
import type { PageState } from '../App';

interface HomePageProps {
  onNavigate: (page: PageState) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <ShowcaseSection onNavigate={onNavigate} />
      <ServicesSection />
      <PastEventsSection onNavigate={onNavigate} />
      <AboutSection />
      <PackagesSection onNavigate={onNavigate} />
      <CtaBandSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <GalleryStripSection onNavigate={onNavigate} />
      <ContactSection />
    </div>
  );
}
