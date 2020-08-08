import React from 'react';
import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { DropDown, PrimaryButton } from '../../../ui';
import * as Yup from 'yup';
import { generateSelectOptions } from '../../../../helpers/utils';


const roleSchema = Yup.object().shape({
    subStatus: Yup.string()
        .required('Выберите статус'),
});


const AddSubStatus = ({ onSubmit, mainStatuses, onClose}) => {
    
    return (
        <Modal
            centered
            show>
            <Modal.Body>
                <p className="text-center mt-1">Выберите статус</p>
                <Formik
                    enableReinitialize
                    initialValues={{ subStatus: ''}}
                    validationSchema={roleSchema}
                    onSubmit={(values) => {
                        onSubmit(values.subStatus.value);
                        onClose(false);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          setFieldTouched,
                          setFieldValue,
                          handleSubmit,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <DropDown
                                    isDisabled={!mainStatuses || !mainStatuses.length}
                                    name="subStatus"
                                    value={values.subStatus}
                                    onBlur={(e) => setFieldTouched('subStatus', e)}
                                    onChange={(e) => setFieldValue('subStatus', e)}
                                    options={generateSelectOptions((mainStatuses || []), 'url', 'name')}
                                    placeholder="Выберите статус"
                                />
                                {touched.category && errors.category ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.category}</p>
                                ) : null}
                            </Form.Group>
                            <div className="text-center">
                                <Button
                                    type="reset"
                                    onClick={() => onClose(true)}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <PrimaryButton
                                    text="Создать"
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

export default AddSubStatus;
