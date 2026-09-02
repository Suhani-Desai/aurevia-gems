import { apiRequest, buildQuery } from './api';
import type {
  CreateProductInput,
  Product,
  ProductListQuery,
  UpdateProductInput,
} from '../types';

export async function listProducts(query: ProductListQuery = {}) {
  const data = await apiRequest<{ products: Product[] }>(
    `/products${buildQuery({
      search: query.search,
      categoryId: query.categoryId,
      lowStock: query.lowStock ? true : undefined,
    })}`,
  );
  return data.products;
}

export async function getProduct(id: string) {
  const data = await apiRequest<{ product: Product }>(`/products/${id}`);
  return data.product;
}

export async function createProduct(input: CreateProductInput) {
  const data = await apiRequest<{ product: Product }>('/products', {
    method: 'POST',
    body: input,
  });
  return data.product;
}

export async function updateProduct(id: string, input: UpdateProductInput) {
  const data = await apiRequest<{ product: Product }>(`/products/${id}`, {
    method: 'PUT',
    body: input,
  });
  return data.product;
}

export async function deleteProduct(id: string) {
  return apiRequest<{ id: string }>(`/products/${id}`, {
    method: 'DELETE',
  });
}
