import DashboardCards from '../components/DashboardCards';
import TransactionList from '../components/TransactionList';
import TransactionButtons from '../components/TransactionButtons';
import CreditCardSection from '../components/CreditCardSection';
import PageHeader from '../components/PageHeader';

const Dashboard = () => {
  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Your money movement, budgets, and liabilities are all visible at a glance."
      />

      <DashboardCards />

      <CreditCardSection />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionList limit={5} showFilters={false} />
        </div>
        <div>
          <TransactionButtons />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
