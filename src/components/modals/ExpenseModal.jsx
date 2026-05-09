import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useAppContext } from '../../context/AppContext';

const ExpenseModal = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, updateTransaction, creditCards } = useAppContext();

  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    paymentMethod: 'CASH',
    creditCardId: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    isLend: false,
  });

  const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Bills', 'Transport', 'Lend', 'Other'];

  useEffect(() => {
    setFormData({
      amount: transactionToEdit ? transactionToEdit.amount : '',
      category: transactionToEdit ? transactionToEdit.category : 'Food',
      paymentMethod: transactionToEdit ? (transactionToEdit.paymentMethod || 'CASH') : 'CASH',
      creditCardId: transactionToEdit ? (transactionToEdit.creditCardId || '') : '',
      date: transactionToEdit ? transactionToEdit.date : new Date().toISOString().split('T')[0],
      description: transactionToEdit ? transactionToEdit.description : '',
      isLend: transactionToEdit ? transactionToEdit.category === 'Lend' : false,
    });
  }, [transactionToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    try {
      const payload = {
        amount: Number(formData.amount),
        type: 'Expense',
        category: formData.isLend ? 'Lend' : formData.category,
        date: formData.date,
        description: formData.description,
        paymentMethod: formData.paymentMethod,
        creditCardId: formData.creditCardId,
        isReimbursed: false,
      };

      if (transactionToEdit) {
        await updateTransaction(transactionToEdit.id, payload);
      } else {
        await addTransaction(payload);
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={transactionToEdit ? 'Edit Expense' : 'Add Expense'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-text">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            className="input-field text-xl font-semibold"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div>
          <label className="label-text">Category</label>
          <select
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            disabled={formData.isLend}
          >
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="label-text">Payment Method</label>
            <select
              className="input-field"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            >
              <option value="CASH">Cash</option>
              <option value="BANK">Bank</option>
              <option value="CREDIT_CARD">Credit Card</option>
            </select>
          </div>

          {formData.paymentMethod === 'CREDIT_CARD' ? (
            <div>
              <label className="label-text">Select Card</label>
              <select
                className="input-field"
                value={formData.creditCardId}
                onChange={(e) => setFormData({ ...formData, creditCardId: e.target.value })}
                required
              >
                <option value="" disabled>Select a card</option>
                {creditCards?.map((card) => (
                  <option key={card.id} value={card.id}>{card.cardName}</option>
                ))}
              </select>
            </div>
          ) : null}
        </div>

        <div>
          <label className="label-text">Date</label>
          <input
            type="date"
            required
            className="input-field"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div>
          <label className="label-text">Description</label>
          <input
            type="text"
            required
            className="input-field"
            placeholder="What was this for?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="mt-2 flex items-center justify-between rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-secondary)]/55 p-4">
          <label htmlFor="isLend" className="cursor-pointer text-sm font-semibold text-[color:var(--text-primary)]">
            Paid for someone else (Lend)
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              id="isLend"
              className="peer sr-only"
              checked={formData.isLend}
              onChange={(e) => setFormData({
                ...formData,
                isLend: e.target.checked,
                category: e.target.checked ? 'Lend' : 'Food',
              })}
            />
            <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-[var(--brand)] peer-checked:after:translate-x-full after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] dark:bg-slate-600" />
          </label>
        </div>

        <button type="submit" className="btn-primary mt-4 w-full py-3 text-lg">
          {transactionToEdit ? 'Save Changes' : 'Save Expense'}
        </button>
      </form>
    </Modal>
  );
};

export default ExpenseModal;
