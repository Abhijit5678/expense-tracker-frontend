import { useState } from 'react';
import { TrendingUp, TrendingDown, IndianRupee, Target, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import CountUpValue from './CountUpValue';

const DashboardCards = () => {
  const { balance, totalIncome, totalExpense, budgetStatus, saveBudget } = useAppContext();
  const [budgetInput, setBudgetInput] = useState('');

  const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

  const cardHover = {
    y: -6,
    boxShadow: 'var(--shadow-hover)',
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <motion.div 
        whileHover={cardHover}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_48%,#0f172a_100%)] p-6 text-white shadow-[0_28px_70px_-34px_rgba(37,99,235,0.7)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.24),transparent_28%)]" />
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div>
            <h3 className="font-semibold text-blue-100">Total Balance</h3>
            <p className="mt-1 text-sm text-blue-200/85">Spendable after income and expense flow</p>
          </div>
          <div className="rounded-2xl bg-white/16 p-3 backdrop-blur">
            <IndianRupee size={20} className="text-white" />
          </div>
        </div>
        <div className="relative z-10">
          <CountUpValue
            value={balance}
            formatter={formatCurrency}
            className="text-4xl font-extrabold tracking-[-0.04em] md:text-[2.6rem]"
          />
          <div className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
            Available across all accounts
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={cardHover}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="surface-card-strong p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[color:var(--text-secondary)]">Total Income</h3>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">All credited inflows</p>
          </div>
          <div className="rounded-2xl bg-[var(--success-soft)] p-3">
            <TrendingUp size={20} className="text-[color:var(--success)]" />
          </div>
        </div>
        <CountUpValue
          value={totalIncome}
          formatter={formatCurrency}
          className="text-3xl font-extrabold tracking-[-0.03em] text-[color:var(--text-primary)]"
        />
        <div className="mt-6 flex items-center text-sm font-semibold text-[color:var(--success)]">
          <TrendingUp size={16} className="mr-1" /> healthy contribution to balance
        </div>
      </motion.div>

      <motion.div 
        whileHover={cardHover}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="surface-card-strong p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[color:var(--text-secondary)]">Total Expense</h3>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Outflows this cycle</p>
          </div>
          <div className="rounded-2xl bg-[var(--danger-soft)] p-3">
            <TrendingDown size={20} className="text-[color:var(--danger)]" />
          </div>
        </div>
        <CountUpValue
          value={totalExpense}
          formatter={formatCurrency}
          className="text-3xl font-extrabold tracking-[-0.03em] text-[color:var(--text-primary)]"
        />
        <div className="mt-6 flex items-center text-sm font-semibold text-[color:var(--danger)]">
          <TrendingDown size={16} className="mr-1" /> monitor larger recurring outflows
        </div>
      </motion.div>

      <motion.div 
        whileHover={cardHover}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="surface-card-strong p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[color:var(--text-secondary)]">Monthly Budget</h3>
            <p className="mt-1 text-sm text-[color:var(--text-tertiary)]">Set a cap and monitor burn</p>
          </div>
          <div className="rounded-2xl bg-[var(--warning-soft)] p-3">
            <Target size={20} className="text-[color:var(--warning)]" />
          </div>
        </div>
        {budgetStatus ? (
          <>
            <CountUpValue
              value={budgetStatus.amount}
              formatter={formatCurrency}
              className="text-3xl font-extrabold tracking-[-0.03em] text-[color:var(--text-primary)]"
            />
            <div className={`mt-6 flex items-center text-sm font-semibold ${budgetStatus.isExceeded ? 'text-[color:var(--danger)]' : 'text-[color:var(--text-secondary)]'}`}>
              {budgetStatus.isExceeded ? <AlertCircle size={16} className="mr-1" /> : null}
              Spent: {formatCurrency(budgetStatus.currentSpent)}
            </div>
          </>
        ) : (
          <div className="mt-2">
            <p className="mb-3 text-sm text-[color:var(--text-secondary)]">No budget set for this month.</p>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="0.00" 
                className="input-field w-full px-3 py-2.5 text-sm"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button 
                className="btn-primary shrink-0 px-4 py-2.5 text-sm"
                onClick={() => saveBudget(Number(budgetInput))}
              >
                Set
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardCards;
