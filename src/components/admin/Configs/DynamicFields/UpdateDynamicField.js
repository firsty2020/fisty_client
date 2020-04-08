import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Container } from 'reactstrap';
import {
    updateDynamicField,
    resetDynamicFieldUpdated,
} from './DynamicFieldsActions';
import { connect } from 'react-redux';
import { dynamicFieldUpdatedSelector } from '../configsReducer';
import DynamicFieldForm from './DynamicFieldForm';
import { clearEmptyFields, copyObject, findConfigForFieldType } from '../../../../helpers/utils';
import { isLoadingSelector } from '../../adminReducer';


const UpdateDynamicField = ({
                                show,
                                pending,
                                dynamicField,
                                updated,
                                updateDynamicField,
                                onClose,
                                resetDynamicFieldUpdated,
                            }) => {

    useEffect(() => {
        if (updated) {
            onClose('Вы успешно обновили поле');
            resetDynamicFieldUpdated();
        }
    }, [ updated, onClose, resetDynamicFieldUpdated ]);



    const handleUpdateDynamicField = (data) => {
        const fieldData = clearEmptyFields(copyObject(data));
        fieldData.field_configuration = findConfigForFieldType(fieldData);
        updateDynamicField({ ...dynamicField, ...fieldData });
    };

    return (
        <div>
            <Modal
                show={show}
                size="lg"
                centered
                className="text-center"
            >
                <Modal.Header>
                    <Modal.Title className="w-100">Изменить динамичное поле</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <DynamicFieldForm
                            field={dynamicField}
                            onClose={onClose}
                            pending={pending}
                            onSubmit={(data) => handleUpdateDynamicField(data)}
                        />
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};


const mapStateToProps = state => ({
    updated: dynamicFieldUpdatedSelector(state),
    pending: isLoadingSelector(state),
});

const mapDispatchToProps = {
    updateDynamicField,
    resetDynamicFieldUpdated,
};


UpdateDynamicField.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateDynamicField);
