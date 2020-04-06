import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Container } from 'reactstrap';
import {
    createDynamicField,
    resetDynamicFieldCreated
} from './DynamicFieldsActions';
import { connect } from 'react-redux';
import { dynamicFieldCreatedSelector } from '../configsReducer';
import DynamicFieldForm from './DynamicFieldForm';
import { clearEmptyFields, copyObject } from '../../../../helpers/utils';
import { isLoadingSelector } from '../../adminReducer';


const CreateDynamicField = ({
                                show,
                                pending,
                                created,
                                createDynamicField,
                                onClose,
                                resetDynamicFieldCreated,
                            }) => {

    useEffect(() => {
        if (created) {
            onClose('Вы успешно создали поле');
            resetDynamicFieldCreated();
        }
    }, [ created, onClose, resetDynamicFieldCreated ]);

    const handleCreateDynamicField = (data) => {
        const fieldData = cleanupData(data);
        createDynamicField(fieldData);
    };

    const cleanupData = (data) => {
        const fieldData = clearEmptyFields(copyObject(data));
        fieldData.project = 'https://sheltered-meadow-55057.herokuapp.com/api/v0/projects/1/';
        switch (data.field_type) {
            case 'text':
                 delete fieldData.field_configuration;
                 break;
            case 'file':
                delete fieldData.field_configuration.choices;
                delete fieldData.field_configuration.date_format;
                break;
            case 'date':
                delete fieldData.field_configuration.choices;
                delete fieldData.field_configuration.file_extensions;
                break;
            case 'choice':
                delete fieldData.field_configuration.date_format;
                delete fieldData.field_configuration.file_extensions;
                break;
            default:
                break;

        }
        return fieldData;
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
                    <Modal.Title className="w-100">Создать динамичное поле</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <DynamicFieldForm
                            onClose={onClose}
                            pending={pending}
                            onSubmit={(data) => handleCreateDynamicField(data)}
                        />
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};


const mapStateToProps = state => ({
    created: dynamicFieldCreatedSelector(state),
    pending: isLoadingSelector(state),
});

const mapDispatchToProps = {
    createDynamicField,
    resetDynamicFieldCreated,
};


CreateDynamicField.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(CreateDynamicField);