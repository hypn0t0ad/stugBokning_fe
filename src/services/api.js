import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/cabins',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;