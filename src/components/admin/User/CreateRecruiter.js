import React, {useEffect, useState} from 'react';
import RecruiterForm from './RecruiterForm';
import { isLoadingSelector } from '../../common/commonReducer';
import { connect } from 'react-redux';
import { createUser, resetUsersState } from './usersActions';
import { userCreatedSelector } from '../adminReducer';
import { When } from 'react-if';
import { AlertNotice } from '../../ui';
import { autoToggleAlert } from '../../../helpers/utils';
import { push } from 'connected-react-router';


const CreateRecruiter = ({
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
            autoToggleAlert('Рекрутер успешно добавлен', setSuccessMessage);
            setTimeout(() => push('/admin/users'), 2000);
        }
    }, [ created, createUser ]);
    
    const handleCreateUser = (data) => {
        data.role = 'recruiter';
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
            <RecruiterForm
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

export default connect(mapStateToProps, matchDispatchToProps)(CreateRecruiter);
