import { Link } from 'react-router-dom';
import { MediaImage } from '../MediaImage';
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
  return (
    <section id="materials" className="scroll-mt-24 bg-[var(--surface)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Materials</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl">
            Diamonds and fine metals for modern jewellery houses.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {materials.map((item, index) => (
            <Link
              key={item.name}
              to={`/collections?material=${encodeURIComponent(item.name)}`}
              className={`group relative min-h-[360px] overflow-hidden md:min-h-[440px] ${
                index === 0 ? 'md:row-span-2 md:min-h-full' : ''
              }`}
            >
              <MediaImage
                src={item.image}
                alt={`${item.name} material`}
                className="absolute inset-0 h-full w-full media-zoom"
                imgClassName="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,40,33,0.88)] via-[rgba(15,40,33,0.25)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[11px] tracking-[0.22em] text-[var(--champagne)]">
                  {item.n}
                </p>
                <h3 className="font-display mt-3 text-3xl text-[var(--ivory)] md:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[rgba(246,241,231,0.75)]">
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
