import {
    API_REQUEST,
    API_REQUEST_END,
    CREATE_APPLICATION,
    CREATE_VACANCY,
    GET_APPLICATION,
    GET_APPLICATIONS,
    GET_VACANCIES,
    REMOVE_VACANCY,
    SET_VACANCY_CREATED,
    SET_VACANCY_REMOVED,
} from '../../helpers/constants/actionTypes';


export const common = (state = {}, action) => {

    switch (action.type) {

        case API_REQUEST:
            return { ...state, isLoading: true };

        case API_REQUEST_END:
            return { ...state, isLoading: false };

        case CREATE_APPLICATION:
            return { ...state, applicationCreated: true };

        case GET_APPLICATIONS:
            return { ...state, applications: action.payload.results };

        case GET_APPLICATION:
            return { ...state, application: action.payload };

        case GET_VACANCIES:
            return { ...state,  vacancies: action.payload.results };

        case CREATE_VACANCY:
            return { ...state, vacancyCreated: true };

        case REMOVE_VACANCY:
            return { ...state, vacancyRemoved: true };

        case SET_VACANCY_CREATED:
            return { ...state, vacancyCreated: false };

        case SET_VACANCY_REMOVED:
            return { ...state, vacancyRemoved: false };

        default:
            return state;
    }
};


export const isLoadingSelector = (state) => state.common.isLoading;

export const createApplicationResolvedSelector = (state) => state.common.applicationCreated;

export const applicationsSelector = state => state.common.applications;
export const applicationSelector = state => state.common.application;

export const vacanciesSelector = state => state.common.vacancies;
export const vacancyCreatedSelector = state => state.common.vacancyCreated;
export const vacancyRemovedSelector = state => state.common.vacancyRemoved;
