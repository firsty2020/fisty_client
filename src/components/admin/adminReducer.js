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
    ADMIN_PROJECT_CREATE,
    ADMIN_PROJECT_RESET,
    ADMIN_PROJECT_DELETE,
    ADMIN_GET_PROJECT,
    ADMIN_PROJECT_UPDATE,
    ADMIN_DASHBOARD_STATISTICS_GET,
    API_REQUEST,
    API_REQUEST_END,
    ADMIN_LEAD_CREATE,
    ADMIN_LEAD_STATE_RESET,
    ADMIN_LEADS_GET,
    ADMIN_LEAD_DELETE,
    ADMIN_LEAD_UPDATE,
    ADMIN_PROJECT_RECRUITERS_SET,
    ADMIN_USER_DELETE,
    ADMIN_USERS_STATE_RESET,
    ADMIN_USER_UPDATE,
    ADMIN_NOTES_CREATE,
    ADMIN_NOTES_GET,
    ADMIN_NOTES_STATE_RESET, ADMIN_NOTE_DELETE,
} from '../../helpers/constants/actionTypes';
import { combineReducers } from 'redux';
import { configs } from './Config/configsReducer';
import { companies } from './Company/companiesReducer';
import { branches } from './Branch/branchReducer';
import { createSelector } from 'reselect';


const common = (state = {}, action) => {

    switch (action.type) {

        case API_REQUEST:
            return { ...state, isLoading: true };

        case API_REQUEST_END:
            return { ...state, isLoading: false };

        case ADMIN_GET_USERS:
            return { ...state, users: action.payload };

        case ADMIN_USER_DELETE:
            return { ...state, userDeleted: true };

        case ADMIN_USERS_STATE_RESET:
            return { ...state, userDeleted: false, userUpdated: false };

        case ADMIN_CREATE_CONTACT_PERSON:
            return { ...state, contactPersonCreated: true };

        case ADMIN_SET_CONTACT_PERSON_CREATED:
            return { ...state, contactPersonCreated: action.payload };

        case ADMIN_GET_CONTACT_PERSONS:
            return {
                ...state,
                contactPersons: action.id ?  {
                    ...state.contactPersons,
                    [ action.id ]: action.payload ,
                } : action.payload,
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
            return { ...state, projects: action.payload };

        case ADMIN_GET_PROJECT:
            return { ...state, project: action.payload };

        case ADMIN_PROJECT_CREATE:
            return { ...state, projectCreated: action.payload };

        case ADMIN_PROJECT_UPDATE:
            return { ...state, projectUpdated: true };

        case ADMIN_PROJECT_DELETE:
            return { ...state, projectDeleted: true };

        case ADMIN_PROJECT_RESET:
            return {
                ...state,
                projectCreated: false,
                projectDeleted: false,
                projectUpdated: false,
                recruitersSet: false,
            };

        case ADMIN_DASHBOARD_STATISTICS_GET: {
            return { statistics: action.payload };
        }

        case ADMIN_LEAD_CREATE:
            return { ...state,  leadCreated: true };

        case ADMIN_LEAD_UPDATE:
            return { ...state,  leadUpdated: true };

        case ADMIN_LEADS_GET:
            return { ...state,  leads: action.payload };

        case ADMIN_LEAD_DELETE:
            return { ...state,  leadDeleted: true };

        case ADMIN_PROJECT_RECRUITERS_SET:
            return { ...state, recruitersSet: true };


        case ADMIN_LEAD_STATE_RESET:
            return {
                ...state,
                leadCreated: false,
                leadDeleted: false,
                leadUpdated: false,
            };

        case ADMIN_USER_UPDATE:
            return { ...state, userUpdated: true };

        case ADMIN_NOTES_CREATE:
            return { ...state, noteCreated: true };

        case ADMIN_NOTES_GET:
            return { ...state, notes: action.payload.results };

        case ADMIN_NOTE_DELETE:
            return { ...state, noteDeleted: true };

        case ADMIN_NOTES_STATE_RESET:
            return { ...state, noteCreated: false, noteDeleted: false };

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
export const userDeletedSelector = (state) => state.admin.common.userDeleted;

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
export const projectSelector = state => state.admin.common.project;
export const projectCreatedSelector = state => state.admin.common.projectCreated;
export const projectUpdatedSelector = state => state.admin.common.projectUpdated;
export const projectDeletedSelector = state => state.admin.common.projectDeleted;

export const statisticsSelector = state => state.admin.common.statistics;

export const leadCreatedSelector = state => state.admin.common.leadCreated;
export const leadDeletedSelector = state => state.admin.common.leadDeleted;
export const leadUpdatedSelector = state => state.admin.common.leadUpdated;
export const leadsSelector = state => state.admin.common.leads;

export const recruitersSet = state => state.admin.common.recruitersSet;

export const userUpdateSelector = state => state.admin.common.userUpdated;

export const notesSelector = state => state.admin.common.notes;
export const noteCreatedSelector = state => state.admin.common.noteCreated;
export const noteDeletedSelector = state => state.admin.common.noteDeleted;
