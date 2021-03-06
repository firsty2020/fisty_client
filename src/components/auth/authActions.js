import {
    AUTH_USER_REGISTER,
    AUTH_COMPLETE_REGISTRATION,
    AUTH_LOGIN,
    AUTH_GET_USER,
    AUTH_SET_PASSWORD,
    POST,
    GET,
    AUTH_PASSWORD_RESET,
    AUTH_STATE_RESET,
} from '../../helpers/constants/actionTypes';
import { createApiAction } from '../../helpers/utils';


export const registerUser = (credentials) => createApiAction({
    url: 'registration-request/',
    method: POST,
    data: credentials,
    label: AUTH_USER_REGISTER,
});

export const completeRegistration = (data, passwordToken) => createApiAction({
    url: `auth-users/sign-up/${passwordToken}/`,
    method: POST,
    data,
    label: AUTH_COMPLETE_REGISTRATION,
});

export const getAuthToken = (username, password) => createApiAction({
    url: 'token/',
    method: POST,
    data: { username, password },
    label: AUTH_LOGIN,
});

export const getUser = (userId) => createApiAction({
    url: `users/${userId}/`,
    method: GET,
    label: AUTH_GET_USER,
});

export const setPassword = (passwords, token) => createApiAction({
    url: `auth-users/set-password/${token}/`,
    method: POST,
    data: passwords,
    label: AUTH_SET_PASSWORD,
});

export const resetPassword = (data) => createApiAction({
    url: `/auth-users/reset-password/`,
    method: POST,
    data,
    label: AUTH_PASSWORD_RESET,
});

export const resetAuthState = () => ({
    type: AUTH_STATE_RESET,
});
