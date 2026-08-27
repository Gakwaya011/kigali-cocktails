import { motion } from 'framer-motion';
import { Martini, GlassWater, Info } from 'lucide-react';
import type { PageState } from '../App';
import CtaBandSection from '../components/CtaBandSection';

interface MenuPageProps {
  onNavigate: (page: PageState) => void;
}

const alcoholic = [
  { name: 'Idios Amigo', ingredients: 'Blue curaçao, gin, rum, tequila, lemon, triple sec' },
  { name: 'Long Island', ingredients: 'Gin, rum, tequila, vodka, simple syrup, lemon' },
  { name: 'Mojito (All Flavours)', ingredients: 'Mint, simple syrup, rum, lemon, ice' },
  { name: 'Green Paradise', ingredients: 'Blue curaçao, mango, vodka, gin, rum, lemon' },
  { name: 'Trouble Maker', ingredients: 'Coke, dark rum, lemon, simple syrup' },
  { name: 'Sex on the Beach', ingredients: 'Orange juice, vodka, peach schnapps, rum, cranberry juice' },
];

const nonAlcoholic = [
  { name: 'Blessed Palm', ingredients: 'Simple syrup, lemon juice, watermelon juice, sparkling water, mint' },
  { name: 'Honey Orangeade', ingredients: 'Honey, orange juice, lemon juice, sprite, ice' },
  { name: 'Mango Breeze', ingredients: 'Mango, strawberry juice, sparkling water, lemon, simple syrup' },
  { name: 'Virgin Mojito', ingredients: 'Mint, sparkling water, choice of flavor, lemon, simple syrup' },
  { name: 'Strawberry Breeze', ingredients: 'Strawberry juice, lemon, simple syrup, pineapple juice' },
];

function MenuList({ drinks }: { drinks: { name: string; ingredients: string }[] }) {
  return (
    <div className="border-t border-ink/10">
      {drinks.map((drink, idx) => (
        <motion.div
          key={drink.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 border-b border-ink/10"
        >
          <h3 className="font-display text-lg text-ink shrink-0 sm:w-64">{drink.name}</h3>
          <p className="text-taupe font-light text-sm">{drink.ingredients}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function MenuPage({ onNavigate }: MenuPageProps) {
  return (
    <div>
      <section className="pt-32 sm:pt-40 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sapphire text-xs font-medium uppercase tracking-[0.3em] mb-4">
              The Menu
            </p>
            <h1 className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-5xl sm:text-6xl md:text-7xl text-ink mb-6">
              Crafted to Order.
            </h1>
            <p className="text-taupe font-light text-lg max-w-2xl mx-auto">
              Signature cocktails and mocktails, mixed fresh at your event. Every drink
              comes standard with ice and lemon.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <Martini className="w-6 h-6 text-sapphire" strokeWidth={1.5} />
            <h2 className="font-display text-2xl md:text-3xl font-medium text-ink">
              Alcoholic Cocktails
            </h2>
          </motion.div>
          <div className="mb-16 sm:mb-20">
            <MenuList drinks={alcoholic} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <GlassWater className="w-6 h-6 text-sapphire" strokeWidth={1.5} />
            <h2 className="font-display text-2xl md:text-3xl font-medium text-ink">
              Non-Alcoholic Cocktails
            </h2>
          </motion.div>
          <div className="mb-12">
            <MenuList drinks={nonAlcoholic} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-3 bg-cream rounded-2xl p-6"
          >
            <Info className="w-5 h-5 text-sapphire shrink-0 mt-0.5" />
            <p className="text-taupe font-light text-sm leading-relaxed">
              This is our house menu. Want something different? Our{' '}
              <button
                onClick={() => onNavigate('services')}
                className="text-sapphire font-medium underline underline-offset-2"
              >
                Premium Package
              </button>{' '}
              lets you build a custom cocktail or mocktail menu from scratch.
            </p>
          </motion.div>
        </div>
      </section>

      <CtaBandSection onNavigate={onNavigate} />
    </div>
  );
}
