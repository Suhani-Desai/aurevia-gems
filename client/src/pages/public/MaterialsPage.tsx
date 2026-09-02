import { Link } from 'react-router-dom';
import { MediaImage } from '../../components/MediaImage';
import { siteImages } from '../../utils/productVisual';

const materials = [
  {
    n: '01',
    name: 'Diamonds',
    description:
      'Cut with precision and selected for brilliance across bridal, evening and everyday programmes.',
    image: siteImages.materials.Diamonds,
  },
  {
    n: '02',
    name: 'Gold',
    description:
      'Warm, enduring metal for solitaires, bracelets and elevated retail collections.',
    image: siteImages.materials.Gold,
  },
  {
    n: '03',
    name: 'Silver',
    description:
      'Refined versatility for contemporary assortments and modern masculine lines.',
    image: siteImages.materials.Silver,
  },
  {
    n: '04',
    name: 'Platinum',
    description:
      'Rare, quietly distinctive metal for lasting fine jewellery programmes.',
    image: siteImages.materials.Platinum,
  },
];

export function MaterialsPage() {
  return (
    <div>
      <section className="bg-[var(--onyx)] pt-24 text-[var(--pearl)]">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:px-10 md:py-14">
          <div>
            <p className="eyebrow text-[var(--gold-soft)]">Materials</p>
            <div className="gold-rule mt-4 bg-[var(--gold-soft)]" />
            <h1 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl">
              Diamonds and fine metals for modern jewellery houses.
            </h1>
          </div>
          <p className="text-sm leading-7 text-[rgba(242,244,242,0.65)]">
            Explore each pillar of the Aurevia assortment, then open the matching
            collection filter to review available pieces.
          </p>
        </div>
      </section>

      <section className="bg-[var(--pearl)]">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 py-12 sm:grid-cols-2 md:px-10 md:py-14">
          {materials.map((item) => (
            <Link
              key={item.name}
              to={`/collections?material=${encodeURIComponent(item.name)}`}
              className="group overflow-hidden rounded-[1.35rem] bg-[var(--surface)]"
            >
              <MediaImage
                src={item.image}
                alt={`${item.name} material`}
                className="aspect-[16/10] w-full"
                imgClassName="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="p-5 md:p-6">
                <p className="text-[11px] tracking-[0.22em] text-[var(--gold)]">
                  {item.n}
                </p>
                <h2 className="font-display mt-2 text-3xl">{item.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {item.description}
                </p>
                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]">
                  View {item.name} collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--emerald)] text-[var(--pearl)]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">
              Prefer the homepage materials gallery?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[rgba(242,244,242,0.7)]">
              Jump back to the materials section on the home experience, or open
              the full catalogue.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/#materials" className="btn-ghost btn-ghost-light">
              Homepage materials
            </Link>
            <Link to="/collections" className="btn-enquiry">
              All collections
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
