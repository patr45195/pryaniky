import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const HOST = axios.create({
  baseURL: API_URL,
});

HOST.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth'] = token;
  }
  return config;
});

export default HOST;
