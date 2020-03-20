import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
    ADMIN_GET_APPLICATIONS_PENDING,
    ADMIN_GET_APPLICATIONS_FAILED,
    ADMIN_GET_APPLICATIONS_RESOLVED,
} from '../../constants/actionTypes';


/*** Actions for fetching users ***/

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

/******************************************/


/*** Actions for fetching applications ***/

export const getApplicationsPending = () => ({
    type: ADMIN_GET_APPLICATIONS_PENDING,
});

export const getApplicationsFailed = () => ({
    type: ADMIN_GET_APPLICATIONS_FAILED,
});

export const getApplicationsResolved = (applications) => ({
    type: ADMIN_GET_APPLICATIONS_RESOLVED,
    payload: applications,
});

/******************************************/
