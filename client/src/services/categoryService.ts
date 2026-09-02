import { apiRequest } from './api';
import type { Category, CreateCategoryInput } from '../types';

export async function listCategories() {
  const data = await apiRequest<{ categories: Category[] }>('/categories');
  return data.categories;
}

export async function createCategory(input: CreateCategoryInput) {
  const data = await apiRequest<{ category: Category }>('/categories', {
    method: 'POST',
    body: input,
  });
  return data.category;
}

export async function updateCategory(id: string, input: CreateCategoryInput) {
  const data = await apiRequest<{ category: Category }>(`/categories/${id}`, {
    method: 'PUT',
    body: input,
  });
  return data.category;
}

export async function deleteCategory(id: string) {
  return apiRequest<{ id: string }>(`/categories/${id}`, {
    method: 'DELETE',
  });
}
