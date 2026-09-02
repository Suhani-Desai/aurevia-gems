import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './preferences';

gsap.registerPlugin(ScrollTrigger);

type RevealStyle = 'mask-y' | 'zoom-settle' | 'frame-expand' | 'rise';

type ImageRevealProps = {
  children: ReactNode;
  style?: RevealStyle;
  className?: string;
  delay?: number;
};

export function ImageReveal({
  children,
  style = 'mask-y',
  className = '',
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'all', opacity: 1 });
      return;
    }

    const img = el.querySelector('img');
    const ctx = gsap.context(() => {
      if (style === 'mask-y') {
        gsap.fromTo(
          el,
          { clipPath: 'inset(12% 0 12% 0)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0 0% 0)',
            opacity: 1,
            duration: 1.2,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              once: true,
            },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.35,
              delay,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                once: true,
              },
            },
          );
        }
      }

      if (style === 'zoom-settle') {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          },
        );
      }

      if (style === 'frame-expand') {
        gsap.fromTo(
          el,
          { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0.65 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.25,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          },
        );
      }

      if (style === 'rise') {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, [style, delay]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
