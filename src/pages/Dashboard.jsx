import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const Dashboard = ({ refreshTrigger }) => {
    const [viewType, setViewType] = useState('monthly');

    return (
        <div className="space-y-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Visualize your financial data and track your spending patterns
                    </p>
                </div>

                {/* View Type Selector */}
                <div className="glass-card p-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600 ml-2" />
                    <select
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                        className="bg-transparent border-none text-gray-900 font-medium focus:outline-none cursor-pointer pr-4"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💰</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Income</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₹0</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💸</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Total Expense</h3>
                    </div>
                    <p className="text-2xl font-bold text-red-600">₹0</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💼</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Net Balance</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">₹0</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">📊</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600">Transactions</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="glass-card p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Income vs Expense Trend
                </h2>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📈</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Data Available
                    </h3>
                    <p className="text-gray-600">
                        Start adding transactions to see your financial trends and analytics
                    </p>
                </div>
            </div>

            {/* Category Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Top Expense Categories
                    </h2>
                    <div className="space-y-4">
                        <div className="text-center py-8 text-gray-500">
                            No expense data yet
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Income Sources
                    </h2>
                    <div className="space-y-4">
                        <div className="text-center py-8 text-gray-500">
                            No income data yet
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
