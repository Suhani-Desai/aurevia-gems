import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { MediaImage } from '../MediaImage';
import { prefersReducedMotion } from '../../motion/preferences';
import { siteImages } from '../../utils/productVisual';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const targets = [
      brandRef.current,
      headingRef.current,
      copyRef.current,
      ctaRef.current,
      imageWrapRef.current,
    ].filter(Boolean);

    const failsafe = window.setTimeout(() => {
      gsap.set(targets, { clearProps: 'all' });
    }, 2500);

    const ctx = gsap.context(() => {
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { scale: 1.03 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            clearProps: 'transform',
          },
        );
      }

      gsap.fromTo(
        [brandRef.current, headingRef.current, copyRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all',
          delay: 0.12,
        },
      );
    }, section);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      gsap.set(targets, { clearProps: 'all' });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--onyx)] text-[var(--pearl)]"
    >
      <div ref={imageWrapRef} className="absolute inset-0">
        <MediaImage
          src={siteImages.hero}
          alt="Diamond jewellery composition for Aurevia Gems"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover object-[center_30%] opacity-80"
          soft={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,15,13,0.55)] via-[rgba(11,15,13,0.25)] to-[rgba(11,15,13,0.78)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(13,47,40,0.55)] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 md:justify-end md:px-10 md:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          <p
            ref={brandRef}
            className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] text-[var(--pearl)]"
          >
            Aurevia Gems
          </p>
          <h1
            ref={headingRef}
            className="mt-6 max-w-xl text-lg font-light leading-8 text-[rgba(242,244,242,0.82)] md:text-xl md:leading-9"
          >
            Exceptional stones. Endless possibilities.
          </h1>
          <p
            ref={copyRef}
            className="mt-5 max-w-md text-sm leading-7 text-[rgba(242,244,242,0.68)]"
          >
            Premium diamonds and fine jewellery materials for brands, retailers
            and creators worldwide.
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-3">
            <Link to="/collections" className="btn-primary">
              Explore Collection
            </Link>
            <Link to="/contact" className="btn-enquiry btn-enquiry-light">
              Request an Enquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 md:absolute md:bottom-10 md:right-10 md:mt-0">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[rgba(242,244,242,0.5)]">
            Scroll
          </span>
          <div className="scroll-hint" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
