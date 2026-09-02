import type { SelectHTMLAttributes } from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
  placeholder?: string;
};

export function Select({
  label,
  options,
  error,
  placeholder,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="block space-y-1.5" htmlFor={selectId}>
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <select
        id={selectId}
        className={`w-full rounded-[0.85rem] border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(31,61,58,0.12)] ${
          error ? 'border-[var(--danger)]' : 'border-[var(--border)]'
        } ${className}`}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-sm text-[var(--danger)]">{error}</span>
      ) : null}
    </label>
  );
}
