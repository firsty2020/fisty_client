import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {AlertNotice, ConfirmationModal, TableList} from '../../ui';
import {
    getApplications,
    copyEntity,
    resetCopyState
} from '../../common/commonActions';
import { applicationsSelector, entityCopiedSelector } from '../../common/commonReducer';
import { push } from 'connected-react-router';
import Pagination from '../../Pagination';
import { When } from 'react-if';
import {autoToggleAlert} from '../../../helpers/utils';


const Applications = ({
                          applications,
                          layout,
                          copied,
                          getApplications,
                          copyEntity,
                          resetCopyState,
                          push,
                      }) => {

    const [ applicationIdToCopy, setApplicationIdToCopy ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);

    useEffect(() => {
        getApplications();
    }, [ getApplications ]);

    useEffect(() => {
        if (copied) {
            autoToggleAlert('Заявкa скопирована', setSuccessMessage);
            resetCopyState();
            setApplicationIdToCopy(null);
            getApplications();
        }
    }, [ copied, getApplications ]);

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}
                />
            </When>
            <ConfirmationModal
                show={!!applicationIdToCopy}
                question="Вы уверены, что хотите копировать эту заяавку?"
                onConfirm={() => copyEntity('application', applicationIdToCopy)}
                onCancel={() => setApplicationIdToCopy(null)}
            />
            <TableList
                onCopy={({ id }) => setApplicationIdToCopy(id)}
                onClickRow={({id}) => push(`/admin/applications/${id}`)}
                layout={layout}
                data={(applications || {}).results}
            />
            <Pagination
                action={getApplications}
                data={applications}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    applications: applicationsSelector(state),
    copied: entityCopiedSelector(state),
});

const mapDispatchToProps = { getApplications, copyEntity, resetCopyState, push };




export default connect(mapStateToProps, mapDispatchToProps)(Applications);
