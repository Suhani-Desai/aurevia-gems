import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSafeReveal } from '../../motion/useSafeReveal';

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="border-b border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Business Enquiry</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl">
            Building your next
            <br />
            collection?
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">
            Tell us what you&apos;re sourcing. We&apos;ll help you find the right
            materials and pieces for your business.
          </p>
        </div>
        <Link to="/contact" className="btn-primary" data-reveal>
          Start an Enquiry
        </Link>
      </div>
    </section>
  );
}
