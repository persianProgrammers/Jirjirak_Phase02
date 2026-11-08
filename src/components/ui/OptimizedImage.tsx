/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Jirjirak Architecture - Universal High-Performance Adaptive Image System
 */

import React, { useState, useEffect, useRef, useId } from 'react';

// Global cache of loaded images to avoid re-blurring on re-render / route navigation
const globalLoadedCache = new Set<string>();

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  alt: string;
  /**
   * If true, this image is considered an LCP (Largest Contentful Paint) priority asset:
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
 * Converts a raster image path (.png, .jpg, .jpeg) to its .webp sibling path.
 * If already .webp, .svg, .gif, or external URL without extension, returns original.
 */
export function getWebpUrl(src: string): string | null {
  if (!src) return null;
  // External or data URLs
  if (src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('http://') || src.startsWith('https://')) {
    // If external has .png or .jpg, we still might not have control, so return null unless local proxy
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
    const isAlreadyLoaded = globalLoadedCache.has(src);
    const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyLoaded || priority);
    const [hasError, setHasError] = useState<boolean>(false);
    const imgId = useId();

    const webpSrc = autoWebp ? getWebpUrl(src) : null;
    const effectiveSrc = webpSrc || src;

    // Preload LCP priority image in document head
    useEffect(() => {
      if (!priority || !src || typeof document === 'undefined') return;

      const hrefToPreload = effectiveSrc;
      const existingPreload = document.querySelector(`link[rel="preload"][href="${hrefToPreload}"]`);
      if (existingPreload) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = hrefToPreload;
      if (webpSrc) link.type = 'image/webp';
      document.head.appendChild(link);

      return () => {
        // Keep in head for cache lifecycle
      };
    }, [priority, src, effectiveSrc, webpSrc]);

    // Track loading state
    useEffect(() => {
      if (!src) return;

      if (globalLoadedCache.has(src) || globalLoadedCache.has(effectiveSrc)) {
        setIsLoaded(true);
        return;
      }

      let isMounted = true;
      const tester = new Image();
      tester.src = effectiveSrc;

      if (tester.complete && tester.naturalWidth > 0) {
        globalLoadedCache.add(src);
        globalLoadedCache.add(effectiveSrc);
        if (isMounted) setIsLoaded(true);
        return;
      }

      tester.onload = () => {
        globalLoadedCache.add(src);
        globalLoadedCache.add(effectiveSrc);
        if (isMounted) setIsLoaded(true);
      };

      tester.onerror = () => {
        // If WebP fails, try original src fallback
        if (webpSrc && effectiveSrc !== src) {
          const fallbackTester = new Image();
          fallbackTester.src = src;
          fallbackTester.onload = () => {
            globalLoadedCache.add(src);
            if (isMounted) setIsLoaded(true);
          };
          fallbackTester.onerror = () => {
            if (isMounted) {
              setHasError(true);
              setIsLoaded(true);
            }
          };
        } else {
          if (isMounted) {
            setHasError(true);
            setIsLoaded(true);
          }
        }
      };

      return () => {
        isMounted = false;
      };
    }, [src, effectiveSrc, webpSrc]);

    const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      globalLoadedCache.add(src);
      setIsLoaded(true);
      if (onLoad) onLoad(e);
    };

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      setIsLoaded(true);
      if (onError) onError(e);
    };

    const containerStyle: React.CSSProperties = {
      ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
    };

    return (
      <div
        className={`relative overflow-hidden ${containerClassName}`}
        style={containerStyle}
      >
        {/* Subtle Skeleton Placeholder behind image to prevent jarring white flash */}
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
          <picture className="w-full h-full block">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              ref={ref}
              id={imgId}
              src={src}
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
          </picture>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
