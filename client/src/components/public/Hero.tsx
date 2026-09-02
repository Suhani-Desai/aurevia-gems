import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MediaImage } from '../MediaImage';
import { Magnetic } from '../../motion/Magnetic';
import { Line } from '../../motion/SplitLines';
import { prefersReducedMotion } from '../../motion/preferences';
import { siteImages } from '../../utils/productVisual';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const image = imageWrapRef.current;
      const eyebrow = section.querySelector('[data-hero-eyebrow]');
      const lines = section.querySelectorAll('[data-line]');

      gsap.set(image, {
        clipPath: 'inset(18% 12% 18% 12%)',
        scale: 1.14,
      });
      gsap.set(eyebrow, { opacity: 0, y: 18 });
      gsap.set(lines, { yPercent: 110, opacity: 0 });
      gsap.set([copyRef.current, ctaRef.current, scrollRef.current], {
        opacity: 0,
        y: 24,
      });

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .to(
          image,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1.04,
            duration: 1.45,
          },
          0,
        )
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
          },
          0.45,
        )
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.65 }, 1.0)
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.15);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(image, { scale: 1.12, yPercent: 8, ease: 'none' }, 0)
        .to(
          contentRef.current,
          { yPercent: -18, opacity: 0.15, ease: 'none' },
          0,
        )
        .to(copyRef.current, { opacity: 0, y: -30, ease: 'none' }, 0)
        .to(ctaRef.current, { opacity: 0, y: -20, ease: 'none' }, 0.05);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--charcoal)] text-[var(--ivory)]"
    >
      <div
        ref={imageWrapRef}
        className="absolute inset-0 will-change-transform"
        data-hero-image
      >
        <MediaImage
          src={siteImages.hero}
          alt="Diamond jewellery composition for Aurevia Gems"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,40,33,0.82)] via-[rgba(15,40,33,0.42)] to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-10 md:pb-24"
      >
        <div className="max-w-xl">
          <p
            data-hero-eyebrow
            className="eyebrow text-[var(--champagne)]"
          >
            Fine Diamonds &amp; Jewellery for Global Trade
          </p>
          <h1 className="font-display mt-5 text-5xl text-[var(--ivory)] md:text-6xl lg:text-7xl">
            <Line>Exceptional stones.</Line>
            <Line>Endless possibilities.</Line>
          </h1>
          <p
            ref={copyRef}
            className="mt-6 max-w-md text-sm leading-7 text-[rgba(246,241,231,0.78)] md:text-base"
          >
            Premium diamonds and fine jewellery materials for brands, retailers
            and creators worldwide.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link to="/collections" className="btn-primary">
                Explore Collection
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="btn-ghost btn-ghost-light">
                Request an Enquiry
              </Link>
            </Magnetic>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-16 flex items-center gap-3 md:absolute md:bottom-10 md:left-10 md:mt-0"
        >
          <div className="scroll-hint" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-[rgba(246,241,231,0.55)]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
