import { Router } from 'express';
import { getSummary } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/authenticate.js';

export const dashboardRoutes = Router();

dashboardRoutes.use(authenticate);

dashboardRoutes.get('/summary', getSummary);
