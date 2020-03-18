import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { branchSchema } from '../../../helpers/schemas';
import { Formik } from 'formik';


const CreateBranch = () => {
    return (
        <Container className="mt-10-auto">
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                }}
                validationSchema={branchSchema}
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
                        <p className="form-control-label">Название</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Название Хаба / Бранча"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Адрес</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Адрес Хаба / Бранча"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.address && errors.address ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.address}</span>
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


export default CreateBranch;
