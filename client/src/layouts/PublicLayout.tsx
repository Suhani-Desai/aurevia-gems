import { Outlet } from 'react-router-dom';
import { PublicFooter } from '../components/public/PublicFooter';
import { PublicNavbar } from '../components/public/PublicNavbar';

export function PublicLayout() {
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
