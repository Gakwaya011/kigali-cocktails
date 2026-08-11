import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { PageState } from '../App';
import mobileBarCart from '../assets/mobile-bar-cart.jpg';
import cocktailTower from '../assets/cocktail-tower.jpg';
import pouringDrinks from '../assets/pouring-drinks.jpg';
import cateringStation from '../assets/catering-station.jpg';

interface ServicesSectionProps {
  onNavigate: (page: PageState) => void;
}

const services = [
  {
    title: 'Mobile Bar Setup',
    image: mobileBarCart,
    items: ['Portable Bar Design', 'Setup & Breakdown', 'Venue Styling'],
  },
  {
    title: 'Custom Cocktail Menus',
    image: cocktailTower,
    items: ['Signature Recipes', 'Menu Curation', 'Tasting Sessions'],
  },
  {
    title: 'Professional Mixologists',
    image: pouringDrinks,
    items: ['Certified Bartenders', 'Flair & Service', 'Guest Hospitality'],
  },
  {
    title: 'Full Event Staffing',
    image: cateringStation,
    items: ['Glassware & Garnish', 'Dedicated Waitstaff', 'Full Coordination'],
  },
];

export default function ServicesSection({ onNavigate }: ServicesSectionProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="bg-ink rounded-4xl sm:rounded-[2.5rem] px-6 sm:px-12 md:px-16 pt-12 sm:pt-16 pb-12 sm:pb-16"
        >
          <p className="text-sapphire-light text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            What We Do
          </p>
          <h2 className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-6xl sm:text-7xl md:text-8xl text-white mb-6">
            Services.
          </h2>
          <p className="text-white/60 font-light max-w-md mb-12 sm:mb-16">
            Mixology, styling, and service crafted for events that people
            actually remember.
          </p>

          <div
            className="flex items-center gap-2 sm:gap-4 h-95 sm:h-120"
            onMouseLeave={() => setActive(null)}
          >
            {services.map((service, idx) => {
              const isActive = active === idx;
              return (
                <motion.div
                  key={service.title}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                  animate={{ height: isActive ? '100%' : '22%' }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex-1 rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-ink/40 transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-75'
                    }`}
                  />

                  <h3 className="absolute top-4 left-4 right-4 text-white font-semibold text-sm sm:text-base uppercase tracking-wide">
                    {service.title}
                  </h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="absolute bottom-4 left-4 right-4 space-y-1"
                      >
                        {service.items.map((item) => (
                          <li key={item} className="text-white/80 text-xs sm:text-sm font-light">
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12 text-center sm:text-left">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-white font-medium border-b border-sapphire-light hover:text-sapphire-light hover:border-white transition-colors pb-1"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
