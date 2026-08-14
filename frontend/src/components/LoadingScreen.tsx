import { motion } from 'framer-motion';
import logo from '../assets/kigali_luxury_cocktails_logo_white.png';

export default function LoadingScreen() {
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.7 }} className="fixed inset-0 z-60">
      <div className="absolute inset-0 flex">
        <motion.div
          initial={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          className="w-1/2 h-full bg-ink"
        />
        <motion.div
          initial={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          className="w-1/2 h-full bg-ink"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <motion.img
          src={logo}
          alt="Kigali Luxury Cocktails"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-48 sm:w-56 h-auto"
        />
        <div className="w-40 h-px bg-white/15 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeInOut' }}
            className="h-full bg-sapphire-light"
          />
        </div>
      </div>
    </motion.div>
  );
}
