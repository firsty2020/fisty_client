import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_RESOLVED,
    ADMIN_CREATE_COMPANY_FAILED,
    ADMIN_GET_COMPANIES_PENDING,
    ADMIN_CONFIGS_ADD_INDUSTRY_PENDING,
    ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_ADD_INDUSTRY_FAILED,
    ADMIN_CONFIGS_GET_INDUSTRIES_PENDING,
    ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED,
    ADMIN_CONFIGS_GET_INDUSTRIES_FAILED,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED,
} from '../../constants/actionTypes';

const initialState = { getUsersPending: false, getUsersError: null, users: [] };

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_PENDING:
            return { getUsersPending: true, getUsersError: null, users: [] };
        case ADMIN_GET_USERS_FAILED:
            return { getUsersError: action.payload, getUsersPending: false, users: [] };
        case ADMIN_GET_USERS_RESOLVED:
            return { users: action.payload, getUsersPending: false, getUsersError: null };

        case ADMIN_CREATE_COMPANY_PENDING:
            return { companyCreated: false, createCompanyError: null, createCompanyPending: true };
        case ADMIN_CREATE_COMPANY_RESOLVED:
            return { companyCreated: true, createCompanyError: null, createCompanyPending: false };
        case ADMIN_CREATE_COMPANY_FAILED:
            return { companyCreated: false, createCompanyError: action.error, createCompanyPending: false };

        case ADMIN_GET_COMPANIES_PENDING:
            return { companies: [], getCompaniesPending: true };
        case ADMIN_GET_COMPANIES_RESOLVED:
            return { companies: action.payload };

        case ADMIN_CONFIGS_ADD_INDUSTRY_PENDING:
            return { addIndustryOptionPending: true, addIndustryOptionFailed: false, addIndustryOptionResolved: false };
        case ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED:
            return { addIndustryOptionPending: false, addIndustryOptionFailed: false, addIndustryOptionResolved: true };
        case ADMIN_CONFIGS_ADD_INDUSTRY_FAILED:
            return { addIndustryOptionPending: false, addIndustryOptionFailed: false, addIndustryOptionResolved: false };

        case ADMIN_CONFIGS_GET_INDUSTRIES_PENDING:
            return { getIndustryOptionsPending: true, getIndustryOptionsFailed: false, industryOptions: [] };
        case ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED:
            return { getIndustryOptionsPending: false, getIndustryOptionsFailed: false, industryOptions: action.payload };
        case ADMIN_CONFIGS_GET_INDUSTRIES_FAILED:
            return { getIndustryOptionsPending: false, getIndustryOptionsFailed: true, industryOptions: [] };

        case ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING:
            return { updateIndustryOptionPending: true, updateIndustryOptionError: false, updateIndustryOptionResolved: false };
        case ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED:
            return { updateIndustryOptionPending: false, updateIndustryOptionError: false, updateIndustryOptionResolved: true };
        case ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED:
            return { updateIndustryOptionPending: true, updateIndustryOptionError: true, updateIndustryOptionResolved: false };
        default: return state;
    }
};


export const usersSelector = (state) => state.admin.users;
export const usersErrorSelector = (state) => state.admin.getUsersError;
export const usersPendingSelector = (state) => state.admin.getUsersPending;

export const createCompanySuccessSelector = (state) => state.admin.companyCreated;
export const createCompanyErrorSelector = (state) => state.admin.createCompanyError;
export const createCompanyPendingSelector = (state) => state.admin.createCompanyPending;

export const companiesSelector = (state) => state.admin.companies;
export const getCompaniesPendingSelector = state => state.admin.getCompaniesPending;

export const addIndustryOptionPendingSelector = state => state.admin.addIndustryOptionPending;
export const addIndustryOptionFailedSelector = state => state.admin.addIndustryOptionFailed;
export const addIndustryOptionResolvedSelector = state => state.admin.addIndustryOptionResolved;

export const getIndustryOptionsPendingSelector = state => state.admin.getIndustryOptionsPending;
export const getIndustryOptionsFailedSelector = state => state.admin.getIndustryOptionsFailed;
export const industryOptionsSelector = state => state.admin.industryOptions;
