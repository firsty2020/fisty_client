import {
    ADMIN_CREATE_COMPANY,
    ADMIN_GET_COMPANIES,
    ADMIN_GET_COMPANY,
    ADMIN_SET_COMPANY_CREATED,
} from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


export const createCompany = (data) => createApiAction({
    url: 'companies/',
    method: 'POST',
    data,
    label: ADMIN_CREATE_COMPANY,
});


export const getCompanies = () => createApiAction({
    url: 'companies/',
    method: 'GET',
    label: ADMIN_GET_COMPANIES,
});


export const resetCompanyCreated = () => ({
    type: ADMIN_SET_COMPANY_CREATED,
    payload: false,
});


export const getCompany = (id) => createApiAction({
    url: `companies/${id}`,
    method: 'GET',
    label: ADMIN_GET_COMPANY,
});
