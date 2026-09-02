import { Link } from 'react-router-dom';
import type { Category } from '../../types';

const fallbackCollections = [
  {
    id: 'natural',
    name: 'Natural Diamonds',
    description: 'Classic brilliance for fine jewellery programmes.',
  },
  {
    id: 'lab',
    name: 'Lab-Grown Diamonds',
    description: 'Modern options for contemporary commercial collections.',
  },
  {
    id: 'jewellery',
    name: 'Diamond Jewellery',
    description: 'Finished pieces curated for retail and brand partners.',
  },
  {
    id: 'loose',
    name: 'Loose Stones',
    description: 'Flexible inventory for custom design and manufacturing.',
  },
];

type CollectionSectionProps = {
  categories: Category[];
};

export function CollectionSection({ categories }: CollectionSectionProps) {
  const items =
    categories.length > 0
      ? categories.slice(0, 4).map((category) => ({
          id: category.id,
          name: category.name,
          description:
            category.description?.trim() ||
            'Explore stones and pieces curated for professional buyers.',
          to: `/collections?category=${category.id}`,
        }))
      : fallbackCollections.map((item) => ({
          ...item,
          to: '/collections',
        }));

  return (
    <section className="border-b border-[var(--public-border)]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--public-gold)]">
              Collections
            </p>
            <h2 className="public-display mt-3 text-3xl text-[var(--public-charcoal)] md:text-4xl">
              Curated for jewellery businesses
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs uppercase tracking-[0.16em] text-[var(--public-charcoal)] underline-offset-4 hover:underline"
          >
            View all collections
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Link
              key={item.id}
              to={item.to}
              className="group border border-[var(--public-border)] bg-white transition hover:border-[var(--public-charcoal)]"
            >
              <div
                className="flex aspect-[4/5] items-end p-5"
                style={{
                  background:
                    index % 2 === 0
                      ? 'linear-gradient(165deg, #1a1a1a, #3a322a)'
                      : 'linear-gradient(165deg, #2a2420, #4a3f34)',
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--public-gold)]">
                  Explore
                </span>
              </div>
              <div className="space-y-2 p-5">
                <h3 className="public-display text-2xl text-[var(--public-charcoal)]">
                  {item.name}
                </h3>
                <p className="text-sm leading-6 text-[var(--public-muted)]">
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
