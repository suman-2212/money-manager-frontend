import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CATEGORIES, DIVISIONS, TRANSACTION_TYPES } from '../utils/constants';
import { transactionAPI } from '../services/api';

const AddTransactionModal = ({ isOpen, onClose, onSuccess }) => {
    const [activeTab, setActiveTab] = useState(TRANSACTION_TYPES.EXPENSE);
    const [formData, setFormData] = useState({
        type: TRANSACTION_TYPES.EXPENSE,
        amount: '',
        category: '',
        division: 'personal',
        description: '',
        date: new Date().toISOString().slice(0, 16),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFormData({
            ...formData,
            type: tab,
            category: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.amount || !formData.category) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            await transactionAPI.create({
                ...formData,
                amount: parseFloat(formData.amount),
            });

            // Reset form
            setFormData({
                type: TRANSACTION_TYPES.EXPENSE,
                amount: '',
                category: '',
                division: 'personal',
                description: '',
                date: new Date().toISOString().slice(0, 16),
            });

            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add transaction');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = CATEGORIES.filter(cat => cat.type === activeTab);

    return (
        <div className="modal-overlay flex items-center justify-center" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-white">Add Transaction</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
                    >
                        <FaTimes className="text-slate-400" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-6">
                    <button
                        onClick={() => handleTabChange(TRANSACTION_TYPES.INCOME)}
                        className={activeTab === TRANSACTION_TYPES.INCOME ? 'tab-active' : 'tab'}
                    >
                        💰 Income
                    </button>
                    <button
                        onClick={() => handleTabChange(TRANSACTION_TYPES.EXPENSE)}
                        className={activeTab === TRANSACTION_TYPES.EXPENSE ? 'tab-active' : 'tab'}
                    >
                        💸 Expense
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-danger-500/20 border border-danger-500/30 text-danger-300 px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {/* Amount */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Amount <span className="text-danger-400">*</span>
                        </label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className="input-field"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Category <span className="text-danger-400">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            <option value="">Select category</option>
                            {filteredCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Division */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Division
                        </label>
                        <select
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            className="select-field"
                        >
                            {DIVISIONS.map((div) => (
                                <option key={div.id} value={div.id}>
                                    {div.icon} {div.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description (optional)"
                            className="input-field"
                            maxLength="100"
                        />
                    </div>

                    {/* Date & Time */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={activeTab === TRANSACTION_TYPES.INCOME ? 'btn-success flex-1' : 'btn-danger flex-1'}
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : `Add ${activeTab === TRANSACTION_TYPES.INCOME ? 'Income' : 'Expense'}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;
