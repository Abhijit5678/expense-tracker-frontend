import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowDownRight, ArrowUpRight, Inbox, Search, SlidersHorizontal, Trash2, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { EmptyState } from './States';

const TransactionList = ({ limit, showFilters = true }) => {
  const { transactions, deleteTransaction, setEditingTransaction } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Food', 'Travel', 'Rent', 'Shopping', 'Bills', 'Salary', 'Freelance', 'Transport'];

  let filtered = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'All' || t.type === filterType) &&
    (filterCategory === 'All' || t.category === filterCategory) &&
    !t.isReimbursed
  );

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

  return (
    <div className="surface-card-strong overflow-hidden p-6 md:p-7">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)]">
            {limit ? 'Recent Transactions' : 'All Transactions'}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--text-secondary)]">
            Review activity with faster scanability and cleaner controls.
          </p>
        </div>
        
        {showFilters && (
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--text-tertiary)]" size={16} />
              <input 
                type="text" 
                placeholder="Search transactions" 
                className="input-field py-3 pl-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="surface-card flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold text-[color:var(--text-tertiary)]">
              <SlidersHorizontal size={16} />
              Filters
            </div>
            <select 
              className="input-field w-auto min-w-36 py-3 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <select 
              className="input-field w-auto min-w-40 py-3 text-sm"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No transactions yet"
          description="Once you add income or expenses, your activity will show up here with smarter filters and quick actions."
        />
      ) : (
      <div className="fintech-scrollbar max-h-[34rem] overflow-auto rounded-[1.35rem] border border-[color:var(--border-subtle)]">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="sticky top-0 z-10 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-elevated)]/95 text-sm text-[color:var(--text-tertiary)] backdrop-blur">
              <th className="px-5 py-4 font-semibold">Transaction</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 text-right font-semibold">Amount</th>
              <th className="px-5 py-4 text-right font-semibold"></th>
            </tr>
          </thead>
          <tbody className="bg-[color:var(--surface-strong)]/55">
            {filtered.map((transaction) => (
                <tr key={transaction.id} className="group border-b border-[color:var(--border-subtle)] transition-colors hover:bg-white/50 dark:hover:bg-white/5">
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-2xl p-3 transition-transform duration-200 group-hover:scale-[1.03] ${
                        transaction.type === 'Income'
                          ? 'bg-[var(--success-soft)] text-[color:var(--success)]'
                          : 'bg-[var(--danger-soft)] text-[color:var(--danger)]'
                      }`}>
                        {transaction.type === 'Income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                      </div>
                      <div>
                        <p className="font-semibold text-[color:var(--text-primary)]">{transaction.description}</p>
                        <p className="mt-1 text-xs text-[color:var(--text-tertiary)] md:hidden">{transaction.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span className="status-badge bg-[var(--brand-soft)] text-[color:var(--brand)]">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-[color:var(--text-secondary)]">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`status-badge ${
                      transaction.type === 'Income'
                        ? 'bg-[var(--success-soft)] text-[color:var(--success)]'
                        : 'bg-[var(--warning-soft)] text-[color:var(--warning)]'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className={`px-5 py-4 text-right font-bold ${transaction.type === 'Income' ? 'text-[color:var(--success)]' : 'text-[color:var(--text-primary)]'}`}>
                    {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => setEditingTransaction(transaction)}
                      className="btn-icon mr-2 h-9 w-9 rounded-xl border-0 bg-transparent shadow-none hover:bg-[var(--brand-soft)] hover:text-[color:var(--brand)]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => deleteTransaction(transaction.id)}
                      className="btn-icon h-9 w-9 rounded-xl border-0 bg-transparent shadow-none hover:bg-[var(--danger-soft)] hover:text-[color:var(--danger)]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default TransactionList;
