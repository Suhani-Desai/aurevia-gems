import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/collections', label: 'Collections' },
  { to: '/#about', label: 'About', hash: true },
  { to: '/#materials', label: 'Materials', hash: true },
  { to: '/contact', label: 'Contact' },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const lightOnDark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const text = lightOnDark ? 'text-[var(--pearl)]' : 'text-[var(--ink)]';
  const muted = lightOnDark
    ? 'text-[rgba(242,244,242,0.7)] hover:text-[var(--pearl)]'
    : 'text-[var(--muted)] hover:text-[var(--ink)]';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-[var(--border)]/70 bg-[rgba(242,244,242,0.9)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 transition-all duration-500 md:grid-cols-[1fr_auto_1fr] md:px-10 ${
          scrolled ? 'h-[3.75rem]' : 'h-[4.75rem]'
        }`}
      >
        <Link
          to="/"
          className={`justify-self-start font-display text-xl tracking-[-0.02em] md:text-2xl ${text}`}
          onClick={() => setOpen(false)}
        >
          Aurevia Gems
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                href={link.to}
                className={`nav-underline text-[12px] tracking-[0.12em] transition ${muted}`}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `nav-underline text-[12px] tracking-[0.12em] transition ${
                    isActive
                      ? lightOnDark
                        ? 'text-[var(--pearl)]'
                        : 'text-[var(--ink)]'
                      : muted
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden justify-self-end md:block">
          <Link
            to="/contact"
            className={`btn-ghost !px-4 !py-2.5 ${
              lightOnDark ? 'btn-ghost-light' : ''
            }`}
          >
            Request an Enquiry
          </Link>
        </div>

        <button
          type="button"
          className={`justify-self-end text-[11px] tracking-[0.2em] uppercase md:hidden ${text}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[55] flex flex-col bg-[var(--onyx)] px-6 py-8 text-[var(--pearl)] md:hidden">
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
          <div className="mt-20 flex flex-col gap-7">
            {links.map((link) =>
              link.hash ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-ghost btn-ghost-light mt-8 w-fit"
            >
              Request an Enquiry
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
