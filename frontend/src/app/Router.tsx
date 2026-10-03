import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Work from '../pages/Work';
import Contact from '../pages/Contact';

function RouteError() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-[#fff083] mb-4">Something went wrong</h2>
      <p className="text-neutral-400 mb-6">Return to Jirjirak Home</p>
      <Link to="/" className="px-6 py-2.5 bg-[#fff083] text-[#222] font-semibold rounded-full">
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

export function Router() {
  return <RouterProvider router={router} />;
}
