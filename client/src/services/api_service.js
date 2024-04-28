import axios from 'axios';

const apiService = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URI
});

export { apiService };
