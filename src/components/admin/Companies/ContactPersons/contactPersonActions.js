import {
    ADMIN_CREATE_CONTACT_PERSON_FAILED,
    ADMIN_CREATE_CONTACT_PERSON_PENDING,
    ADMIN_CREATE_CONTACT_PERSON_RESOLVED,
    ADMIN_GET_CONTACT_PERSON_FAILED,
    ADMIN_GET_CONTACT_PERSON_PENDING,
    ADMIN_GET_CONTACT_PERSON_RESOLVED,
    ADMIN_GET_CONTACT_PERSONS_FAILED,
    ADMIN_GET_CONTACT_PERSONS_PENDING,
    ADMIN_GET_CONTACT_PERSONS_RESOLVED,
    ADMIN_LINK_CONTACT_PERSON_FAILED,
    ADMIN_LINK_CONTACT_PERSON_PENDING,
    ADMIN_LINK_CONTACT_PERSON_RESOLVED,
    ADMIN_REMOVE_CONTACT_PERSON_FAILED,
    ADMIN_REMOVE_CONTACT_PERSON_PENDING,
    ADMIN_REMOVE_CONTACT_PERSON_RESOLVED,
    ADMIN_UNLINK_CONTACT_PERSON_FAILED,
    ADMIN_UNLINK_CONTACT_PERSON_PENDING,
    ADMIN_UNLINK_CONTACT_PERSON_RESOLVED,
    ADMIN_UPDATE_CONTACT_PERSON_FAILED,
    ADMIN_UPDATE_CONTACT_PERSON_PENDING,
    ADMIN_UPDATE_CONTACT_PERSON_RESOLVED
} from '../../../../constants/actionTypes';

/*** Actions for creating contact persons ***/

export const createContactPersonPending = () => ({
    type: ADMIN_CREATE_CONTACT_PERSON_PENDING,
});

export const createContactPersonResolved = () => ({
    type: ADMIN_CREATE_CONTACT_PERSON_RESOLVED,
});

export const createContactPersonFailed = () => ({
    type: ADMIN_CREATE_CONTACT_PERSON_FAILED,
});


/******************************************/


/*** Actions for fetching contact persons ***/

export const getContactPersonsPending = () => ({
    type: ADMIN_GET_CONTACT_PERSONS_PENDING,
});

export const getContactPersonsResolved = (contactPersons, id) => ({
    type: ADMIN_GET_CONTACT_PERSONS_RESOLVED,
    payload: contactPersons,
    id,
});

export const getContactPersonsFailed = () => ({
    type: ADMIN_GET_CONTACT_PERSONS_FAILED,
});

/******************************************/


/*** Actions for removing contact persons ***/

export const removeContactPersonPending = () => ({
    type: ADMIN_REMOVE_CONTACT_PERSON_PENDING,
});

export const removeContactPersonResolved = () => ({
    type: ADMIN_REMOVE_CONTACT_PERSON_RESOLVED,
});

export const removeContactPersonFailed = () => ({
    type: ADMIN_REMOVE_CONTACT_PERSON_FAILED,
});

/******************************************/


/*** Actions for fetching contact persons ***/

export const getContactPersonPending = () => ({
    type: ADMIN_GET_CONTACT_PERSON_PENDING,
});

export const getContactPersonResolved = (contactPerson) => ({
    type: ADMIN_GET_CONTACT_PERSON_RESOLVED,
    payload: contactPerson,
});

export const getContactPersonFailed = () => ({
    type: ADMIN_GET_CONTACT_PERSON_FAILED,
});

/******************************************/


/*** Actions for fetching contact persons ***/

export const updateContactPersonPending = () => ({
    type: ADMIN_UPDATE_CONTACT_PERSON_PENDING,
});

export const updateContactPersonResolved = (contactPerson) => ({
    type: ADMIN_UPDATE_CONTACT_PERSON_RESOLVED,
    payload: contactPerson,
});

export const updateContactPersonFailed = () => ({
    type: ADMIN_UPDATE_CONTACT_PERSON_FAILED,
});

/******************************************/


/*** Actions for linking a contact person to an entity (branch, company, project) ***/

export const linkContactPersonPending = () => ({
    type: ADMIN_LINK_CONTACT_PERSON_PENDING,
});

export const linkContactPersonResolved = () => ({
    type: ADMIN_LINK_CONTACT_PERSON_RESOLVED,
});

export const linkContactPersonFailed = () => ({
    type: ADMIN_LINK_CONTACT_PERSON_FAILED,
});

/******************************************/


/*** Actions for unlinking a contact person from an entity (branch, company, project) ***/

export const unLinkContactPersonPending = () => ({
    type: ADMIN_UNLINK_CONTACT_PERSON_PENDING,
});

export const unLinkContactPersonResolved = () => ({
    type: ADMIN_UNLINK_CONTACT_PERSON_RESOLVED,
});

export const unLinkContactPersonFailed = () => ({
    type: ADMIN_UNLINK_CONTACT_PERSON_FAILED,
});

/******************************************/
