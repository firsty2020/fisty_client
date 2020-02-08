import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { completeRegistration } from '../auth';
import { push } from 'connected-react-router'
import { completeRegistrationSchema } from '../../../validation';
import { Formik } from 'formik';
import { bool, func, shape, string } from 'prop-types';
import CountryCodeItem from './CountryCodeItem';
import CountriesDropdown from './CountriesDropdown';
import AuthFormContainer from '../../ui/AuthFormContainer/AuthFormContainer';
import armenianFlag from '../../../assets/icons/armenia.png'
import belorussianFlag from '../../../assets/icons/belorussia.png'
import russianFlag from '../../../assets/icons/russia.png'
import ukrainianFlag from '../../../assets/icons/ukraine.png'


const CompleteRegistration = ({ match, pending, success, error, push, completeRegistration }) => {

    const [ countryCode, setCountryCode ] = useState('');

    useEffect(() => {
        if (success) {
            setTimeout(() => push('/login'), 2000);
        }
    }, [success, push]);

    return (
        <div>
            <AuthFormContainer>
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
                                <Form.Row>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            name="first_name"
                                            value={values.first_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.first_name && errors.first_name ? 'is-invalid' : ''}
                                        />
                                        {touched.first_name && errors.first_name ? (
                                            <p className="mt-1 invalid-feedback">{errors.first_name}</p>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            value={values.last_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.last_name && errors.last_name ? 'is-invalid' : ''}
                                        />
                                        {touched.last_name && errors.last_name ? (
                                            <p className="mt-1 invalid-feedback">{errors.last_name}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <InputGroup>
                                            <Dropdown
                                                onSelect={setCountryCode}>
                                                <Dropdown.Toggle
                                                    variant="success"
                                                    id="dropdown-basic"
                                                >{countryCode ? countryCode : 'Country Code'}</Dropdown.Toggle>
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
                                                placeholder="Phone Number"
                                                className={touched.phone_number && errors.phone_number ? 'is-invalid' : ''}
                                            />
                                            {touched.phone_number && errors.phone_number ? (
                                                <p className="mt-1 invalid-feedback">{errors.phone_number}</p>
                                            ) : null}

                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="tel"
                                            value={values.experience}
                                            name="experience"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Years of experience"
                                            className={touched.experience && errors.experience ? 'is-invalid' : ''}
                                        />
                                        {touched.experience && errors.experience ? (
                                            <p className="mt-1 invalid-feedback">{errors.experience}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <CountriesDropdown
                                            value={values.citizenship}
                                            name="citizenship"
                                            placeHolder="Citizenship"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                            className={touched.citizenship && errors.citizenship ? 'is-invalid' : ''}
                                        />
                                        {touched.citizenship && errors.citizenship ? (
                                            <p className="mt-1 invalid-feedback-dropdown">{errors.citizenship}</p>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <CountriesDropdown
                                            value={values.country}
                                            name="country"
                                            placeHolder="Country"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                            className={touched.country && errors.country ? 'is-invalid' : ''}
                                        />

                                        {touched.country && errors.country ? (
                                            <p className="mt-1 invalid-feedback-dropdown">{errors.country}</p>
                                        ) : null}
                                    </Col>

                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="City"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="city"
                                            value={values.city}
                                            className={touched.city && errors.city ? 'is-invalid' : ''}
                                        />
                                        {touched.city && errors.city ? (
                                            <p className="mt-1 invalid-feedback">{errors.city}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Button
                                variant="primary"
                                size="lg"
                                block
                                type="submit"
                                disabled={pending}>Submit
                            </Button>
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
    error: bool.isRequired,
    success: bool.isRequired,
    match: shape({
        params: shape(
            { passwordToken: string.isRequired })
    }).isRequired,
    push: func.isRequired,
    completeRegistration: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistration);
