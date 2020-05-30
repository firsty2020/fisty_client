import {
    API_REQUEST,
    API_REQUEST_END,
    CREATE_APPLICATION,
    CREATE_VACANCY,
    GET_APPLICATION,
    GET_APPLICATIONS,
    GET_VACANCIES,
    GET_VACANCY,
    NOTIFICATION_PATCH,
    NOTIFICATIONS_GET,
    COMMON_CANDIDATE_CREATE,
    COMMON_CANDIDATE_GET, COMMON_CANDIDATE_STATE_RESET,
    REMOVE_VACANCY,
    SET_VACANCY_CREATED,
    SET_VACANCY_REMOVED,
    SET_VACANCY_UPDATED,
    UPDATE_VACANCY,
} from '../../helpers/constants/actionTypes';
import { createSelector } from 'reselect';


export const common = (state = {}, action) => {

    switch (action.type) {

        case API_REQUEST:
            return { ...state, isLoading: true };

        case API_REQUEST_END:
            return { ...state, isLoading: false };

        case CREATE_APPLICATION:
            return { ...state, applicationCreated: true };

        case GET_APPLICATIONS:
            return { ...state, applications: action.payload };

        case GET_APPLICATION:
            return { ...state, application: action.payload };

        case GET_VACANCIES:
            return { ...state,  vacancies: action.payload };

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

        case NOTIFICATIONS_GET:
            return {
                ...state,
                notificationUpdated: false,
                notifications: action.id ?  {
                    ...state.notifications,
                    [ action.id ]: action.payload ,
                } : action.payload,
            };

        case NOTIFICATION_PATCH:
            return { ...state, notificationUpdated: true };

        case COMMON_CANDIDATE_CREATE:
            return { ...state, candidateCreated: true };

        case COMMON_CANDIDATE_GET:
            return { ...state, candidates: action.payload };

        case COMMON_CANDIDATE_STATE_RESET:
            return { ...state, candidateCreated: false };

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
export const notificationsSelector = state => state.common.notifications;

export const notificationsState = (uid = null) => createSelector(
    [ notificationsSelector ],
    (notifications) => {
        if (!notifications) return [];
        if (uid) {
            return notifications[uid];
        }
        return notifications;
    }
);

export const notificationUpdatedSelector = state => state.common.notificationUpdated;
export const candidateCreatedSelector = state => state.common.candidateCreated;
export const candidatesSelector = state => state.common.candidates;
