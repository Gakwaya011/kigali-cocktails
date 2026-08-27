import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';

const waNumber = '250783845473';

export default function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hello Kigali Luxury Cocktails! My name is ${firstName} ${lastName}.`,
      mobile && `Phone: ${mobile}`,
      email && `Email: ${email}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waLink, '_blank', 'noreferrer');
  };

  const infoRows = [
    {
      icon: MapPin,
      label: '28 KG 11 Ave, Kigali, Rwanda',
      href: 'https://www.google.com/maps?q=24V8%2BC93%2C%2028%20KG%2011%20Ave%2C%20Kigali%2C%20Rwanda',
    },
    { icon: Phone, label: '0783 845 473', href: 'tel:+250783845473' },
    { icon: MessageCircle, label: 'Chat on WhatsApp', href: `https://wa.me/${waNumber}` },
  ];

  const fieldClass =
    'w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-sapphire-light transition-colors';

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
            Get In Touch
          </p>
          <h2 className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-5xl sm:text-6xl md:text-7xl text-white mb-6">
            Let's Talk.
          </h2>
          <p className="text-white/60 font-light max-w-md mb-12 sm:mb-16">
            Send us a few details and we'll reply on WhatsApp to plan your event.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className={fieldClass}
                />
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className={fieldClass}
                />
              </div>

              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className={fieldClass}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={fieldClass}
              />

              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className={`${fieldClass} resize-none`}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light text-white font-semibold uppercase tracking-wide text-sm px-8 py-3.5 rounded-lg transition-colors shadow-lg"
              >
                Submit <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <div className="flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 h-56 sm:h-64 grayscale-[0.3] contrast-125">
                <iframe
                  title="Kigali Luxury Cocktails location"
                  src="https://www.google.com/maps?q=24V8%2BC93%2C%2028%20KG%2011%20Ave%2C%20Kigali%2C%20Rwanda&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/15 divide-y divide-white/10">
                {infoRows.map(({ icon: Icon, label, href }) => {
                  const content = (
                    <div className="flex items-center gap-4 p-5">
                      <div className="w-11 h-11 rounded-full bg-sapphire/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-sapphire-light" strokeWidth={1.5} />
                      </div>
                      <span className="text-white font-medium">{label}</span>
                    </div>
                  );
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="block hover:bg-white/5 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
