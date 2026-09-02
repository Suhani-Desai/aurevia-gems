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
  },
  {
    n: '02',
    name: 'Gold',
    description: 'Timeless material for enduring collections.',
    image: siteImages.materials.Gold,
  },
  {
    n: '03',
    name: 'Silver',
    description: 'Refined versatility for modern jewellery.',
    image: siteImages.materials.Silver,
  },
  {
    n: '04',
    name: 'Platinum',
    description: 'Rare, enduring and quietly distinctive.',
    image: siteImages.materials.Platinum,
  },
];

export function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="scroll-mt-24 bg-[var(--surface)]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24">
        <div className="mb-10 max-w-2xl" data-reveal>
          <p className="eyebrow">Materials</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl">
            Diamonds and fine metals for modern jewellery houses.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((item) => (
            <Link
              key={item.name}
              to={`/collections?material=${encodeURIComponent(item.name)}`}
              data-reveal
              className="group relative min-h-[320px] overflow-hidden lg:min-h-[420px]"
            >
              <MediaImage
                src={item.image}
                alt={`${item.name} material`}
                className="absolute inset-0 h-full w-full media-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,40,33,0.88)] via-[rgba(15,40,33,0.25)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] tracking-[0.22em] text-[var(--champagne)]">
                  {item.n}
                </p>
                <h3 className="font-display mt-3 text-3xl text-[var(--ivory)]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[rgba(246,241,231,0.75)]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
