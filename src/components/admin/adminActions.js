import { createApiAction } from '../../helpers/utils';
import {
    ADMIN_DASHBOARD_STATISTICS_GET,
    ADMIN_GET_PROJECTS,
    ADMIN_LEAD_CREATE,
    ADMIN_LEAD_DELETE,
    ADMIN_LEAD_STATE_RESET,
    ADMIN_LEAD_UPDATE,
    ADMIN_LEADS_GET,
    ADMIN_PROJECT_RECRUITERS_SET,
    DELETE,
    GET,
    PATCH,
    POST,
    ADMIN_NOTES_CREATE,
    ADMIN_NOTES_GET,
    ADMIN_NOTES_STATE_RESET,
    ADMIN_NOTE_DELETE,
} from '../../helpers/constants/actionTypes';


export const getProjects = (params) => createApiAction({
    url: 'projects/',
    method: GET,
    data: params,
    label: ADMIN_GET_PROJECTS,
});

export const getStatistics = () => createApiAction({
    url: 'statistics/',
    method: GET,
    label: ADMIN_DASHBOARD_STATISTICS_GET,
});

export const createLead = (data) => createApiAction({
    url: 'leads/',
    method: POST,
    data,
    label: ADMIN_LEAD_CREATE,
});

export const updateLead = (id, data) => createApiAction({
    url: `leads/${id}/`,
    method: PATCH,
    data,
    label: ADMIN_LEAD_UPDATE,
});


export const getLeads = (params) => createApiAction({
    url: 'leads/',
    method: GET,
    data: params,
    label: ADMIN_LEADS_GET,
});

export const deleteLead = (id) => createApiAction({
    url: `leads/${id}/`,
    method: DELETE,
    label: ADMIN_LEAD_DELETE,
});

export const resetLeadState = () => ({
    type: ADMIN_LEAD_STATE_RESET,
});

export const setProjectRecruiters = (data) => createApiAction({
    url: '/companies/projects/recruiters/',
    method: POST,
    data,
    label: ADMIN_PROJECT_RECRUITERS_SET,
});

export const createNote = (data) => createApiAction({
    url: '/projects/notes/',
    method: POST,
    data,
    label: ADMIN_NOTES_CREATE,
});

export const getNotes = (params) => createApiAction({
    url: '/projects/notes/',
    method: GET,
    data: params,
    label: ADMIN_NOTES_GET,
});

export const deleteNote = (id) => createApiAction({
    url: `/projects/notes/${id}`,
    method: DELETE,
    label: ADMIN_NOTE_DELETE,
});

export const resetNotesState = () => ({
    type: ADMIN_NOTES_STATE_RESET,
});
