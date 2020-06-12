import {
    ADMIN_CREATE_CONTACT_PERSON,
    ADMIN_GET_CONTACT_PERSON,
    ADMIN_GET_CONTACT_PERSONS,
    ADMIN_LINK_CONTACT_PERSON,
    ADMIN_REMOVE_CONTACT_PERSON,
    ADMIN_SET_CONTACT_PERSON_CREATED,
    ADMIN_SET_CONTACT_PERSON_LINKED,
    ADMIN_SET_CONTACT_PERSON_REMOVED,
    ADMIN_SET_CONTACT_PERSON_UNLINKED,
    ADMIN_SET_CONTACT_PERSON_UPDATED,
    ADMIN_UNLINK_CONTACT_PERSON,
    ADMIN_UPDATE_CONTACT_PERSON,
    GET,
    POST,
} from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


export const createContactPerson = (data) => createApiAction({
    url: 'contact-person/',
    method: POST,
    data ,
    label: ADMIN_CREATE_CONTACT_PERSON,
});


export const getContactPersons = (params, id) => createApiAction({
    url: 'contact-person/',
    method: GET,
    data: params,
    label: ADMIN_GET_CONTACT_PERSONS,
    id
});


export const getContactPerson = (id) => createApiAction({
    url: `contact-person/${id}/`,
    method: 'GET',
    label: ADMIN_GET_CONTACT_PERSON,
});


export const removeContactPerson = (id) => createApiAction({
    url: `contact-person/${id}`,
    method: 'DELETE',
    label: ADMIN_REMOVE_CONTACT_PERSON,
});


export const updateContactPerson = (contactPerson) => createApiAction({
    url: `contact-person/${contactPerson.id}/`,
    method: 'PATCH',
    data: contactPerson,
    label: ADMIN_UPDATE_CONTACT_PERSON,
});


export const linkContactPerson = (data) => createApiAction({
    url: 'companies/contact-person-relations/link/',
    method: POST,
    data,
    label: ADMIN_LINK_CONTACT_PERSON,
});

export const unLinkContactPerson = (data) => createApiAction( {
    url: 'companies/contact-person-relations/unlink/',
    method: POST,
    data,
    label: ADMIN_UNLINK_CONTACT_PERSON,
});

export const resetContactPersonUpdated = () => dispatch => {
    dispatch({
        type: ADMIN_SET_CONTACT_PERSON_UPDATED,
        payload: false,
    });
};

export const resetContactPersonCreated = () => dispatch => {
    dispatch({
        type: ADMIN_SET_CONTACT_PERSON_CREATED,
        payload: false,
    });
};

export const resetContactPersonRemoved = () => dispatch => {
    dispatch({
        type: ADMIN_SET_CONTACT_PERSON_REMOVED,
        payload: false,
    });
};

export const resetContactPersonUnlinked = () => dispatch => {
    dispatch({
        type: ADMIN_SET_CONTACT_PERSON_UNLINKED,
        payload: false,
    });
};

export const resetContactPersonLinked = () => dispatch => {
    dispatch({
        type: ADMIN_SET_CONTACT_PERSON_LINKED,
        payload: false,
    });
};
