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
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-6xl rounded-full backdrop-blur-md transition-colors duration-300 ${
          solid
            ? 'bg-white/95 shadow-xl shadow-ink/10 border border-ink/10'
            : 'bg-ink/60 border border-white/20'
        }`}
      >
        <div className="flex justify-between items-center px-5 sm:px-8 py-3.5">
          <button
            onClick={() => handleNavigate('home')}
            className={`flex items-center gap-3 transition-colors ${
              solid ? 'text-ink hover:text-sapphire' : 'text-white hover:text-sapphire-light'
            }`}
          >
            <img
              src={logo}
              alt="Kigali Luxury Cocktails"
              className={`w-10 h-10 rounded-full object-cover ring-2 transition-all shrink-0 ${
                solid ? 'ring-sapphire/30' : 'ring-white/40'
              }`}
            />
            <span className="hidden sm:inline font-display text-lg font-semibold uppercase tracking-[0.08em]">
              Kigali Luxury Cocktails
            </span>
            <span className="sm:hidden font-display text-lg font-semibold uppercase tracking-[0.08em]">
              KLC
            </span>
          </button>

          <nav className="hidden md:flex gap-9 items-center">
            {links.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`group relative text-xs font-semibold uppercase tracking-[0.12em] transition-colors py-1 ${
                  currentPage === page
                    ? solid
                      ? 'text-sapphire'
                      : 'text-white'
                    : solid
                      ? 'text-taupe hover:text-ink'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    currentPage === page ? 'scale-x-100' : ''
                  } ${solid ? 'bg-sapphire' : 'bg-white'}`}
                />
              </button>
            ))}

            <button
              onClick={() => handleNavigate('booking')}
              className="bg-sapphire hover:bg-sapphire-light text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-colors shadow-md"
            >
              Book Catering
            </button>
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`md:hidden p-2 -mr-2 transition-colors ${solid ? 'text-ink' : 'text-white'}`}
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
              className="md:hidden overflow-hidden border-t border-ink/10"
            >
              <div className="flex flex-col items-start gap-1 px-6 py-4">
                {links.map(({ page, label }) => (
                  <button
                    key={page}
                    onClick={() => handleNavigate(page)}
                    className={`w-full text-left text-xs font-semibold uppercase tracking-[0.12em] py-3 transition-colors ${
                      currentPage === page ? 'text-sapphire' : 'text-taupe hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavigate('booking')}
                  className="mt-2 w-full bg-sapphire hover:bg-sapphire-light text-white text-xs font-semibold uppercase tracking-widest px-5 py-3.5 rounded-full transition-colors text-center shadow-md"
                >
                  Book Catering
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
