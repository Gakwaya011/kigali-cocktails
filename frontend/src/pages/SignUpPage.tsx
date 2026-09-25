import { useState, type FormEvent } from 'react';
import { AlertCircle, Eye, EyeOff, Lock, Mail, User as UserIcon } from 'lucide-react';
import type { PageState } from '../App';
import { useAuth } from '../auth/useAuth';
import AuthLayout from '../components/AuthLayout';

interface SignUpPageProps {
  onNavigate: (page: PageState) => void;
}

export default function SignUpPage({ onNavigate }: SignUpPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const passwordsMismatched = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      await register(name, email, password);
      onNavigate('account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Join Us"
      title="Create an Account."
      subtitle="Sign up to keep track of your bookings with us."
      onLogoClick={() => onNavigate('home')}
      footer={
        <p className="text-taupe text-sm font-light text-center mt-6">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-sapphire font-medium underline underline-offset-2"
          >
            Log In
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm text-ink mb-1.5">Name</label>
          <div className="relative">
            <UserIcon
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe/50"
              strokeWidth={1.5}
            />
            <input
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-cream border border-ink/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:border-sapphire focus:ring-1 focus:ring-sapphire transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-ink mb-1.5">Email</label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe/50"
              strokeWidth={1.5}
            />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-cream border border-ink/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:border-sapphire focus:ring-1 focus:ring-sapphire transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-ink mb-1.5">Password</label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe/50"
              strokeWidth={1.5}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full bg-cream border border-ink/10 rounded-lg pl-10 pr-11 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:border-sapphire focus:ring-1 focus:ring-sapphire transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-taupe/50 hover:text-ink transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Eye className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm text-ink mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe/50"
              strokeWidth={1.5}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className={`w-full bg-cream border rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:ring-1 transition-colors ${
                passwordsMismatched
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
                  : 'border-ink/10 focus:border-sapphire focus:ring-sapphire'
              }`}
            />
          </div>
          {passwordsMismatched && (
            <p className="text-xs text-red-600 mt-1.5">Passwords do not match</p>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || passwordsMismatched}
          className="w-full bg-sapphire hover:bg-sapphire-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
        >
          {submitting ? 'Creating Account…' : 'Sign Up'}
        </button>
      </form>
    </AuthLayout>
  );
}
