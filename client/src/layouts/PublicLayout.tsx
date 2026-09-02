import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PublicFooter } from '../components/public/PublicFooter';
import { PublicNavbar } from '../components/public/PublicNavbar';

gsap.registerPlugin(ScrollTrigger);

export function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="public-site min-h-screen">
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
