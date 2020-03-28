import {
    createContactPersonFailed,
    createContactPersonPending,
    createContactPersonResolved,
    getContactPersonFailed,
    getContactPersonPending,
    getContactPersonResolved,
    getContactPersonsFailed,
    getContactPersonsPending,
    getContactPersonsResolved,
    linkContactPersonFailed,
    linkContactPersonPending,
    linkContactPersonResolved,
    removeContactPersonFailed,
    removeContactPersonPending,
    removeContactPersonResolved,
    unLinkContactPersonFailed,
    unLinkContactPersonPending,
    unLinkContactPersonResolved,
    updateContactPersonFailed,
    updateContactPersonPending,
    updateContactPersonResolved
} from './contactPersonActions';
import api from '../../../../axios';


export const createContactPerson = (data) => {
    return dispatch => {
        dispatch(createContactPersonPending());
        api
            .post('contact-person/', data)
            .then(() => dispatch(createContactPersonResolved()))
            .catch((err) => dispatch(createContactPersonFailed()))
    }
};


export const getContactPersons = (params, uid) => {
    return dispatch => {
        dispatch(getContactPersonsPending());
        api
            .get('contact-person/', { params })
            .then((res) => dispatch(getContactPersonsResolved(res.data.results, uid)))
            .catch((err) => dispatch(getContactPersonsFailed()))
    }
};


export const getContactPerson = (id) => {
    return dispatch => {
        dispatch(getContactPersonPending());
        api
            .get(`contact-person/${id}/`)
            .then((res) => dispatch(getContactPersonResolved(res.data)))
            .catch((err) => dispatch(getContactPersonFailed()))
    }
};


export const removeContactPerson = (id) => {
    return dispatch => {
        dispatch(removeContactPersonPending());
        api
            .delete(`contact-person/${id}`)
            .then((res) => dispatch(removeContactPersonResolved()))
            .catch((err) => dispatch(removeContactPersonFailed()))
    }
};


export const updateContactPerson = (contactPerson) => {
    return dispatch => {
        dispatch(updateContactPersonPending());
        api
            .patch(`contact-person/${contactPerson.id}/`, contactPerson)
            .then(() => dispatch(updateContactPersonResolved()))
            .catch(() => dispatch(updateContactPersonFailed()))
    }
};

export const linkContactPerson = (data) => {
    return dispatch => {
        dispatch(linkContactPersonPending());
        api
            .post('companies/contact-person-relations/link/', data)
            .then(() => dispatch(linkContactPersonResolved()))
            .catch((err) => dispatch(linkContactPersonFailed()))
    }
};

export const unLinkContactPerson = (data) => {
    return dispatch => {
        dispatch(unLinkContactPersonPending());
        api
            .post('companies/contact-person-relations/unlink/', data)
            .then(() => dispatch(unLinkContactPersonResolved()))
            .catch((err) => dispatch(unLinkContactPersonFailed()))
    }
};
