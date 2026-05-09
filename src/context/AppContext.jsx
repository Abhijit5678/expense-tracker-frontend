import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [creditCards, setCreditCards] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const data = await api.getTransactions();
      const mappedData = data.map(t => ({
        ...t,
        type: t.type === 'INCOME' ? 'Income' : 'Expense',
        date: t.transactionDate,
        isReimbursed: t.reimbursed !== undefined ? t.reimbursed : t.isReimbursed
      }));
      setTransactions(mappedData.sort((a, b) => new Date(b.date) - new Date(a.date)));
      return true;
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch transactions');
      return false;
    }
  };

  const fetchAnalytics = async () => {
    try {
      const summaryData = await api.getSummary();
      setSummary(summaryData);
      
      const catData = await api.getCategoryData();
      setCategoryData(catData);
      
      const trendData = await api.getMonthlyTrend();
      setMonthlyTrend(trendData);
      return true;
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch analytics');
      return false;
    }
  };

  const fetchBudgetStatus = async () => {
    try {
      const currentMonth = format(new Date(), 'yyyy-MM');
      const data = await api.getBudgetStatus(currentMonth);
      setBudgetStatus(data);
      return true;
    } catch (err) {
      console.error(err);
      // It's possible budget is not set, so we don't always show an error
      return false;
    }
  };

  const fetchCreditCards = async () => {
    try {
      const data = await api.getCreditCards();
      setCreditCards(data);
      return true;
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch credit cards');
      return false;
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    const results = await Promise.all([
      fetchTransactions(),
      fetchAnalytics(),
      fetchBudgetStatus(),
      fetchCreditCards()
    ]);

    if (results.filter(Boolean).length === 0) {
      setError('Failed to load data. Please try again.');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const payload = {
        amount: transaction.amount,
        type: transaction.type.toUpperCase(),
        category: transaction.category,
        transactionDate: transaction.date,
        description: transaction.description,
        paymentMethod: transaction.paymentMethod || 'CASH',
        creditCardId: transaction.creditCardId || null,
        isReimbursed: transaction.isReimbursed || false,
        reimbursed: transaction.isReimbursed || false
      };
      await api.addTransaction(payload);
      toast.success('Transaction added successfully!');
      await fetchAllData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add transaction');
    }
  };

  const updateTransactionContext = async (id, transaction) => {
    try {
      const payload = {
        amount: transaction.amount,
        type: transaction.type.toUpperCase(),
        category: transaction.category,
        transactionDate: transaction.date,
        description: transaction.description,
        paymentMethod: transaction.paymentMethod || 'CASH',
        creditCardId: transaction.creditCardId || null,
        isReimbursed: transaction.isReimbursed || false,
        reimbursed: transaction.isReimbursed || false
      };
      await api.updateTransaction(id, payload);
      toast.success('Transaction updated successfully!');
      setEditingTransaction(null);
      await fetchAllData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update transaction');
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
      await fetchAllData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete transaction');
    }
  };

  const saveBudget = async (amount) => {
    try {
      const currentMonth = format(new Date(), 'yyyy-MM');
      await api.setBudget({ monthYear: currentMonth, amount });
      toast.success('Budget updated successfully!');
      await fetchBudgetStatus();
    } catch (err) {
      console.error(err);
      toast.error('Failed to set budget');
    }
  };

  const payBill = async (cardId, statementMonth) => {
    try {
      await api.payCreditCardBill(cardId, statementMonth);
      toast.success('Bill marked as paid!');
      await fetchCreditCards();
    } catch (err) {
      console.error(err);
      toast.error('Failed to mark bill as paid');
    }
  };

  return (
    <AppContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction: updateTransactionContext,
      deleteTransaction,
      editingTransaction,
      setEditingTransaction,
      balance: summary.balance,
      totalIncome: summary.totalIncome,
      totalExpense: summary.totalExpense,
      categoryData,
      monthlyTrend,
      budgetStatus,
      saveBudget,
      creditCards,
      payBill,
      loading,
      error,
      refreshData: fetchAllData
    }}>
      {children}
    </AppContext.Provider>
  );
};
