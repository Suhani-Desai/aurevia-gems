export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
};

/**
 * Placeholder service for future enquiry API integration.
 * Currently validates and resolves locally without persistence.
 */
export async function submitEnquiry(input: EnquiryInput): Promise<void> {
  await Promise.resolve(input);
}
