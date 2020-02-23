import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { companySchema } from '../../../validation';
import { Formik } from 'formik';


const CreateCompany = () => {
    return (
        <Container className="filter-container">
            <Formik
                initialValues={{
                    name: '',
                    brand: '',
                    tin: '',
                }}
                validationSchema={companySchema}
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
                        <p className="form-control-label">Полное наименование компании (Юридическое)</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Полное наименование компании (Юридическое)"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Название компании (Бренд)</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="brand"
                                placeholder="Название компании (Бренд)"
                                value={values.brand}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.brand && errors.brand ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.brand}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">ИНН</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="tin"
                                placeholder="ИНН"
                                value={values.tin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.tin && errors.tin ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.tin}</span>
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


export default CreateCompany;
