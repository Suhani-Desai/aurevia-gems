import { apiRequest } from './api';
import type { Category } from '../types';

export async function listPublicCategories() {
  const data = await apiRequest<{ categories: Category[] }>('/categories', {
    auth: false,
  });
  return data.categories;
}
