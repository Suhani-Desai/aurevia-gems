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
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl md:text-6xl">
            Let&apos;s talk about your next collection.
          </h1>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10 md:py-20">
          <div>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Share your sourcing requirements and our trade team will respond
              with suitability, availability, and next steps for your business.
            </p>
            <div className="mt-10 space-y-6 border-t border-[var(--border)] pt-8 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--champagne)]">
                  Email
                </p>
                <a
                  href="mailto:trade@aureviagems.com"
                  className="mt-2 block text-[var(--charcoal)]"
                >
                  trade@aureviagems.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--champagne)]">
                  Phone
                </p>
                <a
                  href="tel:+442079460123"
                  className="mt-2 block text-[var(--charcoal)]"
                >
                  +44 20 7946 0123
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--champagne)]">
                  Hours
                </p>
                <p className="mt-2 text-[var(--muted)]">
                  Monday–Friday, 09:00–18:00 GMT
                </p>
              </div>
            </div>
          </div>
          <div>
            <EnquirySection defaultRequirement={requirement} />
          </div>
        </div>
      </section>
    </div>
  );
}
