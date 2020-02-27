import React from 'react';
import {Button, Col, Container, Form, InputGroup} from 'react-bootstrap';
import { contactPersonSchema } from '../../../validation';
import { Formik } from 'formik';
import classNames from 'classnames';


const CreateContactPerson = () => {
    return (
        <Container className="mt-10-auto">
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    father_name: '',
                    position: '',
                    status: -1,
                    email: '',
                    phone_number: '',
                }}
                validationSchema={contactPersonSchema}
                onSubmit={(values) => {
                    alert('nothing will happen');
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
                                    <p className="form-control-label">Отчество</p>
                                    <Form.Control
                                        type="text"
                                        placeholder="Отчество"
                                        name="father_name"
                                        value={values.father_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.father_name && errors.father_name ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.father_name}</p>
                                    ) : null}
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <p className="form-control-label">Должность</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="position"
                                placeholder="Должность"
                                value={values.position}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.position && errors.position ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.position}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Статус</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="status"
                                as="select"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="Активный">Активный</option>
                                <option value="Неактивный">Неактивный</option>
                                <option value="Бывшый Сотрудник">Бывшый Сотрудник</option>
                                <option value="-1" disabled>Выберите из списка</option>
                            </Form.Control>
                            {touched.status && errors.status ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.status}</span>
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
                                <span className="mt-1 invalid-feedback-visible">{errors.email}</span>
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
                        <div className="text-center">
                            <Button
                                type="submit">Создать
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};


export default CreateContactPerson;
