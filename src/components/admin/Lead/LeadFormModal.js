import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import {PrimaryButton, DropDown, CheckBox} from '../../ui';
import { getLocations, getStatuses } from '../Config/configsActions';
import { connect } from 'react-redux';
import { isLoadingSelector } from '../../common/commonReducer';
import {
    copyObject,
    generateSelectOptions,
    transformReactSelectFields
} from '../../../helpers/utils';
import { locationsSelector, statusesState } from '../Config/configsReducer';
import * as Yup from 'yup';
import { REGEX } from '../../../helpers/regex-rules';
import ERROR_MESSAGES from '../../../helpers/constants/messages';


let formValues;

const initialValues = {
    status: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    phone_number: '',
    channel: 'dashboard',
    send_to_company: false,
    location: '',
};

const validationSchema =  Yup.object().shape({
    status: Yup.string(),
    first_name: Yup.string().when('send_to_company', {
        is: true,
        then: Yup.string().required(ERROR_MESSAGES.REQUIRED_FOR_COMPANY)
    }),
    last_name: Yup.string().when('send_to_company', {
        is: true,
        then: Yup.string().required(ERROR_MESSAGES.REQUIRED_FOR_COMPANY)
    }),
    middle_name: Yup.string().when('send_to_company', {
        is: true,
        then: Yup.string().required(ERROR_MESSAGES.REQUIRED_FOR_COMPANY)
    }),
    location: Yup.string().when('send_to_company', {
        is: true,
        then: Yup.string().required(ERROR_MESSAGES.REQUIRED_FOR_COMPANY)
    }),
    phone_number: Yup.string()
        .matches(REGEX.PHONE_NUMBER, ERROR_MESSAGES.PHONE_INVALID)
        .required(ERROR_MESSAGES.PHONE_REQUIRED),
    channel: Yup.string(),
    send_to_company: Yup.bool(),
});


const LeadFormModal = ({
                           isLoading,
                           statuses,
                           locations,
                           lead,
                           getStatuses,
                           getLocations,
                           onSubmit,
                           onToggleModal,
                       }) => {

    useEffect(() => {
        const params = { show_all: true };
        getStatuses(params);
        getLocations(params);
    }, [ getStatuses ]);


    if (lead && statuses) {
        formValues = {};
        Object.keys(lead).map(key => {
            if (lead[key]) {
                formValues[key] = lead[key];
            }
            if (lead.status) {
                formValues.status = generateSelectOptions(statuses.results, 'url', 'name')
                    .find(({ value }) => value === lead.status);
            }
        });
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
                <p className="text-center mt-1 mb-2">{lead ? 'Редактировать' :'Создать'} лида</p>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        let data = copyObject(values);
                        data = transformReactSelectFields([ 'status', 'location' ], data);
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
                                <p className="form-control-label">Статус</p>
                                <DropDown
                                    isClearable
                                    placeholder="Выберите статус"
                                    name="status"
                                    value={values.status}
                                    onBlur={(e) => setFieldTouched('status', e || '')}
                                    onChange={(e) => setFieldValue('status', e || '')}
                                    options={generateSelectOptions((statuses || {}).results, 'url', 'name')}
                                />
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Имя</p>
                                <Form.Control
                                    placeholder="Имя"
                                    name="first_name"
                                    value={values.first_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.first_name && errors.first_name ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.first_name}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Фамилия</p>
                                <Form.Control
                                    placeholder="Фамилия"
                                    name="last_name"
                                    value={values.last_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.last_name && errors.last_name ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.last_name}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Отчество</p>
                                <Form.Control
                                    placeholder="Отчество"
                                    name="middle_name"
                                    value={values.middle_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.middle_name && errors.middle_name ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.middle_name}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Локация</p>
                                <DropDown
                                    placeholder="Выберите из списка"
                                    name="location"
                                    value={values.location}
                                    onBlur={(e) => setFieldTouched('location', e || '')}
                                    onChange={(e) => setFieldValue('location', e || '')}
                                    options={generateSelectOptions((locations || {}).results, 'url', 'name')}
                                />
                                {touched.location && errors.location ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.location}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Телефон *</p>
                                <Form.Control
                                    placeholder="Телефон"
                                    name="phone_number"
                                    value={values.phone_number}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.phone_number && errors.phone_number ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.phone_number}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Канал</p>
                                <Form.Control
                                    placeholder="Канал"
                                    name="channel"
                                    value={values.channel}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {!lead ? (
                                <Form.Group>
                                    <CheckBox
                                        inline
                                        custom
                                        name="send_to_company"
                                        value={values.send_to_company}
                                        label="Отправить компании"
                                        onChange={handleChange}
                                        onBlur={(e) => setFieldTouched('send_to_company', e)}
                                    />
                                </Form.Group>
                            ) : null}
                            <div className="text-center">
                                <Button
                                    onClick={() => onToggleModal(false)}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <PrimaryButton
                                    disabled={isLoading}
                                    text={lead ? 'Сохранить' : 'Создать'}
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
    getLocations,
};

const mapStateToProps = (state) =>({
    isLoading: isLoadingSelector(state),
    statuses: statusesState()(state),
    locations: locationsSelector(state)
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadFormModal);

