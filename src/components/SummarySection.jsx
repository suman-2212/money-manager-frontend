import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { dashboardAPI } from '../services/api';
import { CATEGORIES } from '../utils/constants';

const SummarySection = ({ refreshTrigger }) => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('expense');

    useEffect(() => {
        fetchSummary();
    }, [refreshTrigger]);

    const fetchSummary = async () => {
        try {
            setLoading(true);
            const data = await dashboardAPI.getSummary();
            setSummary(data);
        } catch (error) {
            console.error('Error fetching summary:', error);
            setSummary(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="glass-card p-6">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                </div>
            </div>
        );
    }

    if (!summary) {
        return null;
    }

    const getCategoryColor = (categoryId) => {
        const category = CATEGORIES.find(cat => cat.id === categoryId);
        return category?.color || '#6b7280';
    };

    const getCategoryName = (categoryId) => {
        const category = CATEGORIES.find(cat => cat.id === categoryId);
        return category ? `${category.icon} ${category.name}` : categoryId;
    };

    const expenseData = summary.byCategory?.expense || [];
    const incomeData = summary.byCategory?.income || [];

    const currentData = activeTab === 'expense' ? expenseData : incomeData;
    const chartData = currentData.map(item => ({
        name: getCategoryName(item.category),
        value: item.total,
        color: getCategoryColor(item.category),
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border border-white/20">
                    <p className="text-white font-semibold">{payload[0].name}</p>
                    <p className="text-primary-400">
                        ₹{payload[0].value.toLocaleString('en-IN')}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card p-6">
            <h2 className="text-2xl font-display font-bold text-white mb-6">
                Category-wise Summary
            </h2>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6">
                <button
                    onClick={() => setActiveTab('expense')}
                    className={activeTab === 'expense' ? 'tab-active' : 'tab'}
                >
                    💸 Expenses
                </button>
                <button
                    onClick={() => setActiveTab('income')}
                    className={activeTab === 'income' ? 'tab-active' : 'tab'}
                >
                    💰 Income
                </button>
            </div>

            {chartData.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-400">No {activeTab} data available</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category List */}
                    <div className="space-y-3">
                        {currentData.map((item, index) => {
                            const total = currentData.reduce((sum, i) => sum + i.total, 0);
                            const percentage = ((item.total / total) * 100).toFixed(1);

                            return (
                                <div key={index} className="glass-card p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-semibold">
                                            {getCategoryName(item.category)}
                                        </span>
                                        <span className="text-slate-400 text-sm">{percentage}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 bg-white/10 rounded-full h-2 mr-4">
                                            <div
                                                className="h-2 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: getCategoryColor(item.category),
                                                }}
                                            />
                                        </div>
                                        <span className="text-white font-bold">
                                            ₹{item.total.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummarySection;
