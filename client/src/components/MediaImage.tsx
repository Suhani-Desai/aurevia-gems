import { useState } from 'react';

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallback?: string;
  soft?: boolean;
};

export function MediaImage({
  src,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  fallback = '/images/fallback.jpg',
  soft = true,
}: MediaImageProps) {
  const [current, setCurrent] = useState(src);

  return (
    <div
      className={`overflow-hidden bg-[var(--pearl-deep)] ${
        soft ? 'media-soft' : ''
      } ${className}`}
    >
      <img
        src={current}
        alt={alt}
        className={`${imgClassName} transition duration-700 ease-out`}
        onError={() => {
          if (current !== fallback) {
            setCurrent(fallback);
          }
        }}
      />
    </div>
  );
}
