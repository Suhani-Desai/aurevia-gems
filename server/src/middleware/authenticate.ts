import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import type { AuthTokenPayload } from '../types/index.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = header.slice('Bearer '.length).trim();

  if (!token) {
    return next(new AppError('Authentication required', 401));
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return next(new AppError('JWT secret is not configured', 500));
  }

  try {
    const payload = jwt.verify(token, secret) as AuthTokenPayload;
    req.user = payload;
    return next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
}
