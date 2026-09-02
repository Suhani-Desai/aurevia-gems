import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigationType, useOutlet } from 'react-router-dom';
import gsap from 'gsap';
import { prefersReducedMotion } from './preferences';

export function PageTransition() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigationType = useNavigationType();
  const [displayOutlet, setDisplayOutlet] = useState(outlet);
  const [displayPath, setDisplayPath] = useState(location.pathname);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const animating = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setDisplayOutlet(outlet);
      setDisplayPath(location.pathname);
      return;
    }

    if (location.pathname === displayPath || animating.current) {
      if (location.pathname === displayPath) {
        setDisplayOutlet(outlet);
      }
      return;
    }

    if (prefersReducedMotion()) {
      setDisplayPath(location.pathname);
      setDisplayOutlet(outlet);
      window.scrollTo(0, 0);
      return;
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) {
      setDisplayPath(location.pathname);
      setDisplayOutlet(outlet);
      return;
    }

    animating.current = true;
    const nextOutlet = outlet;
    const nextPath = location.pathname;
    const goingBack = navigationType === 'POP';

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        setDisplayPath(nextPath);
        setDisplayOutlet(nextOutlet);
        window.scrollTo(0, 0);

        requestAnimationFrame(() => {
          gsap.fromTo(
            content,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          );
          gsap.to(overlay, {
            yPercent: goingBack ? -100 : 100,
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => {
              animating.current = false;
            },
          });
        });
      },
    });

    tl.set(overlay, { yPercent: goingBack ? 100 : -100 })
      .to(content, { opacity: 0.4, y: -10, duration: 0.3 }, 0)
      .to(overlay, { yPercent: 0, duration: 0.45 }, 0.05);

    return () => {
      tl.kill();
      animating.current = false;
    };
  }, [location.pathname, outlet, displayPath, navigationType]);

  return (
    <div className="relative">
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[60] bg-[var(--ivory)]"
        style={{ transform: 'translateY(-100%)' }}
        aria-hidden="true"
      />
      <div ref={contentRef}>{displayOutlet}</div>
    </div>
  );
}
