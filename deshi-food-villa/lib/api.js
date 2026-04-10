// lib/api.js
import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
  withCredentials: false,
});

export default api;
