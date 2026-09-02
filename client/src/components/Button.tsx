import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
};

const variants = {
  primary:
    'bg-[var(--forest)] text-[var(--ivory)] hover:bg-[var(--forest-deep)]',
  secondary:
    'border border-[var(--border)] bg-[var(--white)] text-[var(--charcoal)] hover:border-[var(--charcoal)]',
  danger: 'bg-[var(--danger)] text-white hover:bg-[#881337]',
  ghost: 'bg-transparent text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--charcoal)]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs tracking-[0.08em] uppercase',
  md: 'px-4 py-2 text-xs tracking-[0.12em] uppercase',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
