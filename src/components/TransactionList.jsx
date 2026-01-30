import { useState, useEffect } from 'react';
import { FaEdit, FaSearch, FaFilter, FaMoneyBillWave, FaShoppingCart, FaUtensils, FaHome as FaHomeIcon, FaCar, FaFilm, FaHeartbeat, FaGraduationCap, FaEllipsisH } from 'react-icons/fa';
import { transactionAPI } from '../services/api';
import EditTransactionModal from './EditTransactionModal';

const TransactionList = ({ refreshTrigger }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetchTransactions();
    }, [refreshTrigger]);

    const fetchTransactions = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await transactionAPI.getAll();
            setTransactions(data.transactions || data || []);
        } catch (err) {
            setError('Failed to load transactions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setShowEditModal(true);
    };

    const handleEditSuccess = () => {
        fetchTransactions();
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Salary': <FaMoneyBillWave />,
            'Freelance': <FaMoneyBillWave />,
            'Investment': <FaMoneyBillWave />,
            'Food': <FaUtensils />,
            'Shopping': <FaShoppingCart />,
            'Rent': <FaHomeIcon />,
            'Transportation': <FaCar />,
            'Entertainment': <FaFilm />,
            'Healthcare': <FaHeartbeat />,
            'Education': <FaGraduationCap />,
        };
        return icons[category] || <FaEllipsisH />;
    };

    const getCategoryColor = (category, type) => {
        if (type === 'income') {
            return {
                bg: 'linear-gradient(135deg, rgba(45, 55, 72, 0.1) 0%, rgba(26, 32, 44, 0.05) 100%)',
                icon: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                text: '#1a202c'
            };
        } else {
            const colors = {
                'Food': { bg: 'rgba(74, 85, 104, 0.1)', icon: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', text: '#2d3748' },
                'Shopping': { bg: 'rgba(107, 114, 128, 0.1)', icon: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', text: '#4b5563' },
                'Transportation': { bg: 'rgba(75, 85, 99, 0.1)', icon: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)', text: '#374151' },
                'Entertainment': { bg: 'rgba(55, 65, 81, 0.1)', icon: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)', text: '#1f2937' },
                'Healthcare': { bg: 'rgba(31, 41, 55, 0.1)', icon: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', text: '#111827' },
            };
            return colors[category] || { bg: 'rgba(107, 114, 128, 0.1)', icon: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)', text: '#4b5563' };
        }
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="glass-card p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <span className="ml-4 text-gray-700 font-semibold text-lg">Loading transactions...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-card p-8">
                <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
                        }}>
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <p className="text-red-600 font-semibold text-lg">{error}</p>
                    <button onClick={fetchTransactions} className="btn-primary mt-4">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="glass-card p-5 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text flex items-center gap-2">
                        <FaFilter className="text-lg sm:text-xl" />
                        <span>Recent Transactions</span>
                    </h2>
                    <span className="badge-primary text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap">
                        {filteredTransactions.length} {filteredTransactions.length === 1 ? 'Transaction' : 'Transactions'}
                    </span>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-6">
                    <div className="flex-1 relative min-w-0">
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pr-11 sm:pr-12 text-sm sm:text-base w-full"
                        />
                        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                    </div>
                    <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                        {['all', 'income', 'expense'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${filterType === type
                                    ? 'glass-dark text-white shadow-lg'
                                    : 'glass text-gray-700 hover:bg-white'
                                    }`}
                                style={filterType === type ? {
                                    background: type === 'income'
                                        ? 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)'
                                        : type === 'expense'
                                            ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
                                            : 'linear-gradient(135deg, #1a202c 0%, #000000 100%)',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                                } : {}}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transaction List */}
                {filteredTransactions.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 icon-pulse"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                            }}>
                            <span className="text-5xl">📝</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No transactions found</h3>
                        <p className="text-gray-600">
                            {searchTerm ? 'Try adjusting your search' : 'Add your first transaction to get started'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTransactions.map((transaction, index) => {
                            const colors = getCategoryColor(transaction.category, transaction.type);
                            return (
                                <div
                                    key={transaction._id}
                                    className="glass-card-hover p-5 group animate-slide-up"
                                    style={{
                                        background: colors.bg,
                                        animationDelay: `${index * 0.05}s`
                                    }}
                                >
                                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                            {/* Category Icon */}
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg transition-transform group-hover:scale-110 flex-shrink-0"
                                                style={{
                                                    background: colors.icon,
                                                    boxShadow: `0 4px 15px ${colors.text}40`
                                                }}>
                                                {getCategoryIcon(transaction.category)}
                                            </div>

                                            {/* Transaction Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                                                    <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                                                        {transaction.category}
                                                    </h3>
                                                    <span className={`${transaction.type === 'income' ? 'badge-success' : 'badge-danger'} text-xs flex-shrink-0`}>
                                                        {transaction.type}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-xs sm:text-sm mb-1 truncate">
                                                    {transaction.description || 'No description'}
                                                </p>
                                                <p className="text-gray-500 text-xs flex items-center gap-1">
                                                    <span>📅</span>
                                                    {formatDate(transaction.date)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Amount and Actions */}
                                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                                            <div className="text-right">
                                                <p className={`text-lg sm:text-2xl font-bold whitespace-nowrap ${transaction.type === 'income' ? 'gradient-text-success' : 'gradient-text-danger'
                                                    }`}>
                                                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                                                </p>
                                            </div>

                                            {/* Edit Button */}
                                            <button
                                                onClick={() => handleEdit(transaction)}
                                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 flex-shrink-0"
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                                                }}
                                                title="Edit transaction"
                                            >
                                                <FaEdit className="text-white text-sm sm:text-base" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <EditTransactionModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedTransaction(null);
                }}
                onSuccess={handleEditSuccess}
                transaction={selectedTransaction}
            />
        </>
    );
};

export default TransactionList;
