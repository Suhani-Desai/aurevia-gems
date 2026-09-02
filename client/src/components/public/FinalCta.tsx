import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSafeReveal } from '../../motion/useSafeReveal';

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  useSafeReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--pearl)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(184,151,90,0.14), transparent 70%), radial-gradient(ellipse 40% 40% at 0% 0%, rgba(13,47,40,0.08), transparent 60%)',
        }}
      />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Business Enquiry</p>
          <div className="gold-rule mt-4" />
          <h2 className="font-display mt-5 text-3xl md:text-4xl lg:text-5xl">
            Building your next
            <span className="block italic text-[var(--emerald-mid)]">
              collection?
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            Tell us what you&apos;re sourcing. We&apos;ll help you find the right
            materials and pieces for your business.
          </p>
        </div>
        <Link to="/contact" className="btn-enquiry" data-reveal>
          Start an Enquiry
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
