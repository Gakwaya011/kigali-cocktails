import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { PageState } from '../App';
import logo from '../assets/cocktail logo.png';

interface NavbarProps {
  currentPage: PageState;
  onNavigate: (page: PageState) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || currentPage !== 'home';

  const links: { page: PageState; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'services', label: 'Services' },
    { page: 'gallery', label: 'Gallery' },
    { page: 'contact', label: 'Contact' },
  ];

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
        className={`w-full flex justify-between items-center transition-all duration-300 ${
          solid
            ? 'max-w-6xl bg-cream/95 backdrop-blur-md shadow-lg shadow-ink/5 rounded-2xl px-6 py-3'
            : 'max-w-none bg-transparent px-6 py-5'
        }`}
      >
        <button
          onClick={() => onNavigate('home')}
          className={`text-lg font-display tracking-[0.15em] uppercase flex items-center gap-3 transition-colors ${
            solid ? 'text-ink hover:text-gold' : 'text-white hover:text-gold-soft'
          }`}
        >
          <img
            src={logo}
            alt="Kigali Luxury Cocktails"
            className={`w-10 h-10 rounded-full object-cover ring-2 transition-all ${
              solid ? 'ring-gold/40' : 'ring-white/60'
            }`}
          />
          Kigali Luxury Cocktails
        </button>

        <nav className="flex gap-7 items-center">
          {links.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
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
            onClick={() => onNavigate('booking')}
            className="bg-gold hover:bg-gold-soft text-white text-sm font-medium uppercase tracking-wider px-5 py-2 rounded-full transition-colors"
          >
            Book Us
          </button>
        </nav>
      </motion.header>
    </div>
  );
}
