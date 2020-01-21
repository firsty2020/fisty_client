import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sheltered-meadow-55057.herokuapp.com/api/v0/',
});

instance.interceptors.request.use(function (config) {
    const token = (localStorage.getItem('auth_token') || '');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
