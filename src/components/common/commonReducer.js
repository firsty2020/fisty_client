import {
    API_REQUEST,
    API_REQUEST_END,
    CREATE_APPLICATION,
    GET_APPLICATION,
    GET_APPLICATIONS,
} from '../../helpers/constants/actionTypes';


export const common = (state = {}, action) => {
    switch (action.type) {

        case API_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case API_REQUEST_END:
            return {
                ...state,
                isLoading: false,
            };

        case CREATE_APPLICATION:
            return {
                applicationCreated: true,
            };

        case GET_APPLICATIONS:
            return {
                applications: action.payload.results,
            };

        case GET_APPLICATION:
            return {
                application: action.payload,
            };

        default:
            return state;
    }
};


export const createApplicationResolvedSelector = (state) => state.common.applicationCreated;

export const applicationsSelector = state => state.common.applications;
export const applicationSelector = state => state.common.application;
