import { createApiAction } from '../../helpers/utils';
import {
    ADMIN_DASHBOARD_STATISTICS_GET,
    ADMIN_GET_PROJECT,
    ADMIN_GET_PROJECTS,
    ADMIN_LEAD_CREATE,
    ADMIN_LEAD_DELETE,
    ADMIN_LEAD_STATE_RESET,
    ADMIN_LEAD_UPDATE,
    ADMIN_LEADS_GET,
    ADMIN_PROJECT_CREATE,
    ADMIN_PROJECT_DELETE,
    ADMIN_PROJECT_RESET,
    ADMIN_PROJECT_UPDATE,
    ADMIN_PROJECT_RECRUITERS_SET,
    DELETE,
    GET,
    PATCH,
    POST,
} from '../../helpers/constants/actionTypes';


export const getProjects = (params) => createApiAction({
    url: 'projects/',
    method: GET,
    data: params,
    label: ADMIN_GET_PROJECTS,
});


export const getProject = (id) => createApiAction({
    url: `projects/${id}/`,
    method: GET,
    label: ADMIN_GET_PROJECT,
});

export const createProject = (data) => createApiAction({
    url: 'projects/',
    method: POST,
    data,
    label: ADMIN_PROJECT_CREATE,
});

export const deleteProject = (id) => createApiAction({
    url: `projects/${id}`,
    method: DELETE,
    label: ADMIN_PROJECT_DELETE,
});

export const updateProject = (id, data) => createApiAction({
    url: `projects/${id}/`,
    method: PATCH,
    data,
    label: ADMIN_PROJECT_UPDATE,
});

export const resetProjectState = () => ({
   type: ADMIN_PROJECT_RESET,
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
