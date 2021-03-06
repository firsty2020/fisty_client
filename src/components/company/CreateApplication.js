import React, {useEffect} from 'react';
import { AlertNotice } from '../ui';
import { connect } from 'react-redux';
import { getAuthUser } from '../auth/auth';
import { userSelector } from '../auth/authReducer';
import { createApplication } from '../common/commonActions';
import { createApplicationResolvedSelector } from '../common/commonReducer';
import { push } from 'connected-react-router';
import { When } from 'react-if';
import { isLoadingSelector } from '../common/commonReducer';
import ApplicationForm from '../common/ApplicationForm';


const CreateApplication = ({
                               user,
                               created,
                               pending,
                               getAuthUser,
                               createApplication,
                               push,
                           }) => {

    useEffect(() => {
        if (created) {
            setTimeout(() => push('/company'), 2000);
        }
    }, [ created, push ]);

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);


    const submitApplication = (values) => {
        values.company = user.company;
        createApplication(values);
    };


    return (
        <div>
            <When condition={!!created}>
                <AlertNotice type="success" message="Вы успешно подали заявку"/>
            </When>
            <ApplicationForm
                onSubmitApplication={submitApplication}
                pending={pending}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    user: userSelector(state),
    pending: isLoadingSelector(state),
    created: createApplicationResolvedSelector(state),
});

const mapDispatchToProps = { getAuthUser, createApplication, push };


CreateApplication.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateApplication);
