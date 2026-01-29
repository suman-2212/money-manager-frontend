import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export const transactionAPI = {
    getAll: (params) => api.get('/api/transactions', { params }),
    getById: (id) => api.get(`/api/transactions/${id}`),
    create: (data) => api.post('/api/transactions', data),
    update: (id, data) => api.put(`/api/transactions/${id}`, data),
    delete: (id) => api.delete(`/api/transactions/${id}`),
};

export const dashboardAPI = {
    getMonthly: (params) => api.get('/api/dashboard/monthly', { params }),
    getWeekly: (params) => api.get('/api/dashboard/weekly', { params }),
    getYearly: (params) => api.get('/api/dashboard/yearly', { params }),
    getSummary: (params) => api.get('/api/dashboard/summary', { params }),
};

export const accountAPI = {
    getAll: () => api.get('/api/accounts'),
    transfer: (data) => api.post('/api/accounts/transfer', data),
};

export default api;
