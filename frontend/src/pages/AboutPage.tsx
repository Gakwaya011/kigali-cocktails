import { motion } from 'framer-motion';
import { GlassWater, Sparkles, MapPin } from 'lucide-react';
import type { PageState } from '../App';
import CtaBandSection from '../components/CtaBandSection';
import cocktailSetup from '../assets/cocktail set up.jpeg';
import anotherSetup from '../assets/another set up.jpeg';
import heroPortrait from '../assets/hero replaced the potrait 1.jpg';

interface AboutPageProps {
  onNavigate: (page: PageState) => void;
}

const stats = [
  { icon: GlassWater, value: '30+', label: 'Signature Cocktails' },
  { icon: Sparkles, value: '150+', label: 'Events Served' },
  { icon: MapPin, value: 'Kigali', label: 'Based In' },
];

const values = [
  {
    num: '01',
    title: 'Craftsmanship',
    desc: 'Every drink is built with care and precision, not poured on autopilot.',
  },
  {
    num: '02',
    title: 'Hospitality',
    desc: 'Our mixologists bring warmth and flair to every guest, every pour.',
  },
  {
    num: '03',
    title: 'Reliability',
    desc: 'We show up early, set up fast, and never make you worry on the day.',
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden text-white">
        <motion.img
          src={cocktailSetup}
          alt="Kigali Luxury Cocktails bar setup"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 h-full flex flex-col justify-end max-w-3xl px-6 md:px-16 pb-14 sm:pb-20"
        >
          <p className="text-white/70 text-xs font-medium uppercase tracking-[0.3em] mb-4">
            About Us
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-[1.1] text-balance">
            Started with one idea: your bar should be as{' '}
            <span className="italic text-sapphire-light">unforgettable</span> as your
            event.
          </h1>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            src={heroPortrait}
            alt="Kigali Luxury Cocktails mixologist at work"
            className="w-full h-80 md:h-104 object-cover rounded-2xl order-2 md:order-1"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
              How We Started
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-ink mb-5">
              From private dinners to the name Kigali books for its biggest nights.
            </h2>
            <p className="text-taupe font-light leading-relaxed">
              What began as a small team of mixologists serving intimate private dinners
              has grown into Kigali's go-to name for mobile bar experiences &mdash;
              weddings, corporate launches, birthdays, and everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
              Where We're Going
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-ink mb-5">
              We don't do generic.
            </h2>
            <p className="text-taupe font-light leading-relaxed">
              Every menu, every setup, every pour is built around the event in front of
              us, not a fixed script. As we grow, that stays non-negotiable.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            src={anotherSetup}
            alt="Kigali Luxury Cocktails event setup"
            className="w-full h-80 md:h-104 object-cover rounded-2xl"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-white border-t border-ink/5">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mb-16 sm:mb-20">
          {stats.map(({ icon: Icon, value, label }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <Icon className="w-6 h-6 text-sapphire" strokeWidth={1.5} />
              <span className="font-display text-3xl text-ink">{value}</span>
              <span className="text-taupe text-xs uppercase tracking-wider">{label}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-10 text-center">
          What We Stand For
        </p>
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center sm:text-left"
            >
              <span className="font-display text-5xl text-sapphire/30 block mb-2">
                {v.num}
              </span>
              <h3 className="font-display text-xl text-ink mb-2">{v.title}</h3>
              <p className="text-taupe font-light text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBandSection onNavigate={onNavigate} />
    </div>
  );
}
