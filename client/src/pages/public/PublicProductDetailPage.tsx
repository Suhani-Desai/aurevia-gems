import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MediaImage } from '../../components/MediaImage';
import { ApiRequestError } from '../../services/api';
import * as publicCatalogService from '../../services/publicCatalogService';
import type { Product } from '../../types';
import { formatCurrency, getProductStockStatus } from '../../utils/format';
import {
  getProductDescription,
  getProductImage,
} from '../../utils/productVisual';

export function PublicProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!id) {
        setError('Product not found.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        setProduct(await publicCatalogService.getPublicProduct(id));
      } catch (err) {
        setError(
          err instanceof ApiRequestError
            ? err.message
            : 'Unable to load product details.',
        );
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-32 text-sm text-[var(--muted)] md:px-10">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-32 md:px-10">
        <h1 className="font-display text-4xl">Product unavailable</h1>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {error || 'This product could not be found.'}
        </p>
        <Link to="/collections" className="btn-ghost mt-8 inline-flex">
          Back to Collection
        </Link>
      </div>
    );
  }

  const status = getProductStockStatus(product);
  const availability =
    status === 'OUT_OF_STOCK'
      ? 'Currently unavailable'
      : status === 'LOW_STOCK'
        ? 'Limited availability'
        : 'Available for enquiry';

  return (
    <section className="section-atmosphere pt-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-12 md:gap-12 md:px-10 md:py-20">
        <div className="img-frame overflow-hidden md:col-span-7">
          <MediaImage
            src={getProductImage(product)}
            alt={product.name}
            className="aspect-[4/5] w-full md:aspect-[5/6]"
            imgClassName="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center md:col-span-5">
          <p className="eyebrow">{product.category.name}</p>
          <div className="gold-rule mt-5" />
          <h1 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl">
            {product.name}
          </h1>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-8 text-[var(--muted)]">
            {getProductDescription(product)}
          </p>

          <dl className="mt-10 space-y-5 border-y border-[var(--gold)]/25 py-7 text-sm">
            <div className="flex justify-between gap-6">
              <dt className="tracking-[0.08em] text-[var(--muted)]">SKU</dt>
              <dd>{product.sku}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="tracking-[0.08em] text-[var(--muted)]">
                Business pricing
              </dt>
              <dd>{formatCurrency(product.sellingPrice)}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="tracking-[0.08em] text-[var(--muted)]">
                Availability
              </dt>
              <dd>{availability}</dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to={`/contact?requirement=${encodeURIComponent(
                `${product.name} (${product.sku})`,
              )}`}
              className="btn-primary"
            >
              Request an Enquiry
            </Link>
            <Link to="/collections" className="btn-ghost">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
