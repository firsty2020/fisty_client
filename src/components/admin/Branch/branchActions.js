import {
    ADMIN_CREATE_BRANCH_FAILED,
    ADMIN_CREATE_BRANCH_PENDING,
    ADMIN_CREATE_BRANCH_RESOLVED,
    ADMIN_GET_BRANCH_FAILED,
    ADMIN_GET_BRANCH_PENDING,
    ADMIN_GET_BRANCH_RESOLVED,
    ADMIN_GET_BRANCHES,
    ADMIN_REMOVE_BRANCH_FAILED,
    ADMIN_REMOVE_BRANCH_PENDING,
    ADMIN_REMOVE_BRANCH_RESOLVED,
    ADMIN_UPDATE_BRANCH_FAILED,
    ADMIN_UPDATE_BRANCH_PENDING,
    ADMIN_UPDATE_BRANCH_RESOLVED,
} from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


/*** Actions for creating a branch ***/

export const createBranchPending = () => ({
    type: ADMIN_CREATE_BRANCH_PENDING,
});

export const createBranchFailed = () => ({
    type: ADMIN_CREATE_BRANCH_FAILED,
});

export const createBranchResolved = () => ({
    type: ADMIN_CREATE_BRANCH_RESOLVED,
});

/******************************************/


export const getBranches = (params) => createApiAction({
    url: 'companies/branch/',
    method: 'GET',
    data: params,
    label: ADMIN_GET_BRANCHES,
});


/*** Actions for fetching a single branch ***/

export const getBranchPending = () => ({
    type: ADMIN_GET_BRANCH_PENDING,
});

export const getBranchFailed = () => ({
    type: ADMIN_GET_BRANCH_FAILED,
});

export const getBranchResolved = (branch) => ({
    type: ADMIN_GET_BRANCH_RESOLVED,
    payload: branch,
});

/******************************************/


/*** Actions for deleting a branch ***/

export const removeBranchPending = () => ({
    type: ADMIN_REMOVE_BRANCH_PENDING,
});

export const removeBranchFailed = () => ({
    type: ADMIN_REMOVE_BRANCH_FAILED,
});

export const removeBranchResolved = () => ({
    type: ADMIN_REMOVE_BRANCH_RESOLVED,
});

/******************************************/

/*** Actions for deleting a branch ***/

export const updateBranchPending = () => ({
    type: ADMIN_UPDATE_BRANCH_PENDING,
});

export const updateBranchFailed = () => ({
    type: ADMIN_UPDATE_BRANCH_FAILED,
});

export const updateBranchResolved = () => ({
    type: ADMIN_UPDATE_BRANCH_RESOLVED,
});

/******************************************/
