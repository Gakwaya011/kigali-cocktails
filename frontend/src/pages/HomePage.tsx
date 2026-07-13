import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PackagesSection from '../components/PackagesSection';
import PastEventsSection from '../components/PastEventsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import type { PageState } from '../App';

interface HomePageProps {
  onNavigate: (page: PageState) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <ServicesSection />
      <PackagesSection onNavigate={onNavigate} />
      <PastEventsSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <ContactSection onNavigate={onNavigate} />
    </div>
  );
}