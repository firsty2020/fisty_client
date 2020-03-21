import api from '../axios';
import {
    createApplicationFailed,
    createApplicationPending,
    createApplicationResolved,
    getApplicationsFailed,
    getApplicationsPending,
    getApplicationsResolved,
} from './commonActions';


export const createApplication = (data) => {
    return dispatch => {
        dispatch(createApplicationPending());
        api
            .post('applications/', data)
            .then(() => dispatch(createApplicationResolved()))
            .catch((err) => dispatch(createApplicationFailed()))
    }
};


export const getApplications = (params) => {
    return dispatch => {
        dispatch(getApplicationsPending());
        api
            .get('applications/', { params })
            .then((res) => dispatch(getApplicationsResolved(res.data.results)))
            .catch(() => dispatch(getApplicationsFailed()))
    }
};
