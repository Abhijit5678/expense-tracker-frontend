import axios from 'axios';

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiBaseUrl.endsWith('/api')
  ? rawApiBaseUrl
  : `${rawApiBaseUrl.replace(/\/$/, '')}/api`;

console.log('API URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Transaction APIs
export const getTransactions = async () => {
  const response = await api.get('/transactions');
  return response.data;
};

export const addTransaction = async (transaction) => {
  const response = await api.post('/transactions', transaction);
  return response.data;
};

export const updateTransaction = async (id, transaction) => {
  const response = await api.put(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

// Budget APIs
export const getBudget = async (monthYear) => {
  const response = await api.get('/budget', { params: { monthYear } });
  return response.data;
};

export const setBudget = async (budget) => {
  const response = await api.post('/budget', budget);
  return response.data;
};

export const getBudgetStatus = async (monthYear) => {
  const response = await api.get('/budget/status', { params: { monthYear } });
  return response.data;
};

// Analytics APIs
export const getSummary = async () => {
  const response = await api.get('/analytics/summary');
  return response.data;
};

export const getCategoryData = async () => {
  const response = await api.get('/analytics/category');
  return response.data;
};

export const getMonthlyTrend = async () => {
  const response = await api.get('/analytics/monthly');
  return response.data;
};

// Credit Card APIs
export const getCreditCards = async () => {
  const response = await api.get('/credit-cards');
  return response.data;
};

export const addCreditCard = async (card) => {
  const response = await api.post('/credit-cards', card);
  return response.data;
};

export const payCreditCardBill = async (id, statementMonth) => {
  const response = await api.post(`/credit-cards/${id}/pay-bill`, null, { params: { statementMonth } });
  return response.data;
};

// Auth APIs
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export default api;
