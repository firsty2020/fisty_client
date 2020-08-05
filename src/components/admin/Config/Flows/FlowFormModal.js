import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { PrimaryButton } from '../../../ui';
import * as Yup from 'yup';

const validationSchema =  Yup.object().shape({
    name: Yup.string()
        .required('Введите наименование процесса'),
});

const initialValues = { name: ''};
let formValues;

const FlowFormModal = ({ flow, onClose }) => {

    if (flow) {
        formValues = { name: flow.name };
    } else {
        formValues = initialValues;
    }

    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mb-2">{flow ? 'Редактировать' : 'Создать'} процесс</p>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onClose(values);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
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
                            <div className="text-center">
                                <Button
                                    onClick={() => onClose(null)}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <PrimaryButton
                                    text={flow ? 'Сохранить' : 'Создать'}
                                    type="submit">
                                </PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default FlowFormModal;
