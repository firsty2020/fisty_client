import React from 'react';
import { AlertNotice, AuthFormContainer } from '../ui';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import ERROR_MESSAGES from '../../helpers/constants/messages';
import { connect } from 'react-redux';
import { resetPassword } from './authActions';
import { isLoadingSelector } from '../common/commonReducer';
import { passwordResetSelector } from './authReducer';
import { When } from 'react-if';


export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email(ERROR_MESSAGES.EMAIL_INVALID)
        .required(ERROR_MESSAGES.EMAIL_REQUIRED),
});


const ForgotPassword = ({ pending, success, resetPassword }) => {

    return (
        <div>
            <When condition={!!success}>
                <AlertNotice
                    type="success"
                    message="Мы отправили ссылку на вашу эл.почту" />
            </When>
            <AuthFormContainer title="Восстановить Пароль">
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        resetPassword({ email: values.email });
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
                            <div className="round-button-container">
                                <button
                                    type="submit"
                                    disabled={pending}>Подтвердить
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="login-link-text">
                    <hr/>
                    <Link to="/register">Зарегистрироваться</Link>
                </div>
            </AuthFormContainer>
        </div>
    );
};


const mapStateToProps = (state) => ({
    pending: isLoadingSelector(state),
    success: passwordResetSelector(state),
});

const mapDispatchToProps = {
    resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
