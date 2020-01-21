import {
    AUTH_USER_REGISTER_PENDING,
    AUTH_USER_REGISTER_SUCCESS,
    AUTH_USER_REGISTER_ERROR,
    AUTH_SET_PASSWORD_PENDING,
    AUTH_SET_PASSWORD_SUCCESS,
    AUTH_SET_PASSWORD_ERROR,
    AUTH_LOGIN_PENDING,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_GET_USER_SUCCESS,
} from '../../constants/actionTypes';


export const userRegisterPending = () => ({
    type: AUTH_USER_REGISTER_PENDING,
});

export const userRegisterSuccess = () => ({
    type: AUTH_USER_REGISTER_SUCCESS,
});

export const userRegisterError = (error) => ({
    type: AUTH_USER_REGISTER_ERROR,
    payload: error,
});

export const setPasswordPending = () => ({
    type: AUTH_SET_PASSWORD_PENDING,
});

export const setPasswordSuccess = () => ({
    type: AUTH_SET_PASSWORD_SUCCESS,
});

export const setPasswordError = (error) => ({
    type: AUTH_SET_PASSWORD_ERROR,
    payload: error,
});

export const loginPending = () => ({
    type: AUTH_LOGIN_PENDING,
});

export const loginSuccess = () => ({
    type: AUTH_LOGIN_SUCCESS,
});

export const loginError = (error) => ({
    type: AUTH_LOGIN_ERROR,
    payload: error,
});

export const fetchUserSuccess = (user) => ({
    type: AUTH_GET_USER_SUCCESS,
    payload: user,
});

export const fetchUserError = (error) => ({
    type: AUTH_GET_USER_SUCCESS,
    payload: error,
});


