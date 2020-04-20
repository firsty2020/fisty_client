import { ADMIN_GET_USERS } from '../../../helpers/constants/actionTypes';
import { createApiAction } from '../../../helpers/utils';


export const getUsers = (status) => {
    let params;
    if (status !== 'all') {
        params = { status }
    }
    return createApiAction({
        url: 'users/',
        method: 'GET',
        data: params ,
        label: ADMIN_GET_USERS,
    });
};
