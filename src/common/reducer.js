import {
    CREATE_APPLICATION_PENDING,
    CREATE_APPLICATION_FAILED,
    CREATE_APPLICATION_RESOLVED,
} from '../constants/actionTypes';

const initialState = { getUsersPending: false, getUsersError: null, users: [] };

export const common = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_APPLICATION_PENDING:
            return {
                ...state,
                createApplicationPending: true,
                createApplicationResolved: false,
            };
        case CREATE_APPLICATION_FAILED:
            return {
                ...state,
                createApplicationPending: false,
                createApplicationResolved: false,
            };
        case CREATE_APPLICATION_RESOLVED:
            return {
                ...state,
                createApplicationPending: false,
                createApplicationResolved: true,
            };

              default:
            return state;
    }
};


export const createApplicationPendingSelector = (state) => state.common.createApplicationPending;
export const createApplicationResolvedSelector = (state) => state.common.createApplicationResolved;

