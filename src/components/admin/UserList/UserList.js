import React, {useEffect} from 'react';
import { Table } from 'react-bootstrap';
import { getUsers } from './userListApi';
import { connect } from 'react-redux';
import { usersSelector, usersErrorSelector, usersPendingSelector } from '../adminReducer';
import UserListItem from './UserListItem';


const UserList = ({ users, match, getUsers }) => {

    useEffect(() => {
        getUsers();
    }, [ match.params.filter, getUsers ]);

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th width={20}>#</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Эл. Почта</th>
                        <th>Роль</th>
                        <th>Телефон</th>
                        <th>Гражданство</th>
                        <th>Страна</th>
                        <th>Город</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length ? users.map((user, index) =>
                        <UserListItem user={user} index={index} key={user.url} />)
                        : null}
                </tbody>
            </Table>
        </div>
    );
};


const mapStateToProps = state => ({
    users: usersSelector(state),
    getUsersError: usersErrorSelector(state),
    getUsersPending: usersPendingSelector(state),
});

const mapDispatchToProps = { getUsers };


UserList.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
