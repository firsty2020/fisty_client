import {
    NOTIFICATIONS_GET,
    CREATE_APPLICATION,
    CREATE_VACANCY,
    GET,
    GET_APPLICATION,
    GET_APPLICATIONS,
    GET_VACANCIES,
    GET_VACANCY,
    PATCH,
    POST,
    REMOVE_VACANCY,
    SET_VACANCY_CREATED,
    SET_VACANCY_REMOVED,
    SET_VACANCY_UPDATED,
    UPDATE_VACANCY,
    NOTIFICATION_PATCH,
    COMMON_CANDIDATE_CREATE,
    COMMON_CANDIDATES_GET,
    COMMON_CANDIDATE_STATE_RESET,
    COMMON_CANDIDATE_GET,
    DELETE,
    COMMON_CANDIDATE_DELETE,
    PROJECT_GET,
    USERS_GET,
    PROJECT_UPDATE,
    PROJECT_STATE_RESET,
    PROJECT_CREATE,
    PROJECT_DELETE,
    COMMON_CANDIDATE_UPDATE,
} from '../../helpers/constants/actionTypes';
import { createApiAction } from '../../helpers/utils';


export const createApplication = (data) => createApiAction({
    url: 'applications/',
    method: POST,
    data,
    label: CREATE_APPLICATION,
});


export const getApplications = (params) => createApiAction({
    url: 'applications/',
    method: GET,
    data: params,
    label: GET_APPLICATIONS,
});

export const getApplication = (id) => createApiAction({
    url: `applications/${id}/`,
    method: 'GET',
    label: GET_APPLICATION,
});

export const getVacancies = (params) => createApiAction({
    url: 'vacancy/',
    method: 'GET',
    data: params,
    label: GET_VACANCIES,
});

export const getVacancy = (id) => createApiAction({
    url: `vacancy/${id}`,
    method: GET,
    label: GET_VACANCY,
});

export const createVacancy = (data) => createApiAction({
    url: 'vacancy/',
    method: POST,
    data,
    label: CREATE_VACANCY,
});

export const resetVacancyCreated = () => ({
    type: SET_VACANCY_CREATED,
    payload: false,
});

export const resetVacancyRemoved = () => ({
    type: SET_VACANCY_REMOVED,
    payload: false,
});

export const removeVacancy = (id) => createApiAction({
    url: `vacancy/${id}/`,
    method: 'DELETE',
    label: REMOVE_VACANCY,
});

export const updateVacancy = (id, data) => createApiAction({
    url: `vacancy/${id}/`,
    method: PATCH,
    data,
    label: UPDATE_VACANCY,
});

export const resetVacancyUpdated = () => ({
    type: SET_VACANCY_UPDATED,
    payload: false,
});


export const getNotifications = (params, id) => createApiAction({
    url: 'messages/',
    method: GET,
    data: params,
    label: NOTIFICATIONS_GET,
    id,
});

export const patchNotification = (id, data) => createApiAction({
    url: `messages/${id}/`,
    method: PATCH,
    data: data,
    label: NOTIFICATION_PATCH,
});


export const createCandidate = (data) => createApiAction({
    url: 'projects/candidates/',
    method: POST,
    data,
    label: COMMON_CANDIDATE_CREATE,
});

export const getCandidates = (params) => createApiAction({
    url: 'projects/candidates/',
    method: GET,
    data: params,
    label: COMMON_CANDIDATES_GET,
});

export const getCandidate = (id, params) => createApiAction({
    url: `projects/candidates/${id}/`,
    method: GET,
    data: params,
    label: COMMON_CANDIDATE_GET,
});

export const deleteCandidate = (id) => createApiAction({
    url: `projects/candidates/${id}/`,
    method: DELETE,
    label: COMMON_CANDIDATE_DELETE,
});

export const updateCandidate = (id, data) => createApiAction({
    url: `projects/candidates/${id}/`,
    data,
    method: PATCH,
    label: COMMON_CANDIDATE_UPDATE,
});

export const resetCandidateState = () => ({
    type: COMMON_CANDIDATE_STATE_RESET,
});

export const getProject = (id) => createApiAction({
    url: `projects/${id}/`,
    method: GET,
    label: PROJECT_GET,
});

export const updateProject = (id, data) => createApiAction({
    url: `projects/${id}/`,
    method: PATCH,
    data,
    label: PROJECT_UPDATE,
});

export const createProject = (data) => createApiAction({
    url: 'projects/',
    method: POST,
    data,
    label: PROJECT_CREATE,
});

export const deleteProject = (id) => createApiAction({
    url: `projects/${id}/`,
    method: DELETE,
    label: PROJECT_DELETE,
});

export const resetProjectState = () => ({
    type: PROJECT_STATE_RESET,
});

export const getUsers = (params, uid) => createApiAction({
    url: 'users/',
    method: GET,
    data: params ,
    label: USERS_GET,
    id: uid,
});
