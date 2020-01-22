import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sheltered-meadow-55057.herokuapp.com/api/v0/',
});

instance.interceptors.request.use( (config) => {
    const token = (localStorage.getItem('auth_token') || '');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},  (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use( (config) => {
    return config;
},  (error) => {
    return Promise.reject(error.response);
});

export default instance;
