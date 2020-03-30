import {
    CREATE_APPLICATION_PENDING,
    CREATE_APPLICATION_FAILED,
    CREATE_APPLICATION_RESOLVED,
    GET_APPLICATIONS_PENDING,
    GET_APPLICATIONS_FAILED, GET_APPLICATIONS_RESOLVED,
} from '../constants/actionTypes';


const initialState = { createApplicationPending: false, createApplicationResolved: null };


export const common = (state = initialState, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return { ...state, ...initialState };
        case CREATE_APPLICATION_PENDING:
            return {
                createApplicationPending: true,
                createApplicationResolved: false,
            };
        case CREATE_APPLICATION_FAILED:
            return {
                createApplicationPending: false,
                createApplicationResolved: false,
            };
        case CREATE_APPLICATION_RESOLVED:
            return {
                createApplicationPending: false,
                createApplicationResolved: true,
            };

        case GET_APPLICATIONS_PENDING:
            return {
                getApplicationsPending: true,
                getApplicationsFailed: false,
                applications: [],
            };

        case GET_APPLICATIONS_FAILED:
            return {
                getApplicationsPending: false,
                getApplicationsFailed: true,
                applications: [],
            };

        case GET_APPLICATIONS_RESOLVED:
            return {
                getApplicationsPending: false,
                getApplicationsFailed: false,
                applications: action.payload,
            };

        default:
            return state;
    }
};


export const createApplicationPendingSelector = (state) => state.common.createApplicationPending;
export const createApplicationResolvedSelector = (state) => state.common.createApplicationResolved;

export const applicationsSelector = state => state.common.applications;
export const getApplicationsPendingSelector = state => state.common.getApplicationsPending;
