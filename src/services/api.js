import axios from "axios";

const API_BASE_URLS = 'https://localhost:7275/api';

const api = axios.create({
    baseURL: API_BASE_URLS,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'language': 'tr'
    },
    timeout: 100000
});

api.interceptors.request.use((config) =>{

    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) =>{
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if(error.response){
        const originalRequest = error.config;

        const errorMessage = error.response.data?.message || 'Hata Oluştu.';
        const validationErrors = error.response.data?.validationErrors || null;

        return Promise.reject({
            status : error.response.status,
            message : errorMessage,
            validationErrors : validationErrors,
            data: error.response.data
        });
    } else if(error.request){
        return Promise.reject({
            status: 0,
            message: 'Sunucuya Ulaşılamadı.',
            validationErrors: null
        });
    }
    else{
        return Promise.reject({
            status: 0,
            message: 'Hata Oluştu. Lütfen Tekrar Deneyiniz.',
            validationErrors: null
        });
    }
});

export default api;