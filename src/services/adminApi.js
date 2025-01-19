import axios from 'axios';

const adminApi = axios.create({
    baseURL: 'http://localhost:8080/admin',
    headers: {
        'Content-Type': 'application/json',
    }
});


// Interceptor to handle JWT
adminApi.interceptors.request.use(config => {
    const token = localStorage.getItem('adminToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
export default adminApi;