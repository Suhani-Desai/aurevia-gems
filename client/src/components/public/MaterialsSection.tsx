import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MediaImage } from '../MediaImage';
import {
  isDesktopMotion,
  prefersReducedMotion,
} from '../../motion/preferences';
import { siteImages } from '../../utils/productVisual';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    n: '01',
    name: 'Diamonds',
    description: 'Cut with precision. Selected for brilliance.',
    image: siteImages.materials.Diamonds,
  },
  {
    n: '02',
    name: 'Gold',
    description: 'Timeless material for enduring collections.',
    image: siteImages.materials.Gold,
  },
  {
    n: '03',
    name: 'Silver',
    description: 'Refined versatility for modern jewellery.',
    image: siteImages.materials.Silver,
  },
  {
    n: '04',
    name: 'Platinum',
    description: 'Rare, enduring and quietly distinctive.',
    image: siteImages.materials.Platinum,
  },
];

export function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion() || !isDesktopMotion()) {
      return;
    }

    const slides = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll('[data-material-slide]'),
    );
    const images = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll('[data-material-image]'),
    );

    gsap.set(slides, { opacity: 0, y: 28 });
    gsap.set(slides[0], { opacity: 1, y: 0 });
    gsap.set(images, { opacity: 0, scale: 1.08, clipPath: 'inset(8% 8%)' });
    gsap.set(images[0], { opacity: 1, scale: 1, clipPath: 'inset(0% 0%)' });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * materials.length}`,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.min(
            materials.length - 1,
            Math.floor(self.progress * materials.length),
          );

          if (index !== activeRef.current) {
            activeRef.current = index;
            setActive(index);
          }

          slides.forEach((slide, i) => {
            gsap.to(slide, {
              opacity: i === index ? 1 : 0,
              y: i === index ? 0 : 24,
              duration: 0.35,
              overwrite: 'auto',
            });
          });

          images.forEach((image, i) => {
            gsap.to(image, {
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.08,
              clipPath: i === index ? 'inset(0% 0%)' : 'inset(10% 8%)',
              duration: 0.5,
              overwrite: 'auto',
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="materials"
      ref={sectionRef}
      className="scroll-mt-24 bg-[var(--surface)]"
    >
      {/* Desktop cinematic pin experience */}
      <div className="relative hidden min-h-screen lg:block">
        <div className="absolute inset-0">
          {materials.map((item) => (
            <div
              key={item.name}
              data-material-image
              className="absolute inset-0 overflow-hidden"
            >
              <MediaImage
                src={item.image}
                alt={`${item.name} material`}
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(15,40,33,0.42)]" />
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] items-end px-10 pb-20">
          <div className="relative min-h-[220px] max-w-xl text-[var(--ivory)]">
            {materials.map((item) => (
              <div
                key={item.name}
                data-material-slide
                className="absolute inset-x-0 bottom-0"
              >
                <p className="text-[11px] tracking-[0.22em] text-[var(--champagne)]">
                  {item.n}
                </p>
                <h3 className="font-display mt-4 text-6xl">{item.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[rgba(246,241,231,0.78)]">
                  {item.description}
                </p>
                <Link
                  to={`/collections?material=${encodeURIComponent(item.name)}`}
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.16em] underline-offset-4 hover:underline"
                >
                  Explore {item.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="ml-auto flex gap-3 self-end">
            {materials.map((item, index) => (
              <span
                key={item.name}
                className={`h-px w-10 transition ${
                  active === index ? 'bg-[var(--champagne)]' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet simplified layout */}
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-24 lg:hidden">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Materials</p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl">
            Diamonds and fine metals for modern jewellery houses.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {materials.map((item) => (
            <Link
              key={item.name}
              to={`/collections?material=${encodeURIComponent(item.name)}`}
              className="group relative min-h-[320px] overflow-hidden"
            >
              <MediaImage
                src={item.image}
                alt={`${item.name} material`}
                className="absolute inset-0 h-full w-full media-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,40,33,0.88)] via-[rgba(15,40,33,0.25)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] tracking-[0.22em] text-[var(--champagne)]">
                  {item.n}
                </p>
                <h3 className="font-display mt-3 text-3xl text-[var(--ivory)]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[rgba(246,241,231,0.75)]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
