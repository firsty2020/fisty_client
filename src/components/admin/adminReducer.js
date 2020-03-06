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
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_PENDING,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED,
    ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING,
    ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_PENDING,
} from '../../constants/actionTypes';

const initialState = { getUsersPending: false, getUsersError: null, users: [] };

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_PENDING:
            return { ...state,  getUsersPending: true, getUsersError: null, users: [] };
        case ADMIN_GET_USERS_FAILED:
            return { ...state,  getUsersError: action.payload, getUsersPending: false, users: [] };
        case ADMIN_GET_USERS_RESOLVED:
            return { ...state,  users: action.payload, getUsersPending: false, getUsersError: null };

        case ADMIN_CREATE_COMPANY_PENDING:
            return { ...state,  companyCreated: false, createCompanyError: null, createCompanyPending: true };
        case ADMIN_CREATE_COMPANY_RESOLVED:
            return { ...state,  companyCreated: true, createCompanyError: null, createCompanyPending: false };
        case ADMIN_CREATE_COMPANY_FAILED:
            return { ...state,  companyCreated: false, createCompanyError: action.error, createCompanyPending: false };

        case ADMIN_GET_COMPANIES_PENDING:
            return { ...state,  companies: [], getCompaniesPending: true };
        case ADMIN_GET_COMPANIES_RESOLVED:
            return { ...state,  companies: action.payload, getCompaniesPending: false };

        case ADMIN_CONFIGS_ADD_INDUSTRY_PENDING:
            return { ...state,  addIndustryOptionPending: true, addIndustryOptionFailed: false, addIndustryOptionResolved: false };
        case ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED:
            return { ...state,  addIndustryOptionPending: false, addIndustryOptionFailed: false, addIndustryOptionResolved: true };
        case ADMIN_CONFIGS_ADD_INDUSTRY_FAILED:
            return { ...state,  addIndustryOptionPending: false, addIndustryOptionFailed: false, addIndustryOptionResolved: false };

        case ADMIN_CONFIGS_GET_INDUSTRIES_PENDING:
            return { ...state,  getIndustryOptionsPending: true, getIndustryOptionsFailed: false, industryOptions: [] };
        case ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED:
            return {
                ...state,
                getIndustryOptionsPending: false,
                getIndustryOptionsFailed: false,
                industryOptions: action.payload,
                updateIndustryOptionResolved: false,
                removeIndustryOptionResolved: false,
            };
        case ADMIN_CONFIGS_GET_INDUSTRIES_FAILED:
            return { ...state,  getIndustryOptionsPending: false, getIndustryOptionsFailed: true, industryOptions: [] };

        case ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING:
            return { ...state,  updateIndustryOptionPending: true, updateIndustryOptionError: false, updateIndustryOptionResolved: false };
        case ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED:
            return { ...state,  updateIndustryOptionPending: false, updateIndustryOptionError: false, updateIndustryOptionResolved: true };
        case ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED:
            return { ...state,  updateIndustryOptionPending: true, updateIndustryOptionError: true, updateIndustryOptionResolved: false };

        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_PENDING:
            return { ...state,  addSpecificationOptionPending: true, addSpecificationOptionFailed: false, addSpecificationOptionResolved: false };
        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED:
            return { ...state,  addSpecificationOptionPending: false, addSpecificationOptionFailed: true, addSpecificationOptionResolved: false };
        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED:
            return { ...state,  addSpecificationOptionPending: false, addSpecificationOptionFailed: false, addSpecificationOptionResolved: true };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED:
            return { ...state,
                getSpecificationOptionsPending: false,
                getSpecificationOptionsFailed: false,
                specificationOptions: action.payload,
                removeSpecificationOptionResolved: false,
                updateSpecificationOptionResolved: false,
            };

        case ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED:
            return { ...state,
                updateSpecificationOptionPending: false,
                updateSpecificationOptionFailed: false,
                updateSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED:
            return { ...state,
                removeIndustryOptionPending: false,
                removeIndustryOptionFailed: false,
                removeIndustryOptionResolved: true
            };
        case ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING:
            return { ...state,
                removeIndustryOptionPending: true,
                removeIndustryOptionFailed: false,
                removeIndustryOptionResolved: false
            };

        case ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED:
            return { ...state,
                removeSpecificationOptionPending: false,
                removeSpecificationOptionFailed: false,
                removeSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_PENDING:
            return { ...state,
                removeSpecificationOptionPending: true,
                removeSpecificationOptionFailed: false,
                removeSpecificationOptionResolved: false,
            };
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

export const updateIndustryOptionPendingSelector = state => state.admin.updateIndustryOptionPending;
export const updateIndustryOptionFailedSelector = state => state.admin.updateIndustryOptionError;
export const updateIndustryOptionResoledSelector = state => state.admin.updateIndustryOptionResolved;

export const specificationOptionsSelector = state => state.admin.specificationOptions;

export const addSpecificationOptionResolvedSelector = state => state.admin.addSpecificationOptionResolved;

export const updateSpecificationOptionResolvedSelector = state => state.admin.updateSpecificationOptionResolved;

export const removeIndustryOptionsResolvedSelector = state => state.admin.removeIndustryOptionResolved;
export const removeSpecificationOptionsResolvedSelector = state => state.admin.removeSpecificationOptionResolved;
