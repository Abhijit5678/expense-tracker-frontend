import { useState } from 'react';
import Modal from './Modal';
import { useAppContext } from '../../context/AppContext';
import { EmptyState } from '../States';

const SettlementModal = ({ isOpen, onClose }) => {
  const { transactions, updateTransaction } = useAppContext();
  const [selectedTxId, setSelectedTxId] = useState('');
  const [returnedAmount, setReturnedAmount] = useState('');

  const pendingLends = transactions.filter((transaction) =>
    transaction.type === 'Expense' && transaction.category === 'Lend' && !transaction.isReimbursed
  );

  const handleSelect = (id) => {
    setSelectedTxId(id);
    const transaction = pendingLends.find((item) => item.id === Number(id));

    if (transaction) {
      setReturnedAmount(transaction.amount.toString());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTxId) return;

    const transaction = pendingLends.find((item) => item.id === Number(selectedTxId));
    if (!transaction) return;

    try {
      await updateTransaction(transaction.id, {
        ...transaction,
        isReimbursed: true,
      });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settle Pending Lends">
      {pendingLends.length === 0 ? (
        <EmptyState
          title="No pending lends found"
          description="You are all settled up. New lend payments will appear here until they are marked as returned."
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Select Pending Lend</label>
            <select
              className="input-field"
              value={selectedTxId}
              onChange={(e) => handleSelect(e.target.value)}
              required
            >
              <option value="" disabled>Select a transaction</option>
              {pendingLends.map((transaction) => (
                <option key={transaction.id} value={transaction.id}>
                  {transaction.description} (${transaction.amount}) - {new Date(transaction.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {selectedTxId ? (
            <div>
              <label className="label-text">Returned Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                className="input-field text-xl font-semibold"
                value={returnedAmount}
                onChange={(e) => setReturnedAmount(e.target.value)}
                readOnly
              />
              <p className="mt-2 text-xs text-[color:var(--text-tertiary)]">
                Settling this lend removes it from active expense pressure and restores your balance.
              </p>
            </div>
          ) : null}

          <button type="submit" disabled={!selectedTxId} className="w-full rounded-2xl bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] py-3 text-lg font-semibold text-white shadow-[0_20px_55px_-28px_rgba(37,99,235,0.7)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50">
            Mark as Settled
          </button>
        </form>
      )}
    </Modal>
  );
};

export default SettlementModal;
