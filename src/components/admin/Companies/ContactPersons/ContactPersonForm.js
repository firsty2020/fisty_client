import React, { useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { contactPersonSchema } from '../../../../validation';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { getContactPersonRoles } from '../../Configs/Roles/rolesApi';
import { contactPersonRolesSelector } from '../../Configs/configsReducer';
import {
    generateDays,
    generateMonths,
    generateYears,
    parseDobString
} from '../../../../utils';


const months = generateMonths();
const years = generateYears();
const days = generateDays();


const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    role: -1,
    email: '',
    phone_number: '',
    gender: -1,
    date_of_birth: {
        year: -1,
        month: -1,
        day: -1,
    },
};

const fillForm = (contactPerson) => {
    for (let key in initialValues) {
        initialValues[key] = contactPerson[key];
    }
    initialValues.date_of_birth = parseDobString(contactPerson.date_of_birth);
};


const ContactPersonForm = ({
                               roles,
                               pending,
                               contactPerson,
                               isUpdating,
                               getRoles,
                               onSubmit,
                           }) => {

    useEffect(() => {
        getRoles();
    }, [ getRoles ]);

    useEffect(() => {
        if (isUpdating && contactPerson) {
            fillForm(contactPerson);
        }
    },[ contactPerson, isUpdating ]);

    if (isUpdating && !contactPerson) {
        return null;
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
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
                            <Form.Control
                                type="text"
                                name="role"
                                as="select"
                                value={values.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {(roles || []).map(({name, url}) =>
                                    <option
                                        key={url}
                                        value={url}>{name}</option>
                                )}
                                <option value="-1" disabled>Выберите из списка
                                </option>
                            </Form.Control>
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
                            <Form.Control
                                name="gender"
                                value={values.gender}
                                as="select"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                                <option value='male'>Мужской</option>
                                <option value='female'>Женский</option>
                                <option disabled value={-1}>Пол</option>
                            </Form.Control>
                            {touched.gender && errors.gender ? (
                                <span
                                    className="mt-1 invalid-feedback-visible">{errors.gender}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Дата рождения</p>
                            <Form.Row>
                                <Col>
                                    <Form.Control
                                        name="date_of_birth.year"
                                        value={values.date_of_birth.year}
                                        as="select"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        {years.map((year) =>
                                            <option
                                                key={year}
                                                value={year}>{year}</option>
                                        )}
                                        <option disabled value={-1}>Год</option>
                                    </Form.Control>
                                    {(touched.date_of_birth && touched.date_of_birth.year) && (errors.date_of_birth && errors.date_of_birth.year) ? (
                                        <span
                                            className="mt-1 invalid-feedback-visible">{errors.date_of_birth.year}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Control
                                        name="date_of_birth.month"
                                        value={values.date_of_birth.month}
                                        as="select"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        {months.map((month) =>
                                            <option
                                                key={month.title}
                                                value={month.value}
                                            >{month.title}</option>
                                        )}
                                        <option disabled value={-1}>Месяц
                                        </option>
                                    </Form.Control>
                                    {(touched.date_of_birth && touched.date_of_birth.month) && (errors.date_of_birth && errors.date_of_birth.month) ? (
                                        <span
                                            className="mt-1 invalid-feedback-visible">{errors.date_of_birth.month}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Control
                                        name="date_of_birth.day"
                                        value={values.date_of_birth.day}
                                        as="select"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        {days.map((day) =>
                                            <option
                                                value={day}
                                                key={day}
                                            >{day}</option>
                                        )}
                                        <option disabled value={-1}>День
                                        </option>
                                    </Form.Control>
                                    {(touched.date_of_birth && touched.date_of_birth.day) && (errors.date_of_birth && errors.date_of_birth.day) ? (
                                        <span
                                            className="mt-1 invalid-feedback-visible">{errors.date_of_birth.day}</span>
                                    ) : null}
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <div className="text-center">
                            <Button
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
