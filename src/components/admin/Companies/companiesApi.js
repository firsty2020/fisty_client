import {
    createCompanyPending,
    createCompanyFailed,
    createCompanyResolved,
    getCompaniesPending,
    getCompaniesResolved,
    getCompaniesFailed,
    createContactPersonPending,
    createContactPersonResolved,
    createContactPersonFailed,
    getContactPersonsPending,
    getContactPersonsResolved,
    getContactPersonsFailed,
    removeContactPersonPending,
    removeContactPersonResolved, removeContactPersonFailed,
} from '../adminActions';
import api from '../../../axios';


export const createCompany = (data) => {
    return dispatch => {
        dispatch(createCompanyPending());
        api
            .post('companies/', data)
            .then(() => dispatch(createCompanyResolved()))
            .catch((err) => dispatch(createCompanyFailed(err)))
    }
};

export const getCompanies = () => {
    return dispatch => {
        dispatch(getCompaniesPending());
        api
            .get('companies/')
            .then((res) => dispatch(getCompaniesResolved(res.data.results)))
            .catch((err) => dispatch(getCompaniesFailed(err)))
    }
};

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

export const removeContactPerson = (id) => {
    return dispatch => {
        dispatch(removeContactPersonPending());
        api
            .delete(`contact-person/${id}`)
            .then((res) => dispatch(removeContactPersonResolved()))
            .catch((err) => dispatch(removeContactPersonFailed()))
    }
};
