import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { PageState } from '../App';
import PackagesSection from '../components/PackagesSection';
import CtaBandSection from '../components/CtaBandSection';
import anotherSetup from '../assets/another set up.jpeg';
import hero3 from '../assets/second hero replacer.jpg';
import drinkFlightWall from '../assets/drink-flight-wall.jpg';
import heroPortrait from '../assets/hero replaced the potrait 1.jpg';
import hero1 from '../assets/hero1.jpg';

interface ServicesPageProps {
  onNavigate: (page: PageState) => void;
}

const services = [
  {
    title: 'Mobile Bar Setup',
    image: hero3,
    desc: 'A fully equipped, elegantly dressed portable bar delivered and set up at your venue.',
    items: ['Portable Bar Design', 'Setup & Breakdown', 'Venue Styling'],
  },
  {
    title: 'Custom Cocktail Menus',
    image: drinkFlightWall,
    desc: 'Signature drinks designed around your event theme, colors, and taste preferences.',
    items: ['Signature Recipes', 'Menu Curation', 'Tasting Sessions'],
  },
  {
    title: 'Professional Mixologists',
    image: heroPortrait,
    desc: 'Experienced bartenders who bring skill, flair, and warm hospitality to every pour.',
    items: ['Certified Bartenders', 'Flair & Service', 'Guest Hospitality'],
  },
  {
    title: 'Full Event Staffing',
    image: hero1,
    desc: 'From glassware to garnishes, our team handles every detail so you do not have to.',
    items: ['Glassware & Garnish', 'Dedicated Waitstaff', 'Full Coordination'],
  },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div>
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-4">
              What We Offer
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-ink leading-[1.1] text-balance">
              Full bar service, <span className="italic text-sapphire">handled end to end</span>.
            </h1>
            <p className="text-taupe font-light text-lg mt-5 max-w-md">
              From the first pour to the last garnish &mdash; setup, menu, staff, and
              breakdown, all built around your event.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            src={anotherSetup}
            alt="Kigali Luxury Cocktails event setup"
            className="w-full h-72 md:h-96 object-cover rounded-2xl"
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              <div
                className={`w-full h-72 md:h-96 rounded-2xl overflow-hidden ${
                  idx % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <span className="font-display text-7xl sm:text-8xl text-sapphire/15 block leading-none mb-2">
                  0{idx + 1}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-medium text-ink mb-3">
                  {service.title}
                </h2>
                <p className="text-taupe font-light leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink">
                      <Check className="w-4 h-4 text-sapphire shrink-0" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <PackagesSection onNavigate={onNavigate} />
      <CtaBandSection onNavigate={onNavigate} />
    </div>
  );
}
