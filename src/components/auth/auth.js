import jwt_decode from 'jwt-decode';
import {
    userRegisterPending,
    userRegisterSuccess,
    userRegisterError,
    completeRegistrationPending,
    completeRegistrationError,
    completeRegistrationSuccess,
    loginPending,
    loginSuccess,
    loginError,
    fetchUserSuccess,
    fetchUserError,
} from './authActions';
import api from '../../axios';


export const registerUser = (credentials) => {
    return dispatch => {
        dispatch(userRegisterPending());
        api
            .post('registration-request/', credentials)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => dispatch(userRegisterError(error)));
    };
};

export const completeRegistration = (userDetails, passwordToken) => {
    return dispatch => {
        dispatch(completeRegistrationPending());
        api
            .post(`auth-users/sign-up/${passwordToken}/`, userDetails)
            .then(() => dispatch(completeRegistrationSuccess()))
            .catch(error => dispatch(completeRegistrationError(error)));
    };
};

export const getAuthToken = (username, password) => {
    return dispatch => {
        dispatch(loginPending());
        api
            .post('token/', {username, password})
            .then((res) => {
                storeTokens(res.data.access, res.data.refresh);
                dispatch(loginSuccess());
            })
            .catch(error => dispatch(loginError(error)));
    }
};

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
    return dispatch => {
        if (!userId)
            return dispatch(fetchUserError('Not authenticated'));
        api
            .get(`users/${userId}/`,)
            .then((res) => dispatch(fetchUserSuccess(res.data)))
            .catch(error => dispatch(fetchUserError(error)));
    }
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

const storeTokens = (token, refreshToken) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
};
