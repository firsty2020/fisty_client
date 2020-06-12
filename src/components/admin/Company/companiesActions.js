import {
    ADMIN_CREATE_COMPANY,
    ADMIN_DELETE_COMPANY,
    ADMIN_GET_COMPANIES,
    ADMIN_GET_COMPANY,
    ADMIN_RESET_COMPANY_STATE,
    ADMIN_UPDATE_COMPANY,
    DELETE,
    GET,
    PATCH,
    POST,
} from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


export const createCompany = (data) => createApiAction({
    url: 'companies/',
    method: POST,
    data,
    label: ADMIN_CREATE_COMPANY,
});

export const updateCompany = (id, data) => createApiAction({
    url: `companies/${id}/`,
    method: PATCH,
    data,
    label: ADMIN_UPDATE_COMPANY,
});

export const getCompanies = (params) => createApiAction({
    url: 'companies/',
    method: GET,
    data: params,
    label: ADMIN_GET_COMPANIES,
});

export const getCompany = (id) => createApiAction({
    url: `companies/${id}/`,
    method: GET,
    label: ADMIN_GET_COMPANY,
});

export const deleteCompany = (id) => createApiAction({
    url: `companies/${id}/`,
    method: DELETE,
    label: ADMIN_DELETE_COMPANY,
});

export const resetCompanyState = () => ({
    type: ADMIN_RESET_COMPANY_STATE,
});
