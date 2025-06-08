import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const admin_api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

admin_api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Atau dari Redux/Context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;