import { Link } from 'react-router-dom';
import { Magnetic } from '../../motion/Magnetic';
import { Line, SplitLines } from '../../motion/SplitLines';

export function FinalCta() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Business Enquiry</p>
          <SplitLines
            as="h2"
            className="font-display mt-4 text-4xl md:text-5xl"
          >
            <Line>Building your next</Line>
            <Line>collection?</Line>
          </SplitLines>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">
            Tell us what you&apos;re sourcing. We&apos;ll help you find the right
            materials and pieces for your business.
          </p>
        </div>
        <Magnetic>
          <Link to="/contact" className="btn-primary">
            Start an Enquiry
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
