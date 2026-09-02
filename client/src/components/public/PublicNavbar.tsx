import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/materials', label: 'Materials' },
  { to: '/contact', label: 'Contact' },
];

/** Pages whose first viewport is a dark emerald/onyx band under the fixed nav. */
function pageHasDarkHero(pathname: string): boolean {
  if (pathname === '/') return true;
  return ['/collections', '/about', '/materials', '/contact'].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lightOnDark = pageHasDarkHero(location.pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-400 ${
        scrolled
          ? 'border-b border-[var(--border)]/80 bg-[rgba(242,244,242,0.96)] backdrop-blur-md'
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
          className="font-display text-xl tracking-[-0.02em] md:text-[1.65rem]"
          style={{ color: lightOnDark ? '#ffffff' : 'var(--ink)' }}
          onClick={() => setOpen(false)}
        >
          Aurevia Gems
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-2xl px-1.5 py-1 md:flex ${
            lightOnDark
              ? 'bg-white/12 backdrop-blur-sm'
              : 'bg-[var(--pearl-deep)]/80'
          }`}
        >
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => {
                if (isActive) {
                  return lightOnDark
                    ? 'nav-pill nav-pill-active-on-dark'
                    : 'nav-pill nav-pill-active';
                }
                return lightOnDark
                  ? 'nav-pill nav-pill-idle-on-dark'
                  : 'nav-pill nav-pill-idle';
              }}
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
          className="text-[11px] tracking-[0.2em] uppercase md:hidden"
          style={{ color: lightOnDark ? '#ffffff' : 'var(--ink)' }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div className="surface-dark fixed inset-0 z-[55] flex flex-col bg-[var(--emerald)] px-6 py-7 md:hidden">
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
                className="border-b border-white/15 py-4 font-display text-3xl"
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
