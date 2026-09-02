import { InventoryTransactionType } from '@prisma/client';
import { z } from 'zod';

const positiveInt = z.coerce
  .number({ invalid_type_error: 'Quantity must be a number' })
  .int('Quantity must be an integer')
  .positive('Quantity must be a positive integer');

export const productIdParamSchema = z.object({
  productId: z.string().min(1, 'productId is required'),
});

export const stockMovementSchema = z.object({
  productId: z.string().trim().min(1, 'productId is required'),
  quantity: positiveInt,
});

export const transactionQuerySchema = z.object({
  productId: z.string().trim().optional(),
  type: z.nativeEnum(InventoryTransactionType).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type StockMovementInput = z.infer<typeof stockMovementSchema>;
export type TransactionQueryInput = z.infer<typeof transactionQuerySchema>;
