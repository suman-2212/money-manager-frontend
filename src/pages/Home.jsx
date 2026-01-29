import { useState, useEffect } from 'react';
import { FaPlus, FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionList from '../components/TransactionList';
import { transactionAPI, dashboardAPI } from '../services/api';

const Home = ({ onTransactionChange, refreshTrigger }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, [refreshTrigger]);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await dashboardAPI.getSummary();
            setStats({
                totalIncome: data.totalIncome || 0,
                totalExpense: data.totalExpense || 0,
                balance: (data.totalIncome || 0) - (data.totalExpense || 0),
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            // Set default values on error
            setStats({ totalIncome: 0, totalExpense: 0, balance: 0 });
        } finally {
            setLoading(false);
        }
    };

    const handleTransactionAdded = () => {
        setIsModalOpen(false);
        onTransactionChange();
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-5xl font-display font-bold text-gradient">
                    Welcome to Money Manager
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Track your income and expenses with ease. Manage your finances like a pro!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Income */}
                <div className="stat-card group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <FaArrowUp className="text-success-400 text-xl" />
                        </div>
                        <span className="badge-success">Income</span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-semibold mb-2">Total Income</h3>
                    <p className="text-3xl font-bold text-gradient-success">
                        ₹{loading ? '...' : stats.totalIncome.toLocaleString('en-IN')}
                    </p>
                </div>

                {/* Total Expense */}
                <div className="stat-card group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-danger-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <FaArrowDown className="text-danger-400 text-xl" />
                        </div>
                        <span className="badge-danger">Expense</span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-semibold mb-2">Total Expense</h3>
                    <p className="text-3xl font-bold text-gradient-danger">
                        ₹{loading ? '...' : stats.totalExpense.toLocaleString('en-IN')}
                    </p>
                </div>

                {/* Balance */}
                <div className="stat-card group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <FaWallet className="text-primary-400 text-xl" />
                        </div>
                        <span className="badge-primary">Balance</span>
                    </div>
                    <h3 className="text-slate-400 text-sm font-semibold mb-2">Current Balance</h3>
                    <p className={`text-3xl font-bold ${stats.balance >= 0 ? 'text-gradient-success' : 'text-gradient-danger'}`}>
                        ₹{loading ? '...' : stats.balance.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-white">Recent Transactions</h2>
                </div>
                <TransactionList
                    refreshTrigger={refreshTrigger}
                    onTransactionChange={onTransactionChange}
                    limit={10}
                />
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fab"
                aria-label="Add Transaction"
            >
                <FaPlus />
            </button>

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleTransactionAdded}
            />
        </div>
    );
};

export default Home;
