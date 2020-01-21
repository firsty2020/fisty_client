import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAuthUser } from '../auth/auth';
import { getUser, getUserFailed } from '../auth/authReducer';
import QuestionsModal from './QuestionsModal';


const Dashboard = ({ user, getAuthUser }) => {

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);

    return (
        <div>
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
    { getAuthUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
