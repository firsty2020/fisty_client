import React, { useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { contactPersonSchema } from '../../../../helpers/schemas';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { getContactPersonRoles } from '../../Configs/Roles/rolesApi';
import { contactPersonRolesSelector } from '../../Configs/configsReducer';
import Select from 'react-select';
import { generateSelectOptions } from '../../../../helpers/utils';
import { Link } from 'react-router-dom';


const genderOptions = [
    { value: 'мужской', label: 'Мужской' },
    { value: 'женский', label: 'Женский' },
];


const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    role: '',
    email: '',
    phone_number: '',
    gender: '',
};

let formValues;


const fillForm = (initialValues, contactPerson, roles) => {
    const values = {};
    for (let key in initialValues) {
        values[key] = contactPerson[key];
    }
    values.gender = genderOptions.find(option => option.value === contactPerson.gender);
    values.role = generateSelectOptions(roles, 'url', 'name').find(role => role.value === contactPerson.role);
    return values;
};

const ContactPersonForm = ({
                               roles,
                               pending,
                               cancelPath,
                               contactPerson,
                               isUpdating,
                               getRoles,
                               onSubmit,
                           }) => {

    useEffect(() => {
        getRoles();
    }, [ getRoles ]);

    if (isUpdating && !contactPerson) {
        return null;
    }

    if (contactPerson && roles) {
        formValues = fillForm(initialValues, contactPerson, roles);
    } else {
        formValues = initialValues;
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={contactPersonSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldTouched,
                      setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <p className="form-control-label">Фамилия</p>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        placeholder="Фамилия"
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.last_name && errors.last_name ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.last_name}</p>
                                    ) : null}
                                </Col>
                                <Col>
                                    <p className="form-control-label">Имя</p>
                                    <Form.Control
                                        type="text"
                                        placeholder="Имя"
                                        name="first_name"
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.first_name && errors.first_name ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.first_name}</p>
                                    ) : null}
                                </Col>
                                <Col>
                                    <p className="form-control-label">Отчество</p>
                                    <Form.Control
                                        type="text"
                                        placeholder="Отчество"
                                        name="middle_name"
                                        value={values.middle_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.middle_name && errors.middle_name ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.middle_name}</p>
                                    ) : null}
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <p className="form-control-label">Роль</p>
                        <Form.Group>
                            <Select
                                type="text"
                                name="role"
                                options={generateSelectOptions(roles, 'url', 'name')}
                                placeholder="Выберите роль"
                                value={values.role}
                                onBlur={(e) => setFieldTouched('role', e)}
                                onChange={(e) => setFieldValue('role', e)}
                            />
                            {touched.role && errors.role ? (
                                <span
                                    className="mt-1 invalid-feedback-visible">{errors.role}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Эл. почта</p>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {touched.email && errors.email ? (
                                <span
                                    className="mt-1 invalid-feedback-visible">{errors.email}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p>Телефон</p>
                            <Form.Control
                                type="tel"
                                value={values.phone_number}
                                name="phone_number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Номер Телефона"
                            />
                            {touched.phone_number && errors.phone_number ? (
                                <p className="mt-1 invalid-feedback-visible">{errors.phone_number}</p>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            Пол
                            <Select
                                name="gender"
                                value={values.gender}
                                options={genderOptions}
                                placeholder="Выберите пол"
                                onBlur={(e) => setFieldTouched('gender', e)}
                                onChange={(e) => setFieldValue('gender', e)}
                            />
                            {touched.gender && errors.gender ? (
                                <span
                                    className="mt-1 invalid-feedback-visible">{errors.gender}</span>
                            ) : null}
                        </Form.Group>
                        <div className="text-center">
                            <Link to={cancelPath}>
                                <Button
                                    className="mr-2"
                                    variant="secondary">Отменить
                                </Button>
                            </Link>
                            <Button
                                variant="warning"
                                disabled={pending}
                                type="submit">{isUpdating ? 'Сохранить' : 'Создать'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )};


const mapStateToProps = state => ({
    roles: contactPersonRolesSelector(state),
});

const mapDispatchToProps = {
    getRoles: getContactPersonRoles,
};


ContactPersonForm.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(ContactPersonForm);
