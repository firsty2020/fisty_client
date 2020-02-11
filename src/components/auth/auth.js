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
import { handleResponseErrors } from '../../utils';


const registerUser = (credentials) => {
    return dispatch => {
        dispatch(userRegisterPending());
        api
            .post('registration-request/', credentials)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => dispatch(userRegisterError(handleResponseErrors(error))));
    };
};

const completeRegistration = (userDetails, passwordToken) => {
    return dispatch => {
        dispatch(completeRegistrationPending());
        api
            .post(`auth-users/sign-up/${passwordToken}/`, userDetails)
            .then(() => dispatch(completeRegistrationSuccess()))
            .catch(error => dispatch(completeRegistrationError(handleResponseErrors(error))));
    };
};

const getAuthToken = (username, password) => {
    return dispatch => {
        dispatch(loginPending());
        api
            .post('token/', {username, password})
            .then((res) => {
                storeToken(res.data.access);
                dispatch(loginSuccess());
            })
            .catch(error => dispatch(loginError(error.detail)));
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
        console.warn(e);
    }
    return decoded ? decoded.user_id : null;
};

export {
    registerUser,
    completeRegistration,
    getAuthToken,
    getAuthUser,
}
