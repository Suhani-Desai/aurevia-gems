import { apiRequest } from './api';
import type { Enquiry, EnquiryStatus } from '../types';

export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
};

export async function submitEnquiry(input: EnquiryInput): Promise<void> {
  await apiRequest<{ enquiry: Enquiry }>('/enquiries', {
    method: 'POST',
    body: input,
    auth: false,
  });
}

export async function listEnquiries() {
  const data = await apiRequest<{ enquiries: Enquiry[] }>('/enquiries');
  return data.enquiries;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const data = await apiRequest<{ enquiry: Enquiry }>(`/enquiries/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
  return data.enquiry;
}
