import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { getUsers } from './usersActions';
import { connect } from 'react-redux';
import { userDeletedSelector, usersSelector } from '../adminReducer';
import { push } from 'connected-react-router';
import { AlertNotice, ConfirmationModal, DropDown, TableList } from '../../ui';
import Pagination from '../../Pagination';
import { autoToggleAlert, extractIdFromUrl}  from '../../../helpers/utils';
import { When } from 'react-if';
import { deleteUser, resetUsersState } from './usersActions';


const usersTableLayout = {
    headings: [
        '#', 'Имя', 'Фамилия', 'Эл. Почта', 'Роль', 'Действия'
    ],
    createRow: (user, index) => [
        index + 1, user.first_name,  user.last_name, user.email, user.role,
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


const Users = ({ users, match, deleted, getUsers, deleteUser, resetUsersState, push }) => {

    const [ status, setStatus ] = useState(statusOptions[statusOptions.length - 1]);
    const [ userToDelete, setUserToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        if (!status) {
            setStatus(match.params.status);
            getUsers({ status: match.params.status });
        } else {
            getUsers({ status: status.value });
        }
    }, [ getUsers, match.params.status ]);

    useEffect(() => {
        if (!status) return;
        push(`/admin/users/${status.value}`);
    }, [ getUsers, push, status ]);

    useEffect(() => {
        if (!deleted) return;
        resetUsersState();
        getUsers({ status: match.params.status });
        autoToggleAlert('Пользователь успешно удален', setSuccessMessage);
    })

    const handleDeleteUser = () => {
        deleteUser(userToDelete);
        setUserToDelete(null);
    }

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <When condition={!!userToDelete}>
                <ConfirmationModal
                    onConfirm={handleDeleteUser}
                    question={"Вы уверены, что хотите удалить этого пользователя? Восстановить его будет невозможно."}
                    onCancel={() => setUserToDelete(null)}
                    show={!!userToDelete}/>
            </When>
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
                    onDeleteItem={({ url }) => setUserToDelete(extractIdFromUrl(url))}
                    onClickRow={({ url }) => push(`/admin/user/${extractIdFromUrl(url)}`)}
                    layout={usersTableLayout}
                    data={(users || {}).results}
                />
            </div>
            <Pagination
                action={getUsers}
                data={users}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    users: usersSelector(state),
    deleted: userDeletedSelector(state),
});

const mapDispatchToProps = {
    deleteUser,
    getUsers,
    resetUsersState,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
