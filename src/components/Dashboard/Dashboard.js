import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthUser } from '../auth/auth';
import { getUser, getUserFailed } from '../auth/authReducer';
import QuestionsModal from './QuestionsModal';
import Alert from '../AlertNotice';
import { push } from 'connected-react-router'
import {shape, string, func, bool, oneOfType} from 'prop-types';


const Dashboard = ({ user, userLoadFailed, getAuthUser, push }) => {

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);

    useEffect(() => {
        if (userLoadFailed) {
            setTimeout(() => push('/login'), 2000);
        }

    }, [ userLoadFailed, push ]);

    return (
        <div style={{ 'margin': '50px'}}>
            { userLoadFailed ? <Alert errorMsg={userLoadFailed}/> : null }
            { user && user.status === 'new' ? <QuestionsModal/> : null }
            <h1>This is dashboard</h1>
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
    user: oneOfType([ shape({ status: string.isRequired }).isRequired ]),
    userLoadFailed: bool.isRequired,
    push: func.isRequired,
    getAuthUser: func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
