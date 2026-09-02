import { PublicFooter } from '../components/public/PublicFooter';
import { PublicNavbar } from '../components/public/PublicNavbar';
import { PageTransition } from '../motion/PageTransition';
import { SmoothScrollProvider } from '../motion/SmoothScrollProvider';

export function PublicLayout() {
  return (
    <SmoothScrollProvider>
      <div className="public-site min-h-screen">
        <PublicNavbar />
        <main>
          <PageTransition />
        </main>
        <PublicFooter />
      </div>
    </SmoothScrollProvider>
  );
}
