import { motion } from 'framer-motion';
import type { PageState } from '../App';
import CtaBandSection from '../components/CtaBandSection';
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import heroPortrait from '../assets/hero replaced the potrait 1.jpg';
import hero3 from '../assets/second hero replacer.jpg';
import detailShot from '../assets/hero3 ring bell.jpg';
import cocktailSetup from '../assets/cocktail set up.jpeg';
import anotherSetup from '../assets/another set up.jpeg';

interface GalleryPageProps {
  onNavigate: (page: PageState) => void;
}

const photos = [
  { src: cocktailSetup, span: 'md:col-span-2 md:row-span-2' },
  { src: heroPortrait, span: 'md:row-span-2' },
  { src: hero1, span: '' },
  { src: detailShot, span: '' },
  { src: anotherSetup, span: 'md:col-span-2' },
  { src: hero2, span: '' },
  { src: hero3, span: '' },
];

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  return (
    <div>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-4">
              Gallery
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-ink mb-5 text-balance">
              The bar, mid-<span className="italic text-sapphire">pour</span>.
            </h1>
            <p className="text-taupe font-light text-lg max-w-2xl mx-auto">
              Setups, garnishes, and the small details from recent events across Kigali.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 auto-rows-[10rem] sm:auto-rows-[12rem] gap-4 sm:gap-5">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className={`${photo.span} rounded-2xl overflow-hidden`}
            >
              <img
                src={photo.src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-taupe font-light text-sm mt-10">
          More from recent events coming soon.
        </p>
      </section>

      <CtaBandSection onNavigate={onNavigate} />
    </div>
  );
}
