import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { Formik } from 'formik';
import { bool, oneOfType, string, func } from 'prop-types';
import { When } from 'react-if';
import { Link } from 'react-router-dom';
import { getAuthToken } from '../auth';
import { AlertNotice, AuthFormContainer } from '../../ui';
import { logInSchema } from '../../../validation';


const Login = ({ authPending, authSuccess, getAuthToken, push, authError }) => {

    useEffect(() => {
        if (authSuccess) {
            push('/dashboard');
        }
    }, [ authSuccess, push ]);

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div>
            <AuthFormContainer title="Sign In">
                <When condition={!!authError}>
                    <AlertNotice message={authError} type="danger"/>
                </When>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={logInSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        getAuthToken(values.email, values.password);
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
                            <p className="form-control-label">Email</p>
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.email && errors.email ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.email}</span>
                                ) : null}
                            </Form.Group>
                            <p className="form-control-label">Password</p>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.password && errors.password ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.password}</span>
                                ) : null}
                            </Form.Group>
                            <div className="round-button-container">
                                <button
                                    type="submit"
                                    disabled={authPending}>Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="login-link-text">
                    <Link to="/register">Don't have an account? Sign up here.</Link>
                    <br/>
                    <Link to="/register">Forgot password.</Link>
                </div>
            </AuthFormContainer>
        </div>
    );
};

const mapStateToProps = state => ({
    authPending: authPending(state),
    authError: authFailed(state),
    authSuccess: authSucceed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAuthToken,
    push
}, dispatch);

Login.propTypes = {
    authPending: bool.isRequired,
    authError: oneOfType([
        string,
        bool,
    ]).isRequired,
    authSuccess: bool.isRequired,
    getAuthToken: func.isRequired,
    push: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
