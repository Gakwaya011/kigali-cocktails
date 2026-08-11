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
  },
];

export default function PackagesSection({ onNavigate }: PackagesProps) {
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
          <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
            Packages
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
            Our Service Packages
          </h2>
          <p className="text-taupe mt-3 font-light">
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
              className="group bg-cream border border-ink/10 hover:border-sapphire/50 rounded-2xl p-8 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-display font-medium text-ink mb-2">
                  {pkg.title}
                </h3>
                <p className="text-sapphire font-mono text-sm mb-4">{pkg.price}</p>
                <p className="text-taupe font-light mb-6">{pkg.desc}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-taupe">
                      <CheckCircle2 className="w-4 h-4 text-sapphire mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onNavigate('booking')}
                className="w-full border border-sapphire text-sapphire hover:bg-sapphire hover:text-white py-3 rounded-xl font-medium transition-colors"
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
