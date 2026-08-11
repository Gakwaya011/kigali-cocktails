import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { PageState } from '../App';
import hero1 from '../assets/hero1.jpg';
import martiniRow from '../assets/martini-row.jpg';
import heroVideo from '../assets/IMG_4480 resized.mp4';

interface ShowcaseProps {
  onNavigate: (page: PageState) => void;
}

export default function ShowcaseSection({ onNavigate }: ShowcaseProps) {
  return (
    <section className="bg-white pt-20 pb-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-3">
            Behind the Bar
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-ink max-w-xl">
            Every pour is a performance.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 h-[46vh] min-h-80 sm:h-[52vh] mb-10">
          {[
            { type: 'img', src: hero1, alt: 'Signature cocktail service', span: 'col-span-1 sm:col-span-2' },
            { type: 'video', src: heroVideo, alt: 'Mixologist at work', span: 'col-span-1 sm:col-span-2' },
            { type: 'img', src: martiniRow, alt: 'Signature cocktails ready to serve', span: 'hidden sm:block sm:col-span-1' },
          ].map((media, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className={`${media.span} h-full overflow-hidden rounded-xl`}
            >
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={media.alt}
                  className="w-full h-full object-cover"
                />
              ) : idx === 2 ? (
                <motion.img
                  src={media.src}
                  alt={media.alt}
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={media.src} alt={media.alt} className="w-full h-full object-cover" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="text-taupe font-light leading-relaxed max-w-lg">
            From the first pour to the last garnish, our mixologists treat every event
            like it's the only one that matters &mdash; because to your guests, it is.
          </p>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 self-start md:self-end border border-sapphire text-sapphire hover:bg-sapphire hover:text-white font-medium px-7 py-3.5 rounded-md transition-colors"
          >
            See What We Offer <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
