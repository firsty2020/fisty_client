import React, {useEffect} from 'react';
import {AlertNotice, ApplicationForm} from '../../ui';
import { connect } from 'react-redux';
import { createApplication } from '../../../common/commonApi';
import { baseURL } from '../../../axios';
import {
    createApplicationPendingSelector,
    createApplicationResolvedSelector
} from '../../../common/commonReducer';
import { When } from 'react-if';
import { push } from 'connected-react-router';


const CreateApplication = ({ match, pending, created, createApplication, push }) => {

    useEffect(() => {
        if (created) {
            setTimeout(() => push(`/admin/companies/${match.params.companyId}/application`), 2000);
        }
    }, [ created, push, match.params.companyId ]);

    const submitApplication = (values) => {
        values.company = `${baseURL}companies/${match.params.companyId}/`;
        createApplication(values);
    };

    return (
        <div>
            <When condition={!!created}>
                <AlertNotice type="success" message="Вы успешно создали заявку"/>
            </When>
            <ApplicationForm
                backUrl={`/admin/companies/${match.params.companyId}`}
                onSubmitApplication={submitApplication}
                pending={pending}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    pending: createApplicationPendingSelector(state),
    created: createApplicationResolvedSelector(state),
});

const mapDispatchToProps = { createApplication, push };


CreateApplication.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateApplication);
