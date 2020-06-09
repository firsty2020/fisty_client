import {
    ADMIN_GET_USERS,
    ADMIN_USER_DELETE,
    ADMIN_USER_UPDATE,
    ADMIN_USERS_STATE_RESET,
    DELETE,
    GET,
    PATCH,
} from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


export const getUsers = (params) => createApiAction({
        url: 'users/',
        method: GET,
        data: params ,
        label: ADMIN_GET_USERS,
});

export const deleteUser = (id) => createApiAction({
    url: `users/${id}/`,
    method: DELETE,
    label: ADMIN_USER_DELETE,
});

export const resetUsersState = () => ({
    type: ADMIN_USERS_STATE_RESET,
});

export const updateUser = (userId, data) => createApiAction({
    url: `users/${userId}/`,
    method: PATCH,
    data,
    label: ADMIN_USER_UPDATE,
});
