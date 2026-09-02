import { z } from 'zod';

export const createEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(120, 'Name must be 120 characters or fewer'),
  company: z
    .string()
    .trim()
    .min(1, 'Company is required')
    .max(160, 'Company must be 160 characters or fewer'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(160, 'Email must be 160 characters or fewer'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .max(40, 'Phone must be 40 characters or fewer'),
  requirement: z
    .string()
    .trim()
    .min(1, 'Requirement is required')
    .max(240, 'Requirement must be 240 characters or fewer'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(4000, 'Message must be 4000 characters or fewer'),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'REVIEWED', 'CLOSED']),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryStatusInput = z.infer<typeof updateEnquiryStatusSchema>;
