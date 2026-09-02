import { MediaImage } from '../MediaImage';
import { siteImages } from '../../utils/productVisual';

export function BrandStory() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <div>
          <p className="eyebrow">The Aurevia Standard</p>
          <h2 className="font-display mt-4 text-4xl text-[var(--charcoal)] md:text-5xl">
            Precision in every stone.
            <span className="block">Purpose in every collection.</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-base">
            Aurevia Gems partners with jewellery houses that require clarity in
            sourcing, consistency in quality, and materials chosen for real
            commercial collections—not seasonal spectacle.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-base">
            From diamonds to precious metals, our focus remains the same:
            refined selection, transparent communication, and long-term supply
            relationships.
          </p>
        </div>
        <MediaImage
          src={siteImages.brandIntro}
          alt="Close detail of a diamond gemstone"
          className="aspect-[4/5] w-full"
        />
      </div>
    </section>
  );
}
