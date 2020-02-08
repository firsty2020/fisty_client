import {
    AUTH_USER_REGISTER_PENDING,
    AUTH_USER_REGISTER_SUCCESS,
    AUTH_USER_REGISTER_ERROR,
    AUTH_COMPLETE_REGISTRATION_PENDING,
    AUTH_COMPLETE_REGISTRATION_SUCCESS,
    AUTH_COMPLETE_REGISTRATION_ERROR,
    AUTH_LOGIN_PENDING,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_GET_USER_SUCCESS,
    AUTH_GET_USER_ERROR,
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

export const completeRegistrationPending = () => ({
    type: AUTH_COMPLETE_REGISTRATION_PENDING,
});

export const completeRegistrationSuccess = () => ({
    type: AUTH_COMPLETE_REGISTRATION_SUCCESS,
});

export const completeRegistrationError = (error) => ({
    type: AUTH_COMPLETE_REGISTRATION_ERROR,
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
    type: AUTH_GET_USER_ERROR,
    payload: error,
});


