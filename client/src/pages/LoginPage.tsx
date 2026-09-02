import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MediaImage } from '../components/MediaImage';
import { useAuth } from '../hooks/useAuth';
import { ApiRequestError } from '../services/api';
import { siteImages } from '../utils/productVisual';

export function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@nextera.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
    '/dashboard';

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function validate() {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (!password) next.password = 'Password is required';
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from.startsWith('/login') ? '/dashboard' : from, {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to sign in. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    'mt-2 w-full border-0 border-b border-[var(--border)] bg-transparent py-3 text-sm outline-none focus:border-[var(--forest)]';

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden min-h-screen lg:block">
        <MediaImage
          src={siteImages.login}
          alt="Jewellery inventory visual"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(15,40,33,0.45)]" />
        <div className="absolute bottom-10 left-10 right-10 text-[var(--ivory)]">
          <p className="text-[11px] tracking-[0.28em]">AUREVIA GEMS</p>
          <p className="font-display mt-4 text-4xl">
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[var(--ivory)] px-6 py-12">
        <div className="w-full max-w-md">
          <p className="text-[11px] tracking-[0.28em] text-[var(--charcoal)]">
            AUREVIA GEMS
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--champagne)]">
            Inventory Suite
          </p>
          <h1 className="font-display mt-6 text-4xl text-[var(--charcoal)] md:text-5xl">
            Manage every stone with precision.
          </h1>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                autoComplete="username"
              />
              {fieldErrors.email ? (
                <span className="mt-2 block text-sm text-[var(--danger)]">
                  {fieldErrors.email}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Password
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={fieldClass}
                autoComplete="current-password"
              />
              {fieldErrors.password ? (
                <span className="mt-2 block text-sm text-[var(--danger)]">
                  {fieldErrors.password}
                </span>
              ) : null}
              <button
                type="button"
                className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--forest)]"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide password' : 'Show password'}
              </button>
            </label>

            {error ? (
              <p className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--danger)]">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
