import { z } from 'zod';

const nonNegativeNumber = z.coerce
  .number({ invalid_type_error: 'Must be a number' })
  .finite()
  .min(0, 'Must be greater than or equal to 0');

const nonNegativeInt = z.coerce
  .number({ invalid_type_error: 'Must be a number' })
  .int('Must be an integer')
  .min(0, 'Must be greater than or equal to 0');

export const createProductSchema = z.object({
  sku: z
    .string()
    .trim()
    .min(1, 'SKU is required')
    .max(50, 'SKU must be 50 characters or fewer'),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(200, 'Name must be 200 characters or fewer'),
  categoryId: z.string().trim().min(1, 'categoryId is required'),
  purchasePrice: nonNegativeNumber,
  sellingPrice: nonNegativeNumber,
  currentStock: nonNegativeInt.default(0),
  minimumStock: nonNegativeInt.default(0),
});

export const updateProductSchema = createProductSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field is required' },
);

export const productQuerySchema = z.object({
  search: z.string().trim().optional(),
  categoryId: z.string().trim().optional(),
  lowStock: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => value === 'true'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
