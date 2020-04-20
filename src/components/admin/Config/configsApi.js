import {
    addIndustryOptionResolved,
    addIndustryOptionFailed,
    addIndustryOptionPending,
    getIndustryOptionsResolved,
    getIndustryOptionsPending,
    getIndustryOptionsFailed,
    updateIndustryOptionPending,
    updateIndustryOptionResolved,
    updateIndustryOptionFailed,
    removeIndustryOptionPending,
    removeIndustryOptionResolved,
    removeIndustryOptionFailed,
    addSpecificationOptionPending,
    addSpecificationOptionResolved,
    addSpecificationOptionFailed,
    getSpecificationOptionsPending,
    getSpecificationOptionsResolved,
    getSpecificationOptionsFailed,
    updateSpecificationOptionPending,
    updateSpecificationOptionResolved,
    updateSpecificationOptionFailed,
    removeSpecificationOptionResolved,
    getIndustryOptionResolved,
    getIndustryOptionFailed,
    getSpecificationOptionResolved,
    getSpecificationOptionFailed,
    createLocationPending,
    createLocationResolved,
    createLocationFailed,
    getLocationsResolved,
    getLocationsPending,
    getLocationsFailed,
    removeSpecificationOptionFailed,
    removeLocationResolved,
    removeLocationFailed,
    updateLocationResolved,
    updateLocationFailed,
} from './configsActions';
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
            .then((res) => dispatch(getIndustryOptionsResolved(res.data.results)))
            .catch((err) => dispatch(getIndustryOptionsFailed(err)))
    };
};

export const getIndustryOption = (id) => {
    return dispatch => {
        api
            .get(`industries/${id}`)
            .then((res) => dispatch(getIndustryOptionResolved(res.data)))
            .catch(() => dispatch(getIndustryOptionFailed()))
    };
};

export const updateIndustryOption = ({ id, name }) => {
    return dispatch => {
        dispatch(updateIndustryOptionPending());
        api
            .patch(`industries/${id}/`, { name })
            .then((res) => dispatch(updateIndustryOptionResolved(res.data.results)))
            .catch((err) => dispatch(updateIndustryOptionFailed(err)))
    };
};

export const removeIndustryOption = (id) => {
    return dispatch => {
        dispatch(removeIndustryOptionPending());
        api
            .delete(`industries/${id}/`)
            .then((res) => dispatch(removeIndustryOptionResolved(res.data)))
            .catch((err) => dispatch(removeIndustryOptionFailed(err)))
    };
};

/**
 * Add an option to 'отрасль' dropdown for company
 * @param name {string}
 * @returns {Function}
 */
export const addSpecificationOption = (name) => {
    return dispatch => {
        dispatch(addSpecificationOptionPending());
        api
            .post('specification/', { name })
            .then(() => dispatch(addSpecificationOptionResolved()))
            .catch((err) => dispatch(addSpecificationOptionFailed(err)))
    };
};

export const getSpecificationOptions = () => {
    return dispatch => {
        dispatch(getSpecificationOptionsPending());
        api
            .get('specification/')
            .then((res) => dispatch(getSpecificationOptionsResolved(res.data.results)))
            .catch((err) => dispatch(getSpecificationOptionsFailed(err)))
    };
};

export const getSpecificationOption = (id) => {
    return dispatch => {
        api
            .get(`specification/${id}`)
            .then((res) => dispatch(getSpecificationOptionResolved(res.data)))
            .catch(() => dispatch(getSpecificationOptionFailed()))
    };
};

export const updateSpecificationOption = ({ id, name }) => {
    return dispatch => {
        dispatch(updateSpecificationOptionPending());
        api
            .patch(`specification/${id}/`, { name })
            .then((res) => dispatch(updateSpecificationOptionResolved()))
            .catch((err) => dispatch(updateSpecificationOptionFailed(err)))
    };
};

export const removeSpecificationOption = (id) => {
    return dispatch => {
        api
            .delete(`specification/${id}/`)
            .then((res) => dispatch(removeSpecificationOptionResolved(res.data)))
            .catch((err) => dispatch(removeSpecificationOptionFailed()))
    };
};

export const createLocation = (name) => {
    return dispatch => {
        dispatch(createLocationPending());
        api
            .post('locations/', { name })
            .then(() => dispatch(createLocationResolved()))
            .catch((err) => dispatch(createLocationFailed()))
    };
};

export const removeLocation = (id) => {
    return dispatch => {
        api
            .delete(`locations/${id}/`)
            .then((res) => dispatch(removeLocationResolved()))
            .catch((err) => removeLocationFailed())
    };
};

export const updateLocation = ({ id, name }) => {
    return dispatch => {
        api
            .patch(`locations/${id}/`, { name })
            .then(() => dispatch(updateLocationResolved()))
            .catch(() => dispatch(updateLocationFailed()))
    };
};
