import TransactionList from '../components/TransactionList';
import PageHeader from '../components/PageHeader';

const Transactions = () => {
  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Review, search, and update every movement with clean audit-friendly context."
      />

      <TransactionList />
    </div>
  );
};

export default Transactions;
