import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MediaImage } from '../MediaImage';
import { useSafeReveal } from '../../motion/useSafeReveal';
import { siteImages } from '../../utils/productVisual';

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="surface-dark relative overflow-hidden bg-[var(--emerald)]"
    >
      <div className="absolute inset-0 opacity-35">
        <MediaImage
          src={siteImages.craft}
          alt=""
          className="h-full w-full !rounded-none"
          soft={false}
          imgClassName="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(13,47,40,0.95)] via-[rgba(13,47,40,0.82)] to-[rgba(13,47,40,0.45)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 md:grid-cols-12 md:gap-8 md:px-10 md:py-16">
        <div className="md:col-span-6" data-reveal>
          <p className="eyebrow text-[var(--gold-soft)]">Craftsmanship</p>
          <div className="gold-rule mt-4 bg-[var(--gold-soft)]" />
          <h2 className="font-display mt-5 text-3xl md:text-4xl lg:text-5xl">
            Material matters.
            <span className="mt-1 block italic text-[var(--gold-soft)]">
              So does the way it is chosen.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[rgba(242,244,242,0.72)]">
            Every diamond and metal in the Aurevia assortment is selected with
            commercial purpose in mind—cut, composition, and consistency that
            support jewellery programmes across markets.
          </p>
          <Link to="/about" className="nav-underline mt-6 inline-block text-[11px] uppercase tracking-[0.16em] text-[var(--gold-soft)]">
            About our standard
          </Link>
        </div>

        <div className="md:col-span-5 md:col-start-8" data-reveal>
          <MediaImage
            src={siteImages.craft}
            alt="Fine jewellery craftsmanship detail"
            className="aspect-[5/4] w-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
