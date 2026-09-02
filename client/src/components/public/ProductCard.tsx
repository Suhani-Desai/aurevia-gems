import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import {
  getProductDescription,
  getProductImage,
} from '../../utils/productVisual';
import { MediaImage } from '../MediaImage';

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <article
      className={`group relative border border-[var(--border)] bg-[var(--white)] transition duration-500 hover:border-[var(--charcoal)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div
          className={`relative overflow-hidden ${
            featured ? 'aspect-[16/10]' : 'aspect-[4/5]'
          }`}
        >
          <MediaImage
            src={getProductImage(product)}
            alt={product.name}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-400 group-hover:opacity-100 max-md:hidden">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--ivory)]/70 bg-[rgba(20,52,43,0.45)] text-[10px] uppercase tracking-[0.16em] text-[var(--ivory)] backdrop-blur-sm">
              View ↗
            </span>
          </div>
        </div>
        <div className="space-y-3 p-5 transition duration-500 group-hover:-translate-y-0.5 md:p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--champagne)]">
            {product.category.name}
          </p>
          <h3 className="font-display text-2xl text-[var(--charcoal)] md:text-3xl">
            {product.name}
          </h3>
          <p className="text-sm leading-6 text-[var(--muted)]">
            {getProductDescription(product)}
          </p>
          <span className="nav-underline inline-block pt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--charcoal)]">
            View Details
          </span>
        </div>
      </Link>
    </article>
  );
}
