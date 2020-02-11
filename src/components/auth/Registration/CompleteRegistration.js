import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { completeRegistration } from '../auth';
import { push } from 'connected-react-router'
import { completeRegistrationSchema } from '../../../validation';
import { Formik } from 'formik';
import { bool, func, oneOfType, shape, string } from 'prop-types';
import { When } from 'react-if';
import CountryCodeItem from './CountryCodeItem';
import CountriesDropdown from './CountriesDropdown';
import AuthFormContainer from '../../ui/AuthFormContainer/AuthFormContainer';
import armenianFlag from '../../../assets/icons/armenia.png'
import belorussianFlag from '../../../assets/icons/belorussia.png'
import russianFlag from '../../../assets/icons/russia.png'
import ukrainianFlag from '../../../assets/icons/ukraine.png'
import { AlertNotice, SuccessNotice } from '../../ui';


const CompleteRegistration = ({
                                  match,
                                  pending,
                                  success,
                                  error,
                                  push,
                                  completeRegistration
}) => {

    const [ countryCode, setCountryCode ] = useState('');

    useEffect(() => {
        if (success) {
            setTimeout(() =>  push('/login'), 3000);
        }
    }, [success, push]);

    return (
        <div>
            <AuthFormContainer title="Завершите Регистрацию">
                <When condition={success}>
                    <SuccessNotice
                        title="Регистрация прошла успешно."
                        body="Вы будете перенаправлены."
                    />
                </When>
                <When condition={!!error}>
                    <AlertNotice type="danger" message={error}/>
                </When>
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        phone_number: '',
                        city: '',
                        experience: '',
                        country: -1,
                        citizenship: -1,
                    }}
                    validationSchema={completeRegistrationSchema}
                    onSubmit={(values, { resetForm }) => {
                        const userDetails = { ...values };
                        userDetails.phone_number = countryCode + userDetails.phone_number;
                        completeRegistration(userDetails, match.params.passwordToken);
                        resetForm();
                        setCountryCode('');
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
                        <Form onSubmit={handleSubmit} className="mx-auto">
                            <Form.Group>
                                <p className="form-control-label">Имя</p>
                                <Form.Control
                                    type="text"
                                    placeholder="Имя"
                                    name="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.first_name && errors.first_name ? 'is-invalid' : ''}
                                />
                                {touched.first_name && errors.first_name ? (
                                    <p className="mt-1 invalid-feedback">{errors.first_name}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Фамилия</p>
                                <Form.Control
                                    type="text"
                                    name="last_name"
                                    placeholder="Фамилия"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.last_name && errors.last_name ? 'is-invalid' : ''}
                                />
                                {touched.last_name && errors.last_name ? (
                                    <p className="mt-1 invalid-feedback">{errors.last_name}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Номер Телефона</p>
                                <InputGroup>
                                    <Dropdown
                                        onSelect={setCountryCode}>
                                        <Dropdown.Toggle
                                            variant="success"
                                            id="dropdown-basic"
                                        >{countryCode ? countryCode : 'Код Страны'}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <CountryCodeItem
                                                value="+374"
                                                imgSrc={armenianFlag}
                                            />
                                            <CountryCodeItem
                                                value="+375"
                                                imgSrc={belorussianFlag}
                                            />
                                            <CountryCodeItem
                                                value="+7"
                                                imgSrc={russianFlag}
                                            />
                                            <CountryCodeItem
                                                value="+380"
                                                imgSrc={ukrainianFlag}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control
                                        type="tel"
                                        value={values.phone_number}
                                        name="phone_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Номер Телефона"
                                        className={touched.phone_number && errors.phone_number ? 'is-invalid' : ''}
                                    />
                                    {touched.phone_number && errors.phone_number ? (
                                        <p className="mt-1 invalid-feedback">{errors.phone_number}</p>
                                    ) : null}

                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Опыт Работы</p>
                                <Form.Control
                                    type="tel"
                                    value={values.experience}
                                    name="experience"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Опыт работы в годах"
                                    className={touched.experience && errors.experience ? 'is-invalid' : ''}
                                />
                                {touched.experience && errors.experience ? (
                                    <p className="mt-1 invalid-feedback">{errors.experience}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                        <p className="form-control-label">Гражданство</p>
                                        <CountriesDropdown
                                            value={values.citizenship}
                                            name="citizenship"
                                            placeHolder="Гражданство"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                            className={touched.citizenship && errors.citizenship ? 'is-invalid' : ''}
                                        />
                                        {touched.citizenship && errors.citizenship ? (
                                            <p className="mt-1 invalid-feedback-visible">{errors.citizenship}</p>
                                        ) : null}
                                </Col>
                                <Col>
                                        <p className="form-control-label">Страна Проживания</p>
                                        <CountriesDropdown
                                            value={values.country}
                                            name="country"
                                            placeHolder="Страна"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                            className={touched.country && errors.country ? 'is-invalid' : ''}
                                        />

                                        {touched.country && errors.country ? (
                                            <p className="mt-1 invalid-feedback-visible">{errors.country}</p>
                                        ) : null}
                                </Col>
                            </Form.Row>

                            <Form.Group>
                                <p className="form-control-label">Город</p>
                                <Form.Control
                                    type="text"
                                    placeholder="Город"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="city"
                                    value={values.city}
                                    className={touched.city && errors.city ? 'is-invalid' : ''}
                                />
                                {touched.city && errors.city ? (
                                    <p className="mt-1 invalid-feedback">{errors.city}</p>
                                ) : null}
                            </Form.Group>
                            <div className="round-button-container">
                                <button
                                    type="submit"
                                    disabled={pending}>Зарегистрироваться
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </AuthFormContainer>
        </div>
    );
};

const mapStateToProps = state => ({
    pending: authPending(state),
    error: authFailed(state),
    success: authSucceed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    completeRegistration,
    push
}, dispatch);


CompleteRegistration.propTypes = {
    pending: bool.isRequired,
    error: oneOfType([ bool, string ]).isRequired,
    success: bool.isRequired,
    match: shape({
        params: shape(
            { passwordToken: string.isRequired })
    }).isRequired,
    push: func.isRequired,
    completeRegistration: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistration);
