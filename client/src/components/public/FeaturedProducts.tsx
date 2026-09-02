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
      <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-32">
        <div
          className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div className="max-w-xl">
            <p className="eyebrow">Featured Collection</p>
            <div className="gold-rule mt-5" />
            <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-[3.5rem]">
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
        <p className="px-5 pb-24 text-sm text-[var(--muted)] md:px-10">
          Loading collection...
        </p>
      ) : error ? (
        <p className="mx-5 mb-24 bg-[var(--white)]/70 px-5 py-8 text-sm text-[var(--muted)] md:mx-10">
          {error}
        </p>
      ) : items.length === 0 ? (
        <div className="mx-5 mb-24 px-5 py-16 text-center md:mx-10">
          <h3 className="font-display text-3xl">Catalogue updating</h3>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1440px] gap-x-6 gap-y-12 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-12 md:px-10">
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
