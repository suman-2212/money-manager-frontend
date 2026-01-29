import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaClock, FaFilter } from 'react-icons/fa';
import { transactionAPI } from '../services/api';
import { CATEGORIES, DIVISIONS } from '../utils/constants';
import { formatDateTime, canEditTransaction, getRemainingEditTime } from '../utils/dateUtils';
import EditTransactionModal from './EditTransactionModal';
import FilterPanel from './FilterPanel';

const TransactionList = ({ refreshTrigger, onTransactionChange, limit }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchTransactions();
    }, [refreshTrigger, filters]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const params = { ...filters };
            if (limit) params.limit = limit;

            const data = await transactionAPI.getAll(params);
            setTransactions(data.transactions || data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) {
            return;
        }

        try {
            await transactionAPI.delete(id);
            onTransactionChange();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete transaction');
        }
    };

    const handleEdit = (transaction) => {
        if (!canEditTransaction(transaction.createdAt)) {
            alert('Cannot edit transaction after 12 hours');
            return;
        }
        setEditingTransaction(transaction);
    };

    const handleEditSuccess = () => {
        setEditingTransaction(null);
        onTransactionChange();
    };

    const getCategoryInfo = (categoryId) => {
        return CATEGORIES.find(cat => cat.id === categoryId) || { name: categoryId, icon: '📝', color: '#6b7280' };
    };

    const getDivisionInfo = (divisionId) => {
        return DIVISIONS.find(div => div.id === divisionId) || { name: divisionId, icon: '📁' };
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setShowFilters(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No transactions found</p>
                <p className="text-slate-500 text-sm mt-2">Add your first transaction to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filter Button */}
            {!limit && (
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <FaFilter />
                        Filters
                    </button>
                </div>
            )}

            {/* Filter Panel */}
            {showFilters && (
                <FilterPanel
                    onApply={handleFilterChange}
                    onClose={() => setShowFilters(false)}
                />
            )}

            {/* Transactions List */}
            <div className="space-y-3">
                {transactions.map((transaction) => {
                    const category = getCategoryInfo(transaction.category);
                    const division = getDivisionInfo(transaction.division);
                    const canEdit = canEditTransaction(transaction.createdAt);
                    const remainingHours = getRemainingEditTime(transaction.createdAt);

                    return (
                        <div
                            key={transaction._id}
                            className="glass-card-hover p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                {/* Category Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: `${category.color}20` }}
                                >
                                    {category.icon}
                                </div>

                                {/* Transaction Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-white">{category.name}</h3>
                                        <span className="badge-primary text-xs">{division.icon} {division.name}</span>
                                    </div>
                                    {transaction.description && (
                                        <p className="text-slate-400 text-sm mb-1">{transaction.description}</p>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <FaClock className="text-xs" />
                                        <span>{formatDateTime(transaction.date)}</span>
                                        {canEdit && (
                                            <span className="text-success-400">• Editable for {remainingHours}h</span>
                                        )}
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="text-right">
                                    <p
                                        className={`text-2xl font-bold ${transaction.type === 'income' ? 'text-success-400' : 'text-danger-400'
                                            }`}
                                    >
                                        {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => handleEdit(transaction)}
                                    disabled={!canEdit}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${canEdit
                                            ? 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
                                            : 'bg-white/5 text-slate-600 cursor-not-allowed'
                                        }`}
                                    title={canEdit ? 'Edit transaction' : 'Cannot edit after 12 hours'}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(transaction._id)}
                                    className="w-10 h-10 rounded-lg bg-danger-500/20 text-danger-400 hover:bg-danger-500/30 flex items-center justify-center transition-all duration-200"
                                    title="Delete transaction"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edit Modal */}
            {editingTransaction && (
                <EditTransactionModal
                    transaction={editingTransaction}
                    onClose={() => setEditingTransaction(null)}
                    onSuccess={handleEditSuccess}
                />
            )}
        </div>
    );
};

export default TransactionList;
