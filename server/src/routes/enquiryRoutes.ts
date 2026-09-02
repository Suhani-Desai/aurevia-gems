import { Router } from 'express';
import {
  createEnquiry,
  listEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateBody,
  validateParams,
} from '../middleware/validate.js';
import { idParamSchema } from '../validators/categoryValidators.js';
import {
  createEnquirySchema,
  updateEnquiryStatusSchema,
} from '../validators/enquiryValidators.js';

export const enquiryRoutes = Router();

enquiryRoutes.post('/', validateBody(createEnquirySchema), createEnquiry);

enquiryRoutes.get('/', authenticate, listEnquiries);

enquiryRoutes.patch(
  '/:id/status',
  authenticate,
  validateParams(idParamSchema),
  validateBody(updateEnquiryStatusSchema),
  updateEnquiryStatus,
);
