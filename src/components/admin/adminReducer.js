import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
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
import { companies } from './Companies/companiesReducer';
import { branches } from './Companies/Branches/branchReducer';

const initialState = { getUsersPending: false, getUsersError: null, users: [] };

const common = (state = initialState, action) => {
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
    common,
    configs,
    companies,
    branches,
});


export const usersSelector = (state) => state.admin.common.users;
export const usersErrorSelector = (state) => state.admin.common.getUsersError;
export const usersPendingSelector = (state) => state.admin.common.getUsersPending;

export const contactPersonCreatedSelector = state => state.admin.common.createContactPersonResolved;
export const createContactPersonPendingSelector = state => state.admin.common.createContactPersonPending;

export const contactPersonsSelector = state => state.admin.common.contactPersons;
export const contactPersonSelector = state => state.admin.common.contactPerson;

export const removeContactPersonResolvedSelector = state => state.admin.common.removeContactPersonResolved;

export const updateContactPersonResolvedSelector = state => state.admin.common.updateContactPersonResolved;

