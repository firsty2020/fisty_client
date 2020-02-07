import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registerUser } from '../auth';
import CheckYourEmailAlert from './CheckYourEmailAlert';
import './Registration.css';
import { authPending, authSucceed } from '../authReducer';
import { userRegistrationSchema } from '../../../validation';
import { Formik } from 'formik';
import { bool, func } from 'prop-types';
import logo from '../../../assets/img/logo@2x.png';


class Registration extends Component {

    render() {

        return (
            <div className="gradient-container">
                <div className="registration-form-container">
                    <div className="logo-container">
                        <img src={logo} alt="firsty logo"/>
                    </div>
                    {this.props.registrationSuccess ? <CheckYourEmailAlert/> : null}
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            repeat_password: '',
                        }}
                        validationSchema={userRegistrationSchema}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            this.props.registerUser(values);
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
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={touched.email && errors.email ? 'is-invalid' : ''}
                                    />
                                    {touched.email && errors.email ? (
                                        <p className="mt-1 invalid-feedback">{errors.email}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.password && errors.password ? 'is-invalid' : ''}
                                    />
                                    {touched.password && errors.password ? (
                                        <p className="mt-1 invalid-feedback">{errors.password}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        name="repeat_password"
                                        placeholder="Confirm Password"
                                        value={values.repeat_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={touched.repeat_password && errors.repeat_password ? 'is-invalid' : ''}
                                    />
                                    {touched.repeat_password && errors.repeat_password ? (
                                        <p className="mt-1 invalid-feedback">{errors.repeat_password}</p>
                                    ) : null}
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    block
                                    type="submit"
                                    disabled={this.props.registrationPending}>Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    registrationPending: authPending(state),
    registrationSuccess: authSucceed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ registerUser }, dispatch);

Registration.propTypes = {
    registrationPending: bool.isRequired,
    registrationSuccess: bool.isRequired,
    registerUser: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Registration);
