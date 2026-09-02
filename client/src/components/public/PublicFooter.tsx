import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="bg-[var(--onyx)] text-[var(--pearl)]">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12 md:px-10">
        <div>
          <p className="font-display text-3xl tracking-[-0.02em]">Aurevia Gems</p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[rgba(242,244,242,0.58)]">
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
          <div className="gold-rule mt-8 bg-[var(--gold-soft)]" />
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] text-[var(--gold-soft)]">
            Navigate
          </p>
          <div className="mt-5 space-y-3.5 text-sm text-[rgba(242,244,242,0.7)]">
            <Link to="/collections" className="block transition hover:text-[var(--pearl)]">
              Collections
            </Link>
            <a href="/#about" className="block transition hover:text-[var(--pearl)]">
              About
            </a>
            <a href="/#materials" className="block transition hover:text-[var(--pearl)]">
              Materials
            </a>
            <Link to="/contact" className="block transition hover:text-[var(--pearl)]">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] text-[var(--gold-soft)]">
            Contact
          </p>
          <div className="mt-5 space-y-3.5 text-sm text-[rgba(242,244,242,0.7)]">
            <a
              href="mailto:trade@aureviagems.com"
              className="block transition hover:text-[var(--pearl)]"
            >
              trade@aureviagems.com
            </a>
            <a
              href="tel:+442079460123"
              className="block transition hover:text-[var(--pearl)]"
            >
              +44 20 7946 0123
            </a>
            <div className="flex gap-5 pt-2">
              <a
                href="https://www.linkedin.com"
                className="transition hover:text-[var(--pearl)]"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                className="transition hover:text-[var(--pearl)]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] justify-between gap-4 px-5 py-5 text-xs text-[rgba(242,244,242,0.4)] md:px-10">
          <span>© {new Date().getFullYear()} Aurevia Gems</span>
          <Link to="/login" className="transition hover:text-[var(--pearl)]">
            Inventory Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
