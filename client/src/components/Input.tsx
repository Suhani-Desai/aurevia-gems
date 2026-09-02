import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        id={inputId}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(31,61,58,0.12)] ${
          error ? 'border-[var(--danger)]' : 'border-[var(--border)]'
        } ${className}`}
        {...props}
      />
      {hint && !error ? (
        <span className="text-xs text-stone-500">{hint}</span>
      ) : null}
      {error ? (
        <span className="text-sm text-[var(--danger)]">{error}</span>
      ) : null}
    </label>
  );
}
