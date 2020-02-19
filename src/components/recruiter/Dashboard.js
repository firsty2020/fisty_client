import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuthUser } from '../auth/auth';
import { userSelector, authErrorSelector } from '../auth/authReducer';
import { shape, string, func, oneOfType } from 'prop-types';
import { push } from 'connected-react-router'
import { When } from 'react-if';
import QuestionsModal from './QuestionsModal';
import { AlertNotice } from '../ui';
import { Alert } from 'react-bootstrap';
import { thresholdPassedSelector } from './dashboardReducer';


const Dashboard = ({ user, userLoadFailed, thresholdPassed, getAuthUser, push }) => {

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);

    useEffect(() => {
        if (userLoadFailed) {
            setTimeout(() => push('/login'), 3000);
        }

    }, [ userLoadFailed, push ]);

    return (
        <div style={{'margin': '50px'}}>
            <When condition={!!userLoadFailed}>
                <AlertNotice message={userLoadFailed} type="danger"/>
            </When>
            <When condition={!!thresholdPassed}>
                <Alert variant="success">
                    <Alert.Heading>Отлично!</Alert.Heading>
                    <p>Теперь ваш аккaунт активен!</p>
                </Alert>
            </When>
            <When condition={thresholdPassed === false}>
                <Alert variant="danger">
                    <Alert.Heading>О нет!</Alert.Heading>
                    <p>Вы не дали нужное количество правильных ответов.</p>
                </Alert>
            </When>
            <When condition={!!(user && user.status === 'new')}>
                <QuestionsModal/>
            </When>
            <h1>Личный кабинет</h1>
        </div>
    );
};

const mapStateToProps = state => ({
    thresholdPassed: thresholdPassedSelector(state),
    user: userSelector(state),
    userLoadFailed: authErrorSelector(state),
});

const mapDispatchToProps = { getAuthUser, push };


Dashboard.propTypes = {
    user: oneOfType([shape({status: string.isRequired}).isRequired]),
    userLoadFailed: string,
    push: func.isRequired,
    getAuthUser: func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
