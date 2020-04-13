import {
    ADMIN_CREATE_COMPANY,
    ADMIN_GET_COMPANY_RESOLVED,
    ADMIN_GET_COMPANY_FAILED,
    ADMIN_SET_COMPANY_CREATED,
    ADMIN_GET_COMPANIES,
    ADMIN_GET_COMPANY,
} from '../../../helpers/constants/actionTypes';


export const companies = (state = {}, action) => {
    switch (action.type) {

        case ADMIN_CREATE_COMPANY:
            return { ...state, companyCreated: true };

        case ADMIN_SET_COMPANY_CREATED:
            return { ...state, companyCreated: false };


        case ADMIN_GET_COMPANIES:
            return {...state, companies: action.payload.results };

        case ADMIN_GET_COMPANY:
            return { ...state, company: action.payload };

        default:
            return state;
    }
};


export const createCompanyResolvedSelector = (state) => state.admin.companies.companyCreated;

export const companiesSelector = (state) => state.admin.companies.companies;

export const companySelector = state => state.admin.companies.company;
