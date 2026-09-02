export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
  createdAt: Date;
  updatedAt: Date;
};

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
};

export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
};
