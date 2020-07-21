import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {AlertNotice, ConfirmationModal, TableList} from '../../ui';
import {
    getApplications,
    copyEntity,
    resetCopyState
} from '../../common/commonActions';
import { applicationsSelector, copiedEntitySelector } from '../../common/commonReducer';
import { push } from 'connected-react-router';
import Pagination from '../../Pagination';
import { When } from 'react-if';
import {autoToggleAlert} from '../../../helpers/utils';


const Applications = ({
                          applications,
                          layout,
                          copiedEntity,
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
        if (copiedEntity) {
            autoToggleAlert('Заявкa скопирована', setSuccessMessage);
            resetCopyState();
            setApplicationIdToCopy(null);
            setTimeout(() => push(`/admin/companies/${copiedEntity.company}/applications/edit/${copiedEntity.id}`), 1500);
        }
    }, [ copiedEntity, getApplications ]);

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
                question="Вы уверены, что хотите копировать эту заявку?"
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
    copiedEntity: copiedEntitySelector(state),
});

const mapDispatchToProps = { getApplications, copyEntity, resetCopyState, push };




export default connect(mapStateToProps, mapDispatchToProps)(Applications);
