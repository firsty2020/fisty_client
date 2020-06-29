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
    COMMON_CANDIDATES_GET,
    COMMON_CANDIDATE_STATE_RESET,
    REMOVE_VACANCY,
    SET_VACANCY_CREATED,
    SET_VACANCY_REMOVED,
    SET_VACANCY_UPDATED,
    UPDATE_VACANCY,
    COMMON_CANDIDATE_GET,
    COMMON_CANDIDATE_DELETE,
    PROJECT_GET,
    USERS_GET,
    PROJECT_UPDATE,
    PROJECT_STATE_RESET,
    PROJECT_CREATE,
    PROJECT_DELETE,
    COMMON_CANDIDATE_UPDATE,
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

        case COMMON_CANDIDATES_GET:
            return { ...state, candidates: action.payload };

        case COMMON_CANDIDATE_GET:
            return { ...state, candidate: action.payload };

        case COMMON_CANDIDATE_DELETE:
            return { ...state, candidateDeleted: true };

        case COMMON_CANDIDATE_UPDATE:
            return { ...state, candidateUpdated: true };

        case COMMON_CANDIDATE_STATE_RESET:
            return {
                ...state,
                candidateCreated: false,
                candidateDeleted: false,
                candidateUpdated: false,
            };

        case PROJECT_GET:
            return { ...state, project: action.payload };

        case PROJECT_UPDATE:
            return { ...state, projectUpdated: true };

        case PROJECT_CREATE:
            return { ...state, projectCreated: action.payload };

        case PROJECT_DELETE:
            return { ...state, projectDeleted: true };

        case PROJECT_STATE_RESET:
            return {
                ...state,
                projectCreated: false,
                projectDeleted: false,
                projectUpdated: false,
                recruitersSet: false,
            };

        case USERS_GET:
            return {
                ...state,
                users: action.id ?  {
                    ...state.users,
                    [ action.id ]: action.payload,
                } : action.payload,
            };

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
export const usersSelector = state => state.common.users;

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

export const usersState = (uid = null) => createSelector(
    [ usersSelector ],
    (users) => {
        if (!users) return [];
        if (uid) {
            return users[uid];
        }
        return users;
    }
);

export const notificationUpdatedSelector = state => state.common.notificationUpdated;
export const candidateCreatedSelector = state => state.common.candidateCreated;
export const candidateDeletedSelector = state => state.common.candidateDeleted;
export const candidateUpdatedSelector = state => state.common.candidateUpdated;
export const candidatesSelector = state => state.common.candidates;
export const candidateSelector = state => state.common.candidate;
export const projectSelector = state => state.common.project;
export const projectCreatedSelector = state => state.common.projectCreated;
export const projectDeletedSelector = state => state.common.projectDeleted;
export const projectUpdatedSelector = state => state.common.projectUpdated;



