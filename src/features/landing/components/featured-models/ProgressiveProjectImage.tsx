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
  image,
  title,
  accentColor = '#fff083',
  isActive,
  priority = false,
}: ProgressiveProjectImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [unblurred, setUnblurred] = useState(false);

  useEffect(() => {
    // Check if image is already cached in browser memory
    const testImg = new Image();
    testImg.src = image;
    if (testImg.complete && testImg.naturalWidth > 0) {
      setIsLoaded(true);
      const timer = setTimeout(() => setUnblurred(true), 350);
      return () => clearTimeout(timer);
    }
  }, [image]);

  const handleLoad = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setUnblurred(true);
    }, 400);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950 pointer-events-none">
      {/* 1. Ambient Brand Tone Backdrop: Prevents any black void at 0ms */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 50% 45%, ${accentColor}40 0%, #171717 80%, #0a0a0a 100%)`,
        }}
      />

      {/* 2. Progressive Image: Starts pleasantly blurred, smoothly unblurs to sharp, then clears GPU filter */}
      <img
        src={image}
        alt={title}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 ease-out"
        style={{
          filter: unblurred ? 'none' : isLoaded ? 'blur(0px)' : 'blur(12px)',
          opacity: isLoaded ? 1 : 0.65,
          transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
          transformOrigin: 'center center',
        }}
      />

      {/* 3. Cinematic Vignette & Lighting Overlay (High-performance alpha blend, zero GPU shader filter) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isActive
            ? 'bg-gradient-to-t from-black/85 via-black/25 to-black/10'
            : 'bg-black/55 group-hover:bg-black/35'
        }`}
      />
    </div>
  );
}
