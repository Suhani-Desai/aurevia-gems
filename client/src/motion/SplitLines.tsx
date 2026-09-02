import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './preferences';

gsap.registerPlugin(ScrollTrigger);

type SplitLinesProps = {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  triggerOnMount?: boolean;
};

export function SplitLines({
  children,
  className = '',
  as = 'h2',
  triggerOnMount = false,
}: SplitLinesProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = Array.from(el.querySelectorAll<HTMLElement>('[data-line]'));
    if (!lines.length) return;

    if (prefersReducedMotion()) {
      gsap.set(lines, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 110, opacity: 0 });

      const tween = gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: triggerOnMount ? 0.15 : 0,
        ...(triggerOnMount
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                once: true,
              },
            }),
      });

      return () => {
        tween.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [children, triggerOnMount]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

type LineProps = {
  children: ReactNode;
  className?: string;
};

export function Line({ children, className = '' }: LineProps) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span data-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}
