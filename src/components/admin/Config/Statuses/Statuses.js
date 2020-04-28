import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Check, PlusCircle } from 'react-feather';
import Pagination from '../../../Pagination';
import { AlertNotice, ConfirmationModal, TableList } from '../../../ui';
import { When } from 'react-if';
import CreateStatus from './CreateStatus';
import { connect } from 'react-redux';
import {
    statusCreatedSelector,
    statusDeletedSelector,
    statusesState,
} from '../configsReducer';
import {
    autoToggleAlert,
    extractIdFromUrl,
    generateUId
} from '../../../../helpers/utils';
import { getStatuses, deleteStatus, resetStatusState } from '../configsActions';
import UpdateStatus from './UpdateStatus';


const statusesTableLayout = {
    headings: [
        'ID', 'Наоименование', 'По умолчанию', 'Закрыт', 'Одобрен', 'Действия',
    ],
    createRow: ({ url, name, is_default, closed, approved }) => [
        extractIdFromUrl(url),
        name,
        shouldShowChecked(is_default),
        shouldShowChecked(closed),
        shouldShowChecked(approved),
    ],
};


const shouldShowChecked = (value) => value ? <Check/> : null;

const uid = generateUId();

const Statuses = ({
                      statuses,
                      created,
                      deleted,
                      getStatuses,
                      deleteStatus,
                      resetStatusState,
                  }) => {

    const [ isCreatingStatus, setIsCreatingStatus ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ statusToDelete, setStatusToDelete ] = useState(null);
    const [ statusToUpdate, setStatusToUpdate ] = useState(null);

    useEffect(() => {
        getStatuses(null, uid);
    }, [ getStatuses ]);

    useEffect(() => {
        if (created || deleted) {
            const action = created ? 'создали' : 'удалили';
            resetStatusState();
            getStatuses(null, uid);
            autoToggleAlert(`Вы успешно ${action} статус`, setSuccessMessage);
        }
    }, [ created, deleted, getStatuses, resetStatusState ]);

    const handleDeleteStatus = () => {
        deleteStatus(statusToDelete);
        setStatusToDelete(null);
    };

    return (
        <div>
            <When condition={!!statusToDelete}>
                <ConfirmationModal
                    question="Вы уверены что хотите удалить этот статус?"
                    onConfirm={() => handleDeleteStatus()}
                    onCancel={() => setStatusToDelete( null)}
                    show={!!statusToDelete}/></When>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}/></When>
            <When condition={!!isCreatingStatus}>
                <CreateStatus
                    onToggleModal={setIsCreatingStatus}
                /></When>
            <When condition={!!statusToUpdate}>
                <UpdateStatus
                    status={statusToUpdate}
                    onToggleModal={setStatusToUpdate}
                /></When>
            <Container className="mt-10-auto">
                <div className="mb-3">
                    <Button
                        onClick={setIsCreatingStatus}
                        variant="warning">
                        <PlusCircle
                            size={20}
                            className="align-sub"
                        /> Создать
                    </Button>
                </div>
                <TableList
                    onEditItem={(item) => setStatusToUpdate(item)}
                    onDeleteItem={({ url }) => setStatusToDelete(extractIdFromUrl(url))}
                    data={(statuses || {}).results}
                    layout={statusesTableLayout}
                />
                <Pagination
                    action={getStatuses}
                    data={statuses}
                />
            </Container>
        </div>
    );
};


const mapStateToProps = () => {
    const statusesSelector = statusesState(uid);

    return (state) => ({
        created: statusCreatedSelector(state),
        statuses: statusesSelector(state),
        deleted: statusDeletedSelector(state),
    });
};


const mapDispatchToProps = {
    resetStatusState,
    getStatuses,
    deleteStatus,
};


export default connect(mapStateToProps, mapDispatchToProps)(Statuses);
