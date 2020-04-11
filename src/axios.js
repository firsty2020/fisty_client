import axios from 'axios';
import { renderErrorToast } from './components/ui/ErrorToast/ErrorToast';
import { refreshExpiredToken } from './components/auth/auth';


export const baseURL = 'https://sheltered-meadow-55057.herokuapp.com/api/v0/';


const instance = axios.create({
    baseURL,
});


instance.interceptors.request.use(
    (request) => {
        setHeaders(request);
        return request;
    },
    (error) => Promise.reject(error));

let refreshedRequestUrl = '';

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
        handleNotAuthorizedError(error);
        renderErrorToast(errorMessage);
        return Promise.reject(errorMessage);
    });

const handleNotAuthorizedError = (error) => {
    const loginPath = '/login';
    if (error.response
        && error.response.status === 401
        && window.location.pathname !== loginPath
    ) {
        setTimeout(() => window.location.pathname = loginPath, 2000);
    }
};


const handleTokenRefresh = (error, message, refreshToken) => {
    refreshedRequestUrl = error.config.url;
    return refreshExpiredToken(refreshToken)
        .then(response => {
            refreshedRequestUrl = '';
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
    if (typeof error === 'string') {
        return error;
    } else if (error.length && typeof error !== 'string') {
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


const setHeaders = (req) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers['Accept-Language'] = 'ru';
};


export default instance;
