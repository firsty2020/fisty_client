import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Button, Col, Dropdown, Form, InputGroup} from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { setPassword as submitSetPassword } from '../auth';
import { push } from 'connected-react-router'
import { setPasswordSchema } from '../../../validation';
import { Formik } from 'formik';
import { bool, func, shape, string } from 'prop-types';
import CountryCodeItem from '../Registration/CountryCodeItem';
import CountriesDropdown from '../Registration/CountriesDropdown';
import AuthFormContainer from '../../ui/AuthFormContainer/AuthFormContainer';
import armenianFlag from '../../../assets/icons/armenia.png'
import belorussianFlag from '../../../assets/icons/belorussia.png'
import russianFlag from '../../../assets/icons/russia.png'
import ukrainianFlag from '../../../assets/icons/ukraine.png'


const CompleteRegistration = ({ match, pending, success, error, push, submitSetPassword }) => {

    const [ countryCode, setCountryCode ] = useState('');
    const [ countryCodeError, setCountryCodeError ] = useState(false);

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
                        country: -1,
                        citizenship: -1,
                    }}
                    validationSchema={setPasswordSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {

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
                                        />
                                        {touched.first_name && errors.first_name ? (
                                            <p className="mt-1 alert-danger">{errors.first_name}</p>
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
                                        />
                                        {touched.last_name && errors.last_name ? (
                                            <p className="mt-1 alert-danger">{errors.last_name}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <Dropdown
                                        onSelect={setCountryCode}>
                                        <Dropdown.Toggle variant="success"
                                                         id="dropdown-basic">
                                            {countryCode ? countryCode : 'Country Code'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <CountryCodeItem value="+374"
                                                             imgSrc={armenianFlag}/>
                                            <CountryCodeItem value="+375"
                                                             imgSrc={belorussianFlag}/>
                                            <CountryCodeItem value="+7"
                                                             imgSrc={russianFlag}/>
                                            <CountryCodeItem value="+380"
                                                             imgSrc={ukrainianFlag}/>
                                        </Dropdown.Menu>
                                        {!countryCode && countryCodeError ? (
                                            <p className="mt-1 alert-danger">Select
                                                country code</p>
                                        ) : null}
                                    </Dropdown>
                                    <Form.Control
                                        type="tel"
                                        value={values.phone_number}
                                        name="phone_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Phone Number"
                                    />
                                </InputGroup>
                                {touched.phone_number && errors.phone_number ? (
                                    <p className="mt-1 alert-danger">{errors.phone_number}</p>
                                ) : null}
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
                                        />
                                        {touched.citizenship && errors.citizenship ? (
                                            <p className="mt-1 alert-danger">{errors.citizenship}</p>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <CountriesDropdown
                                            value={values.country}
                                            name="country"
                                            placeHolder="Country"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                        />
                                        {touched.country && errors.country ? (
                                            <p className="mt-1 alert-danger">{errors.country}</p>
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
                                        />
                                        {touched.city && errors.city ? (
                                            <p className="mt-1 alert-danger">{errors.city}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>

                            <Button
                                variant="primary"
                                size="lg"
                                block
                                type="submit"
                                disabled={pending}>
                                Submit
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
    submitSetPassword,
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
    submitSetPassword: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistration);
