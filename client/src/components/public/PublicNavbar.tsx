import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/collections', label: 'Collections' },
  { to: '/#about', label: 'About', hash: true },
  { to: '/#materials', label: 'Materials', hash: true },
  { to: '/contact', label: 'Contact' },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[rgba(246,241,231,0.92)] backdrop-blur'
          : 'bg-[var(--ivory)]'
      }`}
    >
      <div className="mx-auto grid h-[4.25rem] max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
        <Link
          to="/"
          className="justify-self-start text-[11px] font-medium tracking-[0.28em] text-[var(--charcoal)]"
          onClick={() => setOpen(false)}
        >
          AUREVIA GEMS
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                href={link.to}
                className="text-[12px] tracking-[0.08em] text-[var(--muted)] transition hover:text-[var(--charcoal)]"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-[12px] tracking-[0.08em] transition ${
                    isActive
                      ? 'text-[var(--charcoal)]'
                      : 'text-[var(--muted)] hover:text-[var(--charcoal)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden justify-self-end md:block">
          <Link to="/contact" className="btn-ghost !px-4 !py-2.5">
            Request an Enquiry
          </Link>
        </div>

        <button
          type="button"
          className="justify-self-end text-[11px] tracking-[0.18em] uppercase text-[var(--charcoal)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] bg-[var(--ivory)] px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) =>
              link.hash ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-[0.08em]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-[0.08em]"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 text-center"
            >
              Request an Enquiry
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
