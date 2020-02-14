import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
} from '../../constants/actionTypes';



export const admin = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_PENDING:
            return { getUsersPending: true, getUsersError: false, users: [] };
        case ADMIN_GET_USERS_FAILED:
            return { getUsersError: action.payload, getUsersPending: false, users: [] };
        case ADMIN_GET_USERS_RESOLVED:
            return { users: action.payload, getUsersPending: false, getUsersError: false };
        default: return state;
    }
};


export const usersSelector = (state) => state.admin.users;
export const usersErrorSelector = (state) => state.admin.getUsersError;
export const usersPendingSelector = (state) => state.admin.getUsersPending;
