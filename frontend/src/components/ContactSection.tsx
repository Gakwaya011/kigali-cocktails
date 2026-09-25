import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { api, ApiError } from '../lib/api';

const waNumber = '250783845473';

interface ContactSectionProps {
  source: 'home' | 'contact';
}

export default function ContactSection({ source }: ContactSectionProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const resetStatus = () => {
    if (status !== 'idle') setStatus('idle');
  };

  const buildWaLink = () => {
    const lines = [
      `Hello Kigali Luxury Cocktails! My name is ${firstName} ${lastName}.`,
      mobile && `Phone: ${mobile}`,
      email && `Email: ${email}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.post('/api/contact', {
        firstName,
        lastName,
        phone: mobile || undefined,
        email: email || undefined,
        message,
        source,
      });
      setStatus('sent');
      setFirstName('');
      setLastName('');
      setMobile('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again, or message us on WhatsApp."
      );
    }
  };

  const handleWhatsApp = () => {
    if (!firstName || !lastName) {
      setStatus('error');
      setErrorMsg('Please enter your first and last name first.');
      return;
    }
    window.open(buildWaLink(), '_blank', 'noreferrer');
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
            Send us a few details and our team will get back to you shortly.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    resetStatus();
                  }}
                  placeholder="First Name"
                  className={fieldClass}
                />
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    resetStatus();
                  }}
                  placeholder="Last Name"
                  className={fieldClass}
                />
              </div>

              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  resetStatus();
                }}
                placeholder="Mobile Number"
                className={fieldClass}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  resetStatus();
                }}
                placeholder="Email Address"
                className={fieldClass}
              />

              <textarea
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  resetStatus();
                }}
                placeholder="Your Message"
                className={`${fieldClass} resize-none`}
              />

              {status === 'sent' && (
                <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-400/30 rounded-lg px-4 py-3">
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-emerald-300">
                    Message sent! We'll get back to you soon.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-start gap-2 bg-red-500/10 border border-red-400/30 rounded-lg px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-red-300">{errorMsg}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-sapphire hover:bg-sapphire-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold uppercase tracking-wide text-sm px-8 py-3.5 rounded-lg transition-colors shadow-lg"
                >
                  {status === 'sending' ? 'Sending…' : 'Submit'} <ArrowRight className="w-4 h-4" />
                </motion.button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  Or send via WhatsApp instead
                </button>
              </div>
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
