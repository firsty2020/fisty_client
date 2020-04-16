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
    ADMIN_UPDATE_BRANCH_RESOLVED
} from '../../../helpers/constants/actionTypes';


export const branches = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CREATE_BRANCH_PENDING:
            return {
                branchCreated: false,
                createCompanyPending: true
            };
        case ADMIN_CREATE_BRANCH_RESOLVED:
            return {
                branchCreated: true,
                createCompanyPending: false
            };
        case ADMIN_CREATE_BRANCH_FAILED:
            return {
                branchCreated: false,
                createCompanyPending: false
            };


        case ADMIN_GET_BRANCHES:
            return {
                ...state,
                branches: action.payload.results,
                getBranchesPending: false,
            };

        case ADMIN_REMOVE_BRANCH_PENDING:
            return {
                ...state,
                branchRemoved: false,
                removeBranchPending: true,
            };
        case ADMIN_REMOVE_BRANCH_RESOLVED:
            return {
                ...state,
                branchRemoved: true,
                removeBranchPending: false,
            };
        case ADMIN_REMOVE_BRANCH_FAILED:
            return {
                branchRemoved: false,
                removeBranchPending: false,
            };

        case ADMIN_GET_BRANCH_PENDING:
            return {
                ...state,
                getBranchPending: true,
            };
        case ADMIN_GET_BRANCH_RESOLVED:
            return {
                getBranchPending: false,
                branch: action.payload,
            };
        case ADMIN_GET_BRANCH_FAILED:
            return {
                ...state,
                getBranchPending: false,
            };

        case ADMIN_UPDATE_BRANCH_PENDING:
            return {
                ...state,
                updateBranchPending: true,
                updateBranchResolved: false,
            };
        case ADMIN_UPDATE_BRANCH_RESOLVED:
            return {
                ...state,
                updateBranchPending: false,
                updateBranchResolved: true,
            };
        case ADMIN_UPDATE_BRANCH_FAILED:
            return {
                ...state,
                updateBranchPending: false,
                updateBranchResolved: false,
            };

        default:
            return state;
    }
};


export const createBranchPendingSelector = state => state.admin.branches.createCompanyPending;
export const createBranchResolvedSelector = state => state.admin.branches.branchCreated;
export const branchesSelector = state => state.admin.branches.branches;
export const getBranchesPendingSelector = state => state.admin.branches.getBranchesPending;
export const branchRemovedSelector = state => state.admin.branches.branchRemoved;
export const branchSelector = state => state.admin.branches.branch;
export const updateBranchPendingSelector = state => state.admin.branches.updateBranchPending;
export const updateBranchResolvedSelector = state => state.admin.branches.updateBranchResolved;
