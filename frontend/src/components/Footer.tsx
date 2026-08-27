import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import type { PageState } from '../App';
import logo from '../assets/logo-wordmark-white.png';

interface FooterProps {
  onNavigate: (page: PageState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links: { page: PageState; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'services', label: 'Services' },
    { page: 'menu', label: 'Menu' },
    { page: 'gallery', label: 'Gallery' },
    { page: 'contact', label: 'Contact' },
    { page: 'booking', label: 'Book Us' },
  ];

  return (
    <footer className="bg-ink border-t border-white/10 pt-16 pb-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className="max-w-6xl mx-auto grid gap-10 md:grid-cols-4 text-center md:text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start gap-3"
        >
          <img src={logo} alt="Kigali Luxury Cocktails" className="h-11 w-auto" />
          <p className="text-white/60 text-sm font-light italic">
            Where elegance meets every sip.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center md:items-start gap-2"
        >
          <p className="text-sapphire-light text-xs font-medium uppercase tracking-[0.2em] mb-2">
            Explore
          </p>
          {links.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="text-white/70 hover:text-sapphire-light transition-colors text-sm"
            >
              {label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center md:items-start gap-3"
        >
          <p className="text-sapphire-light text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Get in Touch
          </p>
          <a
            href="tel:+250783845473"
            className="flex items-center gap-2 text-white/70 hover:text-sapphire-light transition-colors text-sm"
          >
            <Phone className="w-4 h-4" /> 0783 845 473
          </a>
          <a
            href="https://wa.me/250783845473"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-sapphire-light transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <p className="text-white/70 text-sm">Kigali, Rwanda</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center md:items-start gap-3"
        >
          <p className="text-sapphire-light text-xs font-medium uppercase tracking-[0.2em] mb-1">
            Subscribe
          </p>
          <p className="text-white/60 text-sm font-light">
            Get updates on new packages and offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2 w-full max-w-xs"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-white/10 border border-white/15 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-sapphire-light transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-sapphire hover:bg-sapphire-light text-white text-sm font-medium rounded-md px-4 py-2.5 transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40 tracking-wider">
        &copy; {new Date().getFullYear()} Kigali Luxury Cocktails. All Rights Reserved.
      </div>
    </footer>
  );
}
