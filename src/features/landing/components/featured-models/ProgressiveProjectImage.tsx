import { useState, useEffect } from 'react';

interface ProgressiveProjectImageProps {
  id: string;
  image: string;
  title: string;
  accentColor?: string;
  isActive: boolean;
  priority?: boolean;
}

export function ProgressiveProjectImage({
  id,
  image,
  title,
  accentColor = '#fff083',
  isActive,
  priority = false,
}: ProgressiveProjectImageProps) {
  const [highLoaded, setHighLoaded] = useState(false);
  const [lowLoaded, setLowLoaded] = useState(false);
  const [highError, setHighError] = useState(false);

  const lowSrc = `/assets/images/projects/low/${id}.webp`;
  const medSrc = `/assets/images/projects/med/${id}.webp`;

  useEffect(() => {
    // Check if image is already cached in browser memory
    const img = new Image();
    img.src = medSrc;
    if (img.complete && img.naturalWidth > 0) {
      setHighLoaded(true);
    }
  }, [medSrc]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950">
      {/* 1. Ambient Brand Tone Backdrop: Prevents any black void at 0ms */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 45%, ${accentColor}40 0%, #171717 80%, #0a0a0a 100%)`,
        }}
      />

      {/* 2. Low-Resolution Instant Micro-Thumbnail (1-4 KB) with gentle blur */}
      <img
        src={lowSrc}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="sync"
        onLoad={() => setLowLoaded(true)}
        onError={(e) => {
          // If low-res webp path is unavailable, fallback to original image
          const target = e.currentTarget;
          if (target.src !== image) {
            target.src = image;
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 scale-110 filter blur-[8px] ${
          lowLoaded ? 'opacity-85' : 'opacity-40'
        } ${isActive ? 'scale-115' : 'brightness-85'}`}
      />

      {/* 3. High-Quality Web-Optimized Image with silky progressive cross-fade */}
      <img
        src={highError ? image : medSrc}
        alt={title}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setHighLoaded(true)}
        onError={() => {
          if (!highError) {
            setHighError(true);
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          highLoaded ? 'opacity-100' : 'opacity-0'
        } ${
          isActive ? 'scale-105' : 'scale-120 filter brightness-75 hover:brightness-90'
        }`}
      />

      {/* 4. Cinematic Vignette & Lighting Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isActive
            ? 'bg-gradient-to-t from-black/85 via-black/25 to-black/10'
            : 'bg-black/50 hover:bg-black/30'
        }`}
      />
    </div>
  );
}
