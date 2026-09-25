import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { CalendarClock, LogOut, ShieldCheck } from 'lucide-react';
import type { PageState } from '../App';
import { useAuth } from '../auth/useAuth';

interface AccountPageProps {
  onNavigate: (page: PageState) => void;
}

export default function AccountPage({ onNavigate }: AccountPageProps) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-16 px-6 flex items-center justify-center">
        <p className="text-taupe font-light">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-cream pt-32 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <p className="text-sapphire text-xs font-semibold uppercase tracking-[0.3em] mb-3">
          My Account
        </p>
        <h1 className="font-display text-3xl font-medium text-ink mb-8">
          Hey, {user.name.split(' ')[0]}.
        </h1>

        <div className="bg-white border border-ink/10 rounded-2xl p-6 mb-6">
          <p className="text-taupe text-xs uppercase tracking-wide mb-1">Email</p>
          <p className="text-ink font-medium">{user.email}</p>
        </div>

        {user.role === 'ADMIN' && (
          <a
            href="/admin/messages"
            className="flex items-center gap-3 bg-ink text-white rounded-2xl p-6 mb-6 hover:bg-ink/90 transition-colors"
          >
            <ShieldCheck className="w-5 h-5 text-sapphire-light shrink-0" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Admin Dashboard</p>
              <p className="text-white/60 text-sm font-light">Manage messages, packages, menu, and gallery.</p>
            </div>
          </a>
        )}

        <div className="bg-white border border-ink/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CalendarClock className="w-5 h-5 text-sapphire" strokeWidth={1.5} />
            <p className="font-medium text-ink">Your Bookings</p>
          </div>
          <p className="text-taupe font-light text-sm leading-relaxed">
            You haven't made any bookings yet. Once you book an event with us, it'll show up
            here.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-taupe hover:text-ink text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Log Out
        </button>
      </motion.div>
    </div>
  );
}
