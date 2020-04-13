import {
    CREATE_APPLICATION,
    CREATE_VACANCY,
    GET_APPLICATION,
    GET_APPLICATIONS,
    GET_VACANCIES,
    GET_VACANCY,
    REMOVE_VACANCY,
    SET_VACANCY_CREATED,
    SET_VACANCY_REMOVED,
} from '../../helpers/constants/actionTypes';
import { createApiAction } from '../../helpers/utils';


export const createApplication = (data) => createApiAction({
    url: 'applications/',
    method: 'POST',
    data,
    label: CREATE_APPLICATION,
});


export const getApplications = (params) => createApiAction({
    url: 'applications/',
    method: 'GET',
    data: params,
    label: GET_APPLICATIONS,
});

export const getApplication = (id) => createApiAction({
    url: `applications/${id}/`,
    method: 'GET',
    label: GET_APPLICATION,
});

export const getVacancies = (applicationId) => createApiAction({
    url: 'vacancy/',
    method: 'GET',
    data: { application: applicationId },
    label: GET_VACANCIES,
});

export const getVacancy = (id) => createApiAction({
    url: `vacancy/${id}`,
    method: 'GET',
    label: GET_VACANCY,
});

export const createVacancy = (data) => createApiAction({
    url: 'vacancy/',
    method: 'POST',
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
