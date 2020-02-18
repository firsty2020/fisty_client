import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Row, Table} from 'react-bootstrap';
import { getUsers } from './userListApi';
import { connect } from 'react-redux';
import {
    usersSelector,
    usersErrorSelector,
    usersPendingSelector
} from '../adminReducer';
import UserListItem from './UserListItem';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import './UserList.css';


const UserList = ({ users, match, getUsers }) => {

    const [ filterByStatus, setFilterByStatus ] = useState('-1');
    
    const handleFilterByStatusChange = (e) => setFilterByStatus(e.target.value);

    useEffect(() => {
        getUsers();
    }, [ match.params.filter, getUsers ]);

    useEffect(() => {
        getUsers(filterByStatus);
    }, [ filterByStatus, getUsers ]);

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 3, offset: 9 }}>
                    <div className="filter-container">
                        <Form.Control
                            name="filter"
                            value={filterByStatus}
                            onChange={handleFilterByStatusChange}
                            as="select">
                            <option value="new">Новые</option>
                            <option value="active">Активные</option>
                            <option value="inactive">Неактивные</option>
                            <option value="clarification">Кларификация</option>
                            <option value="freeze">Замороженные</option>
                            <option value="black_list">Заблокированные</option>
                            <option value="-1">Все</option>
                            <option disabled value="-1">Фильтр</option>
                        </Form.Control>
                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
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
                </Col>
            </Row>
        </Container>
    );
};


const mapStateToProps = state => ({
    users: usersSelector(state),
    getUsersError: usersErrorSelector(state),
    getUsersPending: usersPendingSelector(state),
});

const mapDispatchToProps = { getUsers };


UserList.propTypes = {
    users: arrayOf(shape({
        first_name: string.isRequired,
        last_name: string.isRequired,
        email: string.isRequired,
        role: string.isRequired,
        phone_number: string.isRequired,
        citizenship: string.isRequired,
        country: string.isRequired,
        city: string.isRequired,
    })),
    match: shape({ filter: string}).isRequired,
    getUsers: func.isRequired,
    getUsersError: string,
    getUsersPending: bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
