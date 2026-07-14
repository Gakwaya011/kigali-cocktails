import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { PageState } from '../App';
import logo from '../assets/cocktail logo.png';

interface NavbarProps {
  currentPage: PageState;
  onNavigate: (page: PageState) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  const solid = scrolled || currentPage !== 'home' || mobileOpen;

  const links: { page: PageState; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'services', label: 'Services' },
    { page: 'gallery', label: 'Gallery' },
    { page: 'contact', label: 'Contact' },
  ];

  const handleNavigate = (page: PageState) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300 ${
        solid ? 'pt-3 px-4' : 'pt-0 px-0'
      }`}
    >
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full transition-all duration-300 ${
          solid
            ? 'max-w-6xl bg-cream/95 backdrop-blur-md shadow-lg shadow-ink/5 rounded-2xl px-4 sm:px-6 py-3'
            : 'max-w-none bg-transparent px-4 sm:px-6 py-5'
        }`}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleNavigate('home')}
            className={`text-base sm:text-lg font-display tracking-[0.1em] sm:tracking-[0.15em] uppercase flex items-center gap-2 sm:gap-3 transition-colors ${
              solid ? 'text-ink hover:text-gold' : 'text-white hover:text-gold-soft'
            }`}
          >
            <img
              src={logo}
              alt="Kigali Luxury Cocktails"
              className={`w-10 h-10 rounded-full object-cover ring-2 transition-all flex-shrink-0 ${
                solid ? 'ring-gold/40' : 'ring-white/60'
              }`}
            />
            <span className="hidden sm:inline">Kigali Luxury Cocktails</span>
            <span className="sm:hidden">KLC</span>
          </button>

          <nav className="hidden md:flex gap-7 items-center">
            {links.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`relative text-sm font-medium uppercase tracking-wider transition-colors py-1 ${
                  solid ? 'text-taupe hover:text-ink' : 'text-white/85 hover:text-white'
                }`}
              >
                {label}
                {currentPage === page && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-gold"
                  />
                )}
              </button>
            ))}

            <button
              onClick={() => handleNavigate('booking')}
              className="bg-gold hover:bg-gold-soft text-white text-sm font-medium uppercase tracking-wider px-5 py-2 rounded-full transition-colors"
            >
              Book Us
            </button>
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`md:hidden p-2 -mr-2 transition-colors ${
              solid ? 'text-ink' : 'text-white'
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col items-start gap-1 pt-4 pb-1">
                {links.map(({ page, label }) => (
                  <button
                    key={page}
                    onClick={() => handleNavigate(page)}
                    className={`w-full text-left text-sm font-medium uppercase tracking-wider transition-colors py-2.5 ${
                      currentPage === page
                        ? 'text-gold'
                        : 'text-ink/80 hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate('booking')}
                  className="mt-2 w-full bg-gold hover:bg-gold-soft text-white text-sm font-medium uppercase tracking-wider px-5 py-3 rounded-full transition-colors text-center"
                >
                  Book Us
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
