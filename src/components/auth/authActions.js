import {
    AUTH_USER_REGISTER_PENDING,
    AUTH_USER_REGISTER_RESOLVED,
    AUTH_USER_REGISTER_FAILED,
    AUTH_COMPLETE_REGISTRATION_PENDING,
    AUTH_COMPLETE_REGISTRATION_RESOLVED,
    AUTH_COMPLETE_REGISTRATION_FAILED,
    AUTH_LOGIN_PENDING,
    AUTH_LOGIN_RESOLVED,
    AUTH_LOGIN_FAILED,
    AUTH_GET_USER_RESOLVED,
    AUTH_GET_USER_FAILED,
} from '../../constants/actionTypes';


export const userRegisterPending = () => ({
    type: AUTH_USER_REGISTER_PENDING,
});

export const userRegisterSuccess = () => ({
    type: AUTH_USER_REGISTER_RESOLVED,
});

export const userRegisterError = (error) => ({
    type: AUTH_USER_REGISTER_FAILED,
    payload: error,
});

export const completeRegistrationPending = () => ({
    type: AUTH_COMPLETE_REGISTRATION_PENDING,
});

export const completeRegistrationSuccess = () => ({
    type: AUTH_COMPLETE_REGISTRATION_RESOLVED,
});

export const completeRegistrationError = (error) => ({
    type: AUTH_COMPLETE_REGISTRATION_FAILED,
    payload: error,
});

export const loginPending = () => ({
    type: AUTH_LOGIN_PENDING,
});

export const loginSuccess = () => ({
    type: AUTH_LOGIN_RESOLVED,
});

export const loginError = (error) => ({
    type: AUTH_LOGIN_FAILED,
    payload: error,
});

export const fetchUserSuccess = (user) => ({
    type: AUTH_GET_USER_RESOLVED,
    payload: user,
});

export const fetchUserError = (error) => ({
    type: AUTH_GET_USER_FAILED,
    payload: error,
});


