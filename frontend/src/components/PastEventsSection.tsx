import { motion } from 'framer-motion';
import { PartyPopper, Building2, Heart, Cake, ArrowRight } from 'lucide-react';
import type { PageState } from '../App';

interface PastEventsProps {
  onNavigate: (page: PageState) => void;
}

const events = [
  { icon: Heart, title: 'Wedding Reception', gradient: 'from-gold/25 via-gold/10 to-transparent' },
  { icon: Building2, title: 'Corporate Launch', gradient: 'from-ink/15 via-ink/5 to-transparent' },
  { icon: Cake, title: 'Birthday Celebration', gradient: 'from-gold/20 via-gold/5 to-transparent' },
  { icon: PartyPopper, title: 'Garden Party', gradient: 'from-ink/10 via-gold/10 to-transparent' },
];

export default function PastEventsSection({ onNavigate }: PastEventsProps) {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs font-medium uppercase tracking-[0.3em] mb-3">
            Past Events
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
            Moments We've Crafted
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {events.map(({ icon: Icon, title, gradient }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${gradient} bg-white border border-ink/10 flex flex-col items-center justify-center gap-3 shadow-sm`}
            >
              <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
              <span className="text-ink text-sm font-medium text-center px-4">{title}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
