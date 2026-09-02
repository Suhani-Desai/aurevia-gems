import { apiRequest, buildQuery } from './api';
import type { Product, ProductListQuery } from '../types';

export async function listPublicProducts(query: ProductListQuery = {}) {
  const data = await apiRequest<{ products: Product[] }>(
    `/products${buildQuery({
      search: query.search,
      categoryId: query.categoryId,
      lowStock: query.lowStock ? true : undefined,
    })}`,
    { auth: false },
  );
  return data.products;
}

export async function getPublicProduct(id: string) {
  const data = await apiRequest<{ product: Product }>(`/products/${id}`, {
    auth: false,
  });
  return data.product;
}
