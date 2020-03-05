import {
    addIndustryOptionResolved,
    addIndustryOptionFailed,
    addIndustryOptionPending,
    getIndustryOptionsResolved,
    getIndustryOptionsPending, getIndustryOptionsFailed,
} from '../adminActions';
import api from '../../../axios';


/**
 * Add an option to 'отрасль' dropdown for company
 * @param name {string}
 * @returns {Function}
 */
export const addIndustryOption = (name) => {
    return dispatch => {
        dispatch(addIndustryOptionPending());
        api
            .post('industries/', { name })
            .then(() => dispatch(addIndustryOptionResolved()))
            .catch((err) => dispatch(addIndustryOptionFailed(err)))
    };
};


export const getIndustryOptions = () => {
    return dispatch => {
        dispatch(getIndustryOptionsPending());
        api
            .get('industries/')
            .then((res) => dispatch(getIndustryOptionsResolved(res.data)))
            .catch((err) => dispatch(getIndustryOptionsFailed(err)))
    };
};
