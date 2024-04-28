import axios from 'axios';
import store from '@/store/index';

const storageService = axios.create({
    baseURL: import.meta.env.VITE_APP_STORAGE_URI,
    headers: {
        'access-token': store.getters.GET_ACCESS_TOKEN,
        'refresh-token': store.getters.GET_REFRESH_TOKEN
    }
});

storageService.interceptors.request.use((config) => {
    config.headers['access-token'] = store.getters.GET_ACCESS_TOKEN;
    config.headers['refresh-token'] = store.getters.GET_REFRESH_TOKEN;
    return config;
});

export { storageService };
