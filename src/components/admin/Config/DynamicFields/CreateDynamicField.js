import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Container } from 'reactstrap';
import {
    resetDynamicFieldCreated
} from './DynamicFieldsActions';
import { connect } from 'react-redux';
import { dynamicFieldCreatedSelector } from '../configsReducer';
import DynamicFieldForm from './DynamicFieldForm';
import {
    clearEmptyFields,
    copyObject,
    transformReactSelectFields
} from '../../../../helpers/utils';
import { isLoadingSelector } from '../../../common/commonReducer';
import { findConfigForFieldType } from '../../../../helpers/utils';
import EnhanceDynamicFields from './EnhanceDynamicFields';


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
        fieldData.field_configuration = findConfigForFieldType(fieldData);
        transformReactSelectFields([ Object.keys(fieldData.field_configuration) ], fieldData.field_configuration);
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

const mapDispatchToProps = (dispatch, props) => {
    
    console.log(props, 'props')
    
    return {
        createDynamicField: (data) => dispatch(props.createDynamicField(data)()),
        resetDynamicFieldCreated: () => dispatch(resetDynamicFieldCreated()),
    }
}


CreateDynamicField.propTypes = {};


export default EnhanceDynamicFields(connect(mapStateToProps, mapDispatchToProps)(CreateDynamicField));
