import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { bool, func, oneOfType, string } from 'prop-types';
import classNames from 'classnames';
import { If, Then, Else, When } from 'react-if';
import CheckYourEmailAlert from './CheckYourEmailAlert';
import { AuthFormContainer, AlertNotice } from '../../ui/';
import { registerUser } from '../auth';
import { authFailed, authPending, authSucceed } from '../authReducer';
import { userRegistrationSchema } from '../../../validation';
import ERROR_MESSAGES from '../../../constants/errorMessages'


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowPassword: false,
            shouldShowRepeatPassword: false,
        }
    }

    toggleShowPassword = (shouldShowPassword) => {
        this.setState({ shouldShowPassword });
    };

    toggleShowRepeatPassword = (shouldShowRepeatPassword) => {
        this.setState({ shouldShowRepeatPassword });
    };

    render() {

        const { shouldShowPassword, shouldShowRepeatPassword } = this.state;
        const { registrationPending, registrationError } = this.props;

        return (
            <div>
                <AuthFormContainer
                    title="Sign Up"
                    subtitle="Freelancers"
                >
                    <When condition={!!registrationError}>
                        <AlertNotice type="danger" message={registrationError}/>
                    </When>
                    <When condition={this.props.registrationSuccess}>
                        <CheckYourEmailAlert/>
                    </When>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            repeat_password: '',
                        }}
                        validationSchema={userRegistrationSchema}
                        onSubmit={(values) => {
                            this.props.registerUser(values);
                        }}
                        validate={({ password, repeat_password }) => {
                            if (password !== repeat_password) {
                                return { repeat_password: ERROR_MESSAGES.PASSWORDS_NOT_MATCH }
                            }
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
                                        <span className="mt-1 invalid-feedback">{errors.email}</span>
                                    ) : null}
                                </Form.Group>
                                <p className="form-control-label">Password</p>
                                <Form.Group>
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
                                            <span className="mt-1 invalid-feedback">{errors.password}</span>
                                        ) : null}
                                    </InputGroup>
                                </Form.Group>
                                <p className="form-control-label">Repeat Password</p>
                                <InputGroup>
                                    <Form.Control
                                        type={shouldShowRepeatPassword ? 'text': 'password'}
                                        name="repeat_password"
                                        placeholder="Repeat Password"
                                        value={values.repeat_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classNames('rounded-0', { 'is-invalid': touched.repeat_password && errors.repeat_password})}
                                    />
                                    <InputGroup.Append>
                                        <If condition={shouldShowRepeatPassword}>
                                            <Then>
                                                <InputGroup.Text
                                                    onClick={() => this.toggleShowRepeatPassword(false)}
                                                    title="hide password"
                                                ><i className="fa fa-eye-slash"/></InputGroup.Text>
                                            </Then>
                                            <Else>
                                                <InputGroup.Text
                                                    onClick={() => this.toggleShowRepeatPassword(true)}
                                                    title="show password"
                                                ><i className="fa fa-eye"/></InputGroup.Text>
                                            </Else>
                                        </If>
                                    </InputGroup.Append>
                                    {touched.repeat_password && errors.repeat_password ? (
                                        <span className="mt-1 invalid-feedback">{errors.repeat_password}</span>
                                    ) : null}
                                </InputGroup>
                                <div className="round-button-container">
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
    registrationError: authFailed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ registerUser }, dispatch);


Registration.propTypes = {
    registrationPending: bool.isRequired,
    registrationSuccess: bool.isRequired,
    registrationError: oneOfType([ bool.isRequired, string.isRequired ]),
    registerUser: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
