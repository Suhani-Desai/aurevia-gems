import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

function mapPrismaError(err: Prisma.PrismaClientKnownRequestError): AppError | null {
  switch (err.code) {
    case 'P2002': {
      const target = Array.isArray(err.meta?.target)
        ? (err.meta?.target as string[]).join(', ')
        : 'field';
      return new AppError(`A record with this ${target} already exists`, 409);
    }
    case 'P2025':
      return new AppError('Record not found', 404);
    case 'P2003':
      return new AppError('Related record not found or is still referenced', 400);
    case 'P2014':
      return new AppError('Cannot delete record because related records exist', 409);
    default:
      return null;
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.flatten(),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const mapped = mapPrismaError(err);
    if (mapped) {
      return res.status(mapped.statusCode).json({
        success: false,
        message: mapped.message,
      });
    }
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}
