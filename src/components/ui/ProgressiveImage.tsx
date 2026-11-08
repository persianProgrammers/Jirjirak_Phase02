/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Jirjirak Studio - Progressive Image Wrapper powered by OptimizedImage
 */

import React from 'react';
import { OptimizedImage, OptimizedImageProps } from './OptimizedImage';

export type ProgressiveImageProps = OptimizedImageProps;

/**
 * ProgressiveImage - Backward-compatible drop-in wrapper powered by the Universal OptimizedImage engine.
 * Automatically resolves modern .webp equivalents, guarantees zero-CLS, and handles lazy loading.
 */
export const ProgressiveImage = React.forwardRef<HTMLImageElement, ProgressiveImageProps>(
  (props, ref) => {
    return <OptimizedImage ref={ref} {...props} />;
  }
);

ProgressiveImage.displayName = 'ProgressiveImage';

export { OptimizedImage };
export default ProgressiveImage;
