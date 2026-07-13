import { motion } from 'framer-motion';
import { Martini, Users, Sparkles, Truck } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Mobile Bar Setup',
    desc: 'A fully equipped, elegantly dressed portable bar delivered and set up at your venue.',
  },
  {
    icon: Martini,
    title: 'Custom Cocktail Menus',
    desc: 'Signature drinks designed around your event theme, colors, and taste preferences.',
  },
  {
    icon: Users,
    title: 'Professional Mixologists',
    desc: 'Experienced bartenders who bring skill, flair, and warm hospitality to every pour.',
  },
  {
    icon: Sparkles,
    title: 'Full Event Staffing',
    desc: 'From glassware to garnishes, our team handles every detail so you do not have to.',
  },
];

export default function ServicesSection() {
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
            What We Offer
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
            Our Services
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-ink mb-2">{title}</h3>
              <p className="text-taupe text-sm font-light leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
