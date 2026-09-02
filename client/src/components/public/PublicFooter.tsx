import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="bg-[var(--forest)] text-[var(--ivory)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="text-[11px] tracking-[0.28em]">AUREVIA GEMS</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[rgba(246,241,231,0.68)]">
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] text-[var(--champagne)]">
            Navigate
          </p>
          <div className="mt-4 space-y-3 text-sm text-[rgba(246,241,231,0.75)]">
            <Link to="/collections" className="block hover:text-[var(--ivory)]">
              Collections
            </Link>
            <a href="/#about" className="block hover:text-[var(--ivory)]">
              About
            </a>
            <a href="/#materials" className="block hover:text-[var(--ivory)]">
              Materials
            </a>
            <Link to="/contact" className="block hover:text-[var(--ivory)]">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] text-[var(--champagne)]">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-[rgba(246,241,231,0.75)]">
            <a href="mailto:trade@aureviagems.com" className="block hover:text-[var(--ivory)]">
              trade@aureviagems.com
            </a>
            <a href="tel:+442079460123" className="block hover:text-[var(--ivory)]">
              +44 20 7946 0123
            </a>
            <div className="flex gap-4 pt-2">
              <a href="https://www.linkedin.com" className="hover:text-[var(--ivory)]">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" className="hover:text-[var(--ivory)]">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] justify-between gap-4 px-5 py-5 text-xs text-[rgba(246,241,231,0.45)] md:px-10">
          <span>© {new Date().getFullYear()} Aurevia Gems</span>
          <Link to="/login" className="hover:text-[var(--ivory)]">
            Inventory Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
