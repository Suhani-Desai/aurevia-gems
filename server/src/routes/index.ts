import { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { categoryRoutes } from './categoryRoutes.js';
import { dashboardRoutes } from './dashboardRoutes.js';
import { enquiryRoutes } from './enquiryRoutes.js';
import { healthRoutes } from './healthRoutes.js';
import { inventoryRoutes } from './inventoryRoutes.js';
import { productRoutes } from './productRoutes.js';

export const routes = Router();

routes.use('/health', healthRoutes);
routes.use('/auth', authRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/products', productRoutes);
routes.use('/inventory', inventoryRoutes);
routes.use('/dashboard', dashboardRoutes);
routes.use('/enquiries', enquiryRoutes);
