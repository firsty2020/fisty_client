import React, {useEffect, useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';
import CreateDynamicField from './CreateDynamicField';
import { connect } from 'react-redux';
import {AlertNotice, BackButton, ConfirmationModal} from '../../../ui';
import { When } from 'react-if';
import {
    resetDynamicFieldRemoved
} from './DynamicFieldsActions';
import DynamicFieldsList from './DynamicFIeldsList';
import {
    dynamicFieldRemovedSelector,
    dynamicFieldsSelector
} from '../configsReducer';
import UpdateDynamicField from './UpdateDynamicField';


const DynamicFields = ({
                           dynamicFields,
                           removed,
                           match,
                           getDynamicFields,
                           removeDynamicField,
                           resetDynamicFieldRemoved,
                       }) => {


    const [ isAddingField, setIsAddingField ] =  useState(false);
    const [ fieldToUpdate, setFieldToUpdate ] =  useState(null);
    const [ showSuccessAlert, setShowSuccessAlert ] = useState('');
    const [ dynamicFieldToRemove, setDynamicFieldToRemove ] = useState(false);

    useEffect(() => {
        getDynamicFields();
    }, [ ]);

    useEffect(() => {
        if (removed) {
            resetDynamicFieldRemoved();
            toggleSuccessAlert('Вы успешно удалили поле');
            getDynamicFields();
        }
    }, [ removed ]);

    const handleModalClose = (successMessage) => {
        if (successMessage) {
            toggleSuccessAlert(successMessage);
            getDynamicFields();
        }
        setIsAddingField(false);
        setFieldToUpdate(null);
    };

    const toggleSuccessAlert = (message) => {
        setShowSuccessAlert(message);
        setTimeout(() => setShowSuccessAlert(''), 2000);
    };

    const handleRemoveField = () => {
        removeDynamicField(dynamicFieldToRemove);
        setDynamicFieldToRemove(null);
    };

    const { companyId, applicationId, vacancyId, projectId } = match.params;

    return (
        <div>
            <ConfirmationModal
                show={!!dynamicFieldToRemove}
                onConfirm={handleRemoveField}
                onCancel={() => setDynamicFieldToRemove(null)}
                question="Вы уверены что хотите удалить это поле?"
            />
            <When condition={!!showSuccessAlert}>
                <AlertNotice
                    type="success"
                    message={showSuccessAlert}
                />
            </When>
            {isAddingField ? (
                <CreateDynamicField
                    match={match}
                    show={isAddingField}
                    onClose={(created) => handleModalClose(created)}
                /> ): null}
            {fieldToUpdate ? (
                <UpdateDynamicField
                    match={match}
                    dynamicField={fieldToUpdate}
                    show={!!fieldToUpdate}
                    onClose={(updated) => handleModalClose(updated)}
                /> ): null}
            <Container>
                <BackButton
                    path={`/admin/companies/${companyId}/applications/${applicationId}/vacancies/${vacancyId}/projects/${projectId}`}/>
                <div className="mb-3">
                    <Button
                        onClick={() => setIsAddingField(true)}
                        variant="warning">
                        <PlusCircle
                            size={20}
                            className="align-sub"
                        /> Создать
                    </Button>
                </div>
                <DynamicFieldsList
                    onDelete={(id) => setDynamicFieldToRemove(id)}
                    onEdit={(dynamicField) => setFieldToUpdate(dynamicField)}
                    data={dynamicFields}
                />
            </Container>
        </div>
    )
};


const mapStateToProps = state => ({
    dynamicFields: dynamicFieldsSelector((state)),
    removed: dynamicFieldRemovedSelector(state),
});

const mapDispatchToProps = (dispatch, props) =>  {
    return {
        getDynamicFields: () => dispatch(props.getDynamicFields()),
        removeDynamicField: (id) => dispatch(props.removeDynamicField(id)()),
        resetDynamicFieldRemoved: () => dispatch(resetDynamicFieldRemoved()),
    }
};


DynamicFields.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicFields);
