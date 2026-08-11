import { motion } from 'framer-motion';
import heroPortrait from '../assets/hero replaced the potrait 1.jpg';
import ringForCocktail from '../assets/ring-for-cocktail.jpg';

const stats = [
  { value: '30+', label: 'Signature Cocktails' },
  { value: '150+', label: 'Events Served' },
  { value: 'Kigali', label: 'Based in' },
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div className="md:border-r md:border-ink/10 md:pr-16">
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-ink mb-5">
              Where Elegance Meets Every Sip
            </h2>
            <p className="text-taupe font-light leading-relaxed">
              Kigali Luxury Cocktails brings a full mobile mixology experience to your
              doorstep &mdash; a beautifully dressed bar, premium spirits, and a team of
              skilled mixologists crafting signature drinks for weddings, corporate
              launches, and private celebrations across Kigali.
            </p>
          </div>
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden">
            <img
              src={heroPortrait}
              alt="Kigali Luxury Cocktails mixologist at work"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden md:order-1">
            <img
              src={ringForCocktail}
              alt="Ring for cocktail service detail"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="md:border-l md:border-ink/10 md:pl-16 md:order-2">
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
              Our Philosophy
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-ink mb-5">
              Every Detail, Considered
            </h2>
            <div className="grid grid-cols-3 gap-6 border-t border-ink/10 pt-6">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <span className="font-display text-2xl text-ink block mb-1">{value}</span>
                  <span className="text-taupe text-xs uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
