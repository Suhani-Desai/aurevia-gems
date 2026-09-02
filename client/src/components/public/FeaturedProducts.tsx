import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Line, SplitLines } from '../../motion/SplitLines';
import {
  isDesktopMotion,
  prefersReducedMotion,
} from '../../motion/preferences';

gsap.registerPlugin(ScrollTrigger);

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
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || items.length === 0) return;
    if (prefersReducedMotion() || !isDesktopMotion()) return;

    const ctx = gsap.context(() => {
      const distance = Math.max(track.scrollWidth - window.innerWidth + 80, 0);

      gsap.to(track, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.35}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="border-b border-[var(--border)] overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Featured Collection</p>
            <SplitLines
              as="h2"
              className="font-display mt-4 text-4xl md:text-5xl"
            >
              <Line>Selected for the</Line>
              <Line>discerning eye.</Line>
            </SplitLines>
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
        <>
          {/* Desktop horizontal gallery */}
          <div className="hidden pb-24 lg:block">
            <div
              ref={trackRef}
              className="flex w-max gap-6 px-10 will-change-transform"
            >
              {items.map((product, index) => (
                <div
                  key={product.id}
                  className={`shrink-0 ${
                    index % 3 === 0 ? 'w-[34vw]' : 'w-[24vw]'
                  }`}
                >
                  <ProductCard product={product} featured={index % 3 === 0} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet editorial grid */}
          <div className="grid gap-5 px-5 pb-20 sm:grid-cols-2 md:px-10 lg:hidden">
            {items.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                featured={index === 0}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
