import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { isDesktopMotion, prefersReducedMotion } from './preferences';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className = '',
  strength = 12,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (ref.current) {
        gsap.set(ref.current, { x: 0, y: 0 });
      }
    };
  }, []);

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (!isDesktopMotion() || prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: (x / rect.width) * strength,
      y: (y / rect.height) * strength,
      duration: 0.35,
      ease: 'power3.out',
    });
  }

  function onLeave() {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
