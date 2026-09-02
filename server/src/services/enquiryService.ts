import type { EnquiryStatus } from '@prisma/client';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../utils/prisma.js';
import type { CreateEnquiryInput } from '../validators/enquiryValidators.js';

export async function createEnquiry(input: CreateEnquiryInput) {
  return prisma.enquiry.create({
    data: input,
  });
}

export async function listEnquiries() {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const existing = await prisma.enquiry.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Enquiry not found', 404);
  }

  return prisma.enquiry.update({
    where: { id },
    data: { status },
  });
}

export async function countNewEnquiries() {
  return prisma.enquiry.count({ where: { status: 'NEW' } });
}
