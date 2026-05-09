import { useState } from 'react';
import { PlusCircle, MinusCircle, RefreshCw } from 'lucide-react';
import ExpenseModal from './modals/ExpenseModal';
import IncomeModal from './modals/IncomeModal';
import SettlementModal from './modals/SettlementModal';
import { motion } from 'framer-motion';

const TransactionButtons = () => {
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [settleOpen, setSettleOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="surface-card-strong p-6">
        <h2 className="text-lg font-bold tracking-[-0.03em] text-[color:var(--text-primary)]">Quick Actions</h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)]">Capture money movement in a couple of taps.</p>
        <div className="flex flex-col gap-3">
          <motion.button 
            whileHover={{ y: -3, boxShadow: '0 20px 55px -28px rgba(220, 76, 100, 0.65)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpenseOpen(true)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#dc4c64,#be123c)] px-4 py-3.5 font-semibold text-white"
          >
            <MinusCircle size={20} /> Add Expense
          </motion.button>

          <motion.button 
            whileHover={{ y: -3, boxShadow: '0 20px 55px -28px rgba(15, 159, 110, 0.65)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIncomeOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#0f9f6e,#15803d)] px-4 py-3.5 font-semibold text-white"
          >
            <PlusCircle size={20} /> Add Income
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -3, boxShadow: '0 20px 55px -28px rgba(37, 99, 235, 0.65)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSettleOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] px-4 py-3.5 font-semibold text-white"
          >
            <RefreshCw size={20} /> Money Received Back
          </motion.button>
        </div>
      </div>

      {expenseOpen && <ExpenseModal isOpen={expenseOpen} onClose={() => setExpenseOpen(false)} />}
      {incomeOpen && <IncomeModal isOpen={incomeOpen} onClose={() => setIncomeOpen(false)} />}
      {settleOpen && <SettlementModal isOpen={settleOpen} onClose={() => setSettleOpen(false)} />}
    </div>
  );
};

export default TransactionButtons;
