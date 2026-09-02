import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { MediaImage } from '../MediaImage';
import { prefersReducedMotion } from '../../motion/preferences';
import { siteImages } from '../../utils/productVisual';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const targets = [
      eyebrowRef.current,
      headingRef.current,
      copyRef.current,
      ctaRef.current,
      imageWrapRef.current,
    ].filter(Boolean);

    const failsafe = window.setTimeout(() => {
      gsap.set(targets, { clearProps: 'all' });
    }, 2500);

    const ctx = gsap.context(() => {
      const image = imageWrapRef.current;

      // Content is already visible in CSS. Enhance only — clearProps on finish.
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.03 },
          {
            scale: 1,
            duration: 1.35,
            ease: 'power2.out',
            clearProps: 'transform',
          },
        );
      }

      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, copyRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all',
          delay: 0.15,
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
      className="relative min-h-[100svh] overflow-hidden bg-[var(--charcoal)] text-[var(--ivory)]"
    >
      <div ref={imageWrapRef} className="absolute inset-0" data-hero-image>
        <MediaImage
          src={siteImages.hero}
          alt="Diamond jewellery composition for Aurevia Gems"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,40,33,0.82)] via-[rgba(15,40,33,0.42)] to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-10 md:pb-24">
        <div className="max-w-xl">
          <p
            ref={eyebrowRef}
            className="eyebrow text-[var(--champagne)]"
          >
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
          <h1
            ref={headingRef}
            className="font-display mt-5 text-5xl text-[var(--ivory)] md:text-6xl lg:text-7xl"
          >
            Exceptional stones.
            <br />
            Endless possibilities.
          </h1>
          <p
            ref={copyRef}
            className="mt-6 max-w-md text-sm leading-7 text-[rgba(246,241,231,0.78)] md:text-base"
          >
            Premium diamonds and fine jewellery materials for brands, retailers
            and creators worldwide.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <Link to="/collections" className="btn-primary">
              Explore Collection
            </Link>
            <Link to="/contact" className="btn-ghost btn-ghost-light">
              Request an Enquiry
            </Link>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3 md:absolute md:bottom-10 md:left-10 md:mt-0">
          <div className="scroll-hint" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-[rgba(246,241,231,0.55)]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
