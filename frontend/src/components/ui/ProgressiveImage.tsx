import React, { useState, useEffect } from 'react';

// Cache of already loaded full-res image URLs to prevent re-blurring on re-renders
const globalLoadedImageCache = new Set<string>();

export interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  blurClassName?: string;
}

/**
 * ProgressiveImage
 * 
 * لودینگ مترقی و هوشمند تصاویر:
 * ۱. در ابتدا پیش از اتمام دانلود با افکت blur-md و کمی scale ملایم نمایش داده می‌شود.
 * ۲. همزمان یک Image شیء در پس‌زمینه دانلود کامل را زیر نظر می‌گیرد.
 * ۳. به محض تکمیل لود، با transition نرم (duration-700) به کیفیت کامل و واضح سوئیچ می‌شود.
 * ۴. در حافظه موقت ثبت شده تا بازگشت کاربر یا جابجایی صفحه مجدداً تصویر را تار نکند.
 */
export function ProgressiveImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  blurClassName = 'blur-md scale-[1.03]',
  ...imgProps
}: ProgressiveImageProps) {
  const isAlreadyLoaded = globalLoadedImageCache.has(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(isAlreadyLoaded);

  useEffect(() => {
    if (!src) return;

    if (globalLoadedImageCache.has(src)) {
      setIsLoaded(true);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      globalLoadedImageCache.add(src);
      if (isMounted) setIsLoaded(true);
      return;
    }

    img.onload = () => {
      globalLoadedImageCache.add(src);
      if (isMounted) setIsLoaded(true);
    };

    img.onerror = () => {
      // If error occurs, reveal to avoid infinite blur
      if (isMounted) setIsLoaded(true);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <img
        {...imgProps}
        src={src}
        alt={alt}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? 'blur-0 scale-100 opacity-100' : `${blurClassName} opacity-80`
        } ${className}`}
      />
    </div>
  );
}
