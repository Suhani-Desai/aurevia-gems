import { useLayoutEffect, useRef, type DependencyList } from 'react';
import gsap from 'gsap';

export function useGsapContext(
  setup: (context: gsap.Context) => void,
  deps: DependencyList = [],
) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      setup(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
