import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaChartPie, FaArrowUp, FaListAlt } from 'react-icons/fa';

const AdvancedAnalytics = ({ transactions }) => {
    // Calculate category-wise spending
    const getCategoryBreakdown = () => {
        const categoryTotals = {};

        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                if (categoryTotals[t.category]) {
                    categoryTotals[t.category] += t.amount;
                } else {
                    categoryTotals[t.category] = t.amount;
                }
            });

        return Object.entries(categoryTotals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    };

    // Calculate monthly trends
    const getMonthlyTrends = () => {
        const monthlyData = {};

        transactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { month: monthKey, income: 0, expense: 0 };
            }

            if (t.type === 'income') {
                monthlyData[monthKey].income += t.amount;
            } else {
                monthlyData[monthKey].expense += t.amount;
            }
        });

        return Object.values(monthlyData)
            .sort((a, b) => a.month.localeCompare(b.month))
            .slice(-6) // Last 6 months
            .map(item => ({
                month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
                income: item.income,
                expense: item.expense
            }));
    };

    const categoryData = getCategoryBreakdown();
    const monthlyData = getMonthlyTrends();

    // Professional black/gray color palette
    const COLORS = ['#1a202c', '#2d3748', '#4a5568', '#6b7280', '#9ca3af', '#d1d5db'];

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border-2 border-gray-300">
                    <p className="font-bold text-gray-900">{payload[0].name}</p>
                    <p className="text-gray-700">{formatAmount(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    const CustomLineTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border-2 border-gray-300">
                    <p className="font-bold text-gray-900 mb-2">{payload[0].payload.month}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {formatAmount(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (!transactions || transactions.length === 0) {
        return (
            <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                        background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                    }}>
                    <FaChartPie className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Available</h3>
                <p className="text-gray-600">Add transactions to see analytics</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #1a202c 0%, #000000 100%)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}>
                        <FaChartPie className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold gradient-text">Advanced Analytics</h2>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                    Detailed insights into your spending patterns and financial trends
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Breakdown Pie Chart */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <FaChartPie className="text-gray-700 text-lg" />
                        <h3 className="text-xl font-bold text-gray-900">Spending by Category</h3>
                    </div>
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 text-center py-12">No expense data available</p>
                    )}
                </div>

                {/* Monthly Trends Line Chart */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <FaArrowUp className="text-gray-700 text-lg" />
                        <h3 className="text-xl font-bold text-gray-900">Monthly Trends</h3>
                    </div>
                    {monthlyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomLineTooltip />} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#2d3748"
                                    strokeWidth={3}
                                    name="Income"
                                    dot={{ fill: '#2d3748', r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#6b7280"
                                    strokeWidth={3}
                                    name="Expense"
                                    dot={{ fill: '#6b7280', r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 text-center py-12">No monthly data available</p>
                    )}
                </div>
            </div>

            {/* Top Spending Categories */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-6">
                    <FaListAlt className="text-gray-700 text-lg" />
                    <h3 className="text-xl font-bold text-gray-900">Top Spending Categories</h3>
                </div>
                {categoryData.length > 0 ? (
                    <div className="space-y-4">
                        {categoryData.slice(0, 5).map((category, index) => {
                            const total = categoryData.reduce((sum, cat) => sum + cat.value, 0);
                            const percentage = ((category.value / total) * 100).toFixed(1);

                            return (
                                <div key={category.name} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                                style={{ background: COLORS[index % COLORS.length] }}>
                                                {index + 1}
                                            </div>
                                            <span className="font-semibold text-gray-900">{category.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{formatAmount(category.value)}</p>
                                            <p className="text-sm text-gray-600">{percentage}%</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                background: COLORS[index % COLORS.length]
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No spending data available</p>
                )}
            </div>
        </div>
    );
};

export default AdvancedAnalytics;
