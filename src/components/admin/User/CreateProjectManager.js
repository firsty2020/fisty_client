import React, { useEffect, useState } from 'react';
import { isLoadingSelector } from '../../common/commonReducer';
import { connect } from 'react-redux';
import { createUser, resetUsersState } from './usersActions';
import { userCreatedSelector } from '../adminReducer';
import { When } from 'react-if';
import { AlertNotice } from '../../ui';
import { autoToggleAlert } from '../../../helpers/utils';
import { push } from 'connected-react-router';
import ProjectManagerForm from './ProjectManagerForm';


const CreateProjectManager = ({
                             pending,
                             created,
                             createUser,
                             resetUsersState,
                             push,
                         }) => {

    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        if (created) {
            resetUsersState();
            autoToggleAlert('Менеджер проекта успешно добавлен', setSuccessMessage);
            setTimeout(() => push('/admin/users'), 2000);
        }
    }, [ created, createUser ]);

    const handleCreateUser = (data) => {
        data.role = 'project_manager';
        data.sub_role = 'no';
        createUser(data);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}
                />
            </When>
            <ProjectManagerForm
                pending={pending}
                onSubmit={(data) => handleCreateUser(data)}
            />
        </div>
    );
};


const mapStateToProps = (state) => ({
    pending: isLoadingSelector(state),
    created: userCreatedSelector(state),
});

const matchDispatchToProps = {
    createUser,
    resetUsersState,
    push,
};

export default connect(mapStateToProps, matchDispatchToProps)(CreateProjectManager);
