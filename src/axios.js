import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorToast } from './components/ui';

let refreshed = false;

const instance = axios.create({
    baseURL: 'https://sheltered-meadow-55057.herokuapp.com/api/v0/',
});

instance.interceptors.request.use((config) => {
    const token = (localStorage.getItem('auth_token') || '');
    if (token && !(config.headers.Authorization && config.headers.Authorization.includes('Refresh'))) {
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
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken && !refreshed && error.config &&
            error.response && error.response.status === 401) {
            refreshed = true;
            error.config.headers.Authorization = `Refresh ${refreshToken}`;
            return instance.request(error.config)
                .then(res => Promise.resolve(res))
                .catch(); //TODO handle this
        }
        renderErrorToast(transformError(errorData));
        return Promise.reject(transformError(errorData));
    });

const renderErrorToast = (message) => {
    const errorToastContainer = document.getElementById('error-toast-container');
    errorToastContainer.style.display = 'block';
    setTimeout(() => {
        errorToastContainer.style.display = 'none';
    }, 4000);
    ReactDOM.render(<ErrorToast
        message={message}
        container={errorToastContainer}/>, errorToastContainer);
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
                } else {
                    errors.push(`${field}: ${error[field]}\n`);
                }
            }
        }
    }
    return errors.join('');
};

export default instance;
