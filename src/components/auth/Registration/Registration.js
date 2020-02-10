import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { bool, func } from 'prop-types';
import classNames from 'classnames';
import { If, Then, Else } from 'react-if';
import CheckYourEmailAlert from './CheckYourEmailAlert';
import { AuthFormContainer } from '../../ui/';
import { registerUser } from '../auth';
import { authPending, authSucceed } from '../authReducer';
import { userRegistrationSchema } from '../../../validation';


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowPassword: false,
        }
    }

    toggleShowPassword = (shouldShowPassword) => {
        this.setState({ shouldShowPassword });
    };

    render() {

        const { shouldShowPassword, registrationPending } = this.state;

        return (
            <div>
                <AuthFormContainer>
                    <div className="title-container">
                        <span>Sign Up</span>
                    </div>
                    <div className="subtitle-container">
                        <span>Freelancers</span>
                    </div>
                    {this.props.registrationSuccess ? <CheckYourEmailAlert/> : null}
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            name: '',
                        }}
                        validationSchema={userRegistrationSchema}
                        onSubmit={(values) => {
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
                            <Form onSubmit={handleSubmit} className="registration-form">
                                <Form.Group>
                                    <p className="form-control-label">Name</p>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classNames('rounded-0', { 'is-invalid': touched.name && errors.name})}
                                    />
                                    {touched.name && errors.name ? (
                                        <p className="mt-1 invalid-feedback">{errors.name}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p className="form-control-label">Email</p>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="you@example.com"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={classNames('rounded-0', { 'is-invalid': touched.email && errors.email})}
                                    />
                                    {touched.email && errors.email ? (
                                        <p className="mt-1 invalid-feedback">{errors.email}</p>
                                    ) : null}
                                </Form.Group>
                                <p className="form-control-label">Password</p>
                                <InputGroup>
                                    <Form.Control
                                        type={shouldShowPassword ? "text": "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classNames('rounded-0', { 'is-invalid': touched.password && errors.password})}

                                    />
                                    <InputGroup.Append>
                                        <If condition={shouldShowPassword}>
                                            <Then>
                                                <InputGroup.Text
                                                    onClick={() => this.toggleShowPassword(false)}
                                                    title="hide password"
                                                ><i className="fa fa-eye-slash"/></InputGroup.Text>
                                            </Then>
                                            <Else>
                                                <InputGroup.Text
                                                    onClick={() => this.toggleShowPassword(true)}
                                                    title="show password"
                                                ><i className="fa fa-eye"/></InputGroup.Text>
                                            </Else>
                                        </If>
                                    </InputGroup.Append>
                                    {touched.password && errors.password ? (
                                        <p className="mt-1 invalid-feedback">{errors.password}</p>
                                    ) : null}
                                </InputGroup>
                                <div className="register-button-container">
                                    <button
                                        type="submit"
                                        disabled={registrationPending}>Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="login-link-text">
                        <Link to="/login">Have an account? Login here.</Link>
                    </div>
                </AuthFormContainer>
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
