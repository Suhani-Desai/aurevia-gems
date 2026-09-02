import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';

type FeaturedProductsProps = {
  products: Product[];
  loading?: boolean;
  error?: string;
};

export function FeaturedProducts({
  products,
  loading,
  error,
}: FeaturedProductsProps) {
  const items = products.slice(0, 6);

  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Featured Collection</p>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">
              Selected for the discerning eye.
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-[11px] uppercase tracking-[0.16em] underline-offset-4 hover:underline"
          >
            View all collections
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--muted)]">Loading collection...</p>
        ) : error ? (
          <p className="border border-[var(--border)] bg-[var(--white)] px-5 py-8 text-sm text-[var(--muted)]">
            {error}
          </p>
        ) : items.length === 0 ? (
          <div className="border border-dashed border-[var(--border)] px-5 py-16 text-center">
            <h3 className="font-display text-3xl">Catalogue updating</h3>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Featured pieces will appear here as inventory is published.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                featured={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
