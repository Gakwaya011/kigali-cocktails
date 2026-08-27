import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { PageState } from '../App';

interface PackagesProps {
  onNavigate: (page: PageState) => void;
}

const packages = [
  {
    title: 'Silver Package',
    price: '5,000',
    desc: 'A relaxed mocktail bar for your event, served in elegant glassware.',
    features: ['Mocktails', 'Glass setup', 'Professional service'],
    featured: false,
  },
  {
    title: 'Golden Package',
    price: '7,000',
    desc: 'Mocktails and cocktails together, with a signature ring-sip and champagne wall.',
    features: ['Mocktails + cocktails', 'Ring sip setup', 'Champagne wall'],
    featured: true,
  },
  {
    title: 'Premium Package',
    price: '9,000',
    desc: 'Full creative control — build your own cocktail or mocktail menu, any setup style.',
    features: ['Choose your own cocktail or mocktail', 'All setup styles included', 'Modify your own setup'],
    featured: false,
  },
];

export default function PackagesSection({ onNavigate }: PackagesProps) {
  return (
    <section className="py-16 sm:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-sapphire text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Packages
          </p>
          <h2 className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-5xl sm:text-6xl md:text-7xl text-ink mb-5">
            Packages.
          </h2>
          <p className="text-taupe font-light mb-5">
            Tailored mobile bar experiences for any occasion.
          </p>
          <span className="inline-block bg-sapphire/10 text-sapphire text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full">
            Booking 200+ guests? Setup is free.
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all ${
                pkg.featured
                  ? 'bg-ink text-white ring-2 ring-sapphire'
                  : 'bg-cream border border-ink/10 hover:border-sapphire/50'
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3.5 left-8 bg-sapphire text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Most Booked
                </span>
              )}
              <div>
                <h3
                  className={`text-2xl font-display font-medium mb-2 ${
                    pkg.featured ? 'text-white' : 'text-ink'
                  }`}
                >
                  {pkg.title}
                </h3>
                <p
                  className={`font-mono text-sm mb-4 ${
                    pkg.featured ? 'text-sapphire-light' : 'text-sapphire'
                  }`}
                >
                  {pkg.price} RWF <span className="opacity-70">/ guest</span>
                </p>
                <p className={`font-light mb-6 ${pkg.featured ? 'text-white/70' : 'text-taupe'}`}>
                  {pkg.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      className={`flex items-start gap-2 text-sm ${
                        pkg.featured ? 'text-white/80' : 'text-taupe'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          pkg.featured ? 'text-sapphire-light' : 'text-sapphire'
                        }`}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  pkg.featured
                    ? 'bg-sapphire hover:bg-sapphire-light text-white'
                    : 'border border-sapphire text-sapphire hover:bg-sapphire hover:text-white'
                }`}
              >
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
