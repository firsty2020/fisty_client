import { createApiAction } from '../../helpers/utils';
import {
    ADMIN_GET_PROJECT,
    ADMIN_GET_PROJECTS,
    ADMIN_PROJECT_CREATE,
    ADMIN_PROJECT_DELETE,
    ADMIN_PROJECT_RESET,
    ADMIN_PROJECT_UPDATE,
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

export const updateProject = (data) => createApiAction({
    url: `projects/${data.id}/`,
    method: PATCH,
    data,
    label: ADMIN_PROJECT_UPDATE,
});

export const resetProjectState = () => ({
   type: ADMIN_PROJECT_RESET,
});
