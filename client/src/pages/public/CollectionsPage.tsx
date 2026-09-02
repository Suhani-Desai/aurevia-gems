import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/public/ProductCard';
import { MediaImage } from '../../components/MediaImage';
import { ApiRequestError } from '../../services/api';
import * as publicCatalogService from '../../services/publicCatalogService';
import * as publicCategoryService from '../../services/publicCategoryService';
import type { Category, Product } from '../../types';
import { siteImages } from '../../utils/productVisual';

const materialOrder = ['Diamonds', 'Gold', 'Silver', 'Platinum'];

const cardAspects = [
  'tall',
  'portrait',
  'wide',
  'portrait',
  'landscape',
  'tall',
  'portrait',
  'wide',
] as const;

export function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const material = searchParams.get('material') ?? 'All';
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const [productRows, categoryRows] = await Promise.all([
          publicCatalogService.listPublicProducts(),
          publicCategoryService.listPublicCategories(),
        ]);
        setProducts(productRows);
        setCategories(categoryRows);
      } catch (err) {
        setError(
          err instanceof ApiRequestError
            ? err.message
            : 'Unable to load collections.',
        );
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const filters = useMemo(() => {
    const names = materialOrder.filter((name) =>
      categories.some((category) => category.name === name),
    );
    const extras = categories
      .map((category) => category.name)
      .filter((name) => !materialOrder.includes(name));
    return ['All', ...names, ...extras];
  }, [categories]);

  const filtered = useMemo(() => {
    if (material === 'All') return products;
    return products.filter((product) => product.category.name === material);
  }, [products, material]);

  return (
    <div>
      <section className="surface-dark pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-10 md:grid-cols-[1.3fr_0.7fr] md:items-end md:px-10 md:py-12">
          <div>
            <p className="eyebrow">Collections</p>
            <div className="gold-rule mt-4 bg-[var(--gold-soft)]" />
            <h1 className="font-display mt-5 text-4xl md:text-5xl">
              Materials selected for modern jewellery houses.
            </h1>
            <p className="text-muted-on-dark mt-4 max-w-xl text-sm leading-7">
              Browse the live catalogue by material. Each piece is curated for
              commercial programmes—clarity, consistency and lasting appeal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/materials" className="btn-ghost btn-ghost-light">
              Materials guide
            </Link>
            <Link to="/contact" className="btn-enquiry">
              Enquire
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pearl)]">
        <div className="mx-auto grid max-w-[1440px] gap-3 px-5 py-6 sm:grid-cols-4 md:px-10">
          {materialOrder.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setSearchParams({ material: name })}
              className={`group relative overflow-hidden rounded-[1.1rem] text-left ${
                material === name ? 'ring-1 ring-[var(--gold)]' : ''
              }`}
            >
              <MediaImage
                src={siteImages.materials[name as keyof typeof siteImages.materials]}
                alt={name}
                className="aspect-[16/10] w-full"
                imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,15,13,0.75)] to-transparent" />
              <span className="absolute bottom-3 left-3 font-display text-xl text-[var(--pearl)]">
                {name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-10">
          <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--border)] pb-4">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setSearchParams(item === 'All' ? {} : { material: item })
                }
                className={`pb-1 text-[11px] uppercase tracking-[0.16em] transition ${
                  material === item
                    ? 'border-b border-[var(--gold)] text-[var(--ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-[var(--muted)]">Loading products...</p>
          ) : error ? (
            <p className="bg-[var(--white)]/80 px-5 py-6 text-sm text-[var(--muted)]">
              {error}
            </p>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center">
              <h2 className="font-display text-3xl">No pieces in this filter</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Try another material or view the full collection.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  aspect={cardAspects[index % cardAspects.length]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
