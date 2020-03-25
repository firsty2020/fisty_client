import api from '../../../../axios';
import {
    createBranchFailed,
    createBranchPending,
    createBranchResolved,
    getBranchesPending,
    getBranchesResolved,
    getBranchFailed,
    getBranchPending,
    getBranchResolved,
    removeBranchFailed,
    removeBranchPending,
    removeBranchResolved,
    updateBranchFailed,
    updateBranchPending,
    updateBranchResolved,
} from './branchActions';


export const createBranch = (data) => {
    return dispatch => {
        dispatch(createBranchPending());
        api
            .post('companies/branch/', data)
            .then(() => dispatch(createBranchResolved()))
            .catch((err) => dispatch(createBranchFailed()));
    }
};


export const getBranches = (params) => {
    return dispatch => {
        dispatch(getBranchesPending());
        api
            .get('companies/branch/', { params })
            .then((res) => dispatch(getBranchesResolved(res.data.results)))
            .catch(() => dispatch(createBranchFailed()));
    }
};


export const getBranch = (id) => {
    return dispatch => {
        dispatch(getBranchPending());
        api
            .get(`companies/branch/${id}`)
            .then((res) => dispatch(getBranchResolved(res.data)))
            .catch(() => dispatch(getBranchFailed()));
    }
};


export const removeBranch = (id) => {
    return dispatch => {
        dispatch(removeBranchPending());
        api
            .delete(`companies/branch/${id}/` )
            .then((res) => dispatch(removeBranchResolved()))
            .catch(() => dispatch(removeBranchFailed()));
    }
};

export const updateBranch = (id, data) => {
    return dispatch => {
        dispatch(updateBranchPending());
        api
            .patch(`companies/branch/${id}/`, data)
            .then((res) => dispatch(updateBranchResolved()))
            .catch(() => dispatch(updateBranchFailed()));
    }
};
