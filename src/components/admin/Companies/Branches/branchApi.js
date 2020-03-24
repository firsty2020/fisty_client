import api from '../../../../axios';
import {
    createBranchFailed,
    createBranchPending,
    createBranchResolved, getBranchesPending, getBranchesResolved
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
