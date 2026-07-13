import { Phone, MessageCircle } from 'lucide-react';
import type { PageState } from '../App';
import logo from '../assets/cocktail logo.png';

interface FooterProps {
  onNavigate: (page: PageState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links: { page: PageState; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'services', label: 'Services' },
    { page: 'gallery', label: 'Gallery' },
    { page: 'contact', label: 'Contact' },
    { page: 'booking', label: 'Book Us' },
  ];

  return (
    <footer className="bg-ink border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Kigali Luxury Cocktails"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/40"
            />
            <span className="font-display tracking-[0.15em] text-base text-white uppercase">
              Kigali Luxury Cocktails
            </span>
          </div>
          <p className="text-white/60 text-sm font-light italic">
            Where elegance meets every sip.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-2">
            Explore
          </p>
          {links.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="text-white/70 hover:text-gold transition-colors text-sm"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Get in Touch
          </p>
          <a
            href="tel:+250783845473"
            className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm"
          >
            <Phone className="w-4 h-4" /> 0783 845 473
          </a>
          <a
            href="https://wa.me/250783845473"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <p className="text-white/70 text-sm">Kigali, Rwanda</p>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40 tracking-wider">
        &copy; {new Date().getFullYear()} Kigali Luxury Cocktails. All Rights Reserved.
      </div>
    </footer>
  );
}
