import {
    ADMIN_USER_CREATE,
    ADMIN_USER_DELETE,
    ADMIN_USER_UPDATE,
    ADMIN_USERS_STATE_RESET,
    DELETE,
    PATCH,
    POST,
} from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


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

export const createUser = (data) => createApiAction({
    url: '/auth-users/create-user/',
    method: POST,
    data,
    label: ADMIN_USER_CREATE,
});
