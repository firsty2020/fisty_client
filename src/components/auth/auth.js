import jwt_decode from 'jwt-decode';
import { getUser } from './authActions';
import api from '../../axios';


export const refreshExpiredToken = (refreshToken) => {
    return new Promise((resolve, rej) => {
        api
            .post('token/refresh/', { refresh: refreshToken })
            .then(res => resolve(res))
            .catch(err => rej(err));
    });

};

export const getAuthUser = () => {
    const userId = (getUserFromToken() || {}).user_id;
    if (!userId)
        return;
    return getUser(userId);
};

export const getUserFromToken = () => {
    const token = localStorage.getItem('auth_token');
    let decoded = null;
    try {
        decoded = jwt_decode(token);
    } catch (e) {
        console.warn(e);
    }
    return decoded;
};

export const storeTokens = (token, refreshToken) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
};
