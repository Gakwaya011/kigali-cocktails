import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { PageState } from '../App';
import hero1 from '../assets/hero1.jpg';
import hero3 from '../assets/second hero replacer.jpg';

interface PastEventsProps {
  onNavigate: (page: PageState) => void;
}

const events = [
  { photo: hero1, title: 'Weddings & Receptions' },
  { photo: hero3, title: 'Corporate Events' },
];

export default function PastEventsSection({ onNavigate }: PastEventsProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
            Past Events
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
            Moments We've Crafted
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {events.map(({ photo, title }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
            >
              <img
                src={photo}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute bottom-6 left-6 font-display text-2xl text-white">
                {title}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
