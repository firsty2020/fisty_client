import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    extractIdFromUrl,
    autoToggleAlert,
} from '../../../helpers/utils';
import { AlertNotice } from '../../ui';
import { getUser } from '../../auth/authActions';
import { resetUsersState, updateUser } from './usersActions';
import { userSelector } from '../../auth/authReducer';
import { userUpdateSelector } from '../adminReducer';
import { When } from 'react-if';
import { push } from 'connected-react-router';
import RecruiterForm from './RecruiterForm';


const UpdateUser = ({
                        match,
                        user,
                        updated,
                        getUser,
                        updateUser,
                        resetUsersState,
                        push,
                    }) => {

    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        getUser(match.params.userId);
    }, [ getUser, match.params.userId ])

    useEffect(() => {
        if (updated) {
            autoToggleAlert('Пользователь успешно обновлен', setSuccessMessage);
            resetUsersState();
            setTimeout(() => push('/admin/users'), 2000);
        }
    }, [ updated, resetUsersState, push ]);

    const handleUpdateUser = (data) => {
        const id = extractIdFromUrl(user.url);
        updateUser(id, data);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <Container>
                <RecruiterForm
                    recruiter={user}
                    onSubmit={(data) => handleUpdateUser(data)}/>
            </Container>
        </div>
    );
};


const mapStateToProps = state => ({
    user: userSelector(state),
    updated: userUpdateSelector(state),
});

const mapDispatchToProps = {
    getUser,
    updateUser,
    resetUsersState,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
