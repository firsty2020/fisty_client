import { createApiAction, extractIdFromUrl } from '../../../../helpers/utils';
import {
    ADMIN_CONFIGS_CREATE_DYNAMIC_FIELD,
    ADMIN_CONFIGS_GET_DYNAMIC_FIELDS,
    ADMIN_CONFIGS_REMOVE_DYNAMIC_FIELD,
    ADMIN_CONFIGS_SET_DYNAMIC_FIELD_CREATED,
    ADMIN_CONFIGS_SET_DYNAMIC_FIELD_REMOVED,
    ADMIN_CONFIGS_SET_DYNAMIC_FIELD_UPDATED,
    ADMIN_CONFIGS_UPDATE_DYNAMIC_FIELD, DELETE, GET, PATCH,
    POST,
} from '../../../../helpers/constants/actionTypes';


export const createDynamicField = (data, endpoint = 'standard-fields/') => createApiAction({
    url: endpoint,
    method: POST,
    data,
    label: ADMIN_CONFIGS_CREATE_DYNAMIC_FIELD,
});

export const getDynamicFields = (params, endpoint = 'standard-fields/') => createApiAction({
    url: endpoint,
    method: GET,
    data: params,
    label: ADMIN_CONFIGS_GET_DYNAMIC_FIELDS,
});

export const removeDynamicField = (id, endpoint = 'standard-fields') => createApiAction({
    url: `${endpoint}/${id}/`,
    method: DELETE,
    label: ADMIN_CONFIGS_REMOVE_DYNAMIC_FIELD,
});

export const updateDynamicField = (dynamicField, endpoint = 'standard-fields') => createApiAction({
    url: `${endpoint}/${extractIdFromUrl(dynamicField.url)}/`,
    method: PATCH,
    data: dynamicField,
    label: ADMIN_CONFIGS_UPDATE_DYNAMIC_FIELD,
});

export const resetDynamicFieldCreated = () => ({
    type: ADMIN_CONFIGS_SET_DYNAMIC_FIELD_CREATED,
});

export const resetDynamicFieldRemoved = () => ({
    type: ADMIN_CONFIGS_SET_DYNAMIC_FIELD_REMOVED,
});


export const resetDynamicFieldUpdated = () => ({
    type: ADMIN_CONFIGS_SET_DYNAMIC_FIELD_UPDATED,
    payload: false,
});
