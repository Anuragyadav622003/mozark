import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.yourdomain.com', // Change this later
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Global logic to logout user if token expires
    }
    return Promise.reject(error);
  }
);

export default apiClient;