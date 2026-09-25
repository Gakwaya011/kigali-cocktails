import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection';
import hero2 from '../assets/hero2.jpg';

export default function ContactPage() {
  return (
    <div>
      <section className="relative h-[38vh] min-h-70 overflow-hidden text-white mt-20 sm:mt-24">
        <img
          src={hero2}
          alt="Kigali Luxury Cocktails event"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <p className="text-white/70 text-xs font-medium uppercase tracking-[0.3em] mb-3">
            Contact
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light">
            Trusted for 150+ events across Kigali.
          </h1>
        </motion.div>
      </section>

      <ContactSection source="contact" />
    </div>
  );
}
