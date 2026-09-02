import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/public/ProductCard';
import { ApiRequestError } from '../../services/api';
import * as publicCatalogService from '../../services/publicCatalogService';
import * as publicCategoryService from '../../services/publicCategoryService';
import type { Category, Product } from '../../types';

const materialOrder = ['Diamonds', 'Gold', 'Silver', 'Platinum'];

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
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
          <p className="eyebrow">Collections</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl md:text-6xl">
            Materials selected for modern jewellery houses.
          </h1>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setSearchParams(item === 'All' ? {} : { material: item })
                }
                className={`border px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition duration-300 ${
                  material === item
                    ? 'border-[var(--forest)] bg-[var(--forest)] text-[var(--ivory)]'
                    : 'border-[var(--border)] text-[var(--charcoal)] hover:border-[var(--charcoal)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-[var(--muted)]">Loading products...</p>
          ) : error ? (
            <p className="border border-[var(--border)] bg-white px-5 py-8 text-sm text-[var(--muted)]">
              {error}
            </p>
          ) : filtered.length === 0 ? (
            <div className="border border-dashed border-[var(--border)] bg-white px-5 py-16 text-center">
              <h2 className="font-display text-3xl">No pieces in this filter</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Try another material or view the full collection.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  featured={index === 0 && material === 'All'}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
