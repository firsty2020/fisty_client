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

const initialState = {
    pending: false,
    success: false,
    error: null,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return initialState;
        case AUTH_USER_REGISTER_PENDING:
        case AUTH_COMPLETE_REGISTRATION_PENDING:
        case AUTH_LOGIN_PENDING:
            return ({ pending: true, success: false, error: null });
        case AUTH_USER_REGISTER_RESOLVED:
        case AUTH_COMPLETE_REGISTRATION_RESOLVED:
        case AUTH_LOGIN_RESOLVED:
            return ({ pending: false, success: true, error: null });
        case AUTH_USER_REGISTER_FAILED:
        case AUTH_COMPLETE_REGISTRATION_FAILED:
        case AUTH_LOGIN_FAILED:
            return ({ error: action.payload, pending: false, success: false });
        case AUTH_GET_USER_RESOLVED:
            return ({ ...state, user: action.payload });
        case AUTH_GET_USER_FAILED:
            return ({ ...state, error: action.payload });
        default:
            return state;
    }
};

export const authPendingSelector = state => state.auth.pending;
export const authSuccessSelector = state => state.auth.success;

export const userSelector = state => state.auth.user;
