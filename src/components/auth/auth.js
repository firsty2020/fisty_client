import jwt_decode from 'jwt-decode';

import {
    userRegisterPending,
    userRegisterSuccess,
    userRegisterError,
    setPasswordPending,
    setPasswordError,
    setPasswordSuccess,
    loginPending,
    loginSuccess,
    loginError,
    fetchUserSuccess,
    fetchUserError,
} from './authActions';
import api from '../../axios';


const registerUser = (user) => {
    return dispatch => {
        dispatch(userRegisterPending());
        api
            .post('sign-up/', user)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => dispatch(userRegisterError(error)));
    };
};

const setPassword = (passwords, passwordToken) => {
    return dispatch => {
        dispatch(setPasswordPending());
        api
            .post(`auth-users/set-password/${passwordToken}/`, passwords)
            .then(() => dispatch(setPasswordSuccess()))
            .catch(error => dispatch(setPasswordError(error.data)));
    };
};

const getAuthToken = (username, password) => {
    return dispatch => {
        dispatch(loginPending());
        api
            .post('token/', { username, password })
            .then((res) => {
                storeToken( res.data.access);
                dispatch(loginSuccess());
            })
            .catch(error => dispatch(loginError(error.data.detail)));
    }
};

const storeToken = (token) => localStorage.setItem('auth_token', token);

const getAuthUser = () => {
    const userId = getUserIdByFromToken();
    return dispatch => {
        if (!userId)
            return dispatch(fetchUserError('Not authenticated'));
        api
            .get(`users/${userId}`,)
            .then((res) => dispatch(fetchUserSuccess(res.data)))
            .catch(error => dispatch(fetchUserError(error)));
    }
};

const getUserIdByFromToken = () => {
    const token = localStorage.getItem('auth_token');
    let decoded;
    try {
        decoded = jwt_decode(token);
    } catch (e) {
        console.log(e);
    }
    return decoded ? decoded.user_id : null;
};

export {
    registerUser,
    setPassword,
    getAuthToken,
    getAuthUser,
}
