import { clearToken, getToken } from '../utils/tokenStorage';
import type { ApiError, ApiSuccess } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export const AUTH_EXPIRED_EVENT = 'nextera:auth-expired';

export class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

function notifyAuthExpired() {
  clearToken();
  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
}

function buildQuery(params?: Record<string, string | boolean | undefined>) {
  if (!params) {
    return '';
  }

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      return;
    }
    search.set(key, String(value));
  });

  const query = search.toString();
  return query ? `?${query}` : '';
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.auth !== false) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiSuccess<T>
    | ApiError
    | null;

  if (!response.ok || !payload || payload.success === false) {
    const message =
      payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : 'Something went wrong';

    if (response.status === 401) {
      notifyAuthExpired();
    }

    throw new ApiRequestError(message, response.status);
  }

  return payload.data;
}

export { buildQuery };
