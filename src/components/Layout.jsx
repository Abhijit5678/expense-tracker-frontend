import { AnimatePresence, motion } from 'framer-motion';
import { Bell, ChevronRight, LayoutDashboard, PieChart, Receipt, Search } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import GlobalModals from './modals/GlobalModals';
import { AppLoader, ErrorState } from './States';

const mobileNavItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Transactions', path: '/transactions', icon: Receipt },
  { name: 'Analytics', path: '/analytics', icon: PieChart },
];

const Layout = () => {
  const { loading, error, refreshData } = useAppContext();
  const { user } = useAuth();
  const location = useLocation();

  const renderState = () => {
    if (error) {
      return (
        <ErrorState
          title="We hit a sync issue"
          description={error}
          onRetry={refreshData}
        />
      );
    }

    if (loading) {
      return <AppLoader />;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="app-shell flex">
      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_55%)]" />

        <header className="sticky top-0 z-30 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-base)]/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-10">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-tertiary)]">
                Finance OS
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
                <span className="truncate font-semibold text-[color:var(--text-primary)]">
                  {user?.name || 'Your workspace'}
                </span>
                <ChevronRight size={14} />
                <span className="truncate">Track cash flow with confidence</span>
              </div>
            </div>

            <div className="hidden flex-1 items-center justify-center lg:flex">
              <div className="surface-card-strong flex w-full max-w-md items-center gap-3 px-4 py-3">
                <Search size={18} className="text-[color:var(--text-tertiary)]" />
                <span className="text-sm text-[color:var(--text-tertiary)]">
                  All finances are live and synced
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" className="btn-icon hidden md:inline-flex" aria-label="Notifications">
                <Bell size={18} />
              </button>
              <ThemeToggle />
            </div>
          </div>

          <div className="fintech-scrollbar flex gap-2 overflow-x-auto px-4 pb-4 md:hidden">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--brand)] text-white shadow-[var(--shadow-hover)]'
                    : 'surface-card-strong text-[color:var(--text-secondary)]'
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </NavLink>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
            {renderState()}
          </div>
        </main>
      </div>
      <GlobalModals />
    </div>
  );
};

export default Layout;
