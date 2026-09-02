import { useRef } from 'react';
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
      <div className="mx-auto grid max-w-[1440px] items-end gap-12 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-32">
        <div className="md:col-span-5 md:pb-10" data-reveal>
          <p className="eyebrow">The Aurevia Standard</p>
          <div className="gold-rule mt-6" />
          <h2 className="font-display mt-8 text-4xl text-[var(--ink)] md:text-5xl lg:text-[3.4rem]">
            Precision in every stone.
            <span className="mt-2 block italic text-[var(--emerald-mid)]">
              Purpose in every collection.
            </span>
          </h2>
          <p className="mt-8 max-w-md text-[0.95rem] leading-8 text-[var(--muted)]">
            Aurevia Gems partners with jewellery houses that require clarity in
            sourcing, consistency in quality, and materials chosen for real
            commercial collections—not seasonal spectacle.
          </p>
          <p className="mt-5 max-w-md text-[0.95rem] leading-8 text-[var(--muted)]">
            From diamonds to precious metals, our focus remains the same:
            refined selection, transparent communication, and long-term supply
            relationships.
          </p>
        </div>

        <div
          className="relative md:col-span-7 md:col-start-6"
          data-reveal
        >
          <div className="img-frame overflow-hidden">
            <MediaImage
              src={siteImages.brandIntro}
              alt="Close detail of a diamond gemstone"
              className="aspect-[3/4] w-full md:aspect-[4/5]"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
