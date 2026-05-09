import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { EmptyState } from './States';

const ExpenseChart = ({ type = 'pie' }) => {
  const { categoryData: contextCategoryData, monthlyTrend: contextTrendData } = useAppContext();

  const COLORS = ['#4f8ff9', '#4cc38a', '#f07a8f', '#e1a647', '#a78bfa', '#fb7185', '#94a3b8'];
  const axisColor = 'var(--text-tertiary)';
  const gridColor = 'rgba(148, 163, 184, 0.16)';
  const tooltipStyle = {
    backgroundColor: 'var(--surface-elevated)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '18px',
    color: 'var(--text-primary)',
    boxShadow: 'var(--shadow-soft)',
  };

  if (type === 'pie') {
    const categoryData = contextCategoryData.map(c => ({
      name: c.category,
      value: Number(c.totalAmount)
    }));

    return (
      <div className="surface-card-strong h-96 p-6">
        <h2 className="mb-2 text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)]">Expenses by Category</h2>
        <p className="mb-4 text-sm text-[color:var(--text-secondary)]">See where the highest spend pressure is building.</p>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => `$${value.toFixed(2)}`}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: axisColor }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState
            title="No expense data to display"
            description="Add a few expenses and category distribution will appear here."
          />
        )}
      </div>
    );
  }

  // Bar chart for monthly trend
  const trendData = contextTrendData.map(t => ({
    month: t.month,
    amount: Number(t.amount)
  }));

  return (
    <div className="surface-card-strong h-96 p-6">
      <h2 className="mb-2 text-xl font-bold tracking-[-0.03em] text-[color:var(--text-primary)]">Expense Trend</h2>
      <p className="mb-4 text-sm text-[color:var(--text-secondary)]">Compare monthly outflow movement at a glance.</p>
      {trendData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
              contentStyle={tooltipStyle}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Bar dataKey="amount" fill="#4f8ff9" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          title="No trend data to display"
          description="Monthly patterns will appear once your transaction history grows."
        />
      )}
    </div>
  );
};

export default ExpenseChart;
