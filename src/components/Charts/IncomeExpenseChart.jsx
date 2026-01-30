import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeExpenseChart = ({ data }) => {
    // Transform data for the chart
    const chartData = data && data.length > 0 ? data : [
        { month: 'Jan', income: 0, expense: 0 },
        { month: 'Feb', income: 0, expense: 0 },
        { month: 'Mar', income: 0, expense: 0 },
        { month: 'Apr', income: 0, expense: 0 },
        { month: 'May', income: 0, expense: 0 },
        { month: 'Jun', income: 0, expense: 0 },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-4 shadow-lg">
                    <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.month}</p>
                    <p className="text-green-600 font-medium">
                        Income: ₹{payload[0].value.toLocaleString('en-IN')}
                    </p>
                    <p className="text-red-600 font-medium">
                        Expense: ₹{payload[1].value.toLocaleString('en-IN')}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-80 animate-fade-in overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        style={{ fontSize: '14px', fontWeight: '600' }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: '14px', fontWeight: '600' }}
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(102, 126, 234, 0.1)' }} />
                    <Legend
                        wrapperStyle={{ fontSize: '14px', fontWeight: '600' }}
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
        </div>
    );
};

export default IncomeExpenseChart;
