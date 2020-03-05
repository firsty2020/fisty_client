import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_FAILED,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_PENDING,
    ADMIN_GET_COMPANIES_RESOLVED,
    ADMIN_CONFIGS_ADD_INDUSTRY_PENDING,
    ADMIN_CONFIGS_ADD_INDUSTRY_FAILED,
    ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_GET_INDUSTRIES_PENDING,
    ADMIN_CONFIGS_GET_INDUSTRIES_FAILED,
    ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED,
} from '../../constants/actionTypes';


/*** Actions for fetching users ***/

export const getUsersPending = () => ({
    type: ADMIN_GET_USERS_PENDING,
});

export const getUsersFailed = () => ({
    type: ADMIN_GET_USERS_FAILED,
});

export const getUsersResolved = (users) => ({
    payload: users,
    type: ADMIN_GET_USERS_RESOLVED,
});

/******************************************/


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

/******************************************/


/*** Actions for creating options for industry field ***/

export const addIndustryOptionPending = () => ({
    type: ADMIN_CONFIGS_ADD_INDUSTRY_PENDING,
});

export const addIndustryOptionFailed = (err) => ({
    type: ADMIN_CONFIGS_ADD_INDUSTRY_FAILED,
    error: err,
});

export const addIndustryOptionResolved = () => ({
    type: ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED,
});

/******************************************/


/*** Actions for fetching options for industry field ***/

export const getIndustryOptionsPending = () => ({
    type: ADMIN_CONFIGS_GET_INDUSTRIES_PENDING,
});

export const getIndustryOptionsFailed = (error) => ({
    type: ADMIN_CONFIGS_GET_INDUSTRIES_FAILED,
    error,
});

/**
 *
 * @param industries { string }
 * @returns payload: [ industries ], type: string
 */
export const getIndustryOptionsResolved = (industries) => ({
    type: ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED,
    payload: industries
});

/******************************************/
