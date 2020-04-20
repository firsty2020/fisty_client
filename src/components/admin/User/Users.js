import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getUsers } from './usersApi';
import { connect } from 'react-redux';
import { usersSelector } from '../adminReducer';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { push } from 'connected-react-router';
import { DropDown, TableList } from '../../ui';


const usersTableLayout = {
    headings: [
        '#', 'Имя', 'Фамилия', 'Эл. Почта', 'Роль',
        'Телефон', 'Гражданство', 'Страна', 'Город',
    ],
    createRow: (user, index) => [
        index + 1, user.first_name,  user.last_name, user.email, user.role,
        user.phone_number, user.citizenship, user.country, user.city,
    ],
};

const statusOptions = [
    { value: 'active', label: 'Активные' },
    { value: 'inactive', label: 'Неактивные' },
    { value: 'clarification', label: 'Кларификация' },
    { value: 'freeze', label: 'Замороженные' },
    { value: 'black_list', label: 'Заблокированные' },
    { value: 'all', label: 'Все' },
];


const Users = ({ users, match, getUsers, push }) => {

    const [ status, setStatus ] = useState(statusOptions[statusOptions.length - 1]);

    useEffect(() => {
        if (!status) {
            setStatus(match.params.status);
            getUsers(match.params.status);
        } else {
            getUsers(status.value);
        }
    }, [ getUsers, match.params.status ]);

    useEffect(() => {
        if (!status) return;
        push(`/admin/users/${status.value}`);
    }, [ getUsers, push, status ]);

    return (
        <div>
            <div className="mt-10-auto">
                <Row>
                    <Col lg={4} md={4} sm={4}>
                        <DropDown
                            name="filter"
                            value={status}
                            placeholder="Фильтровать по статусу"
                            onChange={setStatus}
                            options={statusOptions}
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <TableList
                    layout={usersTableLayout}
                    data={users}
                />
            </div>
        </div>
    );
};


const mapStateToProps = state => ({
    users: usersSelector(state),
});

const mapDispatchToProps = { getUsers, push };


Users.propTypes = {
    users: arrayOf(shape({
        first_name: string.isRequired,
        last_name: string.isRequired,
        email: string.isRequired,
        role: string.isRequired,
        phone_number: string.isRequired,
        citizenship: string,
        country: string,
        city: string,
    })),
    match: shape({ status: string }).isRequired,
    getUsers: func.isRequired,
    getUsersError: string,
    getUsersPending: bool,
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
