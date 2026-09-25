import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import logoWordmark from '../assets/logo-wordmark-dark.png';
import authImage from '../assets/martini-row.jpg';

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  onLogoClick: () => void;
}

export default function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  onLogoClick,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sapphire/10 flex items-center justify-center px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-ink/10 overflow-hidden grid lg:grid-cols-2"
      >
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <button onClick={onLogoClick} className="mb-10 w-fit">
            <img src={logoWordmark} alt="Kigali Luxury Cocktails" className="h-9 w-auto" />
          </button>

          <p className="text-sapphire text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink mb-2">{title}</h1>
          <p className="text-taupe font-light mb-8">{subtitle}</p>

          {children}
          {footer}
        </div>

        <div className="hidden lg:block relative">
          <img src={authImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5" />
          <div className="absolute inset-0 flex flex-col justify-end p-10">
            <p className="font-display text-2xl text-white font-medium leading-snug mb-2">
              Luxury cocktails, crafted for your moment.
            </p>
            <p className="text-white/70 text-sm font-light">
              Kigali's premier mobile cocktail bar for weddings, corporate events, and private
              celebrations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
