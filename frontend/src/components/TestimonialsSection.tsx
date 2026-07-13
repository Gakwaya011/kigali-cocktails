import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

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

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-white border-t border-ink/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs font-medium uppercase tracking-[0.3em] mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ quote, name, event }, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream border border-ink/10 rounded-2xl p-8 flex flex-col"
            >
              <Quote className="w-7 h-7 text-gold mb-4" strokeWidth={1.5} />
              <p className="text-taupe font-light leading-relaxed mb-6 flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <div>
                <p className="text-ink font-medium text-sm">{name}</p>
                <p className="text-taupe text-xs uppercase tracking-wider">{event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
