import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { useSafeReveal } from '../../motion/useSafeReveal';

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
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section ref={sectionRef} className="border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-28">
        <div
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div className="max-w-xl">
            <p className="eyebrow">Featured Collection</p>
            <h2 className="font-display mt-4 text-4xl md:text-5xl">
              Selected for the discerning eye.
            </h2>
          </div>
          <Link
            to="/collections"
            className="nav-underline text-[11px] uppercase tracking-[0.16em]"
          >
            View all collections
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="px-5 pb-20 text-sm text-[var(--muted)] md:px-10">
          Loading collection...
        </p>
      ) : error ? (
        <p className="mx-5 mb-20 border border-[var(--border)] bg-[var(--white)] px-5 py-8 text-sm text-[var(--muted)] md:mx-10">
          {error}
        </p>
      ) : items.length === 0 ? (
        <div className="mx-5 mb-20 border border-dashed border-[var(--border)] px-5 py-16 text-center md:mx-10">
          <h3 className="font-display text-3xl">Catalogue updating</h3>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1440px] gap-5 px-5 pb-20 sm:grid-cols-2 xl:grid-cols-3 md:px-10">
          {items.map((product, index) => (
            <div key={product.id} data-reveal>
              <ProductCard product={product} featured={index === 0} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
