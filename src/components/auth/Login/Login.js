import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { authPendingSelector, authSuccessSelector } from '../authReducer';
import { push } from 'connected-react-router';
import { Formik } from 'formik';
import { bool, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { getAuthToken, getUserFromToken } from '../auth';
import { AuthFormContainer } from '../../ui';
import { logInSchema } from '../../../validation';


const redirectToDashboard = (push) => {
    const token = localStorage.getItem('auth_token');
    const user = getUserFromToken(token);
    push(`/${user.role}`);
};

const Login = ({ authPending, authSuccess, getAuthToken, push, authError }) => {

    useEffect(() => {
        if (authSuccess) {
            redirectToDashboard(push);
        }
    }, [ authSuccess, push ]);

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div>
            <AuthFormContainer title="Войти в Аккаунт">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={logInSchema}
                    onSubmit={(values) => {
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
                            <p className="form-control-label">Эл. почта</p>
                            <Form.Group>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.email && errors.email ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.email}</span>
                                ) : null}
                            </Form.Group>
                            <p className="form-control-label">Пароль</p>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Пароль"
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
                                    disabled={authPending}>Ввойти
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="login-link-text">
                    <Link to="/register">Забыл пароль?</Link>
                    <hr/>
                    <Link to="/register">Зарегистрироваться</Link>
                </div>
            </AuthFormContainer>
        </div>
    );
};

const mapStateToProps = state => ({
    authPending: authPendingSelector(state),
    authSuccess: authSuccessSelector(state),
});

const mapDispatchToProps = { getAuthToken, push };


Login.propTypes = {
    authPending: bool.isRequired,
    authSuccess: bool.isRequired,
    getAuthToken: func.isRequired,
    push: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
