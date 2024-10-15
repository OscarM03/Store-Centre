// api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Adjust to your API base URL
});

// Define protected routes
const protectedRoutes = ['api/v1/cart/', 'api/v1/order/', 'api/v1/profile/', 'api/v1/mpesa/'];
 // Add other protected routes as needed

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Only add token for protected routes
    if (protectedRoutes.some(route => config.url.startsWith(route))) {
      const token = Cookies.get('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
