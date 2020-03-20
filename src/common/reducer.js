import {
    CREATE_APPLICATION_PENDING,
    CREATE_APPLICATION_FAILED,
    CREATE_APPLICATION_RESOLVED,
} from '../constants/actionTypes';


const initialState = { createApplicationPending: false, createApplicationResolved: null };


export const common = (state = initialState, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return initialState;
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

        default:
            return state;
    }
};


export const createApplicationPendingSelector = (state) => state.common.createApplicationPending;
export const createApplicationResolvedSelector = (state) => state.common.createApplicationResolved;

