import { useLayoutEffect, useRef } from 'react';
import { MediaImage } from '../MediaImage';
import { ImageReveal } from '../../motion/ImageReveal';
import { Line, SplitLines } from '../../motion/SplitLines';
import { prefersReducedMotion, isDesktopMotion } from '../../motion/preferences';
import { siteImages } from '../../utils/productVisual';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion() || !isDesktopMotion()) return;

    const image = section.querySelector('[data-brand-image]');
    const heading = section.querySelector('[data-brand-copy]');

    const ctx = gsap.context(() => {
      gsap.to(image, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(heading, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 border-b border-[var(--border)]"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <div data-brand-copy>
          <p className="eyebrow">The Aurevia Standard</p>
          <SplitLines
            as="h2"
            className="font-display mt-4 text-4xl text-[var(--charcoal)] md:text-5xl"
          >
            <Line>Precision in every stone.</Line>
            <Line>Purpose in every collection.</Line>
          </SplitLines>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-base">
            Aurevia Gems partners with jewellery houses that require clarity in
            sourcing, consistency in quality, and materials chosen for real
            commercial collections—not seasonal spectacle.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)] md:text-base">
            From diamonds to precious metals, our focus remains the same:
            refined selection, transparent communication, and long-term supply
            relationships.
          </p>
        </div>
        <div data-brand-image>
          <ImageReveal style="mask-y">
            <MediaImage
              src={siteImages.brandIntro}
              alt="Close detail of a diamond gemstone"
              className="aspect-[4/5] w-full"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
