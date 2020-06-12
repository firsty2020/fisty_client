import {
    ADMIN_CREATE_COMPANY,
    ADMIN_GET_COMPANIES,
    ADMIN_GET_COMPANY,
    ADMIN_DELETE_COMPANY,
    ADMIN_RESET_COMPANY_STATE,
    ADMIN_UPDATE_COMPANY,
} from '../../../helpers/constants/actionTypes';


export const companies = (state = {}, action) => {
    switch (action.type) {

        case ADMIN_CREATE_COMPANY:
            return { ...state, companyCreated: true };

        case ADMIN_UPDATE_COMPANY:
            return { ...state, companyUpdated: true };

        case ADMIN_GET_COMPANIES:
            return {...state, companies: action.payload };

        case ADMIN_GET_COMPANY:
            return { ...state, company: action.payload };

        case ADMIN_DELETE_COMPANY:
            return { ...state, companyDeleted: true };

        case ADMIN_RESET_COMPANY_STATE:
            return {
                ...state,
                companyCreated: false,
                companyDeleted: false,
                companyUpdated: false,
            };

        default:
            return state;
    }
};


export const createCompanyResolvedSelector = (state) => state.admin.companies.companyCreated;
export const companiesSelector = (state) => state.admin.companies.companies;
export const companySelector = state => state.admin.companies.company;
export const companyDeletedSelector = state => state.admin.companies.companyDeleted;
export const companyUpdatedSelector = state => state.admin.companies.companyUpdated;
