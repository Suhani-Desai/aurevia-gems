import { Router } from 'express';
import {
  adjustStock,
  listLowStock,
  listTransactions,
  listTransactionsByProduct,
  stockIn,
  stockOut,
} from '../controllers/inventoryController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middleware/validate.js';
import {
  productIdParamSchema,
  stockAdjustmentSchema,
  stockMovementSchema,
  transactionQuerySchema,
} from '../validators/inventoryValidators.js';

export const inventoryRoutes = Router();

inventoryRoutes.use(authenticate);

inventoryRoutes.post(
  '/stock-in',
  validateBody(stockMovementSchema),
  stockIn,
);
inventoryRoutes.post(
  '/stock-out',
  validateBody(stockMovementSchema),
  stockOut,
);
inventoryRoutes.post(
  '/adjust',
  validateBody(stockAdjustmentSchema),
  adjustStock,
);
inventoryRoutes.get(
  '/transactions',
  validateQuery(transactionQuerySchema),
  listTransactions,
);
inventoryRoutes.get(
  '/transactions/:productId',
  validateParams(productIdParamSchema),
  listTransactionsByProduct,
);
inventoryRoutes.get('/low-stock', listLowStock);
