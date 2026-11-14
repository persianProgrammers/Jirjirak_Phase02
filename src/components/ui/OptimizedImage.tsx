/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Jirjirak Architecture - Universal High-Performance Adaptive Image System
 */

import React, { useState, useEffect, useId } from 'react';

// Global cache of verified working URLs to avoid re-testing or layout re-renders
const globalLoadedCache = new Set<string>();
const globalResolvedCache = new Map<string, string>();

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  alt: string;
  /**
   * If true, this image is considered an LCP priority asset:
   * - Sets loading="eager" and fetchPriority="high"
   * - Injects a <link rel="preload"> in <head>
   * - Disables progressive blur delay
   */
  priority?: boolean;
  /**
   * Optional manual aspect ratio (e.g., "16/9", "4/3", "1/1", 1.777) to guarantee zero CLS
   */
  aspectRatio?: string | number;
  /**
   * Classes applied to the inner <img> tag
   */
  className?: string;
  /**
   * Classes applied to the wrapping container
   */
  containerClassName?: string;
  /**
   * Custom blur or placeholder class before image is loaded
   */
  blurClassName?: string;
  /**
   * Custom fallback node if image fails to load
   */
  fallback?: React.ReactNode;
  /**
   * Disable automatic WebP source resolution (defaults to true)
   */
  autoWebp?: boolean;
}

/**
 * Returns an ordered array of candidate URLs to attempt:
 * Starts with modern WebP, then falls back to JPEG/PNG counterparts.
 */
export function getCandidateUrls(src: string, autoWebp = true): string[] {
  if (!src) return [];
  if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) {
    return [src];
  }

  const clean = src.split('?')[0].split('#')[0];
  const isWebp = clean.match(/\.webp$/i);
  const isJpg = clean.match(/\.(jpe?g)$/i);
  const isPng = clean.match(/\.png$/i);

  if (isWebp) {
    const base = src.replace(/\.webp$/i, '');
    return [src, `${base}.jpg`, `${base}.png`, `${base}.jpeg`];
  }

  if (isJpg && autoWebp) {
    const base = src.replace(/\.(jpe?g)$/i, '');
    return [`${base}.webp`, src, `${base}.png`];
  }

  if (isPng && autoWebp) {
    const base = src.replace(/\.png$/i, '');
    return [`${base}.webp`, src, `${base}.jpg`];
  }

  return [src];
}

/**
 * Converts a raster image path (.png, .jpg, .jpeg) to its .webp sibling path.
 * If already .webp, .svg, .gif, or external URL without extension, returns original.
 */
export function getWebpUrl(src: string): string | null {
  if (!src) return null;
  if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) {
    return null;
  }
  const match = src.match(/^(.*)\.(png|jpe?g)$/i);
  if (match) {
    return `${match[1]}.webp`;
  }
  return null;
}

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      priority = false,
      aspectRatio,
      className = '',
      containerClassName = '',
      blurClassName = 'blur-md scale-[1.03] opacity-60',
      fallback,
      autoWebp = true,
      loading: userLoading,
      decoding: userDecoding,
      width,
      height,
      style,
      onLoad,
      onError,
      ...imgProps
    },
    ref
  ) => {
    const candidates = React.useMemo(() => getCandidateUrls(src, autoWebp), [src, autoWebp]);
    const cachedResolved = globalResolvedCache.get(src);
    const initialSrc = cachedResolved || candidates[0] || src;

    const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
    const [candidateIndex, setCandidateIndex] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(
      globalLoadedCache.has(initialSrc) || priority
    );
    const [hasError, setHasError] = useState<boolean>(false);
    const imgId = useId();

    // Preload LCP priority image in document head
    useEffect(() => {
      if (!priority || !currentSrc || typeof document === 'undefined') return;

      const existingPreload = document.querySelector(`link[rel="preload"][href="${currentSrc}"]`);
      if (existingPreload) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = currentSrc;
      if (currentSrc.endsWith('.webp')) link.type = 'image/webp';
      document.head.appendChild(link);
    }, [priority, currentSrc]);

    // Track loading & resolve candidate fallback asynchronously
    useEffect(() => {
      if (!src) return;
      const cached = globalResolvedCache.get(src);
      if (cached) {
        setCurrentSrc(cached);
        setIsLoaded(true);
        setHasError(false);
        return;
      }

      let isMounted = true;
      let currentIndex = 0;

      const tryNext = () => {
        if (!isMounted) return;
        if (currentIndex >= candidates.length) {
          setHasError(true);
          setIsLoaded(true);
          return;
        }

        const candidate = candidates[currentIndex];
        const tester = new Image();
        tester.src = candidate;

        if (tester.complete && tester.naturalWidth > 0) {
          globalLoadedCache.add(candidate);
          globalResolvedCache.set(src, candidate);
          setCurrentSrc(candidate);
          setIsLoaded(true);
          setHasError(false);
          return;
        }

        tester.onload = () => {
          if (!isMounted) return;
          globalLoadedCache.add(candidate);
          globalResolvedCache.set(src, candidate);
          setCurrentSrc(candidate);
          setIsLoaded(true);
          setHasError(false);
        };

        tester.onerror = () => {
          currentIndex++;
          tryNext();
        };
      };

      tryNext();

      return () => {
        isMounted = false;
      };
    }, [src, candidates]);

    const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      globalLoadedCache.add(currentSrc);
      globalResolvedCache.set(src, currentSrc);
      setIsLoaded(true);
      setHasError(false);
      if (onLoad) onLoad(e);
    };

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const nextIndex = candidateIndex + 1;
      if (nextIndex < candidates.length) {
        const nextUrl = candidates[nextIndex];
        setCandidateIndex(nextIndex);
        setCurrentSrc(nextUrl);
      } else {
        setHasError(true);
        setIsLoaded(true);
        if (onError) onError(e);
      }
    };

    const containerStyle: React.CSSProperties = {
      ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
    };

    return (
      <div
        className={`relative overflow-hidden ${containerClassName}`}
        style={containerStyle}
      >
        {/* Subtle Skeleton Placeholder behind image to prevent white flash */}
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 bg-neutral-800/30 animate-pulse pointer-events-none -z-10"
            aria-hidden="true"
          />
        )}

        {hasError ? (
          fallback ? (
            <>{fallback}</>
          ) : (
            <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 text-center bg-neutral-900/50 border border-white/5 rounded-xl text-xs text-neutral-400">
              <span className="opacity-60 mb-1">🖼️</span>
              <span className="truncate max-w-[200px]">{alt || 'Image'}</span>
            </div>
          )
        ) : (
          <img
            ref={ref}
            id={imgId}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : (userLoading || 'lazy')}
            decoding={priority ? 'sync' : (userDecoding || 'async')}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleImgLoad}
            onError={handleImgError}
            className={`w-full h-full transition-all duration-700 ease-out ${
              isLoaded ? 'blur-0 scale-100 opacity-100' : `${blurClassName}`
            } ${className}`}
            style={style}
            {...imgProps}
          />
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
