import { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { transactionAPI } from '../services/api';

const AddTransactionModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = {
        income: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other'],
        expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other']
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Reset category when type changes
            ...(name === 'type' ? { category: '' } : {})
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        if (!formData.category) {
            setError('Please select a category');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await transactionAPI.create({
                ...formData,
                amount: parseFloat(formData.amount)
            });

            // Reset form
            setFormData({
                type: 'expense',
                amount: '',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            });

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add transaction');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Add Transaction</h2>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                        aria-label="Close"
                    >
                        <FaTimes className="text-gray-500 text-lg" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Transaction Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
                                className={`py-3.5 px-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${formData.type === 'income'
                                        ? 'bg-green-600 text-white shadow-lg transform scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                💰 Income
                            </button>
                            <button
                                type="button"
                                onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
                                className={`py-3.5 px-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${formData.type === 'expense'
                                        ? 'bg-red-600 text-white shadow-lg transform scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                💸 Expense
                            </button>
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2.5">
                            Amount (₹)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2.5">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="select-field w-full"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories[formData.type].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2.5">
                            Description <span className="text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add a note about this transaction..."
                            rows="3"
                            className="input-field resize-none w-full"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2.5">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input-field w-full"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1 order-2 sm:order-1"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1 inline-flex items-center justify-center gap-2 order-1 sm:order-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <FaPlus />
                                    Add Transaction
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
