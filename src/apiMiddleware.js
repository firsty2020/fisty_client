import api from './axios';
import {
    API_REQUEST,
    API_REQUEST_END,
    API_REQUEST_ERROR
} from './helpers/constants/actionTypes';

const apiMiddleware = ({ dispatch }) => next => action => {
    next(action);

    if (action.type !== API_REQUEST) return;

    const {
        url,
        method,
        data,
        label,
        id,
    } = action.payload;

    
    const dataOrParams = [ 'GET', 'DELETE' ].includes(method) ? 'params' : 'data';

    api
        .request({
            url,
            method,
            [dataOrParams]: data
        })
        .then(({ data }) => {
            dispatch({
                type: label,
                payload: data,
                id,
            });
        })
        .catch(error => {
            dispatch({
                type: API_REQUEST_ERROR,
            });
        })
        .finally(() => dispatch({ type: API_REQUEST_END }))
};

export default apiMiddleware;
