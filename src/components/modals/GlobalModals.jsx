import { useAppContext } from '../../context/AppContext';
import ExpenseModal from './ExpenseModal';
import IncomeModal from './IncomeModal';

const GlobalModals = () => {
  const { editingTransaction, setEditingTransaction } = useAppContext();

  if (!editingTransaction) return null;

  const isExpense = editingTransaction.type === 'Expense';
  
  return (
    <>
      {isExpense ? (
        <ExpenseModal 
          isOpen={true} 
          onClose={() => setEditingTransaction(null)} 
          transactionToEdit={editingTransaction}
        />
      ) : (
        <IncomeModal 
          isOpen={true} 
          onClose={() => setEditingTransaction(null)} 
          transactionToEdit={editingTransaction}
        />
      )}
    </>
  );
};

export default GlobalModals;
