import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { PageState } from '../App';

interface PackagesProps {
  onNavigate: (page: PageState) => void;
}

const packages = [
  {
    title: 'The Wedding Reception',
    price: 'Custom Quote',
    desc: 'A full premium open bar setup for your special day.',
    features: [
      '2 Professional Mixologists',
      'Custom Bride & Groom Signature Drinks',
      'Elegant White Portable Bar',
      'Premium Glassware & Garnishes',
    ],
    featured: true,
  },
  {
    title: 'Bridal Shower / VIP Party',
    price: 'Starting at 150k RWF',
    desc: 'Intimate, aesthetic setups perfect for photos and celebrations.',
    features: [
      '1 Mixologist',
      "Custom 'Cheers' Cocktail Wall",
      '3 Pre-selected Menu Options',
      '4 Hours of Service',
    ],
    featured: false,
  },
  {
    title: 'Corporate Launch',
    price: 'Custom Quote',
    desc: 'High-volume, branded beverage service for professional events.',
    features: [
      'Brand-colored Cocktails',
      'Rapid Service Setup',
      'Non-alcoholic Mocktail Options',
      'Professional Uniformed Staff',
    ],
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
          <p className="text-taupe font-light">
            Tailored mobile bar experiences for any occasion.
          </p>
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
                  {pkg.price}
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
