import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_RESOLVED,
    ADMIN_CREATE_COMPANY_FAILED,
    ADMIN_GET_COMPANIES_PENDING,
    ADMIN_GET_COMPANIES_FAILED,
    ADMIN_CREATE_CONTACT_PERSON_PENDING,
    ADMIN_CREATE_CONTACT_PERSON_FAILED,
    ADMIN_CREATE_CONTACT_PERSON_RESOLVED,
    ADMIN_GET_CONTACT_PERSONS_PENDING,
    ADMIN_GET_CONTACT_PERSONS_FAILED,
    ADMIN_GET_CONTACT_PERSONS_RESOLVED,
    ADMIN_REMOVE_CONTACT_PERSON_PENDING,
    ADMIN_REMOVE_CONTACT_PERSON_FAILED,
    ADMIN_REMOVE_CONTACT_PERSON_RESOLVED,
    ADMIN_GET_CONTACT_PERSON_PENDING,
    ADMIN_GET_CONTACT_PERSON_FAILED,
    ADMIN_GET_CONTACT_PERSON_RESOLVED,
    ADMIN_UPDATE_CONTACT_PERSON_PENDING,
    ADMIN_UPDATE_CONTACT_PERSON_FAILED,
    ADMIN_UPDATE_CONTACT_PERSON_RESOLVED,
} from '../../constants/actionTypes';
import { combineReducers } from 'redux';
import { configs } from './Configs/configsReducer';

const initialState = { getUsersPending: false, getUsersError: null, users: [] };

const test = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_PENDING:
            return {
                ...state,
                getUsersPending: true,
                getUsersError: null,
                users: []
            };
        case ADMIN_GET_USERS_FAILED:
            return {
                ...state,
                getUsersError: action.payload,
                getUsersPending: false,
                users: []
            };
        case ADMIN_GET_USERS_RESOLVED:
            return {
                ...state,
                users: action.payload,
                getUsersPending: false,
                getUsersError: null
            };

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
            return {...state, companies: [], getCompaniesPending: true};
        case ADMIN_GET_COMPANIES_RESOLVED:
            return {
                ...state,
                companies: action.payload,
                getCompaniesPending: false
            };
        case ADMIN_GET_COMPANIES_FAILED:
            return {...state, companies: [], getCompaniesPending: false};

        case ADMIN_CREATE_CONTACT_PERSON_PENDING:
            return {
                ...state,
                createContactPersonPending: true,
                createContactPersonFailed: false,
                createContactPersonResolved: false,
            };

        case ADMIN_CREATE_CONTACT_PERSON_FAILED:
            return {
                ...state,
                createContactPersonPending: false,
                createContactPersonFailed: true,
                createContactPersonResolved: false,
            };

        case ADMIN_CREATE_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                createContactPersonPending: false,
                createContactPersonFailed: false,
                createContactPersonResolved: true,
            };

        case ADMIN_GET_CONTACT_PERSONS_PENDING:
            return {
                ...state,
                getContactPersonsPending: true,
                getContactPersonsFailed: false,
                contactPersons: [],
                createContactPersonResolved: false,
                updateContactPersonResolved: false,
            };

        case ADMIN_GET_CONTACT_PERSONS_FAILED:
            return {
                ...state,
                getContactPersonsPending: false,
                getContactPersonsFailed: true,
                contactPersons: [],
            };

        case ADMIN_GET_CONTACT_PERSONS_RESOLVED:
            return {
                ...state,
                getContactPersonsPending: false,
                getContactPersonsFailed: false,
                contactPersons: action.payload,
            };

        case ADMIN_REMOVE_CONTACT_PERSON_PENDING:
            return {
                ...state,
                removeContactPersonPending: true,
                removeContactPersonFailed: false,
                removeContactPersonResolved: false,
            };

        case ADMIN_REMOVE_CONTACT_PERSON_FAILED:
            return {
                ...state,
                removeContactPersonPending: false,
                removeContactPersonFailed: true,
                removeContactPersonResolved: false,
            };

        case ADMIN_REMOVE_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                removeContactPersonPending: false,
                removeContactPersonFailed: false,
                removeContactPersonResolved: true,
            };

        case ADMIN_GET_CONTACT_PERSON_PENDING:
            return {
                ...state,
                getContactPersonPending: true,
                getContactPersonFailed: false,
                contactPerson: null,
            };

        case ADMIN_GET_CONTACT_PERSON_FAILED:
            return {
                ...state,
                getContactPersonPending: false,
                getContactPersonFailed: true,
                contactPerson: null,
            };

        case ADMIN_GET_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                getContactPersonPending: false,
                getContactPersonFailed: false,
                contactPerson: action.payload,
            };

        case ADMIN_UPDATE_CONTACT_PERSON_PENDING:
            return {
                ...state,
                updateContactPersonPending: true,
                updateContactPersonFailed: false,
                updateContactPersonResolved: false,
            };

        case ADMIN_UPDATE_CONTACT_PERSON_FAILED:
            return {
                ...state,
                updateContactPersonPending: false,
                updateContactPersonFailed: true,
                updateContactPersonResolved: false,
            };

        case ADMIN_UPDATE_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                updateContactPersonPending: false,
                updateContactPersonFailed: false,
                updateContactPersonResolved: true,
            };

        default:
            return state;
    }
};


export const admin =  combineReducers({
    test,
    configs,
});


export const usersSelector = (state) => state.admin.test.users;
export const usersErrorSelector = (state) => state.admin.test.getUsersError;
export const usersPendingSelector = (state) => state.admin.test.getUsersPending;

export const createCompanySuccessSelector = (state) => state.admin.test.companyCreated;
export const createCompanyPendingSelector = (state) => state.admin.test.createCompanyPending;

export const companiesSelector = (state) => state.admin.test.companies;
export const getCompaniesPendingSelector = state => state.admin.test.getCompaniesPending;

export const contactPersonCreatedSelector = state => state.admin.test.createContactPersonResolved;
export const createContactPersonPendingSelector = state => state.admin.test.createContactPersonPending;

export const contactPersonsSelector = state => state.admin.test.contactPersons;
export const contactPersonSelector = state => state.admin.test.contactPerson;

export const removeContactPersonResolvedSelector = state => state.admin.test.removeContactPersonResolved;

export const updateContactPersonResolvedSelector = state => state.admin.test.updateContactPersonResolved;

