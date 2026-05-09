import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useAppContext } from '../../context/AppContext';

const IncomeModal = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, updateTransaction } = useAppContext();

  const [formData, setFormData] = useState({
    amount: '',
    category: 'Salary',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const categories = ['Salary', 'Freelance', 'Investments', 'Other'];

  useEffect(() => {
    setFormData({
      amount: transactionToEdit ? transactionToEdit.amount : '',
      category: transactionToEdit ? transactionToEdit.category : 'Salary',
      date: transactionToEdit ? transactionToEdit.date : new Date().toISOString().split('T')[0],
      description: transactionToEdit ? transactionToEdit.description : '',
    });
  }, [transactionToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    try {
      const payload = {
        amount: Number(formData.amount),
        type: 'Income',
        category: formData.category,
        date: formData.date,
        description: formData.description,
        paymentMethod: 'BANK',
        creditCardId: '',
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
    <Modal isOpen={isOpen} onClose={onClose} title={transactionToEdit ? 'Edit Income' : 'Add Income'}>
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
          <label className="label-text">Source</label>
          <select
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
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
            placeholder="e.g. March salary"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <button type="submit" className="w-full rounded-2xl bg-[linear-gradient(135deg,#0f9f6e,#15803d)] py-3 text-lg font-semibold text-white shadow-[0_20px_55px_-28px_rgba(15,159,110,0.7)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
          {transactionToEdit ? 'Save Changes' : 'Save Income'}
        </button>
      </form>
    </Modal>
  );
};

export default IncomeModal;
