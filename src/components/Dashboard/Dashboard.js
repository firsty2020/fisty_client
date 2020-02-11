import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthUser } from '../auth/auth';
import { getUser, getUserFailed } from '../auth/authReducer';
import { shape, string, func, bool, oneOfType } from 'prop-types';
import { push } from 'connected-react-router'
import { When } from 'react-if';
import QuestionsModal from './QuestionsModal';
import { AlertNotice } from '../ui';


const Dashboard = ({ user, userLoadFailed, getAuthUser, push }) => {

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
            <When condition={!!(user && user.status === 'new')}>
                <QuestionsModal/>
            </When>
            <h1>Личный кабинет</h1>
        </div>
    );
};

const mapStateToProps = state => ({
    user: getUser(state),
    userLoadFailed: getUserFailed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    { getAuthUser, push }, dispatch);


Dashboard.propTypes = {
    user: oneOfType([shape({status: string.isRequired}).isRequired]),
    userLoadFailed: oneOfType([ bool, string ]).isRequired,
    push: func.isRequired,
    getAuthUser: func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
