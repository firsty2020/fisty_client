import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
} from '../../constants/actionTypes';

const initialState = { getUsersPending: false, getUsersError: null, users: [] };

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_PENDING:
            return { getUsersPending: true, getUsersError: null, users: [] };
        case ADMIN_GET_USERS_FAILED:
            return { getUsersError: action.payload, getUsersPending: false, users: [] };
        case ADMIN_GET_USERS_RESOLVED:
            return { users: action.payload, getUsersPending: false, getUsersError: null };
        default: return state;
    }
};


export const usersSelector = (state) => state.admin.users;
export const usersErrorSelector = (state) => state.admin.getUsersError;
export const usersPendingSelector = (state) => state.admin.getUsersPending;
