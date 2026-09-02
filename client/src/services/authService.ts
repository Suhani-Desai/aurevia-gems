import { apiRequest } from './api';
import type { AuthResponse, User } from '../types';

export async function login(email: string, password: string) {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export async function getCurrentUser() {
  const data = await apiRequest<{ user: User }>('/auth/me');
  return data.user;
}
