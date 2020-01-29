import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { bool, oneOfType, string, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { getAuthToken } from '../auth';
import  AlertNotice from '../../AlertNotice/AlertNotice';
import { logInSchema } from '../../../validation';
import { Formik } from 'formik';


const Login = ({ pending, success, getAuthToken, push, error }) => {

    useEffect(() => {
        if (success) {
            push('/dashboard');
        }
    }, [ success, push ]);

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className='registration-form-container'>
            { error ? <AlertNotice message={error} type="danger" /> : null }
            <Formik
                initialValues={ {
                    email: '',
                    password: '',
                }}
                validationSchema={logInSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
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
                    <Form onSubmit={handleSubmit} className="mx-auto">
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
                                <p className="mt-1 alert-danger">{errors.email}</p>
                            ): null}
                        </Form.Group>
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
                                <p className="mt-1 alert-danger">{errors.password}</p>
                            ): null}
                        </Form.Group>
                        <Button
                            variant="primary"
                            size="lg"
                            block
                            type="submit"
                            disabled={pending}>Login
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className="mt-2">
                <Link to="/register">Dont have an account? Register Here!</Link>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    pending: authPending(state),
    error: authFailed(state),
    success: authSucceed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ getAuthToken, push }, dispatch);


Login.propTypes = {
    pending: bool.isRequired,
    error: oneOfType([
        string,
        bool,
    ]).isRequired,
    success: bool.isRequired,
    getAuthToken: func.isRequired,
    push: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
