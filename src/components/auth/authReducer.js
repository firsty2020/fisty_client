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
    AUTH_GET_USER_ERROR,
} from '../../constants/actionTypes';

const initialState = {
    pending: false,
    success: false,
    error: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return initialState;
        case AUTH_USER_REGISTER_PENDING:
        case AUTH_SET_PASSWORD_PENDING:
        case AUTH_LOGIN_PENDING:
            return ({pending: true, success: false, error: false});
        case AUTH_USER_REGISTER_SUCCESS:
        case AUTH_SET_PASSWORD_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
            return ({pending: false, success: true, error: false});
        case AUTH_USER_REGISTER_ERROR:
        case AUTH_SET_PASSWORD_ERROR:
        case AUTH_LOGIN_ERROR:
            return ({error: action.payload, pending: false, success: false});
        case AUTH_GET_USER_SUCCESS:
            return ({...state, user: action.payload});
        case AUTH_GET_USER_ERROR:
            return ({...state, error: action.payload});
        default:
            return state;
    }
};

export const authPending = state => state.auth.pending;
export const authFailed = state => state.auth.error;
export const authSucceed = state => state.auth.success;

export const getUser = state => state.auth.user;
export const getUserFailed = state => state.auth.error;
