import {
    getApplicationsFailed,
    getApplicationsPending,
    getApplicationsResolved
} from './adminActions';
import api from '../../axios';

export const getApplications = (params) => {
    return dispatch => {
        dispatch(getApplicationsPending());
        api
            .get('applications/', { params })
            .then((res) => dispatch(getApplicationsResolved(res.data.results)))
            .catch(() => dispatch(getApplicationsFailed()))
    }
};
