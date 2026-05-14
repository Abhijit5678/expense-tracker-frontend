import { Suspense, lazy } from 'react';
import PageHeader from '../components/PageHeader';
import { AppLoader } from '../components/States';

const ExpenseChart = lazy(() => import('../components/ExpenseChart'));

const Analytics = () => {
  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Understand where your spending is going and how monthly patterns are shifting."
      />

      <Suspense fallback={<AppLoader title="Preparing analytics" description="Building your charts and category insights." />}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ExpenseChart type="pie" />
          <ExpenseChart type="bar" />
        </div>
      </Suspense>
    </div>
  );
};

export default Analytics;
