export const CATEGORIES = [
    { id: 'salary', name: 'Salary', type: 'income', icon: '💰', color: '#22c55e' },
    { id: 'freelance', name: 'Freelance', type: 'income', icon: '💼', color: '#3b82f6' },
    { id: 'investment', name: 'Investment', type: 'income', icon: '📈', color: '#8b5cf6' },
    { id: 'bonus', name: 'Bonus', type: 'income', icon: '🎁', color: '#f59e0b' },
    { id: 'other-income', name: 'Other Income', type: 'income', icon: '💵', color: '#10b981' },

    { id: 'fuel', name: 'Fuel', type: 'expense', icon: '⛽', color: '#ef4444' },
    { id: 'food', name: 'Food', type: 'expense', icon: '🍔', color: '#f97316' },
    { id: 'movie', name: 'Movie', type: 'expense', icon: '🎬', color: '#ec4899' },
    { id: 'shopping', name: 'Shopping', type: 'expense', icon: '🛍️', color: '#a855f7' },
    { id: 'medical', name: 'Medical', type: 'expense', icon: '🏥', color: '#ef4444' },
    { id: 'loan', name: 'Loan', type: 'expense', icon: '🏦', color: '#dc2626' },
    { id: 'rent', name: 'Rent', type: 'expense', icon: '🏠', color: '#f59e0b' },
    { id: 'utilities', name: 'Utilities', type: 'expense', icon: '💡', color: '#eab308' },
    { id: 'transport', name: 'Transport', type: 'expense', icon: '🚗', color: '#06b6d4' },
    { id: 'education', name: 'Education', type: 'expense', icon: '📚', color: '#3b82f6' },
    { id: 'entertainment', name: 'Entertainment', type: 'expense', icon: '🎮', color: '#8b5cf6' },
    { id: 'other-expense', name: 'Other Expense', type: 'expense', icon: '💸', color: '#6b7280' },
];

export const DIVISIONS = [
    { id: 'personal', name: 'Personal', icon: '👤', color: '#3b82f6' },
    { id: 'office', name: 'Office', icon: '🏢', color: '#8b5cf6' },
];

export const VIEW_TYPES = {
    MONTHLY: 'monthly',
    WEEKLY: 'weekly',
    YEARLY: 'yearly',
};

export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense',
};

export const EDIT_TIME_LIMIT_HOURS = 12;

export const DATE_FORMATS = {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy hh:mm a',
    API: 'yyyy-MM-dd',
    API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
};

export const CHART_COLORS = {
    income: '#22c55e',
    expense: '#ef4444',
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
};

export const API_ENDPOINTS = {
    TRANSACTIONS: '/api/transactions',
    DASHBOARD: '/api/dashboard',
    ACCOUNTS: '/api/accounts',
    SUMMARY: '/api/summary',
};
