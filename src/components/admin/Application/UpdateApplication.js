import React, {useEffect, useState} from 'react';
import { When} from "react-if";
import { AlertNotice } from '../../ui';
import ApplicationForm from '../../common/ApplicationForm';
import {getApplication, updateApplication} from '../../common/commonActions';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
    applicationSelector,
    applicationUpdatedSelector,
    isLoadingSelector
} from '../../common/commonReducer';
import {autoToggleAlert} from '../../../helpers/utils';


const UpdateApplication = ({
                               match,
                               pending,
                               application,
                               updated,
                               getApplication,
                               updateApplication,
                               push,
                           }) => {

    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
       getApplication(match.params.applicationId);
    }, [ getApplication, match.params.applicationId ]);

    useEffect(() => {
        if (updated) {
            autoToggleAlert('Заяавка успешно отредактирована', setSuccessMessage);
            setTimeout(() => push(`/admin/companies/${match.params.companyId}/applications`), 2000);
        }
    })

    if (!application) {
        return null;
    }

    const handleUpdate = (data) => {
        updateApplication(match.params.applicationId, data);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <ApplicationForm
                application={application}
                backUrl={`/admin/companies/${match.params.companyId}/applications`}
                onSubmitApplication={(data) => handleUpdate(data)}
                pending={pending}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    pending: isLoadingSelector(state),
    application: applicationSelector(state),
    updated: applicationUpdatedSelector(state),
});

const mapDispatchToProps = { getApplication, updateApplication, push };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateApplication);
