import React from 'react';
import { Container, Form, } from 'react-bootstrap';
import { applicationSchema } from '../../helpers/schemas';
import { Formik } from 'formik';

const CreateApplication = () => {
    return (
        <div>
            <Container>
                <h3 className="text-center mt-4">Заявкa</h3>
                <div className="mt-5">
                    <Formik
                        initialValues={{
                            position: '',
                            // english_name: '',
                            // source: '',
                            // type: '',
                            // industry: '',
                            // specification: '',
                            // website: '',
                            // social_link: '',
                            // contact_number: ''
                        }}
                        validationSchema={applicationSchema}
                        onSubmit={(values) => {
                            // handleCreateCompany(values);
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
                                <p>Наименование должности *</p>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    placeholder="Введите наименование должности"
                                    value={values.position}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.position && errors.position ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.position}</span>
                                ) : null}
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    );
};



export default CreateApplication;
