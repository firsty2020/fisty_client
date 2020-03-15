import {
    createCompanyPending,
    createCompanyFailed,
    createCompanyResolved,
    getCompaniesPending,
    getCompaniesResolved,
    getCompaniesFailed,
    getCompanyResolved,
    getCompanyFailed,
} from './companiesActions';
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
            .catch(() => dispatch(getCompaniesFailed()))
    }
};

export const getCompany = (id) => {
    return dispatch => {
        api
            .get(`companies/${id}`)
            .then((res) => dispatch(getCompanyResolved(res.data)))
            .catch(() => dispatch(getCompanyFailed()))
    }
};
