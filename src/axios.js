import axios from 'axios';
import { renderErrorToast } from './components/ui/ErrorToast/ErrorToast';
import { refreshExpiredToken } from './components/auth/auth';


let refreshedRequestUrl = '';

export const baseURL = 'https://sheltered-meadow-55057.herokuapp.com/api/v0/';

const instance = axios.create({
    baseURL,
});


instance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        request.headers['Accept-Language'] = 'ru';
        return request;
    },
    (error) => Promise.reject(error));


instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorData = error.response && error.response.data ? error.response.data : error.response;
        const errorMessage = transformError(errorData);
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken
            && refreshedRequestUrl !== error.config.url
            && error.config
            && error.response
            && error.response.status === 401) {
            return handleTokenRefresh(error, errorMessage, refreshToken);
        }
        if  (error.response && error.response.status === 401) {
             setTimeout(() => window.location.pathname = 'login', 3000);
        }
        renderErrorToast(errorMessage);
        return Promise.reject(errorMessage);
    });


const handleTokenRefresh = (error, message, refreshToken) => {
    refreshedRequestUrl = error.config.url;
    return refreshExpiredToken(refreshToken)
        .then(response => {
            localStorage.setItem('auth_token', response.data.access);
            return instance.request(error.config).then(res => Promise.resolve(res));
        })
        .catch(() => {
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
