import {
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_RESOLVED,
    ADMIN_CREATE_COMPANY_FAILED,
    ADMIN_GET_COMPANIES_PENDING,
    ADMIN_GET_COMPANIES_FAILED,
    ADMIN_GET_COMPANY_RESOLVED,
    ADMIN_GET_COMPANY_FAILED,
} from '../../../constants/actionTypes';


export const companies = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CREATE_COMPANY_PENDING:
            return {
                ...state,
                companyCreated: false,
                createCompanyError: null,
                createCompanyPending: true
            };
        case ADMIN_CREATE_COMPANY_RESOLVED:
            return {
                ...state,
                companyCreated: true,
                createCompanyError: null,
                createCompanyPending: false
            };
        case ADMIN_CREATE_COMPANY_FAILED:
            return {
                ...state,
                companyCreated: false,
                createCompanyError: action.error,
                createCompanyPending: false
            };

        case ADMIN_GET_COMPANIES_PENDING:
            return {...state,
                companies: [],
                getCompaniesPending: true,
            };
        case ADMIN_GET_COMPANIES_RESOLVED:
            return {
                ...state,
                companies: action.payload,
                getCompaniesPending: false
            };
        case ADMIN_GET_COMPANIES_FAILED:
            return {...state, companies: [], getCompaniesPending: false};

        case ADMIN_GET_COMPANY_RESOLVED:
            return {
                ...state,
                getCompanyPending: false,
                getCompanyFailed: false,
                company: action.payload,
            };
        case ADMIN_GET_COMPANY_FAILED:
            return {
                ...state,
                getCompanyPending: false,
                getCompanyFailed: true,
                company: null,
            };

        default:
            return state;
    }
};


export const createCompanySuccessSelector = (state) => state.admin.companies.companyCreated;
export const createCompanyPendingSelector = (state) => state.admin.companies.createCompanyPending;

export const companiesSelector = (state) => state.admin.companies.companies;
export const getCompaniesPendingSelector = state => state.admin.companies.getCompaniesPending;

export const companySelector = state => state.admin.companies.company;
