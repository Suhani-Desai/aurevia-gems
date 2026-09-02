import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="surface-dark">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10 md:px-10 md:py-16">
        <div>
          <p className="font-display text-3xl tracking-[-0.02em]">Aurevia Gems</p>
          <p className="text-muted-on-dark mt-4 max-w-sm text-sm leading-7">
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
          <div className="gold-rule mt-6 bg-[var(--gold-soft)]" />
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <div className="text-muted-on-dark mt-4 space-y-3 text-sm">
            <Link to="/collections" className="block transition hover:opacity-100" style={{ color: '#ffffff' }}>
              Collections
            </Link>
            <Link to="/about" className="block" style={{ color: '#ffffff' }}>
              About
            </Link>
            <Link to="/materials" className="block" style={{ color: '#ffffff' }}>
              Materials
            </Link>
            <Link to="/contact" className="block" style={{ color: '#ffffff' }}>
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <div className="mt-4 space-y-3 text-sm">
            <a
              href="mailto:trade@aureviagems.com"
              className="block"
              style={{ color: '#ffffff' }}
            >
              trade@aureviagems.com
            </a>
            <a
              href="tel:+442079460123"
              className="block"
              style={{ color: '#ffffff' }}
            >
              +44 20 7946 0123
            </a>
            <div className="flex gap-5 pt-1">
              <a href="https://www.linkedin.com" style={{ color: '#ffffff' }}>
                LinkedIn
              </a>
              <a href="https://www.instagram.com" style={{ color: '#ffffff' }}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] justify-between gap-4 px-5 py-4 text-xs md:px-10">
          <span className="text-muted-on-dark">
            © {new Date().getFullYear()} Aurevia Gems
          </span>
          <Link to="/login" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Inventory Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
