import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';

const titles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/products': 'Products',
  '/products/new': 'Add Product',
  '/categories': 'Categories',
  '/inventory': 'Inventory',
};

function resolveTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.includes('/products/') && pathname.endsWith('/edit')) {
    return 'Edit Product';
  }
  return 'Inventory Suite';
}

export function AppLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell min-h-screen lg:flex">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/35 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[rgba(251,249,244,0.92)] px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border border-[var(--border)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              Menu
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--champagne)]">
                Aurevia Gems
              </p>
              <h2 className="text-sm font-medium text-[var(--charcoal)]">
                {resolveTitle(location.pathname)}
              </h2>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-sm text-[var(--charcoal)]">{user?.name}</p>
            <p className="text-xs text-[var(--muted)]">{user?.email}</p>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
