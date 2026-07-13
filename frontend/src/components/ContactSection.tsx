import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import type { PageState } from '../App';

interface ContactSectionProps {
  onNavigate: (page: PageState) => void;
}

export default function ContactSection({ onNavigate }: ContactSectionProps) {
  const waNumber = '250783845473';
  const waMessage = encodeURIComponent(
    'Hello Kigali Luxury Cocktails! I would like to know more about your services.'
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <section className="py-24 px-6 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center bg-white border border-ink/10 rounded-3xl shadow-sm p-12"
      >
        <p className="text-gold text-xs font-medium uppercase tracking-[0.3em] mb-3">
          Get In Touch
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-light text-ink mb-4">
          Let's Plan Your Event
        </h2>
        <p className="text-taupe font-light leading-relaxed mb-8">
          Have a date in mind? Reach out and our team will help you design the
          perfect cocktail experience for your celebration.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-taupe">
          <a href="tel:+250783845473" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Phone className="w-4 h-4 text-gold" /> 0783 845 473
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" /> Kigali, Rwanda
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-7 py-3 rounded-full transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-white px-7 py-3 rounded-full font-medium transition-colors"
          >
            Contact Page <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
