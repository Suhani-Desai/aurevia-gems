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

const layoutAspects = [
  'wide',
  'tall',
  'portrait',
  'landscape',
  'portrait',
  'tall',
] as const;

export function FeaturedProducts({
  products,
  loading,
  error,
}: FeaturedProductsProps) {
  const items = products.slice(0, 6);
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-atmosphere">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 md:px-10 md:pt-16">
        <div
          className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div className="max-w-xl">
            <p className="eyebrow">Featured Collection</p>
            <div className="gold-rule mt-4" />
            <h2 className="font-display mt-5 text-3xl md:text-4xl lg:text-5xl">
              Selected for the discerning eye.
            </h2>
          </div>
          <Link
            to="/collections"
            className="nav-underline text-[11px] uppercase tracking-[0.18em]"
          >
            View all collections
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="px-5 pb-14 text-sm text-[var(--muted)] md:px-10">
          Loading collection...
        </p>
      ) : error ? (
        <p className="mx-5 mb-14 bg-[var(--white)]/70 px-5 py-6 text-sm text-[var(--muted)] md:mx-10">
          {error}
        </p>
      ) : items.length === 0 ? (
        <div className="mx-5 mb-14 px-5 py-10 text-center md:mx-10">
          <h3 className="font-display text-3xl">Catalogue updating</h3>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1440px] gap-x-5 gap-y-10 px-5 pb-14 sm:grid-cols-2 lg:grid-cols-12 md:px-10">
          {items.map((product, index) => {
            const span =
              index === 0
                ? 'lg:col-span-7'
                : index === 1
                  ? 'lg:col-span-5'
                  : index === 2
                    ? 'lg:col-span-4'
                    : index === 3
                      ? 'lg:col-span-8'
                      : index === 4
                        ? 'lg:col-span-5'
                        : 'lg:col-span-7';

            return (
              <div key={product.id} className={span} data-reveal>
                <ProductCard
                  product={product}
                  featured={false}
                  aspect={layoutAspects[index] ?? 'portrait'}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
