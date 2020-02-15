import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
} from '../../constants/actionTypes';


export const getUsersPending = () => ({
    type: ADMIN_GET_USERS_PENDING,
});

export const getUsersFailed = () => ({
    type: ADMIN_GET_USERS_FAILED,
});

export const getUsersResolved = (users) => ({
    payload: users,
    type: ADMIN_GET_USERS_RESOLVED,
});


