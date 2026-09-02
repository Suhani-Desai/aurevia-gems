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
      className="relative overflow-hidden bg-[var(--emerald)] text-[var(--pearl)]"
    >
      <div className="absolute inset-0 opacity-40">
        <MediaImage
          src={siteImages.craft}
          alt=""
          className="h-full w-full"
          imgClassName="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(13,47,40,0.95)] via-[rgba(13,47,40,0.82)] to-[rgba(13,47,40,0.45)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-36">
        <div className="md:col-span-6" data-reveal>
          <p className="eyebrow text-[var(--gold-soft)]">Craftsmanship</p>
          <div className="gold-rule mt-5 bg-[var(--gold-soft)]" />
          <h2 className="font-display mt-8 text-4xl md:text-5xl lg:text-6xl">
            Material matters.
            <span className="mt-2 block italic text-[var(--gold-soft)]">
              So does the way it is chosen.
            </span>
          </h2>
          <p className="mt-8 max-w-lg text-[0.95rem] leading-8 text-[rgba(242,244,242,0.72)]">
            Every diamond and metal in the Aurevia assortment is selected with
            commercial purpose in mind—cut, composition, and consistency that
            support jewellery programmes across markets.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8" data-reveal>
          <div className="img-frame overflow-hidden border border-white/10">
            <MediaImage
              src={siteImages.craft}
              alt="Fine jewellery craftsmanship detail"
              className="aspect-[4/5] w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
