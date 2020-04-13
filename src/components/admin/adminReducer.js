import {
    ADMIN_CREATE_CONTACT_PERSON,
    ADMIN_GET_USERS,
    ADMIN_GET_CONTACT_PERSONS,
    ADMIN_REMOVE_CONTACT_PERSON,
    ADMIN_GET_CONTACT_PERSON,
    ADMIN_UPDATE_CONTACT_PERSON,
    ADMIN_LINK_CONTACT_PERSON,
    ADMIN_UNLINK_CONTACT_PERSON,
    ADMIN_SET_CONTACT_PERSON_UPDATED,
    ADMIN_SET_CONTACT_PERSON_CREATED,
    ADMIN_SET_CONTACT_PERSON_REMOVED,
    ADMIN_SET_CONTACT_PERSON_UNLINKED,
    ADMIN_SET_CONTACT_PERSON_LINKED,
    ADMIN_GET_PROJECTS,
} from '../../helpers/constants/actionTypes';
import { combineReducers } from 'redux';
import { configs } from './Configs/configsReducer';
import { companies } from './Companies/companiesReducer';
import { branches } from './Branches/branchReducer';
import { createSelector } from 'reselect';


const common = (state = {}, action) => {
    switch (action.type) {

        case ADMIN_GET_USERS:
            return { ...state, users: action.payload.results };

        case ADMIN_CREATE_CONTACT_PERSON:
            return { ...state, contactPersonCreated: true };

        case ADMIN_SET_CONTACT_PERSON_CREATED:
            return { ...state, contactPersonCreated: action.payload };

        case ADMIN_GET_CONTACT_PERSONS:
            return {
                ...state,
                contactPersons: action.id ?  {
                    ...state.contactPersons,
                    [ action.id ]: action.payload.results ,
                } : action.payload.results,
            };


        case ADMIN_REMOVE_CONTACT_PERSON:
            return { ...state, contactPersonRemoved: true };

        case ADMIN_SET_CONTACT_PERSON_REMOVED:
            return { ...state, contactPersonRemoved: action.payload };

        case ADMIN_SET_CONTACT_PERSON_UNLINKED:
            return { ...state, contactPersonUnLinked: action.payload };

        case ADMIN_SET_CONTACT_PERSON_LINKED:
            return { ...state, contactPersonLinked: action.payload };

        case ADMIN_GET_CONTACT_PERSON:
            return { ...state, contactPerson: action.payload };

        case ADMIN_UPDATE_CONTACT_PERSON:
            return { ...state, contactPersonUpdated: true };

        case ADMIN_SET_CONTACT_PERSON_UPDATED:
            return { ...state, contactPersonUpdated: action.payload };

        case ADMIN_LINK_CONTACT_PERSON:
            return { ...state, contactPersonLinked: true };

        case ADMIN_UNLINK_CONTACT_PERSON:
            return { ...state, contactPersonUnLinked: true };

        case ADMIN_GET_PROJECTS:
            return { ...state, projects: action.payload.results };

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

export const contactPersonCreatedSelector = state => state.admin.common.contactPersonCreated;

export const contactPersonsSelector = state => state.admin.common.contactPersons;

export const contactPersonSelector = state => state.admin.common.contactPerson;

export const contactPersonsState = (uid = null) => createSelector(
    [ contactPersonsSelector ],
    (contactPersons) => {
        if (!contactPersons) return [];
        if (uid) {
            return contactPersons[uid];
        }
        return contactPersons;
    }
);

export const removeContactPersonResolvedSelector = state => state.admin.common.contactPersonRemoved;

export const updateContactPersonResolvedSelector = state => state.admin.common.contactPersonUpdated;

export const linkContactPersonResolvedSelector = state => state.admin.common.contactPersonLinked;

export const unLinkContactPersonResolvedSelector = state => state.admin.common.contactPersonUnLinked;

export const projectsSelector = state => state.admin.common.projects;
