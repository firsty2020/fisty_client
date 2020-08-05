import React, {useEffect, useState} from 'react';
import { Button, Container} from 'react-bootstrap';
import { PlusCircle} from 'react-feather';
import {AlertNotice, ConfirmationModal, TableList} from '../../../ui';
import {autoToggleAlert, extractIdFromUrl} from '../../../../helpers/utils';
import { When } from 'react-if';
import FlowFormModal from './FlowFormModal';
import {
    createFlow,
    getFlows,
    deleteFlow,
    updateFlow,
    resetFlowsState,
} from '../configsActions';
import { connect } from 'react-redux';
import {
    flowCreatedSelector,
    flowDeletedSelector,
    flowsSelector, flowUpdatedSelector
} from '../configsReducer';
import { push } from 'connected-react-router';


const statusesTableLayout = {
    headings: [
        'ID', 'Наименование', 'Деиствия',
    ],
    createRow: ({ url, name }) => [
        extractIdFromUrl(url),
        name,
    ],
};

const Flows = ({
                   match,
                   flows,
                   created,
                   deleted,
                   updated,
                   getFlows,
                   createFlow,
                   deleteFlow,
                   updateFlow,
                   resetFlowsState,
                   push,
               }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ flowToEdit, setFlowToEdit ] = useState(null);
    const [ flowIdToDelete, setFlowIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        if (!created && !deleted && !updated) return;
        if (created) {
            autoToggleAlert('Процесс добавлен', setSuccessMessage);
        }
        if (deleted) {
            autoToggleAlert('Процесс удален', setSuccessMessage);
        }
        if (updated) {
            autoToggleAlert('Процесс редактирован', setSuccessMessage);
        }
        resetFlowsState();
        getFlows();
    }, [ getFlows, created, deleted, updated ]);

    useEffect(() => {
        getFlows()
    }, []);

    const handleModalClose = (values) => {
        if (!values) {
            setIsCreating(false);
            setFlowToEdit(null);
            return;
        }
        if (isCreating) {
            handleCreateFlow(values);
            setIsCreating(false);
        }
        if (flowToEdit) {
            handleUpdateFlow(values);
            setFlowToEdit(null);
        }
    };

    const handleCreateFlow = (data) => createFlow(data);

    const handleUpdateFlow = (data) => updateFlow(extractIdFromUrl(flowToEdit.url), data);

    const handleDeleteFlow = () => {
        deleteFlow(flowIdToDelete);
        setFlowIdToDelete(null);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <When condition={!!isCreating || !!flowToEdit}>
                <FlowFormModal
                    flow={flowToEdit}
                    onClose={handleModalClose}/>
            </When>
            <ConfirmationModal
                question="Вы уверены, что хотите удалить этот процесс?"
                onConfirm={handleDeleteFlow}
                onCancel={() => setFlowIdToDelete(null)}
                show={!!flowIdToDelete}/>
            <Container className="mt-10-auto">
                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <Button
                                onClick={() => setIsCreating(true)}
                                variant="warning">
                                <PlusCircle
                                    size={20}
                                    className="align-sub"
                                /> Создать
                            </Button>
                        </div>
                    </div>
                </div>
                <TableList
                    onEditItem={(item) => setFlowToEdit(item)}
                    onDeleteItem={({url}) => setFlowIdToDelete(extractIdFromUrl(url))}
                    onClickRow={({url}) => push(`${match.url}/${extractIdFromUrl(url)}`)}
                    data={(flows || {}).results}
                    layout={statusesTableLayout}
                />

            </Container>
        </div>

    )
};

const mapStateToProps = (state) => ({
    created: flowCreatedSelector(state),
    deleted: flowDeletedSelector(state),
    flows: flowsSelector(state),
    updated: flowUpdatedSelector(state),
});

const mapDispatchToProps = {
    createFlow,
    deleteFlow,
    getFlows,
    updateFlow,
    resetFlowsState,
    push,
}

export default connect(mapStateToProps, mapDispatchToProps)(Flows);
