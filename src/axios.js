import axios from 'axios';
import { renderErrorToast } from './components/ui/ErrorToast/ErrorToast';
import { refreshExpiredToken } from './components/auth/auth';

let refreshed = false;

const instance = axios.create({
    baseURL: 'https://sheltered-meadow-55057.herokuapp.com/api/v0/',
});

instance.interceptors.request.use((config) => {
    const token = (localStorage.getItem('auth_token') || '');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = 'ru';
    return config;
}, (error) => {
    return Promise.reject(error);
});


instance.interceptors.response.use((config) => config,
    (error) => {
        const errorData = error.response && error.response.data ? error.response.data : error.response;
        const errorMessage = transformError(errorData);
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken && !refreshed && error.config &&
            error.response && error.response.status === 401) {
            return handleRefreshToken(error, errorMessage, refreshToken);
        }
        if  (error.response && error.response.status === 401) {
            setTimeout(() => window.location.pathname = 'login', 3000);
        }
        renderErrorToast(errorMessage);
        return Promise.reject(errorMessage);
});


const handleRefreshToken = (error, message, refreshToken) => {
    refreshed = true;
    return refreshExpiredToken(refreshToken)
        .then(response => {
            localStorage.setItem('auth_token', response.data.access);
            return instance.request(error.config)
                .then(res => {
                    return Promise.resolve(res)
                });
        }).catch(() => {
            renderErrorToast(message);
            return Promise.reject(message);
        });
};


const transformError = (error) => {
    const errors = [];
    if (error.length) {
        return error.join('\n');
    } else {
        for (const field in error) {
            if (error.hasOwnProperty(field)) {
                if (field === 'non_field_errors') {
                    errors.push(error[field] + '\n');
                } else if (field === 'detail') {
                    errors.push(`${error[field]}\n`);
                    break;
                }
                else {
                    errors.push(`${field}: ${error[field]}\n`);
                }
            }
        }
    }
    return errors.join('');
};


export default instance;
