import {
    CREATE_APPLICATION,
    GET_APPLICATIONS,
} from '../helpers/constants/actionTypes';
import { createApiAction } from '../helpers/utils';


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
