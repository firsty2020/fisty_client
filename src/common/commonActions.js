import {
    GET_APPLICATIONS_FAILED,
    GET_APPLICATIONS_PENDING,
    GET_APPLICATIONS_RESOLVED,
    CREATE_APPLICATION_FAILED,
    CREATE_APPLICATION_PENDING,
    CREATE_APPLICATION_RESOLVED,
} from '../helpers/constants/actionTypes';

/*** Actions for creating an application ***/

export const createApplicationPending = () => ({
    type: CREATE_APPLICATION_PENDING,
});

export const createApplicationFailed = () => ({
    type: CREATE_APPLICATION_FAILED,
});

export const createApplicationResolved = () => ({
    type: CREATE_APPLICATION_RESOLVED,
});

/******************************************/


/*** Actions for fetching applications ***/

export const getApplicationsPending = () => ({
    type: GET_APPLICATIONS_PENDING,
});

export const getApplicationsFailed = () => ({
    type: GET_APPLICATIONS_FAILED,
});

export const getApplicationsResolved = (applications) => ({
    type: GET_APPLICATIONS_RESOLVED,
    payload: applications,
});

/******************************************/
