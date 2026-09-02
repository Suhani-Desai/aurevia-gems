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
      className={`group border border-[var(--border)] bg-[var(--white)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <MediaImage
          src={getProductImage(product)}
          alt={product.name}
          className={`media-zoom ${featured ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}
        />
        <div className="space-y-3 p-5 md:p-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--champagne)]">
            {product.category.name}
          </p>
          <h3 className="font-display text-2xl text-[var(--charcoal)] md:text-3xl">
            {product.name}
          </h3>
          <p className="text-sm leading-6 text-[var(--muted)]">
            {getProductDescription(product)}
          </p>
          <span className="inline-block pt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--charcoal)] underline-offset-4 group-hover:underline">
            View Details
          </span>
        </div>
      </Link>
    </article>
  );
}
