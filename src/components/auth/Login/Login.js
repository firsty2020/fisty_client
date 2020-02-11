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
            <AuthFormContainer title="Войти в Аккаунт">
                <When condition={!!authError}>
                    <AlertNotice message={authError} type="danger"/>
                </When>
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
