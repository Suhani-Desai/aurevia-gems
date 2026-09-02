import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../controllers/productController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middleware/validate.js';
import { idParamSchema } from '../validators/categoryValidators.js';
import {
  createProductSchema,
  productQuerySchema,
  updateProductSchema,
} from '../validators/productValidators.js';

export const productRoutes = Router();

productRoutes.get('/', validateQuery(productQuerySchema), listProducts);
productRoutes.get('/:id', validateParams(idParamSchema), getProduct);

productRoutes.post(
  '/',
  authenticate,
  validateBody(createProductSchema),
  createProduct,
);
productRoutes.put(
  '/:id',
  authenticate,
  validateParams(idParamSchema),
  validateBody(updateProductSchema),
  updateProduct,
);
productRoutes.delete(
  '/:id',
  authenticate,
  validateParams(idParamSchema),
  deleteProduct,
);
