import { createApiAction } from '../../helpers/utils';
import {
    ADMIN_GET_PROJECTS,
    ADMIN_PROJECT_CREATE,
    ADMIN_PROJECT_DELETE,
    ADMIN_PROJECT_RESET,
    DELETE,
    GET,
    POST,
} from '../../helpers/constants/actionTypes';


export const getProjects = (params) => createApiAction({
    url: 'projects/',
    method: GET,
    data: params,
    label: ADMIN_GET_PROJECTS,
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

export const resetProjectState = () => ({
   type: ADMIN_PROJECT_RESET,
});
