import type { ReactNode } from 'react';

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white px-5 py-10 text-center text-sm text-stone-500">
      {label}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--border)] bg-white px-5 py-10 text-center">
      <h3 className="text-base font-semibold text-stone-900">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-stone-500">{description}</p>
      ) : null}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-800">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 font-medium underline underline-offset-2"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-stone-500">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Alert({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'success' | 'info';
  children: ReactNode;
}) {
  const classes =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : tone === 'info'
        ? 'border-stone-200 bg-stone-50 text-stone-700'
        : 'border-rose-200 bg-rose-50 text-rose-800';

  return (
    <div className={`rounded-md border px-3 py-2 text-sm ${classes}`}>
      {children}
    </div>
  );
}
