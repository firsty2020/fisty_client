import {
    getUsersPending,
    getUsersFailed,
    getUsersResolved,
} from '../adminActions';
import api from '../../../axios';


export const getUsers = (status) => {
    let params;
    if (status !== 'all') {
        params = { status }
    }
    return dispatch => {
        dispatch(getUsersPending());
        api
            .get('users/', { params })
            .then((res) => dispatch(getUsersResolved(res.data.results)))
            .catch(error => dispatch(getUsersFailed(error)));
    };
};
