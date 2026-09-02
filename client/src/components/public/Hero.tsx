import { Link } from 'react-router-dom';
import { MediaImage } from '../MediaImage';
import { siteImages } from '../../utils/productVisual';

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[var(--charcoal)] text-[var(--ivory)]">
      <MediaImage
        src={siteImages.hero}
        alt="Diamond jewellery composition for Aurevia Gems"
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,40,33,0.82)] via-[rgba(15,40,33,0.45)] to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-10 md:pb-24">
        <div className="max-w-xl rise-in">
          <p className="eyebrow text-[var(--champagne)]">
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
          <h1 className="font-display mt-5 text-5xl text-[var(--ivory)] md:text-6xl lg:text-7xl">
            Exceptional stones.
            <span className="block">Endless possibilities.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-[rgba(246,241,231,0.78)] md:text-base">
            Premium diamonds and fine jewellery materials for brands, retailers
            and creators worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/collections" className="btn-primary">
              Explore Collection
            </Link>
            <Link to="/contact" className="btn-ghost btn-ghost-light">
              Request an Enquiry
            </Link>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 rise-in-delay md:absolute md:bottom-10 md:left-10 md:mt-0">
          <div className="scroll-hint" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-[rgba(246,241,231,0.55)]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
