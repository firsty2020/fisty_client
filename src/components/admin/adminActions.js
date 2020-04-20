import { createApiAction } from '../../helpers/utils';
import {
    ADMIN_GET_PROJECTS,
    ADMIN_PROJECT_CREATE,
    ADMIN_PROJECT_RESET,
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

export const resetProjectState = () => ({
   type: ADMIN_PROJECT_RESET,
});
