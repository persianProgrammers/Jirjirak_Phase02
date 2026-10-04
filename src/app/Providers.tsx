import { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from '../animations/gsap';

const queryClient = new QueryClient();

// Sync Lenis with GSAP ScrollTrigger
function GsapLenisIntegration() {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;

    function update(time: number) {
      lenis?.raf(time * 1000);
    }

    // Sync GSAP ticker with Lenis
    gsap.ticker.add(update);
    // Prevent GSAP from lagging behind during scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactLenis root options={{ autoRaf: false }}>
        <GsapLenisIntegration />
        {children}
      </ReactLenis>
    </QueryClientProvider>
  );
}
