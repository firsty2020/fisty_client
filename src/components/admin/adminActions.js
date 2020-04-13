import { createApiAction } from '../../helpers/utils';
import {
    ADMIN_GET_PROJECTS
} from '../../helpers/constants/actionTypes';


export const getProjects = (params) => createApiAction({
    url: 'projects/',
    method: 'GET',
    data: params,
    label: ADMIN_GET_PROJECTS,
});
