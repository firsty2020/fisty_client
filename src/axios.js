import axios from 'axios';

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

instance.interceptors.response.use((config) => {
    return config;
}, (error) => {
    const errorData = error.response && error.response.data ? error.response.data : error.response;
    return Promise.reject(transformError(errorData));
});

export default instance;


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
