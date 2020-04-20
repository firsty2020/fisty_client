import {
    createContactPersonRoleFailed,
    createContactPersonRolePending,
    createContactPersonRoleResolved,
    getContactPersonRolesFailed,
    getContactPersonRolesPending,
    getContactPersonRolesResolved,
    removeContactPersonRoleFailed,
    removeContactPersonRolePending,
    removeContactPersonRoleResolved,
    updateContactPersonRoleFailed,
    updateContactPersonRolePending,
    updateContactPersonRoleResolved
} from '../configsActions';
import api from '../../../../axios';

export const createContactPersonRole = (data) => {
    return dispatch => {
        dispatch(createContactPersonRolePending());
        api
            .post('contact-person-roles/', data)
            .then((res) => dispatch(createContactPersonRoleResolved()))
            .catch((err) => dispatch(createContactPersonRoleFailed()))
    };
};


export const getContactPersonRoles = () => {
    return dispatch => {
        dispatch(getContactPersonRolesPending());
        api
            .get('contact-person-roles/')
            .then((res) => dispatch(getContactPersonRolesResolved(res.data.results)))
            .catch((err) => dispatch(getContactPersonRolesFailed()))
    };
};

export const removeContactPersonRole = (id) => {
    return dispatch => {
        dispatch(removeContactPersonRolePending());
        api
            .delete(`contact-person-roles/${id}`)
            .then((res) => dispatch(removeContactPersonRoleResolved()))
            .catch((err) => dispatch(removeContactPersonRoleFailed()))
    };
};

export const updateContactPersonRole = (role) => {
    return dispatch => {
        dispatch(updateContactPersonRolePending());
        api
            .patch(`contact-person-roles/${role.id}/`, role)
            .then((res) => dispatch(updateContactPersonRoleResolved()))
            .catch((err) => dispatch(updateContactPersonRoleFailed()))
    };
};
