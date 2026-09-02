import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/inventory', label: 'Inventory' },
];

type SidebarProps = {
  open: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ open, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside
      className={`surface-dark fixed inset-y-0 left-0 z-40 flex h-screen w-72 shrink-0 flex-col bg-[var(--emerald)] transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="shrink-0 border-b border-white/10 px-6 py-6">
        <p className="text-[11px] tracking-[0.28em]">AUREVIA GEMS</p>
        <p className="eyebrow mt-3">Inventory Suite</p>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block rounded-[0.85rem] px-3 py-2.5 text-sm tracking-[0.04em] transition ${
                isActive ? 'bg-white/15' : 'hover:bg-white/5'
              }`
            }
            style={{ color: '#ffffff' }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-5 py-5">
        <p className="truncate text-sm font-medium">{user?.name}</p>
        <p className="text-muted-on-dark truncate text-xs">{user?.email}</p>
        <button type="button" onClick={logout} className="btn-ghost btn-ghost-light mt-4 w-full">
          Logout
        </button>
      </div>
    </aside>
  );
}
