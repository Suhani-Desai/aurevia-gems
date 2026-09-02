import { useRef } from 'react';
import { useSafeReveal } from '../../motion/useSafeReveal';

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
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-[var(--surface)]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-16">
        <div className="mb-8 max-w-2xl" data-reveal>
          <p className="eyebrow">Why Aurevia</p>
          <div className="gold-rule mt-4" />
          <h2 className="font-display mt-5 text-3xl md:text-4xl">
            Built for jewellery businesses that value restraint and reliability.
          </h2>
        </div>
        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <article
              key={point.n}
              data-reveal
              className={`border-t border-[var(--gold)]/35 py-8 md:border-t-0 md:border-l md:border-[var(--gold)]/25 md:px-8 md:py-2 ${
                index === 0 ? 'md:border-l-0 md:pl-0' : ''
              }`}
            >
              <p className="font-display text-4xl text-[var(--gold)]">{point.n}</p>
              <h3 className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-[var(--ink)]">
                {point.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
