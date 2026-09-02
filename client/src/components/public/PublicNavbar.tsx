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
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[rgba(246,241,231,0.92)] py-0 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 transition-all duration-400 md:grid-cols-[1fr_auto_1fr] md:px-10 ${
          scrolled ? 'h-[3.6rem]' : 'h-[4.4rem]'
        }`}
      >
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
                className="nav-underline text-[12px] tracking-[0.08em] text-[var(--muted)] transition hover:text-[var(--charcoal)]"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `nav-underline text-[12px] tracking-[0.08em] transition ${
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
        <div className="fixed inset-0 z-[55] flex flex-col bg-[var(--forest)] px-6 py-8 text-[var(--ivory)] md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.28em]">AUREVIA GEMS</span>
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.18em]"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="mt-16 flex flex-col gap-6">
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
              className="btn-ghost btn-ghost-light mt-6 w-fit"
            >
              Request an Enquiry
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
