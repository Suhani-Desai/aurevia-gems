import { Router } from 'express';
import { login, me } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema } from '../validators/authValidators.js';

export const authRoutes = Router();

authRoutes.post('/login', validateBody(loginSchema), login);
authRoutes.get('/me', authenticate, me);
