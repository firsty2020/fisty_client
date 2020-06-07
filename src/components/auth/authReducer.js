import {
    AUTH_USER_REGISTER,
    AUTH_COMPLETE_REGISTRATION,
    AUTH_LOGIN,
    AUTH_GET_USER,
    AUTH_SET_PASSWORD,
    API_REQUEST,
    API_REQUEST_END,
    AUTH_PASSWORD_RESET,
    AUTH_STATE_RESET,
} from '../../helpers/constants/actionTypes';


const initialState = {
    userRegistered: false,
    registrationCompleted: false,
    tokens: null,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {

        case '@@router/LOCATION_CHANGE':
            return { ...state,
                userRegistered: false,
                registrationCompleted: false,
                tokens: null,
                passwordReset: false,
            };

        case API_REQUEST:
            return { ...state, isLoading: true };

        case API_REQUEST_END:
            return { ...state, isLoading: false };

        case AUTH_USER_REGISTER:
            return { ...state, userRegistered: true };

        case AUTH_COMPLETE_REGISTRATION:
            return { ...state, registrationCompleted: true };

        case AUTH_LOGIN:
            return { ...state, tokens: action.payload };

        case AUTH_GET_USER:
            return ({ ...state, user: action.payload });

        case AUTH_SET_PASSWORD:
            return { ...state, setPasswordResolved: true };

        case AUTH_PASSWORD_RESET:
            return { ...state, passwordReset: true };

        case AUTH_STATE_RESET:
            return { ...state, passwordReset: false };

        default:
            return state;
    }
};

export const userSelector = state => state.auth.user;

export const setPasswordResolvedSelector = state => state.auth.setPasswordResolved;

export const userRegisteredSelector = state => state.auth.userRegistered;

export const registrationCompletedSelector = state => state.auth.registrationCompleted;

export const tokensSelector = state => state.auth.tokens;

export const passwordResetSelector = state => state.auth.passwordReset;



