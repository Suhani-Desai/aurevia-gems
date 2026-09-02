import { useCallback, useEffect, useState } from 'react';
import { Badge } from '../components/Badge';
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components/Feedback';
import { ApiRequestError } from '../services/api';
import * as enquiryService from '../services/enquiryService';
import type { Enquiry, EnquiryStatus } from '../types';
import { formatDateTime } from '../utils/format';

const statusVariant: Record<
  EnquiryStatus,
  'neutral' | 'success' | 'warning'
> = {
  NEW: 'warning',
  REVIEWED: 'neutral',
  CLOSED: 'success',
};

export function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setEnquiries(await enquiryService.listEnquiries());
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to load enquiries.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(id: string, status: EnquiryStatus) {
    setUpdatingId(id);
    setError('');
    try {
      const updated = await enquiryService.updateEnquiryStatus(id, status);
      setEnquiries((rows) =>
        rows.map((row) => (row.id === id ? updated : row)),
      );
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : 'Unable to update enquiry status.',
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) return <LoadingState label="Loading enquiries..." />;
  if (error && enquiries.length === 0) {
    return <ErrorState message={error} onRetry={() => void load()} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Trade desk</p>
        <h1 className="font-display mt-2 text-3xl md:text-4xl">Enquiries</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Submissions from the public contact form appear here.
        </p>
      </div>

      {error ? (
        <p className="text-sm text-[var(--danger)]">{error}</p>
      ) : null}

      {enquiries.length === 0 ? (
        <EmptyState
          title="No enquiries yet"
          description="When a visitor submits the contact form, it will show up in this list."
        />
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <article
              key={enquiry.id}
              className="rounded-[0.85rem] border border-[var(--border)] bg-[var(--white)] p-5 md:p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="truncate text-lg font-medium">
                      {enquiry.name}
                    </h2>
                    <Badge variant={statusVariant[enquiry.status]}>
                      {enquiry.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {enquiry.company} · {formatDateTime(enquiry.createdAt)}
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="text-[var(--muted)]">Requirement: </span>
                    {enquiry.requirement}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--ink)]">
                    {enquiry.message}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-[var(--emerald)] underline-offset-2 hover:underline"
                    >
                      {enquiry.email}
                    </a>
                    <a
                      href={`tel:${enquiry.phone.replace(/\s+/g, '')}`}
                      className="text-[var(--emerald)] underline-offset-2 hover:underline"
                    >
                      {enquiry.phone}
                    </a>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {(['NEW', 'REVIEWED', 'CLOSED'] as EnquiryStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={
                          updatingId === enquiry.id || enquiry.status === status
                        }
                        className="btn-ghost !min-h-9 !px-3 !text-[10px]"
                        onClick={() => void setStatus(enquiry.id, status)}
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
