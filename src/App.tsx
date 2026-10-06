/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Jirjirak Studio - Core Master Application Entry Point
 */

import React, { Component, ReactNode, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from './animations/gsap';

// Core Layout & All Architectural Pages
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Journal from './pages/Journal';
import JournalDetail from './pages/JournalDetail';
import DepartmentDetail from './pages/DepartmentDetail';

// ============================================================================
// 1. GLOBAL QUERY CLIENT
// ============================================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// ============================================================================
// 2. SMOOTH SCROLL INTEGRATION: GSAP ScrollTrigger + Lenis
// ============================================================================
function GsapLenisIntegration() {
  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    if (!lenis) return;

    function update(time: number) {
      lenis?.raf(time * 1000);
    }

    // Sync GSAP ticker with Lenis
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Global smooth anchor scroll interceptor for 100% consistent scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(href, { offset: -30, duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      gsap.ticker.remove(update);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [lenis]);

  return null;
}

// ============================================================================
// 3. APPLICATION ROUTING & PAGES (Jirjirak Studio Routes)
// ============================================================================
function RouteError() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-[#fff083] mb-4">Something went wrong</h2>
      <p className="text-neutral-400 mb-6">Return to Jirjirak Home</p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-[#fff083] text-[#222] font-semibold rounded-full hover:bg-white transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'work', element: <Work /> },
      { path: 'contact', element: <Contact /> },
      { path: 'journal', element: <Journal /> },
      { path: 'journal/:slug', element: <JournalDetail /> },
      { path: 'departments/:slug', element: <DepartmentDetail /> },
      { path: '*', element: <Home /> },
    ],
  },
  {
    path: '*',
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '*', element: <Home /> },
    ],
  },
]);

// ============================================================================
// 4. ERROR BOUNDARY
// ============================================================================
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', backgroundColor: '#1c1c1c', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#fff083', fontSize: '24px', marginBottom: '16px' }}>Application Render Error</h1>
          <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>{this.state.error?.message}</p>
          <pre style={{ background: '#2c2c2c', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px' }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 24px', backgroundColor: '#fff083', color: '#222', border: 'none', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// 5. MASTER EXPORT: App
// ============================================================================
export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactLenis root options={{ autoRaf: false }}>
          <GsapLenisIntegration />
          <RouterProvider router={router} />
        </ReactLenis>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
