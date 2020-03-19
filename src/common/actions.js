import {
    CREATE_APPLICATION_FAILED,
    CREATE_APPLICATION_PENDING,
    CREATE_APPLICATION_RESOLVED,
} from '../constants/actionTypes';

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
