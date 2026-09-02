import { Link } from 'react-router-dom';
import { MediaImage } from '../../components/MediaImage';
import { siteImages } from '../../utils/productVisual';

const pillars = [
  {
    title: 'Selection with intent',
    copy: 'Every stone and metal is chosen for commercial clarity—cut, composition and consistency that support real jewellery programmes.',
  },
  {
    title: 'Transparent partnership',
    copy: 'We communicate availability, suitability and timelines with the same care we bring to material selection.',
  },
  {
    title: 'Global trade readiness',
    copy: 'Built for retailers, brands and creators who need reliable supply across markets, not seasonal spectacle.',
  },
];

export function AboutPage() {
  return (
    <div>
      <section className="bg-[var(--emerald)] pt-24 text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 md:grid-cols-2 md:items-end md:gap-12 md:px-10 md:py-14">
          <div>
            <p className="eyebrow text-[var(--gold-soft)]">About Aurevia</p>
            <div className="gold-rule mt-4 bg-[var(--gold-soft)]" />
            <h1 className="font-display mt-5 text-4xl text-white md:text-5xl lg:text-6xl">
              A jewellery house standard for modern trade.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/75 md:pb-2">
            Aurevia Gems partners with jewellery businesses that value restraint,
            reliability and materials chosen with purpose.
          </p>
        </div>
      </section>

      <section className="bg-[var(--pearl)]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:px-10 md:py-14">
          <MediaImage
            src={siteImages.brandIntro}
            alt="Diamond detail"
            className="aspect-[5/4] w-full"
          />
          <div>
            <h2 className="font-display text-3xl md:text-4xl">
              Precision in every stone. Purpose in every collection.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              We work with jewellery houses that require clarity in sourcing and
              consistency in quality. Our assortment spans diamonds and fine
              metals selected for enduring commercial collections.
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              From first enquiry to ongoing supply, the focus remains the same:
              refined selection, transparent communication, and long-term
              relationships.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/collections" className="btn-primary">
                View Collections
              </Link>
              <Link to="/#about" className="btn-ghost">
                See on homepage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-14">
          <p className="eyebrow">How we work</p>
          <h2 className="font-display mt-4 text-3xl md:text-4xl">
            Built for partners who trade in trust.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((item) => (
              <article
                key={item.title}
                className="border-t border-[var(--gold)]/40 pt-5"
              >
                <h3 className="text-sm font-medium uppercase tracking-[0.14em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pearl)]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">
              Ready to discuss your next collection?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--muted)]">
              Tell us what you are sourcing—our trade team will respond with
              suitability and next steps.
            </p>
          </div>
          <Link to="/contact" className="btn-enquiry w-fit">
            Request an Enquiry
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
