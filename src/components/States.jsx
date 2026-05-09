import { AlertTriangle, Inbox } from 'lucide-react';

export const EmptyState = ({ title, description, action, icon: Icon = Inbox }) => (
  <div className="surface-card-strong flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center">
    <div className="mb-4 rounded-3xl bg-[var(--brand-soft)] p-4 text-[color:var(--brand)]">
      <Icon size={28} />
    </div>
    <h3 className="text-lg font-bold text-[color:var(--text-primary)]">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-[color:var(--text-secondary)]">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);

export const ErrorState = ({ title, description, onRetry }) => (
  <div className="surface-card-strong flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center">
    <div className="mb-4 rounded-3xl bg-[var(--danger-soft)] p-4 text-[color:var(--danger)]">
      <AlertTriangle size={28} />
    </div>
    <h3 className="text-lg font-bold text-[color:var(--text-primary)]">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-[color:var(--text-secondary)]">{description}</p>
    <button type="button" onClick={onRetry} className="btn-primary mt-5">
      Retry
    </button>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <div className="skeleton h-12 w-56" />
      <div className="skeleton h-5 w-80 max-w-full" />
    </div>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="surface-card-strong p-6">
          <div className="skeleton mb-5 h-5 w-28" />
          <div className="skeleton h-10 w-36" />
          <div className="skeleton mt-8 h-3 w-full" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="surface-card-strong p-6 lg:col-span-2">
        <div className="skeleton mb-6 h-6 w-48" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="mb-4 flex items-center gap-4 last:mb-0">
            <div className="skeleton h-12 w-12 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-3 w-24" />
            </div>
            <div className="skeleton h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="surface-card-strong p-6">
        <div className="skeleton mb-4 h-6 w-32" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton h-14 w-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 6 }) => (
  <div className="surface-card-strong p-6">
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="skeleton h-6 w-44" />
      <div className="flex gap-3">
        <div className="skeleton h-11 w-56" />
        <div className="skeleton h-11 w-32" />
      </div>
    </div>
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] items-center gap-3">
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
        </div>
      ))}
    </div>
  </div>
);
