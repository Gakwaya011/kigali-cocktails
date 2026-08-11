import { motion } from 'framer-motion';
import type { PageState } from '../App';
import hero1 from '../assets/hero1.jpg';
import heroPortrait from '../assets/hero replaced the potrait 1.jpg';
import hero3 from '../assets/second hero replacer.jpg';
import ringForCheers from '../assets/ring-for-cheers.jpg';

interface GalleryStripProps {
  onNavigate: (page: PageState) => void;
}

const photos = [hero1, heroPortrait, hero3, ringForCheers];

export default function GalleryStripSection({ onNavigate }: GalleryStripProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          onClick={() => onNavigate('gallery')}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full text-left"
        >
          {photos.map((photo, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <img
                src={photo}
                alt="Kigali Luxury Cocktails gallery preview"
                className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </motion.button>
      </div>
    </section>
  );
}
