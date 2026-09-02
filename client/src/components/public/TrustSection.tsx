import { Line, SplitLines } from '../../motion/SplitLines';

const points = [
  {
    n: '01',
    title: 'Quality',
    description: 'Carefully selected materials and stones.',
  },
  {
    n: '02',
    title: 'Global Reach',
    description: 'Built for international jewellery businesses.',
  },
  {
    n: '03',
    title: 'Reliable Supply',
    description: 'Consistency from selection to delivery.',
  },
  {
    n: '04',
    title: 'Business Partnership',
    description: 'A long-term approach to B2B relationships.',
  },
];

export function TrustSection() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--ivory)]">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-14 max-w-xl">
          <p className="eyebrow">Why Aurevia</p>
          <SplitLines
            as="h2"
            className="font-display mt-4 text-4xl md:text-5xl"
          >
            <Line>Built for jewellery businesses</Line>
            <Line>that value restraint and reliability.</Line>
          </SplitLines>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {points.map((point) => (
            <article
              key={point.n}
              className="border-t border-[var(--champagne)]/50 pt-5 transition duration-500 hover:-translate-y-1"
            >
              <p className="text-[11px] tracking-[0.2em] text-[var(--champagne)]">
                {point.n}
              </p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--charcoal)]">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
