import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

export type PageState = 'home' | 'about' | 'services' | 'booking' | 'gallery' | 'contact' | 'login';

const pages: Record<PageState, React.ComponentType<{ onNavigate: (page: PageState) => void }>> = {
  home: HomePage,
  about: AboutPage,
  services: ServicesPage,
  booking: BookingPage,
  gallery: GalleryPage,
  contact: ContactPage,
  login: LoginPage,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const Page = pages[currentPage];

  const navigate = (page: PageState) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-ink selection:text-white">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="w-full">
        <Page onNavigate={navigate} />
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
