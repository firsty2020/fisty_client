import {
    ADMIN_CREATE_BRANCH_FAILED,
    ADMIN_CREATE_BRANCH_PENDING,
    ADMIN_CREATE_BRANCH_RESOLVED,
    ADMIN_GET_BRANCHES_FAILED,
    ADMIN_GET_BRANCHES_PENDING, ADMIN_GET_BRANCHES_RESOLVED,
} from '../../../../constants/actionTypes';



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


/*** Actions for fetcing branches ***/

export const getBranchesPending = () => ({
    type: ADMIN_GET_BRANCHES_PENDING,
});

export const getBranchesFailed = () => ({
    type: ADMIN_GET_BRANCHES_FAILED,
});

export const getBranchesResolved = (branches) => ({
    type: ADMIN_GET_BRANCHES_RESOLVED,
    payload: branches,
});

/******************************************/
