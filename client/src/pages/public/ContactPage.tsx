import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EnquirySection } from '../../components/public/EnquirySection';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const requirement = useMemo(
    () => searchParams.get('requirement') ?? '',
    [searchParams],
  );

  return (
    <div>
      <section className="section-atmosphere border-b border-[var(--border)]/60 pt-24">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
          <p className="eyebrow">Contact</p>
          <div className="gold-rule mt-5" />
          <h1 className="font-display mt-6 max-w-3xl text-4xl md:text-6xl lg:text-7xl">
            Let&apos;s talk about your
            <span className="mt-2 block italic text-[var(--emerald-mid)]">
              next collection.
            </span>
          </h1>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:px-10 md:py-24">
          <div>
            <p className="text-[0.95rem] leading-8 text-[var(--muted)]">
              Share your sourcing requirements and our trade team will respond
              with suitability, availability, and next steps for your business.
            </p>
            <div className="mt-12 space-y-8 border-t border-[var(--gold)]/30 pt-10 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                  Email
                </p>
                <a
                  href="mailto:trade@aureviagems.com"
                  className="mt-3 block text-[var(--ink)] transition hover:text-[var(--emerald)]"
                >
                  trade@aureviagems.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                  Phone
                </p>
                <a
                  href="tel:+442079460123"
                  className="mt-3 block text-[var(--ink)] transition hover:text-[var(--emerald)]"
                >
                  +44 20 7946 0123
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
                  Hours
                </p>
                <p className="mt-3 text-[var(--muted)]">
                  Monday–Friday, 09:00–18:00 GMT
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--pearl)] p-6 md:p-10">
            <EnquirySection defaultRequirement={requirement} />
          </div>
        </div>
      </section>
    </div>
  );
}
