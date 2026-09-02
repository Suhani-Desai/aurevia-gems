import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MediaImage } from '../MediaImage';
import { ImageReveal } from '../../motion/ImageReveal';
import { Line, SplitLines } from '../../motion/SplitLines';
import { isDesktopMotion, prefersReducedMotion } from '../../motion/preferences';
import { siteImages } from '../../utils/productVisual';

gsap.registerPlugin(ScrollTrigger);

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { clipPath: 'inset(6% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 35%',
            scrub: true,
          },
        },
      );

      if (isDesktopMotion()) {
        gsap.to(section.querySelector('[data-craft-image]'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--forest)] text-[var(--ivory)]"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <div>
          <p className="eyebrow">Craftsmanship</p>
          <SplitLines
            as="h2"
            className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl"
          >
            <Line>Material matters.</Line>
            <Line>So does the way it is chosen.</Line>
          </SplitLines>
          <p className="mt-6 max-w-lg text-sm leading-7 text-[rgba(246,241,231,0.72)] md:text-base">
            Every diamond and metal in the Aurevia assortment is selected with
            commercial purpose in mind—cut, composition, and consistency that
            support jewellery programmes across markets.
          </p>
        </div>
        <div data-craft-image>
          <ImageReveal style="frame-expand">
            <MediaImage
              src={siteImages.craft}
              alt="Fine jewellery craftsmanship detail"
              className="aspect-[5/6] w-full"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
