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
  aspect?: 'portrait' | 'landscape' | 'tall' | 'wide';
};

const aspectClass = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[16/10]',
  tall: 'aspect-[3/4]',
  wide: 'aspect-[5/3]',
};

export function ProductCard({
  product,
  featured = false,
  aspect,
}: ProductCardProps) {
  const resolvedAspect =
    aspect ?? (featured ? 'landscape' : 'portrait');

  return (
    <article className={`group relative ${featured ? 'md:col-span-2' : ''}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div
          className={`img-frame relative overflow-hidden bg-[var(--pearl-deep)] ${aspectClass[resolvedAspect]}`}
        >
          <MediaImage
            src={getProductImage(product)}
            alt={product.name}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,15,13,0.35)] via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-5 opacity-0 transition duration-500 group-hover:opacity-100 max-md:hidden">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--pearl)]">
              View piece
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[var(--gold-soft)]">
              →
            </span>
          </div>
        </div>
        <div className="space-y-2 pt-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
            {product.category.name}
          </p>
          <h3 className="font-display text-2xl text-[var(--ink)] md:text-[1.85rem]">
            {product.name}
          </h3>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
            {getProductDescription(product)}
          </p>
          <span className="nav-underline inline-block pt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]">
            View Details
          </span>
        </div>
      </Link>
    </article>
  );
}
