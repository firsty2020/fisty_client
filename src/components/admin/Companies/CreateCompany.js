import React, {useEffect} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { companySchema } from '../../../helpers/schemas';
import { createCompany } from './companiesApi';
import {
    createCompanyPendingSelector,
    createCompanySuccessSelector,
} from './companiesReducer';
import {
    industryOptionsSelector,
    specificationOptionsSelector
} from '../Configs/configsReducer';
import { AlertNotice } from '../../ui';
import { When } from 'react-if';
import messages from '../../../helpers/constants/messages';
import { getIndustryOptions, getSpecificationOptions } from '../Configs/configsApi';
import Select from 'react-select';
import { generateSelectOptions } from '../../../helpers/utils';
import {Link} from 'react-router-dom';


const sourceOptions = [
    { value: 'firsty', label: 'Firsty'},
    { value: 'входяший запрос', label: 'Входяший запрос'},
];


const typeOptions = [
    { value: 'малый', label: 'Малый бизнес' },
    { value: 'средний', label: 'Средний бизнес' },
    { value: 'крупный', label: 'Крупный бизнес' },
];

const CreateCompany = ({
                           pending,
                           created,
                           industryOptions,
                           specificationOptions,
                           createCompany,
                           push,
                           getIndustryOptions,
                           getSpecificationOptions,
                       }) => {

    const handleCreateCompany = (companyData) => {
        const postData = { ...companyData };
        postData.source = postData.source.value;
        postData.type = postData.type.value;
        postData.industry = postData.industry.value;
        postData.specification = postData.specification.value;
        for (const field in postData) {
            if (postData.hasOwnProperty(field) && !postData[field]) {
                delete postData[field];
            }
        }
        createCompany(postData);
    };

    useEffect(() => {
        if (created) {
            setTimeout(() => {
                push('/admin/companies');
            }, 3000);
        }
    }, [ created, push ]);


    useEffect(() => {
        getIndustryOptions();
        getSpecificationOptions();
    }, [ getIndustryOptions, getSpecificationOptions ]);

    return (
        <Container className="mt-10-auto">
            <When condition={!!created}>
                <AlertNotice message={messages.COMPANY_CREATED_SUCCESS} type="success"/>
            </When>
            <Formik
                initialValues={{
                    name: '',
                    english_name: '',
                    source: '',
                    type: '',
                    industry: '',
                    specification: '',
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
                      setFieldTouched,
                      setFieldValue,
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
                            <Select
                                name="source"
                                placeholder="Выберите из списка"
                                value={values.source}
                                options={sourceOptions}
                                onBlur={(e) => setFieldTouched('source', e)}
                                onChange={(e) => setFieldValue('source', e)}
                            />

                            {touched.source && errors.source ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.source}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Отрасль </p>
                        <Form.Group>
                            <Select
                                name="industry"
                                value={values.industry}
                                placeholder="Выберите из списка"
                                options={generateSelectOptions(industryOptions, 'url', 'name')}
                                onBlur={(e) => setFieldTouched('industry', e)}
                                onChange={(e) => setFieldValue('industry', e)}
                            />
                            {touched.industry && errors.industry ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.industry}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Специфика</p>
                        <Form.Group>
                            <Select
                                name="specification"
                                value={values.specification}
                                placeholder="Выберите из списка"
                                options={generateSelectOptions(specificationOptions, 'url', 'name')}
                                onBlur={(e) => setFieldTouched('specification', e)}
                                onChange={(e) => setFieldValue('specification', e)}
                            />
                            {touched.specification && errors.specification ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.specification}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Тип Компании *</p>
                        <Form.Group>
                            <Select
                                name="type"
                                placeholder="Выберите из списка"
                                value={values.type}
                                options={typeOptions}
                                onBlur={(e) => setFieldTouched('type', e)}
                                onChange={(e) => setFieldValue('type', e)}
                            />
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
                            <Link to={'/admin/companies'}>
                                <Button
                                    className="mr-2"
                                    variant="secondary">Отменить
                                </Button>
                            </Link>
                            <Button
                                variant="warning"
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
    industryOptions: industryOptionsSelector(state),
    specificationOptions: specificationOptionsSelector(state),
});

const mapDispatchToProps = {
    createCompany,
    push,
    getIndustryOptions,
    getSpecificationOptions,
};


CreateCompany.propTypes = {
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateCompany);
