import React, {useEffect, useState} from 'react';
import { Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { getUsers } from './usersApi';
import { connect } from 'react-redux';
import {
    usersSelector,
    usersErrorSelector,
    usersPendingSelector
} from '../adminReducer';
import UserListItem from './UserListItem';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { When } from 'react-if';
import { push } from 'connected-react-router';
import './Users.css';
import { EmptyListPlaceholder } from '../../ui';


const Users = ({ users, match, getUsers, getUsersPending, push }) => {

    const [ status, setStatus ] = useState();

    const handleFilterByStatusChange = (e) => setStatus(e.target.value);

    useEffect(() => {
        if (!status) {
            setStatus(match.params.status);
            getUsers(match.params.status);
        } else {
            getUsers(status);
        }
    }, [ getUsers, match.params.status ]);

    useEffect(() => {
        if (!status) return;
        push(`/admin/users/${status}`);
    }, [ getUsers, push, status ]);

    return (
        <div>
            <div className="filter-container">
                <Row>
                    <Col lg={4} md={4} sm={4}>
                        <Form.Label>Фильтровать по статусу</Form.Label>
                        <Form.Control
                            name="filter"
                            value={status}
                            onChange={handleFilterByStatusChange}
                            as="select">
                            <option value="new">Новые</option>
                            <option value="active">Активные</option>
                            <option value="inactive">Неактивные</option>
                            <option value="clarification">Кларификация</option>
                            <option value="freeze">Замороженные</option>
                            <option value="black_list">Заблокированные</option>
                            <option value="all">Все</option>
                        </Form.Control>
                    </Col>
                </Row>
            </div>
            <div >
                <Table
                    striped
                    responsive="md"
                    responsive="lg"
                    responsive="xs"
                    responsive="sm"
                    responsive="xl"
                >
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
            <When condition={getUsersPending}>
                <div className="text-center m-a-xl">
                    <Spinner
                        variant="primary"
                        animation="border" />
                </div>
            </When>
            <When condition={!getUsersPending && !users.length}>
                <EmptyListPlaceholder/>
            </When>
        </div>
    );
};


const mapStateToProps = state => ({
    users: usersSelector(state),
    getUsersError: usersErrorSelector(state),
    getUsersPending: usersPendingSelector(state),
});

const mapDispatchToProps = { getUsers, push };


Users.propTypes = {
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
    match: shape({ status: string }).isRequired,
    getUsers: func.isRequired,
    getUsersError: string,
    getUsersPending: bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
