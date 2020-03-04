import React, {useEffect} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { companySchema } from '../../../validation';
import { createCompany } from './companiesApi';
import {
    createCompanyPendingSelector,
    createCompanySuccessSelector
} from '../adminReducer';


const CreateCompany = ({ pending, created, createCompany, push }) => {

    const handleCreateCompany = (companyData) => {
        const postData = { ...companyData };
        postData.industry = 'https://sheltered-meadow-55057.herokuapp.com/api/v0/industries/1/';
        postData.specification = 'https://sheltered-meadow-55057.herokuapp.com/api/v0/specification/1/';
        for (const field in postData) {
            if (postData.hasOwnProperty(field) && (postData[field] === -1 || !postData[field])) {
                delete postData[field];
            }
        }
        createCompany(postData);
    };

    useEffect(() => {
        if (created) {
            push('/admin/companies')
        }
    }, [ created ]);

    return (
        <Container className="mt-10-auto">
            <Formik
                initialValues={{
                    name: '',
                    english_name: '',
                    source: -1,
                    type: -1,
                    industry: -1,
                    specification: -1,
                    website: '',
                    social_link: '',
                    contact_number: ''
                }}
                validationSchema={companySchema}
                onSubmit={(values) => {
                    handleCreateCompany(values);
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
                        <p className="form-control-label">Название компании *</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="На Русском Языке"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Название компании *</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="english_name"
                                placeholder="На Английском Языке"
                                value={values.english_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.english_name && errors.english_name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.english_name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Источник *</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="source"
                                as="select"
                                value={values.source}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="firsty">Firsty</option>
                                <option value="Входяший запрос">Входяший запрос</option>
                                <option value="-1" disabled>Выберите из списка</option>
                            </Form.Control>
                            {touched.source && errors.source ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.source}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Отрасль </p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="industry"
                                as="select"
                                value={values.industry}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="Firsty">industry1</option>
                                <option value="Входяший запрос">industry2</option>
                                <option value="-1" disabled>Выберите из списка</option>
                            </Form.Control>
                            {touched.industry && errors.industry ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.industry}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Специфика</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="specification"
                                as="select"
                                value={values.specification}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="Firsty">specification1</option>
                                <option value="Входяший запрос">specification2</option>
                                <option value="-1" disabled>Выберите из списка</option>
                            </Form.Control>
                            {touched.specification && errors.specification ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.specification}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Тип Компании *</p>
                        <Form.Group>
                            <Form.Control
                                name="type"
                                as="select"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="малый">Малый бизнес</option>
                                <option value="средний">Средний бизнес</option>
                                <option value="крупный">Крупный бизнес</option>
                                <option value="-1" disabled>Выберите из списка</option>
                            </Form.Control>
                            {touched.type && errors.type ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.type}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Сайт</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="website"
                                placeholder="https://yourcompany.domain"
                                value={values.website}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.website && errors.website ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.website}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Социальная Сеть</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="social_link"
                                placeholder="https://facebook.com/yourcompany"
                                value={values.social_link}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.social_link && errors.social_link ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.social_link}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Контактный Номер</p>
                        <Form.Group>
                            <Form.Control
                                type="tel"
                                name="contact_number"
                                placeholder="+71234567890"
                                value={values.contact_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.contact_number && errors.contact_number ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.contact_number}</span>
                            ) : null}
                        </Form.Group>
                        <div className="text-center">
                            <Button
                                disabled={pending}
                                type="submit">Создать
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};


const mapStateToProps = state => ({
    pending: createCompanyPendingSelector(state),
    created: createCompanySuccessSelector(state),
});

const mapDispatchToProps = { createCompany, push };


CreateCompany.propTypes = {
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateCompany);
