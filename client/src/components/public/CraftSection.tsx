import { useRef } from 'react';
import { MediaImage } from '../MediaImage';
import { useSafeReveal } from '../../motion/useSafeReveal';
import { siteImages } from '../../utils/productVisual';

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--forest)] text-[var(--ivory)]"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <div data-reveal>
          <p className="eyebrow">Craftsmanship</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl">
            Material matters.
            <br />
            So does the way it is chosen.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[rgba(246,241,231,0.72)] md:text-base">
            Every diamond and metal in the Aurevia assortment is selected with
            commercial purpose in mind—cut, composition, and consistency that
            support jewellery programmes across markets.
          </p>
        </div>
        <div data-reveal>
          <MediaImage
            src={siteImages.craft}
            alt="Fine jewellery craftsmanship detail"
            className="aspect-[5/6] w-full"
          />
        </div>
      </div>
    </section>
  );
}
