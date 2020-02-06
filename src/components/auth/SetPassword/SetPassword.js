import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import {authPending, authFailed, authSucceed} from '../authReducer';
import {bindActionCreators} from 'redux';
import {setPassword as submitSetPassword} from '../auth';
import {push} from 'connected-react-router'
import {setPasswordSchema} from '../../../validation';
import {Formik} from 'formik';
import AlertNotice from '../../AlertNotice/AlertNotice';
import {bool, func, shape, string} from 'prop-types';


const SetPassword = ({match, pending, success, error, push, submitSetPassword}) => {
    const [notMatch, setNotMatch] = useState(false);

    useEffect(() => {
        if (success) {
            setTimeout(() => push('/login'), 2000);
        }
    }, [success, push]);

    let alert;

    if (error) {
        alert = <AlertNotice
            type={{fuckL: true}}
            message={error}
        />
    } else if (notMatch) {
        alert = <AlertNotice
            type="danger"
            message="Passwords do not match. Please fix it."
        />
    } else if (success) {
        alert = <AlertNotice
            type="success"
            message="You have successfully registered."
        />
    }

    return (
        <div className='registration-form-container'>
            {alert ? alert : null}
            <Formik
                initialValues={{
                    password: '',
                    repeat_password: '',
                }}
                validationSchema={setPasswordSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    if (values.password !== values.repeat_password) {
                        setSubmitting(false);
                        return setNotMatch(true);
                    }
                    setSubmitting(true);
                    const {password, repeat_password} = values;
                    submitSetPassword({
                        password,
                        repeat_password
                    }, match.params.passwordToken);
                    resetForm();
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
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.password && errors.password ? (
                                <p className="mt-1 alert-danger">{errors.password}</p>
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
                            />
                            {touched.repeat_password && errors.repeat_password ? (
                                <p className="mt-1 alert-danger">{errors.repeat_password}</p>
                            ) : null}
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


SetPassword.propTypes = {
    pending: bool.isRequired,
    error: bool.isRequired,
    success: bool.isRequired,
    match: shape({
        params: shape(
            {passwordToken: string.isRequired})
    }).isRequired,
    push: func.isRequired,
    submitSetPassword: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
