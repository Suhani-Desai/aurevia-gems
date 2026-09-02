import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MediaImage } from '../MediaImage';
import { useSafeReveal } from '../../motion/useSafeReveal';
import { siteImages } from '../../utils/productVisual';

const materials = [
  {
    n: '01',
    name: 'Diamonds',
    description: 'Cut with precision. Selected for brilliance.',
    image: siteImages.materials.Diamonds,
    className: 'md:col-span-7 md:row-span-2 min-h-[420px] md:min-h-full',
  },
  {
    n: '02',
    name: 'Gold',
    description: 'Timeless material for enduring collections.',
    image: siteImages.materials.Gold,
    className: 'md:col-span-5 min-h-[280px] md:min-h-[320px]',
  },
  {
    n: '03',
    name: 'Silver',
    description: 'Refined versatility for modern jewellery.',
    image: siteImages.materials.Silver,
    className: 'md:col-span-5 min-h-[280px] md:min-h-[320px]',
  },
  {
    n: '04',
    name: 'Platinum',
    description: 'Rare, enduring and quietly distinctive.',
    image: siteImages.materials.Platinum,
    className: 'md:col-span-7 min-h-[300px] md:min-h-[360px]',
  },
];

export function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="scroll-mt-24 bg-[var(--onyx)] text-[var(--pearl)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div
          className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--gold-soft)]">Materials</p>
            <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl">
              Diamonds and fine metals for modern jewellery houses.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-7 text-[rgba(242,244,242,0.58)]">
            Four pillars of the Aurevia assortment—shaped for commercial clarity
            and lasting brilliance.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-4 md:min-h-[760px]">
          {materials.map((item) => (
            <Link
              key={item.name}
              to={`/collections?material=${encodeURIComponent(item.name)}`}
              data-reveal
              className={`group relative overflow-hidden ${item.className}`}
            >
              <MediaImage
                src={item.image}
                alt={`${item.name} material`}
                className="absolute inset-0 h-full w-full media-zoom"
                imgClassName="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,15,13,0.92)] via-[rgba(11,15,13,0.25)] to-transparent transition duration-500 group-hover:via-[rgba(11,15,13,0.4)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[11px] tracking-[0.28em] text-[var(--gold-soft)]">
                  {item.n}
                </p>
                <h3 className="font-display mt-3 text-3xl md:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[rgba(242,244,242,0.72)]">
                  {item.description}
                </p>
                <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.18em] text-[var(--pearl)] opacity-0 transition duration-500 group-hover:opacity-100">
                  Explore {item.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
