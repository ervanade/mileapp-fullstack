import axios from 'axios';
import Cookies from "js-cookie";

// Ambil X-API-KEY dari .env (Vite)
const API_KEY = import.meta.env.VITE_X_API_KEY;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',

        ...(API_KEY && { 'X-API-KEY': API_KEY }),
    },
});

api.interceptors.request.use(config => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;