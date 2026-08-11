import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { PageState } from '../App';
import hero1 from '../assets/hero1.jpg';

interface CtaBandProps {
  onNavigate: (page: PageState) => void;
}

export default function CtaBandSection({ onNavigate }: CtaBandProps) {
  return (
    <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
      <motion.img
        src={hero1}
        alt="Kigali Luxury Cocktails bar setup"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white max-w-2xl leading-tight text-balance mb-8">
          Ready to Elevate Your Next Event?
        </h2>
        <button
          onClick={() => onNavigate('booking')}
          className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-medium px-7 py-3.5 rounded-md transition-colors"
        >
          Book Your Event <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
