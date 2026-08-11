import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-ink/10 rounded-3xl p-8 sm:p-10"
      >
        <p className="text-sapphire text-xs font-semibold uppercase tracking-[0.3em] mb-3">
          Admin
        </p>
        <h1 className="font-display text-3xl font-medium text-ink mb-2">Welcome Back.</h1>
        <p className="text-taupe font-light mb-8">Sign in to manage bookings and menu.</p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-sm text-ink mb-1.5">Email</label>
            <input
              type="email"
              required
              placeholder="you@kigaliluxurycocktails.com"
              className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:border-sapphire transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-ink mb-1.5">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-cream border border-ink/10 rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:border-sapphire transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sapphire hover:bg-sapphire-light text-white font-medium py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
