import axios from 'axios';
import { store } from '../store/store';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,
});

// ✅ REQUEST INTERCEPTOR – attach token correctly
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR – handle token expiry globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;

    if (
      response?.status === 401 &&
      response.data?.message?.toLowerCase()?.includes('token')
    ) {
      localStorage.removeItem('token');
      // Optional: Dispatch logout action to clear Redux
      // store.dispatch({ type: 'auth/logout' });

      alert('Session expired or invalid. Please log in again.');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
