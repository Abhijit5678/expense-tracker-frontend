import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Wallet, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: Receipt },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
  ];

  return (
    <aside className="relative z-20 hidden min-h-screen w-72 flex-col border-r border-[color:var(--border-subtle)] bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.9))] px-5 py-6 text-white shadow-2xl md:flex">
      <div className="flex items-center space-x-3 px-2">
        <div className="rounded-2xl bg-white/10 p-3 shadow-lg shadow-blue-500/20 backdrop-blur">
          <Wallet size={24} className="text-[#8eb4ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-[-0.04em]">FinTrack</h1>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Premium Money Flow</p>
        </div>
      </div>

      {user && (
        <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#8eb4ff]/10">
              <User size={18} className="text-[#8eb4ff]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-400">@{user.username}</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white/5 px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Member tier</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">Smart Budgeting</p>
          </div>
        </div>
      )}
      
      <nav className="mt-8 flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-slate-950 shadow-[0_20px_50px_-28px_rgba(255,255,255,0.7)]'
                  : 'text-slate-400 hover:bg-white/6 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(103,160,255,0.22),rgba(15,23,42,0.15))] p-5 text-left shadow-2xl shadow-black/20">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Insights</p>
          <p className="mt-2 text-lg font-bold text-white">Spend clarity, week by week.</p>
          <p className="mt-2 text-sm text-slate-300">Keep every transaction, card due amount, and budget signal in one view.</p>
          <button className="mt-4 w-full rounded-2xl bg-white/90 py-3 text-sm font-bold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.98]">
            Premium active
          </button>
        </div>
        
        <button 
          onClick={logout}
          className="mt-4 flex w-full items-center justify-center space-x-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white active:scale-[0.98]"
        >
          <LogOut size={18} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
