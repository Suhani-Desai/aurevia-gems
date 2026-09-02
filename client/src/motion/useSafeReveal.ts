import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './preferences';

gsap.registerPlugin(ScrollTrigger);

/**
 * Subtle scroll entrance. Content stays fully visible in CSS until onEnter.
 * Never pre-hides elements with gsap.set / gsap.from + ScrollTrigger.
 */
export function useSafeReveal(
  rootRef: RefObject<HTMLElement | null>,
  selector = '[data-reveal]',
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(selector),
      );

      elements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 20, opacity: 0.85 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power2.out',
                clearProps: 'all',
                overwrite: 'auto',
              },
            );
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [selector]);
}
