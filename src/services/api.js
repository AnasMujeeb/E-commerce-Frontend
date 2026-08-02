import axios from 'axios';

const API = axios.create({
  baseURL: 'https://e-commerce-backend-git-main-anasmujeebuddin-8333s-projects.vercel.app/api',
});

// Request Interceptor (Automatically attach JWT token if available)
API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default API;
