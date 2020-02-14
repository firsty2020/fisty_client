import {
    getUsersPending,
    getUsersFailed,
    getUsersResolved,
} from '../adminActions';
import api from '../../../axios';


export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersPending());
        api
            .get('users/')
            .then((res) => dispatch(getUsersResolved(res.data)))
            .catch(error => dispatch(getUsersFailed(error)));
    };
};
