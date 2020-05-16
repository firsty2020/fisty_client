import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { PrimaryButton } from '../../../ui';
import * as Yup from 'yup';
import { isLoadingSelector } from '../../../common/commonReducer';
import { connect } from 'react-redux';
import {copyObject, generateUId} from '../../../../helpers/utils';
import { getStatuses } from '../configsActions';
import { statusesState } from '../configsReducer';


let formValues = {};

const initialValues = {
    name: '',
    number: ''
};

const validationSchema =  Yup.object().shape({
    name: Yup.string()
        .required('Введите наименование локации'),
    number: Yup.string()
        .required('Выберите значение локации'),
});

const uid = generateUId();


const StatusFormModal = ({
                             status,
                             isLoading,
                             location,
                             onSubmit,
                             onToggleModal,
                         }) => {

    if (location) {
        Object.keys(initialValues).map(key => formValues[key] = location[key])
    } else {
        Object.keys(initialValues).map(key => formValues[key] = initialValues[key])
    }


    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mb-2">{status ? 'Редактировать' :'Создать'} локацию</p>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSubmit(copyObject(values));
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue,
                          setFieldTouched,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Наименование"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.name && errors.name ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.name}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Номер"
                                    name="number"
                                    value={values.number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.number && errors.number ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.number}</p>
                                ) : null}
                            </Form.Group>
                            <div className="text-center">
                                <Button
                                    onClick={() => onToggleModal(false)}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <PrimaryButton
                                    disabled={isLoading}
                                    text={ status ? 'Сохранить' : 'Создать'}
                                    type="submit">
                                </PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};


const mapDispatchToProps = {
    getStatuses,
};


const mapStateToProps = () => {
    const statusesSelector = statusesState(uid);

    return (state) =>({
        isLoading: isLoadingSelector(state),
        defaultStatuses: statusesSelector(state),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusFormModal);
