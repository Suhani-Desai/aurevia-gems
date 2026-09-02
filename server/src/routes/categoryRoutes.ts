import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateBody,
  validateParams,
} from '../middleware/validate.js';
import {
  createCategorySchema,
  idParamSchema,
  updateCategorySchema,
} from '../validators/categoryValidators.js';

export const categoryRoutes = Router();

categoryRoutes.get('/', listCategories);

categoryRoutes.post(
  '/',
  authenticate,
  validateBody(createCategorySchema),
  createCategory,
);
categoryRoutes.put(
  '/:id',
  authenticate,
  validateParams(idParamSchema),
  validateBody(updateCategorySchema),
  updateCategory,
);
categoryRoutes.delete(
  '/:id',
  authenticate,
  validateParams(idParamSchema),
  deleteCategory,
);
