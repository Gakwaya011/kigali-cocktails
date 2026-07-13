import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronRight, Pause, Play } from 'lucide-react';
import type { PageState } from '../App';
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero replaced the potrait 1.jpg';
import hero3 from '../assets/second hero replacer.jpg';

interface HeroProps {
  onNavigate: (page: PageState) => void;
}

const slides = [hero1, hero2, hero3];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection({ onNavigate }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden text-white">
      <AnimatePresence>
        <motion.img
          key={index}
          src={slides[index]}
          alt="Kigali Luxury Cocktails event"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-6 md:px-16"
      >
        <motion.p
          variants={item}
          className="text-gold-soft text-xs font-medium uppercase tracking-[0.3em] mb-5"
        >
          Mobile Mixology &middot; Kigali, Rwanda
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-4xl md:text-6xl font-light leading-[1.1] mb-6 text-balance"
        >
          Elevate Your Next <span className="text-gold italic">Kigali Event</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-white/80 text-lg max-w-lg font-light leading-relaxed mb-10"
        >
          Premium mobile mixology, elegant bar setups, and unforgettable handcrafted
          cocktails for weddings, graduations, and private parties.
        </motion.p>

        <motion.div variants={item}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-soft text-ink font-medium px-7 py-3.5 rounded-md transition-colors shadow-lg"
          >
            Book Your Event <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-6 md:left-16 z-10 flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
          className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === index ? 'w-8 bg-gold' : 'w-4 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
