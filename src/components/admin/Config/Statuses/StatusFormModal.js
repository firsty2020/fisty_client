import React, {useEffect, useRef} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { PrimaryButton, RadioButton } from '../../../ui';
import * as Yup from 'yup';
import { isLoadingSelector } from '../../../common/commonReducer';
import { connect } from 'react-redux';
import {copyObject, generateUId} from '../../../../helpers/utils';
import {getStatuses} from '../configsActions';
import {statusesState} from '../configsReducer';


const initialValues = {
    name: '',
    status_type: ''
};

const validationSchema =  Yup.object().shape({
    name: Yup.string()
        .required('Введите наименование статуса'),
    status_type: Yup.string().required('Выберите тип статуса'),
});

const uid = generateUId();


const StatusFormModal = ({ defaultStatuses, isLoading, getStatuses, onSubmit, onToggleModal }) => {

    useEffect(() => {
        getStatuses({ is_default: true }, uid)
    }, [ getStatuses ]);

    const inputRef = useRef(null);

    setTimeout(() => inputRef.current && inputRef.current.focus());


    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mt-1">Создать статус</p>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const data = copyObject(values);
                        data[data.status_type] = true;
                        delete data.status_type;
                        onSubmit(data);
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
                                    placeholder="Введите наименование статуса"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    ref={inputRef}
                                />
                                {touched.name && errors.name ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.name}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <RadioButton
                                    disabled={(defaultStatuses || {}).count}
                                    name="status_type"
                                    value={values.is_default}
                                    label="По умолчанию"
                                    onChange={() => setFieldValue('status_type', 'is_default')}
                                    onBlur={(e) => setFieldTouched('status_type', e)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <RadioButton
                                    name="status_type"
                                    value={values.closed}
                                    label="Закрыт"
                                    onChange={() => setFieldValue('status_type', 'closed')}
                                    onBlur={(e) => setFieldTouched('status_type', e)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <RadioButton
                                    name="status_type"
                                    checked={values.approved}
                                    value={values.approved}
                                    label="Одобрен"
                                    onChange={() => setFieldValue('status_type', 'approved')}
                                    onBlur={(e) => setFieldTouched('status_type', e)}
                                />
                            </Form.Group>
                            {touched.status_type && errors.status_type ? (
                                <p className="mt-1 invalid-feedback-visible">{errors.status_type}</p>
                            ) : null}
                            <div className="text-center">
                                <Button
                                    onClick={() => onToggleModal(false)}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <PrimaryButton
                                    disabled={isLoading}
                                    text={ false ? 'Сохранить' : 'Создать'}
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

/*
const mapStateToProps = () => {
    const contactPersonsSelector = contactPersonsState(uid);
    return (state) => ({
        contactPersons: contactPersonsSelector(state),
        linked: linkContactPersonResolvedSelector(state),
        pending: isLoadingSelector(state),
    });
};

*/

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
