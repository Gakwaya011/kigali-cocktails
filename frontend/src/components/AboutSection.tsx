import { motion } from 'framer-motion';
import { GlassWater, Sparkles, MapPin } from 'lucide-react';

const stats = [
  { icon: GlassWater, label: 'Signature Cocktails', value: '30+' },
  { icon: Sparkles, label: 'Events Served', value: '150+' },
  { icon: MapPin, label: 'Based in', value: 'Kigali' },
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="text-gold text-xs font-medium uppercase tracking-[0.3em] mb-3">
          About Us
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-ink mb-6">
          Where Elegance Meets Every Sip
        </h2>
        <p className="text-taupe font-light leading-relaxed mb-12">
          Kigali Luxury Cocktails brings a full mobile mixology experience to your
          doorstep &mdash; a beautifully dressed bar, premium spirits, and a team of
          skilled mixologists crafting signature drinks for weddings, corporate
          launches, and private celebrations across Kigali.
        </p>

        <div className="grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
              <span className="font-display text-2xl text-ink">{value}</span>
              <span className="text-taupe text-xs uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
