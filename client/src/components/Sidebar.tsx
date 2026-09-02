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
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[var(--forest)] text-[var(--ivory)] transition-transform duration-200 lg:static lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="border-b border-white/10 px-6 py-7">
        <p className="text-[11px] tracking-[0.28em]">AUREVIA GEMS</p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[var(--champagne)]">
          Inventory Suite
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block rounded-sm px-3 py-2.5 text-sm tracking-[0.04em] transition ${
                isActive
                  ? 'bg-[rgba(246,241,231,0.12)] text-[var(--ivory)]'
                  : 'text-[rgba(246,241,231,0.68)] hover:bg-white/5 hover:text-[var(--ivory)]'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-5">
        <p className="truncate text-sm font-medium">{user?.name}</p>
        <p className="truncate text-xs text-[rgba(246,241,231,0.55)]">
          {user?.email}
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 w-full border border-[rgba(246,241,231,0.28)] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--ivory)] transition hover:bg-[var(--ivory)] hover:text-[var(--forest)]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
