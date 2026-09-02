import { apiRequest } from './api';
import type { DashboardSummary } from '../types';

export async function getDashboardSummary() {
  const data = await apiRequest<{ summary: DashboardSummary }>(
    '/dashboard/summary',
  );
  return data.summary;
}
