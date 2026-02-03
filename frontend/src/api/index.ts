import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Interceptors for Auth if needed
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

// API Endpoints
export const authApi = {
    login: (credentials: any) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
    me: () => api.get('/auth/me'),
};

export const sportsApi = {
    getCalendar: (month: string) => api.get(`/sports/calendar?month=${month}`),
    saveChecklist: (date: string, items: any) => api.post(`/sports/checklist/${date}`, { items }),
    updateWeights: (date: string, weights: any) => api.post(`/sports/weights/${date}`, { weights }),
};

// Add more API groups here...
