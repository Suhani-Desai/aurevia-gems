import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MediaImage } from '../MediaImage';
import { useSafeReveal } from '../../motion/useSafeReveal';
import { siteImages } from '../../utils/productVisual';

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-atmosphere scroll-mt-24"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-14 md:grid-cols-2 md:gap-12 md:px-10 md:py-16 lg:gap-16">
        <div data-reveal>
          <p className="eyebrow">The Aurevia Standard</p>
          <div className="gold-rule mt-4" />
          <h2 className="font-display mt-5 text-3xl text-[var(--ink)] md:text-4xl lg:text-[2.75rem]">
            Precision in every stone.
            <span className="mt-1 block italic text-[var(--emerald-mid)]">
              Purpose in every collection.
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-[0.95rem] md:leading-8">
            Aurevia Gems partners with jewellery houses that require clarity in
            sourcing, consistency in quality, and materials chosen for real
            commercial collections—not seasonal spectacle.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-[0.95rem] md:leading-8">
            From diamonds to precious metals, our focus remains the same:
            refined selection, transparent communication, and long-term supply
            relationships.
          </p>
          <Link to="/about" className="nav-underline mt-6 inline-block text-[11px] uppercase tracking-[0.16em]">
            Read our story
          </Link>
        </div>

        <div data-reveal className="relative">
          <MediaImage
            src={siteImages.brandIntro}
            alt="Close detail of a diamond gemstone"
            className="aspect-[5/4] w-full max-h-[360px] md:max-h-[400px]"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
