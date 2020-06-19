import React, { useEffect, useState } from 'react';
import { getUsers } from '../../common/commonActions';
import { connect } from 'react-redux';
import { userDeletedSelector } from '../adminReducer';
import { push } from 'connected-react-router';
import { AlertNotice, ConfirmationModal, TableList } from '../../ui';
import Pagination from '../../Pagination';
import { autoToggleAlert, extractIdFromUrl}  from '../../../helpers/utils';
import { When } from 'react-if';
import { deleteUser, resetUsersState } from './usersActions';
import { resetAuthState, resetPassword } from "../../auth/authActions";
import { passwordResetSelector } from "../../auth/authReducer";
import Filters from './Filters';
import { usersSelector } from '../../common/commonReducer';


const usersTableLayout = {
    headings: [
        '#', 'Имя', 'Фамилия', 'Эл. Почта', 'Роль', 'Действия'
    ],
    createRow: (user, index) => [
        index + 1, user.first_name,  user.last_name, user.email, user.role,
    ],
};

const Users = ({
                   users,
                   match,
                   deleted,
                   resetPasswordRequested,
                   getUsers,
                   deleteUser,
                   resetPassword,
                   push,
                   resetUsersState,
                   resetAuthState,
               }) => {

    const [ userToDelete, setUserToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ userToResetPassword, setUserToResetPassword ] = useState(null);
    const [ filterParams, setFilterParams ] = useState({});

    useEffect( () => {
      getUsers(filterParams);
    }, [ getUsers ]);

    useEffect(() => {
        if (!deleted) return;
        resetUsersState();
        getUsers(filterParams);
        autoToggleAlert('Пользователь успешно удален', setSuccessMessage);
    }, [ deleted, match.params.status, resetUsersState, getUsers, setSuccessMessage ]);

    useEffect(() => {
        if (resetPasswordRequested) {
            resetAuthState();
            autoToggleAlert('Сообщение отправлено пользователю', setSuccessMessage);
        }
    }, [ resetPasswordRequested, resetUsersState ])

    const handleDeleteUser = () => {
        deleteUser(userToDelete);
        setUserToDelete(null);
    };

    const handleResetPasswordRequest = () => {
        resetPassword({ email: userToResetPassword.email });
        setUserToResetPassword(null);
    };

    const handleFilter = (filter) => {
        setFilterParams(filter);
        getUsers(filter);
    };
    
    const handleRedirection = ({ url, role_id }) => {
        if (role_id) {
            push(`/admin/user/contact-person/${role_id}/edit`);
        } else {
            push(`/admin/user/${extractIdFromUrl(url)}/edit`);
        }
    };

    return (
        <div>
            <ConfirmationModal
                onConfirm={handleResetPasswordRequest}
                onCancel={() => setUserToResetPassword(null)}
                confirm="Отправить"
                decline="Отменить"
                show={!!userToResetPassword}
                question="На эл. почту пользователя будет отправлено сообщение со ссылкой на восстановление пароля."/>
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
                <Filters onFilter={handleFilter} />
            </div>
            <div>
                <TableList
                    onResetPassword={(user) => setUserToResetPassword(user)}
                    onEditItem={(user) => handleRedirection(user)}
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
    resetPasswordRequested: passwordResetSelector(state),
});

const mapDispatchToProps = {
    deleteUser,
    getUsers,
    resetPassword,
    resetUsersState,
    resetAuthState,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
