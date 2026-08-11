import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The bar setup was stunning and the signature cocktails were the talk of the wedding. Our guests are still asking who did the drinks.',
    name: 'Aline U.',
    event: 'Wedding Reception',
  },
  {
    quote:
      'Professional, punctual, and the branded mocktails were a huge hit at our product launch. Will absolutely book again.',
    name: 'Eric N.',
    event: 'Corporate Launch',
  },
  {
    quote:
      'Such an elegant touch for my birthday. The mixologist was fantastic and the setup photographed beautifully.',
    name: 'Chantal M.',
    event: 'Birthday Celebration',
  },
];

const track = [...testimonials, ...testimonials];

function TestimonialCard({
  quote,
  name,
  event,
  alt,
}: {
  quote: string;
  name: string;
  event: string;
  alt: boolean;
}) {
  return (
    <div
      className={`shrink-0 w-80 sm:w-96 rounded-2xl border border-ink/10 p-6 ${
        alt ? 'bg-cream' : 'bg-white'
      }`}
    >
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-ink fill-ink" />
        ))}
      </div>
      <p className="text-ink/80 font-light leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-sapphire text-white flex items-center justify-center text-sm font-medium shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-ink font-medium text-sm">{name}</p>
          <p className="text-taupe text-xs">{event}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center px-6 mb-16"
      >
        <span className="inline-block bg-ink text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
          Testimonials
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-ink mb-4">
          Hear From Our Clients
        </h2>
        <p className="text-taupe font-light max-w-xl mx-auto">
          Real words from real events &mdash; weddings, launches, and celebrations across
          Kigali where we brought the bar.
        </p>
      </motion.div>

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        className="flex gap-5 w-max"
      >
        {track.map((t, idx) => (
          <TestimonialCard key={idx} {...t} alt={idx % 2 === 1} />
        ))}
      </motion.div>
    </section>
  );
}
