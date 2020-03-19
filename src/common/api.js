import api from '../axios';
import {
    createApplicationFailed,
    createApplicationPending,
    createApplicationResolved
} from './actions';


export const createApplication = (data) => {
    return dispatch => {
        dispatch(createApplicationPending());
        api
            .post('applications/', data)
            .then(() => dispatch(createApplicationResolved()))
            .catch((err) => dispatch(createApplicationFailed(err)))
    }
};
