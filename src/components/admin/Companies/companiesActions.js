import {
    ADMIN_CREATE_COMPANY_FAILED,
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_FAILED,
    ADMIN_GET_COMPANIES_PENDING,
    ADMIN_GET_COMPANIES_RESOLVED,
    ADMIN_GET_COMPANY_FAILED,
    ADMIN_GET_COMPANY_RESOLVED,
} from '../../../helpers/constants/actionTypes';

/*** Actions for creating a company ***/

export const createCompanyPending = () => ({
    type: ADMIN_CREATE_COMPANY_PENDING,
});

export const createCompanyFailed = (err) => ({
    type: ADMIN_CREATE_COMPANY_FAILED,
    error: err,
});

export const createCompanyResolved = () => ({
    type: ADMIN_CREATE_COMPANY_RESOLVED,
});

/******************************************/


/*** Actions for fetching companies ***/

export const getCompaniesPending = () => ({
    type: ADMIN_GET_COMPANIES_PENDING,
});

export const getCompaniesResolved = (companies) => ({
    type: ADMIN_GET_COMPANIES_RESOLVED,
    payload: companies,
});

export const getCompaniesFailed = (companies) => ({
    type: ADMIN_GET_COMPANIES_FAILED,
    payload: companies,
});

/******************************************/


/*** Actions for fetching a single company ***/

export const getCompanyResolved = (company) => ({
    type: ADMIN_GET_COMPANY_RESOLVED,
    payload: company,
});

export const getCompanyFailed = () => ({
    type: ADMIN_GET_COMPANY_FAILED,
});

/******************************************/
