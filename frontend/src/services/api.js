import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE,
});

// Automatically attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses (token expired)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (email, password) => {
  const response = await apiClient.post('/auth/register', { email, password });
  return response.data;
};

export const getDashboard = async () => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};

export const getMissionsToday = async () => {
  const response = await apiClient.get('/missions/today');
  return response.data;
};