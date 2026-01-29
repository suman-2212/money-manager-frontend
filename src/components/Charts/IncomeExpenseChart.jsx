import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

const IncomeExpenseChart = ({ data, viewType }) => {
    if (!data || !data.chartData || data.chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-80">
                <p className="text-slate-400">No data available for this period</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-4 border border-white/20">
                    <p className="text-white font-semibold mb-2">{payload[0].payload.name}</p>
                    <p className="text-success-400 text-sm">
                        Income: ₹{payload[0].value.toLocaleString('en-IN')}
                    </p>
                    <p className="text-danger-400 text-sm">
                        Expense: ₹{payload[1].value.toLocaleString('en-IN')}
                    </p>
                    <p className="text-primary-400 text-sm font-semibold mt-2">
                        Net: ₹{(payload[0].value - payload[1].value).toLocaleString('en-IN')}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.income} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={CHART_COLORS.income} stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.expense} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={CHART_COLORS.expense} stopOpacity={0.4} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                />
                <Bar
                    dataKey="income"
                    fill="url(#incomeGradient)"
                    radius={[8, 8, 0, 0]}
                    name="Income"
                />
                <Bar
                    dataKey="expense"
                    fill="url(#expenseGradient)"
                    radius={[8, 8, 0, 0]}
                    name="Expense"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IncomeExpenseChart;
