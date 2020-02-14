import React from 'react';
import { number, shape, string} from 'prop-types';


const UserListItem = ({ user, index }) => {

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.phone_number}</td>
            <td>{user.citizenship}</td>
            <td>{user.country}</td>
            <td>{user.city}</td>
        </tr>
    );
};

UserListItem.propTypes = {
    user: shape({
        first_name: string.isRequired,
        last_name: string.isRequired,
        email: string.isRequired,
        role: string.isRequired,
        phone_number: string.isRequired,
        citizenship: string.isRequired,
        country: string.isRequired,
        city: string.isRequired,
    }).isRequired,
    index: number.isRequired,
};


export default UserListItem;
