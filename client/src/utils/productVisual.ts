import type { Product } from '../types';

const FALLBACK = '/images/fallback.jpg';

/** One unique image per SKU — never reuse the same photo under different names. */
const skuImageMap: Record<string, string> = {
  'AG-DM-AURELIA': '/images/product-aurelia.jpg',
  'AG-DM-CELESTE': '/images/product-celeste.jpg',
  'AG-GD-VERONA': '/images/product-verona.jpg',
  'AG-SV-NOIR': '/images/product-noir.jpg',
  'AG-PT-ELAN': '/images/product-elan.jpg',
  'AG-DM-LUMIERE': '/images/product-lumiere.jpg',
  'AG-GD-SOLENNE': '/images/product-solenne.jpg',
  'AG-SV-ARGENT': '/images/product-argent.jpg',
};

const categoryImageMap: Record<string, string> = {
  Diamonds: '/images/material-diamonds.jpg',
  Gold: '/images/material-gold.jpg',
  Silver: '/images/material-silver.jpg',
  Platinum: '/images/material-platinum.jpg',
};

const productCopy: Record<string, string> = {
  'AG-DM-AURELIA':
    'A precisely cut round brilliant selected for clarity and commercial versatility.',
  'AG-DM-CELESTE':
    'A continuous line of diamonds composed for refined evening and bridal programmes.',
  'AG-GD-VERONA':
    'Warm gold solitaire setting designed for enduring retail collections.',
  'AG-SV-NOIR':
    'A silver halo pendant with quiet contrast for contemporary assortments.',
  'AG-PT-ELAN':
    'A platinum band with restrained geometry for lasting fine jewellery lines.',
  'AG-DM-LUMIERE':
    'Paired diamond studs balanced for brilliance and everyday wearability.',
  'AG-GD-SOLENNE':
    'A textured gold bracelet suited to elevated everyday merchandising.',
  'AG-SV-ARGENT':
    'A silver signet with clean proportion for modern masculine collections.',
};

export function getProductImage(product: Pick<Product, 'sku' | 'category'>): string {
  return (
    skuImageMap[product.sku] ??
    categoryImageMap[product.category.name] ??
    FALLBACK
  );
}

export function getCategoryImage(categoryName: string): string {
  return categoryImageMap[categoryName] ?? FALLBACK;
}

export function getProductDescription(
  product: Pick<Product, 'sku' | 'name' | 'category'>,
): string {
  return (
    productCopy[product.sku] ??
    `${product.name} from the ${product.category.name} collection, curated for professional jewellery programmes.`
  );
}

export const siteImages = {
  hero: '/images/hero-main.jpg',
  brandIntro: '/images/brand-intro.jpg',
  craft: '/images/craft.jpg',
  login: '/images/login-visual.jpg',
  fallback: FALLBACK,
  materials: {
    Diamonds: '/images/material-diamonds.jpg',
    Gold: '/images/material-gold.jpg',
    Silver: '/images/material-silver.jpg',
    Platinum: '/images/material-platinum.jpg',
  },
} as const;
