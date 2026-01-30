import { useState } from 'react';
import { FaPlus, FaChartLine, FaWallet, FaRocket, FaChartBar, FaArrowUp, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SummarySection from '../components/SummarySection';
import AddTransactionModal from '../components/AddTransactionModal';

const Home = ({ onTransactionChange, refreshTrigger }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();

    const handleAddSuccess = () => {
        onTransactionChange();
    };

    return (
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Hero Section with Gradient */}
            <div className="w-full text-center space-y-4 sm:space-y-5 py-6 sm:py-8 lg:py-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3 gradient-text leading-tight">
                    Welcome to Money Manager
                </h1>
                <div className="w-full flex justify-center">
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-relaxed text-center max-w-3xl">
                        Track your income and expenses efficiently. Take control of your finances today!
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <SummarySection refreshTrigger={refreshTrigger} />

            {/* Getting Started Card with Glassmorphism */}
            <div className="glass-card p-6 sm:p-8 lg:p-10 text-center mx-auto max-w-4xl">
                <div className="space-y-6 sm:space-y-7 lg:space-y-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto icon-pulse"
                        style={{
                            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                        }}>
                        <FaChartBar className="text-white text-3xl sm:text-4xl" />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text px-4">
                            Start Managing Your Finances
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto px-4 sm:px-6">
                            Add your first transaction to begin tracking your income and expenses.
                            Get insights into your spending patterns and make better financial decisions.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary inline-flex items-center justify-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                        >
                            <FaPlus />
                            <span>Add Transaction</span>
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn-secondary inline-flex items-center justify-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                        >
                            <FaChartLine />
                            <span>View Dashboard</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Grid with Enhanced Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                <div className="glass-card-hover p-6 sm:p-7 lg:p-8 text-center group flex flex-col h-full">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110 flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaArrowUp className="text-white text-2xl sm:text-3xl" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg sm:text-xl lg:text-2xl">Track Expenses</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                        Monitor your daily expenses and categorize them for better insights
                    </p>
                </div>

                <div className="glass-card-hover p-6 sm:p-7 lg:p-8 text-center group flex flex-col h-full">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110 flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaDollarSign className="text-white text-2xl sm:text-3xl" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg sm:text-xl lg:text-2xl">Manage Income</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                        Record all your income sources and track your earnings over time
                    </p>
                </div>

                <div className="glass-card-hover p-6 sm:p-7 lg:p-8 text-center group flex flex-col h-full">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110 flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #1a202c 0%, #000000 100%)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaChartLine className="text-white text-2xl sm:text-3xl" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg sm:text-xl lg:text-2xl">Visual Reports</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                        Get detailed charts and reports to understand your financial health
                    </p>
                </div>
            </div>

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleAddSuccess}
            />

            {/* Floating Action Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="fab"
                title="Add Transaction"
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default Home;
