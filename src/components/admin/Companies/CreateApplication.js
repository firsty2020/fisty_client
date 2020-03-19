import React from 'react';
import { ApplicationForm } from '../../ui';
import { connect } from 'react-redux';
import { createApplication } from '../../../common/api';
import { baseURL } from '../../../axios';
import {
    createApplicationPendingSelector,
    createApplicationResolvedSelector
} from '../../../common/reducer';


const CreateApplication = ({ match, pending, created, createApplication }) => {


    const submitApplication = (values) => {
        values.company = `${baseURL}companies/${match.params.companyId}/`;
        createApplication(values);
    };

    return (
        <div>
            <ApplicationForm
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

const mapDispatchToProps = { createApplication };


CreateApplication.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateApplication);
