import type { Product, ProductStockStatus } from '../types';

export function getProductStockStatus(product: Product): ProductStockStatus {
  if (product.currentStock <= 0) {
    return 'OUT_OF_STOCK';
  }
  if (product.currentStock <= product.minimumStock) {
    return 'LOW_STOCK';
  }
  return 'IN_STOCK';
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value);
}
