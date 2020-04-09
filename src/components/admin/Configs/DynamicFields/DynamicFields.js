import React, {useEffect, useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';
import CreateDynamicField from './CreateDynamicField';
import { connect } from 'react-redux';
import { AlertNotice, ConfirmationModal } from '../../../ui';
import { When } from 'react-if';
import {
    getDynamicFields,
    removeDynamicField,
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
                           getDynamicFields,
                           removeDynamicField,
                           resetDynamicFieldRemoved,
                       }) => {

    const [ isAddingField, setIsAddingField ] =  useState(false);
    const [ fieldToUpdate, setFieldToUpdate ] =  useState(null);
    const [ showSuccessAlert, setShowSuccessAlert ] = useState('');
    const [ dynamicFieldToRemove, setDynamicFieldToRemove ] = useState(false);


    const handleFieldRemovedSuccess = () => {
        toggleSuccessAlert('Вы успешно удалили поле');
        resetDynamicFieldRemoved();
        getDynamicFields();
    };

    useEffect(() => {
        getDynamicFields();
    }, [ getDynamicFields ]);

    useEffect(() => {
        if (removed) {
            toggleSuccessAlert('Вы успешно удалили поле');
            resetDynamicFieldRemoved();
            getDynamicFields();
        }
    }, [ removed, handleFieldRemovedSuccess ]);

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
                    show={isAddingField}
                    onClose={(created) => handleModalClose(created)}
                /> ): null}
            {fieldToUpdate ? (
                <UpdateDynamicField
                    dynamicField={fieldToUpdate}
                    show={!!fieldToUpdate}
                    onClose={(updated) => handleModalClose(updated)}
                /> ): null}
            <Container>
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

const mapDispatchToProps = {
    getDynamicFields,
    removeDynamicField,
    resetDynamicFieldRemoved,
};


DynamicFields.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicFields);
