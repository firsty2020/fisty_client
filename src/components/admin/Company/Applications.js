import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {AlertNotice, BackButton, ConfirmationModal, TableList} from '../../ui';
import { getApplications, copyEntity, resetCopyState } from '../../common/commonActions';
import { applicationsSelector, copiedEntitySelector } from '../../common/commonReducer';
import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import Pagination from '../../Pagination';
import { autoToggleAlert } from '../../../helpers/utils';
import { When } from "react-if";


const Applications = ({
                          applications,
                          layout,
                          match,
                          copiedEntity,
                          getApplications,
                          push,
                          copyEntity,
                          resetCopyState,
                      }) => {

    const [ applicationIdToCopy, setApplicationIdToCopy ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);

    useEffect(() => {
        getApplications({ company: match.params.companyId });
    }, [ getApplications, match.params.companyId ]);

    useEffect(() => {
        if (copiedEntity) {
            autoToggleAlert('Заявкa скопирована', setSuccessMessage);
            resetCopyState();
            setApplicationIdToCopy(null);
            setTimeout(() => push(`/admin/companies/${match.params.companyId}/applications/edit/${copiedEntity.id}`), 1500)
        }
    }, [ copiedEntity, getApplications ]);

    const handleCopyEntity = () => {
        copyEntity('application', applicationIdToCopy);
    };

    return (
        <div>
            <BackButton path={`/admin/companies/${match.params.companyId}`} />
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}
                />
            </When>
            <ConfirmationModal
                show={!!applicationIdToCopy}
                question="Вы уверены, что хотите копировать эту заявку?"
                onConfirm={handleCopyEntity}
                onCancel={() => setApplicationIdToCopy(null)}
            />
            <div className="mb-3">
                <Link
                    to={`/admin/companies/${match.params.companyId}/application/create`}>
                    <Button variant="warning">
                        <PlusCircle
                            size={20}
                            className="align-sub"
                        /> Создать
                    </Button>
                </Link>
            </div>
            <TableList
                onEditItem={({ id }) => push(`${match.url}/edit/${id}`)}
                onCopy={({ id }) => setApplicationIdToCopy(id)}
                onClickRow={({id}) => push(`${match.url}/${id}`)}
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

const mapDispatchToProps = { getApplications, push, copyEntity, resetCopyState };


export default connect(mapStateToProps, mapDispatchToProps)(Applications);
