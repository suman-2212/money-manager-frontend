import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Home = ({ onTransactionChange, refreshTrigger }) => {
    return (
        <div className="space-y-8 py-6">
            {/* Hero Section */}
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome to Money Manager
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Track your income and expenses efficiently. Take control of your finances today!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Income */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                        <span className="badge-success">Income</span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-2">Total Income</h3>
                    <p className="text-3xl font-bold text-green-600">
                        ₹0
                    </p>
                </div>

                {/* Total Expense */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💸</span>
                        </div>
                        <span className="badge-danger">Expense</span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-2">Total Expense</h3>
                    <p className="text-3xl font-bold text-red-600">
                        ₹0
                    </p>
                </div>

                {/* Balance */}
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">💼</span>
                        </div>
                        <span className="badge-primary">Balance</span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-2">Current Balance</h3>
                    <p className="text-3xl font-bold text-blue-600">
                        ₹0
                    </p>
                </div>
            </div>

            {/* Getting Started Card */}
            <div className="glass-card p-8 text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-3xl">📊</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Start Managing Your Finances
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Add your first transaction to begin tracking your income and expenses.
                            Get insights into your spending patterns and make better financial decisions.
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button className="btn-primary inline-flex items-center gap-2">
                            <FaPlus />
                            Add Transaction
                        </button>
                        <button className="btn-secondary">
                            View Dashboard
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📈</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Track Expenses</h3>
                    <p className="text-sm text-gray-600">
                        Monitor your daily expenses and categorize them for better insights
                    </p>
                </div>

                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💵</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Manage Income</h3>
                    <p className="text-sm text-gray-600">
                        Record all your income sources and track your earnings over time
                    </p>
                </div>

                <div className="glass-card p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Visual Reports</h3>
                    <p className="text-sm text-gray-600">
                        Get detailed charts and reports to understand your financial health
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
