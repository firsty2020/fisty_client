import React from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import { Popover } from '../../ui';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите местонахождение'),
});

let setFormikFieldValue;
const Locations = () => (
    <div>
        <Container>
            <Formik
                initialValues={{
                    name: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    alert('not working yet')
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue
                  }) => {
                    setFormikFieldValue = setFieldValue;
                    return (
                        <Form onSubmit={handleSubmit}>
                            {/* <Popover
                            show={!!false}
                            placement="bottom"
                            el={null}
                            body="Редактировать здесь"
                        />*/}
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Добавить местонахождение"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    // ref={{}}
                                />
                                <InputGroup.Append>
                                    <Button
                                        disabled={false}
                                        type="submit"
                                        variant="outline-primary">Сохранить
                                    </Button>
                                </InputGroup.Append>
                                {touched.name && errors.name ? (
                                    <span
                                        className="mt-1 invalid-feedback-visible">{errors.name}</span>
                                ) : null}
                            </InputGroup>
                        </Form>
                    );
                }}
            </Formik>

        </Container>
    </div>
);


export default Locations;
