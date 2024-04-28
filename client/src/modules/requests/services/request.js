import { apiService } from '@/services/api_service';

export const requestAPI = {
    getList(limit = 10) {
        return apiService.get(`/request/getList?limit=${limit}`);
    },

    getMyList(limit = 10) {
        return apiService.get(`/request/getMyList?limit=${limit}`);
    },

    create(payload) {
        return apiService.post(`/request/create`, payload);
    },
    response(payload) {
        return apiService.post(`/request/response`, payload);
    }
};
