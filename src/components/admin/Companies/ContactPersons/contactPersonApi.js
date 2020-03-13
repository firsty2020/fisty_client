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
    removeContactPersonFailed,
    removeContactPersonPending,
    removeContactPersonResolved, updateContactPersonFailed,
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

export const getContactPersons = () => {
    return dispatch => {
        dispatch(getContactPersonsPending());
        api
            .get('contact-person/')
            .then((res) => dispatch(getContactPersonsResolved(res.data.results)))
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
    console.log(contactPerson, 'contactPerson')
    return dispatch => {
        dispatch(updateContactPersonPending());
        api
            .patch(`contact-person/${contactPerson.id}/`, contactPerson)
            .then(() => dispatch(updateContactPersonResolved()))
            .catch(() => dispatch(updateContactPersonFailed()))
    }
};
