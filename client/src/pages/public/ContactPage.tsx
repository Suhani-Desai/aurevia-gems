import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EnquirySection } from '../../components/public/EnquirySection';
import { MediaImage } from '../../components/MediaImage';
import { siteImages } from '../../utils/productVisual';
import { siteContact } from '../../utils/siteContact';

const topics = [
  'Diamond assortment planning',
  'Gold & precious metal sourcing',
  'Private label programmes',
  'Replenishment & availability',
];

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const requirement = useMemo(
    () => searchParams.get('requirement') ?? '',
    [searchParams],
  );

  return (
    <div>
      <section className="surface-dark pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 md:grid-cols-[1fr_1.1fr] md:items-stretch md:gap-10 md:px-10 md:py-12">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="eyebrow">Contact</p>
              <div className="gold-rule mt-4 bg-[var(--gold-soft)]" />
              <h1 className="font-display mt-5 text-4xl md:text-5xl">
                Let&apos;s talk about your next collection.
              </h1>
              <p className="text-muted-on-dark mt-5 text-sm leading-7">
                Share your sourcing requirements and our trade team will respond
                with suitability, availability, and clear next steps.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1rem] bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                  Email
                </p>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="mt-2 block text-sm"
                >
                  {siteContact.email}
                </a>
              </div>
              <div className="rounded-[1rem] bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                  Phone
                </p>
                <a href={siteContact.phoneHref} className="mt-2 block text-sm">
                  {siteContact.phoneDisplay}
                </a>
              </div>
              <div className="rounded-[1rem] bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold-soft)]">
                  Hours
                </p>
                <p className="mt-2 text-sm text-[rgba(242,244,242,0.75)]">
                  {siteContact.hours}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--gold-soft)]">
                Common enquiries
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-xl border border-white/15 px-3 py-1.5 text-[11px] text-[rgba(242,244,242,0.8)]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.14em]">
                <Link to="/collections" className="nav-underline">
                  Browse collections
                </Link>
                <Link to="/materials" className="nav-underline">
                  View materials
                </Link>
                <Link to="/about" className="nav-underline">
                  About Aurevia
                </Link>
              </div>
            </div>
          </div>

          <div className="surface-light rounded-[1.35rem] bg-[var(--pearl)] p-5 md:p-7">
            <p className="eyebrow">Trade enquiry form</p>
            <h2 className="font-display mt-2 text-3xl">Send your brief</h2>
            <div className="mt-5">
              <EnquirySection defaultRequirement={requirement} embedded />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pearl)]">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-10 md:px-10 md:py-12">
          <MediaImage
            src={siteImages.craft}
            alt="Jewellery craftsmanship"
            className="aspect-[16/11] w-full"
          />
          <div>
            <h2 className="font-display text-3xl md:text-4xl">
              What happens after you enquire
            </h2>
            <ol className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]">
              <li>
                <span className="font-medium text-[var(--ink)]">01 — Review.</span>{' '}
                We assess your requirement against current assortment and supply.
              </li>
              <li>
                <span className="font-medium text-[var(--ink)]">02 — Response.</span>{' '}
                You receive suitability notes, availability and recommended next
                steps.
              </li>
              <li>
                <span className="font-medium text-[var(--ink)]">03 — Continue.</span>{' '}
                We support sampling, replenishment planning or programme build-out.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
