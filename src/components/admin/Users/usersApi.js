import {
    ADMIN_GET_USERS, API_REQUEST,
} from '../../../helpers/constants/actionTypes';


export const getUsers = (status) => {
    let params;
    if (status !== 'all') {
        params = { status }
    }
    return {
        type: API_REQUEST,
        payload: {
            url: 'users/',
            method: 'GET',
            data: params ,
            label: ADMIN_GET_USERS,
        }
    }
};
