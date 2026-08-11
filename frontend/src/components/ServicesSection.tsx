import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hero1 from '../assets/hero1.jpg';
import heroPortrait from '../assets/hero replaced the potrait 1.jpg';
import hero3 from '../assets/second hero replacer.jpg';
import detailShot from '../assets/hero3 ring bell.jpg';

const services = [
  {
    title: 'Mobile Bar Setup',
    image: hero3,
    items: ['Portable Bar Design', 'Setup & Breakdown', 'Venue Styling'],
  },
  {
    title: 'Custom Cocktail Menus',
    image: detailShot,
    items: ['Signature Recipes', 'Menu Curation', 'Tasting Sessions'],
  },
  {
    title: 'Professional Mixologists',
    image: heroPortrait,
    items: ['Certified Bartenders', 'Flair & Service', 'Guest Hospitality'],
  },
  {
    title: 'Full Event Staffing',
    image: hero1,
    items: ['Glassware & Garnish', 'Dedicated Waitstaff', 'Full Coordination'],
  },
];

export default function ServicesSection() {
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
            className="flex items-end gap-2 sm:gap-4 h-95 sm:h-120"
            onMouseLeave={() => setActive(null)}
          >
            {services.map((service, idx) => {
              const isActive = active === idx;
              return (
                <motion.div
                  key={service.title}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => setActive(isActive ? null : idx)}
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
                      isActive ? 'opacity-100' : 'opacity-60'
                    }`}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="absolute top-4 left-4 right-4 text-white font-semibold text-sm sm:text-base uppercase tracking-wide"
                      >
                        {service.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>

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
        </motion.div>
      </div>
    </section>
  );
}
