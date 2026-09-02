type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger';

const styles: Record<BadgeVariant, string> = {
  neutral: 'bg-[var(--surface)] text-[var(--muted)]',
  success: 'bg-[rgba(31,92,69,0.1)] text-[var(--success)]',
  warning: 'bg-[rgba(146,97,10,0.1)] text-[var(--warning)]',
  danger: 'bg-[rgba(159,18,57,0.08)] text-[var(--danger)]',
};

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
