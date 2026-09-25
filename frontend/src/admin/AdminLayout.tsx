import { useState, type ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Menu, MessageSquare, Package, Martini, Image, LogOut, X } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

const links = [
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/packages', label: 'Packages', icon: Package },
  { to: '/admin/menu', label: 'Menu', icon: Martini },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const sidebarContent = (
    <>
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="font-display text-lg tracking-wide">Kigali Luxury</p>
          <p className="text-white/50 text-xs uppercase tracking-widest">Admin</p>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="lg:hidden p-1.5 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-3 pt-4">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Website
        </Link>
      </div>
      <div className="mx-6 my-2 border-t border-white/10" />

      <nav className="flex-1 px-3 py-2 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-sapphire text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-white/50 text-xs mb-3 truncate">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-cream flex">
      <aside className="hidden lg:flex w-64 shrink-0 bg-ink text-white flex-col">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-ink/60 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-ink text-white flex flex-col z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-ink text-white shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-1.5 text-white/80 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="text-center">
            <p className="font-display text-sm tracking-wide leading-tight">Kigali Luxury</p>
            <p className="text-white/50 text-[10px] uppercase tracking-widest leading-tight">Admin</p>
          </Link>
          <div className="w-8" />
        </div>

        <main className="flex-1 min-w-0 px-4 sm:px-8 py-6 sm:py-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
