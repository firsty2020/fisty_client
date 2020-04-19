import {
    API_REQUEST,
    API_REQUEST_END,
    CREATE_APPLICATION,
    CREATE_VACANCY,
    GET_APPLICATION,
    GET_APPLICATIONS,
    GET_VACANCIES,
    GET_VACANCY,
    REMOVE_VACANCY,
    SET_VACANCY_CREATED,
    SET_VACANCY_REMOVED,
    SET_VACANCY_UPDATED,
    UPDATE_VACANCY,
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

        case GET_VACANCY:
            return { ...state,  vacancy: action.payload };

        case CREATE_VACANCY:
            return { ...state, vacancyCreated: true };

        case REMOVE_VACANCY:
            return { ...state, vacancyRemoved: true };

        case UPDATE_VACANCY:
            return { ...state, vacancyUpdated: true };


        case SET_VACANCY_CREATED:
            return { ...state, vacancyCreated: false };

        case SET_VACANCY_REMOVED:
            return { ...state, vacancyRemoved: false };

        case SET_VACANCY_UPDATED:
            return { ...state, vacancyUpdated: false };

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
export const vacancyUpdatedSelector = state => state.common.vacancyUpdated;
export const vacancyRemovedSelector = state => state.common.vacancyRemoved;
export const vacancySelector = state => state.common.vacancy;
