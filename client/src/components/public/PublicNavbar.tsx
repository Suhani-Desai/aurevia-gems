import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/materials', label: 'Materials' },
  { to: '/contact', label: 'Contact' },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const lightOnDark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const text = lightOnDark ? 'text-[var(--pearl)]' : 'text-[var(--ink)]';
  const muted = lightOnDark
    ? 'text-[rgba(242,244,242,0.72)]'
    : 'text-[var(--muted)]';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-400 ${
        scrolled
          ? 'border-b border-[var(--border)]/80 bg-[rgba(242,244,242,0.94)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-all duration-400 md:px-10 ${
          scrolled ? 'h-[3.5rem]' : 'h-[4.25rem]'
        }`}
      >
        <Link
          to="/"
          className={`font-display text-xl tracking-[-0.02em] md:text-[1.65rem] ${text}`}
          onClick={() => setOpen(false)}
        >
          Aurevia Gems
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-2xl px-1.5 py-1 md:flex ${
            lightOnDark
              ? 'bg-white/10 backdrop-blur-sm'
              : scrolled
                ? 'bg-[var(--pearl-deep)]/70'
                : 'bg-[var(--pearl-deep)]/55'
          }`}
        >
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition ${
                  isActive
                    ? lightOnDark
                      ? 'bg-[var(--pearl)] text-[var(--onyx)]'
                      : 'bg-[var(--emerald)] text-[var(--pearl)]'
                    : `${muted} hover:text-[inherit]`
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className={`btn-enquiry ${lightOnDark ? 'btn-enquiry-light' : ''}`}
          >
            Request an Enquiry
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          type="button"
          className={`text-[11px] tracking-[0.2em] uppercase md:hidden ${text}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[55] flex flex-col bg-[var(--emerald)] px-6 py-7 text-[var(--pearl)] md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">Aurevia Gems</span>
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.18em]"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="mt-14 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-3xl"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-enquiry mt-10 w-fit"
          >
            Request an Enquiry
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
