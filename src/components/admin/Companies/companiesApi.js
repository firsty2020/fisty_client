import {
    createCompanyPending,
    createCompanyFailed,
    createCompanyResolved,
    getCompaniesPending,
    getCompaniesResolved,
} from '../adminActions';
import api from '../../../axios';


export const createCompany = (data) => {
    return dispatch => {
        dispatch(createCompanyPending());
        api
            .post('companies/', data)
            .then(() => dispatch(createCompanyResolved()))
            .catch(() => dispatch(createCompanyFailed()))
    }
};

export const getCompanies = (data) => {
    return dispatch => {
        dispatch(getCompaniesPending());
        api
            .get('companies/')
            .then((res) => dispatch(getCompaniesResolved(res.data)))
            .catch(() => dispatch(createCompanyFailed()))
    }
};
