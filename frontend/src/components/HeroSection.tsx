import { motion, type Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { PageState } from '../App';
import heroImage from '../assets/new hero pic.jpg';

interface HeroProps {
  onNavigate: (page: PageState) => void;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const words = ['Elevate', 'Your', 'Next'];

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection({ onNavigate }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden text-white">
      <motion.img
        src={heroImage}
        alt="Kigali Luxury Cocktails mobile bar experience"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-6 md:px-16"
      >
        <motion.h1
          variants={container}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.05] mb-6 text-balance"
        >
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 mr-3 sm:mr-4 align-bottom">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span variants={word} className="inline-block italic text-sapphire-light">
              Kigali Event
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white/80 text-lg max-w-lg font-light leading-relaxed mb-10"
        >
          Most events are forgettable because the bar is an afterthought. Kigali Luxury
          Cocktails makes it the centerpiece &mdash; premium mobile mixology, elegant
          setups, and handcrafted drinks your guests will talk about.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-medium px-7 py-3.5 rounded-md transition-colors shadow-lg"
          >
            Book Your Event <ChevronRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 border border-white/60 hover:border-white text-white font-medium px-7 py-3.5 rounded-md transition-colors"
          >
            Explore Services
          </motion.button>
        </motion.div>

        <motion.p variants={item} className="text-white/60 text-sm">
          Now booking mobile bar experiences across Kigali.
        </motion.p>
      </motion.div>
    </section>
  );
}
