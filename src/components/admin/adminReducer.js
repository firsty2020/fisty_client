import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_RESOLVED,
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
            return { companyCreated: false, createCompanyError: false, createCompanyPending: true };
        case ADMIN_CREATE_COMPANY_RESOLVED:
            return { companyCreated: true, createCompanyError: false, createCompanyPending: false };
        case ADMIN_GET_COMPANIES_RESOLVED:
            return { companies: action.payload };
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
