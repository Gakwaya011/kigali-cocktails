import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AccountPage from './pages/AccountPage';
import AdminApp from './admin/AdminApp';
import { AuthProvider } from './auth/AuthProvider';

export type PageState =
  | 'home'
  | 'about'
  | 'services'
  | 'menu'
  | 'booking'
  | 'gallery'
  | 'contact'
  | 'login'
  | 'signup'
  | 'account';

const routes: {
  path: string;
  page: PageState;
  Component: React.ComponentType<{ onNavigate: (page: PageState) => void }>;
}[] = [
  { path: '/', page: 'home', Component: HomePage },
  { path: '/about', page: 'about', Component: AboutPage },
  { path: '/services', page: 'services', Component: ServicesPage },
  { path: '/menu', page: 'menu', Component: MenuPage },
  { path: '/booking', page: 'booking', Component: BookingPage },
  { path: '/gallery', page: 'gallery', Component: GalleryPage },
  { path: '/contact', page: 'contact', Component: ContactPage },
  { path: '/login', page: 'login', Component: LoginPage },
  { path: '/signup', page: 'signup', Component: SignUpPage },
  { path: '/account', page: 'account', Component: AccountPage },
];

const pathFor = (page: PageState) => routes.find((r) => r.page === page)?.path ?? '/';

function PublicAppShell() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const currentPage = routes.find((r) => r.path === location.pathname)?.page ?? 'home';

  const navigate = (page: PageState) => {
    routerNavigate(pathFor(page));
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 1600);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-ink selection:text-white">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="w-full">
        <Routes>
          {routes
            .filter(({ page }) => page !== 'login' && page !== 'signup')
            .map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component onNavigate={navigate} />} />
            ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

function StandaloneAuthPage({
  Component,
}: {
  Component: React.ComponentType<{ onNavigate: (page: PageState) => void }>;
}) {
  const routerNavigate = useNavigate();

  const navigate = (page: PageState) => {
    routerNavigate(pathFor(page));
    window.scrollTo({ top: 0 });
  };

  return <Component onNavigate={navigate} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/login" element={<StandaloneAuthPage Component={LoginPage} />} />
          <Route path="/signup" element={<StandaloneAuthPage Component={SignUpPage} />} />
          <Route path="/*" element={<PublicAppShell />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
